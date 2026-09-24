import { GetStartedForm } from "@/components/forms/GetStartedForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingEmbed } from "@/components/sections/BookingEmbed";
import { ContactCard } from "@/components/sections/ContactCard";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { buildMetadata } from "@/lib/seo";
import { prices } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Book a Tax Preparer Peachtree City",
  description: `Book a tax preparer in Peachtree City, GA: a flat ${prices.taxPrep} CPA-signed return or ${prices.taxResolution} IRS tax help. Send a request or pick a time online — get started today.`,
  path: "/get-started",
});

const nextSteps = [
  {
    title: "We confirm the details",
    description: "We contact you by your preferred method to confirm your service and flat price.",
  },
  {
    title: "You upload securely",
    description: "We send a secure link for your documents — never email, never SSNs in forms.",
  },
  {
    title: "We get to work",
    description: "Your CPA prepares and your Enrolled Agent reviews — or we start on your IRS matter.",
  },
];

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title={
          <>
            Get Started — Book Your {prices.taxPrep} Return or {prices.taxResolution} Tax Help
          </>
        }
        subtitle="Tell us a little about your situation. We’ll confirm your flat price and send a secure link for your documents."
        primaryCta={{ label: "Fill Out the Form", href: "#request" }}
      />
      <Breadcrumbs items={[{ name: "Get Started", path: "/get-started" }]} />

      <Section tone="white" labelledBy="request-heading">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div id="request" className="rounded-2xl border border-line bg-paper p-6 sm:p-9">
            <SectionHeading
              id="request-heading"
              title="Request your appointment"
              intro="Fields marked * are required. We use your details only to respond to your request."
            />
            <div className="mt-8">
              <GetStartedForm />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <ContactCard />
            <MapEmbed height={320} />
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="booking-heading">
        <SectionHeading
          id="booking-heading"
          eyebrow="Prefer to pick a time?"
          title="Book online"
          intro="Choose a time that works for you — in person in Peachtree City, by phone or by video."
        />
        <BookingEmbed className="mt-10" />
      </Section>

      <Section tone="white" labelledBy="next-steps">
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
