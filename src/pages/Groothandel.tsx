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
    'Wij helpen Nederlandse technische groothandels hun inkoop, pricing en pipeline AI-gedreven maken — voordat Amazon Business, D2C-merken en Chinese B2B-platforms nog meer marge pakken.',
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
        'ERP (SAP/AFAS/Ridder/Exact), PIM, webshop, CRM en losse Excels. Niemand heeft één waarheid. Rapportages kosten dagen. KPI-zicht is reactief. Elke AI-use-case begint bij data-plumbing — wij snappen dat.',
    },
    {
      title: 'Klantverwachting stijgt — B2B wordt B2C',
      description:
        'B2B-kopers verkiezen steeds vaker digitale kanalen. Ze willen real-time voorraadzicht, directe quotes, persoonlijke aanbevelingen, 24/7 support. Als jouw catalogus niet zelf uitlegt wat een klant nodig heeft, koopt die klant ergens anders.',
    },
  ],

  productsHeadline:
    'Hoe onze vier producten eruit zien voor een technische groothandel.',
  productsIntro:
    'Geen generiek AI-aanbod. Elk van onze producten vertaalt zich direct naar concrete toepassingen in de wereld van de technische groothandel — van pipeline en marge tot binnendienst en klantcontact.',
  productApplications: [
    {
      productKey: 'sales',
      intro:
        'Wij bouwen een AI-gedreven sales-systeem dat het hele traject dekt — van ondergeleverde accounts in je bestaande klantenbestand tot koude prospects die je nog niet in het vizier hebt.',
      applications: [
        {
          title: 'White-space detection',
          description:
            'AI scant je klantenbestand en identificeert ondergeleverde productgroepen per klant. Accountmanagers krijgen een concrete upsell-lijst in plaats van gokken.',
        },
        {
          title: 'Pipeline & lead-scoring',
          description:
            'Leads worden automatisch gescoord op koopintentie op basis van bestelgedrag, webshop-activiteit en externe signalen. Buitendienst richt zich op de top 20%.',
        },
        {
          title: 'Outbound AI-agent',
          description:
            'AI stuurt gepersonaliseerde follow-ups via e-mail, LinkedIn en WhatsApp op basis van sectorsegment, productcategorie en historische relatie. Schaalt zonder extra FTE.',
        },
        {
          title: 'Concurrent-pricing monitoring',
          description:
            'Scrapers die Amazon Business, concurrent-webshops en Chinese platforms monitoren op jouw SKU\'s. Je prijszetting wordt proactief in plaats van reactief.',
        },
      ],
    },
    {
      productKey: 'dashboard',
      intro:
        'Eén live dashboard dat ERP, webshop, PIM, CRM en Excel samenbrengt. Voor het eerst echt zicht op waar marge ontstaat — en waar zij lekt.',
      applications: [
        {
          title: 'Live marge-dashboard',
          description:
            'Inkoopprijs, verkoopprijs, staffel-korting, DSO en voorraadrotatie per klant-SKU in real-time. Pricing-beslissingen gaan van gut feel naar data-gedreven.',
        },
        {
          title: 'Inkoopanalytics & leveranciersscoring',
          description:
            'Welke leveranciers leveren OTIF? Waar kan volume geconsolideerd worden? Waar zit prijsruimte? AI-analytics maakt elke onderhandeling scherper.',
        },
        {
          title: 'DSO & werkkapitaal-monitor',
          description:
            'Voorspelt per klant de waarschijnlijke betaaldatum. Incassomoment wordt geoptimaliseerd. Direct zichtbare cash op de bank zonder relatiebeschadiging.',
        },
        {
          title: 'Voorraad-AI & reorder-optimalisatie',
          description:
            'Demand-forecasting op SKU-niveau. Magazijn stopt met reorder-points op gut feel. Emergency orders en dead stock worden structureel minder.',
        },
      ],
    },
    {
      productKey: 'assistant',
      intro:
        'AI-assistenten die exact daar zitten waar ze moeten zijn: in de inbox van de binnendienst, op de webshop van de klant, of als 24/7 chatbot voor technische vragen.',
      applications: [
        {
          title: 'Binnendienst-AI in Outlook/Teams',
          description:
            'Bij iedere klantvraag levert de AI direct het juiste product, de specs en vergelijkbare alternatieven. Onboarding van nieuwe medewerkers gaat van maanden naar weken.',
        },
        {
          title: 'Quote & RFQ automatisering',
          description:
            'AI leest klant-RFQ (e-mail, PDF, webshop), matcht met catalogus, berekent prijs volgens staffels en stelt offerte op. Van 3-5 dagen naar enkele uren turnaround.',
        },
        {
          title: 'OCR voor inkooporders & facturen',
          description:
            'Inkomende orders en facturen worden automatisch uitgelezen en in het ERP geboekt. De orderinvoer-FTE-belasting wordt drastisch lager, met nagenoeg foutloze verwerking.',
        },
        {
          title: 'Klant-facing chatbot',
          description:
            '24/7 technische vragen op webshop en WhatsApp — productcompatibiliteit, specs, alternatieven. Binnendienst wordt ontlast van routine, klant krijgt directe antwoorden.',
        },
      ],
    },
  ],

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
        'AI Operations Partner voor Nederlandse technische groothandels. Van AI-pricing en inkoopvoorspelling tot pipeline-scoring en quote-automatisering.'
      );
    }
  }, []);

  return <VerticalPage config={groothandelConfig} />;
};

export default Groothandel;
