"use client";

import { useTranslations } from "next-intl";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { isSugestoesQrVisit } from "@/components/victor/sugestoes-intro-copy";
import {
  isAllowedAudioMime,
  isAllowedImageMime,
  MAX_AUDIO_BYTES,
  MAX_IMAGE_BYTES,
  MAX_IMAGES,
  MAX_TOTAL_BYTES,
} from "@/lib/sugestoes-attachments";

/** Cartão branco alinhado ao painel Vekon (home-page). */
function SugestoesQrIntroCard() {
  const t = useTranslations("sugestoes");
  return (
    <div
      className="mb-6 w-full rounded-none rounded-tr-[12px] rounded-bl-[12px] border border-black/15 bg-[#fafafa] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:mb-8 sm:p-8"
    >
      <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-black/40 sm:mb-5">
        {t("introEyebrow")}
      </p>
      <div className="space-y-3.5 text-[14px] leading-[1.62] tracking-[-0.01em] text-neutral-800 [text-wrap:pretty] hyphens-auto sm:space-y-4 sm:text-[15px] sm:leading-[1.7] sm:tracking-normal">
        <p>{t("qr1")}</p>
        <p>{t("qr2")}</p>
        <p>{t("qr3")}</p>
      </div>
    </div>
  );
}

function SugestoesQrIntroFromUrl() {
  const searchParams = useSearchParams();
  if (!isSugestoesQrVisit(searchParams)) return null;
  return <SugestoesQrIntroCard />;
}

export function SugestoesForm() {
  const t = useTranslations("sugestoes");
  const searchParams = useSearchParams();
  const isQrVisit = isSugestoesQrVisit(searchParams);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [publish, setPublish] = useState(true);
  const [publishAs, setPublishAs] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "err">("idle");
  const [successBanner, setSuccessBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [attachmentError, setAttachmentError] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!successBanner) return;
    const id = window.setTimeout(() => setSuccessBanner(false), 6000);
    return () => window.clearTimeout(id);
  }, [successBanner]);

  const mbImg = Math.round(MAX_IMAGE_BYTES / (1024 * 1024));
  const mbAudio = Math.round((MAX_AUDIO_BYTES / (1024 * 1024)) * 10) / 10;
  const mbTotal = Math.round((MAX_TOTAL_BYTES / (1024 * 1024)) * 10) / 10;
  const canAddMoreImages = imageFiles.length < MAX_IMAGES;

  function totalAttachmentBytes(): number {
    return (
      imageFiles.reduce((s, f) => s + f.size, 0) + (audioFile?.size ?? 0)
    );
  }

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    e.target.value = "";
    setAttachmentError("");
    let validationError = "";
    setImageFiles((prev) => {
      const next = [...prev];
      for (const f of incoming) {
        if (next.length >= MAX_IMAGES) break;
        const type = (f.type || "application/octet-stream").toLowerCase();
        if (!isAllowedImageMime(type)) {
          validationError = t("errImageMime");
          continue;
        }
        if (f.size > MAX_IMAGE_BYTES) {
          validationError = t("errImageSize", { mb: mbImg });
          continue;
        }
        next.push(f);
      }
      return next;
    });
    if (validationError) setAttachmentError(validationError);
  }

  function removeImage(index: number) {
    setAttachmentError("");
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAudioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    setAttachmentError("");
    if (!f) {
      setAudioFile(null);
      return;
    }
    const type = (f.type || "application/octet-stream").toLowerCase();
    if (!isAllowedAudioMime(type)) {
      setAttachmentError(t("errAudioMime"));
      return;
    }
    if (f.size > MAX_AUDIO_BYTES) {
      setAttachmentError(t("errAudioSize", { mb: mbAudio }));
      return;
    }
    setAudioFile(f);
  }

  function clearAudio() {
    setAttachmentError("");
    setAudioFile(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    setAttachmentError("");
    try {
      if (totalAttachmentBytes() > MAX_TOTAL_BYTES) {
        setStatus("err");
        setErrorMsg(t("errTotalSize"));
        return;
      }

      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("message", message);
      fd.append("company", honeypotRef.current?.value ?? "");
      if (isQrVisit) {
        fd.append("fromQr", "1");
        fd.append("publish", publish ? "true" : "false");
        fd.append("publishAs", publishAs.trim().slice(0, 120));
      }
      for (const img of imageFiles) {
        fd.append("images", img);
      }
      if (audioFile) fd.append("audio", audioFile);

      const res = await fetch("/api/sugestoes", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setErrorMsg(data.error ?? t("errGeneric"));
        return;
      }
      setStatus("idle");
      setName("");
      setEmail("");
      setMessage("");
      setPublish(true);
      setPublishAs("");
      setImageFiles([]);
      setAudioFile(null);
      setSuccessBanner(true);
    } catch {
      setStatus("err");
      setErrorMsg(t("errNetwork"));
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-5 rounded-lg border border-black/[0.07] bg-white px-6 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none"
    >
      <Suspense fallback={null}>
        <SugestoesQrIntroFromUrl />
      </Suspense>

      {successBanner ? (
        <p
          className="rounded-lg border border-[#4a7c44]/20 bg-[#4a7c44]/5 px-4 py-3 text-[15px] leading-relaxed text-neutral-800"
          role="status"
        >
          {t("success")}
        </p>
      ) : null}

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="sugestoes-company">{t("honeypot")}</label>
        <input
          ref={honeypotRef}
          id="sugestoes-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="border border-black/10"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="sugestoes-name"
          className="block text-[13px] font-medium text-neutral-700"
        >
          {t("name")}{" "}
          <span className="font-normal text-black/45">{t("nameHint")}</span>
        </label>
        <input
          id="sugestoes-name"
          name="name"
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="h-11 w-full rounded-lg border border-black/12 bg-white px-3 text-[15px] text-neutral-900 outline-none transition focus:border-[#4a7c44]/45 focus:ring-2 focus:ring-[#4a7c44]/15"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="sugestoes-email"
          className="block text-[13px] font-medium text-neutral-700"
        >
          {t("email")}{" "}
          <span className="font-normal text-black/45">{t("nameHint")}</span>
        </label>
        <input
          id="sugestoes-email"
          name="email"
          type="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="h-11 w-full rounded-lg border border-black/12 bg-white px-3 text-[15px] text-neutral-900 outline-none transition focus:border-[#4a7c44]/45 focus:ring-2 focus:ring-[#4a7c44]/15"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="sugestoes-message"
          className="block text-[13px] font-medium text-neutral-700"
        >
          {t("message")}{" "}
          <span className="font-normal text-black/45">
            {t("messageHint")}
          </span>
        </label>
        <textarea
          id="sugestoes-message"
          name="message"
          required
          maxLength={8000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border border-black/12 bg-white px-3 py-2.5 text-[15px] leading-relaxed text-neutral-900 outline-none transition focus:border-[#4a7c44]/45 focus:ring-2 focus:ring-[#4a7c44]/15"
        />
      </div>

      <div className="space-y-2">
        <p className="text-[13px] font-medium text-neutral-700">
          {t("imagesAudio")}{" "}
          <span className="font-normal text-black/45">
            {t("optional")}
          </span>
        </p>
        <p className="text-[12px] leading-snug text-black/45">
          {t("attachmentsNote", {
            maxImages: MAX_IMAGES,
            mbImg,
            mbAudio,
            mbTotal,
          })}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4">
          <div className="block min-w-0 flex-1 space-y-2">
            <span className="block text-[12px] text-black/50">
              {t("imagesLabel")}
            </span>
            {imageFiles.length > 0 ? (
              <ul className="space-y-1.5 text-[13px] text-neutral-800">
                {imageFiles.map((f, i) => (
                  <li
                    key={`${f.name}-${f.size}-${i}`}
                    className="flex items-center justify-between gap-2 rounded-lg border border-black/10 bg-neutral-50/80 px-2.5 py-1.5"
                  >
                    <span className="min-w-0 truncate" title={f.name}>
                      {f.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="shrink-0 rounded-md px-2 py-0.5 text-[12px] font-medium text-[#4a7c44] underline-offset-2 hover:underline"
                    >
                      {t("remove")}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {canAddMoreImages ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="inline-flex h-10 items-center rounded-lg border-0 bg-[#4a7c44]/10 px-3 py-2 text-[13px] font-medium text-[#4a7c44]"
                >
                  {t("chooseFiles")}
                </button>
                <p className="text-[12px] text-black/45">{t("noFileChosen")}</p>
                <input
                  ref={imageInputRef}
                  type="file"
                  name="images"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  multiple
                  onChange={handleImagesChange}
                  className="sr-only"
                />
              </div>
            ) : (
              <p className="text-[12px] text-black/45">
                {t("imageLimit", { count: MAX_IMAGES })}
              </p>
            )}
          </div>
          <div className="block min-w-0 flex-1 space-y-2">
            <span className="block text-[12px] text-black/50">
              {t("audioLabel")}
            </span>
            {audioFile ? (
              <div className="flex items-center justify-between gap-2 rounded-lg border border-black/10 bg-neutral-50/80 px-2.5 py-1.5 text-[13px] text-neutral-800">
                <span className="min-w-0 truncate" title={audioFile.name}>
                  {audioFile.name}
                </span>
                <button
                  type="button"
                  onClick={clearAudio}
                  className="shrink-0 rounded-md px-2 py-0.5 text-[12px] font-medium text-[#4a7c44] underline-offset-2 hover:underline"
                >
                  {t("remove")}
                </button>
              </div>
            ) : null}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="inline-flex h-10 items-center rounded-lg border-0 bg-[#4a7c44]/10 px-3 py-2 text-[13px] font-medium text-[#4a7c44]"
              >
                {t("chooseFiles")}
              </button>
              {!audioFile ? (
                <p className="text-[12px] text-black/45">{t("noFileChosen")}</p>
              ) : null}
              <input
                ref={audioInputRef}
                type="file"
                name="audio"
                accept="audio/*"
                onChange={handleAudioChange}
                className="sr-only"
              />
            </div>
          </div>
        </div>
        {attachmentError ? (
          <p className="text-[13px] text-amber-800" role="status">
            {attachmentError}
          </p>
        ) : null}
      </div>

      {status === "err" ? (
        <p className="text-[14px] text-[#2d4c3b]" role="alert">
          {errorMsg}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        {isQrVisit ? (
          <div className="w-full space-y-4 rounded-lg border border-black/[0.06] bg-neutral-50/80 px-4 py-4 sm:max-w-[26rem] sm:px-5">
            <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug text-neutral-900">
              <input
                type="checkbox"
                checked={publish}
                onChange={(e) => setPublish(e.target.checked)}
                className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 rounded border-black/25 accent-[#4a7c44]"
              />
              <span className="font-medium">{t("publishLabel")}</span>
            </label>

            <div className="space-y-1.5">
              <label
                htmlFor="sugestoes-publish-as"
                className="block text-[13px] font-medium text-neutral-700"
              >
                {t("qualNomeLabel")}
              </label>
              <input
                id="sugestoes-publish-as"
                maxLength={120}
                value={publishAs}
                onChange={(e) => setPublishAs(e.target.value)}
                placeholder={t("publishAsDefault")}
                autoComplete="nickname"
                className="h-11 w-full rounded-lg border border-black/12 bg-white px-3 text-[15px] text-neutral-900 placeholder:text-black/35 outline-none transition focus:border-[#4a7c44]/45 focus:ring-2 focus:ring-[#4a7c44]/15"
              />
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 min-w-[8rem] items-center justify-center rounded-xl border border-[#4a7c44] bg-[#4a7c44] px-6 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#2d4c3b] disabled:opacity-60 sm:rounded-full"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
