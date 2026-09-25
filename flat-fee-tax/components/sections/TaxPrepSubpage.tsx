import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Callout } from "@/components/sections/Callout";
import { RelatedLinks, type RelatedLink } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Faq } from "@/content/faqs";
import { getTaxPrepPage, type TaxPrepSlug } from "@/content/services";
import { cta } from "@/lib/cta";
import { serviceSchema } from "@/lib/seo";

/**
 * Shared frame for the four tax-preparation sub-pages: navy hero,
 * breadcrumbs, page-specific sections (children), the "included on every
 * return" callout, FAQ and related links. Prices live on /pricing.
 */
export function TaxPrepSubpage({
  slug,
  title,
  subtitle,
  serviceDescription,
  children,
  calloutTitle = "Included on every return",
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
          name: `Tax Preparation: ${page.crumb}`,
          serviceType: "Individual income tax preparation",
          description: serviceDescription,
          path: page.href,
        })}
      />
      <PageHero eyebrow={`Tax preparation · ${page.crumb}`} title={title} subtitle={subtitle} image={page.image} />
      <Breadcrumbs
        items={[
          { name: "Tax Preparation", path: "/tax-preparation" },
          { name: page.crumb, path: page.href },
        ]}
      />

      {children}

      <Section tone="white" reveal={false}>
        <Callout title={calloutTitle} cta={cta.taxPrep}>
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
