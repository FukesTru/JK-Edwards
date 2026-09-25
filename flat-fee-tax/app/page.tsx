import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
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
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "CPA-Signed Tax Preparation, Peachtree City",
  description:
    "Tax preparation in Peachtree City, GA: every return is CPA-signed and reviewed by an Enrolled Agent, with Schedules A, C, E, 1099-Bs and K-1s handled. Book now.",
  path: "/",
});

const steps = [
  {
    title: "Book or call",
    description: "Choose a time online or give us a call — we’ll confirm what you need.",
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
      <PageHero
        size="large"
        eyebrow={`Tax preparation & IRS help · ${site.primaryCity}`}
        title={
          <>
            Done Right.
            <br />
            <span className="text-gold">Checked Twice.</span>
          </>
        }
        subtitle="Every return is prepared and signed by a licensed CPA, then reviewed by an Enrolled Agent before it’s filed. Meet us in Peachtree City or work with us from anywhere in Georgia."
        image="cpa-desk"
        imageClassName="opacity-60 object-[70%_center]"
      />

      <Section tone="white" labelledBy="credentials-heading">
        <SectionHeading
          id="credentials-heading"
          align="center"
          eyebrow="Two licensed professionals"
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
            eyebrow="Every return"
            title="What we handle on every return"
            intro="Itemized deductions, self-employment, rentals, investments and K-1s — the forms that make a return complicated are routine for us."
          />
          <ButtonLink
            href="/tax-preparation"
            variant="outline-dark"
            icon="arrow"
            className="shrink-0 self-start lg:self-auto"
          >
            Tax preparation details
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
