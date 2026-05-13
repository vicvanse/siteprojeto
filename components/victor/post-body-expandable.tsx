"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { PostBodyParagraphs } from "@/components/victor/post-body-paragraphs";
import type { VictorFeedPost } from "@/data/victor-notes-posts";

export interface PostBodyExpandableProps {
  post: VictorFeedPost;
  paragraphClassName: string;
  /** Número de parágrafos visíveis antes de «Ler mais» (índices 0 … count−1). */
  visibleParagraphCount: number;
}

/** Corpo com primeiro(s) parágrafo(s) visíveis e resto atrás de «Ler mais» / «Ler menos» (estilo Patreon). */
export function PostBodyExpandable({
  post,
  paragraphClassName,
  visibleParagraphCount,
}: PostBodyExpandableProps) {
  const t = useTranslations("postUi");
  const [open, setOpen] = useState(false);
  const id = useId();
  const regionId = `${id}-fold`;

  const total = post.body.length;
  const headEnd = Math.min(Math.max(0, visibleParagraphCount), total);
  const hasRest = headEnd < total;

  if (!hasRest) {
    return <PostBodyParagraphs post={post} paragraphClassName={paragraphClassName} />;
  }

  return (
    <div className="space-y-4">
      <PostBodyParagraphs
        post={post}
        paragraphClassName={paragraphClassName}
        range={{ start: 0, end: headEnd }}
      />
      {!open ? (
        <p className="mt-1">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="border-0 bg-transparent p-0 text-[15px] font-medium leading-[1.7] text-[#4a7c44] underline decoration-[#4a7c44]/30 underline-offset-[5px] transition hover:decoration-[#4a7c44]"
            aria-expanded={false}
            aria-controls={regionId}
          >
            {t("readMore")}
          </button>
        </p>
      ) : (
        <>
          <div id={regionId} className="space-y-4">
            <PostBodyParagraphs
              post={post}
              paragraphClassName={paragraphClassName}
              range={{ start: headEnd, end: total }}
            />
          </div>
          <p className="mt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border-0 bg-transparent p-0 text-[15px] font-medium leading-[1.7] text-[#4a7c44] underline decoration-[#4a7c44]/30 underline-offset-[5px] transition hover:decoration-[#4a7c44]"
              aria-expanded
              aria-controls={regionId}
            >
              {t("readLess")}
            </button>
          </p>
        </>
      )}
    </div>
  );
}
