# Campagne: Technische groothandel (v2)

**Versie:** v2, 2026-10-11 · vervangt v1 volledig
**Bronnen:** `docs/strategy/2026-10-11-messaging-strategie.md` (§1, §2, §4, §5, §7, §8), `docs/strategy/2026-10-09-website-gtm-handover.md` (§4, §6, §16, §19), `.planning/research/2026-10-11-pijnonderzoek-categorieen.md` (§1, §5), `src/content/pricing.ts`, `src/content/faq.ts`

## Voor wie

- **Bedrijf:** technische groothandel met 10–75 medewerkers. Industriële onderdelen, gereedschap, bevestigingsmaterialen, technische verbruiksartikelen. Minstens twee mensen op de binnendienst, aanvragen komen binnen per mail, pdf of Excel.
- **Ontvanger:** de eigenaar of directeur. Hij betaalt en draagt het risico.
- **Noem in de mail:** de teamleider binnendienst. Die voelt het werk en moet mee in het gesprek (handover §4: procesowner en beslisser allebei betrekken).
- **Niet benaderen:** bedrijven midden in een ERP-migratie, bedrijven waar bijna alles via EDI of een webshop binnenkomt, bedrijven met heel weinig aanvragen.

## Wat we aanbieden (exact, niet afwijken)

| Stap | Wat | Prijs |
|---|---|---|
| 1 | Gratis adviesgesprek, 20 minuten | gratis |
| 2 | Analyse: proceskaart, nulmeting, input- en toegangscheck, businesscase, acceptatiecriteria | €750, verrekend bij een implementatie binnen 60 dagen |
| 3 | Vast pakket, vaste scope | vanaf €2.950 inrichting + €595 per maand (Start), exclusief btw |

Maandkosten starten pas na acceptatie. Prijzen komen alleen in touch 4 of 5 voor, nooit in touch 1. Bedragen altijd uit `src/content/pricing.ts`, in de notatie €2.950 / €595 / €750.

## Regels voor elke mail

1. Maximaal 120 woorden in de body, je-vorm, één idee per zin.
2. Eén vraag of één CTA. Mails die met een vraag eindigen hebben de campagnelink alleen in de ondertekening.
3. Onderwerpregel kort en concreet. Geen "AI", geen vraagteken-clickbait, geen naam van het bedrijf.
4. Geen verzonnen cijfers, cases, klantnamen, reactietijden, percentages of garanties. Geen tijdsclaims ("binnen een uur") tot we bij een echte klant hebben gemeten.
5. Geen nepvertrouwdheid, geen compliment over hun website, geen aanname dat ze achterlopen (handover §19).
6. Geen universele koppelbelofte: "naast Outlook en jullie eigen systeem", "voor zover de gegevens beschikbaar zijn".
7. AI noemen we niet in de mails. Vraagt de ontvanger ernaar, dan antwoorden we zoals in "Bezwaren en antwoorden" onderaan.
8. Ondertekening: `[Naam afzender]`, `Lead Velocity`, campagnelink van die touch. Versturen vanaf een persoonlijk adres, niet vanaf `info@` of `noreply@`.

## Signalen voor personalisatie

Toegestane signalen (handover §4): **vacature binnendienst** en **assortimentsuitbreiding** (nieuw merk, nieuwe productgroep). Een signaal is de aanleiding voor de mail, geen bewijs dat er iets mis is. Schrijf dus "dat was de aanleiding", nooit "dus jullie hebben een achterstand".

Elke touch heeft een regel `[Signaal: …]`. Vervang die door één zin, of laat hem weg als er voor die touch niets nieuws te melden is. Herhaal niet letterlijk dezelfde zin in elke mail.

## Campagnelinks

Patroon voor touch N:

```
https://www.leadvelocity.nl/?category=groothandels&source=outreach-gh-t{N}&utm_source=email&utm_medium=outreach&utm_campaign=groothandel-v2&utm_content=t{N}
```

Uitzondering touch 3: de demo-link `https://www.leadvelocity.nl/voorbeelden?demo=offerte-intake&source=outreach-gh-t3`.

---

## Touch 1 — Overtypen uit mail en Excel (dag 1)

**Doel:** het werk benoemen dat ze herkennen en vragen of het speelt. Geen aanbod, geen prijs.
**Versturen:** dag 1, dinsdag of woensdag, tussen 7:30 en 9:00.
**Onderwerp:** `Aanvragen uit mail en Excel`
**Signaal-regel:**
- vacature: `[Signaal: Ik zag dat jullie een commercieel medewerker binnendienst zoeken. Dat was de aanleiding voor deze mail.]`
- assortiment: `[Signaal: Ik zag dat jullie [merk/productgroep] aan het assortiment hebben toegevoegd. Dat was de aanleiding voor deze mail.]`

```
Beste [voornaam],

[Signaal: …]

Vaak begint een offerteaanvraag met overtypen: artikelen en aantallen uit een mail of Excel-lijst één voor één in het systeem zetten. Pas daarna kan de binnendienst prijzen.

Wij zetten dat voorwerk klaar. De artikelen en aantallen staan erin, wat ontbreekt is gemarkeerd en er ligt een conceptvraag aan de klant. Je binnendienst controleert, prijst en verstuurt. Dat gebeurt naast Outlook en jullie eigen systeem, zonder nieuw systeem.

Is overtypen een vast deel van de dag bij jullie binnendienst?

Met vriendelijke groet,
[Naam afzender]
Lead Velocity
https://www.leadvelocity.nl/?category=groothandels&source=outreach-gh-t1&utm_source=email&utm_medium=outreach&utm_campaign=groothandel-v2&utm_content=t1
```

**CTA:** de vraag. Link alleen in de ondertekening.

---

## Touch 2 — Het artikelnummer dat niet klopt (dag 4)

**Doel:** een tweede, scherpere situatie noemen: de aanvraag die niet compleet is. Laten zien dat het team beslist.
**Versturen:** dag 4, als er geen antwoord is op touch 1. Als antwoord op de draad van touch 1.
**Onderwerp:** `Het artikelnummer van de klant`
**Signaal-regel:**
- vacature: `[Signaal: Met een vacature open komt dit vaak bij minder mensen terecht.]`
- assortiment: `[Signaal: Met [merk/productgroep] erbij komen er nieuwe nummers bij om naast elkaar te leggen.]`
- geen nieuw signaal: regel weglaten.

```
Beste [voornaam],

[Signaal: …]

Een ander moment waarop een aanvraag blijft hangen: de klant noemt zijn eigen artikelnummer en dat klopt niet met dat van jullie. Of het aantal of het afleveradres ontbreekt. Dan gaat er eerst een mail terug en ligt de aanvraag stil.

Wij leggen het nummer van de klant naast jullie artikelbestand, voor zover die gegevens beschikbaar zijn, en markeren wat niet klopt of ontbreekt. De vraag aan de klant staat klaar als concept. Je binnendienst kijkt hem na en verstuurt.

Hoe vaak moet er bij jullie eerst een mail terug voordat er geprijsd kan worden?

Met vriendelijke groet,
[Naam afzender]
Lead Velocity
https://www.leadvelocity.nl/?category=groothandels&source=outreach-gh-t2&utm_source=email&utm_medium=outreach&utm_campaign=groothandel-v2&utm_content=t2
```

**CTA:** de vraag. Link alleen in de ondertekening.

---

## Touch 3 — Eén aanvraag, stap voor stap (dag 9)

**Doel:** laten zien in plaats van uitleggen. Het voorbeeld wegzetten als voorbeeld, niet als klantcase. "Zonder nieuw systeem" en "jij beslist" als kern.
**Versturen:** dag 9, nieuwe draad.
**Onderwerp:** `Eén offerteaanvraag, stap voor stap`
**Signaal-regel:**
- vacature: `[Signaal: Handig om ook aan de teamleider binnendienst te laten zien.]`
- assortiment: `[Signaal: Het voorbeeld werkt met een Excel-lijst, zoals klanten die vaak sturen.]`
- geen nieuw signaal: regel weglaten.

```
Beste [voornaam],

[Signaal: …]

Laten zien is makkelijker dan uitleggen. We hebben een voorbeeld van één offerteaanvraag: een mail met een Excel-lijst, de artikelen en aantallen die eruit worden overgenomen, één ontbrekend gegeven dat wordt gemarkeerd en de conceptvraag aan de klant.

Het is een voorbeeld, geen klantcase. Het laat zien hoe het naast Outlook en jullie eigen systeem werkt, zonder nieuw systeem. Externe acties beginnen met akkoord van je medewerker. Prijs, alternatief en levertijd blijven bij je binnendienst.

Bekijk het voorbeeld:
https://www.leadvelocity.nl/voorbeelden?demo=offerte-intake&source=outreach-gh-t3

Met vriendelijke groet,
[Naam afzender]
Lead Velocity
```

**CTA:** de demo-link. Geen tweede link in de ondertekening.

---

## Touch 4 — Offertes zonder opvolging, en wat het kost (dag 15)

**Doel:** de derde situatie noemen (opvolging), het personeelstekort als reden waarom het nu speelt, en het traject met prijzen helder maken.
**Versturen:** dag 15, nieuwe draad.
**Onderwerp:** `Offertes die blijven liggen`
**Signaal-regel:**
- vacature: `[Signaal: Ik zag dat de vacature voor de binnendienst nog openstaat.]` (alleen als dat zo is)
- assortiment: `[Signaal: Meer artikelen betekent meestal ook meer offertes om op te volgen.]`
- geen nieuw signaal: regel weglaten.

<!-- Interne bron, niet in de mail: UWV, "Personeelstekort blijft, aantal vacatures daalt" (groothandel), tekort aan commercieel medewerkers binnendienst en medewerkers klantenservice. https://www.uwv.nl/nl/arbeidsmarktinformatie/sector/detail-groothandel/personeelstekort-blijft-aantal-vacatures-daalt -->

```
Beste [voornaam],

[Signaal: …]

Nog één situatie: een offerte gaat de deur uit en niemand belt na. Niet uit onwil, de binnendienst zit vol. Extra binnendienstmedewerkers vinden is lastig; daar is in de groothandel een tekort aan.

Wij houden open offertes bij en zetten de nabelmail als concept klaar. Je binnendienst beslist of die verstuurd wordt.

Zo werken we: eerst een gratis adviesgesprek van 20 minuten. Is er aanleiding, dan volgt een analyse van €750, die we verrekenen als jullie binnen 60 dagen starten. Pakketten beginnen vanaf €2.950 + €595 per maand, exclusief btw. Welk pakket past, volgt uit de analyse; het bijhouden en opvolgen van open offertes valt onder het pakket Compleet. Maandkosten starten pas na acceptatie.

Plan een gratis adviesgesprek:
https://www.leadvelocity.nl/?category=groothandels&source=outreach-gh-t4&utm_source=email&utm_medium=outreach&utm_campaign=groothandel-v2&utm_content=t4

Met vriendelijke groet,
[Naam afzender]
Lead Velocity
```

**CTA:** het adviesgesprek.

---

## Touch 5 — Voor wie het past, en voor wie niet (dag 21)

**Doel:** afsluiten zonder druk. De qualifier uit strategie §7 laten doen wat een follow-up niet kan: de ontvanger laten beslissen of het voor hem is.
**Versturen:** dag 21, als antwoord op de draad van touch 4.
**Onderwerp:** `Laatste mail hierover`
**Signaal-regel:**
- alleen als er sinds touch 1 iets nieuws is (nieuwe vacature, nieuw merk): `[Signaal: …]` in één zin. Anders weglaten.

```
Beste [voornaam],

[Signaal: …]

Dit is de laatste mail hierover.

Het past bij groothandels met 10 tot 75 medewerkers, waar minstens twee mensen aanvragen verwerken die per mail, pdf of Excel binnenkomen, en waar de binnendienst de concepten wil controleren.

Het past niet als je een nieuw ERP zoekt, als elke aanvraag compleet anders is of als het systeem zonder controle zelf moet beslissen.

Herken je jullie binnendienst in het eerste rijtje, plan dan een gratis adviesgesprek van 20 minuten. Neem de teamleider binnendienst gerust mee. Past het niet, dan zeggen we dat ook.

https://www.leadvelocity.nl/?category=groothandels&source=outreach-gh-t5&utm_source=email&utm_medium=outreach&utm_campaign=groothandel-v2&utm_content=t5

Met vriendelijke groet,
[Naam afzender]
Lead Velocity
```

**CTA:** het adviesgesprek. Na touch 5 stoppen. Op zijn vroegst na 3 maanden opnieuw, met een ander signaal.

---

## Planning

| Dag | Touch | Onderwerp | CTA | Prijs in mail |
|---|---|---|---|---|
| 1 | 1 | Aanvragen uit mail en Excel | vraag | nee |
| 4 | 2 | Het artikelnummer van de klant | vraag | nee |
| 9 | 3 | Eén offerteaanvraag, stap voor stap | demo | nee |
| 15 | 4 | Offertes die blijven liggen | adviesgesprek | ja |
| 21 | 5 | Laatste mail hierover | adviesgesprek | nee |

Stop de reeks zodra iemand antwoordt, ook bij "geen interesse".

## Wat we meten

Per batch van 25 accounts (handover §19: eerste markttest 25 gecontroleerde accounts): antwoorden, geplande gesprekken, en per gesprek of de lead zichzelf herkende in "past goed" (strategie §7). Geen streefpercentages vooraf; die zetten we na de eerste batches.

---

## Bezwaren en antwoorden

Antwoorden in mailtoon, gelijk aan de FAQ op de site (`src/content/faq.ts`). Beloof niets wat daar niet staat.

**"Dit gaat mijn mensen vervangen."**
Nee. Het systeem doet het voorwerk. Je medewerkers controleren, beslissen en houden het klantcontact. Zo houden ze meer tijd over voor verkopen en helpen.

**"Is dit AI? Wat gebeurt er met onze data?"**
Ja, waar het helpt: om tekst uit mails en bijlagen te lezen en concepten te schrijven. Daarnaast gebruiken we vaste regels. We gebruiken alleen de gegevens die nodig zijn voor het afgesproken proces, en leggen toegang, verwerking en bewaartermijnen per inrichting vast.

**"We hebben al een ERP, moeten we iets vervangen?"**
Nee, niet vooraf. We kijken eerst wat jullie huidige software kan en waar nog handwerk overblijft. Wat wij inrichten kan ernaast draaien als de benodigde gegevens en koppelingen beschikbaar zijn. Waar het kan koppelen we, anders via export of Excel.

**"Wat kost het?"**
Het adviesgesprek is gratis. Is er voldoende aanleiding, dan volgt een analyse van €750. Die verrekenen we bij een implementatie binnen 60 dagen. Pakketten beginnen vanaf €2.950 inrichting en €595 per maand, exclusief btw. Maandkosten starten pas na acceptatie.

**"Waarom elke maand betalen?"**
Voor het beheer van wat we inrichten: monitoring, incidentafhandeling, afgesproken bronupdates, rapportage en kleine instellingenwijzigingen. De precieze scope staat in het voorstel.

**"Wat als het niet loont?"**
Dan bouwen we het niet. Soms is een bestaande functie in jullie software of een kleine aanpassing in het proces de betere stap. Dat zeggen we dan ook.

**"Stuur maar wat informatie."**
Stuur de demo-link uit touch 3 en stel één vraag: "Hoe vaak moet er bij jullie eerst een mail terug voordat er geprijsd kan worden?" Geen brochure.

**"Nu even geen tijd."**
Vraag wanneer het beter uitkomt en zet een herinnering. Niet verder doormailen.
