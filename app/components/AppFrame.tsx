"use client";

import { usePathname } from "next/navigation";

import AuthGate from "./AuthGate";
import InvoicePriceSync from "./InvoicePriceSync";
import Sidebar from "./Sidebar";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <AuthGate>{children}</AuthGate>;
  }

  return (
    <AuthGate>
      <InvoicePriceSync />
      <div className="app-shell app-shell-root">
        <Sidebar />
        <main className="main-content main-content-root">{children}</main>
      </div>
    </AuthGate>
  );
}
