import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CityChips } from "@/components/sections/CityChips";
import { IconGrid } from "@/components/sections/IconGrid";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TaxPrepSubpage } from "@/components/sections/TaxPrepSubpage";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { prices } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Rental Property Tax Preparation Georgia",
  description: `Rental property tax preparation in Georgia: Schedule E with depreciation done right for a flat ${prices.taxPrep}, CPA-signed and EA-reviewed. For local landlords. Start now.`,
  path: "/tax-preparation/rental-property",
});

export default function RentalPropertyPage() {
  return (
    <TaxPrepSubpage
      slug="rental-property"
      title="Rental Property Tax Returns (Schedule E)"
      subtitle="Rental income, expenses and depreciation reported correctly — for one house, a duplex or a short-term rental — at no extra charge."
      serviceDescription={`Schedule E rental property tax preparation for a flat ${prices.taxPrep}, prepared and signed by a CPA and reviewed by an Enrolled Agent.`}
      calloutText="Adding a rental doesn’t change your price. Schedule E is part of the flat fee."
      faqs={faqs.rental}
      faqTitle="Rental property questions"
      related={[
        {
          label: "Tax Preparation",
          href: "/tax-preparation",
          description: `Everything in the flat ${prices.taxPrep} return.`,
          icon: "FileText",
        },
        {
          label: "Investments & K-1s",
          href: "/tax-preparation/investments-k1",
          description: "Real estate partnerships and K-1 income.",
          icon: "ChartLine",
        },
        { label: "Pricing", href: "/pricing", description: "Flat fees, quoted upfront.", icon: "Tag" },
      ]}
    >
      <Section tone="white" labelledBy="rental-intro">
        <SplitFeature image="rental-property">
          <SectionHeading id="rental-intro" eyebrow="For landlords" title="Rental income, reported the right way" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Owning a rental is one of the most common ways Fayette and Coweta County families build wealth — a first
              home kept after a move, a small duplex, or a cottage rented by the week. Each one needs a Schedule E that
              reports rent received, the costs of running the property and depreciation.
            </p>
            <p>
              Mistakes here are expensive: missed depreciation, repairs that should have been improvements (or the other
              way around), and passive-loss rules applied incorrectly. We get the details right and explain them in
              plain English.
            </p>
          </div>
        </SplitFeature>
      </Section>

      <Section tone="paper" labelledBy="rental-topics">
        <SectionHeading
          id="rental-topics"
          eyebrow="What we handle"
          title="Schedule E, line by line"
          intro="General information — the right treatment always depends on your facts, which we’ll review with you."
        />
        <div className="mt-12">
          <IconGrid
            items={[
              {
                icon: "Receipt",
                title: "Rental income & expenses",
                description:
                  "Rent, fees and deposits you keep, less mortgage interest, taxes, insurance, repairs, management and utilities.",
              },
              {
                icon: "TrendingUp",
                title: "Depreciation",
                description: "Recovering the cost of the building and improvements over time — tracked year to year.",
              },
              {
                icon: "Wrench",
                title: "Repairs vs. improvements",
                description:
                  "Repairs are generally deducted now; improvements are generally depreciated. We classify each expense.",
              },
              {
                icon: "CalendarCheck",
                title: "Short-term rentals",
                description:
                  "Nightly and weekly rentals can follow different rules depending on use and your involvement.",
              },
              {
                icon: "Scale",
                title: "Passive activity rules",
                description:
                  "Rental losses are generally passive and may be limited; we apply the rules and track carryovers.",
              },
              {
                icon: "Users",
                title: "Personal use days",
                description:
                  "When you also use the property yourself, expenses are split between personal and rental use.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="rental-local">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="rental-local"
              eyebrow="Local landlords"
              title="Rental owners across Fayette & Coweta County"
              intro="From Peachtree City townhomes to rental houses around Newnan’s historic neighborhoods, we prepare Schedule E for landlords throughout the area — in person or online."
            />
            <CityChips className="mt-8" />
          </div>
          <div>
            <p className="font-serif text-2xl font-semibold text-navy">Bring these records</p>
            <CheckList
              className="mt-5"
              items={[
                "Rent received for the year (and any security deposits you kept)",
                "Mortgage interest statement (Form 1098) and property tax bills",
                "Insurance, HOA, management, utility and repair invoices",
                "Purchase date, price and closing statement (first year) for depreciation",
                "Last year’s return, so depreciation carries forward correctly",
              ]}
            />
          </div>
        </div>
      </Section>
    </TaxPrepSubpage>
  );
}
