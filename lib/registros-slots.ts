/**
 * Slots extra da grelha (quando reactivares a lista em Registros).
 * Os vídeos 01/02 estão em `app/page.tsx` (`REGISTROS_VIDEOS`).
 */
export const REGISTROS_SLOTS = [
  { id: "03", kind: "vídeo", hint: "Making-of, ensaio, registo de evento." },
  { id: "04", kind: "foto", hint: "Série, retrato, paisagem." },
  { id: "05", kind: "foto", hint: "Mais um espaço para a marca." },
  { id: "06", kind: "vídeo", hint: "Longo ou curto — o slot é neutro." },
] as const;
