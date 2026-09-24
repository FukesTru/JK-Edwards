# JK Edwards & Company — website

Marketing site for **JK Edwards & Company**, an accounting and tax firm at 1883 McDonough Rd, Suite 200A, Hampton, GA 30228.
It has 20 main pages, 6 starter blog posts and the utility pages (privacy, terms, HTML sitemap, 404). Every page is statically generated.

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Framer Motion, Lucide icons, MDX for blog posts.
- **Imagery:** 25 photographs generated with Artlist (Seedream 5.0). See [Images](#images).
- **Checked:** production build, ESLint, TypeScript, an SEO and link audit of every page, no horizontal scroll at 375 / 768 / 1440 px, and Lighthouse mobile scores of Performance 92–93, Accessibility 100, Best Practices 96 and SEO 100 (Best Practices only lost points because the image CDN was blocked in the test sandbox).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional for local work
npm run dev                  # http://localhost:3000
```

| Script                 | What it does                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `npm run dev`          | Local development server                                                            |
| `npm run build`        | Production build (static generation of every page)                                  |
| `npm start`            | Serve the production build                                                          |
| `npm run lint`         | ESLint                                                                              |
| `npm run typecheck`    | TypeScript                                                                          |
| `npm run format`       | Prettier (with Tailwind class sorting); `format:check` to verify                    |
| `npm run audit:seo`    | Audits a running site: titles, descriptions, canonicals, H1s, JSON-LD, broken links |
| `npm run images:check` | Validates `content/images.json` (alt text, URLs or local files)                     |
| `npm run images:pull`  | Downloads the Artlist images into `/public/images` (self-hosting)                   |

`audit:seo` checks `http://localhost:3000` by default. Run `npm run build && npm start` first, or set `BASE_URL`.

## Where things live

```
app/                      Routes: one folder per page (page.tsx), plus sitemap.ts, robots.ts,
                          opengraph-image.tsx, icon.tsx, logo.png/route.tsx and api/contact
components/
  layout/                 Header (mega menus + mobile menu), Footer, CTA band, mobile Call/Book bar
  ui/                     PageHero, Section, Breadcrumbs, FaqAccordion, Button, Placeholder …
  sections/               Reusable page sections (process timeline, packages table, portal grid …)
  cards/ forms/ motion/   Cards, lead forms, scroll-reveal helpers
content/
  services.ts             The 7 services: names, summaries, SEO titles and descriptions, images
  industries.ts           The 4 industry pages
  faqs.ts                 Every FAQ on the site (per page + the grouped /faq page)
  packages.ts             Outsourced accounting packages
  blog/                   posts.ts (post list) + one .mdx file per post
  images.json             Image manifest: src, alt text and Artlist generation ID
lib/
  site.ts                 Firm details: name, address, phone, hours, team, portals, links
  seo.ts                  Metadata helper and JSON-LD builders
  routes.ts               Page list used by sitemap.xml and the /sitemap page
scripts/                  audit-seo, pull-images, check-images
```

### Common edits

- **Phone, address, hours, social links, portal URLs, team:** `lib/site.ts`. It feeds the header, footer, contact cards, schema and Client Center.
- **Service or industry copy and SEO:** `content/services.ts`, `content/industries.ts` and the page file in `app/`.
- **FAQs:** `content/faqs.ts`. Links use `[label](/path)` syntax.
- **New blog post:** add `content/blog/<slug>.mdx`, then add an entry to `content/blog/posts.ts` (title, a `seoTitle` of up to 37 characters, a 150–160 character description, category, date, image key). Posts should run 600–900 words and link to at least two service pages. The sitemap, blog grid, share image and schema update automatically.

## Environment variables

See `.env.example`.

| Variable                                                   | Purpose                                                                                                     |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_GA4_ID`                                       | GA4 measurement ID. The default `G-XXXXXXXXXX` renders the snippet but loads nothing.                       |
| `NEXT_PUBLIC_BOOKING_URL`                                  | Calendly or GoHighLevel page to embed on `/contact`.                                                        |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS`                            | Outlines unconfirmed copy for review. Set it to `false` at launch.                                          |
| `CONTACT_WEBHOOK_URL`                                      | Delivers form leads as JSON to a CRM or automation webhook.                                                 |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Delivers form leads by email through [Resend](https://resend.com). The sender must be on a verified domain. |

## Forms

The consultation form (`/contact`), footer message form, IRS notice upload (`/services/irs-tax-resolution#upload-notice`) and eBook requests all post to `app/api/contact/route.ts`. That route:

- validates the fields, and accepts a PDF, JPG, PNG or HEIC notice up to 4 MB
- drops spam silently (a hidden honeypot field, submissions faster than 2.5 s) and rate-limits each IP to 6 submissions per 10 minutes
- sends each lead to the webhook and/or email configured above, including the IRS notice as an attachment

**At least one delivery channel must be configured before launch.** Without one, development logs leads to the console and production shows visitors a "please call us" message.

## Images

All photography was generated with the Artlist connector. The manifest is `content/images.json` and each entry keeps its Artlist `generationId`.

- The files are currently **hotlinked** from Artlist's CDN (`cms-toolkit-artifacts.artlist.io`) with signed URLs valid until 2036. `next.config.ts` allows that host for `next/image`.
- **Recommended before launch:** run `npm run images:pull` from a machine with normal internet access. It downloads every image to `public/images/`, re-encodes it and rewrites the manifest to local paths. Commit the results. You can then remove the Artlist host from `next.config.ts`.
- Some images have **not been visually reviewed** because they couldn't be previewed during the build. Look at each one in your Artlist account (or on the site) before launch and regenerate any with defects: `about-office`, `industry-trucking`, `industry-expats`, `service-new-business`, `services-hub`, `henry-county`, `blog-trucker` and `service-advisory`.
- The images are AI-generated illustrations, not photos of real clients or staff, and the Terms page says so. Team members appear as initials avatars until real headshots arrive. Consider replacing the office imagery with real photos of the Hampton office.

## SEO

- **Metadata:** `buildMetadata()` in `lib/seo.ts` produces titles in the form `[Keyword] | JK Edwards & Company` (60 characters or fewer), a unique 150–160 character description, a canonical URL on `https://www.jkedwards.com`, Open Graph and Twitter tags.
- **Structured data:** AccountingService + ProfessionalService (home and Henry County), WebSite, Organization + Person (About), Service + FAQPage (service and industry pages; industry pages add an `audience`), FAQPage (/faq), BlogPosting (posts) and BreadcrumbList on every inner page.
- **Share images:** generated from the brand fonts: a default card (`/opengraph-image`), a card per blog post, a schema logo (`/logo.png`) and app icons.
- **Crawling:** `robots.txt` and `sitemap.xml` are generated. The Client Center is included at low priority, and there is an HTML sitemap at `/sitemap`.
- **Redirects:** every legacy URL (`/who-we-are`, `/what-we-do/*`, `/who-we-serve/*`, `/resources/*`) 301s to its new page, and `jkedwards.com` 301s to `www.jkedwards.com`. See `next.config.ts`.

## Deployment

The site is built for [Vercel](https://vercel.com). Any Node host that runs `next start` also works.

1. Import the repository and set the environment variables above.
2. Add both `www.jkedwards.com` and `jkedwards.com` as domains, with `www` as the primary.
3. Submit `https://www.jkedwards.com/sitemap.xml` in Google Search Console.

> **`flat-fee-tax/` is a separate website** (a flat-fee tax preparation and resolution practice). It has its own `package.json`, is excluded from this app's TypeScript, ESLint, Prettier and Tailwind scanning, and deploys as its own Vercel project with Root Directory `flat-fee-tax`. See [`flat-fee-tax/README.md`](flat-fee-tax/README.md).

## Pre-launch checklist

Items marked in the site with a dashed amber outline are unconfirmed. Hover over one to see its note.

- [ ] **Address and town:** listings disagree (Hampton 30228 vs Tyrone). Confirm the current office, then update `lib/site.ts`.
- [ ] **Hours:** the current hours come from Yelp and may be tax-season only.
- [ ] **Map coordinates:** `site.geo` is approximate. Copy the exact coordinates from the Google Business Profile.
- [ ] **Founder story and founding year** on /about.
- [ ] **Team:** confirm the five current staff, and get headshots, full bios and LinkedIn URLs.
- [ ] **CPA firm status:** the site deliberately says "accounting & tax firm". Only use "CPA firm" once Georgia State Board of Accountancy firm registration is confirmed.
- [ ] **Badges:** confirm the AICPA membership, QuickBooks ProAdvisor, Bill.com certification and Dave Ramsey ELP are current.
- [ ] **Logo files:** upload the official SVG/PNG. The wordmark in `components/brand/Logo.tsx` and the generated `/logo.png` are stand-ins.
- [ ] **Stats:** replace the `[X]+` placeholders for years in business and client count on the home page. Never estimate them.
- [ ] **Google Business Profile:** set the review URL in `site.links.googleReviews` and connect a reviews widget. Don't hard-code ratings or quotes.
- [ ] **eBooks** (trucking and healthcare): re-host the PDFs, then pass `downloadUrl` to `EbookOffer`. Until then, each request emails the firm, which replies with the guide.
- [ ] **Client Center downloads:** upload the engagement letter and tax organizer PDFs.
- [ ] **Booking tool:** set `NEXT_PUBLIC_BOOKING_URL`.
- [ ] **Form delivery:** set `CONTACT_WEBHOOK_URL` and/or the Resend variables, then send a test submission.
- [ ] **GA4:** set `NEXT_PUBLIC_GA4_ID`.
- [ ] **Legal review:** have the Privacy Policy and Terms reviewed by the firm's attorney.
- [ ] **Images:** run `npm run images:pull` and review the unreviewed images listed above.
- [ ] **Launch:** set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false` once everything above is resolved.
- [ ] **Old blog content:** the "Magazine" and "Quick Reads" articles weren't migrated (they appear to be syndicated). They redirect to /blog.
