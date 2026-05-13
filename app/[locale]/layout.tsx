import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Geist,
  Geist_Mono,
  Great_Vibes,
  Inter,
  Newsreader,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteMetadataBaseUrl } from "@/lib/site-url";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const signature = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fontClassName = `${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${inter.variable} ${signature.variable} h-full antialiased`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {
      metadataBase: new URL(siteMetadataBaseUrl()),
      title: "Site",
    };
  }
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(siteMetadataBaseUrl()),
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={fontClassName}>
      <body className="min-h-full bg-white text-black antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
