#!/usr/bin/env node
/**
 * Build guard: every published object with status "free" must also be listed
 * in public.papers_free_objects (supabase/papers.sql). The database only lets
 * readers claim ids from that table, so a free object missing there would
 * show a "Get" button that silently fails.
 *
 * Runs before `next build` (npm "prebuild"). Plain text parsing on purpose:
 * no TypeScript loader, no dependencies.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifacts = readFileSync(path.join(root, "src/data/artifacts.ts"), "utf8");
const sql = readFileSync(path.join(root, "supabase/papers.sql"), "utf8");

const published = new Set(
  [...(artifacts.match(/PUBLISHED_IDS\s*=\s*new Set\(\[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map(
    (m) => m[1],
  ),
);

/* Each object literal: from one `id: "…"` to the next. */
const freeIds = new Set();
const idRe = /\bid:\s*"([^"]+)"/g;
const ids = [...artifacts.matchAll(idRe)];
ids.forEach((m, i) => {
  const block = artifacts.slice(m.index, ids[i + 1]?.index ?? artifacts.length);
  if (/\bstatus:\s*"free"/.test(block)) freeIds.add(m[1]);
});

const inDb = new Set();
for (const m of sql.matchAll(/insert\s+into\s+public\.papers_free_objects[^;]*?values([^;]*);/gi)) {
  for (const v of m[1].matchAll(/'([^']+)'/g)) inDb.add(v[1]);
}

const missing = [...freeIds].filter((id) => published.has(id) && !inDb.has(id));
if (missing.length > 0) {
  console.error(
    `\n[check-free-objects] Published free object(s) not in papers_free_objects: ${missing.join(", ")}\n` +
      "Add them to supabase/papers.sql AND run in Supabase:\n" +
      `  insert into public.papers_free_objects (object_id) values ${missing
        .map((id) => `('${id}')`)
        .join(", ")} on conflict do nothing;\n`,
  );
  process.exit(1);
}
console.log(
  `[check-free-objects] ok: ${[...freeIds].filter((id) => published.has(id)).join(", ") || "no free objects"} in papers_free_objects`,
);
