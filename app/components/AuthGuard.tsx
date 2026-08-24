"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [checking, setChecking] =
    useState(true);

  const publicRoutes = ["/login"];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      if (isPublicRoute) {
        if (active) {
          setChecking(false);
        }

        return;
      }

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!active) {
        return;
      }

      if (!session) {
        router.replace("/login");
        return;
      }

      setChecking(false);
    }

    checkAuth();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (
            !session &&
            !isPublicRoute
          ) {
            router.replace(
              "/login"
            );
          }
        }
      );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [
    isPublicRoute,
    router,
  ]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          background:\n            "linear-gradient(145deg, #172554 0%, #1e3a8a 58%, #2563eb 100%)",
          color: "#ffffff",
          fontWeight: 700,
        }}
      >
        Kitchen Insights
      </div>
    );
  }

  return <>{children}</>;
}
