"use client";

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

  function isActive(name: string, url: string) {
    if (active) {
      return active.toLowerCase() === name.toLowerCase();
    }

    if (url === "/") {
      return pathname === "/";
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">KI</div>

        <div className="sidebar-brand-copy">
          <div className="brand-name">Kitchen Insights</div>
          <div className="brand-subtitle">Cost control & operations</div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
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
