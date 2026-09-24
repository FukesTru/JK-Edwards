import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const credentials = [
  "Prepared & Signed by a CPA",
  "Reviewed by an Enrolled Agent",
  "Flat Fee, No Surprises",
] as const;

/** Reusable pill row: ✓ Prepared & Signed by a CPA · ✓ Reviewed by an Enrolled Agent · ✓ Flat Fee, No Surprises */
export function CredentialBadge({
  tone = "dark",
  className,
  size = "md",
}: {
  tone?: "dark" | "light";
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul aria-label="Our credentials" className={cn("flex flex-wrap gap-2", className)}>
      {credentials.map((label) => (
        <li
          key={label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap",
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-[13px]",
            tone === "dark" ? "border-gold/35 bg-white/[0.04] text-white" : "border-line bg-white text-navy",
          )}
        >
          <Check
            aria-hidden
            strokeWidth={2.25}
            className={cn(
              "shrink-0",
              size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
              tone === "dark" ? "text-gold" : "text-success",
            )}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}
