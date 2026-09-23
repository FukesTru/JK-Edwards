import { ArrowUpRight, CreditCard, Download, FileText, LockKeyhole } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PortalGrid } from "@/components/sections/PortalGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { portals, refundTrackers, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Client Center & Secure Client Portal",
  description:
    "JK Edwards & Company client portal: pay your bill, log in to NetClient CS, Liscio, TaxCaddy, Dext and QuickBooks, track refunds and e-sign returns securely.",
  path: "/client-center",
});

const safeSendSteps = [
  {
    title: "Open the secure email",
    text: "When your return is ready, you’ll receive an email with a secure SafeSend link.",
  },
  { title: "Verify your identity", text: "Follow the prompts to confirm it’s you before your return opens." },
  {
    title: "Review your return",
    text: "Read the summary, then review your full return and any documents we included.",
  },
  { title: "E-sign", text: "Sign Form 8879 and any other authorizations electronically — no printing or mailing." },
  { title: "Pay & download", text: "Pay any invoice and download copies of everything for your records." },
];

const taxCaddySteps = [
  { title: "Accept your invitation", text: "Open the TaxCaddy invitation from our office and create your account." },
  { title: "Check your list", text: "TaxCaddy shows a personalized checklist of the documents we need from you." },
  { title: "Upload documents", text: "Snap photos with the mobile app or upload files from your computer." },
  {
    title: "Stay in touch",
    text: "Answer questions, e-sign documents and follow your return’s progress in one place.",
  },
];

const forms: { name: string; description: string; href?: string; note?: string }[] = [
  { name: "Engagement letter", description: "Our standard engagement terms.", note: "PDF — client to upload" },
  { name: "Tax organizer", description: "Gather everything we need for your return.", note: "PDF — client to upload" },
  {
    name: "Form 8879 information",
    description: "About the IRS e-file signature authorization.",
    href: "https://www.irs.gov/forms-pubs/about-form-8879",
  },
  {
    name: "IRS Form 2848",
    description: "Power of attorney so we can represent you before the IRS.",
    href: "https://www.irs.gov/pub/irs-pdf/f2848.pdf",
  },
];

function StepList({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="mt-6 space-y-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-white">
            {index + 1}
          </span>
          <div>
            <p className="font-semibold text-ink">{step.title}</p>
            <p className="mt-0.5 text-[15px] leading-relaxed text-charcoal">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ClientCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Client Center"
        subtitle="Everything you need in one place: pay your bill, reach your secure portals, track your refund and review your return."
        image="client-center"
        primaryCta={{ label: "Pay Bill", href: site.links.payBill, external: true }}
        secondaryCta={{ label: `Call ${site.phone.display}`, href: site.phone.href }}
      />
      <Breadcrumbs items={[{ name: "Client Center", path: "/client-center" }]} />

      <Section tone="white" labelledBy="pay-bill">
        <div className="flex flex-col gap-6 rounded-2xl bg-ink p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent">
              <CreditCard aria-hidden className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <div>
              <h2 id="pay-bill" className="font-serif text-3xl font-semibold">
                Pay your bill online
              </h2>
              <p className="mt-2 max-w-xl text-mist">
                Pay securely by card or bank transfer through CPACharge. You’ll receive an emailed receipt.
              </p>
            </div>
          </div>
          <ButtonLink href={site.links.payBill} external size="lg" className="shrink-0">
            Pay Bill
          </ButtonLink>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Client portals"
            title="Your secure tools"
            intro="Each link opens the provider’s secure sign-in page in a new tab."
          />
          <div className="mt-10">
            <PortalGrid portals={portals} />
          </div>
          <p className="mt-8 flex items-start gap-2.5 text-sm text-charcoal">
            <LockKeyhole aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
            For your security, please never email Social Security numbers or tax documents. Use Liscio, NetClient CS or
            TaxCaddy instead.
          </p>
        </div>
      </Section>

      <Section tone="paper" labelledBy="refunds">
        <SectionHeading
          id="refunds"
          eyebrow="Refund trackers"
          title="Where’s my refund?"
          intro="Once your return has been accepted, check your refund status directly with the IRS and the Georgia Department of Revenue."
        />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
          {refundTrackers.map((tracker) => (
            <StaggerItem key={tracker.name}>
              <a
                href={tracker.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-6 rounded-2xl border border-line bg-white p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_45px_-28px_rgba(22,24,27,0.4)]"
              >
                <span>
                  <span className="block font-serif text-2xl font-semibold text-ink">{tracker.name}</span>
                  <span className="mt-2 block leading-relaxed text-charcoal">{tracker.description}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="white" labelledBy="how-tos">
        <SectionHeading id="how-tos" eyebrow="How-to guides" title="Reviewing, signing and sending documents" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-8">
            <h3 className="font-serif text-2xl font-semibold text-ink">SafeSend Returns</h3>
            <p className="mt-2 leading-relaxed text-charcoal">
              How to review and e-sign your finished tax return online.
            </p>
            <StepList steps={safeSendSteps} />
          </div>
          <div className="rounded-2xl border border-line bg-paper p-8">
            <h3 className="font-serif text-2xl font-semibold text-ink">TaxCaddy quick start</h3>
            <p className="mt-2 leading-relaxed text-charcoal">
              How to send us your tax documents securely.{" "}
              <a
                href={portals.find((p) => p.key === "taxcaddy")!.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-strong underline underline-offset-4 hover:text-accent"
              >
                Open TaxCaddy
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            <StepList steps={taxCaddySteps} />
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="forms">
        <SectionHeading
          id="forms"
          eyebrow="Downloads"
          title="Forms & documents"
          intro="Common forms our clients ask for. Need something else? Send us a message through Liscio."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {forms.map((form) => (
            <li key={form.name}>
              {form.href ? (
                <a
                  href={form.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent/40"
                >
                  <FileText aria-hidden className="h-8 w-8 shrink-0 text-accent" strokeWidth={1.5} />
                  <span className="flex-1">
                    <span className="block font-semibold text-ink">{form.name}</span>
                    <span className="block text-sm text-charcoal">{form.description} (IRS.gov)</span>
                  </span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 text-accent" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <Placeholder block note={`${form.name} ${form.note}`}>
                  <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line bg-white p-5">
                    <Download aria-hidden className="h-8 w-8 shrink-0 text-steel" strokeWidth={1.5} />
                    <span className="flex-1">
                      <span className="block font-semibold text-ink">{form.name}</span>
                      <span className="block text-sm text-charcoal">
                        {form.description} Available soon — request a copy through Liscio.
                      </span>
                    </span>
                  </div>
                </Placeholder>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
