import type { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: ReactNode;
};

export type NavMenu = {
  kind: "menu";
  id: string;
  label: string;
  variant: "mega" | "list";
  groups: { title?: string; items: NavItem[] }[];
  footer?: { label: string; href: string; note?: string };
};

export type NavEntry = { kind: "link"; label: string; href: string } | NavMenu;
