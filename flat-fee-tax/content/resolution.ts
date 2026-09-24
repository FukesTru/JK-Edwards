import type { IconName } from "@/components/ui/icon-map";

/** What the flat tax-resolution fee covers — owner to confirm (site.confirm.resolutionScopeConfirmed). */
export const resolutionScope = [
  "Review of your IRS or Georgia DOR notices",
  "IRS account transcript analysis",
  "Power of attorney (Form 2848)",
  "Communication with the IRS on your behalf",
  "A resolution plan — e.g., a payment plan request or penalty abatement request where eligible",
];

/** Issues we help with (icon grid on /tax-resolution). */
export const resolutionIssues: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "Mail",
    title: "IRS notices & letters",
    description: "CP14, CP2000, CP501–504 and other notices explained and answered.",
  },
  {
    icon: "FileClock",
    title: "Unfiled past-year returns",
    description: "A plan to bring missing years current, starting with your transcripts.",
  },
  {
    icon: "Wallet",
    title: "Balances due & payment plans",
    description: "Options such as installment agreement requests when you can’t pay in full.",
  },
  {
    icon: "Scale",
    title: "Penalty abatement requests",
    description: "Requests for relief when you qualify, such as first-time abatement.",
  },
  {
    icon: "Landmark",
    title: "Liens & levies",
    description: "Understanding the notice, your rights and the options to address it.",
  },
  {
    icon: "HandCoins",
    title: "Wage garnishments",
    description: "Communicating with the IRS about a wage levy and next steps.",
  },
  {
    icon: "FileSearch",
    title: "Audits & correspondence exams",
    description: "Organizing documents and responding to IRS questions by mail.",
  },
  {
    icon: "FileWarning",
    title: "Georgia DOR notices",
    description: "Georgia Department of Revenue letters reviewed and addressed.",
  },
];
