import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import { getPostI18nForLocale } from "@/lib/victor-post-i18n";
import { getLocalizedCategoryLabel } from "@/lib/i18n-category";
import { PostBodySection } from "@/components/victor/post-body-section";
import { PostGallery } from "@/components/victor/post-gallery";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPostGalleryInitialIndex,
  getPostGalleryMainPreset,
  getPostGalleryNativePixelSources,
  getPostImages,
  getYoutubeEmbedSrc,
} from "@/data/victor-notes-posts";

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const { locale, slug } = await params;
  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  }
  const loc = hasLocale(routing.locales, locale) ? (locale as AppLocale) : "pt-BR";
  const post = getPostBySlug(slug, loc);
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  if (!post) {
    return {
      title: tMeta("title"),
    };
  }
  return {
    title: `${post.title} — ${tMeta("title")}`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  }
  const loc = hasLocale(routing.locales, locale) ? (locale as AppLocale) : "pt-BR";
  const post = getPostBySlug(slug, loc);
  if (!post) notFound();

  const tPost = await getTranslations({ locale, namespace: "post" });
  const tCategory = await getTranslations({ locale, namespace: "Category" });
  const activeLocale = (await getLocale()) as AppLocale;
  const hasI18n = Boolean(getPostI18nForLocale(slug, activeLocale));
  const showSourceNotice = activeLocale !== "pt-BR" && !hasI18n;

  const youtubeEmbedSrc = getYoutubeEmbedSrc(post);
  const images = getPostImages(post);
  const hasImageGallery = (post.imageGallery?.length ?? 0) > 0;
  const thumbRightSingle =
    post.cardLayout === "thumbnail-right" &&
    images.length === 1 &&
    !(post.imageGallery?.length || post.postImages?.length);
  const showBodyImageBlock = images.length > 0 && !thumbRightSingle;

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-5 py-16 font-sans text-black sm:px-8 md:px-12">
      <article className="font-post mx-auto w-full max-w-[40rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/40">
          <Link
            href="/"
            className="text-[#525252] underline decoration-[#525252]/25 underline-offset-4 transition hover:decoration-[#525252]"
          >
            {tPost("backCrumb")}
          </Link>
        </p>

        {showSourceNotice ? (
          <p
            className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/90 px-4 py-2.5 text-center text-[13px] text-amber-900/90 [text-wrap:balance]"
            role="note"
          >
            {tPost("contentPt")}
          </p>
        ) : null}

        <header
          className={`mt-8 rounded-lg border border-black/[0.07] bg-white px-6 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:px-8 sm:py-10 ${
            post.cardLayout === "thumbnail-right" && post.imageSrc
              ? "flex flex-row gap-5 sm:gap-8"
              : ""
          }`}
        >
          <div className="min-w-0 flex-1">
            <h1 className="text-[clamp(1.5rem,3.8vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-neutral-900 [overflow-wrap:anywhere]">
              {post.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <time className="text-[12px] tabular-nums text-black/45">
                {post.dateLabel}
              </time>
              <span className="inline-flex rounded-full bg-[#525252]/10 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.08em] text-[#525252]">
                {getLocalizedCategoryLabel(
                  post.category,
                  tCategory as unknown as (k: string) => string,
                )}
              </span>
            </div>
          </div>
          {post.cardLayout === "thumbnail-right" &&
          post.imageSrc &&
          !hasImageGallery ? (
            <div className="relative h-[5.5rem] w-[6.75rem] shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 ring-1 ring-black/[0.06] sm:h-[6.5rem] sm:w-[8.5rem]">
              <Image
                src={post.imageSrc}
                alt={post.imageAlt ?? ""}
                fill
                className="object-cover object-center"
                sizes="136px"
                priority
                unoptimized={post.imageSrc.endsWith(".gif")}
              />
            </div>
          ) : null}
        </header>

        {youtubeEmbedSrc ? (
          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg border border-black/[0.07] bg-black shadow-sm">
            <iframe
              src={youtubeEmbedSrc}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : showBodyImageBlock ? (
          <div className="mt-6">
            <PostGallery
              key={slug}
              images={images}
              initialIndex={getPostGalleryInitialIndex(post, images.length)}
              initialIndexMobile={post.postGalleryMobileCoverIndex}
              variant="detail"
              locked={post.isImageLocked}
              fallbackLabel={post.imageAlt ?? post.title}
              mainPreset={getPostGalleryMainPreset(post)}
              nativePixelSources={getPostGalleryNativePixelSources(post)}
              mobileMainTighter={post.postGalleryMobileTighter}
            />
          </div>
        ) : null}

        <div className="mt-8 space-y-4 rounded-lg border border-black/[0.07] bg-white px-6 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:px-8 sm:py-10">
          <PostBodySection
            post={post}
            paragraphClassName={
              post.bodyPresentation === "verse"
                ? "text-[15px] leading-[1.85] [text-wrap:balance]"
                : "text-[15px] leading-[1.7] text-black [text-wrap:pretty]"
            }
          />
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/"
            className="text-[13px] font-medium text-[#525252] underline decoration-[#525252]/25 underline-offset-[5px] transition hover:decoration-[#525252]"
          >
            {tPost("back")}
          </Link>
        </p>
      </article>
    </main>
  );
}
