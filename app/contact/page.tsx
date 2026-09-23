import { Suspense } from "react";
import { LockKeyhole } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PackageNotice } from "@/components/forms/PackageNotice";
import { BookingEmbed } from "@/components/sections/BookingEmbed";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { accountingPackages } from "@/content/packages";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Free Consultation in Hampton, GA",
  description:
    "Book a free consultation with JK Edwards & Company, a Hampton, GA accountant for tax, bookkeeping, payroll and IRS help. Call (770) 472-2005 or send a message.",
  path: "/contact",
});

const nextSteps = [
  {
    title: "We review your request",
    description:
      "A member of our Hampton team reads your note and reaches out by your preferred method to find a time that suits you.",
  },
  {
    title: "Your free consultation",
    description:
      "We talk through your situation by phone, video or in person at our office — no cost and no obligation.",
  },
  {
    title: "A custom plan & fixed quote",
    description:
      "You get a clear recommendation and a fixed quote before any work begins, so you know exactly what to expect.",
  },
];

const packageNames = Object.fromEntries(accountingPackages.map((pkg) => [pkg.key, pkg.name]));

export default function ContactPage() {
  const showBooking = Boolean(site.bookingUrl) || site.showPlaceholders;

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Book Your Free Consultation"
        subtitle="Tell us a little about yourself and what you need. It’s a relaxed, no-obligation conversation about your taxes, books or business."
        image="contact"
        primaryCta={{ label: "Book a Free Consultation", href: "#request" }}
      />
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <Section tone="white" labelledBy="request-heading">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div id="request" className="rounded-2xl border border-line bg-paper p-6 sm:p-9">
            <SectionHeading
              id="request-heading"
              as="h2"
              title="Request your consultation"
              intro="Fields marked * are required. We’ll use your details only to respond to your request."
            />
            <div className="mt-8">
              <Suspense fallback={null}>
                <PackageNotice names={packageNames} />
              </Suspense>
              <ContactForm />
            </div>
            <p className="mt-8 flex items-start gap-2.5 border-t border-line pt-6 text-sm text-charcoal">
              <LockKeyhole aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" strokeWidth={1.75} />
              Please don’t send Social Security numbers or tax documents through this form. Once you’re a client, we’ll
              set you up with a secure portal for documents.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <ContactDetails />
            <MapEmbed height={340} />
          </div>
        </div>
      </Section>

      {showBooking && (
        <Section tone="paper" labelledBy="booking-heading">
          <SectionHeading
            id="booking-heading"
            eyebrow="Online scheduling"
            title="Prefer to pick a time yourself?"
            intro="Choose a time that works for you and we’ll call you — or meet by video or at our Hampton office."
          />
          <BookingEmbed className="mt-10" />
        </Section>
      )}

      <Section tone={showBooking ? "white" : "paper"} labelledBy="next-steps">
        <SectionHeading
          id="next-steps"
          align="center"
          eyebrow="What happens next"
          title="Three simple steps"
          intro="From first hello to a clear plan — here’s what to expect after you reach out."
        />
        <div className="mt-14">
          <ProcessTimeline steps={nextSteps} tone={showBooking ? "light" : "paper"} />
        </div>
      </Section>
    </>
  );
}
