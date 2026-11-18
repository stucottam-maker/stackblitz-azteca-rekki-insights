import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function MarketingIcon({ name, size = 24 }: { name: string; size?: number }) {
  const strokes: Record<string, ReactNode> = {
    cart: <><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 4h3l3 12h11l3-9H6"/></>,
    file: <><path d="M6 2h8l5 5v15H6z"/><path d="M14 2v6h5M9 12h7M9 16h7"/></>,
    stock: <><path d="M3 8l9-5 9 5-9 5-9-5ZM3 8v9l9 5 9-5V8M12 13v9M7 6l10 5"/></>,
    book: <><path d="M12 6c-2.6-1.7-6.1-1.8-9-1v14c2.9-.8 6.4-.7 9 1 2.6-1.7 6.1-1.8 9-1V5c-2.9-.8-6.4-.7-9 1ZM12 6v14M6 9h3M15 9h3"/></>,
    shield: <><path d="M12 2 21 6v6c0 5.4-3.5 8.6-9 10-5.5-1.4-9-4.6-9-10V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
    chart: <><path d="M4 20h16M6 17v-5M12 17V7M18 17V3"/></>,
    team: <><circle cx="9" cy="8" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2H2ZM17 5a4 4 0 0 1 0 7M17 15a6 6 0 0 1 5 6"/></>,
    play: <><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/></>,
    store: <><path d="M3 10 5 3h14l2 7-2 3H5l-2-3ZM5 13v8h14v-8M9 21v-6h6"/></>,
    arrow: <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
    check: <path d="m4 12 5 5L20 6"/>,
    spark: <><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{strokes[name] || strokes.spark}</svg>;
}

export function MarketingShell({
  children,
  active,
}: {
  children: ReactNode;
  active?: "pricing" | "features" | "about";
}) {
  return (
    <div className="km-site">
      <header className="km-header">
        <div className="km-container km-header-inner">
          <Link className="km-logo" href="/" aria-label="Kommee home">
            <Image src="/kommee-icon.svg" alt="" width={38} height={38} unoptimized />
            <span>kommee<span className="km-dot">.</span></span>
          </Link>
          <nav className="km-nav" aria-label="Main navigation">
            <Link className={active === "features" ? "km-current" : ""} href="/#features">Features</Link>
            <Link className={active === "pricing" ? "km-current" : ""} href="/pricing">Pricing</Link>
            <Link href="/#teams">For teams</Link>
            <Link className={active === "about" ? "km-current" : ""} href="/#about">About</Link>
          </nav>
          <div className="km-header-actions">
            <a className="km-header-login" href="/login">Log in</a>
            <Link className="km-btn km-btn-accent km-header-get" href="/join">Get started</Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="km-footer">
        <div className="km-container km-footer-inner">
          <div><strong>kommee<span className="km-dot">.</span></strong><span>Your kitchen’s right hand.</span></div>
          <nav aria-label="Footer navigation">
            <Link href="/pricing">Pricing</Link><Link href="/demo">Explore demo</Link><Link href="/join">Join a kitchen</Link><a href="/login">Log in</a>
          </nav>
          <small>© 2026 Kommee. Built for hospitality.</small>
        </div>
      </footer>
    </div>
  );
}
