import type { ReactNode } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { showPlaceholders } from "@/lib/site";

/** Long-form legal copy (privacy policy, terms). */
export function LegalDocument({ updated, children }: { updated: string; children: ReactNode }) {
  const date = new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <Section tone="white" reveal={false}>
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">
          Last updated <time dateTime={updated}>{date}</time>
        </p>
        {showPlaceholders && (
          <Placeholder block note="Legal review — client to confirm" className="mt-4">
            <p className="rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-ink">
              [PLACEHOLDER] Plain-English starting draft. Have it reviewed by the business’s attorney before launch.
            </p>
          </Placeholder>
        )}
        <div className="copy mt-8 text-[1.05rem]">{children}</div>
      </div>
    </Section>
  );
}
