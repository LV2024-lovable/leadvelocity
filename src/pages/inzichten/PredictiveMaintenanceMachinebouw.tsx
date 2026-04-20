import React from 'react';
import BlogPost, { BlogPostConfig } from '../../components/BlogPost';
import { getRelated } from '../../data/blogPosts';

const config: BlogPostConfig = {
  slug: 'predictive-maintenance-machinebouw',
  title: 'Predictive Maintenance voor NL Machinebouw: wat werkt, wat niet',
  subtitle:
    'Stilstand op een kritische lijn kost duizenden euro\'s per uur. Predictive maintenance werkt — als je het pragmatisch aanpakt. Een realistische gids.',
  category: 'Maakindustrie',
  publishedAt: '20 april 2026',
  readingMinutes: 8,
  metaDescription:
    'Realistische gids voor predictive maintenance in NL-machinebouw. Wat werkt bij MKB, wat werkt niet, hoe je het pragmatisch aanpakt zonder €500k-investering.',

  intro: (
    <>
      Predictive maintenance is de meest gedroomde AI-use-case in maakindustrie — en tegelijk de meest falend uitgevoerde. Verkopers beloven €500k-investeringen, drie jaar implementatietijd en "transformatie van je onderhoudsoperatie". Wat ze vergeten te vertellen: 50% van die projecten wordt gestaakt. Deze gids laat zien hoe het wél werkt, bij MKB-machinebouwers met realistische budgetten en gezond verstand.
    </>
  ),

  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'Wat predictive maintenance eigenlijk doet',
    },
    {
      type: 'paragraph',
      content:
        'Traditioneel onderhoud is óf reactief (kapot = repareren, kost meest) óf preventief (vaste intervallen vervangen, verspilt componenten die nog goed zijn). Predictive maintenance is de tussenweg: vervangen wanneer de data zegt dat een component wordt uitgegeven, nog vóór de storing plaatsvindt.',
    },
    {
      type: 'paragraph',
      content:
        'De mechanica: sensoren op kritische machines meten trillingen, temperatuur, stroomverbruik, akoestische patronen. Een ML-model leert welke combinaties van afwijkingen een voorbode zijn van uitval. Typisch: 2-4 weken vooraf voorspelbaar. Jouw onderhoudsteam krijgt een waarschuwing; ze plannen de onderhoudsstop; de machine valt niet stil.',
    },
    {
      type: 'stat-row',
      stats: [
        { value: '20-40%', label: 'lagere onderhoudskosten (McKinsey)' },
        { value: 'Tot 50%', label: 'minder ongeplande downtime' },
        { value: '10:1 — 30:1', label: 'ROI-ratio bij top-performers (12-18 mnd)' },
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'Wanneer het wél werkt',
    },
    {
      type: 'paragraph',
      content:
        'Predictive maintenance werkt het best bij drie archetypen van MKB-maakbedrijven:',
    },
    {
      type: 'list',
      items: [
        <><strong>Hoge kapitaalintensiteit per machine.</strong> Als één machine €500k-€5M kost en bij uitval tientallen duizenden euro\'s per uur stilstand veroorzaakt, is de ROI-rekensom simpel. Spuitgieters, CNC-frezen, persen — typische kandidaten.</>,
        <><strong>Cyclische, voorspelbare processen.</strong> Machines die dag-in-dag-uit hetzelfde type bewerking doen produceren consistent data. AI leert sneller bij consistente processen dan bij extreem variabel werk.</>,
        <><strong>Bestaande sensordata of eenvoudig toe te voegen.</strong> Sommige machines hebben al een CNC-controller die temperatuur, spindel-load en trilling logged. Bij anderen kan een retrofit van externe sensoren voor €1.000-3.000 per machine. De data-verzameling is vaak geen showstopper.</>,
      ],
    },

    {
      type: 'callout',
      title: 'Realistisch ROI-voorbeeld (scenario, geen klantcijfer)',
      content: (
        <>
          Een 150-FTE machinebouwer heeft 8 kritische assets. Gemiddeld 15 uur ongeplande stilstand per asset per jaar, a €3.000 per uur gevolgschade. Dat is 8 × 15 × 3.000 = <strong>€360.000 directe schade</strong>. Predictive maintenance levert typisch 40% reductie: besparing <strong>€144.000</strong>. Sensor + software + implementatie: ~€80.000 eenmalig + €15.000/jr subscription. Payback binnen 8 maanden, daarna structureel winst.
        </>
      ),
    },

    {
      type: 'heading',
      level: 2,
      content: 'Wanneer het NIET werkt',
    },
    {
      type: 'paragraph',
      content:
        'De eerlijke kant — scenario\'s waarin we vaak teruggeven dat predictive maintenance niet de juiste start is:',
    },
    {
      type: 'list',
      items: [
        <><strong>Veel verschillende machines met weinig exemplaren van elk.</strong> Een maakbedrijf met 50 unieke machines heeft voor elk type onvoldoende data om een goed model te trainen. Dan is algemene anomalie-detectie een beter startpunt dan specifieke uitval-voorspelling.</>,
        <><strong>Machines ouder dan 20 jaar zonder sensordata-optie.</strong> Retrofit is theoretisch mogelijk, maar de kosten lopen snel op naar niveau dat niet rechtvaardigbaar is. Soms is een eenvoudige handmatige logging met AI-analyse een betere tussenweg.</>,
        <><strong>Geen onderhoudscultuur in de organisatie.</strong> Predictive maintenance levert alleen op als je team de waarschuwingen opvolgt. Als onderhoud nu "reactief blussen" is, moet eerst procesverandering plaatsvinden voor AI überhaupt toegevoegde waarde heeft.</>,
        <><strong>Kapitaalintensieve machines met garantie waarbij alleen OEM mag onderhouden.</strong> Dan heeft de OEM-partij de data, niet jij. Werken met hun dashboards is de route.</>,
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'De pragmatische implementatie (jouw 6 maanden)',
    },

    {
      type: 'heading',
      level: 3,
      content: 'Maand 1-2: Kritiekheids-analyse',
    },
    {
      type: 'paragraph',
      content:
        'Niet elk onderhoudsprobleem rechtvaardigt AI. Maak een shortlist: welke machines zorgen voor 80% van jullie downtime-schade? Typisch zijn dit 5-10 assets in een NL-MKB-maakbedrijf. Bepaal voor elk: wat is de gemiddelde uitval-frequentie, wat is de gevolgschade per uur, welke sensors zijn beschikbaar.',
    },

    {
      type: 'heading',
      level: 3,
      content: 'Maand 3: Sensor-retrofit (waar nodig)',
    },
    {
      type: 'paragraph',
      content:
        'Als bestaande sensordata ontoereikend is, installeer externe trilling- en temperatuursensoren. Kosten: €1.000-3.000 per machine inclusief netwerk-connectie. Data stroomt naar een cloud-platform (of on-premise als compliance dat vraagt). Dit is zelden de bottleneck — belangrijker is dat IT-integratie met MES/ERP vooraf is afgesproken.',
    },

    {
      type: 'heading',
      level: 3,
      content: 'Maand 4-5: Model-training + pilot',
    },
    {
      type: 'paragraph',
      content:
        'Het AI-model heeft 4-8 weken "baseline-data" nodig plus historische onderhoudslogs om te leren wat normale patronen zijn en welke afwijkingen voorspellen op uitval. In deze fase gaat het model leren, maar waarschuwingen worden nog niet automatisch naar onderhoud gestuurd — eerst bekijkt een engineer elke voorspelling.',
    },

    {
      type: 'heading',
      level: 3,
      content: 'Maand 6: Productie + feedback-loop',
    },
    {
      type: 'paragraph',
      content:
        'Model staat live, stuurt waarschuwingen naar onderhoudsteam, werkt achterhaalt storingsgeschiedenis zichtbaar in dashboard. Kritisch: elke waarschuwing die door onderhoud niet bevestigd wordt (false positive) of elke storing die gemist wordt (false negative) wordt teruggevoerd naar het model. Over 3-6 maanden wordt het model steeds scherper.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Veel gehoorde bezwaren — en wat we daarop zeggen',
    },

    {
      type: 'quote',
      content:
        '"Onze operators geloven niet in AI-alarms — ze hebben in 20 jaar gevoel ontwikkeld voor deze machines."',
    },
    {
      type: 'paragraph',
      content:
        'Dat gevoel is waardevol, en we vervangen het niet. In fase 1 krijgt de senior-operator de AI-alarm als extra signaal, maar bepaalt zelf of er actie nodig is. Over tijd merken operators dat de AI gevallen vangt die ze zelf hadden gemist (bijv. bij dubbele diensten of vakantie-vervanging). Pas dan wordt de co-existentie vanzelfsprekend.',
    },

    {
      type: 'quote',
      content:
        '"We hebben al een onderhoudsplan — CMMS met geplande intervallen. Waarom AI?"',
    },
    {
      type: 'paragraph',
      content:
        'Preventief onderhoud vervangt componenten die nog 60-80% levensduur over hebben. Dat is verspilling. Predictive vervangt ze wanneer ze werkelijk aan einde zijn. Verschil: 15-25% minder vervangingskosten. Plus: je vangt onverwachte uitval op — die vallen per definitie buiten CMMS-intervallen.',
    },

    {
      type: 'quote',
      content:
        '"Onze IT is al overvraagd. Hoe realistisch is sensor-IoT-integratie?"',
    },
    {
      type: 'paragraph',
      content:
        'Moderne predictive maintenance-stacks draaien op aparte netwerken (edge computing + cloud). IT hoeft nauwelijks betrokken te zijn behalve bij de initiële netwerk-configuratie. De sensor-data hoeft niet je ERP te raken — het model draait apart en levert alerting via SMS/Teams/e-mail. IT-belasting na setup: minimaal.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Budget-benchmark',
    },
    {
      type: 'table',
      headers: ['Asset-count', 'Sensor-investering', 'Software + implementatie', 'Totaal jaar 1'],
      rows: [
        ['3-5 kritieke machines', '€5-15k eenmalig', '€40-80k eenmalig + €10-15k/jr', '€55-110k'],
        ['5-10 kritieke machines', '€15-30k eenmalig', '€70-140k eenmalig + €20-30k/jr', '€105-200k'],
        ['10-20 machines', '€30-60k eenmalig', '€120-220k eenmalig + €30-45k/jr', '€180-325k'],
      ],
    },
    {
      type: 'paragraph',
      content:
        'WBSO 2026 reduceert dit typisch 20-30% doordat R&D-deel (model-training, maatwerk-integratie) aftrekbaar is. Voor MKB-maakbedrijven met €30-50M omzet en 8+ kritische assets is de case financieel vrijwel altijd positief binnen 18 maanden.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Laat niemand je een "digitale-fabriek-transformatie" verkopen',
    },
    {
      type: 'paragraph',
      content:
        'De grootste kostenpost in failed predictive-maintenance-projecten is de scope-inflatie. "Laten we tegelijk ook MES vernieuwen, ERP-integratie aanpakken, CMMS vervangen en een Industry 4.0-hub bouwen." Dat is waar 18-maanden-projecten beginnen die nooit live gaan. Pragmatisch: predictive maintenance is een afgebakend project met één KPI (downtime-uren). Begin daar. De rest komt later — of niet.',
    },
  ],

  keyTakeaways: [
    'Predictive maintenance levert 20-40% lagere onderhoudskosten en tot 50% minder downtime — mits correct toegepast.',
    'Werkt best bij kapitaalintensieve machines met cyclische processen en beschikbare sensordata.',
    'Start met 5-10 kritische assets, niet met heel machine-park. Daar zit 80% ROI.',
    'Realistische tijdlijn: 6 maanden van start tot productie. Realistisch budget: €100-200k jaar 1 voor 5-10 assets.',
    'WBSO 2026 verlaagt kosten structureel met 20-30%.',
    'Vermijd "digitale fabriek"-scope-inflatie. Blijf bij één KPI (downtime) en schaal na bewezen succes.',
  ],

  relatedPosts: getRelated('predictive-maintenance-machinebouw'),

  ctas: {
    heading: 'Welke machines in jullie fabriek rechtvaardigen predictive maintenance?',
    body: 'Drie paden om te ontdekken waar de grootste winst ligt.',
    hot: {
      href: '/#contact',
      label: 'Plan een kritiekheids-scan',
    },
    warm: {
      href: '/#contact',
      label: 'Plan een kennismaking',
    },
    cold: {
      href: '/whitepapers/ai-voor-nederlandse-maakindustrie-2026',
      label: 'Download de whitepaper',
    },
  },
};

const PredictiveMaintenanceMachinebouw = () => <BlogPost config={config} />;
export default PredictiveMaintenanceMachinebouw;
