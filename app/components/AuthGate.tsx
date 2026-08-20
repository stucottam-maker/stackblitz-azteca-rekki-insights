"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";

function isPublicAuthPath(pathname: string) {
  return pathname === "/login" || pathname === "/reset-password";
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const publicAuthPath = isPublicAuthPath(pathname);
  const [ready, setReady] = useState(publicAuthPath);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (isPublicAuthPath(pathname)) {
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
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
        router.replace("/reset-password");
        return;
      }

      if (isPublicAuthPath(pathname)) return;

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

  if (!ready && !publicAuthPath) {
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
