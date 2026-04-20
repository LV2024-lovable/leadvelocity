import React from 'react';
import BlogPost, { BlogPostConfig } from '../../components/BlogPost';
import { getRelated } from '../../data/blogPosts';

const config: BlogPostConfig = {
  slug: 'ai-pricing-voor-groothandel',
  title: 'Van Excel-pricing naar AI: +130-200 bps marge zonder je ERP te vervangen',
  subtitle:
    'AI-pricing is de snelste marge-hefboom voor technische groothandels. Hoe het werkt, wat het oplevert, en waarom je niets hoeft te vervangen.',
  category: 'Groothandel',
  publishedAt: '20 april 2026',
  readingMinutes: 7,
  metaDescription:
    'Hoe AI-pricing werkt voor technische groothandels. Bewezen 130-200 basispunten brutomarge extra, zonder ERP-vervanging, live in 12 weken.',

  intro: (
    <>
      De meeste Nederlandse technische groothandels hebben hun pricing al jaren niet serieus herzien. Core-SKU's krijgen af en toe een update; de long-tail (vaak 80% van de artikelen) hangt op prijzen uit 2022 of eerder. Elke onderhandeling is een ad-hoc korting. Elke marge-evaluatie komt pas bij de kwartaalrapportage. AI-pricing verandert dat — en levert structurele marge-uplift in weken, niet in kwartalen.
    </>
  ),

  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'Waarom pricing nu de grootste marge-hefboom is',
    },
    {
      type: 'paragraph',
      content:
        'In een markt waar Amazon Business 19% van de Europese B2B e-commerce pakt en Chinese platforms openlijk onder jouw prijs leveren, is één procentpunt extra brutomarge meer waard dan ooit. Alleen — handmatig pricen op 25.000 SKU\'s met wekelijkse herijking is onmogelijk. Dus blijft het bij Excel-lijsten uit 2022, aangevuld met "gevoel" van de binnendienst.',
    },
    {
      type: 'stat-row',
      stats: [
        { value: '+130-200 bps', label: 'brutomarge via AI-pricing in B2B-distributie' },
        { value: '98%', label: 'snellere pricing-cyclus (Turtle-case, US elektro-distributie)' },
        { value: '12 wk', label: 'tot productie-launch bij typische implementatie' },
      ],
    },
    {
      type: 'paragraph',
      content:
        'McKinsey documenteerde bij een B2B-distributeur van $15 miljard een marge-uplift van 200 basispunten over 1,5 miljoen SKU\'s. Agentic AI-laag erbovenop leverde 50 bps extra binnen 10 weken. Turtle — een Amerikaanse elektro-distributeur — implementeerde Infor\'s AI-pricing in 12 weken en zag 130 basispunten marge en 98% snellere item-pricing. Wilbur-Ellis (Amerikaanse landbouw-distributie) behaalde 2% marge-winst op 6.000+ SKU\'s via PROS Gen IV AI.',
    },

    {
      type: 'callout',
      title: 'Wat dit concreet betekent voor €30M-groothandel',
      content: (
        <>
          Typische NL technische groothandel: €30M omzet, 27% brutomarge. +150 basispunten = <strong>+€450.000 jaarlijkse brutomarge</strong> bij gelijke volume. Dat is pure winst — geen nieuwe klanten, geen extra personeel. De rekensom voor jullie bedrijf kan overtuigender zijn dan menig salaris-investering.
          </>
      ),
    },

    {
      type: 'heading',
      level: 2,
      content: 'Hoe AI-pricing technisch werkt',
    },
    {
      type: 'paragraph',
      content:
        'Een AI-pricing-systeem bestaat uit drie lagen: data-laag, model-laag, en beslislaag. We lopen door wat elke laag doet.',
    },

    {
      type: 'heading',
      level: 3,
      content: 'Data-laag: waar de informatie vandaan komt',
    },
    {
      type: 'paragraph',
      content:
        'De AI heeft input nodig uit jullie bestaande systemen — maar pakt die op een manier die níet interfereert met jullie dagelijkse operatie. Typische bronnen:',
    },
    {
      type: 'list',
      items: [
        <><strong>ERP-historie</strong>: transacties per klant × SKU, inclusief kortingen, volumestaffels en marges (3+ jaar terug).</>,
        <><strong>Offerte-log</strong>: welke offertes gewonnen, verloren, aan welke prijs.</>,
        <><strong>Inkoopprijzen</strong>: actuele kostprijs per SKU (uit ERP of inkoopsysteem).</>,
        <><strong>Concurrent-pricing</strong>: scrapers op Amazon Business, specifieke concurrent-webshops, Chinese platforms voor jullie top-SKU\'s.</>,
        <><strong>Klantsegmentatie</strong>: type, grootte, historische betalingsgedrag.</>,
      ],
    },
    {
      type: 'paragraph',
      content:
        'Belangrijk: dit is alleen lezen. De AI raakt niets aan. We plaatsen een read-only laag op jullie data en bouwen het model daarbovenop.',
    },

    {
      type: 'heading',
      level: 3,
      content: 'Model-laag: wat de AI leert',
    },
    {
      type: 'paragraph',
      content:
        'Het model leert twee dingen tegelijk: welke prijs maximaal verkooptverwachting geeft, en welke marge acceptabel is voor elke combinatie van klanttype, productcategorie en volumestaffels. Belangrijk: dit is geen "één prijs voor iedereen" — AI beveelt prijs aan per klant-SKU-context.',
    },
    {
      type: 'paragraph',
      content:
        'Het model herkent ook patronen die mensen missen: dat klant A een specifieke category gevoeliger is voor prijs dan klant B; dat SKU-X altijd samen gekocht wordt met SKU-Y (cross-sell-kans); dat volumestaffels historisch te los zijn (klanten krijgen korting waar ze niet om vragen).',
    },

    {
      type: 'heading',
      level: 3,
      content: 'Beslislaag: hoe het integreert met jouw team',
    },
    {
      type: 'paragraph',
      content:
        'De AI geeft nooit autonoom een definitieve prijs af in fase 1. Het doet aanbevelingen — in de ERP als suggestie-veld, of in een aparte Pricing Advisor-dashboard. Binnendienst of pricing-manager ziet de AI-aanbeveling, kan vergelijken met huidige prijs, en accepteert of overrule\'t. De AI leert van elke overrule: waarom wijkt de mens af? Over tijd wordt het model daardoor steeds scherper.',
    },
    {
      type: 'paragraph',
      content:
        'Pas nadat het model 90+ dagen bewezen heeft dat accepties-ratio hoog is en marge-impact positief, kan worden overgeschakeld op autonome pricing voor bepaalde categorieën. Dit is géén zwart-doos automation — het is een transparante co-pilot.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Waarom je geen ERP hoeft te vervangen',
    },
    {
      type: 'paragraph',
      content:
        'Dit is de grootste mythe rond AI-pricing: dat je naar SAP moet migreren, of Isah moet vervangen door iets modernere. Klopt niet. AI-pricing werkt als laag náást je ERP — niet erin. Wij lezen uit je bestaande systeem (AFAS, Exact, Isah, Ridder, SAP — maakt niet uit) via een read-only koppeling. De beslissingen worden in jullie bestaande pricing-schermen getoond als suggestie.',
    },
    {
      type: 'paragraph',
      content:
        'Dat betekent: geen migratie-project, geen training op nieuwe software voor je team, geen risico dat iets in je kernoperatie breekt. De ROI-case is: "we leggen een AI-laag bovenop jullie huidige stack, in 12 weken, en jullie team blijft werken zoals gewend." Dat is een enorm verschil met wat de meeste consultancies voorstellen.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Een realistische implementatie-tijdlijn',
    },
    {
      type: 'table',
      headers: ['Week', 'Wat gebeurt', 'Wie zijn betrokken'],
      rows: [
        ['1-2', 'Data-audit: welke data is beschikbaar, van welke kwaliteit, welke gaten', 'Jullie IT/data + ons team'],
        ['3-4', 'Scope-keuze: op welke SKU-set start het model? Meestal top-500 en top-category', 'CRO/pricing-manager + ons'],
        ['5-8', 'Model-training + eerste aanbevelingen live in sandbox', 'Ons team, technisch'],
        ['9-10', 'Pilot met 1-2 binnendienst-medewerkers — feedback loop op accepties', 'Binnendienst + pricing-manager'],
        ['11-12', 'Rollout naar hele binnendienst en productie-gebruik', 'Jullie team'],
      ],
    },

    {
      type: 'heading',
      level: 2,
      content: 'Risico\'s — eerlijk',
    },
    {
      type: 'paragraph',
      content:
        'AI-pricing is geen wondermiddel. Drie scenario\'s waarin het niet of minder goed werkt, zodat je het kan afwegen:',
    },
    {
      type: 'list',
      items: [
        <><strong>Datakwaliteit is catastrofaal slecht.</strong> Als ERP-transacties niet consistent zijn gelabeld, kortingscategorieën ongestructureerd zijn, of grote delen van je SKU-catalogus missing attributes hebben — dan moet je eerst data-opschoning doen. Daarvoor hebben wij een separate korte fase (2-4 weken).</>,
        <><strong>Te klein SKU-volume.</strong> Bij minder dan 1.000 SKU&apos;s en stabiele volumes is de return on effort beperkter. AI-pricing werkt juist door patronen te vinden in grote aantallen transacties.</>,
        <><strong>Strakke B2B-contracten met vaste pricing.</strong> Als 80% van je omzet vastligt in kontractprijzen, is de ruimte voor AI kleiner. Dan is de hefboom vaak sterker in offerte-automatisering of category-management dan in dynamische pricing.</>,
      ],
    },

    {
      type: 'callout',
      title: 'Wanneer AI-pricing niet voor jullie is',
      content:
        'Als je geen data op SKU-niveau hebt, alle pricing vastligt in jaarcontracten, of je totale omzet op minder dan 500 SKU\'s rust — dan is AI-pricing niet waar je moet beginnen. Er zijn dan betere AI-kansen (offerte-automatisering, binnendienst-AI, reorder-optimalisatie). Wij zeggen dat liever eerlijk.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Het juiste moment om te starten',
    },
    {
      type: 'paragraph',
      content:
        'Als je brutomarge de afgelopen jaren onder druk staat, en je pricing-team (als dat al bestaat) het niet bijhoudt, dan is nu het moment. AI-pricing is de meest volwassen AI-use-case in B2B-distributie — niet experimenteel, niet hype. Er zijn tientallen gedocumenteerde cases in Europa en VS met harde cijfers. De vraag is niet "werkt het" — de vraag is "past het bij onze data en volumes".',
    },
    {
      type: 'paragraph',
      content:
        'En met WBSO 2026 (36% aftrek op AI-R&D) is het effectief 20-30% goedkoper dan dezelfde investering in Q4 2025 zou zijn geweest. Het subsidie-klimaat beloont bewegen dit jaar.',
    },
  ],

  keyTakeaways: [
    'AI-pricing levert structureel 130-200 bps brutomarge-uplift — bewezen bij NL/EU/US distributeurs.',
    'Voor een €30M-groothandel met 27% marge = ~€450k extra jaarlijkse marge zonder extra omzet.',
    'Je hoeft geen ERP te vervangen. AI werkt als read-only laag bovenop SAP, AFAS, Isah, Exact, Ridder.',
    'Binnendienst krijgt aanbevelingen, kan overrulen — AI leert van elke overrule. Geen black-box.',
    'Realistische tijdlijn: 12 weken van data-audit tot productie. Niet 12 maanden.',
    'Werkt NIET goed bij slechte datakwaliteit, <1000 SKU\'s, of 80%+ vast-contract-pricing.',
  ],

  relatedPosts: getRelated('ai-pricing-voor-groothandel'),

  ctas: {
    heading: 'Is jullie pricing-data klaar voor AI?',
    body: 'Niet elke groothandel is direct klaar voor AI-pricing. Drie paden, jij kiest wat nu past.',
    hot: {
      href: '/#contact',
      label: 'Plan een pricing-scan',
    },
    warm: {
      href: '/#contact',
      label: 'Plan een kennismaking',
    },
    cold: {
      href: '/whitepapers/ai-in-technische-groothandel-2026',
      label: 'Download de whitepaper',
    },
  },
};

const AiPricingVoorGroothandel = () => <BlogPost config={config} />;
export default AiPricingVoorGroothandel;
