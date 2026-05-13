import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const d = path.dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(path.join(d, "batch-2-tail.json"), "utf8");
export const batch2Tail = JSON.parse(raw);
