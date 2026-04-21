import { Question, Sector } from './types';

/**
 * Per-sector question list + dimension mapping.
 * Vertical questions run from q13 through q17.
 *
 * Dimension mapping differs slightly per sector (see specs):
 * - groothandel: q13→data, q14→processen, q15→vertical, q16→processen, q17→vertical
 * - maakindustrie: q13→vertical, q14→vertical, q15→processen, q16→data, q17→processen
 * - transport: q13→processen, q14→vertical, q15→data, q16→vertical, q17→processen
 */

const groothandel: Question[] = [
  {
    id: 'q13',
    dimension: 'data',
    text: 'Hoe bruikbaar is jullie productinformatie buiten het ERP, PIM of leveranciersbestand?',
    options: [
      { label: 'Die informatie zit verspreid en is lastig snel goed te gebruiken', score: 1 },
      { label: 'We hebben veel informatie, maar nog niet handig op één plek', score: 2 },
      { label: 'Voor belangrijke producten kunnen we redelijk goed bij de juiste info', score: 3 },
      { label: 'Productinformatie is goed bruikbaar voor verkoop, service en opvolging', score: 4 },
    ],
  },
  {
    id: 'q14',
    dimension: 'processen',
    text: 'Hoe worden complexere klantvragen nu meestal afgehandeld?',
    options: [
      { label: 'Dat kost vaak veel uitzoekwerk tussen collega\u2019s, systemen of leveranciers', score: 1 },
      { label: 'Er is meestal wel een route, maar die kost nog best wat tijd', score: 2 },
      { label: 'De meeste vragen kunnen redelijk snel worden opgepakt', score: 3 },
      { label: 'We kunnen zulke vragen meestal vlot en gestructureerd afhandelen', score: 4 },
    ],
  },
  {
    id: 'q15',
    dimension: 'vertical',
    text: 'Hoe snel komt de juiste product-, klant- of leverancierskennis nu bij de juiste collega terecht?',
    options: [
      { label: 'Dat duurt vaak te lang en hangt sterk van mensen af', score: 1 },
      { label: 'Het lukt meestal wel, maar niet altijd snel genoeg', score: 2 },
      { label: 'Voor belangrijke vragen komt kennis meestal redelijk op tijd samen', score: 3 },
      { label: 'De juiste kennis is meestal snel beschikbaar voor de juiste collega', score: 4 },
    ],
  },
  {
    id: 'q16',
    dimension: 'processen',
    text: 'Hoe gestructureerd kijken jullie nu naar prijs, marge of alternatieven bij offertes en aanvragen?',
    options: [
      { label: 'Dat gebeurt nog vooral handmatig en per situatie', score: 1 },
      { label: 'Er zit wel lijn in, maar veel hangt nog af van ervaring', score: 2 },
      { label: 'We hebben hier redelijk vaste werkwijzen voor', score: 3 },
      { label: 'We sturen hier bewust en behoorlijk strak op', score: 4 },
    ],
  },
  {
    id: 'q17',
    dimension: 'vertical',
    text: 'In hoeverre gebruiken jullie klant- en productdata nu al om service of commercie slimmer te maken?',
    options: [
      { label: 'Nog beperkt — daar doen we nog weinig structureels mee', score: 1 },
      { label: 'We zien kansen, maar gebruiken die data nog maar deels', score: 2 },
      { label: 'We benutten data op een paar punten al bewust', score: 3 },
      { label: 'Klant- en productdata helpen ons al merkbaar bij keuzes en opvolging', score: 4 },
    ],
  },
];

const maakindustrie: Question[] = [
  {
    id: 'q13',
    dimension: 'vertical',
    text: 'Hoe beschikbaar is belangrijke productie- of proceskennis buiten de hoofden van ervaren collega\u2019s om?',
    options: [
      { label: 'Veel kennis zit nog vooral bij een paar mensen', score: 1 },
      { label: 'Er is al wel wat vastgelegd, maar nog niet genoeg voor dagelijks gemak', score: 2 },
      { label: 'Belangrijke kennis is op meerdere punten redelijk goed beschikbaar', score: 3 },
      { label: 'Proces- en productiekennis is goed vindbaar en bruikbaar voor het team', score: 4 },
    ],
  },
  {
    id: 'q14',
    dimension: 'vertical',
    text: 'Hoe snel worden afwijkingen, storingen of kwaliteitsissues nu zichtbaar en bruikbaar voor analyse?',
    options: [
      { label: 'Dat komt vaak laat of versnipperd boven tafel', score: 1 },
      { label: 'We krijgen het meestal wel in beeld, maar nog niet altijd snel genoeg', score: 2 },
      { label: 'Belangrijke signalen zijn redelijk goed zichtbaar en te volgen', score: 3 },
      { label: 'Afwijkingen en issues zijn snel inzichtelijk en bruikbaar voor vervolgactie', score: 4 },
    ],
  },
  {
    id: 'q15',
    dimension: 'processen',
    text: 'Hoeveel handmatig uitzoekwerk zit er nog in werkvoorbereiding, documentatie of overdracht?',
    options: [
      { label: 'Best veel — daar gaat nog veel tijd in zitten', score: 1 },
      { label: 'Er is al wat structuur, maar het kost nog regelmatig extra werk', score: 2 },
      { label: 'De basis staat redelijk, al zijn er nog duidelijke kansen', score: 3 },
      { label: 'Dit is behoorlijk strak ingericht en kost relatief weinig extra uitzoekwerk', score: 4 },
    ],
  },
  {
    id: 'q16',
    dimension: 'data',
    text: 'In hoeverre zijn onderhoudsdata, storingshistorie of machine-informatie bruikbaar voor een eerste AI-toepassing?',
    options: [
      { label: 'Die informatie is nog lastig compleet of bruikbaar te krijgen', score: 1 },
      { label: 'Er is al wel wat beschikbaar, maar nog niet heel stevig', score: 2 },
      { label: 'Voor een eerste toepassing is er redelijk bruikbare informatie aanwezig', score: 3 },
      { label: 'Deze informatie is goed genoeg om gericht mee te werken', score: 4 },
    ],
  },
  {
    id: 'q17',
    dimension: 'processen',
    text: 'Hoe gestructureerd leren jullie nu van fouten, uitval of stilstand?',
    options: [
      { label: 'Dat gebeurt nog vrij los en per situatie', score: 1 },
      { label: 'We kijken er wel naar, maar niet altijd op een vaste manier', score: 2 },
      { label: 'Belangrijke lessen worden redelijk goed opgepakt', score: 3 },
      { label: 'We leren hier bewust en gestructureerd van terug in het proces', score: 4 },
    ],
  },
];

const transport: Question[] = [
  {
    id: 'q13',
    dimension: 'processen',
    text: 'Hoeveel tijd kost planning of herplanning nu nog handmatig op een gewone dag?',
    options: [
      { label: 'Veel — daar gaat dagelijks flink tijd in zitten', score: 1 },
      { label: 'Het kost nog best wat tijd, vooral bij wijzigingen of drukte', score: 2 },
      { label: 'De basis loopt redelijk, al blijven er duidelijke kansen', score: 3 },
      { label: 'Planning en herplanning zijn behoorlijk strak georganiseerd', score: 4 },
    ],
  },
  {
    id: 'q14',
    dimension: 'vertical',
    text: 'Hoe snel hebben jullie zicht op vertragingen, afwijkingen of verstoringen in de operatie?',
    options: [
      { label: 'Dat komt vaak laat of versnipperd binnen', score: 1 },
      { label: 'We krijgen het meestal wel in beeld, maar nog niet altijd snel genoeg', score: 2 },
      { label: 'Belangrijke afwijkingen zijn redelijk snel zichtbaar', score: 3 },
      { label: 'We hebben hier vrij snel en goed zicht op', score: 4 },
    ],
  },
  {
    id: 'q15',
    dimension: 'data',
    text: 'Hoe verspreid zit informatie over ritten, klanten, chauffeurs en uitzonderingen nu over systemen en mensen?',
    options: [
      { label: 'Best veel — je moet vaak meerdere bronnen of mensen langs', score: 1 },
      { label: 'Het is werkbaar, maar nog behoorlijk versnipperd', score: 2 },
      { label: 'Voor de belangrijkste processen is het redelijk overzichtelijk', score: 3 },
      { label: 'De meeste relevante informatie is goed bij elkaar te krijgen', score: 4 },
    ],
  },
  {
    id: 'q16',
    dimension: 'vertical',
    text: 'Hoe gestructureerd sturen jullie nu op zaken als beladingsgraad, kilometers, wachttijd of andere operationele KPI\u2019s?',
    options: [
      { label: 'Dat gebeurt nog vrij beperkt of vooral achteraf', score: 1 },
      { label: 'We kijken hier wel naar, maar nog niet heel strak of consequent', score: 2 },
      { label: 'Belangrijke KPI\u2019s worden redelijk goed gevolgd', score: 3 },
      { label: 'We sturen hier bewust en behoorlijk strak op', score: 4 },
    ],
  },
  {
    id: 'q17',
    dimension: 'processen',
    text: 'Hoeveel klant- of plannerscommunicatie bestaat nu uit terugkerende vragen of statusupdates?',
    options: [
      { label: 'Veel — daar gaat nog dagelijks flink tijd in zitten', score: 1 },
      { label: 'Er zit duidelijk herhaling in, maar niet overal evenveel', score: 2 },
      { label: 'Een deel loopt al redelijk efficiënt, al blijven er kansen', score: 3 },
      { label: 'Het meeste terugkerende contact is al behoorlijk goed georganiseerd', score: 4 },
    ],
  },
];

export const verticalQuestions: Record<Exclude<Sector, 'anders'>, Question[]> = {
  groothandel,
  maakindustrie,
  transport,
};

export const sectorLabels: Record<Sector, string> = {
  groothandel: 'Technische groothandel',
  maakindustrie: 'Maakindustrie',
  transport: 'Transport & logistiek',
  anders: 'Anders / overig',
};
