/** Texto longo do convite — só em cartão QR (`?ref=qr`, etc.). */
export const SUGESTOES_QR_INTRO_PARAGRAPHS = [
  "Quais são as coisas mais interessantes que você viu, fez ou encontrou na vida?",
  "Pode ser absolutamente qualquer coisa: uma história, uma pessoa, uma ideia, um site, um filme, um livro, um lugar, um acontecimento, um conhecimento, um pensamento aleatório, uma marca de roupa, um gesto, um carro, uma descoberta.",
  "O que, entre tudo, você sentiria vontade de passar adiante para o seu eu do passado ou para alguém importante?",
] as const;

/** URL do QR de cartão deve incluir um destes (ex.: `.../victor/sugestoes?ref=qr`). */
export function isSugestoesQrVisit(searchParams: URLSearchParams): boolean {
  const ref = searchParams.get("ref");
  const from = searchParams.get("from");
  const qr = searchParams.get("qr");
  return (
    ref === "qr" || from === "qr" || qr === "1" || qr === "true"
  );
}

/** Mesma regra que `isSugestoesQrVisit`, para `searchParams` do servidor (`page.tsx`). */
export function isSugestoesQrVisitQuery(
  q: Record<string, string | string[] | undefined>,
): boolean {
  const one = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const ref = one(q.ref);
  const from = one(q.from);
  const qr = one(q.qr);
  return (
    ref === "qr" || from === "qr" || qr === "1" || qr === "true"
  );
}
