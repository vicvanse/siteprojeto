import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Locale negotiation: URL → NEXT_LOCALE cookie → Accept-Language → defaultLocale (see i18n/routing.ts). */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
