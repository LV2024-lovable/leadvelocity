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
    'Wij bouwen AI-systemen voor Nederlandse maakbedrijven — van predictive maintenance en productieplanning tot kwaliteit, MES-orchestratie en engineering-AI. Geen industrie 4.0-beloftes, wel meetbare OEE-winst per kwartaal.',
  heroStats: [
    { value: 'Tot -50%', label: 'downtime via predictive maintenance' },
    { value: '+15-20 pp', label: 'OEE-winst in eerste 12 maanden' },
    { value: '30-50%', label: 'lagere forecast-error op orderintake' },
  ],

  painHeadline:
    'De Nederlandse maakindustrie wordt geknepen door personeel, energie en klantvolatiliteit.',
  painIntro:
    'Vergrijzing, energie onder druk, reshoring-mogelijkheden, CSRD en vraag-pieken die nooit meer stabiel zijn. Tegelijk zijn MES en ERP legacy (Isah, Ridder, Exact, Navision) en ligt data verspreid. AI is geen "industrie 4.0-droom" meer — het is hoe je in dit tempo vóór blijft.',
  painPoints: [
    {
      title: 'Personeelstekort en vergrijzing',
      description:
        'Een groot deel van NL technische bedrijven meldt personeelstekort. Senior operators, werkvoorbereiders en kwaliteit-experts gaan met pensioen zonder opvolger. AI houdt hun kennis vast en maakt junioren sneller productief.',
    },
    {
      title: 'Ongeplande stilstand vreet aan OEE',
      description:
        'Eén storing op een kritieke lijn kost vaak duizenden euro\'s per uur. Onderhoud is reactief. Predictive maintenance levert aantoonbaar minder downtime en lagere onderhoudskosten — zonder MES te vervangen.',
    },
    {
      title: 'Productieplanning = Excel + ervaring',
      description:
        'Werkvoorbereiders puzzelen dagelijks met orders, capaciteit, omsteltijd, materiaal en personeel. Het lukt — maar kost uren en is fragiel bij spoedorders. AI-planning rekent scenario\'s in seconden.',
    },
    {
      title: 'Quality control is handmatig en duur',
      description:
        'Eindcontrole op visuele defects en maatvoering gebeurt vaak met het blote oog. Computer vision haalt consistent hoge detection rates en werkt 24/7. First-pass yield stijgt, scrap en klachten dalen.',
    },
    {
      title: 'MES-ERP-Excel-hybride',
      description:
        'Isah, Ridder, Navision en Exact draaien naast losse Excels en shop-floor-terminals. De voor- en nacalculatie-gap blijft onzichtbaar. AI maakt één waarheid over werkelijke kostprijs, doorlooptijd en marge per order.',
    },
    {
      title: 'CSRD en energiekosten = nieuwe KPI\'s',
      description:
        'Grote klanten eisen scope-3 data per product. Energie is structureel hoge kostenpost. AI meet, voorspelt en optimaliseert energie per eenheid — en maakt CSRD-rapportage schaalbaar.',
    },
  ],

  productsHeadline:
    'Hoe onze vier producten eruit zien voor een maakbedrijf.',
  productsIntro:
    'We beginnen altijd op plekken waar data al bestaat: machine-telemetrie, MES-logs, ERP-historie, PDM-tekeningen. Snelle wins (documentatie-zoek, nacalculatie, quality vision) voor grote orchestratie-projecten.',
  productApplications: [
    {
      productKey: 'sales',
      intro:
        'Voor maakbedrijven gaat sales-AI niet over cold outbound — het gaat over offerte-workflow, klant-aftermarket en het vasthouden van de klantrelatie. Wij bouwen AI die jullie commerciële cyclus versnelt.',
      applications: [
        {
          title: 'Quote-to-order AI',
          description:
            'AI analyseert klantaanvraag (tekening + specificatie) en stelt automatisch een eerste offerte-calculatie voor op basis van vergelijkbare eerdere orders. Offerte-doorlooptijd van dagen naar uren.',
        },
        {
          title: 'Aftermarket & service-AI',
          description:
            'Voor eigen geleverde machines: predictive service bij klanten als recurring revenue-stroom. Wordt van "leveren en vergeten" naar doorlopende klantrelatie.',
        },
        {
          title: 'Klantsegmentatie & upsell',
          description:
            'AI identificeert welke klanten ondergeleverd zijn op welke productgroepen. Account-managers krijgen een concrete upsell-lijst in plaats van op gevoel te werken.',
        },
        {
          title: 'Tender & RFP-scraping',
          description:
            'Publieke tenders en RFP\'s worden automatisch gescand en gematcht met jullie capabilities. Geen handmatige aanbestedingen-research meer.',
        },
      ],
    },
    {
      productKey: 'dashboard',
      intro:
        'Eén dashboard dat MES, ERP, machine-telemetrie, personeel en finance samenbrengt. Voor het eerst echt live zicht op OEE, doorlooptijd, energie en marge per order.',
      applications: [
        {
          title: 'Live OEE & stilstand-dashboard',
          description:
            'Real-time OEE per lijn met root-cause-analyse op stilstand. Niet pas aan het einde van de maand — meteen tijdens de shift, met concrete handvatten voor de werkvoorbereider.',
        },
        {
          title: 'Nacalculatie vs voorcalculatie loop',
          description:
            'De gap tussen begroting en werkelijkheid wordt zichtbaar per order. Iteratief leren op marge — de voorcalculatie wordt elke maand scherper in plaats van constant te missen.',
        },
        {
          title: 'Energy & ESG analytics',
          description:
            'Energie per lijn, per machine, per product. Identificeer spilling, standby-verspilling en piekbelasting. CSRD-rapportage wordt geautomatiseerd in plaats van handwerk.',
        },
        {
          title: 'WIP & voorraad-optimalisatie',
          description:
            'Work-in-progress en grondstof gebalanceerd tegen servicelevel. Werkkapitaal vrij, zonder dat levertijden in gevaar komen.',
        },
      ],
    },
    {
      productKey: 'assistant',
      intro:
        'AI-assistenten die exact daar zitten waar de kennis verdwijnt: op de shopfloor, in engineering, en in de klantenservice. Senior kennis wordt doorzoekbaar — niet iets wat met pensioen gaat.',
      applications: [
        {
          title: 'Shop-floor copilot',
          description:
            'Operators krijgen direct antwoord op machine-instellingen, storingen en werkinstructies. Ervaring wordt gedeeld in plaats van verloren. Oplossings­tijd gaat fors omlaag.',
        },
        {
          title: 'Engineering-AI documentzoek',
          description:
            'AI doorzoekt alle tekeningen, stuklijsten, normen en werkinstructies. Engineer vraagt, AI levert binnen seconden. Zoektijd per project daalt drastisch.',
        },
        {
          title: 'Computer vision kwaliteit',
          description:
            'Camera op de lijn detecteert defects, maatafwijking en assemblage-fouten real-time. Consistent hoge detection rate, 24/7. Scrap en terugroepacties dalen.',
        },
        {
          title: 'Voice agent voor service-desk',
          description:
            'Inkomende storingsmeldingen van klanten worden 24/7 afgehandeld — triage, prioritering, escalatie naar de juiste engineer. Service-desk draait door zonder nachtbezetting.',
        },
      ],
    },
  ],

  scenario: {
    headline:
      'Wat predictive maintenance + kwaliteits-AI oplevert bij een 150-FTE machinebouwer.',
    company:
      'Metaalbewerking en machinebouw, 150 FTE, €35M omzet, 40% exportaandeel. OEE gemiddeld rond 68% op kritieke lijnen. Eindkwaliteit grotendeels handmatig gecontroleerd.',
    before:
      'Meerdere honderden uren ongeplande stilstand per jaar op kritieke assets. Kwaliteitscontrole mist een klein percentage defecten, leidt tot klachten en retouren. First-pass yield rond 91%.',
    after:
      'Predictive maintenance op kritieke assets reduceert stilstand fors. Vision-AI ondersteunt kwaliteitscontrole met hoge accuracy. QC-FTE\'s schuiven naar procesverbetering.',
    impact:
      'Aanzienlijke jaarlijkse waarde — downtime-besparing, kwaliteitswinst en herinzet FTE. OEE stijgt naar ~78%.',
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
        'AI voor Nederlandse maakbedrijven. Predictive maintenance, AI-planning, kwaliteit via computer vision, engineering-AI. OEE-winst per kwartaal.'
      );
    }
  }, []);

  return <VerticalPage config={maakindustrieConfig} />;
};

export default Maakindustrie;
