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
