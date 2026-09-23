import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Marks copy the client still needs to confirm. While
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS is not "false", it renders with a dashed amber
 * outline and a tooltip so reviewers can spot it; otherwise it renders plainly.
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
  if (!site.showPlaceholders) return <Tag className={className}>{children}</Tag>;
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
