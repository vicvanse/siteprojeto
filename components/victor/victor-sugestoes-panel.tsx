"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { isSugestoesQrVisit } from "@/components/victor/sugestoes-intro-copy";
import { SugestoesForm } from "@/components/victor/sugestoes-form";
import { VictorSugestoesRespostasStrip } from "@/components/victor/victor-sugestoes-respostas-strip";

function SugestoesIntroNavQrAware() {
  const searchParams = useSearchParams();
  const qrFlow = isSugestoesQrVisit(searchParams);
  return (
    <VictorSugestoesRespostasStrip variant="formulario" qrFlow={qrFlow} />
  );
}

/** Conteúdo de Sugestões no mesmo sítio da secção Victor (substitui tabs + feeds). */
export function VictorSugestoesPanel() {
  const t = useTranslations("sugestoes");
  return (
    <>
      <div id="victor-sugestoes-intro" className="space-y-3">
        <Suspense
          fallback={
            <VictorSugestoesRespostasStrip variant="formulario" qrFlow={false} />
          }
        >
          <SugestoesIntroNavQrAware />
        </Suspense>
      </div>

      <div className="mx-auto mt-8 w-full border-t border-black/10 pt-8 sm:mt-10 sm:pt-10">
        <div className="rounded-lg bg-[#f4f4f5] p-4 sm:bg-[#e8e8e8] sm:p-6">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="hidden text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold leading-tight tracking-[-0.02em] text-neutral-900 sm:block sm:rounded-none sm:border-0 sm:border-b sm:border-black/[0.08] sm:bg-transparent sm:px-0 sm:py-0 sm:pb-4 sm:shadow-none">
              {t("title")}
            </h2>
            <Suspense fallback={null}>
              <SugestoesForm />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
