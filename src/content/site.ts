import type { CategoryId, CtaProcess } from "./types";

export const SITE_URL = "https://www.leadvelocity.nl";

export const brand = {
  name: "Lead Velocity",
  tagline: "Minder uitzoekwerk. Meer werk gedaan.",
};

/** Contactgegevens uit de bestaande site — bevestiging door Bart is een livegang-afhankelijkheid. */
export const contact = {
  email: "info@leadvelocity.nl",
  phone: "+31 6 25 47 15 28",
  phoneHref: "tel:+31625471528",
  linkedin: "https://www.linkedin.com/company/leadvelocity-2/",
  calendarUrl: null as string | null,
};

/** Hoofd-CTA overal op de site (besluit Bart 2026-10-11, vervangt de oude term uit de handover). */
export const ctaLabels = {
  primary: "Plan een gratis adviesgesprek",
  short: "Gratis adviesgesprek",
  micro: "20 minuten · vrijblijvend",
};

export type StoryStep = "herkenbaar" | "bouwen" | "voorbeelden" | "samenwerken" | "prijzen" | "vragen";
export const STORY_ORDER: StoryStep[] = ["herkenbaar", "bouwen", "voorbeelden", "samenwerken", "prijzen", "vragen"];
/** Vaste labels per stap in de verhaallijn — overal gelijk (spec rode draad §1). */
export const storyLabels: Record<StoryStep, string> = {
  herkenbaar: "Herkenbaar",
  bouwen: "Wat we bouwen",
  voorbeelden: "Voorbeelden",
  samenwerken: "Samenwerken",
  prijzen: "Prijzen",
  vragen: "Vragen",
};

export const mainNav = [
  { label: "Voor wie", href: "/voor-wie" },
  { label: "Samenwerken", href: "/samenwerken" },
  { label: "Voorbeelden", href: "/voorbeelden" },
  { label: "Prijzen", href: "/prijzen" },
];
/** Linktekst op een oplossingskaart van een doelgroeppagina, naar de procespagina. */
export const solutionProcessLink = "Hoe dit proces werkt";
/** Laatste link in de dropdown "Voor wie" (naar /voor-wie). */
export const navAllAudiences = "Alle doelgroepen";
/** Extra link in het mobiele menu. */
export const navAbout = { label: "Over", href: "/over" };

export const footerNav = [
  {
    title: "Voor wie",
    links: [
      { label: "Technische groothandels", href: "/groothandels" },
      { label: "Importeurs en distributeurs", href: "/importeurs-distributeurs" },
      { label: "Service en onderhoud", href: "/service-onderhoud" },
      { label: "Maatwerk en montage", href: "/maatwerk-montage" },
    ],
  },
  {
    title: "Per proces",
    links: [
      { label: "Aanvragen en dossiers", href: "/oplossingen/aanvragen-dossiers" },
      { label: "Communicatie en opvolging", href: "/oplossingen/communicatie-opvolging" },
      { label: "Data en inzicht", href: "/oplossingen/data-inzicht" },
      { label: "Commerciële voorbereiding", href: "/oplossingen/commerciele-voorbereiding" },
    ],
  },
  {
    title: "Lead Velocity",
    links: [
      { label: "Samenwerken", href: "/samenwerken" },
      { label: "Prijzen", href: "/prijzen" },
      { label: "Voorbeelden", href: "/voorbeelden" },
      { label: "Inzichten", href: "/inzichten" },
      { label: "Over", href: "/over" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export const categoryOptions: { value: CategoryId | "anders"; label: string }[] = [
  { value: "groothandels", label: "Technische groothandel" },
  { value: "importeurs-distributeurs", label: "Importeur of distributeur" },
  { value: "service-onderhoud", label: "Service en onderhoud" },
  { value: "maatwerk-montage", label: "Maatwerk en montage" },
  { value: "anders", label: "Ander bedrijfstype" },
];

export const processOptions: { value: CtaProcess | "anders"; label: string }[] = [
  { value: "offerte-intake", label: "Offerteaanvragen voorbereiden" },
  { value: "aftersales", label: "Garantie- en aftersalesclaims" },
  { value: "service-intake", label: "Servicemeldingen" },
  { value: "project-intake", label: "Projectaanvragen" },
  { value: "intake", label: "Aanvragen en dossiers" },
  { value: "opvolging", label: "Communicatie en opvolging" },
  { value: "data", label: "Data en inzicht" },
  { value: "sales", label: "Commerciële voorbereiding" },
  { value: "anders", label: "Iets anders" },
];

export const frequencyOptions = [
  { value: "dagelijks", label: "Dagelijks" },
  { value: "wekelijks", label: "Wekelijks" },
  { value: "minder-vaak", label: "Minder vaak" },
  { value: "onbekend", label: "Weet ik niet" },
] as const;

/** Voor de sitemap — alleen publiceerbare, indexeerbare pagina's. */
export const indexableRoutes = [
  "/", "/voor-wie", "/groothandels", "/importeurs-distributeurs", "/service-onderhoud", "/maatwerk-montage",
  "/oplossingen", "/oplossingen/aanvragen-dossiers", "/oplossingen/communicatie-opvolging",
  "/oplossingen/data-inzicht", "/oplossingen/commerciele-voorbereiding",
  "/samenwerken", "/prijzen", "/voorbeelden", "/over", "/adviesgesprek", "/privacy",
  "/inzichten",
  "/inzichten/ai-in-nederlandse-technische-groothandel-2026",
  "/inzichten/ai-pricing-voor-groothandel",
  "/inzichten/ai-voor-nederlandse-maakindustrie-oee",
  "/inzichten/predictive-maintenance-machinebouw",
  "/inzichten/vrachtwagenheffing-2026-ai-compensatie",
  "/inzichten/csrd-scope-3-automatisering-transport",
  "/whitepapers/ai-in-technische-groothandel-2026",
  "/whitepapers/ai-voor-nederlandse-maakindustrie-2026",
  "/whitepapers/ai-voor-nederlandse-transport-2026",
  "/bronnen/prompts/groothandel-2026",
  "/bronnen/prompts/maakindustrie-2026",
  "/bronnen/prompts/transport-2026",
];
