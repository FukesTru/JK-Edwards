import { cityPages } from "@/content/cities";
import { taxPrepPages } from "@/content/services";

export type RouteGroup = "Main pages" | "Tax preparation" | "Areas we serve" | "Legal";

export type SiteRoute = {
  path: string;
  name: string;
  group: RouteGroup;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

const page = (
  path: string,
  name: string,
  group: RouteGroup,
  priority: number,
  changeFrequency: SiteRoute["changeFrequency"] = "monthly",
): SiteRoute => ({ path, name, group, priority, changeFrequency });

/** Every indexable page — feeds sitemap.xml and the HTML sitemap. */
export const routes: SiteRoute[] = [
  page("/", "Home", "Main pages", 1),
  page("/pricing", "Pricing", "Main pages", 0.9),
  page("/how-it-works", "How It Works", "Main pages", 0.8),
  page("/tax-resolution", "Tax Resolution", "Main pages", 0.9),
  page("/about", "About", "Main pages", 0.7),
  page("/faq", "Frequently Asked Questions", "Main pages", 0.6),
  page("/get-started", "Get Started", "Main pages", 0.8),
  page("/tax-preparation", "Tax Preparation", "Tax preparation", 0.9),
  ...taxPrepPages.map((p) => page(p.href, p.crumb, "Tax preparation", 0.8)),
  page("/areas-we-serve", "Areas We Serve", "Areas we serve", 0.8),
  ...cityPages.map((c) => page(`/areas-we-serve/${c.slug}`, `${c.name}, GA`, "Areas we serve", 0.7)),
  page("/privacy-policy", "Privacy Policy", "Legal", 0.2, "yearly"),
  page("/terms", "Terms", "Legal", 0.2, "yearly"),
  page("/sitemap", "Sitemap", "Legal", 0.2),
];

export const routeGroups: RouteGroup[] = ["Main pages", "Tax preparation", "Areas we serve", "Legal"];
