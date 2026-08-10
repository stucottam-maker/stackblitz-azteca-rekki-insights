"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";

type SidebarProps = {
  active?: string;
};

const navItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: "⌂",
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
    label: "Stock counts",
    href: "/stock",
    icon: "□",
  },
];

export default function Sidebar({
  active,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="sidebar-brand-mark">
          K
        </div>

        <div className="sidebar-brand-copy">
          <strong>
            Kitchen Insights
          </strong>

          <span>
            Cost & purchasing control
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`sidebar-link ${
              active === item.key
                ? "active"
                : ""
            }`}
          >
            <span className="sidebar-link-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <LogoutButton />

        <div className="sidebar-site">
          <div className="sidebar-site-avatar">
            AZ
          </div>

          <div className="sidebar-site-copy">
            <strong>
              Azteca
            </strong>

            <span>
              Battersea, London
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
