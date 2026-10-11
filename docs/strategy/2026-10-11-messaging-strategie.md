# Messagingstrategie leadvelocity.nl

**Datum:** 2026-10-11 · **Status:** voorstel, wacht op keuzes van Bart (§9)
**Bouwt op:** handover 2026-10-09 (leidend voor aanbod, prijzen, grenzen) en drie onderzoeken van 2026-10-11:
- `.planning/research/2026-10-11-pijnonderzoek-categorieen.md` — pijn per categorie (extern)
- `.planning/research/2026-10-11-hero-messaging-conversie.md` — hero, messaging, contentarchitectuur (extern)
- `.planning/research/2026-10-11-interne-kennis-synthese.md` — wat we intern al wisten en waar het botst

**Eerlijk vooraf:** de pijn per categorie is voor een groot deel nog hypothese. Hard bewijs is er voor de **personeelskrapte** (UWV: tekort binnendienst groothandel; Wij Techniek 2025: ruim 40% van de installatiebedrijven heeft een tekort aan vakmensen) en voor de **taken zelf** (vacatureteksten). Cijfers over tijd per aanvraag komen van leveranciers en blijven intern. Echte gesprekken met klanten ontbreken nog; zie §10.

---

## 1. De kernpijn, in klanttaal

> **"Het eerste half uur van elke aanvraag gaat op aan mail lezen, bijlagen openen, uitzoeken wat er ontbreekt en terugmailen. Dat is precies de tijd die mijn mensen nodig hebben om te verkopen en te helpen. Extra mensen vinden we niet, dus blijft het liggen."**

Drie lagen:
1. **Het werk zelf:** overtypen uit mail, pdf en Excel; nabellen om ontbrekende gegevens (artikelnummer, serienummer, aankoopbewijs, adres); opvolgen wat openstaat.
2. **Het gevolg:** aanvragen liggen te wachten, offertes gaan te laat de deur uit, klanten moeten twee keer mailen en kennis zit in een paar hoofden.
3. **Waarom het nu speelt:** er zijn geen mensen te vinden (UWV, Wij Techniek). "Meer mensen aannemen" is geen echte optie meer.

Wie het voelt: binnendienst, aftersales, servicecoördinator, calculator. Wie betaalt: eigenaar of directeur, bij grotere bedrijven samen met de afdelingsmanager.

## 2. Per categorie: pijn → wat wij doen → wat het team houdt

| Categorie | Herkenbare pijn (klanttaal) | Wat wij voorbereiden | Wat het team beslist |
|---|---|---|---|
| **Technische groothandel** | "Ik typ de hele dag aanvragen over." "Klant-SKU klopt niet met ons nummer, eerst terugmailen." "Offertes blijven liggen." | Gegevens uit mail en bijlage halen, ontbrekend markeren, conceptvraag klaarzetten, open offertes bijhouden | Product, alternatief, prijs, levertijd |
| **Importeur / distributeur** | "Elke claim drie keer heen en weer om een aankoopbewijs of serienummer." "Dealers vragen steeds naar de status." | Claim checken op vereisten, ontbrekend bewijs opvragen, statusantwoord voorbereiden | Garantie en vergoeding |
| **Service & onderhoud** | "We bellen terug om te vragen welke machine het is." "De helft van de telefoontjes is 'wanneer komt de monteur?'" | Melding compleet maken (machine, locatie, klacht), samenvatten, doorzetten | Diagnose, planning, veiligheid |
| **Maatwerk & montage** | "Aanvragen zonder adres, maten of foto's." "We vergeten na te bellen." | Wensen, foto's en documenten bundelen, ontbrekend markeren, volgende stap voorstellen | Inmeting, calculatie, prijs |

Pijn per categorie onderbouwen we met de echte gesprekken uit §10, niet met verzonnen cijfers.

## 3. Positionering (naar April Dunford)

| | |
|---|---|
| **Alternatieven van de klant** | Meer mensen aannemen (lukt niet), alles bij het oude laten, Excel-sjablonen en macro's (breken bij elke nieuwe klantlay-out), EDI of een ERP-module (werkt alleen voor grote klanten), zware order-intake-agents van ERP-partners (duur, gebonden aan één ERP) |
| **Wat ons anders maakt** | Werkt naast mail en het eigen systeem, zonder nieuw systeem. De mens controleert altijd. We starten met één proces, tegen een vaste prijs en met een vaste scope. |
| **Waarde** | Aanvragen komen compleet bij je team. Het team besteedt tijd aan verkopen en helpen, niet aan uitzoeken. |
| **Best passende klant** | 10–75 medewerkers, minstens twee mensen op het proces, input die digitaal binnenkomt, één eigenaar |
| **Categorie (hoe ze ons noemen)** | "Automatisering voor binnendienst en klantenservice", niet "AI-bureau" |

**AI:** niet in de H1. Wel één keer duidelijk uitgelegd in "Zo werkt het", samen met wat er met de data gebeurt, en in de FAQ. Onderbouwing: Exact MKB Barometer 2026, waarin 48% het zorgelijk vindt om bedrijfsdata in AI te stoppen.

## 4. Message house

**Belofte:** *Elke aanvraag compleet, voordat je team eraan begint.*

| Pijler | Boodschap | Bewijs op de site |
|---|---|---|
| **Compleet binnen** | We halen gegevens uit mail en bijlagen en zien direct wat ontbreekt | Demo met een ontbrekend veld, voorbeeldaanvraag stap voor stap |
| **Jij beslist** | Alles is een concept. Je medewerker controleert en verstuurt | "Wat het team beslist" per categorie, regel "niets gaat de deur uit zonder akkoord" |
| **Past in wat je hebt** | Geen nieuw systeem. Werkt met Outlook, Excel en jullie ERP | Uitleg over koppelingen, een implementatie met afgebakende scope |

**Risico wegnemen (bij elke CTA):** gratis en vrijblijvend · vaste prijs · data blijft van jullie · past het niet, dan zeggen we dat.

## 5. Hero

**Formule (onderzoek §7.1):** H1 van maximaal 10 woorden. Noem het concrete proces en het resultaat of de weggenomen angst, en laat "AI" weg. Daaronder een subkop van 15–25 woorden die uitlegt wat er gebeurt en dat de mens controleert. Dan een regel voor wie het is, en een CTA met de geruststelling direct ernaast.

**Dynamiek:** er is geen data dat een automatisch roterend woord beter converteert, en voor automatisch wisselende content raadt NN/g af om het te gebruiken. Advies: **statisch per segment, dynamisch op initiatief van de bezoeker.**
- Komt de bezoeker via een outreach- of campagnelink (`?category=`) of via een categoriepagina, dan krijgt hij de vaste H1 van dat segment.
- De generieke homepage heeft een statische H1 plus **keuzeknoppen** ("Waar wil je mee beginnen? Offerteaanvragen · Garantieclaims · Servicemeldingen · Projectaanvragen"). Een klik wisselt de demo en de subkop. Dat is dynamisch, maar de bezoeker bepaalt het, en het zegt direct "dit gaat over jou".

**Generiek (homepage zonder segment):**
- H1: **"Elke aanvraag compleet, voordat je team eraan begint."**
- Sub: "Wij lezen mails en bijlagen, markeren wat ontbreekt en zetten een antwoord klaar. Jouw medewerker controleert en verstuurt, gewoon in Outlook en jullie eigen systeem."
- Voor wie: "Voor technische groothandels, importeurs, servicebedrijven en maatwerkbedrijven met 10–75 medewerkers."
- CTA: **"Plan een gratis adviesgesprek"** met microcopy: "20 minuten, vrijblijvend. Past het niet, dan zeggen we dat ook."
- Tweede CTA: "Bekijk een voorbeeld" met microcopy: "Eén aanvraag, stap voor stap."

**Per segment (vaste H1 bij `?category=` en op de categoriepagina):**

| Segment | H1 | Kern van de subkop |
|---|---|---|
| Groothandel | **Elke offerteaanvraag compleet, voordat je binnendienst begint.** | Artikelen en aantallen uit mail en Excel, ontbrekend markeren, conceptvraag klaar. Je binnendienst prijst en verstuurt. |
| Importeur / distributeur | **Garantieclaims compleet, zonder heen-en-weer mailen.** | Serienummer, model en aankoopbewijs gecheckt tegen jullie eisen. Je aftersales beslist. |
| Service & onderhoud | **Elke servicemelding compleet, voordat je planner begint.** | Machine, locatie en klacht verzameld en samengevat. Je servicedesk plant en diagnosticeert. |
| Maatwerk & montage | **Weet bij elke projectaanvraag meteen wat er ontbreekt.** | Wensen, foto's en adres gebundeld, volgende stap voorgesteld. Je team doet inmeting en prijs. |

Tijdsclaims ("binnen een uur") gebruiken we pas na een eerste meting bij een echte klant.

## 6. Homepage: volgorde en wat elke sectie doet

| # | Sectie | Doel | Wat we doen / hoe / wie zoeken / marketing |
|---|---|---|---|
| 1 | **Hero** (§5) | "Is dit voor mij?" binnen 5 seconden | Wat we doen + voor wie |
| 2 | **Herken je dit?** | 3 situaties in klanttaal per segment, plus wat het kost als je niets doet (in uren die de lezer zelf kan natellen) | Probleem |
| 3 | **Zo werkt het** | 3 stappen: lezen → markeren wat ontbreekt → klaarzetten, jij controleert. De enige plek waar AI en data worden uitgelegd | Hoe we het doen |
| 4 | **Voorbeeld** | Eén aanvraag van binnenkomst tot compleet, gelabeld als voorbeeld | Bewijs zonder case |
| 5 | **Past in wat je hebt** | Geen nieuw systeem: Outlook, Excel, ERP. Wat we nodig hebben om te starten | Bezwaar "gedoe" |
| 6 | **Traject en prijs** | Gratis gesprek → analyse €750 → vast pakket. Vanaf-prijzen en wat erin zit | Hoe we werken + prijs |
| 7 | **Voor wie dit werkt (en voor wie niet)** | §7, de qualifier | Wie we zoeken |
| 8 | **Zekerheden** | Vaste prijs, data van jullie, mens beslist, maandelijks opzegbaar na de afgesproken termijn | Risico wegnemen |
| 9 | **FAQ** | Bezwaren: data, "vervangt dit mijn mensen?", fouten, ERP, AI, doorlopende kosten, doorlooptijd | Bezwaren |
| 10 | **Slot-CTA** | Gesprek, plus segmentkeuze voor wie via de generieke ingang kwam | Conversie |

Na secties 3, 6 en 9 staat telkens dezelfde CTA.

Wat er verandert ten opzichte van nu:
- "Herkenbare situaties" wordt concreet per segment.
- "Breder dan intake" (commerciële voorbereiding) verdwijnt van de homepage. Het is een ander aanbod en verwatert de belofte; het blijft wel bereikbaar via Oplossingen.
- Er komt een eigen sectie "Past in wat je hebt".
- De qualifier gaat direct na de prijs.

## 7. "Voor wie dit werkt (en voor wie niet)"

**Past goed**
- 10–75 medewerkers, met minstens twee mensen die dit werk doen
- Aanvragen, claims of meldingen komen binnen per mail, als pdf of als Excel
- Er komt genoeg terug om te automatiseren (aantal per week vullen we in na de eerste analyses)
- Eén persoon die beslist en meedenkt
- Je wilt dat je team de concepten controleert

**Past niet**
- Je zoekt een nieuw ERP of CRM
- Elke aanvraag is volledig anders (te weinig herhaling)
- Er is de eerste weken geen tijd om mee te kijken en te controleren
- Je wilt dat het systeem zonder controle zelf beslist
- Het volume is erg laag

Slotzin: *"Twijfel je? Dat bespreken we in 20 minuten, en als het niet past zeggen we dat."*

Dit blok is ook onze kwalificatie in gesprekken. Noteer per lead of hij zichzelf als "past goed" herkende.

## 8. Taal

| Gebruiken | Vermijden of uitleggen |
|---|---|
| aanvraag, offerteaanvraag, claim, melding, nabellen, overtypen, opvolgen, ontbreekt, compleet, binnendienst, controleren, verzenden | "uitzoekwerk" (te vaag; noem het concrete werk), "werkstroom" (alleen als pakketnaam), "conceptactie", "commerciële voorbereiding", "agent", "autonoom", "AI-revolutie", "digitale transformatie" |
| je/jullie, nuchter, één zin per idee | superlatieven, beloofde percentages, tijdsclaims zonder meting |

**Cijfers op de site:** alleen UWV (tekort binnendienst) en Wij Techniek (tekort vakmensen, alleen in servicecontext), met bron, op één plek. Leverancierscijfers (minuten per order, kosten per claim) blijven intern, tot we zelf hebben gemeten.

## 9. Keuzes voor Bart

1. **Hero-dynamiek:** het roterende woord vervangen door een statische H1 met keuzeknoppen (advies), of het roterende woord houden.
2. **Generieke H1:** "Elke aanvraag compleet, voordat je team eraan begint." (advies), of de huidige "Automatiseer je … zonder nieuw systeem."
3. **Eerste segment om volledig uit te werken en mee te testen:** advies is groothandel. Daar is het meeste bewijs en daar staan al outreach-hooks.
4. **Primaire lezer:** de eigenaar (budget, risico) of de afdelingsmanager (het werk). Advies: de eigenaar op de homepage, de manager op de categoriepagina's.
5. **Oude content:** outreach-sequences en /inzichten pitchen nog de AI Ops Audit, "AI Operations Partner", 50–250 FTE en transport/maakindustrie. Herschrijven of uitfaseren.

## 10. Valideren: wat we nog niet weten

- **10–15 inbox-gesprekken** met binnendienst-, aftersales- en servicemedewerkers: "Laat me de aanvragen van gisteren zien, hoeveel waren er niet compleet?" Dat levert echte klanttaal, echte aantallen en de eerste publieke cijfers.
- **Vijf-secondentest** van de nieuwe hero met 5–8 eigenaren: "Wat doet dit bedrijf, voor wie, en wat moet ik nu doen?"
- **Vragen die alleen Bart kan beantwoorden:**
  - Zijn er al echte gesprekken geweest, en welke woorden gebruikten mensen?
  - Welke categorie geeft de meeste reactie?
  - Waar komen de vier categorieën vandaan?
  - Is er een pilot?
  - Is er één echt cijfer voor minuten per aanvraag?
