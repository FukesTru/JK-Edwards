import { FileSignature, LockKeyhole, Scale } from "lucide-react";
import { NoticeUploadForm } from "@/components/forms/NoticeUploadForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { PriceCard } from "@/components/ui/PriceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconGrid } from "@/components/sections/IconGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { resolutionIssues, resolutionScope } from "@/content/resolution";
import { cta } from "@/lib/cta";
import { buildMetadata, taxResolutionService } from "@/lib/seo";
import { prices, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `IRS Tax Resolution Peachtree City GA, ${prices.taxResolution}`,
  description: `IRS tax resolution in Peachtree City, GA for a flat ${prices.taxResolution}: an Enrolled Agent reviews your notice and handles the IRS for you. CPA-signed returns too. Get help.`,
  path: "/tax-resolution",
});

const steps = [
  { title: "Send us your notice", description: "Upload the letter or call. We read it and explain what it means." },
  {
    title: "POA & transcript review",
    description: "With a signed Form 2848, we pull your IRS transcripts to see the full picture.",
  },
  { title: "Strategy & action", description: "We recommend a plan and communicate with the IRS on your behalf." },
  {
    title: "Resolution & staying compliant",
    description: "We work toward a resolution and help you stay current going forward.",
  },
];

export default function TaxResolutionPage() {
  return (
    <>
      <JsonLd data={taxResolutionService()} />
      <PageHero
        eyebrow={`Tax resolution · Flat ${prices.taxResolution}`}
        title={<>IRS Tax Resolution — Flat {prices.taxResolution}</>}
        subtitle="An IRS letter is stressful. We’ll read it, explain it, and deal with the IRS for you."
        primaryCta={cta.taxResolution}
        aside={
          <div className="mx-auto w-full max-w-md">
            <PriceCard
              service="taxResolution"
              title="Tax Resolution"
              headingLevel="p"
              tagline={
                site.confirm.resolutionScopeConfirmed ? undefined : (
                  <Placeholder note="Owner to confirm the exact scope — then set confirm.resolutionScopeConfirmed">
                    [CLIENT TO CONFIRM SCOPE]
                  </Placeholder>
                )
              }
              features={resolutionScope}
              cta={{ label: "Get Tax Help", href: cta.taxResolution.href }}
              note="Results depend on your facts and IRS decisions."
            />
          </div>
        }
      />
      <Breadcrumbs items={[{ name: "Tax Resolution", path: "/tax-resolution" }]} />

      <Section tone="white" labelledBy="ea-explainer">
        <SplitFeature image="irs-letter" imageSide="right">
          <SectionHeading id="ea-explainer" eyebrow="Representation" title="An Enrolled Agent in your corner" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Enrolled Agents are tax professionals federally licensed by the IRS, with unlimited rights to represent
              taxpayers before it — on notices, audits, collections and appeals.
            </p>
            <p>
              When you sign IRS Form 2848, a power of attorney, {site.owner} can speak and correspond with the IRS on
              your behalf. That means fewer phone calls for you, a professional reading every letter, and a clear plan
              for what happens next.
            </p>
          </div>
          <ul className="mt-7 space-y-3 text-ink">
            <li className="flex gap-3">
              <FileSignature aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" strokeWidth={1.5} />
              Form 2848 power of attorney, prepared with you
            </li>
            <li className="flex gap-3">
              <Scale aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" strokeWidth={1.5} />
              Honest options — never “pennies on the dollar” promises
            </li>
          </ul>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="issues-heading">
        <SectionHeading
          id="issues-heading"
          eyebrow="Issues we help with"
          title="From a single letter to years of unfiled returns"
        />
        <div className="mt-12">
          <IconGrid columns={4} items={resolutionIssues} />
        </div>
      </Section>

      <Section tone="white" labelledBy="resolution-steps">
        <SectionHeading
          id="resolution-steps"
          align="center"
          eyebrow="The process"
          title="Four steps to resolution"
          intro="Every case is different, but the path is always clear."
        />
        <div className="mt-14">
          <ProcessTimeline steps={steps} />
        </div>
      </Section>

      <Section tone="paper" id="upload-notice" labelledBy="upload-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="upload-heading"
              eyebrow="Start here"
              title="Upload your IRS notice"
              intro="Send us a copy of the letter and a few details. We’ll review it and contact you to talk through your options."
            />
            <p className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-muted">
              <LockKeyhole aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy" strokeWidth={1.5} />
              Your upload is sent securely to our team. Please don’t include your full Social Security number.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-9">
            <NoticeUploadForm />
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="resolution-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="resolution-faq" eyebrow="FAQ" title="Tax resolution questions" />
            <p className="mt-6 rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-ink">Results vary.</strong> Outcomes depend on each taxpayer’s
              facts, records and IRS decisions, and are not guaranteed. We never promise to settle for less or to stop
              IRS action by a certain date.
            </p>
          </div>
          <FaqAccordion items={faqs.resolution} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            { label: "Pricing", href: "/pricing", description: "Both flat fees, side by side.", icon: "Tag" },
            {
              label: "Self-Employed (Sch C)",
              href: "/tax-preparation/self-employed",
              description: "Stay current once your back taxes are handled.",
              icon: "Briefcase",
            },
            {
              label: "Get Started",
              href: "/get-started?service=tax-resolution",
              description: `Book your ${prices.taxResolution} tax help.`,
              icon: "CalendarCheck",
            },
          ]}
        />
      </Section>
    </>
  );
}
