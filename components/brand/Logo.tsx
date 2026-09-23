import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Text wordmark with a small orange square mark — stands in until the
 * client uploads the official logo files (SVG/PNG).
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="JK Edwards & Company — home"
      className={cn("group inline-flex items-center gap-2.5 rounded-sm", className)}
    >
      <span
        aria-hidden
        className="h-3 w-3 shrink-0 rounded-[2px] bg-accent transition-transform duration-300 group-hover:rotate-45"
      />
      <span
        className={cn(
          "font-serif text-[1.28rem] leading-none font-semibold tracking-tight whitespace-nowrap sm:text-[1.36rem]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        JK Edwards{" "}
        <span className={cn("font-normal", tone === "dark" ? "text-mist" : "text-charcoal")}>&amp; Company</span>
      </span>
    </Link>
  );
}
