# Look in de stijl van "Orrin" (21st.dev-template) — Design Spec

**Datum:** 2026-10-12 · **Status:** Draft, wacht op akkoord van Bart
**Referentie:** 21st.dev-template "AI Automation Agency Website Template" van Kedhareswer Naidu (preview: `21stdev-my-components-one.vercel.app/?pv=1#long-exposure-agency-template`). Screenshots staan in de scratchpad van de sessie.
**Besluiten (Bart, 2026-10-12):** de look bouwen we **zelf na** in onze code (geen templatecode overnemen) · **serif-koppen** · **lime blijft als klein accent**.
**Ongewijzigd:** alle copy, prijzen en grenzen in `src/content/*`. Leidend daarvoor blijven `docs/strategy/2026-10-11-messaging-strategie.md` en de handover. Routes, het formulier, de checks en de funnelcheck blijven werken.

---

## 1. Wat we overnemen van het template

- **Typografie:** grote, rustige serif-koppen (gecentreerd in hero en sectiekoppen), schone sans voor de tekst. Koppen hebben een normaal gewicht en strakke regelafstand.
- **Kleur:** gebroken wit (`#F6F7F6`-achtig), inkt, zachte grijze kaarten (`#EEF1F0`), zwarte knoppen. Kleur komt alleen uit de beelden. **Lime** gebruiken we alleen voor kleine accenten: het logomerk, een statusstip, het actieve tablabel en een badge. Nooit als tekstkleur op licht.
- **"Long exposure"-beelden:** grote afgeronde beeldvlakken (radius ~28px) met zachte, onscherpe kleurbanen en een licht korrelpatroon, gemaakt met CSS-gradients en SVG-noise. Er zijn vier tinten: *ember* (oranje-rood), *moss* (groen), *dusk* (blauw-roze) en *sand* (zand). Er zitten zwevende labels op ("pills") die de inhoud dragen, zoals processtappen of "Illustratieve demo".
- **Componenten:**
  - pill-labels boven sectiekoppen ("Wat we bouwen");
  - genummerde tab-kaarten (01–04) met een groot beeld ernaast;
  - een tijdlijn met tabs met een voortgangsbalk;
  - kaarten met beeld bovenaan en tekst eronder;
  - een gecentreerde FAQ;
  - een donkere slot-CTA met een beeld als achtergrond;
  - een footer met vier kolommen;
  - een sticky header met een lichte blur.

## 2. Wat we bewust NIET overnemen

Alles wat bewijs suggereert dat we (nog) niet hebben: klantlogo's, "Trusted by 50+ companies" met sterren, cijfers (uren, %, ROI), cases met klantnamen en testimonials. Ook geen dagenclaims ("in 45 days"). Dit volgt uit handover §14/§18 en strategie §8.

## 3. Homepage (nieuwe opbouw, zelfde content)

| # | Sectie (template-patroon) | Inhoud bij ons (bron) |
|---|---|---|
| 1 | **Hero, gecentreerd:** serif-H1, subkop, 2 knoppen, microcopy; daaronder een breed beeld | H1/sub/voor-wie/CTA uit `home.hero` + segmentkop via `?category=` en keuzeknoppen (onder de knoppen). Breed *dusk*-beeld met zwevende labels: "Illustratieve demo" en de drie demostappen. De DemoStepper verschijnt in het beeld als een kaart. |
| 2 | **Feittegels (2×2)** in plaats van statistieken | "20 min · Gratis adviesgesprek", "€750 · Analyse, verrekenbaar binnen 60 dagen" (uit `pricing.ts`), "1 proces · Om mee te starten", "Jullie team · Beslist altijd". |
| 3 | **"Herken je dit?"** als rustige kaarten | `home.genericSituations` / `c.situations` van het gekozen segment. |
| 4 | **"Wat we bouwen": genummerde tabs + groot beeld** | 4 segmenten (01 Offerteaanvragen … 04 Projectaanvragen). Het actieve tabblad toont subkop en beeld (*ember/moss/dusk/sand*) met de pills uit `exampleFlow`. Daaronder drie kleine kaarten: "Werkt vanuit jullie mailbox", "Wat ontbreekt, staat op een rij", "Jullie medewerker beslist" (uit `home.fits` en `home.assurances`). |
| 5 | **Tijdlijn met tabs** | `home.trajectory.steps` plus inrichting/acceptatie/beheer uit `werkwijze.steps`. Geen dagenclaim; wel "doorgaans 4–6 weken na de analyse" (handover §6), gelabeld als planning. |
| 6 | **"Zo ziet het eruit": kaarten met beeld** | De 4 illustratieve demo's als kaarten met de categorie als label. Ze linken naar `/voorbeelden?demo=…`. |
| 7 | **Qualifier** in plaats van testimonial | `home.qualifier`, in serif-citaatstijl gecentreerd: "Voor wie dit werkt (en voor wie niet)". |
| 8 | **Prijzen** | `PricingCards` in de nieuwe kaartstijl. |
| 9 | **Inzichten: 3 kaarten met beeld** | De bestaande /inzichten-artikelen (titel + categorie). |
| 10 | **FAQ, gecentreerd** | `home.faqIds`. |
| 11 | **Slot-CTA: donker beeldvlak** | `home.closing` + `ctaLabels.primary` + microcopy. |
| 12 | **Footer** | Bestaande `footerNav`, in de nieuwe stijl. |

"Over" verhuist naar de footer en `/over`. De handover vraagt het op de homepage, maar het template heeft er geen plek voor. **Keuze:** compact behouden als één regel boven de footer: "Lead Velocity is opgericht door Bart Wilbrink. Over ons →".

## 4. Rest van de site

Gedeelde componenten (`Section`, `SectionHead`, header, footer, kaarten, `PricingCards`, `ScopeTable`, `Faq`, `DemoStepper`, `CtaLink`) krijgen de nieuwe stijl. Daarmee nemen alle pagina's die stijl automatisch over: de categorieën, oplossingen, prijzen, werkwijze, voorbeelden, over, adviesgesprek, campagnes, inzichten en 404. Categoriepagina's krijgen een beeldvlak in hun eigen tint.

## 5. Techniek

- **Fonts:** serif **Newsreader** (Google Fonts, 400/500) voor koppen, **Hanken Grotesk** blijft voor de tekst, **JetBrains Mono** alleen voor kleine labels. Geen weight 800.
- **Tokens:** het `lv`-palet wordt bijgewerkt (paper, card, ink, muted, line; lime blijft). `font-display` wijst naar Newsreader.
- **Nieuwe componenten:** `ExposureArt` (gradient + korrel, prop `tone`), `Pill`, `NumberedTabs`, `TimelineTabs`, `FactTiles`, `MediaCard`.
- **Animatie:** alleen via `Reveal`/`useReveal`, plus zachte overgangen bij tabwissels. Niets wisselt vanzelf.
- **Checks:** de bestaande check-scripts blijven groen en de funnelcheck wordt bijgewerkt voor de nieuwe homepage. Visuele controle met screenshots op 360 en 1440 px.

## 6. Klaar wanneer

- De homepage volgt §3 en oogt als het template: serif, rustig, grote beeldvlakken.
- Er staat geen verzonnen bewijs op de site.
- Alle pagina's gebruiken de nieuwe stijl.
- Op 360 px is er geen horizontale scroll.
- Funnel- en contentchecks zijn groen.
