import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Software partner wordmarks. Rendered as typographic chips rather than
 * third-party logo files (swap in official logo SVGs once permissions are
 * confirmed).
 */
export function PartnerStrip({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <ul aria-label="Software we work with" className={cn("flex flex-wrap justify-center gap-3", className)}>
      {site.softwarePartners.map((partner) => (
        <li
          key={partner}
          className={cn(
            "rounded-full border px-5 py-2.5 text-[15px] font-semibold tracking-tight",
            dark ? "border-white/15 bg-white/[0.04] text-white/85" : "border-line bg-white text-charcoal",
          )}
        >
          {partner}
        </li>
      ))}
    </ul>
  );
}
