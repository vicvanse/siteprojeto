function publicEnv(key: string): string {
  const v = process.env[key];
  return typeof v === "string" ? v.trim() : "";
}

/** Preencha via `.env.local` (ex.: `NEXT_PUBLIC_INSTAGRAM_URL`). Deixe vazio para ocultar o link. */
export const INSTAGRAM_URL = publicEnv("NEXT_PUBLIC_INSTAGRAM_URL");
export const TIKTOK_URL = publicEnv("NEXT_PUBLIC_TIKTOK_URL");
export const CONTACT_EMAIL = publicEnv("NEXT_PUBLIC_CONTACT_EMAIL");
export const GOODREADS_URL = publicEnv("NEXT_PUBLIC_GOODREADS_URL");
export const SPOTIFY_USER_URL = publicEnv("NEXT_PUBLIC_SPOTIFY_USER_URL");

/** Texto do botão/link Instagram quando `NEXT_PUBLIC_INSTAGRAM_URL` está definido. */
export const INSTAGRAM_LINK_LABEL =
  publicEnv("NEXT_PUBLIC_INSTAGRAM_LABEL") || "Instagram";

/** Rodapé fixo: primeiro e terceiro mailto; o do meio é o contacto USP (layout em três repetições). */
export const VICVANSE_EMAIL = "victorcvanse@gmail.com";
export const ADRIEL_LOURENCO_EMAIL = "adriellourenco@usp.br";
export const VICVANSE_INSTAGRAM_URL = "https://www.instagram.com/vicvanse/";
