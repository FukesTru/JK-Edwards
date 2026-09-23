import { HeartPulse, Scale, TrendingDown } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EbookOffer } from "@/components/sections/EbookOffer";
import { IconGrid } from "@/components/sections/IconGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { industryJsonLd, industryMetadata } from "@/lib/page-helpers";

export const metadata = industryMetadata("healthcare");

const pressures = [
  {
    Icon: HeartPulse,
    title: "Rising costs",
    text: "Staffing, supplies, rent and technology costs keep climbing while patient volume only stretches so far.",
  },
  {
    Icon: Scale,
    title: "Healthcare reform",
    text: "Shifting rules and payment models change how — and how quickly — your practice gets paid.",
  },
  {
    Icon: TrendingDown,
    title: "Falling reimbursements",
    text: "Lower payer reimbursements squeeze margins unless you see the trend early and adjust.",
  },
];

export default function HealthcarePage() {
  return (
    <>
      <JsonLd data={industryJsonLd("healthcare", "Accounting and tax services for healthcare practices")} />
      <PageHero
        eyebrow="Industries · Healthcare"
        title="Accounting & Tax for Healthcare Practices"
        subtitle="Monthly financials with plain-English feedback, practice-specific tax planning and payroll for clinical staff — so you can focus on patients."
        image="industry-healthcare"
      />
      <Breadcrumbs
        items={[
          { name: "Industries", path: "/industries" },
          { name: "Healthcare Practices", path: "/industries/healthcare" },
        ]}
      />

      <Section tone="white" labelledBy="hc-intro">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="hc-intro"
              eyebrow="For independent practices"
              title="Protect your margins in a changing industry"
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
              <p>
                Running an independent medical, dental or therapy practice means being a clinician and a business owner
                at the same time. Costs rise, reimbursement rules change and the numbers that matter are buried in
                billing reports and bank statements.
              </p>
              <p>
                We give practice owners a clear monthly picture of how the practice is performing — with plain-English
                feedback on what changed and why — and plan taxes around the way healthcare owners are actually paid.
                From payroll for providers and staff to entity and retirement planning, we handle the financial side so
                you can spend your time with patients.
              </p>
            </div>
            <ButtonLink href="/contact" className="mt-8">
              Schedule a Practice Review
            </ButtonLink>
          </div>
          <Stagger className="grid gap-4 self-start">
            {pressures.map(({ Icon, title, text }) => (
              <StaggerItem key={title} className="flex gap-4 rounded-2xl border border-line bg-paper p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-accent shadow-sm">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-charcoal">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="paper" labelledBy="hc-services">
        <SectionHeading id="hc-services" eyebrow="How we help" title="Financial support built for practices" />
        <div className="mt-12">
          <IconGrid
            columns={3}
            items={[
              {
                icon: "FileText",
                title: "Monthly financials",
                description: "Statements every month with plain-English feedback on what changed and why.",
              },
              {
                icon: "ReceiptText",
                title: "Practice-specific tax planning",
                description: "Owner compensation, equipment purchases and year-end moves, planned in advance.",
              },
              {
                icon: "Users",
                title: "Payroll for clinical staff",
                description: "Providers, nurses and front-office staff paid accurately and on time.",
              },
              {
                icon: "Gauge",
                title: "KPI tracking",
                description: "Revenue per provider, collections and overhead ratios you can act on.",
              },
              {
                icon: "Building2",
                title: "Entity & ownership planning",
                description: "Professional corporations, PLLCs and S corp elections reviewed regularly.",
              },
              {
                icon: "PiggyBank",
                title: "Retirement plans",
                description: "Plans that reward owners and help you keep great staff.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="dark" labelledBy="hc-ebook">
        <EbookOffer
          id="hc-ebook"
          title="Download the Healthcare Practice eBook"
          ebookName="Healthcare Practice eBook"
          intro="A guide to the financial habits that keep independent practices profitable."
          bullets={[
            "The KPIs every practice owner should track",
            "How to plan taxes around owner compensation",
            "Ways to protect margins as reimbursements change",
          ]}
        />
      </Section>

      <Section tone="white" labelledBy="hc-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="hc-faq"
            eyebrow="FAQ"
            title="Healthcare practice questions"
            intro="What practice owners ask before working with us."
          />
          <FaqAccordion items={faqs.healthcare} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            {
              label: "Business Advisory / CFO",
              href: "/services/business-advisory",
              description: "Budgets, KPIs and forecasts for your practice.",
              icon: "TrendingUp",
            },
            {
              label: "Payroll Services",
              href: "/services/payroll",
              description: "Payroll for providers and staff, with every filing handled.",
              icon: "HandCoins",
            },
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Reconciled books and monthly statements you can trust.",
              icon: "BookOpenCheck",
            },
          ]}
        />
      </Section>
    </>
  );
}
