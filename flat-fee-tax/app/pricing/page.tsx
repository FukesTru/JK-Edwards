import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { PriceCard } from "@/components/ui/PriceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoodToKnow } from "@/components/sections/GoodToKnow";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { resolutionScope } from "@/content/resolution";
import { cta } from "@/lib/cta";
import { buildMetadata, taxPrepService, taxResolutionService } from "@/lib/seo";
import { prices, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Flat Fee Tax Preparation Georgia, ${prices.taxPrep}`,
  description: `Flat fee tax preparation in Georgia: ${prices.taxPrep} for a CPA-signed, EA-reviewed return with Schedules A, C, E and K-1s, or ${prices.taxResolution} for IRS tax resolution. See our pricing.`,
  path: "/pricing",
});

const taxPrepFeatures = [
  "Federal Form 1040",
  "Schedules A, C and E",
  "1099-B brokerage statements",
  "Schedule K-1 income",
  "Prepared & signed by a CPA",
  "Reviewed by an Enrolled Agent",
  "E-file",
  "Secure document upload",
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[taxPrepService(), taxResolutionService()]} />
      <PageHero
        eyebrow="Pricing"
        title="Simple, Flat-Fee Pricing"
        subtitle={`Two services, two prices, both quoted upfront: ${prices.taxPrep} for tax preparation and ${prices.taxResolution} for tax resolution.`}
      />
      <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} />

      <Section tone="paper" labelledBy="prices-heading">
        <SectionHeading
          id="prices-heading"
          align="center"
          eyebrow="What you pay"
          title="One flat price per service"
          intro="No per-form add-ons and no surprise invoices — you know the price before you book."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          <PriceCard
            service="taxPrep"
            title="Tax Preparation"
            headingLevel="h3"
            tagline="Your individual return, including the schedules that usually cost extra."
            features={taxPrepFeatures}
            cta={cta.taxPrep}
          />
          <PriceCard
            service="taxResolution"
            title="Tax Resolution"
            headingLevel="h3"
            tagline={
              site.confirm.resolutionScopeConfirmed ? (
                "IRS problems handled by an Enrolled Agent."
              ) : (
                <>
                  IRS problems handled by an Enrolled Agent.{" "}
                  <Placeholder note="Owner to confirm the exact scope — then set confirm.resolutionScopeConfirmed">
                    [CLIENT TO CONFIRM SCOPE]
                  </Placeholder>
                </>
              )
            }
            features={resolutionScope}
            cta={cta.taxResolution}
            note="Results depend on your facts and IRS decisions and are not guaranteed."
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="good-to-know">
        <div className="mx-auto max-w-4xl">
          <GoodToKnow />
        </div>
      </Section>

      <Section tone="paper" labelledBy="pricing-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="pricing-faq"
            eyebrow="Pricing FAQ"
            title="Questions about cost"
            intro="Not sure how your situation fits? Ask us before you book."
          />
          <FaqAccordion items={faqs.pricing} />
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks
          links={[
            {
              label: "Tax Preparation",
              href: "/tax-preparation",
              description: `What’s included in the ${prices.taxPrep} return.`,
              icon: "FileText",
            },
            {
              label: "Tax Resolution",
              href: "/tax-resolution",
              description: `How the ${prices.taxResolution} IRS help works.`,
              icon: "ShieldCheck",
            },
            {
              label: "How It Works",
              href: "/how-it-works",
              description: "From documents to e-file in five steps.",
              icon: "ListChecks",
            },
            {
              label: "Get Started",
              href: "/get-started",
              description: "Book your return or tax help.",
              icon: "CalendarCheck",
            },
          ]}
        />
      </Section>
    </>
  );
}
