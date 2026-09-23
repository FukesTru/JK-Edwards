import { Check, Minus, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { accountingPackages, packageMatrix } from "@/content/packages";
import { cn } from "@/lib/utils";

/**
 * Outsourced accounting packages: three tier cards (Standard highlighted as
 * Most Popular) plus a full feature comparison table on larger screens.
 * No prices — every tier routes to a quote request.
 */
export function PackagesTable({ headingLevel: Heading = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const rows = packageMatrix();

  return (
    <div>
      <Stagger className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {accountingPackages.map((pkg) => {
          const popular = pkg.popular;
          return (
            <StaggerItem
              key={pkg.key}
              className={cn(
                "relative flex flex-col rounded-2xl p-8",
                popular
                  ? "bg-ink text-white shadow-[0_40px_70px_-35px_rgba(22,24,27,0.8)] ring-1 ring-accent/60 lg:-my-4 lg:py-12"
                  : "border border-line bg-white text-ink",
              )}
            >
              {popular && (
                <span className="absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white uppercase lg:top-[-0.35rem]">
                  <Sparkles aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
                  Most Popular
                </span>
              )}
              <Heading className="font-serif text-[1.75rem] font-semibold">{pkg.name}</Heading>
              <p className={cn("mt-2 leading-relaxed", popular ? "text-mist" : "text-charcoal")}>{pkg.tagline}</p>
              <div className={cn("my-6 h-px", popular ? "bg-white/10" : "bg-line")} />
              {pkg.includesPrevious && (
                <p className={cn("mb-4 text-sm font-semibold", popular ? "text-accent-light" : "text-accent-strong")}>
                  Everything in {pkg.includesPrevious}, plus:
                </p>
              )}
              <ul className="flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[15px] leading-snug">
                    <Check
                      aria-hidden
                      className={cn("mt-0.5 h-4 w-4 shrink-0", popular ? "text-accent-light" : "text-accent")}
                      strokeWidth={2.25}
                    />
                    <span className={popular ? "text-white/90" : "text-ink"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/contact?package=${pkg.key}`}
                variant={popular ? "primary" : "outline-dark"}
                icon="arrow"
                className="mt-8 w-full"
              >
                Get a Quote
              </ButtonLink>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Full comparison matrix (tablet and up) */}
      <div className="mt-16 hidden overflow-hidden rounded-2xl border border-line bg-white md:block">
        <table className="w-full text-left text-[15px]">
          <caption className="sr-only">Outsourced accounting package comparison</caption>
          <thead className="bg-paper">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold text-ink">
                What’s included
              </th>
              {accountingPackages.map((pkg) => (
                <th
                  key={pkg.key}
                  scope="col"
                  className={cn(
                    "w-36 px-4 py-4 text-center font-serif text-lg font-semibold",
                    pkg.popular ? "text-accent-strong" : "text-ink",
                  )}
                >
                  {pkg.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.feature} className="hover:bg-paper/60">
                <th scope="row" className="px-6 py-3.5 font-normal text-ink">
                  {row.feature}
                </th>
                {accountingPackages.map((pkg) => (
                  <td key={pkg.key} className={cn("px-4 py-3.5 text-center", pkg.popular && "bg-accent/[0.03]")}>
                    {row.tiers[pkg.key] ? (
                      <>
                        <Check aria-hidden className="mx-auto h-5 w-5 text-accent" strokeWidth={2.25} />
                        <span className="sr-only">Included</span>
                      </>
                    ) : (
                      <>
                        <Minus aria-hidden className="mx-auto h-4 w-4 text-steel" />
                        <span className="sr-only">Not included</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
