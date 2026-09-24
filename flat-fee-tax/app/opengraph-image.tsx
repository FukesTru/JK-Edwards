import { ogSize, renderOgImage } from "@/lib/og";
import { prices, site } from "@/lib/site";

export const alt = `${site.brandName} — ${prices.taxPrep} CPA-signed tax returns in ${site.primaryCity}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
