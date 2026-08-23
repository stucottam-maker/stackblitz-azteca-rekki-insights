"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";
import PwaInstallButton from "./PwaInstallButton";
import { useWorkspace } from "./WorkspaceProvider";

type SidebarProps = { active?: string };

type NavLink = readonly [string, string, string];

const links: readonly NavLink[] = [
  ["⌂", "Dashboard", "/"],
  ["+", "Orders", "/orders"],
  ["▤", "Invoices", "/invoices"],
  ["□", "Stock", "/stock"],
  ["◇", "Recipes", "/recipes"],
  ["☰", "Menu", "/menu"],
  ["◯", "Suppliers", "/suppliers"],
  ["▣", "Ingredients", "/ingredients"],
  ["↗", "Reports", "/reports"],
  ["✦", "Insights", "/insights"],
  ["⚙", "Settings", "/settings"],
] as const;

const mobilePrimaryNames = new Set(["Dashboard", "Orders", "Invoices", "Stock", "Recipes"]);
const mobileMoreNames = ["Suppliers", "Ingredients", "Menu", "Reports", "Insights"] as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Sidebar({ active }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const { activeWorkspace, availableWorkspaces, loading, switching, switchWorkspace } = useWorkspace();

  const workspaceOptions = useMemo(
    () =>
      availableWorkspaces.flatMap((organisation) =>
        organisation.sites.map((site) => ({
          value: `${organisation.organisationId}.${site.id}`,
          organisationId: organisation.organisationId,
          siteId: site.id,
          label: `${organisation.organisationName} · ${site.name}`,
        }))
      ),
    [availableWorkspaces]
  );

  function isActive(name: string, url: string) {
    if (active) return active.toLowerCase() === name.toLowerCase();
    if (url === "/") return pathname === "/";
    return pathname === url || pathname.startsWith(`${url}/`);
  }

  const moreIsActive =
    pathname === "/account" ||
    links.some(([_, name, url]) => !mobilePrimaryNames.has(name) && isActive(name, url));

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

  function handleWorkspaceChange(value: string) {
    const option = workspaceOptions.find((item) => item.value === value);
    if (option) void switchWorkspace(option.organisationId, option.siteId);
  }

  useEffect(() => {
    setMobileMoreOpen(false);
  }, [pathname]);

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

  const selectedValue = activeWorkspace
    ? `${activeWorkspace.organisationId}.${activeWorkspace.siteId}`
    : "";

  const mobileMoreLinks = mobileMoreNames.flatMap((name) => {
    const match = links.find(([, linkName]) => linkName === name);
    return match ? [match] : [];
  });

  return (
    <aside className="sidebar chef-sidebar">
      <div className="brand">
        <div className="brand-mark">KI</div>
        <div className="sidebar-brand-copy">
          <div className="brand-name">Kitchen Insights</div>
          <div className="brand-subtitle">Kitchen control, without the admin</div>
          <div className="mobile-workspace-control">
            {loading ? (
              <span>Loading restaurant…</span>
            ) : workspaceOptions.length ? (
              <select
                value={selectedValue}
                aria-label="Active restaurant or site"
                disabled={switching || workspaceOptions.length === 1}
                onChange={(event) => handleWorkspaceChange(event.target.value)}
              >
                {workspaceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <span>No restaurant selected</span>
            )}
          </div>
        </div>
        <button
          type="button"
          className={`mobile-header-more ${mobileMoreOpen || moreIsActive ? "active" : ""}`}
          aria-expanded={mobileMoreOpen}
          aria-controls="mobile-more-menu"
          aria-label="Open settings, account and more navigation"
          onClick={() => setMobileMoreOpen((open) => !open)}
        >
          <span aria-hidden="true">•••</span>
          <small>More</small>
        </button>
      </div>

      <nav ref={navRef} className="sidebar-nav" aria-label="Main navigation">
        {links.map(([icon, name, url]) => (
          <Link
            key={name}
            href={url}
            className={`nav-link ${
              mobilePrimaryNames.has(name) ? "mobile-primary" : "mobile-secondary"
            } ${isActive(name, url) ? "nav-link-active" : ""}`}
          >
            <span className="nav-icon" aria-hidden="true">
              {icon}
            </span>
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      {mobileMoreOpen && (
        <div className="mobile-more-menu" id="mobile-more-menu">
          <div className="mobile-more-heading">
            <strong>More</strong>
            <span>Settings, account and tools</span>
          </div>
          <Link href="/settings" className={`mobile-more-primary ${pathname === "/settings" ? "active" : ""}`}>
            <span aria-hidden="true">⚙</span>
            <span>Settings</span>
          </Link>
          <Link href="/account" className={`mobile-more-primary ${pathname === "/account" ? "active" : ""}`}>
            <span aria-hidden="true">◎</span>
            <span>Account</span>
          </Link>
          {mobileMoreLinks.map(([icon, name, url]) => (
            <Link key={name} href={url} className={isActive(name, url) ? "active" : ""}>
              <span aria-hidden="true">{icon}</span>
              <span>{name}</span>
            </Link>
          ))}
          <PwaInstallButton className="mobile-more-install" compact />
          <button type="button" className="mobile-more-danger" onClick={() => void logout()} disabled={signingOut}>
            <span aria-hidden="true">↪</span>
            <span>{signingOut ? "Signing out…" : "Log out"}</span>
          </button>
        </div>
      )}

      <div className="sidebar-footer">
        <div className="restaurant-card workspace-switcher-card">
          <div className="restaurant-avatar">
            {activeWorkspace ? initials(activeWorkspace.siteName) : "KI"}
          </div>
          <div className="restaurant-card-copy workspace-switcher-copy">
            {loading ? (
              <div className="restaurant-name">Loading workspace…</div>
            ) : workspaceOptions.length > 1 ? (
              <select
                className="workspace-switcher-select"
                value={selectedValue}
                aria-label="Active restaurant or site"
                disabled={switching}
                onChange={(event) => handleWorkspaceChange(event.target.value)}
              >
                {workspaceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="restaurant-name">
                {activeWorkspace
                  ? `${activeWorkspace.organisationName} · ${activeWorkspace.siteName}`
                  : "No restaurant selected"}
              </div>
            )}
            <div className="restaurant-location">
              {activeWorkspace
                ? [activeWorkspace.siteLocation, activeWorkspace.role].filter(Boolean).join(" · ")
                : "Kitchen workspace"}
            </div>
          </div>
        </div>
        <div className="chef-sidebar-tools">
          <Link href="/account" className="sidebar-small-link">Account</Link>
          <PwaInstallButton className="sidebar-install" compact />
        </div>
        <button type="button" className="sidebar-logout" onClick={() => void logout()} disabled={signingOut}>
          <span aria-hidden="true">↪</span>
          <span>{signingOut ? "Signing out…" : "Log out"}</span>
        </button>
      </div>
    </aside>
  );
}
