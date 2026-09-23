"use client";

import { useState, type FormEvent } from "react";

export type LeadFormType = "contact" | "footer" | "irs-notice" | "ebook";
type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Posts a form (including file inputs) to /api/contact and tracks status.
 * Adds the form type, page path and a render timestamp (bot check).
 */
export function useLeadForm(formType: LeadFormType) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [renderedAt] = useState(() => Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    setError("");

    const data = new FormData(form);
    data.set("formType", formType);
    data.set("page", window.location.pathname);
    data.set("_ts", String(renderedAt));
    const selectedPackage = new URLSearchParams(window.location.search).get("package");
    if (selectedPackage) data.set("package", selectedPackage.slice(0, 40));

    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again or call us.");
      }
      setStatus("success");
      form.reset();
      window.gtag?.("event", "generate_lead", { form_type: formType });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    }
  }

  return { status, error, onSubmit, reset: () => setStatus("idle") };
}
