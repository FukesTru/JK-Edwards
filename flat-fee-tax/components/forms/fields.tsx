import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type FieldTone = "light" | "dark";

const controlClasses: Record<FieldTone, string> = {
  light:
    "border-line bg-white text-ink placeholder:text-muted/85 focus:border-navy focus:ring-gold/30 hover:border-navy/40",
  dark: "border-white/15 bg-white/[0.06] text-white placeholder:text-mist focus:border-gold focus:ring-gold/25 hover:border-white/30",
};

const baseControl =
  "block w-full rounded-[6px] border px-4 py-3 text-[15px] transition-colors outline-none focus:ring-4 disabled:opacity-60";

function Label({
  htmlFor,
  children,
  required,
  tone,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  tone: FieldTone;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-1.5 block text-sm font-medium", tone === "dark" ? "text-white/90" : "text-ink")}
    >
      {children}
      {required ? (
        <span aria-hidden className={tone === "dark" ? "text-gold" : "text-gold-deep"}>
          {" "}
          *
        </span>
      ) : (
        <span className={cn("ml-1 text-xs font-normal", tone === "dark" ? "text-mist" : "text-muted")}>(optional)</span>
      )}
    </label>
  );
}

type Common = { label: string; name: string; tone?: FieldTone; hint?: string; className?: string };

export function TextField({
  label,
  name,
  tone = "light",
  hint,
  className,
  id,
  ...props
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? `field-${name}`;
  return (
    <div className={className}>
      <Label htmlFor={fieldId} required={props.required} tone={tone}>
        {label}
      </Label>
      <input
        id={fieldId}
        name={name}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        className={cn(baseControl, controlClasses[tone])}
        {...props}
      />
      {hint && (
        <p id={`${fieldId}-hint`} className={cn("mt-1.5 text-xs", tone === "dark" ? "text-mist" : "text-muted")}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  tone = "light",
  hint,
  className,
  id,
  ...props
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldId = id ?? `field-${name}`;
  return (
    <div className={className}>
      <Label htmlFor={fieldId} required={props.required} tone={tone}>
        {label}
      </Label>
      <textarea
        id={fieldId}
        name={name}
        rows={props.rows ?? 4}
        aria-describedby={hint ? `${fieldId}-hint` : undefined}
        className={cn(baseControl, "resize-y", controlClasses[tone])}
        {...props}
      />
      {hint && (
        <p id={`${fieldId}-hint`} className={cn("mt-1.5 text-xs", tone === "dark" ? "text-mist" : "text-muted")}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  name,
  tone = "light",
  options,
  placeholder = "Select one…",
  className,
  id,
  ...props
}: Common & SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder?: string }) {
  const fieldId = id ?? `field-${name}`;
  return (
    <div className={className}>
      <Label htmlFor={fieldId} required={props.required} tone={tone}>
        {label}
      </Label>
      <select
        id={fieldId}
        name={name}
        defaultValue=""
        className={cn(
          baseControl,
          controlClasses[tone],
          "appearance-none pr-10",
          tone === "dark" ? "select-chevron-dark" : "select-chevron",
        )}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Off-screen field that real visitors never see; bots that fill it are ignored. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-[6px] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
      {message}
    </p>
  );
}
