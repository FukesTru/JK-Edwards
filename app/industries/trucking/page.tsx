import { CheckList } from "@/components/sections/CheckList";
import { EbookOffer } from "@/components/sections/EbookOffer";
import { IconGrid } from "@/components/sections/IconGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { industryJsonLd, industryMetadata } from "@/lib/page-helpers";

export const metadata = industryMetadata("trucking");

export default function TruckingPage() {
  return (
    <>
      <JsonLd data={industryJsonLd("trucking", "Accounting and tax services for trucking and transportation")} />
      <PageHero
        eyebrow="Industries · Trucking & transportation"
        title="Accounting & Tax for Trucking and Transportation Businesses"
        subtitle="From single-truck owner-operators to growing fleets — per diem, IFTA, Form 2290, depreciation and driver payroll, handled by people who know the road."
        image="industry-trucking"
      />
      <Breadcrumbs
        items={[
          { name: "Industries", path: "/industries" },
          { name: "Trucking & Transportation", path: "/industries/trucking" },
        ]}
      />

      <Section tone="white" labelledBy="trucking-intro">
        <SplitFeature image="blog-trucker" imageSide="left">
          <SectionHeading id="trucking-intro" eyebrow="Built for carriers" title="We know the business of trucking" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              Trucking runs on thin margins, heavy regulation and a lot of paperwork — fuel receipts, logbooks,
              quarterly IFTA returns, the annual Heavy Highway Vehicle Use Tax and more. Miss a filing and the penalties
              add up fast. Miss a deduction and you pay more tax than you should.
            </p>
            <p>
              We help owner-operators and fleet owners stay compliant, keep more of what they earn and plan for growth:
              tracking per diem and fuel, choosing the right way to buy or lease equipment, structuring the business as
              it grows and running payroll for drivers and staff. Whether you’re based near the I-75 corridor or run
              routes across the country, we work with you wherever the road takes you.
            </p>
          </div>
          <CheckList
            className="mt-7"
            items={[
              "Year-round planning built around your cash flow",
              "Quarterly IFTA and annual Form 2290 support",
              "Monthly books that show your cost per mile",
            ]}
          />
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="trucking-topics">
        <SectionHeading
          id="trucking-topics"
          eyebrow="What we cover"
          title="Trucking tax and accounting, covered end to end"
        />
        <div className="mt-12">
          <IconGrid
            columns={3}
            items={[
              { icon: "Truck", title: "Owner-operator taxes", description: "Schedule C or entity returns, quarterly estimates and planning." },
              { icon: "CalendarCheck", title: "Per diem", description: "Tracking days on the road and claiming the transportation-industry rate." },
              { icon: "Fuel", title: "Fuel & mileage tracking", description: "Clean records by truck and by jurisdiction." },
              { icon: "FileCheck2", title: "Form 2290 (HVUT)", description: "Heavy Highway Vehicle Use Tax filings and Schedule 1 for registration." },
              { icon: "Route", title: "IFTA support", description: "Quarterly fuel tax reporting across every state you run." },
              { icon: "Wrench", title: "Depreciation on rigs & equipment", description: "Section 179 and bonus depreciation strategy for tractors and trailers." },
              { icon: "HandCoins", title: "Driver payroll", description: "W-2 driver payroll, withholding and quarterly filings." },
              { icon: "FileText", title: "1099 contractors", description: "Classification, W-9 collection and 1099-NEC filing." },
              { icon: "Building2", title: "Entity structure for fleets", description: "LLC, S corp and multi-entity planning as you add trucks." },
            ]}
          />
        </div>
      </Section>

      <Section tone="dark" labelledBy="trucking-ebook">
        <EbookOffer
          id="trucking-ebook"
          title="Download the Trucking & Transportation eBook"
          ebookName="Trucking & Transportation eBook"
          intro="A practical guide for owner-operators and fleet owners who want to keep more of what they earn."
          bullets={[
            "The deductions owner-operators most often miss",
            "How per diem, IFTA and Form 2290 fit together",
            "When it’s time to switch to an S corporation",
          ]}
        />
      </Section>

      <Section tone="white" labelledBy="trucking-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="trucking-faq"
            eyebrow="FAQ"
            title="Trucking tax questions"
            intro="Answers for owner-operators and fleet owners."
          />
          <FaqAccordion items={faqs.trucking} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            {
              label: "Payroll Services",
              href: "/services/payroll",
              description: "Driver payroll, tax deposits and year-end W-2s.",
              icon: "HandCoins",
            },
            {
              label: "Tax Preparation & Planning",
              href: "/services/tax-preparation-planning",
              description: "Returns and quarterly estimates for owner-operators and fleets.",
              icon: "ReceiptText",
            },
            {
              label: "New Business Setup",
              href: "/services/new-business-setup",
              description: "Choose the right structure as your fleet grows.",
              icon: "Rocket",
            },
          ]}
        />
      </Section>
    </>
  );
}
