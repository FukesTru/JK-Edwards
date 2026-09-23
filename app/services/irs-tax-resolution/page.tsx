import { Clock, FileSignature, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { IrsNoticeForm } from "@/components/forms/IrsNoticeForm";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckList } from "@/components/sections/CheckList";
import { IconGrid } from "@/components/sections/IconGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { serviceJsonLd, serviceMetadata } from "@/lib/page-helpers";

export const metadata = serviceMetadata("irs-tax-resolution");

const benefits = [
  {
    Icon: HeartHandshake,
    title: "Peace of mind",
    text: "If a letter arrives, you forward it to us. We take it from there and keep you informed.",
  },
  {
    Icon: Clock,
    title: "Time savings",
    text: "No hours on hold with the IRS or gathering records alone — we handle the back-and-forth.",
  },
  {
    Icon: Target,
    title: "Stay focused",
    text: "Keep running your business and your life while an experienced team manages the examination.",
  },
];

export default function IrsResolutionPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd("irs-tax-resolution")} />
      <PageHero
        eyebrow="IRS problem resolution"
        title="IRS Problem Resolution & Audit Protection"
        subtitle="Got an IRS letter? Take a breath — we’ll take it from here."
        image="service-irs"
        primaryCta={{ label: "Upload Your IRS Notice", href: "#upload-notice" }}
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: "IRS Problem Resolution", path: "/services/irs-tax-resolution" },
        ]}
      />

      <Section tone="white" labelledBy="irs-intro">
        <SplitFeature image="blog-irs-letter" imageSide="left">
          <SectionHeading id="irs-intro" eyebrow="You’re not alone" title="You don’t have to face the IRS by yourself" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              An IRS notice can make your stomach drop. The good news: most tax problems can be resolved, and you
              don’t have to handle them yourself. Only three kinds of professionals have unlimited rights to represent
              taxpayers before the IRS — CPAs, attorneys and Enrolled Agents — and our team includes both an Enrolled
              Agent and a CPA.
            </p>
            <p>
              Once you sign IRS Form 2848, a power of attorney, we become your voice. We pull your IRS transcripts,
              respond to notices, work with collections and represent you in audits. Most clients never speak with or
              meet the IRS — we handle the calls, letters and deadlines and keep you informed at every step.
            </p>
          </div>
          <CheckList
            className="mt-7"
            items={[
              "Representation with a signed Form 2848 power of attorney",
              "Enrolled Agent and CPA on our team",
              "Federal (IRS) and Georgia Department of Revenue matters",
            ]}
          />
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="irs-issues">
        <SectionHeading
          id="irs-issues"
          eyebrow="Issues we resolve"
          title="Whatever the letter says, there’s a next step"
          intro="From a simple notice to years of unfiled returns, we’ve helped clients through it."
        />
        <div className="mt-12">
          <IconGrid
            columns={4}
            items={[
              { icon: "FileWarning", title: "IRS notices & letters", description: "Balance-due, mismatch and proposed-change notices." },
              { icon: "FileSearch", title: "Unfiled tax returns", description: "Catch up on missing years and stop penalties from growing." },
              { icon: "Landmark", title: "Tax liens & levies", description: "Release levies and address liens on property and accounts." },
              { icon: "Banknote", title: "Wage garnishments", description: "Act quickly to stop or reduce garnishment of your pay." },
              { icon: "ClipboardList", title: "IRS audits", description: "Full representation through examination and appeals." },
              {
                icon: "Users",
                title: "Payroll & employment tax",
                description: "Late deposits, 941 issues and trust fund penalty exposure.",
              },
              {
                icon: "Scroll",
                title: "Improper S corp elections",
                description: "Late or invalid elections, relief requests and cleanup.",
              },
              { icon: "Building2", title: "Georgia DOR notices", description: "Income, withholding and sales tax matters with the state." },
            ]}
          />
        </div>
      </Section>

      <Section tone="dark" labelledBy="audit-protection">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              id="audit-protection"
              tone="dark"
              eyebrow="Audit protection"
              title="If your return is examined, we’re already in your corner"
            />
            <p className="mt-6 text-lg leading-relaxed text-mist">
              Audit protection means representation at the state and federal level — all the way through appeals —
              without scrambling to find help or facing an auditor alone. We handle the correspondence, organize the
              documentation and speak for you, so an exam becomes a process instead of a crisis.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <ShieldCheck aria-hidden className="h-6 w-6 text-accent-light" strokeWidth={1.5} />
              <span className="text-[15px] text-white/90">State &amp; federal representation, up through appeals</span>
            </div>
          </div>
          <Stagger className="grid gap-4">
            {benefits.map(({ Icon, title, text }) => (
              <StaggerItem key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-light">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-mist">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="white" labelledBy="irs-process">
        <SectionHeading
          id="irs-process"
          align="center"
          eyebrow="Our process"
          title="Four steps to resolution"
          intro="A clear path from the day your notice arrives to the day it’s behind you."
        />
        <div className="mt-14">
          <ProcessTimeline
            steps={[
              {
                title: "Review the notice",
                description: "We read the letter, confirm it’s legitimate and note every deadline.",
              },
              {
                title: "POA & transcripts",
                description: "With Form 2848 signed, we pull your IRS transcripts to see the full picture.",
              },
              {
                title: "Build a strategy",
                description: "We compare options — from corrections to payment plans — and recommend the best path.",
              },
              {
                title: "Resolve & stay compliant",
                description: "We close out the issue and set up a plan so it doesn’t happen again.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper" id="upload-notice" labelledBy="upload-heading">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              id="upload-heading"
              eyebrow="Start here"
              title="Upload your IRS notice"
              intro="Send us a copy of the letter and a few details. A member of our resolution team will review it and call you within one business day."
            />
            <div className="mt-8 rounded-2xl border border-line bg-white p-6">
              <p className="flex items-center gap-2.5 font-semibold text-ink">
                <FileSignature aria-hidden className="h-5 w-5 text-accent" strokeWidth={1.5} />
                What happens next
              </p>
              <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-charcoal">
                <li>
                  <span className="font-semibold text-ink">1.</span> We review your notice and note the response
                  deadline.
                </li>
                <li>
                  <span className="font-semibold text-ink">2.</span> We call to walk through your options — no
                  obligation.
                </li>
                <li>
                  <span className="font-semibold text-ink">3.</span> If you’d like our help, we send a power of attorney
                  and get to work.
                </li>
              </ol>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(22,24,27,0.45)] sm:p-9">
            <IrsNoticeForm />
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="irs-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="irs-faq"
            eyebrow="FAQ"
            title="IRS resolution questions"
            intro="Straight answers about representation, audits and collections."
          />
          <FaqAccordion items={faqs.irs} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            {
              label: "Tax Preparation & Planning",
              href: "/services/tax-preparation-planning",
              description: "File accurately and plan ahead so problems don’t start.",
              icon: "ReceiptText",
            },
            {
              label: "Payroll Services",
              href: "/services/payroll",
              description: "Keep payroll deposits and filings on time, every time.",
              icon: "HandCoins",
            },
            {
              label: "Contact Us",
              href: "/contact",
              description: "Talk with our team about your situation — confidentially.",
              icon: "MessagesSquare",
            },
          ]}
        />
      </Section>
    </>
  );
}
