import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Green-check list for "what's included" items. */
export function CheckList({
  items,
  tone = "light",
  className,
  columns = 1,
}: {
  items: ReactNode[];
  tone?: "light" | "dark";
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
              tone === "dark" ? "bg-gold/15 text-gold" : "bg-success/10 text-success",
            )}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className={cn("leading-relaxed", tone === "dark" ? "text-white/90" : "text-ink")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
