"use client";

import { usePathname } from "next/navigation";

import AuthGate from "./AuthGate";
import InvoicePriceSync from "./InvoicePriceSync";
import Sidebar from "./Sidebar";
import { HostTenantLocaleBridge, WorkspaceTenantLocaleBridge } from "./TenantLocaleBridge";
import WorkspaceProvider from "./WorkspaceProvider";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthScreen = pathname === "/login" || pathname === "/reset-password";

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
        <InvoicePriceSync />
        <div className="app-shell app-shell-root">
          <Sidebar />
          <main className="main-content main-content-root">{children}</main>
        </div>
      </WorkspaceProvider>
    </AuthGate>
  );
}
