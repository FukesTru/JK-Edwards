import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCard } from "@/components/sections/ContactCard";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { buildMetadata } from "@/lib/seo";
import { formEmbedHref, phoneHref, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Book a Tax Preparer Peachtree City",
  description:
    "Book a tax preparer in Peachtree City, GA: a CPA-signed, EA-reviewed tax return or IRS tax help. Call or email us, or visit our office, and get started today.",
  path: "/get-started",
});

const nextSteps = [
  {
    title: "Call or email us",
    description: "Tell us what you need. We confirm your service and answer your questions.",
  },
  {
    title: "Upload securely",
    description: "We send you a secure link for your documents. Never by email.",
  },
  {
    title: "We get to work",
    description: "Your CPA prepares and your Enrolled Agent reviews, or we start on your IRS matter.",
  },
];

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Let’s Get Started"
        subtitle="Call or email us and we’ll take it from there. We’ll confirm the details and send a secure link for your documents."
        primaryCta={{ label: `Call ${site.phone}`, href: phoneHref }}
        secondaryCta={false}
      />
      <Breadcrumbs items={[{ name: "Get Started", path: "/get-started" }]} />

      <Section tone="white" labelledBy="contact-heading">
        <SectionHeading
          id="contact-heading"
          eyebrow="Reach us directly"
          title="Talk to a real person"
          intro="Meet us in Peachtree City or work with us from anywhere in Georgia. Please don’t email tax documents or Social Security numbers."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ContactCard />
          <MapEmbed height={380} />
        </div>
        {formEmbedHref && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white">
            <iframe
              title="Request an appointment"
              src={formEmbedHref}
              loading="lazy"
              className="block h-[900px] w-full border-0"
            />
          </div>
        )}
      </Section>

      <Section tone="paper" labelledBy="next-steps">
        <SectionHeading
          id="next-steps"
          align="center"
          eyebrow="What happens next"
          title="Three simple steps"
          intro="Here’s what to expect once you reach out."
        />
        <div className="mt-14">
          <ProcessTimeline steps={nextSteps} />
        </div>
      </Section>
    </>
  );
}
