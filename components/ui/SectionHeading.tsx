import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-accent-light" : "text-accent-strong",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}

/** Eyebrow + H2 (or H3) + optional intro paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  as: Heading = "h2",
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  as?: "h2" | "h3";
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={tone} className={cn("mb-4", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <Heading
        id={id}
        className={cn(
          "font-serif text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-[2.4rem] lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {intro && (
        <div
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-mist" : "text-charcoal",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
