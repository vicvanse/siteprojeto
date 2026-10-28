"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AccessOverlayPhase = "form" | "sent";

type AccessContextValue = {
  ready: boolean;
  authenticated: boolean;
  email: string | null;
  ownedIds: string[];
  overlayOpen: boolean;
  overlayPhase: AccessOverlayPhase;
  pendingEmail: string | null;
  /** Dev / no-email provider: openable magic URL. */
  magicUrl: string | null;
  busy: boolean;
  openOverlay: (phase?: AccessOverlayPhase) => void;
  closeOverlay: () => void;
  requestAccess: (email: string) => Promise<{ ok: boolean; error?: string }>;
  resendAccess: () => Promise<{ ok: boolean; error?: string } | null>;
  completeAccess: (token: string) => Promise<boolean>;
  owns: (id: string) => boolean;
  signOut: () => Promise<void>;
};

const AccessContext = createContext<AccessContextValue | null>(null);

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, Math.min(2, user.length));
  return `${visible}${"•".repeat(Math.max(2, user.length - visible.length))}@${domain}`;
}

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [ownedIds, setOwnedIds] = useState<string[]>([]);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<AccessOverlayPhase>("form");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingRawEmail, setPendingRawEmail] = useState<string | null>(null);
  const [magicUrl, setMagicUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/access/session", { cache: "no-store" });
      const data = (await res.json()) as {
        authenticated?: boolean;
        email?: string;
        ownedIds?: string[];
      };
      if (data.authenticated && data.email) {
        setAuthenticated(true);
        setEmail(data.email);
        setOwnedIds(Array.isArray(data.ownedIds) ? data.ownedIds : []);
      } else {
        setAuthenticated(false);
        setEmail(null);
        setOwnedIds([]);
      }
    } catch {
      setAuthenticated(false);
      setEmail(null);
      setOwnedIds([]);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refreshSession();
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshSession]);

  const openOverlay = useCallback((phase: AccessOverlayPhase = "form") => {
    setOverlayPhase(phase);
    setOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayOpen(false);
  }, []);

  const requestAccess = useCallback(async (value: string) => {
    const trimmed = value.trim().toLowerCase();
    setBusy(true);
    try {
      const res = await fetch("/api/access/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        emailed?: boolean;
        magicUrl?: string;
        email?: string;
        authenticated?: boolean;
        ownedIds?: string[];
      };
      if (!res.ok || !data.ok) {
        return { ok: false, error: data.error ?? "request_failed" };
      }
      /* OWNER (and any direct unlock) — session cookie already set. */
      if (data.authenticated && data.email) {
        setAuthenticated(true);
        setEmail(data.email);
        setOwnedIds(Array.isArray(data.ownedIds) ? data.ownedIds : []);
        setMagicUrl(null);
        setPendingEmail(null);
        setPendingRawEmail(null);
        setOverlayOpen(false);
        setOverlayPhase("form");
        return { ok: true };
      }
      setPendingRawEmail(data.email ?? trimmed);
      setPendingEmail(maskEmail(data.email ?? trimmed));
      setMagicUrl(data.magicUrl ?? null);
      setOverlayPhase("sent");
      setOverlayOpen(true);
      return { ok: true };
    } catch {
      return { ok: false, error: "network" };
    } finally {
      setBusy(false);
    }
  }, []);

  const resendAccess = useCallback(async () => {
    if (!pendingRawEmail) return null;
    return requestAccess(pendingRawEmail);
  }, [pendingRawEmail, requestAccess]);

  const completeAccess = useCallback(async (token: string) => {
    setBusy(true);
    try {
      const res = await fetch("/api/access/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        email?: string;
        ownedIds?: string[];
      };
      if (!res.ok || !data.ok || !data.email) return false;
      setAuthenticated(true);
      setEmail(data.email);
      setOwnedIds(Array.isArray(data.ownedIds) ? data.ownedIds : []);
      setMagicUrl(null);
      setPendingEmail(null);
      setPendingRawEmail(null);
      setOverlayOpen(false);
      setOverlayPhase("form");
      return true;
    } catch {
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/access/signout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setAuthenticated(false);
    setEmail(null);
    setOwnedIds([]);
  }, []);

  const owns = useCallback(
    (id: string) => ownedIds.includes(id),
    [ownedIds],
  );

  const value = useMemo<AccessContextValue>(
    () => ({
      ready,
      authenticated,
      email,
      ownedIds,
      overlayOpen,
      overlayPhase,
      pendingEmail,
      magicUrl,
      busy,
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
      authenticated,
      email,
      ownedIds,
      overlayOpen,
      overlayPhase,
      pendingEmail,
      magicUrl,
      busy,
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
