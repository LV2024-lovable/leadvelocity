import { ScoreBand, Sector } from './types';

/**
 * Generic 30-day action-plan items per band.
 * Trigger-rule advice gets appended on top of these where applicable.
 */
export const actionsByBand: Record<ScoreBand, string[]> = {
  verkennend: [
    'Inventariseer de 3 meest frustrerende handmatige taken in jullie team en schrijf ze kort op.',
    'Laat 2 mensen één week lang ChatGPT of Claude gebruiken voor één concrete dagelijkse taak.',
    'Wijs één collega aan als AI-aanspreekpunt, ook al is het maar 2 uur per week.',
  ],
  in_opbouw: [
    'Kies één proces met veel terugkerende input en een beperkt aantal uitzonderingen als eerste pilot-kandidaat.',
    'Maak een 1-A4 data-inventaris: welke systemen, welke data, wie eigenaar.',
    'Leg vóór de start vast hoe je succes meet — tijd, fouten, doorlooptijd of klanttevredenheid.',
  ],
  klaar: [
    'Breng de belangrijkste data voor de eerste use-case samen in één view — niet alle data, alleen wat die use-case raakt.',
    'Definieer een meetbare KPI en een nulmeting van 2 weken voordat je iets bouwt.',
    'Benoem een AI-verantwoordelijke met budget-autorisatie tot een duidelijk bedrag.',
  ],
  sterke_basis: [
    'Kies tussen 2 kandidaat-pilots op basis van tijd-naar-waarde en risico — niet op technische elegantie.',
    'Start de pilot met mens-in-de-lus en meet wekelijks de accuracy tegen jullie nulmeting.',
    'Plan de "eerste win vieren"-moment al vooraf in — adoptie hangt af van zichtbaarheid.',
  ],
  ai_ready: [
    'Maak een prioritering op impact × haalbaarheid van 3-5 volgende use-cases bovenop wat er al draait.',
    'Zet een lichte governance op: wie besluit, wie bouwt, wie meet — zodat opschaling niet achteraf geregeld moet worden.',
    'Investeer in interne coaching zodat jullie team zelf kan uitbreiden zonder externe afhankelijkheid.',
  ],
};

/**
 * Generic "do not yet" warnings per band.
 * Trigger-rule warnings get appended where applicable.
 */
export const dontsByBand: Record<ScoreBand, string[]> = {
  verkennend: [
    'Nog niet investeren in een breed AI-platform of tooling zonder een concrete pilot.',
    'Nog geen externe consultant inhuren voor "AI-strategie" — dat is nu zonde van budget.',
  ],
  in_opbouw: [
    'Nog niet te breed starten over meerdere teams of processen tegelijk.',
    'Nog geen pilot zonder duidelijke eigenaar en KPI.',
  ],
  klaar: [
    'Nog geen zware integratie kiezen als de informatie voor andere use-cases nog lastig toegankelijk is.',
    'Nog geen autonome AI zonder mens-in-de-lus — eerst accuracy bewijzen, dan pas loslaten.',
  ],
  sterke_basis: [
    'Nog geen organisatie-brede uitrol op basis van één geslaagde pilot.',
    'Nog niet aan meerdere use-cases tegelijk bouwen — kies er één en lever die af.',
  ],
  ai_ready: [
    'Niet in de valkuil trappen om alles zelf te gaan bouwen — check of bestaande tooling 80% van de behoefte dekt.',
    'Niet opschalen zonder meetbare bewijsvoering dat de eerste use-case rendeert.',
  ],
};

/**
 * Optional per-sector flavouring for the intro-summary on the result page.
 */
export const sectorFlavour: Record<Sector, string> = {
  groothandel:
    'In jullie sector zien we de snelste wins in productkennis, offerte-ondersteuning en klantvraag-routering.',
  maakindustrie:
    'In jullie sector zien we de snelste wins in kennisborging, afwijkingsanalyse en werkvoorbereiding.',
  transport:
    'In jullie sector zien we de snelste wins in planningsondersteuning, exception-handling en klantcommunicatie.',
  anders:
    'Ook zonder sector-focus zien we dezelfde terugkerende hefbomen: documentautomatisering, kennis-hubs en e-mail-support.',
};
