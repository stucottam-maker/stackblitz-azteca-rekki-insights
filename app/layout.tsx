import "./globals.css";
import "./ui-fixes.css";

import Sidebar from "./components/Sidebar";

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
        <div className="app-shell">
          <Sidebar />

          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
