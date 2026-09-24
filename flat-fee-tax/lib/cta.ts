/**
 * The two primary calls to action, used everywhere so labels and links stay consistent.
 * Labels carry no price: amounts appear only on the Pricing, Tax Preparation and Tax Resolution pages.
 */
export const cta = {
  taxPrep: { label: "Start My Return", href: "/get-started?service=tax-preparation" },
  taxResolution: { label: "Get Tax Help", href: "/get-started?service=tax-resolution" },
} as const;
