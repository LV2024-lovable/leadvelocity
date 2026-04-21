import { coreQuestions } from './coreQuestions';
import { verticalQuestions } from './verticalQuestions';
import {
  Answers,
  AnswerScore,
  AssessmentResult,
  Dimension,
  Question,
  Sector,
} from './types';
import { bandForScore } from './bands';
import { evaluateTriggerRules } from './triggerRules';
import { pickUseCase } from './useCases';

export const getQuestionsForSector = (sector: Sector): Question[] => {
  if (sector === 'anders') return coreQuestions;
  return [...coreQuestions, ...verticalQuestions[sector]];
};

const ALL_DIMENSIONS: Dimension[] = [
  'richting',
  'data',
  'processen',
  'team',
  'uitvoering',
  'vertical',
];

const normalize = (raw: number, min: number, max: number): number =>
  max === min ? 0 : Math.round(((raw - min) / (max - min)) * 100);

export const calculateResult = (sector: Sector, answers: Answers): AssessmentResult => {
  const questions = getQuestionsForSector(sector);
  const answered = questions.filter((q) => answers[q.id] !== undefined);

  const rawScore = answered.reduce<number>((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const minRaw = questions.length * 1;
  const maxRaw = questions.length * 4;
  const normalizedScore = normalize(rawScore, minRaw, maxRaw);

  const dimensionScores: Partial<Record<Dimension, number>> = {};

  for (const dim of ALL_DIMENSIONS) {
    const dimQuestions = questions.filter((q) => q.dimension === dim);
    if (dimQuestions.length === 0) continue;

    const dimRaw = dimQuestions.reduce<number>(
      (sum, q) => sum + (answers[q.id] ?? 0),
      0,
    );
    const dimMin = dimQuestions.length * 1;
    const dimMax = dimQuestions.length * 4;
    dimensionScores[dim] = normalize(dimRaw, dimMin, dimMax);
  }

  // Pick strongest and weakest (exclude missing)
  const dimEntries = Object.entries(dimensionScores) as Array<[Dimension, number]>;
  const sortedByScore = [...dimEntries].sort((a, b) => b[1] - a[1]);
  const strongestDimension = sortedByScore[0]?.[0] ?? 'richting';
  const weakestDimension = sortedByScore[sortedByScore.length - 1]?.[0] ?? 'richting';

  const band = bandForScore(normalizedScore).key;

  const activeRules = evaluateTriggerRules(normalizedScore, dimensionScores);
  const triggers = activeRules.map((r) => r.id);

  const recommendedUseCase = pickUseCase(
    sector,
    strongestDimension,
    weakestDimension,
    triggers,
  );

  return {
    sector,
    answers,
    rawScore,
    normalizedScore,
    band,
    dimensionScores,
    strongestDimension,
    weakestDimension,
    recommendedUseCase,
    triggers,
  };
};

export const isValidAnswer = (v: unknown): v is AnswerScore =>
  v === 1 || v === 2 || v === 3 || v === 4;
