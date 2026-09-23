import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckList({
  items,
  columns = 1,
  tone = "light",
  className,
}: {
  items: ReactNode[];
  columns?: 1 | 2;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-x-8 gap-y-3.5", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 leading-snug">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
              dark ? "bg-accent/20 text-accent-light" : "bg-accent/10 text-accent",
            )}
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className={dark ? "text-white/90" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
