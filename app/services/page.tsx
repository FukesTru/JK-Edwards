import { ServiceCard } from "@/components/cards/ServiceCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckList } from "@/components/sections/CheckList";
import { PackagesTable } from "@/components/sections/PackagesTable";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceGroups, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Accounting Services, Henry County GA",
  description:
    "Accounting and tax services in Henry County, GA: tax prep and planning, bookkeeping, payroll, IRS resolution, CFO advisory, business setup and QuickBooks help.",
  path: "/services",
});

const groupIntros = {
  tax: "Accurate filings, clean books and on-time payroll — the compliance work every household and business depends on, plus a team that stands between you and the IRS.",
  advisory:
    "Forward-looking guidance: choosing the right structure, setting up systems that scale and turning your numbers into decisions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Accounting, Tax & Advisory Services"
        subtitle="Tax preparation, bookkeeping, payroll, IRS representation and business advisory — coordinated by one team, for one predictable fee."
        image="services-hub"
      />
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />

      <Section tone="white" labelledBy="services-intro">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              id="services-intro"
              eyebrow="One coordinated team"
              title="Every number in your business and household, handled together"
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
              <p>
                Every client brings a different mix of needs — a W-2 family with a rental property, a trucking company
                with ten drivers, a new LLC deciding whether to become an S corporation. JK Edwards &amp; Company brings
                tax preparation, bookkeeping, payroll, IRS representation and business advisory under one roof, so
                your numbers are handled by one coordinated team instead of a patchwork of providers.
              </p>
              <p>
                That coordination matters. When the people doing your books also prepare your return and run your
                payroll, nothing falls through the cracks: deductions get captured, deadlines get met and planning
                happens all year, not in a rush every April. Work with us at our Hampton office or entirely online
                through secure portals — and start with one service or hand us the whole department.
              </p>
            </div>
          </div>
          <div className="self-start rounded-2xl border border-line bg-paper p-8">
            <p className="font-serif text-2xl font-semibold text-ink">What every client gets</p>
            <CheckList
              className="mt-6"
              items={[
                "A credentialed team, including an Enrolled Agent and a CPA",
                "Fixed, predictable fees agreed up front",
                "Secure portals for documents, messages and e-signatures",
                "Plain-English advice — and answers all year long",
                "In-person meetings in Hampton or fully virtual service",
              ]}
            />
            <ButtonLink href="/contact" className="mt-8 w-full sm:w-auto">
              Book a Free Consultation
            </ButtonLink>
          </div>
        </div>
      </Section>

      {serviceGroups.map((group, index) => (
        <Section
          key={group.key}
          id={group.key === "tax" ? "tax-compliance" : "advisory-setup"}
          tone={index === 0 ? "paper" : "white"}
          labelledBy={`group-${group.key}`}
        >
          <SectionHeading
            id={`group-${group.key}`}
            eyebrow={index === 0 ? "Tax & compliance" : "Advisory & setup"}
            title={group.title}
            intro={groupIntros[group.key]}
          />
          <Stagger className={`mt-12 grid gap-6 md:grid-cols-2 ${group.key === "advisory" ? "lg:grid-cols-3" : ""}`}>
            {services
              .filter((service) => service.group === group.key)
              .map((service) => (
                <StaggerItem key={service.slug}>
                  <ServiceCard service={service} detailed />
                </StaggerItem>
              ))}
          </Stagger>
        </Section>
      ))}

      <Section tone="paper" id="packages" labelledBy="packages-heading">
        <SectionHeading
          id="packages-heading"
          align="center"
          eyebrow="Outsourced accounting"
          title="Outsourced Accounting Packages"
          intro="Three levels of support, each for a fixed monthly fee based on your business. Tell us about your needs and we’ll send a custom quote."
        />
        <div className="mt-16">
          <PackagesTable />
        </div>
      </Section>
    </>
  );
}
