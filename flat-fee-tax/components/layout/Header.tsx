import { SiteHeader } from "@/components/layout/SiteHeader";
import type { NavEntry } from "@/components/layout/nav-types";
import { cities } from "@/content/cities";
import { taxPrepPages } from "@/content/services";
import { cta } from "@/lib/cta";
import { phoneHref, site } from "@/lib/site";

/** Main navigation: Home · Services · Pricing · Areas We Serve · About · FAQ. */
export function Header() {
  const nav: NavEntry[] = [
    { kind: "link", label: "Home", href: "/" },
    {
      kind: "menu",
      id: "services",
      label: "Services",
      variant: "list",
      groups: [
        {
          items: [
            {
              label: "Tax Preparation",
              href: "/tax-preparation",
              description: "Prepared by a CPA, reviewed by an Enrolled Agent",
            },
            ...taxPrepPages.map((page) => ({
              label: page.name,
              href: page.href,
              description: page.navDescription,
            })),
            {
              label: "Tax Resolution",
              href: "/tax-resolution",
              description: "IRS notices, back taxes and payment plans",
            },
          ],
        },
      ],
    },
    { kind: "link", label: "Pricing", href: "/pricing" },
    {
      kind: "menu",
      id: "areas",
      label: "Areas We Serve",
      variant: "list",
      groups: [
        {
          items: [
            ...cities
              .filter((city) => city.slug)
              .map((city) => ({
                label: `${city.name}, GA`,
                href: `/areas-we-serve/${city.slug}`,
                description: city.county,
              })),
            { label: "Virtually", href: "/areas-we-serve#virtual", description: "Anywhere in Georgia, fully online" },
          ],
        },
      ],
    },
    { kind: "link", label: "About", href: "/about" },
    { kind: "link", label: "FAQ", href: "/faq" },
  ];

  return <SiteHeader nav={nav} phone={{ display: site.phone, href: phoneHref }} startCta={cta.taxPrep} />;
}
