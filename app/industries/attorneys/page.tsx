import { CheckList } from "@/components/sections/CheckList";
import { Callout } from "@/components/sections/Callout";
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

export const metadata = industryMetadata("attorneys");

export default function AttorneysPage() {
  return (
    <>
      <JsonLd data={industryJsonLd("attorneys", "Accounting and tax services for attorneys and law firms")} />
      <PageHero
        eyebrow="Industries · Attorneys & law firms"
        title="Accounting & Tax Services for Attorneys and Law Firms"
        subtitle="Trust account support, partner distributions, cash-flow planning and tax strategy for solo practitioners and growing firms."
        image="industry-attorneys"
      />
      <Breadcrumbs
        items={[
          { name: "Industries", path: "/industries" },
          { name: "Attorneys & Law Firms", path: "/industries/attorneys" },
        ]}
      />

      <Section tone="white" labelledBy="law-intro">
        <SplitFeature image="contact" imageSide="right">
          <SectionHeading id="law-intro" eyebrow="For legal practices" title="Financial clarity for your practice" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              Law firms have financial requirements most businesses never face: client funds held in trust, revenue
              that arrives in unpredictable bursts on contingency matters and partners who each need to understand
              their share. Getting it wrong isn’t just a bookkeeping problem — it can become an ethics problem.
            </p>
            <p>
              We support solo attorneys and small firms with organized books, monthly trust account reconciliation
              support, partner compensation planning and tax strategy for high-earning owners. You get clean numbers,
              predictable cash flow and a team that understands how a practice actually runs.
            </p>
          </div>
          <CheckList
            className="mt-7"
            items={[
              "Operating and trust accounts kept separate and reconciled",
              "Cash-flow forecasts built around case timelines",
              "Tax planning for partners and owners",
            ]}
          />
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="law-topics">
        <SectionHeading id="law-topics" eyebrow="What we cover" title="Accounting built around how firms work" />
        <div className="mt-12">
          <IconGrid
            columns={3}
            items={[
              {
                icon: "Scale",
                title: "Trust / IOLTA reconciliation support",
                description: "Monthly three-way reconciliation of bank, trust ledger and client ledgers.",
              },
              {
                icon: "Users",
                title: "Partner compensation & distributions",
                description: "Draws, guaranteed payments and distributions that match your agreement.",
              },
              {
                icon: "Building2",
                title: "PLLC & S corp structure",
                description: "Entity reviews and S corp elections when the numbers support them.",
              },
              {
                icon: "ChartLine",
                title: "Cash flow for contingency practices",
                description: "Forecasts and reserves that bridge the time between settlements.",
              },
              {
                icon: "HandCoins",
                title: "Payroll",
                description: "Attorneys, paralegals and staff paid correctly with every filing handled.",
              },
              {
                icon: "ReceiptText",
                title: "Tax planning for high earners",
                description: "Estimated taxes, retirement contributions and year-end strategy for partners.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="white">
        <Callout kind="info" title="We support your trust accounting — you stay in control">
          We help keep trust records organized and reconciled every month so they’re review-ready. Your firm remains
          responsible for complying with the State Bar of Georgia’s trust accounting rules, and we coordinate with you
          and your counsel on any compliance questions.
        </Callout>
      </Section>

      <Section tone="paper" labelledBy="law-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="law-faq"
            eyebrow="FAQ"
            title="Questions from attorneys"
            intro="How we work with solo practitioners and firms."
          />
          <FaqAccordion items={faqs.attorneys} />
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks
          links={[
            {
              label: "Business Advisory / CFO",
              href: "/services/business-advisory",
              description: "Forecasts and KPIs for a more predictable practice.",
              icon: "TrendingUp",
            },
            {
              label: "Tax Preparation & Planning",
              href: "/services/tax-preparation-planning",
              description: "Firm and partner returns with year-round planning.",
              icon: "ReceiptText",
            },
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Operating accounts reconciled and reported every month.",
              icon: "BookOpenCheck",
            },
          ]}
        />
      </Section>
    </>
  );
}
