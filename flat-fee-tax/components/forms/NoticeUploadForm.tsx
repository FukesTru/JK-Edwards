"use client";

import { useState } from "react";
import { LoaderCircle, LockKeyhole, Upload } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FormError, Honeypot, TextAreaField, TextField } from "@/components/forms/fields";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";

const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png";

/** "Upload your IRS notice" form on /tax-resolution. */
export function NoticeUploadForm() {
  const { status, error, onSubmit, reset } = useLeadForm("irs-notice");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  if (status === "success") {
    return (
      <FormSuccess
        title="Thank you — we’ve received your notice."
        onReset={() => {
          setFileName("");
          reset();
        }}
        resetLabel="Send another notice"
      >
        <p>
          We’ll review it and contact you to talk through your options. Keep the original letter, and note any response
          deadline printed on it.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        if (fileError) {
          event.preventDefault();
          return;
        }
        onSubmit(event);
      }}
      className="relative space-y-5"
      aria-label="Upload your IRS notice"
      encType="multipart/form-data"
    >
      <p className="flex items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-ink">
        <LockKeyhole aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-navy" strokeWidth={1.75} />
        <span>
          <strong className="font-semibold">Please don’t include your full SSN in this form.</strong> If your notice
          shows it, black out all but the last four digits before uploading.
        </span>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" id="notice-name" autoComplete="name" required />
        <TextField label="Phone" name="phone" id="notice-phone" type="tel" autoComplete="tel" required />
        <TextField label="Email" name="email" id="notice-email" type="email" autoComplete="email" required />
        <TextField
          label="Notice type or number"
          name="noticeNumber"
          id="notice-number"
          placeholder="e.g. CP14, CP2000, LT11"
          hint="Usually printed in the top or bottom right corner."
        />
      </div>

      <div>
        <p className="mb-1.5 block text-sm font-medium text-ink">
          Upload your notice{" "}
          <span className="ml-1 text-xs font-normal text-muted">(optional · PDF or JPG, 4 MB max)</span>
        </p>
        <label
          htmlFor="notice-file"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper/60 px-6 py-8 text-center transition-colors focus-within:border-navy hover:border-navy/40 hover:bg-paper"
        >
          <Upload aria-hidden className="h-7 w-7 text-navy" strokeWidth={1.5} />
          <span className="text-[15px] font-semibold text-navy">
            {fileName ? fileName : "Choose a file or take a photo"}
          </span>
          <span className="text-xs text-muted">PDF or JPG (PNG also works)</span>
          <input
            id="notice-file"
            name="notice"
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setFileName(file?.name ?? "");
              setFileError(
                file && file.size > MAX_BYTES
                  ? "That file is larger than 4 MB — please upload a smaller scan or photo."
                  : "",
              );
            }}
          />
        </label>
        {fileError && (
          <p role="alert" className="mt-2 text-sm text-red-700">
            {fileError}
          </p>
        )}
      </div>

      <TextAreaField
        label="Message"
        name="message"
        id="notice-message"
        rows={4}
        hint="Response deadline, tax years involved, or anything you’ve already done."
      />

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
            Uploading…
          </>
        ) : (
          <>
            <Upload aria-hidden className="h-4 w-4" />
            Send My Notice
          </>
        )}
      </button>
    </form>
  );
}
