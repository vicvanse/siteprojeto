import {
  postCardBodyParaClass,
  postCardBodyStackClass,
  postCardHeaderClass,
  postCardMetaTagClass,
  postCardMetaTimeClass,
  postCardReadingColumnClass,
  postCardTitleClass,
} from "@/components/victor/post-card-typography";
import {
  formatCategoryLabel,
  getYoutubeEmbedSrc,
  type VictorFeedPost,
} from "@/data/victor-notes-posts";
import { PostBodySection } from "@/components/victor/post-body-section";

export interface YoutubePostCardProps {
  post: VictorFeedPost;
  /** Rótulo de categoria localizado (feed); fallback se omitido. */
  categoryLabel?: string;
}

/** Post com embed YouTube no topo; texto abaixo. */
export function YoutubePostCard({ post, categoryLabel }: YoutubePostCardProps) {
  const embedSrc = getYoutubeEmbedSrc(post);
  if (!embedSrc) return null;

  return (
    <article className="font-post overflow-hidden rounded-lg border border-black/[0.07] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={embedSrc}
          title={post.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="flex flex-col px-6 py-7 sm:px-7 sm:py-8">
        <div className={postCardReadingColumnClass}>
          <header className={postCardHeaderClass}>
            <h3 className={postCardTitleClass}>{post.title}</h3>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <time className={`${postCardMetaTimeClass} max-sm:hidden`}>
                {post.dateLabel}
              </time>
              <span className={postCardMetaTagClass}>
                {categoryLabel ?? formatCategoryLabel(post.category)}
              </span>
            </div>
          </header>
          <div className={postCardBodyStackClass}>
            <PostBodySection post={post} paragraphClassName={postCardBodyParaClass} />
          </div>
        </div>
        <time
          className={`${postCardMetaTimeClass} mt-6 hidden max-sm:block max-sm:self-end`}
        >
          {post.dateLabel}
        </time>
      </div>
    </article>
  );
}
