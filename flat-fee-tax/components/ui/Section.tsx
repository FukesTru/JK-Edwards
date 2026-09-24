import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type Tone = "dark" | "paper" | "white";

const toneClasses: Record<Tone, string> = {
  dark: "bg-navy text-white bg-ledger",
  paper: "surface-light bg-paper text-ink",
  white: "surface-light bg-white text-ink",
};

/**
 * Standard page section: alternating tone, generous rhythm (py-16 / py-24),
 * 1200px content width and a scroll-triggered fade-up on its contents.
 */
export function Section({
  children,
  tone = "white",
  id,
  className,
  containerClassName,
  labelledBy,
  reveal = true,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  reveal?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 md:py-24", toneClasses[tone], className)}>
      <Container className={containerClassName}>{reveal ? <Reveal>{children}</Reveal> : children}</Container>
    </section>
  );
}
