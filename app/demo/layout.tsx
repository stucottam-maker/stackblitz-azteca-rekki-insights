import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Management Software Demo | Kommee",
  description: "Explore Kommee with fictional sample data: purchasing, stock, invoices and kitchen compliance.",
  alternates: { canonical: "https://kommee.co.uk/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
