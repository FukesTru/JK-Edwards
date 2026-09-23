"use client";

import { useSearchParams } from "next/navigation";
import { PackageCheck } from "lucide-react";

/**
 * Confirms the package a visitor picked on /services (?package=standard).
 * `names` maps package keys to display names (passed from the server so the
 * full package data stays out of the client bundle).
 */
export function PackageNotice({ names }: { names: Record<string, string> }) {
  const key = useSearchParams().get("package");
  const name = key && Object.hasOwn(names, key) ? names[key] : null;
  if (!name) return null;

  return (
    <p className="mb-6 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3 text-[15px] text-ink">
      <PackageCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" strokeWidth={1.75} />
      <span>
        You’re asking about our <strong>{name}</strong> package. We’ll walk through it — and whether it’s the right fit
        — during your consultation.
      </span>
    </p>
  );
}
