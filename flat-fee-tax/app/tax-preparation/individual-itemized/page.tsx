import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { IconGrid } from "@/components/sections/IconGrid";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TaxPrepSubpage } from "@/components/sections/TaxPrepSubpage";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { prices } from "@/lib/site";

export const metadata = buildMetadata({
  title: "1040 & Schedule A Itemized Deductions",
  description: `Form 1040 and Schedule A itemized deductions preparer in Peachtree City, GA: flat ${prices.taxPrep}, CPA-signed and EA-reviewed. We compare itemizing vs. standard. Book now.`,
  path: "/tax-preparation/individual-itemized",
});

export default function IndividualItemizedPage() {
  return (
    <TaxPrepSubpage
      slug="individual-itemized"
      title="Individual Tax Returns & Itemized Deductions (Form 1040 + Schedule A)"
      subtitle="We prepare your 1040 and run the numbers both ways — itemized and standard — so you claim whichever saves you more."
      serviceDescription={`Individual Form 1040 preparation with Schedule A itemized deductions for a flat ${prices.taxPrep}, prepared and signed by a CPA and reviewed by an Enrolled Agent.`}
      calloutText="Itemizing doesn’t cost more. Schedule A is part of every return we prepare — even if the standard deduction ends up winning."
      faqs={faqs.individual}
      faqTitle="Itemizing questions"
      related={[
        {
          label: "Tax Preparation",
          href: "/tax-preparation",
          description: `Everything in the flat ${prices.taxPrep} return.`,
          icon: "FileText",
        },
        {
          label: "Rental Property (Sch E)",
          href: "/tax-preparation/rental-property",
          description: "Own a rental? It’s included too.",
          icon: "House",
        },
        { label: "Pricing", href: "/pricing", description: "Flat fees, quoted upfront.", icon: "Tag" },
      ]}
    >
      <Section tone="white" labelledBy="standard-vs-itemized">
        <SplitFeature image="kitchen-couple" imageSide="right">
          <SectionHeading
            id="standard-vs-itemized"
            eyebrow="Standard vs. itemized"
            title="Two ways to deduct — you get the bigger one"
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Every year, you can subtract either the <strong className="text-ink">standard deduction</strong> — a fixed
              amount set by law for your filing status and adjusted for inflation — or your{" "}
              <strong className="text-ink">itemized deductions</strong>, the actual total of certain expenses you paid.
            </p>
            <p>
              Itemizing on Schedule A only helps when those expenses add up to more than your standard deduction. For
              many homeowners and generous givers they do; for others they don’t. The limits change with tax law, so we
              apply the rules for the year you’re filing and show you which choice comes out ahead.
            </p>
          </div>
          <CheckList
            className="mt-7"
            items={[
              "We total your itemized deductions",
              "We compare them with your standard deduction",
              "You get whichever lowers your tax more",
            ]}
          />
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="schedule-a-items">
        <SectionHeading
          id="schedule-a-items"
          eyebrow="Schedule A"
          title="Common itemized deductions"
          intro="Limits and thresholds change by tax year, so we describe them generally here and apply the exact numbers to your return."
        />
        <div className="mt-12">
          <IconGrid
            columns={2}
            items={[
              {
                icon: "House",
                title: "Mortgage interest",
                description:
                  "Interest on a mortgage for your main home or a second home, reported on Form 1098, subject to loan limits.",
              },
              {
                icon: "Landmark",
                title: "Property and state taxes",
                description:
                  "Property taxes plus state income or sales taxes, up to the state and local tax (SALT) limit in effect for the year.",
              },
              {
                icon: "HandCoins",
                title: "Charitable giving",
                description:
                  "Cash and property donations to qualified charities, with receipts or acknowledgment letters.",
              },
              {
                icon: "ClipboardCheck",
                title: "Medical expenses",
                description: "Qualifying out-of-pocket medical and dental costs above a percentage of your income.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="itemize-tips">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="itemize-tips"
            eyebrow="Getting the most from Schedule A"
            title="What we look at for you"
            intro="A few minutes of the right questions can change the answer."
          />
          <CheckList
            items={[
              "Whether a new home purchase, refinance or large gift changes the itemize-vs-standard decision this year",
              "Timing charitable gifts — some households benefit from grouping donations into alternate years",
              "State and local taxes paid through withholding, estimates and property tax bills",
              "Medical costs that are easy to forget, such as mileage to appointments and certain insurance premiums",
              "Married couples: whether your filing status changes the math",
            ]}
          />
        </div>
      </Section>
    </TaxPrepSubpage>
  );
}
