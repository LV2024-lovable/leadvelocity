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
    'Wij helpen Nederlandse transport- en logistiekbedrijven AI inzetten waar het direct op cent-per-km bijt — van snelle automatiseringen voor de planner tot zwaardere oplossingen voor routing en CSRD.',
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
        'Gemiddeld €0,19 per gereden kilometer extra. Voor een gemiddelde vrachtwagen van 100.000 km/jaar: €19.000 extra kosten. AI-routeoptimalisatie levert direct compensatie.',
    },
    {
      title: 'Chauffeurstekort structureel',
      description:
        '6.800 openstaande vacatures op ~92.000 actieve chauffeurs. EU-breed 426.000 onvervulde HGV-posities. AI ondersteunt selectie, matching en retentie.',
    },
    {
      title: 'ZE-zones sinds 2025, CSRD vanaf 2027',
      description:
        'Grote verladers vragen nu al CSRD-ketendata. Planning, vlootinzet en rapportage worden complexer per dag.',
    },
    {
      title: 'TMS-legacy en gefragmenteerde data',
      description:
        'Transpas, Carlo, Plan&Go, PTV, Simacan. On-board computers van Trimble, Webfleet, FleetGO, Volvo Dynafleet. AI heeft geen rip-and-replace nodig.',
    },
    {
      title: 'Beladingsgraad en empty running',
      description:
        'Nederlandse vrachtwagens rijden gemiddeld ~30% leeg. Elk procentpunt beter is een cent per km. AI op load-planning haalt structureel pp\'s erbij.',
    },
    {
      title: 'Planner is overbelast, doet reactief werk',
      description:
        'Elke storing (vertraging, no-show, uitval) drukt direct op de planner. Handmatig puzzelen met charters, rij-rusttijd en klantafspraken. AI neemt de rekenkracht over.',
    },
  ],

  quickWinsHeadline:
    'Laagdrempelige automatiseringen — direct tijdwinst voor planner en admin.',
  quickWinsIntro:
    'Kleinere automatiseringen die de planner ontlasten, admin-werk wegnemen en data doorzoekbaar maken. Goede opstap naar diepere transport-AI-trajecten.',
  quickWins: [
    {
      title: 'Voice-to-CRM notities',
      description:
        'Chauffeurs en buitendienst dicteren; notities staan direct in CRM. Geen administratieve achterstand meer na lange dag onderweg.',
      duration: '1-2 weken',
    },
    {
      title: 'Document-OCR naar TMS/ERP',
      description:
        'CMR, vrachtbrieven, douane-documenten en facturen automatisch uitgelezen. Admin-werklast drastisch omlaag.',
      duration: '2-3 weken',
    },
    {
      title: 'WhatsApp auto-responder',
      description:
        'Klant vraagt "waar is mijn zending?" — AI geeft 24/7 automatisch antwoord. Planner wordt niet meer afgeleid door routine-vragen.',
      duration: '2-3 weken',
    },
    {
      title: 'Meeting Intelligence',
      description:
        'Klant-meetings en interne syncs automatisch samengevat. Actiepunten in CRM, geen handmatig notuleren meer.',
      duration: '1-2 weken',
    },
    {
      title: 'Nieuws & signaal-monitor',
      description:
        'Sector-nieuws (vrachtwagenheffing, ZE-zones, CSRD-updates) automatisch verzameld en naar directie gestuurd. Altijd als eerste op de hoogte.',
      duration: '1 week',
    },
    {
      title: 'Automated reporting',
      description:
        'Wekelijkse dashboards met cent-per-km, beladingsgraad, brandstofverbruik. Automatisch uit TMS/FMS-data, geen handmatige Excel-pulls.',
      duration: '2-3 weken',
    },
  ],

  sectorSolutionsHeadline:
    'Diepere oplossingen, specifiek voor transport en logistiek.',
  sectorSolutionsIntro:
    'Wanneer Quick Wins draaien en data-infrastructuur staat, bouwen we diepere oplossingen die structureel impact hebben op marge, planning en compliance.',
  sectorSolutions: [
    {
      title: 'Planner Copilot',
      tagline: 'Planner-rekenkracht 10x',
      description:
        'AI-assistent naast de planner: "kan deze rit erbij?", ritcombinaties, rij/rusttijd-constraints, charter-voorstellen. Planner houdt regie, AI doet rekenpuzzel.',
      bullets: [
        'Integreert met Transpas, Carlo, Plan&Go, PTV',
        'Real-time ritcombinaties en alternatieven',
        'Rij- en rusttijd-constraints ingebakken',
        'Planner-uren dalen, capaciteit stijgt',
      ],
    },
    {
      title: 'Fuel Coaching Engine',
      tagline: 'Brandstofbesparing per chauffeur',
      description:
        'FMS-data per chauffeur wordt vergeleken met peers op identieke ritten. Gepersonaliseerde coaching, wekelijkse rankings, structurele 2-4% brandstofbesparing.',
      bullets: [
        'Webfleet, Trimble, FleetGO, Volvo Dynafleet ondersteund',
        'Per-chauffeur coaching-dashboard',
        'Gamification optioneel',
        'Brandstof = 20-25% kostenbasis — directe marge-winst',
      ],
    },
    {
      title: 'CSRD-rapport Generator',
      tagline: 'Scope-3 automation per klant',
      description:
        'Tachograaf + FMS + TMS-data worden samengebracht in klant-specifieke CSRD-rapportages. Van 30-40 uur handmatig werk naar 2-4 uur review per maand.',
      bullets: [
        'Elke verlader krijgt eigen template',
        'Scope-3 emissies per zending automatisch berekend',
        'Contract-behoud bij grote verladers',
        'Audit-proof, CE Delft-factoren',
      ],
    },
    {
      title: 'Charter-matching Assistent',
      tagline: 'Slimmer uitbesteden, lagere kosten',
      description:
        'AI stelt charter-combinaties voor op basis van ritprofiel, certificeringen (ADR, koel), historische prestatie en tarief. Planner bespaart belrondes, marge stijgt.',
      bullets: [
        'Charter-netwerk matching op ritvereisten',
        'Historische prestatie per partner',
        'Automatische tarief-benchmarking',
        'Minder ad-hoc dure spot-charters',
      ],
    },
  ],

  tier3Hint:
    'Voor transporteurs die hun hele route-operatie AI-gedreven willen maken of een volledige CSRD-automation-pipeline willen, hebben we zwaardere anchor-projecten. Die bespreken we in een persoonlijk gesprek — vloot-omvang en TMS-stack bepalen of het past.',

  scenario: {
    headline:
      'Wat AI oplevert bij een 120-wagen-transporteur.',
    company:
      'Pallet-distributeur, 180 FTE, 120 vrachtwagens, €25M omzet. Gemiddelde kosten ~€1,40/km, marge 6,5%. Rijdt 12M km per jaar, ~20% van kosten is brandstof.',
    before:
      'Planners optimaliseren op ervaring + Excel. Geen zicht op chauffeurs-verschillen in brandstofverbruik. CSRD-aanvragen van topklant kosten elke maand handwerk. Vrachtwagenheffing 2026 komt eraan.',
    after:
      'Planner Copilot helpt bij rit-combinaties. Fuel Coaching per chauffeur levert meerdere procenten brandstofreductie. CSRD-rapportage is geautomatiseerd. Charter-matching wijst slimmere combinaties.',
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
        'AI voor Nederlandse transport- en logistiekbedrijven. Van laagdrempelige automatiseringen voor planner en admin tot diepere oplossingen voor routing, fuel en CSRD.'
      );
    }
  }, []);

  return <VerticalPage config={transportConfig} />;
};

export default Transport;
