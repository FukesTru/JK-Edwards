import { BadgeCheck, CalendarClock, Laptop, MessageSquareText, Wallet } from "lucide-react";
import { TeamCard } from "@/components/cards/TeamCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata, organizationSchema, personSchema } from "@/lib/seo";
import { site, team } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Us & Our Team",
  description:
    "Meet the JK Edwards & Company team in Hampton, GA: an Enrolled Agent, a CPA, tax accountants and a Certified Payroll Specialist. Book a free consultation.",
  path: "/about",
});

const values = [
  {
    Icon: CalendarClock,
    title: "Proactive, not reactive",
    text: "We plan with you all year so deadlines and decisions never sneak up on you.",
  },
  {
    Icon: MessageSquareText,
    title: "Plain-English advice",
    text: "No jargon. We explain what your numbers mean and what to do about them.",
  },
  {
    Icon: Wallet,
    title: "Fixed, predictable fees",
    text: "You’ll know what you’re paying before we start — no surprise hourly bills.",
  },
  {
    Icon: Laptop,
    title: "Technology that saves you time",
    text: "Secure portals, e-signatures and cloud accounting that fit the way you work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), ...team.map(personSchema)]} />
      <PageHero
        eyebrow="About us"
        title="About JK Edwards & Company"
        subtitle={site.tagline + ". " + site.secondaryLine + "."}
        image="about-office"
      />
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <Section tone="white" labelledBy="about-story">
        <SplitFeature image="services-hub" imageSide="right">
          <SectionHeading id="about-story" eyebrow="Our story" title="A Hampton firm with a whole-picture approach" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              JK Edwards &amp; Company is an accounting and tax firm based in Hampton, Georgia, founded in{" "}
              <Placeholder note="Founding year — client to provide">[FOUNDING YEAR]</Placeholder>.{" "}
              <Placeholder note="Founder story — client to provide">
                [FOUNDER STORY — who started the firm, and why.]
              </Placeholder>
            </p>
            <p>
              We are passionate about the success of our clients. That means looking at the whole picture — not just
              this year’s return, but the business you’re building, the family you’re providing for and the goals
              you’re working toward. Tax, bookkeeping, payroll and advice work together, coordinated by one team.
            </p>
            <p>
              Our clients are individuals, families and small and medium-sized businesses in Henry County and across
              metro-south Atlanta, along with clients nationwide and Americans abroad who work with us virtually. Many
              have been with us for years, and we consider those relationships our greatest asset. Every engagement
              starts the same way: by listening. Then we get to work taking the stress out of running your business.
            </p>
          </div>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="about-values">
        <SectionHeading id="about-values" align="center" eyebrow="Our values" title="How we work with every client" />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, text }) => (
            <StaggerItem key={title} className="rounded-2xl border border-line bg-white p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2.5 leading-relaxed text-charcoal">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="white" id="team" labelledBy="about-team">
        <SectionHeading
          id="about-team"
          eyebrow="Our team"
          title="The people behind your numbers"
          intro="Credentialed professionals who work as one team — and who actually answer when you call."
        />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <TeamCard member={member} />
            </StaggerItem>
          ))}
          <StaggerItem>
            <aside
              aria-labelledby="credentials-heading"
              className="flex h-full flex-col justify-center rounded-2xl bg-ink p-7 text-white"
            >
              <p id="credentials-heading" className="text-xs font-semibold tracking-[0.18em] text-accent-light uppercase">
                Credentials explained
              </p>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="font-serif text-xl font-semibold">What’s an EA?</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-mist">
                    An Enrolled Agent is federally licensed by the IRS to represent taxpayers. EAs pass a comprehensive
                    IRS exam (or qualify through IRS experience), complete continuing education and can represent
                    clients in audits, collections and appeals.
                  </dd>
                </div>
                <div>
                  <dt className="font-serif text-xl font-semibold">What’s a CPA?</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-mist">
                    A Certified Public Accountant is licensed by a state board of accountancy after meeting education
                    and experience requirements and passing the Uniform CPA Exam. CPAs can also represent taxpayers
                    before the IRS.
                  </dd>
                </div>
              </dl>
            </aside>
          </StaggerItem>
        </Stagger>
      </Section>

      <Section tone="paper" labelledBy="about-affiliations">
        <SectionHeading
          id="about-affiliations"
          align="center"
          eyebrow="Affiliations"
          title="Affiliations & certifications"
        />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.affiliations.map((badge) => (
            <li key={badge.name} className="flex flex-col items-center rounded-2xl border border-line bg-white p-6 text-center">
              <BadgeCheck aria-hidden className="h-9 w-9 text-accent" strokeWidth={1.5} />
              <p className="mt-3 font-semibold text-ink">{badge.name}</p>
              <p className="mt-1 text-sm text-charcoal">{badge.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-16 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-strong uppercase">Technology partners</p>
          <p className="mx-auto mt-3 max-w-2xl text-charcoal">
            We work in the platforms you already use — and set you up with the ones that make life easier.
          </p>
          <PartnerStrip className="mx-auto mt-8 max-w-4xl" />
        </div>
      </Section>
    </>
  );
}
