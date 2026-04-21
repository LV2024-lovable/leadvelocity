export type Sector = 'groothandel' | 'maakindustrie' | 'transport' | 'anders';

export type Dimension =
  | 'richting'
  | 'data'
  | 'processen'
  | 'team'
  | 'uitvoering'
  | 'vertical';

export type ScoreBand =
  | 'verkennend'
  | 'in_opbouw'
  | 'klaar'
  | 'sterke_basis'
  | 'ai_ready';

export type AnswerScore = 1 | 2 | 3 | 4;

export type AnswerOption = {
  label: string;
  score: AnswerScore;
};

export type Question = {
  id: string;
  dimension: Dimension;
  text: string;
  options: AnswerOption[];
};

export type Answers = Record<string, AnswerScore>;

export type UseCase = {
  key: string;
  title: string;
  description: string;
};

export type AssessmentResult = {
  sector: Sector;
  answers: Answers;
  rawScore: number;
  normalizedScore: number;
  band: ScoreBand;
  dimensionScores: Partial<Record<Dimension, number>>;
  strongestDimension: Dimension;
  weakestDimension: Dimension;
  recommendedUseCase: UseCase;
  triggers: string[];
};

export type BandMeta = {
  key: ScoreBand;
  label: string;
  range: [number, number];
  summary: string;
  ctaHeadline: string;
  ctaLabel: string;
  ctaHref: string;
};

export type DimensionMeta = {
  key: Dimension;
  label: string;
  shortLabel: string;
  description: string;
  strongCopy: string;
  weakCopy: string;
};
