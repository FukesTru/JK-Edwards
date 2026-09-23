import { posts } from "@/content/blog/posts";
import { industries } from "@/content/industries";
import { services } from "@/content/services";

export type RouteGroup = "Main pages" | "Services" | "Industries" | "Blog articles" | "Legal";

export type SiteRoute = {
  path: string;
  name: string;
  group: RouteGroup;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** ISO date the page content last changed. */
  lastModified: string;
};

/** Date the static pages were last revised — bump when their content changes. */
export const siteUpdated = "2026-09-23";

const page = (
  path: string,
  name: string,
  group: RouteGroup,
  priority: number,
  changeFrequency: SiteRoute["changeFrequency"] = "monthly",
): SiteRoute => ({ path, name, group, priority, changeFrequency, lastModified: siteUpdated });

/** Every indexable page — feeds sitemap.xml and the HTML sitemap. */
export const routes: SiteRoute[] = [
  page("/", "Home", "Main pages", 1),
  page("/about", "About Us & Our Team", "Main pages", 0.7),
  page("/services", "Services", "Main pages", 0.9),
  page("/industries", "Industries", "Main pages", 0.8),
  page("/henry-county-accountant", "Henry County Accountant", "Main pages", 0.8),
  page("/blog", "Blog: Tax & Business Insights", "Main pages", 0.7, "weekly"),
  page("/faq", "Frequently Asked Questions", "Main pages", 0.6),
  page("/contact", "Contact & Free Consultation", "Main pages", 0.8),
  page("/client-center", "Client Center", "Main pages", 0.3),
  ...services.map((service) => page(service.href, service.name, "Services", 0.9)),
  ...industries.map((industry) => page(industry.href, industry.name, "Industries", 0.8)),
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    name: post.title,
    group: "Blog articles" as const,
    priority: 0.6,
    changeFrequency: "yearly" as const,
    lastModified: post.updated ?? post.date,
  })),
  page("/privacy-policy", "Privacy Policy", "Legal", 0.2, "yearly"),
  page("/terms-disclaimer", "Terms of Use & Disclaimer", "Legal", 0.2, "yearly"),
  page("/sitemap", "Sitemap", "Legal", 0.2, "monthly"),
];

export const routeGroups: RouteGroup[] = ["Main pages", "Services", "Industries", "Blog articles", "Legal"];
