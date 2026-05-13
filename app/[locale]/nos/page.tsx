import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import HomePage from "@/components/site/home-page";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-hidden />}>
      <HomePage />
    </Suspense>
  );
}
