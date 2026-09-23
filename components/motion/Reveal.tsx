"use client";

import type { ReactNode } from "react";
import { m, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const viewport = { once: true, margin: "0px 0px -80px 0px" } as const;

type Tag = "div" | "section" | "ul" | "ol" | "li" | "article" | "header";

/** Scroll-triggered fade-up (0.6s, 24px) — plays once per element. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}) {
  const Component = m[as];
  return (
    <Component
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

const staggerParent = (stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
});

/** Parent for staggered card entrances. Children should be <StaggerItem>. */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
}) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerParent(stagger)}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Component = m[as];
  return (
    <Component data-reveal="" className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
