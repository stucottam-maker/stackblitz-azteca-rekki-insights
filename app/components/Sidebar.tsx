"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";

type SidebarProps = {
  active?: string;
};

const links = [
  ["⌂", "Dashboard", "/"],
  ["✦", "Insights", "/insights"],
  ["+", "Orders", "/orders"],
  ["▤", "Invoices", "/invoices"],
  ["◯", "Suppliers", "/suppliers"],
  ["≡", "Catalogue", "/suppliers/catalogue"],
  ["▣", "Ingredients", "/ingredients"],
  ["↔", "Matching", "/ingredients/matching"],
  ["◇", "Recipes", "/recipes"],
  ["☰", "Menu", "/menu"],
  ["□", "Stock", "/stock"],
  ["↗", "Reports", "/reports"],
  ["£", "COGS Setup", "/reports/setup"],
  ["⚙", "Settings", "/settings"],
] as const;

export default function Sidebar({ active }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [signingOut, setSigningOut] = useState(false);

  function isActive(name: string, url: string) {
    if (active) return active.toLowerCase() === name.toLowerCase();
    if (url === "/") return pathname === "/";
    if (url === "/suppliers") return pathname === "/suppliers";
    if (url === "/ingredients") return pathname === "/ingredients";
    if (url === "/reports") return pathname === "/reports";
    return pathname === url || pathname.startsWith(`${url}/`);
  }

  async function logout() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
      setSigningOut(false);
    }
  }

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !window.matchMedia("(max-width: 640px)").matches) return;
    const activeLink = nav.querySelector<HTMLElement>(".nav-link-active");
    if (!activeLink) return;

    const frame = window.requestAnimationFrame(() => {
      const left = activeLink.offsetLeft - (nav.clientWidth - activeLink.clientWidth) / 2;
      nav.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
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
            className={`nav-link ${isActive(name, url) ? "nav-link-active" : ""}`}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="restaurant-card">
          <div className="restaurant-avatar">AL</div>
          <div className="restaurant-card-copy">
            <div className="restaurant-name">Azteca London</div>
            <div className="restaurant-location">Kitchen workspace</div>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-logout"
          onClick={logout}
          disabled={signingOut}
        >
          <span aria-hidden="true">↪</span>
          <span>{signingOut ? "Signing out…" : "Log out"}</span>
        </button>
      </div>
    </aside>
  );
}
