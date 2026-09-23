#!/usr/bin/env node
/**
 * Pre-launch SEO + link audit. Start the site first (`npm run build && npm start`),
 * then run:  npm run audit:seo            (defaults to http://localhost:3000)
 *            BASE_URL=http://localhost:3100 npm run audit:seo
 *
 * For every URL in sitemap.xml it checks: HTTP 200, <title> ≤ 60 chars and unique,
 * meta description 150–160 chars and unique, canonical on https://www.jkedwards.com,
 * exactly one <h1>, Open Graph + Twitter tags, valid JSON-LD, and <img> alt text.
 * It then requests every internal link found on those pages and reports non-200s.
 */

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://www.jkedwards.com";

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
  const response = await fetch(BASE + path, { redirect: "manual", ...init });
  return { status: response.status, headers: response.headers, text: await response.text() };
}

const sitemap = await get("/sitemap.xml");
if (sitemap.status !== 200) {
  console.error(`Could not load ${BASE}/sitemap.xml (HTTP ${sitemap.status}). Is the site running?`);
  process.exit(1);
}
const paths = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

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

  const expectedCanonical = SITE + (path === "/" ? "" : path);
  if (canonical !== expectedCanonical && canonical !== `${expectedCanonical}/`)
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
    if (url.startsWith("/") && !url.startsWith("//")) internalLinks.add(url.split("#")[0] || "/");
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
