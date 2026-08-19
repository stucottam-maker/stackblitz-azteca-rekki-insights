import "./globals.css";
import "./ui-fixes.css";
import "./mobile-nav-fix.css";
import "./mobile-page-fixes.css";
import "./final-polish.css";
import "./orders-polish.css";
import "./login-polish.css";
import "./reports-polish.css";
import "./ap-polish.css";
import "./pwa-polish.css";
import "./invoice-mobile-fix.css";

import Script from "next/script";
import AppFrame from "./components/AppFrame";

export const metadata = {
  title: "Kitchen Insights",
  description: "Cost control & operations",
  applicationName: "Kitchen Insights",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kitchen Insights",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#214f3d" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <AppFrame>{children}</AppFrame>
        <Script src="/native-camera-bridge.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
