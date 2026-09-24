import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline-light" | "outline-dark" | "ghost-light" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-[3px] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  /** Solid gold with navy text (7:1) — the one primary style used everywhere. */
  primary:
    "bg-gold text-navy shadow-[0_12px_26px_-14px_rgba(201,162,75,0.9)] hover:bg-gold-hover hover:shadow-[0_16px_30px_-14px_rgba(176,138,54,0.95)] focus-visible:outline-gold",
  /** Secondary on navy: white outline. */
  "outline-light":
    "border border-white/45 text-white hover:border-white hover:bg-white hover:text-navy focus-visible:outline-white",
  /** Secondary on light surfaces: navy outline. */
  "outline-dark":
    "border border-navy/40 text-navy hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-navy",
  "ghost-light": "text-white/90 hover:text-white",
  white: "bg-white text-navy shadow-sm hover:bg-paper focus-visible:outline-white",
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
 * absolute URLs render a plain anchor. The arrow slides right on hover.
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
      {external && <span className="sr-only"> (opens in a new tab)</span>}
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
