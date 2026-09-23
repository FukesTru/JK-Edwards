import Image from "next/image";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { IconGrid } from "@/components/sections/IconGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries, otherIndustries } from "@/content/industries";
import { getImage } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industry-Specialized Accountants",
  description:
    "Industry-specialized accountants for trucking companies, healthcare practices, law firms and U.S. expats, plus small businesses and families across Georgia.",
  path: "/industries",
});

function HeroCollage() {
  return (
    <div aria-hidden className="hidden grid-cols-2 gap-3 lg:grid">
      {industries.map((industry, index) => {
        const photo = getImage(industry.image);
        return (
          <div
            key={industry.slug}
            className={`relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 ${index % 2 === 1 ? "translate-y-8" : ""}`}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="220px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">{industry.shortName}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industries We Serve"
        subtitle="Specialized accounting and tax guidance for trucking, healthcare, law firms and Americans abroad — plus the small businesses and families of Henry County."
        aside={<HeroCollage />}
      />
      <Breadcrumbs items={[{ name: "Industries", path: "/industries" }]} />

      <Section tone="white" labelledBy="industries-featured">
        <SectionHeading
          id="industries-featured"
          eyebrow="Our specialties"
          title="Deep experience where the rules get complicated"
          intro="Each of these industries has its own deductions, filings and financial pressures. We’ve built our services around them."
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <IndustryCard industry={industry} className="min-h-[30rem]" sizes="(min-width: 768px) 50vw, 100vw" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="dark" labelledBy="industries-why">
        <SectionHeading
          id="industries-why"
          tone="dark"
          eyebrow="Why it matters"
          title="Why industry specialization matters"
          intro="A generalist can file your return. A specialist knows which questions to ask before the year is over."
        />
        <div className="mt-12">
          <IconGrid
            tone="dark"
            columns={3}
            items={[
              {
                icon: "MessagesSquare",
                title: "We speak your language",
                description: "IFTA, reimbursements, trust accounts, FBARs — no time lost explaining how your business works.",
              },
              {
                icon: "BadgeDollarSign",
                title: "We know your deductions",
                description: "Industry-specific write-offs and credits that general preparers often miss.",
              },
              {
                icon: "Gauge",
                title: "We benchmark your results",
                description: "KPIs that show how you compare with similar businesses — and where to improve.",
              },
            ]}
          />
        </div>
      </Section>
      <Section tone="paper" labelledBy="industries-more">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeading
            id="industries-more"
            eyebrow="Also serving"
            title="Businesses and families of every kind"
            intro="Not in one of our specialty industries? You’re still in the right place. Most of our clients are small businesses and households right here in Henry County."
          />
          <ul className="flex flex-wrap gap-3">
            {otherIndustries.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-white px-5 py-3 text-[15px] font-semibold text-ink shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

    </>
  );
}
