"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(pathname === "/login");

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (pathname === "/login") {
        if (mounted) setReady(true);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        setReady(false);
        router.replace(`/login?next=${encodeURIComponent(pathname || "/")}`);
        return;
      }

      setReady(true);
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted || pathname === "/login") return;

      if (event === "SIGNED_OUT" || !session) {
        setReady(false);
        router.replace("/login");
      } else {
        setReady(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (!ready && pathname !== "/login") {
    return (
      <div className="auth-loading-screen" role="status" aria-live="polite">
        <div className="auth-loading-card">
          <strong>Kitchen Insights</strong>
          <span>Checking your session…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
