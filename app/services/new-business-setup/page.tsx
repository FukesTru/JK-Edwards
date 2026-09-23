import { CreditCard, Landmark, LaptopMinimalCheck, PiggyBank } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { StartupChecklist } from "@/components/sections/StartupChecklist";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { serviceJsonLd, serviceMetadata } from "@/lib/page-helpers";

export const metadata = serviceMetadata("new-business-setup");

const blocks = [
  {
    Icon: Landmark,
    title: "Entity type analysis",
    text: "LLC, S corporation or C corporation? We model the tax and legal trade-offs for your situation, then handle the state and federal filings — including a timely S corp election if it makes sense.",
    points: ["LLC vs. S corp vs. C corp comparison", "Georgia formation & registrations", "IRS elections and EIN"],
  },
  {
    Icon: LaptopMinimalCheck,
    title: "Accounting system setup",
    text: "Books that are right from the first transaction: QuickBooks Online configured for your industry, bank feeds connected and a simple routine you can keep.",
    points: [
      "Chart of accounts built for your business",
      "Bank, card and payment connections",
      "Receipt capture and bill pay workflow",
    ],
  },
  {
    Icon: PiggyBank,
    title: "Retirement plan analysis",
    text: "Find the plan that builds wealth for you and your employees without breaking the bank — and captures the tax deductions that come with it.",
    points: [
      "SEP-IRA, SIMPLE IRA, Solo & traditional 401(k)",
      "Owner and employee contribution modeling",
      "Deadlines and setup coordination",
    ],
  },
  {
    Icon: CreditCard,
    title: "Credit card rewards strategy",
    text: "Your business already spends money — make it earn something back. We review your spending and suggest cards and habits that turn expenses into cash back or travel.",
    points: ["Spending pattern review", "Card selection guidance", "Clean categorization in your books"],
  },
];

export default function NewBusinessSetupPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd("new-business-setup")} />
      <PageHero
        eyebrow="Advisory & setup"
        title="New Business Setup: Start Right From Day One"
        subtitle="No business owner should have to go it alone. We help you choose the right structure, set up your systems and plan for the future — before small mistakes become expensive ones."
        image="service-new-business"
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: "New Business Setup", path: "/services/new-business-setup" },
        ]}
      />

      <Section tone="white" labelledBy="nb-intro">
        <SplitFeature image="blog-llc-s-corp" imageSide="right">
          <SectionHeading
            id="nb-intro"
            eyebrow="Build the foundation"
            title="The decisions you make now pay off for years"
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              Starting a business means a hundred decisions at once — and a handful of them have tax and legal
              consequences that are hard to undo. Choosing the wrong entity, mixing personal and business money or
              setting up your books incorrectly can cost you for years.
            </p>
            <p>
              We walk new owners through every step: comparing entity types, registering with Georgia and the IRS,
              setting up accounting and payroll, and choosing a retirement plan. You’ll leave with a clean foundation, a
              clear calendar of deadlines and a team to call when questions come up.
            </p>
          </div>
          <ButtonLink href="/contact" className="mt-8">
            Plan My Startup
          </ButtonLink>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="nb-blocks">
        <SectionHeading
          id="nb-blocks"
          eyebrow="Business foundation services"
          title="Four things we get right with you"
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {blocks.map(({ Icon, title, text, points }) => (
            <StaggerItem key={title} className="flex flex-col rounded-2xl border border-line bg-white p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 leading-relaxed text-charcoal">{text}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-[15px] text-ink">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="dark" labelledBy="nb-checklist">
        <SectionHeading
          id="nb-checklist"
          tone="dark"
          eyebrow="Startup checklist"
          title="Your Georgia startup checklist"
          intro="The essentials for most new Georgia businesses. We’ll help you check off every one — in the right order."
        />
        <div className="mt-12">
          <StartupChecklist />
        </div>
      </Section>

      <Section tone="white" labelledBy="nb-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="nb-faq"
            eyebrow="FAQ"
            title="New business questions"
            intro="What new owners ask us most before they launch."
          />
          <FaqAccordion items={faqs.newBusiness} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            {
              label: "QuickBooks Consulting",
              href: "/services/quickbooks",
              description: "Set up QuickBooks the right way from the very first transaction.",
              icon: "LaptopMinimalCheck",
            },
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Hand off your monthly books from day one.",
              icon: "BookOpenCheck",
            },
            {
              label: "Tax Preparation & Planning",
              href: "/services/tax-preparation-planning",
              description: "Estimated taxes and planning for your first year and beyond.",
              icon: "ReceiptText",
            },
          ]}
        />
      </Section>
    </>
  );
}
