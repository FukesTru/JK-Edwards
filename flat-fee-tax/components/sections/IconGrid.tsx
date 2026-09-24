import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { icons, type IconName } from "@/components/ui/icon-map";
import { cn } from "@/lib/utils";

export type IconGridItem = { icon: IconName; title: string; description?: string };

/** Icon + title (+ optional description) tiles for feature lists, issues, analyses… */
export function IconGrid({
  items,
  columns = 3,
  tone = "light",
  compact = false,
}: {
  items: IconGridItem[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark" | "paper";
  compact?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <Stagger
      as="ul"
      className={cn("grid gap-4 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3", columns === 4 && "lg:grid-cols-4")}
    >
      {items.map((item) => {
        const Icon = icons[item.icon];
        return (
          <StaggerItem
            as="li"
            key={item.title}
            className={cn(
              "flex gap-4 rounded-2xl border transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5",
              compact ? "items-center p-5" : "items-start p-6",
              dark
                ? "border-white/10 bg-white/[0.04]"
                : tone === "paper"
                  ? "border-line bg-paper"
                  : "border-line bg-white hover:shadow-[0_20px_40px_-28px_rgba(22,24,27,0.35)]",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                dark ? "bg-gold/15 text-gold" : "bg-navy/5 text-navy",
              )}
            >
              <Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <h3
                className={cn(
                  "font-semibold",
                  compact ? "text-[15px]" : "text-[1.05rem]",
                  dark ? "text-white" : "text-navy",
                )}
              >
                {item.title}
              </h3>
              {item.description && (
                <p className={cn("mt-1.5 text-[15px] leading-relaxed", dark ? "text-mist" : "text-muted")}>
                  {item.description}
                </p>
              )}
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
