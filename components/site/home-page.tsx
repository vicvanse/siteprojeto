"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Clapperboard,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Moon,
  Play,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { HeroBackground } from "@/components/site/hero-background";
import { HeaderLocaleSelect } from "@/components/site/header-locale-select";
import { ProjectHexMark } from "@/components/site/project-hex-mark";
import { VekonHeroMark } from "@/components/site/vekon-hero-mark";
import { SiteSocialFooter } from "@/components/site/site-social-footer";
import { ImagePostCard } from "@/components/victor/image-post-card";
import { TextPostCard } from "@/components/victor/text-post-card";
import {
  PostsFeed,
  UTILIDADE_BUCKETS_WITHOUT_TEXTOS,
} from "@/components/victor/posts-feed";
import { VictorRespostasPanel } from "@/components/victor/victor-respostas-panel";
import { VictorSugestoesPanel } from "@/components/victor/victor-sugestoes-panel";
import {
  getPostsForSection,
  getUtilidadeKind,
  type VictorFeedPost,
} from "@/data/victor-notes-posts";
import { formatPostDateForLocale } from "@/lib/victor-post-i18n";
import {
  INSTAGRAM_URL,
  INSTAGRAM_LINK_LABEL,
} from "@/lib/site-constants";
import { VICTOR_IMAGE_QUALITY_MAIN } from "@/lib/victor-image-quality";
import type Player from "@vimeo/player";

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

/** Estrela de 8 pontas com raios ligeiramente irregulares (vetor, não imagem). */
function SpinStar({ className }: { className?: string }) {
  return (
    <svg
      className={`star-spin inline-block h-[0.74em] w-[0.74em] shrink-0 translate-y-[0.04em] align-middle ${className ?? "text-black/25"}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12,2.4 L13.38,8.67 L19.21,4.79 L16.07,10.32 L21.9,12 L15.51,13.45 L19.35,19.35 L13.61,15.88 L12,21.7 L10.66,15.23 L4.86,19.14 L7.84,13.72 L2.2,12 L8.4,10.51 L4.72,4.72 L10.43,8.21z" />
    </svg>
  );
}

const navToggleShape = "rounded-[12px]";

/** Cabeçalho (projeto / registros / serviços / nós): cantos arredondados em todos os tamanhos. */
const navToggleShapeHeader = navToggleShape;

const navToggleBase =
  "group inline-flex min-h-[52px] w-auto min-w-[108px] shrink-0 flex-row items-center justify-center gap-2 border px-2.5 py-1.5 text-[10px] uppercase leading-tight tracking-[0.18em] transition-colors duration-200 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-[#404040]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Blur só no estado inativo: backdrop-filter + fundo sólido no ativo quebra o texto em alguns browsers (Chrome/Windows). */
const navToggleIdle =
  "border-black/12 bg-white/75 backdrop-blur-sm text-neutral-600 hover:border-neutral-400/70 hover:bg-neutral-200 hover:text-neutral-900";

const navToggleActive =
  "border-[#404040] bg-[#525252] text-white [backdrop-filter:none] [-webkit-backdrop-filter:none]";

/** Botões compactos no header mobile: mesma geometria que antes, tema claro (fundo branco). */
const navToggleBaseCompactLight =
  "group inline-flex min-h-[44px] w-auto min-w-[80px] shrink-0 flex-row items-center justify-center gap-1 border px-1.5 py-1 text-[9px] uppercase leading-tight tracking-[0.15em] transition-colors duration-200 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-[#404040]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

type OpenPanel = "victor" | "clinica" | "registros" | "nos";

interface MainNavigationProps {
  openPanel: OpenPanel;
  pickPanel: (next: OpenPanel) => void;
  /** Barra só mobile: botões mais compactos (mesmo tema claro que ≥sm). */
  compactHeader?: boolean;
}

function MainNavigation({
  openPanel,
  pickPanel,
  compactHeader = false,
}: MainNavigationProps) {
  const t = useTranslations("nav");
  const tb = compactHeader ? navToggleBaseCompactLight : navToggleBase;
  const ti = navToggleIdle;
  const ta = navToggleActive;

  const navJustifyClass = "w-full justify-center";

  /** No header só mobile: não mostrar o destino já aberto (padrão tipo victorcorreard). */
  const showNav = (panel: OpenPanel) => !compactHeader || openPanel !== panel;

  return (
    <nav
      className={`flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2.5 ${navJustifyClass}`}
      aria-label={t("main")}
    >
      {showNav("victor") ? (
        <button
          type="button"
          onClick={() => pickPanel("victor")}
          className={`${tb} ${navToggleShapeHeader} ${openPanel === "victor" ? ta : ti}`}
        >
          <LayoutGrid className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          <span className="min-w-0 text-center">{t("projeto")}</span>
        </button>
      ) : null}
      {showNav("registros") ? (
        <button
          type="button"
          onClick={() => pickPanel("registros")}
          className={`${tb} ${navToggleShapeHeader} ${openPanel === "registros" ? ta : ti}`}
        >
          <Clapperboard className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          <span className="min-w-0 text-center">{t("registros")}</span>
        </button>
      ) : null}
      {showNav("clinica") ? (
        <button
          type="button"
          onClick={() => pickPanel("clinica")}
          className={`${tb} ${navToggleShapeHeader} ${openPanel === "clinica" ? ta : ti}`}
        >
          <Stethoscope className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          <span className="min-w-0 text-center">{t("servicos")}</span>
        </button>
      ) : null}
      {showNav("nos") ? (
        <button
          type="button"
          onClick={() => pickPanel("nos")}
          className={`${tb} ${navToggleShapeHeader} ${openPanel === "nos" ? ta : ti}`}
        >
          <Users className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          <span className="min-w-0 text-center">{t("nos")}</span>
        </button>
      ) : null}
    </nav>
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
              quality={VICTOR_IMAGE_QUALITY_MAIN}
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
          quality={VICTOR_IMAGE_QUALITY_MAIN}
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

export default function HomePage() {
  const siteLocale = useLocale() as AppLocale;
  const tHero = useTranslations("hero");
  const tVictor = useTranslations("victor");
  const tClinica = useTranslations("clinica");
  const tReg = useTranslations("registros");
  const tNos = useTranslations("nosSection");
  const nosIntro = tNos("intro").trim();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const openPanel: OpenPanel =
    pathname === "/clinica"
      ? "clinica"
      : pathname === "/registros"
        ? "registros"
        : pathname === "/nos"
          ? "nos"
          : "victor";

  /** Cartões em «Nós»: perfis (Víctor com link; Adriel; Vitor). */
  const nosProfileCards = useMemo((): {
    post: VictorFeedPost;
    afterBody?: ReactNode;
  }[] => {
    const cat = tNos("bioPostCategory");
    const victorBio = tNos("profileCardBio");
    const adrielBio = tNos("adrielProfileBio");
    const vitorBio = tNos("vitorProfileBio");

    const victorPost: VictorFeedPost = {
      section: "notas-gerais",
      slug: "_nos-victor-profile",
      title: tNos("profileCardName"),
      publishedAt: "2026-05-01",
      dateLabel: formatPostDateForLocale("2026-05-01", siteLocale),
      category: cat,
      excerpt: victorBio,
      body: [victorBio],
      imageSrc: "/media/hover/nos-victor-correard.png",
      imageAlt: tNos("profileCardImageAlt"),
      skipPostDetailPage: true,
      feedTitleAlign: "center",
    };
    const adrielPost: VictorFeedPost = {
      section: "notas-gerais",
      slug: "_nos-adriel-lourenco",
      title: tNos("adrielProfileName"),
      publishedAt: "2026-05-02",
      dateLabel: formatPostDateForLocale("2026-05-02", siteLocale),
      category: cat,
      excerpt: adrielBio,
      body: [adrielBio],
      skipPostDetailPage: true,
      feedTitleAlign: "center",
    };
    const vitorPost: VictorFeedPost = {
      section: "notas-gerais",
      slug: "_nos-vitor",
      title: tNos("vitorProfileName"),
      publishedAt: "2026-05-03",
      dateLabel: formatPostDateForLocale("2026-05-03", siteLocale),
      category: cat,
      excerpt: vitorBio,
      body: [vitorBio],
      skipPostDetailPage: true,
      feedTitleAlign: "center",
    };

    return [
      {
        post: victorPost,
        afterBody: (
          <a
            href={tNos("websiteUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#525252] underline decoration-[#525252]/30 underline-offset-[5px] transition hover:text-black hover:decoration-black/35 sm:text-[12px]"
          >
            {tNos("websiteLinkText")}
          </a>
        ),
      },
      { post: adrielPost },
      { post: vitorPost },
    ];
  }, [siteLocale, tNos]);

  const victorEntenderPosts = useMemo(
    () => getPostsForSection("entender", siteLocale),
    [siteLocale],
  );
  const victorUtilidadesPosts = useMemo(
    () =>
      victorEntenderPosts.filter((p) => getUtilidadeKind(p) !== "textos"),
    [victorEntenderPosts],
  );
  const victorMaterialPosts = useMemo(
    () =>
      victorEntenderPosts.filter((p) => getUtilidadeKind(p) === "textos"),
    [victorEntenderPosts],
  );

  const isVictorSugestoesView = pathname === "/victor/sugestoes";
  const isVictorRespostasView = pathname === "/victor/respostas";
  /** Índice em `REGISTROS_VIDEOS` mostrado no bloco grande; miniaturas são os outros. */
  const [registrosFeaturedIdx, setRegistrosFeaturedIdx] = useState(0);
  /** Faixa preta em volta do vídeo em destaque (interruptor ao lado de «vídeo»). */
  const [registrosBandDark, setRegistrosBandDark] = useState(
    () => Boolean(REGISTROS_VIDEOS[0]?.darkBand),
  );
  /** Subsecção em «victor → Informações»: Notas | Utilidades | Material. */
  const [victorInfoTab, setVictorInfoTab] = useState<
    "notas-gerais" | "utilidades" | "material"
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
    if (tab === "notas-gerais" || tab === "utilidades" || tab === "material") {
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
    if (
      raw !== "clinica" &&
      raw !== "registros" &&
      raw !== "victor" &&
      raw !== "nos"
    ) {
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

  /** Projeto (/) é o estado em repouso; ao desmarcar a secção activa volta ao início. */
  function pickPanel(next: OpenPanel) {
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
    <main className="relative flex min-h-screen flex-col overflow-x-visible overflow-y-visible bg-white font-sans text-black selection:bg-[#525252] selection:text-white">
      {/* Só navegação sticky; o hero (cinza claro + identidade) fica na secção seguinte, mais baixo que o antigo 70vh. */}
      <div className="order-0 shrink-0 bg-white">
        <header className="relative z-40 shrink-0">
          <div className="sticky top-0 z-40 border-b border-black/[0.08] bg-white py-2 sm:hidden">
            <div className="mx-auto flex w-full max-w-[1600px] min-w-0 items-center gap-2 px-3">
              <div className="flex min-w-0 flex-1 justify-center">
                <MainNavigation
                  compactHeader
                  openPanel={openPanel}
                  pickPanel={pickPanel}
                />
              </div>
              <HeaderLocaleSelect variant="light" />
            </div>
          </div>

          <div className="sticky top-0 z-40 hidden min-w-0 w-full border-b border-black/[0.08] bg-white py-2 sm:block sm:py-2.5">
            <div className="mx-auto flex w-full max-w-[1600px] min-w-0 items-center gap-3 px-5 sm:px-8 md:px-12">
              <div className="flex min-w-0 flex-1 justify-center">
                <MainNavigation openPanel={openPanel} pickPanel={pickPanel} />
              </div>
              <HeaderLocaleSelect variant="light" />
            </div>
          </div>
        </header>
      </div>

      <section
        id="top"
        className="relative order-1 isolate flex min-h-0 w-full min-w-0 flex-col overflow-visible bg-[#f3f4f6] px-5 pb-0 pt-0 max-sm:min-h-0 sm:min-h-[min(35.7vh,272px)] sm:px-8 md:px-12 lg:min-h-[min(34vh,306px)]"
      >
        <HeroBackground />

        <div className="relative z-10 flex min-h-0 w-full max-w-full flex-1 max-sm:flex-none flex-col overflow-visible max-sm:h-auto">
          <div className="w-full max-sm:origin-top max-sm:scale-[0.75] max-sm:[transform-origin:50%_0] max-sm:-mb-[4.75rem]">
            <div className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 max-sm:flex-none grid-rows-[1fr_auto] max-sm:grid-rows-[auto_auto] px-2">
              <div className="grid h-full min-h-0 w-full place-items-center px-2 py-2 text-center max-sm:h-auto max-sm:min-h-0 max-sm:py-1 sm:py-3">
              <div className="flex max-w-full flex-col items-center justify-center max-sm:translate-y-3 sm:translate-y-[68px]">
                <h1 className="sr-only">{tHero("projectTitle")}</h1>
                <ProjectHexMark
                  label={`${tHero("projectTitleHead")} ${tHero("projectTitleMark")}`.toUpperCase()}
                />
                {INSTAGRAM_URL ? (
                  <footer className="mt-2 flex w-full justify-center sm:mt-5">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-[#404040]/25 bg-white/55 px-4 py-1.5 text-[11px] uppercase tracking-[0.26em] text-[#404040] backdrop-blur-sm transition hover:bg-white/75 sm:px-5 sm:py-2 sm:text-[12px]"
                    >
                      {INSTAGRAM_LINK_LABEL}
                    </a>
                  </footer>
                ) : null}
              </div>
            </div>

            <div className="flex w-full shrink-0 items-end justify-between gap-2 pb-2 pt-0 max-sm:gap-1 max-sm:pb-0 max-sm:pt-0 sm:gap-4 sm:pb-4 sm:pt-1">
              <div
                className="pointer-events-none min-w-0 max-w-[58%] shrink pl-0.5 pb-0 max-sm:max-w-[52%] sm:max-w-none sm:pl-1 sm:pb-1 md:pl-2 md:pb-2"
                aria-hidden
              >
                <div className="origin-bottom-left scale-[0.266] sm:scale-[0.315] md:scale-[0.35]">
                  <div className="m-0 text-[clamp(2.5rem,10vw,7rem)] font-sans font-semibold leading-[0.88] tracking-[-0.06em] text-black">
                    <span className="flex flex-col items-end gap-0">
                      <span className="flex items-baseline gap-[0.14em] text-black/18">
                        <a
                          href={tNos("websiteUrl")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto inline-flex shrink-0 items-baseline rounded-sm outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#404040]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
                          aria-label={tNos("websiteLinkText")}
                        >
                          <SpinStar className="shrink-0" />
                        </a>
                        <span>{tHero("nameFirst")}</span>
                      </span>
                      <span className="-mt-[0.18em] block text-black">
                        {tHero("nameLast")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 self-end pr-0 pb-0 max-sm:translate-x-4 max-sm:-mr-1 sm:pr-1 sm:pb-1 md:pr-2 md:pb-2">
                <VekonHeroMark interactive={false} sizePx={136} className="mx-0" />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {openPanel === "victor" ? (
        <section
          id="victor"
          className={`relative z-10 order-1 border-t border-black/10 bg-white px-5 pb-[5px] pt-3 max-sm:pb-[20px] sm:px-8 sm:pt-5 sm:max-lg:pb-[45px] md:px-12 lg:order-2 lg:pb-10 lg:pt-12 ${
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
                    <button
                      type="button"
                      role="tab"
                      id="victor-tab-material"
                      aria-selected={victorInfoTab === "material"}
                      aria-controls="victor-panel-material"
                      onMouseDown={onVictorInfoTabButtonDown}
                      onClick={() => setVictorInfoTab("material")}
                      className={
                        victorInfoTab === "material"
                          ? `${navToggleBase} ${navToggleShape} ${navToggleActive} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                          : `${navToggleBase} ${navToggleShape} ${navToggleIdle} min-h-0 shrink-0 px-4 py-2.5 text-balance`
                      }
                    >
                      {tVictor("tabMaterial")}
                    </button>
                  </div>
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
                  ) : victorInfoTab === "utilidades" ? (
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
                          posts={victorUtilidadesPosts}
                          feedId="entender-util"
                          utilidadeBucketToggle
                          utilidadeBuckets={UTILIDADE_BUCKETS_WITHOUT_TEXTOS}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      id="victor-panel-material"
                      role="tabpanel"
                      aria-labelledby="victor-tab-material"
                    >
                      <p className="mx-auto max-w-2xl text-center text-[15px] leading-[1.8] text-black [text-wrap:pretty] sm:max-w-3xl">
                        {tVictor("materialIntro")}
                      </p>

                      <div className="mt-8 rounded-lg bg-[#f4f4f5] p-4 sm:p-6">
                        <PostsFeed
                          posts={victorMaterialPosts}
                          feedId="entender-material"
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

      {openPanel === "nos" ? (
        <section
          id="nos"
          className="relative z-10 order-1 scroll-mt-6 border-t border-black/10 bg-white px-5 pb-[5px] pt-5 max-sm:pb-[20px] sm:px-8 sm:max-lg:pb-[45px] md:px-12 lg:order-2 lg:pb-10 lg:pt-12"
        >
          <div className="mx-auto w-full max-w-[40rem]">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">
                {tNos("label")}
              </p>
              <h2 className="mt-3 font-sans text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-black sm:mt-4">
                {tNos("title")}
              </h2>
            </div>
            {nosIntro ? (
              <p className="mx-auto mt-8 max-w-prose text-center text-[15px] leading-[1.8] text-black/70 [text-wrap:pretty] sm:mt-10">
                {nosIntro}
              </p>
            ) : null}
            <div
              className={`${nosIntro ? "mt-10" : "mt-8 sm:mt-10"} space-y-8 sm:space-y-10`}
            >
              {nosProfileCards.map(({ post, afterBody }) =>
                post.imageSrc ? (
                  <ImagePostCard
                    key={post.slug}
                    post={post}
                    afterBody={afterBody}
                  />
                ) : (
                  <TextPostCard
                    key={post.slug}
                    post={post}
                    afterBody={afterBody}
                  />
                ),
              )}
            </div>
            <div className="mt-10 hidden lg:block">
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

      {/* Mobile (< lg): rodapé social após o conteúdo; no desktop o mesmo bloco fica no fim de cada secção. */}
      <div className="order-3 shrink-0 max-sm:pb-[15px] max-sm:px-0 sm:px-8 md:px-12 sm:max-lg:mt-2 lg:hidden">
        <SiteSocialFooter
          afterHeroStack
          profileLinks
          layout={openPanel === "registros" ? "registros" : "default"}
        />
      </div>
      </main>
  );
}
