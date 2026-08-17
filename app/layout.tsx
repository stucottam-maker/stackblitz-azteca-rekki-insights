import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "./order-ui.css";

import PWARegister from "./components/PWARegister";
import WorkspaceStateSync from "./components/WorkspaceStateSync";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kitchen Insights",
    template: "%s | Kitchen Insights",
  },

  description:
    "Kitchen cost control, purchasing, stock, recipes and reporting.",

  applicationName: "Kitchen Insights",

  icons: {
    icon: "/icon",
  },

  openGraph: {
    title: "Kitchen Insights",
    description:
      "Kitchen cost control, purchasing, stock, recipes and reporting.",
    type: "website",
    siteName: "Kitchen Insights",
  },

  twitter: {
    card: "summary",
    title: "Kitchen Insights",
    description:
      "Kitchen cost control, purchasing, stock, recipes and reporting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PWARegister />
        <WorkspaceStateSync />
        {children}
      </body>
    </html>
  );
}
