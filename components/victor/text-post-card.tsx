import {
  postCardBodyParaClass,
  postCardBodyStackClass,
  postCardHeaderClass,
  postCardMetaTagClass,
  postCardMetaTimeClass,
  postCardReadingColumnClass,
  postCardTitleClass,
} from "@/components/victor/post-card-typography";
import { Link } from "@/i18n/navigation";
import { formatCategoryLabel, type VictorFeedPost } from "@/data/victor-notes-posts";
import { PostBodySection } from "@/components/victor/post-body-section";

export interface TextPostCardProps {
  post: VictorFeedPost;
  categoryLabel?: string;
}

const cardArticleClass =
  "font-post flex flex-col rounded-lg border border-black/[0.07] bg-white px-6 py-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow duration-200 sm:px-7 sm:py-8";

/** Cartão textual: corpo completo visível no feed (sem página separada). */
export function TextPostCard({ post, categoryLabel }: TextPostCardProps) {
  const inner = (
    <>
      <div className={postCardReadingColumnClass}>
        <header
          className={
            post.feedTitleAlign === "center"
              ? `${postCardHeaderClass} md:text-center`
              : postCardHeaderClass
          }
        >
          <h3 className={postCardTitleClass}>{post.title}</h3>
          <div
            className={
              post.feedTitleAlign === "center"
                ? "flex flex-wrap items-baseline gap-x-3 gap-y-1 md:justify-center"
                : "flex flex-wrap items-baseline gap-x-3 gap-y-1"
            }
          >
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
    </>
  );

  if (post.feedCardHref) {
    return (
      <Link
        href={post.feedCardHref}
        className={`group block rounded-lg no-underline outline-none transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#356040]/35 focus-visible:ring-offset-2`}
      >
        <article className={`${cardArticleClass} group-hover:border-black/[0.1]`}>
          {inner}
        </article>
      </Link>
    );
  }

  return (
    <article
      className={`${cardArticleClass} hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]`}
    >
      {inner}
    </article>
  );
}
