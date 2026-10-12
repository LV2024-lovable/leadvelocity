import type { Package } from "./types";

/** "€12.500" — NL-notatie, geen decimalen. */
export function formatEuro(bedrag: number): string {
  return "€" + String(Math.round(bedrag)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const packages: Package[] = [
  {
    id: "voorbereiden",
    name: "Start",
    setupFrom: 2950,
    monthlyFrom: 595,
    promise: "Relevante informatie en conceptacties klaarzetten voor je team.",
    includes: [
      "Eén bestaand templateproces",
      "Eén invoerkanaal en één team",
      "Informatie structureren en ontbrekende gegevens markeren",
      "Conceptactie met medewerkerreview",
      "Resultaatrapport",
    ],
    notIncluded: ["Nieuwe complexe connectoren"],
    changeHoursPerMonth: 0.5,
    ctaLabel: "Bespreek Start",
  },
  {
    id: "werkstroom",
    name: "Compleet",
    setupFrom: 4950,
    monthlyFrom: 1250,
    promise: "Eén proces van intake tot afgesproken opvolging inrichten en beheren.",
    includes: [
      "Eén proces en één team",
      "Intake en compleetheid",
      "Relevante bronnen",
      "Conceptcommunicatie met review",
      "Status en afgesproken opvolging",
    ],
    notIncluded: ["Automatische externe acties zonder afgesproken test en autorisatie"],
    changeHoursPerMonth: 1,
    badge: "Aanbevolen start",
    ctaLabel: "Bespreek Compleet",
  },
  {
    id: "opschalen",
    name: "Opschalen",
    setupFrom: 7950,
    monthlyFrom: 1950,
    promise: "Een bewezen oplossing uitbreiden naar meer volume, kanalen of teams.",
    includes: [
      "Dezelfde bewezen oplossing met extra capaciteit",
      "Twee afgesproken kanalen of teams",
      "Uitgebreidere overdracht en rapportage",
    ],
    notIncluded: ["Drie nieuwe maatwerkprocessen"],
    changeHoursPerMonth: 2,
    ctaLabel: "Bespreek Opschalen",
  },
  {
    id: "custom",
    name: "Maatwerk",
    setupFrom: 12500,
    monthlyFrom: 2500,
    promise: "Meerdere processen of bijzondere koppelingen op een afgestemd ontwerp.",
    includes: [
      "Betaald ontwerp",
      "Meerdere processen",
      "Bijzondere organisatie- of systeemvereisten",
    ],
    notIncluded: ["Automatisch inbegrepen 24/7 SLA, SSO of onbeperkte integraties"],
    ctaLabel: "Bespreek maatwerk",
  },
];

export const standardPackages = packages.filter((p) => p.id !== "custom");
export const customPackage = packages.find((p) => p.id === "custom")!;

export const analysis = {
  price: 750,
  creditDays: 60,
  includes: ["Proceskaart", "Nulmeting", "Input- en toegangscheck", "Businesscase", "Acceptatiecriteria"],
};

export const managementIncludes = [
  "Monitoring",
  "Incidentafhandeling",
  "Bronupdates",
  "Rapportage",
  "Support tijdens kantooruren",
  "Kleine instellingenwijzigingen binnen het afgesproken budget, zonder rollover",
];

export const costMicrocopy =
  "Prijzen vanaf, exclusief btw. Volume, koppelingen en verbruik leggen we vooraf vast. Bestaande softwarelicenties en bijzondere data- of berichtkosten kunnen aanvullend zijn.";

export const scopeLine = "We leggen vooraf vast wat wordt opgeleverd en wanneer de maanddienst start.";

export const extraWork = "Nieuwe processen en connectorontwikkeling zijn meerwerk.";
