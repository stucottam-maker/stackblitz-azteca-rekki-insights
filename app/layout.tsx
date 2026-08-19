import "./globals.css";
import "./ui-fixes.css";
import "./mobile-nav-fix.css";
import "./mobile-page-fixes.css";
import "./final-polish.css";
import "./orders-polish.css";
import "./login-polish.css";

import AppFrame from "./components/AppFrame";

export const metadata = {
  title: "Kitchen Insights",
  description: "Cost control & operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
