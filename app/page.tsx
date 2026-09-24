import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { TeamCard } from "@/components/cards/TeamCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckList } from "@/components/sections/CheckList";
import { ClientCenterStrip } from "@/components/sections/ClientCenterStrip";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { StatsRow } from "@/components/sections/StatsRow";
import { TrustBar } from "@/components/sections/TrustBadges";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts, toSummary } from "@/content/blog/posts";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { getImage } from "@/lib/images";
import { accountingServiceSchema, buildMetadata, websiteSchema } from "@/lib/seo";
import { clientToolCount, team } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Accountant & Tax Prep in Hampton, GA | JK Edwards & Company",
  absoluteTitle: true,
  description:
    "Accountant in Hampton, GA for tax preparation, bookkeeping, payroll and IRS help. Serving Henry County in person and clients nationwide. Book a consultation.",
  path: "/",
});

const trustChips = ["Enrolled Agent & CPA on staff", "QuickBooks ProAdvisor", "Local + virtual"];

const steps = [
  {
    title: "Free consultation",
    description: "Tell us where you are and where you want to go. No cost, no obligation.",
  },
  {
    title: "Custom plan & fixed quote",
    description: "We recommend the right services and give you a clear, fixed price up front.",
  },
  {
    title: "Secure onboarding",
    description: "Connect accounts and upload documents through our encrypted client portals.",
  },
  {
    title: "Year-round support",
    description: "Ongoing service plus quarterly reviews to keep you ahead of taxes and cash flow.",
  },
];

export default function HomePage() {
  const latestPosts = posts.slice(0, 3).map(toSummary);

  return (
    <>
      <JsonLd data={[accountingServiceSchema(), websiteSchema()]} />

      <PageHero
        size="large"
        image="home-hero"
        imageClassName="object-[70%_center] opacity-60"
        eyebrow="Accounting & tax firm · Hampton, Georgia"
        title="Tax, Bookkeeping & Payroll for Hampton, Georgia — and Clients Nationwide"
        subtitle="Year-round tax planning, done-for-you bookkeeping and payroll, and real IRS representation — so you can get back to running your business."
      >
        <ul className="flex flex-wrap gap-2.5" aria-label="Why clients choose us">
          {trustChips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/90 backdrop-blur-sm"
            >
              <BadgeCheck aria-hidden className="h-4 w-4 text-accent-light" strokeWidth={1.75} />
              {chip}
            </li>
          ))}
        </ul>
      </PageHero>

      <TrustBar />

      {/* Services */}
      <Section tone="paper" labelledBy="home-services">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="home-services"
            eyebrow="What we do"
            title="Accounting, tax and advisory — under one roof"
            intro="From your first entity decision to year-end filings, our team handles the numbers so you can focus on the work you love."
          />
          <ButtonLink href="/services" variant="outline-dark" icon="arrow" className="shrink-0 self-start lg:self-auto">
            All services
          </ButtonLink>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-white">
              <div aria-hidden className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative">
                <CalendarCheck aria-hidden className="h-9 w-9 text-accent-light" strokeWidth={1.5} />
                <p className="mt-6 font-serif text-[1.35rem] leading-snug font-semibold">Not sure where to start?</p>
                <p className="mt-3 leading-relaxed text-mist">
                  A free consultation will point you to the right mix of services.
                </p>
              </div>
              <ButtonLink href="/contact" size="sm" className="relative mt-6 w-full py-3">
                Book a Consultation
              </ButtonLink>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Outsourced accounting department */}
      <Section tone="white" labelledBy="home-department">
        <SplitFeature
          image="home-split"
          imageSide="left"
          badge={
            <div className="rounded-xl bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgba(22,24,27,0.45)] ring-1 ring-black/5">
              <p className="text-xs font-semibold tracking-[0.14em] text-charcoal uppercase">One team</p>
              <p className="mt-1 font-serif text-lg font-semibold text-ink">Fixed monthly fee</p>
            </div>
          }
        >
          <SectionHeading
            id="home-department"
            eyebrow="Outsourced accounting"
            title="It’s like having your own accounting department"
            intro="Hiring an in-house bookkeeper, payroll specialist and controller is expensive. With JK Edwards & Company you get the whole team for one predictable monthly fee."
          />
          <CheckList
            className="mt-8"
            items={[
              "Bookkeeping, payroll and bill pay handled by specialists",
              "A fixed monthly fee — no surprise hourly bills",
              "Secure online workflow: snap receipts, approve bills, e-sign returns",
              "A real-time view of your numbers with plain-English monthly reports",
            ]}
          />
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/services/bookkeeping">Explore bookkeeping</ButtonLink>
            <ButtonLink href="/services#packages" variant="outline-dark">
              Compare packages
            </ButtonLink>
          </div>
        </SplitFeature>
      </Section>

      {/* Industries */}
      <Section tone="dark" labelledBy="home-industries">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="home-industries"
            tone="dark"
            eyebrow="Who we serve"
            title="Specialized in the industries we serve"
            intro="Industry-specific rules, margins and deductions — we know them, so you don’t have to learn them the hard way."
          />
          <ButtonLink
            href="/industries"
            variant="outline-light"
            icon="arrow"
            className="shrink-0 self-start lg:self-auto"
          >
            All industries
          </ButtonLink>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <IndustryCard industry={industry} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-10 text-center text-mist">
          Also serving service-based businesses, real estate, government &amp; military families, and self-employed
          individuals.{" "}
          <Link href="/industries" className="font-semibold text-accent-light underline-offset-4 hover:underline">
            See everyone we help
          </Link>
        </p>
      </Section>

      {/* How it works */}
      <Section tone="white" labelledBy="home-process">
        <SectionHeading
          id="home-process"
          align="center"
          eyebrow="How it works"
          title="Getting started is simple"
          intro="Four steps from first conversation to year-round peace of mind."
        />
        <div className="mt-14">
          <ProcessTimeline steps={steps} />
        </div>
      </Section>

      {/* Stats */}
      <section aria-label="JK Edwards & Company at a glance" className="bg-grain bg-ink py-14 text-white md:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <StatsRow
            stats={[
              {
                value: <Placeholder note="Years in business — client to confirm">[X]+</Placeholder>,
                label: "Years serving Henry County",
              },
              {
                value: <Placeholder note="Client count — client to confirm">[X]+</Placeholder>,
                label: "Individuals & businesses served",
              },
              { value: clientToolCount, label: "Secure client portals & tools" },
              { value: "Nationwide", label: "Virtual service — plus U.S. expats abroad" },
            ]}
          />
        </div>
      </section>

      {/* Team preview */}
      <Section tone="white" labelledBy="home-team">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="home-team"
            eyebrow="Our team"
            title="Credentialed people who pick up the phone"
            intro="An Enrolled Agent, a CPA, tax accountants and a Certified Payroll Specialist — working as one team for you."
          />
          <ButtonLink href="/about" variant="outline-dark" icon="arrow" className="shrink-0 self-start lg:self-auto">
            Meet the team
          </ButtonLink>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <TeamCard member={member} showBio={false} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Blog */}
      <Section tone="paper" labelledBy="home-blog">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="home-blog"
            eyebrow="Insights"
            title="Latest from the blog"
            intro="Plain-English guidance on taxes, payroll and running a business in Georgia."
          />
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-accent-strong hover:text-accent"
          >
            View all articles
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} photo={getImage(post.image)} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <ClientCenterStrip />

      {/* Visit us */}
      <Section tone="white" labelledBy="home-visit">
        <SectionHeading
          id="home-visit"
          eyebrow="Visit our office"
          title="Local to Hampton. Available everywhere."
          intro="Meet us in person on McDonough Road, or work with us entirely online — whichever fits your life."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactDetails />
          <MapEmbed height={460} className="min-h-[340px]" />
        </div>
      </Section>
    </>
  );
}
