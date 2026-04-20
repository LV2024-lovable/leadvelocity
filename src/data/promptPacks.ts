// Templates & Prompt Packs — content catalog per vertical.
// Used by the /bronnen hub and /bronnen/prompts/[slug] pages.

export type PromptPack = {
  slug: string;
  vertical: 'Groothandel' | 'Maakindustrie' | 'Transport';
  title: string;
  subtitle: string;
  metaDescription: string;
  category: 'Sales' | 'Operations' | 'Customer Service' | 'Binnendienst';
  prompts: Array<{
    title: string;
    useCase: string;
    prompt: string;
  }>;
  templates: Array<{
    title: string;
    description: string;
  }>;
};

export const promptPacks: PromptPack[] = [
  {
    slug: 'groothandel-prompts-2026',
    vertical: 'Groothandel',
    title: 'AI Prompt & Template Pack — Technische Groothandel',
    subtitle:
      '24 getoetste AI-prompts en 8 templates voor binnendienst, sales en inkoop. Direct inzetbaar in ChatGPT, Claude of jullie eigen stack.',
    metaDescription:
      'Gratis AI-prompts voor technische groothandel: offerte-automatisering, klantanalyse, productvergelijking en meer. 24 prompts + 8 templates.',
    category: 'Binnendienst',
    prompts: [
      {
        title: 'RFQ-interpretatie voor binnendienst',
        useCase: 'Klant stuurt onduidelijke aanvraag; haal eisen gestructureerd eruit',
        prompt: 'Je bent een senior binnendienst-medewerker bij een technische groothandel. Hieronder staat een klantaanvraag. Extraheer: (1) gevraagde producten met hoeveelheden, (2) technische specs, (3) levertijd-eisen, (4) speciale voorwaarden, (5) ontbrekende info die we moeten navragen. Format als Markdown.',
      },
      {
        title: 'Product-alternatief voorstellen',
        useCase: 'Gevraagd product is uit voorraad of te duur',
        prompt: 'Je bent expert technische groothandel. Hieronder specs van product X dat niet beschikbaar is. Stel 3 alternatieven voor, per alternatief: (1) afwijking op specs, (2) prijsverschil-indicatie, (3) beschikbaarheid-assumptie, (4) waarom dit een goed alternatief is. Blijf binnen de productcategorie.',
      },
      {
        title: 'Staffel-offerte opstellen',
        useCase: 'Klant vraagt prijs voor verschillende volumes',
        prompt: 'Stel een staffel-offerte op voor [klant] voor product [X]. Staffels: 10, 50, 100, 500, 1000 stuks. Basis-prijs: [Y]. Hanteer deze kortingslogica: vanaf 50 stuks 3% korting, vanaf 100 stuks 6%, vanaf 500 stuks 10%, vanaf 1000 stuks 12%. Format als nette offerte-tekst in formele stijl.',
      },
      {
        title: 'Ondergeleverde klant-analyse',
        useCase: 'Zoek upsell-kansen in bestaand klantenbestand',
        prompt: 'Analyseer het volgende klant-orderhistorie-overzicht. Voor deze klant: (1) welke productgroepen hebben ze nu, (2) welke productgroepen zijn logische aanvulling gezien hun profiel, (3) waarom is dit relevant nu, (4) welke insteek zou een accountmanager moeten kiezen voor de cross-sell?',
      },
      {
        title: 'Concurrent-prijs-benchmark',
        useCase: 'Vergelijk eigen prijs met online alternatieven',
        prompt: 'Hieronder prijzen van concurrenten voor product [X] in technische groothandel. Analyseer: (1) gemiddelde markt-prijs, (2) waar zitten wij relatief, (3) is onze prijs justifiable op basis van service/snelheid/expertise, (4) aanbeveling voor prijsaanpassing of commerciële argumentatie.',
      },
      {
        title: 'Offerte-follow-up e-mail',
        useCase: 'Offerte is verstuurd, geen reactie na 5 dagen',
        prompt: 'Schrijf een beleefde follow-up-e-mail voor een offerte die 5 dagen geleden is verstuurd aan [klant]. Doel: contact maken zonder opdringerig te zijn. Noem de offerte, vraag of er vragen zijn, bied aan te schakelen over details. Zakelijke toon, kort (maximaal 5 regels).',
      },
      {
        title: 'Productspec-vergelijking',
        useCase: 'Klant vraagt verschil tussen twee vergelijkbare producten',
        prompt: 'Vergelijk product A en product B (specs hieronder). Structureer als: (1) hoofdverschil in 1 zin, (2) per kenmerk tabel met voordeel, (3) welk product voor welk type toepassing, (4) aanbeveling voor specifieke klant-case.',
      },
      {
        title: 'Inkoop-onderhandelingsbrief',
        useCase: 'Leverancier moet prijsverlaging accepteren',
        prompt: 'Stel een zakelijke brief op aan leverancier [X] waarin we een prijsverlaging van [Y]% vragen op product [Z]. Gebruik deze argumenten: (1) volume-groei van [A]% de laatste jaren, (2) concurrentie-druk in onze markt, (3) bewezen betaalgedrag. Toon: constructief, geen ultimatum.',
      },
      {
        title: 'Klant-onboarding-brief',
        useCase: 'Nieuwe klant heeft eerste order geplaatst',
        prompt: 'Schrijf een hartelijke welkomstbrief voor een nieuwe klant van een technische groothandel. Noem: (1) welkomstgebaar, (2) wie is de vaste contactpersoon, (3) handige info over ons portaal/account, (4) uitnodiging om mee te denken over toekomstige behoeften. Persoonlijk, niet corporate.',
      },
      {
        title: 'Productbeschrijving voor webshop',
        useCase: 'Nieuwe SKU, beschrijving nodig',
        prompt: 'Schrijf een productbeschrijving voor webshop (technische groothandel) voor product [X] met specs: [Y]. Format: (1) 1-zin-hoofdverkoopargument, (2) 3-5 bullets met kenmerken, (3) 2 bullets met typische toepassingen, (4) SEO-keywords verwerkt. Nederlandse B2B-stijl.',
      },
      {
        title: 'Klachtafhandeling-concept',
        useCase: 'Klacht over geleverd product',
        prompt: 'Schrijf een concept-reactie op de volgende klacht. Houd rekening met: (1) direct erkennen van de situatie, (2) concrete oplossingsstappen voorstellen, (3) niet defensief zijn, (4) relatie voorop stellen. Professionele toon, empathisch. Klachten-tekst hieronder:',
      },
      {
        title: 'Samenvatting klantgesprek',
        useCase: 'Notities van een klantbezoek moeten naar CRM',
        prompt: 'Vat onderstaand klantgesprek-ruwe-notities samen voor het CRM. Structureer als: (1) Gespreksdatum en -context, (2) Belangrijkste gesprekspunten (max 5 bullets), (3) Afspraken en follow-ups met deadline, (4) Toekomstige kansen of aandachtspunten. Maximaal 200 woorden.',
      },
    ],
    templates: [
      {
        title: 'Offerte-template (Word)',
        description: 'Standaard offerte-sjabloon met staffel-prijzen, levertijd en condities.',
      },
      {
        title: 'RFQ-intake-checklist',
        description: 'Vragen die je binnendienst moet beantwoorden vóór een offerte opgesteld wordt.',
      },
      {
        title: 'Klant-onboarding-brief',
        description: 'Hartelijke welkomstbrief-template voor nieuwe klanten.',
      },
      {
        title: 'Staffel-pricing-calculator (Excel)',
        description: 'Simpele spreadsheet die automatisch staffel-prijzen en marges berekent.',
      },
      {
        title: 'Account-review-template',
        description: 'Kwartaalsjabloon voor account-managers om klantstatus en upsell-kansen vast te leggen.',
      },
      {
        title: 'Concurrent-prijs-monitor',
        description: 'Tabel om concurrent-prijzen op je top-100 SKU\'s bij te houden.',
      },
      {
        title: 'Quality-of-service survey',
        description: 'Klant-tevredenheidsvragenlijst specifiek voor B2B-groothandel.',
      },
      {
        title: 'Supplier-performance-dashboard',
        description: 'Excel-template voor OTIF, kwaliteit en leverancier-scoring.',
      },
    ],
  },

  {
    slug: 'maakindustrie-prompts-2026',
    vertical: 'Maakindustrie',
    title: 'AI Prompt & Template Pack — Maakindustrie',
    subtitle:
      '22 prompts en 7 templates voor werkvoorbereiding, kwaliteit, engineering en shop-floor. Direct inzetbaar in elke AI-assistent.',
    metaDescription:
      'Gratis AI-prompts voor Nederlandse maakbedrijven: nacalculatie, kwaliteitsanalyse, werkvoorbereiding en meer. 22 prompts + 7 templates.',
    category: 'Operations',
    prompts: [
      {
        title: 'Order-margeanalyse',
        useCase: 'Voor- vs nacalculatie van afgeronde order',
        prompt: 'Analyseer het verschil tussen voorcalculatie en nacalculatie van order [X]. Voorcalculatie hieronder, werkelijke urenregistratie en materiaalverbruik daaronder. Benoem: (1) hoofdverschil in procentuele termen, (2) waar zaten de afwijkingen (uren vs materiaal vs omstel), (3) welke aanname was structureel te optimistisch, (4) aanbeveling voor voorcalculatie volgende order.',
      },
      {
        title: 'Werkinstructie-opsteller',
        useCase: 'Nieuwe operator moet machine bedienen',
        prompt: 'Je bent expert werkvoorbereider. Schrijf stap-voor-stap werkinstructie voor machine [X] voor het produceren van product [Y]. Inclusief: (1) voorbereidingen en veiligheidscheck, (2) machine-instellingen per parameter, (3) kwaliteitscontrole-punten, (4) typische afwijkingen en hoe te herkennen, (5) wat te doen bij storingen. Gericht op iemand met 1-2 jaar ervaring.',
      },
      {
        title: 'Storingsanalyse root-cause',
        useCase: 'Machine valt uit, onbekende oorzaak',
        prompt: 'Machine [X] valt structureel uit in het volgende patroon: [hieronder]. Werk als root-cause-analyst: (1) 5 mogelijke oorzaken gesorteerd op waarschijnlijkheid, (2) per oorzaak: test om te verifiëren, (3) welke data zouden we moeten verzamelen, (4) welke 3 bevragingen aan operators kunnen richting geven.',
      },
      {
        title: 'Offerte-berekening engineering-project',
        useCase: 'Klant vraagt maatwerk-offerte',
        prompt: 'Stel een projectcalculatie op voor [projectbeschrijving]. Splits in: (1) engineering-uren per fase, (2) productie-uren per bewerking, (3) materialen en inkoop, (4) marge-opslag. Hou rekening met historisch vergelijkbare projecten en standaard-marges in NL-machinebouw.',
      },
      {
        title: 'Kwaliteits-rapport-generator',
        useCase: 'Klant vraagt kwaliteitsrapport per batch',
        prompt: 'Maak een kwaliteitsrapport voor klant [X] over batch [Y]. Beschikbare data: [hieronder]. Format: (1) samenvatting in 3 zinnen, (2) afwijking per kritieke parameter met tolerantie, (3) grafiek-omschrijvingen (al is de output tekst), (4) eventueel corrigerende acties. Formele toon voor OEM-klant.',
      },
      {
        title: 'Nacalculatie-trigger-mail',
        useCase: 'Werkvoorbereider moet nabespreken met projectleider',
        prompt: 'Schrijf een interne mail van werkvoorbereider naar projectleider over afwijkende nacalculatie van order [X]. Toon: constructief, zakelijk. Inhoud: (1) korte vaststelling afwijking, (2) waarschijnlijke oorzaak, (3) voorstel voor bespreking, (4) vraag om input.',
      },
      {
        title: 'CAD-tekening-interpretatie',
        useCase: 'Engineer moet snel een onbekende tekening begrijpen',
        prompt: 'Vat het volgende CAD-tekening-overzicht samen voor een collega die project moet overnemen. Focus: (1) hoofdfunctie van de samenstelling, (2) kritieke toleranties, (3) lastige bewerkingen, (4) vergelijkbare historische projecten.',
      },
      {
        title: 'Inkoopvraag leveranciers-matching',
        useCase: 'Nieuw materiaal, onbekende leverancier',
        prompt: 'Voor materiaal [X] met specs [Y]: stel 3 geschikte leverancier-categorieën voor in de Nederlandse/Europese markt. Per categorie: (1) type leverancier, (2) typische levertijd, (3) minimale ordergrootte, (4) certificeringen om op te letten, (5) aandachtspunten in offerteaanvraag.',
      },
      {
        title: 'Operator-copilot: machinevraag',
        useCase: 'Operator vraagt assistent iets op shop-floor',
        prompt: 'Je bent een shop-floor copilot voor CNC-operators. De operator stelt de volgende vraag: [vraag]. Antwoord: (1) kort, concreet, stap-voor-stap, (2) gebruik praktische taal (geen jargon tenzij standaard), (3) benoem altijd veiligheidsimplicaties indien relevant, (4) als je niet zeker bent, zeg dat en verwijs naar werkvoorbereider.',
      },
      {
        title: 'Productieplanning-optimizer',
        useCase: 'Werkvoorbereider heeft spoedorder in lopende schema',
        prompt: 'Huidige productieschema hieronder. Nieuwe spoedorder: [details]. Stel 3 integratie-scenario\'s voor: (1) welke lopende order moet herplanden, (2) omsteltijd-impact, (3) doorlooptijd-effect voor andere klanten, (4) aanbeveling met argumentatie.',
      },
      {
        title: 'Veiligheidsincident-rapport',
        useCase: 'Near-miss of kleine incident moet gerapporteerd',
        prompt: 'Schrijf een incidentrapport voor [gebeurtenis] volgens standaard veiligheidsrapportage. Format: (1) tijdstip en locatie, (2) wat er gebeurde, (3) directe oorzaak, (4) dieperliggende oorzaak, (5) corrigerende acties, (6) preventieve acties. Feitelijke, niet-verwijtende toon.',
      },
      {
        title: 'OEE-analyse per kwartaal',
        useCase: 'Management wil OEE-trend begrijpen',
        prompt: 'Analyseer onderstaande OEE-cijfers over Q[X]. Benoem: (1) trend in Availability, Performance, Quality, (2) grootste verliesposten, (3) verband met specifieke productieruns, (4) 3 concrete verbeteracties voor volgend kwartaal.',
      },
    ],
    templates: [
      {
        title: 'Werkinstructie-template',
        description: 'Gestandaardiseerd sjabloon voor nieuwe werkinstructies per machine.',
      },
      {
        title: 'Nacalculatie-Excel',
        description: 'Spreadsheet die voor- en nacalculatie automatisch vergelijkt per order.',
      },
      {
        title: 'Kwaliteitsrapport-sjabloon',
        description: 'Klant-gereed kwaliteitsrapport-template voor OEM-klanten.',
      },
      {
        title: 'FMEA-worksheet',
        description: 'Failure Mode and Effects Analysis template voor risicoanalyse.',
      },
      {
        title: 'OEE-dashboard-template',
        description: 'Excel-dashboard dat OEE per machine en shift visualiseert.',
      },
      {
        title: 'Supplier-performance-scorecard',
        description: 'Leveranciers-evaluatie-template met OTIF en kwaliteits-metrics.',
      },
      {
        title: 'Shop-floor-checklist-app-brief',
        description: 'Kort document om je team uit te leggen hoe ze een shop-floor copilot het beste gebruiken.',
      },
    ],
  },

  {
    slug: 'transport-prompts-2026',
    vertical: 'Transport',
    title: 'AI Prompt & Template Pack — Transport & Logistiek',
    subtitle:
      '20 prompts en 7 templates voor planners, customer service en fleet management. Direct inzetbaar voor NL-transporteurs.',
    metaDescription:
      'Gratis AI-prompts voor NL-transportbedrijven: ritoptimalisatie, customer service, CSRD-rapportage en meer. 20 prompts + 7 templates.',
    category: 'Operations',
    prompts: [
      {
        title: 'Planner-copilot: rit-integratie',
        useCase: 'Planner vraagt of extra rit erbij kan',
        prompt: 'Je bent planner-copilot voor een pallet-distributeur. Huidige rit-planning hieronder. Verzoek: kan extra stop voor [klant] bij [locatie] met [volume] vandaag erbij? Analyseer: (1) beste plek in planning qua tijd en route, (2) impact op andere klanten, (3) rij-rusttijd-implicatie voor chauffeur, (4) aanbeveling met argumentatie.',
      },
      {
        title: 'Klant-communicatie: vertraging',
        useCase: 'Rit heeft vertraging, klanten moeten bericht krijgen',
        prompt: 'Chauffeur rit [X] heeft [Y] uur vertraging door [reden]. Schrijf klant-communicatie voor de [aantal] klanten op de rit. Toon: proactief, eerlijk, oplossingsgericht. Noem verwachte aankomsttijd, mogelijkheid tot omboeking indien van toepassing. Kort en direct.',
      },
      {
        title: 'Spot freight quote',
        useCase: 'Verlader vraagt ad-hoc transport',
        prompt: 'Verlader vraagt spot-transport: [details]. Stel offerte op met: (1) route-berekening, (2) kostprijs-inschatting incl. vrachtwagenheffing, (3) marge-opslag per traject, (4) acceptatie-tarief. Hou rekening met huidige marktspot-niveau en lege km terug.',
      },
      {
        title: 'Ritrendement-analyse',
        useCase: 'COO wil begrijpen welke ritten minder opleveren',
        prompt: 'Hieronder ritdata (km, tijd, omzet, brandstof) van week [X]. Analyseer: (1) top-5 ritten op cent-per-km en bottom-5, (2) patroon in de slechte ritten, (3) oorzaak-analyse (chauffeur, klant, route), (4) concrete actiepunten voor planning.',
      },
      {
        title: 'Chauffeur-vacaturetekst',
        useCase: 'Chauffeur-vacature moet scherp worden',
        prompt: 'Schrijf een aantrekkelijke vacaturetekst voor een CE-chauffeur bij [bedrijf]. Format: (1) headline die opvalt tussen andere vacatures, (2) 3-4 USPs van werken bij ons, (3) wat we zoeken (code 95, ADR etc), (4) directe call-to-action. Niet corporate, wel respectvol voor chauffeurs.',
      },
      {
        title: 'CSRD-rapport voor verlader',
        useCase: 'Topklant vraagt maandelijks scope-3 rapport',
        prompt: 'Op basis van rit-data voor klant [X] in maand [Y]: (1) totaal afgelegde km, (2) geschatte CO2-emissies (gebruik CE Delft-factoren, per voertuigtype), (3) beladingsgraad-indicatie, (4) jaar-trend indien vergelijkbaar mogelijk. Format: klant-ready tabel + korte toelichting.',
      },
      {
        title: 'Charter-onderhandeling',
        useCase: 'Charter-partner biedt te hoog tarief',
        prompt: 'Een charter biedt €[X] voor rit [Y]. Marktconform volgens onze data is €[Z]. Schrijf beknopte, professionele reactie met (1) erkenning van hun offerte, (2) onze markt-data onderbouwen, (3) tegenvoorstel op €[Z], (4) ruimte laten voor gesprek. Respectvolle toon (we willen ook de volgende keer zaken doen).',
      },
      {
        title: 'Fuel-coaching-brief per chauffeur',
        useCase: 'Chauffeur zit structureel hoger in L/100km dan peers',
        prompt: 'FMS-data toont dat chauffeur [X] structureel [Y]% hoger L/100km gebruikt dan peers op dezelfde ritten. Schrijf korte, positieve coaching-brief: (1) erkenning van zijn inzet, (2) concreet verbeter-aandachtspunt (bv. remgedrag, snelheid op snelweg), (3) aanbod om mee te rijden indien gewenst, (4) geen financiële dreiging.',
      },
      {
        title: 'Incident-verslag voor verzekering',
        useCase: 'Schade-incident moet goed gedocumenteerd',
        prompt: 'Schrijf incident-verslag voor verzekeraar van [incident-beschrijving]. Zakelijke, chronologische feiten-weergave: (1) datum/tijd/locatie, (2) betrokken partijen en voertuigen, (3) omstandigheden (weer, verkeer, route), (4) schade-overzicht, (5) eerste hulp-stappen. Geen interpretatie, alleen feiten.',
      },
      {
        title: 'Tachograaf-compliance-check',
        useCase: 'Planner wil weten of chauffeur compliance-issue heeft',
        prompt: 'Op basis van tachograaf-data voor chauffeur [X] afgelopen 4 weken: (1) aantal rij-uren per week incl. max, (2) rust-pauzes patronen, (3) mogelijke overtredingen van 561/2006, (4) aanbeveling voor planning volgende week om risico te mitigeren.',
      },
    ],
    templates: [
      {
        title: 'Spot-freight-quote-template (Excel)',
        description: 'Automatische calculatie van kostprijs en marge per spot-offerte.',
      },
      {
        title: 'CSRD-rapport-sjabloon',
        description: 'Klant-gereed scope-3 rapportage-template per maand/kwartaal.',
      },
      {
        title: 'Planning-dashboard-template',
        description: 'Excel/Google Sheets om dagelijks ritoverzicht + chauffeur-beschikbaarheid bij te houden.',
      },
      {
        title: 'Chauffeur-vacature-template',
        description: 'Vacaturetekst-template die werkt op LinkedIn, Indeed en eigen site.',
      },
      {
        title: 'Customer-service-vertaal-scripts',
        description: 'Standaard-antwoorden in NL/EN/PL/RO voor chauffeur-klanten-communicatie.',
      },
      {
        title: 'Incident-rapportage-template',
        description: 'Standaard schade- en near-miss-rapportage voor verzekering + compliance.',
      },
      {
        title: 'Fuel-coaching-brief-template',
        description: 'Positief geformuleerde coaching-brief voor chauffeurs met verbetervoorstel.',
      },
    ],
  },
];

export const getPromptPackBySlug = (slug: string) =>
  promptPacks.find((p) => p.slug === slug);
