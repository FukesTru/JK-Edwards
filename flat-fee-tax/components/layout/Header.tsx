import { Briefcase, ChartLine, FileText, House, LayoutGrid, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { NavEntry } from "@/components/layout/nav-types";
import { cities } from "@/content/cities";
import { taxPrepPages } from "@/content/services";
import { cta } from "@/lib/cta";
import { phoneHref, site } from "@/lib/site";

const iconClass = "h-5 w-5";
const prepIcons = { FileText, Briefcase, House, ChartLine };

/** Builds navigation on the server (icons render here, not in the client bundle). */
export function Header() {
  const nav: NavEntry[] = [
    { kind: "link", label: "Home", href: "/" },
    { kind: "link", label: "Pricing", href: "/pricing" },
    {
      kind: "menu",
      id: "tax-preparation",
      label: "Tax Preparation",
      variant: "list",
      groups: [
        {
          items: taxPrepPages.map((page) => {
            const Icon = prepIcons[page.icon];
            return {
              label: page.name,
              href: page.href,
              description: page.navDescription,
              icon: <Icon className={iconClass} strokeWidth={1.5} aria-hidden />,
            };
          }),
        },
      ],
      footer: { label: "Tax preparation overview", href: "/tax-preparation" },
    },
    { kind: "link", label: "Tax Resolution", href: "/tax-resolution" },
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
                icon: <MapPin className={iconClass} strokeWidth={1.5} aria-hidden />,
              })),
            {
              label: "All Areas",
              href: "/areas-we-serve",
              description: "Fayette & Coweta County — and virtual statewide",
              icon: <LayoutGrid className={iconClass} strokeWidth={1.5} aria-hidden />,
            },
          ],
        },
      ],
    },
    { kind: "link", label: "About", href: "/about" },
    { kind: "link", label: "FAQ", href: "/faq" },
  ];

  return <SiteHeader nav={nav} phone={{ display: site.phone, href: phoneHref }} startCta={cta.taxPrep} />;
}
