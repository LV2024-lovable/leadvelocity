import React, { useEffect } from 'react';
import VerticalPage, { VerticalConfig } from '../components/VerticalPage';

const transportConfig: VerticalConfig = {
  slug: 'transport',
  eyebrow: 'Secundaire sector · Transport & Logistiek',
  heroTitle: [
    'Elke cent per km telt.',
    'AI voor Nederlandse transport.',
  ],
  heroGradientPart: 'AI voor Nederlandse transport.',
  heroSubtitle:
    'Wij bouwen AI-systemen voor Nederlandse transport- en logistiekbedrijven tussen 50-250 FTE — van ritoptimalisatie tot chauffeursacquisitie, tachograaf-analyse en CSRD-rapportage. Geen TMS-vervanging, geen driver-disruption, wel meetbare winst per km.',
  heroStats: [
    {
      value: '5-10%',
      label: 'lagere transportkosten via route-AI',
      source: 'ORTEC/NEA industrie-benchmark',
    },
    {
      value: '60%',
      label: 'snellere documentverwerking via GenAI',
      source: 'McKinsey Beyond Automation, 2024',
    },
    {
      value: '-10 tot -40%',
      label: 'onderhoudskosten via predictive maintenance',
      source: 'McKinsey, 2024',
    },
  ],

  painHeadline:
    'De Nederlandse transportsector zit klem tussen dunne marges en stapelende regelgeving.',
  painIntro:
    'De sector realiseerde in 2024 een winstmarge van 7,1%. SRA berekende dat — zonder compensatie — de vrachtwagenheffing per 1 juli 2026 die marge richting 1,5% drukt. Daarboven: 6.800 openstaande chauffeursvacatures, ZE-zones in 18 steden, CSRD-ketendruk. Elke euro die AI vrijspeelt valt direct in die marge.',
  painPoints: [
    {
      title: 'Vrachtwagenheffing 1-7-2026 (gemiddeld 19,1 ct/km)',
      description:
        'Per 1 juli 2026 betaal je gemiddeld €0,19 per gereden kilometer. Voor een gemiddelde vrachtwagen die 100.000 km/jaar rijdt = €19.000 extra kosten. Euro-6 krijgt lager tarief, 100% elektrisch slechts €0,035/km. AI-routeoptimalisatie levert direct compensatie.',
    },
    {
      title: 'Chauffeurstekort structureel (6.800 vacatures)',
      description:
        'STL Q3 2025: 6.800 openstaande chauffeursvacatures op ~92.000 actieve chauffeurs. EU breed: 426.000 onvervulde HGV-posities. Vergrijzing + taalbarrière + concurrentie van buitenlandse vervoerders. AI helpt selectie, matching en retentie — geen rijkaart-wonder, wel concrete throughput-winst.',
    },
    {
      title: 'ZE-zones in 18 gemeenten + Schiphol sinds 1-1-2025',
      description:
        'Amsterdam, Rotterdam, Utrecht, Den Haag en 14 andere gemeenten hebben zero-emissiezones. Overgangsregels tot 2030, maar routeplanning wordt complexer per dag. AI-routing rekent ZE-restricties, voertuigtype én kosten in één optimalisatie.',
    },
    {
      title: 'CSRD-ketendruk: scope-3 per zending',
      description:
        'Je grootste verladers moeten vanaf 2027 CSRD-rapportage leveren. Zij vragen jou nu al om CO2-data per zending. Excel-rapportages zijn niet schaalbaar. AI-gegenereerde ESG-rapportage is niet optioneel — het is contract-behoud.',
    },
    {
      title: 'TMS-legacy en gefragmenteerde data',
      description:
        'Transpas, Carlo, Plan&Go, PTV, Simacan, MendriX — en daarboven on-board computers van Trimble/Webfleet/FleetGO/Volvo Dynafleet. Data zit overal, nergens bij elkaar. AI heeft geen rip-and-replace nodig: we lezen uit, we schrijven niet — in eerste fase.',
    },
    {
      title: 'Beladingsgraad en empty running',
      description:
        'Nederlandse vrachtwagens rijden gemiddeld 30% leeg. Beladingsgraad wordt niet consistent gemeten (CBS is gestopt met publiceren). Elk procentpunt beter is een cent per km. AI op load-planning haalt structureel 3-8 pp beladingsgraad erbij.',
    },
  ],

  useCaseHeadline:
    'Twaalf AI-toepassingen — van tachograaf tot route tot CSRD.',
  useCaseIntro:
    'Wij beginnen altijd daar waar de data al zit (tachograaf, FMS, e-mail) en schrijven in eerste fase níet terug naar je TMS. Zo heb je géén rip-and-replace en bewijs je ROI voordat er aan je kernsystemen gerommeld wordt.',
  useCases: [
    {
      title: 'Tachograaf-analyse + violation prediction',
      description:
        'AI leest je digitale tachograaf-exports, voorspelt rij/rusttijd-overtredingen vóórdat ze gebeuren en stuurt planners/chauffeurs preventief bij. ILT-boetes -50%, planner-uren -20%.',
      roi: 'Boetes -50%',
      timeToValue: '4-8 wkn',
    },
    {
      title: 'Spot freight quote-automatisering',
      description:
        'Verladers vragen spot-offertes per e-mail. AI checkt beschikbaarheid, berekent marge-optimale prijs op basis van indexen en laadfactor, en stelt quote op. 3-5x meer quotes in dezelfde tijd, marge-lekken -1-3%.',
      roi: 'Throughput 3-5x',
      timeToValue: '6-10 wkn',
    },
    {
      title: 'Customer service automatisering',
      description:
        '"Waar is mijn zending?" wordt 24/7 automatisch beantwoord op basis van tracking + ETA. Planner wordt niet meer afgeleid door tier-1 vragen. Deflectie 30-50% op standaardvragen.',
      roi: 'Deflectie 30-50%',
      timeToValue: '6-12 wkn',
    },
    {
      title: 'ETA-predictie op ritniveau',
      description:
        'ETAs uit je TMS zijn vaak optimistisch. AI herrekent met verkeer, weer, historische stopduur en chauffeurspatroon. On-time delivery +15-20 pp, penalty-kosten direct lager.',
      roi: 'On-time +15-20pp',
      timeToValue: '2-4 mnd',
    },
    {
      title: 'Document-AI: CMR, vrachtbrief, douane',
      description:
        'Document komt binnen (papier, PDF, e-mail). AI extraheert, valideert en registreert. Doorlooptijd -60%, coordinator-werklast -10-20%. Especially valuable voor internationaal transport met papierstromen.',
      roi: 'Doorlooptijd -60%',
      timeToValue: '2-3 mnd',
    },
    {
      title: 'Chauffeur-recruitment & matching',
      description:
        'AI matcht kandidaat-chauffeurs op eisen (C/CE, code 95, ADR, taal), scheduling-voorkeuren en bedrijfscultuur. Time-to-hire -30-50%, no-show -20%.',
      roi: 'Time-to-hire -30-50%',
      timeToValue: '2-3 mnd',
    },
    {
      title: 'Route-optimalisatie (distributie)',
      description:
        'Geen ORTEC-vervanging — een AI-laag erboven die specifieke subsegmenten (retail, installatie, lastmile) verder optimaliseert. 5-10% transportkosten lager, 5-15% minder lege km.',
      roi: '5-10% kosten',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Load-optimalisatie (laadmeter + palletplaats)',
      description:
        'AI lost de palletplaats/laadmeter-puzzel per rit. Beladingsgraad +3-8 pp = direct op de marge. Vooral impact in pallet-distributie en LTL/groupage.',
      roi: 'Beladingsgraad +3-8pp',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Predictive maintenance fleet',
      description:
        'AI voorspelt componentuitval op basis van FMS-data, kilometerstanden en rit-profielen. Onderhoud -10-40%, downtime -30-50%. Voorkomt €1.900+ per incident aan pech-kosten.',
      roi: 'Onderhoud -10-40%',
      timeToValue: '4-6 mnd',
    },
    {
      title: 'CSRD/CO2 rapportage automation',
      description:
        'Automatisch scope-3 emissies per zending berekenen op basis van tachograaf + FMS + voertuig-data. Levert aan verlader wat hij nodig heeft, wanneer hij het vraagt. Waarde: contractbehoud.',
      roi: 'Contract-retention',
      timeToValue: '3-5 mnd',
    },
    {
      title: 'Fuel-efficiency coaching',
      description:
        'L/100km verschilt 10-15% tussen chauffeurs op dezelfde rit. AI identificeert patronen (remgedrag, snelheid, leeglooptijden) en pusht concrete coaching per chauffeur. 2-4% brandstofreductie op 20-25% van je kostenbasis.',
      roi: 'Brandstof -2-4%',
      timeToValue: '2-4 mnd',
    },
    {
      title: 'Shift- en dienstregelingplanning',
      description:
        'AI plant chauffeur-diensten onder rij/rusttijd-regime + CAO + voorkeur-constraints. Overuren -10-20%, planner-uren -30%. Je planner blijft eindverantwoordelijk — AI doet de rekenpuzzel.',
      roi: 'Overuren -10-20%',
      timeToValue: '4-6 mnd',
    },
  ],

  scenario: {
    headline:
      'Wat AI-ritoptimalisatie + fuel-coaching oplevert bij een 120-wagen-transporteur.',
    company:
      'Pallet-distributeur, 180 FTE, 120 vrachtwagens, €25M omzet. Gemiddelde kosten €1,40/km, marge 6,5%. Rijdt 12M km per jaar, 20% van kosten is brandstof.',
    before:
      'Planners optimaliseren op ervaring + Excel. Geen zicht op chauffeursverschillen in fuel-gebruik. CSRD-aanvraag van topklant kost elke maand 2 dagen handwerk. Vrachtwagenheffing 1-7-2026 gaat €2,3M/jaar kosten.',
    after:
      'AI-ritoptimalisatie bespaart 6% op transportkosten = €1M/jaar. Fuel-coaching per chauffeur levert 3% brandstofreductie = €200k. CSRD-rapportage is geautomatiseerd. Planner richt zich op uitzonderingen, niet op uitvoering.',
    impact:
      '~€1,2M/jaar besparing. Compenseert 52% van de vrachtwagenheffing. Marge blijft overeind bij €1,85/km effectief.',
    disclaimer:
      'Scenario op basis van McKinsey, ORTEC/NEA en Panteia benchmarks voor pallet-distributie. Werkelijke resultaten verschillen per bedrijf. Geen klantspecifieke data.',
  },

  facts: [
    {
      value: '7,1% → 1,5%',
      label: 'sector-winstmarge 2024 → stress-scenario met vrachtwagenheffing',
      source: 'SRA via Transport Online, 2025',
    },
    {
      value: '6.800',
      label: 'openstaande chauffeursvacatures in NL (Q3 2025)',
      source: 'STL Sectormonitor 2025',
    },
    {
      value: '€0,19/km',
      label: 'gemiddelde vrachtwagenheffing vanaf 1-7-2026',
      source: 'Rijksoverheid / TLN',
    },
    {
      value: '18 + Schiphol',
      label: 'gemeenten met actieve ZE-zone sinds 1-1-2025',
      source: 'Milieuzones.nl / KVK',
    },
  ],

  closingHeadline:
    'De vrachtwagenheffing komt sowieso. Jij bepaalt of AI \'m opvangt.',
  closingSub:
    'Een 60-min gesprek + geschreven rapport met 3 concrete AI-kansen voor jouw transportbedrijf. Specifiek gericht op waar jij de meeste cent-per-km kan winnen. Gratis voor de eerste 10 NL-transporteurs per maand.',
};

const Transport = () => {
  useEffect(() => {
    document.title = 'AI voor Nederlandse Transport & Logistiek | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AI voor Nederlandse transport- en logistiekbedrijven tussen 50-250 FTE. Ritoptimalisatie, chauffeursacquisitie, tachograaf-analyse, CSRD-rapportage. Compenseer de vrachtwagenheffing 2026.'
      );
    }
  }, []);

  return <VerticalPage config={transportConfig} />;
};

export default Transport;
