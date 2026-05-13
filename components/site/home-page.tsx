"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Maximize2,
  Minimize2,
  Moon,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { DigitalWineArtwork } from "@/components/site/digital-wine-artwork";
import { HeroBackground } from "@/components/site/hero-background";
import { VekonHeaderMark } from "@/components/site/vekon-header-mark";
import { VekonHeroMark } from "@/components/site/vekon-hero-mark";
import { SiteSocialFooter } from "@/components/site/site-social-footer";
import { PostsFeed } from "@/components/victor/posts-feed";
import { VictorRespostasPanel } from "@/components/victor/victor-respostas-panel";
import { VictorSugestoesPanel } from "@/components/victor/victor-sugestoes-panel";
import { getPostsForSection } from "@/data/victor-notes-posts";
import {
  GOODREADS_URL,
  INSTAGRAM_URL,
  INSTAGRAM_LINK_LABEL,
} from "@/lib/site-constants";
import type Player from "@vimeo/player";

const VEKON_URL = "https://pixellife.vercel.app/auth/login";

/** Retrato no painel «victor» da navegação (public/victor-intro.png). */
const REGISTROS_INTRO_IMAGE = "/victor-intro.png";

/** Vídeos em Registros: o primeiro em destaque; os restantes em miniatura (clique promove ao bloco grande). */
interface RegistrosVideoEntry {
  slot: string;
  vimeoId: string;
  poster: string;
  /** Padrão da faixa escura quando este vídeo está em destaque (alterável pelo interruptor). */
  darkBand?: boolean;
}

const REGISTROS_VIDEOS: RegistrosVideoEntry[] = [
  {
    slot: "01",
    vimeoId: "1180326826",
    poster: "/media/registros-poster.png",
    darkBand: false,
  },
  {
    slot: "02",
    vimeoId: "1180360500",
    poster: "/media/registros-video2-poster.png",
    darkBand: false,
  },
];

const HOVER_GIFS = ["/media/hover/corno.gif"] as const;

/** Ao lado do Vekon: preenche o quadro sem letterbox (`cover` em vez de `contain`). */
function globeHoverGifClass(): string {
  return (
    "h-[min(52vh,260px)] w-[min(46vw,300px)] max-w-[min(92vw,300px)] rounded-sm object-cover object-center shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-500 ease-out sm:h-[min(58vh,280px)] sm:w-[min(40vw,320px)] sm:max-w-[320px]"
  );
}

function getFullscreenElement(): Element | null {
  const d = document as Document & {
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  };
  return (
    document.fullscreenElement ??
    d.webkitFullscreenElement ??
    d.mozFullScreenElement ??
    d.msFullscreenElement ??
    null
  );
}

async function requestElementFullscreen(el: HTMLElement): Promise<void> {
  const anyEl = el as HTMLElement & {
    webkitRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    msRequestFullscreen?: () => void;
  };
  if (typeof anyEl.requestFullscreen === "function") {
    await Promise.resolve(anyEl.requestFullscreen());
    return;
  }
  if (anyEl.webkitRequestFullscreen) {
    anyEl.webkitRequestFullscreen();
    return;
  }
  if (anyEl.mozRequestFullScreen) {
    anyEl.mozRequestFullScreen();
    return;
  }
  if (anyEl.msRequestFullscreen) {
    anyEl.msRequestFullscreen();
    return;
  }
  throw new Error("fullscreen-unavailable");
}

async function exitDocumentFullscreen(): Promise<void> {
  const d = document as Document & {
    webkitExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    msExitFullscreen?: () => void;
  };
  if (typeof document.exitFullscreen === "function") {
    await Promise.resolve(document.exitFullscreen());
    return;
  }
  if (d.webkitExitFullscreen) {
    d.webkitExitFullscreen();
    return;
  }
  if (d.mozCancelFullScreen) {
    d.mozCancelFullScreen();
    return;
  }
  if (d.msExitFullscreen) {
    d.msExitFullscreen();
  }
}

function useLocalTime() {
  const [time, setTime] = useState("—");
  const locale = useLocale();

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [locale]);

  return time;
}

const navToggleShape = "rounded-[12px]";

/** Cabeçalho (victor / clínica / registros / vekon): só em mobile, canto superior direito e inferior esquerdo; a partir de `sm`, rectângulos. */
const navToggleShapeHeader =
  "rounded-tr-[12px] rounded-bl-[12px] sm:rounded-none";

const navToggleBase =
  "group inline-flex min-h-[52px] w-auto min-w-[100px] shrink-0 flex-col items-center justify-center border px-2.5 py-1.5 text-[10px] uppercase leading-tight tracking-[0.18em] transition-colors duration-200 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-[#751027]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Blur só no estado inativo: backdrop-filter + fundo sólido no ativo quebra o texto em alguns browsers (Chrome/Windows). */
const navToggleIdle =
  "border-[#751027]/50 bg-white/72 backdrop-blur-sm text-[#791126] hover:border-[#751027] hover:bg-[#791126]/10 hover:text-[#791126]";

const navToggleActive =
  "border-[#751027] bg-[#791126] text-white shadow-[0_14px_28px_rgba(121,17,38,0.18)] [backdrop-filter:none] [-webkit-backdrop-filter:none]";

/** Barra de navegação escura (só mobile): contorno e texto brancos. */
const navToggleBaseMobile =
  "group inline-flex min-h-[52px] w-auto min-w-[100px] shrink-0 flex-col items-center justify-center border px-2.5 py-1.5 text-[10px] uppercase leading-tight tracking-[0.18em] transition-colors duration-200 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/** Botões mais estreitos na barra preta mobile (com ícone Vekon à esquerda). */
const navToggleBaseMobileCompact =
  "group inline-flex min-h-[44px] w-auto min-w-[72px] shrink-0 flex-col items-center justify-center border px-1.5 py-1 text-[9px] uppercase leading-tight tracking-[0.15em] transition-colors duration-200 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const navToggleIdleMobile =
  "border-white/55 bg-transparent text-white hover:border-white hover:bg-white/10";

const navToggleActiveMobile =
  "border-white bg-white text-black shadow-[0_14px_28px_rgba(0,0,0,0.28)] [backdrop-filter:none] [-webkit-backdrop-filter:none]";

type OpenPanel = "victor" | "clinica" | "registros";

interface MainNavigationProps {
  openPanel: OpenPanel;
  vekonOpen: boolean;
  pickPanel: (next: "victor" | "clinica" | "registros") => void;
  setVekonOpen: (open: boolean) => void;
  /** `mobileDark`: fundo preto no header (max-sm). */
  variant?: "light" | "mobileDark";
  /** Barra só mobile: botões menores (ícone Vekon à esquerda no header). */
  compactHeader?: boolean;
}

function MainNavigation({
  openPanel,
  vekonOpen,
  pickPanel,
  setVekonOpen,
  variant = "light",
  compactHeader = false,
}: MainNavigationProps) {
  const t = useTranslations("nav");
  const tb =
    variant === "mobileDark"
      ? compactHeader
        ? navToggleBaseMobileCompact
        : navToggleBaseMobile
      : navToggleBase;
  const ti = variant === "mobileDark" ? navToggleIdleMobile : navToggleIdle;
  const ta = variant === "mobileDark" ? navToggleActiveMobile : navToggleActive;
  const arrowClass =
    compactHeader && variant === "mobileDark"
      ? "header-arrow-mobile-nudge mt-0.5 text-sm leading-none"
      : "mt-0.5 text-base leading-none sm:max-lg:motion-safe:animate-bounce";

  const navJustifyClass =
    compactHeader && variant === "mobileDark"
      ? "w-full justify-center"
      : "justify-center sm:justify-start";

  return (
    <nav
      className={`flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2.5 ${navJustifyClass}`}
      aria-label={t("main")}
    >
      <button
        type="button"
        onClick={() => pickPanel("victor")}
        className={`${tb} ${navToggleShapeHeader} ${openPanel === "victor" ? ta : ti} ${!vekonOpen && openPanel === "victor" ? "max-sm:hidden" : ""}`}
      >
        <span className="text-center">{t("victor")}</span>
        <span className={arrowClass} aria-hidden>
          ↓
        </span>
      </button>
      <button
        type="button"
        onClick={() => pickPanel("clinica")}
        className={`${tb} ${navToggleShapeHeader} ${openPanel === "clinica" ? ta : ti} ${!vekonOpen && openPanel === "clinica" ? "max-sm:hidden" : ""}`}
      >
        <span className="text-center">{t("clinica")}</span>
        <span className={arrowClass} aria-hidden>
          ↓
        </span>
      </button>
      <button
        type="button"
        onClick={() => pickPanel("registros")}
        className={`${tb} ${navToggleShapeHeader} ${openPanel === "registros" ? ta : ti} ${!vekonOpen && openPanel === "registros" ? "max-sm:hidden" : ""}`}
      >
        <span className="min-w-0 text-center">{t("registros")}</span>
        <span className={arrowClass} aria-hidden>
          ↓
        </span>
      </button>
      <button
        type="button"
        onClick={() => setVekonOpen(true)}
        className={`${tb} ${navToggleShapeHeader} ${vekonOpen ? ta : ti} ${vekonOpen ? "max-sm:hidden" : ""}`}
      >
        <span className="text-center">{t("vekon")}</span>
        <span className={arrowClass} aria-hidden>
          ↓
        </span>
      </button>
    </nav>
  );
}

function LocalTimeBlock({ localTime }: { localTime: string }) {
  const t = useTranslations("time");
  return (
    <div
      className="flex w-full shrink-0 flex-col items-center gap-0.5 border-t border-black/[0.08] pt-3 text-center sm:w-auto sm:items-end sm:border-t-0 sm:pt-0 sm:text-right"
      aria-live="polite"
    >
      <span className="block w-full text-[9px] font-medium uppercase tracking-[0.32em] text-black/50">
        {t("local")}
      </span>
      <span className="block w-full font-mono text-[12px] font-semibold tabular-nums tracking-[0.04em] text-black/80">
        {localTime}
      </span>
    </div>
  );
}

/** Marca Vekon + GIF do globo (incl. mobile quando o globo do hero está ativo). */
function HeroVekonCluster({
  nameHover,
  hoverMediaIdx,
  globeHoverGifSrc,
  onOpenVekon,
}: {
  nameHover: boolean;
  hoverMediaIdx: number;
  globeHoverGifSrc: string | null;
  onOpenVekon: () => void;
}) {
  return (
    <div className="relative w-fit shrink-0">
      <VekonHeroMark onActivate={onOpenVekon} />
      <div
        className={`pointer-events-none absolute left-full top-1/2 z-30 ml-3 block w-[min(46vw,300px)] max-w-[min(92vw,300px)] -translate-y-1/2 transition-all duration-500 ease-out sm:ml-4 sm:max-w-[320px] ${
          nameHover && hoverMediaIdx >= 1
            ? "translate-x-0 scale-100 opacity-100"
            : "pointer-events-none translate-x-2 scale-95 opacity-0"
        }`}
        aria-hidden
      >
        {globeHoverGifSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={globeHoverGifSrc}
            src={globeHoverGifSrc}
            alt=""
            className={globeHoverGifClass()}
          />
        ) : null}
      </div>
    </div>
  );
}

function RegistrosVimeoEmbed({
  videoId,
  posterSrc,
  title,
  darkBand = false,
}: {
  videoId: string;
  posterSrc: string;
  title: string;
  darkBand?: boolean;
}) {
  const tVimeo = useTranslations("vimeo");
  const tReg = useTranslations("registros");
  const [embedOn, setEmbedOn] = useState(false);
  /** Fallback quando `requestFullscreen` falha (ex.: iOS Safari). */
  const [mobileOverlayFs, setMobileOverlayFs] = useState(false);
  const [inNativeFs, setInNativeFs] = useState(false);
  /** Fullscreen pedido via API do player Vimeo (`requestFullscreen`). */
  const [vimeoFs, setVimeoFs] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<Player | null>(null);

  const playerSrc = `https://player.vimeo.com/video/${videoId}?dnt=1&title=0&byline=0&portrait=0&responsive=1&playsinline=1&color=171717`;

  /** Modo teatro: sem `max-h` em cima do `aspect-video` — senão o bloco encolhe na largura e aparecem barras laterais.
   *  Em mobile (`max-sm`), sem `max-h` no modo claro: o vídeo usa a largura total em 16:9 sem ser encolhido. */
  const frameClass = darkBand
    ? "relative aspect-video w-full overflow-hidden bg-black ring-1 ring-inset ring-black/30"
    : "relative aspect-video w-full overflow-hidden bg-[#fafafa] sm:max-h-[min(75vh,720px)]";

  const syncNativeFs = useCallback(() => {
    setInNativeFs(!!getFullscreenElement());
  }, []);

  useEffect(() => {
    syncNativeFs();
    document.addEventListener("fullscreenchange", syncNativeFs);
    document.addEventListener(
      "webkitfullscreenchange",
      syncNativeFs as EventListener,
    );
    return () => {
      document.removeEventListener("fullscreenchange", syncNativeFs);
      document.removeEventListener(
        "webkitfullscreenchange",
        syncNativeFs as EventListener,
      );
    };
  }, [syncNativeFs]);

  useEffect(() => {
    if (!embedOn) {
      const p = vimeoPlayerRef.current;
      vimeoPlayerRef.current = null;
      if (p) void p.destroy();
      setVimeoFs(false);
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    const onVimeoFullscreenChange = (data: { fullscreen: boolean }) => {
      setVimeoFs(data.fullscreen);
    };

    void import("@vimeo/player").then(({ default: VimeoPlayer }) => {
      const el = iframeRef.current;
      if (cancelled || !el) return;
      try {
        const player = new VimeoPlayer(el);
        if (cancelled) {
          void player.destroy();
          return;
        }
        vimeoPlayerRef.current = player;
        player.on("fullscreenchange", onVimeoFullscreenChange);
      } catch {
        vimeoPlayerRef.current = null;
      }
    });

    return () => {
      cancelled = true;
      const p = vimeoPlayerRef.current;
      vimeoPlayerRef.current = null;
      if (p) {
        p.off("fullscreenchange", onVimeoFullscreenChange);
        void p.destroy();
      }
      setVimeoFs(false);
    };
  }, [embedOn, videoId]);

  useEffect(() => {
    const inFallback = mobileOverlayFs && !inNativeFs;
    if (!inFallback) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOverlayFs(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOverlayFs, inNativeFs]);

  const exitMobileFs = useCallback(async () => {
    const vp = vimeoPlayerRef.current;
    if (vp) {
      try {
        if (await vp.getFullscreen()) {
          await vp.exitFullscreen();
        }
      } catch {
        /* */
      }
    }
    setVimeoFs(false);
    if (getFullscreenElement()) {
      await exitDocumentFullscreen().catch(() => {});
    }
    setMobileOverlayFs(false);
    syncNativeFs();
  }, [syncNativeFs]);

  const enterMobileFs = useCallback(async () => {
    const vp = vimeoPlayerRef.current;
    if (vp) {
      try {
        await vp.requestFullscreen();
        return;
      } catch {
        /* continuar para fullscreen do browser / overlay */
      }
    }
    const candidates = [iframeRef.current, videoStageRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    for (const el of candidates) {
      try {
        await requestElementFullscreen(el);
        return;
      } catch {
        /* tentar iframe ou stage seguinte, depois overlay */
      }
    }
    setMobileOverlayFs(true);
  }, []);

  const toggleMobileFs = useCallback(async () => {
    if (vimeoFs) {
      await exitMobileFs();
      return;
    }
    const vp = vimeoPlayerRef.current;
    if (vp) {
      try {
        if (await vp.getFullscreen()) {
          await exitMobileFs();
          return;
        }
      } catch {
        /* */
      }
    }
    if (getFullscreenElement()) {
      await exitMobileFs();
      return;
    }
    if (mobileOverlayFs) {
      await exitMobileFs();
      return;
    }
    await enterMobileFs();
  }, [enterMobileFs, exitMobileFs, mobileOverlayFs, vimeoFs]);

  const fsActiveUi = inNativeFs || mobileOverlayFs || vimeoFs;

  return (
    <div
      className={
        mobileOverlayFs && !inNativeFs
          ? "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          : "relative w-full"
      }
    >
      {mobileOverlayFs && !inNativeFs ? (
        <button
          type="button"
          onClick={() => void exitMobileFs()}
          className="absolute right-3 top-[max(0.5rem,env(safe-area-inset-top))] z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 md:hidden"
          aria-label={tVimeo("closeFs")}
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>
      ) : null}
      <div
        ref={videoStageRef}
        className={
          mobileOverlayFs && !inNativeFs
            ? "relative mx-auto aspect-video w-[min(100vw,calc(100dvh*16/9))] max-h-[100dvh] shrink-0 overflow-hidden rounded-sm bg-black"
            : frameClass
        }
      >
        {embedOn ? (
          <>
            <iframe
              ref={iframeRef}
              src={playerSrc}
              className={
                darkBand
                  ? "absolute inset-0 h-full w-full border-0 bg-black"
                  : "absolute inset-0 h-full w-full border-0 bg-[#fafafa]"
              }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title}
            />
            <button
              type="button"
              onClick={() => void toggleMobileFs()}
              className="absolute left-2 top-2 z-[50] flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-[2px] transition hover:bg-black/70 md:hidden"
              aria-label={
                fsActiveUi ? tVimeo("exitFs") : tVimeo("enterFs")
              }
              title={fsActiveUi ? tVimeo("fsTitleOn") : tVimeo("fsTitleOff")}
            >
              {fsActiveUi ? (
                <Minimize2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              ) : (
                <Maximize2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </>
        ) : (
          <>
            <Image
              src={posterSrc}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/25"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => setEmbedOn(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition hover:bg-white/5"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur-[1px]">
                <Play
                  className="ml-0.5 h-8 w-8 drop-shadow-md opacity-95"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/85 drop-shadow">
                {tReg("playVideo")}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Modo teatro: faixa preta de margem a margem; ícone lua (sem slider). */
function RegistrosTheaterToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("registros");
  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={enabled ? t("theaterOn") : t("theaterOff")}
      title={enabled ? t("theaterTitleOn") : t("theaterTitleOff")}
      onClick={onToggle}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
        enabled
          ? "border-black/50 bg-black text-white shadow-sm"
          : "border-black/15 bg-white text-black/50 hover:border-black/30 hover:text-black/75"
      }`}
    >
      <Moon className="h-[17px] w-[17px]" strokeWidth={1.75} aria-hidden />
    </button>
  );
}

function RegistrosVideoThumbnail({
  slotLabel,
  posterSrc,
  onSelect,
}: {
  slotLabel: string;
  posterSrc: string;
  onSelect: () => void;
}) {
  const t = useTranslations("registros");
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex w-full flex-col border border-black/10 bg-[#fafafa] text-left transition hover:border-black/25 hover:bg-[#f5f5f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa]"
      aria-label={t("thumbAria", { slot: slotLabel })}
    >
      <div className="flex items-baseline justify-between gap-2 border-b border-black/10 px-3 py-2.5 sm:px-4 sm:py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/45">
        <span>{slotLabel}</span>
        <span>{t("video")}</span>
      </div>
      <div className="relative aspect-video w-full overflow-hidden bg-[#eaeaea] sm:max-h-[220px]">
        <Image
          src={posterSrc}
          alt=""
          fill
          className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, 33vw"
          priority={false}
        />
        <div
          className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35"
          aria-hidden
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/45 backdrop-blur-[1px] transition group-hover:scale-105 group-hover:bg-white/30">
            <Play
              className="ml-0.5 h-5 w-5 text-white drop-shadow-md"
              strokeWidth={1.5}
              aria-hidden
            />
          </span>
        </span>
      </div>
    </button>
  );
}

/** Estrela de 8 pontas com raios ligeiramente irregulares (vetor, não imagem). */
function SpinStar({ className }: { className?: string }) {
  return (
    <svg
      className={`star-spin inline-block h-[0.74em] w-[0.74em] shrink-0 translate-y-[0.04em] align-middle text-black/25 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12,2.4 L13.38,8.67 L19.21,4.79 L16.07,10.32 L21.9,12 L15.51,13.45 L19.35,19.35 L13.61,15.88 L12,21.7 L10.66,15.23 L4.86,19.14 L7.84,13.72 L2.2,12 L8.4,10.51 L4.72,4.72 L10.43,8.21z" />
    </svg>
  );
}

export default function HomePage() {
  const siteLocale = useLocale() as AppLocale;
  const tHero = useTranslations("hero");
  const tVictor = useTranslations("victor");
  const tClinica = useTranslations("clinica");
  const tReg = useTranslations("registros");
  const tVekon = useTranslations("vekon");
  const tProfile = useTranslations("profile");
  const [vekonOpen, setVekonOpen] = useState(false);
  const [nameHover, setNameHover] = useState(false);
  /** 0 = sem mídia ao lado do nome; 1 = GIF (hover do globo). */
  const [hoverMediaIdx, setHoverMediaIdx] = useState(0);
  const localTime = useLocalTime();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const openPanel: OpenPanel =
    pathname === "/clinica"
      ? "clinica"
      : pathname === "/registros"
        ? "registros"
        : "victor";

  const isVictorSugestoesView = pathname === "/victor/sugestoes";
  const isVictorRespostasView = pathname === "/victor/respostas";
  /** Índice em `REGISTROS_VIDEOS` mostrado no bloco grande; miniaturas são os outros. */
  const [registrosFeaturedIdx, setRegistrosFeaturedIdx] = useState(0);
  /** Faixa preta em volta do vídeo em destaque (interruptor ao lado de «vídeo»). */
  const [registrosBandDark, setRegistrosBandDark] = useState(
    () => Boolean(REGISTROS_VIDEOS[0]?.darkBand),
  );
  /** Subsecção em «victor → Informações Gerais»: Notas | Incomum (apreciar) | Utilidades (entender). */
  const [victorInfoTab, setVictorInfoTab] = useState<
    "notas-gerais" | "incomum" | "utilidades"
  >("notas-gerais");
  /** No telemóvel, o foco no <button> pós-toque desloca a janela; evitamos o scroll-into-view do focus. */
  const onVictorInfoTabButtonDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const registrosFeaturedRef = useRef<HTMLDivElement>(null);
  /** Evita saltar para a secção victor no primeiro paint (mantém o hero visível). */
  const skipInitialVictorScrollRef = useRef(true);

  function selectRegistrosFeatured(nextIdx: number) {
    setRegistrosFeaturedIdx(nextIdx);
    requestAnimationFrame(() => {
      registrosFeaturedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }

  const registrosFeatured = REGISTROS_VIDEOS[registrosFeaturedIdx];
  const registrosThumbEntries = REGISTROS_VIDEOS.map((v, i) => ({
    video: v,
    index: i,
  })).filter(({ index }) => index !== registrosFeaturedIdx);

  useEffect(() => {
    setRegistrosBandDark(
      Boolean(REGISTROS_VIDEOS[registrosFeaturedIdx]?.darkBand),
    );
  }, [registrosFeaturedIdx]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab === "notas-gerais" ||
      tab === "incomum" ||
      tab === "utilidades"
    ) {
      setVictorInfoTab(tab);
    }
  }, [searchParams]);

  const [isMdViewport, setIsMdViewport] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    function syncMd() {
      setIsMdViewport(mq.matches);
    }
    syncMd();
    mq.addEventListener("change", syncMd);
    return () => mq.removeEventListener("change", syncMd);
  }, []);

  /** Modo teatro (faixa preta) só em desktop; no mobile fica só o vídeo + tela cheia por overlay. */
  const registrosBandEffective = registrosBandDark && isMdViewport;

  /** Migra URLs antigas com hash (#clinica, etc.) para rotas sem `#`. */
  useEffect(() => {
    const raw = window.location.hash.slice(1).toLowerCase();
    if (raw !== "clinica" && raw !== "registros" && raw !== "victor") {
      return;
    }
    const path = raw === "victor" ? "/" : `/${raw}`;
    router.replace(path);
  }, [router]);

  useEffect(() => {
    if (skipInitialVictorScrollRef.current && openPanel === "victor") {
      skipInitialVictorScrollRef.current = false;
      return;
    }
    skipInitialVictorScrollRef.current = false;
    const runScroll = () => {
      if (pathname === "/victor/sugestoes" || pathname === "/victor/respostas") {
        const intro =
          pathname === "/victor/respostas"
            ? document.getElementById("victor-respostas-intro")
            : document.getElementById("victor-sugestoes-intro");
        if (!intro) return;
        const stickyClearancePx = window.matchMedia("(min-width: 640px)").matches
          ? 80
          : 64;
        const top =
          intro.getBoundingClientRect().top +
          window.scrollY -
          stickyClearancePx;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return;
      }
      document
        .getElementById(openPanel)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    requestAnimationFrame(() => {
      if (
        pathname === "/victor/sugestoes" ||
        pathname === "/victor/respostas"
      ) {
        requestAnimationFrame(runScroll);
      } else {
        runScroll();
      }
    });
  }, [openPanel, pathname]);

  useEffect(() => {
    if (!vekonOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVekonOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vekonOpen]);

  useEffect(() => {
    if (vekonOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [vekonOpen]);

  const globeHoverGifSrc =
    hoverMediaIdx >= 1
      ? HOVER_GIFS[Math.min(hoverMediaIdx - 1, HOVER_GIFS.length - 1)]
      : null;

  /** Victor é sempre o estado “em repouso”; clínica/registros ao desmarcar voltam a victor. */
  function pickPanel(next: "victor" | "clinica" | "registros") {
    if (next === "victor") {
      router.push("/");
      return;
    }
    if (openPanel === next) {
      router.push("/");
      return;
    }
    router.push(`/${next}`);
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-visible overflow-y-visible bg-white font-sans text-black selection:bg-[#791126] selection:text-white">
      {/* Mobile (< lg): secção activa antes do hero; desktop: header → hero → secção. */}
      {/* Mobile: barra única sticky (só nav). Desktop: nav + hora na mesma barra sticky. */}
      <header className="order-0 shrink-0 bg-white">
        <div className="sticky top-0 z-40 border-b border-white/12 bg-black py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.06)] sm:hidden">
          <div className="mx-auto grid w-full max-w-[1600px] min-w-0 grid-cols-[auto_1fr_auto] items-center gap-x-2 px-3">
            <div className="flex shrink-0 justify-start">
              <VekonHeaderMark
                active={vekonOpen}
                onActivate={() => setVekonOpen(true)}
              />
            </div>
            <div className="flex min-w-0 justify-center">
              <MainNavigation
                compactHeader
                variant="mobileDark"
                openPanel={openPanel}
                vekonOpen={vekonOpen}
                pickPanel={pickPanel}
                setVekonOpen={setVekonOpen}
              />
            </div>
            <div className="h-10 w-10 shrink-0" aria-hidden />
          </div>
        </div>

        <div className="sticky top-0 z-40 hidden min-w-0 w-full flex-col gap-2 border-b border-black/[0.08] bg-white py-2 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:pt-2.5 sm:pb-[calc(0.625rem+10px)] lg:py-2.5">
          <div className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-4 px-5 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-0 sm:px-8 md:px-12">
            <MainNavigation
              openPanel={openPanel}
              vekonOpen={vekonOpen}
              pickPanel={pickPanel}
              setVekonOpen={setVekonOpen}
            />
            <LocalTimeBlock localTime={localTime} />
          </div>
        </div>
      </header>

      {/* Mobile e até lg: globo + identidade cursiva no topo; o hero (#top) fica abaixo sem repetir o título. */}
      <section className="order-1 bg-[#f4f2f1] px-5 py-3.5 sm:px-8 sm:py-4 md:px-12 md:py-4 lg:hidden">
        <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center justify-center gap-0">
          <div
            role="button"
            tabIndex={0}
            className="relative z-30 shrink-0 cursor-default rounded-full px-1.5 pt-1.5 pb-0 outline-none focus-visible:ring-2 focus-visible:ring-[#751027]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2f1]"
            onMouseEnter={() => {
              setHoverMediaIdx(1);
              setNameHover(true);
            }}
            onMouseLeave={() => {
              setNameHover(false);
              setHoverMediaIdx(0);
            }}
            onFocus={() => {
              setHoverMediaIdx(1);
              setNameHover(true);
            }}
            onBlur={() => {
              setNameHover(false);
              setHoverMediaIdx(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setHoverMediaIdx(1);
                setNameHover(true);
              }
            }}
            aria-label={tHero("globeHint")}
          >
            <Globe
              className="pointer-events-none h-4 w-4 text-[#751027]/55"
              strokeWidth={1.25}
              aria-hidden
            />
          </div>
          <div className="relative -mt-2 w-full overflow-x-visible text-center">
            <div className="group/hovername relative inline-block cursor-default overflow-visible">
              <h1 className="relative z-10 m-0 text-[clamp(2.5rem,10vw,7rem)] font-normal leading-[0.78] tracking-[-0.02em] [font-family:var(--font-signature)]">
                <span className="flex flex-col items-end gap-0">
                  <span className="flex items-baseline gap-[0.14em] text-black/18">
                    <SpinStar className="shrink-0" />
                    <span>{tHero("nameFirst")}</span>
                  </span>
                  <span className="-mt-[0.18em] block text-black">
                    {tHero("nameLast")}
                  </span>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section
        id="top"
        className="relative order-2 isolate flex w-full min-w-0 flex-col overflow-visible bg-[#f4f2f1] px-5 pb-5 pt-0 max-sm:pb-[35px] sm:px-8 sm:pb-6 md:px-12 lg:order-1 lg:min-h-0 lg:pt-2 lg:pb-6 xl:min-h-[calc(90lvh-5.5rem)]"
      >
        {/* Grelha + vinhetas só no hero; o resto da página fica branco */}
        <HeroBackground />

        {/* lg+: todo o bloco visual do hero ~5% menor (tipografia, cartão, vinhetas, Vekon). */}
        <div className="relative z-10 flex w-full min-w-0 max-w-full flex-col overflow-visible lg:flex-none">
        <DigitalWineArtwork className="z-[0] w-[min(820px,48vw)] max-w-[min(100%,820px)] lg:max-xl:w-[min(620px,44vw)] xl:w-[min(1000px,52vw)] 2xl:w-[min(1120px,56vw)]" />

        {/* Centro: título + mídias; cartão de perfil */}
        <div className="relative z-10 mt-1 flex min-w-0 w-full max-w-full flex-col justify-start overflow-visible py-1.5 pt-1.5 sm:mt-2 sm:py-4 sm:pt-1 lg:mt-[calc(1rem+30px)] lg:justify-start lg:py-4 lg:pt-1 lg:pb-2">
          <div className="hero-cluster-shift mx-auto grid min-w-0 w-full max-w-7xl grid-cols-1 items-start justify-items-stretch gap-4 sm:gap-6 lg:mx-0 lg:grid-cols-24 lg:items-start lg:gap-x-4 lg:gap-y-5 lg:max-xl:grid-cols-1 lg:max-xl:justify-items-start lg:max-xl:gap-y-8 lg:max-xl:gap-x-0 lg:max-xl:mx-0 xl:mx-auto xl:grid-cols-24 xl:gap-x-10 xl:max-2xl:gap-x-14 2xl:gap-x-12">
            <div className="relative order-1 hidden min-w-0 flex-col items-center sm:flex lg:order-1 lg:row-start-1 lg:col-span-15 lg:max-xl:col-span-1 lg:max-xl:w-full lg:max-xl:items-start lg:max-xl:self-start xl:col-span-15">
              {/* Largura máxima estável: o globo e o título partilham o mesmo eixo central */}
              <div
                className="hero-name-lockup relative z-[25] mx-auto flex w-full max-w-[min(100%,42rem)] flex-col items-center px-1 sm:max-w-[min(100%,46rem)] sm:px-0 lg:max-xl:mx-0 lg:max-xl:items-start lg:max-xl:pr-2 xl:mx-auto xl:items-center"
              >
              <div
                role="button"
                tabIndex={0}
                className="relative z-30 max-lg:hidden cursor-default rounded-full p-3 outline-none focus-visible:ring-2 focus-visible:ring-[#751027]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2f1] max-lg:mb-0 max-lg:p-2 max-sm:p-1.5 lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:max-xl:relative lg:max-xl:left-auto lg:max-xl:translate-x-0 sm:p-4"
                onMouseEnter={() => {
                  setHoverMediaIdx(1);
                  setNameHover(true);
                }}
                onMouseLeave={() => {
                  setNameHover(false);
                  setHoverMediaIdx(0);
                }}
                onFocus={() => {
                  setHoverMediaIdx(1);
                  setNameHover(true);
                }}
                onBlur={() => {
                  setNameHover(false);
                  setHoverMediaIdx(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setHoverMediaIdx(1);
                    setNameHover(true);
                  }
                }}
                aria-label={tHero("globeHint")}
              >
                <Globe
                  className="pointer-events-none h-4 w-4 text-[#751027]/55"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </div>

              <div className="mb-3 mt-6 hidden max-w-[min(92vw,36rem)] flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-black/28 sm:flex-row sm:text-center lg:mt-10 lg:flex">
                <Sparkles
                  className="hidden h-3 w-3 shrink-0 text-[#751027]/45 lg:inline"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-balance text-center leading-relaxed">
                  {tHero("analyst")}
                </span>
              </div>

              <div className="relative w-full overflow-x-visible text-center max-lg:-mt-1 max-sm:-mt-0.5 max-lg:hidden lg:max-xl:text-left xl:text-center">
                <div className="group/hovername relative inline-block cursor-default overflow-visible lg:max-xl:mr-auto xl:mx-auto">
                  <h1 className="relative z-10 text-[clamp(2.5rem,10vw,7rem)] font-semibold leading-[0.88] tracking-[-0.06em] sm:text-[clamp(2.5rem,11vw,7.5rem)] lg:max-xl:text-[clamp(2.05rem,5.25vw,5.75rem)] xl:text-[clamp(2rem,6.25vw,6.25rem)] 2xl:text-[clamp(2.35rem,8vw,7rem)] min-[1800px]:text-[clamp(2.5rem,11vw,7.5rem)]">
                    <span className="flex flex-col items-end lg:max-xl:items-start xl:items-end">
                      <span className="flex items-baseline gap-[0.14em] text-black/18">
                        <SpinStar className="shrink-0" />
                        <span>{tHero("nameFirst")}</span>
                      </span>
                      <span className="block text-black">
                        {tHero("nameLast")}
                      </span>
                    </span>
          </h1>
                </div>
              </div>

              <footer className="mt-2 hidden w-full justify-center lg:mt-8 lg:flex lg:max-xl:justify-start xl:justify-center">
                {INSTAGRAM_URL ? (
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-[#751027]/25 bg-white/55 px-5 py-2 text-[12px] uppercase tracking-[0.28em] text-[#751027] backdrop-blur-sm transition hover:bg-white/75"
                  >
                    {INSTAGRAM_LINK_LABEL}
                  </a>
                ) : null}
              </footer>

              </div>
            </div>

            <aside
              className={`relative z-20 order-2 min-w-0 w-full max-w-full -translate-x-[7px] translate-y-[10px] overflow-x-hidden overflow-y-visible rounded-tr-2xl rounded-bl-2xl border border-[#751027]/10 bg-[rgba(255,251,252,0.82)] p-4 shadow-[0_22px_54px_rgba(64,21,29,0.08)] backdrop-blur-md sm:-translate-y-[18px] lg:z-10 lg:translate-x-0 lg:bg-[rgba(255,251,252,0.97)] lg:backdrop-blur-none lg:translate-y-0 ${
                openPanel === "victor" || openPanel === "clinica"
                  ? "max-lg:order-3 sm:max-lg:mt-3"
                  : ""
              } lg:order-2 lg:col-span-9 lg:row-start-1 lg:self-start lg:max-xl:col-span-1 lg:max-xl:max-w-xl lg:max-xl:justify-self-start lg:max-xl:translate-x-0 xl:col-span-9 xl:max-2xl:-translate-x-[75px] xl:max-2xl:max-w-[min(100%,26rem)] 2xl:translate-x-0 2xl:max-w-full lg:p-5`}
              aria-label={tHero("cardAria")}
            >
              <div className="min-w-0 overflow-x-hidden overflow-y-visible">
                <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] md:gap-5">
                  <div className="relative z-[35] mx-auto shrink-0 overflow-hidden md:mx-0">
                    <div className="relative mx-auto w-full max-w-[180px] shrink-0 overflow-hidden bg-neutral-100 max-lg:aspect-square max-lg:h-36 max-lg:w-36 max-lg:max-w-none max-lg:rounded-full max-lg:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.75)] max-lg:ring-2 max-lg:ring-black/10 lg:mx-0 lg:aspect-[5/4] lg:max-w-none lg:rounded-lg lg:shadow-none lg:ring-0">
                      <Image
                        src={REGISTROS_INTRO_IMAGE}
                        alt=""
                        fill
                        className="object-cover object-[center_38%]"
                        sizes="(max-width: 1024px) 200px, 120px"
                        priority={false}
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h2 className="translate-y-[3px] text-lg font-semibold leading-snug tracking-[-0.04em] text-black sm:text-xl">
                      {tProfile("name")}
                    </h2>
                    <div className="-translate-y-[3px]">
                      <p className="mt-3 text-left text-[13px] leading-[1.7] text-black/58 [overflow-wrap:anywhere] hyphens-auto">
                        {tProfile("bio")}
                      </p>
                      <div className="mt-4 hidden min-w-0 flex-col gap-3 lg:flex lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-x-4 lg:gap-y-2">
                        {GOODREADS_URL ? (
                          <a
                            href={GOODREADS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-0 max-w-full break-words text-[12px] uppercase tracking-[0.18em] text-[#751027] underline decoration-[#751027]/25 underline-offset-4 transition hover:text-[#791126] hover:decoration-[#791126] lg:tracking-[0.24em]"
                          >
                            {tProfile("goodreads")}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Victor / Clínica (mobile): Vekon antes do cartão. Registros: cartão antes. Desktop: linha abaixo. */}
            <div
              className={`relative order-3 mt-6 flex w-full justify-center lg:mx-auto lg:mt-7 lg:order-3 lg:col-span-24 lg:row-start-2 lg:max-w-[min(100%,52rem)] lg:max-xl:col-span-1 lg:max-xl:mx-0 lg:max-xl:w-full lg:max-xl:max-w-none lg:max-xl:justify-start xl:col-span-24 ${
                openPanel === "victor" || openPanel === "clinica"
                  ? "max-lg:order-2 sm:max-lg:mt-3"
                  : ""
              }`}
            >
              <HeroVekonCluster
                nameHover={nameHover}
                hoverMediaIdx={hoverMediaIdx}
                globeHoverGifSrc={globeHoverGifSrc}
                onOpenVekon={() => setVekonOpen(true)}
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      {openPanel === "victor" ? (
        <section
          id="victor"
          className={`relative z-10 order-1 border-t border-black/10 bg-white px-5 pb-[5px] pt-5 max-sm:pb-[20px] sm:px-8 sm:max-lg:pb-[45px] md:px-12 lg:order-2 lg:pb-10 lg:pt-12 ${
            isVictorSugestoesView || isVictorRespostasView
              ? "scroll-mt-20 sm:scroll-mt-24"
              : "scroll-mt-6"
          }`}
        >
          <div className="mx-auto w-full max-w-[40rem]">
            {isVictorSugestoesView ? (
              <>
                <VictorSugestoesPanel />
                <div className="hidden lg:block">
                  <SiteSocialFooter />
                </div>
              </>
            ) : isVictorRespostasView ? (
              <>
                <VictorRespostasPanel />
                <div className="hidden lg:block">
                  <SiteSocialFooter />
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">
                    {tVictor("label")}
                  </p>
                  <h2 className="mt-1.5 font-sans font-semibold leading-[1.05] tracking-[-0.06em] text-black max-sm:text-[clamp(1.1rem,3.3vw,1.925rem)] sm:mt-4 sm:text-[clamp(2rem,6vw,3.5rem)]">
                    <span className="sm:hidden">
                      {tVictor("infoTitleShort")}
                    </span>
                    <span className="hidden sm:inline">
                      {tVictor("infoTitle")}
                    </span>
                  </h2>
                </div>

                <div
                  className="mt-2.5 flex w-full flex-col items-center gap-2 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2"
                  role="tablist"
                  aria-label={tVictor("tabsAria")}
                >
                  <div
                    className="flex w-full max-sm:min-w-0 max-sm:justify-center max-sm:gap-2 sm:contents"
                    role="presentation"
                  >
                    <button
                      type="button"
                      role="tab"
                      id="victor-tab-notas"
                      aria-selected={victorInfoTab === "notas-gerais"}
                      aria-controls="victor-panel-notas"
                      onMouseDown={onVictorInfoTabButtonDown}
                      onClick={() => setVictorInfoTab("notas-gerais")}
                      className={
                        victorInfoTab === "notas-gerais"
                          ? `${navToggleBase} ${navToggleShape} ${navToggleActive} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                          : `${navToggleBase} ${navToggleShape} ${navToggleIdle} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                      }
                    >
                      {tVictor("tabNotas")}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      id="victor-tab-incomum"
                      aria-selected={victorInfoTab === "incomum"}
                      aria-controls="victor-panel-incomum"
                      onMouseDown={onVictorInfoTabButtonDown}
                      onClick={() => setVictorInfoTab("incomum")}
                      className={
                        victorInfoTab === "incomum"
                          ? `${navToggleBase} ${navToggleShape} ${navToggleActive} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                          : `${navToggleBase} ${navToggleShape} ${navToggleIdle} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                      }
                    >
                      {tVictor("tabIncomum")}
                    </button>
                  </div>
                  <button
                    type="button"
                    role="tab"
                    id="victor-tab-utilidades"
                    aria-selected={victorInfoTab === "utilidades"}
                    aria-controls="victor-panel-utilidades"
                    onMouseDown={onVictorInfoTabButtonDown}
                    onClick={() => setVictorInfoTab("utilidades")}
                    className={
                      victorInfoTab === "utilidades"
                        ? `${navToggleBase} ${navToggleShape} ${navToggleActive} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                        : `${navToggleBase} ${navToggleShape} ${navToggleIdle} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                    }
                  >
                    {tVictor("tabUtil")}
                  </button>
                </div>

                <div className="mx-auto mt-8 w-full border-t border-black/10 pt-8 sm:mt-10 sm:pt-10">
                  {victorInfoTab === "notas-gerais" ? (
                    <div
                      id="victor-panel-notas"
                      role="tabpanel"
                      aria-labelledby="victor-tab-notas"
                    >
                      <div className="rounded-lg bg-[#f4f4f5] p-4 sm:p-6">
                        <PostsFeed
                          posts={getPostsForSection("notas-gerais", siteLocale)}
                          feedId="notas-gerais"
                          hideSearchAndCategoryOnMobile
                        />
                      </div>
                    </div>
                  ) : victorInfoTab === "incomum" ? (
                    <div
                      id="victor-panel-incomum"
                      role="tabpanel"
                      aria-labelledby="victor-tab-incomum"
                    >
                      <p className="mx-auto mb-0 hidden max-w-2xl text-center text-[15px] leading-[1.8] text-black [text-wrap:pretty] sm:max-w-3xl md:mb-8 md:block">
                        {tVictor("incomumIntro")}
                      </p>
                      <div className="rounded-lg bg-[#f4f4f5] p-4 sm:p-6">
                        <PostsFeed
                          posts={getPostsForSection("apreciar", siteLocale)}
                          feedId="apreciar"
                          incomumBucketToggle
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      id="victor-panel-utilidades"
                      role="tabpanel"
                      aria-labelledby="victor-tab-utilidades"
                    >
                      <p className="mx-auto max-w-2xl text-center text-[15px] leading-[1.8] text-black [text-wrap:pretty] sm:max-w-3xl">
                        {tVictor("utilIntro")}
                      </p>

                      <div className="mt-8 rounded-lg bg-[#f4f4f5] p-4 sm:p-6">
                        <PostsFeed
                          posts={getPostsForSection("entender", siteLocale)}
                          feedId="entender"
                          utilidadeBucketToggle
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg:block">
                  <SiteSocialFooter />
                </div>
              </>
            )}
          </div>
        </section>
      ) : null}

      {openPanel === "clinica" ? (
        <section
          id="clinica"
          className="relative z-10 order-1 scroll-mt-6 border-t border-black/10 bg-white px-5 pb-[5px] pt-5 max-sm:pb-[20px] sm:px-8 sm:max-lg:pb-[45px] md:px-12 lg:order-2 lg:pb-10 lg:pt-12"
        >
          <div className="mx-auto w-full max-w-[40rem]">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">
                {tClinica("label")}
              </p>
              <h2 className="mt-3 font-sans text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-black sm:mt-4">
                {tClinica("title")}
              </h2>
            </div>

            <div className="mx-auto mt-8 w-full border-t border-black/10 pt-8 sm:mt-10 sm:pt-10">
              <div className="rounded-lg bg-[#f4f4f5] p-4 sm:p-6">
                <PostsFeed
                  posts={getPostsForSection("clinica", siteLocale)}
                  feedId="clinica"
                />
              </div>
            </div>

            <div className="hidden lg:block">
              <SiteSocialFooter />
            </div>
          </div>
        </section>
      ) : null}

      {openPanel === "registros" ? (
        <section
          id="registros"
          className="relative z-10 order-1 scroll-mt-6 overflow-x-hidden border-t border-black/10 bg-white px-5 pb-[5px] pt-5 max-sm:pb-[20px] sm:px-8 sm:max-lg:pb-[45px] md:px-12 lg:order-2 lg:pb-10 lg:pt-12"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">
                {tReg("label")}
          </p>
        </div>
          </div>

          <div
            className={
              registrosBandEffective
                ? "relative z-[1] mt-4 lg:mt-10 w-screen max-w-[100vw] bg-black ml-[calc(50%-50vw)]"
                : "mx-auto mt-4 lg:mt-10 max-w-6xl"
            }
          >
            <div
              className={
                registrosBandEffective
                  ? "mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-12"
                  : ""
              }
            >
              <div
                ref={registrosFeaturedRef}
                className={`overflow-hidden border ${
                  registrosBandEffective
                    ? "rounded-tr-2xl rounded-br-2xl border-white/10 bg-black"
                    : "border-black/10 bg-[#fafafa]"
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-3 border-b px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] sm:px-5 sm:py-4 ${
                    registrosBandEffective
                      ? "border-black/10 bg-white text-black/45"
                      : "border-black/10 text-black/45"
                  }`}
                >
                  <span>{registrosFeatured.slot}</span>
                  <div className="flex items-center gap-3">
                    <span>{tReg("video")}</span>
                    <span className="hidden md:inline-flex">
                      <RegistrosTheaterToggle
                        enabled={registrosBandDark}
                        onToggle={() => setRegistrosBandDark((v) => !v)}
                      />
                    </span>
                  </div>
                </div>
                <div className={registrosBandEffective ? "bg-black py-[20px]" : ""}>
                  <div className="mx-auto w-full lg:w-[85%]">
                    <RegistrosVimeoEmbed
                      key={registrosFeatured.vimeoId}
                      videoId={registrosFeatured.vimeoId}
                      posterSrc={registrosFeatured.poster}
                      title={tReg("videoTitle", {
                        slot: registrosFeatured.slot,
                      })}
                      darkBand={registrosBandEffective}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl">
            {registrosThumbEntries.length > 0 ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {registrosThumbEntries.map(({ video, index }) => (
                  <li key={video.vimeoId}>
                    <RegistrosVideoThumbnail
                      slotLabel={video.slot}
                      posterSrc={video.poster}
                      onSelect={() => selectRegistrosFeatured(index)}
                    />
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="hidden lg:block">
              <SiteSocialFooter layout="registros" />
            </div>
          </div>
        </section>
      ) : null}

      {/* Mobile (< lg): rodapé social depois do hero; no desktop o mesmo bloco fica no fim de cada secção. */}
      <div className="order-3 shrink-0 max-sm:pb-[15px] max-sm:px-0 sm:px-8 md:px-12 sm:max-lg:mt-2 lg:hidden">
        <SiteSocialFooter
          afterHeroStack
          profileLinks
          layout={openPanel === "registros" ? "registros" : "default"}
        />
      </div>

      <AnimatePresence>
        {vekonOpen ? (
          <motion.div
            key="vekon-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vekon-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
              aria-label={tVekon("closeDialog")}
              onClick={() => setVekonOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-md rounded-none rounded-tr-[12px] rounded-bl-[12px] border border-black/15 bg-[#fafafa] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
            >
              <button
                type="button"
                onClick={() => setVekonOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-black/50 transition hover:bg-black/5 hover:text-black"
                aria-label={tVekon("closePanel")}
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/45">
                {tVekon("label")}
              </p>
              <h2
                id="vekon-title"
                className="mt-4 text-2xl font-medium tracking-[-0.03em]"
              >
                {tVekon("title")}
              </h2>
              <p className="mt-4 text-[14px] leading-[1.75] text-black/65">
                {tVekon("body")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={VEKON_URL}
            target="_blank"
            rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border-0 bg-black px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white shadow-[0_0_0_1px_rgb(0,0,0)] transition hover:bg-white hover:text-black hover:shadow-[0_0_0_1px_rgb(0,0,0)]"
                >
                  {tVekon("openPage")}
                </a>
                <button
                  type="button"
                  onClick={() => setVekonOpen(false)}
                  className="rounded-full border-0 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/70 shadow-[0_0_0_1px_rgb(0,0,0,0.2)] transition hover:shadow-[0_0_0_1px_rgb(0,0,0)] hover:text-black"
                >
                  {tVekon("close")}
                </button>
        </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </main>
  );
}
