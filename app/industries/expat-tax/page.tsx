import { Callout } from "@/components/sections/Callout";
import { CheckList } from "@/components/sections/CheckList";
import { IconGrid } from "@/components/sections/IconGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
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

export const metadata = industryMetadata("expat-tax");

export default function ExpatTaxPage() {
  return (
    <>
      <JsonLd data={industryJsonLd("expat-tax", "U.S. expatriate tax preparation")} />
      <PageHero
        eyebrow="Industries · U.S. expats"
        title="U.S. Expat Tax Preparation for Americans Living Abroad"
        subtitle="Annual U.S. returns, the Foreign Earned Income Exclusion, foreign tax credits, FBAR and FATCA — handled fully online, wherever you live."
        image="industry-expats"
      />
      <Breadcrumbs
        items={[
          { name: "Industries", path: "/industries" },
          { name: "U.S. Expats & Workers Abroad", path: "/industries/expat-tax" },
        ]}
      />

      <Section tone="white" labelledBy="expat-intro">
        <SplitFeature image="blog-expat" imageSide="left">
          <SectionHeading
            id="expat-intro"
            eyebrow="Americans abroad"
            title="Living abroad doesn’t end your U.S. tax obligations"
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              The United States taxes its citizens and green card holders on their worldwide income, no matter where
              they live. If your income is above the filing threshold for your filing status and age — generally the
              same thresholds that apply at home — you still need to file a U.S. return each year, even if you won’t owe
              anything after exclusions and credits.
            </p>
            <p>
              Done right, most expats owe little or no U.S. tax. The Foreign Earned Income Exclusion and the Foreign Tax
              Credit are designed to prevent double taxation, but you have to claim them. There are also separate
              reporting rules for foreign bank accounts (FBAR) and foreign assets (FATCA) that carry steep penalties if
              they’re missed. We handle it all remotely — secure uploads, video meetings and e-signatures — in your time
              zone’s working hours whenever possible.
            </p>
          </div>
          <CheckList
            className="mt-7"
            items={[
              "Automatic two-month extension to June 15 for filers living abroad",
              "FEIE vs. Foreign Tax Credit comparison every year",
              "FBAR and Form 8938 reporting handled with your return",
            ]}
          />
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="expat-topics">
        <SectionHeading id="expat-topics" eyebrow="What we handle" title="Everything Americans abroad need to file" />
        <div className="mt-12">
          <IconGrid
            columns={3}
            items={[
              { icon: "FileText", title: "Annual U.S. returns", description: "Form 1040 prepared for your situation abroad." },
              {
                icon: "Globe",
                title: "Foreign Earned Income Exclusion",
                description: "Bona fide residence or physical presence tests and Form 2555.",
              },
              {
                icon: "Landmark",
                title: "Foreign Tax Credit",
                description: "Credit for taxes paid abroad to avoid double taxation (Form 1116).",
              },
              {
                icon: "Banknote",
                title: "FBAR (FinCEN 114)",
                description: "Required when foreign accounts total more than $10,000 at any point in the year.",
              },
              {
                icon: "ShieldCheck",
                title: "FATCA Form 8938",
                description: "Reporting of specified foreign financial assets above the thresholds.",
              },
              {
                icon: "House",
                title: "State residency questions",
                description: "Whether your former state still expects a return.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="white">
        <Callout
          kind="warning"
          title="Are you behind on U.S. filings?"
          cta={{ label: "Get Caught Up", href: "/services/irs-tax-resolution" }}
        >
          You’re not alone — many Americans abroad don’t realize they still need to file. If your failure to file was
          non-willful, the IRS Streamlined Filing Compliance Procedures may let you catch up on missed returns and FBARs
          with reduced or no penalties. We’ll review your situation and recommend the right path.
        </Callout>
      </Section>

      <Section tone="dark" labelledBy="expat-process">
        <SectionHeading
          id="expat-process"
          tone="dark"
          align="center"
          eyebrow="Fully remote"
          title="How it works from anywhere in the world"
        />
        <div className="mt-14">
          <ProcessTimeline
            tone="dark"
            steps={[
              { title: "Video consultation", description: "We meet by Zoom at a time that works in your time zone." },
              { title: "Secure upload", description: "Send foreign and U.S. documents through our encrypted portal." },
              { title: "Review & e-sign", description: "We prepare your return, FBAR and forms for online review and signature." },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper" labelledBy="expat-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="expat-faq"
            eyebrow="FAQ"
            title="Expat tax questions"
            intro="The questions Americans abroad ask us most."
          />
          <FaqAccordion items={faqs.expat} />
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks
          links={[
            {
              label: "Tax Preparation & Planning",
              href: "/services/tax-preparation-planning",
              description: "Year-round U.S. tax planning, wherever you live.",
              icon: "ReceiptText",
            },
            {
              label: "IRS Problem Resolution",
              href: "/services/irs-tax-resolution",
              description: "Behind on filings or FBARs? We’ll help you catch up.",
              icon: "ShieldCheck",
            },
            {
              label: "Contact Us",
              href: "/contact",
              description: "Book a video consultation from anywhere in the world.",
              icon: "MessagesSquare",
            },
          ]}
        />
      </Section>
    </>
  );
}
