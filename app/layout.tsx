import "./globals.css";
import "./ui-system.css";

import type { Metadata } from "next";
import Script from "next/script";
import AppFrame from "./components/AppFrame";

export const metadata: Metadata = {
  title: "Kommee",
  description: "Your kitchen’s right hand. Less admin. More cooking.",
  applicationName: "Kommee",
  manifest: "/manifest.webmanifest",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#315C46",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kommee",
  },
  icons: {
    icon: [{ url: "/kommee-icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }],
    shortcut: "/kommee-icon.svg",
    apple: "/kommee-icon.svg",
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
