import { Dimension } from './types';

export type TriggerRule = {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  matches: (totalScore: number, dims: Partial<Record<Dimension, number>>) => boolean;
  advice: string;
  warning: string;
};

export const triggerRules: TriggerRule[] = [
  {
    id: 'A',
    matches: (total, dims) => total > 80 && (dims.data ?? 100) < 50,
    advice:
      'Jullie ambitie is sterk genoeg om te starten. Kies een kennis-, document- of analyse-gerichte toepassing voor de eerste stap — niet een brede integratie.',
    warning:
      'Een brede integratie-pilot wordt nu onnodig complex omdat data nog te verspreid is.',
  },
  {
    id: 'B',
    matches: (total, dims) => total > 75 && (dims.richting ?? 100) < 50,
    advice:
      'Leg eerst een duidelijke eigenaar, sponsor en afgebakende scope vast voordat een pilot start.',
    warning:
      'Zonder scherp eigenaarschap is uitvoering het grootste risico — ook bij goede use-cases.',
  },
  {
    id: 'C',
    matches: (total, dims) =>
      total >= 60 && total <= 79 && (dims.uitvoering ?? 100) < 50,
    advice:
      'Leg eerst KPI\u2019s en controlemomenten vast. Start geen pilot zonder nulmeting of duidelijke succesdefinitie.',
    warning:
      'Zonder meetlat wordt het lastig om intern tractie te behouden, zelfs als de pilot technisch werkt.',
  },
  {
    id: 'D',
    matches: (_total, dims) =>
      (dims.processen ?? 0) >= 70 && (dims.team ?? 100) < 50,
    advice:
      'De use-case klopt waarschijnlijk. Start klein in één team of met mens-in-de-lus, en maak output zichtbaar en tastbaar.',
    warning:
      'Een brede uitrol in deze fase loopt vast op adoptie, ook als de techniek prima werkt.',
  },
  {
    id: 'E',
    matches: (_total, dims) => (dims.team ?? 100) < 50,
    advice:
      'Begin in één team of met mens-in-de-lus. Bouw momentum met zichtbare kleine wins voor je breder uitrolt.',
    warning:
      'Een organisatiebrede uitrol zonder adoptie-basis is het meest voorkomende pad naar een stille dood van AI-projecten.',
  },
];

export const evaluateTriggerRules = (
  totalScore: number,
  dims: Partial<Record<Dimension, number>>,
): TriggerRule[] => triggerRules.filter((r) => r.matches(totalScore, dims));
