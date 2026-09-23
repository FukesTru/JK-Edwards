import type { IconName } from "@/components/ui/icon-map";
import type { ImageKey } from "@/lib/images";

export type ServiceSlug =
  | "tax-preparation-planning"
  | "bookkeeping"
  | "payroll"
  | "irs-tax-resolution"
  | "business-advisory"
  | "new-business-setup"
  | "quickbooks";

export type Service = {
  slug: ServiceSlug;
  href: `/services/${ServiceSlug}`;
  name: string;
  shortName: string;
  icon: IconName;
  group: "tax" | "advisory";
  /** One-line benefit used on home-page cards. */
  benefit: string;
  /** Short line under the link in the mega menu. */
  navDescription: string;
  /** Services-hub summary. */
  summary: string;
  highlights: [string, string, string];
  image: ImageKey;
  /** Schema.org serviceType. */
  serviceType: string;
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "tax-preparation-planning",
    href: "/services/tax-preparation-planning",
    name: "Tax Preparation & Planning",
    shortName: "Tax Prep & Planning",
    icon: "ReceiptText",
    group: "tax",
    benefit: "Keep more of what you earn with strategic, year-round planning.",
    navDescription: "Individual & business returns, planned all year",
    summary:
      "Accurate individual and business returns, delivered digitally — plus proactive planning throughout the year, not just in April.",
    highlights: [
      "Individual, family and business returns",
      "Multi-state and prior-year filings",
      "Quarterly estimates and tax projections",
    ],
    image: "service-tax",
    serviceType: "Tax preparation and tax planning",
    seo: {
      title: "Tax Preparation in Hampton, GA",
      description:
        "Tax preparation and year-round tax planning in Hampton, GA for individuals, families and businesses. Secure, digital and personal. Book a free consultation.",
    },
  },
  {
    slug: "bookkeeping",
    href: "/services/bookkeeping",
    name: "Bookkeeping & Outsourced Accounting",
    shortName: "Bookkeeping",
    icon: "BookOpenCheck",
    group: "tax",
    benefit: "You run your business. We’ll run your numbers.",
    navDescription: "Monthly books, reconciliations & statements",
    summary:
      "Books that are reconciled, categorized and current every month — turned into financial statements you can actually use.",
    highlights: [
      "Monthly reconciliations and financial statements",
      "Catch-up and cleanup bookkeeping",
      "Bill.com payables and Dext receipt capture",
    ],
    image: "service-bookkeeping",
    serviceType: "Bookkeeping and outsourced accounting",
    seo: {
      title: "Bookkeeping Services in Hampton, GA",
      description:
        "Bookkeeping and outsourced accounting in Hampton, GA: monthly reconciliations, financial statements and cleanup for a fixed monthly fee. Get a free quote today.",
    },
  },
  {
    slug: "payroll",
    href: "/services/payroll",
    name: "Payroll Services",
    shortName: "Payroll",
    icon: "HandCoins",
    group: "tax",
    benefit: "Hand off complex payroll and never miss a filing.",
    navDescription: "Payroll runs, tax deposits, W-2s & 1099s",
    summary:
      "Payroll that runs on time, with federal and Georgia tax deposits, quarterly returns and year-end forms handled for you.",
    highlights: [
      "Payroll runs and employee e-paystubs",
      "Federal and Georgia payroll tax filings",
      "W-2s, 1099s and new-hire setup",
    ],
    image: "service-payroll",
    serviceType: "Payroll processing and payroll tax compliance",
    seo: {
      title: "Small Business Payroll Services, GA",
      description:
        "Small business payroll services in Georgia: payroll runs, federal and state tax deposits, quarterly 941s, W-2s and 1099s done for you. Book a free consultation.",
    },
  },
  {
    slug: "irs-tax-resolution",
    href: "/services/irs-tax-resolution",
    name: "IRS Problem Resolution & Audit Protection",
    shortName: "IRS Resolution",
    icon: "ShieldCheck",
    group: "tax",
    benefit: "Got a letter from the IRS? We’ll handle it.",
    navDescription: "IRS notices, back taxes & audit defense",
    summary:
      "Representation before the IRS and the Georgia DOR for notices, unfiled returns, liens, levies and audits — so you never face them alone.",
    highlights: [
      "IRS and Georgia DOR notices",
      "Unfiled returns, liens and levies",
      "Audit representation and protection",
    ],
    image: "service-irs",
    serviceType: "IRS tax resolution and audit representation",
    seo: {
      title: "IRS Tax Resolution in Georgia",
      description:
        "IRS tax resolution in Georgia: an Enrolled Agent and CPA handle IRS notices, back taxes, levies, garnishments and audits for you. Upload your notice or call us.",
    },
  },
  {
    slug: "business-advisory",
    href: "/services/business-advisory",
    name: "Business Advisory & Fractional CFO",
    shortName: "Business Advisory / CFO",
    icon: "TrendingUp",
    group: "advisory",
    benefit: "CFO-level insight at a fraction of the cost.",
    navDescription: "Budgets, KPIs, cash flow & strategy",
    summary:
      "Regular strategy meetings and plain-English reports on cash flow, margins and KPIs — a CFO’s insight without a full-time salary.",
    highlights: [
      "Budgeting and cash-flow forecasting",
      "Industry KPIs and profitability analysis",
      "Tax planning and projections",
    ],
    image: "service-advisory",
    serviceType: "Business advisory and fractional CFO services",
    seo: {
      title: "Fractional CFO for Small Business, GA",
      description:
        "Fractional CFO and business advisory services for Georgia small businesses: budgets, cash flow, KPIs and tax projections in plain English. Book a consultation.",
    },
  },
  {
    slug: "new-business-setup",
    href: "/services/new-business-setup",
    name: "New Business Setup",
    shortName: "New Business Setup",
    icon: "Rocket",
    group: "advisory",
    benefit: "Start right: entity, books, retirement plan.",
    navDescription: "Entity choice, books & retirement plans",
    summary:
      "Choose the right entity, set up your books and payroll, and build good financial habits from the very first day.",
    highlights: [
      "LLC vs. S corp vs. C corp analysis",
      "Accounting system setup",
      "Retirement plan and rewards strategy",
    ],
    image: "service-new-business",
    serviceType: "New business formation and entity selection",
    seo: {
      title: "LLC vs S Corp Accountant in Georgia",
      description:
        "Starting a business in Georgia? Get help choosing LLC vs. S corp, registering, setting up books and payroll and picking a retirement plan. Book a consultation.",
    },
  },
  {
    slug: "quickbooks",
    href: "/services/quickbooks",
    name: "QuickBooks Consulting & Setup",
    shortName: "QuickBooks Consulting",
    icon: "LaptopMinimalCheck",
    group: "advisory",
    benefit: "Set up, cleaned up, and working for you.",
    navDescription: "Setup, cleanup, training & migration",
    summary:
      "Certified QuickBooks ProAdvisors who set up, clean up and fine-tune your file — and teach your team to use it with confidence.",
    highlights: [
      "New file setup and chart of accounts",
      "Cleanup, training and optimization",
      "Desktop-to-Online migration",
    ],
    image: "service-quickbooks",
    serviceType: "QuickBooks setup, training and consulting",
    seo: {
      title: "QuickBooks ProAdvisor in Hampton, GA",
      description:
        "Certified QuickBooks ProAdvisors in Hampton, GA for setup, cleanup, training, Desktop-to-Online migration and hosted Desktop. Book a QuickBooks consultation.",
    },
  },
];

export const serviceGroups = [
  { key: "tax" as const, title: "Tax & Compliance" },
  { key: "advisory" as const, title: "Advisory & Setup" },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
