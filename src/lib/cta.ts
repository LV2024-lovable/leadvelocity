import type { CategoryId, CtaProcess, PackageId, DemoId, CampaignId } from "@/content/types";
import { categories } from "@/content/categories";
import { packages } from "@/content/pricing";
import { demos } from "@/content/demos";
import { campaigns } from "@/content/campaigns";
import { processOptions } from "@/content/site";

export type CheckContext = {
  source?: string;
  category?: CategoryId;
  process?: CtaProcess;
  package?: PackageId;
  demo?: DemoId;
  campaign?: CampaignId;
};

const ORDER: (keyof CheckContext)[] = ["source", "category", "process", "package", "demo", "campaign"];

function build(path: string, params: [string, string | undefined][]): string {
  const q = params.filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join("&");
  return q ? `${path}?${q}` : path;
}

export function checkHref(ctx: CheckContext): string {
  return build("/werkstroomcheck", ORDER.map((k) => [k, ctx[k]]));
}

export function demoHref(demo?: DemoId, source?: string): string {
  return build("/voorbeelden", [["demo", demo], ["source", source]]);
}

const known = {
  category: new Set<string>(categories.map((c) => c.id)),
  process: new Set<string>(processOptions.map((p) => p.value).filter((v) => v !== "anders")),
  package: new Set<string>(packages.map((p) => p.id)),
  demo: new Set<string>(demos.map((d) => d.id)),
  campaign: new Set<string>(campaigns.map((c) => c.id)),
};

/** Leest contextparameters; onbekende waarden worden genegeerd. */
export function parseCheckContext(search: string): CheckContext {
  const p = new URLSearchParams(search);
  const out: CheckContext = {};
  const source = (p.get("source") ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 64);
  if (source) out.source = source;
  for (const k of ["category", "process", "package", "demo", "campaign"] as const) {
    const v = p.get(k);
    if (v && known[k].has(v)) (out as Record<string, string>)[k] = v;
  }
  return out;
}
