import { linkifyPlainText } from "@/components/victor/post-linkified-text";
import type { VictorFeedPost } from "@/data/victor-notes-posts";

interface PostBodyParagraphsProps {
  post: VictorFeedPost;
  paragraphClassName: string;
  /** Índices inclusivos `[start, end)` sobre `post.body`; omitido = corpo completo. */
  range?: { start: number; end: number };
}

/** Corpo do post: parágrafos normais ou blocos de verso com quebras preservadas. */
export function PostBodyParagraphs({
  post,
  paragraphClassName,
  range,
}: PostBodyParagraphsProps) {
  const isVerse = post.bodyPresentation === "verse";
  /** Primeiro bloco com URL no topo do verso — linha de metadados antes da atribuição/leitura. */
  const verseMetaLead = /https?:\/\//.test(post.body[0] ?? "");

  const start = range?.start ?? 0;
  const end = range?.end ?? post.body.length;
  const blocks = post.body.slice(start, end);

  return (
    <>
      {blocks.map((block, idx) => {
        const i = start + idx;
        const verseClass = isVerse
          ? i === 0 && !verseMetaLead
            ? " whitespace-pre-wrap text-center font-serif text-black/80"
            : verseMetaLead && (i === 0 || i === 1)
              ? " whitespace-pre-wrap text-left font-sans text-black/90"
              : " whitespace-pre-wrap text-left font-serif text-black"
          : "";
        return (
          <p key={i} className={`${paragraphClassName}${verseClass}`}>
            {linkifyPlainText(block)}
          </p>
        );
      })}
    </>
  );
}
