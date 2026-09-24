"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import type { NavEntry, NavMenu } from "@/components/layout/nav-types";
import { cn } from "@/lib/utils";

type Props = {
  nav: NavEntry[];
  /** `href` falls back to /get-started until a real phone number is set. */
  phone: { display: string; href: string };
  startCta: { label: string; href: string };
};

const HOVER_CLOSE_DELAY = 140;

export function SiteHeader({ nav, phone, startCta }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);

  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close every menu after navigating (adjusting state during render).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Transparent over the hero → solid navy with a shadow once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Desktop menus: close on outside click and Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const trigger = document.getElementById(`nav-trigger-${openMenu}`);
        setOpenMenu(null);
        trigger?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  // Mobile menu: lock page scroll, focus the close button, trap focus, Escape to close.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const hamburger = hamburgerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      hamburger?.focus();
    };
  }, [mobileOpen]);

  const openWithHover = useCallback((id: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu((current) => {
      if (current !== id) hoverOpenedAt.current = Date.now();
      return id;
    });
  }, []);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), HOVER_CLOSE_DELAY);
  }, []);

  const toggleMenu = useCallback((id: string) => {
    // A click right after a hover-open should keep the menu open.
    if (Date.now() - hoverOpenedAt.current < 400) return;
    setOpenMenu((current) => (current === id ? null : id));
  }, []);

  const solid = scrolled || openMenu !== null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          solid
            ? "border-b border-white/5 bg-navy/95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
          <Logo tone="dark" />

          {/* Desktop navigation */}
          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((entry) =>
                entry.kind === "link" ? (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      aria-current={pathname === entry.href ? "page" : undefined}
                      className={cn(
                        "inline-flex rounded-md px-2.5 py-2 text-[15px] font-medium text-white/85 transition-colors hover:text-white 2xl:px-3",
                        pathname === entry.href &&
                          "text-white underline decoration-gold decoration-2 underline-offset-8",
                      )}
                    >
                      {entry.label}
                    </Link>
                  </li>
                ) : (
                  <DesktopMenu
                    key={entry.id}
                    menu={entry}
                    open={openMenu === entry.id}
                    active={entry.groups.some((g) => g.items.some((i) => pathname.startsWith(i.href)))}
                    onHoverOpen={() => openWithHover(entry.id)}
                    onHoverClose={scheduleClose}
                    onToggle={() => toggleMenu(entry.id)}
                    onOpen={() => setOpenMenu(entry.id)}
                    onClose={() => setOpenMenu(null)}
                  />
                ),
              )}
            </ul>
          </nav>

          {/* Desktop utilities */}
          <div className="hidden items-center gap-4 xl:flex">
            <a
              href={phone.href}
              aria-label={`Call ${phone.display}`}
              className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-white transition-colors hover:text-gold"
            >
              <Phone aria-hidden className="h-4 w-4 text-gold" strokeWidth={1.75} />
              <span className="hidden tabular-nums min-[1400px]:inline">{phone.display}</span>
            </a>
            <Link href={startCta.href} className={cn(buttonClasses("primary", "sm"), "px-4 py-2.5")}>
              {startCta.label}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 xl:hidden">
            <a
              href={phone.href}
              aria-label={`Call ${phone.display}`}
              className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10"
            >
              <Phone aria-hidden className="h-5 w-5" strokeWidth={1.75} />
            </a>
            <button
              ref={hamburgerRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10"
            >
              <Menu aria-hidden className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu (sibling of <header> so backdrop-filter can't trap position:fixed) */}
      <div
        id="mobile-menu"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!mobileOpen}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-navy text-white transition-[transform,visibility] duration-300 ease-out xl:hidden",
          mobileOpen ? "visible translate-x-0" : "invisible translate-x-full",
        )}
      >
        <div className="flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-6">
          <div onClickCapture={() => setMobileOpen(false)}>
            <Logo tone="dark" />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10"
          >
            <X aria-hidden className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          <ul className="divide-y divide-white/10">
            {nav.map((entry) =>
              entry.kind === "link" ? (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 font-serif text-2xl font-semibold"
                  >
                    {entry.label}
                  </Link>
                </li>
              ) : (
                <li key={entry.id}>
                  <button
                    type="button"
                    aria-expanded={mobileSection === entry.id}
                    aria-controls={`mobile-section-${entry.id}`}
                    onClick={() => setMobileSection((s) => (s === entry.id ? null : entry.id))}
                    className="flex w-full items-center justify-between py-4 text-left font-serif text-2xl font-semibold"
                  >
                    {entry.label}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-5 w-5 text-gold transition-transform duration-300",
                        mobileSection === entry.id && "rotate-180",
                      )}
                    />
                  </button>
                  <div id={`mobile-section-${entry.id}`} hidden={mobileSection !== entry.id} className="pb-4">
                    {entry.groups.map((group, index) => (
                      <div key={group.title ?? index} className="mb-3 last:mb-0">
                        {group.title && (
                          <p className="px-1 pb-1 text-xs font-semibold tracking-[0.16em] text-mist uppercase">
                            {group.title}
                          </p>
                        )}
                        <ul>
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-1 py-2.5 text-[1.02rem] text-white/90 hover:text-white"
                              >
                                <span className="text-gold">{item.icon}</span>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {entry.footer && (
                      <Link
                        href={entry.footer.href}
                        onClick={() => setMobileOpen(false)}
                        className="mt-1 inline-flex items-center gap-2 px-1 text-sm font-semibold text-gold"
                      >
                        {entry.footer.label}
                        <ArrowRight aria-hidden className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="grid shrink-0 grid-cols-[0.8fr_1.2fr] gap-3 border-t border-white/10 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
          <a
            href={phone.href}
            onClick={() => setMobileOpen(false)}
            className={buttonClasses("outline-light", "md", "px-3")}
          >
            <Phone aria-hidden className="h-4 w-4" />
            Call
          </a>
          <Link
            href={startCta.href}
            onClick={() => setMobileOpen(false)}
            className={buttonClasses("primary", "md", "px-3 whitespace-nowrap")}
          >
            Start My Return
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </>
  );
}

function DesktopMenu({
  menu,
  open,
  active,
  onHoverOpen,
  onHoverClose,
  onToggle,
  onOpen,
  onClose,
}: {
  menu: NavMenu;
  open: boolean;
  active: boolean;
  onHoverOpen: () => void;
  onHoverClose: () => void;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
}) {
  const panelId = `nav-panel-${menu.id}`;
  const panelRef = useRef<HTMLDivElement>(null);

  const focusFirstLink = () => {
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
  };

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onOpen();
      focusFirstLink();
    }
  };

  const onPanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? (index + 1) % links.length : (index - 1 + links.length) % links.length;
    links[next]?.focus();
  };

  return (
    <li
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && onHoverOpen()}
      onPointerLeave={(event) => event.pointerType === "mouse" && onHoverClose()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        id={`nav-trigger-${menu.id}`}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[15px] font-medium transition-colors hover:text-white 2xl:px-3",
          open || active ? "text-white" : "text-white/85",
        )}
      >
        {menu.label}
        <ChevronDown
          aria-hidden
          className={cn("h-4 w-4 text-gold transition-transform duration-200", open && "rotate-180")}
          strokeWidth={1.75}
        />
      </button>

      <div
        id={panelId}
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
        className={cn(
          "absolute top-full pt-3 transition-[opacity,transform,visibility] duration-200",
          menu.variant === "mega" ? "left-1/2 -translate-x-1/2" : "left-0",
          open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0",
        )}
      >
        <div
          className={cn(
            "surface-light overflow-hidden rounded-2xl bg-white text-ink shadow-[0_24px_60px_-20px_rgba(15,30,51,0.5)] ring-1 ring-black/5",
            menu.variant === "mega" ? "w-[720px]" : "w-[360px]",
          )}
        >
          <div className={cn("grid gap-1 p-3", menu.variant === "mega" && "grid-cols-2 gap-4 p-4")}>
            {menu.groups.map((group, index) => (
              <div key={group.title ?? index}>
                {group.title && (
                  <p className="px-3 pt-1 pb-2 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                    {group.title}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-paper focus-visible:bg-paper"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy/5 text-navy transition-colors group-hover/item:bg-navy group-hover/item:text-gold">
                          {item.icon}
                        </span>
                        <span>
                          <span className="block text-[15px] font-semibold text-navy">{item.label}</span>
                          {item.description && (
                            <span className="mt-0.5 block text-[13px] leading-snug text-muted">{item.description}</span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {menu.footer && (
            <div className="flex items-center justify-between gap-4 border-t border-line bg-paper px-6 py-4">
              {menu.footer.note && <p className="text-[13px] leading-snug text-muted">{menu.footer.note}</p>}
              <Link
                href={menu.footer.href}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold-deep"
              >
                {menu.footer.label}
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
