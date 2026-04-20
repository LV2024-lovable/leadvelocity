import React from 'react';
import BlogPost, { BlogPostConfig } from '../../components/BlogPost';
import { getRelated } from '../../data/blogPosts';

const config: BlogPostConfig = {
  slug: 'vrachtwagenheffing-2026-ai-compensatie',
  title: 'Vrachtwagenheffing 1 juli 2026: hoe AI jouw marge kan redden',
  subtitle:
    'De heffing komt sowieso — gemiddeld €0,19 per km. Voor een NL-transporteur betekent dat serieuze marge-impact. Zo bouw je de compensatie met AI.',
  category: 'Transport',
  publishedAt: '20 april 2026',
  readingMinutes: 7,
  metaDescription:
    'Vrachtwagenheffing vanaf juli 2026 kost gemiddeld €0,19 per km. Ontdek welke AI-toepassingen die extra kosten structureel kunnen compenseren voor NL-transportbedrijven.',

  intro: (
    <>
      De vrachtwagenheffing gaat op 1 juli 2026 in. Gemiddeld €0,19 per gereden kilometer. Voor een NL-transportbedrijf met 120 voertuigen die elk 100.000 km/jaar rijden, is dat 12M km × €0,19 = <strong>€2,3 miljoen extra kosten per jaar</strong>. De sector-winstmarge stond op 7,1% in 2024. Zonder compensatie rekende SRA uit dat die richting 1,5% daalt. Dat is geen vraag van "of" maar "hoe". Dit artikel laat zien welke AI-toepassingen die compensatie concreet opleveren.
    </>
  ),

  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'De realiteit van het cijfer',
    },
    {
      type: 'paragraph',
      content:
        'De heffing is niet voor iedereen gelijk. Euro-6 vrachtwagens betalen gemiddeld €0,16 per km. 100% elektrische voertuigen komen uit op slechts €0,035 per km — een factor 4-5 lager. Maar de meeste NL-transporteurs hebben (nog) voornamelijk Euro-5 of Euro-6 diesel rijden. Elektrificatie is geen korte-termijn-antwoord: ZE-vrachtwagens zijn 2-3x duurder in aanschaf en infrastructuur voor laden is nog niet overal rond. AI-optimalisatie kan wél binnen 6-12 maanden structureel effect hebben.',
    },
    {
      type: 'stat-row',
      stats: [
        { value: '€0,19/km', label: 'gemiddelde heffing per 1 juli 2026' },
        { value: '7,1% → 1,5%', label: 'sector-marge bij gelijkblijvende operatie (SRA)' },
        { value: '€2,3M', label: 'extra jaarlijkse kosten voor typische 120-wagen-vloot' },
      ],
    },
    {
      type: 'paragraph',
      content:
        'De vraag is dus niet of je iets moet doen, maar hoe snel en hoe effectief. Laten we kijken naar de drie AI-toepassingen die concreet meetbaar compenseren.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Compensatie 1: Route-optimalisatie (5-10% transportkosten)',
    },
    {
      type: 'paragraph',
      content:
        'Bestaande TMS-systemen (Transpas, PTV, Carlo, Plan&Go) hebben basic route-optimalisatie, maar draaien vaak op statische regels en planner-ervaring. AI-route-optimalisatie trekt real-time verkeers-data, historische ETAs, klant-specifieke laad-losvensters en chauffeurs-rij/rust-tijden samen. Gevolg: minder lege km, betere ritcombinaties, dichtere beladingsgraad.',
    },
    {
      type: 'paragraph',
      content:
        'Voor een 120-wagen-transporteur met €25M omzet en €1,40/km kostenbasis is 6% besparing op transportkosten ongeveer €1 miljoen per jaar. Dat compenseert bijna de helft van de vrachtwagenheffing — alleen met betere routes.',
    },
    {
      type: 'callout',
      title: 'Waarom dit werkt zonder TMS te vervangen',
      content:
        'AI-route-optimalisatie werkt als laag bovenop je bestaande TMS. Wij lezen uit Transpas of Carlo, optimaliseren, en pushen de suggestie terug naar de planner. Die kan altijd overrulen. Geen rip-and-replace, geen trainingsprogramma voor je planners. Resultaat typisch binnen 3-5 maanden.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Compensatie 2: Fuel-coaching per chauffeur (2-4% brandstofbesparing)',
    },
    {
      type: 'paragraph',
      content:
        'Brandstof is circa 20-25% van de kostenbasis van een transporteur. Tussen chauffeurs op dezelfde rit is typisch 10-15% verschil in L/100km. Dat verschil komt van remgedrag, rijsnelheid, leeglooptijden, koppeling-gebruik. FMS-data (van Webfleet, Trimble, FleetGO of Volvo Dynafleet) meet dit al — maar de meeste transporteurs gebruiken die data niet voor gerichte coaching.',
    },
    {
      type: 'paragraph',
      content:
        'AI-fuel-coaching analyseert de FMS-data per chauffeur, vergelijkt met peers op identieke ritten en geeft gepersonaliseerde aanbevelingen. Sommige systemen werken met gamification (wekelijkse rankings) of wekelijkse coachings-sessies. Resultaat: 2-4% brandstofbesparing structureel. Voor een 120-wagen-vloot met €5M brandstofkosten = €100-200k per jaar.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Compensatie 3: Beladingsgraad + charter-optimalisatie (3-8 pp beladingsgraad)',
    },
    {
      type: 'paragraph',
      content:
        'NL vrachtwagens rijden gemiddeld ~30% leeg. Beladingsgraad wordt niet consistent gemeten (CBS is er zelfs mee gestopt om methodologische redenen), maar elk procentpunt verbetering telt direct door op marge. AI-load-optimalisatie bekijkt de palletplaats/laadmeter-puzzel per rit en stelt voor: welke orders kun je combineren zonder de levertijd te schaden?',
    },
    {
      type: 'paragraph',
      content:
        'Daarnaast: charter-matching. Als je eigen vloot vol zit, schakel je charters in. AI kan voorspellen wanneer en aan welk tarief, zodat je niet ad-hoc dure spot-charters inhuurt. Typische impact: 3-8 procentpunten hogere beladingsgraad plus 10-15% lagere charter-kosten.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Samengevat: wat betekent dit voor een €25M-transporteur?',
    },
    {
      type: 'table',
      headers: ['Compensatie', 'Impact-bereik', 'Cash-waarde per jaar'],
      rows: [
        ['AI-route-optimalisatie', '5-10% transportkosten', '€500k - €1M'],
        ['Fuel-coaching per chauffeur', '2-4% brandstof', '€100k - €200k'],
        ['Beladingsgraad + charter-AI', '3-8 pp + 10-15% charter', '€200k - €400k'],
        ['Totaal potentieel', '—', '€800k - €1,6M'],
      ],
    },
    {
      type: 'paragraph',
      content:
        'Voor de €2,3M extra heffingskosten op die vloot: de combinatie kan 35-70% compenseren. Geen 100%, maar genoeg om de marge-impact significant te dempen. En deze besparingen lopen door, ook nadat de heffing is ingeburgerd — je houdt ze als structureel voordeel over.',
    },

    {
      type: 'callout',
      title: 'Een eerlijke waarschuwing',
      content:
        'Niet elke transporteur haalt het bovenste van de range. Factoren: kwaliteit van FMS-data, hoeveel charter-gebruik je hebt, hoe efficient je routes al zijn. Een eerlijke data-audit vóór project-start voorkomt overdreven verwachtingen. Bij ons is die audit onderdeel van fase 1 (€2.500, 2 weken), zodat je weet wat realistisch is voordat je investeert.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Hoe je dit in gang zet',
    },
    {
      type: 'paragraph',
      content:
        'De praktische volgorde, gezien vanaf begin 2026:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        <><strong>Nu (Q2 2026):</strong> Data-audit. Welke data uit TMS/FMS is beschikbaar, van welke kwaliteit? Dit bepaalt welke van de 3 use-cases het eerst kan rendement geven.</>,
        <><strong>Q3 2026:</strong> Pilot met één use-case — meestal fuel-coaching (snelste, data-makkelijkst). Binnen 8-12 weken eerste coaching-rounds operationeel.</>,
        <><strong>Q4 2026 / Q1 2027:</strong> Route-optimalisatie uitgerold naast pilot. Beladingsgraad/charter-AI als derde laag.</>,
        <><strong>Q2 2027:</strong> Compensatie in volle werking tegen de tijd dat heffing zijn volle impact heeft.</>,
      ],
    },
    {
      type: 'paragraph',
      content:
        'Belangrijk: begin nu, niet op 1 juli. De implementatie-cyclus is 6-9 maanden voor volle resultaat. Wie wacht tot de heffing bijt, is te laat om compensatie op te bouwen voordat de marge eraan gaat.',
    },
  ],

  keyTakeaways: [
    'Vrachtwagenheffing per 1 juli 2026 kost gemiddeld €0,19/km — voor 120-wagen-vloot is dat €2,3M extra per jaar.',
    'AI-route-optimalisatie levert 5-10% transportkosten-besparing (€500k - €1M op typische €25M-transporteur).',
    'Fuel-coaching via FMS-data levert 2-4% brandstofbesparing (€100-200k).',
    'Beladingsgraad + charter-AI levert structureel hogere marge op bestaande volumes.',
    'Gecombineerd kan 35-70% van de heffing gecompenseerd worden. Niet 100%, maar significant.',
    'Begin nu (Q2 2026), niet wanneer de heffing in juli bijt. Implementatie-cyclus is 6-9 maanden.',
  ],

  relatedPosts: getRelated('vrachtwagenheffing-2026-ai-compensatie'),

  cta: {
    heading: 'Hoeveel van de heffing kun jij compenseren met AI?',
    body: 'Wij maken in een AI Ops Audit (€2.500, 2 weken) concreet zichtbaar welke van deze drie compensaties bij jullie vloot het meeste oplevert. Daarna beslis je of we samen verder bouwen.',
    primaryHref: '/#contact',
    primaryLabel: 'Start een audit',
  },
};

const VrachtwagenheffingAiCompensatie = () => <BlogPost config={config} />;
export default VrachtwagenheffingAiCompensatie;
