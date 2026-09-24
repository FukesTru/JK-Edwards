"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FormError, Honeypot, SelectField, TextField } from "@/components/forms/fields";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";

/** Footer "Get Started" mini form: name, phone, email and service. */
export function QuickForm({ serviceOptions }: { serviceOptions: string[] }) {
  const { status, error, onSubmit, reset } = useLeadForm("quick");

  if (status === "success") {
    return (
      <FormSuccess tone="dark" title="Thanks — request received." onReset={reset} resetLabel="Send another request">
        We’ll be in touch soon with next steps and a secure link for your documents.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-3" aria-label="Quick start form">
      <TextField tone="dark" label="Name" name="name" id="quick-name" autoComplete="name" required />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <TextField tone="dark" label="Phone" name="phone" id="quick-phone" type="tel" autoComplete="tel" required />
        <TextField tone="dark" label="Email" name="email" id="quick-email" type="email" autoComplete="email" required />
      </div>
      <SelectField tone="dark" label="Service" name="service" id="quick-service" options={serviceOptions} required />
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
            Get Started
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
