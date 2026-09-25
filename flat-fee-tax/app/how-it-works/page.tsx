import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Confirm, ConfigValue } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocumentChecklist } from "@/components/sections/DocumentChecklist";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";
import { secureUploadHref, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Online Tax Preparation CPA Georgia",
  description:
    "How online tax preparation works in Georgia: book, upload securely, a CPA prepares and signs, an Enrolled Agent reviews, then you e-sign and we e-file it.",
  path: "/how-it-works",
});

const steps = [
  { title: "Book", description: "Book online or call. We confirm the details before any work begins." },
  {
    title: "Upload",
    description: "Send documents through our secure portal, never by email. We’ll send you the link.",
  },
  { title: "CPA preparation", description: "A licensed CPA prepares your return and signs it as the preparer." },
  { title: "EA review", description: "An Enrolled Agent reviews the return line by line before it’s filed." },
  { title: "Review, e-sign & e-file", description: "You review your return, sign electronically and we e-file it." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="How It Works: From Documents to E-File"
        subtitle="Five clear steps and two licensed professionals, whether you meet us in Peachtree City or never leave home."
        image="secure-portal"
      />
      <Breadcrumbs items={[{ name: "How It Works", path: "/how-it-works" }]} />

      <Section tone="white" labelledBy="steps-heading">
        <SectionHeading
          id="steps-heading"
          align="center"
          eyebrow="The process"
          title="Five steps from start to e-file"
          intro="You’ll always know what happens next and who’s working on your return."
        />
        <div className="mt-14">
          <ProcessTimeline steps={steps} />
        </div>
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-line bg-paper p-6 sm:p-8">
          <p className="font-semibold text-navy">Secure document upload</p>
          <p className="mt-2 leading-relaxed text-muted">
            Upload documents through our secure portal:{" "}
            {secureUploadHref ? (
              <a
                href={secureUploadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-[3px]"
              >
                open the secure portal<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <ConfigValue value={site.secureUploadUrl} note="Secure upload portal link: set in site.config.ts" />
            )}
            . Please never email tax documents or Social Security numbers.
          </p>
        </div>
      </Section>

      <Section tone="paper" labelledBy="checklist-intro">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <SectionHeading
            id="checklist-intro"
            eyebrow="Before you upload"
            title="What to gather"
            intro="Use the checklist to pull together what applies to you. You can print it or tick items off right here."
          />
          <DocumentChecklist headingLevel="h3" />
        </div>
      </Section>

      <Section tone="white" labelledBy="timing-heading">
        <SectionHeading id="timing-heading" eyebrow="Timing & options" title="What to expect" />
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          <StaggerItem className="rounded-2xl border border-line bg-white p-7">
            <span aria-hidden className="block h-0.5 w-8 rounded-full bg-gold" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-navy">Turnaround</h3>
            <p className="mt-2 leading-relaxed text-muted">
              <Confirm
                value={site.confirm.turnaround}
                note="Turnaround time: set confirm.turnaround in site.config.ts"
              />{" "}
              Uploading everything at once is the fastest way to get your return back.
            </p>
          </StaggerItem>
          <StaggerItem className="rounded-2xl border border-line bg-white p-7">
            <span aria-hidden className="block h-0.5 w-8 rounded-full bg-gold" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-navy">In person in Peachtree City</h3>
            <p className="mt-2 leading-relaxed text-muted">
              Prefer to talk face to face? Meet us at our Peachtree City office to drop off questions or review your
              return together.
            </p>
          </StaggerItem>
          <StaggerItem className="rounded-2xl border border-line bg-white p-7">
            <span aria-hidden className="block h-0.5 w-8 rounded-full bg-gold" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-navy">Fully virtual</h3>
            <p className="mt-2 leading-relaxed text-muted">
              Anywhere in Georgia: secure upload, phone or video questions, and e-signature. No office visit needed.
            </p>
          </StaggerItem>
        </Stagger>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/get-started?service=tax-preparation" size="lg">
            Start My Return
          </ButtonLink>
          <ButtonLink href="/faq" variant="outline-dark" size="lg">
            Read the FAQ
          </ButtonLink>
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            { label: "Pricing", href: "/pricing", description: "Flat fees, quoted upfront." },
            {
              label: "Tax Preparation",
              href: "/tax-preparation",
              description: "What every return includes.",
            },
            {
              label: "Areas We Serve",
              href: "/areas-we-serve",
              description: "In person in Fayette & Coweta County.",
            },
            {
              label: "Get Started",
              href: "/get-started",
              description: "Book your return today.",
            },
          ]}
        />
      </Section>
    </>
  );
}
