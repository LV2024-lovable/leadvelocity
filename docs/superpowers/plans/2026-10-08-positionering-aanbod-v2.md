# Positionering & aanbod v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Leg het nieuwe aanbod (4 uitkomsten, pakketten, maandtiers, maatwerk, 4 markten) vast in één getypeerde databron, en breng CLAUDE.md en de strategie-docs in lijn met die bron.

**Architecture:** `src/data/aanbod.ts` is de enige bron voor aanbod-inhoud en prijzen; latere pagina's (deelproject 3) lezen hieruit. Een los check-script (`scripts/check-aanbod.ts`, gedraaid met `tsx`) fungeert als test: het valideert de data tegen de spec-waarden, de tone-of-voice-regels, en of CLAUDE.md dezelfde prijzen noemt. Geen UI-wijzigingen in dit deelproject.

**Tech Stack:** TypeScript, Vite/React-project (alleen de datafile), `tsx` (al geïnstalleerd) voor het check-script. Geen nieuwe dependencies.

**Spec:** `docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md`

## Global Constraints

- Geen nieuwe npm-dependencies; `package.json` en lockfiles **niet** wijzigen of committen (bevatten niet-gerelateerde, ongecommitte wijzigingen van de gebruiker).
- Commit alleen de bestanden die een task noemt (`git add <pad>`, nooit `git add -A` / `git add .`).
- Setup-prijzen: Kennisbank €2.000 · Tijd besparen €2.500 per workflow · Klantbehoud €2.500 · Data & inzicht €3.000.
- Maandtiers: Basis €149 · Groei €399 · Partner €799.
- Minimale looptijd maandtier 6 maanden, daarna maandelijks opzegbaar. Een pakket draait alleen met een actieve maandtier. Prijzen excl. btw.
- Maatwerk: start met AI Ops Audit €2.500, maatwerk vanaf ~€10.000.
- Doorlooptijd pakketten: live in 2-4 weken.
- Doelgroep: 5-50 medewerkers; in klantcopy altijd "MKB", nooit FTE-ranges.
- Markten: groothandel, maakindustrie, zakelijke dienstverlening, MKB algemeen. Transport is géén focusmarkt.
- Tone-of-voice CLAUDE.md §6: Nederlands, wij/ons, geen persoonsnamen, geen hype-woorden, geen beloofde percentages.
- `npm run build` moet slagen vóór elke commit met code.

## Review Focus

1. **Prijs-drift tussen bron en CLAUDE.md** — iemand past later een prijs aan in `aanbod.ts` maar niet in CLAUDE.md (of andersom); verwacht: check faalt met de afwijkende prijs. Gedekt in Task 2 (CLAUDE.md-check).
2. **Hype-woord of percentage-belofte sluipt in copy** (bijv. "40% tijdwinst", "revolutionair") — verwacht: check faalt en noemt het veld. Gedekt in Task 1.
3. **Markt verwijst naar niet-bestaande uitkomst** (typo in id) — TypeScript vangt dit via de union-type; de check valideert ook runtime. Gedekt in Task 1.
4. **Oude positionering blijft in CLAUDE.md staan** ("5 Diensten", pilot-ranges €12.000-€25.000, "50-250"/"€5-100M" als ICP, transport als focus) — verwacht: check faalt. Gedekt in Task 2.
5. **Euro-notatie inconsistent** ("€2000" vs "€2.000") tussen data-helpers en docs — verwacht: `formatEuro` geeft altijd NL-notatie met punt; check gebruikt dezelfde helper. Gedekt in Task 1.

---

## File Structure

| Pad | Actie | Verantwoordelijkheid |
|---|---|---|
| `src/data/aanbod.ts` | Create | Types + data voor uitkomsten, pakketten, maandtiers, voorwaarden, maatwerk, kansenscan, markten; `formatEuro`-helper |
| `scripts/check-aanbod.ts` | Create | Test-script: data-invarianten, tone-check, (Task 2) CLAUDE.md-consistentie |
| `CLAUDE.md` | Modify | §1, §3, §5, §9, §10, §11 herschreven naar v2 |
| `docs/strategy/2026-10-08-positionering-v2.md` | Create | Addendum t.o.v. masterplan 2026-04-20 |

---

### Task 1: Aanbod-databron + check-script

**Files:**
- Create: `scripts/check-aanbod.ts`
- Create: `src/data/aanbod.ts`

**Interfaces:**
- Consumes: niets.
- Produces (gebruikt door Task 2 en deelproject 3):
  - `type UitkomstId = "tijd-besparen" | "klantbehoud" | "kennisbank" | "data-inzicht"`
  - `type MarktId = "groothandel" | "maakindustrie" | "zakelijke-dienstverlening" | "mkb"`
  - `type MaandtierId = "basis" | "groei" | "partner"`
  - `uitkomsten: Uitkomst[]`, `pakketten: Pakket[]`, `maandtiers: Maandtier[]`, `voorwaarden: Voorwaarden`, `maatwerk: Maatwerk`, `kansenscan: Kansenscan`, `markten: Markt[]`
  - `formatEuro(bedrag: number): string` → bijv. `formatEuro(2500) === "€2.500"`
  - `alleTeksten(): { veld: string; tekst: string }[]` → alle copy-strings met een pad-label, voor de tone-check

- [ ] **Step 1: Schrijf het check-script (de test)**

Create `scripts/check-aanbod.ts`:

```ts
/**
 * Check voor src/data/aanbod.ts — draait als test.
 * Run: npx tsx scripts/check-aanbod.ts
 * Faalt (exit 1) bij elke afwijking van de spec
 * docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md
 */
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

// --- resultaat ---
if (fouten.length) {
  console.error(`✗ ${fouten.length} fout(en):\n- ${fouten.join("\n- ")}`);
  process.exit(1);
}
console.log("✓ aanbod.ts klopt met de spec");
```

- [ ] **Step 2: Draai de check en zie hem falen**

Run: `npx tsx scripts/check-aanbod.ts`
Expected: FAIL — fout dat `../src/data/aanbod` niet gevonden kan worden (`Cannot find module` / `ERR_MODULE_NOT_FOUND`).

- [ ] **Step 3: Schrijf de databron**

Create `src/data/aanbod.ts`:

```ts
/**
 * Aanbod v2 — enige bron voor uitkomsten, pakketten, prijzen en markten.
 * Spec: docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md
 * Check: npx tsx scripts/check-aanbod.ts
 * Prijzen wijzigen? Pas ook CLAUDE.md §3 aan (de check controleert dat).
 */

export type UitkomstId = "tijd-besparen" | "klantbehoud" | "kennisbank" | "data-inzicht";
export type MarktId = "groothandel" | "maakindustrie" | "zakelijke-dienstverlening" | "mkb";
export type MaandtierId = "basis" | "groei" | "partner";

export type Uitkomst = {
  id: UitkomstId;
  titel: string;
  belofte: string;
  voorbeelden: string[];
};

export type Pakket = {
  uitkomst: UitkomstId;
  naam: string;
  setupPrijs: number;
  prijsEenheid?: "per workflow";
  doorlooptijdWeken: { min: number; max: number };
  inbegrepen: string[];
};

export type Maandtier = {
  id: MaandtierId;
  naam: string;
  prijsPerMaand: number;
  voor: string;
  inbegrepen: string[];
};

export type Voorwaarden = {
  minLooptijdMaanden: number;
  pakketVereistMaandtier: boolean;
  prijzenExclBtw: boolean;
  buitenScope: string;
};

export type Maatwerk = {
  auditPrijs: number;
  vanafPrijs: number;
  voorWie: string;
  voorbeelden: string[];
};

export type Kansenscan = {
  pad: string;
  belofte: string;
};

export type Markt = {
  id: MarktId;
  naam: string;
  leidend: UitkomstId[] | "kansenscan";
  haak: string;
  voorbeelden: string[];
};

export const kernvraag = "Weet jouw bedrijf wat het met AI kan?";

export const uitkomsten: Uitkomst[] = [
  {
    id: "tijd-besparen",
    titel: "Tijd besparen",
    belofte: "Haal het herhaalwerk weg.",
    voorbeelden: [
      "Orders uit mail of PDF direct in je ERP",
      "Offerte-concepten op basis van aanvraag, prijslijst en eerdere offertes",
      "Inbox-assistent die sorteert, labelt en standaardvragen voorbereidt",
      "Facturen en bonnen automatisch naar de boekhouding",
      "Wekelijkse rapportages die zichzelf maken",
    ],
  },
  {
    id: "klantbehoud",
    titel: "Klantbehoud",
    belofte: "Houd klanten langer en haal meer uit ze.",
    voorbeelden: [
      "Signaal zodra een klant minder gaat bestellen",
      "Automatische opvolging van openstaande offertes",
      "Slapende klanten heractiveren met een persoonlijk bericht",
      "Klantenservice-assistent die 24/7 vragen over producten en orders beantwoordt",
    ],
  },
  {
    id: "kennisbank",
    titel: "Kennisbank",
    belofte: "Alle bedrijfskennis op één plek, gewoon doorvraagbaar.",
    voorbeelden: [
      "Productspecs, configuraties, handleidingen en eerdere offertes in één assistent",
      "Collega's vragen in gewone taal: welk onderdeel past op machine X?",
      "Nieuwe medewerkers sneller ingewerkt",
      "Kennis blijft in het bedrijf als iemand vertrekt",
    ],
  },
  {
    id: "data-inzicht",
    titel: "Data & inzicht",
    belofte: "Koppel en schoon wat nu versnipperd staat.",
    voorbeelden: [
      "ERP, CRM, Excel en webshop gekoppeld tot één bron",
      "Productdata opschonen en verrijken",
      "Eén dashboard met de cijfers die ertoe doen",
      "Marge per klant en per product zichtbaar",
    ],
  },
];

export const pakketten: Pakket[] = [
  {
    uitkomst: "kennisbank",
    naam: "Kennisbank",
    setupPrijs: 2000,
    doorlooptijdWeken: { min: 2, max: 4 },
    inbegrepen: [
      "1 documentbron (SharePoint, Google Drive of map)",
      "Tot ongeveer 500 documenten",
      "Chat via browser of Teams",
    ],
  },
  {
    uitkomst: "tijd-besparen",
    naam: "Tijd besparen",
    setupPrijs: 2500,
    prijsEenheid: "per workflow",
    doorlooptijdWeken: { min: 2, max: 4 },
    inbegrepen: [
      "1 proces end-to-end geautomatiseerd",
      "Koppeling met maximaal 2 systemen",
    ],
  },
  {
    uitkomst: "klantbehoud",
    naam: "Klantbehoud",
    setupPrijs: 2500,
    doorlooptijdWeken: { min: 2, max: 4 },
    inbegrepen: [
      "Signalen uit je order- of CRM-data",
      "1 opvolg- of heractivatie-flow",
    ],
  },
  {
    uitkomst: "data-inzicht",
    naam: "Data & inzicht",
    setupPrijs: 3000,
    doorlooptijdWeken: { min: 2, max: 4 },
    inbegrepen: [
      "2 tot 3 bronnen gekoppeld",
      "1 dashboard met maximaal ongeveer 10 kerncijfers",
    ],
  },
];

export const maandtiers: Maandtier[] = [
  {
    id: "basis",
    naam: "Basis",
    prijsPerMaand: 149,
    voor: "1 pakket",
    inbegrepen: ["Hosting en AI-gebruik (fair use)", "Monitoring en support", "Kleine aanpassingen"],
  },
  {
    id: "groei",
    naam: "Groei",
    prijsPerMaand: 399,
    voor: "2 tot 3 pakketten",
    inbegrepen: ["Alles uit Basis", "4 uur verbeteringen per maand"],
  },
  {
    id: "partner",
    naam: "Partner",
    prijsPerMaand: 799,
    voor: "Alle pakketten",
    inbegrepen: [
      "Alles uit Groei",
      "8 uur verbeteringen per maand",
      "Maandelijkse verbetersessie",
      "Voorrang bij vragen en wijzigingen",
    ],
  },
];

export const voorwaarden: Voorwaarden = {
  minLooptijdMaanden: 6,
  pakketVereistMaandtier: true,
  prijzenExclBtw: true,
  buitenScope: "Werk buiten de standaard-scope offreren we vooraf apart.",
};

export const maatwerk: Maatwerk = {
  auditPrijs: 2500,
  vanafPrijs: 10000,
  voorWie: "Voor grotere bedrijven en complexe vraagstukken die niet in een vast pakket passen.",
  voorbeelden: [
    "Voice-agents",
    "Maatwerk-platformen zoals CRM, ATS of klantportalen",
    "Complexe AI-agenten over meerdere systemen",
  ],
};

export const kansenscan: Kansenscan = {
  pad: "/ai-kansenscan",
  belofte: "Ontdek in 5 minuten wat AI voor jouw bedrijf kan.",
};

export const markten: Markt[] = [
  {
    id: "groothandel",
    naam: "Groothandel",
    leidend: ["tijd-besparen", "klantbehoud"],
    haak: "Hoeveel orders worden er nog handmatig uit de mail overgetypt?",
    voorbeelden: [
      "Orders uit mail of PDF naar je ERP",
      "Signaal als een klant minder bestelt",
      "Artikeldata opschonen",
    ],
  },
  {
    id: "maakindustrie",
    naam: "Maakindustrie",
    leidend: ["kennisbank", "tijd-besparen"],
    haak: "Wat gebeurt er met jullie configuratiekennis als je senior engineer met pensioen gaat?",
    voorbeelden: [
      "Assistent op tekeningen, configuraties en storingshistorie",
      "Offerte-concepten uit aanvragen",
      "Productiecijfers in één dashboard",
    ],
  },
  {
    id: "zakelijke-dienstverlening",
    naam: "Zakelijke dienstverlening",
    leidend: ["tijd-besparen", "kennisbank"],
    haak: "Hoeveel uur per week gaat er naar intake, administratie en documenten zoeken?",
    voorbeelden: [
      "Klant-intake en documentverwerking",
      "Kennisbank op dossiers en templates",
      "Automatische klantrapportages",
    ],
  },
  {
    id: "mkb",
    naam: "MKB",
    leidend: "kansenscan",
    haak: "Weet jij wat AI voor jouw bedrijf kan? Ontdek het in 5 minuten.",
    voorbeelden: [
      "Inbox-assistent",
      "Offerte-opvolging",
      "Eén dashboard met je kerncijfers",
    ],
  },
];

/** €-bedrag in NL-notatie zonder decimalen: 2500 → "€2.500". */
export function formatEuro(bedrag: number): string {
  return "€" + String(Math.round(bedrag)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Alle copy-strings met een veld-label — voor tone-of-voice-checks. */
export function alleTeksten(): { veld: string; tekst: string }[] {
  const uit: { veld: string; tekst: string }[] = [];
  const add = (veld: string, tekst: string) => uit.push({ veld, tekst });
  add("kernvraag", kernvraag);
  uitkomsten.forEach((u) => {
    add(`uitkomsten.${u.id}.titel`, u.titel);
    add(`uitkomsten.${u.id}.belofte`, u.belofte);
    u.voorbeelden.forEach((v, i) => add(`uitkomsten.${u.id}.voorbeelden[${i}]`, v));
  });
  pakketten.forEach((p) => {
    add(`pakketten.${p.uitkomst}.naam`, p.naam);
    p.inbegrepen.forEach((v, i) => add(`pakketten.${p.uitkomst}.inbegrepen[${i}]`, v));
  });
  maandtiers.forEach((t) => {
    add(`maandtiers.${t.id}.voor`, t.voor);
    t.inbegrepen.forEach((v, i) => add(`maandtiers.${t.id}.inbegrepen[${i}]`, v));
  });
  add("voorwaarden.buitenScope", voorwaarden.buitenScope);
  add("maatwerk.voorWie", maatwerk.voorWie);
  maatwerk.voorbeelden.forEach((v, i) => add(`maatwerk.voorbeelden[${i}]`, v));
  add("kansenscan.belofte", kansenscan.belofte);
  markten.forEach((m) => {
    add(`markten.${m.id}.haak`, m.haak);
    m.voorbeelden.forEach((v, i) => add(`markten.${m.id}.voorbeelden[${i}]`, v));
  });
  return uit;
}
```

- [ ] **Step 4: Draai de check en zie hem slagen**

Run: `npx tsx scripts/check-aanbod.ts`
Expected: `✓ aanbod.ts klopt met de spec`, exit code 0.

- [ ] **Step 5: Bewijs dat de tone-check bijt**

Wijzig tijdelijk in `src/data/aanbod.ts` de belofte van `tijd-besparen` naar `"Haal 40% herhaalwerk weg."`.
Run: `npx tsx scripts/check-aanbod.ts`
Expected: FAIL met `uitkomsten.tijd-besparen.belofte: percentage-claim in "Haal 40% herhaalwerk weg."`.
Zet de belofte terug naar `"Haal het herhaalwerk weg."` en draai opnieuw → `✓`.

- [ ] **Step 6: Build-check**

Run: `npm run build`
Expected: build slaagt (de bestaande 500 kB-chunk-waarschuwing mag; geen errors).

- [ ] **Step 7: Commit**

```bash
git add src/data/aanbod.ts scripts/check-aanbod.ts
git commit -m "Add aanbod v2 databron + check-script"
```

---

### Task 2: CLAUDE.md naar positionering v2 + consistentie-check

**Files:**
- Modify: `scripts/check-aanbod.ts` (CLAUDE.md-sectie toevoegen vóór `// --- resultaat ---`)
- Modify: `CLAUDE.md` — §1 (r. 9-17), §3 (r. 33-70), §5 (r. 84-117), §9 (r. 231-242), §10 (r. 244-255), §11 stap 2 (r. 259-262), header-datum (r. 3)

**Interfaces:**
- Consumes: `pakketten`, `maandtiers`, `maatwerk`, `voorwaarden`, `formatEuro` uit Task 1.
- Produces: CLAUDE.md die de check doorstaat; latere deelprojecten lezen CLAUDE.md als context.

- [ ] **Step 1: Breid de check uit met CLAUDE.md-consistentie**

In `scripts/check-aanbod.ts`, voeg bovenaan bij de imports toe:

```ts
import { readFileSync } from "node:fs";
```

en voeg direct vóór de regel `// --- resultaat ---` toe:

```ts
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
```

- [ ] **Step 2: Draai de check en zie hem falen**

Run: `npx tsx scripts/check-aanbod.ts`
Expected: FAIL met o.a. `CLAUDE.md mist "Kennisbank — €2.000"` en `CLAUDE.md bevat nog verouderd: "### 5 Diensten"`.

- [ ] **Step 3: Werk de header-datum bij**

Vervang in `CLAUDE.md`:
```
**Laatst bijgewerkt:** 2026-04-20
```
door:
```
**Laatst bijgewerkt:** 2026-10-08
```
en onderaan:
```
*Einde project-context. Laatst bijgewerkt: 2026-04-20.
```
door:
```
*Einde project-context. Laatst bijgewerkt: 2026-10-08.
```

- [ ] **Step 4: Vervang §1**

Vervang de hele sectie van `## 1. Wat is Leadvelocity?` tot (niet inclusief) de `---` vóór `## 2.` door:

```markdown
## 1. Wat is Leadvelocity?

Leadvelocity helpt **MKB-bedrijven ontdekken en inzetten wat AI voor hen kan**. De kernvraag:

> **Weet jouw bedrijf wat het met AI kan?**

We vertalen AI naar vier concrete uitkomsten — **tijd besparen, klantbehoud, kennisbank, data & inzicht** — elk als vast pakket met vaste prijs, live in 2-4 weken, met een maandtier voor hosting, support en doorontwikkeling. Kleinere bedrijven (5-50 medewerkers) zijn de basis; grotere, complexe projecten doen we als maatwerk.

**We zijn geen consultancy en geen AI-bureau met vage trajecten.** Een prospect moet na één alinea weten wat we doen, wat het kost en hoe snel het werkt.

**Huidige fase:** bootstrapping, 2-persoons-studio in opbouw. Path C-strategie: jaar 1 lean opereren met exit-architectuur onder de motorkap, beslisdatum juni 2027 voor lifestyle-anker vs. exit-schaling.

**Bron van waarheid voor aanbod en prijzen:** [`src/data/aanbod.ts`](./src/data/aanbod.ts). Spec: [`docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md`](./docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md).
```

- [ ] **Step 5: Vervang §3**

Vervang de hele sectie van `## 3. Wat we verkopen — 4 producten + retainer-paraplu` tot (niet inclusief) de `---` vóór `## 4.` door:

```markdown
## 3. Wat we verkopen — 4 uitkomsten, vaste pakketten, maandtier

Prijzen staan in [`src/data/aanbod.ts`](./src/data/aanbod.ts). Wijzig je een prijs, wijzig hem daar én hier; `npx tsx scripts/check-aanbod.ts` controleert dat ze gelijk zijn.

### De ladder
1. **AI-kansenscan (gratis)** — `/ai-kansenscan`: *"Ontdek in 5 minuten wat AI voor jouw bedrijf kan."* Toont welke uitkomsten passen en welk pakket erbij hoort. CTA in elke cold e-mail.
2. **Kennismaking (gratis, 30 min)** — scan-uitkomst doorlopen, één pakket voorstellen.
3. **Vast pakket per uitkomst** — vaste scope, vaste setup-prijs, live in 2-4 weken.
4. **Maandtier** — hosting, AI-gebruik (fair use), monitoring, support, doorontwikkeling.
5. **Maatwerk** — via de betaalde audit, voor grotere/complexe vraagstukken.

### Pakketten (setup, eenmalig, excl. btw)
- **Kennisbank — €2.000** — 1 documentbron, tot ~500 documenten, chat via browser of Teams
- **Tijd besparen — €2.500** per workflow — 1 proces end-to-end, koppeling met max. 2 systemen
- **Klantbehoud — €2.500** — signalen uit order-/CRM-data + 1 opvolg- of heractivatie-flow
- **Data & inzicht — €3.000** — 2-3 bronnen gekoppeld, 1 dashboard met max. ~10 kerncijfers

Werk buiten de standaard-scope offreren we vooraf apart.

### Maandtiers (excl. btw)
- **Basis — €149/maand** — 1 pakket, kleine aanpassingen
- **Groei — €399/maand** — 2-3 pakketten + 4 uur verbeteringen per maand
- **Partner — €799/maand** — alle pakketten, 8 uur + maandelijkse verbetersessie + voorrang

Minimale looptijd 6 maanden, daarna maandelijks opzegbaar. Een pakket draait alleen met een actieve maandtier.

### Maatwerk
- **AI Ops Audit — €2.500** — 60 min kickoff + 2-4 team-interviews, rapport met top-3 AI-kansen binnen 5 werkdagen. Ingang voor maatwerk.
- **Maatwerk vanaf ~€10.000, op offerte** — voice-agents, maatwerk-platformen (CRM, ATS, klantportalen), complexe agents over meerdere systemen.

### Uitgefaseerd
De oude 5 diensten (`ServicesNew`) en 5 oplossingen (`/oplossingen/*`, pilot-ranges €12-25k) zijn niet langer de hoofdstructuur. Deelproject 2 (site-structuur) beslist per pagina wat blijft, verhuist naar maatwerk of verdwijnt.
```

- [ ] **Step 6: Vervang §5**

Vervang de hele sectie van `## 5. Doelgroep (ICP)` tot (niet inclusief) de `---` vóór `## 6.` door:

```markdown
## 5. Doelgroep (ICP)

### Geografisch + grootte
- **Nederland** (België adjacent)
- **MKB met 5-50 medewerkers** als basis. Groter = maatwerk-route.
- In klantcopy altijd **"MKB"** — nooit FTE-ranges.

### Beslisser
- **Eigenaar / DGA** — beslist meestal alleen. Wil weten: wat levert het op, wat kost het, hoe snel. Skeptisch over hype.
- **Operationeel manager / kantoormanager** — voelt de pijn (handwerk, zoeken, overtypen), bereidt de beslissing voor.
- Wat ze NIET willen horen: "digitale transformatie", "AI-revolutie", "toekomstbestendig", "journey".

### 4 doelmarkten (cold outreach + marktpagina's)

| Markt | Leidende uitkomst | Haak |
|---|---|---|
| **Groothandel** | Tijd besparen + Klantbehoud | "Hoeveel orders worden er nog handmatig uit de mail overgetypt?" |
| **Maakindustrie** | Kennisbank + Tijd besparen | "Wat gebeurt er met jullie configuratiekennis als je senior engineer met pensioen gaat?" |
| **Zakelijke dienstverlening** | Tijd besparen + Kennisbank | "Hoeveel uur per week gaat er naar intake, administratie en documenten zoeken?" |
| **MKB algemeen** | Instap via kansenscan | "Weet jij wat AI voor jouw bedrijf kan? Ontdek het in 5 minuten." |

Transport & logistiek is **geen focusmarkt meer**. Bestaande transport-content blijft voorlopig staan tot deelproject 2.
```

- [ ] **Step 7: Vervang §9**

Vervang de hele sectie van `## 9. Beslissingen al genomen (niet meer open ter discussie)` tot (niet inclusief) de `---` vóór `## 10.` door:

```markdown
## 9. Beslissingen al genomen (niet meer open ter discussie)

- **Path C** — hybride 12-maanden lean, beslisdatum juni 2027 voor schaal vs. lifestyle
- **Positionering v2 (2026-10-08)** — kernvraag "Weet jouw bedrijf wat het met AI kan?", 4 uitkomsten als vaste pakketten. Vervangt de 5 diensten + 5 oplossingen.
- **ICP 5-50 medewerkers** — kleinere bedrijven als basis, maatwerk voor groter
- **4 markten** — groothandel, maakindustrie, zakelijke dienstverlening, MKB algemeen. Transport valt af.
- **Prijsmodel** — vaste setup per pakket + maandtier (Basis/Groei/Partner), 6 maanden minimum
- **Prijzen WEL gepubliceerd:** pakket-setups, maandtiers, AI Ops Audit, maatwerk "vanaf ~€10.000"
- **Retainers positief gepositioneerd** — als concrete maandtier, niet als open "partnership op maat"
- **Geen persoonlijke namen in copy** — altijd "wij/ons"
- **Sources alleen op één resultaten-sectie** — niet overal door site heen
- **Geen "8-klanten"-tagline** — we willen schalen als het werkt
```

- [ ] **Step 8: Vervang §10**

Vervang de hele sectie van `## 10. Open werkpunten / roadmap-komend` tot (niet inclusief) de `---` vóór `## 11.` door:

```markdown
## 10. Open werkpunten

Site-brede herpositionering in 4 deelprojecten (elk eigen spec → plan → uitvoering):

1. ~~Positionering & aanbod v2~~ — afgerond (`src/data/aanbod.ts`)
2. **Site-structuur + minimal design system** — welke van de ~37 pagina's blijven; component libraries via shadcn-registry/MCP (o.a. `@aceternity/sticky-scroll-reveal-demo`); oude componenten opruimen
3. **Bouw** — homepage, 4 marktpagina's, pakket-/prijspagina, kansenscan-resultaat gemapt op de 4 uitkomsten
4. **Cold outreach** — één 5-touch sequence per markt op basis van §5

Daarnaast: pilot-klanten werven voor case studies, LinkedIn-content-engine.
```

- [ ] **Step 9: Werk §11 stap 2 bij**

Vervang in `## 11.` onder `### Hoe een klant typisch bij ons komt`:

```
1. Inbound via website (formulier op `/` of `/lp/assessment`) **OF** cold outreach-sequence
2. 30-min kennismakingsgesprek (gratis) → AI Ops Audit (€2.500, 2 weken) of direct door naar Pilot Build
3. Na eerste product: doorrol in AI Operations Partnership (retainer)
```

door:

```
1. Cold outreach-sequence **OF** inbound via website → AI-kansenscan (`/ai-kansenscan`)
2. 30-min kennismakingsgesprek (gratis) → één vast pakket + maandtier. Groter/complex → AI Ops Audit (€2.500) → maatwerk-offerte
3. Na eerste pakket: tweede pakket toevoegen, tier groeit mee (Basis → Groei → Partner)
```

- [ ] **Step 10: Draai de check en zie hem slagen**

Run: `npx tsx scripts/check-aanbod.ts`
Expected: `✓ aanbod.ts klopt met de spec`, exit code 0.

- [ ] **Step 11: Tone-check handmatig**

Lees de gewijzigde secties na tegen CLAUDE.md §6 (geen hype-woorden in de nieuwe teksten, wij/ons, geen persoonsnamen). §6 zelf blijft ongewijzigd.

- [ ] **Step 12: Commit**

```bash
git add CLAUDE.md scripts/check-aanbod.ts
git commit -m "CLAUDE.md naar positionering v2 + consistentie-check"
```

---

### Task 3: Masterplan-addendum

**Files:**
- Create: `docs/strategy/2026-10-08-positionering-v2.md`

**Interfaces:**
- Consumes: spec en CLAUDE.md uit Task 2 (geen code).
- Produces: korte strategienotitie, gelinkt vanuit niets verplicht; dient als historie-anker naast het masterplan.

- [ ] **Step 1: Schrijf het addendum**

Create `docs/strategy/2026-10-08-positionering-v2.md`:

```markdown
# Addendum masterplan — Positionering v2

**Datum:** 2026-10-08
**Vervangt delen van:** [`2026-04-20-leadvelocity-masterplan.md`](./2026-04-20-leadvelocity-masterplan.md) (aanbod, doelgroep, sectoren). Path C en de POV blijven ongewijzigd.
**Spec:** [`../superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md`](../superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md)

## Waarom
Het aanbod (5 diensten, 5 oplossingen, pilots €12-25k) was te breed en te abstract om snel te verkopen. Een prospect begreep niet binnen enkele seconden wat we doen, en cold outreach had geen scherp aanbod om naar te verwijzen.

## Wat verandert

| | Masterplan 2026-04-20 | Positionering v2 |
|---|---|---|
| Kern | AI Operations Partner | "Weet jouw bedrijf wat het met AI kan?" |
| Aanbod | 5 diensten + 5 oplossingen, pilots €12-25k | 4 uitkomsten als vaste pakketten, €2.000-€3.000 setup |
| Terugkerend | Retainer op maat, niet gepubliceerd | Maandtiers €149 / €399 / €799, gepubliceerd |
| Instap | AI Ops Audit €2.500 | Gratis AI-kansenscan; audit wordt ingang voor maatwerk |
| Doelgroep | €5-100M omzet | 5-50 medewerkers |
| Markten | Groothandel, maakindustrie, transport | Groothandel, maakindustrie, zakelijke dienstverlening, MKB algemeen |

## Wat blijft
- Path C en beslisdatum juni 2027
- POV: AI vervangt geen goede mensen, wél bedrijven die stilstaan
- Tone-of-voice-regels
- AI Ops Audit (€2.500), nu als maatwerk-ingang

## Gevolgen
- Site wordt herbouwd in deelprojecten 2-3 (structuur, minimal design, pagina's).
- Outreach krijgt één sequence per markt (deelproject 4).
- `docs/strategy/leadvelocity-propositie.md` beschrijft de oude propositie; bij twijfel gaat dit addendum voor.
```

- [ ] **Step 2: Verifieer de links**

Run: `ls docs/strategy/2026-04-20-leadvelocity-masterplan.md docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md`
Expected: beide paden bestaan.

- [ ] **Step 3: Draai de volledige check nog één keer**

Run: `npx tsx scripts/check-aanbod.ts && npm run build`
Expected: `✓ aanbod.ts klopt met de spec` en een geslaagde build.

- [ ] **Step 4: Commit**

```bash
git add docs/strategy/2026-10-08-positionering-v2.md
git commit -m "Add masterplan-addendum positionering v2"
```
