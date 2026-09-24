import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconGrid } from "@/components/sections/IconGrid";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TaxPrepSubpage } from "@/components/sections/TaxPrepSubpage";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Schedule C Tax Preparation Peachtree City",
  description:
    "Schedule C tax preparation in Peachtree City, GA for freelancers, gig workers and contractors: CPA-signed, EA-reviewed, every expense captured. Start today.",
  path: "/tax-preparation/self-employed",
});

export default function SelfEmployedPage() {
  return (
    <TaxPrepSubpage
      slug="self-employed"
      title="Self-Employed & Side-Business Tax Returns (Schedule C)"
      subtitle="Freelance, gig and small-business income reported correctly — with every legitimate expense captured."
      serviceDescription="Schedule C preparation for self-employed, freelance and side-business income, prepared and signed by a CPA and reviewed by an Enrolled Agent."
      calloutText="Schedule C is part of every return we prepare — whether it’s a full-time business or a side hustle alongside your W-2 job."
      faqs={faqs.selfEmployed}
      faqTitle="Self-employed questions"
      related={[
        {
          label: "Tax Preparation",
          href: "/tax-preparation",
          description: "What every return includes.",
          icon: "FileText",
        },
        {
          label: "Tax Resolution",
          href: "/tax-resolution",
          description: "Behind on taxes from past self-employment? We can help.",
          icon: "ShieldCheck",
        },
        {
          label: "Get Started",
          href: "/get-started",
          description: "Book your Schedule C return.",
          icon: "CalendarCheck",
        },
      ]}
    >
      <Section tone="white" labelledBy="who-sch-c">
        <SplitFeature image="tradesperson" imageClassName="object-[65%_60%]">
          <SectionHeading
            id="who-sch-c"
            eyebrow="Who it’s for"
            title="If you work for yourself, this is your schedule"
          />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Schedule C reports income and expenses for sole proprietors and single-member LLCs — whether it’s your
            full-time living or a few gigs on the side. We regularly prepare returns for:
          </p>
          <CheckList
            className="mt-6"
            columns={2}
            items={[
              "Freelancers",
              "Gig and app workers",
              "Independent contractors",
              "Consultants",
              "Home-based businesses",
              "Tradespeople",
            ]}
          />
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="sch-c-topics">
        <SectionHeading
          id="sch-c-topics"
          eyebrow="What we handle"
          title="Everything that goes into a Schedule C"
          intro="Rates and thresholds change by tax year; we apply the current rules to your return."
        />
        <div className="mt-12">
          <IconGrid
            items={[
              {
                icon: "Receipt",
                title: "Business income & expenses",
                description:
                  "Sales, fees and 1099 income, less the ordinary and necessary costs of running your business.",
              },
              {
                icon: "House",
                title: "Home office",
                description:
                  "Space used regularly and exclusively for business, using the simplified method or actual expenses.",
              },
              {
                icon: "Car",
                title: "Vehicle & mileage",
                description:
                  "Business miles at the IRS standard mileage rate or actual vehicle costs — backed by a mileage log.",
              },
              {
                icon: "Calculator",
                title: "Self-employment tax",
                description:
                  "Social Security and Medicare tax on your net earnings, with the deductible portion applied.",
              },
              {
                icon: "CalendarCheck",
                title: "Quarterly estimated payments",
                description: "What to pay and when, generally in April, June, September and January.",
              },
              {
                icon: "FileText",
                title: "1099-NEC & 1099-K",
                description:
                  "Client and payment-platform forms reconciled with your own records so nothing is double-counted.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="records-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="records-heading"
            eyebrow="Record-keeping tips"
            title="Make next year easier"
            intro="Good records are the difference between a deduction you can claim and one you have to leave behind."
          />
          <CheckList
            items={[
              "Keep a separate bank account or card for business income and expenses",
              "Save receipts digitally as you go — a photo is fine",
              "Log business miles with the date, destination and purpose",
              "Track 1099-NEC and 1099-K forms against your own income records",
              "Set aside a percentage of each payment for taxes",
              "Measure your home office and note what it’s used for",
            ]}
          />
        </div>
      </Section>
    </TaxPrepSubpage>
  );
}
