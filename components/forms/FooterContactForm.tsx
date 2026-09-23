"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FormError, Honeypot, TextAreaField, TextField } from "@/components/forms/fields";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";

export function FooterContactForm() {
  const { status, error, onSubmit, reset } = useLeadForm("footer");

  if (status === "success") {
    return (
      <FormSuccess tone="dark" title="Thanks — message received." onReset={reset}>
        A member of our team will reach out within one business day.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="relative space-y-3" aria-label="Quick contact form">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <TextField tone="dark" label="Name" name="name" id="footer-name" autoComplete="name" required />
        <TextField tone="dark" label="Phone" name="phone" id="footer-phone" type="tel" autoComplete="tel" />
      </div>
      <TextField tone="dark" label="Email" name="email" id="footer-email" type="email" autoComplete="email" required />
      <TextAreaField tone="dark" label="How can we help?" name="message" id="footer-message" rows={3} required />
      <Honeypot />
      <FormError message={error} />
      <button type="submit" disabled={status === "submitting"} className={buttonClasses("primary", "md", "w-full")}>
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
