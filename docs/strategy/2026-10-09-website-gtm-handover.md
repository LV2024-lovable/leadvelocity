# Lead Velocity — website, GTM en schaalmodel

> **Afwijkingen vastgesteld door Bart (2026-10-11):**
> - De term "werkstroomcheck" is vervangen door **"gratis adviesgesprek"**: knop "Plan een gratis adviesgesprek", URL `/adviesgesprek`; de oude URL `/werkstroomcheck` verwijst door en behoudt de querystring.
> - De homepage-H1 is de statische kop **"Elke aanvraag compleet, voordat je team eraan begint."**, met door de bezoeker gekozen segmentknoppen (zie `docs/strategy/2026-10-11-messaging-strategie.md` §5 en §9).
> - De segment-H1's en -subs in `src/content/categories.ts` vervangen de categorie-H1's uit §8 en §9.
> - De primaire CTA op categoriepagina's is "Plan een gratis adviesgesprek".
> - Interne namen (Edge Function, tabel, analytics) blijven ongewijzigd.
>
> **Afwijkingen vastgesteld door Bart (2026-10-12):**
> - De homepage-H1 is **"Jouw AI-partner voor [doelgroep]."** — zonder gekozen doelgroep "Jouw AI-partner voor het MKB.", met een gekozen doelgroep bijvoorbeeld "Jouw AI-partner voor servicebedrijven." Dit vervangt de statische kop van 2026-10-11 en de regel "geen AI in de H1".
> - De pakketnamen zijn **Start · Compleet · Opschalen · Maatwerk** (voorheen Voorbereiden · Werkstroom · Opschalen · Custom). Prijzen, inhoud en interne pakket-id's blijven ongewijzigd.
> - Per doelgroep tonen we 3–4 oplossingen (homepage "Wat we bouwen" en categoriepagina "Wat we voor jullie bouwen"), binnen de bestaande procesfamilies en prijzen. Grenzen uit §6 en §10 blijven gelden.
> - Het woord "werkstroom" komt niet meer voor in zichtbare copy; we zeggen "oplossing" of "proces".
>
> **Afwijking vastgesteld door Bart (2026-10-13):**
> - Rode draad: elke hoofdpagina volgt Herkenbaar → Wat we bouwen → Voorbeelden → Samenwerken → Prijzen → Vragen, met vaste labels. Header: Voor wie ▾ · Samenwerken · Voorbeelden · Prijzen; `/werkwijze` wordt `/samenwerken` (de oude URL verwijst door). "Oplossing" = wat we voor een doelgroep bouwen; procesfamilies heten "Per proces" en staan alleen in de footer. Geen "automatisering" in koppen of SEO-titels.

## Lees dit eerst, Claude

Dit is de leidende overdracht voor het aanpassen van leadvelocity.nl. Datum: 9 oktober 2026. Eigenaar: Bart Wilbrink. Het document combineert het salesautomatiseringsplan met het aangeleverde GTM-plan voor traditioneel MKB. Het vervangt de tegenstrijdige positioneringen uit die documenten voor deze website.

Jouw opdracht: vertaal de hieronder vastgelegde strategie naar de bestaande website, inclusief pagina's, navigatie, copy, CTA's, campagnepagina's, formulieren, demo's en meetbare conversiepaden. Lees eerst de repository en de bestaande instructies. Werk binnen de aanwezige stack en ontwerpstijl, tenzij die het hieronder gevraagde resultaat blokkeert. Lever reviewbare wijzigingen en een werkende preview. Deployment volgt de autorisatie en workflow van de gebruiker in jouw omgeving.

Dit is een bouwbriefing, geen claim dat alle beschreven automatiseringen al productieproducten zijn. Maak onderscheid tussen beschikbare dienstverlening, illustratieve demonstraties, gemeten cases en toekomstige productontwikkeling. Bouw de marketingwebsite; bouw geen klantplatform of agentbackend alleen omdat het hier wordt beschreven.

Voertaal: Nederlands. Tone: praktisch, professioneel, helder, volwassen. De bezoeker is eigenaar, directeur of teamleider bij een ervaren MKB-bedrijf. Hij wil begrijpen welk werk makkelijker wordt, hoeveel verandering dit vraagt en hoe hij kan bepalen of het loont.

## 1. Strategische synthese en beslissingen

We behouden uit het traditionele-MKB-plan: vier brede categorieën, herkenbare procesproblemen, eenvoudige dossier- en communicatiewerkstromen, menselijke controle, betaalde procesanalyse, acceptatie en beheersbare levering.

We behouden uit het salesplan: commerciële voorbereiding, onderzoek op schaal, bruikbare data, gerichte benadering, heldere funnel, opvolging, herbruikbare modules, zichtbare demo's en content uit het werk zelf.

We combineren dit als volgt:

**Lead Velocity automatiseert het terugkerende uitzoekwerk, de communicatie en de opvolging in de commerciële en administratieve operatie van het MKB.**

Een bedrijf kan starten bij offerte-intake, garantieclaims, service-intake, projectaanvragen of commerciële voorbereiding. Het startproject heeft steeds één resultaat, één eigenaar en één begrensde werkstroom. Daarna kan hetzelfde account uitbreiden naar aangrenzende processen.

De vier websitecategorieën blijven:

1. Technische groothandels.
2. Importeurs en distributeurs.
3. Technische service- en onderhoudsbedrijven.
4. Maatwerkleveranciers en montagebedrijven.

Fietsen, koffieapparatuur en kozijnen zijn voorbeelden binnen categorieën. Maak ze geen losse hoofdniches. Recruitment, MSP's en veilinghuizen zijn geen primaire categoriepagina's in deze lancering. Eerdere projecten kunnen correct toegeschreven bewijs leveren wanneer de inhoud en toestemming dat toelaten. Salesmodules blijven beschikbaar binnen de gekozen MKB-categorieën; er ontstaat geen apart concurrerend outboundbureau op dezelfde homepage.

Websitebreedte en leveringsbreedte zijn verschillend: toon vier herkenbare ingangen, maar start de commerciële validatie en productbouw met maximaal twee proces-/segmentcombinaties. Nieuwe techniek wordt steeds voor één configuratie tegelijk gebouwd.

## 2. Visie, missie en ambitie

### Visie

Een MKB waarin medewerkers hun vakkennis besteden aan klanten, oplossingen en beslissingen, terwijl terugkerend informatie- en communicatiewerk betrouwbaar door systemen wordt voorbereid en opgevolgd.

### Missie

Praktische automatisering toegankelijk maken voor ervaren MKB-bedrijven door herkenbare werkstromen te bouwen, in hun dagelijkse werkwijze te laten aansluiten en blijvend te beheren en verbeteren.

### Commercieel standpunt

We beginnen bij het werk dat iedere week terugkomt. AI en automatisering zijn middelen om informatie te begrijpen, gegevens te ordenen, conceptacties voor te bereiden en vervolgwerk zichtbaar te maken. Mensen houden de beslissingen die vakkennis, oordeel en klantverantwoordelijkheid vragen.

### Middelen waarover we beschikken

Barts sterktes: sales layers, outbound machines, prospectresearch, data-analyse op schaal, databruikbaarheid, repeterend werk, WhatsApp agents en commerciële logica. Agents ondersteunen research, classificatie, extractie, concepten, rapportage en configuratievoorbereiding. Regels en reguliere automatisering sturen rechten, statussen, triggers en stopvoorwaarden. Een technische uitvoerder blijft nodig voor productie-integraties, testen en beheer.

Gereedschap wordt geselecteerd op het proces en bestaande klantsoftware: mailbox, CRM/dossieromgeving, databronnen, taalmodel, workflowautomatisering en eventueel WhatsApp Business. Niet ieder project heeft al deze middelen nodig. De website belooft geen universele integratie en zet een wand met technologielogo's niet vóór de klantuitkomst.

### Ambitie

€10.000 terugkerende maandomzet is een eerste mijlpaal, geen einddoel. De onderneming moet kunnen groeien naar €100.000 MRR en uiteindelijk een veel grotere omzetbasis via standaardproducten, herhaalbare implementaties, klantuitbreiding en partners. €1 miljoen jaaromzet en €1 miljoen MRR zijn afzonderlijke scenario's, geen gelijke doelen.

Deze cijfers horen in het interne bedrijfsplan, niet in klantgerichte websitecopy. De website verkoopt bruikbare werkstromen; ze vertelt bezoekers niet dat ze onderdeel zijn van onze omzetambitie.

## 3. Positionering en boodschaphiërarchie

Merkbelofte: **Minder uitzoekwerk. Meer werk gedaan.**

Ondersteunende uitleg: **Wij automatiseren terugkerend werk rond aanvragen, klantcommunicatie en opvolging. Ingericht op jullie werkwijze, met jullie team in controle.**

Concrete voorbeelden: ontbrekende gegevens verzamelen, mails en bijlagen samenbrengen, informatie uit bronnen ophalen, geschikte bedrijven onderzoeken, conceptberichten voorbereiden en open acties bewaken.

Redenen om te kiezen: afgebakende start, tastbaar voorbeeld, aansluiting op bestaand werk, bronvermelding waar nodig, meetbaar resultaat, gecontroleerde oplevering en actief beheer.

Niet gebruiken als hoofdboodschap: digitale transformatie, revolutie, toekomstbestendig, AI-powered growth engine, eindeloze mogelijkheden, personeel vervangen of volledig autonoom bedrijf. Interne termen als 'saai' en 'oudbollig' komen niet in de site.

Iedere pagina beantwoordt: welk werk, voor wie, wat verandert, wat blijft bij het team, hoe starten we en wat is de volgende stap?

## 4. Doelgroep en selectie

Eerste selectiehypothese: bedrijven met circa 10–75 medewerkers, minstens twee mensen die het betreffende kantoorproces uitvoeren, digitaal binnenkomende informatie en voldoende herhaling om implementatie en beheer te dragen. Omvang alleen is geen koopcriterium.

Buyer: eigenaar/directeur bij kleinere bedrijven; binnendienst-, aftersales-, service- of operationeel manager bij grotere bedrijven, met directie voor budget. Procesowner en economische beslisser moeten beiden worden betrokken.

Goede fit: e-mail/PDF/Excel/formulieren, repeterende informatievereisten, bestaande bronnen, duidelijk eigenaar, genoeg behandeltijd en willingness om gecontroleerd te testen.

Geen standaardfit: weinig volume, voornamelijk niet-digitale processen, geen eigenaar, onbereikbare bronnen, lopende grote systeemmigratie, specialistische diagnose, nieuwe engineering of een wens om alle besluiten zonder review te laten uitvoeren.

Publieke signalen zijn aanleidingen om te onderzoeken: binnendienstvacature, dealernetwerk, onderhoudsdienst, projectuploads of assortimentsuitbreiding. Ze bewijzen geen inefficiëntie. Een oude website levert geen pijnscore op.

## 5. Productarchitectuur: één basis, meerdere toepassingen

De herbruikbare basis is: input ontvangen → identiteit herkennen → informatie structureren → compleetheid/fit beoordelen → bronnen ophalen → actie voorbereiden → medewerkerreview → status registreren → opvolgen → afsluiten/meten.

Vier procesfamilies:

| Familie | Standaardmodules | Zichtbaar resultaat |
|---|---|---|
| Commerciële voorbereiding | Accountresearch, contactrollen, prioriteit, campagneconcepten | Werklijst met reden en volgende actie |
| Aanvragen en dossiers | Intake, bijlagen, compleetheid, kennisbronnen | Compleet, controleerbaar dossier |
| Communicatie en opvolging | Conceptvragen, statusreacties, reminders, routing | Minder handmatige herhaalcommunicatie |
| Data en inzicht | Ontdubbeling, ontbrekende velden, bronstatus, open acties | Bruikbare gegevens en zichtbaar werk |

WhatsApp is een kanaal binnen communicatie/intake, geen vijfde allesomvattend product. Een kennisbank is onderdeel van een werkstroom, geen los duur abonnement zonder aantoonbaar gebruik.

Een campagne verkoopt één ingang. Voorbeelden: complete garantie-intake; offertevoorbereiding; service-intake; projectintake; geprioriteerde prospectresearch. Geen homepage-aanbod dat al deze modules tegelijk omvat voor één maandbedrag.

## 6. Drie pakketten plus Custom

Aanbevolen commerciële prijsstructuur voor deze briefing; te valideren met echte voorstellen. Vermeld 'vanaf', exclusief btw en dat scope vooraf wordt vastgelegd. Geen ongeteste volumes publiceren. Prijsdata centraal configureren; nooit hardcoded afwijkende bedragen op verschillende pagina's.

| Pakket | Setup vanaf | Maand vanaf | Publieke belofte |
|---|---:|---:|---|
| Voorbereiden | €2.950 | €595 | Relevante informatie en conceptacties klaarzetten voor je team |
| Werkstroom | €4.950 | €1.250 | Eén proces van intake tot afgesproken opvolging inrichten en beheren |
| Opschalen | €7.950 | €1.950 | Een bewezen werkstroom uitbreiden naar meer volume, kanalen of teams |
| Custom | €12.500 | €2.500 | Meerdere processen of bijzondere koppelingen op een afgestemd ontwerp |

'Werkstroom' vervangt de naam 'Afhandelen' uit het aangeleverde plan: de naam maakt minder snel de indruk dat alle vakinhoudelijke besluiten zelfstandig worden genomen. Geen twee sets van drie pakketten op de site. Sales Radar/Outbound/Flow uit het andere plan worden toepassingsmodules binnen deze algemene structuur, geen tweede prijsladder.

### Pakketdetails

Voorbereiden: één bestaand templateproces, één invoerkanaal, één team, informatie structureren, ontbrekende gegevens markeren, conceptactie, review en resultaatrapport. Geen nieuwe complexe connector ontwikkelen tegen dit instaptarief.

Werkstroom — aanbevolen start: één proces, één team, intake/compleetheid, relevante bronnen, conceptcommunicatie, review, status en afgesproken opvolging. Externe acties beginnen met medewerkergoedkeuring; beperkte automatische handelingen alleen na afgesproken test en autorisatie. Geen badge 'meest gekozen' zonder bewijs; gebruik 'Aanbevolen start'.

Opschalen: dezelfde bewezen stroom met extra capaciteit, twee afgesproken kanalen/teams en uitgebreidere overdracht/rapportage. Geen drie nieuwe customprocessen inbegrepen.

Custom: betaald ontwerp, meerdere processen of bijzondere organisatie-/systeemvereisten. Specialistische techniek kan buiten LV-capaciteit vallen en wordt niet automatisch aangenomen. Enterprise heeft geen automatisch inbegrepen 24/7 SLA, SSO of onbeperkte integraties.

Inbegrepen beheer binnen afgesproken budget: monitoring, incidentafhandeling, bronupdates, rapportage, kantoorurensupport en 0,5/1/2 uur kleine instellingenwijzigingen per maand bij de drie standaardpakketten. Geen rollover. Nieuwe processen en connectorontwikkeling zijn meerwerk.

Kostenmicrocopy: 'Prijzen vanaf, exclusief btw. Volume, koppelingen en verbruik leggen we vooraf vast. Bestaande softwarelicenties en bijzondere data- of berichtkosten kunnen aanvullend zijn.' Inclusie van hosting en gebruik wordt in de offerte begrensd; geen onbeperkt claimen.

Verkoopfunnel: gratis werkstroomcheck → gelabeld voorbeeld → betaalde analyse (€750, verrekenbaar binnen 60 dagen) → vaste scope en prijs → inrichting → proef/acceptatie → maanddienst → uitbreiding.

Werkstroomcheck = 20 minuten verkenning. Geen gratis volledig maatwerkonderzoek. Analyse = proceskaart, nulmeting, input-/toegangscheck, businesscase en acceptatiecriteria. Maandkosten starten na acceptatie. Opleverplanning pas na inputcheck; een bestaande passende template kan doorgaans in 4–6 weken worden gepland, eerste ontwikkelklanten krijgen een eigen planning.

Acceptatievoorstel: 50% bij start, 20% bij bruikbaar prototype, 30% na acceptatie. Bij niet halen volgt een afgesproken herstelperiode. Leg contractvoorwaarden eerst vast voordat een commerciële garantie live gaat. De site zegt voorlopig: 'We leggen vooraf vast wat wordt opgeleverd en wanneer de maanddienst start.' Geen 'niet tevreden, geld terug' toevoegen.

## 7. Sitearchitectuur en fasering

Hoofdnavigatie: Voor wie · Oplossingen · Werkwijze · Voorbeelden · Prijzen. Rechterknop: 'Plan een werkstroomcheck'. Logo linkt naar `/`. 'Over' en contactgegevens in footer; op desktop mag Over aanvullend in de navigatie als er ruimte is.

| Route | Doel | Fase |
|---|---|---|
| `/` | Positionering, herkenning en keuze | 1 |
| `/voor-wie` | Vier categorieën, fit en procesingangen | 1 |
| `/groothandels` | Offertebinnendienst | 1 |
| `/importeurs-distributeurs` | Aftersales en dealerclaims | 1 |
| `/service-onderhoud` | Service-intake en communicatie | 1 |
| `/maatwerk-montage` | Projectintake en vervolgactie | 1 |
| `/oplossingen` | Procesfamilies, met categoriecontext | 1 |
| `/oplossingen/aanvragen-dossiers` | Intake en dossierwerk | 1 |
| `/oplossingen/communicatie-opvolging` | Herhaalcommunicatie en status | 1 |
| `/oplossingen/data-inzicht` | Bruikbare data en open werk | 1 |
| `/oplossingen/commerciele-voorbereiding` | Research en salesopvolging | 1, beperkte claims |
| `/werkwijze` | Fitcheck tot beheer | 1 |
| `/prijzen` | Drie pakketten, Custom en voorwaarden | 1 |
| `/voorbeelden` | Vier gelabelde demonstraties | 1 |
| `/over` | Bart, aanpak en verantwoordelijkheden | 1 |
| `/werkstroomcheck` | Kort formulier/agenda-route | 1 |
| `/bedankt` | Echte formulierbevestiging | 1, noindex |
| `/privacy` | Werkelijke privacyinformatie | 1 |
| `/campagnes/offerte-intake` | Gerichte groothandelscampagne | 1 |
| `/campagnes/aftersales` | Gerichte distributeurscampagne | 1 |
| `/campagnes/service-intake` | Gerichte servicecampagne | 1 |
| `/campagnes/project-intake` | Gerichte projectcampagne | 1 |
| `/campagnes/commerciele-voorbereiding` | Salesmodule in een gekozen categorie | 2, na selectie |
| `/resultaten/[slug]` | Gemeten klantcases | 2, alleen echt bewijs |

Fase 1 geeft een samenhangende marketingwebsite. Deze pagina's mogen gedeelde componenten en contentconfiguraties gebruiken; geen 20 los onderhouden layouts. Campaignpages verschijnen niet in de hoofdnavigatie en krijgen standaard noindex met een self-canonical. Categoriepagina's zijn indexeerbaar met unieke inhoud. Nieuwe echte casepagina's pas publiceren met goedgekeurde feiten en beelden.

Controleer bestaande routes: behoud relevante URL's of maak gerichte permanente redirects naar inhoudelijk passende nieuwe routes. Geen globale redirect van alle oude pagina's naar de homepage. Audit bestaande `/groothandel`, `/transport`, `/maakindustrie`, `/onze-aanpak`, `/inzichten` voordat iets wordt verwijderd. Transport kan passend servicewerk bevatten maar verdient geen fictieve identieke vervanger.

## 8. Homepage: volledige sectiebriefing en copy

### H1 / hero

Eyebrow: 'Praktische automatisering voor het MKB'

H1: 'Minder uitzoekwerk. Meer werk gedaan.'

Subkop: 'Wij automatiseren terugkerend werk rond aanvragen, klantcommunicatie en opvolging. Van ontbrekende gegevens verzamelen tot een compleet dossier en een duidelijke volgende stap — ingericht op jullie werkwijze.'

Primaire knop: 'Plan een werkstroomcheck' → `/werkstroomcheck?source=home-hero`

Secundaire knop: 'Bekijk een voorbeeld' → `/voorbeelden?source=home-hero`

Microcopy onder primaire CTA: '20 minuten om te bekijken welk proces een goede eerste stap is.'

Hero visual: één fictief dossier opbouwend van aanvraag naar overzicht. Toon tabs Input / Voorbereid / Volgende stap. De input bevat een aanvraag met ontbrekend veld; output noemt aanwezige informatie, ontbrekende informatie en medewerkerreview. Duidelijk label 'Illustratieve demo'. Geen bewegende netwerkbol, robot of dashboard met verzonnen klantcijfers.

### Herkenbare situaties

H2: 'Het werk tussen een bericht en een bruikbare volgende stap.'

Intro: 'Veel werk begint met een mail, bijlage of vraag. Daarna moeten gegevens worden verzameld, informatie worden opgezocht en vervolgacties worden bewaakt. Juist die terugkerende stappen kunnen we samen slimmer inrichten.'

Drie kaarten:

- 'Informatie verzamelen' — 'Gegevens uit mails, formulieren en bijlagen bij elkaar brengen. Zichtbaar maken wat nog ontbreekt.'
- 'Werk voorbereiden' — 'Een dossier, samenvatting of conceptbericht klaarzetten op basis van afgesproken bronnen.'
- 'Opvolging bewaken' — 'Open acties, ontbrekende informatie en afgesproken vervolgcontacten bijhouden.'

### Voor wie

H2: 'Herkenbare werkstromen, ingericht voor jouw bedrijf.'

Vier categoriekaarten met eigen knop:

- Technische groothandels: 'Aanvragen voorbereiden en open offertes opvolgen.' Knop 'Voor groothandels' → `/groothandels`.
- Importeurs en distributeurs: 'Aftersales- en dealerclaims compleet maken.' Knop 'Voor importeurs en distributeurs' → `/importeurs-distributeurs`.
- Service en onderhoud: 'Meldingen voorbereiden en statusvragen ondersteunen.' Knop 'Voor servicebedrijven' → `/service-onderhoud`.
- Maatwerk en montage: 'Projectinformatie verzamelen en vervolgstappen bewaken.' Knop 'Voor maatwerk en montage' → `/maatwerk-montage`.

### Eén concreet proces

H2: 'Begin bij één proces dat steeds terugkomt.'

Copy: 'We kijken waar je team telkens hetzelfde informatie- en communicatiewerk doet. Daar richten we één werkstroom voor in. Zodra die bruikbaar is en resultaat oplevert, kunnen we aangrenzend werk toevoegen.'

Visual: voorbeeld aanvraag met klant, referentie, ontbrekend bewijs en volgende actie. Geen percentages. Label 'Voorbeeld met fictieve gegevens'.

### Breder dan intake

H2: 'Van commerciële voorbereiding tot klantopvolging.'

Copy: 'Dezelfde basis kan ook geschikte bedrijven onderzoeken, gegevens ordenen en commerciële vervolgacties voorbereiden. We kiezen de toepassing op het werk dat jullie team werkelijk doet.'

Vier compacte links naar oplossingen. Hoofd-CTA blijft procescheck, geen extra losse productaanbiedingen.

### Werkwijze

H2: 'Van terugkerende taak naar beheerde werkstroom.'

Vier stappen: 'Bekijken' (proces en waarde), 'Inrichten' (scope en bronnen), 'Testen' (met team en voorbeelden), 'Beheren' (gebruik, fouten en resultaat). Link 'Bekijk onze werkwijze' → `/werkwijze`.

### Team in controle

H2: 'Je team houdt het oordeel. Het systeem doet het voorwerk.'

Copy: 'Productkeuzes, prijzen, garanties en technische beoordelingen blijven bij de verantwoordelijke medewerker. We spreken af welke informatie het systeem voorbereidt en welke acties eerst worden gecontroleerd.'

### Pakketten

H2: 'Een passende start, met ruimte om uit te breiden.'

Toon drie kaarten, prijs, éénregelige scope en knoppen volgens sectie 12. Custom als aparte horizontale kaart eronder. Link 'Vergelijk de pakketten' → `/prijzen`. Geen checkout: dit is een dienstverlening met scopegesprek.

### Voorbeelden en vertrouwen

H2: 'Bekijk wat een werkstroom concreet oplevert.'

Toon twee actuele demo's uit de bibliotheek. Vermeld 'Illustratieve demo'. Echte casecomponent alleen als goedgekeurde casegegevens bestaan. Zonder cases toon je de aanpak en demo's; geen lege reviewcarrousel.

### Over

H2: 'Praktisch gebouwd, samen met de mensen die ermee werken.'

Copy: 'Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie. We beginnen bij het dagelijkse werk en bouwen van daaruit een systeem dat je team kan gebruiken.'

Foto alleen met beschikbaar echt beeld; anders typografische sectie. Geen verzonnen teamgrootte of jarenervaring. Knop 'Over Lead Velocity' → `/over`.

### FAQ en slot

FAQ: software vervangen? wat kan automatisch? hoe beginnen? kosten? wat als data ontbreken? wat beheert LV? Zie sectie 16 voor antwoorden.

Slot H2: 'Welk werk zou jouw team minder vaak hoeven uitzoeken?'

Slottekst: 'Vertel welk proces telkens terugkomt. We bekijken of er een duidelijke, haalbare eerste stap is.'

Knop: 'Plan een werkstroomcheck' → `/werkstroomcheck?source=home-bottom`.

## 9. Categoriepagina's: concrete briefing

Iedere pagina: hero → herkenbare taken → werkstroomvoorbeeld → teamcontrole → demo → passend/niet passend → werkwijze → prijzen → FAQ → CTA. Geen sectorwissel op dezelfde generieke tekst; gebruik de gegevens hieronder.

### `/groothandels`

SEO title: 'Automatisering voor technische groothandels | Lead Velocity'

H1: 'Van offerteaanvraag naar compleet dossier, met minder uitzoekwerk.'

Subkop: 'Wij helpen je binnendienst informatie uit aanvragen en bijlagen te verzamelen, ontbrekende gegevens zichtbaar te maken en open offertes op te volgen.'

Primaire CTA: 'Bekijk jullie offertestroom' → `/werkstroomcheck?category=groothandels&process=offerte-intake`.

Secundaire CTA: 'Bekijk de offertedemo' → `/voorbeelden?demo=offerte-intake`.

Taken: productreferenties en aantallen overnemen; klant-/aanvraaggegevens verzamelen; ontbrekende informatie navragen; dossier voor offerte voorbereiden; werkelijk open offertes volgen.

Voorbeeld: mail + Excel-lijst → velden verzamelen → ontbrekend gegeven markeren → conceptvraag → review → dossier/opvolgtaak. Team beslist over product, alternatief, prijs en leverdatum. Geen autonome ERP-orderinvoer of prijsberekening beloven.

Subsegmenten als voorbeelden: industriële onderdelen, gereedschap, bevestigingsmaterialen, technische verbruiksartikelen.

Fit: terugkerende aanvragen, binnendienstteam, bruikbare artikel-/klantbronnen. Meet: voorbereidingstijd, complete aanvragen, opvolgdekking.

### `/importeurs-distributeurs`

SEO title: 'Aftersales automatiseren voor importeurs en distributeurs | Lead Velocity'

H1: 'Minder uitzoekwerk rondom garantie en aftersales.'

Subkop: 'Breng productgegevens, bewijsstukken en correspondentie samen. Zo kan je team een aanvraag beoordelen met de benodigde informatie bij elkaar.'

Primaire CTA: 'Bekijk jullie aftersalesproces' → `/werkstroomcheck?category=importeurs-distributeurs&process=aftersales`.

Secundair: 'Bekijk de claimdemo' → `/voorbeelden?demo=aftersales`.

Taken: serienummer/model verzamelen; bewijsstukken opvragen; dealer herkennen; juiste procedure met bron ophalen; statusvragen voorbereiden.

Voorbeeld: dealerclaim → vereistencheck → ontbrekend aankoopbewijs → conceptvraag → review → compleet dossier. Team beslist over garantie/compensatie. Geen gesloten fabrikantportalen autonoom bedienen.

Voorbeelden: gereedschap, tuinmachines, apparatuur en fietsproducten. Primair bedrijfstype blijft importeur/distributeur, niet de zelfstandige winkel.

Meet: minuten administratie, contactmomenten per claim, complete intake, statusvragen.

### `/service-onderhoud`

SEO title: 'Service-intake automatiseren | Lead Velocity'

H1: 'Complete meldingen voor je servicedesk.'

Subkop: 'Verzamel klant-, locatie- en apparatuurgegevens voordat je team een melding behandelt. Maak de beschikbare informatie en volgende actie zichtbaar.'

Primaire CTA: 'Bekijk jullie servicestroom' → `/werkstroomcheck?category=service-onderhoud&process=service-intake`.

Secundair: 'Bekijk de servicedemo' → `/voorbeelden?demo=service-intake`.

Taken: ontbrekende machinegegevens opvragen; historie samenbrengen; melding samenvatten; doorzetten naar eigenaar; bekende status voorbereiden.

Team houdt technische diagnose, veiligheid, reparatie-instructies, contractdekking en monteurplanning. Geen responstijd voor monteurs beloven.

Voorbeelden: horeca-apparatuur, pompen, werkplaatsapparatuur, reinigingsmachines. Fit: eigen servicedesk met herhaaldelijke digitale meldingen.

Meet: contactmomenten voor volledige intake, informatiezoektijd, voorbereidingstijd.

### `/maatwerk-montage`

SEO title: 'Projectintake automatiseren voor maatwerk en montage | Lead Velocity'

H1: 'Van projectaanvraag naar een compleet dossier.'

Subkop: 'Breng wensen, foto's, documenten en projectgegevens samen. Bereid de volgende stap voor, zodat je team verder kan met gesprek, opname of offerte.'

Primaire CTA: 'Bekijk jullie aanvraagproces' → `/werkstroomcheck?category=maatwerk-montage&process=project-intake`.

Secundair: 'Bekijk de projectdemo' → `/voorbeelden?demo=project-intake`.

Taken: adres/wensen bundelen; ontbrekende documenten markeren; conceptvragen; route naar gesprek/opname; open aanvragen volgen.

Team houdt inmeting, engineering, calculatie, prijs en technische haalbaarheid. Nooit definitieve maten uit een foto afleiden.

Voorbeelden: deuren/poorten, zonwering, hekwerk, kozijnen/glas en bepaalde interieurbouw.

Meet: complete aanvragen, voorbereidingstijd, tijd tot afgesproken vervolgstap.

## 10. Oplossingenpagina's

`/oplossingen` H1: 'Automatisering voor het werk dat steeds terugkomt.' Intro: 'We beginnen bij één proces. Deze bouwblokken helpen informatie te verzamelen, werk voor te bereiden en opvolging zichtbaar te maken.' Toon vier procesfamilies; iedere kaart linkt naar een detailpagina en twee passende categorievoorbeelden.

Iedere detailpagina heeft: H1, situatie, in-/output, voorbeeld, menselijke grens, benodigde input, passende categorieën en procescheck-CTA. Geen aparte prijskaart per technische module.

| Route | H1 | Input/output | CTA-proces |
|---|---|---|---|
| aanvragen-dossiers | 'Van losse informatie naar een bruikbaar dossier.' | Mail/bijlage/formulier → compleetheid en conceptactie | intake |
| communicatie-opvolging | 'Herhaalcommunicatie voorbereiden. Open acties zichtbaar houden.' | Vraag/status → brongebonden concept en taak | opvolging |
| data-inzicht | 'Gegevens waar je team mee verder kan.' | Records/bronnen → onzekerheid, doublures en werkoverzicht | data |
| commerciele-voorbereiding | 'Een gerichte werklijst voor je commerciële team.' | Doelgroep + bronnen → accounts, onderbouwing en vervolgactie | sales |

Commerciële voorbereiding is geschikt voor dezelfde bedrijfscategorieën wanneer er een helder B2B-aanbod is en een team dat contacten oppakt. Toon geen willekeurige IT-sector als nieuwe homepagefocus. CTA 'Bekijk jullie commerciële voorbereiding' → `/werkstroomcheck?process=sales`.

Copy voor salesdetail: 'Geschikte bedrijven onderzoeken, contactrollen vinden en een logische reden voor contact voorbereiden kost tijd. We richten een werkstroom in die dat voorwerk ordent en vervolgacties bijhoudt. Je team voert de gesprekken en beoordeelt de kansen.'

WhatsAppblok op communicatiepagina: 'Wanneer jullie klanten of partners WhatsApp gebruiken, kan een afgebakende flow informatie verzamelen, veelgestelde procesvragen ondersteunen en doorzetten naar je team. We toetsen eerst de inrichting, toegestane berichten en aansluiting op jullie werkwijze.' Geen claim van onbeperkte koude broadcasts of ondersteunde coexistence zonder toets.

## 11. Campagnepagina's: vier verkoopingangen

Campagnepagina = één doelgroep, één probleem, één demo, één volgende stap. Header: logo plus één CTA; geen volledige megamenu. Footer: contact, privacy en terug naar site. Plaats betaalde analyse niet als eerste aankoopknop.

Vaste volgorde: hero → drie herkenbare taken → illustratieve demo → wat we voorbereiden/wat team beslist → hoe check werkt → prijsindicatie en scope → relevante FAQ → CTA/formulier. Toon maximaal twee CTA-typen: check en demo. Geen pop-ups of nepurgentie.

| Route | Campagne-H1 | Primaire knop | Vooringevuld proces | Ondersteunende boodschap |
|---|---|---|---|---|
| `/campagnes/offerte-intake` | 'Minder handwerk tussen aanvraag en offertevoorbereiding.' | 'Bekijk jullie offertestroom' | offerte-intake | Informatie verzamelen en ontbrekende velden zichtbaar maken |
| `/campagnes/aftersales` | 'Complete claims voordat je team ze beoordeelt.' | 'Bekijk jullie claimproces' | aftersales | Bewijsstukken en gegevens bij elkaar |
| `/campagnes/service-intake` | 'Minder nabellen om een servicemelding compleet te krijgen.' | 'Bekijk jullie service-intake' | service-intake | Identificatie en klachtomschrijving verzamelen |
| `/campagnes/project-intake` | 'Projectaanvragen waar je team mee verder kan.' | 'Bekijk jullie projectintake' | project-intake | Documenten, wensen en volgende stap |

Hero-subkop per pagina gebruikt dezelfde concrete taken als categoriepagina maar korter. Voor iedere knop gaat de gebruiker naar de check met category, process, campaign en source-parameters. Een tweede CTA 'Bekijk het voorbeeld' scrollt naar de demo op die pagina en start geen formulier.

Salescampagne in fase 2: H1 'Meer tijd voor gesprekken. Minder tijd kwijt aan vooronderzoek.' Demo: drie fictieve bedrijven met fit, bronnen en contactreden. Primair 'Bekijk jullie commerciële voorbereiding'. Geen aantallen leads/afspraken garanderen.

Campagnetaxonomie: category → subsegment → process → buyer → angle → variant. Voorbeeld: importeurs/distributeurs → tuinmachines → garantie-intake → aftersalesmanager → volledigheid → A. Categorie definieert de webcontext; subsegment definieert de accountlijst. Nieuwe landing alleen als boodschap en voorbeeld materieel verschillen; vermijd tientallen bijna identieke SEO-pagina's.

## 12. CTA-contract: exacte knopacties

| Plaats | Label | Actie |
|---|---|---|
| Global header | Plan een werkstroomcheck | `/werkstroomcheck?source=header` |
| Homepage hero | Bekijk een voorbeeld | `/voorbeelden?source=home-hero` |
| Pakket Voorbereiden | Bespreek Voorbereiden | check met package=voorbereiden |
| Pakket Werkstroom | Bespreek Werkstroom | check met package=werkstroom |
| Pakket Opschalen | Bespreek Opschalen | check met package=opschalen |
| Customkaart | Bespreek maatwerk | check met package=custom |
| Demo na afronden | Bekijk of dit bij jullie past | check met demo en process |
| Checkformulier | Vraag een werkstroomcheck aan | Valideer, verzend, bevestig alleen bij succes |
| Bedankpagina | Bekijk een passend voorbeeld | gekozen demo of voorbeeldenindex |
| Footer e-mail | info@leadvelocity.nl | mailto, alleen als actueel bevestigd |

Knoppen hebben overal een werkende bestemming. Geen 'Boek demo' die naar een algemene contactpagina gaat zonder context. Geen dode kalenderknop. Contextwaarden zijn selecties voor het formulier, geen verborgen toestemming.

## 13. Formulier, agenda en opvolging

H1 `/werkstroomcheck`: 'Bekijk waar een werkstroom jullie team kan helpen.'

Intro: 'In een gesprek van 20 minuten bekijken we welk werk terugkomt, wat je huidige software al doet en of een afgebakende eerste stap zinvol is.'

Formuliervelden:

- Naam — verplicht.
- Bedrijf — verplicht.
- Zakelijk e-mailadres — verplicht.
- Categorie — keuze uit vier + Ander bedrijfstype; optioneel, prefill waar bekend.
- Welk werk komt steeds terug? — verplicht, korte tekst of processelectie plus toelichting.
- Telefoon — optioneel; verplicht alleen bij expliciete keuze 'Bel mij'.
- Contactvoorkeur — E-mail / Bel mij; standaard E-mail.
- Frequentie — optioneel: dagelijks / wekelijks / minder vaak / onbekend.
- Huidige software — optioneel.

Geen gevoelige dossieruploads, verplichte omzetvelden of lange vragenlijst. Privacytekst: 'We gebruiken je gegevens om op deze aanvraag te reageren. Lees onze privacyverklaring.' Eventuele marketingopt-in apart, optioneel en niet vooraf aangevinkt. Geen marketingtoestemming in privacyacceptatie verstoppen.

Verzending moet aansluiten op bestaande backend/CRM als die bestaat. Nodig servercontract: naam, bedrijf, email, proces, optionele velden, broncontext; validatie op server; antispam; request-ID voor deduplicatie; echte foutmelding. Geen credentials in browser. Beschrijf in oplevering welke service het verzoek daadwerkelijk ontvangt.

Agenda: als een echte agendalink beschikbaar is, toon na aanvraag of naast formulier 'Kies direct een tijd'. Anders alleen aanvraagflow. Geen fake slots, geen verzonnen link. Tijdzone Europe/Amsterdam expliciet bij beschikbare afspraken.

States: submitting met disabled knop; succes pas na backendacceptatie; fout behoudt invoer en geeft retry. Bij storing: 'Je aanvraag is niet verstuurd. Probeer het opnieuw of mail ons.' Formulier dat alleen een animatie toont is niet klaar voor livegang.

Bedankpagina: 'Bedankt, je aanvraag is ontvangen.' Copy: 'We nemen contact op via je gekozen contactvoorkeur om een passend moment af te spreken.' Geen beloofde responstijd zonder bezetting. Een backendbevestiging is niet hetzelfde als geboekte afspraak; sla die stages apart op.

Interne opvolging: lead → kwalificeren → check gepland → gehouden → analyse aangeboden → betaald → implementatie → live → uitbreiden. Iedere kans heeft eigenaar, volgende actie en datum. Bronnen/UTM's bij lead bewaren; geen persoonsgegevens in analytics events.

## 14. Demo's en voorbeeldbibliotheek

Geen video fabriceren als er geen opname is. Maak vier eenvoudige klikdemo's met echte UI-componenten en expliciet fictieve data. Elk voorbeeld heeft drie stappen: binnengekomen informatie, voorbereiding, volgende actie. Interactie mag front-end lokaal zijn omdat dit een gelabelde demo is; claim geen live verwerking.

Offertedemo: klant 'Voorbeeldbedrijf A', aanvraag '12 stuks productreferentie X', gewenst moment ontbreekt. Output: gegevensoverzicht, ontbrekend veld, conceptvraag. Status 'Wacht op medewerkerreview'. Geen prijs.

Claimdemo: dealer 'Voorbeelddealer B', model 'Demo-100', serienummer aanwezig, aankoopbewijs ontbreekt. Output: compleetheidscheck, bron 'Fictieve dossiervereisten', conceptvraag. Geen garantiebesluit.

Servicedemo: 'Machine start niet', locatie aanwezig, machine-identificatie ontbreekt. Output: ontbrekende gegevens en samenvatting. Geen reparatieadvies.

Projectdemo: foto's genoemd, projectadres ontbreekt, type werk beschreven. Output: informatiekaart, ontbrekende velden en voorstel voor gesprek. Geen maatvoering of calculatie.

Iedere demo eindigt met: 'Dit voorbeeld laat de werkwijze zien. De inrichting en uitkomst hangen af van jullie proces en gegevens.' Knop naar passende werkstroomcheck.

Casecontent model: titel, categorie, proces, klantnaam/publicatierecht, nulmeting, meetperiode, na-meting, resterende controle, resultaat, bronnen, toestemming. Toon geen case als verplichte velden ontbreken. Klantlogo's alleen met juiste relatie/toestemming; geen merksuggestie dat klant van Nilo automatisch LV-klant is.

## 15. Prijzen, werkwijze en Over-pagina

`/prijzen`: H1 'Een afgebakende start. Duidelijke kosten voor inrichting en beheer.' Intro maakt eenmalig versus maandelijks onderscheid. Drie kaarten plus Custom, vergelijkingsmatrix, inbegrepen beheer, extra kosten, analyse €750, voorwaarden en FAQ. Geen betaalcheckout. Alle CTA's sturen met pakketcontext naar check.

`/werkwijze`: H1 'Van terugkerend werk naar een bruikbare werkstroom.' Zes stappen: check, analyse, voorstel, inrichting, acceptatie, beheer. Per stap: LV-output, benodigde klantinput, beslismoment. Benoem één proceseigenaar en twee gerichte werksessies als gebruikelijke start, niet als absoluut maximum voor elk project.

`/over`: missie, Bart, vaardigheden, werkprincipes en manier van leveren. Vermeld technische partners alleen als ze werkelijk betrokken zijn. Persoonlijke LinkedIn-link en foto alleen uit geverifieerde bestaande assets; niets afleiden uit de naam. Contactgegevens uit bestaande site controleren.

`/voor-wie`: vier categorieën plus generieke fitcriteria; link naar relevante oplossingen en check. 'Ander bedrijfstype?' sectie: 'Ook buiten deze categorieën kan dezelfde werkstroom passen. We bekijken eerst de herhaling, gegevens en uitvoerbaarheid.' Hiermee is categorie-focus niet hetzelfde als een hard marktverbod.

## 16. FAQ-copy

**Moeten we onze software vervangen?** 'We kijken eerst wat jullie huidige software kan en waar nog handwerk overblijft. Een werkstroom kan ernaast worden ingericht als de benodigde gegevens en koppelingen beschikbaar zijn.'

**Wat doet het systeem zelfstandig?** 'Dat leggen we per proces vast. We beginnen met voorbereiding en medewerkercontrole. Alleen afgesproken, geteste handelingen worden later automatisch uitgevoerd.'

**Hoe weten we of het genoeg oplevert?** 'We meten de huidige behandeltijd en toetsen met representatieve voorbeelden. Controle, correcties en uitzonderingen tellen mee in de netto uitkomst.'

**Wat kost de eerste stap?** 'De werkstroomcheck is kosteloos. Als er voldoende aanleiding is, volgt een analyse van €750. Die wordt verrekend bij een implementatie binnen 60 dagen.'

**Waarom betalen we maandelijks?** 'Voor het beheren van de ingerichte werkstroom: monitoring, incidentafhandeling, afgesproken bronupdates, rapportage en kleine instellingenwijzigingen. De precieze scope staat in het voorstel.'

**Kunnen we later uitbreiden?** 'Ja. We beginnen bij één werkstroom. Extra capaciteit of aangrenzende processen krijgen een eigen scope en prijs.'

**Kan WhatsApp onderdeel zijn?** 'Ja, als dat past bij jullie proces en de technische en communicatievoorwaarden. We bekijken eerst welk nummer, welke flow en welke overdracht nodig zijn.'

**Wat als automatisering niet loont?** 'Dan bouwen we het project niet. Soms is een bestaande softwarefunctie of een kleine procesaanpassing de betere stap.'

**Zijn onze gegevens veilig?** 'Toegang, verwerking, bewaartermijnen en verantwoordelijkheden worden per inrichting vastgelegd. We gebruiken alleen gegevens die nodig zijn voor het afgesproken proces.' Geen algemene 'AVG-proof'-claim.

## 17. Visuele richting en componenten

Behoud bruikbare bestaande merkassets. Ontwerp als een rustige, zakelijke systeemdienst: stevige typografie, duidelijke witruimte, herkenbare dossierkaarten, subtiele accentkleur en veel concreet werk. Geen neon-AI-glow, stockrobots of bewegende dashboards zonder betekenis.

Als er geen deugdelijke stijl aanwezig is: voorstel gebroken wit als achtergrond, donkerblauw/ink als tekst, warm groen als accent. Controleer contrast; groen op wit moet aan toegankelijkheid voldoen. Gebruik kleuren als configureerbare tokens, geen verspreide literals. Dit is een richting, geen verplichte rebrand.

Pagina's moeten mobiel werken zonder horizontale scroll. Tabellen/prijsmatrix stapelen of scrollen binnen een gelabelde container; CTA's blijven leesbaar. Geen sticky overlay die inhoud of formulieren afdekt.

Herbruikbare componenten: SiteHeader, SiteFooter, Hero, CategoryCard, ProcessCard, DemoStepper, BeforeAfter, HumanControl, Steps, PricingCards, ScopeTable, FAQ, CheckForm, EvidenceCard en CampaignLayout. Kies namen/architectuur passend bij bestaande stack; hergebruik bestaande goede componenten.

Contentconfiguratie per categorie: slug, titel, hero, taken, grenzen, processID, demoID, FAQ, SEO. Campaignconfig: campaignID, category, subsegmentoption, process, angle, title, CTA, demo en noindex. Pricingconfig centraal. Bewijsconfig scheidt illustrative/verified/planned; alleen verified mag een klantresultaat suggereren.

## 18. SEO, tracking en kwaliteitscontrole

Unieke title/meta-description per pagina; één H1; beschrijvende headings; semantische links/knoppen; correcte canonical; sitemap alleen publiceerbare indexeerbare pagina's. Geen FAQ-/review-/rating-schema met niet-bestaande reviews of claims. Gebruik organisatiegegevens alleen geverifieerd.

Eventnamen: cta_click, demo_open, demo_step, form_start, form_submit_success, form_submit_error, meeting_booked (alleen bevestigde booking). Parameters: page_type, category, process, campaign_id, package_id, cta_id. Geen naam/email/telefoon of vrije tekst naar analytics. Niet-essentiële tracking alleen volgens passend toestemmingsbeleid; respecteer keuze.

UTM's bewaren waar toegestaan: source, medium, campaign, content. Labels bijvoorbeeld lv-groothandel-offerte-capaciteit-a. Geen PII in URL. Attribution van formulier en uiteindelijke gewonnen klant behouden, met beperkingen zichtbaar.

Test minimaal: alle navigatie/CTA's; category-/pakketprefill; retour uit demo; toetsenbord/focus; mobiel 360/390 px en desktop; lege/onjuiste velden; double-submit; serverfout; echte succesroute; privacylinks; bestaande redirects; noindex van campagne-/bedankpagina's. Geen lijst van passed checks claimen zonder ze uit te voeren.

Aanvaarding: iedere publieke knop werkt, geen fabricated bewijs, centrale prijzen consistent, ieder nichevoorbeeld heeft grenzen, form success is echt, demo is gelabeld, geen secrets in client. Browsercheck van de complete funnel is vereist voordat de site klaar wordt genoemd.

## 19. GTM- en contentmachine achter de site

Commercieel proces: accountonderzoek → relevante buyer → toegestaan contact → herkenbare procesvraag → passende campagnepagina/demo → check → betaalde analyse → implementatie → live → uitbreiding.

Outreachlogica: concreet waargenomen aanbod → herkenbare terugkerende taak → afgebakende aanpak → vraag of die aanpak relevant is. CTA sluit inhoudelijk aan op body. Niet iedere mail direct 'Zal ik zijn profiel delen?' of 'Boek 15 minuten'. Geen nepvertrouwdheid, compliment over website of onbewezen achterstand.

Datamodel: bedrijf/domein/categorie/subsegment/proces; bewezen feit/bron/datum; buyer; route; kwalificatie; campagnevariant; volgende actie; uitsluitingen. Eén primaire campagne per bedrijf. Signalering ondersteunt keuze, niet toestemming.

Content per bewezen toepassing: één gelabelde demo, één praktische checklist, één procesuitleg, één FAQ, later één echte case. Die assets voeden pagina, mail, belgesprek, post en onboarding. Agents maken concepten uit de bronconfiguratie; Bart controleert de commerciële kern en claims.

Eerste markttest: 25 gecontroleerde accounts per categorie, per categorie één vergelijkbaar subsegment. Minstens vijf relevante gesprekken per testsegment als leerdoel. Daarna beste één/twee processen verdiepen. Geen nieuwe templatebouw zolang de eerste pilot instabiel is.

Automatiseer LV intern: research, gespreksnotities, voorstelconcepten, configuratievoorbereiding, testdocumentatie, monitoring en resultaatrapporten. Iedere externe toezegging en prijskeuze blijft bij de verantwoordelijke persoon. Geen claim dat agents een vast percentage werk overnemen voordat tijd wordt gemeten.

## 20. Schaalmodel: van eerste klanten naar groot bedrijf

Drie schaalhefbomen: meer klanten op dezelfde template; meer waardevolle werkstromen bij dezelfde klant; distributie via partners. Een vierde hefboom, internationaal uitbreiden, volgt pas bij bewezen delivery, taal-/regelkennis en ondersteunde stacks.

Iedere standaardimplementatie gebruikt dezelfde productbasis met configureerbare vereisten, bronnen, velden en communicatieregels. Iedere extra scope heeft prijs en owner. Custom dat vaak terugkomt wordt een productmodule; custom dat zelden terugkomt blijft duurder of wordt niet aangenomen.

| Fase | Omzetvoorbeeld | Vereiste organisatie |
|---|---|---|
| Bewijs | 8 × €1.250 = €10.000 MRR | Eén stabiele template, Bart sales, beschikbare techniek, urenregistratie |
| Herhaalbaarheid | 20 × gemiddeld €1.500 = €30.000 MRR | Vaste onboarding, customer success, ondersteunde connectoren |
| Distributie | 60 × gemiddeld €1.700 = €102.000 MRR | Meerdere deliveryteams, QA, partnerkanaal, centrale incident-/kostencontrole |
| Grote organisatie | 400 × gemiddeld €2.500 = €1 miljoen MRR | Meerdere productlijnen, management, internationale/partnerdistributie en volwassen platform |

Dit zijn rekenscenario's, geen verwachtingen. €1 miljoen ARR komt overeen met circa €83.333 MRR, zonder setupomzet. Een mix met setup kan €1 miljoen jaaromzet bereiken bij lagere MRR. Rapporteer actieve MRR, ARR, setup, contractwaarde en winst afzonderlijk.

Bij €100.000 MRR is solo uitvoering niet realistisch. Als 60 klanten gemiddeld drie technische beheeruren per maand vragen, zijn dat 180 uren; met 20% reserve 216 uren, vóór onboarding en productontwikkeling. Verdeel klanten in deliverygroepen op beschikbare capaciteit; een groep van circa 20–25 klanten is een eerste begrotingshypothese, geen bewezen norm. Meet p95 incidentlast en pieken, niet alleen gemiddelde uren.

Maandelijkse unit economics: omzet minus techniek, verbruik, support, data en partnervergoeding. Streef naar een directe bijdragemarge van minstens 60% vóór sales/overhead, maar bewijs die met werkelijke kosten. Onboardingfees moeten normale setupuren dragen. Basisontwikkeling apart begroten. Hoge MRR zonder lage handmatige uitzonderingslast is geen schaalbaar model.

Capaciteitsregels: maximaal twee nieuwe pilots tegelijk; vast supported-stackbeleid; betaalde change requests; ticketcategorieën; zichtbare incidentwachtrij; pauzeer acquisitie voor nieuwe configuraties bij instabiele levering. Geen onbeperkte support als verkoopargument.

Partners na herhaalde levering: branchegerichte implementateurs, IT-/CRM-partners die deze MKB-categorieën bedienen, distributeurs van software en vaknetwerken. Maak partneronboarding, demobibliotheek en provisiemodel. Neem commissies in acquisitiekosten mee. De partner verkoopt dezelfde goed afgebakende module, geen aangepaste versie zonder prijs.

Moat: procesvereisten, goede configuraties, connectoren, testsets, meetmethode, cases, distributie en vertrouwen. Klantdata wordt niet samengevoegd of doorverkocht zonder rechtmatige basis. Standaardtemplate-IP en klantdata expliciet onderscheiden; zorg voor export en overdracht bij vertrek.

## 21. Website-implementatieplan voor Claude

1. Inspecteer repository, AGENTS.md, framework, routes, huidige styles, formulierbackend, analytics, content en assets. Noteer wat echt bestaat en wat ontbreekt.
2. Maak een korte mapping bestaand → behouden/aanpassen/redirect. Behoud relevante SEO en geverifieerd bewijs; verwijder claims die niet zijn onderbouwd.
3. Bouw centrale content- en prijsconfiguratie plus gedeelde layouts.
4. Bouw homepage, categorieën, prijzen, werkwijze en voorbeelden eerst. Voeg oplossingen en campagnepagina's met dezelfde componentbasis toe.
5. Bouw CTA-routing/prefill en integreer echte aanvraagverwerking. Is een dependency onbekend, bouw de reviewbare UI en benoem de livegangblokkade; toon geen fake success als oplossing.
6. Voeg SEO, noindex, privacyroutes en toegestane tracking toe.
7. Controleer copy/claims, routes en complete funnel in browser. Voer passende repositorychecks uit.
8. Lever preview, lijst gewijzigde routes, werking formulier, open afhankelijkheden en deploymentinstructies. Niet automatisch ongeteste klantagents bouwen.

Geen redesign om het redesign: de positionering en conversiepaden moeten overal consistent zijn. Als het bestaande ontwerp sterk is, pas vooral inhoud, componenten en structuur aan.

## 22. Nog benodigde assets en beslissingen

Geen extra strategische brainstorm nodig voordat de website kan worden voorbereid. Wel nodig voor definitieve livegang: echte foto Bart indien gewenst; bevestigde contactgegevens; formulier-/CRM-bestemming; eventuele agenda-URL; werkelijke privacyinformatie; geverifieerde klantcases/logo's; akkoord op voorgestelde prijspublicatie; contracttekst voor acceptatie/garantie; geverifieerde ondersteunde stacks.

Ontbrekend bewijs wordt vervangen door gelabelde demo, niet door verzonnen cases. Ontbrekende agenda wordt vervangen door echte aanvraagflow. Een ontbrekende backend blijft expliciete livegangafhankelijkheid. Maak daarvoor een kort overzicht in de oplevering.

## 23. Definitie van klaar

Een bezoeker begrijpt binnen één scherm wat LV helpt automatiseren; kiest via categorie of proces een relevant voorbeeld; ziet hoe zijn team controle houdt; begrijpt eenmalig versus maandelijks; kan met context een check aanvragen; krijgt een echte bevestiging; en wordt intern voorzien van eigenaar en volgende actie.

Claude kan alle pagina's uit deze briefing implementeren zonder zelf nieuwe proposities, guarantees of sectorclaims te bedenken. De onderneming kan dezelfde content-/productstructuur uitbreiden met een bewezen proces, zonder opnieuw haar hele website of pakketladder te veranderen.

## Bijlage A — korte startinstructie voor Claude

Gebruik dit volledige document als leidende briefing voor leadvelocity.nl. Combineer commerciële voorbereiding en MKB-kantoorautomatisering onder één positionering. Behoud vier brede categorieën, één pakketstructuur en één proces per campagne. Implementeer de fase-1-pagina's, exacte CTA-routes, gelabelde demo's en echte aanvraagflow in de bestaande codebase. Controleer eerst aanwezige infrastructuur en AGENTS.md. Behoud goede merkassets, maak prijzen/content centraal beheersbaar en test de complete funnel. Voeg geen verzonnen resultaten, integraties, teamleden of omzetgaranties toe. Lever een reviewbare preview en benoem concrete livegangafhankelijkheden. De commerciële ambitie is een grote schaalbare systeemdienst; €10k MRR is alleen de eerste mijlpaal.

## Bijlage B — herkomst en grenzen

Gebaseerd op het aangeleverde 'Lead_Velocity_GTM_Blueprint_2026-10-09 (1).md' en de actuele 'Lead_Velocity_GTM_Cold_Email_Strategie.md'. De eerste bevat onderzoek en bronregister; deze handover gebruikt de proceskeuzes en begrenzingen als strategie-input, niet als onafhankelijk bewezen sectorresultaten.

Pakketten, prijzen, capaciteit en omzetmixen zijn aanbevolen hypotheses. Geen repository, klantomgeving, actuele stack, cases of totale markt is in deze opdracht geaudit. Dit document levert website-specificatie en bedrijfsrichting; er is niets gepubliceerd of verzonden.

Kanaal- en datagebruik moeten passen bij wet, provider- en datalicenties. Een gevonden adres is geen algemene verzendtoestemming; prospectresearch en toegestane benadering zijn aparte stappen. De bestaande plannen bevatten hier de relevante uitgangspunten. Controleer actuele voorwaarden tijdens campagne-implementatie.
