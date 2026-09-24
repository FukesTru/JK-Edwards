import { CLIENT_TO_CONFIRM, prices, site } from "@/lib/site";

export type Faq = { q: string; a: string };
export type FaqGroup = { title: string; items: Faq[] };

/** A confirmed answer from site.config.ts `confirm`, or the [CLIENT TO CONFIRM] marker. */
const confirmed = (value: string | null) => value ?? CLIENT_TO_CONFIRM;

const { taxPrep, taxResolution } = prices;
const c = site.confirm;

/* ---- Shared questions (reused across pages) ---------------------------- */

const q = {
  whatsIncluded: {
    q: `What’s included in the ${taxPrep} price?`,
    a: `Your federal Form 1040 with Schedules A, C and E, brokerage 1099-Bs and Schedule K-1 income, prepared and signed by a CPA, reviewed by an Enrolled Agent and e-filed. See the full list on our [pricing page](/pricing).`,
  },
  stateReturn: {
    q: "Is the Georgia state return included?",
    a: `${confirmed(c.stateReturn)} See [pricing](/pricing) for everything that’s included.`,
  },
  joint: {
    q: "Is the price per person or per return? What about married filing jointly?",
    a: `${confirmed(c.jointReturns)} Questions about your situation? [Ask us](/get-started).`,
  },
  multiple: {
    q: "What if I have more than one rental property or business?",
    a: `${confirmed(c.multipleSchedules)} Learn more about [rental property](/tax-preparation/rental-property) and [self-employed](/tax-preparation/self-employed) returns.`,
  },
  priorYears: {
    q: "Can you file prior-year returns?",
    a: `${confirmed(c.priorYearReturns)} If you have several unfiled years or IRS notices, our [tax resolution](/tax-resolution) service may be a better fit.`,
  },
  amended: {
    q: "Do you prepare amended returns?",
    a: `${confirmed(c.amendedReturns)}`,
  },
  payment: {
    q: "When do I pay?",
    a: `${confirmed(c.paymentTiming)} Either way, you’ll know the flat price before we start — see [pricing](/pricing).`,
  },
  turnaround: {
    q: "How long does it take?",
    a: `${confirmed(c.turnaround)} The fastest way to speed things up is to upload everything on the [document checklist](/how-it-works#checklist) at once.`,
  },
  whoSigns: {
    q: "Who actually prepares and signs my return?",
    a: `A licensed CPA prepares and signs your return, and an Enrolled Agent reviews it before it’s filed — two licensed professionals on every return. [Meet the team](/about).`,
  },
  whatIsEa: {
    q: "What is an Enrolled Agent?",
    a: "An Enrolled Agent (EA) is a tax professional federally licensed by the IRS. EAs have unlimited rights to represent taxpayers before the IRS on audits, collections and appeals. [Learn more about Kai](/about).",
  },
  hiddenFees: {
    q: "Are there hidden fees or add-ons?",
    a: `No per-form add-ons. The schedules and forms listed on our [pricing page](/pricing) are included in the flat ${taxPrep} fee, and we’ll tell you before we start if anything falls outside it.`,
  },
  secureDocs: {
    q: "How do I send my documents?",
    a: "Through our secure upload portal — never by email. We send you a secure link after you [get started](/get-started). Please don’t email Social Security numbers or tax documents.",
  },
  inPerson: {
    q: "Can I meet in person?",
    a: "Yes — in person at our [Peachtree City](/areas-we-serve/peachtree-city) office, or fully virtual from anywhere in Georgia.",
  },
  virtual: {
    q: "Do you work with clients outside Fayette and Coweta County?",
    a: "Yes. We serve clients anywhere in Georgia virtually through secure upload, e-signature and phone or video calls. See [areas we serve](/areas-we-serve).",
  },
  crypto: {
    q: "Can you handle crypto on a 1099-B?",
    a: "Yes. Crypto sales are reported like other capital assets, and exchanges may send a Form 1099-B or the newer Form 1099-DA. If your records are incomplete, we’ll help you work out cost basis. See [investments & K-1s](/tax-preparation/investments-k1).",
  },
  lateK1: {
    q: "What if my K-1 arrives late?",
    a: "Partnership and S-corp K-1s often arrive in March or later. If yours isn’t in by the filing deadline, we can file an extension, which extends the time to file (not the time to pay) — so we’ll also help estimate any payment due. See [investments & K-1s](/tax-preparation/investments-k1).",
  },
  resolutionScope: {
    q: `What does the ${taxResolution} tax resolution fee cover?`,
    a: `${site.confirm.resolutionScopeConfirmed ? "" : `${CLIENT_TO_CONFIRM} `}Typically: reviewing your IRS or Georgia DOR notice, analyzing your IRS account transcripts, filing a power of attorney (Form 2848), communicating with the IRS for you and building a resolution plan. See the full list on our [tax resolution page](/tax-resolution).`,
  },
  guarantee: {
    q: "Can you guarantee you’ll reduce what I owe?",
    a: "No one can honestly guarantee an outcome with the IRS. Results depend on your facts, your records and IRS decisions. What we can promise is a clear explanation of your options and professional representation throughout. [See how resolution works](/tax-resolution).",
  },
  talkToIrs: {
    q: "Will I have to talk to the IRS myself?",
    a: "Usually not. With a signed Form 2848 power of attorney, our Enrolled Agent can communicate with the IRS on your behalf. [See how tax resolution works](/tax-resolution).",
  },
  unfiled: {
    q: "I haven’t filed in a few years. Can you help?",
    a: "Yes. We start by pulling your IRS transcripts to see what the IRS has on file, then plan how to bring you current. [Upload a notice](/tax-resolution#upload-notice) or [get started](/get-started).",
  },
  georgiaDor: {
    q: "Do you handle Georgia Department of Revenue notices?",
    a: "Yes. We review Georgia DOR notices as part of tax resolution; Georgia uses its own power of attorney form, which we’ll prepare with you. [See tax resolution](/tax-resolution).",
  },
};

/* ---- Page sets ---------------------------------------------------------- */

export const faqs = {
  homePreview: [q.whatsIncluded, q.whoSigns, q.inPerson, q.hiddenFees],

  pricing: [q.hiddenFees, q.stateReturn, q.joint, q.payment, q.priorYears],

  taxPrep: [q.stateReturn, q.joint, q.multiple, q.crypto, q.lateK1, q.priorYears],

  individual: [
    {
      q: "Should I itemize or take the standard deduction?",
      a: "You get whichever is larger. We add up your itemized deductions — mortgage interest, state and local taxes (up to the current limit), charitable gifts and qualifying medical costs — and compare them with your standard deduction every year.",
    },
    {
      q: "Does it cost more to itemize?",
      a: `No. Schedule A is included in the flat ${taxPrep} fee, whether or not itemizing ends up saving you money. See [pricing](/pricing).`,
    },
    {
      q: "What documents do I need to itemize?",
      a: "Your Form 1098 mortgage interest statement, property tax records, receipts or acknowledgment letters for charitable gifts, and records of significant medical expenses. See the full [document checklist](/how-it-works#checklist).",
    },
    {
      q: "Why don’t you list the standard deduction amount or SALT cap?",
      a: "Those limits change with tax law and inflation, sometimes every year. We apply the numbers for the year you’re filing, so you don’t have to track them.",
    },
    q.joint,
  ],

  selfEmployed: [
    {
      q: "Do I need an LLC to file Schedule C?",
      a: "No. Sole proprietors and single-member LLCs both typically report business income on Schedule C, which is included in the flat fee.",
    },
    {
      q: "What expenses can I deduct?",
      a: "Ordinary and necessary business costs — supplies, software, equipment, business mileage, a portion of your phone, and a home office if you use part of your home regularly and exclusively for business. We’ll help you sort out what qualifies.",
    },
    {
      q: "Do I have to make quarterly estimated payments?",
      a: "Often, yes — self-employed income usually has no withholding. We’ll estimate what to set aside for the coming year so there are no surprises. Already behind? See [tax resolution](/tax-resolution).",
    },
    {
      q: "I got a 1099-K from an app or payment platform. What do I do with it?",
      a: "Bring it along. Business income reported on a 1099-K usually belongs on Schedule C, and we’ll reconcile it against your own records so nothing is counted twice.",
    },
    {
      q: "I have a W-2 job and a side business. Is that extra?",
      a: `No. W-2 wages and Schedule C side-business income go on the same return for the same flat ${taxPrep} price. [Get started](/get-started).`,
    },
  ],

  rental: [
    {
      q: "Is a rental property extra?",
      a: `No. Schedule E is included in the flat ${taxPrep} fee. See [pricing](/pricing) for everything that’s covered.`,
    },
    q.multiple,
    {
      q: "What’s the difference between a repair and an improvement?",
      a: "Repairs keep the property in working order and are generally deducted in the year you pay for them. Improvements add value, extend its life or adapt it to a new use, and are usually depreciated over time. We’ll classify each expense with you.",
    },
    {
      q: "Do you handle short-term rentals?",
      a: "Yes. Short-term rentals can follow different rules depending on how many days the property is rented and how involved you are, so we’ll ask a few questions to report yours correctly.",
    },
    {
      q: "What records should I bring?",
      a: "Rent received, mortgage interest (Form 1098), property taxes, insurance, repairs, management fees, utilities you pay, and the purchase date and price of the property for depreciation. See the [document checklist](/how-it-works#checklist).",
    },
  ],

  investments: [
    q.crypto,
    q.lateK1,
    {
      q: "What is cost basis and why does it matter?",
      a: "Cost basis is what you paid for an investment, adjusted for things like reinvested dividends. Gain or loss is the sale price minus basis, so a missing basis can make you look like you earned more than you did. We check it on every sale.",
    },
    {
      q: "What’s a wash sale?",
      a: "If you sell an investment at a loss and buy the same or a substantially identical one within 30 days before or after, the loss is generally deferred. Brokers flag many wash sales on the 1099-B; we make sure they’re reported correctly.",
    },
    {
      q: "Are K-1s really included in the flat price?",
      a: `Yes — Schedule K-1 income from partnerships, S corporations and trusts is included in the flat ${taxPrep} fee. See [pricing](/pricing).`,
    },
  ],

  resolution: [q.resolutionScope, q.guarantee, q.talkToIrs, q.unfiled, q.georgiaDor, q.whatIsEa],
};

/** The /faq page, grouped by topic (20+ questions). */
export const faqPageGroups: FaqGroup[] = [
  {
    title: "Pricing",
    items: [q.hiddenFees, q.joint, q.payment, q.priorYears, q.amended],
  },
  {
    title: "What’s Included",
    items: [
      q.whatsIncluded,
      q.stateReturn,
      q.multiple,
      q.crypto,
      q.lateK1,
      {
        q: "Why a flat fee instead of per-form pricing?",
        a: "Per-form pricing makes it hard to know what you’ll pay until the end. With a flat fee you know the price before you book, and adding a rental or a K-1 doesn’t change it. [Why we charge flat fees](/about#why-flat-fees).",
      },
    ],
  },
  {
    title: "Process & Documents",
    items: [
      q.whoSigns,
      q.secureDocs,
      q.turnaround,
      {
        q: "What documents should I gather?",
        a: "W-2s, 1099s (NEC, INT, DIV, B), K-1s, Form 1098, property tax records, charitable receipts, rental and business records, last year’s return and a photo ID. [Print the checklist](/how-it-works#checklist).",
      },
      {
        q: "How do I sign and file?",
        a: "Once your return is prepared and reviewed, you review it, sign electronically and we e-file it. [See all five steps](/how-it-works).",
      },
    ],
  },
  {
    title: "Tax Resolution",
    items: [q.resolutionScope, q.guarantee, q.talkToIrs, q.unfiled, q.georgiaDor, q.whatIsEa],
  },
  {
    title: "Local & Virtual",
    items: [
      q.inPerson,
      q.virtual,
      {
        q: "Which areas do you serve in person?",
        a: "Peachtree City, Fayetteville, Tyrone and Brooks in Fayette County, and Newnan, Sharpsburg and Senoia in Coweta County. [See all areas](/areas-we-serve).",
      },
    ],
  },
];
