// Run: npx tsx scripts/check-redirects.ts
import { readFileSync } from "node:fs";
import { redirects, indexableRoutes, processes } from "../src/content";

const app = readFileSync("src/App.tsx", "utf8");
const routePaths = new Set([...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]));
// /oplossingen/:id rendert alleen de vier bekende procesfamilies
if (routePaths.has("/oplossingen/:id")) processes.forEach((p) => routePaths.add(`/oplossingen/${p.id}`));
const fouten: string[] = [];

for (const r of redirects) {
  const target = r.to.split("#")[0];
  if (!routePaths.has(target)) fouten.push(`redirect ${r.from} → ${r.to}: doel ${target} is geen route`);
  if (redirects.some((x) => x.from === target)) fouten.push(`redirect-keten: ${r.from} → ${target} → …`);
  if (routePaths.has(r.from)) fouten.push(`redirect ${r.from} botst met een gewone route`);
}
for (const p of indexableRoutes) if (!routePaths.has(p)) fouten.push(`indexeerbare route ${p} bestaat niet in App.tsx`);
if (!app.includes("redirects.map")) fouten.push("App.tsx moet redirects uit src/content/redirects.ts renderen");
const idxRedirectsMap = app.indexOf("redirects.map");
const idxProcessParam = app.indexOf('path="/oplossingen/:id"');
if (idxRedirectsMap === -1 || idxProcessParam === -1 || idxRedirectsMap > idxProcessParam) fouten.push("redirects moeten vóór /oplossingen/:id staan (oude slugs)");

if (fouten.length) { console.error(`✗ ${fouten.length}:\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ redirects en routes kloppen");
