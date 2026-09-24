import { CheckList } from "@/components/ui/CheckList";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconGrid } from "@/components/sections/IconGrid";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TaxPrepSubpage } from "@/components/sections/TaxPrepSubpage";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "K-1 and 1099-B Tax Preparation",
  description:
    "K-1 and 1099-B tax preparation in Georgia: capital gains, cost basis, crypto and pass-through income, CPA-signed and EA-reviewed in Peachtree City. Get started.",
  path: "/tax-preparation/investments-k1",
});

export default function InvestmentsK1Page() {
  const claim = "Most preparers charge extra for K-1s. With us, they’re part of every return.";
  return (
    <TaxPrepSubpage
      slug="investments-k1"
      title="Investment & Pass-Through Income: 1099-B and Schedule K-1"
      subtitle="Stock, fund and crypto sales plus partnership, S-corp and trust K-1s — reported accurately on every return."
      serviceDescription="1099-B capital gains and Schedule K-1 pass-through income preparation, prepared and signed by a CPA and reviewed by an Enrolled Agent."
      calloutTitle={
        site.confirm.k1ClaimConfirmed ? (
          claim
        ) : (
          <>
            {claim}{" "}
            <Placeholder note="Comparative claim — confirm before launch, then set confirm.k1ClaimConfirmed">
              [CLIENT TO CONFIRM this claim before launch]
            </Placeholder>
          </>
        )
      }
      calloutText="Brokerage 1099-Bs and Schedule K-1s are reported accurately, with cost basis checked on every sale."
      faqs={faqs.investments}
      faqTitle="Investment & K-1 questions"
      related={[
        {
          label: "Tax Preparation",
          href: "/tax-preparation",
          description: "What every return includes.",
          icon: "FileText",
        },
        { label: "Pricing", href: "/pricing", description: "Flat fees, quoted upfront.", icon: "Tag" },
        {
          label: "Rental Property (Sch E)",
          href: "/tax-preparation/rental-property",
          description: "K-1 and rental income both flow through Schedule E.",
          icon: "House",
        },
      ]}
    >
      <Section tone="white" labelledBy="invest-intro">
        <SplitFeature image="investor-reading" imageSide="right">
          <SectionHeading id="invest-intro" eyebrow="Investors & partners" title="The forms that usually cost extra" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              A brokerage 1099-B can run dozens of pages, and a K-1 from a partnership or S corporation can arrive long
              after your W-2s. They’re also where errors hide: missing cost basis, wash-sale adjustments and
              pass-through items that land on several different lines of your return.
            </p>
            <p>
              We work through every sale and every K-1 box, reconcile them with your statements and flag anything that
              doesn’t look right — then an Enrolled Agent reviews it all again before filing.
            </p>
          </div>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="invest-topics">
        <SectionHeading
          id="invest-topics"
          eyebrow="What we handle"
          title="1099-B and K-1 essentials"
          intro="General information — how each item is taxed depends on your holdings and the rules for the year."
        />
        <div className="mt-12">
          <IconGrid
            items={[
              {
                icon: "ChartLine",
                title: "Capital gains & losses",
                description: "Short- and long-term gains and losses from stocks, funds and other investments.",
              },
              {
                icon: "Calculator",
                title: "Cost basis",
                description:
                  "What you paid, adjusted for reinvested dividends and other events — checked on every sale.",
              },
              {
                icon: "Ban",
                title: "Wash sales",
                description:
                  "Losses on sales followed by a repurchase within 30 days may be deferred; we report them correctly.",
              },
              {
                icon: "Coins",
                title: "Crypto reporting",
                description:
                  "Sales and exchanges of digital assets, whether reported on Form 1099-B, 1099-DA or your own records.",
              },
              {
                icon: "Users",
                title: "K-1s from partnerships, S-corps & trusts",
                description: "Pass-through income, deductions and credits carried to the right places on your return.",
              },
              {
                icon: "FileClock",
                title: "Late K-1s & extensions",
                description:
                  "When a K-1 arrives late, an extension gives time to file correctly — we estimate any payment due.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="invest-records">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="invest-records"
            eyebrow="Documents"
            title="What to send us"
            intro="Upload everything through our secure portal — never by email."
          />
          <CheckList
            items={[
              "Consolidated brokerage 1099 (1099-B, 1099-DIV, 1099-INT)",
              "Crypto exchange tax forms or a full transaction history",
              "Every Schedule K-1 you receive (and a note if one is still coming)",
              "Cost basis records for anything your broker didn’t report",
              "Last year’s return, for capital loss and passive loss carryovers",
            ]}
          />
        </div>
      </Section>
    </TaxPrepSubpage>
  );
}
