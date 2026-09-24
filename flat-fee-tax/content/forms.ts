import type { TaxPrepSlug } from "@/content/services";

export type IncludedForm = {
  form: string;
  /** Short label for checkmark lists. */
  short: string;
  /** One-line plain-English explanation. */
  description: string;
  href: `/tax-preparation/${TaxPrepSlug}`;
};

/** Everything covered by the flat tax-preparation fee — reused on many pages. */
export const includedForms: IncludedForm[] = [
  {
    form: "Form 1040",
    short: "1040",
    description: "Your individual federal income tax return.",
    href: "/tax-preparation/individual-itemized",
  },
  {
    form: "Schedule A",
    short: "Sch A",
    description: "Itemized deductions — mortgage interest, property tax and charitable gifts.",
    href: "/tax-preparation/individual-itemized",
  },
  {
    form: "Schedule C",
    short: "Sch C",
    description: "Self-employed, freelance and side-business income.",
    href: "/tax-preparation/self-employed",
  },
  {
    form: "Schedule E",
    short: "Sch E",
    description: "Rental property and pass-through income.",
    href: "/tax-preparation/rental-property",
  },
  {
    form: "1099-B",
    short: "1099-B",
    description: "Stock, fund and crypto brokerage sales.",
    href: "/tax-preparation/investments-k1",
  },
  {
    form: "Schedule K-1",
    short: "K-1",
    description: "Partnership, S-corp and trust income.",
    href: "/tax-preparation/investments-k1",
  },
];
