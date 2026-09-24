import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { routeGroups, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { prices } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Sitemap",
  description: `Every page on our site: flat ${prices.taxPrep} CPA-signed tax preparation, ${prices.taxResolution} IRS tax resolution, pricing, FAQs and the Fayette and Coweta County areas we serve.`,
  path: "/sitemap",
});

export default function SitemapPage() {
  return (
    <>
      <PageHero eyebrow="Site index" title="Sitemap" subtitle="Every page on our site, in one place." />
      <Breadcrumbs items={[{ name: "Sitemap", path: "/sitemap" }]} />

      <Section tone="white" reveal={false}>
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {routeGroups.map((group) => {
            const id = `sitemap-${group.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <section key={group} aria-labelledby={id}>
                <h2 id={id} className="border-b border-line pb-3 font-serif text-2xl font-semibold text-navy">
                  {group}
                </h2>
                <ul className="mt-4">
                  {routes
                    .filter((route) => route.group === group)
                    .map((route) => (
                      <li key={route.path}>
                        <Link
                          href={route.path}
                          className="group flex items-start justify-between gap-3 py-2 text-[15px] text-ink hover:text-gold-deep"
                        >
                          {route.name}
                          <ArrowRight
                            aria-hidden
                            className="mt-1 h-4 w-4 shrink-0 text-gold-deep opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>
    </>
  );
}
