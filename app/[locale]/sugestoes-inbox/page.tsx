import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import {
  hasRedisConfigured,
  listSugestoesRecent,
} from "@/lib/sugestoes-storage";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  }
  const t = await getTranslations({ locale, namespace: "sugestoesInbox" });
  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function SugestoesInboxPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  }
  const t = await getTranslations("sugestoesInbox");

  const inboxToken = process.env.SUGESTOES_INBOX_TOKEN;
  if (!inboxToken) notFound();

  const { token } = await searchParams;
  if (token !== inboxToken) notFound();

  if (!hasRedisConfigured()) {
    return (
      <div className="min-h-screen bg-white px-5 py-12 font-sans text-neutral-800 sm:px-8">
        <div className="mx-auto max-w-lg text-[15px] leading-relaxed">
          <h1 className="text-lg font-semibold text-neutral-900">
            {t("title")}
          </h1>
          <p className="mt-3 text-black/60">
            {t("configNotice", {
              url: t("urlKey"),
              token: t("tokenKey"),
            })}
          </p>
        </div>
      </div>
    );
  }

  const entries = await listSugestoesRecent(100);

  return (
    <div className="min-h-screen bg-white px-5 py-10 font-sans text-neutral-800 sm:px-8 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/45">
          {t("sugestoes")}
        </h1>
        <p className="mt-2 text-[13px] text-black/50">
          {t("count", { n: entries.length })}
        </p>

        <ul className="mt-8 flex flex-col gap-6">
          {entries.length === 0 ? (
            <li className="rounded-lg border border-dashed border-black/15 bg-black/[0.02] px-5 py-10 text-center text-[14px] text-black/45">
              {t("empty")}
            </li>
          ) : (
            entries.map((e) => (
              <li
                key={e.id}
                className="rounded-lg border border-black/[0.08] bg-[#fafafa] px-5 py-4 shadow-sm"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                  {new Date(e.at).toLocaleString(locale, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
                <p className="mt-2 text-[13px] text-black/55">
                  <span className="font-medium text-neutral-800">
                    {t("name")}:
                  </span>{" "}
                  {e.name || "—"}{" "}
                  <span className="text-black/35">·</span>{" "}
                  <span className="font-medium text-neutral-800">
                    {t("email")}:
                  </span>{" "}
                  {e.email || "—"}
                </p>
                {e.fromQr === true ? (
                  <p className="mt-2 text-[13px] text-black/55">
                    <span className="font-medium text-neutral-800">
                      {t("publishField")}:
                    </span>{" "}
                    {e.publish === true ? t("answerYes") : t("answerNo")}
                    {" · "}
                    <span className="font-medium text-neutral-800">
                      {t("publishAsField")}:
                    </span>{" "}
                    {e.publishAs !== undefined && e.publishAs !== ""
                      ? e.publishAs
                      : "—"}
                  </p>
                ) : null}
                {e.attachmentSummary ? (
                  <p className="mt-1.5 text-[13px] text-black/45">
                    {t("attachments")} {e.attachmentSummary}
                  </p>
                ) : null}
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-[1.65] text-neutral-900 [text-wrap:pretty]">
                  {e.message}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
