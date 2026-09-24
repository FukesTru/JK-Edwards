import type { MetadataRoute } from "next";
import { brandColors } from "@/lib/brand";
import { site, withBasePath } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brandName,
    short_name: site.brandName,
    start_url: withBasePath("/"),
    display: "browser",
    background_color: brandColors.navy,
    theme_color: brandColors.navy,
    icons: [
      { src: withBasePath("/brand/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: withBasePath("/brand/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
