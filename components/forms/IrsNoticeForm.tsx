"use client";

import { useState } from "react";
import { LoaderCircle, LockKeyhole, Upload } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FormError, Honeypot, TextAreaField, TextField } from "@/components/forms/fields";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useLeadForm } from "@/components/forms/useLeadForm";

const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp";

export function IrsNoticeForm() {
  const { status, error, onSubmit, reset } = useLeadForm("irs-notice");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  if (status === "success") {
    return (
      <FormSuccess
        title="We’ve got your notice."
        onReset={() => {
          setFileName("");
          reset();
        }}
        resetLabel="Send another notice"
      >
        <p>
          A member of our resolution team will review it and contact you to talk through next steps. Keep the original
          letter and note any response deadline — we’ll plan around it.
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
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" id="irs-name" autoComplete="name" required />
        <TextField label="Phone" name="phone" id="irs-phone" type="tel" autoComplete="tel" required />
        <TextField label="Email" name="email" id="irs-email" type="email" autoComplete="email" required />
        <TextField
          label="Notice or letter number"
          name="noticeNumber"
          id="irs-notice-number"
          placeholder="e.g. CP2000, CP504, LT11"
          hint="Printed in the top or bottom right corner."
        />
      </div>

      <div>
        <p className="mb-1.5 block text-sm font-medium text-ink">
          Upload your notice{" "}
          <span className="ml-1 text-xs font-normal text-charcoal">(optional · PDF or photo, 4 MB max)</span>
        </p>
        <label
          htmlFor="irs-file"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper/60 px-6 py-8 text-center transition-colors focus-within:border-accent hover:border-accent/50 hover:bg-paper"
        >
          <Upload aria-hidden className="h-7 w-7 text-accent" strokeWidth={1.5} />
          <span className="text-[15px] font-semibold text-ink">
            {fileName ? fileName : "Choose a file or take a photo"}
          </span>
          <span className="text-xs text-charcoal">PDF, JPG, PNG or HEIC</span>
          <input
            id="irs-file"
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
        label="Anything we should know?"
        name="message"
        id="irs-message"
        rows={4}
        hint="Response deadline, tax years involved, or whether you’ve already contacted the IRS."
      />

      <p className="flex items-start gap-2.5 rounded-xl bg-paper px-4 py-3 text-sm leading-relaxed text-charcoal">
        <LockKeyhole aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
        For your security, feel free to black out all but the last four digits of your Social Security number before
        uploading. Existing clients can also send notices through our secure Liscio portal.
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
            Uploading…
          </>
        ) : (
          <>
            <Upload aria-hidden className="h-4 w-4" />
            Send My Notice for Review
          </>
        )}
      </button>
    </form>
  );
}
