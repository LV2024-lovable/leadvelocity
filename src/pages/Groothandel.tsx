import React, { useEffect } from 'react';
import VerticalPage, { VerticalConfig } from '../components/VerticalPage';

const groothandelConfig: VerticalConfig = {
  slug: 'groothandel',
  eyebrow: 'Primaire sector · Technische Groothandel',
  heroTitle: [
    'Bescherm je marge.',
    'Versnel je sales.',
    'AI voor de NL groothandel.',
  ],
  heroGradientPart: 'AI voor de NL groothandel.',
  heroSubtitle:
    'Wij helpen Nederlandse technische groothandels tussen 50-250 FTE hun inkoop, pricing en pipeline AI-gedreven te maken — voordat Amazon Business, D2C-merken en Chinese B2B-platforms nog meer marge pakken.',
  heroStats: [
    {
      value: '+130-200',
      label: 'bps brutomarge via AI-pricing',
      source: 'McKinsey B2B Pricing, 2025',
    },
    {
      value: '-20 tot -30%',
      label: 'voorraad via AI-forecasting',
      source: 'McKinsey Distribution, 2024',
    },
    {
      value: '93%',
      label: 'snellere quote-verwerking',
      source: 'Distro.app, 2025',
    },
  ],

  painHeadline:
    'De marge van de Nederlandse technische groothandel wordt van twee kanten ingesloten.',
  painIntro:
    'Amazon Business controleert inmiddels 19% van de Europese e-commerce. D2C-merken verkopen rechtstreeks aan jullie klanten. Chinese B2B-platforms pakken het onderste segment. En jullie binnendienst tikt intussen nog altijd PDF-bestellingen over in Excel. Deze pijn is nu.',
  painPoints: [
    {
      title: 'D2C + Amazon Business + Chinese platforms',
      description:
        'Fabrikanten gaan rechtstreeks naar jouw klanten. Amazon Business is nu ~$152B GMV in EU. Per basispunt marge telt. Nichekennis is niet meer genoeg — je moet sneller, scherper en dataslimmer zijn dan generieke platforms.',
    },
    {
      title: 'Binnendienst-tijd lekt op offertes en ordermapping',
      description:
        'RFQs duren 3-5 dagen handmatig. Bestellingen worden uit PDF/e-mail overgetypt. Senior productspecialisten besteden 40% van hun tijd aan werk dat AI in 2 minuten doet — ondertussen gaan zij met pensioen zonder opvolger.',
    },
    {
      title: 'Long-tail SKU-chaos',
      description:
        'Je hebt 50k-500k SKU\'s. De meeste draaien bijna niet. Runners gaan regelmatig op nee-verkoop. Forecasting op articleniveau is te complex voor de mens — maar perfect werk voor ML. Dead stock vreet aan je werkkapitaal.',
    },
    {
      title: 'Excel-pricing en statische staffels',
      description:
        'Je prijzen zijn "oud". Kortingen worden ad-hoc gegeven. Marge lekt bij elke onderhandeling. AI-pricing levert consistent +130-200 bps brutomarge op — dat is direct €1M+ op een €80M omzet.',
    },
    {
      title: 'Data ligt verspreid over 5+ systemen',
      description:
        'ERP (SAP/AFAS/Ridder/Exact), PIM, webshop, CRM en een handvol Excel-sheets. Niemand heeft één waarheid. Rapportages kosten dagen. KPI-zicht is reactief. Elke AI-use-case begint met data plumbing — wij snappen dat.',
    },
    {
      title: 'Klantverwachting stijgt — B2B wordt B2C',
      description:
        '83% van B2B-kopers verkiest digitale kanalen. Ze willen real-time voorraadzicht, directe quotes, persoonlijke aanbevelingen, 24/7 support. Als je catalogus niet zelf uitlegt wat een klant nodig heeft, koopt die klant ergens anders.',
    },
  ],

  useCaseHeadline:
    'Twaalf concrete AI-toepassingen, elk met bewezen ROI.',
  useCaseIntro:
    'Niet theoretisch. Deze use-cases zijn gedocumenteerd bij technische groothandels en distributeurs in NL/EU/US. Wij starten altijd bij de snelste ROI — quote-automatisering, binnendienst-AI, OCR — en werken op naar de grotere gewichten zoals pricing en forecasting.',
  useCases: [
    {
      title: 'Quote/RFQ automatisering',
      description:
        'AI leest klant-RFQ (e-mail, PDF, webshop), matcht met je catalogus, berekent prijs volgens staffels en stelt offerte op. Van 3-5 dagen naar 4-8 uur turnaround. First-responder wint ~50% vaker.',
      roi: 'Cycle -30-50%',
      timeToValue: '4-8 wkn',
    },
    {
      title: 'Demand forecasting (SKU-niveau)',
      description:
        'ML voorspelt vraag per SKU op basis van bestelgeschiedenis, seizoen, events en externe signalen. Stop de nee-verkoop op runners én de dead stock op long-tail.',
      roi: '+20-40% accuracy',
      timeToValue: '8-12 wkn',
    },
    {
      title: 'Dynamic pricing / staffel-AI',
      description:
        'AI-pricing beveelt optimale prijs en korting per klant-SKU-volume combinatie. Gevalideerd door McKinsey: +130-200 bps brutomarge op 1,5M SKU-catalogus. Live in 12 weken bij Turtle.',
      roi: '+130-200 bps',
      timeToValue: '12-20 wkn',
    },
    {
      title: 'PIM / catalogus-verrijking',
      description:
        'AI verrijkt je leveranciersdata: specs, afbeeldingen, categorisatie, keywords. Betere zoekresultaten op webshop, hogere conversie, minder retouren. Time-to-market nieuwe producten -50-70%.',
      roi: 'Retouren -10-20%',
      timeToValue: '6-10 wkn',
    },
    {
      title: 'Sales pipeline scoring & white space',
      description:
        'AI identificeert welke klanten ondergeleverd zijn op welke productgroepen. McKinsey-case: $2B white-space leads geïdentificeerd bij één industriële distributeur. Pipeline +20% van totale omzet.',
      roi: '+3-15% revenue',
      timeToValue: '8-12 wkn',
    },
    {
      title: 'Reorder & replenishment-AI',
      description:
        'AI beslist wanneer + hoeveel na te bestellen per SKU. Geen magazijnchef meer die op gut feel reorder-points zet. Emergency orders -20-40%, werkkapitaal -15-30%.',
      roi: 'Emergency -20-40%',
      timeToValue: '10-14 wkn',
    },
    {
      title: 'Inkoopanalytics & leveranciersscoring',
      description:
        'Welke leveranciers leveren OTIF? Wie heeft prijsruimte? Waar kan je volume consolideren? AI-inkoopanalytics maakt je inkoper 5-15% scherper.',
      roi: '5-15% inkoop',
      timeToValue: '6-10 wkn',
    },
    {
      title: 'Binnendienst-AI (productvragen)',
      description:
        'AI-assistent in Outlook/Teams geeft je binnendienst per klantvraag direct het juiste product, de juiste specs en vergelijkbare alternatieven. Onboarding van 6 maanden naar 6 weken.',
      roi: 'Tickettijd -30-40%',
      timeToValue: '3-6 wkn',
    },
    {
      title: 'OCR voor inkooporders & facturen',
      description:
        'Order of factuur komt binnen als PDF, e-mail of fax. AI leest, categoriseert en boekt in je ERP. Orderinvoer-FTE -50-70%, foutpercentage <1%.',
      roi: 'FTE -50-70%',
      timeToValue: '4-6 wkn',
    },
    {
      title: 'DSO / werkkapitaal-AI',
      description:
        'AI voorspelt per klant de waarschijnlijke betaaldatum. Incasso-prioriteiten worden automatisch gezet. DSO 3-7 dagen lager betekent direct cash op de bank.',
      roi: 'DSO -3-7 dgn',
      timeToValue: '8-12 wkn',
    },
    {
      title: 'AI-chatbot voor technische vragen',
      description:
        'Klanten kunnen 24/7 vragen stellen over producten, compatibiliteit, specs. AI antwoordt of escaleert naar binnendienst met context. Routine-vragen -30-50% deflectie.',
      roi: 'Deflectie 30-50%',
      timeToValue: '6-10 wkn',
    },
    {
      title: 'Outbound-agent voor lead-nurturing',
      description:
        'AI stuurt gepersonaliseerde follow-up mails en WhatsApp-berichten naar koude leads op basis van gedrag en bestelhistorie. Lead-conversie 2-4x, zonder extra commercieel FTE.',
      roi: 'Conversie 2-4x',
      timeToValue: '3-8 wkn',
    },
  ],

  scenario: {
    headline: 'Wat AI-pricing + forecasting bij een €30M technische groothandel oplevert.',
    company:
      '80 FTE technische groothandel in industriële onderdelen. €30M omzet, 25.000 SKU\'s, brutomarge 27%, netto marge 5,5%. Typisch Nederlands profiel.',
    before:
      'Pricing in Excel, sinds 2022 niet herzien. Inkoop op gut feel, 18% dead stock. Binnendienst tikt RFQ\'s handmatig in (gemiddeld 12 per dag, 45 min per stuk). Offerte-conversie: 24%.',
    after:
      'AI-pricing live op 1.500 core-SKU\'s. Forecasting op runners halveert nee-verkoop. Quote-AI verwerkt 80% van RFQ\'s binnen 2 min. Pipeline-scoring identificeert €1,2M ondergeleverde klanten.',
    impact:
      '+4% brutomarge op €30M = €1,2M extra. Binnendienst wint 8 uur per dag terug. Offerte-conversie naar 38%. Totale jaarlijkse impact: ~€1,8M.',
    disclaimer:
      'Illustratief scenario op basis van sector-benchmarks voor vergelijkbare segmenten. Werkelijke resultaten verschillen per bedrijf.',
  },

  facts: [
    {
      value: 'Slechts 7%',
      label: 'van NL handels- en logistiekbedrijven heeft concreet AI-beleid',
      source: 'Evofenedex, 2025',
    },
    {
      value: '-7,7%',
      label: 'omzet-daling groothandel in industriemachines (2024)',
      source: 'CBS, 2025',
    },
    {
      value: '19%',
      label: 'van EU e-commerce loopt via Amazon Business (~$152B GMV)',
      source: 'Marketplace Pulse, 2025',
    },
    {
      value: '36% aftrek',
      label: 'op AI-R&D via WBSO 2026 — tot €391k drempel',
      source: 'RVO, 2026',
    },
  ],

  closingHeadline:
    'Bart of zijn broer kijkt deze week gratis mee naar jullie grootste AI-kansen.',
  closingSub:
    'Een 60-min gesprek + geschreven rapport met 3 concrete AI-kansen voor jouw groothandel. Normaal €5.000 — gratis voor de eerste 10 NL-groothandels per maand. Geen verplichting, geen verkooppraatje, geen follow-up spam.',
};

const Groothandel = () => {
  useEffect(() => {
    document.title =
      'AI voor Nederlandse Technische Groothandel | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AI Operations Partner voor Nederlandse technische groothandels tussen 50-250 FTE. Van AI-pricing (+130-200 bps marge) tot inkoopvoorspelling en quote-automatisering.'
      );
    }
  }, []);

  return <VerticalPage config={groothandelConfig} />;
};

export default Groothandel;
