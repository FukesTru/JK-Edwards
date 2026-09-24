import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CtaBand } from "@/components/layout/CtaBand";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { brandColors } from "@/lib/brand";
import { accountingServiceSchema, websiteSchema } from "@/lib/seo";
import { prices, site, siteUrl, withBasePath } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Flat-Fee CPA-Signed Tax Returns, ${prices.taxPrep} | ${site.brandName}`,
    template: `%s | ${site.brandName}`,
  },
  description: `Flat ${prices.taxPrep} tax returns prepared and signed by a CPA and reviewed by an Enrolled Agent, plus ${prices.taxResolution} IRS tax resolution, in ${site.primaryCity}.`,
  applicationName: site.brandName,
  // Explicit icon routes (rather than app/icon.tsx) so the links also work under a basePath.
  icons: {
    icon: [
      { url: withBasePath("/brand/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: withBasePath("/brand/favicon-16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: withBasePath("/brand/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  category: "finance",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: { siteName: site.brandName, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: brandColors.navy,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <head>
        <GoogleAnalytics />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2.5 focus:font-semibold focus:text-navy focus:shadow-lg"
        >
          Skip to main content
        </a>
        <JsonLd data={[accountingServiceSchema(), websiteSchema()]} />
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <CtaBand />
          <Footer />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}
