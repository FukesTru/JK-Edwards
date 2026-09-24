import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { PriceCard } from "@/components/ui/PriceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CityChips } from "@/components/sections/CityChips";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { CredentialStrip } from "@/components/sections/CredentialStrip";
import { FormsIncluded } from "@/components/sections/FormsIncluded";
import { MeetKai } from "@/components/sections/MeetKai";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ResolutionTeaser } from "@/components/sections/ResolutionTeaser";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { includedForms } from "@/content/forms";
import { cta } from "@/lib/cta";
import { buildMetadata, taxPrepService, taxResolutionService } from "@/lib/seo";
import { prices, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Tax Preparation Peachtree City GA, ${prices.taxPrep}`,
  description: `Tax preparation in Peachtree City, GA for a flat ${prices.taxPrep}: every return is CPA-signed and reviewed by an Enrolled Agent, Schedules C, E and K-1s included. Book now.`,
  path: "/",
});

const steps = [
  {
    title: "Book or call",
    description: "Choose a time online or give us a call — we’ll confirm the flat price upfront.",
  },
  { title: "Securely upload", description: "Send your documents through our secure portal. Never by email." },
  {
    title: "CPA prepares, EA reviews",
    description: "A licensed CPA prepares and signs; an Enrolled Agent reviews every line.",
  },
  { title: "Review, e-sign & e-file", description: "You review your return, sign electronically and we e-file it." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[taxPrepService(), taxResolutionService()]} />
      <PageHero
        size="large"
        eyebrow={`Flat-fee tax preparation · ${site.primaryCity}`}
        title={<>CPA-Signed Tax Returns for One Flat Price: {prices.taxPrep}</>}
        subtitle="Every return is prepared and signed by a licensed CPA and reviewed by an Enrolled Agent. Schedules C, E, A, brokerage 1099s and K-1s are all included. Serving Peachtree City, Fayetteville, Newnan and all of Fayette & Coweta County."
        image="ptc-lake"
        aside={
          <div className="mx-auto flex w-full max-w-md flex-col gap-4">
            <PriceCard
              service="taxPrep"
              title="Tax Preparation"
              headingLevel="p"
              features={includedForms.map((f) => f.form)}
              cta={cta.taxPrepShort}
            />
            <PriceCard
              variant="compact"
              service="taxResolution"
              title="Tax Resolution"
              headingLevel="p"
              tagline="IRS problems handled"
              cta={{ label: "Tax resolution details", href: "/tax-resolution" }}
            />
          </div>
        }
      />

      <Section tone="white" labelledBy="credentials-heading">
        <SectionHeading
          id="credentials-heading"
          align="center"
          eyebrow="Two licensed professionals, one flat price"
          title="Every return gets a CPA’s signature and an Enrolled Agent’s review"
        />
        <div className="mt-12">
          <CredentialStrip />
        </div>
      </Section>

      <Section tone="paper" labelledBy="included-heading">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="included-heading"
            eyebrow="No per-form add-ons"
            title={`What’s included for ${prices.taxPrep}`}
            intro="The forms that usually cost extra at a tax shop are part of one flat fee here."
          />
          <ButtonLink href="/pricing" variant="outline-dark" icon="arrow" className="shrink-0 self-start lg:self-auto">
            See full pricing
          </ButtonLink>
        </div>
        <div className="mt-12">
          <FormsIncluded />
        </div>
      </Section>

      <Section tone="white" labelledBy="why-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="why-heading"
            eyebrow="Why it matters"
            title="Typical tax shop vs. us"
            intro="Who prepares your return — and who checks it — matters more than the logo on the door. Here’s what’s different."
          />
          <ComparisonTable brandName={site.brandName} />
        </div>
      </Section>

      <ResolutionTeaser />

      <Section tone="white" labelledBy="how-heading">
        <SectionHeading
          id="how-heading"
          align="center"
          eyebrow="How it works"
          title="Four simple steps"
          intro="In person in Peachtree City or completely online — the process is the same."
        />
        <div className="mt-14">
          <ProcessTimeline steps={steps} />
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/how-it-works" variant="outline-dark" icon="arrow">
            See the full process
          </ButtonLink>
        </div>
      </Section>

      <Section tone="paper" labelledBy="areas-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="areas-heading"
              eyebrow="Areas we serve"
              title="Local to Fayette & Coweta County"
              intro="Meet us in person in Peachtree City, or work with us fully online from anywhere in Georgia."
            />
            <CityChips className="mt-8" />
            <ButtonLink href="/areas-we-serve" variant="outline-dark" icon="arrow" className="mt-8">
              All areas we serve
            </ButtonLink>
          </div>
          <ServiceAreaMap />
        </div>
      </Section>

      <Section tone="white" labelledBy="meet-kai-heading">
        <MeetKai headingId="meet-kai-heading" />
      </Section>

      <Section tone="paper" labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="faq-heading" eyebrow="FAQ" title="Quick answers" />
            <ButtonLink href="/faq" variant="outline-dark" icon="arrow" className="mt-8">
              All frequently asked questions
            </ButtonLink>
          </div>
          <FaqAccordion items={faqs.homePreview} />
        </div>
      </Section>
    </>
  );
}
