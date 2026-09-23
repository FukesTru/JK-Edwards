import { renderLogo } from "@/lib/og";

export const dynamic = "force-static";

/** Square brand logo referenced by the Organization / AccountingService schema. */
export function GET() {
  return renderLogo(600);
}
