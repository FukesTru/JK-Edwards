import { NextResponse } from "next/server";
import { deliverLead, type Lead } from "@/lib/leads";
import { real, site } from "@/lib/site";

export const runtime = "nodejs";

const FORM_TYPES = new Set(["get-started", "quick", "irs-notice"]);
const MAX_FILE_BYTES = 4 * 1024 * 1024; // Vercel's request limit is 4.5 MB
const ALLOWED_FILE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// SSN-shaped numbers (123-45-6789, 123 45 6789 or nine straight digits) are rejected
// so sensitive numbers never reach an inbox or CRM.
const SSN = /\b\d{3}([-\s])\d{2}\1\d{4}\b|\b\d{9}\b/;

const contactFallback = [real(site.phone) && `call ${site.phone}`, real(site.email) && `email ${site.email}`]
  .filter(Boolean)
  .join(" or ");
const FALLBACK_ERROR = `Sorry — we couldn’t send your request.${contactFallback ? ` Please ${contactFallback}.` : " Please try again shortly."}`;

// Best-effort, per-instance rate limit: 6 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

function field(form: FormData, key: string, max = 500) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function list(form: FormData, key: string) {
  return form
    .getAll(key)
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.slice(0, 80));
}

const SERVICE_LABELS: Record<string, string> = {
  "tax-preparation": "Tax Preparation",
  "tax-resolution": "Tax Resolution",
  "not-sure": "Not sure yet",
};

function json(body: { ok: boolean; error?: string }, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "We couldn’t read that submission. Please try again." }, 400);
  }

  // Spam traps: hidden honeypot field, or a form submitted faster than a human could.
  const renderedAt = Number(field(form, "_ts", 20));
  if (field(form, "company_website") || (renderedAt && Date.now() - renderedAt < 2500)) {
    return json({ ok: true });
  }

  const formType = field(form, "formType", 20);
  if (!FORM_TYPES.has(formType)) return json({ ok: false, error: "Unknown form." }, 400);

  const name = field(form, "name", 120);
  const email = field(form, "email", 200);
  const phone = field(form, "phone", 40);
  const message = field(form, "message", 5000);
  const noticeNumber = field(form, "noticeNumber", 80);

  if (!name) return json({ ok: false, error: "Please enter your name." }, 422);
  if (!EMAIL.test(email)) return json({ ok: false, error: "Please enter a valid email address." }, 422);
  if ((formType === "quick" || formType === "irs-notice") && !phone)
    return json({ ok: false, error: "Please add a phone number so we can reach you." }, 422);
  if (SSN.test(message) || SSN.test(noticeNumber)) {
    return json(
      {
        ok: false,
        error:
          "It looks like your message includes a Social Security number. Please remove it — we’ll collect sensitive details securely later.",
      },
      422,
    );
  }

  const fields: Record<string, string> = {};
  const add = (label: string, value: string) => value && (fields[label] = value);
  const service = field(form, "service", 60);
  add("Service", SERVICE_LABELS[service] ?? service);
  add("City", field(form, "city", 60));
  add("Applies to them", list(form, "applies").join(", "));
  add("Preferred contact", field(form, "contactMethod", 40));
  add("Notice type / number", noticeNumber);

  let attachment: Lead["attachment"];
  const file = form.get("notice");
  if (formType === "irs-notice" && file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return json({ ok: false, error: "That file is larger than 4 MB. Please upload a smaller scan or photo." }, 413);
    }
    if (file.type && !ALLOWED_FILE_TYPES.has(file.type)) {
      return json({ ok: false, error: "Please upload a PDF or JPG (PNG also works)." }, 415);
    }
    attachment = {
      filename: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120) || "irs-notice",
      contentType: file.type || "application/octet-stream",
      size: file.size,
      base64: Buffer.from(await file.arrayBuffer()).toString("base64"),
    };
  }

  const lead: Lead = {
    formType,
    name,
    email,
    phone: phone || undefined,
    message: message || undefined,
    fields,
    page: field(form, "page", 200) || undefined,
    submittedAt: new Date().toISOString(),
    attachment,
  };

  const result = await deliverLead(lead);

  if (!result.configured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] No delivery channel configured — lead received in development:", {
        ...lead,
        attachment: attachment && { ...attachment, base64: `<${attachment.size} bytes>` },
      });
      return json({ ok: true });
    }
    console.error("[contact] No delivery channel configured (set CONTACT_WEBHOOK_URL or RESEND_API_KEY).");
    return json({ ok: false, error: FALLBACK_ERROR }, 503);
  }

  if (!result.delivered) {
    console.error("[contact] Lead delivery failed:", result.errors);
    return json({ ok: false, error: FALLBACK_ERROR }, 502);
  }
  if (result.errors.length) console.warn("[contact] Partial delivery failure:", result.errors);

  return json({ ok: true });
}
