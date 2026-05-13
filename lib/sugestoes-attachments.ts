/** Limites seguros para o body em serverless (~4,5 MB na Vercel) + Discord (~8 MB/ficheiro). */

export const MAX_IMAGES = 2;
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB cada
export const MAX_AUDIO_BYTES = 1.5 * 1024 * 1024; // 1,5 MB
/** Soma de todos os anexos; mantém margem ao limite típico do body em serverless. */
export const MAX_TOTAL_BYTES = 4.2 * 1024 * 1024;

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

const AUDIO_TYPES = new Set([
  "audio/mpeg",
  "audio/mp4",
  "audio/webm",
  "audio/wav",
  "audio/ogg",
  "audio/x-m4a",
]);

export function isAllowedImageMime(type: string): boolean {
  return IMAGE_TYPES.has(type.toLowerCase());
}

export function isAllowedAudioMime(type: string): boolean {
  return AUDIO_TYPES.has(type.toLowerCase());
}

export interface DiscordAttachment {
  data: Buffer;
  filename: string;
  contentType: string;
}

function bufferFromFile(f: File): Promise<Buffer> {
  return f.arrayBuffer().then((ab) => Buffer.from(ab));
}

/** Extrai imagens + um áudio opcional do FormData; devolve erro ou lista para o Discord. */
export async function collectSugestoesAttachments(form: FormData): Promise<
  | { ok: true; attachments: DiscordAttachment[]; summary: string }
  | { ok: false; error: string }
> {
  const rawImages = form
    .getAll("images")
    .filter((x): x is File => x instanceof File && x.size > 0);
  const rawAudio = form.get("audio");

  if (rawImages.length > MAX_IMAGES) {
    return { ok: false, error: `No máximo ${MAX_IMAGES} imagens.` };
  }

  const attachments: DiscordAttachment[] = [];
  let total = 0;

  for (let i = 0; i < rawImages.length; i++) {
    const f = rawImages[i];
    const type = (f.type || "application/octet-stream").toLowerCase();
    if (!IMAGE_TYPES.has(type)) {
      return {
        ok: false,
        error: "Imagens: use JPEG, PNG, GIF ou WebP.",
      };
    }
    if (f.size > MAX_IMAGE_BYTES) {
      const mb = MAX_IMAGE_BYTES / (1024 * 1024);
      const mbLabel = Number.isInteger(mb) ? String(mb) : mb.toFixed(1).replace(/\.0$/, "");
      return {
        ok: false,
        error: `Cada imagem deve ter no máximo ${mbLabel} MB.`,
      };
    }
    total += f.size;
    const buf = await bufferFromFile(f);
    const ext =
      type === "image/jpeg"
        ? "jpg"
        : type === "image/png"
          ? "png"
          : type === "image/gif"
            ? "gif"
            : "webp";
    attachments.push({
      data: buf,
      filename: f.name.replace(/[^\w.\-]/g, "_") || `imagem-${i + 1}.${ext}`,
      contentType: type,
    });
  }

  if (rawAudio instanceof File && rawAudio.size > 0) {
    const type = (rawAudio.type || "application/octet-stream").toLowerCase();
    if (!AUDIO_TYPES.has(type)) {
      return {
        ok: false,
        error: "Áudio: use MP3, M4A, OGG, WAV ou WebM.",
      };
    }
    if (rawAudio.size > MAX_AUDIO_BYTES) {
      return {
        ok: false,
        error: `O áudio deve ter no máximo ${Math.round((MAX_AUDIO_BYTES / (1024 * 1024)) * 10) / 10} MB.`,
      };
    }
    total += rawAudio.size;
    const buf = await bufferFromFile(rawAudio);
    const ext = type.includes("mpeg")
      ? "mp3"
      : type.includes("mp4") || type.includes("m4a")
        ? "m4a"
        : type.includes("ogg")
          ? "ogg"
          : type.includes("wav")
            ? "wav"
            : "webm";
    attachments.push({
      data: buf,
      filename: rawAudio.name.replace(/[^\w.\-]/g, "_") || `audio.${ext}`,
      contentType: type,
    });
  }

  if (total > MAX_TOTAL_BYTES) {
    return {
      ok: false,
      error:
        "O total dos anexos é demasiado grande. Reduza o tamanho das imagens ou do áudio.",
    };
  }

  const parts: string[] = [];
  if (rawImages.length) parts.push(`${rawImages.length} imagem(ns)`);
  if (rawAudio instanceof File && rawAudio.size > 0) parts.push("1 áudio");

  return {
    ok: true,
    attachments,
    summary: parts.length ? parts.join(", ") : "",
  };
}
