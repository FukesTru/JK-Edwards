import { Building2, Landmark, Percent, MapPin } from "lucide-react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { accountingServiceSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "McDonough & Henry County Accountant",
  description:
    "Local accountant serving Hampton, McDonough, Stockbridge, Locust Grove, Griffin and Henry County, GA: tax, bookkeeping, payroll and IRS help. Visit or call us.",
  path: "/henry-county-accountant",
});

const areas = [
  "Hampton",
  "McDonough",
  "Stockbridge",
  "Locust Grove",
  "Griffin",
  "Henry County",
  "Metro-south Atlanta",
  "Nationwide (virtual)",
];

const taxNotes = [
  {
    Icon: Landmark,
    title: "Georgia Department of Revenue",
    text: "Georgia income taxes, payroll withholding and sales tax are administered by the Georgia Department of Revenue. Most registrations, filings and payments happen online through the Georgia Tax Center.",
  },
  {
    Icon: Building2,
    title: "Henry County business licensing",
    text: "Businesses in unincorporated Henry County generally need an occupational tax certificate (business license) from the county, while businesses inside city limits — Hampton, McDonough, Stockbridge or Locust Grove — typically register with their city. Licenses are usually renewed each year.",
  },
  {
    Icon: Percent,
    title: "Georgia sales tax",
    text: "Georgia’s statewide sales tax rate is 4%, and counties and cities add local sales taxes on top, so the total rate depends on where the sale happens. Sellers register with the Department of Revenue, collect tax and file on the schedule the state assigns.",
  },
];

export default function HenryCountyPage() {
  return (
    <>
      <JsonLd data={accountingServiceSchema()} />
      <PageHero
        eyebrow="Local accountant · Henry County, GA"
        title="Accountant Serving Hampton, McDonough & Henry County, GA"
        subtitle="Tax preparation, bookkeeping, payroll and IRS help from a local team on McDonough Road in Hampton — with in-person and online options."
        image="henry-county"
      />
      <Breadcrumbs items={[{ name: "Henry County Accountant", path: "/henry-county-accountant" }]} />

      <Section tone="white" labelledBy="local-intro">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHeading id="local-intro" eyebrow="Your neighbors" title="Rooted in Henry County" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal">
              <p>
                JK Edwards &amp; Company is rooted in Henry County. From our office on McDonough Road in Hampton, we
                work with the people and businesses that make this corner of metro-south Atlanta such a good place to
                live and work — families in Hampton and Locust Grove, contractors and shop owners around the historic
                McDonough square, logistics companies along the I-75 corridor and professional practices in
                Stockbridge. We also serve neighbors just across the county line in Griffin.
              </p>
              <p>
                Henry County has grown quickly, and growth brings complexity: new businesses deciding how to structure
                themselves, households with rental properties and side income, trucking and distribution companies
                with multi-state filings, and retirees navigating Social Security and required distributions. Being
                local means we understand those realities — and it means you can sit down with us face to face when a
                conversation matters.
              </p>
              <p>
                Clients come to us for tax preparation and planning, monthly bookkeeping, payroll, IRS problem
                resolution and advice on growing a business. Many start with a single return and stay for years
                because they value one team that knows their whole financial picture. Prefer to work remotely? Nearly
                everything we do is available online through secure portals, e-signatures and video meetings.
              </p>
              <p>
                Whether you’re in Hampton, McDonough, Stockbridge, Locust Grove or Griffin, stop by, call or book a
                free consultation. We’re glad to be your neighbors.
              </p>
            </div>
          </div>
          <aside className="self-start rounded-2xl border border-line bg-paper p-7" aria-labelledby="areas-heading">
            <p id="areas-heading" className="flex items-center gap-2.5 font-serif text-2xl font-semibold text-ink">
              <MapPin aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.5} />
              Areas we serve
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-line bg-white px-4 py-2 text-[15px] font-semibold text-ink"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-charcoal">
              Our office: {site.address.street}, {site.address.suite}, {site.address.city}, {site.address.region}{" "}
              {site.address.postalCode}.
            </p>
          </aside>
        </div>
      </Section>

      <Section tone="paper" labelledBy="local-visit">
        <SectionHeading
          id="local-visit"
          eyebrow="Visit us"
          title="Find our Hampton office"
          intro="Plenty of parking and easy access from McDonough, Stockbridge, Locust Grove and Griffin."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactDetails />
          <MapEmbed height={480} className="min-h-[340px]" />
        </div>
      </Section>

      <Section tone="white" labelledBy="local-services">
        <SectionHeading
          id="local-services"
          eyebrow="Available locally"
          title="Services for Henry County families and businesses"
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="paper" labelledBy="local-tax-notes">
        <SectionHeading
          id="local-tax-notes"
          eyebrow="Local tax notes"
          title="Georgia and Henry County basics"
          intro="General information to help you get oriented — every business is different, so ask us about your specific situation."
        />
        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {taxNotes.map(({ Icon, title, text }) => (
            <StaggerItem key={title} className="rounded-2xl border border-line bg-white p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 leading-relaxed text-charcoal">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
