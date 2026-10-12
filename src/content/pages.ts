import { analysis, formatEuro } from "./pricing";
export const home = {
  seoTitle: "Lead Velocity — Jouw AI-partner voor het MKB",
  seoDescription: "Wij bouwen en beheren AI-oplossingen die het handwerk uit aanvragen, klantcontact en opvolging halen. Voor groothandels, importeurs, servicebedrijven en maatwerkbedrijven.",
  hero: {
    eyebrow: "AI-oplossingen, gebouwd en beheerd",
    h1Prefix: "Jouw AI-partner voor",
    audienceGeneric: "het MKB",
    sub: "Wij bouwen en beheren AI-oplossingen die het handwerk uit aanvragen, klantcontact en opvolging halen. Ingericht op jullie werkwijze, jullie team houdt de controle.",
    forWho: "Voor technische groothandels, importeurs, servicebedrijven en maatwerkbedrijven met 10‑75 medewerkers.",
    ctaMicro: "20 minuten, vrijblijvend. Past het niet, dan zeggen we dat ook.",
    secondary: "Bekijk een voorbeeld",
    secondaryMicro: "Eén aanvraag, stap voor stap.",
    pickerLabel: "Waar wil je mee beginnen?",
    moreAbout: "Meer over",
  },
  genericSituations: [
    "Een aanvraag ligt een dag in de mailbox, omdat niemand tijd had om hem na te lopen.",
    "Er ontbreekt een nummer of bijlage, dus mailen jullie twee keer heen en weer.",
    "Wat nog openstaat, zit in iemands hoofd of in een Excel die niet bij is.",
  ] as [string, string, string],
  recognize: {
    h2: "Herken je dit?",
    costLine: "Tel eens hoeveel aanvragen er gisteren binnenkwamen, en hoeveel daarvan niet compleet waren. Daar zit de tijd die je team terugkrijgt.",
  },
  howItWorks: {
    h2: "Zo werkt het",
    steps: [
      { title: "Lezen", body: "We lezen binnenkomende mails, pdf's en Excel-lijsten en halen de gegevens eruit." },
      { title: "Markeren wat ontbreekt", body: "We vergelijken met wat een complete aanvraag nodig heeft en zetten de ontbrekende punten op een rij." },
      { title: "Klaarzetten", body: "Er staat een conceptvraag of -antwoord klaar. Jouw medewerker controleert, past aan en verstuurt." },
    ],
    aiNote: "Hoe? Met taalmodellen (AI) en vaste regels, ingericht op jullie proces. We gebruiken alleen de gegevens die nodig zijn, en wat er met jullie data gebeurt leggen we vooraf vast.",
    examplesLink: "Bekijk alle voorbeelden",
  },
  fits: {
    h2: "Past in wat je al hebt",
    intro: "Geen nieuw systeem om te leren. Jullie team werkt zoals nu, alleen staat het voorwerk al klaar.",
    points: [
      "Werkt vanuit jullie mailbox.",
      "Waar het kan koppelen we met jullie ERP of administratie; anders werken we via export of Excel.",
      "Jullie medewerker houdt de laatste stap: controleren en versturen.",
    ],
    needTitle: "Wat we nodig hebben om te starten",
    need: [
      "Voorbeelden van aanvragen uit de afgelopen weken",
      "Toegang tot de mailbox of een doorstuuradres",
      "Eén persoon die beslist en meedenkt",
    ],
  },
  pricing: { eyebrow: "Prijzen", h2: "Pakketten en prijzen." },
  trajectory: {
    h2: "Van gesprek tot werkende oplossing",
    steps: [
      { title: "Gratis adviesgesprek", body: "20 minuten. We kijken welk werk steeds terugkomt en of automatiseren loont." },
      { title: "Analyse", body: `${formatEuro(analysis.price)}: proceskaart, nulmeting en een vaste scope met prijs. Verrekend bij een implementatie binnen ${analysis.creditDays} dagen.` },
      { title: "Vast pakket", body: "We richten het in, jullie testen en accepteren. Daarna beheren we het." },
    ],
    link: "Vergelijk de pakketten",
  },
  qualifier: {
    h2: "Voor wie dit werkt (en voor wie niet)",
    fitTitle: "Past goed",
    fit: [
      "10‑75 medewerkers, met minstens twee mensen die dit werk doen",
      "Aanvragen, claims of meldingen komen binnen per mail, als pdf of als Excel",
      "Er komt genoeg terug om te automatiseren",
      "Eén persoon die beslist en meedenkt",
      "Je wilt dat je team de concepten controleert",
    ],
    notFitTitle: "Past niet",
    notFit: [
      "Je zoekt een nieuw ERP of CRM",
      "Elke aanvraag is volledig anders",
      "Er is de eerste weken geen tijd om mee te kijken",
      "Je wilt dat het systeem zonder controle zelf beslist",
      "Het volume is erg laag",
    ],
    doubt: "Twijfel je? Dat bespreken we in 20 minuten, en als het niet past zeggen we dat.",
  },
  assurances: {
    h2: "Waar je op kunt rekenen",
    points: [
      "Vaste prijs en vooraf afgesproken scope",
      "Externe acties beginnen met akkoord van jullie medewerker",
      "Jullie data blijft van jullie; toegang en bewaren leggen we vooraf vast",
      "Maandkosten starten pas na acceptatie",
    ],
  },
  about: {
    h2: "Praktisch gebouwd, samen met de mensen die ermee werken.",
    body: "Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie. We beginnen bij het dagelijkse werk en bouwen van daaruit een systeem dat je team kan gebruiken.",
    cta: "Over Lead Velocity",
  },
  faqIds: ["mensen", "ai", "software", "zelfstandig", "kosten", "maandelijks", "loont"] as const,
  closing: {
    h2: "Hoeveel aanvragen waren gisteren niet compleet?",
    body: "In 20 minuten kijken we samen of automatiseren bij jullie loont. Past het niet, dan zeggen we dat ook.",
  },
  facts: [
    { value: "20 min", label: "Gratis adviesgesprek, vrijblijvend" },
    { value: formatEuro(analysis.price), label: `Analyse, verrekend bij implementatie binnen ${analysis.creditDays} dagen` },
    { value: "1 proces", label: "Om mee te starten, met vaste scope" },
    { value: "Jullie team", label: "Controleert en beslist altijd" },
  ],
  build: {
    eyebrow: "Wat we bouwen",
    h2: "Wat we voor jouw bedrijf bouwen.",
    notes: ["Werkt vanuit jullie mailbox", "Wat ontbreekt, staat op een rij", "Jullie medewerker beslist"],
  },
  timeline: {
    eyebrow: "Werkwijze",
    h2: "Van eerste gesprek tot werkende oplossing.",
    note: "Planning: een bestaande passende opzet kan doorgaans in 4–6 weken worden ingericht, na de analyse.",
    steps: [
      { label: "Stap 1", title: "Gratis adviesgesprek", body: "In 20 minuten kijken we welk werk bij jullie steeds terugkomt en of automatiseren loont.", checks: ["Welk werk terugkomt", "Of het loont"] },
      { label: "Stap 2", title: "Analyse", body: "Proceskaart, nulmeting, input- en toegangscheck en een vaste scope met prijs.", checks: ["Proceskaart en nulmeting", "Vaste scope en prijs"] },
      { label: "Stap 3", title: "Inrichten en testen", body: "We richten de oplossing in op jullie bronnen en testen met echte voorbeelden. Jullie team keurt goed.", checks: ["Met jullie voorbeelden", "Acceptatie door jullie team"] },
      { label: "Stap 4", title: "Live en beheer", body: "Na acceptatie gaat het live. Wij monitoren, lossen incidenten op en verbeteren in kleine stappen.", checks: ["Maandkosten pas na acceptatie", "Monitoring en support"] },
    ],
  },
  showcase: {
    eyebrow: "Voorbeelden",
    h2: "Zo ziet het eruit.",
    intro: "Illustratieve demo's met fictieve gegevens. Elk voorbeeld laat zien wat binnenkomt, wat we voorbereiden en wat jullie team beslist.",
    cta: "Bekijk het voorbeeld",
  },
  aboutLine: { text: "Lead Velocity is opgericht door Bart Wilbrink.", link: "Over ons" },
};

export const voorWie = {
  seoTitle: "Voor wie | Lead Velocity",
  seoDescription: "Vier herkenbare ingangen: technische groothandels, importeurs en distributeurs, service en onderhoud, maatwerk en montage.",
  h1: "Voor bedrijven waar informatie- en communicatiewerk steeds terugkomt.",
  intro: "We bouwen oplossingen voor vier soorten bedrijven. Wat ze gemeen hebben: aanvragen en vragen komen digitaal binnen, er is genoeg herhaling, en er is een team dat het werk uitvoert.",
  fitTitle: "Goede fit",
  fit: ["Informatie komt binnen via e-mail, pdf, Excel of formulieren", "Terugkerende informatievereisten", "Bestaande bronnen om uit te putten", "Een duidelijke eigenaar van het proces", "Genoeg behandeltijd en bereidheid om gecontroleerd te testen"],
  notFitTitle: "Geen standaardfit",
  otherTitle: "Ander bedrijfstype?",
  otherBody: "Ook buiten deze categorieën kan dezelfde oplossing passen. We bekijken eerst de herhaling, gegevens en uitvoerbaarheid.",
};

export const oplossingenIndex = {
  seoTitle: "Oplossingen | Lead Velocity",
  seoDescription: "Bouwblokken die informatie verzamelen, werk voorbereiden en opvolging zichtbaar maken. We beginnen bij één proces.",
  h1: "Automatisering voor het werk dat steeds terugkomt.",
  intro: "We beginnen bij één proces. Deze bouwblokken helpen informatie te verzamelen, werk voor te bereiden en opvolging zichtbaar te maken.",
  baseTitle: "Eén basis, meerdere toepassingen",
  baseSteps: ["Input ontvangen", "Identiteit herkennen", "Informatie structureren", "Compleetheid beoordelen", "Bronnen ophalen", "Actie voorbereiden", "Medewerkerreview", "Status registreren", "Opvolgen", "Afsluiten en meten"],
};

export const prijzenPage = {
  seoTitle: "Prijzen | Lead Velocity",
  seoDescription: "Drie pakketten plus maatwerk, met een eenmalige inrichting en een maandelijks bedrag voor beheer. Prijzen vanaf, exclusief btw.",
  h1: "Een afgebakende start. Duidelijke kosten voor inrichting en beheer.",
  intro: "Je betaalt eenmalig voor het inrichten van een oplossing en daarna maandelijks voor het beheer ervan. De maandkosten starten pas na acceptatie.",
  setupLabel: "Inrichting vanaf",
  monthlyLabel: "Beheer per maand vanaf",
  matrixTitle: "Pakketten vergeleken",
  managementTitle: "Inbegrepen in het beheer",
  extraTitle: "Wat niet inbegrepen is",
  analysisTitle: "Betaalde analyse",
  analysisBody: "Als het adviesgesprek voldoende aanleiding geeft, volgt een analyse. Die wordt verrekend bij een implementatie binnen de verrekentermijn.",
  termsTitle: "Voorwaarden",
  terms: [
    "Prijzen zijn vanaf-prijzen, exclusief btw.",
    "De scope leggen we vooraf vast in het voorstel.",
    "De maandkosten starten na acceptatie.",
    "Een bestaande passende template kan doorgaans in 4–6 weken worden gepland, na de inputcheck.",
  ],
  faqIds: ["kosten", "maandelijks", "uitbreiden", "loont", "oplevert"] as const,
};

export const werkwijze = {
  seoTitle: "Werkwijze | Lead Velocity",
  seoDescription: "Van gratis adviesgesprek tot beheer in zes stappen: adviesgesprek, analyse, voorstel, inrichting, acceptatie en beheer.",
  h1: "Van terugkerend werk naar een werkende oplossing.",
  intro: "Een gebruikelijke start heeft één proceseigenaar en twee gerichte werksessies. Dat is een uitgangspunt, geen absoluut maximum voor elk project.",
  steps: [
    { title: "Adviesgesprek", output: "Een eerste beeld of er een haalbare eerste stap is.", client: "Een gesprek van 20 minuten over het werk dat terugkomt.", decision: "Is een analyse zinvol?" },
    { title: "Analyse", output: "Proceskaart, nulmeting, input- en toegangscheck, businesscase en acceptatiecriteria.", client: "Voorbeelden van het werk en toegang tot de relevante informatie.", decision: "Loont het om dit in te richten?" },
    { title: "Voorstel", output: "Vaste scope en prijs, met wat er wordt opgeleverd en wanneer de maanddienst start.", client: "Een eigenaar die het voorstel beoordeelt.", decision: "Akkoord op scope en prijs." },
    { title: "Inrichting", output: "De oplossing, ingericht op jullie bronnen en werkwijze.", client: "Twee gerichte werksessies en representatieve voorbeelden.", decision: "Is het prototype bruikbaar?" },
    { title: "Acceptatie", output: "Test met het team aan de hand van de afgesproken acceptatiecriteria.", client: "Gebruik en feedback van het team.", decision: "Voldoet de oplossing aan de criteria?" },
    { title: "Beheer", output: "Monitoring, incidentafhandeling, bronupdates, rapportage en kleine wijzigingen.", client: "Melden van wijzigingen in proces of bronnen.", decision: "Uitbreiden naar aangrenzend werk?" },
  ],
  stepLabels: { output: "Wat wij opleveren", client: "Wat we van jullie nodig hebben", decision: "Beslismoment" },
};

export const over = {
  seoTitle: "Over Lead Velocity",
  seoDescription: "Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie.",
  h1: "Praktisch gebouwd, samen met de mensen die ermee werken.",
  mission: "Praktische automatisering toegankelijk maken voor ervaren MKB-bedrijven door herkenbare oplossingen te bouwen, in hun dagelijkse werkwijze te laten aansluiten en blijvend te beheren en verbeteren.",
  founder: "Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie. We beginnen bij het dagelijkse werk en bouwen van daaruit een systeem dat je team kan gebruiken.",
  skillsTitle: "Waar we goed in zijn",
  skills: ["Commerciële processen en opvolging", "Onderzoek en data-analyse op schaal", "Gegevens bruikbaar maken", "Terugkerend werk automatiseren"],
  principlesTitle: "Hoe we werken",
  principles: [
    "We beginnen bij het werk dat iedere week terugkomt.",
    "Mensen houden de beslissingen die vakkennis, oordeel en klantverantwoordelijkheid vragen.",
    "Eén proces, één eigenaar, één afgebakende start.",
    "We meten wat het oplevert, inclusief controle en uitzonderingen.",
    "Na oplevering beheren en verbeteren we de oplossing.",
  ],
};

export const checkPage = {
  seoTitle: "Plan een gratis adviesgesprek | Lead Velocity",
  seoDescription: "In 20 minuten bekijken we welk werk bij jullie steeds terugkomt en of automatiseren loont. Gratis en vrijblijvend.",
  eyebrow: "Gratis adviesgesprek",
  h1: "Plan een gratis adviesgesprek.",
  intro: "In 20 minuten bekijken we welk werk bij jullie steeds terugkomt, wat jullie huidige software al doet en of automatiseren loont. Gratis en vrijblijvend.",
  submit: "Vraag het adviesgesprek aan",
  submitting: "Bezig met versturen…",
  privacy: "We gebruiken je gegevens om op deze aanvraag te reageren.",
  privacyLink: "Lees onze privacyverklaring.",
  error: "Je aanvraag is niet verstuurd. Probeer het opnieuw of mail ons.",
  calendar: "Kies direct een tijd",
};

export const bedanktPage = {
  seoTitle: "Bedankt | Lead Velocity",
  h1: "Bedankt, je aanvraag is ontvangen.",
  body: "We nemen contact op via je gekozen contactvoorkeur om een passend moment af te spreken.",
  cta: "Bekijk een passend voorbeeld",
};
