/**
 * ONE place for every business detail on the site.
 *
 * Anything written as {{LIKE_THIS}} is a placeholder that renders visibly until
 * it is replaced here. Swap the values below and rebuild — no other file needs
 * to change. `confirm` holds facts the owner still has to confirm; while a
 * value is `null` the site shows "[CLIENT TO CONFIRM]" in its place.
 */
export const site = {
  brandName: "{{BRAND_NAME}}", // placeholder until the LLC name is chosen
  legalName: "{{LEGAL_NAME}} LLC",
  owner: "Kai Mays, EA",
  cpaName: "{{CPA_NAME}}, CPA", // signing CPA
  cpaLicense: "{{GA_CPA_LICENSE_NO}}",
  phone: "{{PHONE}}",
  email: "{{EMAIL}}",
  address: "{{STREET}}, Peachtree City, GA {{ZIP}}",
  /** Bare domain, e.g. "example.com" — or a sub-path such as "example.com/tax" (sets Next's basePath). */
  domain: "{{DOMAIN}}",
  prices: { taxPrep: 249, taxResolution: 749 },
  primaryCity: "Peachtree City, GA",
  cities: ["Peachtree City", "Fayetteville", "Tyrone", "Brooks", "Newnan", "Sharpsburg", "Senoia"],
  social: { facebook: "", instagram: "", google: "" }, // icons whose value is empty stay hidden

  /* ---- Additional details ------------------------------------------------ */
  hours: "{{HOURS}}", // e.g. "Mon–Fri 9 AM–6 PM · Sat by appointment"
  /** Secure document portal (TaxCaddy, SafeSend, Liscio…). Documents are never collected by email. */
  secureUploadUrl: "{{SECURE_UPLOAD_URL}}",
  /** Calendly / GoHighLevel booking page, embedded on /get-started. */
  bookingUrl: "{{BOOKING_URL}}",
  /** GA4 measurement ID. The gtag library only loads once this is a real ID. */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX",
  /** Approximate center of Peachtree City — replace with the office's exact coordinates. */
  geo: { latitude: 33.3968, longitude: -84.5958 },

  /**
   * Facts to confirm with the owner before launch. `null` renders
   * "[CLIENT TO CONFIRM]"; replace with the final plain-English answer.
   */
  confirm: {
    /** Is the Georgia state return included in the flat price? */
    stateReturn: null as string | null,
    /** Is the price per return — and does it cover married filing jointly? */
    jointReturns: null as string | null,
    /** How many Schedule C businesses / Schedule E properties are included? */
    multipleSchedules: null as string | null,
    /** Are prior-year returns offered, and at what price? */
    priorYearReturns: null as string | null,
    /** Are amended returns (1040-X) offered, and at what price? */
    amendedReturns: null as string | null,
    /** When is the fee paid (at booking, before filing…)? */
    paymentTiming: null as string | null,
    /** Typical turnaround once all documents are in. */
    turnaround: null as string | null,
    /** Has the owner approved the exact scope list for the tax resolution fee? */
    resolutionScopeConfirmed: false as boolean,
    /** Has the owner approved the "most preparers charge extra for K-1s" comparison? */
    k1ClaimConfirmed: false as boolean,
  },
} as const;

export type SiteConfig = typeof site;
