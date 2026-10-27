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
    const token = search.get("t") ?? search.get("token");
    if (token) {
      const ok = completeAccess(token);
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
