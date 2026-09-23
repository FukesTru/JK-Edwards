import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline-light" | "outline-dark" | "ghost-dark" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-[3px] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  /** Solid accent — the one primary style used everywhere. */
  primary:
    "bg-accent text-white shadow-[0_10px_24px_-12px_rgba(192,77,0,0.75)] hover:bg-accent-hover hover:shadow-[0_14px_28px_-12px_rgba(163,65,0,0.8)] focus-visible:outline-accent",
  /** Secondary on dark backgrounds: white outline. */
  "outline-light":
    "border border-white/45 text-white hover:border-white hover:bg-white hover:text-ink focus-visible:outline-white",
  /** Secondary on light backgrounds: charcoal outline. */
  "outline-dark":
    "border border-charcoal/45 text-ink hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-ink",
  "ghost-dark": "text-white/90 hover:text-white",
  white: "bg-white text-ink shadow-sm hover:bg-paper focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3.5 text-[15px]",
  lg: "px-7 py-4 text-base",
};

type IconKind = "arrow" | "phone" | "external" | "none";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconKind;
  className?: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  ariaLabel?: string;
};

function ButtonIcon({ kind }: { kind: IconKind }) {
  if (kind === "none") return null;
  if (kind === "phone") return <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />;
  if (kind === "external")
    return (
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.75}
      />
    );
  return (
    <ArrowRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      strokeWidth={1.75}
    />
  );
}

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/**
 * Link styled as a button. Internal paths use next/link; tel:, mailto: and
 * absolute URLs render a plain anchor.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  external,
  ariaLabel,
}: ButtonLinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const iconKind: IconKind =
    icon ?? (href.startsWith("tel:") ? "phone" : external ? "external" : variant === "primary" ? "arrow" : "none");
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {iconKind === "phone" && <ButtonIcon kind="phone" />}
      {children}
      {iconKind !== "phone" && <ButtonIcon kind={iconKind} />}
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
