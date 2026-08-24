"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (
      "serviceWorker" in navigator &&
      window.location.protocol === "https:"
    ) {
      navigator.serviceWorker
        .register("/Sw.js", {
          updateViaCache: "none",
        })
        .then((registration) =>
          registration.update()
        )
        .catch((error) => {
          console.error(
            "Service worker registration failed:",
            error
          );
        });
    }
  }, []);

  return null;
}
