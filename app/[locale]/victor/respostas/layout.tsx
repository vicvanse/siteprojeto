import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) {
    setRequestLocale(locale);
  }
  const t = await getTranslations({ locale, namespace: "sugestoes" });
  const meta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: `${t("responsesArchiveHeading")} — ${meta("title")}`,
    description:
      "Publicações ligadas às sugestões — curadoria e notas em resposta.",
    robots: { index: false, follow: false },
  };
}

export default function VictorRespostasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
