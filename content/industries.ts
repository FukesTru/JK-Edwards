import type { IconName } from "@/components/ui/icon-map";
import type { ImageKey } from "@/lib/images";

export type IndustrySlug = "trucking" | "healthcare" | "attorneys" | "expat-tax";

export type Industry = {
  slug: IndustrySlug;
  href: `/industries/${IndustrySlug}`;
  name: string;
  shortName: string;
  icon: IconName;
  /** Card copy on the home page and industries hub. */
  blurb: string;
  navDescription: string;
  image: ImageKey;
  /** Schema.org audience description. */
  audience: string;
  seo: { title: string; description: string };
};

export const industries: Industry[] = [
  {
    slug: "trucking",
    href: "/industries/trucking",
    name: "Trucking & Transportation",
    shortName: "Trucking & Transport",
    icon: "Truck",
    blurb:
      "Owner-operators and fleets: per diem, IFTA, Form 2290, equipment depreciation and driver payroll.",
    navDescription: "Owner-operators, fleets & carriers",
    image: "industry-trucking",
    audience: "Trucking and transportation businesses, owner-operators and fleets",
    seo: {
      title: "Trucking Accountant in Georgia",
      description:
        "Trucking accountant for Georgia owner-operators and fleets: per diem, IFTA, Form 2290, depreciation, driver payroll and entity planning. Book a consultation.",
    },
  },
  {
    slug: "healthcare",
    href: "/industries/healthcare",
    name: "Healthcare Practices",
    shortName: "Healthcare",
    icon: "Stethoscope",
    blurb:
      "Medical, dental and therapy practices: monthly financials, practice tax planning and staff payroll.",
    navDescription: "Medical, dental & therapy practices",
    image: "industry-healthcare",
    audience: "Independent medical, dental and therapy practices",
    seo: {
      title: "Accountant for Medical Practices, GA",
      description:
        "Accountant for Georgia medical, dental and therapy practices: monthly financials, practice tax planning, payroll and KPI reporting. Book a free consultation.",
    },
  },
  {
    slug: "attorneys",
    href: "/industries/attorneys",
    name: "Attorneys & Law Firms",
    shortName: "Attorneys & Law Firms",
    icon: "Scale",
    blurb:
      "Solo attorneys and firms: trust account reconciliation support, partner distributions and tax planning.",
    navDescription: "Solo practitioners & small firms",
    image: "industry-attorneys",
    audience: "Attorneys, solo practitioners and law firms",
    seo: {
      title: "Accountant for Law Firms in Georgia",
      description:
        "Accountant for Georgia attorneys and law firms: trust account reconciliation support, partner distributions, cash flow, payroll and tax planning. Book a call.",
    },
  },
  {
    slug: "expat-tax",
    href: "/industries/expat-tax",
    name: "U.S. Expats & Workers Abroad",
    shortName: "U.S. Expats",
    icon: "Globe",
    blurb:
      "Americans living and working overseas: annual returns, the FEIE, foreign tax credits and FBAR filing.",
    navDescription: "Americans living & working overseas",
    image: "industry-expats",
    audience: "U.S. citizens and green card holders living or working abroad",
    seo: {
      title: "Expat Tax Prep for US Citizens Abroad",
      description:
        "Expat tax preparation for U.S. citizens abroad: annual returns, Foreign Earned Income Exclusion, foreign tax credits, FBAR and FATCA, fully remote. Get started.",
    },
  },
];

export const otherIndustries = [
  "Service-based businesses",
  "Real estate investors & agents",
  "Government & military families",
  "Self-employed professionals",
  "Individuals & families",
];

export function getIndustry(slug: IndustrySlug): Industry {
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) throw new Error(`Unknown industry: ${slug}`);
  return industry;
}
