import type { NextConfig } from "next";
import { basePath } from "./lib/site";

const nextConfig: NextConfig = {
  // Set automatically when site.config.ts `domain` includes a sub-path (e.g. example.com/tax).
  basePath: basePath || undefined,
  poweredByHeader: false,
  // This app lives inside another project's repository; keep Turbopack scoped to this folder.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Artlist-generated photography (hotlinked until `npm run images:pull` self-hosts it).
      { protocol: "https", hostname: "cms-toolkit-artifacts.artlist.io", pathname: "/content/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
