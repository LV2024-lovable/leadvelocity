import {
  Bot,
  MessageSquare,
  Workflow,
  LineChart,
  Phone,
  type LucideIcon,
} from "lucide-react";

export type OplossingSlug =
  | "ai-agenten"
  | "chatbots"
  | "workflows"
  | "dashboards"
  | "voice-agents";

export type SectorExample = {
  sector: "Technische groothandel" | "Maakindustrie" | "Transport & logistiek";
  title: string;
  body: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Oplossing = {
  slug: OplossingSlug;
  title: string;
  pillBadge: string;
  icon: LucideIcon;

  // Hero
  heroH1: string;
  heroH1Accent: string;
  heroSub: string;

  // What is it
  whatTitle: string;
  whatBody: string[];

  // Sector examples
  sectorExamples: SectorExample[];

  // How we build
  howItems: string[];

  // Investment-indicatie (Pilot Build pricing)
  investmentLine: string;

  // FAQ
  faq: FaqItem[];

  // SEO
  metaTitle: string;
  metaDescription: string;
};

export const oplossingen: Record<OplossingSlug, Oplossing> = {
  "ai-agenten": {
    slug: "ai-agenten",
    title: "AI-agenten",
    pillBadge: "Interne AI-assistenten",
    icon: Bot,

    heroH1: "AI-agenten die jullie team",
    heroH1Accent: "versterken, niet vervangen.",
    heroSub:
      "Interne AI-assistenten op jullie productkennis, klantdata en historische offertes. Binnendienst, sales of werkvoorbereiding stelt een vraag — agent antwoordt, met bronverwijzing. Geen ChatGPT-met-een-skin: maatwerk op jullie data en jullie context.",

    whatTitle: "Wat een AI-agent in jullie operatie doet",
    whatBody: [
      "Een AI-agent leest jullie ERP, PIM, datasheets, klantdossiers en historische offertes — en beantwoordt vragen in natuurlijke taal. Niet generieke AI: een assistent die jullie producten, klanten en processen kent.",
      "Voor binnendienst: vragen die nu via 3 collega's en 4 systemen lopen, beantwoordt de agent in 30 seconden met bronverwijzing. Voor sales: pre-call research die nu een uur kost, in een overzicht van 2 minuten.",
      "Wij bouwen, hosten en optimaliseren maandelijks. Geen externe SaaS — jullie data blijft in jullie omgeving of in onze beheerde infrastructuur.",
    ],

    sectorExamples: [
      {
        sector: "Technische groothandel",
        title: "Productkennis-assistent voor binnendienst",
        body: "Datasheets + leverancierscatalogi + historische offertes geïndexeerd. Binnendienst stelt vragen als \"alternatief voor artikel X dat niet leverbaar is\" en krijgt 3 opties met prijs, voorraad en compatibiliteit — inclusief bron.",
      },
      {
        sector: "Maakindustrie",
        title: "Werkvoorbereidingsassistent",
        body: "AI leest tekeningen, historische orders en interne documentatie. Stelt eerste-versie van werkvoorbereiding op (route, materiaal, tijdsinschatting). Engineer controleert en past aan in plaats van vanaf nul te werken.",
      },
      {
        sector: "Transport & logistiek",
        title: "Plannerssupport bij herplanning",
        body: "Bij verstoringen (file, pech, gemiste slot) berekent de agent binnen seconden alternatieven inclusief impact op klanten en chauffeurs. Planner besluit, agent voorbereidt.",
      },
    ],

    howItems: [
      "Wij scopen de eerste agent in een AI Ops Audit (€2.500, 2 weken)",
      "Pilot Build: 6-8 weken end-to-end op onze infrastructuur, vaste prijs",
      "Operating Partnership: maandelijkse optimalisatie + uitbreiding op basis van gebruik",
      "Geen vendor lock-in — code, data en configuratie blijven van jullie",
    ],

    investmentLine:
      "Pilot Build vanaf €12.000 (vaste prijs, 6-8 weken). Audit eerst om de juiste eerste agent te kiezen — €2.500, 2 weken.",

    faq: [
      {
        q: "Is dit niet gewoon ChatGPT met een wrapper?",
        a: "Nee. Een AI-agent zonder toegang tot jullie data, processen en context geeft generieke antwoorden — onbruikbaar voor binnendienst. Wij bouwen op jullie ERP, PIM, klantdata en historische context. De agent kent jullie producten, klanten en regels.",
      },
      {
        q: "Wat als de agent een fout antwoord geeft?",
        a: "Iedere uitspraak komt met bronverwijzing — gebruikers zien waar het antwoord vandaan komt en kunnen verifiëren. In de eerste 90 dagen werken we met mens-in-de-lus: agent stelt voor, mens bevestigt. Pas bij stabiele accuracy boven 95% gaan we selectief autonoom.",
      },
      {
        q: "Hoe gaat dit met onze data-privacy?",
        a: "Jullie data blijft in jullie omgeving of op onze beheerde infrastructuur. Geen training op jullie data door externe partijen. Standaard NDA, GDPR-compliant, AVG-proof.",
      },
      {
        q: "Hoe lang duurt het voor we het kunnen gebruiken?",
        a: "6-8 weken vanaf pilot-start. Audit komt eerst (2 weken) om de juiste eerste agent te kiezen.",
      },
    ],

    metaTitle: "AI-agenten voor binnendienst, sales en werkvoorbereiding — Leadvelocity",
    metaDescription:
      "Interne AI-assistenten op jullie productkennis, klantdata en historische offertes. Voor groothandel, maakindustrie en transport. Pilot vanaf €12.000.",
  },

  chatbots: {
    slug: "chatbots",
    title: "Chatbots & klantenservice",
    pillBadge: "Externe AI-klantcontact",
    icon: MessageSquare,

    heroH1: "Chatbots die klantvragen",
    heroH1Accent: "écht oplossen.",
    heroSub:
      "Externe AI-bots die klant- of installateurvragen 24/7 beantwoorden — met de juiste data uit jullie ERP, productcatalogus of CRM. Niet de generieke FAQ-bot van vroeger: AI die orderstatus, voorraad of artikelvragen direct beantwoordt.",

    whatTitle: "Wat een goede AI-chatbot voor jullie klanten doet",
    whatBody: [
      "Een chatbot die alleen op een FAQ-document is getraind frustreert je klanten. Wat wel werkt: een bot die direct in jullie systemen kijkt — orderstatus uit ERP, voorraad uit PIM, retourbeleid uit jullie eigen documentatie.",
      "Voor klanten: 24/7 beschikbaar, geen wachttijden voor standaardvragen. Voor jullie team: minder tickets met simpele vragen, meer tijd voor klantgesprekken die er toe doen.",
      "Wij bouwen op jullie kanalen: webshop, klantportaal, WhatsApp Business of intranet voor B2B-installateurs.",
    ],

    sectorExamples: [
      {
        sector: "Technische groothandel",
        title: "Klantvraag-routering met concept-antwoord",
        body: "E-mails naar info@ of verkoop@ worden geclassificeerd, verrijkt met ERP-context en doorgestuurd naar de juiste collega — met een concept-antwoord. Voor standaardvragen (voorraad, levertijd, factuurstatus) direct automatisch antwoord.",
      },
      {
        sector: "Maakindustrie",
        title: "Order-status en levertijd-bot voor klanten",
        body: "Klanten en hun inkopers kunnen op je portaal direct vragen \"waar is order X\" en krijgen actuele status uit het ERP — inclusief verwachte leverdatum en eventuele afwijking.",
      },
      {
        sector: "Transport & logistiek",
        title: "Klantstatus-automatisering rond ritten",
        body: "Terugkerende vragen over ETA, ritstatus of factuur worden automatisch beantwoord met de juiste data uit TMS. Planners houden tijd over voor uitzonderingen die echt aandacht nodig hebben.",
      },
    ],

    howItems: [
      "Wij scopen het kanaal en de top-vragen in een AI Ops Audit (€2.500, 2 weken)",
      "Pilot Build: 6-8 weken inclusief integratie met ERP/PIM/CRM",
      "Mens-in-de-lus eerste 90 dagen — bot stelt voor, mens bevestigt",
      "Operating Partnership: maandelijks optimaliseren op basis van gebruikspatronen",
    ],

    investmentLine:
      "Pilot Build vanaf €12.000 (vaste prijs, 6-8 weken). Integratie-complexiteit bepaalt definitieve prijs.",

    faq: [
      {
        q: "Worden klanten niet gefrustreerd door bots?",
        a: "Slechte bots wel. Een bot die direct ERP-data leest en correcte antwoorden geeft, zelfs op complexe vragen, wordt door klanten gewaardeerd — vooral buiten kantooruren. Bij twijfel of grootte-zaak schakelt de bot direct door naar een mens.",
      },
      {
        q: "Hoe voorkomen we hallucinaties?",
        a: "De bot werkt op jullie eigen data, niet op gokwerk. Als de bot het antwoord niet weet, escaleert hij naar een mens met de context al voorbereid. Wij meten accuracy continu en finetunen op basis van feedback.",
      },
      {
        q: "Welke kanalen ondersteunen jullie?",
        a: "Webshop-chat, klantportaal, WhatsApp Business, e-mail-routing. Voice komt apart aan bod (zie Voice-agents). Voor B2B-installateurs vaak via een dedicated portaal.",
      },
      {
        q: "Wat als onze data niet 100% schoon is?",
        a: "Dat is bijna altijd het geval. Wij kiezen tijdens de audit een use-case waar jullie data wél bruikbaar is. Multi-jaar data-cleanup is geen vereiste vooraf.",
      },
    ],

    metaTitle: "AI-chatbots & klantenservice voor B2B — Leadvelocity",
    metaDescription:
      "AI-bots die klantvragen 24/7 beantwoorden met data uit jullie ERP, PIM of CRM. Voor groothandel, maakindustrie en transport. Pilot vanaf €12.000.",
  },

  workflows: {
    slug: "workflows",
    title: "Workflow-automatisering",
    pillBadge: "Procesautomatisering met AI",
    icon: Workflow,

    heroH1: "Workflows die uren werk",
    heroH1Accent: "per dag automatiseren.",
    heroSub:
      "Inkomende RFQ's, offertes, orderverwerking en document-OCR. Wat nu uren per dag kost, automatiseren we tot uitzonderingen — vaak binnen 6-8 weken live op jullie infrastructuur.",

    whatTitle: "Wat workflow-automatisering bij jullie eruit haalt",
    whatBody: [
      "AI-automatisering werkt het beste op terugkerend, gestructureerd werk dat nu te veel handmatig schakelen kost. Het zoetste plekje: 50+ keer per week dezelfde stap, met enkele uitzonderingen die menselijke beoordeling vragen.",
      "Inkomende PDFs, e-mails, RFQ's en orderbevestigingen worden gelezen, geclassificeerd, gematcht aan ERP-artikelen en doorgestuurd voor controle. Het team beoordeelt alleen nog de uitzonderingen — typisch 5-10% van het volume.",
      "Wij bouwen end-to-end: lezen, matchen, schrijven naar ERP, foutmeldingen, dashboard. Eén systeem, vaste prijs, beheerd op onze infrastructuur.",
    ],

    sectorExamples: [
      {
        sector: "Technische groothandel",
        title: "RFQ-interpretatie + alternatief-suggestie",
        body: "Inkomende RFQ's (e-mail, PDF, webformulier) worden gelezen, gematcht aan ERP-artikelen en aangevuld met 2-3 alternatieven bij niet-leverbaar. Binnendienst bevestigt in 5 minuten in plaats van 45.",
      },
      {
        sector: "Maakindustrie",
        title: "Document-OCR voor inkomende orders",
        body: "Inkomende order-PDFs worden automatisch uitgelezen en in ERP gezet — artikelnummers, hoeveelheden, leveradres, bijzonderheden. Binnendienst hanteert alleen de uitzonderingen (~5%).",
      },
      {
        sector: "Transport & logistiek",
        title: "Exception-handling bij vertragingen",
        body: "Vertragingen, gemiste slots of retouren worden automatisch gedetecteerd, samengevat met aanbevolen vervolgactie en doorgestuurd naar de planner — voordat de klant belt.",
      },
    ],

    howItems: [
      "Audit eerst om de hoogst-renderende workflow te kiezen (€2.500, 2 weken)",
      "Pilot Build: 6-8 weken end-to-end inclusief ERP-integratie",
      "Eerste 90 dagen mens-in-de-lus — accuracy meten tegen jullie nulmeting",
      "Daarna selectief autonoom met vangnet-mechanisme",
    ],

    investmentLine:
      "Pilot Build €12.000-€20.000 (vaste prijs). Schaal verhoogt complexiteit; meer documenttypen of meer ERP-velden vraagt meer scope.",

    faq: [
      {
        q: "Onze documenten zijn allemaal anders — werkt dat wel?",
        a: "Ja. Moderne document-OCR + AI-classificatie werkt op variërende lay-outs. We trainen op jullie eigen voorbeelden tijdens de pilot. Bij twijfel escaleert het systeem naar een mens — beter een mens-check dan een fout in ERP.",
      },
      {
        q: "Wat als ERP niet open is voor integratie?",
        a: "We werken naast ERP, niet erin. Lezen via API als beschikbaar, anders via robotica-pad (RPA) of aangeleverde exports. Geen ERP-migratie nodig vooraf.",
      },
      {
        q: "Hoe meten jullie of het werkt?",
        a: "Vooraf nulmeting (2 weken handmatig bijhouden: tijd per stap, fouten, doorlooptijd). Na go-live wekelijks tegen die baseline. Halen we de afgesproken KPI niet, dan herzien we de scope.",
      },
      {
        q: "Wat gebeurt er bij een fout?",
        a: "In productie heeft elk systeem een vangnet: lage-confidence-cases gaan naar een mens, foutmeldingen worden gelogd en wekelijks gereviewed. Geen autonome run zonder rolback-plan.",
      },
    ],

    metaTitle: "Workflow-automatisering met AI — Leadvelocity",
    metaDescription:
      "RFQ's, offertes, document-OCR en orderverwerking automatiseren. End-to-end gebouwd, vaste prijs, op onze infrastructuur. Pilot vanaf €12.000.",
  },

  dashboards: {
    slug: "dashboards",
    title: "Operations-dashboards",
    pillBadge: "Live operationeel inzicht",
    icon: LineChart,

    heroH1: "Eén live view",
    heroH1Accent: "over jullie operatie.",
    heroSub:
      "ERP, webshop, Excel en finance samengebracht in één dashboard. Marge per artikel, voorraad per locatie, OEE per machine, ritten-KPI per planner — zonder wekelijkse export-fest. Jullie data, real-time gevisualiseerd.",

    whatTitle: "Wat een goed operations-dashboard voor jullie doet",
    whatBody: [
      "De meeste MKB-bedrijven hebben hun data — ERP, webshop, Excel-shadow-systemen, financieel pakket. Ze hebben alleen niet één plek om alles tegelijk te zien. Het gevolg: management beslist op gevoel, en KPI's verschijnen pas in maandrapporten als het te laat is.",
      "Wij bouwen één gehoste view: data uit alle bronnen samengevoegd, geüpdatet in real-time of dagelijks, met filters op sector, klant, regio of medewerker. Niet een mooi-PowerBI-rapport — een live operational dashboard.",
      "AI-laag erop: anomalie-detectie (\"voorraad daalt sneller dan normaal\"), voorspellingen (verwachte marge komende maand), alert-routing naar verantwoordelijken.",
    ],

    sectorExamples: [
      {
        sector: "Technische groothandel",
        title: "Live marge per artikelgroep en klant",
        body: "Inkoopprijzen + verkoopprijzen + kortingsstructuur + retouren samengevoegd. Direct zichtbaar welke artikelgroepen op marge eroderen, welke klanten te veel korting krijgen, welke leveranciers prijzen verhogen.",
      },
      {
        sector: "Maakindustrie",
        title: "OEE-dashboard met afwijking-alerts",
        body: "Machine-uptime, doorlooptijd, kwaliteitscijfers per lijn. AI signaleert afwijkingen voordat ze een productiestop worden. Eén view voor productieleider, één view voor directie.",
      },
      {
        sector: "Transport & logistiek",
        title: "Beladingsgraad en KPI-bewaking per planner",
        body: "Beladingsgraad per rit, kilometers leeg/vol, wachttijd per locatie, on-time-delivery per klant. AI signaleert structurele patronen — bv. een bepaalde klant met steeds te lange laadtijden.",
      },
    ],

    howItems: [
      "Audit eerst om de top-3 KPI's en data-bronnen te bepalen (€2.500, 2 weken)",
      "Pilot Build: 6-8 weken inclusief data-integratie en eerste dashboards",
      "Hosted op onze infrastructuur — geen eigen IT-belasting",
      "Operating Partnership: maandelijkse uitbreiding op basis van waar jullie naar willen kijken",
    ],

    investmentLine:
      "Pilot Build €15.000-€20.000 (vaste prijs). Aantal data-bronnen en complexiteit van integratie bepaalt prijs.",

    faq: [
      {
        q: "We hebben al PowerBI / Tableau — wat voegen jullie toe?",
        a: "PowerBI is een rapport-tool. Wij bouwen een operational dashboard met AI-laag — anomalie-detectie, voorspellingen, alerting naar verantwoordelijken. Plus: één view samengesteld over al jullie systemen, niet een rapport per data-bron.",
      },
      {
        q: "Onze data zit op 5 verschillende plekken. Werkt dat?",
        a: "Ja, dat is juist de hele waarde. ERP + webshop + Excel + finance + CRM samengebracht is wat een operations-dashboard zo waardevol maakt. Wij integreren dat tijdens de pilot.",
      },
      {
        q: "Hoe vaak wordt de data ververst?",
        a: "Afhankelijk van de bron. Voor real-time data (ERP, webshop) typisch elke 5-15 minuten. Voor zwaardere bronnen (finance, KPI-rollups) dagelijks. Wij stemmen dat tijdens de pilot af op jullie behoefte.",
      },
      {
        q: "Wie hosten jullie het op?",
        a: "Onze beheerde infrastructuur (Supabase + AWS-onderlaag, EU-region). Geen extra IT-belasting voor jullie team. Inclusief monitoring, backups, security-patches.",
      },
    ],

    metaTitle: "Operations-dashboards voor MKB met AI — Leadvelocity",
    metaDescription:
      "ERP, webshop, Excel en finance in één live view met AI-anomaliedetectie. Voor groothandel, maakindustrie en transport. Pilot vanaf €15.000.",
  },

  "voice-agents": {
    slug: "voice-agents",
    title: "Voice-agents",
    pillBadge: "Telefonische AI",
    icon: Phone,

    heroH1: "Telefonische AI —",
    heroH1Accent: "schaarse capability in NL.",
    heroSub:
      "AI-voice-agents voor inbound-triage en outbound-campagnes. Een schaarse kunde in Nederland waar wij actief mee bouwen. Voor klantenservice, scheduling, after-sales-checks of outbound-bevestigingen.",

    whatTitle: "Wat een voice-agent in jullie operatie kan doen",
    whatBody: [
      "Voice is de moeilijkste AI-modaliteit. Latency, dialect, achtergrondgeluid en vlot gesprek voeren — daar lopen de meeste partijen op vast. Wij bouwen voice-agents die in NL-zakelijk zinvol functioneren, niet alleen in een demo werken.",
      "Inbound: triage van binnenkomende calls — \"voor welke afdeling? voor welke klant? wat is de urgentie?\" — direct geclassificeerd en doorverbonden, met de context al bij de medewerker. Outbound: bevestiging van afspraken, after-sales-check, no-show-recovery.",
      "Wij raden af om voice-agents in te zetten voor complex eerstelijns-klantcontact. Wel sterk voor scheduling, status-updates, eenvoudige verificatie en routing.",
    ],

    sectorExamples: [
      {
        sector: "Technische groothandel",
        title: "Inbound-call-triage en order-status",
        body: "Bij belangrijke binnenkomende calls (klant belt over orderstatus): voice-agent identificeert klant, leest orderstatus uit ERP, geeft direct antwoord — of routeert door naar binnendienst met de context voorbereid.",
      },
      {
        sector: "Maakindustrie",
        title: "After-sales-callcheck",
        body: "Outbound: 30 dagen na oplevering belt voice-agent klanten met 3 vragen over functioneren. Antwoorden in CRM. Service-team belt alleen klanten met flagged-antwoorden.",
      },
      {
        sector: "Transport & logistiek",
        title: "Outbound-bevestiging van afleveringen",
        body: "Voor B2C-laatste-mijl-leveringen: voice-agent belt voorafgaand aan afleverwindow ter bevestiging. Reduceert no-shows en gemiste afspraken zonder dat planning telkens manueel moet bellen.",
      },
    ],

    howItems: [
      "Audit eerst om geschikte use-case te kiezen — voice is niet voor alles (€2.500, 2 weken)",
      "Pilot Build: 8-10 weken vanwege voice-complexiteit (latency, dialect, training)",
      "Eerste maand mens-in-de-lus + opname-review",
      "Daarna gefaseerd autonoom met vangnet — opname-archief, escalatie-mechanisme",
    ],

    investmentLine:
      "Pilot Build €18.000-€25.000 (vaste prijs). Voice is technisch zwaarder dan tekst-AI — meer scope, meer testtijd.",

    faq: [
      {
        q: "Klinkt het als een robot?",
        a: "Moderne voice-modellen klinken inmiddels heel natuurlijk. NL-zakelijk, vlot, met natuurlijke pauzes. Wij testen extensief tijdens de pilot — als het robotachtig klinkt voor jullie klanten, gaan we niet live.",
      },
      {
        q: "Mag dit volgens AVG/GDPR?",
        a: "Ja, mits goed ingericht: opname-melding aan begin van gesprek, opt-out-pad, gegevens-verwerkers-overeenkomst, opslag-termijnen vastgelegd. Wij regelen die laag tijdens implementatie. Inclusief AVG-audit-rapport.",
      },
      {
        q: "Wat als de agent vastloopt?",
        a: "Standaard fallback: doorzetten naar mens. We bouwen escalatie-paden voor (a) klant raakt geërgerd, (b) vraag valt buiten scope, (c) technische storing. Geen voice-agent zonder warm overdracht-pad naar mens.",
      },
      {
        q: "Hoe groot moet ons callvolume zijn om dit zinvol te maken?",
        a: "Vuistregel: vanaf ~100 calls/week per use-case wordt het rendabel. Onder dat volume blijft handmatige aanpak goedkoper. We toetsen dit in de audit voordat we een pilot voorstellen.",
      },
    ],

    metaTitle: "Voice-agents — telefonische AI voor MKB — Leadvelocity",
    metaDescription:
      "AI-voice-agents voor inbound-triage en outbound-bevestiging. Voor groothandel, maakindustrie en transport. Pilot vanaf €18.000.",
  },
};

export const oplossingenList: Oplossing[] = [
  oplossingen["ai-agenten"],
  oplossingen["chatbots"],
  oplossingen["workflows"],
  oplossingen["dashboards"],
  oplossingen["voice-agents"],
];
