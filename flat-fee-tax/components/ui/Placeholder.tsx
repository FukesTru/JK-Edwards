import type { ReactNode } from "react";
import { CLIENT_TO_CONFIRM, isPlaceholder, showPlaceholders } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Marks copy the owner still needs to confirm. While
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS is not "false" it gets a dashed amber outline
 * and a tooltip so reviewers can spot it; otherwise it renders plainly.
 */
export function Placeholder({
  children,
  note = "Placeholder — client to confirm",
  className,
  block,
}: {
  children: ReactNode;
  note?: string;
  className?: string;
  block?: boolean;
}) {
  const Tag = block ? "div" : "span";
  if (!showPlaceholders) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      title={note}
      data-placeholder=""
      className={cn(
        "rounded-[3px] outline-1 outline-offset-2 outline-amber-500/80 outline-dashed",
        block && "block",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * A fact from `site.confirm` in site.config.ts: shows the confirmed answer, or
 * "[CLIENT TO CONFIRM]" (outlined) while the value is still null.
 */
export function Confirm({ value, note }: { value: string | null; note: string }) {
  if (value) return <>{value}</>;
  return <Placeholder note={note}>{CLIENT_TO_CONFIRM}</Placeholder>;
}

/**
 * A {{PLACEHOLDER}} value from site.config.ts. Real values render as-is;
 * placeholders keep their braces (as specified) and get the review outline.
 */
export function ConfigValue({ value, note = "Set in site.config.ts" }: { value: string; note?: string }) {
  if (!isPlaceholder(value)) return <>{value}</>;
  return <Placeholder note={note}>{value}</Placeholder>;
}
