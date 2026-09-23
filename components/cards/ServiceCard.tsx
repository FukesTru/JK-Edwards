import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { icons } from "@/components/ui/icon-map";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

/** Whole-card link (stretched title link) with icon, benefit line and optional highlights. */
export function ServiceCard({
  service,
  detailed = false,
  headingLevel: Heading = "h3",
  className,
}: {
  service: Service;
  detailed?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Icon = icons[service.icon];
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_28px_50px_-28px_rgba(22,24,27,0.4)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
        className,
      )}
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <Heading className="mt-6 font-serif text-[1.35rem] leading-snug font-semibold text-ink">
        <Link href={service.href} className="outline-none after:absolute after:inset-0 after:rounded-2xl">
          {detailed ? service.name : service.shortName}
        </Link>
      </Heading>
      <p className="mt-3 leading-relaxed text-charcoal">{detailed ? service.summary : service.benefit}</p>
      {detailed && (
        <ul className="mt-5 space-y-2.5">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-[15px] leading-snug text-ink">
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
              {highlight}
            </li>
          ))}
        </ul>
      )}
      <span
        aria-hidden
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent-strong"
      >
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </article>
  );
}
