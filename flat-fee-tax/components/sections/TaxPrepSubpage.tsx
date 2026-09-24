import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { PriceCard } from "@/components/ui/PriceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Callout } from "@/components/sections/Callout";
import { RelatedLinks, type RelatedLink } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Faq } from "@/content/faqs";
import { getTaxPrepPage, type TaxPrepSlug } from "@/content/services";
import { cta } from "@/lib/cta";
import { serviceSchema } from "@/lib/seo";
import { prices, site } from "@/lib/site";

/**
 * Shared frame for the four tax-preparation sub-pages: navy hero with the
 * price card, breadcrumbs, page-specific sections (children), the
 * "still {price}" callout, FAQ and related links.
 */
export function TaxPrepSubpage({
  slug,
  title,
  subtitle,
  serviceDescription,
  children,
  calloutTitle = `Still ${prices.taxPrep} — no add-on fees`,
  calloutText,
  faqs,
  faqTitle,
  related,
}: {
  slug: TaxPrepSlug;
  title: ReactNode;
  subtitle: ReactNode;
  serviceDescription: string;
  children: ReactNode;
  calloutTitle?: ReactNode;
  calloutText: ReactNode;
  faqs: Faq[];
  faqTitle: string;
  related: RelatedLink[];
}) {
  const page = getTaxPrepPage(slug);
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Tax Preparation — ${page.crumb}`,
          serviceType: "Individual income tax preparation",
          description: serviceDescription,
          path: page.href,
          price: site.prices.taxPrep,
        })}
      />
      <PageHero
        eyebrow={`Tax preparation · ${page.crumb}`}
        title={title}
        subtitle={subtitle}
        image={page.image}
        aside={
          <div className="mx-auto w-full max-w-sm">
            <PriceCard
              service="taxPrep"
              title="Tax Preparation"
              headingLevel="p"
              tagline={`${page.crumb} included — prepared & signed by a CPA, reviewed by an Enrolled Agent.`}
              cta={cta.taxPrepShort}
            />
          </div>
        }
      />
      <Breadcrumbs
        items={[
          { name: "Tax Preparation", path: "/tax-preparation" },
          { name: page.crumb, path: page.href },
        ]}
      />

      {children}

      <Section tone="white" reveal={false}>
        <Callout kind="price" title={calloutTitle} cta={cta.taxPrep}>
          {calloutText}
        </Callout>
      </Section>

      <Section tone="paper" labelledBy={`${slug}-faq`}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id={`${slug}-faq`} eyebrow="FAQ" title={faqTitle} />
          <FaqAccordion items={faqs} />
        </div>
      </Section>

      <Section tone="white">
        <RelatedLinks links={related} title="Keep exploring" eyebrow="Related" />
      </Section>
    </>
  );
}
