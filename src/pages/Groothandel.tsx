import React, { useEffect } from 'react';
import VerticalPage, { VerticalConfig } from '../components/VerticalPage';

const groothandelConfig: VerticalConfig = {
  slug: 'groothandel',
  eyebrow: 'Sector-expertise · Technische Groothandel',
  heroTitle: [
    'Bescherm je marge.',
    'Versnel je sales.',
    'AI voor de groothandel.',
  ],
  heroGradientPart: 'AI voor de groothandel.',
  heroSubtitle:
    'Wij helpen Nederlandse technische groothandels hun inkoop, pricing en pipeline AI-gedreven maken — van snelle automatiseringen die direct tijd winnen tot zwaardere trajecten met structurele marge-impact.',
  heroStats: [
    { value: '+130-200 bps', label: 'hogere brutomarge via AI-pricing' },
    { value: '-20 tot -30%', label: 'voorraad via AI-forecasting' },
    { value: '93%', label: 'snellere quote-verwerking' },
  ],

  painHeadline:
    'De marge van de Nederlandse groothandel wordt van twee kanten ingesloten.',
  painIntro:
    'Amazon Business controleert al een groot deel van de Europese B2B e-commerce. D2C-merken verkopen rechtstreeks aan jullie klanten. Chinese platforms pakken het onderste segment. En jullie binnendienst tikt intussen PDF-bestellingen over in Excel. Deze pijn is nu.',
  painPoints: [
    {
      title: 'D2C, Amazon Business en Chinese platforms',
      description:
        'Fabrikanten gaan rechtstreeks naar jouw klanten. Amazon Business groeit hard in EU. Elk basispunt marge telt. Niche-kennis is niet meer genoeg — je moet sneller, scherper en dataslimmer zijn dan generieke platforms.',
    },
    {
      title: 'Binnendienst-tijd lekt weg op offertes en orders',
      description:
        'RFQs duren 3-5 dagen handmatig. Bestellingen worden uit PDF en e-mail overgetypt. Senior productspecialisten besteden een groot deel van hun tijd aan werk dat AI in minuten doet — en gaan met pensioen zonder opvolger.',
    },
    {
      title: 'Long-tail SKU-chaos',
      description:
        'Je hebt tienduizenden SKU\'s. De meeste draaien bijna niet. Runners gaan regelmatig op nee-verkoop. Forecasting op artikelniveau is te complex voor mensen — maar perfect werk voor AI. Dead stock vreet aan je werkkapitaal.',
    },
    {
      title: 'Excel-pricing en statische staffels',
      description:
        'Prijzen zijn vaak verouderd. Kortingen worden ad-hoc gegeven. Marge lekt bij elke onderhandeling. AI-pricing levert structureel hogere brutomarge op — direct extra marge op dezelfde omzet.',
    },
    {
      title: 'Data versplinterd over 5+ systemen',
      description:
        'ERP (SAP/AFAS/Ridder/Exact), PIM, webshop, CRM en losse Excels. Niemand heeft één waarheid. Rapportages kosten dagen. KPI-zicht is reactief.',
    },
    {
      title: 'Klantverwachting stijgt — B2B wordt B2C',
      description:
        'B2B-kopers verkiezen steeds vaker digitale kanalen. Real-time voorraadzicht, directe quotes, persoonlijke aanbevelingen, 24/7 support. Als jouw catalogus niet zelf uitlegt wat een klant nodig heeft, koopt die klant ergens anders.',
    },
  ],

  quickWinsHeadline:
    'Laagdrempelige automatiseringen — live binnen 2-3 weken.',
  quickWinsIntro:
    'Kleinere automatiseringen die direct tijd winnen voor de binnendienst en commercieel team. Goede manier om AI-adoptie te starten zonder groot project.',
  quickWins: [
    {
      title: 'Offerte-template filler',
      description:
        'RFQ komt binnen via e-mail of PDF. AI maakt basis-offerte met staffel-pricing klaar; binnendienst controleert en verzendt.',
      duration: '2-3 weken',
    },
    {
      title: 'Document-OCR naar ERP',
      description:
        'Inkomende facturen, orders en leveranciersdocumenten worden automatisch uitgelezen en geboekt in AFAS, Exact of Isah.',
      duration: '2-3 weken',
    },
    {
      title: 'Klant-segmentatie',
      description:
        'AI clustert je klantbestand op bestelgedrag, omzet-potentie en retentie-risico. Account-managers krijgen duidelijke focuslijst.',
      duration: '1 week',
    },
    {
      title: 'E-mail response AI',
      description:
        'Voor binnendienst: concept-antwoorden op routine-vragen direct in Outlook. Medewerker klikt verzenden na check.',
      duration: '1-2 weken',
    },
    {
      title: 'Interne kennis-zoeker',
      description:
        'RAG-AI op productcatalogus, specs, leveranciers-documenten. Junior medewerker krijgt instant antwoord op klant-vragen.',
      duration: '2-3 weken',
    },
    {
      title: 'Automated reporting',
      description:
        'Wekelijks dashboard met marge, DSO, voorraadpositie en top-klanten — automatisch gegenereerd uit ERP.',
      duration: '2-3 weken',
    },
  ],

  sectorSolutionsHeadline:
    'Diepere oplossingen, specifiek voor technische groothandel.',
  sectorSolutionsIntro:
    'Wanneer Quick Wins draaien en er meer ambitie is, bouwen we diepere oplossingen met structurele commerciële impact.',
  sectorSolutions: [
    {
      title: 'Inside Sales Copilot',
      tagline: 'Binnendienst versterkt',
      description:
        'AI-assistent in Outlook/Teams met volledige productkennis, specs en alternatieven uit jullie catalogus. Senior-kennis doorzoekbaar voor elke binnendienster.',
      bullets: [
        'RAG op productcatalogus + historische klantvragen',
        'Matcht productspecs met klant-eisen',
        'Stelt alternatieven voor bij nee-verkoop',
        'Onboarding junior van 6 maanden naar 6 weken',
      ],
    },
    {
      title: 'Quote Automator',
      tagline: 'RFQ-to-offerte geautomatiseerd',
      description:
        'Klant-RFQ (e-mail, PDF, webshop) wordt automatisch geïnterpreteerd, gematcht met catalogus, voorzien van klant-specifieke pricing en als concept-offerte klaargezet.',
      bullets: [
        'Turnaround van 3-5 dagen naar 4-8 uur',
        'Staffel-berekening klant-specifiek',
        'Binnendienst controleert en verzendt',
        'First-responders winnen ~50% vaker',
      ],
    },
    {
      title: 'White-Space Detector',
      tagline: 'Commerciële kansen in eigen portfolio',
      description:
        'AI analyseert CRM en orderhistorie om ondergeleverde klanten te identificeren per productcategorie. Accountmanagers krijgen concrete upsell-lijst in plaats van op gevoel te werken.',
      bullets: [
        'Cross-sell-signalen per klant-productgroep',
        'Churn-risico-scoring',
        'Maandelijkse opportunity-lijst',
        'Typische revenue-uplift 3-15%',
      ],
    },
    {
      title: 'Supplier Catalog Enricher',
      tagline: 'PIM op steroïden',
      description:
        'AI-verrijking van leveranciers-feeds met specs, afbeeldingen, categorisatie en SEO-data. Webshop-conversie stijgt, time-to-market van nieuwe producten daalt 50-70%.',
      bullets: [
        'Automatische catalogus-verrijking',
        'SEO-optimalisatie per product',
        'Standaardisatie across leveranciers',
        'Snellere productlancering',
      ],
    },
  ],

  tier3Hint:
    'Voor groothandels die hun hele pricing- of voorraadstrategie AI-gedreven willen maken, hebben we zwaardere anchor-projecten. Die bespreken we in een persoonlijk gesprek — data-staat en commitment bepalen of het past.',

  scenario: {
    headline: 'Wat AI oplevert bij een €30M technische groothandel.',
    company:
      'Middelgrote technische groothandel in industriële onderdelen. €30M omzet, 25.000 SKU\'s, brutomarge 27%, netto marge 5,5%. Typisch Nederlands profiel.',
    before:
      'Pricing in Excel, sinds jaren niet herzien. Inkoop op gut feel, veel dead stock. Binnendienst tikt RFQ\'s handmatig in (45 min per stuk). Offerte-conversie rond 24%.',
    after:
      'AI-pricing live op core-SKU\'s. Forecasting halveert nee-verkoop op runners. Quote-AI verwerkt 80% van RFQ\'s binnen 2 min. Pipeline-scoring wijst ondergeleverde accounts aan.',
    impact:
      'Structureel hogere brutomarge, binnendienst wint uren per dag terug, offerte-conversie stijgt substantieel.',
    disclaimer:
      'Illustratief scenario op basis van sector-benchmarks voor vergelijkbare segmenten. Werkelijke resultaten verschillen per bedrijf.',
  },

  facts: [
    { value: 'Slechts 7%', label: 'van NL handels- en logistiekbedrijven heeft concreet AI-beleid' },
    { value: '-7,7%', label: 'omzetdaling groothandel in industriemachines in recent jaar' },
    { value: '19%', label: 'van EU e-commerce loopt al via Amazon Business' },
    { value: '36% aftrek', label: 'op AI-R&D via WBSO 2026 — tot de drempel' },
  ],

  closingHeadline:
    'Wij kijken deze week gratis mee naar jullie grootste AI-kansen.',
  closingSub:
    'Plan een vrijblijvend gesprek. We kijken samen naar jullie operatie en benoemen concreet waar AI het meeste oplevert — zonder verkooppraatje.',
};

const Groothandel = () => {
  useEffect(() => {
    document.title =
      'AI voor Nederlandse Technische Groothandel | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AI Operations Partner voor Nederlandse technische groothandels. Van laagdrempelige automatiseringen tot AI-pricing, inkoopvoorspelling en pipeline-scoring.'
      );
    }
  }, []);

  return <VerticalPage config={groothandelConfig} />;
};

export default Groothandel;
