import { NextResponse } from "next/server";
import { deliverLead, type Lead } from "@/lib/leads";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const FORM_TYPES = new Set(["contact", "footer", "irs-notice", "ebook"]);
const MAX_FILE_BYTES = 4 * 1024 * 1024; // Vercel's request limit is 4.5 MB
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/webp",
]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FALLBACK_ERROR = `Sorry — we couldn’t send your message. Please call ${site.phone.display} or email ${site.email}.`;

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

function json(body: { ok: boolean; error?: string }, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: `Too many submissions. Please call us at ${site.phone.display}.` }, 429);
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

  if (!EMAIL.test(email)) return json({ ok: false, error: "Please enter a valid email address." }, 422);
  if (!name) return json({ ok: false, error: "Please enter your name." }, 422);
  if (formType === "footer" && !message) return json({ ok: false, error: "Please tell us how we can help." }, 422);
  if (formType === "irs-notice" && !phone) return json({ ok: false, error: "Please add a phone number." }, 422);

  const fields: Record<string, string> = {};
  const audience = field(form, "audience", 80);
  const services = form
    .getAll("services")
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.slice(0, 80));
  const contactMethod = field(form, "contactMethod", 40);
  const noticeNumber = field(form, "noticeNumber", 60);
  const ebook = field(form, "ebook", 120);
  const selectedPackage = field(form, "package", 40);
  if (audience) fields["I’m a"] = audience;
  if (services.length) fields["Services"] = services.join(", ");
  if (contactMethod) fields["Preferred contact"] = contactMethod;
  if (noticeNumber) fields["Notice number"] = noticeNumber;
  if (ebook) fields["eBook"] = ebook;
  if (selectedPackage) fields["Package of interest"] = selectedPackage;

  let attachment: Lead["attachment"];
  const file = form.get("notice");
  if (formType === "irs-notice" && file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return json({ ok: false, error: "That file is larger than 4 MB. Please upload a smaller scan or photo." }, 413);
    }
    if (file.type && !ALLOWED_FILE_TYPES.has(file.type)) {
      return json({ ok: false, error: "Please upload a PDF, JPG, PNG or HEIC file." }, 415);
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
        attachment: lead.attachment && { ...lead.attachment, base64: "[omitted]" },
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
