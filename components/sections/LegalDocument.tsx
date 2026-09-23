import type { ReactNode } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

/** Long-form legal copy (privacy policy, terms) set in the site's prose style. */
export function LegalDocument({ updated, children }: { updated: string; children: ReactNode }) {
  return (
    <Section tone="white" reveal={false}>
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-charcoal">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
        {site.showPlaceholders && (
          <Placeholder block note="Legal review — client to confirm" className="mt-4">
            <p className="rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-ink">
              [PLACEHOLDER] This is a plain-English starting draft. Have it reviewed by the firm’s attorney before
              launch.
            </p>
          </Placeholder>
        )}
        <div className="prose-jk prose prose-lg mt-8 max-w-none">{children}</div>
      </div>
    </Section>
  );
}
