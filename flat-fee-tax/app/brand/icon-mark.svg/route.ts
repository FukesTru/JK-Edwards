import { markSvg } from "@/lib/brand";

export const dynamic = "force-static";

/** Square icon mark (gold shield on a navy tile) as SVG. */
export function GET() {
  return new Response(markSvg({ tile: true }), { headers: { "Content-Type": "image/svg+xml" } });
}
