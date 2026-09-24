"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FormError, Honeypot, SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";
import { prices, site } from "@/lib/site";

export const serviceChoices = [
  { value: "tax-preparation", label: `Tax Preparation — ${prices.taxPrep}` },
  { value: "tax-resolution", label: `Tax Resolution — ${prices.taxResolution}` },
  { value: "not-sure", label: "Not sure yet" },
] as const;

const applies = [
  "W-2 wages",
  "Itemized deductions (Sch A)",
  "Self-employed / 1099 income (Sch C)",
  "Rental property (Sch E)",
  "Stock or crypto sales (1099-B)",
  "K-1 income",
  "An IRS or Georgia DOR notice",
];

const contactMethods = ["Phone call", "Email", "Text message"];

const optionClass =
  "flex cursor-pointer items-center gap-3 rounded-[6px] border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink transition-colors hover:border-navy/40 has-[:checked]:border-navy has-[:checked]:bg-gold/10";

/** The main booking form on /get-started. `?service=tax-resolution` preselects a service. */
export function GetStartedForm() {
  const { status, error, onSubmit, reset } = useLeadForm("get-started");
  const serviceGroup = useRef<HTMLFieldSetElement>(null);

  // Preselect the service chosen on the previous page (?service=…) without making the page dynamic.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("service");
    const input = serviceGroup.current?.querySelector<HTMLInputElement>(`input[value="${wanted}"]`);
    if (input) input.checked = true;
  }, [status]);

  if (status === "success") {
    return (
      <FormSuccess title="Thank you — your request is in." onReset={reset} resetLabel="Send another request">
        <p>
          We’ll contact you using your preferred method to confirm the details, then send a secure link for uploading
          your documents. Please don’t email tax documents.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" aria-label="Get started">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" autoComplete="name" required />
        <TextField label="Email" name="email" type="email" autoComplete="email" required />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
        <SelectField label="City" name="city" options={[...site.cities.map((c) => `${c}, GA`), "Other GA"]} required />
      </div>

      <fieldset ref={serviceGroup}>
        <legend className="mb-2 text-sm font-medium text-ink">
          Service{" "}
          <span aria-hidden className="text-gold-deep">
            *
          </span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {serviceChoices.map((choice, index) => (
            <label key={choice.value} className={optionClass}>
              <input
                type="radio"
                name="service"
                value={choice.value}
                required
                defaultChecked={index === 0}
                className="h-4 w-4 accent-[var(--navy)]"
              />
              {choice.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Which apply to you? <span className="ml-1 text-xs font-normal text-muted">(choose any)</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {applies.map((option) => (
            <label key={option} className={optionClass}>
              <input type="checkbox" name="applies" value={option} className="h-4 w-4 accent-[var(--navy)]" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Preferred contact method</legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((method, index) => (
            <label key={method} className={optionClass.replace("rounded-[6px]", "rounded-full px-4 py-2")}>
              <input
                type="radio"
                name="contactMethod"
                value={method}
                defaultChecked={index === 0}
                className="h-4 w-4 accent-[var(--navy)]"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <TextAreaField
        label="Message"
        name="message"
        rows={4}
        hint="Anything we should know — tax years, deadlines, questions."
      />

      <p className="flex items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-ink">
        <LockKeyhole aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-navy" strokeWidth={1.75} />
        <span>
          <strong className="font-semibold">Don’t send SSNs or tax documents here.</strong> We’ll send you a secure
          upload link.
        </span>
      </p>

      <Honeypot />
      <FormError message={error} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send My Request
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
