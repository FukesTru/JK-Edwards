#!/usr/bin/env node
/**
 * Self-host the site photography.
 *
 * The Artlist-generated images in content/images.json start out hotlinked from
 * Artlist's CDN (signed URLs). This script downloads each one into
 * public/images/<key>.jpg, re-encodes it with sharp (max 2400px wide, progressive
 * JPEG — next/image serves AVIF/WebP variants from it) and rewrites the manifest
 * to the local path, keeping the original URL in `remoteSrc`.
 *
 *   npm run images:pull              download anything not yet local
 *   npm run images:pull -- --force   re-download everything
 *   npm run images:pull -- --dry-run show what would happen
 *
 * Once every image is local you can remove the Artlist entry from
 * images.remotePatterns in next.config.ts.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifestPath = path.join(root, "content/images.json");
const outDir = path.join(root, "public/images");
const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const dryRun = args.has("--dry-run");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
await mkdir(outDir, { recursive: true });

const exists = (file) =>
  stat(file).then(
    () => true,
    () => false,
  );

let updated = 0;
let failed = 0;

for (const [key, image] of Object.entries(manifest)) {
  const remote = image.remoteSrc ?? (/^https?:\/\//.test(image.src) ? image.src : null);
  if (!remote) {
    console.log(`• ${key}: already local`);
    continue;
  }

  const localSrc = `/images/${key}.jpg`;
  const file = path.join(outDir, `${key}.jpg`);

  if (!force && (await exists(file))) {
    if (image.src !== localSrc) {
      manifest[key] = { ...image, src: localSrc, remoteSrc: remote };
      updated++;
    }
    console.log(`• ${key}: already downloaded`);
    continue;
  }

  if (dryRun) {
    console.log(`→ ${key}: would download to public/images/${key}.jpg`);
    continue;
  }

  try {
    const response = await fetch(remote);
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const input = Buffer.from(await response.arrayBuffer());
    const output = await sharp(input)
      .rotate()
      .resize({ width: 2400, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toBuffer();
    await writeFile(file, output);
    manifest[key] = { ...image, src: localSrc, remoteSrc: remote };
    updated++;
    console.log(`✓ ${key}: ${Math.round(output.length / 1024)} KB`);
  } catch (error) {
    failed++;
    console.error(`✗ ${key}: ${error instanceof Error ? error.message : error}`);
  }
}

if (!dryRun && updated) {
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nUpdated ${updated} manifest entr${updated === 1 ? "y" : "ies"} in content/images.json.`);
}
if (failed) {
  console.error(`\n${failed} image(s) failed to download. Check your network access and try again.`);
  process.exit(1);
}
