"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  active?: string;
};

const links = [
  ["⌂", "Dashboard", "/"],
  ["✦", "Insights", "/insights"],
  ["+", "Orders", "/orders"],
  ["▤", "Invoices", "/invoices"],
  ["◯", "Suppliers", "/suppliers"],
  ["▣", "Ingredients", "/ingredients"],
  ["◇", "Recipes", "/recipes"],
  ["☰", "Menu", "/menu"],
  ["□", "Stock", "/stock"],
  ["↗", "Reports", "/reports"],
  ["⚙", "Settings", "/settings"],
] as const;

export default function Sidebar({ active }: SidebarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  function isActive(name: string, url: string) {
    if (active) {
      return active.toLowerCase() === name.toLowerCase();
    }

    if (url === "/") {
      return pathname === "/";
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  }

  useEffect(() => {
    const nav = navRef.current;

    if (!nav || !window.matchMedia("(max-width: 640px)").matches) {
      return;
    }

    const activeLink = nav.querySelector<HTMLElement>(".nav-link-active");

    if (!activeLink) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const left =
        activeLink.offsetLeft -
        (nav.clientWidth - activeLink.clientWidth) / 2;

      nav.scrollTo({
        left: Math.max(0, left),
        behavior: "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, active]);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">KI</div>

        <div className="sidebar-brand-copy">
          <div className="brand-name">Kitchen Insights</div>
          <div className="brand-subtitle">Cost control & operations</div>
        </div>
      </div>

      <nav ref={navRef} className="sidebar-nav" aria-label="Main navigation">
        {links.map(([icon, name, url]) => (
          <Link
            key={name}
            href={url}
            className={`nav-link ${
              isActive(name, url) ? "nav-link-active" : ""
            }`}
          >
            <span className="nav-icon" aria-hidden="true">
              {icon}
            </span>
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="restaurant-card">
          <div className="restaurant-avatar">AL</div>

          <div>
            <div className="restaurant-name">Azteca London</div>
            <div className="restaurant-location">Kitchen workspace</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
