# Rode draad: doelgroep + partnerschap — Design Spec

**Datum:** 2026-10-13 · **Status:** Akkoord Bart op de drie delen in chat, spec ter review
**Ongewijzigd:** prijzen, pakketinhoud en pakket-id's (`src/content/pricing.ts`), demo's, claims en grenzen. Leidend blijven de handover (`docs/strategy/2026-10-09-website-gtm-handover.md`) met de afwijkingen bovenin en `CLAUDE.md`. Er komen geen nieuwe claims, cijfers, garanties, cases of logo's bij. Alle tekst voor "Beheer" en "Uitbreiden" komt uit bestaande copy (`werkwijze.steps`, pakketten).

## 0. Probleem

- Vier lijstjes van vier lopen door elkaar: doelgroepen, procesfamilies (die op `/oplossingen` ook "oplossingen" heten), oplossingen per doelgroep en pakketten.
- De homepage heeft 12 secties die elkaar deels herhalen: "Zo werkt het", "Van gesprek tot werkende oplossing", "Past in wat je al hebt", "Waar je op kunt rekenen" en "Voor wie dit werkt".
- Het AI-partner-verhaal staat alleen op de homepage. Andere pagina's spreken nog van "automatisering" en "terugkerend werk".
- "Partner" krijgt geen invulling. Het verhaal stopt bij de oplevering.

**Ruggengraat (besluit Bart):** doelgroep + partnerschap. Kies je branche, zie wat we bouwen, bekijk een voorbeeld, start met één oplossing. Daarna beheren wij die en bouwen we samen verder.

## 1. Verhaallijn en vaste labels

Elke hoofdpagina volgt dezelfde volgorde. Elke stap draagt een vast label (eyebrow) dat op alle pagina's gelijk is:

| Stap | Label |
|---|---|
| Herken je dit | `Herkenbaar` |
| Wat we bouwen | `Wat we bouwen` |
| Zo ziet het eruit | `Voorbeelden` |
| Zo werken we samen | `Samenwerken` |
| Prijzen | `Prijzen` |
| Vragen + adviesgesprek | `Vragen` |

De labels staan centraal in `src/content/site.ts` als `storyLabels`. Pagina's gebruiken de labels; ze zetten ze niet zelf letterlijk in de code.

## 2. Woordgebruik

- **oplossing** = wat wij voor een doelgroep bouwen (`categories[].solutions`). Alleen in die betekenis.
- **proces** = het werk bij de klant. De procesfamilies heten op de site "Per proces".
- **AI-partner** staat in de hero, op `/voor-wie`, op `/samenwerken` en in het label boven de H1 van de doelgroeppagina's. Niet in elke kop.
- **"automatisering"/"automatiseren"** staat niet in H1's, H2's of SEO-titels. In lopende tekst mag het nog.
- "werkstroom" blijft verboden; de check bestaat al.

## 3. Navigatie

- **Header:** `Voor wie ▾` (de 4 doelgroepen) · `Samenwerken` · `Voorbeelden` · `Prijzen` · knop "Gratis adviesgesprek".
  - "Oplossingen" en "Werkwijze" verdwijnen uit de header.
- **Footer:** de kolom met procesfamilies krijgt de kop "Per proces". `Werkwijze` wordt `Samenwerken`.
- **Nieuwe route** `/samenwerken`. `/werkwijze` verwijst door naar `/samenwerken`, met behoud van de querystring. Bestaande redirects naar `/werkwijze` gaan direct naar `/samenwerken`.
- `/oplossingen` en de 4 procesfamilie-pagina's blijven bestaan. Ze staan in de footer en zijn bereikbaar via de link "Hoe dit proces werkt →" op de oplossingskaarten.

## 4. Gedeeld blok "Zo werken we samen" (`PartnerTrack`)

Eén nieuw component, gevoed door één contentbron (`partnership` in `src/content/pages.ts`). Het wordt gebruikt op de homepage, op elke doelgroeppagina en bovenaan `/samenwerken`.

- **Label** `Samenwerken`. **H2:** "We starten met één oplossing en bouwen samen verder."
- **Vier fasen**, elk met "Wat wij doen" en "Wat jullie doen":
  1. **Adviesgesprek**
     - wij: 20 minuten kijken welk werk terugkomt en of een analyse zinvol is.
     - jullie: vertellen welk werk steeds terugkomt.
  2. **Analyse en inrichting**
     - wij: analyse (prijs uit `analysis.price`), vaste scope en prijs, inrichten op jullie bronnen, testen op afgesproken criteria.
     - jullie: voorbeelden en toegang aanleveren, twee werksessies, testen en accepteren.
  3. **Beheer**
     - wij: monitoring, incidentafhandeling, bronupdates, rapportage en kleine wijzigingen.
     - jullie: wijzigingen in proces of bronnen melden. Maandkosten starten pas na acceptatie.
  4. **Uitbreiden**
     - wij: een bewezen oplossing uitbreiden of de volgende oplossing erbij bouwen (pakket Opschalen).
     - jullie: kiezen het aangrenzende werk.
- **Onder de fasen:** "Waar je op kunt rekenen". Dit zijn de vier punten van `home.assurances`, compact op één rij of in een lijst.
- Tekst komt uit `werkwijze.steps`, `home.trajectory`, `home.fits.need` en `home.assurances`, ingekort. Er komt niets nieuws bij. Het bedrag komt uit `pricing.ts`, nooit als letterlijke tekst.

## 5. Homepage: 7 secties

| # | Label | Sectie | Inhoud |
|---|---|---|---|
| 1 | — | **Hero** | Ongewijzigd: H1, sub, knoppen, doelgroepkeuze en het beeld. De feittegels vervallen. Onder de knoppen komt één microregel: "Gratis adviesgesprek van 20 minuten · analyse {analysis.price}, verrekenbaar binnen {creditDays} dagen". De regel `forWho` blijft alleen zichtbaar zonder gekozen doelgroep. |
| 2 | Herkenbaar | **Herken je dit?** | Ongewijzigd, inclusief de kostenregel. |
| 3 | Wat we bouwen | **Wat we voor [doelgroep] bouwen.** | De tabs met 4 oplossingen. Zonder doelgroep: "Wat we voor jullie bouwen." Daaronder drie korte regels uit `home.fits.points`. De losse sectie "Past in wat je al hebt" vervalt. |
| 4 | Voorbeelden | **Zo ziet het eruit.** | Ongewijzigd. |
| 5 | Samenwerken | **PartnerTrack** | §4. Vervangt "Werkwijze"-tijdlijn, "Zo werkt het", "Waar je op kunt rekenen" en het blok "Wat we nodig hebben". |
| 6 | Prijzen | **Beginnen, beheren, uitbreiden.** | `PricingCards` ongewijzigd. Daaronder de qualifier "Voor wie dit werkt (en voor wie niet)", compact in twee kolommen, plus de twijfelregel. |
| 7 | Vragen | **Vragen, beantwoord.** + slot | FAQ en de donkere slot-CTA, ongewijzigd. De over-regel boven de footer blijft. |

De `aiNote` uit `howItWorks` vervalt: de FAQ-vraag `ai` staat al op de homepage en beantwoordt hetzelfde.

## 6. Doelgroeppagina's (`CategoryPage`)

Nu 9 secties, straks 7, in dezelfde volgorde als de homepage:

1. **Hero.** Label boven de H1: "AI-partner voor {audience}". De H1 en sub blijven gelijk.
2. `Herkenbaar`: Herken je dit?
3. `Wat we bouwen`: "Wat we voor {audience} bouwen." Dit zijn de 4 oplossingskaarten. Elke kaart toont "Jullie team beslist: …" en de link "Hoe dit proces werkt →".
4. `Voorbeelden`: de demo, met daarin de processtappen. "Zo loopt het proces" vervalt als losse sectie.
5. `Samenwerken`: PartnerTrack.
6. `Prijzen`: de passende pakketten, zoals nu.
7. `Vragen`: FAQ en slot-CTA.

De sectie "Je team houdt het oordeel." vervalt. SEO-titels worden "AI-oplossingen voor {audience} | Lead Velocity", met de bestaande titel als basis.

## 7. Overige pagina's

- **`/voor-wie`**
  - H1: "Jouw AI-partner, ingericht op jouw branche."
  - Intro blijft inhoudelijk gelijk.
  - Per doelgroep één kaart met de 4 oplossingstitels en een link naar de doelgroeppagina.
  - Het blok "Procesingangen" vervalt.
- **`/samenwerken`** (was `/werkwijze`)
  - H1: "Wij bouwen het, wij beheren het, samen breiden we uit."
  - Daaronder PartnerTrack met de vier fasen.
  - Per fase komen de bestaande detailstappen eronder: Adviesgesprek · Analyse + Voorstel · Inrichting + Acceptatie · Beheer. Elke stap houdt "Wat wij opleveren", "Wat we van jullie nodig hebben" en "Beslismoment".
  - Blok "Uitbreiden": het pakket Opschalen met link naar `/prijzen`.
  - Dan "Wat we nodig hebben om te starten" (`home.fits.need`), FAQ en CTA.
- **`/prijzen`**
  - H1: "Duidelijke kosten voor starten, beheren en uitbreiden."
  - De intro blijft inhoudelijk gelijk.
  - Matrix en voorwaarden ongewijzigd.
- **`/oplossingen`**
  - H1: "Per proces bekeken: wat we bouwen en waar het stopt."
  - SEO-titels van de procespagina's: "automatiseren" wordt vervangen door een neutrale formulering, bijvoorbeeld "Aanvragen en dossiers | Lead Velocity".
- **`/voorbeelden`:** elke demo krijgt een link "Voor {audience} →" naar de bijbehorende doelgroeppagina.
- **Ongewijzigd:** `/over`, `/adviesgesprek`, `/bedankt`, `/privacy`, campagnes en `/inzichten`.

## 8. Opruimen

- Wat ongebruikt raakt, verwijderen we uit de content en uit `FactTiles`, als niets anders het nog gebruikt:
  - `home.facts`
  - `home.howItWorks`
  - `home.timeline`
  - `home.trajectory`, zodra PartnerTrack de bron is
  - losse `home.assurances`/`fits`-secties
- Tekst die PartnerTrack overneemt, verhuist naar `partnership`.
- `TimelineTabs` blijft alleen bestaan als PartnerTrack het gebruikt.

## 9. Checks en tests

- **`scripts/check-content.ts`**
  - `storyLabels` bestaat en heeft 6 labels.
  - Geen "automatiser" in `h1`/`h2`/`seoTitle` van site-content.
  - "oplossing" komt niet voor als label van een procesfamilie in de navigatie.
  - Bedragen in `partnership` komen uit `pricing.ts`.
  - De bestaande checks blijven groen.
- **`scripts/check-redirects.ts`:** `/werkwijze` → `/samenwerken`, met querystring.
- **`scripts/e2e/funnel.mjs`**
  - De homepage heeft 7 secties met de labels in de volgorde van §1.
  - De doelgroeppagina heeft dezelfde volgorde.
  - De header heeft precies 4 links plus de CTA.
  - `/samenwerken` laadt; `/werkwijze` verwijst door.
  - PartnerTrack staat op de homepage, de doelgroeppagina's en `/samenwerken`.
  - De bestaande tests worden bijgewerkt naar de nieuwe koppen, niet afgezwakt.
- **Visuele controle:** screenshots op 360 en 1440 px van de homepage (generiek en met `?category=`), één doelgroeppagina, `/samenwerken` en `/voor-wie`. Geen horizontale scroll.

## 10. Klaar wanneer

- Homepage en doelgroeppagina's volgen dezelfde 6-stappenlijn met dezelfde labels.
- De header heeft 4 punten. "oplossing" betekent op de hele site één ding.
- Geen "automatisering" in koppen of SEO-titels.
- De samenwerking (beheer en uitbreiden) is op 3 plekken zichtbaar via één component.
- Prijzen en claims zijn ongewijzigd.
- Alle checks, de build en de funnelcheck zijn groen.
- De docs zijn bijgewerkt: `CLAUDE.md` (routes, besluit rode draad) en het afwijkingenblok in de handover.
