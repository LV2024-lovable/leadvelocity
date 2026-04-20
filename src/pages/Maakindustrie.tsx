import React, { useEffect } from 'react';
import VerticalPage, { VerticalConfig } from '../components/VerticalPage';

const maakindustrieConfig: VerticalConfig = {
  slug: 'maakindustrie',
  eyebrow: 'Sector-expertise · Maakindustrie',
  heroTitle: [
    'Minder stilstand.',
    'Meer voorspelbaarheid.',
    'AI voor maakindustrie.',
  ],
  heroGradientPart: 'AI voor maakindustrie.',
  heroSubtitle:
    'Wij helpen Nederlandse maakbedrijven hun operatie AI-gedreven maken — van snelle kennis-automatiseringen tot diepere oplossingen voor OEE, kwaliteit en planning.',
  heroStats: [
    { value: 'Tot -50%', label: 'downtime via predictive maintenance' },
    { value: '+15-20 pp', label: 'OEE-winst in eerste 12 maanden' },
    { value: '30-50%', label: 'lagere forecast-error op orderintake' },
  ],

  painHeadline:
    'De Nederlandse maakindustrie wordt geknepen door personeel, energie en klantvolatiliteit.',
  painIntro:
    'Vergrijzing, energie onder druk, reshoring-mogelijkheden, CSRD en vraag-pieken die nooit meer stabiel zijn. Tegelijk zijn MES en ERP legacy (Isah, Ridder, Exact, Navision) en ligt data verspreid.',
  painPoints: [
    {
      title: 'Personeelstekort en vergrijzing',
      description:
        'Een groot deel van NL technische bedrijven meldt personeelstekort. Senior operators, werkvoorbereiders en kwaliteit-experts gaan met pensioen zonder opvolger.',
    },
    {
      title: 'Ongeplande stilstand vreet aan OEE',
      description:
        'Eén storing op een kritieke lijn kost vaak duizenden euro\'s per uur. Onderhoud is reactief. Predictive maintenance levert aantoonbaar minder downtime en lagere onderhoudskosten.',
    },
    {
      title: 'Productieplanning = Excel + ervaring',
      description:
        'Werkvoorbereiders puzzelen dagelijks met orders, capaciteit, omsteltijd, materiaal en personeel. Het lukt — maar kost uren en is fragiel bij spoedorders.',
    },
    {
      title: 'Quality control is handmatig en duur',
      description:
        'Eindcontrole op visuele defects en maatvoering gebeurt vaak met het blote oog. Computer vision haalt consistent hoge detection rates en werkt 24/7.',
    },
    {
      title: 'MES-ERP-Excel-hybride',
      description:
        'Isah, Ridder, Navision en Exact draaien naast losse Excels en shop-floor-terminals. De voor- en nacalculatie-gap blijft onzichtbaar.',
    },
    {
      title: 'CSRD en energiekosten = nieuwe KPI\'s',
      description:
        'Grote klanten eisen scope-3 data per product. Energie is structureel hoge kostenpost. AI meet, voorspelt en optimaliseert energie per eenheid.',
    },
  ],

  quickWinsHeadline:
    'Laagdrempelige automatiseringen — voor directe tijdwinst op de werkvloer.',
  quickWinsIntro:
    'Kleinere automatiseringen die snel zichtbare waarde opleveren voor werkvoorbereiders, engineers en kwaliteitsteams. Goede opstap naar diepere AI-trajecten.',
  quickWins: [
    {
      title: 'Engineering Documentation Search',
      description:
        'RAG-AI op alle technische tekeningen, stuklijsten, normen en werkinstructies. Engineer stelt vraag, krijgt binnen seconden de juiste referentie.',
      duration: '2-3 weken',
    },
    {
      title: 'Meeting Intelligence',
      description:
        'Productie-overleg of klant-meetings worden automatisch samengevat met actiepunten in Teams/CRM. Planner hoeft niet zelf notities te maken.',
      duration: '1-2 weken',
    },
    {
      title: 'Voice-to-CRM notities',
      description:
        'Service-monteur of chauffeur dicteert; notities staan direct in jullie systemen. Geen administratie achteraf meer.',
      duration: '1-2 weken',
    },
    {
      title: 'Document-OCR naar ERP',
      description:
        'Leveranciers-facturen, orderbevestigingen en CMR worden automatisch uitgelezen en geboekt. Geen handmatig invoer meer.',
      duration: '2-3 weken',
    },
    {
      title: 'Onboarding AI-gids',
      description:
        'Nieuwe operator stelt vragen over machines, processen en veiligheid; AI antwoordt op basis van interne werkinstructies. Productief in weken, niet maanden.',
      duration: '1-2 weken',
    },
    {
      title: 'Automated reporting',
      description:
        'Wekelijkse OEE- en productie-dashboards uit MES- en ERP-data. Automatisch gegenereerd, naar management of klanten verzonden.',
      duration: '2-3 weken',
    },
  ],

  sectorSolutionsHeadline:
    'Diepere oplossingen, specifiek voor maakbedrijven.',
  sectorSolutionsIntro:
    'Wanneer Quick Wins draaien en de eerste zichtbaarheid er is, bouwen we diepere oplossingen die OEE, marge en kwaliteit structureel verbeteren.',
  sectorSolutions: [
    {
      title: 'Shop-Floor Copilot',
      tagline: 'Kennis vastgehouden, onboarding versneld',
      description:
        'AI-assistent op tablet of shop-floor-terminal voor operators. Machine-instellingen, storingen, werkinstructies — direct antwoord in de taal van jouw fabriek.',
      bullets: [
        'RAG op werkinstructies + storingsgeschiedenis',
        'Senior-kennis doorzoekbaar voor elke shift',
        'Junior productief in 6-10 weken',
        'Multilingual (NL/EN/PL/RO) indien nodig',
      ],
    },
    {
      title: 'Order Margin Tracker',
      tagline: 'Voor- en nacalculatie real-time',
      description:
        'Real-time inzicht in marge per order. Gap tussen voor- en nacalculatie zichtbaar binnen dagen, niet kwartalen. Werkvoorbereiding en commercial leren iteratief.',
      bullets: [
        'Shop-floor data gekoppeld aan ERP-financials',
        'Afwijking per order zichtbaar op moment zelf',
        'Voorcalculatie wordt scherper met elke order',
        'Typische impact: 3-8% marge-verbetering',
      ],
    },
    {
      title: 'Kwaliteits-rapport Generator',
      tagline: 'Automatisch, klantspecifiek, compliance-ready',
      description:
        'AI genereert klantspecifieke kwaliteitsrapporten uit MES/QC-data. Elk OEM-klantformat ondersteund, handmatig werk elimineren.',
      bullets: [
        'Klant-specifieke templates (BMW, ASML, Philips-formats)',
        'Automatische trend-analyse per charge/batch',
        'Certificeringen automatisch bijgehouden',
        'Contract-behoud bij veeleisende OEMs',
      ],
    },
    {
      title: 'Engineering Doc Search (Pro)',
      tagline: 'Volledige technische kennisbank doorzoekbaar',
      description:
        'Uitgebreide versie van de Quick Win: alle CAD-tekeningen, stuklijsten, normen, historische projecten doorzoekbaar met context. Integreert met PDM.',
      bullets: [
        'PDM-integratie (SolidWorks, Autodesk Vault)',
        'Contextuele zoekopdrachten ("vergelijkbaar met project X")',
        'Automatische normen-links bij tekeningen',
        'Engineers winnen 30% tijd op zoeken',
      ],
    },
  ],

  tier3Hint:
    'Voor maakbedrijven die hun volledige productie AI-gedreven willen maken, hebben we zwaardere projecten rond predictive maintenance en computer vision-kwaliteit. Die bespreken we in een persoonlijk gesprek — data-maturiteit en assets bepalen of het past.',

  scenario: {
    headline:
      'Wat AI oplevert bij een 150-FTE machinebouwer.',
    company:
      'Metaalbewerking en machinebouw, 150 FTE, €35M omzet, 40% exportaandeel. OEE gemiddeld rond 68% op kritieke lijnen.',
    before:
      'Meerdere honderden uren ongeplande stilstand per jaar op kritieke assets. Kwaliteitscontrole mist een klein percentage defecten. First-pass yield rond 91%.',
    after:
      'Shop-Floor Copilot maakt senior-kennis doorzoekbaar. Order Margin Tracker wijst marge-lekken binnen dagen. Engineering Doc Search versnelt offerte-cyclus.',
    impact:
      'Aanzienlijke jaarlijkse waarde via tijdwinst, marge-verbetering en kennisbehoud. OEE stijgt merkbaar richting wereldklasse-niveau.',
    disclaimer:
      'Illustratief scenario op basis van sector-benchmarks voor NL machinebouw. Werkelijke resultaten verschillen per bedrijf.',
  },

  facts: [
    { value: '83%', label: 'van MKB-maakbedrijven weet niet waar met AI te beginnen' },
    { value: '29% vs 17%', label: 'NL industrie vs EU op AI-adoptie — NL leidt' },
    { value: '€1.817M', label: 'WBSO-budget 2026 — AI-R&D krijgt 36% aftrek' },
    { value: 'World-class OEE', label: '85%+ — gemiddeld MKB zit rond 60%' },
  ],

  closingHeadline:
    'Vakmanschap + AI = Nederlandse maakindustrie die blijft winnen.',
  closingSub:
    'Plan een vrijblijvend gesprek. We kijken samen naar OEE, kwaliteit, planning of engineering — en benoemen concreet waar AI het meeste oplevert.',
};

const Maakindustrie = () => {
  useEffect(() => {
    document.title = 'AI voor Nederlandse Maakindustrie | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AI voor Nederlandse maakbedrijven. Van snelle automatiseringen voor engineering en shop-floor tot diepere oplossingen voor OEE, kwaliteit en planning.'
      );
    }
  }, []);

  return <VerticalPage config={maakindustrieConfig} />;
};

export default Maakindustrie;
