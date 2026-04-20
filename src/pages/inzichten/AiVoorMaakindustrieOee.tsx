import React from 'react';
import BlogPost, { BlogPostConfig } from '../../components/BlogPost';
import { getRelated } from '../../data/blogPosts';

const config: BlogPostConfig = {
  slug: 'ai-voor-nederlandse-maakindustrie-oee',
  title: 'AI voor Nederlandse Maakindustrie: van OEE 60% naar 78%',
  subtitle:
    'Waarom 83% van NL-maakbedrijven niet weet waar met AI te beginnen — en de vier use-cases die wél rendement leveren.',
  category: 'Maakindustrie',
  publishedAt: '20 april 2026',
  readingMinutes: 9,
  metaDescription:
    'Concrete AI-toepassingen voor NL-maakindustrie: predictive maintenance, OEE-analyse, kwaliteits-vision, shop-floor copilot. Wat werkt en wat werkt (nog) niet.',

  intro: (
    <>
      De Nederlandse maakindustrie ligt voor op het EU-gemiddelde in AI-adoptie (29% vs 17%, CBS 2025). Maar voor MKB-maakbedrijven tussen 50-250 FTE zit daaronder een pijnlijk cijfer: 83% weet niet waar met AI te beginnen, en 80% heeft hun data- en sensor-infrastructuur onvoldoende op orde (Maakindustrie.nl, 2025). Dat is het gat waar wij aan werken — en waar de vier use-cases hieronder bewezen rendement opleveren.
    </>
  ),

  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'Waarom "AI in maakindustrie" zo vaak mislukt',
    },
    {
      type: 'paragraph',
      content:
        '50% van GenAI-projecten wordt na de proof-of-concept gestaakt, volgens Gartner (2024). Bij maakbedrijven specifiek zit dat op twee redenen: projecten worden te groot opgezet ("industrie 4.0-transformatie") en men verwacht dat AI zelf data verzamelt die de organisatie nooit gestructureerd had. Beide zijn te voorkomen.',
    },
    {
      type: 'paragraph',
      content:
        'De oplossing is pragmatisch: start bij use-cases waar data al bestaat (machine-telemetrie, ERP-historie, PDM-tekeningen) en kies één KPI die je al meet. OEE — Overall Equipment Effectiveness — is die KPI voor de meeste maakbedrijven. World-class OEE zit op 85%+. Gemiddeld NL-MKB op ~60%. Die 25 punten daartussen is waar AI rendement kan halen.',
    },
    {
      type: 'stat-row',
      stats: [
        { value: '83%', label: 'NL MKB-maakbedrijven weet niet waar met AI te beginnen' },
        { value: '60% → 78%', label: 'OEE-sprong haalbaar in jaar 1 met gerichte AI-stack' },
        { value: '29% vs 17%', label: 'NL industrie-AI-adoptie vs EU-gemiddelde' },
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'Use-case 1: Predictive maintenance op kritieke assets',
    },
    {
      type: 'paragraph',
      content:
        'Eén onverwachte storing op een kritieke lijn kost vaak duizenden euro\'s per uur. Reactief onderhoud is de norm bij de meeste MKB-maakbedrijven. Predictive maintenance — AI voorspelt uitval op basis van sensordata, thermische waarden, trillingspatronen — keert dat om. McKinsey documenteert bij top-performers:',
    },
    {
      type: 'list',
      items: [
        '20-40% lagere onderhoudskosten',
        'Tot 50% minder ongeplande downtime',
        '20% langere asset-levensduur',
      ],
    },
    {
      type: 'paragraph',
      content:
        'BMW rapporteerde 85% minder defect escapes in hun smart-factory-implementatie. Voor een NL-MKB op 150 FTE met 8 kritieke assets levert zelfs een conservatieve 30% downtime-reductie €500-900k jaarlijks. De technische implementatie vraagt sensoren op de 5-10 meest kritische machines (niet alles tegelijk!), integratie van tachograaf-achtige data, en een ML-model dat 2-4 weken vooraf uitval signaleert.',
    },

    {
      type: 'callout',
      title: 'Waarom niet alles tegelijk',
      content:
        'Bedrijven die "predictive maintenance" voor hun hele machine-park tegelijk willen uitrollen, faillisseren het project binnen 6 maanden. Start met de 5-10 meest kritische assets (de machines waarvan uitval pijn doet) — daar ligt 80% van de potentiële ROI. De rest volgt nadat je methode bewezen is.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Use-case 2: Computer vision voor kwaliteitscontrole',
    },
    {
      type: 'paragraph',
      content:
        'Eindkwaliteit wordt in de meeste NL-MKB maakbedrijven handmatig gecontroleerd — operators met ervaring die visueel scannen op defects, maatafwijking of assemblage-fouten. Dat werkt, maar mist altijd een percentage (5-15% typisch) en schaalt niet. Computer vision AI, getraind op jullie specifieke product-families, werkt 24/7 en haalt detection-rates boven 99,5%.',
    },
    {
      type: 'paragraph',
      content:
        'De Nederlandse case: De Haagse Hogeschool werkt via het DigitalZH-programma met bedrijven zoals Van Wees (Waalwijk) aan automatische kwaliteitscontrole op acryl en transparante materialen — een lastige klasse. Met Fizyr-AI wordt first-pass yield structureel hoger en scrap-rate lager. Typische impact: 20-40% scrap-reductie, minder klachten, minder terugroepacties.',
    },
    {
      type: 'paragraph',
      content:
        'Belangrijk: dit vraagt een camera-installatie op je productielijn en een model dat getraind wordt op jullie specifieke defect-patronen. Training vraagt historische afwijzingsdata (als je die gedocumenteerd hebt) plus 2-4 weken ter opbouw. Time-to-value is 3-6 maanden per productlijn.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Use-case 3: Shop-floor copilot (kennisbehoud)',
    },
    {
      type: 'paragraph',
      content:
        '68% van NL technische bedrijven meldt personeelstekort. Bij maakindustrie specifiek speelt vergrijzing hard: senior operators, werkvoorbereiders en kwaliteit-experts gaan met pensioen zonder opvolger. Met hen vertrekt ervaring die in geen handboek staat.',
    },
    {
      type: 'paragraph',
      content:
        'Een shop-floor copilot is een AI-assistent, beschikbaar op tablet of shop-floor-terminal, die operators direct antwoord geeft op: machine-instellingen, storingen, werkinstructies, materiaal-compatibiliteit. Getraind op jullie eigen werkinstructies, handboeken, eerdere storingsmeldingen. Het model leert de taal van jouw fabriek.',
    },
    {
      type: 'paragraph',
      content:
        'TNO publiceerde in 2025 onderzoek dat AI opleidingsverschillen tussen senior en junior operators verkleint. Concreet: een junior die normaal 6 maanden nodig heeft om zelfstandig een complexe machine te draaien, is met copilot na 6-10 weken productief. En senior-ervaring blijft vastgehouden in een doorzoekbaar systeem in plaats van met pensioen te verdwijnen.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Use-case 4: Nacalculatie-loop (marge-leren)',
    },
    {
      type: 'paragraph',
      content:
        'Dit is de meest onderschatte use-case. Elk maakbedrijf doet voorcalculatie bij offertes en nacalculatie na levering — maar de gap tussen beide wordt vaak pas bij de kwartaalrapportage zichtbaar. Tegen die tijd zijn 100+ offertes verder gegaan met dezelfde systematische fouten.',
    },
    {
      type: 'paragraph',
      content:
        'AI trekt shop-floor-timing (terminal-meldingen, IoT-data, tijdregistratie) real-time door naar financiële resultaten per order. De gap tussen voor- en nacalculatie is zichtbaar per order, op de dag dat het gebeurt. Werkvoorbereiders en commercieel leren elke week wat werkelijk marge-neutraal of marge-positief is. De voorcalculatie wordt elke maand scherper.',
    },
    {
      type: 'paragraph',
      content:
        'Typisch impact: 3-8% marge-verbetering over 12 maanden, puur door iteratief leren op werkelijke data. Voor een €35M-machinebouwer met 30% brutomarge is dat €300-800k extra marge — zonder extra omzet, zonder extra personeel.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Waarom deze vier, in deze volgorde',
    },
    {
      type: 'paragraph',
      content:
        'We krijgen regelmatig de vraag: welke van de vier eerst? Het antwoord hangt af van jouw specifieke pijn, maar dit is een defaulte volgorde voor de meeste MKB-maakbedrijven:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        <><strong>Shop-floor copilot eerst</strong> — laag risico, geen sensors nodig, directe waarde voor team. Bouwt vertrouwen.</>,
        <><strong>Nacalculatie-loop tweede</strong> — gebruikt data die je al hebt (ERP, tijdregistratie). Financieel zichtbaar resultaat.</>,
        <><strong>Predictive maintenance derde</strong> — grootste €-impact, maar vraagt sensor-investering en 4-6 maanden doorlooptijd.</>,
        <><strong>Computer vision kwaliteit vierde</strong> — per product-lijn implementeren, vraagt meeste voorbereidingstijd (data-training).</>,
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'Wat je eerst NIET moet doen',
    },
    {
      type: 'paragraph',
      content:
        'De drie meest gemaakte fouten in NL-MKB-maakindustrie AI-projecten:',
    },
    {
      type: 'list',
      items: [
        <><strong>"Alles data-gedreven maken" tegelijk.</strong> MES/ERP/PLC-integratie als eerste project kost 12-18 maanden en levert pas iets op na jaar 1. Start bij use-cases die data gebruiken die je al digitaal hebt.</>,
        <><strong>Volledig autonome AI op productie-vloer.</strong> De AI-modellen zijn er nog niet volwassen genoeg voor. Copilot-benadering (AI geeft advies, mens beslist) is volwassen en werkt; autonoom draaien geeft 50% project-fail.</>,
        <><strong>Industrie 4.0-programma starten.</strong> Marketing-term. Binnen 6 maanden verliest iedereen interesse. Praat in concrete use-cases en KPI\'s — OEE, scrap-rate, doorlooptijd — niet in framework-termen.</>,
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'Financieel model: realistische verwachting jaar 1',
    },
    {
      type: 'paragraph',
      content:
        'Voor een 150-FTE NL-maakbedrijf met €35M omzet en OEE rond 68% op kritieke lijnen, is het volgende plan realistisch over 12 maanden:',
    },
    {
      type: 'table',
      headers: ['Kwartaal', 'Focus', 'Verwachte waarde'],
      rows: [
        ['Q1', 'Shop-floor copilot + nacalculatie-dashboard', 'Onboarding -50%, marge-zicht real-time'],
        ['Q2', 'Nacalculatie-AI uitgebouwd, pilot predictive maintenance op 3 assets', '€100-200k downtime-reductie'],
        ['Q3', 'Predictive maintenance uitgebreid, start CV-kwaliteit op 1 lijn', '€400-600k jaar-run-rate besparing'],
        ['Q4', 'Alle vier productie, OEE-meting integraal', 'OEE → 75-78%, totaal ~€1,2-1,5M jaarlijkse waarde'],
      ],
    },

    {
      type: 'paragraph',
      content:
        'Cumulatief: ~€1,4M jaarlijkse waarde-creatie na 12 maanden, op basis van sector-benchmarks. Investering aan technology en implementatie: typisch €150-250k in jaar 1. ROI-multipel 5-8x in jaar 1, nog beter in jaar 2 als de systemen volledig draaien.',
    },

    {
      type: 'callout',
      title: 'WBSO 2026 — vergeet het niet',
      content: (
        <>
          AI-ontwikkelingsprojecten in maakindustrie zijn vrijwel altijd WBSO-eligible. Met 36% aftrek op R&D-kosten tot €391k drempel, wordt een AI-sprint van €100k effectief €64-70k. Dat scheelt €30-36k die direct naar de bottom line gaat. Wij laten dit standaard meenemen in elke pricing-calculatie.
        </>
      ),
    },
  ],

  keyTakeaways: [
    '83% van NL-MKB-maakbedrijven weet niet waar met AI te beginnen — jij kunt nu voorsprong nemen.',
    'Start bij use-cases waar data al digitaal is (copilot, nacalculatie) voordat je naar sensor-heavy projecten gaat.',
    'Predictive maintenance levert 20-40% lagere onderhoudskosten en tot 50% minder downtime — maar start klein (5-10 kritische assets).',
    'Shop-floor copilot houdt senior-kennis vast en verkort onboarding junior van 6 maanden naar 6-10 weken.',
    'OEE-sprong van 60% → 75-78% haalbaar in 12 maanden met gerichte use-case-stapeling.',
    'Vermijd "industrie 4.0-transformatie" projecten. Concrete KPI\'s, concrete use-cases, concrete tijdlijnen.',
  ],

  relatedPosts: getRelated('ai-voor-nederlandse-maakindustrie-oee'),

  ctas: {
    heading: 'Welke OEE-sprong is bij jullie fabriek haalbaar?',
    body: 'Van verdiepen tot direct bouwen — jij kiest wat nu past.',
    hot: {
      href: '/#contact',
      label: 'Start een Shop-Floor Copilot',
    },
    warm: {
      href: '/#contact',
      label: 'Plan een OEE-kennismaking',
    },
    cold: {
      href: '/whitepapers/ai-voor-nederlandse-maakindustrie-2026',
      label: 'Download de whitepaper',
    },
  },
};

const AiVoorMaakindustrieOee = () => <BlogPost config={config} />;
export default AiVoorMaakindustrieOee;
