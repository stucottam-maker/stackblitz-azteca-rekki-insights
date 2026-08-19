"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type PwaInstallButtonProps = {
  className?: string;
  compact?: boolean;
};

function isStandalone() {
  if (typeof window === "undefined") return false;
  const iosStandalone = Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
  return window.matchMedia("(display-mode: standalone)").matches || iosStandalone;
}

export default function PwaInstallButton({
  className = "secondary-inline-button",
  compact = false,
}: PwaInstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    if ("serviceWorker" in navigator) {
      const registerServiceWorker = () => {
        navigator.serviceWorker.register("/Sw.js", { scope: "/" }).catch((error) => {
          console.error("PWA service worker registration failed", error);
        });
      };

      if (document.readyState === "complete") {
        registerServiceWorker();
      } else {
        window.addEventListener("load", registerServiceWorker, { once: true });
      }
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) {
    return compact ? null : (
      <div className="pwa-installed-note" role="status">
        ✓ Kitchen Insights is installed on this device
      </div>
    );
  }

  async function install() {
    if (installing) return;

    if (installPrompt) {
      try {
        setInstalling(true);
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setInstalled(true);
        }
        setInstallPrompt(null);
      } finally {
        setInstalling(false);
      }
      return;
    }

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const message = isIos
      ? "In Safari, tap Share, then Add to Home Screen."
      : "In Chrome, open the ⋮ menu and choose Install app or Add to Home screen. If that option is not shown yet, reload this page once and try again.";

    window.alert(message);
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => void install()}
      disabled={installing}
    >
      <span aria-hidden="true">⇩</span>
      <span>{installing ? "Installing…" : "Install app"}</span>
    </button>
  );
}
