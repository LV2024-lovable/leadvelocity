import { Sector, UseCase } from './types';

export const useCasesBySector: Record<Sector, UseCase[]> = {
  groothandel: [
    {
      key: 'productkennis_assistent',
      title: 'Productkennis-assistent',
      description:
        'Een interne AI-assistent die datasheets, leverancierscatalogi en historische offertes doorzoekt, zodat binnendienst en account managers in seconden het juiste alternatief of de juiste specificatie vinden.',
    },
    {
      key: 'offerte_voorbereiding',
      title: 'Offertevoorbereiding',
      description:
        'Automatische eerste-concept-offertes op basis van inkomende RFQ\'s. AI vult artikelnummers, prijzen en alternatieven in; sales controleert en verstuurt.',
    },
    {
      key: 'klantvraag_routering',
      title: 'Klantvraag-routering',
      description:
        'Inkomende klantvragen worden geclassificeerd, verrijkt met context uit het ERP en naar de juiste collega doorgestuurd met een concept-antwoord.',
    },
    {
      key: 'datasheet_klanttaal',
      title: 'Datasheet-naar-klanttaal',
      description:
        'Technische datasheets worden automatisch vertaald naar begrijpelijke productomschrijvingen en commerciële argumenten — goed voor webshop en sales.',
    },
    {
      key: 'interne_productsupport',
      title: 'Interne productsupport-assistent',
      description:
        'Een chatbot voor collega\'s die productvragen snel beantwoordt met bronverwijzing — minder afhankelijk van de paar mensen die "alles weten".',
    },
  ],
  maakindustrie: [
    {
      key: 'afwijkingsanalyse',
      title: 'Afwijkingsanalyse',
      description:
        'AI-analyse op storings- en kwaliteitsdata die structureel patronen zichtbaar maakt — zodat jullie eerder ingrijpen in plaats van achteraf repareren.',
    },
    {
      key: 'werkvoorbereidingsassistent',
      title: 'Werkvoorbereidingsassistent',
      description:
        'Automatische eerste-versie van werkvoorbereiding op basis van tekeningen, historische orders en kennis in de fabriek. Ingenieur controleert en verfijnt.',
    },
    {
      key: 'kennisborging',
      title: 'Kennisborging voor productie',
      description:
        'Engineering-tekeningen, werkinstructies en jaren aan praktijk-kennis worden indexeerbaar. Nieuwe medewerkers vinden wat ze nodig hebben in minuten in plaats van dagen.',
    },
    {
      key: 'onderhoudssamenvattingen',
      title: 'Onderhoudssamenvattingen',
      description:
        'Storings- en onderhoudsrapporten worden automatisch samengevat tot actionable inzichten voor techniek en management.',
    },
    {
      key: 'overdracht_assistent',
      title: 'Documentatie- en overdrachtsassistent',
      description:
        'Shiftoverdrachten en projectoverdrachten worden gestructureerd vastgelegd met AI-hulp, zodat kennis niet verdampt tussen wisselingen door.',
    },
  ],
  transport: [
    {
      key: 'planningsondersteuning',
      title: 'Planningsondersteuning',
      description:
        'AI-copilot die planners helpt bij "kan deze rit erbij?"-vragen. Ritdata, reistijden en chauffeursbeschikbaarheid in seconden gecombineerd.',
    },
    {
      key: 'klantstatus_automatisering',
      title: 'Klantstatus-automatisering',
      description:
        'Terugkerende vragen over ritstatus, ETA of factuur worden automatisch beantwoord met de juiste data — planners houden tijd over voor uitzonderingen.',
    },
    {
      key: 'exception_handling',
      title: 'Exception-handling-assistent',
      description:
        'Vertragingen, gemiste slots of retouren worden automatisch gedetecteerd en samengevat met aanbevolen vervolgactie voor de planner.',
    },
    {
      key: 'rit_samenvattingen',
      title: 'Rit- en afwijkingssamenvattingen',
      description:
        'AI produceert dagelijkse/wekelijkse samenvattingen van uitgevoerde ritten en afwijkingen — direct bruikbaar voor management en klant.',
    },
    {
      key: 'plannersupport_herplanning',
      title: 'Plannersupport voor herplanning',
      description:
        'Bij verstoringen (staking, file, pech) berekent AI binnen seconden alternatieve routes inclusief impact op klanten en chauffeurs.',
    },
  ],
  anders: [
    {
      key: 'document_automatisering',
      title: 'Documentautomatisering',
      description:
        'OCR + AI-extractie op inkomende PDFs, facturen, orderbevestigingen — handmatig overtypen wordt uitzondering in plaats van standaard.',
    },
    {
      key: 'kennis_hub',
      title: 'Kennis-hub voor het team',
      description:
        'Een AI-zoekinterface over jullie documenten, werkinstructies en historische projecten. Nieuwe medewerkers vinden wat ze nodig hebben zonder iedereen te hoeven vragen.',
    },
    {
      key: 'email_automatisering',
      title: 'E-mail-automatisering',
      description:
        'Inkomende e-mails worden geclassificeerd, verrijkt en beantwoord met een concept-antwoord. Mens controleert, AI bespaart tijd.',
    },
  ],
};

export const pickUseCase = (
  sector: Sector,
  strongestDim: string,
  _weakestDim: string,
  triggers: string[],
): UseCase => {
  const list = useCasesBySector[sector];
  if (!list || list.length === 0) return useCasesBySector.anders[0];

  // Simple heuristic:
  // - If data is weak (Trigger A), prefer kennis/document/analyse-type use-case
  // - If processen is strong, prefer a process-automation use-case
  // - Otherwise return the "flagship" for that sector (first in list)
  if (triggers.includes('A')) {
    if (sector === 'groothandel') return list.find((u) => u.key === 'productkennis_assistent') ?? list[0];
    if (sector === 'maakindustrie') return list.find((u) => u.key === 'kennisborging') ?? list[0];
    if (sector === 'transport') return list.find((u) => u.key === 'rit_samenvattingen') ?? list[0];
    return list[0];
  }

  if (strongestDim === 'processen') {
    if (sector === 'groothandel') return list.find((u) => u.key === 'offerte_voorbereiding') ?? list[0];
    if (sector === 'maakindustrie') return list.find((u) => u.key === 'werkvoorbereidingsassistent') ?? list[0];
    if (sector === 'transport') return list.find((u) => u.key === 'planningsondersteuning') ?? list[0];
  }

  return list[0];
};
