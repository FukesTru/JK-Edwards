#!/usr/bin/env node
/**
 * Sanity-check content/images.json: every entry needs descriptive alt text and a
 * source that exists — a file in /public for local paths, or a well-formed,
 * unexpired signed Artlist URL for remote ones.
 *
 *   npm run images:check             offline checks only
 *   npm run images:check -- --online also request each remote image
 */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(await readFile(path.join(root, "content/images.json"), "utf8"));
const online = process.argv.includes("--online");
const problems = [];
let remote = 0;
let local = 0;

for (const [key, image] of Object.entries(manifest)) {
  if (!image.alt || image.alt.trim().length < 10) problems.push(`${key}: alt text is missing or too short`);
  if (image.alt && image.alt.length > 150)
    problems.push(`${key}: alt text is ${image.alt.length} characters (keep it under 150)`);

  if (/^https?:\/\//.test(image.src)) {
    remote++;
    const url = new URL(image.src);
    const expires = Number(url.searchParams.get("Expires"));
    const signature = url.searchParams.get("Signature") ?? "";
    if (url.hostname !== "cms-toolkit-artifacts.artlist.io") problems.push(`${key}: unexpected host ${url.hostname}`);
    if (!expires || expires * 1000 < Date.now()) problems.push(`${key}: signed URL is expired or has no Expires`);
    if (signature.length < 300 || !url.searchParams.get("Key-Pair-Id"))
      problems.push(`${key}: signed URL looks truncated`);
    if (online) {
      const response = await fetch(image.src, { method: "HEAD" }).catch((error) => ({
        ok: false,
        status: error.message,
      }));
      if (!response.ok) problems.push(`${key}: remote image returned ${response.status}`);
    }
  } else {
    local++;
    const file = path.join(root, "public", image.src);
    const found = await stat(file).then(
      () => true,
      () => false,
    );
    if (!found) problems.push(`${key}: ${image.src} is missing from /public`);
  }
}

console.log(`${Object.keys(manifest).length} images (${local} local, ${remote} remote).`);
if (problems.length) {
  for (const problem of problems) console.log(`  • ${problem}`);
  process.exit(1);
}
console.log("All images look good.");
