import { useState, useEffect, useCallback } from "react";

export type ThemeMode = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "btareeqak_theme_mode";

function getSystemPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    return saved === "light" || saved === "dark" || saved === "system"
      ? saved
      : "system";
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return getSystemPreference();
  });

  const applyTheme = useCallback((mode: ThemeMode) => {
    const isDarkMode = mode === "dark" || (mode === "system" && getSystemPreference());
    setIsDark(isDarkMode);

    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", isDarkMode ? "#0B1E36" : "#ffffff");
    }
  }, []);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      applyTheme(newTheme);
      // Dispatch custom event for multi-instance sync
      window.dispatchEvent(
        new CustomEvent("themechange", { detail: { theme: newTheme } }),
      );
    },
    [applyTheme],
  );

  const toggleDarkMode = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  useEffect(() => {
    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: ThemeMode }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
        applyTheme(customEvent.detail.theme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    window.addEventListener("themechange", handleCustomChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("themechange", handleCustomChange);
    };
  }, [theme, applyTheme]);

  return {
    theme,
    isDark,
    setTheme,
    toggleDarkMode,
  };
}
