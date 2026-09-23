import type { IconName } from "@/components/ui/icon-map";

/**
 * Single source of truth for firm details (NAP, hours, links, team, portals).
 * Anything marked PLACEHOLDER must be confirmed by the client before launch —
 * see README.md → "Pre-launch checklist".
 */

export const site = {
  name: "JK Edwards & Company",
  shortName: "JK Edwards",
  url: "https://www.jkedwards.com",
  tagline: "We are passionate about the success of our clients",
  secondaryLine: "Let us take the stress out of running your business",
  description:
    "Accounting and tax firm in Hampton, Georgia offering tax preparation and planning, bookkeeping, payroll and IRS representation for Henry County and clients nationwide.",
  phone: {
    display: "(770) 472-2005",
    href: "tel:+17704722005",
    schema: "+1-770-472-2005",
  },
  email: "info@jkedwards.com",
  address: {
    street: "1883 McDonough Rd",
    suite: "Suite 200A",
    city: "Hampton",
    region: "GA",
    regionName: "Georgia",
    postalCode: "30228",
    country: "US",
  },
  /** PLACEHOLDER: approximate (Hampton, GA). Replace with exact coordinates from the Google Business Profile. */
  geo: { latitude: 33.387, longitude: -84.283 },
  /** Hours from Yelp — may be tax-season only (CLIENT TO CONFIRM). 24h format for schema. */
  hours: [
    { day: "Monday", short: "Mon", opens: "09:00", closes: "17:00" },
    { day: "Tuesday", short: "Tue", opens: "09:00", closes: "21:00" },
    { day: "Wednesday", short: "Wed", opens: "09:00", closes: "15:00" },
    { day: "Thursday", short: "Thu", opens: "09:00", closes: "21:00" },
    { day: "Friday", short: "Fri", opens: "09:00", closes: "17:00" },
    { day: "Saturday", short: "Sat", opens: "09:00", closes: "14:00" },
    { day: "Sunday", short: "Sun", opens: null, closes: null },
  ] as { day: string; short: string; opens: string | null; closes: string | null }[],
  serviceArea: {
    cities: ["Hampton", "McDonough", "Stockbridge", "Locust Grove", "Griffin"],
    regions: ["Henry County", "Metro-south Atlanta"],
    remote: ["Nationwide (virtual)", "U.S. expats abroad"],
  },
  social: {
    facebook: "https://www.facebook.com/linc2jkedwards",
    x: "https://twitter.com/jkedwards_tax",
    instagram: "https://www.instagram.com/jkedwardsco",
  },
  links: {
    payBill: "https://secure.cpacharge.com/pages/jkedwards/payments",
    quickbooksPurchase: "https://completebusinessgroup.com/jk-edwards-company/",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=1883+McDonough+Rd+Suite+200A%2C+Hampton%2C+GA+30228",
    mapEmbed: "https://www.google.com/maps?q=1883+McDonough+Rd+Suite+200A,+Hampton,+GA+30228&output=embed",
    /** PLACEHOLDER: replace with the Google Business Profile review URL once confirmed. */
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=JK+Edwards+%26+Company+1883+McDonough+Rd+Hampton+GA",
  },
  affiliations: [
    { name: "AICPA", detail: "American Institute of CPAs" },
    { name: "QuickBooks ProAdvisor", detail: "Certified by Intuit" },
    { name: "Bill.com Certified", detail: "AP & AR automation" },
    { name: "Dave Ramsey ELP", detail: "Endorsed Local Provider" },
  ],
  softwarePartners: [
    "QuickBooks",
    "Xero",
    "Bill.com",
    "ADP",
    "Gusto",
    "Dext",
    "TaxCaddy",
    "Liscio",
    "Thomson Reuters",
    "Zoom",
    "Rightworks",
    "CPACharge",
  ],
  /** GA4 measurement ID — set NEXT_PUBLIC_GA4_ID in the hosting environment. */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX",
  /** Calendly / GoHighLevel booking page (embedded on /contact when set). */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  /**
   * While true, unconfirmed values ([X]+ years, bios, eBooks …) render with a
   * dashed "placeholder" outline so they are easy to spot in review.
   */
  showPlaceholders: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.suite}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export type TeamMember = {
  name: string;
  credential?: string;
  title: string;
  initials: string;
  /** Role-based summary; full bio is CLIENT TO PROVIDE. */
  bio: string;
  credentialName?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    name: "Kai A. Mays",
    credential: "EA",
    credentialName: "Enrolled Agent",
    title: "Wealth & Tax Advisor",
    initials: "KM",
    bio: "As an Enrolled Agent, Kai is federally licensed to represent taxpayers before the IRS and advises clients on tax and wealth planning.",
  },
  {
    name: "Kassandra Freckleton",
    title: "Wealth & Tax Advisor",
    initials: "KF",
    bio: "Kassandra works with individuals and business owners on tax planning and long-term wealth strategy.",
  },
  {
    name: "Jamie Steinbruegge",
    credential: "CPA",
    credentialName: "Certified Public Accountant",
    title: "Tax Accountant",
    initials: "JS",
    bio: "A Certified Public Accountant, Jamie prepares and reviews individual and business tax returns.",
  },
  {
    name: "James Mays III",
    title: "Tax Accountant",
    initials: "JM",
    bio: "James prepares individual and business returns and helps clients stay compliant throughout the year.",
  },
  {
    name: "Sonika Patel",
    credentialName: "Certified Payroll Specialist",
    title: "Certified Payroll Specialist",
    initials: "SP",
    bio: "Sonika manages payroll processing, payroll tax filings and year-end forms for our business clients.",
  },
];

export type Portal = {
  key: string;
  name: string;
  product: string;
  href: string;
  description: string;
  icon: IconName;
};

export const payBillPortal: Portal = {
  key: "pay-bill",
  name: "Pay Bill",
  product: "CPACharge",
  href: site.links.payBill,
  description: "Pay your invoice securely online by card or bank transfer.",
  icon: "CreditCard",
};

export const portals: Portal[] = [
  {
    key: "liscio",
    name: "Client Communication",
    product: "Liscio",
    href: "https://app.liscio.me/login",
    description: "Message our team and exchange files through an encrypted inbox.",
    icon: "MessagesSquare",
  },
  {
    key: "netclient",
    name: "Client Login",
    product: "NetClient CS",
    href: "https://secure.netlinksolution.com/nextgen/?firm=367657",
    description: "Retrieve your returns, statements and shared documents.",
    icon: "LogIn",
  },
  {
    key: "bill",
    name: "Accounts Payable",
    product: "Bill",
    href: "https://app.bill.com/neo/login",
    description: "Review, approve and pay vendor bills online.",
    icon: "Receipt",
  },
  {
    key: "qbo",
    name: "QuickBooks Online",
    product: "Intuit",
    href: "https://c1.qbo.intuit.com/c1/v43.137/0/login?redirect=true&submit=Login",
    description: "Sign in to your QuickBooks Online company file.",
    icon: "BookOpen",
  },
  {
    key: "qbd",
    name: "QuickBooks Desktop",
    product: "Rightworks",
    href: "https://helpdesk.rightnetworks.com/s/article/Connect-from-a-Windows-Computer",
    description: "Connect to your hosted QuickBooks Desktop file through Rightworks.",
    icon: "Monitor",
  },
  {
    key: "boss",
    name: "BOSS Client Portal",
    product: "BOSS",
    href: "https://jkedwards.thefutureofbookkeeping.com/",
    description: "Sign in to the BOSS portal for your outsourced bookkeeping.",
    icon: "LayoutDashboard",
  },
  {
    key: "dext",
    name: "Dext Prepare",
    product: "Dext",
    href: "https://app.dext.com/login",
    description: "Snap, upload or email receipts and bills for your books.",
    icon: "ScanLine",
  },
  {
    key: "taxcaddy",
    name: "TaxCaddy",
    product: "TaxCaddy",
    href: "https://consumer.taxcaddy.com/#/login",
    description: "Upload tax documents, answer your questionnaire and e-sign.",
    icon: "FolderOpen",
  },
  {
    key: "zoom",
    name: "Video Conferencing",
    product: "Zoom",
    href: "https://zoom.us/join",
    description: "Join a scheduled video meeting with your advisor.",
    icon: "Video",
  },
];

export const refundTrackers = [
  {
    name: "IRS Refund Tracker",
    description: "Check the status of your federal refund with the IRS “Where’s My Refund?” tool.",
    href: "https://www.irs.gov/refunds",
  },
  {
    name: "Georgia Refund Tracker",
    description: "Check your Georgia refund with the Department of Revenue.",
    href: "https://dor.georgia.gov/wheres-my-refund",
  },
];

/** Every client-facing tool (portals + Pay Bill). Used for the home stats row. */
export const clientToolCount = portals.length + 1;
