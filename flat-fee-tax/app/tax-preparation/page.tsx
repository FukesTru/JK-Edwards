import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { PriceCard } from "@/components/ui/PriceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FormsIncluded } from "@/components/sections/FormsIncluded";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { includedForms } from "@/content/forms";
import { taxPrepPages } from "@/content/services";
import { cta } from "@/lib/cta";
import { getImage } from "@/lib/images";
import { buildMetadata, taxPrepService } from "@/lib/seo";
import { prices, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `CPA Tax Preparation ${prices.taxPrep}, Peachtree City`,
  description: `CPA tax preparation for a flat ${prices.taxPrep}: Form 1040 with Schedules A, C and E, 1099-B and K-1s, CPA-signed and EA-reviewed in Peachtree City, GA. Start your return.`,
  path: "/tax-preparation",
});

const audiences = [
  {
    title: "W-2 families who itemize",
    text: "Mortgage interest, property taxes and gifts, compared with the standard deduction.",
    page: taxPrepPages[0],
  },
  {
    title: "Freelancers & 1099 contractors",
    text: "Schedule C income, expenses, home office and self-employment tax.",
    page: taxPrepPages[1],
  },
  {
    title: "Landlords",
    text: "Schedule E rentals with depreciation and repairs vs. improvements.",
    page: taxPrepPages[2],
  },
  {
    title: "Investors & partners with K-1s",
    text: "1099-B sales, cost basis, crypto and pass-through K-1 income.",
    page: taxPrepPages[3],
  },
];

export default function TaxPreparationPage() {
  return (
    <>
      <JsonLd data={taxPrepService()} />
      <PageHero
        eyebrow="Tax preparation"
        title={
          <>
            Your Return, <span className="text-gold">Handled.</span>
          </>
        }
        subtitle="Your individual return with the schedules that usually cost extra — for one price you know before you start."
        image="suburban-homes"
        aside={
          <div className="mx-auto w-full max-w-md">
            <PriceCard
              service="taxPrep"
              title="Tax Preparation"
              headingLevel="p"
              features={includedForms.map((f) => f.form)}
              cta={cta.taxPrep}
            />
          </div>
        }
      />
      <Breadcrumbs items={[{ name: "Tax Preparation", path: "/tax-preparation" }]} />

      <Section tone="white" labelledBy="prep-intro">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <SectionHeading
              id="prep-intro"
              eyebrow="The flat-fee return"
              title="Complex returns shouldn’t come with complex pricing"
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Most tax offices start with a base price and add a charge for every extra form: another fee for the side
                business, another for the rental, another when a brokerage statement or K-1 shows up. By the time you
                see the bill, the price you were quoted is a distant memory.
              </p>
              <p>
                We do it differently. For one flat {prices.taxPrep}, we prepare your federal Form 1040 with Schedule A
                itemized deductions, Schedule C self-employment income, Schedule E rental and pass-through income,
                brokerage 1099-Bs and Schedule K-1s — the forms that make a return complicated, included from the start.
              </p>
              <p>
                Every return also gets two licensed professionals. A Certified Public Accountant prepares and signs it,
                and an Enrolled Agent — a tax professional licensed by the IRS — reviews it before anything is filed.
                You get a careful, double-checked return, a clear explanation of the result and e-filing, all for the
                price you saw before you booked.
              </p>
            </div>
          </div>
          <aside className="self-start rounded-2xl border border-line bg-paper p-7" aria-labelledby="prep-promise">
            <p id="prep-promise" className="font-serif text-2xl font-semibold text-navy">
              Our promise
            </p>
            <ul className="mt-5 space-y-4 text-ink">
              <li className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                Prepared and signed by <strong className="font-semibold">{site.cpaName}</strong>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                Reviewed by <strong className="font-semibold">{site.owner}</strong>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="price mt-0.5 w-5 shrink-0 text-center text-navy">
                  $
                </span>
                One flat fee of {prices.taxPrep}, quoted upfront
              </li>
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="paper" labelledBy="included-heading">
        <SectionHeading
          id="included-heading"
          eyebrow="Included"
          title={`What’s included for ${prices.taxPrep}`}
          intro="Choose a form to see how we handle it."
        />
        <div className="mt-12">
          <FormsIncluded />
        </div>
      </Section>

      <Section tone="white" labelledBy="who-heading">
        <SectionHeading id="who-heading" eyebrow="Who this is for" title="Built for real-life returns" />
        <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ title, text, page }) => {
            const photo = getImage(page.image);
            return (
              <StaggerItem as="li" key={title}>
                <Link
                  href={page.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(15,30,51,0.45)]"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-paper">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="font-serif text-xl font-semibold text-navy">{title}</span>
                    <span className="mt-2 flex-1 leading-relaxed text-muted">{text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                      {page.name}
                      <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section tone="dark" labelledBy="qc-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="qc-heading"
            tone="dark"
            eyebrow="Quality control"
            title="Two licensed professionals on every return"
            intro="A second set of expert eyes catches what a single preparer can miss — missing income, overlooked deductions, basis errors."
          />
          <ol className="space-y-5">
            {[
              {
                title: "The CPA prepares and signs",
                text: "A licensed CPA prepares your return from your documents and signs it as the paid preparer.",
              },
              {
                title: "The Enrolled Agent reviews",
                text: "An Enrolled Agent reviews every schedule, compares it with your documents and prior-year return, and flags questions.",
              },
              {
                title: "You review before filing",
                text: "We walk you through the result, answer your questions and only e-file once you’ve signed.",
              },
            ].map((step, index) => (
              <li key={step.title} className="flex gap-5 rounded-2xl border border-white/10 bg-navy-2 p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold font-serif font-bold text-navy">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-serif text-xl font-semibold text-white">{step.title}</span>
                  <span className="mt-1.5 block leading-relaxed text-mist">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="paper" labelledBy="prep-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="prep-faq" eyebrow="FAQ" title="Tax preparation questions" />
          <FaqAccordion items={faqs.taxPrep} />
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks
          title="Explore tax preparation"
          links={[
            ...taxPrepPages.map((page) => ({
              label: page.name,
              href: page.href,
              description: page.summary,
            })),
          ]}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/pricing"
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy hover:border-gold"
          >
            Pricing
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy hover:border-gold"
          >
            How It Works
          </Link>
          <Link
            href="/tax-resolution"
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy hover:border-gold"
          >
            Tax Resolution
          </Link>
        </div>
      </Section>
    </>
  );
}
