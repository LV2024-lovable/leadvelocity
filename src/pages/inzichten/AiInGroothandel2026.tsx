import React from 'react';
import BlogPost, { BlogPostConfig } from '../../components/BlogPost';
import { getRelated } from '../../data/blogPosts';

const config: BlogPostConfig = {
  slug: 'ai-in-nederlandse-technische-groothandel-2026',
  title: 'AI in de Nederlandse Technische Groothandel in 2026',
  subtitle:
    'Waar de marge lekt, welke AI-toepassingen bewezen werken, en wat technische groothandels die vooruit willen nu moeten doen.',
  category: 'Groothandel',
  publishedAt: '20 april 2026',
  readingMinutes: 8,
  metaDescription:
    'Uitgebreide analyse van AI-kansen voor Nederlandse technische groothandels. Inkoop, pricing, quote-automatisering en pipeline-scoring met bewezen ROI-cijfers.',

  intro: (
    <>
      De Nederlandse technische groothandel staat onder druk vanuit twee kanten. Aan de bovenkant leveren fabrikanten steeds vaker direct aan eindklant (D2C). Aan de onderkant pakken Amazon Business en Chinese B2B-platforms marktaandeel op prijs-gevoelige transacties. En middenin staat jullie binnendienst nog PDF-bestellingen over te tikken in Excel. Dit is waar AI géén hype is — waar het verschil maakt tussen concurreren of ingehaald worden.
    </>
  ),

  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'De cijfers die het momentum bepalen',
    },
    {
      type: 'paragraph',
      content:
        'Voordat we naar use-cases kijken, eerst de context. Evofenedex onderzocht in 2025 ongeveer 300 handels- en logistiekbedrijven. 60% toonde interesse in AI. Maar slechts 7% had concreet AI-beleid, en 42% had interne data op orde. Dat is het gat waar technische groothandels nu aan het juiste einde van willen staan.',
    },
    {
      type: 'stat-row',
      stats: [
        { value: '60%', label: 'NL handels-/logistiekbedrijven ziet AI-kansen' },
        { value: '7%', label: 'heeft concreet AI-beleid' },
        { value: '42%', label: 'heeft interne data op orde' },
      ],
    },
    {
      type: 'paragraph',
      content:
        'De bedrijven die nu bewegen winnen op twee fronten tegelijk: ze bouwen voorsprong op én ze ontsnappen aan de gemiddelde-MKB-val. Want tegenover deze adoptie-realiteit staat een andere: 74,4% van NL MKB gebruikt al AI in een of andere vorm (Sharp, 2025). Het verschil tussen "AI gebruiken" (ChatGPT openen) en "AI inzetten als bedrijfscapaciteit" is groot — en precies waar wij ons op richten.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Waar de marge lekt in 2026',
    },
    {
      type: 'paragraph',
      content:
        'De typische NL technische groothandel van €30M omzet heeft deze structurele marge-lekken:',
    },
    {
      type: 'list',
      items: [
        <><strong>Pricing op long-tail SKU\'s</strong> die 3+ jaar niet herzien is — vaak 1-2% marge gelaten.</>,
        <><strong>RFQ-turnaround van 3-5 dagen</strong> door handmatig werk — concurrent met AI doet 24 uur en wint ~50% vaker.</>,
        <><strong>Inkoop op gut feel</strong> met 15-20% dead stock en regelmatig nee-verkoop op runners — werkkapitaal vastgezet.</>,
        <><strong>Binnendienst-tijd</strong> op handmatige orderinvoer en productvragen — senior productspecialisten besteden 40% tijd aan routine.</>,
        <><strong>Ondergeleverde klanten</strong> die jullie al kennen maar waarvan potentieel onzichtbaar is zonder data-analyse.</>,
      ],
    },

    {
      type: 'callout',
      title: 'Wat dit concreet betekent',
      content: (
        <>
          McKinsey documenteerde bij een anonieme industriële distributeur <strong>$2 miljard aan "white-space leads"</strong> — ondergeleverde klanten in hun bestaande portfolio, geïdentificeerd via GenAI in 6 weken. Binnen 4 weken leverde dit $1,8M aan quotes bij 45.000 klanten op. Geen nieuwe klanten zoeken — beter benutten wat je al hebt.
        </>
      ),
    },

    {
      type: 'heading',
      level: 2,
      content: 'De vier AI-kansen die nú rendement leveren',
    },
    {
      type: 'paragraph',
      content:
        'We onderzochten welke AI-toepassingen bij technische groothandels van €10-100M omzet binnen één kwartaal aantoonbare ROI leveren. Dit is de shortlist — gerangschikt op snelheid van terugverdienen:',
    },

    {
      type: 'heading',
      level: 3,
      content: '1. Quote/RFQ-automatisering (time-to-value: 4-8 weken)',
    },
    {
      type: 'paragraph',
      content:
        'Klant-RFQ komt binnen als e-mail, PDF of via webshop. AI leest de aanvraag, matcht met je catalogus, berekent staffel-pricing, en stelt de offerte op. Turnaround daalt van 3-5 dagen naar 4-8 uur — volgens distributie-benchmarks tot 93% sneller. First-responders winnen significant vaker; je binnendienst komt toe aan vragen waar expertise telt.',
    },

    {
      type: 'heading',
      level: 3,
      content: '2. AI-pricing op long-tail SKU\'s (time-to-value: 12-20 weken)',
    },
    {
      type: 'paragraph',
      content:
        'De grootste marge-hefboom. McKinsey documenteerde bij een B2B-distributeur van $15 miljard een marge-uplift van 2 procentpunten over 1,5 miljoen SKU\'s via AI price advisor. Bij Turtle (Amerikaanse elektro-distributie): +1,3 procentpunt marge, en pricing-snelheid 98% sneller, allemaal binnen 12 weken. Voor een €30M-groothandel met 27% brutomarge betekent +1,5 procentpunt een structurele €450k extra marge — elk jaar.',
    },

    {
      type: 'heading',
      level: 3,
      content: '3. Binnendienst-AI (time-to-value: 3-6 weken)',
    },
    {
      type: 'paragraph',
      content:
        'Een AI-assistent die in Outlook, Teams of op je intranet leeft en bij elke klantvraag direct het juiste product, de specs en vergelijkbare alternatieven levert. Senior productspecialisten winnen 30-40% van hun tijd terug. Nog belangrijker: junior-medewerkers zijn in 6 weken productief in plaats van 6 maanden. Dat is cruciaal nu 68% van NL technische bedrijven personeelstekort ervaart.',
    },

    {
      type: 'heading',
      level: 3,
      content: '4. Pipeline-scoring & white-space (time-to-value: 8-12 weken)',
    },
    {
      type: 'paragraph',
      content:
        'AI identificeert welke van je bestaande klanten ondergeleverd zijn op welke productgroepen. Accountmanagers krijgen een concrete upsell-lijst per maand in plaats van te gokken. McKinsey-benchmark: revenue uplift van 3-15%, sales-ROI-uplift 10-20%. Dit is jouw bestaande klantenbestand beter benutten — geen nieuwe acquisitie nodig.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Waarom deze vier werken — en andere niet (nog)',
    },
    {
      type: 'paragraph',
      content:
        'Het kernpatroon: ze werken allemaal met data die je al hebt (ERP-historie, offerte-log, klant-orderpatroon) en leveren resultaat op een KPI die je al dagelijks meet (marge, conversie, cycle-time). Je hoeft er geen nieuw systeem voor te implementeren, je vervangt je ERP niet, en je team hoeft niet een nieuwe applicatie te leren.',
    },
    {
      type: 'paragraph',
      content:
        'Complexere use-cases — IoT-gedreven voorraadoptimalisatie, autonoom orderen, cross-brand dynamic pricing — zijn technisch prachtig maar vragen 12-18 maanden en vaak datamaturiteit die de meeste MKB-groothandels nog niet hebben. Wij adviseren: start met de snelle winnaars, bouw vertrouwen, en trek de data-infrastructuur op terwijl je resultaat boekt.',
    },

    {
      type: 'heading',
      level: 2,
      content: 'Wat dit betekent voor jouw 2026',
    },
    {
      type: 'paragraph',
      content:
        'Het opdelen van AI-adoptie in fases is realistisch én nodig. Een volgorde die we aanraden:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        <><strong>Kwartaal 1 — Quick Win:</strong> Quote-automatisering óf binnendienst-AI. Laag risico, snel zichtbaar resultaat, draagvlak binnen team.</>,
        <><strong>Kwartaal 2 — Anchor project:</strong> AI-pricing op core-SKU\'s. Hier zit de grote marge-winst. Bouwt voort op vertrouwen uit kwartaal 1.</>,
        <><strong>Kwartaal 3 — Pipeline:</strong> White-space-detection op bestaand klantenbestand. Commerciële team krijgt concrete upsell-lijst.</>,
        <><strong>Kwartaal 4 — Consolideren:</strong> Demand forecasting, reorder-automatisering. De zware operationele use-cases.</>,
      ],
    },

    {
      type: 'callout',
      title: 'Subsidie-tip voor 2026',
      content: (
        <>
          AI-ontwikkelingsprojecten zijn vaak WBSO-eligible. Het WBSO-budget 2026 bedraagt €1,817 miljard met <strong>36% aftrek</strong> op de eerste €391.020 aan R&D-kosten. Dat is effectief 20-30% korting op projectkosten voor jou. Weinig agencies noemen dit — wij wel, omdat het substantieel scheelt.
        </>
      ),
    },

    {
      type: 'heading',
      level: 2,
      content: 'De kernvraag',
    },
    {
      type: 'paragraph',
      content:
        'De vraag is niet óf jullie technische groothandel AI inzet. De vraag is: welke van je concurrenten doet het eerst, en hoeveel voorsprong heeft hij voordat jij inhaalt? 50% van GenAI-projecten wordt gestaakt — meestal door verkeerde scope en te groot beginnen. Wie pragmatisch begint met quote-automatisering of binnendienst-AI heeft over 6 maanden een werkende case, data-vertrouwen en een team dat AI niet langer eng vindt. Dat is een voorsprong die zich stapelt.',
    },
  ],

  keyTakeaways: [
    'NL technische groothandel ligt onder druk door D2C, Amazon Business en Chinese platforms — margebehoud vraagt om AI.',
    'Slechts 7% van NL handels- en logistiekbedrijven heeft concreet AI-beleid — je kunt nu voorsprong opbouwen.',
    'Vier AI-kansen die binnen 2026 aantoonbare ROI leveren: quote-automatisering, AI-pricing, binnendienst-AI, pipeline-scoring.',
    'Begin niet groot. Begin met één use-case waar ROI binnen 60-90 dagen zichtbaar is.',
    'WBSO 2026 maakt AI-ontwikkelingsprojecten ~30% goedkoper via R&D-aftrek.',
  ],

  relatedPosts: getRelated('ai-in-nederlandse-technische-groothandel-2026'),

  ctas: {
    heading: 'Waar zit de grootste AI-kans bij jullie groothandel?',
    body: 'Kies zelf hoe ver je nu wilt gaan — van verdiepen tot direct starten met een concrete AI-toepassing.',
    hot: {
      href: '/#contact',
      label: 'Start een AI Ops Audit',
    },
    warm: {
      href: '/#contact',
      label: 'Plan een 30-min kennismaking',
    },
    cold: {
      href: '/whitepapers/ai-in-technische-groothandel-2026',
      label: 'Download eerst de whitepaper',
    },
  },
};

const AiInGroothandel2026 = () => <BlogPost config={config} />;
export default AiInGroothandel2026;
