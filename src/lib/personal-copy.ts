/** Stable digital exemplar metadata derived from identity + object. */

export type PersonalCopy = {
  copy: string;
  acquired: string;
  version: string;
};

function hash32(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pad(n: number, width: number) {
  return String(n).padStart(width, "0");
}

/** COPY #### + ACQUIRED date — materiality without fake scarcity. */
export function personalCopy(
  identity: string,
  artifactId: string,
  version = "1.0",
): PersonalCopy {
  const h = hash32(`${identity.trim().toLowerCase()}::${artifactId}`);
  const copy = pad((h % 9000) + 1000, 4);
  const day = (h % 27) + 1;
  const month = ((h >>> 5) % 12) + 1;
  const year = 26 + ((h >>> 9) % 2);
  const acquired = `${pad(day, 2)}.${pad(month, 2)}.${pad(year, 2)}`;
  return { copy, acquired, version };
}

export function identityInitials(identity: string | null | undefined) {
  if (!identity) return "—";
  const local = identity.split("@")[0] ?? identity;
  const cleaned = local.replace(/[^a-zA-Z0-9]/g, "");
  if (!cleaned) return "VC";
  return cleaned.slice(0, 2).toUpperCase();
}

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

/** `27.10.26` → `27 OCT 2026` for OWNED stamp. */
export function formatAcquiredStamp(acquired: string) {
  const [dd, mm, yy] = acquired.split(".");
  const month = MONTHS[(Number(mm) || 1) - 1] ?? "JAN";
  const year = 2000 + (Number(yy) || 0);
  return `${dd} ${month} ${year}`;
}
