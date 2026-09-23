import { BadgeCheck } from "lucide-react";
import { CheckList } from "@/components/sections/CheckList";
import { IconGrid } from "@/components/sections/IconGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { serviceJsonLd, serviceMetadata } from "@/lib/page-helpers";
import { site } from "@/lib/site";

export const metadata = serviceMetadata("quickbooks");

export default function QuickBooksPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd("quickbooks")} />
      <PageHero
        eyebrow="Advisory & setup"
        title="QuickBooks Setup, Training & Consulting"
        subtitle="Set up, cleaned up and working for you — with help from certified QuickBooks ProAdvisors."
        image="service-quickbooks"
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: "QuickBooks Consulting", path: "/services/quickbooks" },
        ]}
      />

      <Section tone="white" labelledBy="qb-intro">
        <SplitFeature
          image="services-hub"
          imageSide="left"
          badge={
            <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgba(22,24,27,0.45)] ring-1 ring-black/5">
              <BadgeCheck aria-hidden className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <span>
                <span className="block text-xs font-semibold tracking-[0.14em] text-charcoal uppercase">Certified</span>
                <span className="block font-serif text-lg font-semibold text-ink">QuickBooks ProAdvisors</span>
              </span>
            </div>
          }
        >
          <SectionHeading id="qb-intro" eyebrow="ProAdvisor team" title="Get more out of QuickBooks" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
            <p>
              QuickBooks is only as useful as the way it’s set up. A cluttered chart of accounts, duplicate transactions
              or bank feeds that never get reviewed turn it into a source of stress instead of insight.
            </p>
            <p>
              Our certified ProAdvisors set up new files correctly, clean up existing ones, train your team on the
              features you actually need and fine-tune reports so they answer real questions. Moving from Desktop to
              Online, or prefer Desktop in the cloud? We handle migrations and hosted Desktop through Rightworks, too.
            </p>
          </div>
          <CheckList
            className="mt-7"
            items={[
              "QuickBooks Online and QuickBooks Desktop",
              "One-on-one and team training",
              "Hosted Desktop access through Rightworks",
            ]}
          />
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="qb-services">
        <SectionHeading id="qb-services" eyebrow="What we do" title="QuickBooks help for every stage" />
        <div className="mt-12">
          <IconGrid
            columns={3}
            items={[
              {
                icon: "Rocket",
                title: "Setup",
                description: "New company files with a chart of accounts built for your business.",
              },
              {
                icon: "Wrench",
                title: "Cleanup",
                description: "Fix miscategorized transactions, duplicates and unreconciled accounts.",
              },
              {
                icon: "Users",
                title: "Training",
                description: "Hands-on training for owners and staff — at your pace.",
              },
              {
                icon: "Gauge",
                title: "Optimization",
                description: "Automation, bank rules and reports that save hours every month.",
              },
              {
                icon: "RefreshCw",
                title: "Desktop → Online migration",
                description: "Plan, convert and verify your data with no loose ends.",
              },
              {
                icon: "Monitor",
                title: "Hosted Desktop (Rightworks)",
                description: "Run QuickBooks Desktop securely in the cloud from anywhere.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="dark" labelledBy="qb-buy">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            id="qb-buy"
            tone="dark"
            eyebrow="Need a license?"
            title="Get QuickBooks through us"
            intro="Purchase QuickBooks through our partner and we’ll help you pick the right edition and get set up correctly from the start."
          />
          <ButtonLink href={site.links.quickbooksPurchase} external size="lg" className="shrink-0">
            Get QuickBooks Through Us
          </ButtonLink>
        </div>
      </Section>

      <Section tone="white" labelledBy="qb-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="qb-faq"
            eyebrow="FAQ"
            title="QuickBooks questions"
            intro="Setup, migration, hosting and training — answered."
          />
          <FaqAccordion items={faqs.quickbooks} />
        </div>
      </Section>

      <Section tone="paper">
        <RelatedLinks
          links={[
            {
              label: "Bookkeeping",
              href: "/services/bookkeeping",
              description: "Let us keep your QuickBooks file accurate every month.",
              icon: "BookOpenCheck",
            },
            {
              label: "New Business Setup",
              href: "/services/new-business-setup",
              description: "Entity choice, accounting setup and retirement planning.",
              icon: "Rocket",
            },
            {
              label: "Payroll Services",
              href: "/services/payroll",
              description: "Payroll that flows cleanly into your books.",
              icon: "HandCoins",
            },
          ]}
        />
      </Section>
    </>
  );
}
