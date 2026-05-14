"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_BTN_CLASS =
  "inline-flex min-h-[52px] min-w-[100px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-tr-[12px] rounded-bl-[12px] border border-[#404040] bg-[#525252] px-2.5 py-1.5 text-center font-mono text-[10px] leading-tight tracking-[0.18em] text-white no-underline shadow-[0_14px_28px_rgba(82,82,82,0.18)] outline-none max-sm:transition-colors max-sm:duration-200 max-sm:hover:border-[#262626] max-sm:hover:bg-[#262626] focus-visible:ring-2 focus-visible:ring-[#404040]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-0 sm:min-w-0 sm:inline sm:gap-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:text-[#525252] sm:underline sm:decoration-[#525252]/25 sm:underline-offset-4 sm:hover:bg-transparent sm:hover:text-[#525252]";

export type SugestoesRespostasStripVariant = "formulario" | "arquivo";

/** Só chip «Projeto» (layout clássico quando não há fluxo QR). */
function SugestoesVictorHomeChipOnly() {
  const t = useTranslations("sugestoes");
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/40 max-sm:mt-1">
      <Link
        href="/"
        aria-label={t("backAria")}
        className={NAV_BTN_CLASS}
      >
        <span className="max-sm:hidden">← {t("back")}</span>
        <span className="hidden max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-0.5 sm:hidden">
          <span className="text-center">{t("back")}</span>
          <span
            className="sugestoes-back-arrow-mobile-nudge mt-0.5 text-base leading-none"
            aria-hidden
          >
            ←
          </span>
        </span>
      </Link>
    </p>
  );
}

/**
 * Fluxo QR (`?ref=qr`, etc.): linha Projeto ← · «Respostas» · respostas → / sugestões ←.
 * Fora do QR em sugestões: só o chip Projeto (sem «Respostas» nem botão para arquivo).
 */
export function VictorSugestoesRespostasStrip({
  variant,
  qrFlow,
}: {
  variant: SugestoesRespostasStripVariant;
  /** Só true quando a URL traz o marcador do cartão QR — mesmo critério que o texto longo do QR. */
  qrFlow: boolean;
}) {
  const t = useTranslations("sugestoes");
  const backLabel = t("back");
  const responsesLabel = t("responsesMobileWord");
  const suggestionsLabel = t("suggestionsMobileWord");

  const secondaryHref =
    variant === "formulario"
      ? "/victor/respostas?ref=qr"
      : "/victor/sugestoes?ref=qr";
  const secondaryAria =
    variant === "formulario"
      ? t("responsesNavAria")
      : t("suggestionsNavAria");

  /** Fora do fluxo QR: só o chip Projeto (sem «Respostas» nem ligar ao arquivo). */
  if (!qrFlow) {
    return (
      <>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">
          {t("back")}
        </p>
        <SugestoesVictorHomeChipOnly />
      </>
    );
  }

  return (
    <>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">
        {t("back")}
      </p>
      <div className="relative flex min-h-[52px] w-full items-center justify-between gap-2">
        <div className="relative z-[1] shrink-0">
          <Link
            href="/"
            aria-label={t("backAria")}
            className={NAV_BTN_CLASS}
          >
        <span className="max-sm:hidden">← {backLabel}</span>
            <span className="hidden max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-0.5 sm:hidden">
          <span className="text-center">{backLabel}</span>
              <span
                className="sugestoes-back-arrow-mobile-nudge mt-0.5 text-base leading-none"
                aria-hidden
              >
                ←
              </span>
            </span>
          </Link>
        </div>

        <div className="relative z-[1] shrink-0">
          <Link
            href={secondaryHref}
            aria-label={secondaryAria}
            className={NAV_BTN_CLASS}
          >
            <span className="max-sm:hidden">
              {variant === "formulario"
                ? t("responsesNavDesktop")
                : t("suggestionsNavDesktop")}
            </span>
            <span className="hidden max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-0.5 sm:hidden">
              <span className="text-center">
                {variant === "formulario"
                  ? responsesLabel
                  : suggestionsLabel}
              </span>
              <span
                className="sugestoes-back-arrow-mobile-nudge mt-0.5 text-base leading-none"
                aria-hidden
              >
                {variant === "formulario" ? "→" : "←"}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
