import React from 'react';
import BlogPost, { BlogPostConfig } from '../../components/BlogPost';
import { getRelated } from '../../data/blogPosts';

const config: BlogPostConfig = {
  slug: 'csrd-scope-3-automatisering-transport',
  title: 'CSRD scope-3 automatiseren voor NL-transporteurs',
  subtitle:
    'Grote verladers eisen scope-3 data per zending. Excel-rapportages schalen niet. Zo automatiseer je CSRD-compliance met bestaande tachograaf- en FMS-data.',
  category: 'Transport',
  publishedAt: '20 april 2026',
  readingMinutes: 6,
  metaDescription:
    'Praktische gids voor CSRD scope-3 automation in NL-transport. Hoe je bestaande tachograaf- en FMS-data omzet in klant-rapportages zonder handmatig Excel-werk.',

  intro: (
    <>
      De CSRD-wetgeving is aangepast via het Omnibus-pakket en rapportage-verplichtingen zijn voor veel bedrijven uitgesteld tot rapportagejaar 2027. Maar de ketendruk is nu al reëel. Grote verladers (retail, industrie, chemie) vragen al maanden om scope-3 emissie-data per zending bij hun transporteurs. Excel-rapportages werken niet: ze schalen niet, zijn foutgevoelig en kosten onevenredig veel binnendienst-uren. Dit artikel laat zien hoe je het automatiseert met data die je al hebt.
    </>
  ),

  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'De context: wie vraagt wat, wanneer',
    },
    {
      type: 'paragraph',
      content:
        'De definitieve CSRD-reikwijdte blijft schuiven (Omnibus-pakket, januari 2026). Grote bedrijven met >1000 medewerkers rapporteren voor het eerst over boekjaar 2027. Zij vragen hun toeleveranciers — inclusief transporteurs — om scope-3 (keten) data. Voor jullie klanten als Albert Heijn, Jumbo, Unilever of Shell betekent dit: zij willen per zending of per maand weten wat de CO2-uitstoot was van jullie vrachtwagen die hun goederen vervoerde.',
    },
    {
      type: 'stat-row',
      stats: [
        { value: '2027', label: 'eerste rapportagejaar voor grote bedrijven' },
        { value: '30-40 uur', label: 'typische handmatige maandwerk voor grote transporteur' },
        { value: '~95%', label: 'data al beschikbaar in tachograaf + FMS' },
      ],
    },
    {
      type: 'paragraph',
      content:
        'De meeste NL-transporteurs doen dit nu handmatig: binnendienst verzamelt per maand de rit-data, berekent CO2 op basis van brandstofverbruik en wagen-type, zet het in een Excel-template die de verlader heeft aangeleverd. Drie problemen: (1) 30-40 uur per maand handmatig werk, (2) foutgevoelig, (3) niet schaalbaar naar meerdere verladers die elk hun eigen template willen.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'De data die je al hebt',
    },
    {
      type: 'paragraph',
      content:
        'Het goede nieuws: bijna alle data die een CSRD-rapport nodig heeft, zit al in jullie systemen. Je hoeft geen nieuwe sensoren te installeren of operationele processen te veranderen. Specifiek:',
    },
    {
      type: 'list',
      items: [
        <><strong>Tachograaf-data:</strong> rit-start/eind, afgelegde km, chauffeur-ID, voertuig-ID. Je moet deze elke 28 dagen uitlezen voor compliance — dus het is er standaard.</>,
        <><strong>FMS-data (van Webfleet, Trimble, FleetGO, Volvo Dynafleet):</strong> brandstofverbruik per rit, rijgedrag, locatie-data. Wordt real-time opgeslagen.</>,
        <><strong>TMS-data (Transpas, Carlo, Plan&Go):</strong> welke order bij welke rit, welke klant was de opdrachtgever, wat was de leverlocatie.</>,
        <><strong>Voertuig-master-data:</strong> Euro-klasse, motorspecificaties, standaard CO2-uitstoot-factor per km voor elk voertuig.</>,
      ],
    },
    {
      type: 'paragraph',
      content:
        'Combineer deze vier en je hebt automatisch per zending: afgelegde km × brandstofverbruik × CO2-factor × deel van de totaal-lading dat voor die klant was. Dat is scope-3 emissies per zending — precies wat de verlader vraagt.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Wat automatisering technisch doet',
    },
    {
      type: 'paragraph',
      content:
        'Een AI-gedreven scope-3 rapportage-systeem heeft drie componenten:',
    },

    {
      type: 'heading',
      level: 3,
      content: '1. Data-integratie-laag',
    },
    {
      type: 'paragraph',
      content:
        'Koppelingen met je TMS (Transpas/Carlo/PTV/Simacan), FMS (Webfleet/Trimble/FleetGO) en tachograaf-uitlees-systeem. Data wordt dagelijks automatisch binnengehaald en gecorreleerd per rit. Geen handmatige CSV-exports meer.',
    },

    {
      type: 'heading',
      level: 3,
      content: '2. Berekening-engine',
    },
    {
      type: 'paragraph',
      content:
        'Een rekenmodule die per rit de CO2-uitstoot berekent op basis van NL-standaarden (CE Delft factoren voor wegvervoer zijn de geaccepteerde referentie in NL). Houdt rekening met voertuigtype, Euro-klasse, beladingsgraad en leeg-km-aandeel. Output: CO2 per zending, per klant, per periode.',
    },

    {
      type: 'heading',
      level: 3,
      content: '3. Rapportage-laag',
    },
    {
      type: 'paragraph',
      content:
        'Klant-specifieke templates (elke verlader wil zijn eigen formaat). Het systeem genereert automatisch maand-rapportages in het formaat van Albert Heijn, Jumbo, Unilever, etc. Verstuurt automatisch of biedt een klant-portaal. Binnendienst hoeft niets meer handmatig te doen.',
    },

    {
      type: 'callout',
      title: 'Waarom dit als laag bovenop je bestaande stack werkt',
      content:
        'Je hoeft TMS of FMS niet te vervangen. Wij lezen read-only uit de APIs die deze systemen al aanbieden. CSRD-automatisering staat als laag ernaast, in onze infrastructuur. Binnendienst krijgt een dashboard-view waar ze de maandelijkse rapportages kunnen reviewen voordat ze uitgaan. Implementatie 6-10 weken voor standaard-stacks.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Waarde buiten compliance',
    },
    {
      type: 'paragraph',
      content:
        'Het gaat niet alleen om verplicht rapporteren. Zodra je deze data gestructureerd hebt, kunnen je commercials het inzetten:',
    },
    {
      type: 'list',
      items: [
        <><strong>Contract-behoud bij grote verladers</strong> die anders overstappen op transporteurs die wél scope-3 kunnen leveren. Dat is de "vergunning om te blijven" voor de komende jaren.</>,
        <><strong>Premium-pricing voor "groen" transport</strong>: transparant CO2-profiel laat je ZE-ritten of Euro-6-ritten verkopen aan een meerprijs van 3-8% voor duurzaamheidsbewuste klanten.</>,
        <><strong>Intern inzicht in je eigen vloot</strong>: welke voertuigen zijn relatief inefficiënt? Waar zit je energie-budget? Dat helpt investerings-beslissingen rondom vlootvernieuwing.</>,
        <><strong>Scope-1 rapportages voor je eigen duurzaamheidsverslag</strong> (want per 2028 komt de eigen rapportage-plicht voor bedrijven met meer dan 500 FTE).</>,
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'De business case',
    },
    {
      type: 'paragraph',
      content:
        'Voor een 120-wagen-transporteur met 10-15 grote klanten die CSRD-data vragen:',
    },
    {
      type: 'table',
      headers: ['Post', 'Voor automatisering', 'Na automatisering'],
      rows: [
        ['Handmatige binnendienst-uren per maand', '30-40 uur', '2-4 uur review'],
        ['Foutpercentage in rapportages', '5-10%', '<1%'],
        ['Tijd om nieuw klant-template aan te maken', '2-3 dagen', '30 min configuratie'],
        ['Risico contract-verlies door niet-compliant', 'Reëel', 'Geen'],
      ],
    },
    {
      type: 'paragraph',
      content:
        'Het échte voordeel is de laatste regel: contract-behoud. Eén verloren verlader door gebrek aan CSRD-compliance kan €300k-€1M per jaar aan omzet kosten. Het automatiserings-systeem verdient zichzelf 3-5x terug in één jaar — alleen al door FTE-tijd-besparing, laat staan door contract-behoud.',
    },
  ],

  keyTakeaways: [
    '95% van de CSRD-scope-3 data zit al in jullie tachograaf, FMS en TMS. Je hoeft niets nieuws te meten.',
    'Handmatige rapportage kost 30-40 uur per maand. Automatisering brengt dat naar 2-4 uur review.',
    'AI-laag werkt bovenop bestaande TMS en FMS zonder ze te vervangen.',
    'Implementatie typisch 6-10 weken voor standaard-stacks (Transpas/Webfleet/FleetGO).',
    'Waarde > compliance: contract-behoud bij grote verladers + premium-pricing voor "groen" transport.',
    'Begin nu, niet als de grote klant met een deadline komt. Dat is te laat.',
  ],

  relatedPosts: getRelated('csrd-scope-3-automatisering-transport'),

  ctas: {
    heading: 'Hoeveel CSRD-werk kost jullie binnendienst nu?',
    body: 'Drie paden om CSRD-rapportage te automatiseren.',
    hot: {
      href: '/#contact',
      label: 'Start een CSRD-pilot',
    },
    warm: {
      href: '/#contact',
      label: 'Plan een kennismaking',
    },
    cold: {
      href: '/whitepapers/ai-voor-nederlandse-transport-2026',
      label: 'Download de whitepaper',
    },
  },
};

const CsrdScope3AutomatiseringTransport = () => <BlogPost config={config} />;
export default CsrdScope3AutomatiseringTransport;
