"use client";

import { ArrowRight, Download, LoaderCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FormError, Honeypot, TextField } from "@/components/forms/fields";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";

/**
 * Email-gated eBook request. When `downloadUrl` is set the success state links
 * straight to the PDF; until the client supplies the files we email it instead.
 */
export function EbookForm({ ebook, downloadUrl }: { ebook: string; downloadUrl?: string }) {
  const { status, error, onSubmit, reset } = useLeadForm("ebook");

  if (status === "success") {
    return (
      <FormSuccess tone="dark" title="Your eBook is on its way." onReset={reset} resetLabel="Request another copy">
        {downloadUrl ? (
          <a
            href={downloadUrl}
            className="mt-3 inline-flex items-center gap-2 font-semibold text-accent-light underline underline-offset-4"
            download
          >
            <Download aria-hidden className="h-4 w-4" /> Download the {ebook}
          </a>
        ) : (
          <p>Check your inbox — we’ll email your copy of the {ebook} shortly.</p>
        )}
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-4" aria-label={`Download the ${ebook}`}>
      <input type="hidden" name="ebook" value={ebook} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField tone="dark" label="First name" name="name" id="ebook-name" autoComplete="given-name" required />
        <TextField tone="dark" label="Email" name="email" id="ebook-email" type="email" autoComplete="email" required />
      </div>
      <Honeypot />
      <FormError message={error} />
      <button type="submit" disabled={status === "submitting"} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Me the eBook
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="text-xs text-mist">We respect your privacy and never share your email address.</p>
    </form>
  );
}
