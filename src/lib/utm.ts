export type Utm = { source?: string; medium?: string; campaign?: string; content?: string };
const KEY = "lv_utm";

/** Bewaart utm_* uit de URL in sessionStorage (alleen als er utm-parameters zijn). Geen PII. */
export function captureUtm(search: string): void {
  try {
    const p = new URLSearchParams(search);
    const utm: Utm = {};
    for (const k of ["source", "medium", "campaign", "content"] as const) {
      const v = p.get(`utm_${k}`);
      if (v) utm[k] = v.slice(0, 100);
    }
    if (Object.keys(utm).length) sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    /* sessionStorage niet beschikbaar — negeren */
  }
}

export function readUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Utm;
  } catch {
    return {};
  }
}
