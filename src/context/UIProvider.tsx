import React, { createContext, useEffect, useMemo, useState } from "react";
import { useDynamicTitle } from "../hooks/app/useDynamicTitle";

export type ThemeMode = "light" | "dark" | "system";
type Breakpoints = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
};
type UIState = Breakpoints & {
  hydrated: boolean;
  themeMode: ThemeMode; // user's theme preference
  theme: "light" | "dark"; // theme rendered by UI
  setTheme: (m: ThemeMode) => void;
  toggleTheme: () => void;
  setTempTitle: (title: string) => void;
  resetTitle: () => void;
  setPageTitle: () => void; // Auto-set title based on current route
};

const themeCtx = createContext<UIState | null>(null);
const themeStorageK = "UIMode";
const Breakpoints = {
  xs: "(min-width: 30rem)",
  sm: "(min-width: 40rem)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
  xl: "(min-width: 80rem)",
};

function setDarkMode(isDark: boolean) {
  const html = document.documentElement;
  html.classList.toggle("dark", isDark);
  html.style.colorScheme = isDark ? "dark" : "light";
}

const routeToTitle = (path: string): string | null => {
  if (path.startsWith("/projects")) return "📂 Projects | Dan Espino";
  if (path.startsWith("/messages")) return "✉️ Message Me | Instantfolio";
  if (path.startsWith("/profile")) return "👤 My Profile | Instantfolio";
  return null; // Return null for default case to allow rotating title
};

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breakPoint, setBreakpoint] = useState<Breakpoints>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const K = localStorage.getItem(themeStorageK);
      return K === "dark" || K === "light" || K === "system" ? K : "system";
    } catch {
      return "system";
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [hydrated, setHydrated] = useState(false);

  const { setTempTitle, resetTitle } = useDynamicTitle({
    baseTitle: "Portfolio | Dan Espino",
    rotate: ["InstantFolio Lite"],
    rotateIntervalMs: 3000,
    rotateMode: "replace",
  });

  const setPageTitle = () => {
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const title = routeToTitle(currentPath);
    if (title) {
      setTempTitle(title);
    } else {
      resetTitle();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const q = {
      xs: window.matchMedia(Breakpoints.xs),
      sm: window.matchMedia(Breakpoints.sm),
      md: window.matchMedia(Breakpoints.md),
      lg: window.matchMedia(Breakpoints.lg),
      xl: window.matchMedia(Breakpoints.xl),
    };

    const refreshBreakPoint = () =>
      setBreakpoint({
        xs: q.xs.matches,
        sm: q.sm.matches,
        md: q.md.matches,
        lg: q.lg.matches,
        xl: q.xl.matches,
      });
    Object.values(q).forEach((m) =>
      m.addEventListener?.("change", refreshBreakPoint),
    );
    refreshBreakPoint();

    const sys = window.matchMedia("(prefers-color-scheme: dark)");
    const compute = (pref: ThemeMode) =>
      pref === "dark"
        ? "dark"
        : pref === "light"
          ? "light"
          : sys.matches
            ? "dark"
            : "light";
    const apply = (pref: ThemeMode) => {
      const next = compute(pref);
      setResolvedTheme(next);
      setDarkMode(next === "dark");
      try {
        localStorage.setItem(themeStorageK, pref);
      } catch {}
    };
    apply(theme);

    const onSys = () => theme === "system" && apply("system");
    sys.addEventListener?.("change", onSys);

    const onStorage = (e: StorageEvent) => {
      if (e.key === themeStorageK && e.newValue) {
        const nv = e.newValue as ThemeMode;
        if (nv === "light" || nv === "dark" || nv === "system") {
          setTheme(nv);
          apply(nv);
        }
      }
    };
    window.addEventListener("storage", onStorage);

    setHydrated(true);
    return () => {
      Object.values(q).forEach((m) =>
        m.removeEventListener?.("change", refreshBreakPoint),
      );
      sys.removeEventListener?.("change", onSys);
      window.removeEventListener("storage", onStorage);
    };
  }, [theme]);

  const toggleTheme = () =>
    setTheme((curr) => {
      if (curr === "system") return resolvedTheme === "dark" ? "light" : "dark";
      return curr === "dark" ? "light" : "dark";
    });

  const value = useMemo<UIState>(
    () => ({
      ...breakPoint,
      hydrated,
      themeMode: theme,
      theme: resolvedTheme,
      setTheme,
      toggleTheme,
      setTempTitle,
      resetTitle,
      setPageTitle,
    }),
    [
      breakPoint.xs,
      breakPoint.sm,
      breakPoint.md,
      breakPoint.lg,
      breakPoint.xl,
      hydrated,
      theme,
      resolvedTheme,
    ],
  );

  return <themeCtx.Provider value={value}>{children}</themeCtx.Provider>;
};

export const useUI = () => {
  const context = React.useContext(themeCtx);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};

export const useBreakpoint = () => {
  const { xs, sm, md, lg, xl, hydrated } = useUI();
  return { xs, sm, md, lg, xl, hydrated };
};

export const useTheme = () => {
  const {
    themeMode: theme,
    theme: resolvedTheme,
    setTheme,
    toggleTheme,
    hydrated,
    resetTitle,
    setPageTitle,
  } = useUI();
  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    hydrated,
    resetTitle,
    setPageTitle,
  };
};
