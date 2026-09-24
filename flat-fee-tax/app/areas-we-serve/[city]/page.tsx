import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CityCard } from "@/components/cards/CityCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CredentialBadge } from "@/components/ui/CredentialBadge";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCard } from "@/components/sections/ContactCard";
import { FormsIncluded } from "@/components/sections/FormsIncluded";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ResolutionTeaser } from "@/components/sections/ResolutionTeaser";
import { JsonLd } from "@/components/seo/JsonLd";
import { cities, cityPages, getCityPage, type CitySlug } from "@/content/cities";
import { accountingServiceSchema, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return cityPages.map((page) => ({ city: page.slug }));
}

async function load(params: PageProps<"/areas-we-serve/[city]">["params"]) {
  const { city } = await params;
  return cityPages.find((page) => page.slug === city) ? getCityPage(city as CitySlug) : null;
}

export async function generateMetadata({ params }: PageProps<"/areas-we-serve/[city]">): Promise<Metadata> {
  const page = await load(params);
  if (!page) return {};
  return buildMetadata({ ...page.seo, path: `/areas-we-serve/${page.slug}` });
}

export default async function CityPage({ params }: PageProps<"/areas-we-serve/[city]">) {
  const page = await load(params);
  if (!page) notFound();

  const path = `/areas-we-serve/${page.slug}`;
  const nearby = page.nearby.map((slug) => cities.find((city) => city.slug === slug)!);

  return (
    <>
      <JsonLd data={accountingServiceSchema(page.name)} />
      <PageHero
        eyebrow={`${page.county} · ${page.name}, GA`}
        title={`CPA-Signed Tax Preparation in ${page.name}, GA`}
        subtitle="Every return prepared and signed by a licensed CPA and reviewed by an Enrolled Agent — in person in Peachtree City or fully online."
        image={page.image}
      />
      <Breadcrumbs
        items={[
          { name: "Areas We Serve", path: "/areas-we-serve" },
          { name: `${page.name}, GA`, path },
        ]}
      />

      <Section tone="white" labelledBy="local-intro">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHeading id="local-intro" eyebrow={`${page.name}, GA`} title={page.introTitle} />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <aside aria-label={`Why ${page.name} clients choose us`} className="space-y-4 self-start">
            {page.highlights.map((highlight) => (
              <div key={highlight.title} className="rounded-2xl border border-line bg-paper p-6">
                <p className="font-serif text-xl font-semibold text-navy">{highlight.title}</p>
                <p className="mt-1.5 leading-relaxed text-muted">{highlight.text}</p>
              </div>
            ))}
            <Link
              href={page.featured.href}
              className="group block rounded-2xl bg-navy p-6 text-white transition-transform hover:-translate-y-0.5"
            >
              <span className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                Popular in {page.name}
              </span>
              <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl font-semibold">
                {page.featured.label}
                <ArrowRight
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="mt-1.5 block text-[15px] leading-relaxed text-mist">{page.featured.text}</span>
            </Link>
          </aside>
        </div>
      </Section>

      <Section tone="paper" labelledBy="city-included">
        <SectionHeading
          id="city-included"
          eyebrow="What’s included"
          title="What we handle on every return"
          intro={`The same two-professional process for every ${page.name} household.`}
        />
        <CredentialBadge tone="light" className="mt-7" />
        <div className="mt-10">
          <FormsIncluded />
        </div>
      </Section>

      <ResolutionTeaser />

      <Section tone="white" labelledBy="city-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="city-faq" eyebrow="Local FAQ" title={`Questions from ${page.name}`} />
          <FaqAccordion items={page.faqs} />
        </div>
      </Section>

      <Section tone="paper" labelledBy="city-visit">
        <SectionHeading
          id="city-visit"
          eyebrow="Visit or go virtual"
          title={`From ${page.name} to our Peachtree City office`}
          intro="Get turn-by-turn directions below — or skip the drive and work with us online."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactCard directionsFrom={`${page.name}, GA`} />
          <MapEmbed height={420} className="min-h-[320px]" />
        </div>
        <div className="mt-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">Nearby cities</p>
          <Stagger as="ul" className="mt-5 grid gap-5 md:grid-cols-3">
            {nearby.map((city) => (
              <StaggerItem as="li" key={city.name}>
                <CityCard city={city} href={`/areas-we-serve/${city.slug}`} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
