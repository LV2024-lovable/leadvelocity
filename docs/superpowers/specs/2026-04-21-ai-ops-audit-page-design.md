# AI Ops Audit — Landing page design

**Datum:** 2026-04-21
**Project:** Master Funnel Project 2
**Status:** Design — wacht op user-review

---

## 1. Doel

Een dedicated sales-pagina op `/ai-ops-audit` die bezoekers met koop- of project-intentie omzet naar een intake voor de AI Ops Audit (betaalde, €2.500, 2-weken scan met geschreven rapport).

Primaire conversie: ingevuld contactformulier op de pagina (of gelijkwaardige telefonische opvolging).

## 2. Context

### 2.1 Wat er al bestaat

- **[`/onze-aanpak`](../../../src/pages/OnzeAanpak.tsx)** — commitment-ladder met Audit als stap 01 inclusief €2.500 prijs. Blijft bestaan (wordt later hernoemd naar `/werkwijze`).
- **[`/lp/assessment`](../../../src/pages/LpAssessment.tsx)** — no-nav campaign landing met dezelfde Audit-inhoud. Blijft bestaan voor paid traffic.
- **[`ServicesNew`](../../../src/components/ServicesNew.tsx)** op homepage — card "AI Ops Audit" met CTA "Start met een audit" (link momenteel ongericht).

### 2.2 Waarom een nieuwe pagina

Sitemap-doc ([leadvelocity_sitemap_page_roles.md](../../../docs/strategy/) sectie 4) definieert `/ai-ops-audit` als **primaire sales conversion page** met full-navigatie — dus geen no-nav campaign-variant. Huidige pagina's vullen die rol niet:

- `/lp/assessment` heeft geen nav → niet herkenbaar als organische landing
- `/onze-aanpak` beschrijft de hele ladder → geen focus op Audit als single product

## 3. Scope

### 3.1 In scope

- Nieuwe pagina `src/pages/AiOpsAudit.tsx`
- Nieuwe route `/ai-ops-audit` in `App.tsx`
- Interne links updaten naar nieuwe route:
  - `ServicesNew.tsx` — Audit-card CTA
  - `OnzeAanpak.tsx` — stap-01 CTA
  - Sector-pagina's waar "plan een audit" genoemd wordt
- Hergebruik van bestaande componenten (`NavbarNew`, `FooterNew`, `ContactForm`, `useReveal`)

### 3.2 Expliciet buiten scope

- **Navbar-wijziging** — toevoegen aan main-nav is een aparte beslissing, niet in dit project
- **URL-herstructuring** `/onze-aanpak` → `/werkwijze` — aparte follow-up
- **`/lp/assessment` redirect of verwijderen** — blijft bestaan voor paid campaigns
- **Dynamic CTA's op basis van AI-Readiness score** — vereist Project 1, komt later
- **Cal.com / Calendly integratie** — intake via ContactForm voor nu
- **Prijs-variaties of package-opties** — enkele vaste €2.500-audit

## 4. Paginastructuur

### 4.1 Hero

- Badge: `Betaalde intake · 2 weken · vaste prijs`
- H1: **Weet waar AI voor jouw bedrijf het meeste oplevert — in 2 weken.**
- Sub: 60 minuten met ons, interviews met jouw team, een geschreven rapport met de top-3 AI-kansen én realistische impact-inschatting. Geen verkooppraatje, geen verplicht vervolg.
- Primair CTA: **Plan een intake** (anchor → `#plan`)
- Secundair: `tel:+31625471528` met `"Of bel direct"`
- Visual: subtle accent glow + dot-pattern (consistent met LpAssessment)

### 4.2 Wat je krijgt — 3 deliverable-cards

Port van `LpAssessment` `whatYouGet` array, met één verfijning:

1. **60 minuten intake + team-interviews** — Clock-icoon
   Een direct gesprek met de mensen die ook bouwen — geen junior consultants die checklists afwerken. Aanvullend 2-4 korte interviews met directie en operationele leiding.

2. **Top-3 AI-kansen met impact-inschatting** — Sparkles-icoon
   Niet "digitale transformatie" — drie specifieke AI-toepassingen die bij jullie operatie, sales of inkoop passen. Elke kans met realistische impact-inschatting (tijd/marge/capaciteit).

3. **Geschreven rapport binnen 5 werkdagen** — FileText-icoon
   Een rapport van 2-3 pagina's met onze bevindingen, verwachte impact en prioritering. Geen deck, geen powerpoint — iets wat je intern kan rondsturen.

### 4.3 Hoe het werkt — Week-1 / Week-2 timeline

Nieuwe sectie (niet in bestaande pagina's). 2-koloms layout:

**Week 1 — Intake + interviews**
- Kickoff-gesprek (60 min, online of fysiek) met directie en jij
- 2-4 aanvullende interviews (30 min elk) met operationele leiding
- Wij spreken met wie jij aanwijst — sales, ops, klantenservice, finance

**Week 2 — Analyse + rapport**
- Wij analyseren de input en toetsen aan wat we in jullie sector zien werken
- Geschreven rapport (2-3 p.) wordt uitgewerkt
- Afsluitende presentatie van 60 min met de uitkomsten + Q&A
- Rapport staat in je mail binnen 5 werkdagen na de laatste interview-sessie

**Einde:** Rapport in handen. Jij beslist zelf over vervolg — bij ons, elders, of helemaal niet.

### 4.4 Voor wie — 4 profiel-bullets

Port van `LpAssessment` `forWho` array. 2-koloms layout (titel links, bullets rechts).

- Je bent directeur, COO of CRO van een Nederlandse MKB-organisatie
- Je bedrijf zit ergens tussen €5M en €100M omzet
- Je weet dat AI speelt, maar je wilt geen vrijblijvende hype-verhalen
- Je hebt een concrete pijn: marge, tijd, leads, service of planning

Intro-tekst links: "Wij nemen gericht bedrijven aan — niet uit exclusiviteit, maar omdat een audit het best werkt wanneer het profiel klopt. Herken je jezelf hierin?"

### 4.5 Prijs & voorwaarden — trust-band

Enkele horizontale strip met 3 kern-feiten in een kader:

**€2.500 vaste prijs  ·  2 weken doorlooptijd  ·  geen verplicht vervolg**

Micro eronder: *"Ook als je besluit daarna met een andere partij verder te gaan, is de audit van waarde — je hebt een rapport in handen dat je intern kan gebruiken om de volgende stap scherp te krijgen."*

### 4.6 FAQ — 6 accordeon-items

Expandable items (kan simpele details/summary HTML of lichte custom accordion-state zijn).

1. **Wat als de audit geen duidelijke kansen oplevert?**
   Dat kan voorkomen als jullie al heel ver zijn, of als AI niet de grootste hefboom is. In dat geval zeggen we dat expliciet in het rapport — dat is óók waardevol, omdat het jullie richting scherpt. Geen restitutie, wel eerlijkheid.

2. **Moeten we gevoelige data delen?**
   Liefst niet meer dan nodig. De audit werkt op gesprek-input, niet op data-exports. We tekenen standaard een NDA voordat interviews starten.

3. **Wie voert de audit uit?**
   Wij — de oprichters van Leadvelocity. Geen uitbesteding, geen juniors. Wat we bouwen, hebben we zelf gebouwd.

4. **Hoeveel tijd kost het ons intern?**
   Kickoff (1 uur) + 2-4 interviews (30 min elk) + afsluitende presentatie (1 uur). Totaal ~4-5 uur per sleutelpersoon over twee weken.

5. **Wat gebeurt er na de audit?**
   Je krijgt het rapport. Je beslist. Als je wil dat we de eerste use-case bouwen, bespreken we een Pilot Build (6-8 weken, vanaf €12.000). Maar niets verplicht.

6. **Kunnen we sector-specifiek starten?**
   Ja. We hebben diepe praktijk-ervaring in technische groothandel, maakindustrie en transport & logistiek. De audit sluit aan op jullie context, niet op een generieke template.

### 4.7 CTA / intake-section

Kader-styled (bg-accent/0.04 + border-accent/0.2), full-width binnen container.

- Headline: **Plan je AI Ops Audit.**
- Body: "Vul in waar jullie tegenaan lopen. We reageren binnen één werkdag met een voorstel voor een kickoff-gesprek."
- Reuse `<ContactForm sourceHint="Leadvelocity.nl · /ai-ops-audit" />`

Inline alternatief: "Liever bellen? +31 6 25 47 15 28"

## 5. Interne links bij te werken

| Bestand | Huidige target | Nieuwe target |
|---|---|---|
| `src/components/ServicesNew.tsx` | (geen of #contact) | `/ai-ops-audit` |
| `src/pages/OnzeAanpak.tsx` stap 01 CTA | (geen expliciet) | `/ai-ops-audit` |
| `src/pages/Groothandel.tsx` + andere sector-pages | audit-mentions | `/ai-ops-audit` |
| `src/pages/Home.tsx` (indien aanwezig) | - | Check + update |

## 6. Data-model / geen nieuwe state

Pure content-pagina. Geen nieuwe API-calls, geen nieuwe DB-tabellen. ContactForm gebruikt bestaande `email-notify` Edge Function + (nieuwe) `auto-respond-asset` met assetType `contact`.

## 7. Styling-conventies

- Volg bestaande `lv-*` Tailwind-tokens
- Hergebruik `section-padding` utility class (zie andere pages)
- `useReveal`-hook voor scroll-animaties
- Font-weight altijd 600/700 voor headlines (geen 800)
- Geen custom shadcn-overrides — klassen bovenop wrappers

## 8. Testplan

1. Build-check: `npm run build` zonder errors
2. Dev-server: `npm run dev` → navigeer naar `/ai-ops-audit`, check alle secties renderen
3. Interne links: klik elke geüpdate link, kom uit op juiste route
4. Form-submit: vul contactform in → controleer mail naar `info@leadvelocity.nl` + auto-respond naar afzender
5. Mobile responsive (iPhone SE, 375px)
6. Lighthouse-check: geen nieuwe accessibility-regressies

## 9. Rollout

1. Build + commit in één logische groep
2. Push naar main → Lovable auto-deploy
3. Na ~2 min: live check op `https://www.leadvelocity.nl/ai-ops-audit`
4. Update `CLAUDE.md` sectie 3 — rename "AI Kickstart Assessment" naar "AI Ops Audit" (separate commit)

## 10. Open vragen — niet blokkerend

- Navbar-plaatsing: verschijnt `AI Ops Audit` als top-level menu-item? (later beslissen)
- Cal.com-integratie: direct-booking vs form? (later — ContactForm nu)
- Testimonials/case-quotes: geen voorhanden; placeholder-ruimte reserveren?
