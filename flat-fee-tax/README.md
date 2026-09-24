# Flat-fee tax preparation & resolution website

Marketing site for a new flat-fee tax practice owned by **Kai Mays, EA** in Peachtree City, Georgia. The business offers two services: **tax preparation for $249** and **tax resolution for $749**. The site's main promise is that every return is prepared and signed by a licensed CPA and reviewed by an Enrolled Agent, for one flat, upfront price.

It has 18 pages plus the utility pages (privacy, terms, HTML sitemap, 404) and an internal `/brand` page for approving the logo. Every page is statically generated.

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lucide icons.
- **This is a standalone app.** It lives in `flat-fee-tax/` inside the same repository as another site, but has its own `package.json`. Deploy it as its own project, e.g. with Vercel's Root Directory set to `flat-fee-tax`.
- **Checked:**
  - production build, ESLint, TypeScript and Prettier
  - an SEO and link audit of all 21 indexable pages
  - no horizontal scroll at 375 / 768 / 1440 px on all 23 pages
  - end-to-end form submissions
  - a build under a sub-path domain
  - Lighthouse (mobile): Performance 92–96, Accessibility 100, SEO 100, Best Practices 96–100 (the only deduction came from the image CDN being blocked in the test sandbox)

## Getting started

```bash
cd flat-fee-tax
npm install
npm run dev          # http://localhost:3000
```

| Script                                  | What it does                                                                                                                             |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build` / `npm start`           | Production build / serve it                                                                                                              |
| `npm run lint` · `typecheck` · `format` | ESLint · TypeScript · Prettier (`format:check` to verify)                                                                                |
| `npm run audit:seo`                     | Audits a running site (default `http://localhost:3000`, or set `BASE_URL`): titles, descriptions, canonicals, H1s, JSON-LD, broken links |
| `npm run images:check` / `images:pull`  | Validate the image manifest / download the images into `/public/images` (self-hosting)                                                   |

## `site.config.ts` — change the business details in one place

Every business detail comes from **`site.config.ts`**: brand and legal name, owner, signing CPA and license number, phone, email, address, domain, prices, cities, social links, hours, secure upload link and booking link. Nothing is hard-coded elsewhere. Swap the `{{PLACEHOLDER}}` values and rebuild.

- **Placeholders render visibly** (e.g. `{{BRAND_NAME}}`, `Call {{PHONE}}`) with a dashed amber outline while `NEXT_PUBLIC_SHOW_PLACEHOLDERS` isn't `false`.
- **Placeholders never become broken links.** Until real values are set, phone and email links point to `/get-started`, the map centers on Peachtree City, and placeholder values are left out of the structured data.
- **`domain`** accepts a bare domain (`example.com`) or a sub-path (`example.com/tax`, `jkedwards.com/transportation`). A sub-path automatically sets Next's `basePath`, so canonical URLs, sitemap, icons, images and the form API all follow. Both modes are tested. Until it's set, canonical URLs use the reserved `www.example.com`.
- **`prices`** feeds every "$249" / "$749" on the site, in titles, CTAs, schema and the OG image.
- **`confirm`** holds the facts the owner still has to confirm: state return, joint returns, multiple schedules, prior-year and amended returns, payment timing, turnaround, the resolution scope and the K-1 comparison claim. While a value is `null` (or `false`), the site shows **[CLIENT TO CONFIRM]** in its place. FAQ answers that depend on one are left out of the FAQ schema until confirmed.

## Logo system

The client had no logo, so the site includes one: a geometric **shield holding ledger lines** (a margin rule and three entries), gold on navy, next to a **Playfair Display 700 wordmark set as live text from `site.brandName`**. Renaming the business updates every logo; there's nothing to redraw.

| File                                                                              | Notes                                                               |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `/brand/logo-horizontal-dark.svg` · `/brand/logo-horizontal-light.svg`            | Live `<text>` wordmark with Playfair Display embedded               |
| `/brand/logo-horizontal-dark.png` · `/brand/logo-horizontal-light.png`            | Rendered from the same source, trimmed with even padding            |
| `/brand/icon-mark.svg` · `/brand/icon-512.png` · `/brand/icon-192.png`            | Square icon mark / app icons (also in the web manifest)             |
| `/brand/favicon-16.png` · `/brand/favicon-32.png` · `/brand/apple-touch-icon.png` | Favicon set: 16 / 32 / 180 (16 and 32 use a bolder simplified mark) |

Open **`/brand`** (not indexed) to preview everything, download the files and see the palette. It's the page to send Kai for approval. The geometry lives in `lib/brand.ts` and the renderers in `lib/og.tsx`.

## Pages

| Page                                        | URL                                                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Home                                        | `/`                                                                                                                 |
| Pricing                                     | `/pricing`                                                                                                          |
| How It Works (printable document checklist) | `/how-it-works`                                                                                                     |
| Tax Preparation (+ 4 sub-pages)             | `/tax-preparation`, `/tax-preparation/individual-itemized`, `/self-employed`, `/rental-property`, `/investments-k1` |
| Tax Resolution (+ notice upload form)       | `/tax-resolution`                                                                                                   |
| Areas We Serve (+ 5 city pages)             | `/areas-we-serve`, `/areas-we-serve/peachtree-city`, `/fayetteville`, `/newnan`, `/tyrone`, `/senoia`               |
| About · FAQ (25 questions) · Get Started    | `/about`, `/faq`, `/get-started`                                                                                    |
| Utility                                     | `/privacy-policy`, `/terms`, `/sitemap`, 404, `/brand` (noindex)                                                    |

The content lives in `content/`: services, the forms included in the flat fee, cities (unique local copy of 300+ words per city page), FAQs, resolution scope and issues, and the image manifest.

## Forms

The Get Started form, the IRS notice upload and the footer quick form all post to `app/api/contact/route.ts`. That route:

- validates the fields and accepts a notice as a PDF, JPG or PNG up to 4 MB
- **rejects anything that looks like a Social Security number**; forms never ask for SSNs or bank details
- drops spam silently (a hidden honeypot field, submissions faster than 2.5 s) and rate-limits each IP
- delivers each lead to `CONTACT_WEBHOOK_URL` and/or by email through Resend (see `.env.example`)

**Configure at least one delivery channel before launch.** Without one, production asks visitors to try again or call.

## SEO & schema

- **Titles and descriptions:** titles follow `[Primary keyword] | {brandName}` and stay ≤ 60 characters with the placeholder name. **Re-run `npm run audit:seo` after setting the real brand name**, since a longer name can push titles over 60. Descriptions are 150–160 characters and include the price, "CPA-signed" and a call to action.
- **Structured data:**
  - site-wide `AccountingService`: address, geo, `areaServed` covering the 7 cities plus Fayette and Coweta County, founder, offer catalog
  - `Service` + `Offer` with price on Home, Pricing, Tax Preparation (and its sub-pages) and Tax Resolution
  - `Person` for Kai (Enrolled Agent) and the signing CPA
  - `FAQPage` and `BreadcrumbList`; each city page adds an `AccountingService` with `areaServed` set to that city
- **Crawling and analytics:** `robots.txt`, `sitemap.xml` and an HTML `/sitemap`, a 1200×630 OG image (logo and "$249 CPA-Signed Tax Returns" on navy), and a GA4 placeholder (`G-XXXXXXXXXX`) in `<head>`.

## Compliance notes

- **Credential claims:** "Prepared & signed by a CPA / reviewed by an Enrolled Agent" appears exactly as specified. The CPA's name and license number are shown in the footer and on the About page.
- **Tax resolution:** no guarantees and no "pennies on the dollar" claims. A results-vary line appears on the resolution page, the $749 price card on Pricing and the footer disclaimer, in line with Circular 230 §10.30.
- **Unconfirmed comparisons:** the K-1 comparison and the "typical tax shop" table are factual and name no competitors. The K-1 claim stays marked [CLIENT TO CONFIRM] until approved.
- **No hard-coded tax thresholds:** standard deduction, SALT cap and similar limits are described generally.
- **No invented social proof:** there are no invented reviews, ratings, client counts or results. The reviews block is a `[CONNECT GOOGLE BUSINESS PROFILE]` placeholder.
- **Imagery:** the photos are AI-generated illustrations (the Terms page says so). Team members appear as initials avatars until real headshots arrive.

## Images

Nine photographs were generated with the Artlist connector for this site (Peachtree City-style lake and golf-cart path, suburban homes, a rental home, a tradesperson, a freelance editor, a farmhouse, a camera operator, a historic home). Four fitting images were reused from an earlier set. The manifest is `content/images.json`.

- **Hosting:** the images are currently hotlinked from Artlist's CDN via signed URLs valid until 2036. Run `npm run images:pull` from a machine with normal internet access to self-host them.
- **Review before launch.** Only two of the new images could be visually checked during the build, and both passed: `tradesperson` and `freelancer-studio`. Look at the rest in Artlist or on the site and regenerate any with defects: `ptc-lake`, `golf-cart-path`, `suburban-homes`, `rental-property`, `farmhouse`, `camera-gear` and `historic-home`.
- **Location claims:** the city pages use generic scenes, and their alt text doesn't claim to show a specific real place.

## Pre-launch checklist

- [ ] **Business name / LLC:** set `brandName` and `legalName`, then re-run `npm run audit:seo`.
- [ ] **Contact details:** phone, email, street address and ZIP in `site.config.ts`. Update `geo` to the office's exact coordinates.
- [ ] **Domain:** a standalone domain, or a sub-path such as `jkedwards.com/transportation`. Both work, but a sub-path of another business's site needs that site to route the path to this app.
- [ ] **Signing CPA:** name and Georgia license number. Confirm the CPA is the paid preparer of record signing with their PTIN, since the site says "prepared & signed by a CPA."
- [ ] **Pricing confirmations** (`site.confirm`): state return, joint returns, multiple C/E schedules, prior-year and amended returns, payment timing, turnaround, the exact $749 scope, and the K-1 comparison claim.
- [ ] **Hours, secure upload portal link and booking link** (`hours`, `secureUploadUrl`, `bookingUrl`).
- [ ] **Google Business Profile:** create it, add it to `social.google` and connect a reviews widget.
- [ ] **Facebook / Instagram:** add the URLs; their icons appear automatically.
- [ ] **Logo approval** from Kai (`/brand`), plus **headshots** for Kai and the CPA to replace the initials avatars.
- [ ] **Bios:** Kai's and the CPA's (About page placeholders).
- [ ] **Form delivery:** set `CONTACT_WEBHOOK_URL` and/or the Resend variables, then send a test submission.
- [ ] **GA4:** set `NEXT_PUBLIC_GA4_ID`.
- [ ] **Legal review:** have the Privacy Policy and Terms reviewed by the business's attorney.
- [ ] **Images:** review the unreviewed images and run `npm run images:pull`.
- [ ] **Launch:** set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false` once everything above is resolved.
