import { Briefcase, CalendarClock, House, LaptopMinimalCheck, UserCheck } from "lucide-react";
import { CheckList } from "@/components/sections/CheckList";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { serviceJsonLd, serviceMetadata } from "@/lib/page-helpers";

export const metadata = serviceMetadata("tax-preparation-planning");

const individualItems = [
  "1040 returns for every situation",
  "Multi-state and part-year returns",
  "Dependents, child and education credits",
  "Retirement income, Social Security and RMDs",
  "Rental property income and expenses",
  "Self-employed and 1099 income",
  "Military and government employees",
];

const businessItems = [
  "Sole proprietors (Schedule C)",
  "LLCs and partnerships (Form 1065)",
  "S corporations (Form 1120-S)",
  "C corporations (Form 1120)",
  "Sales tax filings",
  "Quarterly estimated tax payments",
  "Tax projections and planning",
];

const pillars = [
  {
    Icon: UserCheck,
    title: "Personalized",
    text: "A dedicated team that knows your history and your goals — not a different preparer every year.",
  },
  {
    Icon: LaptopMinimalCheck,
    title: "Convenient",
    text: "Upload documents with TaxCaddy, then review and e-sign your finished return online with SafeSend.",
  },
  {
    Icon: CalendarClock,
    title: "Year-round",
    text: "Mid-year check-ins, estimated tax planning and quick answers whenever a tax question comes up.",
  },
];

const steps = [
  {
    title: "Upload documents",
    description: "Send W-2s, 1099s and receipts securely through TaxCaddy from your phone or computer.",
  },
  {
    title: "Review & strategy call",
    description: "We review everything, ask the right questions and look for planning opportunities.",
  },
  {
    title: "Prepare & e-sign",
    description: "We prepare your return and send it through SafeSend so you can review and e-sign online.",
  },
  {
    title: "E-file + plan ahead",
    description: "We e-file federal and state returns, then keep planning with you throughout the year.",
  },
];

export default function TaxPreparationPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd("tax-preparation-planning")} />
      <PageHero
        eyebrow="Tax & compliance"
        title="Tax Preparation & Planning in Hampton, GA"
        subtitle="Personalized, digital and year-round tax help for individuals, families and businesses — in Henry County and nationwide."
        image="service-tax"
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: "Tax Preparation & Planning", path: "/services/tax-preparation-planning" },
        ]}
      />

      <Section tone="white" labelledBy="tax-intro">
        <SplitFeature image="client-center" imageSide="right" aspect="aspect-[4/3]">
          <SectionHeading id="tax-intro" eyebrow="Our approach" title="Tax help that doesn’t end on April 15" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              Most people only think about taxes once a year — when the deadline is close and the options are limited.
              We take a different approach. As your tax team we prepare accurate returns <em>and</em> look ahead:
              estimating what you’ll owe, spotting deductions and credits before the year closes, and helping you weigh
              decisions like buying equipment, changing your business structure or funding a retirement plan with the
              tax impact in view.
            </p>
            <p>
              The process is fully digital and secure. Upload documents through TaxCaddy, meet with us in Hampton, by
              phone or on Zoom, and review and e-sign your finished return online — no printing, mailing or waiting.
            </p>
            <p>
              Whether you file a straightforward W-2 return, juggle dependents and education credits, draw retirement
              income from several sources or own multiple businesses, you’ll work with credentialed professionals —
              including an Enrolled Agent and a CPA — who know your situation and are available all year.
            </p>
          </div>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="tax-who">
        <SectionHeading
          id="tax-who"
          align="center"
          eyebrow="Who we help"
          title="Returns for households and businesses of every shape"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <House aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="font-serif text-2xl font-semibold text-ink">For Individuals &amp; Families</h3>
            </div>
            <CheckList className="mt-6" items={individualItems} />
          </div>
          <div className="rounded-2xl bg-ink p-8 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/20 text-accent-light">
                <Briefcase aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="font-serif text-2xl font-semibold">For Businesses</h3>
            </div>
            <CheckList className="mt-6" tone="dark" items={businessItems} />
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="tax-pillars">
        <SectionHeading id="tax-pillars" eyebrow="Why clients stay" title="Personalized. Convenient. Year-round." />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map(({ Icon, title, text }) => (
            <StaggerItem key={title} className="rounded-2xl border border-line bg-white p-8">
              <Icon aria-hidden className="h-9 w-9 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 leading-relaxed text-charcoal">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="dark" labelledBy="tax-process">
        <SectionHeading
          id="tax-process"
          tone="dark"
          align="center"
          eyebrow="How it works"
          title="From shoebox to e-filed in four steps"
        />
        <div className="mt-14">
          <ProcessTimeline steps={steps} tone="dark" />
        </div>
      </Section>

      <Section tone="paper" labelledBy="tax-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="tax-faq"
            eyebrow="FAQ"
            title="Tax preparation questions"
            intro="Quick answers to what clients ask us most. Don’t see yours? Give us a call."
          />
          <FaqAccordion items={faqs.tax} />
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks
          links={[
            {
              label: "IRS Problem Resolution",
              href: "/services/irs-tax-resolution",
              description: "Behind on filings or facing a notice? We’ll handle the IRS for you.",
              icon: "ShieldCheck",
            },
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Year-round books make tax time faster — and your deductions easier to prove.",
              icon: "BookOpenCheck",
            },
            {
              label: "U.S. Expat Tax",
              href: "/industries/expat-tax",
              description: "Living abroad? File correctly and avoid double taxation.",
              icon: "Globe",
            },
            {
              label: "Client Center",
              href: "/client-center",
              description: "TaxCaddy, refund trackers, secure messaging and online bill pay.",
              icon: "LayoutDashboard",
            },
          ]}
        />
      </Section>
    </>
  );
}
