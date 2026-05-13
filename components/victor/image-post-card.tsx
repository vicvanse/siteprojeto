import {
  postCardBodyParaClass,
  postCardBodyStackClass,
  postCardHeaderClass,
  postCardMetaTagClass,
  postCardMetaTimeClass,
  postCardReadingColumnClass,
  postCardTitleClass,
} from "@/components/victor/post-card-typography";
import { PostGallery } from "@/components/victor/post-gallery";
import {
  formatCategoryLabel,
  getPostGalleryInitialIndex,
  getPostGalleryMainPreset,
  getPostGalleryNativePixelSources,
  getPostImages,
  type VictorFeedPost,
} from "@/data/victor-notes-posts";
import { PostBodySection } from "@/components/victor/post-body-section";

export interface ImagePostCardProps {
  post: VictorFeedPost;
  categoryLabel?: string;
}

/** Post com imagem no topo; texto completo abaixo. */
export function ImagePostCard({ post, categoryLabel }: ImagePostCardProps) {
  if (!post.imageSrc) return null;

  const images = getPostImages(post);
  const mainPreset = getPostGalleryMainPreset(post);

  return (
    <article className="font-post overflow-hidden rounded-lg border border-black/[0.07] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <PostGallery
        key={post.slug}
        images={images}
        initialIndex={getPostGalleryInitialIndex(post, images.length)}
        initialIndexMobile={post.postGalleryMobileCoverIndex}
        variant="feed"
        locked={post.isImageLocked}
        fallbackLabel={post.imageAlt ?? post.title}
        mainPreset={mainPreset}
        nativePixelSources={getPostGalleryNativePixelSources(post)}
        mobileMainTighter={post.postGalleryMobileTighter}
      />
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
