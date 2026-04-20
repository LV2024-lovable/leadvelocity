import React, { useEffect } from 'react';
import VerticalPage, { VerticalConfig } from '../components/VerticalPage';

// NOTE: Deep research voor maakindustrie komt nog (quota-reset 16:00). Deze v1
// is gebouwd op algemeen gedocumenteerde AI-in-manufacturing benchmarks
// (McKinsey, Deloitte, Smart Industry NL) en wordt aangescherpt zodra het
// maakindustrie-research-doc landt in .planning/research/.
const maakindustrieConfig: VerticalConfig = {
  slug: 'maakindustrie',
  eyebrow: 'Secundaire sector · Maakindustrie',
  heroTitle: [
    'Minder stilstand.',
    'Meer voorspelbaarheid.',
    'AI voor maakindustrie.',
  ],
  heroGradientPart: 'AI voor maakindustrie.',
  heroSubtitle:
    'Wij bouwen AI-systemen voor Nederlandse maakbedrijven tussen 50-250 FTE — van predictive maintenance en productieplanning tot kwaliteit, MES-orchestratie en engineering-AI. Geen industrie 4.0 marketing, wel meetbare OEE-winst in één kwartaal.',
  heroStats: [
    {
      value: '-50%',
      label: 'downtime via predictive maintenance',
      source: 'McKinsey Beyond Automation, 2024',
    },
    {
      value: '+10-20pp',
      label: 'OEE via AI-planning en kwaliteit',
      source: 'McKinsey Manufacturing, 2024',
    },
    {
      value: 'Tot 10x',
      label: 'ROI op AI-driven predictive maintenance',
      source: 'Deloitte Insights, 2024',
    },
  ],

  painHeadline:
    'De Nederlandse maakindustrie wordt geknepen door personeel, energie en klantvolatiliteit.',
  painIntro:
    'Vergrijzing, energie-aanhoudende druk, reshoring, CSRD en demand-pieken die nooit meer stabiel zijn. Tegelijk zijn MES en ERP legacy (Isah, Ridder, Exact, Navision) en ligt de data versnipperd. AI is geen "industrie 4.0 droom" meer — het is de enige manier om in dit tempo voor te blijven.',
  painPoints: [
    {
      title: 'Personeelstekort en vergrijzing',
      description:
        '68% van NL technische bedrijven meldt personeelstekort. Senior operators, werkvoorbereiders en kwaliteit-experts gaan met pensioen zonder opvolger. AI houdt hun kennis vast en maakt junioren in 6 weken productief in plaats van 6 maanden.',
    },
    {
      title: 'Ongeplande stilstand vreet aan OEE',
      description:
        'Eén onverwachte storing op een kritieke lijn kost vaak €5-50k per uur. Onderhoud is reactief — "we vervangen als het kapot is." Predictive maintenance levert bewezen 30-50% downtime-reductie en 10-40% lagere onderhoudskosten.',
    },
    {
      title: 'Productieplanning = Excel + ervaring',
      description:
        'Werkvoorbereiders puzzelen dagelijks met orders, capaciteit, omsteltijd, materiaal en personeel. Het lukt — maar kost uren en is fragiel bij spoedorders. AI-planning rekent scenario\'s in seconden en zorgt voor optimale volgorde zonder paniek.',
    },
    {
      title: 'Quality control is handmatig en duur',
      description:
        'Eindcontrole op visuele defects, maatvoering of assemblage gebeurt vaak handmatig. Computer vision AI haalt consistent >99,5% detection rate en werkt 24/7. First-pass yield stijgt, scrap rate daalt, klachten dalen.',
    },
    {
      title: 'MES-ERP-Excel-hybride',
      description:
        'Je draait Isah/Ridder/Navision/Exact, daarboven losse Excels per afdeling, daarnaast shop-floor-terminals. Nachtcalculatie vs voorcalculatie-gap is een raadsel. AI maakt één waarheid over werkelijke kostprijs, doorlooptijd en marge per order.',
    },
    {
      title: 'CSRD en energiekosten = nieuwe KPI\'s',
      description:
        'Grote klanten eisen scope-3 data per product. Energie is post-2022 hoge kostenpost. Operationele AI meet, voorspelt en optimaliseert energie per eenheid. Zonder AI is CSRD-rapportage handwerk dat niet schaalt.',
    },
  ],

  useCaseHeadline:
    'Twaalf AI-toepassingen — van shopfloor tot engineering tot rapportage.',
  useCaseIntro:
    'Wij beginnen op plekken waar data al bestaat (machines met IoT, MES-logs, ERP-historie) en leveren snelle wins — predictive maintenance, documentzoek, kwaliteit — voordat we de grote orchestratie-projecten aanraken. Geen MES-vervanging zonder bewijs van kleinere wins eerst.',
  useCases: [
    {
      title: 'Predictive maintenance op kritieke assets',
      description:
        'Sensoren + historische storingsdata voeden ML-model dat 2-4 weken vooraf uitvallen voorspelt. Planbaar onderhoud vervangt nood-interventies. Bewezen: -10-40% onderhoudskosten, -30-50% downtime.',
      roi: 'Downtime -30-50%',
      timeToValue: '4-6 mnd',
    },
    {
      title: 'AI-productieplanning (APS-laag)',
      description:
        'AI optimaliseert orderscheduling onder constraints: capaciteit, omsteltijd, materiaal, personeel, deadlines. Werkvoorbereider wordt overruler van de AI, niet de bouwer van het schema. Doorlooptijd -15-25%.',
      roi: 'Doorlooptijd -15-25%',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Computer vision kwaliteitscontrole',
      description:
        'Camera op de lijn detecteert defects, maatafwijking en assemblage-fouten in real-time. >99,5% detection, 24/7, consistent. First-pass yield stijgt, klachten dalen, terugroepacties voorkomen.',
      roi: 'Scrap -20-40%',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Engineering-AI (documentatie-zoek)',
      description:
        'AI-assistent leest alle technische tekeningen, stuklijsten, werkinstructies en procedures. Engineer/operator vraagt en krijgt direct de juiste info. Senior kennis wordt doorzoekbaar, nieuwe medewerkers sneller inzetbaar.',
      roi: 'Zoektijd -70-90%',
      timeToValue: '3-6 wkn',
    },
    {
      title: 'Quote-to-order voor maakbedrijven',
      description:
        'AI analyseert klantaanvraag (tekening + specificatie) en stelt automatisch een eerste offerte-calculatie voor op basis van vergelijkbare eerdere orders. Offerte-doorlooptijd van dagen naar uren.',
      roi: 'Offerte-tijd -70%',
      timeToValue: '2-4 mnd',
    },
    {
      title: 'Energie-optimalisatie op lijnen',
      description:
        'AI leert per lijn/machine het energieprofiel en identificeert spilling (leegloop, overbelasting, onnodig warmhouden). 5-15% energiereductie op productie-gebonden verbruik — direct op de marge, direct op scope-1.',
      roi: 'Energie -5-15%',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Supplier quality analytics',
      description:
        'AI clustert leveranciersprestaties (OTIF, kwaliteit, klachten) en geeft onderbouwing voor heronderhandeling of vendor-consolidatie. Inkoopbesparing én minder productie-verstoring.',
      roi: '5-15% inkoop',
      timeToValue: '6-10 wkn',
    },
    {
      title: 'WIP en voorraadoptimalisatie',
      description:
        'AI balanceert work-in-progress en grondstofvoorraad tegen servicelevel. Werkkapitaal omlaag zonder dat levertijden in gevaar komen. Inventory cost -10% bij gelijke OTIF.',
      roi: 'Inventory -10-20%',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Nachtcalculatie-AI',
      description:
        'AI koppelt shopfloor-timing (terminal-meldingen, IoT, tachograaf-achtige data) aan financiën. Gap tussen voor- en nachtcalculatie wordt zichtbaar per order, niet pas aan het kwartaaleind.',
      roi: 'Margezicht real-time',
      timeToValue: '2-4 mnd',
    },
    {
      title: 'Demand forecasting',
      description:
        'ML voorspelt klantvraag op productniveau — niet voor de jaarbegroting, maar voor planning-horizon van 4-12 weken. Minder spoedorders, betere inkoopbeslissingen, rustiger productie.',
      roi: '+20-30% accuracy',
      timeToValue: '8-12 wkn',
    },
    {
      title: 'CSRD & ESG-rapportage automation',
      description:
        'Scope-1, 2 en 3 data worden automatisch gekoppeld aan producten, klanten en leveranciers. Klant vraagt product-CO2-footprint, AI levert binnen minuten.',
      roi: 'Compliance schaal',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Klantenservice + aftermarket AI',
      description:
        'AI-assistent voor klantcontact: levertijd-vragen, orderstatus, reserveonderdelen, technische vragen. Ook: predictive servicing van eigen geleverde machines bij klanten (recurring revenue).',
      roi: 'Tickettijd -30-40%',
      timeToValue: '6-10 wkn',
    },
  ],

  scenario: {
    headline:
      'Wat predictive maintenance + kwaliteits-AI oplevert bij een 150-FTE machinebouwer.',
    company:
      'Metaalbewerking/machinebouw, 150 FTE, €35M omzet, 40% exportaandeel. OEE gemiddeld 68% op kritieke lijnen. Eindkwaliteit 100% handmatig gecontroleerd (3 FTE).',
    before:
      'Gemiddeld 120 uur ongeplande stilstand per jaar, €40k kost per incident. Kwaliteitscontrole mist 2-3% defecten, leidt tot klachten en retouren. First-pass yield: 91%.',
    after:
      'Predictive maintenance op 8 kritieke assets reduceert stilstand met 45%. Vision-AI vervangt 60% van handmatige kwaliteitscontrole met >99% accuracy. FTE\'s in kwaliteit schuiven naar procesverbetering.',
    impact:
      'Circa €1,4M jaarlijkse waarde — €900k downtime-besparing, €300k kwaliteitswinst, €200k herinzet FTE. OEE van 68% naar 78%.',
    disclaimer:
      'Illustratief scenario op basis van sector-benchmarks voor NL machinebouw. Werkelijke resultaten verschillen per bedrijf.',
  },

  facts: [
    {
      value: '68%',
      label: 'van NL technische bedrijven ervaart personeelstekort',
      source: 'TechBarometer, 2025',
    },
    {
      value: '+1,6x',
      label: 'EBIT-marge bij "future-built" bedrijven vs achterblijvers',
      source: 'BCG AI Value Gap, okt 2025',
    },
    {
      value: '€1.817M',
      label: 'WBSO-budget 2026 — AI-R&D krijgt 36% aftrek',
      source: 'RVO, 2026',
    },
    {
      value: '50%',
      label: 'van GenAI-projecten gestaakt door verkeerde scope — vermijd dat',
      source: 'Gartner, 2024',
    },
  ],

  closingHeadline:
    'Vakmanschap + AI = Nederlandse maakindustrie die blijft winnen.',
  closingSub:
    'Een 60-min gesprek + geschreven rapport met 3 concrete AI-kansen voor jouw maakbedrijf. Specifiek op OEE, kwaliteit, planning of engineering. Gratis voor de eerste 10 NL-maakbedrijven per maand.',
};

const Maakindustrie = () => {
  useEffect(() => {
    document.title = 'AI voor Nederlandse Maakindustrie | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AI voor Nederlandse maakbedrijven tussen 50-250 FTE. Predictive maintenance, AI-planning, kwaliteit via computer vision, engineering-AI. OEE-winst in één kwartaal.'
      );
    }
  }, []);

  return <VerticalPage config={maakindustrieConfig} />;
};

export default Maakindustrie;
