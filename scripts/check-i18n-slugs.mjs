import fs from "node:fs";

const src = fs.readFileSync("data/victor-notes-posts.ts", "utf8");
const s = new Set();
for (const m of src.matchAll(/slug: "([^"]+)"/g)) {
  if (m[1] !== "string") s.add(m[1]);
}
const b1 = JSON.parse(fs.readFileSync("data/victor-post-i18n/batch-1.json", "utf8"));
const b2 = JSON.parse(fs.readFileSync("data/victor-post-i18n/batch-2.json", "utf8"));
const b3 = JSON.parse(fs.readFileSync("data/victor-post-i18n/batch-3.json", "utf8"));
const b = new Set([...Object.keys(b1), ...Object.keys(b2), ...Object.keys(b3)]);
const miss = [...s].filter((x) => !b.has(x));
const extra = [...b].filter((x) => !s.has(x));
console.log("source", s.size, "batch", b.size);
console.log("missing from batch", miss);
console.log("extra in batch", extra);
