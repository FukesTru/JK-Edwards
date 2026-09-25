import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Horizontal logo: the mark plus a live-text wordmark set in Playfair Display
 * 700 from `site.brandName`, so renaming the business needs no redraw.
 * `dark` = for navy backgrounds (bare gold mark, white text); `light` = for
 * light backgrounds (mark on a navy tile, navy text).
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.brandName} home page`}
      className={cn("group inline-flex items-center gap-2.5 rounded-sm", className)}
    >
      {tone === "dark" ? (
        <LogoMark className="h-9 w-auto transition-transform duration-300 group-hover:-translate-y-0.5" />
      ) : (
        <LogoMark tile className="h-10 w-10" />
      )}
      <span
        className={cn(
          "font-serif text-[1.3rem] leading-none font-bold tracking-tight whitespace-nowrap sm:text-[1.4rem]",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {site.brandName}
      </span>
    </Link>
  );
}
