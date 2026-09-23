import { Callout } from "@/components/sections/Callout";
import { IconGrid } from "@/components/sections/IconGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
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

export const metadata = serviceMetadata("payroll");

export default function PayrollPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd("payroll")} />
      <PageHero
        eyebrow="Tax & compliance"
        title="Payroll Services for Georgia Small Businesses"
        subtitle="Hand off complex payroll and never miss a filing. We pay your people accurately and keep federal and Georgia agencies happy."
        image="service-payroll"
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: "Payroll", path: "/services/payroll" },
        ]}
      />

      <Section tone="white" labelledBy="payroll-intro">
        <SplitFeature image="blog-payroll" imageSide="right">
          <SectionHeading id="payroll-intro" eyebrow="Payroll, handled" title="Payroll done right, every pay period" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              Payroll looks simple until a deposit is late, a form is filed with the wrong numbers or an employee is
              set up incorrectly — and then it becomes an expensive distraction. We take the day-to-day processing
              off your plate and make sure every federal and Georgia deadline is met.
            </p>
            <p>
              Our team includes a Certified Payroll Specialist who manages your payroll from setup to year-end:
              calculating pay and withholding, running direct deposits, delivering e-paystubs, depositing payroll
              taxes and filing quarterly and annual returns. Whether you have one employee or fifty — and whether you
              use our system, ADP or Gusto — payroll just happens, correctly.
            </p>
          </div>
          <ButtonLink href="/contact" className="mt-8">
            Get a Payroll Quote
          </ButtonLink>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="payroll-included">
        <SectionHeading id="payroll-included" eyebrow="What’s included" title="Complete payroll, start to finish" />
        <div className="mt-12">
          <IconGrid
            columns={4}
            items={[
              { icon: "HandCoins", title: "Payroll runs", description: "Accurate pay, withholding and direct deposit every pay period." },
              {
                icon: "Landmark",
                title: "Federal & Georgia tax deposits",
                description: "Payroll taxes deposited on the right schedule — never late.",
              },
              {
                icon: "FileCheck2",
                title: "Quarterly 941 & state returns",
                description: "Form 941, Georgia withholding and unemployment reports, filed on time.",
              },
              { icon: "FileText", title: "W-2s and 1099s", description: "Year-end forms prepared and filed for employees and contractors." },
              { icon: "Receipt", title: "Employee e-paystubs", description: "Secure online pay stubs employees can access anytime." },
              {
                icon: "PiggyBank",
                title: "Retirement remittance",
                description: "Pension and retirement plan contributions sent where they belong.",
              },
              { icon: "UserCheck", title: "New-hire setup", description: "Onboarding paperwork and new-hire reporting handled correctly." },
              { icon: "Layers", title: "Works with ADP & Gusto", description: "Prefer your current platform? We’ll manage it for you." },
            ]}
          />
        </div>
      </Section>

      <Section tone="white">
        <Callout
          kind="warning"
          title="Payroll penalty warning"
          cta={{ label: "Get Payroll Tax Help", href: "/services/irs-tax-resolution" }}
        >
          The IRS treats unpaid payroll taxes seriously. Late deposits trigger penalties of up to 15%, and owners can
          be held personally liable for unpaid withheld taxes under the Trust Fund Recovery Penalty. Already behind?
          Our IRS resolution team can help you get current and request penalty relief where you qualify.
        </Callout>
      </Section>

      <Section tone="dark" labelledBy="payroll-process">
        <SectionHeading
          id="payroll-process"
          tone="dark"
          align="center"
          eyebrow="How it works"
          title="A smooth switch, then payroll on autopilot"
        />
        <div className="mt-14">
          <ProcessTimeline
            tone="dark"
            steps={[
              {
                title: "Setup & transition",
                description: "We collect employee details, year-to-date records and tax accounts, then set up your payroll.",
              },
              {
                title: "Every pay period",
                description: "You approve hours; we process pay, direct deposits and e-paystubs.",
              },
              {
                title: "Deposits & filings",
                description: "We deposit taxes and file quarterly and year-end forms — on time, every time.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper" labelledBy="payroll-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="payroll-faq"
            eyebrow="FAQ"
            title="Payroll questions"
            intro="The details business owners ask about most."
          />
          <FaqAccordion items={faqs.payroll} />
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks
          links={[
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Pair payroll with monthly books and financial statements.",
              icon: "BookOpenCheck",
            },
            {
              label: "IRS Problem Resolution",
              href: "/services/irs-tax-resolution",
              description: "Resolve payroll tax notices, penalties and back taxes.",
              icon: "ShieldCheck",
            },
            {
              label: "Trucking & Transportation",
              href: "/industries/trucking",
              description: "Driver payroll, 1099 contractors and per diem, done right.",
              icon: "Truck",
            },
          ]}
        />
      </Section>
    </>
  );
}
