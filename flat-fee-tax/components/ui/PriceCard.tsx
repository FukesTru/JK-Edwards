import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Service = "taxPrep" | "taxResolution";

/** "$249" with a raised dollar sign — Inter 700, tabular figures. */
export function Price({ amount, className }: { amount: number; className?: string }) {
  return (
    <span className={cn("price inline-flex items-start", className)}>
      <span className="mt-[0.12em] mr-[0.04em] text-[0.48em]">$</span>
      {amount.toLocaleString("en-US")}
    </span>
  );
}

/**
 * Price card for the two flat-fee services.
 * - `hero`: oversized card for page heroes and pricing (72–96px price)
 * - `compact`: small secondary card with a text link
 * Cards are navy (gold price, 5.6:1) so the price can stay gold and accessible.
 */
export function PriceCard({
  service,
  title,
  tagline,
  features = [],
  cta,
  variant = "hero",
  headingLevel = "h2",
  note,
  className,
}: {
  service: Service;
  title: string;
  tagline?: ReactNode;
  features?: ReactNode[];
  cta: { label: string; href: string };
  variant?: "hero" | "compact";
  headingLevel?: "h2" | "h3" | "p";
  /** Small print under the button. */
  note?: ReactNode;
  className?: string;
}) {
  const amount = site.prices[service];
  const Heading = headingLevel;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "@container rounded-2xl border border-white/10 bg-navy-2 p-5 text-white shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)]",
          className,
        )}
      >
        <div className="flex flex-col gap-3 @min-[22rem]:flex-row @min-[22rem]:items-center @min-[22rem]:justify-between @min-[22rem]:gap-5">
          <div className="flex items-center gap-4">
            <Price amount={amount} className="text-[2.6rem] text-gold" />
            <div>
              <Heading className="font-serif text-lg leading-tight font-semibold">{title}</Heading>
              {tagline && <p className="mt-0.5 text-sm text-mist">{tagline}</p>}
            </div>
          </div>
          <Link
            href={cta.href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light"
          >
            {cta.label}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-2 p-7 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.75)] sm:p-9",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gold" />
      <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Flat fee · Upfront</p>
      <Heading className="mt-3 font-serif text-2xl font-semibold">{title}</Heading>
      <div className="mt-4 flex items-end gap-3">
        <Price amount={amount} className="text-[4.5rem] text-gold sm:text-[5.5rem] lg:text-[6rem]" />
      </div>
      {tagline && <p className="mt-3 text-[15px] leading-relaxed text-mist">{tagline}</p>}
      {features.length > 0 && <CheckList tone="dark" items={features} className="mt-7" />}
      <div className="mt-auto pt-8">
        <ButtonLink href={cta.href} size="lg" className="w-full">
          {cta.label}
        </ButtonLink>
        {note && <p className="mt-3 text-center text-xs leading-relaxed text-mist">{note}</p>}
      </div>
    </div>
  );
}
