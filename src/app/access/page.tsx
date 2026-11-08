"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useViewMode } from "@/components/ViewModeProvider";
import { AccessOverlay } from "@/components/label/AccessOverlay";

/**
 * Technical access route — magic-link landing, refresh, deep links.
 * Everyday UX stays on the Collection overlay; this is the fallback.
 */
function AccessClient() {
  const search = useSearchParams();
  const router = useRouter();
  const { completeAccess, authenticated, openOverlay, ready } = useAccess();
  const { setMode } = useViewMode();
  const { t } = useLanguage();
  const [status, setStatus] = useState<"working" | "ok" | "bad">("working");

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;

    (async () => {
      /* Supabase magic link lands here with #access_token=… in the hash. */
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const supaToken = hash.get("access_token");
      if (supaToken) {
        window.history.replaceState(null, "", window.location.pathname);
        const ok = await completeAccess(supaToken, "supabase");
        if (cancelled) return;
        setStatus(ok ? "ok" : "bad");
        if (ok) {
          setMode("collection");
          router.replace("/?view=collection");
        }
        return;
      }
      if (hash.get("error")) {
        setStatus("bad");
        return;
      }

      const token = search.get("t") ?? search.get("token");
      if (token) {
        const ok = await completeAccess(token);
        if (cancelled) return;
        setStatus(ok ? "ok" : "bad");
        if (ok) {
          setMode("collection");
          router.replace("/?view=collection");
        }
        return;
      }
      if (authenticated) {
        setMode("collection");
        router.replace("/?view=collection");
        return;
      }
      setStatus("ok");
      setMode("collection");
      openOverlay("form");
    })();

    return () => {
      cancelled = true;
    };
  }, [
    ready,
    search,
    completeAccess,
    authenticated,
    openOverlay,
    setMode,
    router,
  ]);

  return (
    <div className="access-page">
      <p className="access-page__status">
        {status === "working"
          ? t("access.working")
          : status === "bad"
            ? t("access.badLink")
            : t("access.ready")}
      </p>
      <AccessOverlay />
    </div>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={null}>
      <AccessClient />
    </Suspense>
  );
}
