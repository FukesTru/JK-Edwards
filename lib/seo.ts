import type { Metadata } from "next";
import { site, team, type TeamMember } from "@/lib/site";
import { services } from "@/content/services";
import type { Faq } from "@/content/faqs";
import { stripLinks } from "@/lib/utils";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "JK Edwards & Company — accounting, tax & payroll in Hampton, Georgia",
};

type MetadataInput = {
  /** Primary keyword title — " | JK Edwards & Company" is appended. */
  title: string;
  description: string;
  path: string;
  /** Use the title exactly as given (home page). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Share image (defaults to the site-wide logo card). */
  image?: typeof defaultOgImage;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  image = defaultOgImage,
}: MetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const organizationId = `${site.url}/#organization`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${site.address.street}, ${site.address.suite}`,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

const henryCounty = {
  "@type": "AdministrativeArea",
  name: "Henry County, Georgia",
};

export const areaServed = [
  { "@type": "City", name: "Hampton, GA", containedInPlace: henryCounty },
  { "@type": "City", name: "McDonough, GA", containedInPlace: henryCounty },
  { "@type": "City", name: "Stockbridge, GA", containedInPlace: henryCounty },
  { "@type": "City", name: "Locust Grove, GA", containedInPlace: henryCounty },
  {
    "@type": "City",
    name: "Griffin, GA",
    containedInPlace: { "@type": "AdministrativeArea", name: "Spalding County, Georgia" },
  },
  henryCounty,
  { "@type": "Place", name: "Metro-south Atlanta, Georgia" },
  { "@type": "Country", name: "United States" },
];

const openingHoursSpecification = site.hours
  .filter((h) => h.opens && h.closes)
  .map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.opens,
    closes: h.closes,
  }));

/** Compact reference used as `provider` on Service schemas. */
export const providerRef = {
  "@type": "AccountingService",
  "@id": organizationId,
  name: site.name,
  url: site.url,
  telephone: site.phone.schema,
  address: postalAddress,
};

export function accountingServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService"],
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl(defaultOgImage.url),
    description: site.description,
    slogan: site.tagline,
    telephone: site.phone.schema,
    email: site.email,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.links.directions,
    openingHoursSpecification,
    areaServed,
    sameAs: Object.values(site.social),
    knowsAbout: services.map((s) => s.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Accounting, tax & advisory services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(s.href) },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": organizationId },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    email: site.email,
    telephone: site.phone.schema,
    address: postalAddress,
    sameAs: Object.values(site.social),
    employee: team.map((member) => ({ "@type": "Person", name: member.name })),
  };
}

export function personSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: { "@type": "Organization", "@id": organizationId, name: site.name },
    ...(member.credentialName
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: member.credentialName === "Certified Payroll Specialist" ? "certification" : "license",
            name: member.credentialName,
          },
        }
      : {}),
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  audience,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  audience?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType,
    provider: providerRef,
    areaServed,
    ...(audience ? { audience: { "@type": "Audience", audienceType: audience } } : {}),
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(item.a) },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [post.image, absoluteUrl(`${post.path}/opengraph-image`)],
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    articleSection: post.category,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(post.path) },
    author: { "@type": "Organization", "@id": organizationId, name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
  };
}
