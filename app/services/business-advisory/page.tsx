import { CheckList } from "@/components/sections/CheckList";
import { DashboardMockup } from "@/components/sections/DashboardMockup";
import { IconGrid } from "@/components/sections/IconGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { serviceJsonLd, serviceMetadata } from "@/lib/page-helpers";

export const metadata = serviceMetadata("business-advisory");

export default function BusinessAdvisoryPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd("business-advisory")} />
      <PageHero
        eyebrow="Advisory & setup"
        title="Business Advisory & Fractional CFO Services"
        subtitle="Get the expert guidance of a CFO — at a fraction of the cost."
        image="service-advisory"
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: "Business Advisory / CFO", path: "/services/business-advisory" },
        ]}
      />

      <Section tone="white" labelledBy="advisory-intro">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="advisory-intro"
              eyebrow="Fractional CFO"
              title="Numbers that tell you what to do next"
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
              <p>
                Most small businesses can’t justify a full-time CFO — but every growing business needs CFO-level
                thinking. Our advisory service gives you that perspective on a schedule and budget that fit: regular
                meetings to review your results, forecast what’s ahead and decide where to invest, cut or hire.
              </p>
              <p>
                You’ll get custom reports written in plain English — not a stack of spreadsheets — built around the
                measures that actually drive your business. We connect the dots between your books, your cash and your
                taxes so every decision is made with the full picture.
              </p>
            </div>
            <CheckList
              className="mt-7"
              items={[
                "Monthly or quarterly strategy meetings",
                "Custom reports and dashboards in plain English",
                "Budgets, forecasts and cash-flow planning",
                "Tax projections built into every decision",
              ]}
            />
            <ButtonLink href="/contact" className="mt-8">
              Talk to an Advisor
            </ButtonLink>
          </div>
          <DashboardMockup />
        </div>
      </Section>

      <Section tone="paper" labelledBy="advisory-analysis">
        <SectionHeading
          id="advisory-analysis"
          eyebrow="What we analyze"
          title="Nine lenses on the health of your business"
          intro="Every engagement is tailored, but these are the areas we most often measure, benchmark and improve."
        />
        <div className="mt-12">
          <IconGrid
            columns={3}
            items={[
              { icon: "Calculator", title: "Budgeting", description: "An annual budget you’ll actually use, tracked monthly." },
              { icon: "TrendingUp", title: "Revenue", description: "Trends by month, service line, customer or location." },
              { icon: "Receipt", title: "Expenses", description: "Where the money goes — and where it’s leaking." },
              { icon: "Users", title: "Payroll", description: "Labor cost as a share of revenue, and staffing decisions." },
              { icon: "Coins", title: "Cost of goods sold", description: "True product and job costs to protect your margins." },
              { icon: "CreditCard", title: "Credit card fees", description: "Processing costs that quietly eat into profit." },
              { icon: "ChartLine", title: "Cash flow", description: "13-week and 12-month forecasts so there are no surprises." },
              { icon: "Gauge", title: "Industry KPIs", description: "Benchmarks that show how you compare with your peers." },
              {
                icon: "ChartPie",
                title: "Tax planning & projections",
                description: "Estimated taxes and year-end moves, planned in advance.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="dark" labelledBy="advisory-process">
        <SectionHeading
          id="advisory-process"
          tone="dark"
          align="center"
          eyebrow="How it works"
          title="A rhythm that keeps you ahead"
        />
        <div className="mt-14">
          <ProcessTimeline
            tone="dark"
            steps={[
              { title: "Discovery", description: "We learn your goals, review your books and agree on what to measure." },
              { title: "Build your dashboard", description: "We set up the reports and KPIs that fit your business." },
              { title: "Regular reviews", description: "Monthly or quarterly meetings to review results and forecasts." },
              { title: "Adjust & grow", description: "Clear action items — pricing, hiring, spending — and follow-through." },
            ]}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="advisory-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="advisory-faq"
            eyebrow="FAQ"
            title="Advisory questions"
            intro="How our fractional CFO service works in practice."
          />
          <FaqAccordion items={faqs.advisory} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Reliable monthly books — the foundation of good advice.",
              icon: "BookOpenCheck",
            },
            {
              label: "New Business Setup",
              href: "/services/new-business-setup",
              description: "Start with the right entity, systems and retirement plan.",
              icon: "Rocket",
            },
            {
              label: "Healthcare Practices",
              href: "/industries/healthcare",
              description: "KPI reporting and planning built for medical and dental practices.",
              icon: "Stethoscope",
            },
          ]}
        />
      </Section>
    </>
  );
}
