"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ACCENT_ORDER,
  applyAccentToDocument,
  DEFAULT_ACCENT_HUE,
  type AccentHue,
} from "@/lib/accent";

const STORAGE_KEY = "papers-accent-hue";

type AccentContextValue = {
  hue: AccentHue;
  setHue: (hue: AccentHue) => void;
  ready: boolean;
};

const AccentContext = createContext<AccentContextValue | null>(null);

function isAccentHue(value: string | null | undefined): value is AccentHue {
  return !!value && (ACCENT_ORDER as string[]).includes(value);
}

function readStoredHue(): AccentHue {
  if (typeof window === "undefined") return DEFAULT_ACCENT_HUE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (isAccentHue(raw)) return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_ACCENT_HUE;
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [hue, setHueState] = useState<AccentHue>(DEFAULT_ACCENT_HUE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredHue();
    setHueState(stored);
    applyAccentToDocument(stored);
    setReady(true);
  }, []);

  const setHue = useCallback((next: AccentHue) => {
    setHueState(next);
    applyAccentToDocument(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ hue, setHue, ready }),
    [hue, setHue, ready],
  );

  return (
    <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
}
