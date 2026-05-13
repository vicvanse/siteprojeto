"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { VictorPostImage } from "@/data/victor-notes-posts";

export type PostGalleryMainPreset = "default" | "pixel-art" | "compact";

export interface PostGalleryProps {
  images: VictorPostImage[];
  /** Índice inicial (0-based). */
  initialIndex?: number;
  variant: "feed" | "detail";
  /** Desfoca a imagem principal (ex.: conteúdo reservado). */
  locked?: boolean;
  /** Para `alt` quando falta por imagem. */
  fallbackLabel: string;
  className?: string;
  /**
   * `pixel-art` — teto de altura + object-contain centrado.
   * `compact` — altura máxima um pouco menor (telas altas / óleo).
   */
  mainPreset?: PostGalleryMainPreset;
  /**
   * PNG/gifs pequenos em `apreciar` + arte: sem optimiser do Next, lightbox em `w-full`
   * e `image-rendering: pixelated` para não perder definição no mobile.
   */
  nativePixelSources?: boolean;
  /** Em `max-width: 767px`, índice inicial (ex.: segunda gravura no Doré — Rosa Celeste). */
  initialIndexMobile?: number;
  /** Em `max-width: 639px`, teto de altura mais baixo (`pixel-art` / `compact`). */
  mobileMainTighter?: boolean;
}

function isGif(src: string): boolean {
  return src.endsWith(".gif");
}

function altFor(
  images: VictorPostImage[],
  index: number,
  fallbackLabel: string,
): string {
  const raw = images[index]?.alt?.trim();
  if (raw) return raw;
  const n = images.length;
  return n > 1 ? `${fallbackLabel} — ${index + 1} de ${n}` : fallbackLabel;
}

export function PostGallery({
  images,
  initialIndex = 0,
  variant,
  locked = false,
  fallbackLabel,
  className = "",
  mainPreset = "default",
  nativePixelSources = false,
  initialIndexMobile,
  mobileMainTighter = false,
}: PostGalleryProps) {
  const count = images.length;
  const [active, setActive] = useState(() =>
    count ? Math.max(0, Math.min(initialIndex, count - 1)) : 0,
  );
  const didSyncMobileCover = useRef(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** Só alinhar miniaturas com `scrollIntoView` após ação do utilizador (evita puxar a página ao montar o feed). */
  const shouldScrollThumbIntoViewRef = useRef(false);

  const current = images[active];
  const currentSrc = current?.src ?? "";

  const goPrev = useCallback(() => {
    shouldScrollThumbIntoViewRef.current = true;
    setActive((i) => (count <= 1 ? i : i === 0 ? count - 1 : i - 1));
  }, [count]);

  const goNext = useCallback(() => {
    shouldScrollThumbIntoViewRef.current = true;
    setActive((i) => (count <= 1 ? i : i === count - 1 ? 0 : i + 1));
  }, [count]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (
      didSyncMobileCover.current ||
      count === 0 ||
      initialIndexMobile == null
    ) {
      return;
    }
    didSyncMobileCover.current = true;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const idx = mobile ? initialIndexMobile : initialIndex;
    setActive(Math.max(0, Math.min(idx, count - 1)));
  }, [count, initialIndex, initialIndexMobile]);

  useEffect(() => {
    if (count === 0) return;
    setActive((prev) => Math.max(0, Math.min(prev, count - 1)));
  }, [count]);

  useEffect(() => {
    if (!shouldScrollThumbIntoViewRef.current) return;
    shouldScrollThumbIntoViewRef.current = false;
    const el = thumbRefs.current[active];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, goPrev, goNext]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null || count < 2) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const dx = end - start;
    if (dx < -48) goNext();
    else if (dx > 48) goPrev();
  }

  function scrollThumbs(dir: -1 | 1) {
    thumbStripRef.current?.scrollBy({
      left: dir * 120,
      behavior: "smooth",
    });
  }

  const arrowMainClass =
    "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white/75 text-neutral-800 shadow-sm backdrop-blur-[2px] transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a7c44]/40 opacity-35 sm:opacity-0 sm:group-hover/main:opacity-90";

  const showLightbox = !locked;

  const lightbox =
    lightboxOpen && mounted && showLightbox ? (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Imagem ampliada"
        onClick={() => setLightboxOpen(false)}
      >
        <div
          className="relative flex max-h-[min(92dvh,1200px)] max-w-[min(96vw,56rem)] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute -right-1 -top-1 z-30 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:-right-3 sm:-top-3"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
          <div className="relative flex max-h-[min(88dvh,1100px)] w-full min-w-0 items-center justify-center px-1">
            <Image
              src={currentSrc}
              alt={altFor(images, active, fallbackLabel)}
              width={1600}
              height={1200}
              className={
                nativePixelSources
                  ? "h-auto max-h-[min(88dvh,1100px)] w-full max-w-full object-contain [image-rendering:pixelated]"
                  : "h-auto max-h-[min(88dvh,1100px)] w-auto max-w-full object-contain"
              }
              sizes={nativePixelSources ? "min(96vw, 56rem)" : "96vw"}
              priority
              unoptimized={isGif(currentSrc) || nativePixelSources}
            />
            {count > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-black/35 text-white shadow-md backdrop-blur-[2px] transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  onClick={goPrev}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={2.25} aria-hidden />
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-black/35 text-white shadow-md backdrop-blur-[2px] transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  onClick={goNext}
                  aria-label="Imagem seguinte"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={2.25} aria-hidden />
                </button>
              </>
            ) : null}
          </div>
          {count > 1 ? (
            <p className="mt-3 text-[13px] tabular-nums text-white/80">
              {active + 1} / {count}
            </p>
          ) : null}
        </div>
      </div>
    ) : null;

  if (!count || !current) return null;

  const topRadius =
    variant === "feed" ? "rounded-t-lg" : "rounded-lg";

  /** Proporção genérica só para o layout do Next/Image; o tamanho renderizado segue o ficheiro (`height: auto`). */
  const layoutHint = { width: 2400, height: 1600 };

  const isBounded =
    mainPreset === "pixel-art" || mainPreset === "compact";

  /**
   * `pixel-art` e `compact`: caixa `w-full` + `min-w-0` (evita colapso ao remontar o feed
   * e tamanhos instáveis após abrir/fechar o lightbox). A imagem escala com `w-full` +
   * `object-contain` + teto de altura — não usar `inline-block`/`w-auto` pela largura intrínseca.
   */
  const outerWrapperClass =
    mainPreset === "pixel-art"
      ? "relative flex w-full justify-center"
      : isBounded
        ? "relative flex w-full justify-center"
        : "contents";

  const innerWrapperClass =
    mainPreset === "pixel-art" || mainPreset === "compact"
      ? "relative w-full min-w-0 max-w-full"
      : "relative w-full";

  const imageSizes =
    mainPreset === "pixel-art"
      ? "(max-width: 768px) 100vw, min(42rem, 90vw)"
      : mainPreset === "compact"
        ? "(max-width: 768px) 92vw, min(40rem, 90vw)"
        : "(max-width: 768px) 100vw, 40rem";

  const imageClassCompact = mobileMainTighter
    ? "h-auto w-full max-w-full object-contain max-sm:max-h-[min(48dvh,300px)] sm:max-h-[min(74dvh,500px)]"
    : "h-auto w-full max-w-full object-contain max-h-[min(72dvh,460px)] sm:max-h-[min(74dvh,500px)]";

  /** `pixel-art`: preenche a largura do cartão até ao teto de altura (comportamento estável após remount). */
  const imageClassPixelArt = mobileMainTighter
    ? "h-auto w-full max-w-full object-contain max-sm:max-h-[min(48dvh,300px)] sm:max-h-[min(68dvh,440px)]"
    : "h-auto w-full max-w-full object-contain max-sm:max-h-[min(72dvh,520px)] sm:max-h-[min(68dvh,440px)]";

  return (
    <>
      <div className={`group/main w-full ${className}`}>
        <div
          className={`relative overflow-hidden bg-neutral-100 ${topRadius}`}
        >
          <div
            className="relative w-full"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className={outerWrapperClass}>
              <div className={innerWrapperClass}>
                <Image
                  key={currentSrc}
                  src={currentSrc}
                  alt={altFor(images, active, fallbackLabel)}
                  width={layoutHint.width}
                  height={layoutHint.height}
                  sizes={imageSizes}
                  className={`block transition-opacity duration-300 ease-out ${
                    mainPreset === "pixel-art"
                      ? `h-auto ${imageClassPixelArt}${nativePixelSources ? " [image-rendering:pixelated]" : ""} ${locked ? "scale-[1.02] blur-md" : ""}`
                      : mainPreset === "compact"
                        ? `h-auto ${imageClassCompact} ${locked ? "scale-[1.02] blur-md" : ""}`
                        : `h-auto w-full max-w-full ${locked ? "scale-[1.02] blur-md" : ""}`
                  }`}
                  style={
                    mainPreset === "pixel-art" || mainPreset === "compact"
                      ? { width: "100%", height: "auto" }
                      : { width: "100%", height: "auto" }
                  }
                  priority={variant === "feed" || active === 0}
                  unoptimized={isGif(currentSrc) || nativePixelSources}
                />

                {locked ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="rounded-full bg-black/65 px-3.5 py-1.5 text-[12px] font-medium text-white shadow-sm">
                      Bloqueado
                    </span>
                  </div>
                ) : null}

                {showLightbox ? (
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="absolute inset-0 z-[1] cursor-zoom-in border-0 bg-transparent p-0"
                    aria-label="Abrir imagem em tamanho maior"
                  />
                ) : null}
              </div>
            </div>

            {count > 1 ? (
              <>
                <button
                  type="button"
                  className={`${arrowMainClass} left-2 sm:left-3`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  className={`${arrowMainClass} right-2 sm:right-3`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Imagem seguinte"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
                </button>
                <div
                  className="pointer-events-none absolute bottom-2.5 right-2.5 z-[2] rounded-full bg-black/50 px-2 py-0.5 text-[11px] tabular-nums text-white"
                  aria-hidden
                >
                  {active + 1} / {count}
                </div>
              </>
            ) : null}
          </div>
        </div>

        {count > 1 ? (
          <div className="relative border-t border-black/[0.06] bg-white px-1 py-2 sm:px-2">
            <button
              type="button"
              className="absolute left-0 top-1/2 z-10 hidden h-8 w-7 -translate-y-1/2 items-center justify-center rounded-r-md border-0 bg-gradient-to-r from-white via-white to-transparent text-black/35 transition hover:text-black/60 md:flex"
              aria-label="Deslocar miniaturas para a esquerda"
              onClick={() => scrollThumbs(-1)}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              className="absolute right-0 top-1/2 z-10 hidden h-8 w-7 -translate-y-1/2 items-center justify-center rounded-l-md border-0 bg-gradient-to-l from-white via-white to-transparent text-black/35 transition hover:text-black/60 md:flex"
              aria-label="Deslocar miniaturas para a direita"
              onClick={() => scrollThumbs(1)}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <div
              ref={thumbStripRef}
              className="flex touch-pan-x gap-1.5 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
            >
              {images.map((img, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={`${img.src}-${index}`}
                    ref={(el) => {
                      thumbRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => {
                      shouldScrollThumbIntoViewRef.current = true;
                      setActive(index);
                    }}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-md border transition-colors sm:h-[52px] sm:w-[52px] ${
                      isActive
                        ? "border-black/55 ring-1 ring-black/20"
                        : "border-black/10 hover:border-black/25"
                    }`}
                    aria-label={`Ver imagem ${index + 1} de ${count}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      className={`object-contain bg-neutral-100${nativePixelSources ? " [image-rendering:pixelated]" : ""}`}
                      sizes="52px"
                      loading="lazy"
                      unoptimized={isGif(img.src) || nativePixelSources}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
