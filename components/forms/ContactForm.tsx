"use client";

import Link from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FormError, Honeypot, SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";

const audienceOptions = [
  "Individual / Family",
  "Business Owner",
  "U.S. Expat",
  "Trucking / Transportation",
  "Healthcare Practice",
  "Attorney / Law Firm",
  "Other",
];

const serviceOptions = [
  "Tax Preparation & Planning",
  "Bookkeeping",
  "Payroll",
  "IRS Problem Resolution",
  "Business Advisory / CFO",
  "New Business Setup",
  "QuickBooks Consulting",
  "Not sure yet",
];

const contactMethods = ["Phone call", "Email", "Text message"];

export function ContactForm() {
  const { status, error, onSubmit, reset } = useLeadForm("contact");

  if (status === "success") {
    return (
      <FormSuccess title="Thank you — we’ll be in touch soon." onReset={reset}>
        <p>
          Your request is on its way to our Hampton team. We’ll contact you within one business day, using your
          preferred method, to schedule your free consultation.
        </p>
        <p className="mt-2">Need us sooner? Call (770) 472-2005.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" aria-label="Book a free consultation">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" autoComplete="name" required />
        <TextField label="Email" name="email" type="email" autoComplete="email" required />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
        <SelectField label="I’m a…" name="audience" options={audienceOptions} required />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Services I’m interested in <span className="ml-1 text-xs font-normal text-charcoal">(choose any)</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 rounded-[6px] border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink transition-colors hover:border-charcoal/40 has-[:checked]:border-accent has-[:checked]:bg-accent/[0.04]"
            >
              <input type="checkbox" name="services" value={option} className="h-4 w-4 accent-[var(--accent)]" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <TextAreaField
        label="How can we help?"
        name="message"
        rows={5}
        hint="Please don’t include Social Security numbers or other sensitive information here."
      />

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Preferred contact method</legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((method, index) => (
            <label
              key={method}
              className="flex cursor-pointer items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-[15px] text-ink transition-colors hover:border-charcoal/40 has-[:checked]:border-accent has-[:checked]:bg-accent/[0.04]"
            >
              <input
                type="radio"
                name="contactMethod"
                value={method}
                defaultChecked={index === 0}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <Honeypot />
      <FormError message={error} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-charcoal sm:max-w-sm">
          By submitting, you agree to be contacted about your inquiry. We never sell your information. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-accent-strong">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="submit" disabled={status === "submitting"} className={buttonClasses("primary", "lg", "shrink-0")}>
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Request My Consultation
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
