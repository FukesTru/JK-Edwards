import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders text containing [label](href) links. External links open in a new tab. */
export function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  const className =
    linkClassName ??
    "font-medium text-accent-strong underline decoration-accent/40 underline-offset-[3px] hover:text-accent hover:decoration-accent";

  // matchAll iterates over a copy of the regex, so the shared pattern is never mutated.
  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
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
    last = match.index + full.length;
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
