import Link from "next/link";
import { ArrowRight, Briefcase, ChartLine, FileText, House, ListChecks, Users, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckList } from "@/components/ui/CheckList";
import { includedForms } from "@/content/forms";
import { cn } from "@/lib/utils";

const formIcons: Record<string, LucideIcon> = {
  "Form 1040": FileText,
  "Schedule A": ListChecks,
  "Schedule C": Briefcase,
  "Schedule E": House,
  "1099-B": ChartLine,
  "Schedule K-1": Users,
};

/**
 * The six forms covered by the flat tax-preparation fee.
 * `grid`: one card per form, each linking to its sub-page. `mini`: compact checklist.
 */
export function FormsIncluded({
  variant = "grid",
  tone = "light",
  className,
}: {
  variant?: "grid" | "mini";
  tone?: "light" | "dark";
  className?: string;
}) {
  if (variant === "mini") {
    return (
      <CheckList
        tone={tone}
        columns={2}
        className={className}
        items={includedForms.map((f) => (
          <>
            <strong className="font-semibold">{f.form}</strong> — {f.description}
          </>
        ))}
      />
    );
  }

  return (
    <Stagger as="ul" className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {includedForms.map((item) => {
        const Icon = formIcons[item.form] ?? FileText;
        return (
          <StaggerItem as="li" key={item.form}>
            <Link
              href={item.href}
              className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_28px_50px_-30px_rgba(15,30,51,0.45)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold">
                <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span className="mt-5 font-serif text-xl font-semibold text-navy">{item.form}</span>
              <span className="mt-2 flex-1 leading-relaxed text-muted">{item.description}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                Included
                <span className="text-muted">·</span>
                <span className="inline-flex items-center gap-1 text-gold-deep">
                  Learn more
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
