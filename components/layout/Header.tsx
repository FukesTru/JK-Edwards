import { CircleHelp, LayoutDashboard, Newspaper } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { NavEntry } from "@/components/layout/nav-types";
import { icons } from "@/components/ui/icon-map";
import { industries } from "@/content/industries";
import { serviceGroups, services } from "@/content/services";
import { site } from "@/lib/site";

const iconClass = "h-5 w-5";

/** Builds navigation on the server (icons render here, not in the client bundle). */
export function Header() {
  const nav: NavEntry[] = [
    { kind: "link", label: "About", href: "/about" },
    {
      kind: "menu",
      id: "services",
      label: "Services",
      variant: "mega",
      groups: serviceGroups.map((group) => ({
        title: group.title,
        items: services
          .filter((service) => service.group === group.key)
          .map((service) => {
            const Icon = icons[service.icon];
            return {
              label: service.shortName,
              href: service.href,
              description: service.navDescription,
              icon: <Icon className={iconClass} strokeWidth={1.5} aria-hidden />,
            };
          }),
      })),
      footer: {
        label: "View all services",
        href: "/services",
        note: "Not sure where to start? A free consultation will point you in the right direction.",
      },
    },
    {
      kind: "menu",
      id: "industries",
      label: "Industries",
      variant: "list",
      groups: [
        {
          items: industries.map((industry) => {
            const Icon = icons[industry.icon];
            return {
              label: industry.shortName,
              href: industry.href,
              description: industry.navDescription,
              icon: <Icon className={iconClass} strokeWidth={1.5} aria-hidden />,
            };
          }),
        },
      ],
      footer: { label: "All industries", href: "/industries" },
    },
    {
      kind: "menu",
      id: "resources",
      label: "Resources",
      variant: "list",
      groups: [
        {
          items: [
            {
              label: "Client Center",
              href: "/client-center",
              description: "Portals, payments & refund trackers",
              icon: <LayoutDashboard className={iconClass} strokeWidth={1.5} aria-hidden />,
            },
            {
              label: "Blog",
              href: "/blog",
              description: "Tax & small-business insights",
              icon: <Newspaper className={iconClass} strokeWidth={1.5} aria-hidden />,
            },
            {
              label: "FAQ",
              href: "/faq",
              description: "Answers to common questions",
              icon: <CircleHelp className={iconClass} strokeWidth={1.5} aria-hidden />,
            },
          ],
        },
      ],
    },
    { kind: "link", label: "Contact", href: "/contact" },
  ];

  return <SiteHeader nav={nav} phone={site.phone} payBillHref={site.links.payBill} />;
}
