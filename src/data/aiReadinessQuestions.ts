// AI-Readiness Assessment — questions + scoring logic.
// 15 questions across 5 dimensions, max 100 points total.

export type QuizOption = {
  label: string;
  score: number; // 0-4 typically, higher = more ready
};

export type QuizQuestion = {
  id: string;
  dimension: QuizDimension;
  question: string;
  help?: string;
  options: QuizOption[];
};

export type QuizDimension =
  | 'Data'
  | 'Team'
  | 'Processen'
  | 'Ambitie'
  | 'Budget';

export const dimensions: Array<{ key: QuizDimension; label: string; description: string }> = [
  {
    key: 'Data',
    label: 'Data-volwassenheid',
    description: 'Hoeveel gestructureerde data is toegankelijk en bruikbaar?',
  },
  {
    key: 'Team',
    label: 'Team & verandervermogen',
    description: 'Is er draagvlak en capaciteit om AI-oplossingen te adopteren?',
  },
  {
    key: 'Processen',
    label: 'Proces-volwassenheid',
    description: 'Zijn jullie processen gedocumenteerd en geordend genoeg?',
  },
  {
    key: 'Ambitie',
    label: 'Ambitie & urgentie',
    description: 'Is er commitment aan de top en een heldere driver?',
  },
  {
    key: 'Budget',
    label: 'Investerings-bereidheid',
    description: 'Is er ruimte om een eerste traject serieus op te pakken?',
  },
];

export const questions: QuizQuestion[] = [
  // ===== DATA =====
  {
    id: 'data_erp',
    dimension: 'Data',
    question: 'Welk ERP/kern-systeem gebruiken jullie voor transacties?',
    options: [
      { label: 'Modern cloud-ERP (AFAS, Exact Online, Isah, Netsuite, SAP S/4HANA)', score: 4 },
      { label: 'On-premise ERP (Navision, SAP ECC, Ridder, etc.) met stabiele data', score: 3 },
      { label: 'ERP aanwezig, maar data is fragmentarisch', score: 2 },
      { label: 'Voornamelijk Excel + losse systemen', score: 1 },
      { label: 'Geen centraal systeem', score: 0 },
    ],
  },
  {
    id: 'data_history',
    dimension: 'Data',
    question: 'Hoeveel jaar gestructureerde transactiedata hebben jullie beschikbaar?',
    options: [
      { label: '5+ jaar, clean en herleidbaar', score: 4 },
      { label: '3-5 jaar, grotendeels clean', score: 3 },
      { label: '1-3 jaar, enige opschoning nodig', score: 2 },
      { label: 'Minder dan 1 jaar of veel gaten', score: 1 },
      { label: 'Weet ik niet', score: 0 },
    ],
  },
  {
    id: 'data_silos',
    dimension: 'Data',
    question: 'Hoeveel verschillende systemen hebben klantdata?',
    options: [
      { label: '1-2 systemen, goed gekoppeld', score: 4 },
      { label: '3-4 systemen, deels gekoppeld', score: 3 },
      { label: '5+ systemen, losse eilandjes', score: 2 },
      { label: 'Voornamelijk in hoofden van medewerkers', score: 1 },
    ],
  },

  // ===== TEAM =====
  {
    id: 'team_sponsor',
    dimension: 'Team',
    question: 'Wie binnen het bedrijf zou trekker zijn van een AI-traject?',
    options: [
      { label: 'Directie (COO/CRO/DGA) — actief betrokken', score: 4 },
      { label: 'Manager-niveau met directie-mandaat', score: 3 },
      { label: 'Operationele medewerker, directie volgt', score: 2 },
      { label: 'Niemand specifiek, we zouden moeten zoeken', score: 1 },
    ],
  },
  {
    id: 'team_ai_experience',
    dimension: 'Team',
    question: 'Hoe staat je team tegenover AI-gebaseerde tools?',
    options: [
      { label: 'Meerdere medewerkers gebruiken al ChatGPT/Copilot in hun werk', score: 4 },
      { label: 'Enkele medewerkers experimenteren', score: 3 },
      { label: 'Team is nieuwsgierig maar nog niet aan de gang', score: 2 },
      { label: 'Skeptisch of angstig over AI', score: 1 },
    ],
  },
  {
    id: 'team_change',
    dimension: 'Team',
    question: 'Hoe reageert je organisatie normaal op nieuwe systemen/tools?',
    options: [
      { label: 'Snel adoptie, korte leercurve, enthousiaste gebruikers', score: 4 },
      { label: 'Acceptatie na goede training en begeleiding', score: 3 },
      { label: 'Weerstand in begin, wennen kost maanden', score: 2 },
      { label: 'Projecten stranden vaak door lage adoptie', score: 1 },
    ],
  },

  // ===== PROCESSEN =====
  {
    id: 'process_documentation',
    dimension: 'Processen',
    question: 'Zijn jullie kern-processen (offertes, orderverwerking, inkoop) gedocumenteerd?',
    options: [
      { label: 'Volledig gedocumenteerd in werkinstructies/SOPs', score: 4 },
      { label: 'Grotendeels gedocumenteerd, deels in hoofden', score: 3 },
      { label: 'Sommige processen beschreven, meeste niet', score: 2 },
      { label: 'Weinig of niks gedocumenteerd', score: 1 },
    ],
  },
  {
    id: 'process_bottleneck',
    dimension: 'Processen',
    question: 'Welk proces kost nu aantoonbaar de meeste tijd of veroorzaakt de meeste frustratie?',
    options: [
      { label: 'We weten het precies, hebben cijfers', score: 4 },
      { label: 'Duidelijk idee, maar geen meetgegevens', score: 3 },
      { label: 'Meerdere kandidaten, geen focus', score: 2 },
      { label: 'Geen helder beeld', score: 1 },
    ],
  },
  {
    id: 'process_kpi',
    dimension: 'Processen',
    question: 'Hebben jullie duidelijke KPI\'s die jullie dagelijks/wekelijks volgen?',
    options: [
      { label: 'Live dashboard, realtime inzicht', score: 4 },
      { label: 'Wekelijkse rapportage uit data', score: 3 },
      { label: 'Maandelijks, handmatig in Excel', score: 2 },
      { label: 'Pas achteraf bij kwartaalrapportage', score: 1 },
    ],
  },

  // ===== AMBITIE =====
  {
    id: 'ambition_urgency',
    dimension: 'Ambitie',
    question: 'Wat is de belangrijkste reden om nu met AI te beginnen?',
    options: [
      { label: 'Concurrent doet het al / dreigt ons in te halen', score: 4 },
      { label: 'Specifieke pijn die we echt willen oplossen', score: 4 },
      { label: 'Directie voelt dat we niet achter willen lopen', score: 3 },
      { label: 'Interessant, nog geen concrete driver', score: 2 },
      { label: 'Eigenlijk niet dringend', score: 1 },
    ],
  },
  {
    id: 'ambition_timeline',
    dimension: 'Ambitie',
    question: 'Binnen welk tijdsbestek willen jullie eerste resultaten zien?',
    options: [
      { label: 'Dit kwartaal — er is urgentie', score: 4 },
      { label: 'Binnen 6 maanden', score: 3 },
      { label: 'Binnen een jaar', score: 2 },
      { label: 'Nog niet concreet', score: 1 },
    ],
  },
  {
    id: 'ambition_scope',
    dimension: 'Ambitie',
    question: 'Hoe zien jullie de rol van AI over 3 jaar in jullie organisatie?',
    options: [
      { label: 'Fundament van onze operatie, doorgroeien met concurrentievoorsprong', score: 4 },
      { label: 'Op meerdere plekken structureel ingezet', score: 3 },
      { label: 'Op 1-2 specifieke plekken', score: 2 },
      { label: 'Ad-hoc, geen grote ambitie', score: 1 },
    ],
  },

  // ===== BUDGET =====
  {
    id: 'budget_committed',
    dimension: 'Budget',
    question: 'Is er budget gereserveerd voor een AI-traject?',
    options: [
      { label: 'Ja, vrijgegeven en goedgekeurd door directie', score: 4 },
      { label: 'In principe akkoord, moet nog formeel', score: 3 },
      { label: 'Onderzocht, nog geen beslissing', score: 2 },
      { label: 'Niet specifiek, afhankelijk van business case', score: 1 },
    ],
  },
  {
    id: 'budget_size',
    dimension: 'Budget',
    question: 'Wat is de orde van grootte waar jullie aan denken voor een eerste project?',
    options: [
      { label: '€50k+ voor een serieus anchor-project', score: 4 },
      { label: '€15-50k voor een pilot-build', score: 3 },
      { label: '€5-15k om iets kleins te starten', score: 2 },
      { label: 'Liefst onder €5k om te testen', score: 1 },
    ],
  },
  {
    id: 'budget_recurring',
    dimension: 'Budget',
    question: 'Hoe denken jullie over doorlopende kosten (hosting, onderhoud, nieuwe features)?',
    options: [
      { label: 'Prima, zien dit als strategische investering', score: 4 },
      { label: 'Akkoord, mits ROI zichtbaar is', score: 3 },
      { label: 'Liever eenmalige uitgave', score: 2 },
      { label: 'Weet ik niet, nog niet besproken', score: 1 },
    ],
  },
];

export type ScoreResult = {
  totalScore: number; // 0-100
  maxScore: number; // 100 (or less if some questions skipped)
  percentage: number; // 0-100
  byDimension: Record<QuizDimension, { score: number; max: number; percentage: number }>;
  readinessLevel: ReadinessLevel;
  recommendation: string;
};

export type ReadinessLevel =
  | 'Verkennend'
  | 'Ontwikkelend'
  | 'Klaar om te starten'
  | 'AI-Ready';

const readinessLevelConfig: Record<ReadinessLevel, { min: number; color: string }> = {
  Verkennend: { min: 0, color: '#71717A' },
  Ontwikkelend: { min: 40, color: '#F59E0B' },
  'Klaar om te starten': { min: 60, color: '#84CC16' },
  'AI-Ready': { min: 80, color: '#C8FF00' },
};

export const calculateScore = (answers: Record<string, number>): ScoreResult => {
  const byDimension: Record<QuizDimension, { score: number; max: number; percentage: number }> = {
    Data: { score: 0, max: 0, percentage: 0 },
    Team: { score: 0, max: 0, percentage: 0 },
    Processen: { score: 0, max: 0, percentage: 0 },
    Ambitie: { score: 0, max: 0, percentage: 0 },
    Budget: { score: 0, max: 0, percentage: 0 },
  };

  questions.forEach((q) => {
    const answered = answers[q.id];
    if (answered === undefined) return;
    const maxForQ = Math.max(...q.options.map((o) => o.score));
    byDimension[q.dimension].score += answered;
    byDimension[q.dimension].max += maxForQ;
  });

  let totalScore = 0;
  let maxScore = 0;
  Object.keys(byDimension).forEach((k) => {
    const d = byDimension[k as QuizDimension];
    d.percentage = d.max > 0 ? Math.round((d.score / d.max) * 100) : 0;
    totalScore += d.score;
    maxScore += d.max;
  });

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let readinessLevel: ReadinessLevel = 'Verkennend';
  (['AI-Ready', 'Klaar om te starten', 'Ontwikkelend', 'Verkennend'] as ReadinessLevel[]).forEach((level) => {
    if (percentage >= readinessLevelConfig[level].min && readinessLevel === 'Verkennend') {
      readinessLevel = level;
    }
  });
  // Simpler: find highest level where percentage meets min
  const levels: ReadinessLevel[] = ['Verkennend', 'Ontwikkelend', 'Klaar om te starten', 'AI-Ready'];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (percentage >= readinessLevelConfig[levels[i]].min) {
      readinessLevel = levels[i];
      break;
    }
  }

  const recommendations: Record<ReadinessLevel, string> = {
    Verkennend:
      'Jullie zijn aan het verkennen — dat is een goed startpunt. De grootste winst zit nu in het opschonen van data en het identificeren van één pijnpunt om mee te beginnen. Een Quick Win-automatisering (€1-3k) geeft jullie momentum zonder risico.',
    Ontwikkelend:
      'Jullie hebben duidelijke signalen dat AI waardevol kan zijn. De volgende stap is een scherpe AI Ops Audit (€2.500, 2 weken) om de top-3 AI-kansen concreet te identificeren. Daarna één Quick Win uitvoeren.',
    'Klaar om te starten':
      'Jullie zijn klaar voor een serieuze eerste stap. Een Pilot Build (€12-20k, 6-8 weken) op een gerichte use-case levert meetbaar resultaat binnen het kwartaal. Budget en team zijn op orde.',
    'AI-Ready':
      'Jullie organisatie is uitstekend voorbereid. Een doorlopende Operating Partnership brengt structurele AI-voorsprong. Meerdere Tier 2/3 projecten parallel is realistisch.',
  };

  return {
    totalScore,
    maxScore,
    percentage,
    byDimension,
    readinessLevel,
    recommendation: recommendations[readinessLevel],
  };
};

export const getLevelColor = (level: ReadinessLevel): string => readinessLevelConfig[level].color;
