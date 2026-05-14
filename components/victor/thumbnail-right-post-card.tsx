import Image from "next/image";
import { VICTOR_IMAGE_QUALITY_MAIN } from "@/lib/victor-image-quality";
import {
  postCardBodyParaClass,
  postCardMetaTagClass,
  postCardMetaTimeClass,
  postCardTitleClass,
} from "@/components/victor/post-card-typography";
import {
  formatCategoryLabel,
  type VictorFeedPost,
} from "@/data/victor-notes-posts";
import { PostBodySection } from "@/components/victor/post-body-section";

export interface ThumbnailRightPostCardProps {
  post: VictorFeedPost;
  categoryLabel?: string;
}

/** Tipo 2: miniatura à direita, alinhada ao bloco título + data + etiqueta; corpo em largura total abaixo. */
export function ThumbnailRightPostCard({
  post,
  categoryLabel,
}: ThumbnailRightPostCardProps) {
  if (!post.imageSrc) return null;

  return (
    <article className="font-post rounded-lg border border-black/[0.07] bg-white px-5 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:px-7 sm:py-8">
      <div className="flex flex-row items-start gap-4 sm:gap-6">
        <header className="min-w-0 flex-1 space-y-2.5">
          <h3
            className={`${postCardTitleClass} text-pretty break-words [overflow-wrap:anywhere]`}
          >
            {post.title}
          </h3>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <time className={`${postCardMetaTimeClass} max-sm:hidden`}>
              {post.dateLabel}
            </time>
            <span className={postCardMetaTagClass}>
              {categoryLabel ?? formatCategoryLabel(post.category)}
            </span>
          </div>
        </header>
        <div className="relative h-[5.25rem] w-[6.5rem] shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 ring-1 ring-black/[0.06] sm:h-[5.75rem] sm:w-[7.5rem] md:h-[6.25rem] md:w-[8.5rem]">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt ?? ""}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 104px, 136px"
            quality={VICTOR_IMAGE_QUALITY_MAIN}
            unoptimized={post.imageSrc.endsWith(".gif")}
          />
          {(post.imageGallery?.length ?? 0) > 0 ? (
            <span className="pointer-events-none absolute bottom-1 right-1 rounded bg-black/55 px-1 py-0.5 font-mono text-[9px] font-medium tabular-nums text-white shadow-sm">
              {1 + (post.imageGallery?.length ?? 0)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-4 sm:mt-5">
        <PostBodySection post={post} paragraphClassName={postCardBodyParaClass} />
      </div>

      <time
        className={`${postCardMetaTimeClass} mt-5 hidden max-sm:block max-sm:self-end`}
      >
        {post.dateLabel}
      </time>
    </article>
  );
}
