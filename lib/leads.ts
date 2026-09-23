/**
 * Lead delivery for website forms. Configure at least one channel in the
 * hosting environment (see README.md → "Forms"):
 *
 *   CONTACT_WEBHOOK_URL   POSTs JSON to a CRM / automation webhook
 *                         (GoHighLevel, Zapier, Make, Slack workflow …)
 *   RESEND_API_KEY        Sends an email through Resend (https://resend.com)
 *   CONTACT_TO_EMAIL        …to this inbox (e.g. info@jkedwards.com)
 *   CONTACT_FROM_EMAIL      …from a verified sender, e.g. "JK Edwards Website <web@jkedwards.com>"
 */

export type Lead = {
  formType: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  fields: Record<string, string>;
  page?: string;
  submittedAt: string;
  attachment?: { filename: string; contentType: string; size: number; base64: string };
};

export type DeliveryResult = { delivered: boolean; configured: boolean; errors: string[] };

const FORM_LABELS: Record<string, string> = {
  contact: "Consultation request",
  footer: "Website message",
  "irs-notice": "IRS notice upload",
  ebook: "eBook request",
};

function summarize(lead: Lead) {
  const lines = [
    `${FORM_LABELS[lead.formType] ?? lead.formType} — ${lead.submittedAt}`,
    "",
    `Name: ${lead.name || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    ...Object.entries(lead.fields).map(([key, value]) => `${key}: ${value}`),
    "",
    lead.message ? `Message:\n${lead.message}` : "",
    "",
    `Page: ${lead.page ?? "—"}`,
    lead.attachment ? `Attachment: ${lead.attachment.filename} (${Math.round(lead.attachment.size / 1024)} KB)` : "",
  ];
  return lines.filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n");
}

async function sendWebhook(url: string, lead: Lead) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: "jkedwards.com", summary: summarize(lead), ...lead }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
}

async function sendEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) throw new Error("Email delivery is not fully configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      reply_to: lead.email || undefined,
      subject: `${FORM_LABELS[lead.formType] ?? "Website lead"}: ${lead.name || lead.email}`,
      text: summarize(lead),
      attachments: lead.attachment
        ? [{ filename: lead.attachment.filename, content: lead.attachment.base64 }]
        : undefined,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend responded ${response.status}`);
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
  const jobs: Promise<void>[] = [];

  if (webhook) jobs.push(sendWebhook(webhook, lead));
  if (emailConfigured) jobs.push(sendEmail(lead));

  if (!jobs.length) return { delivered: false, configured: false, errors: [] };

  const results = await Promise.allSettled(jobs);
  const errors = results
    .filter((result): result is PromiseRejectedResult => result.status === "rejected")
    .map((result) => String(result.reason));
  return { delivered: errors.length < results.length, configured: true, errors };
}
