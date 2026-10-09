import type { Demo, DemoId } from "./types";

export const DEMO_LABEL = "Illustratieve demo";
export const DEMO_CLOSING = "Dit voorbeeld laat de werkwijze zien. De inrichting en uitkomst hangen af van jullie proces en gegevens.";

export const demos: Demo[] = [
  {
    id: "offerte-intake",
    title: "Offerteaanvraag",
    categoryId: "groothandels",
    input: {
      channel: "E-mail met Excel-bijlage",
      from: "inkoop@voorbeeldbedrijf-a.nl",
      subject: "Aanvraag offerte",
      body: "Graag een offerte voor 12 stuks productreferentie X. Zie bijgevoegde lijst.",
      fields: [
        { label: "Klant", value: "Voorbeeldbedrijf A" },
        { label: "Product", value: "Productreferentie X" },
        { label: "Aantal", value: "12 stuks" },
        { label: "Gewenst moment", value: null },
      ],
    },
    prepared: {
      summary: "Aanvraag van Voorbeeldbedrijf A voor 12 stuks productreferentie X.",
      present: ["Klant herkend", "Productreferentie en aantal overgenomen"],
      missing: ["Gewenst moment van levering"],
    },
    next: {
      conceptTitle: "Conceptvraag aan de klant",
      concept: "Bedankt voor je aanvraag. Op welk moment wil je de 12 stuks productreferentie X ontvangen? Dan maken we de offerte compleet.",
      status: "Wacht op medewerkerreview",
      teamDecides: "Product, alternatief, prijs en leverdatum blijven bij je binnendienst.",
    },
    evidence: "illustrative",
  },
  {
    id: "aftersales",
    title: "Garantieclaim van een dealer",
    categoryId: "importeurs-distributeurs",
    input: {
      channel: "E-mail van dealer",
      from: "service@voorbeelddealer-b.nl",
      subject: "Garantieclaim Demo-100",
      body: "Klant meldt een defect aan een Demo-100. Serienummer staat hieronder.",
      fields: [
        { label: "Dealer", value: "Voorbeelddealer B" },
        { label: "Model", value: "Demo-100" },
        { label: "Serienummer", value: "Aanwezig" },
        { label: "Aankoopbewijs", value: null },
      ],
    },
    prepared: {
      summary: "Claim van Voorbeelddealer B voor een Demo-100, gecontroleerd op de dossiervereisten.",
      present: ["Dealer herkend", "Model en serienummer aanwezig"],
      missing: ["Aankoopbewijs"],
      source: "Fictieve dossiervereisten",
    },
    next: {
      conceptTitle: "Conceptvraag aan de dealer",
      concept: "Om de claim voor de Demo-100 te kunnen beoordelen hebben we nog het aankoopbewijs nodig. Wil je dat meesturen?",
      status: "Wacht op medewerkerreview",
      teamDecides: "Het besluit over garantie en compensatie blijft bij je aftersalesteam.",
    },
    evidence: "illustrative",
  },
  {
    id: "service-intake",
    title: "Servicemelding",
    categoryId: "service-onderhoud",
    input: {
      channel: "Webformulier",
      from: "Klant via servicepagina",
      subject: "Machine start niet",
      body: "Onze machine start niet meer sinds vanochtend. Locatie: hoofdvestiging.",
      fields: [
        { label: "Klacht", value: "Machine start niet" },
        { label: "Locatie", value: "Hoofdvestiging" },
        { label: "Machine-identificatie", value: null },
      ],
    },
    prepared: {
      summary: "Melding: machine start niet, op de hoofdvestiging van de klant.",
      present: ["Klachtomschrijving", "Locatie"],
      missing: ["Type en serienummer van de machine"],
    },
    next: {
      conceptTitle: "Conceptvraag aan de melder",
      concept: "Wil je het type en serienummer van de machine doorgeven? Die staan meestal op het typeplaatje. Dan kan ons team de melding direct oppakken.",
      status: "Wacht op medewerkerreview",
      teamDecides: "Diagnose, veiligheid, reparatie-instructies, contractdekking en planning blijven bij je servicedesk.",
    },
    evidence: "illustrative",
  },
  {
    id: "project-intake",
    title: "Projectaanvraag",
    categoryId: "maatwerk-montage",
    input: {
      channel: "Aanvraagformulier met foto's",
      from: "Particuliere of zakelijke aanvrager",
      subject: "Aanvraag nieuwe overheaddeur",
      body: "We willen een nieuwe overheaddeur. Foto's van de huidige situatie zijn bijgevoegd.",
      fields: [
        { label: "Type werk", value: "Nieuwe overheaddeur" },
        { label: "Foto's", value: "Genoemd in aanvraag" },
        { label: "Projectadres", value: null },
      ],
    },
    prepared: {
      summary: "Aanvraag voor een nieuwe overheaddeur, met foto's van de huidige situatie.",
      present: ["Type werk beschreven", "Foto's genoemd"],
      missing: ["Projectadres"],
    },
    next: {
      conceptTitle: "Voorstel voor de volgende stap",
      concept: "Vraag het projectadres op en plan daarna een gesprek of opname in.",
      status: "Wacht op medewerkerreview",
      teamDecides: "Inmeting, calculatie, prijs en technische haalbaarheid blijven bij je team.",
    },
    evidence: "illustrative",
  },
];

export function demoById(id: DemoId): Demo | undefined {
  return demos.find((d) => d.id === id);
}
