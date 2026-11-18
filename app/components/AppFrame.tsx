"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import AndroidWidgetSync from "./AndroidWidgetSync";
import AuthGate from "./AuthGate";
import BenditosSpanishPolish from "./BenditosSpanishPolish";
import InvoicePriceSync from "./InvoicePriceSync";
import Sidebar from "./Sidebar";
import { HostTenantLocaleBridge, WorkspaceTenantLocaleBridge } from "./TenantLocaleBridgeV2";
import WorkspaceProvider from "./WorkspaceProvider";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthScreen = pathname === "/login" || pathname === "/reset-password";
  const [marketingRoot, setMarketingRoot] = useState<boolean | null>(null);

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const isPublicHost = host === "kommee.co.uk" || host === "www.kommee.co.uk";
    const launchApp = new URLSearchParams(window.location.search).get("app") === "1";
    const nativeWebView = /; wv\)|\bKommeeAndroid\b/i.test(navigator.userAgent);
    setMarketingRoot(isPublicHost && !launchApp && !nativeWebView);
  }, [pathname]);

  const publicMarketingRoute = ["/welcome", "/pricing", "/demo", "/join"].includes(pathname);
  if (publicMarketingRoute || (pathname === "/" && marketingRoot === true)) {
    return <>{children}</>;
  }
  if (pathname === "/" && marketingRoot === null) {
    return <div className="auth-loading-screen" role="status" aria-live="polite">Opening Kommee…</div>;
  }

  if (isAuthScreen) {
    return (
      <AuthGate>
        <HostTenantLocaleBridge />
        {children}
      </AuthGate>
    );
  }

  return (
    <AuthGate>
      <WorkspaceProvider>
        <WorkspaceTenantLocaleBridge />
        <BenditosSpanishPolish />
        <InvoicePriceSync />
        <AndroidWidgetSync />
        <div className={`app-shell app-shell-root metro-app-shell ${pathname === "/" ? "kommee-mobile-home-shell" : ""}`}>
          <Sidebar />
          <main className="main-content main-content-root">{children}</main>
        </div>
      </WorkspaceProvider>
    </AuthGate>
  );
}
