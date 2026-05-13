import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type MessagesModule = { default: Record<string, unknown> };

async function loadMessages(locale: string) {
  switch (locale) {
    case "en":
      return ((await import("../messages/en.json")) as MessagesModule).default;
    case "ko":
      return ((await import("../messages/ko.json")) as MessagesModule).default;
    case "pt-BR":
      return ((await import("../messages/pt-BR.json")) as MessagesModule)
        .default;
    case "es":
      return ((await import("../messages/es.json")) as MessagesModule).default;
    case "ja":
      return ((await import("../messages/ja.json")) as MessagesModule).default;
    case "de":
      return ((await import("../messages/de.json")) as MessagesModule).default;
    case "fr":
      return ((await import("../messages/fr.json")) as MessagesModule).default;
    case "it":
      return ((await import("../messages/it.json")) as MessagesModule).default;
    case "zh-CN":
      return ((await import("../messages/zh-CN.json")) as MessagesModule)
        .default;
    case "zh-TW":
      return ((await import("../messages/zh-TW.json")) as MessagesModule)
        .default;
    default:
      return ((await import("../messages/pt-BR.json")) as MessagesModule)
        .default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
