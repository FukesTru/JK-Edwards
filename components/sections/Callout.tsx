import type { ReactNode } from "react";
import { TriangleAlert, Lightbulb, Info } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const iconsByKind = { warning: TriangleAlert, tip: Lightbulb, info: Info };

/** Highlighted aside with an optional CTA (e.g. "Messy books?", "Payroll penalty warning"). */
export function Callout({
  kind = "info",
  title,
  children,
  cta,
  className,
}: {
  kind?: keyof typeof iconsByKind;
  title: string;
  children: ReactNode;
  cta?: { label: string; href: string };
  className?: string;
}) {
  const Icon = iconsByKind[kind];
  return (
    <aside
      className={cn(
        "relative overflow-hidden rounded-2xl border p-7 sm:p-9",
        kind === "warning" ? "border-accent/30 bg-[color-mix(in_oklab,var(--accent)_6%,white)]" : "border-line bg-paper",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-white">
            <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <div>
            <p className="font-serif text-2xl font-semibold text-ink">{title}</p>
            <div className="mt-2 max-w-2xl leading-relaxed text-charcoal">{children}</div>
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
