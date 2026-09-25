import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Placeholder } from "@/components/ui/Placeholder";

// Markdown-style links, or an unconfirmed "[CLIENT TO CONFIRM …]" marker.
const LINK = /\[([^\]]+)\]\(([^)]+)\)|\[CLIENT TO CONFIRM[^\]]*\]/g;

/** Renders text containing [label](href) links. External links open in a new tab. */
export function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  const className =
    linkClassName ??
    "font-medium text-navy underline decoration-gold decoration-2 underline-offset-[3px] hover:text-gold-deep";

  // matchAll iterates over a copy of the regex, so the shared pattern is never mutated.
  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    last = match.index + full.length;
    if (!href) {
      parts.push(
        <Placeholder key={match.index} note="Client to confirm (see site.config.ts)">
          {full}
        </Placeholder>,
      );
      continue;
    }
    const external = /^https?:\/\//.test(href);
    parts.push(
      external ? (
        <a key={match.index} href={href} className={className} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <Link key={match.index} href={href} className={className}>
          {label}
        </Link>
      ),
    );
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
