import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * 301 redirects from the old Rootworks template URLs (jkedwards.com) to the
 * new information architecture. Order matters: the more specific
 * /resources/* rules must come before the /resources catch-all.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/who-we-are", destination: "/about" },
  { source: "/what-we-do", destination: "/services" },
  { source: "/what-we-do/compliance", destination: "/services" },
  { source: "/what-we-do/tax", destination: "/services/tax-preparation-planning" },
  { source: "/what-we-do/bookkeeping", destination: "/services/bookkeeping" },
  { source: "/what-we-do/payroll", destination: "/services/payroll" },
  { source: "/what-we-do/audit-protection", destination: "/services/irs-tax-resolution" },
  { source: "/what-we-do/irs-problem-resolution", destination: "/services/irs-tax-resolution" },
  { source: "/what-we-do/business-management-services", destination: "/services/business-advisory" },
  { source: "/what-we-do/business-foundation-services", destination: "/services/new-business-setup" },
  { source: "/what-we-do/entity-type-analysis", destination: "/services/new-business-setup" },
  { source: "/what-we-do/accounting-system-setup", destination: "/services/new-business-setup" },
  { source: "/what-we-do/retirement-plan-analysis", destination: "/services/new-business-setup" },
  { source: "/what-we-do/credit-card-rewards", destination: "/services/new-business-setup" },
  { source: "/what-we-do/quick-books", destination: "/services/quickbooks" },
  { source: "/who-we-serve", destination: "/industries" },
  { source: "/who-we-serve/trucking-and-transport", destination: "/industries/trucking" },
  { source: "/who-we-serve/healthcare", destination: "/industries/healthcare" },
  { source: "/who-we-serve/attorneys", destination: "/industries/attorneys" },
  { source: "/who-we-serve/workers-abroad-expats", destination: "/industries/expat-tax" },
  { source: "/who-we-serve/service-based-businesses", destination: "/industries" },
  {
    source: "/who-we-serve/individual-and-family-tax-services",
    destination: "/services/tax-preparation-planning",
  },
  // Syndicated magazine / quick-read / e-book content was not migrated.
  { source: "/resources/magazine/:path*", destination: "/blog" },
  { source: "/resources/quick-reads/:path*", destination: "/blog" },
  { source: "/resources/e-books/:path*", destination: "/blog" },
  // Library, forms, refund tracker, SafeSend and TaxCaddy resources.
  { source: "/resources/:path*", destination: "/client-center" },
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Artlist-generated photography (see content/images.json). Run
      // `npm run images:pull` to self-host these under /public/images.
      {
        protocol: "https",
        hostname: "cms-toolkit-artifacts.artlist.io",
        pathname: "/content/**",
      },
    ],
  },
  async redirects() {
    return [
      // Canonical host: jkedwards.com -> www.jkedwards.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "jkedwards.com" }],
        destination: "https://www.jkedwards.com/:path*",
        statusCode: 301,
      },
      ...legacyRedirects.map((redirect) => ({ ...redirect, statusCode: 301 as const })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
