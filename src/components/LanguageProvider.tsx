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
  DEFAULT_LANGUAGE,
  LANGUAGE_BCP47,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  translate,
  type Language,
  type MessageKey,
} from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  ready: boolean;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const raw = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(raw)) return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANGUAGE;
}

const CJK_LANGUAGES = new Set<Language>(["ja", "ko", "zh-CN", "zh-TW"]);

function applyLanguageToDocument(language: Language) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = LANGUAGE_BCP47[language];
  if (CJK_LANGUAGES.has(language)) root.dataset.script = "cjk";
  else delete root.dataset.script;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredLanguage();
    setLanguageState(stored);
    applyLanguageToDocument(stored);
    setReady(true);
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    applyLanguageToDocument(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) =>
      translate(language, key, vars),
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, ready, t }),
    [language, setLanguage, ready, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
