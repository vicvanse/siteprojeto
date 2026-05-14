import { formatCategoryLabel } from "@/data/victor-notes-posts";

/** Chaves = valor exacto de `post.category` na base (pt-BR). */
const CATEGORY_SOURCE_KEYS = new Set([
  "anime",
  "contato",
  "conto",
  "contos",
  "desenho",
  "documentário",
  "ensaio",
  "gravura",
  "jornais",
  "livro",
  "literatura",
  "manga",
  "música",
  "nota",
  "pintura",
  "pintura digital",
  "pixel art",
  "podcast",
  "poema",
  "recurso",
  "série",
  "site",
  "textos",
  "vídeos",
  "victor",
  "adriel",
]);

/**
 * Rótulo localizado de categoria; fallback para a formatação pt hereditária
 * se a chave não estiver no catálogo.
 */
export function getLocalizedCategoryLabel(
  category: string,
  t: (key: string) => string,
): string {
  const raw = category.trim();
  if (!raw) return category;
  if (CATEGORY_SOURCE_KEYS.has(raw)) return t(raw);
  return formatCategoryLabel(category);
}
