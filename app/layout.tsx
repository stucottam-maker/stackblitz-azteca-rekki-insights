import "./globals.css";
import "./ui-system.css";

import type { Metadata } from "next";
import Script from "next/script";
import AppFrame from "./components/AppFrame";

export const metadata: Metadata = {
  title: "Kitchen Insights",
  description: "Cost control & operations",
  applicationName: "Kitchen Insights",
  manifest: "/manifest.webmanifest",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#172554",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kitchen Insights",
  },
  icons: {
    icon: "/pwa-icon.svg",
    shortcut: "/pwa-icon.svg",
    apple: "/pwa-icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppFrame>{children}</AppFrame>
        <Script src="/native-camera-bridge.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
