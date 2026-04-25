"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Search, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Articles",
    children: [
      { href: "/category/islamic-finance", label: "Islamic Finance" },
      { href: "/category/economics", label: "Economics" },
      { href: "/category/finance", label: "Finance" },
      { href: "/category/crypto", label: "Crypto" },
      { href: "/category/unfiltered", label: "Unfiltered" },
    ],
  },
  {
    href: "/tools/mizan",
    label: "Tools",
    children: [
      { href: "/tools/mizan", label: "Mizan" },
    ],
  },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 md:px-10"
        style={{
          background: "color-mix(in oklab, var(--bg) 85%, transparent)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-transparent cursor-pointer"
            style={{
              background: "transparent",
              color: "var(--fg2)",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex flex-col">
            <Link
              href="/"
              className="no-underline"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "18px",
                letterSpacing: "-0.02em",
                color: "var(--fg1)",
                textDecoration: "none",
                fontVariationSettings: "'opsz' 72",
              }}
            >
              M Azim Abdul Majeed
              <span style={{ color: "var(--brand)" }}>.</span>
            </Link>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontStyle: "italic",
                color: "var(--fg3)",
                letterSpacing: "0.01em",
                marginTop: "-2px",
              }}
            >
              Be selfish to do good.
            </span>
          </div>
        </div>

        <nav className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="flex gap-1">
          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-transparent cursor-pointer transition-colors duration-120"
            style={{
              background: "transparent",
              color: "var(--fg2)",
            }}
            aria-label="Search"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-muted)";
              e.currentTarget.style.color = "var(--fg1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--fg2)";
            }}
          >
            <Search size={16} />
          </button>
          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-transparent cursor-pointer transition-colors duration-120"
            style={{
              background: "transparent",
              color: "var(--fg2)",
            }}
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-muted)";
              e.currentTarget.style.color = "var(--fg1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--fg2)";
            }}
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )
            ) : (
              <Moon size={16} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <nav
          className="md:hidden fixed top-[53px] left-0 right-0 z-10 flex flex-col py-2 px-3"
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openDropdown === item.label;

            return (
              <div key={item.label}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className="no-underline flex-1"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: isActive ? "var(--fg1)" : "var(--fg3)",
                      textDecoration: "none",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      background: isActive ? "var(--bg-muted)" : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : item.label)
                      }
                      className="inline-flex items-center justify-center w-9 h-9 rounded-md cursor-pointer"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--fg3)",
                      }}
                      aria-label={`Expand ${item.label}`}
                    >
                      <ChevronDown
                        size={14}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform 150ms",
                        }}
                      />
                    </button>
                  )}
                </div>
                {hasChildren && isOpen && (
                  <div className="flex flex-col pl-4 pb-1">
                    {item.children!.map((child) => {
                      const childActive = pathname.startsWith(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="no-underline"
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: childActive ? "var(--fg1)" : "var(--fg4)",
                            textDecoration: "none",
                            padding: "8px 12px",
                            borderRadius: "var(--radius-md)",
                            background: childActive
                              ? "var(--bg-muted)"
                              : "transparent",
                          }}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </>
  );
}

/* Desktop nav item with hover dropdown */
function DesktopNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasChildren = item.children && item.children.length > 0;

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  // Also highlight if any child is active
  const childActive =
    hasChildren &&
    item.children!.some((c) => pathname.startsWith(c.href));

  const active = isActive || childActive;

  function handleEnter() {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  }

  function handleLeave() {
    timeout.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className="no-underline"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 500,
          color: active ? "var(--fg1)" : "var(--fg3)",
          textDecoration: "none",
          padding: "6px 12px",
          borderRadius: "var(--radius-md)",
          background: active ? "var(--bg-muted)" : "transparent",
          transition: "color 120ms, background 120ms",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.color = "var(--fg1)";
            e.currentTarget.style.background = "var(--bg-muted)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.color = "var(--fg3)";
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className="no-underline inline-flex items-center gap-1"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 500,
          color: active || open ? "var(--fg1)" : "var(--fg3)",
          textDecoration: "none",
          padding: "6px 12px",
          borderRadius: "var(--radius-md)",
          background: active || open ? "var(--bg-muted)" : "transparent",
          transition: "color 120ms, background 120ms",
        }}
      >
        {item.label}
        <ChevronDown
          size={12}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 150ms",
            opacity: 0.5,
          }}
        />
      </Link>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 py-1.5 min-w-[180px] rounded-lg"
          style={{
            background: "var(--bg-elev)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {item.children!.map((child) => {
            const cActive = pathname.startsWith(child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                className="no-underline block"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: cActive ? "var(--fg1)" : "var(--fg3)",
                  textDecoration: "none",
                  padding: "7px 14px",
                  background: cActive ? "var(--bg-muted)" : "transparent",
                  transition: "color 100ms, background 100ms",
                }}
                onMouseEnter={(e) => {
                  if (!cActive) {
                    e.currentTarget.style.color = "var(--fg1)";
                    e.currentTarget.style.background = "var(--bg-muted)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!cActive) {
                    e.currentTarget.style.color = "var(--fg3)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
