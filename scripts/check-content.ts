/**
 * Content-check — draait als test. Run: npx tsx scripts/check-content.ts
 * Bron: docs/strategy/2026-10-09-website-gtm-handover.md (§6, §11, §14, §16, §18)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  packages, analysis, formatEuro, categories, processes, demos, campaigns, faqs,
  demoById, processById, categoryById, DEMO_CLOSING, redirects,
} from "../src/content";
import * as content from "../src/content";

const fouten: string[] = [];
const check = (ok: boolean, m: string) => { if (!ok) fouten.push(m); };

// --- prijzen (§6) ---
const verwacht: Record<string, [number, number, number | undefined]> = {
  voorbereiden: [2950, 595, 0.5],
  werkstroom: [4950, 1250, 1],
  opschalen: [7950, 1950, 2],
  custom: [12500, 2500, undefined],
};
check(packages.map((p) => p.id).join(",") === "voorbereiden,werkstroom,opschalen,custom", "pakketvolgorde onjuist");
for (const p of packages) {
  const [s, m, u] = verwacht[p.id];
  check(p.setupFrom === s, `${p.id}: setupFrom ${p.setupFrom} ≠ ${s}`);
  check(p.monthlyFrom === m, `${p.id}: monthlyFrom ${p.monthlyFrom} ≠ ${m}`);
  check(p.changeHoursPerMonth === u, `${p.id}: changeHoursPerMonth ${p.changeHoursPerMonth} ≠ ${u}`);
}
check(packages.find((p) => p.id === "werkstroom")?.badge === "Aanbevolen start", "Werkstroom mist badge 'Aanbevolen start'");
check(packages.filter((p) => p.badge).length === 1, "precies één pakket mag een badge hebben");
check(analysis.price === 750 && analysis.creditDays === 60, "analyse moet €750 / 60 dagen zijn");
check(formatEuro(12500) === "€12.500" && formatEuro(595) === "€595", "formatEuro onjuist");

// --- aantallen en verwijzingen ---
check(categories.length === 4 && processes.length === 4 && demos.length === 4 && campaigns.length === 4, "verwacht 4×4 categorieën/processen/demo's/campagnes");
for (const c of categories) {
  check(!!demoById(c.demoId), `categorie ${c.id}: demo ${c.demoId} bestaat niet`);
  check(c.tasks.length >= 4 && c.limits.length >= 1 && c.measures.length >= 2, `categorie ${c.id}: taken/grenzen/meet onvolledig`);
  check(c.seoTitle.endsWith("| Lead Velocity"), `categorie ${c.id}: seoTitle eindigt niet op '| Lead Velocity'`);
}
for (const p of processes) {
  check(p.categoryIds.length === 2, `proces ${p.id}: verwacht 2 categorievoorbeelden`);
  p.categoryIds.forEach((id) => check(!!categoryById(id), `proces ${p.id}: onbekende categorie ${id}`));
}
for (const c of campaigns) {
  check(c.noindex === true, `campagne ${c.id}: noindex moet true zijn`);
  check(!!demoById(c.demoId) && !!categoryById(c.categoryId), `campagne ${c.id}: demo/categorie bestaat niet`);
  check(c.tasks.length === 3, `campagne ${c.id}: precies 3 taken`);
}
for (const d of demos) {
  check(d.evidence === "illustrative", `demo ${d.id}: evidence moet 'illustrative' zijn`);
  check(d.input.fields.some((f) => f.value === null), `demo ${d.id}: moet een ontbrekend veld hebben`);
}
check(DEMO_CLOSING === "Dit voorbeeld laat de werkwijze zien. De inrichting en uitkomst hangen af van jullie proces en gegevens.", "DEMO_CLOSING wijkt af van §14");
check(faqs.length === 9, `verwacht 9 FAQ-items (§16), kreeg ${faqs.length}`);
check(processById("commerciele-voorbereiding")?.ctaProcess === "sales", "commerciële voorbereiding moet ctaProcess 'sales' hebben");

// --- tone (§3, §6) over ALLE strings in src/content ---
const verboden = [
  /digitale transformatie/i, /\brevolutie/i, /toekomstbestendig/i, /growth engine/i, /eindeloze mogelijkheden/i,
  /meest gekozen/i, /gegarandeerd/i, /geld terug/i, /niet tevreden/i, /\d+\s?%/, /\bsaai\b/i, /oudbollig/i,
  /volledig autonoom/i, /AVG-proof/i,
];
const strings: { pad: string; s: string }[] = [];
const walk = (v: unknown, pad: string) => {
  if (typeof v === "string") strings.push({ pad, s: v });
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${pad}[${i}]`));
  else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walk(x, `${pad}.${k}`));
};
Object.entries(content).forEach(([k, v]) => { if (typeof v !== "function") walk(v, k); });
for (const { pad, s } of strings) for (const re of verboden) check(!re.test(s), `${pad}: verboden patroon ${re} in "${s.slice(0, 80)}"`);
check(!strings.some(({ pad, s }) => /Bart/.test(s) && !/^(over|home\.about)/.test(pad)), "naam 'Bart' alleen in over.* en home.about.*");

// --- geen euro-literals buiten src/content ---
const scan = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? scan(p) : /\.tsx?$/.test(f) ? [p] : [];
  });
for (const dir of ["src/pages/site", "src/components/site"]) {
  let files: string[] = [];
  try { files = scan(dir); } catch { continue; }
  for (const f of files) check(!/€\s?\d/.test(readFileSync(f, "utf8")), `${f}: euro-literal gevonden — prijzen alleen uit src/content/pricing.ts`);
}

// --- geen dode of verouderde CTA's in src/ (/#contact, AI Ops Audit) ---
// Uitzondering: src/content/redirects.ts mag /ai-ops-audit als redirect-bron noemen.
const ctaVerboden: [RegExp, string][] = [
  [/href="\/#contact"/, 'href="/#contact"'],
  [/href:\s*['"]\/#contact['"]/, "href: '/#contact'"],
  [/\/ai-ops-audit/, "/ai-ops-audit"],
  [/AI Ops Audit/, "AI Ops Audit"],
];
for (const f of scan("src")) {
  const tekst = readFileSync(f, "utf8");
  const isRedirects = f.replace(/\\/g, "/") === "src/content/redirects.ts";
  for (const [re, label] of ctaVerboden) {
    if (isRedirects && label === "/ai-ops-audit") continue;
    check(!re.test(tekst), `${f}: verboden CTA-patroon ${label} — gebruik checkHref() uit src/lib/cta.ts`);
  }
}

// --- "werkstroomcheck" is vervangen door "gratis adviesgesprek" (besluit Bart, 2026-10-11) ---
// Toegestaan: de Supabase-functienaam en de redirect-bron van de oude URL.
const toegestaanWsc = [/functions\.invoke\(["']werkstroomcheck["']/g, /supabase\/functions\/werkstroomcheck/g, /from: "\/werkstroomcheck"/g];
for (const f of scan("src")) {
  let tekst = readFileSync(f, "utf8");
  for (const re of toegestaanWsc) tekst = tekst.replace(re, "");
  check(!/werkstroomcheck/i.test(tekst), `${f}: bevat nog "werkstroomcheck" — gebruik "gratis adviesgesprek" / ctaLabels`);
}

// --- dynamische hero: elke categorie heeft een procesnaam voor de roterende kop ---
for (const c of categories) check(/^[a-z]+$/.test(c.heroNoun ?? ""), `categorie ${c.id}: heroNoun ontbreekt of is niet één woord in kleine letters`);

// --- CLAUDE.md noemt dezelfde prijzen ---
const claude = readFileSync("CLAUDE.md", "utf8");
for (const p of packages) {
  check(claude.includes(`${p.name} — ${formatEuro(p.setupFrom)} + ${formatEuro(p.monthlyFrom)}`), `CLAUDE.md mist "${p.name} — ${formatEuro(p.setupFrom)} + ${formatEuro(p.monthlyFrom)}"`);
}

// --- redirects ---
check(redirects.every((r) => r.from !== r.to && r.to.startsWith("/")), "redirect met lege of identieke bestemming");
check(!redirects.some((r) => r.to === "/"), "geen blinde redirect naar /");

if (fouten.length) { console.error(`✗ ${fouten.length} fout(en):\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ content klopt met de handover");
