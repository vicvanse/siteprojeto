/**
 * Hierarquia editorial (título forte vs corpo legível vs metadata discreta).
 * Usado em TextPostCard, ImagePostCard e YoutubePostCard.
 */
export const postCardTitleClass =
  "text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-neutral-900";

export const postCardMetaTimeClass =
  "text-[12px] tabular-nums text-black/[0.42]";

export const postCardMetaTagClass =
  "inline-flex rounded-full bg-[#4a7c44]/10 px-2.5 py-0.5 text-[12px] font-medium tracking-[0.04em] text-[#4a7c44]";

export const postCardBodyParaClass =
  "text-[14px] font-normal leading-[1.65] text-neutral-800 [text-wrap:pretty]";

/** Coluna de leitura mais estreita que o cartão cheio (efeito editorial). */
export const postCardReadingColumnClass = "max-w-prose";

export const postCardHeaderClass = "space-y-2.5";

export const postCardBodyStackClass = "mt-5 space-y-4";
