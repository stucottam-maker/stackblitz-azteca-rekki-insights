import Link from "next/link";
import type { ReactNode } from "react";

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "14px 20px 0",
        }}
      >
        <nav
          aria-label="Orders sections"
          style={{
            display: "inline-flex",
            gap: 8,
            padding: 6,
            border: "1px solid rgba(49, 92, 70, 0.22)",
            borderRadius: 14,
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 5px 18px rgba(36,53,45,0.06)",
          }}
        >
          <Link
            href="/orders"
            style={{
              padding: "9px 13px",
              borderRadius: 10,
              color: "#315C46",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Orders
          </Link>
          <Link
            href="/orders/suggested"
            style={{
              padding: "9px 13px",
              borderRadius: 10,
              background: "#315C46",
              color: "white",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Suggested order
          </Link>
        </nav>
      </div>
      {children}
    </>
  );
}
