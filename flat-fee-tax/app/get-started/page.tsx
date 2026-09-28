import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCard } from "@/components/sections/ContactCard";
import { LeadForm } from "@/components/sections/LeadForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { buildMetadata } from "@/lib/seo";
import { phoneHref, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Book a Tax Preparer Peachtree City",
  description:
    "Book a tax preparer in Peachtree City, GA: a CPA-signed, EA-reviewed tax return or IRS tax help. Send a quick request or call us, and get started today.",
  path: "/get-started",
});

const nextSteps = [
  {
    title: "Send a request or call",
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
        subtitle="Send a quick request or give us a call. We’ll confirm the details and send a secure link for your documents."
        primaryCta={{ label: "Fill Out the Form", href: "#request" }}
        secondaryCta={{ label: `Call ${site.phone}`, href: phoneHref }}
      />
      <Breadcrumbs items={[{ name: "Get Started", path: "/get-started" }]} />

      <Section tone="white" labelledBy="request-heading">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div id="request" className="scroll-mt-28 rounded-2xl border border-line bg-paper p-5 sm:p-8">
            <SectionHeading
              id="request-heading"
              title="Request your appointment"
              intro="Tell us a little about what you need and we’ll be in touch. Please don’t include Social Security numbers or tax documents."
            />
            <LeadForm className="mt-8" />
          </div>
          <div className="flex flex-col gap-6">
            <ContactCard />
            <MapEmbed height={320} />
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="next-steps">
        <SectionHeading
          id="next-steps"
          align="center"
          eyebrow="What happens next"
          title="Three simple steps"
          intro="Here’s what to expect after you send your request."
        />
        <div className="mt-14">
          <ProcessTimeline steps={nextSteps} />
        </div>
      </Section>
    </>
  );
}
