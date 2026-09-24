import manifest from "@/content/images.json";
import { withBasePath } from "@/lib/site";

/**
 * Site photography generated with Artlist (Seedream 5.0). `src` points at the
 * Artlist CDN until `npm run images:pull` downloads the files into
 * /public/images and rewrites the manifest to local paths.
 */
export type ImageKey = keyof typeof manifest;

export type SiteImage = {
  src: string;
  alt: string;
  generationId?: string;
  /** Original Artlist URL, kept after `images:pull` self-hosts the file. */
  remoteSrc?: string;
};

const images = manifest as Record<ImageKey, SiteImage>;

export function getImage(key: ImageKey): SiteImage {
  const image = images[key];
  // Local files need the basePath prefix when the site runs under a sub-path.
  return { ...image, src: withBasePath(image.src) };
}
