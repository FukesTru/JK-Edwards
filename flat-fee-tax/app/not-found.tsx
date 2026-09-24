import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Page Not Found | ${site.brandName}` },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title="We couldn’t find that page"
        subtitle="The link may be out of date. Try one of the pages below — or start your return right now."
      />
      <Section tone="white">
        <RelatedLinks
          eyebrow="Popular pages"
          title="Where would you like to go?"
          links={[
            { label: "Pricing", href: "/pricing", description: "Two services, two flat fees.", icon: "Tag" },
            {
              label: "Tax Preparation",
              href: "/tax-preparation",
              description: "CPA-signed, EA-reviewed returns.",
              icon: "FileText",
            },
            {
              label: "Tax Resolution",
              href: "/tax-resolution",
              description: "Help with IRS notices and balances due.",
              icon: "ShieldCheck",
            },
            {
              label: "Get Started",
              href: "/get-started",
              description: "Book your return today.",
              icon: "CalendarCheck",
            },
          ]}
        />
      </Section>
    </>
  );
}
