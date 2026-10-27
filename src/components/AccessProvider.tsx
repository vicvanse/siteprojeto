"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SESSION_KEY = "papers-access-session";
const PENDING_KEY = "papers-access-pending";
const LINK_TTL_MS = 15 * 60 * 1000;

export type AccessOverlayPhase = "form" | "sent";

type AccessSession = {
  email: string;
  ownedIds: string[];
};

type PendingAccess = {
  email: string;
  token: string;
  expiresAt: number;
};

type AccessContextValue = {
  ready: boolean;
  authenticated: boolean;
  email: string | null;
  ownedIds: string[];
  overlayOpen: boolean;
  overlayPhase: AccessOverlayPhase;
  pendingEmail: string | null;
  pendingToken: string | null;
  openOverlay: (phase?: AccessOverlayPhase) => void;
  closeOverlay: () => void;
  requestAccess: (email: string) => { token: string };
  resendAccess: () => { token: string } | null;
  completeAccess: (token: string) => boolean;
  owns: (id: string) => boolean;
  signOut: () => void;
};

const AccessContext = createContext<AccessContextValue | null>(null);

/** Demo ownership — a few collected objects once identified. */
function demoOwnedIds(email: string): string[] {
  const base = ["001", "007"];
  const extra = email.toLowerCase().includes("a") ? ["003"] : ["005"];
  return [...base, ...extra];
}

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, Math.min(2, user.length));
  return `${visible}${"•".repeat(Math.max(2, user.length - visible.length))}@${domain}`;
}

function readSession(): AccessSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AccessSession;
    if (!parsed?.email || !Array.isArray(parsed.ownedIds)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readPending(): PendingAccess | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingAccess;
    if (!parsed?.email || !parsed?.token || !parsed?.expiresAt) return null;
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(PENDING_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function makeToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 24);
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<AccessSession | null>(null);
  const [pending, setPending] = useState<PendingAccess | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<AccessOverlayPhase>("form");

  useEffect(() => {
    setSession(readSession());
    setPending(readPending());
    setReady(true);
  }, []);

  const openOverlay = useCallback((phase: AccessOverlayPhase = "form") => {
    setOverlayPhase(phase);
    setOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayOpen(false);
  }, []);

  const requestAccess = useCallback((email: string) => {
    const trimmed = email.trim().toLowerCase();
    const next: PendingAccess = {
      email: trimmed,
      token: makeToken(),
      expiresAt: Date.now() + LINK_TTL_MS,
    };
    localStorage.setItem(PENDING_KEY, JSON.stringify(next));
    setPending(next);
    setOverlayPhase("sent");
    setOverlayOpen(true);
    return { token: next.token };
  }, []);

  const resendAccess = useCallback(() => {
    if (!pending?.email) return null;
    return requestAccess(pending.email);
  }, [pending, requestAccess]);

  const completeAccess = useCallback((token: string) => {
    const current = readPending();
    if (!current || current.token !== token) return false;
    if (Date.now() > current.expiresAt) {
      localStorage.removeItem(PENDING_KEY);
      setPending(null);
      return false;
    }
    const next: AccessSession = {
      email: current.email,
      ownedIds: demoOwnedIds(current.email),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    localStorage.removeItem(PENDING_KEY);
    setSession(next);
    setPending(null);
    setOverlayOpen(false);
    setOverlayPhase("form");
    return true;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  const owns = useCallback(
    (id: string) => Boolean(session?.ownedIds.includes(id)),
    [session],
  );

  const value = useMemo<AccessContextValue>(
    () => ({
      ready,
      authenticated: Boolean(session),
      email: session?.email ?? null,
      ownedIds: session?.ownedIds ?? [],
      overlayOpen,
      overlayPhase,
      pendingEmail: pending ? maskEmail(pending.email) : null,
      pendingToken: pending?.token ?? null,
      openOverlay,
      closeOverlay,
      requestAccess,
      resendAccess,
      completeAccess,
      owns,
      signOut,
    }),
    [
      ready,
      session,
      overlayOpen,
      overlayPhase,
      pending,
      openOverlay,
      closeOverlay,
      requestAccess,
      resendAccess,
      completeAccess,
      owns,
      signOut,
    ],
  );

  return (
    <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
  );
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used within AccessProvider");
  return ctx;
}
