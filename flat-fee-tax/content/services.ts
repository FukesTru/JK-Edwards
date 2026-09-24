import type { ImageKey } from "@/lib/images";

export type TaxPrepSlug = "individual-itemized" | "self-employed" | "rental-property" | "investments-k1";

export type TaxPrepPage = {
  slug: TaxPrepSlug;
  href: `/tax-preparation/${TaxPrepSlug}`;
  /** Nav / card label. */
  name: string;
  /** Short label used in breadcrumbs. */
  crumb: string;
  navDescription: string;
  summary: string;
  icon: "FileText" | "Briefcase" | "House" | "ChartLine";
  image: ImageKey;
};

/** The four tax-preparation sub-pages (all included in the one flat price). */
export const taxPrepPages: TaxPrepPage[] = [
  {
    slug: "individual-itemized",
    href: "/tax-preparation/individual-itemized",
    name: "Individual & Itemized",
    crumb: "Individual & Itemized",
    navDescription: "Form 1040 and Schedule A deductions",
    summary: "Your 1040, with a careful look at whether itemizing beats the standard deduction.",
    icon: "FileText",
    image: "kitchen-couple",
  },
  {
    slug: "self-employed",
    href: "/tax-preparation/self-employed",
    name: "Self-Employed (Sch C)",
    crumb: "Self-Employed & Schedule C",
    navDescription: "Freelance, 1099 and side-business income",
    summary: "Business income and expenses, home office, mileage and self-employment tax.",
    icon: "Briefcase",
    image: "tradesperson",
  },
  {
    slug: "rental-property",
    href: "/tax-preparation/rental-property",
    name: "Rental Property (Sch E)",
    crumb: "Rental Property & Schedule E",
    navDescription: "Rental income, expenses and depreciation",
    summary: "Rental income and expenses, depreciation and repairs vs. improvements.",
    icon: "House",
    image: "rental-property",
  },
  {
    slug: "investments-k1",
    href: "/tax-preparation/investments-k1",
    name: "Investments & K-1s",
    crumb: "Investments, 1099-B & K-1s",
    navDescription: "Brokerage 1099-B, crypto and Schedule K-1",
    summary: "Capital gains and losses, cost basis, crypto and pass-through K-1 income.",
    icon: "ChartLine",
    image: "investor-reading",
  },
];

export function getTaxPrepPage(slug: TaxPrepSlug) {
  const page = taxPrepPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown tax prep page: ${slug}`);
  return page;
}
