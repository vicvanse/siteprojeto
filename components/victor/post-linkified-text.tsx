import type { ReactNode } from "react";

const linkClassName =
  "font-medium text-[#791126] underline decoration-[#791126]/25 underline-offset-2 break-all [overflow-wrap:anywhere] transition hover:decoration-[#791126]";

/** Remove pontuação final que frequentemente cola ao URL na frase. */
function trimUrlForHref(raw: string): string {
  let s = raw;
  const punctEnd = /[.,;:!?）]+$/u;
  while (punctEnd.test(s)) s = s.replace(punctEnd, "");
  return s;
}

/**
 * Parte texto plano em nós de texto e âncoras para `http(s)://…`.
 * Usado nos cartões e na página `/post/[slug]`.
 */
export function linkifyPlainText(text: string): ReactNode[] {
  const re = /https?:\/\/[^\s<>"']+/gi;
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const s = text;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) nodes.push(s.slice(last, m.index));
    const raw = m[0];
    const href = trimUrlForHref(raw);
    if (href.length >= 8 && /^https?:\/\//i.test(href)) {
      nodes.push(
        <a
          key={`${m.index}-${href.slice(0, 32)}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {href}
        </a>,
      );
    } else {
      nodes.push(raw);
    }
    last = m.index + raw.length;
  }
  if (last < s.length) nodes.push(s.slice(last));
  return nodes;
}
