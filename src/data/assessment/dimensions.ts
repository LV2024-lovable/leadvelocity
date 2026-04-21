import { Dimension, DimensionMeta } from './types';

export const dimensions: DimensionMeta[] = [
  {
    key: 'richting',
    label: 'Richting & eigenaarschap',
    shortLabel: 'Richting',
    description: 'Hoe scherp is de AI-richting binnen jullie organisatie?',
    strongCopy:
      'Er is genoeg interne beweging en commitment om een eerste stap concreet te maken.',
    weakCopy:
      'Eigenaarschap of prioritering is nog niet scherp genoeg — zonder duidelijke eigenaar verdampen pilots snel.',
  },
  {
    key: 'data',
    label: 'Data & systemen',
    shortLabel: 'Data',
    description: 'Hoe toegankelijk en bruikbaar is jullie informatie voor AI?',
    strongCopy:
      'De informatie voor een eerste toepassing is relatief goed toegankelijk en bruikbaar.',
    weakCopy:
      'Informatie is nog te verspreid over systemen om meteen breed te bouwen.',
  },
  {
    key: 'processen',
    label: 'Processen & kansen',
    shortLabel: 'Processen',
    description: 'Hoe helder zijn jullie processen en de AI-kansen die daar zitten?',
    strongCopy:
      'Jullie hebben een goed beeld van waar de terugkerende processen zitten en waar AI iets kan toevoegen.',
    weakCopy:
      'De kansen zijn er, maar nog weinig afgebakend of geprioriteerd — dat maakt kiezen lastig.',
  },
  {
    key: 'team',
    label: 'Team & adoptie',
    shortLabel: 'Team',
    description: 'Hoe makkelijk adopteert jullie organisatie een nieuwe werkwijze?',
    strongCopy:
      'Jullie organisatie neemt nieuwe werkwijzen relatief goed op — dat is een sterke basis voor implementatie.',
    weakCopy:
      'Nieuwe werkwijzen landen nog langzaam — dat is het grootste risico voor adoptie.',
  },
  {
    key: 'uitvoering',
    label: 'Uitvoering & controle',
    shortLabel: 'Uitvoering',
    description: 'Hoe gedisciplineerd meten en controleren jullie resultaten?',
    strongCopy:
      'Jullie meten effecten en hebben controle-mechanismen op hun plek — cruciaal voor opschaling.',
    weakCopy:
      'Zonder duidelijke KPI of controle wordt het lastig om intern tractie en budget te behouden.',
  },
  {
    key: 'vertical',
    label: 'Vertical fit',
    shortLabel: 'Sector',
    description: 'Hoe goed passen jullie sector-specifieke kenmerken bij bestaande AI-oplossingen?',
    strongCopy:
      'In jullie sector herkennen we duidelijke, beproefde AI-hefbomen — die kunnen jullie direct benutten.',
    weakCopy:
      'Voor jullie sector is de AI-volwassenheid nog in opbouw — daarom extra belangrijk om klein te beginnen.',
  },
];

export const dimensionByKey = (key: Dimension): DimensionMeta =>
  dimensions.find((d) => d.key === key) ?? dimensions[0];
