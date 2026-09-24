import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichText } from "@/components/ui/RichText";
import type { Faq } from "@/content/faqs";
import { faqSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Accessible, zero-JavaScript accordion built on <details>/<summary>.
 * Emits FAQPage JSON-LD unless `schema={false}` (one FAQPage per page).
 */
export function FaqAccordion({
  items,
  schema = true,
  className,
}: {
  items: Faq[];
  schema?: boolean;
  className?: string;
}) {
  return (
    <>
      <div className={cn("divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white", className)}>
        {items.map((item) => (
          <details key={item.q} className="faq-item group">
            <summary className="flex items-start justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-paper/70 sm:px-7 sm:py-6">
              <span className="text-[1.05rem] leading-snug font-semibold text-navy">{item.q}</span>
              <span
                aria-hidden
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-navy transition-transform duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-navy"
              >
                <Plus className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </summary>
            <div className="px-5 pb-6 text-[1.02rem] leading-relaxed text-muted sm:px-7">
              <p className="max-w-3xl">
                <RichText text={item.a} />
              </p>
            </div>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqSchema(items)} />}
    </>
  );
}
