import { Question } from './types';

export const coreQuestions: Question[] = [
  {
    id: 'q1',
    dimension: 'richting',
    text: 'Hoe wordt AI bij jullie nu besproken?',
    options: [
      { label: 'Het speelt af en toe, maar nog zonder duidelijke richting', score: 1 },
      { label: 'We praten er steeds vaker over, vooral rond losse ideeën of tools', score: 2 },
      { label: 'We hebben al een paar concrete toepassingen in beeld', score: 3 },
      { label: 'AI is gekoppeld aan duidelijke doelen en krijgt actief aandacht', score: 4 },
    ],
  },
  {
    id: 'q2',
    dimension: 'richting',
    text: 'Wie trekt AI-initiatieven bij jullie nu vooral?',
    options: [
      { label: 'Er is nog niemand die dit echt vast oppakt', score: 1 },
      { label: 'Het ligt vooral bij een paar nieuwsgierige collega\u2019s', score: 2 },
      { label: 'Er is iemand of een klein team dat hier actief op stuurt', score: 3 },
      { label: 'Er is duidelijk eigenaarschap én steun vanuit de leiding', score: 4 },
    ],
  },
  {
    id: 'q3',
    dimension: 'richting',
    text: 'Hoe kiezen jullie nu waar AI wel of niet nuttig kan zijn?',
    options: [
      { label: 'We hebben vooral ideeën, maar nog geen duidelijke keuzes gemaakt', score: 1 },
      { label: 'We kijken vooral per situatie wat interessant lijkt', score: 2 },
      { label: 'We hebben een paar processen gekozen waar AI echt verschil kan maken', score: 3 },
      { label: 'We kiezen bewust op basis van impact, haalbaarheid en prioriteit', score: 4 },
    ],
  },
  {
    id: 'q4',
    dimension: 'data',
    text: 'Hoe makkelijk kun je de informatie vinden die je nodig hebt voor een eerste AI-toepassing?',
    options: [
      { label: 'Informatie staat op veel plekken en is lastig bij elkaar te krijgen', score: 1 },
      { label: 'We kunnen de meeste informatie wel vinden, maar het kost tijd', score: 2 },
      { label: 'Voor een eerste toepassing is de juiste informatie redelijk goed beschikbaar', score: 3 },
      { label: 'De informatie die we nodig hebben is goed vindbaar en bruikbaar', score: 4 },
    ],
  },
  {
    id: 'q5',
    dimension: 'data',
    text: 'Hoe verspreid zitten werkprocessen en informatie nu over systemen en mensen?',
    options: [
      { label: 'Best veel — je hebt vaak meerdere systemen of collega\u2019s nodig', score: 1 },
      { label: 'Het is werkbaar, maar nog vrij versnipperd', score: 2 },
      { label: 'Voor de belangrijkste processen is het redelijk overzichtelijk', score: 3 },
      { label: 'De belangrijkste informatie en stappen zijn goed georganiseerd', score: 4 },
    ],
  },
  {
    id: 'q6',
    dimension: 'processen',
    text: 'Hoeveel terugkerend handmatig werk zit er nog in jullie dagelijkse operatie?',
    options: [
      { label: 'Veel — er gaat nog veel tijd naar herhalen, zoeken en overtypen', score: 1 },
      { label: 'Er zitten duidelijk repeterende taken in, maar niet overal', score: 2 },
      { label: 'Een deel is al strak ingericht, maar er blijven kansen liggen', score: 3 },
      { label: 'Het meeste terugkerende werk is al behoorlijk goed georganiseerd', score: 4 },
    ],
  },
  {
    id: 'q7',
    dimension: 'team',
    text: 'Hoe gebruiken collega\u2019s AI nu al in hun werk?',
    options: [
      { label: 'Nauwelijks of nog helemaal niet', score: 1 },
      { label: 'Een paar mensen proberen er af en toe iets mee', score: 2 },
      { label: 'AI wordt op meerdere plekken al bewust gebruikt', score: 3 },
      { label: 'AI is op een paar taken al een normaal onderdeel van het werk', score: 4 },
    ],
  },
  {
    id: 'q8',
    dimension: 'uitvoering',
    text: 'Hoe zorgen jullie dat output van AI of automatiseringen gecontroleerd blijft?',
    options: [
      { label: 'Daar zijn we nog niet echt mee bezig', score: 1 },
      { label: 'Iemand kijkt meestal mee, maar zonder vaste werkwijze', score: 2 },
      { label: 'Bij belangrijk werk zijn er duidelijke controlepunten', score: 3 },
      { label: 'We weten goed waar controle nodig is en hoe we dat borgen', score: 4 },
    ],
  },
  {
    id: 'q9',
    dimension: 'uitvoering',
    text: 'Hoe snel zouden jullie een eerste AI-pilot echt kunnen starten?',
    options: [
      { label: 'Dat zou nu nog lastig zijn', score: 1 },
      { label: 'Met wat voorbereiding zou dat moeten kunnen', score: 2 },
      { label: 'We zouden vrij snel een eerste afgebakende pilot kunnen starten', score: 3 },
      { label: 'We kunnen op korte termijn gericht beginnen', score: 4 },
    ],
  },
  {
    id: 'q10',
    dimension: 'uitvoering',
    text: 'Hoe wordt budget voor AI of procesverbetering bij jullie meestal bekeken?',
    options: [
      { label: 'Daar is nu nog weinig ruimte of duidelijkheid voor', score: 1 },
      { label: 'Er is interesse, maar het moet eerst heel duidelijk worden gemaakt', score: 2 },
      { label: 'Voor een goede eerste stap is meestal wel ruimte te maken', score: 3 },
      { label: 'Als de business case klopt, kan er snel budget vrijgemaakt worden', score: 4 },
    ],
  },
  {
    id: 'q11',
    dimension: 'uitvoering',
    text: 'Hoe meten jullie nu of een procesverbetering echt iets oplevert?',
    options: [
      { label: 'Dat doen we nog vrij beperkt of vooral op gevoel', score: 1 },
      { label: 'We kijken wel naar effect, maar niet altijd op een vaste manier', score: 2 },
      { label: 'Voor belangrijke processen meten we redelijk goed wat het oplevert', score: 3 },
      { label: 'We werken meestal met duidelijke KPI\u2019s of een heldere nulmeting', score: 4 },
    ],
  },
  {
    id: 'q12',
    dimension: 'team',
    text: 'Hoe makkelijk krijgt een nieuwe werkwijze bij jullie echt voet aan de grond?',
    options: [
      { label: 'Nieuwe dingen landen vaak langzaam of blijven bij een paar mensen hangen', score: 1 },
      { label: 'Als iets nuttig is, komt het meestal wel op gang — maar niet vanzelf', score: 2 },
      { label: 'Teams nemen verbeteringen redelijk goed over als het duidelijk helpt', score: 3 },
      { label: 'Nieuwe werkwijzen worden meestal snel opgepakt als ze waarde tonen', score: 4 },
    ],
  },
];
