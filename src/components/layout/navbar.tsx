"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { mainNav, primaryCta, servicesNav } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu on navigation (derived-state pattern).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Background lives on its own layer: backdrop-filter on the header
          itself would trap the fixed mobile menu inside it. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 border-b transition-[background-color,border-color] duration-300",
          scrolled || mobileOpen
            ? "border-line bg-canvas/85 backdrop-blur-md"
            : "border-transparent bg-canvas",
        )}
      />
      <div className="container-site relative flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <ServicesDropdown
                    active={item.children.some((c) => isActive(pathname, c.href))}
                    pathname={pathname}
                  />
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink href={item.href} active={isActive(pathname, item.href)}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={primaryCta.href} arrow aria-current={isActive(pathname, primaryCta.href) ? "page" : undefined}>
            {primaryCta.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full transition-colors hover:bg-accent-soft md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] transition-colors",
        active ? "text-ink" : "text-ink-soft hover:text-ink",
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-4 bottom-1.5 h-px origin-left bg-accent transition-transform duration-300 ease-out-soft",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

function ServicesDropdown({ active, pathname }: { active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const focusFirstOnOpen = useRef(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    if (focusFirstOnOpen.current) {
      focusFirstOnOpen.current = false;
      wrapperRef.current?.querySelector<HTMLAnchorElement>("[data-menu-item]")?.focus();
    }
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const focusItem = (index: number) => {
    const items = wrapperRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]");
    if (!items?.length) return;
    items[(index + items.length) % items.length]?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(() => setOpen(false), 150);
      }}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            focusFirstOnOpen.current = true;
            if (open) focusItem(0);
            else setOpen(true);
          }
        }}
        className={cn(
          "relative inline-flex h-10 items-center gap-1 rounded-full px-4 text-[0.9375rem] transition-colors",
          active || open ? "text-ink" : "text-ink-soft hover:text-ink",
        )}
      >
        Services
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-4 bottom-1.5 h-px origin-left bg-accent transition-transform duration-300 ease-out-soft",
            active ? "scale-x-100" : "scale-x-0",
          )}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
        onKeyDown={(e) => {
          const items = Array.from(
            wrapperRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]") ?? [],
          );
          const idx = items.indexOf(document.activeElement as HTMLAnchorElement);
          if (e.key === "ArrowDown") {
            e.preventDefault();
            focusItem(idx + 1);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            focusItem(idx - 1);
          }
        }}
      >
        <ul className="overflow-hidden rounded-lg border border-line bg-surface p-2 shadow-lift">
          {servicesNav.map((link, i) => {
            const current = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  data-menu-item
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "group flex items-start gap-4 rounded-md p-4 transition-colors hover:bg-canvas focus-visible:bg-canvas",
                    current && "bg-canvas",
                  )}
                >
                  <span className="mt-0.5 font-mono text-xs text-ink-soft">0{i + 1}</span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between font-medium text-ink">
                      {link.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{link.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const links = [
    ...servicesNav.map((l) => ({ ...l, group: "Services" })),
    ...mainNav.filter((i) => !i.children).map((l) => ({ ...l, group: "Studio" })),
  ];

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-canvas md:hidden"
    >
      <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pb-10 pt-6">
        {(["Services", "Studio"] as const).map((group) => (
          <div key={group} className="mb-8">
            <p className="mb-3 font-mono text-eyebrow uppercase text-ink-soft">{group}</p>
            <ul className="border-t border-line">
              {links
                .filter((l) => l.group === group)
                .map((link) => {
                  const current = isActive(pathname, link.href);
                  return (
                    <li key={link.href} className="border-b border-line">
                      <Link
                        href={link.href}
                        aria-current={current ? "page" : undefined}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-4 text-2xl font-medium tracking-[-0.02em]",
                          current ? "text-accent" : "text-ink",
                        )}
                      >
                        {link.label}
                        <ArrowRight aria-hidden="true" className="size-5 text-ink-soft" />
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
        <div className="mt-auto space-y-6">
          <ButtonLink href={primaryCta.href} size="lg" arrow className="w-full" onClick={onClose}>
            {primaryCta.label}
          </ButtonLink>
          <p className="text-center text-sm text-ink-soft">
            Or email{" "}
            <a className="text-ink underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
}
