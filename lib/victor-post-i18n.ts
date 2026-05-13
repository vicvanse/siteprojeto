import type { VictorFeedPost } from "@/data/victor-notes-posts";
import type { AppLocale } from "@/i18n/routing";
import batch1 from "@/data/victor-post-i18n/batch-1.json";
import batch2 from "@/data/victor-post-i18n/batch-2.json";
import batch3 from "@/data/victor-post-i18n/batch-3.json";

export type VictorPostI18nFields = {
  title: string;
  excerpt: string;
  body: string[];
  imageAlt?: string;
};

type VictorPostI18nBundle = Record<
  string,
  Partial<Record<AppLocale, VictorPostI18nFields>>
>;

const BUNDLE: VictorPostI18nBundle = {
  ...batch1,
  ...batch2,
  ...batch3,
} as VictorPostI18nBundle;

/** Datas de cartão / página, coerente com a locale. */
export function formatPostDateForLocale(
  publishedAt: string,
  locale: AppLocale,
): string {
  const d = new Date(publishedAt);
  if (Number.isNaN(d.getTime())) {
    return publishedAt;
  }
  if (locale === "pt-BR") {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  }
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Cadeia: locale pedido → en. Se não houver, undefined (mantém o PT de origem).
 */
export function getPostI18nForLocale(
  slug: string,
  locale: AppLocale,
): VictorPostI18nFields | undefined {
  if (locale === "pt-BR") return undefined;
  const perSlug = BUNDLE[slug];
  if (!perSlug) return undefined;
  return perSlug[locale] ?? perSlug.en;
}

/**
 * Aplica tradução ao `VictorFeedPost`; ajusta `dateLabel` quando há i18n.
 */
export function localizeVictorPost(
  post: VictorFeedPost,
  locale: AppLocale,
): VictorFeedPost {
  if (locale === "pt-BR") {
    return post;
  }
  const patch = getPostI18nForLocale(post.slug, locale);
  if (!patch) {
    return post;
  }
  return {
    ...post,
    title: patch.title,
    excerpt: patch.excerpt,
    body: patch.body,
    imageAlt: patch.imageAlt ?? post.imageAlt,
    dateLabel: formatPostDateForLocale(post.publishedAt, locale),
  };
}
