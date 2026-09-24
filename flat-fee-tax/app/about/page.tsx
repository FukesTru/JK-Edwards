import { BadgeCheck, Laptop, MessageSquareText, Tag } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { PageHero } from "@/components/ui/PageHero";
import { ConfigValue, Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, personSchemas } from "@/lib/seo";
import { prices, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Enrolled Agent Peachtree City",
  description: `Meet Kai Mays, an Enrolled Agent in Peachtree City, GA, and our signing CPA. Flat ${prices.taxPrep} CPA-signed, EA-reviewed returns with plain-English help. Get started.`,
  path: "/about",
});

const values = [
  {
    Icon: Tag,
    title: "Transparent pricing",
    text: "Two flat fees, published on our website and quoted before you book.",
  },
  {
    Icon: BadgeCheck,
    title: "Two licensed professionals on every return",
    text: "A CPA prepares and signs; an Enrolled Agent reviews. Every time.",
  },
  {
    Icon: MessageSquareText,
    title: "Plain-English answers",
    text: "No jargon — just what your return means and what to do next.",
  },
  {
    Icon: Laptop,
    title: "Local and virtual",
    text: "Meet us in Peachtree City or work with us online from anywhere in Georgia.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchemas()} />
      <PageHero
        eyebrow="About us"
        title={<>About {site.brandName}</>}
        subtitle="A flat-fee tax practice in Peachtree City built on a simple idea: every return deserves two licensed professionals and one honest price."
      />
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <Section tone="white" labelledBy="kai-heading">
        <div id="kai-mays" className="grid items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <Placeholder block note="Headshot — client to provide" className="justify-self-center">
            <InitialsAvatar name={site.owner} className="w-44 text-5xl sm:w-52 sm:text-6xl" />
          </Placeholder>
          <div>
            <SectionHeading id="kai-heading" eyebrow="Founder · Enrolled Agent" title={site.owner} />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                <Placeholder note="Kai’s bio — client to provide">
                  [CLIENT TO PROVIDE: background, years of experience]
                </Placeholder>
              </p>
              <p>
                <strong className="text-ink">What’s an Enrolled Agent?</strong> An Enrolled Agent (EA) is a tax
                professional federally licensed by the Internal Revenue Service. EAs earn the credential by passing a
                comprehensive IRS exam covering individual and business tax and representation (or through qualifying
                experience as an IRS employee), and they must complete continuing education to keep it. EAs have
                unlimited rights to represent taxpayers before the IRS — on audits, collections and appeals.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="cpa-heading">
        <div id="signing-cpa" className="grid items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <Placeholder block note="CPA headshot — client to provide" className="justify-self-center">
            <InitialsAvatar name={site.cpaName} className="w-44 text-5xl sm:w-52 sm:text-6xl" />
          </Placeholder>
          <div>
            <SectionHeading id="cpa-heading" eyebrow="Signing CPA" title={<ConfigValue value={site.cpaName} />} />
            <p className="mt-3 font-semibold text-navy">
              Georgia License #<ConfigValue value={site.cpaLicense} />
            </p>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                <Placeholder note="CPA bio — client to provide">
                  [CLIENT TO PROVIDE: CPA bio and background]
                </Placeholder>
              </p>
              <p>
                A Certified Public Accountant is licensed by a state board of accountancy after meeting education and
                experience requirements and passing the Uniform CPA Examination. Our signing CPA prepares and signs
                every tax return we file.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" id="why-flat-fees" labelledBy="why-heading">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading id="why-heading" eyebrow="Our story" title="Why we do flat fees" />
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Too many people walk into a tax office without knowing what they’ll pay. The price starts low, then grows
              with every form — a charge for the side business, another for the rental, another for the brokerage
              statement. By the time the return is done, the bill feels like a surprise.
            </p>
            <p>
              We think you deserve to know the price before you start. So we offer two services at two flat prices —{" "}
              {prices.taxPrep} for tax preparation and {prices.taxResolution} for tax resolution — and we include the
              schedules that usually cost extra. Instead of competing on add-ons, we compete on care: a CPA prepares and
              signs your return, and an Enrolled Agent reviews it before it’s filed.
            </p>
            <p>
              <Placeholder note="Personal story — client may add">
                [OPTIONAL: Kai’s personal story — what led to starting the practice.]
              </Placeholder>
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="values-heading">
        <SectionHeading id="values-heading" align="center" eyebrow="Our values" title="What you can count on" />
        <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, text }) => (
            <StaggerItem as="li" key={title} className="rounded-2xl border border-line bg-white p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold">
                <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-navy">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="white">
        <RelatedLinks
          links={[
            { label: "Pricing", href: "/pricing", description: "Two services, two flat fees.", icon: "Tag" },
            {
              label: "How It Works",
              href: "/how-it-works",
              description: "CPA preparation and EA review, step by step.",
              icon: "ListChecks",
            },
            {
              label: "Tax Resolution",
              href: "/tax-resolution",
              description: "Representation before the IRS by an EA.",
              icon: "ShieldCheck",
            },
          ]}
        />
      </Section>
    </>
  );
}
