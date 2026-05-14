"use client";

import { useTranslations } from "next-intl";
import {
  useEffect,
  useMemo,
  type PointerEvent,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { Search } from "lucide-react";
import { getLocalizedCategoryLabel } from "@/lib/i18n-category";
import {
  getCategoriesForPosts,
  getIncomumKind,
  getUtilidadeKind,
  type IncomumKind,
  type UtilidadeKind,
  type VictorFeedPost,
} from "@/data/victor-notes-posts";
import { ImagePostCard } from "@/components/victor/image-post-card";
import { TextPostCard } from "@/components/victor/text-post-card";
import { ThumbnailRightPostCard } from "@/components/victor/thumbnail-right-post-card";
import { YoutubePostCard } from "@/components/victor/youtube-post-card";

const MD_MIN = "(min-width: 768px)";

function subscribeMdUp(onChange: () => void) {
  const mq = window.matchMedia(MD_MIN);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getMdUpSnapshot() {
  return window.matchMedia(MD_MIN).matches;
}

function useIsMdUp() {
  return useSyncExternalStore(
    subscribeMdUp,
    getMdUpSnapshot,
    () => false,
  );
}

const MOBILE_FEED_PREVIEW = 6;

function preventFocusScrollOnPress(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
}

function preventFocusScrollOnPointer(e: PointerEvent<HTMLButtonElement>) {
  e.preventDefault();
}

const INCOMUM_KIND_ORDER: IncomumKind[] = [
  "arte",
  "literatura",
  "audiovisual",
  "perfis",
];

const UTILIDADE_ORDER: UtilidadeKind[] = [
  "jornais",
  "ferramenta",
  "textos",
];

export interface PostsFeedProps {
  posts: VictorFeedPost[];
  /** Id estável para ids de formulário (sem espaços). */
  feedId?: string;
  /** Utilidades: toggle Ferramentas / Jornais / Material abaixo do filtro e da busca. */
  utilidadeBucketToggle?: boolean;
  /** Incomum: tabs Arte / Literatura / Audiovisual / Perfis. */
  incomumBucketToggle?: boolean;
  /** Abaixo de `md`: oculta busca e seletor "Todos os tipos" (ex.: notas gerais no telefone). */
  hideSearchAndCategoryOnMobile?: boolean;
}

export function PostsFeed({
  posts,
  feedId = "feed",
  utilidadeBucketToggle = false,
  incomumBucketToggle = false,
  hideSearchAndCategoryOnMobile = false,
}: PostsFeedProps) {
  const tFeed = useTranslations("feed");
  const tUtil = useTranslations("utilBucket");
  const tIncomum = useTranslations("incomumKind");
  const tCategory = useTranslations("Category");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("todos");
  const [utilBucket, setUtilBucket] = useState<UtilidadeKind>("jornais");
  const [incomumBucket, setIncomumBucket] =
    useState<IncomumKind>("audiovisual");
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const isMdUp = useIsMdUp();

  function handleUtilBucketChange(kind: UtilidadeKind) {
    // Evita um frame com expanded=true e lista nova (refs/scroll em lista errada).
    setMobileExpanded(false);
    setUtilBucket(kind);
  }

  function handleIncomumBucketChange(kind: IncomumKind) {
    setMobileExpanded(false);
    setIncomumBucket(kind);
  }

  const categories = useMemo(() => getCategoriesForPosts(posts), [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (utilidadeBucketToggle && getUtilidadeKind(p) !== utilBucket) {
        return false;
      }
      if (incomumBucketToggle && getIncomumKind(p) !== incomumBucket) {
        return false;
      }
      if (category !== "todos" && p.category !== category) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.excerpt} ${p.category} ${p.body.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [
    posts,
    query,
    category,
    utilidadeBucketToggle,
    utilBucket,
    incomumBucketToggle,
    incomumBucket,
  ]);

  /** Ao mudar de subseção (Arte/Literatura/… ou Ferramentas/Jornais/Material), volta ao estado inicial do filtro. */
  useEffect(() => {
    if (!incomumBucketToggle && !utilidadeBucketToggle) return;
    setQuery("");
    setCategory("todos");
    setMobileExpanded(false);
  }, [
    incomumBucket,
    utilBucket,
    incomumBucketToggle,
    utilidadeBucketToggle,
  ]);

  useEffect(() => {
    setMobileExpanded(false);
  }, [query, category]);

  const visiblePosts = useMemo(() => {
    if (isMdUp || mobileExpanded) return filtered;
    return filtered.slice(0, MOBILE_FEED_PREVIEW);
  }, [filtered, isMdUp, mobileExpanded]);

  const showMobileMoreBar =
    !isMdUp && filtered.length > MOBILE_FEED_PREVIEW && !mobileExpanded;

  const utilidadeBucketOrder = useMemo(
    () =>
      UTILIDADE_ORDER.map((kind) => ({
        kind,
        label: tUtil(kind as "ferramenta"),
      })),
    [tUtil],
  );

  const tCat = tCategory as unknown as (k: string) => string;
  const categoryForPost = (cat: string) => getLocalizedCategoryLabel(cat, tCat);

  const searchToolbarClass = hideSearchAndCategoryOnMobile
    ? "mb-0 hidden flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 md:mb-8 md:flex"
    : "mb-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3";

  return (
    <div className="w-full scroll-mt-4 [overflow-anchor:none]">
      <div className={searchToolbarClass}>
        {!hideSearchAndCategoryOnMobile ? (
          <p
            aria-hidden
            className="w-full text-justify text-[13px] text-black/55 sm:hidden"
          >
            {tFeed("typeOrCategory")}
          </p>
        ) : null}
        <div className="flex w-full min-w-0 flex-row items-stretch gap-1.5 sm:contents">
          <div className="flex min-w-0 flex-1 basis-0 flex-wrap items-center gap-2 sm:basis-auto sm:max-w-md sm:flex-initial">
            <label className="sr-only" htmlFor={`feed-cat-${feedId}`}>
              {tFeed("typeOrCategory")}
            </label>
            <select
              id={`feed-cat-${feedId}`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 min-w-0 w-full flex-1 rounded-full border border-black/10 bg-white px-2.5 py-1.5 text-[12px] leading-tight text-neutral-800 shadow-sm outline-none transition focus:border-[#525252]/40 focus:ring-2 focus:ring-[#525252]/15 sm:h-10 sm:min-w-[10rem] sm:flex-initial sm:px-3 sm:py-2 sm:text-[13px] sm:leading-normal"
            >
              <option value="todos">{tFeed("filterAll")}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {getLocalizedCategoryLabel(
                    c,
                    tCategory as unknown as (k: string) => string,
                  )}
                </option>
              ))}
            </select>
          </div>
          <div className="relative min-w-0 flex-1 basis-0 sm:basis-auto sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black/35 sm:left-3.5 sm:h-4 sm:w-4"
              strokeWidth={1.75}
              aria-hidden
            />
            <label className="sr-only" htmlFor={`feed-search-${feedId}`}>
              {tFeed("searchLabel")}
            </label>
            <input
              id={`feed-search-${feedId}`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tFeed("searchPlaceholder")}
              autoComplete="off"
              className="h-9 w-full rounded-full border border-black/10 bg-white py-2 pl-9 pr-2.5 text-[12px] leading-tight text-neutral-800 shadow-sm outline-none transition placeholder:text-black/35 focus:border-[#525252]/40 focus:ring-2 focus:ring-[#525252]/15 sm:h-10 sm:pl-10 sm:pr-4 sm:text-[13px] sm:leading-normal"
            />
          </div>
        </div>
      </div>

      {utilidadeBucketToggle ? (
        <nav
          className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-black/[0.08] text-[15px] leading-relaxed tracking-[-0.02em] text-black/45 [text-wrap:balance]"
          role="tablist"
          aria-label={tFeed("utilTabsAria")}
        >
          {utilidadeBucketOrder.flatMap(({ kind, label }, index) => {
            const tabButton = (
              <button
                key={kind}
                type="button"
                role="tab"
                id={`feed-util-${feedId}-${kind}`}
                aria-selected={utilBucket === kind}
                onPointerDown={preventFocusScrollOnPointer}
                onMouseDown={preventFocusScrollOnPress}
                onClick={() => handleUtilBucketChange(kind)}
                className={
                  utilBucket === kind
                    ? "-mb-px border-0 border-b-2 border-[#525252] bg-transparent pb-2.5 font-semibold text-[#525252] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#404040]/35 focus-visible:ring-offset-2"
                    : "-mb-px border-0 border-b-2 border-transparent bg-transparent pb-2.5 font-normal outline-none transition-colors hover:text-black/60 focus-visible:ring-2 focus-visible:ring-[#404040]/35 focus-visible:ring-offset-2"
                }
              >
                {label}
              </button>
            );
            if (index === 0) return [tabButton];
            return [
              <span
                key={`sep-${kind}`}
                className="hidden select-none text-black/20 sm:inline"
                aria-hidden
              >
                ·
              </span>,
              tabButton,
            ];
          })}
        </nav>
      ) : null}

      {incomumBucketToggle ? (
        <nav
          className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-black/[0.08] text-[14px] leading-relaxed tracking-[-0.02em] text-black/45 [text-wrap:balance] sm:gap-x-6 sm:text-[15px]"
          role="tablist"
          aria-label={tFeed("incomumTabsAria")}
        >
          {INCOMUM_KIND_ORDER.map((kind) => (
            <button
              key={kind}
              type="button"
              role="tab"
              id={`feed-incomum-${feedId}-${kind}`}
              aria-selected={incomumBucket === kind}
              onPointerDown={preventFocusScrollOnPointer}
              onMouseDown={preventFocusScrollOnPress}
              onClick={() => handleIncomumBucketChange(kind)}
              className={
                incomumBucket === kind
                  ? "-mb-px border-0 border-b-2 border-[#525252] bg-transparent pb-2.5 font-semibold text-[#525252] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#404040]/35 focus-visible:ring-offset-2"
                  : "-mb-px border-0 border-b-2 border-transparent bg-transparent pb-2.5 font-normal outline-none transition-colors hover:text-black/60 focus-visible:ring-2 focus-visible:ring-[#404040]/35 focus-visible:ring-offset-2"
              }
            >
              {tIncomum(
                kind as
                  | "arte"
                  | "literatura"
                  | "audiovisual"
                  | "perfis",
              )}
            </button>
          ))}
        </nav>
      ) : null}

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-black/12 bg-white/80 px-6 py-10 text-center text-[14px] text-black/50">
          {tFeed("empty")}
        </p>
      ) : (
        <>
          <ul className="flex flex-col gap-6 sm:gap-8 [overflow-anchor:none]">
            {visiblePosts.map((post) => (
              <li key={post.slug}>
                {post.youtubeVideoId ? (
                  <YoutubePostCard
                    post={post}
                    categoryLabel={categoryForPost(post.category)}
                  />
                ) : post.imageSrc &&
                  post.cardLayout === "thumbnail-right" ? (
                  <ThumbnailRightPostCard
                    post={post}
                    categoryLabel={categoryForPost(post.category)}
                  />
                ) : post.imageSrc ? (
                  <ImagePostCard
                    post={post}
                    categoryLabel={categoryForPost(post.category)}
                  />
                ) : (
                  <TextPostCard
                    post={post}
                    categoryLabel={categoryForPost(post.category)}
                  />
                )}
              </li>
            ))}
          </ul>
          {showMobileMoreBar ? (
            <button
              type="button"
              className="md:hidden mt-6 w-full rounded-lg border border-[#525252] bg-[#525252] py-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-white shadow-sm transition hover:border-[#262626] hover:bg-[#262626] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#404040]/50 focus-visible:ring-offset-2"
              onClick={() => setMobileExpanded(true)}
              aria-expanded={false}
              aria-label={tFeed("viewMoreAria", {
                count: filtered.length - MOBILE_FEED_PREVIEW,
              })}
            >
              {tFeed("viewMore")}
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
