import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { redirect } from "@/i18n/navigation";
import HomePage from "@/components/site/home-page";
import { isSugestoesQrVisitQuery } from "@/components/victor/sugestoes-intro-copy";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  if (!isSugestoesQrVisitQuery(sp)) {
    redirect({ href: "/victor/sugestoes", locale });
  }
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-hidden />}>
      <HomePage />
    </Suspense>
  );
}
