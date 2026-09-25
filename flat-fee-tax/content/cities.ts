import type { Faq } from "@/content/faqs";
import type { ImageKey } from "@/lib/images";

export type CitySlug = "peachtree-city" | "fayetteville" | "newnan" | "tyrone" | "senoia";

export type City = {
  name: string;
  county: "Fayette County" | "Coweta County";
  /** Cities with their own page. Brooks and Sharpsburg are covered on /areas-we-serve. */
  slug?: CitySlug;
  /** Short line for city cards. */
  blurb: string;
  /** Town center as [longitude, latitude], for the service-area map. */
  coordinates: [number, number];
};

/** In-page anchor for cities without their own page (Brooks, Sharpsburg) on /areas-we-serve. */
export const cityAnchor = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export const cities: City[] = [
  {
    name: "Peachtree City",
    county: "Fayette County",
    slug: "peachtree-city",
    blurb: "Our home base — in-person appointments or fully virtual.",
    coordinates: [-84.5958, 33.3967],
  },
  {
    name: "Fayetteville",
    county: "Fayette County",
    slug: "fayetteville",
    blurb: "The county seat, with a growing community of freelancers and film professionals.",
    coordinates: [-84.455, 33.4478],
  },
  {
    name: "Tyrone",
    county: "Fayette County",
    slug: "tyrone",
    blurb: "A small-town neighbor, a short drive from our Peachtree City office.",
    coordinates: [-84.5978, 33.4711],
  },
  {
    name: "Brooks",
    county: "Fayette County",
    blurb: "Rural southern Fayette County — acreage, small farms and home businesses.",
    coordinates: [-84.46, 33.2914],
  },
  {
    name: "Newnan",
    county: "Coweta County",
    slug: "newnan",
    blurb: "Coweta’s county seat — families, landlords and small-business owners.",
    coordinates: [-84.7997, 33.3808],
  },
  {
    name: "Sharpsburg",
    county: "Coweta County",
    blurb: "A quiet Coweta County town between Newnan and Peachtree City.",
    coordinates: [-84.6497, 33.3389],
  },
  {
    name: "Senoia",
    county: "Coweta County",
    slug: "senoia",
    blurb: "A historic small town with film production and plenty of self-employed income.",
    coordinates: [-84.5536, 33.3031],
  },
];

export type CityPage = {
  slug: CitySlug;
  name: string;
  county: City["county"];
  seo: { title: string; description: string };
  image: ImageKey;
  /** Heading for the local intro section. */
  introTitle: string;
  /** Unique local copy (300+ words across the paragraphs). */
  intro: string[];
  /** Local angles shown as short cards next to the intro. */
  highlights: { title: string; text: string }[];
  /** Tax-prep sub-page most relevant to this community. */
  featured: { label: string; href: string; text: string };
  faqs: Faq[];
  nearby: CitySlug[];
};

export const cityPages: CityPage[] = [
  {
    slug: "peachtree-city",
    name: "Peachtree City",
    county: "Fayette County",
    seo: {
      title: "Tax Preparer in Peachtree City, GA",
      description:
        "Tax preparer in Peachtree City, GA: returns prepared and signed by a CPA and reviewed by an Enrolled Agent. Meet at our office or work fully online. Book today.",
    },
    image: "consult-room",
    introTitle: "Your neighborhood tax office, right here in Peachtree City",
    intro: [
      "Peachtree City is home base. It’s where we live, where we meet clients in person and where we built a simple idea: every return should get two licensed professionals and one flat price you know before you start. If you’d rather sit across the table than upload from your couch, you can — and if you’d rather never leave the house, that works too.",
      "Life here has its own rhythm. Plenty of our neighbors ride a golf cart to the grocery store on the path network, spend weekends around Lake Peachtree and Lake Kedron, and commute during the week to Atlanta, to the airport or to one of the employers here on the south side. That mix shows up on tax returns: two W-2s and a mortgage, a side business run from the spare bedroom, a townhouse rented out after a move, stock options or brokerage accounts that produce a thick 1099-B each February.",
      "Tax offices often price that complexity one form at a time. We don’t. Your 1040 — with Schedules A, C and E, brokerage 1099-Bs and K-1s — is one flat fee, prepared and signed by a licensed CPA and reviewed by an Enrolled Agent before anything is filed. You see the price before you book, and it doesn’t creep up when you mention the rental.",
      "Because we’re local, it’s easy to drop by with a question in March, sit down together when a letter arrives from the IRS, or plan ahead for next year when your situation changes. Whether you live near the Avenue, off Highway 54 or out toward the lakes, you’re never more than a short cart ride or drive from real help.",
      "Peachtree City sees plenty of life changes, too: a first home off one of the cart paths, a new baby, a job change after years with the same employer, or retirement after a career at the airport. Each one can change how your return should be prepared, and we’d rather talk it through with you than guess — that conversation is part of the flat fee, not an upgrade.",
    ],
    highlights: [
      {
        title: "Meet in person",
        text: "Appointments at our Peachtree City office for anyone who prefers to talk face to face.",
      },
      {
        title: "Commuters welcome",
        text: "Secure uploads and e-signatures, so busy Atlanta and airport commuters can finish from anywhere.",
      },
      {
        title: "Complex returns, same price",
        text: "Stock sales, K-1s, rentals and side businesses are all included in the flat fee.",
      },
    ],
    featured: {
      label: "Investments, 1099-B & K-1s",
      href: "/tax-preparation/investments-k1",
      text: "Brokerage accounts, company stock and K-1 income are common here — and all included.",
    },
    faqs: [
      {
        q: "Can I meet with you in person in Peachtree City?",
        a: "Yes. Peachtree City is our home base, and in-person appointments are available at our office. You can also work with us entirely online — [see how it works](/how-it-works).",
      },
      {
        q: "I commute to Atlanta all week. Can I do everything online?",
        a: "Absolutely. You upload documents through our secure portal, we prepare and review your return, and you e-sign when it’s ready. Most clients never need to visit. [Get started](/get-started) whenever it suits you.",
      },
      {
        q: "Is my return more expensive because I have stock sales and a rental?",
        a: "No. Brokerage 1099-Bs, Schedule E rentals and K-1s are part of every return we prepare. See everything that’s included on our [pricing page](/pricing).",
      },
    ],
    nearby: ["tyrone", "fayetteville", "senoia"],
  },
  {
    slug: "fayetteville",
    name: "Fayetteville",
    county: "Fayette County",
    seo: {
      title: "Tax Preparation in Fayetteville, GA",
      description:
        "Tax preparation in Fayetteville, GA for families, freelancers and film crews: CPA-signed, EA-reviewed returns with Schedule C handled. Book online or call us.",
    },
    image: "freelancer-studio",
    introTitle: "Tax help for Fayette County’s seat — and its creative economy",
    intro: [
      "Fayetteville is the heart of Fayette County: the historic courthouse downtown, neighborhoods that have grown in every direction and, just up the road, Trilith and the film and television studios that have drawn a new wave of creative professionals to the area. Our Peachtree City office is a short drive away, and every service is also available online.",
      "That growth has changed what tax season looks like for a lot of households. Set carpenters, camera operators, editors, costume and makeup artists, drivers and production assistants often work job to job as independent contractors. Instead of a single W-2, they end up with a stack of 1099-NECs, expenses spread across receipts and apps, and quarterly estimated taxes they may not have planned for.",
      "Schedule C is exactly where that income belongs, and it’s included in our flat fee. We help you capture legitimate business expenses — equipment, software, supplies, business mileage, a qualifying home office — and calculate your self-employment tax correctly. If you’re both a W-2 employee on one production and a contractor on another, we handle both on the same return for the same price.",
      "Of course, Fayetteville isn’t only film. Plenty of our clients here are families with a mortgage deciding whether to itemize, retirees with investment accounts, and landlords with a rental or two. Whatever your mix, the promise is the same: one flat price, a licensed CPA who prepares and signs your return, and an Enrolled Agent who reviews it before it’s filed.",
      "Newcomers who relocated for studio work often arrive with questions: what counts as a business expense between jobs, how income earned on location in another state is handled, or whether forming an LLC changes anything. We answer in plain English — some questions have simple answers and others depend on the details, and we’ll tell you which is which before anything is filed.",
    ],
    highlights: [
      {
        title: "1099 creatives",
        text: "Schedule C for crew members, editors and other independent contractors in film and TV.",
      },
      {
        title: "Mixed W-2 and 1099 years",
        text: "Staff roles and contract gigs combined on one return — no per-form add-ons.",
      },
      {
        title: "Quarterly estimates",
        text: "Guidance on estimated payments so next April doesn’t bring a surprise bill.",
      },
    ],
    featured: {
      label: "Self-Employed & Schedule C",
      href: "/tax-preparation/self-employed",
      text: "Freelance and 1099 income, home office, mileage and self-employment tax — all included.",
    },
    faqs: [
      {
        q: "I work on film productions as a 1099 contractor. Can you help?",
        a: "Yes — that’s a big part of our Fayetteville work. Your contract income and expenses go on Schedule C, which is included in the flat fee. Read more about [self-employed returns](/tax-preparation/self-employed).",
      },
      {
        q: "What if I had both W-2 and 1099 income this year?",
        a: "That’s common in production work. We report both on the same return, at the same flat fee.",
      },
      {
        q: "Do I need to drive to Peachtree City?",
        a: "Only if you want to meet in person — the office is a short drive from Fayetteville. Everything can also be done online through our [secure process](/how-it-works).",
      },
    ],
    nearby: ["peachtree-city", "tyrone", "newnan"],
  },
  {
    slug: "newnan",
    name: "Newnan",
    county: "Coweta County",
    seo: {
      title: "Tax Preparation in Newnan, GA",
      description:
        "Tax preparation in Newnan, GA for families, landlords and small-business owners: every return CPA-signed and EA-reviewed. Book online or call our office today.",
    },
    image: "historic-home",
    introTitle: "CPA-signed tax preparation for Coweta County’s seat",
    intro: [
      "Newnan wears its history well. The courthouse square anchors a lively downtown of shops and restaurants, and the tree-lined streets of historic homes are a big part of why people call it the City of Homes. Around that historic core, newer neighborhoods and businesses have grown up along the I-85 corridor, bringing families, commuters and entrepreneurs to Coweta County’s seat.",
      "That mix makes for varied tax returns. Many Newnan households are raising families on one or two W-2 incomes and weighing whether itemizing makes sense. Others own a rental house or two — sometimes a former home kept after moving across town — and need Schedule E done right, including depreciation. And the shops, trades and service businesses that keep the square and the surrounding neighborhoods running often report their income on Schedule C.",
      "We handle all of it for one flat, upfront fee. A licensed CPA prepares and signs your return, and an Enrolled Agent reviews it before it’s filed, so there are two sets of professional eyes on every line. There are no per-form charges for adding a rental property, a small business or a brokerage statement.",
      "Our office is in nearby Peachtree City, a straightforward drive from Newnan if you like to meet in person. Most clients, though, prefer the convenience of our secure online process: upload your documents, answer a few questions, review your return and e-sign — without taking time away from work or family. Either way, you’ll know the flat price before you book.",
      "Newnan is also home to many retirees and near-retirees drawing Social Security, pensions and IRA distributions, sometimes alongside part-time work or a rental. Those returns benefit from a careful look at withholding and estimated payments, and the Enrolled Agent review is a second check that every 1099-R and SSA-1099 landed where it belongs.",
    ],
    highlights: [
      {
        title: "Landlords",
        text: "Schedule E for rental houses, including depreciation and repairs vs. improvements.",
      },
      {
        title: "Small-business owners",
        text: "Schedule C income and expenses for trades, shops and service businesses.",
      },
      {
        title: "Growing families",
        text: "A clear answer on itemizing vs. the standard deduction, every year.",
      },
    ],
    featured: {
      label: "Rental Property & Schedule E",
      href: "/tax-preparation/rental-property",
      text: "Rental income, expenses and depreciation for Newnan landlords — included in the flat fee.",
    },
    faqs: [
      {
        q: "I own a rental house in Newnan. Is that extra?",
        a: "No. Schedule E rental reporting is part of every return we prepare. Learn more about [rental property returns](/tax-preparation/rental-property).",
      },
      {
        q: "Do you work with small-business owners in Newnan?",
        a: "Yes. Sole proprietors and single-member LLCs report business income on Schedule C, which is included. See [self-employed returns](/tax-preparation/self-employed).",
      },
      {
        q: "Where do we meet?",
        a: "Our office is in Peachtree City, a short drive from Newnan — or you can work with us entirely online. [Get started](/get-started) either way.",
      },
    ],
    nearby: ["senoia", "peachtree-city", "fayetteville"],
  },
  {
    slug: "tyrone",
    name: "Tyrone",
    county: "Fayette County",
    seo: {
      title: "Tax Preparer Near Tyrone, GA",
      description:
        "Tax preparer near Tyrone, GA: returns prepared and signed by a CPA and reviewed by an Enrolled Agent, just minutes away in Peachtree City. Book your return now.",
    },
    image: "farmhouse",
    introTitle: "Close to home for Tyrone families",
    intro: [
      "Tyrone has kept its small-town feel even as the rest of Fayette County has grown. Wooded lots, quiet neighborhoods and a close-knit community make it a place people settle into for the long haul — and it sits just north of Peachtree City, a short drive from our office.",
      "For Tyrone residents, that proximity makes tax season simple. You can stop by in person to hand over a question or sit down to review your return, or skip the drive entirely and use our secure online process. Either way, you work with the same small team, and you know the price before you begin.",
      "Returns here tend to reflect established households. Many families have a mortgage, property taxes and charitable giving that deserve a real comparison between itemizing and the standard deduction. Others have investment accounts that produce 1099-Bs, retirement income, or a K-1 from a family business or partnership. Some run a business from home or rent out a second property. None of that changes what you pay: the flat fee covers Form 1040 with Schedules A, C and E, brokerage 1099-Bs and K-1s.",
      "What does change is who looks at your return. Every return we prepare is prepared and signed by a licensed CPA and reviewed by an Enrolled Agent — two licensed professionals, on every return, every year. If the IRS ever sends a letter about a prior year, our flat-fee tax resolution service is here for that too.",
      "Tyrone is also a place where people quietly start businesses from home — consulting, contracting, online shops. When that side income shows up for the first time, Schedule C and self-employment tax can come as a surprise. We’ll show you what to track during the year and how to set aside estimated payments, so the following return is smoother.",
    ],
    highlights: [
      {
        title: "Minutes from our office",
        text: "Easy in-person appointments in neighboring Peachtree City.",
      },
      {
        title: "Itemizing, done right",
        text: "Mortgage interest, property taxes and gifts compared against the standard deduction.",
      },
      {
        title: "Investment income",
        text: "Brokerage 1099-Bs and family-business K-1s at no extra charge.",
      },
    ],
    featured: {
      label: "Individual Returns & Itemized Deductions",
      href: "/tax-preparation/individual-itemized",
      text: "Form 1040 and Schedule A, with an honest comparison against the standard deduction.",
    },
    faqs: [
      {
        q: "How far is your office from Tyrone?",
        a: "Our office is in Peachtree City, just south of Tyrone — a short drive. Use the map on this page for directions, or work with us online.",
      },
      {
        q: "Should I itemize or take the standard deduction?",
        a: "It depends on your mortgage interest, property and state taxes, charitable gifts and medical costs. We run the comparison for you every year. Read more about [itemized deductions](/tax-preparation/individual-itemized).",
      },
      {
        q: "I got a K-1 from a family business. Is that extra?",
        a: "No. Schedule K-1 income is part of every return we prepare. See [investments and K-1s](/tax-preparation/investments-k1).",
      },
    ],
    nearby: ["peachtree-city", "fayetteville", "newnan"],
  },
  {
    slug: "senoia",
    name: "Senoia",
    county: "Coweta County",
    seo: {
      title: "Tax Preparer in Senoia, GA",
      description:
        "Tax preparer for Senoia, GA: returns for self-employed, gig and film workers, CPA-signed and EA-reviewed, with Schedule C handled. Get started online today.",
    },
    image: "camera-gear",
    introTitle: "Tax preparation for Senoia’s self-employed and small-town households",
    intro: [
      "Senoia is one of Coweta County’s best-known small towns, surrounded by quiet neighborhoods and open country. Its restored historic downtown has welcomed film and television productions for years, and that attention has brought visitors, new residents and new small businesses to Main Street — while the town has kept its welcoming, walkable character.",
      "Life in and around Senoia often includes non-traditional income. Some residents work on productions as independent contractors; others drive for delivery or rideshare apps, run shops and food businesses downtown, rent out a property, or sell crafts and services online. Each of those paths can create 1099-NEC or 1099-K forms, business expenses to track, and self-employment tax to plan for.",
      "That’s where a flat fee really helps. Schedule C for self-employed and gig income is included in our price — along with Schedule A, Schedule E, brokerage 1099-Bs and K-1s — so a complicated year doesn’t come with a complicated invoice. We help you capture the expenses you’re entitled to, figure out estimated payments for the year ahead, and keep everything organized for next time.",
      "Every return is prepared and signed by a licensed CPA and reviewed by an Enrolled Agent. Our office is in Peachtree City, a short drive from Senoia, and our secure online process means you can finish your return from home, from the set or from the road.",
      "If you’re new to self-employment, the first year is often the hardest: no withholding, unfamiliar forms and receipts scattered across apps. We’ll show you which records to keep, how quarterly estimated payments work and which expenses are genuinely deductible, so you’re set up for next year and not just this one — without paying extra for the extra help. And if a letter from the IRS about an earlier year has been sitting in a drawer, we can help with that too.",
    ],
    highlights: [
      {
        title: "Gig and app income",
        text: "1099-NEC and 1099-K income from rideshare, delivery and online platforms on Schedule C.",
      },
      {
        title: "Production work",
        text: "Independent-contractor income and expenses for film and TV crew members.",
      },
      {
        title: "Downtown businesses",
        text: "Sole proprietors and single-member LLCs, all included in the flat fee.",
      },
    ],
    featured: {
      label: "Self-Employed & Schedule C",
      href: "/tax-preparation/self-employed",
      text: "Freelance, gig and small-business income with expenses and self-employment tax handled.",
    },
    faqs: [
      {
        q: "I drive for delivery apps and got a 1099-K. Can you help?",
        a: "Yes. App-based income usually belongs on Schedule C, along with deductible expenses like business mileage. It’s included in the flat fee — see [self-employed returns](/tax-preparation/self-employed).",
      },
      {
        q: "I’m behind on taxes from past gig work. What should I do?",
        a: "Don’t wait. Our [tax resolution](/tax-resolution) service can help with unfiled years, IRS notices and payment plan requests. Results depend on your situation.",
      },
      {
        q: "Can I do everything online from Senoia?",
        a: "Yes. Upload documents securely, review your return and e-sign — no drive required. Or meet us in Peachtree City. [Here’s how it works](/how-it-works).",
      },
    ],
    nearby: ["newnan", "peachtree-city", "tyrone"],
  },
];

export function getCityPage(slug: CitySlug) {
  const page = cityPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown city: ${slug}`);
  return page;
}

/** Brooks and Sharpsburg get short unique paragraphs on /areas-we-serve. */
export const smallTownNotes: { name: string; county: City["county"]; text: string }[] = [
  {
    name: "Brooks",
    county: "Fayette County",
    text: "In rural southern Fayette County, Brooks households often combine W-2 jobs with acreage, small farms, horse properties or a business run from home. We prepare those returns for the same flat fee — including Schedule C for side businesses and Schedule E for any property you rent out — and our Peachtree City office is an easy drive up the road.",
  },
  {
    name: "Sharpsburg",
    county: "Coweta County",
    text: "Sharpsburg sits between Newnan and Peachtree City, so plenty of residents commute in both directions. Families here get the same flat-fee return with Schedule A, C and E, 1099-Bs and K-1s included, prepared and signed by a CPA and reviewed by an Enrolled Agent — in person in Peachtree City or entirely online.",
  },
];
