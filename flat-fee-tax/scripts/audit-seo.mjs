#!/usr/bin/env node
/**
 * Pre-launch SEO + link audit. Start the site first (`npm run build && npm start`),
 * then run:  npm run audit:seo            (defaults to http://localhost:3000)
 *            BASE_URL=http://localhost:3100 npm run audit:seo
 *
 * For every URL in sitemap.xml it checks: HTTP 200, <title> ≤ 60 chars and unique,
 * meta description 150–160 chars and unique, a canonical URL on the site.config.ts domain,
 * exactly one <h1>, Open Graph + Twitter tags, valid JSON-LD, <img> alt text, and
 * that every inner page has BreadcrumbList schema. It then requests every internal
 * link found on those pages and reports non-200s. Titles/descriptions are measured
 * as rendered, so re-run it after the final brand name is set.
 */

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const problems = [];
const warn = (page, message) => problems.push(`${page}: ${message}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const attr = (html, re) => {
  const match = html.match(re);
  return match ? decode(match[1]) : null;
};

async function get(path, init) {
  // Paths are relative to BASE_URL (which already includes any basePath, whose home has no trailing slash).
  const url = BASE + (path === "/" && new URL(BASE).pathname.length > 1 ? "" : path);
  const response = await fetch(url, { redirect: "manual", ...init });
  return { status: response.status, headers: response.headers, text: await response.text() };
}

const sitemap = await get("/sitemap.xml");
if (sitemap.status !== 200) {
  console.error(`Could not load ${BASE}/sitemap.xml (HTTP ${sitemap.status}). Is the site running?`);
  process.exit(1);
}
const locs = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]));
// Canonical origin (+ optional sub-path) as configured in site.config.ts, taken from the home page entry.
const SITE = locs[0].href.replace(/\/$/, "");
const basePath = new URL(SITE).pathname.replace(/\/$/, "");
const paths = locs.map((url) => url.pathname.slice(basePath.length) || "/");

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const rows = [];

for (const path of paths) {
  const { status, text: html } = await get(path);
  if (status !== 200) {
    warn(path, `HTTP ${status}`);
    continue;
  }

  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;

  if (!title) warn(path, "missing <title>");
  else {
    if (title.length > 60) warn(path, `title is ${title.length} chars (max 60): "${title}"`);
    if (titles.has(title)) warn(path, `duplicate title (also on ${titles.get(title)})`);
    titles.set(title, path);
  }

  if (!description) warn(path, "missing meta description");
  else {
    if (description.length < 150 || description.length > 160)
      warn(path, `description is ${description.length} chars (want 150–160)`);
    if (descriptions.has(description)) warn(path, `duplicate description (also on ${descriptions.get(description)})`);
    descriptions.set(description, path);
  }

  const expectedCanonical = SITE + (path === "/" ? (basePath ? "" : "/") : path);
  // Next.js may drop the trailing slash on the root URL; both forms are equivalent.
  if (canonical !== expectedCanonical && canonical?.replace(/\/$/, "") !== expectedCanonical.replace(/\/$/, ""))
    warn(path, `canonical is ${canonical ?? "missing"} (expected ${expectedCanonical})`);
  if (h1Count !== 1) warn(path, `${h1Count} <h1> elements (expected 1)`);
  if (!/property="og:image"/.test(html)) warn(path, "missing og:image");
  if (!/name="twitter:card"/.test(html)) warn(path, "missing twitter:card");
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) warn(path, "page is noindex");

  const schemaTypes = [];
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      for (const item of Array.isArray(data) ? data : [data]) {
        const type = item["@type"];
        schemaTypes.push(...(Array.isArray(type) ? type : [type]));
      }
    } catch {
      warn(path, "invalid JSON-LD");
    }
  }
  if (!schemaTypes.length) warn(path, "no JSON-LD");
  if (path !== "/" && !schemaTypes.includes("BreadcrumbList")) warn(path, "missing BreadcrumbList schema");

  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(tag)) warn(path, `<img> without alt: ${tag.slice(0, 80)}…`);
  }

  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = decode(href);
    if (url.startsWith("/") && !url.startsWith("//")) {
      // Rendered hrefs include the basePath; strip it so links resolve against BASE_URL.
      const local = basePath && url.startsWith(basePath) ? url.slice(basePath.length) || "/" : url;
      internalLinks.add(local.split("#")[0] || "/");
    }
  }

  rows.push({
    path,
    title: title?.length ?? 0,
    description: description?.length ?? 0,
    h1: h1Count,
    schema: schemaTypes.join(", "),
  });
}

for (const link of internalLinks) {
  const { status } = await get(link, { method: "HEAD" });
  if (status !== 200) warn(link, `internal link returns HTTP ${status}`);
}

console.table(rows);
console.log(`\nChecked ${paths.length} pages and ${internalLinks.size} unique internal links against ${BASE}.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.log(`  • ${problem}`);
  process.exit(1);
}
console.log("No problems found.");
