import Link from "next/link";
import { Fragment } from "react";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders text containing [label](href) links. External links open in a new tab. */
export function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const className =
    linkClassName ??
    "font-medium text-accent-strong underline decoration-accent/40 underline-offset-[3px] hover:text-accent hover:decoration-accent";

  LINK.lastIndex = 0;
  while ((match = LINK.exec(text))) {
    const [full, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    const external = /^https?:\/\//.test(href);
    parts.push(
      external ? (
        <a key={match.index} href={href} className={className} target="_blank" rel="noopener noreferrer">
          {label}
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
