import { brandColors, mark } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** The shield-and-ledger mark. `tile` sets it on a navy rounded square (the app icon look). */
export function LogoMark({ className, tile = false }: { className?: string; tile?: boolean }) {
  return (
    <svg
      viewBox={tile ? "0 0 64 64" : mark.viewBox}
      fill="none"
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {tile && <rect width="64" height="64" rx="14" fill={brandColors.navy} />}
      <path fill={brandColors.gold} fillRule="evenodd" d={mark.shield} />
      <path d={mark.margin} stroke={brandColors.gold} strokeWidth={1.6} strokeLinecap="round" />
      <path d={mark.ledger} stroke={brandColors.gold} strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}
