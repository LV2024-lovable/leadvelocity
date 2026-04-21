import { BandMeta, ScoreBand } from './types';

export const bands: BandMeta[] = [
  {
    key: 'verkennend',
    label: 'Verkennend',
    range: [0, 39],
    summary:
      'De interesse is er, maar de basis is nog te dun om nu al breed te bouwen. De grootste winst zit nu in één afgebakende use-case en scherpere prioritering.',
    ctaHeadline: 'Eerst scherp krijgen waar AI wel en niet logisch is',
    ctaLabel: 'Bekijk hoe een AI Ops Audit werkt',
    ctaHref: '/ai-ops-audit',
  },
  {
    key: 'in_opbouw',
    label: 'In opbouw',
    range: [40, 59],
    summary:
      'Er is ruimte om te starten, maar de eerste stap moet scherper worden gekozen. De basis is er nog niet overal even sterk — daar zit tegelijk jullie grootste kans.',
    ctaHeadline: 'De basis is er, maar de eerste stap moet scherp gekozen zijn',
    ctaLabel: 'Plan een verkennend gesprek',
    ctaHref: '/ai-ops-audit',
  },
  {
    key: 'klaar',
    label: 'Klaar om te starten',
    range: [60, 79],
    summary:
      'Jullie hebben genoeg basis om een eerste AI-toepassing zinvol te testen. De grootste winst zit nu in een scherpere eerste use-case en betere meetbaarheid.',
    ctaHeadline: 'Jullie hoeven niet te wachten om een eerste toepassing te testen',
    ctaLabel: 'Bespreek een mogelijke eerste pilot',
    ctaHref: '/ai-ops-audit',
  },
  {
    key: 'sterke_basis',
    label: 'Sterke basis',
    range: [80, 94],
    summary:
      'Jullie lijken dicht bij een werkende pilot te zitten. De vraag is niet óf jullie kunnen starten, maar waar de kortste route naar rendement loopt.',
    ctaHeadline: 'Jullie lijken dicht bij een werkende pilot te zitten',
    ctaLabel: 'Plan een AI Ops Audit',
    ctaHref: '/ai-ops-audit',
  },
  {
    key: 'ai_ready',
    label: 'AI-ready',
    range: [95, 100],
    summary:
      'De basis staat. De vraag is nu niet óf jullie moeten starten, maar waar je als eerste impact pakt.',
    ctaHeadline: 'De basis staat. De vraag is nu waar je als eerste impact pakt.',
    ctaLabel: 'Bespreek jullie eerste of volgende toepassing',
    ctaHref: '/ai-ops-audit',
  },
];

export const bandByKey = (key: ScoreBand): BandMeta =>
  bands.find((b) => b.key === key) ?? bands[0];

export const bandForScore = (score: number): BandMeta => {
  for (const b of bands) {
    if (score >= b.range[0] && score <= b.range[1]) return b;
  }
  return bands[0];
};
