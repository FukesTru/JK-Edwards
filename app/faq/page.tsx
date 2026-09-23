import { MessageCircleQuestion, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { faqPageGroups } from "@/content/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Accountant FAQ: Tax, Payroll & IRS",
  description:
    "Answers to common questions about tax preparation, bookkeeping, payroll, IRS letters, pricing and client portals from JK Edwards & Company in Hampton, GA.",
  path: "/faq",
});

const groups = faqPageGroups.map((group) => ({
  ...group,
  id: group.title
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
}));

const questionCount = groups.reduce((total, group) => total + group.items.length, 0);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(groups.flatMap((group) => group.items))} />
      <PageHero
        eyebrow="Resources"
        title="Frequently Asked Questions"
        subtitle={`Straight answers to the ${questionCount} questions we hear most — about getting started, taxes, bookkeeping, payroll, the IRS and our client portals.`}
        image="home-split"
      />
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />

      <Section tone="white" reveal={false}>
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-strong uppercase">Jump to a topic</p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex items-center justify-between gap-3 rounded-full border border-line px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent-strong lg:flex lg:w-full lg:rounded-lg lg:border-transparent lg:px-3 lg:hover:bg-paper"
                  >
                    {group.title}
                    <span className="text-xs text-charcoal tabular-nums">{group.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={group.id}>
                <h2
                  id={group.id}
                  className="font-serif text-[1.9rem] leading-tight font-semibold text-ink sm:text-[2.2rem]"
                >
                  {group.title}
                </h2>
                <FaqAccordion items={group.items} schema={false} className="mt-6" />
              </section>
            ))}

            <aside
              aria-labelledby="faq-more"
              className="flex flex-col gap-6 rounded-2xl bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <div className="flex gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent">
                  <MessageCircleQuestion aria-hidden className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <div>
                  <h2 id="faq-more" className="font-serif text-2xl font-semibold">
                    Still have a question?
                  </h2>
                  <p className="mt-1.5 max-w-md text-mist">
                    Every situation is different. Ask us directly — the first conversation is free.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <ButtonLink href="/contact">Book a Free Consultation</ButtonLink>
                <ButtonLink href={site.phone.href} variant="ghost-dark" icon="none" size="sm">
                  <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                  {site.phone.display}
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
