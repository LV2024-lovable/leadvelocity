import React, { useEffect } from 'react';
import VerticalPage, { VerticalConfig } from '../components/VerticalPage';

const transportConfig: VerticalConfig = {
  slug: 'transport',
  eyebrow: 'Sector-expertise · Transport & Logistiek',
  heroTitle: [
    'Elke cent per km telt.',
    'AI voor Nederlandse transport.',
  ],
  heroGradientPart: 'AI voor Nederlandse transport.',
  heroSubtitle:
    'Wij bouwen AI-systemen voor Nederlandse transport- en logistiekbedrijven — van ritoptimalisatie tot chauffeursacquisitie, tachograaf-analyse en CSRD-rapportage. Geen TMS-vervanging, geen driver-disruption, wel meetbare winst per km.',
  heroStats: [
    { value: '5-10%', label: 'lagere transportkosten via route-AI' },
    { value: '60%', label: 'snellere documentverwerking' },
    { value: '-10 tot -40%', label: 'lagere onderhoudskosten via predictive maintenance' },
  ],

  painHeadline:
    'De Nederlandse transportsector zit klem tussen dunne marges en stapelende regelgeving.',
  painIntro:
    'De sector realiseerde in 2024 een winstmarge van ~7%. Met de vrachtwagenheffing vanaf juli 2026 komt die flink onder druk. Daarboven: 6.800 openstaande chauffeursvacatures, ZE-zones in 18 steden, CSRD-ketendruk. Elke euro die AI vrijspeelt valt direct in die marge.',
  painPoints: [
    {
      title: 'Vrachtwagenheffing vanaf 1 juli 2026',
      description:
        'Gemiddeld €0,19 per gereden kilometer extra. Voor een gemiddelde vrachtwagen van 100.000 km/jaar: €19.000 extra kosten. AI-routeoptimalisatie levert direct compensatie op hetzelfde wagenpark.',
    },
    {
      title: 'Chauffeurstekort structureel',
      description:
        '6.800 openstaande vacatures op ~92.000 actieve chauffeurs. EU-breed 426.000 onvervulde HGV-posities. Vergrijzing, taalbarrière, concurrentie van buitenlandse vervoerders. AI ondersteunt selectie, matching en retentie.',
    },
    {
      title: 'ZE-zones sinds 2025, CSRD vanaf 2027',
      description:
        'Amsterdam, Rotterdam, Utrecht, Den Haag en 14 andere gemeenten hebben zero-emissie-zones. Grote verladers vragen nu al CSRD-ketendata. Planning, vlootinzet en rapportage worden complexer per dag.',
    },
    {
      title: 'TMS-legacy en gefragmenteerde data',
      description:
        'Transpas, Carlo, Plan&Go, PTV, Simacan. On-board computers van Trimble, Webfleet, FleetGO, Volvo Dynafleet. Data zit overal, nergens bij elkaar. AI heeft geen rip-and-replace nodig — wij lezen uit.',
    },
    {
      title: 'Beladingsgraad en empty running',
      description:
        'Nederlandse vrachtwagens rijden gemiddeld ~30% leeg. Beladingsgraad wordt niet consistent gemeten. Elk procentpunt beter is een cent per km. AI op load-planning haalt structureel pp\'s erbij.',
    },
    {
      title: 'Planner is overbelast, doet reactief werk',
      description:
        'Elke storing (vertraging, no-show, uitval) drukt direct op de planner. Handmatig puzzelen met charters, rij-rusttijd en klantafspraken. AI neemt de rekenkracht over — planner houdt de regie.',
    },
  ],

  productsHeadline:
    'Hoe onze vier producten eruit zien voor transporteurs.',
  productsIntro:
    'We beginnen altijd bij data die al bestaat (tachograaf-export, FMS, e-mail). In fase 1 schrijven we níet terug naar je TMS — zo heb je geen rip-and-replace en bewijs je ROI voordat er aan kernsystemen gesleuteld wordt.',
  productApplications: [
    {
      productKey: 'sales',
      intro:
        'Sales in transport draait om verladers, charters en spot freight. Wij bouwen AI die je commerciële pipeline verstevigt en je spot-margeslagkracht vergroot.',
      applications: [
        {
          title: 'Verlader-acquisitie via AI-prospecting',
          description:
            'AI identificeert verladers met vracht-patronen die matchen met jullie vloot en regio. Outreach wordt gepersonaliseerd, schaalbaar, en gericht op het juiste decision-level.',
        },
        {
          title: 'Spot freight quote-automatisering',
          description:
            'Spot-aanvragen worden automatisch beoordeeld op beschikbaarheid, rit-marge en acceptabel tarief. Quotes gaan binnen minuten uit in plaats van uren.',
        },
        {
          title: 'Charter-matching',
          description:
            'AI matcht charter-vraag aan beschikbare partners in het netwerk op basis van ritprofiel, certificeringen en historische prestaties. Planner bespaart belrondes.',
        },
        {
          title: 'Chauffeur-recruitment AI',
          description:
            'AI matcht kandidaten op vereisten (C/CE, code 95, ADR, taal), roosterwensen en cultuur-fit. Time-to-hire en no-show rates dalen — relevant bij structureel tekort.',
        },
      ],
    },
    {
      productKey: 'dashboard',
      intro:
        'Eén dashboard dat TMS, FMS, tachograaf, brandstof en finance samenbrengt. Voor het eerst echt zicht op cent-per-km, beladingsgraad en downtime in real-time.',
      applications: [
        {
          title: 'Cent-per-km dashboard',
          description:
            'Real-time kosten per km per rit, voertuig, chauffeur en klant. Marge-lekken worden zichtbaar op de dag dat ze ontstaan — niet pas bij de kwartaalrapportage.',
        },
        {
          title: 'Beladingsgraad & route-efficiency',
          description:
            'Live beladingsgraad per rit en lege-km-analyse. Combineerbare ritten worden automatisch voorgesteld. Direct impact op de marge bij gelijkblijvend volume.',
        },
        {
          title: 'Predictive maintenance fleet',
          description:
            'FMS-data voedt modellen die componentuitval voorspellen. Onderhoud wordt planbaar. Nood-interventies en pechkosten dalen substantieel.',
        },
        {
          title: 'CSRD & CO2-rapportage',
          description:
            'Scope-1 emissies per zending automatisch berekend uit tachograaf en FMS. Levert direct aan verlader wat die nodig heeft. Contract-behoud wordt niet langer handwerk.',
        },
      ],
    },
    {
      productKey: 'assistant',
      intro:
        'AI-assistenten die de planner ontlasten, de chauffeur ondersteunen en de klant 24/7 antwoord geven — zonder dat iemand nachtdienst draait.',
      applications: [
        {
          title: '"Waar is mijn zending?" chatbot',
          description:
            '24/7 automatische antwoorden op ETA, POD en status-vragen. Planner wordt niet meer afgeleid door routine-verkeer. Klant krijgt directe, consistente info.',
        },
        {
          title: 'Planner-assistent',
          description:
            'AI doet het rekenwerk: "kan deze rit erbij?", "wat is het alternatief bij vertraging?", "welke chauffeur heeft rij-uren over?". Planner houdt overrule.',
        },
        {
          title: 'Voice agent voor chauffeurs',
          description:
            'Chauffeurs bellen de voice-agent voor check-in/uit, loadstatus, wachtlocatie. Multilingual (NL/EN/PL/RO). Planner-tijd blijft vrij voor echte uitzonderingen.',
        },
        {
          title: 'Tachograaf & compliance-AI',
          description:
            'AI voorspelt rij/rusttijd-overtredingen vóór ze gebeuren en stuurt preventief bij. ILT-boetes dalen, planner-uren dalen, chauffeur heeft rustigere dag.',
        },
      ],
    },
  ],

  scenario: {
    headline:
      'Wat AI-ritoptimalisatie + fuel-coaching oplevert bij een 120-wagen-transporteur.',
    company:
      'Pallet-distributeur, 180 FTE, 120 vrachtwagens, €25M omzet. Gemiddelde kosten ~€1,40/km, marge 6,5%. Rijdt 12M km per jaar, ~20% van kosten is brandstof.',
    before:
      'Planners optimaliseren op ervaring + Excel. Geen zicht op chauffeurs-verschillen in brandstofverbruik. CSRD-aanvragen van topklant kosten elke maand handwerk. Vrachtwagenheffing 2026 komt eraan.',
    after:
      'AI-ritoptimalisatie bespaart ~6% op transportkosten. Fuel-coaching per chauffeur levert meerdere procenten brandstofreductie. CSRD-rapportage is geautomatiseerd. Planner richt zich op uitzonderingen.',
    impact:
      'Ordergrootte besparing per jaar — genoeg om een substantieel deel van de vrachtwagenheffing te compenseren en marge overeind te houden.',
    disclaimer:
      'Illustratief scenario op basis van sector-benchmarks voor pallet-distributie. Werkelijke resultaten verschillen per bedrijf.',
  },

  facts: [
    { value: '~7% → ?', label: 'sector-winstmarge onder druk door vrachtwagenheffing 2026' },
    { value: '6.800', label: 'openstaande chauffeursvacatures in NL' },
    { value: '€0,19/km', label: 'gemiddelde vrachtwagenheffing vanaf 1 juli 2026' },
    { value: '18 + Schiphol', label: 'gemeenten met actieve ZE-zone' },
  ],

  closingHeadline:
    'De vrachtwagenheffing komt sowieso. Jij bepaalt of AI \'m opvangt.',
  closingSub:
    'Plan een vrijblijvend gesprek. We kijken samen naar ritkosten, planning, chauffeursacquisitie of rapportage — en benoemen concreet waar jij cent-per-km kan winnen.',
};

const Transport = () => {
  useEffect(() => {
    document.title = 'AI voor Nederlandse Transport & Logistiek | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AI voor Nederlandse transport- en logistiekbedrijven. Ritoptimalisatie, chauffeursacquisitie, tachograaf-analyse, CSRD-rapportage. Compenseer de vrachtwagenheffing.'
      );
    }
  }, []);

  return <VerticalPage config={transportConfig} />;
};

export default Transport;
