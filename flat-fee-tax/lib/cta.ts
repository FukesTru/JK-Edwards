import { prices } from "@/lib/site";

/** The two primary calls to action, used everywhere so labels and links stay consistent. */
export const cta = {
  taxPrep: { label: `Start My ${prices.taxPrep} Return`, href: "/get-started?service=tax-preparation" },
  taxPrepShort: { label: "Start My Return", href: "/get-started?service=tax-preparation" },
  taxResolution: { label: `Get Tax Help — ${prices.taxResolution}`, href: "/get-started?service=tax-resolution" },
  mobileStart: { label: `Start My Return — ${prices.taxPrep}`, href: "/get-started?service=tax-preparation" },
} as const;
