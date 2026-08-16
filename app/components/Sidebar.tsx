"use client";

import Link from "next/link";

export type SidebarPage =
  | "dashboard"
  | "insights"
  | "orders"
  | "invoices"
  | "suppliers"
  | "ingredients"
  | "recipes"
  | "menu"
  | "stock"
  | "reports";

type SidebarProps = {
  active: SidebarPage;
};

const navItems: {
  key: SidebarPage;
  label: string;
  href: string;
  icon: string;
}[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: "⌂",
  },
  {
    key: "insights",
    label: "Insights",
    href: "/insights",
    icon: "✦",
  },
  {
    key: "orders",
    label: "Orders",
    href: "/orders",
    icon: "+",
  },
  {
    key: "invoices",
    label: "Invoices",
    href: "/invoices",
    icon: "▤",
  },
  {
    key: "suppliers",
    label: "Suppliers",
    href: "/suppliers",
    icon: "◎",
  },
  {
    key: "ingredients",
    label: "Ingredients",
    href: "/ingredients",
    icon: "◫",
  },
  {
    key: "recipes",
    label: "Recipes",
    href: "/recipes",
    icon: "◇",
  },
  {
    key: "menu",
    label: "Menu",
    href: "/menu",
    icon: "≡",
  },
  {
    key: "stock",
    label: "Stock",
    href: "/stock",
    icon: "□",
  },
  {
    key: "reports",
    label: "Reports",
    href: "/reports",
    icon: "↗",
  },
];

export default function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Link href="/" className="sidebar-brand-link">
          <div className="sidebar-logo">KI</div>

          <div className="sidebar-brand-copy">
            <strong>Kitchen Insights</strong>
            <span>Cost control & operations</span>
          </div>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = item.key === active;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`nav-link ${
                isActive ? "nav-link-active" : ""
              }`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-status">
          <span className="sidebar-status-dot" />

          <div>
            <strong>Azteca London</strong>
            <span>Kitchen workspace</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
