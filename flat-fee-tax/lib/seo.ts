import type { Metadata } from "next";
import type { Faq } from "@/content/faqs";
import { absoluteUrl, prices, real, site, siteUrl, socialLinks } from "@/lib/site";
import { stripLinks } from "@/lib/utils";

export const defaultOgImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${site.brandName} — CPA-signed tax returns in ${site.primaryCity}`,
};

type MetadataInput = {
  /** Primary keyword title — " | {brandName}" is appended. Keep it short enough for the final brand name. */
  title: string;
  /** 150–160 characters: keyword, city/GA, "CPA-signed" and a call to action. Prices only on Pricing and the two service pages. */
  description: string;
  path: string;
  /** Use the title exactly as given. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, absoluteTitle, noindex }: MetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.brandName}`;
  const url = absoluteUrl(path);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: site.brandName,
      locale: "en_US",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: defaultOgImage.url, alt: defaultOgImage.alt }],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export const businessId = `${siteUrl}/#business`;
const kaiId = `${siteUrl}/about#kai-mays`;
const cpaId = `${siteUrl}/about#signing-cpa`;

const county = (name: string) => ({ "@type": "AdministrativeArea", name: `${name}, Georgia` });
const fayette = county("Fayette County");
const coweta = county("Coweta County");
const countyOf: Record<string, ReturnType<typeof county>> = {
  "Peachtree City": fayette,
  Fayetteville: fayette,
  Tyrone: fayette,
  Brooks: fayette,
  Newnan: coweta,
  Sharpsburg: coweta,
  Senoia: coweta,
};

export const cityPlace = (city: string) => ({
  "@type": "City",
  name: `${city}, GA`,
  ...(countyOf[city] ? { containedInPlace: countyOf[city] } : {}),
});

const allAreas = [...site.cities.map(cityPlace), fayette, coweta];

/** Street address only when the real address is set; locality/region always. */
function postalAddress() {
  const street = real(site.address)?.split(",")[0];
  const zip = real(site.address)?.match(/\b\d{5}\b/)?.[0];
  return {
    "@type": "PostalAddress",
    ...(street ? { streetAddress: street } : {}),
    addressLocality: "Peachtree City",
    addressRegion: "GA",
    ...(zip ? { postalCode: zip } : {}),
    addressCountry: "US",
  };
}

const offer = (name: string, price: number, path: string) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "USD",
  url: absoluteUrl(path),
  availability: "https://schema.org/InStock",
});

/** Catalog entry without a price — prices are marked up only on the pages that show them. */
const catalogItem = (name: string, path: string) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Service", name, url: absoluteUrl(path) },
});

/** Site-wide business entity. City pages pass a single city for `areaServed`. */
export function accountingServiceSchema(city?: string) {
  const telephone = real(site.phone);
  const email = real(site.email);
  const hours = real(site.hours);
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": businessId,
    name: site.brandName,
    legalName: site.legalName,
    url: `${siteUrl}/`,
    logo: absoluteUrl("/brand/icon-512.png"),
    image: absoluteUrl("/opengraph-image"),
    description: `Tax preparation and IRS tax resolution in ${site.primaryCity}. Every return is prepared and signed by a licensed CPA and reviewed by an Enrolled Agent.`,
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    address: postalAddress(),
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    ...(hours ? { openingHours: hours } : {}),
    areaServed: city ? cityPlace(city) : allAreas,
    founder: { "@id": kaiId },
    employee: [{ "@id": kaiId }, { "@id": cpaId }],
    ...(socialLinks.length ? { sameAs: socialLinks.map((link) => link.href) } : {}),
    knowsAbout: [
      "Individual income tax preparation",
      "Form 1040",
      "Schedule A itemized deductions",
      "Schedule C self-employment income",
      "Schedule E rental income",
      "Form 1099-B",
      "Schedule K-1",
      "IRS tax resolution",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        catalogItem("Tax Preparation", "/tax-preparation"),
        catalogItem("Tax Resolution", "/tax-resolution"),
      ],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.brandName,
    url: `${siteUrl}/`,
    inLanguage: "en-US",
    publisher: { "@id": businessId },
  };
}

type ServiceInput = { name: string; description: string; path: string; price?: number; serviceType: string };

/** Service schema. Pass `price` only on pages that show it (Pricing and the two service pages). */
export function serviceSchema({ name, description, path, price, serviceType }: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { "@id": businessId },
    areaServed: allAreas,
    ...(price ? { offers: offer(name, price, path) } : {}),
  };
}

export const taxPrepService = () =>
  serviceSchema({
    name: "Tax Preparation",
    serviceType: "Individual income tax preparation",
    description: `Flat ${prices.taxPrep} individual tax return (Form 1040) including Schedules A, C and E, 1099-B brokerage statements and Schedule K-1 income — prepared and signed by a CPA and reviewed by an Enrolled Agent.`,
    path: "/tax-preparation",
    price: site.prices.taxPrep,
  });

export const taxResolutionService = () =>
  serviceSchema({
    name: "Tax Resolution",
    serviceType: "IRS tax resolution and representation",
    description: `Flat ${prices.taxResolution} IRS tax resolution: notice review, transcript analysis, power of attorney and communication with the IRS on your behalf by an Enrolled Agent.`,
    path: "/tax-resolution",
    price: site.prices.taxResolution,
  });

export function personSchemas() {
  const cpaLicense = real(site.cpaLicense);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": kaiId,
      name: site.owner.replace(/,\s*EA$/, ""),
      honorificSuffix: "EA",
      jobTitle: "Enrolled Agent",
      worksFor: { "@id": businessId },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "Enrolled Agent",
        credentialCategory: "license",
        recognizedBy: { "@type": "GovernmentOrganization", name: "Internal Revenue Service" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": cpaId,
      name: site.cpaName.replace(/,\s*CPA$/, ""),
      honorificSuffix: "CPA",
      jobTitle: "Certified Public Accountant",
      worksFor: { "@id": businessId },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "Certified Public Accountant",
        credentialCategory: "license",
        recognizedBy: { "@type": "GovernmentOrganization", name: "Georgia State Board of Accountancy" },
        ...(cpaLicense ? { identifier: cpaLicense } : {}),
      },
    },
  ];
}

/** FAQPage schema. Answers still waiting on the owner ([CLIENT TO CONFIRM], {{…}}) are left out until confirmed. */
export function faqSchema(items: Faq[]) {
  const ready = items.filter((item) => !/\[CLIENT TO CONFIRM|\{\{/.test(item.a));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ready.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(item.a) },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
