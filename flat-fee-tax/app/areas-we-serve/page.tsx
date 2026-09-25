import { CityCard } from "@/components/cards/CityCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { cities, cityAnchor, smallTownNotes } from "@/content/cities";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tax Preparer Fayette County GA",
  description:
    "Tax preparer for Fayette and Coweta County, GA: CPA-signed, EA-reviewed returns in Peachtree City, Fayetteville, Newnan and nearby, or fully online. Book now.",
  path: "/areas-we-serve",
});

export default function AreasWeServePage() {
  const counties = ["Fayette County", "Coweta County"] as const;
  return (
    <>
      <PageHero
        eyebrow="Areas we serve"
        title="Proudly Serving Fayette & Coweta County"
        subtitle="In person at our Peachtree City office or fully virtual anywhere in Georgia. Either way, you get two licensed professionals on every return."
      />
      <Breadcrumbs items={[{ name: "Areas We Serve", path: "/areas-we-serve" }]} />

      <Section tone="white" labelledBy="map-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              id="map-heading"
              eyebrow="Where we work"
              title="Seven communities, one standard of care"
              intro="Our office is in Peachtree City, near the center of Fayette and Coweta County. Wherever you are in Georgia, you can also work with us online."
            />
            <ul className="mt-8 space-y-4">
              <li className="flex gap-4 rounded-2xl border border-line bg-paper p-5">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>
                  <span className="block font-semibold text-navy">In person in Peachtree City</span>
                  <span className="mt-1 block text-muted">
                    Meet at our office to drop off questions or review your return.
                  </span>
                </span>
              </li>
              <li id="virtual" className="flex scroll-mt-28 gap-4 rounded-2xl border border-line bg-paper p-5">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>
                  <span className="block font-semibold text-navy">Fully virtual anywhere in Georgia</span>
                  <span className="mt-1 block text-muted">
                    Secure upload, phone or video questions and e-signature.
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <ServiceAreaMap mapClassName="lg:aspect-[5/4]" />
        </div>
      </Section>

      {counties.map((county, index) => (
        <Section key={county} tone={index === 0 ? "paper" : "white"} labelledBy={`county-${index}`}>
          <SectionHeading id={`county-${index}`} eyebrow="Cities we serve" title={county} />
          <Stagger as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cities
              .filter((city) => city.county === county)
              .map((city) => (
                <StaggerItem as="li" key={city.name}>
                  <CityCard
                    city={city}
                    href={city.slug ? `/areas-we-serve/${city.slug}` : `#${cityAnchor(city.name)}`}
                  />
                </StaggerItem>
              ))}
          </Stagger>
        </Section>
      ))}

      <Section tone="paper" labelledBy="small-towns">
        <SectionHeading
          id="small-towns"
          eyebrow="Also serving"
          title="Brooks & Sharpsburg"
          intro="Two smaller communities we’re glad to serve, in person in Peachtree City or online."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {smallTownNotes.map((town) => (
            <article key={town.name} id={cityAnchor(town.name)} className="rounded-2xl border border-line bg-white p-7">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{town.county}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-navy">Tax preparation in {town.name}, GA</h3>
              <p className="mt-3 leading-relaxed text-muted">{town.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks
          links={[
            {
              label: "Peachtree City",
              href: "/areas-we-serve/peachtree-city",
              description: "Our home base and office.",
            },
            { label: "Pricing", href: "/pricing", description: "Flat fees, quoted upfront." },
            {
              label: "How It Works",
              href: "/how-it-works",
              description: "In person or fully online.",
            },
            {
              label: "Get Started",
              href: "/get-started",
              description: "Book your return today.",
            },
          ]}
        />
      </Section>
    </>
  );
}
