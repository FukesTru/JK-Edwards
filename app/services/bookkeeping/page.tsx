import { Callout } from "@/components/sections/Callout";
import { IconGrid } from "@/components/sections/IconGrid";
import { PackagesTable } from "@/components/sections/PackagesTable";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { serviceJsonLd, serviceMetadata } from "@/lib/page-helpers";

export const metadata = serviceMetadata("bookkeeping");

export default function BookkeepingPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd("bookkeeping")} />
      <PageHero
        eyebrow="Tax & compliance"
        title="Bookkeeping & Outsourced Accounting Services"
        subtitle="You run your business. We’ll run your numbers — reconciled, categorized and reported every month for a fixed fee."
        image="service-bookkeeping"
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: "Bookkeeping", path: "/services/bookkeeping" },
        ]}
      />

      <Section tone="white" labelledBy="bk-intro">
        <SplitFeature image="service-quickbooks" imageSide="left">
          <SectionHeading id="bk-intro" eyebrow="Monthly bookkeeping" title="Accurate books, every single month" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              Bookkeeping is the foundation of every good financial decision — and it’s the first thing to slip when
              you’re busy running a business. We keep your books current and accurate every month: reconciling each
              bank and credit card account, categorizing transactions correctly and turning the results into
              financial statements you can actually read.
            </p>
            <p>
              We work in QuickBooks Online or Xero, capture receipts with Dext and manage bills through Bill.com, so
              your paper trail stays organized and searchable. You’ll always know where your business stands — and at
              tax time, your return starts from clean, reconciled numbers instead of a scramble.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Get a Free Quote</ButtonLink>
            <ButtonLink href="#packages" variant="outline-dark">
              See packages
            </ButtonLink>
          </div>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="bk-included">
        <SectionHeading
          id="bk-included"
          eyebrow="What’s included"
          title="Everything your books need — nothing you have to chase"
        />
        <div className="mt-12">
          <IconGrid
            columns={4}
            items={[
              {
                icon: "RefreshCw",
                title: "Bank & card reconciliations",
                description: "Every account reconciled monthly so your balances match reality.",
              },
              {
                icon: "Layers",
                title: "Transaction categorization",
                description: "Income and expenses coded correctly for clean reports and easy tax prep.",
              },
              {
                icon: "FileText",
                title: "Monthly financial statements",
                description: "Profit and loss, balance sheet and cash flow — delivered on schedule.",
              },
              {
                icon: "ChartColumnIncreasing",
                title: "Budget reports",
                description: "Budget vs. actual, so you can see where you’re ahead or behind.",
              },
              {
                icon: "Wrench",
                title: "Catch-up & cleanup",
                description: "Months or years behind? We rebuild your books and get you current.",
              },
              {
                icon: "Receipt",
                title: "Accounts payable via Bill.com",
                description: "Approve and pay vendor bills online with a clear audit trail.",
              },
              {
                icon: "ScanLine",
                title: "Receipt capture via Dext",
                description: "Snap a photo and it’s matched to the right transaction automatically.",
              },
              {
                icon: "ClipboardCheck",
                title: "Tax-ready year-end",
                description: "Clean, reconciled books mean faster and more accurate tax returns.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="white">
        <Callout
          kind="tip"
          title="Messy books? Start with a cleanup."
          cta={{ label: "Get a Cleanup Quote", href: "/contact" }}
        >
          Unreconciled accounts, a year of uncategorized transactions, a box of receipts — we’ve seen it all. We’ll
          rebuild your books from bank and card statements, fix past errors and hand you a clean starting point, with
          no judgment.
        </Callout>
      </Section>

      <Section tone="paper" id="packages" labelledBy="bk-packages">
        <SectionHeading
          id="bk-packages"
          align="center"
          eyebrow="Outsourced accounting"
          title="Choose the level of support you need"
          intro="Every package is billed at a fixed monthly fee based on your business. Request a quote and we’ll tailor it to you."
        />
        <div className="mt-16">
          <PackagesTable />
        </div>
      </Section>

      <Section tone="white" labelledBy="bk-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="bk-faq"
            eyebrow="FAQ"
            title="Bookkeeping questions"
            intro="What owners usually ask before handing us their books."
          />
          <FaqAccordion items={faqs.bookkeeping} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            {
              label: "Payroll Services",
              href: "/services/payroll",
              description: "Add payroll runs, tax deposits and W-2s to your monthly service.",
              icon: "HandCoins",
            },
            {
              label: "QuickBooks Consulting",
              href: "/services/quickbooks",
              description: "Setup, cleanup, training and Desktop-to-Online migration.",
              icon: "LaptopMinimalCheck",
            },
            {
              label: "Business Advisory / CFO",
              href: "/services/business-advisory",
              description: "Turn clean books into budgets, forecasts and better decisions.",
              icon: "TrendingUp",
            },
          ]}
        />
      </Section>
    </>
  );
}
