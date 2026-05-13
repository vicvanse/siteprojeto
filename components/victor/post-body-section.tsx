import { PostBodyExpandable } from "@/components/victor/post-body-expandable";
import { PostBodyParagraphs } from "@/components/victor/post-body-paragraphs";
import type { VictorFeedPost } from "@/data/victor-notes-posts";

export interface PostBodySectionProps {
  post: VictorFeedPost;
  paragraphClassName: string;
}

/** Corpo do post: completo ou com dobra «Ler mais» quando `postBodyVisibleParagraphCount` está definido. */
export function PostBodySection({ post, paragraphClassName }: PostBodySectionProps) {
  const n = post.postBodyVisibleParagraphCount;
  if (n != null && n > 0 && n < post.body.length) {
    return (
      <PostBodyExpandable
        post={post}
        paragraphClassName={paragraphClassName}
        visibleParagraphCount={n}
      />
    );
  }
  return <PostBodyParagraphs post={post} paragraphClassName={paragraphClassName} />;
}
