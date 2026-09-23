export type AccountingPackage = {
  key: "basic" | "standard" | "complete";
  name: string;
  tagline: string;
  /** Tier this package builds on ("Everything in Basic, plus…"). */
  includesPrevious?: string;
  features: string[];
  popular?: boolean;
};

export const accountingPackages: AccountingPackage[] = [
  {
    key: "basic",
    name: "Basic",
    tagline: "Clean books, tax prep and a quarterly check-in.",
    features: [
      "Bank, credit card and electronic transactions reconciled in QuickBooks",
      "Tax preparation",
      "Monthly financial statements",
      "Monthly budget reports",
      "Tax planning",
      "General business consulting",
      "Quarterly video review of your KPIs",
    ],
  },
  {
    key: "standard",
    name: "Standard",
    tagline: "Everything you need to run payroll with confidence.",
    includesPrevious: "Basic",
    popular: true,
    features: [
      "Payroll preparation",
      "Payroll tax deposits and returns",
      "Employee e-paystubs",
      "Employer pay records",
      "W-2 preparation",
      "Pension remittance",
    ],
  },
  {
    key: "complete",
    name: "Complete",
    tagline: "A fully outsourced accounting department.",
    includesPrevious: "Standard",
    features: [
      "Bill pay and vendor payments",
      "Credit card expense and receipt tracking",
      "Employee expense reports",
      "1099 preparation",
      "Digital access to paid bills",
    ],
  },
];

/** Flattened feature list for the comparison matrix. */
export function packageMatrix() {
  const rows: { feature: string; tiers: Record<AccountingPackage["key"], boolean> }[] = [];
  accountingPackages.forEach((pkg, index) => {
    pkg.features.forEach((feature) => {
      rows.push({
        feature,
        tiers: {
          basic: index <= 0,
          standard: index <= 1,
          complete: true,
        },
      });
    });
  });
  return rows;
}
