import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Stat = { value: ReactNode; label: string };

export function StatsRow({ stats, tone = "dark" }: { stats: Stat[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-8 min-[480px]:grid-cols-2 min-[480px]:gap-y-10 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn("flex min-w-0 flex-col-reverse gap-2 border-l-2 pl-5", dark ? "border-accent/70" : "border-accent")}
        >
          <dt className={cn("text-sm leading-snug font-medium", dark ? "text-mist" : "text-charcoal")}>{stat.label}</dt>
          <dd
            className={cn(
              "font-sans text-[2.4rem] leading-none font-semibold tracking-tight sm:text-5xl",
              dark ? "text-white" : "text-ink",
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
