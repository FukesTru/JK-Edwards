import { site } from "../site.config";

/**
 * Values derived from site.config.ts. Components import `site` for raw
 * details and these helpers for anything that has to be a valid link, URL or
 * formatted price — so placeholders never produce broken links.
 */

export { site };

/** True while a value still contains a {{PLACEHOLDER}}. */
export const isPlaceholder = (value: string) => /\{\{[^}]+\}\}/.test(value);

/** Only return real values (for schema and links); placeholders become undefined. */
export const real = (value: string) => (value && !isPlaceholder(value) ? value : undefined);

export const formatPrice = (amount: number) => `$${amount.toLocaleString("en-US")}`;
export const prices = {
  taxPrep: formatPrice(site.prices.taxPrep),
  taxResolution: formatPrice(site.prices.taxResolution),
};

/* ---- Domain, canonical URL and optional sub-path ------------------------ */

const PLACEHOLDER_ORIGIN = "https://www.example.com";

function parseDomain(domain: string) {
  if (isPlaceholder(domain) || !domain.trim()) return { origin: PLACEHOLDER_ORIGIN, basePath: "" };
  const url = new URL(/^https?:\/\//.test(domain) ? domain : `https://${domain}`);
  return { origin: url.origin, basePath: url.pathname.replace(/\/+$/, "") };
}

const parsed = parseDomain(site.domain);

/** Path prefix when the site lives under a sub-path (e.g. example.com/tax → "/tax"). */
export const basePath = parsed.basePath;
/** Canonical site URL without a trailing slash, including any sub-path. */
export const siteUrl = parsed.origin + parsed.basePath;
/** Absolute URL for a path. The home page is "https://example.com/" — or "https://example.com/tax" under a basePath. */
export const absoluteUrl = (path = "/") => (path === "/" ? (basePath ? siteUrl : `${siteUrl}/`) : `${siteUrl}${path}`);
/** Prefix for files in /public referenced outside next/link (next/image, fetch…). */
export const withBasePath = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

/* ---- Contact links ------------------------------------------------------ */

const phoneDigits = site.phone.replace(/\D/g, "");
/** tel: link once a real number is set; until then, the Get Started page. */
export const phoneHref =
  phoneDigits.length >= 10 ? `tel:+${phoneDigits.length === 10 ? `1${phoneDigits}` : phoneDigits}` : "/get-started";
export const hasRealPhone = phoneHref.startsWith("tel:");

export const emailHref =
  site.email.includes("@") && !isPlaceholder(site.email) ? `mailto:${site.email}` : "/get-started";

const mapQuery = encodeURIComponent(isPlaceholder(site.address) ? site.primaryCity : site.address);
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const directionsUrl = (from?: string) =>
  `https://www.google.com/maps/dir/?api=1${from ? `&origin=${encodeURIComponent(from)}` : ""}&destination=${mapQuery}`;

/**
 * Basemap for the interactive service-area map. OpenFreeMap is free for
 * commercial use with no API key; set NEXT_PUBLIC_MAP_STYLE_URL to swap in
 * another MapLibre style (e.g. MapTiler or Stadia with your key).
 */
export const mapStyleUrl = process.env.NEXT_PUBLIC_MAP_STYLE_URL || "https://tiles.openfreemap.org/styles/positron";

export const secureUploadHref = real(site.secureUploadUrl);
export const bookingHref = real(site.bookingUrl);

/** Social profiles with a URL set (empty ones stay hidden). */
export const socialLinks = (
  [
    { key: "facebook", label: "Facebook", href: site.social.facebook },
    { key: "instagram", label: "Instagram", href: site.social.instagram },
    { key: "google", label: "Google Business Profile", href: site.social.google },
  ] as const
).filter((link) => Boolean(link.href));

/** Outline unconfirmed copy while reviewing. Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=false for launch. */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";

export const CLIENT_TO_CONFIRM = "[CLIENT TO CONFIRM]";
