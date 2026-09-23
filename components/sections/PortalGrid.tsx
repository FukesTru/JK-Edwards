import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { icons } from "@/components/ui/icon-map";
import type { Portal } from "@/lib/site";

/** Grid of external client portals — each opens in a new tab. */
export function PortalGrid({ portals }: { portals: Portal[] }) {
  return (
    <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {portals.map((portal) => {
        const Icon = icons[portal.icon];
        return (
          <StaggerItem as="li" key={portal.key}>
            <a
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_45px_-28px_rgba(22,24,27,0.4)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-charcoal">
                  {portal.product}
                </span>
              </div>
              <span className="mt-5 font-serif text-xl font-semibold text-ink">{portal.name}</span>
              <span className="mt-2 flex-1 text-[15px] leading-relaxed text-charcoal">{portal.description}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
                Open {portal.product === "Intuit" ? "QuickBooks" : portal.product}
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
