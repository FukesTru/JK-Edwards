import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type IconGridItem = { title: string; description?: string };

/** Title (+ optional description) cards with a short gold rule, for feature lists, issues and analyses. */
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
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item.title}
          className={cn(
            "rounded-2xl border transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5",
            compact ? "p-5" : "p-6",
            dark
              ? "border-white/10 bg-white/[0.04]"
              : tone === "paper"
                ? "border-line bg-paper"
                : "border-line bg-white hover:shadow-[0_20px_40px_-28px_rgba(22,24,27,0.35)]",
          )}
        >
          <span aria-hidden className="block h-0.5 w-8 rounded-full bg-gold" />
          <h3
            className={cn(
              "mt-4 font-semibold",
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
        </StaggerItem>
      ))}
    </Stagger>
  );
}
