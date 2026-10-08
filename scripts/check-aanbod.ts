/**
 * Check voor src/data/aanbod.ts — draait als test.
 * Run: npx tsx scripts/check-aanbod.ts
 * Faalt (exit 1) bij elke afwijking van de spec
 * docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md
 */
import { readFileSync } from "node:fs";
import {
  uitkomsten,
  pakketten,
  maandtiers,
  voorwaarden,
  maatwerk,
  kansenscan,
  markten,
  formatEuro,
  alleTeksten,
} from "../src/data/aanbod";

const fouten: string[] = [];
const check = (ok: boolean, melding: string) => {
  if (!ok) fouten.push(melding);
};

// --- formatEuro ---
check(formatEuro(2000) === "€2.000", `formatEuro(2000) gaf ${formatEuro(2000)}`);
check(formatEuro(149) === "€149", `formatEuro(149) gaf ${formatEuro(149)}`);
check(formatEuro(10000) === "€10.000", `formatEuro(10000) gaf ${formatEuro(10000)}`);

// --- uitkomsten ---
const uitkomstIds = uitkomsten.map((u) => u.id);
check(
  JSON.stringify(uitkomstIds) ===
    JSON.stringify(["tijd-besparen", "klantbehoud", "kennisbank", "data-inzicht"]),
  `uitkomsten-volgorde/ids onjuist: ${uitkomstIds.join(", ")}`,
);
for (const u of uitkomsten) {
  check(u.voorbeelden.length >= 3, `uitkomst ${u.id} heeft < 3 voorbeelden`);
}

// --- pakketten: precies één per uitkomst, prijzen volgens spec ---
const verwachtePrijs: Record<string, number> = {
  kennisbank: 2000,
  "tijd-besparen": 2500,
  klantbehoud: 2500,
  "data-inzicht": 3000,
};
check(pakketten.length === 4, `verwacht 4 pakketten, kreeg ${pakketten.length}`);
for (const id of uitkomstIds) {
  const p = pakketten.filter((x) => x.uitkomst === id);
  check(p.length === 1, `uitkomst ${id} heeft ${p.length} pakketten (verwacht 1)`);
  if (p[0]) {
    check(
      p[0].setupPrijs === verwachtePrijs[id],
      `pakket ${id}: setupPrijs ${p[0].setupPrijs}, verwacht ${verwachtePrijs[id]}`,
    );
    check(
      p[0].doorlooptijdWeken.min === 2 && p[0].doorlooptijdWeken.max === 4,
      `pakket ${id}: doorlooptijd niet 2-4 weken`,
    );
    check(p[0].inbegrepen.length >= 1, `pakket ${id}: geen 'inbegrepen'`);
  }
}
const tijd = pakketten.find((p) => p.uitkomst === "tijd-besparen");
check(tijd?.prijsEenheid === "per workflow", "Tijd besparen moet prijsEenheid 'per workflow' hebben");

// --- maandtiers ---
const tierPrijzen = maandtiers.map((t) => `${t.id}:${t.prijsPerMaand}`).join(",");
check(
  tierPrijzen === "basis:149,groei:399,partner:799",
  `maandtiers onjuist: ${tierPrijzen}`,
);

// --- voorwaarden & maatwerk & kansenscan ---
check(voorwaarden.minLooptijdMaanden === 6, "minLooptijdMaanden moet 6 zijn");
check(voorwaarden.pakketVereistMaandtier === true, "pakketVereistMaandtier moet true zijn");
check(voorwaarden.prijzenExclBtw === true, "prijzenExclBtw moet true zijn");
check(maatwerk.auditPrijs === 2500, "maatwerk.auditPrijs moet 2500 zijn");
check(maatwerk.vanafPrijs === 10000, "maatwerk.vanafPrijs moet 10000 zijn");
check(kansenscan.pad === "/ai-kansenscan", "kansenscan.pad moet /ai-kansenscan zijn");

// --- markten ---
const marktIds = markten.map((m) => m.id).join(",");
check(
  marktIds === "groothandel,maakindustrie,zakelijke-dienstverlening,mkb",
  `markten onjuist: ${marktIds}`,
);
for (const m of markten) {
  if (m.leidend === "kansenscan") continue;
  for (const id of m.leidend) {
    check(uitkomstIds.includes(id), `markt ${m.id} verwijst naar onbekende uitkomst ${id}`);
  }
  check(m.leidend.length >= 1, `markt ${m.id} heeft geen leidende uitkomst`);
}
check(markten.find((m) => m.id === "mkb")?.leidend === "kansenscan", "mkb moet leiden met kansenscan");
check(!markten.some((m) => /transport/i.test(m.naam)), "transport is geen focusmarkt");

// --- tone-of-voice (CLAUDE.md §6) ---
const verboden = [
  "digitale transformatie",
  "journey",
  "synergie",
  "cutting-edge",
  "disruptive",
  "next-gen",
  "revolutionair",
  "paradigmaverschuiving",
  "holistisch",
  "roadmap",
  "toekomstbestendig",
  "ai-revolutie",
  "bart",
  "broer",
  "fte",
];
for (const { veld, tekst } of alleTeksten()) {
  const laag = tekst.toLowerCase();
  for (const woord of verboden) {
    check(!new RegExp(`\\b${woord}\\b`).test(laag), `${veld}: verboden woord "${woord}"`);
  }
  check(!/\d+\s?%/.test(tekst), `${veld}: percentage-claim in "${tekst}"`);
}

// --- CLAUDE.md moet dezelfde prijzen noemen en geen oude positionering bevatten ---
const claudeMd = readFileSync(new URL("../CLAUDE.md", import.meta.url), "utf8");
const verplicht = [
  ...pakketten.map((p) => `${p.naam} — ${formatEuro(p.setupPrijs)}`),
  ...maandtiers.map((t) => `${t.naam} — ${formatEuro(t.prijsPerMaand)}/maand`),
  `AI Ops Audit — ${formatEuro(maatwerk.auditPrijs)}`,
  `vanaf ~${formatEuro(maatwerk.vanafPrijs)}`,
  `${voorwaarden.minLooptijdMaanden} maanden`,
  "5-50 medewerkers",
];
for (const s of verplicht) {
  check(claudeMd.includes(s), `CLAUDE.md mist "${s}"`);
}
const verouderd = [
  "### 5 Diensten",
  "### 5 Oplossingen",
  "€12.000-€18.000",
  "€18.000-€25.000",
  "Omzetbereik:** typisch €5-100M",
  "Transport & logistiek** (secundair)",
  "Retainer-bedragen blijven op-maat",
];
for (const s of verouderd) {
  check(!claudeMd.includes(s), `CLAUDE.md bevat nog verouderd: "${s}"`);
}

// --- resultaat ---
if (fouten.length) {
  console.error(`✗ ${fouten.length} fout(en):\n- ${fouten.join("\n- ")}`);
  process.exit(1);
}
console.log("✓ aanbod.ts klopt met de spec");
