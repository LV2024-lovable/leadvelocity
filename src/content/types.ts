export type CategoryId = "groothandels" | "importeurs-distributeurs" | "service-onderhoud" | "maatwerk-montage";
export type ProcessKey = "offerte-intake" | "aftersales" | "service-intake" | "project-intake";
export type ProcessFamilyId = "aanvragen-dossiers" | "communicatie-opvolging" | "data-inzicht" | "commerciele-voorbereiding";
export type CtaProcess = ProcessKey | "intake" | "opvolging" | "data" | "sales";
export type PackageId = "voorbereiden" | "werkstroom" | "opschalen" | "custom";
export type DemoId = ProcessKey;
export type CampaignId = ProcessKey;
export type FaqId =
  | "software" | "zelfstandig" | "oplevert" | "kosten" | "maandelijks"
  | "uitbreiden" | "whatsapp" | "loont" | "veilig" | "ai" | "mensen";
export type Evidence = "illustrative" | "verified" | "planned";

export type Package = {
  id: PackageId;
  name: string;
  setupFrom: number;
  monthlyFrom: number;
  promise: string;
  includes: string[];
  notIncluded: string[];
  changeHoursPerMonth?: number;
  badge?: "Aanbevolen start";
  ctaLabel: string;
};

export type Category = {
  id: CategoryId;
  name: string;
  /** Label van de keuzeknop op de homepage, bv. "offerteaanvragen". */
  heroNoun: string;
  /** Doelgroep in de homepage-kop "Jouw AI-partner voor …". */
  audience: string;
  /** 3–4 oplossingen die we voor deze doelgroep bouwen. */
  solutions: { title: string; line: string; decides: string; processId: ProcessFamilyId }[];
  cardLine: string;
  cardCta: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  sub: string;
  situations: [string, string, string];
  primaryCta: string;
  secondaryCta: string;
  processKey: ProcessKey;
  demoId: DemoId;
  tasks: string[];
  exampleFlow: string[];
  teamDecides: string;
  limits: string[];
  subsegments: string[];
  fit: string[];
  measures: string[];
  faqIds: FaqId[];
};

export type ProcessFamily = {
  id: ProcessFamilyId;
  name: string;
  cardLine: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  situation: string;
  input: string;
  output: string;
  modules: string[];
  result: string;
  humanLimit: string;
  neededInput: string[];
  categoryIds: [CategoryId, CategoryId];
  ctaProcess: CtaProcess;
  ctaLabel: string;
  demoId?: DemoId;
  extraBlock?: { title: string; body: string };
};

export type DemoField = { label: string; value: string | null };

export type Demo = {
  id: DemoId;
  title: string;
  categoryId: CategoryId;
  input: { channel: string; from: string; subject: string; body: string; fields: DemoField[] };
  prepared: { summary: string; present: string[]; missing: string[]; source?: string };
  next: { conceptTitle: string; concept: string; status: string; teamDecides: string };
  evidence: Evidence;
};

export type Campaign = {
  id: CampaignId;
  categoryId: CategoryId;
  demoId: DemoId;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  sub: string;
  primaryLabel: string;
  message: string;
  tasks: [string, string, string];
  faqIds: FaqId[];
  noindex: true;
};

export type FaqItem = { id: FaqId; q: string; a: string };
