"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import {
  postCardBodyParaClass,
  postCardBodyStackClass,
  postCardReadingColumnClass,
} from "@/components/victor/post-card-typography";
import { getPostsForSection } from "@/data/victor-notes-posts";
import { VictorSugestoesRespostasStrip } from "@/components/victor/victor-sugestoes-respostas-strip";
import {
  VICTOR_IMAGE_QUALITY_AVATAR,
  VICTOR_IMAGE_QUALITY_MAIN,
} from "@/lib/victor-image-quality";

/** Feed «Respostas» ligado ao QR / sugestões — mesmo shell visual que `VictorSugestoesPanel`. */
export function VictorRespostasPanel() {
  const t = useTranslations("sugestoes");
  const locale = useLocale() as AppLocale;
  const posts = useMemo(
    () => getPostsForSection("respostas", locale),
    [locale],
  );

  return (
    <>
      <div id="victor-respostas-intro" className="space-y-3">
        <VictorSugestoesRespostasStrip variant="arquivo" qrFlow />
      </div>

      <div className="mx-auto mt-8 w-full border-t border-black/10 pt-8 sm:mt-10 sm:pt-10">
        <div className="rounded-lg bg-[#f4f4f5] p-4 sm:bg-[#e8e8e8] sm:p-6">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="hidden text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold leading-tight tracking-[-0.02em] text-neutral-900 sm:block sm:rounded-none sm:border-0 sm:border-b sm:border-black/[0.08] sm:bg-transparent sm:px-0 sm:py-0 sm:pb-4 sm:shadow-none">
              {t("responsesArchiveHeading")}
            </h2>
            <div className="space-y-4">
              {posts.map((post) => {
                const profileImage = post.postImages?.[0];
                const contentImage = post.postImages?.[1];
                return (
                  <article
                    key={post.slug}
                    className="font-post rounded-lg border border-black/10 bg-white px-4 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:px-5"
                  >
                    <div className={postCardReadingColumnClass}>
                      <header className="flex items-start gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10 bg-neutral-100">
                          {profileImage ? (
                            <Image
                              src={profileImage.src}
                              alt={profileImage.alt ?? post.title}
                              fill
                              sizes="48px"
                              quality={VICTOR_IMAGE_QUALITY_AVATAR}
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <time className="block text-[12px] text-black/45">
                            {post.dateLabel}
                          </time>
                          <p className="mt-1 text-[14px] italic text-neutral-800">
                            <span className="text-black/55">User: </span>
                            <span>{post.title}</span>
                          </p>
                        </div>
                      </header>

                      <div className={`${postCardBodyStackClass} pl-[4px]`}>
                        {post.body.map((paragraph, i) => (
                          <p
                            key={`${post.slug}-body-${i}`}
                            className={postCardBodyParaClass}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {contentImage ? (
                      <div className="relative mt-[18px] overflow-hidden rounded-lg border border-black/10 bg-neutral-100">
                        <Image
                          src={contentImage.src}
                          alt={contentImage.alt ?? post.title}
                          width={1200}
                          height={1200}
                          className="h-auto w-full object-cover"
                          sizes="(max-width: 768px) 100vw, 640px"
                          quality={VICTOR_IMAGE_QUALITY_MAIN}
                        />
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
