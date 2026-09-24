import { cn } from "@/lib/utils";

/** Initials in a navy/gold circle — stands in until a real headshot is supplied (no stock faces). */
export function InitialsAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .replace(/,.*$/, "")
    .replace(/\{\{|\}\}/g, "")
    .split(/[\s_]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "grid aspect-square shrink-0 place-items-center rounded-full bg-navy font-serif font-bold text-gold ring-4 ring-gold/30",
        className,
      )}
    >
      {initials || "•"}
    </span>
  );
}
