import type { ReactNode } from "react";
import { BadgeDollarSign, Info, TriangleAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const kinds = {
  price: { Icon: BadgeDollarSign, box: "border-gold/50 bg-gold/10", bar: "bg-gold", icon: "bg-navy text-gold" },
  info: { Icon: Info, box: "border-line bg-paper", bar: "bg-navy", icon: "bg-navy text-gold" },
  warning: {
    Icon: TriangleAlert,
    box: "border-amber-300 bg-amber-50",
    bar: "bg-amber-500",
    icon: "bg-amber-500 text-white",
  },
};

/** Highlighted note: compliance notes, cautions. */
export function Callout({
  kind = "info",
  title,
  children,
  cta,
  className,
}: {
  kind?: keyof typeof kinds;
  title: ReactNode;
  children?: ReactNode;
  cta?: { label: string; href: string };
  className?: string;
}) {
  const { Icon, box, bar, icon } = kinds[kind];
  return (
    <aside className={cn("relative overflow-hidden rounded-2xl border p-6 sm:p-8", box, className)}>
      <div aria-hidden className={cn("absolute inset-y-0 left-0 w-1.5", bar)} />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl", icon)}>
            <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <div>
            <p className="font-serif text-2xl font-semibold text-navy">{title}</p>
            {children && <div className="mt-2 max-w-2xl leading-relaxed text-muted">{children}</div>}
          </div>
        </div>
        {cta && (
          <ButtonLink href={cta.href} className="shrink-0 self-start md:self-center">
            {cta.label}
          </ButtonLink>
        )}
      </div>
    </aside>
  );
}
