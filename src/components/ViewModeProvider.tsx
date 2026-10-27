"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ViewMode = "gallery" | "collection";

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
};

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

function readInitialMode(): ViewMode {
  if (typeof window === "undefined") return "gallery";
  try {
    const view = new URLSearchParams(window.location.search).get("view");
    if (view === "collection") return "collection";
  } catch {
    /* ignore */
  }
  return "gallery";
}

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("gallery");

  useEffect(() => {
    setModeState(readInitialMode());
  }, []);

  const setMode = useCallback((next: ViewMode) => {
    setModeState(next);
    try {
      const url = new URL(window.location.href);
      if (next === "gallery") url.searchParams.delete("view");
      else url.searchParams.set("view", next);
      window.history.replaceState({}, "", url.pathname + url.search);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.view = mode;
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) {
    throw new Error("useViewMode must be used within ViewModeProvider");
  }
  return ctx;
}
