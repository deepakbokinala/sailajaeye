"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  type MegaMenuItem,
  type MegaMenuGroup,
  SURGERY_GROUPS,
  SPECIALITY_GROUPS,
  SURGERY_LINKS,
  SPECIALITY_LINKS,
} from "@/lib/nav";
import { Logo } from "./logo";
import { TopBar } from "./top-bar";

interface NavItem {
  label: string;
  href: string;
  megaMenuGroups?: MegaMenuGroup[];
}

const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Surgeries", href: "/surgeries", megaMenuGroups: SURGERY_GROUPS },
  {
    label: "Specialities",
    href: "/specialities",
    megaMenuGroups: SPECIALITY_GROUPS,
  },
  { label: "Investigation Reports", href: "/reports" },
];

interface SidebarItem {
  label: string;
  href: string;
  children?: MegaMenuItem[];
}

const SIDEBAR_NAV: SidebarItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership Team", href: "/leadership" },
  { label: "Surgeries", href: "/surgeries", children: SURGERY_LINKS },
  {
    label: "Specialities",
    href: "/specialities",
    children: SPECIALITY_LINKS,
  },
  { label: "Health Packages", href: "/health-packages" },
  { label: "Book Appointment", href: "https://kivihealth.com/iam/sai.laja.15614/bookslot" },
  { label: "Investigation Reports", href: "/reports" },
  { label: "Blog", href: "/blog" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeSidebar = () => {
    setOpen(false);
    setExpandedItem(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        <TopBar />
        <div className="relative border-b border-border bg-surface/90 backdrop-blur-md">
          <Container size="full" padding="lg">
            <div className="flex h-16 items-center justify-between lg:h-20">
              <Logo />

              <nav className="hidden lg:block">
                <ul className="flex items-center gap-1">
                  {NAV.map((item) => {
                    const hasMega = Boolean(item.megaMenuGroups);
                    return (
                      <li
                        key={item.label}
                        className={cn(hasMega && "group/menu")}
                      >
                        {hasMega ? (
                          <button
                            type="button"
                            className="inline-flex cursor-pointer items-center gap-1 p-3 text-base font-medium text-foreground/80 transition-colors hover:text-brand"
                          >
                            {item.label}
                            <ChevronDown
                              className="size-3.5 transition-transform duration-200 group-hover/menu:rotate-180"
                            />
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-1 p-3 text-base font-medium text-foreground/80 transition-colors hover:text-brand"
                          >
                            {item.label}
                          </Link>
                        )}
                        {item.megaMenuGroups ? (
                          <MegaMenuPanel groups={item.megaMenuGroups} />
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="hidden h-9 items-center gap-3 rounded-pill border border-brand pl-4 text-sm font-medium text-foreground transition-colors hover:bg-brand/5 md:inline-flex"
                >
                  <span>Select Language</span>
                  <span className="flex h-full items-center border-l border-brand pl-2 pr-3 text-brand">
                    <ChevronDown className="size-4" strokeWidth={2.25} />
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={open}
                  aria-controls="primary-sidebar"
                  onClick={() => setOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-muted"
                >
                  <Menu className="size-5" strokeWidth={2.25} />
                </button>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={closeSidebar}
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        />

        <aside
          id="primary-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-soft-lg transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5 lg:h-20 lg:px-8">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeSidebar}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-muted"
            >
              <X className="size-5" strokeWidth={2.25} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4 lg:px-8 lg:py-6">
            <ul className="flex flex-col">
              {SIDEBAR_NAV.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expandedItem === item.label;

                if (hasChildren) {
                  return (
                    <li key={item.href} className="flex flex-col">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedItem((cur) =>
                            cur === item.label ? null : item.label
                          )
                        }
                        className="flex items-center justify-between py-4 text-left text-lg font-medium text-foreground transition-colors hover:text-brand"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-5 text-foreground/50 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-out",
                          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        )}
                      >
                        <div className="overflow-hidden">
                          <ul className="flex flex-col border-l border-border pb-2 pl-4">
                            {item.children!.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={closeSidebar}
                                  className="block py-2 text-base text-foreground/80 transition-colors hover:text-brand"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeSidebar}
                      className="flex items-center justify-between py-4 text-lg font-medium text-foreground transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

function MegaMenuPanel({ groups }: { groups: MegaMenuGroup[] }) {
  return (
    <div
      className={cn(
        "invisible absolute inset-x-0 top-full z-30 -translate-y-1 opacity-0 transition-all duration-200 ease-out",
        "group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100",
        "group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100"
      )}
    >
      <div className="border-t border-border bg-surface shadow-soft-lg">
        <Container size="full" padding="lg">
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 py-10 md:grid-cols-3 lg:grid-cols-5 lg:py-12">
            {groups.map((group) => (
              <div key={group.category} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[15px] font-medium text-foreground transition-colors hover:text-brand"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
