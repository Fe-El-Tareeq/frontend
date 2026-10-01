import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export type InstallTriggerResult =
  "prompted" | "accepted" | "dismissed" | "ios" | "fallback";

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check if running in standalone mode (already installed)
    const isStandalone =
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(display-mode: standalone)").matches) ||
      (window.navigator as any)?.standalone === true;

    setIsInstalled(isStandalone);

    // 2. Check if iOS device
    const userAgent = window.navigator?.userAgent?.toLowerCase() || "";
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 3. Listen for beforeinstallprompt event (Android / Chromium)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 4. Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const triggerInstall = async (): Promise<InstallTriggerResult> => {
    // If on iOS Safari, return 'ios' so UI can render the step-by-step iOS modal
    if (isIOS) {
      return "ios";
    }

    // If browser triggered beforeinstallprompt (Android / Chrome Desktop / Edge)
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          setIsInstalled(true);
          setIsInstallable(false);
          setDeferredPrompt(null);
          return "accepted";
        }
        return "dismissed";
      } catch {
        return "fallback";
      }
    }

    // If prompt is not yet ready or browser requires manual step
    return "fallback";
  };

  return {
    isInstallable: isInstallable || !isInstalled,
    isInstalled,
    isIOS,
    hasDeferredPrompt: !!deferredPrompt,
    triggerInstall,
  };
}
