# Positionering & aanbod v2 — Design Spec

**Datum:** 2026-10-08
**Status:** Vastgesteld (2026-10-08)
**Deelproject:** 1 van 4 (site-brede herpositionering + redesign)
**Scope:** wat Leadvelocity verkoopt, aan wie, voor welke prijs, en met welke boodschap per markt
**Out of scope (eigen spec per deelproject):**
- 2 — Site-structuur (IA) + minimal design system met component libraries
- 3 — Bouw: homepage, marktpagina's, aanbodpagina's
- 4 — Cold-outreach-sequences per markt

---

## 1. Context & doel

### 1.1 Aanleiding
De huidige positionering ("AI Operations Partner", 5 diensten + 5 oplossingen, pilot-builds €12-25k, ICP €5-100M omzet) is te breed en te abstract om snel te verkopen. Een prospect begrijpt niet binnen enkele seconden wat we doen, en cold outreach heeft geen scherp, concreet aanbod om naar te verwijzen.

### 1.2 Nieuwe kern
> **Weet jouw bedrijf wat het met AI kan?**

We vertalen AI naar vier concrete uitkomsten met elk een vast pakket, een vaste prijs en een vaste doorlooptijd. Kleinere bedrijven zijn de basis; grotere, complexe projecten zijn een maatwerk-vervolg, niet het hoofdproduct.

De POV uit CLAUDE.md §2 ("AI vervangt geen goede mensen, maar wél bedrijven die stilstaan") blijft gelden als onderlaag.

### 1.3 Succescriteria
- Een prospect kan na het lezen van één alinea of één cold e-mail zeggen wat we voor hem doen, wat het kost en hoe snel het live staat.
- Elk pakket heeft een vaste scope, een gepubliceerde vanaf-prijs en een doorlooptijd van 2-4 weken.
- Elke doelmarkt heeft een eigen haak en eigen voorbeelden, bruikbaar in deelproject 3 (pagina's) en 4 (outreach).
- CLAUDE.md is bijgewerkt, zodat oude besluiten (§3, §5, §9) niet meer als "vast" gelden.

---

## 2. Doelgroep

- **Grootte:** MKB met **5-50 medewerkers**. Beslisser is meestal de eigenaar/DGA, soms een (operationeel) manager.
- **Geografisch:** Nederland (België adjacent).
- **4 doelmarkten:**
  1. **Groothandel** (technisch en breder)
  2. **Maakindustrie**
  3. **Zakelijke dienstverlening** (accountants, administratiekantoren, advies, juridisch, IT-dienstverleners, bureaus)
  4. **MKB algemeen** — sector-onafhankelijke instap via de kansenscan
- **Transport & logistiek** valt af als focusmarkt. Bestaande content blijft voorlopig bestaan; deelproject 2 beslist over de pagina's.
- In copy blijft het label **"MKB"**; geen FTE-ranges in klantcopy (CLAUDE.md §6).

---

## 3. Aanbod — de vier uitkomsten

| # | Uitkomst | Belofte in één zin | Voorbeelden |
|---|---|---|---|
| 1 | **Tijd besparen** | Haal het herhaalwerk weg. | Orders uit mail/PDF direct in ERP · offerte-concepten · inbox-assistent · facturen/bonnen naar boekhouding · automatische rapportages |
| 2 | **Klantbehoud** | Houd klanten langer en haal meer uit ze. | Signaal bij dalende bestellingen · automatische offerte-opvolging · heractivatie slapende klanten · 24/7 klantenservice-assistent |
| 3 | **Kennisbank** | Alle bedrijfskennis op één plek, doorvraagbaar. | Productspecs, configuraties, handleidingen, eerdere offertes, procedures · snellere inwerktijd · kennis blijft bij vertrek |
| 4 | **Data & inzicht** | Koppel en schoon wat versnipperd staat. | Data mapping ERP/CRM/Excel/webshop · productdata opschonen/verrijken · één dashboard · marge per klant/product |

---

## 4. Aanbodstructuur (de ladder)

1. **AI-kansenscan — gratis.** Bestaande `/ai-kansenscan`, opnieuw gepositioneerd: *"Ontdek in 5 minuten wat AI voor jouw bedrijf kan."* Resultaat toont welke van de 4 uitkomsten passen en welk pakket erbij hoort. CTA in elke cold e-mail.
2. **Kennismaking — gratis, 30 min.** Scan-uitkomst doorlopen, één pakket voorstellen.
3. **Vast pakket per uitkomst** — vaste setup, vaste scope, live in 2-4 weken.
4. **Maandtier** — hosting, AI-gebruik (fair use), monitoring, support en doorontwikkeling. Groeit mee met het aantal pakketten. Vervangt de open "AI Operations Partnership"-retainer.
5. **Maatwerk** — voor grotere projecten (>50 medewerkers of complexe vraag). Start met de betaalde **AI Ops Audit (€2.500)**, daarna maatwerk-offerte vanaf ~€10.000. Voice-agents, maatwerk-platformen (CRM/ATS/portalen) en complexe agents vallen hieronder.

---

## 5. Prijzen & voorwaarden

### 5.1 Setup per pakket (eenmalig, vast)

| Pakket | Setup | Standaard inbegrepen |
|---|---|---|
| Kennisbank | €2.000 | 1 documentbron (SharePoint, Google Drive of map), tot ~500 documenten, chat via browser of Teams |
| Tijd besparen | €2.500 per workflow | 1 proces end-to-end geautomatiseerd, koppeling met max. 2 systemen |
| Klantbehoud | €2.500 | Signalen uit order-/CRM-data + 1 opvolg- of heractivatie-flow |
| Data & inzicht | €3.000 | 2-3 bronnen gekoppeld, 1 dashboard met max. ~10 KPI's |

Werk buiten de standaard-scope wordt vooraf apart geoffreerd.

### 5.2 Maandtiers

| Tier | Prijs | Voor |
|---|---|---|
| Basis | €149/maand | 1 pakket, kleine aanpassingen |
| Groei | €399/maand | 2-3 pakketten + 4 uur verbeteringen per maand |
| Partner | €799/maand | Alle pakketten, 8 uur + maandelijkse verbetersessie + prioriteit |

AI-gebruikskosten zitten binnen fair use in de tier. Bij structureel hoger gebruik bespreken we een aanpassing.

### 5.3 Voorwaarden
- Minimale looptijd maandtier: **6 maanden**, daarna maandelijks opzegbaar.
- Een pakket draait alleen met een actieve maandtier (hosting en onderhoud zijn nodig om het te laten werken).
- Prijzen excl. btw.

### 5.4 Publicatie
Setup-prijzen én maandtiers worden **op de site gepubliceerd**. Dit vervangt het besluit in CLAUDE.md §9 dat retainer-bedragen niet gepubliceerd worden. Maatwerk blijft "vanaf ~€10.000, op offerte".

---

## 6. Boodschap per markt

| Markt | Leidende uitkomst(en) | Haak | Voorbeeldoplossingen |
|---|---|---|---|
| Groothandel | Tijd besparen + Klantbehoud | "Hoeveel orders worden er nog handmatig uit de mail overgetypt?" | Orders uit mail/PDF naar ERP · signaal als klant minder bestelt · artikeldata opschonen |
| Maakindustrie | Kennisbank + Tijd besparen | "Wat gebeurt er met jullie configuratiekennis als je senior engineer met pensioen gaat?" | Assistent op tekeningen/configuraties/storingshistorie · offerte-concepten uit aanvragen · productiecijfers in één dashboard |
| Zakelijke dienstverlening | Tijd besparen + Kennisbank | "Hoeveel uur per week gaat er naar intake, administratie en documenten zoeken?" | Klant-intake & documentverwerking · kennisbank op dossiers en templates · automatische klantrapportages |
| MKB algemeen | Instap via kansenscan | "Weet jij wat AI voor jouw bedrijf kan? Ontdek het in 5 minuten." | Inbox-assistent · offerte-opvolging · één dashboard met je kerncijfers |

### 6.1 Copy-principes
- Elke uitkomst concreet: "wij doen X, zodat jij Y niet meer hoeft". Nooit "AI-transformatie".
- Geen beloofde percentages. Besparingen alleen als gelabeld **scenario** ("een orderverwerker die 40 orders per dag invoert...").
- Tone-of-voice CLAUDE.md §6 blijft volledig van kracht (wij/ons, NL, direct, geen hype, geen persoonlijke namen).

---

## 7. Wat vervalt

- **5 diensten + 5 oplossingen** als hoofdstructuur (`ServicesNew`, `/oplossingen/*`). Waardevolle inhoud verhuist naar maatwerk; deelproject 2 beslist per pagina.
- **Pilot-ranges €12-25k** als hoofdaanbod.
- **ICP €5-100M omzet** → 5-50 medewerkers.
- **Transport** als focusmarkt.
- **Open retainer op maat** → vervangen door gepubliceerde maandtiers.

---

## 8. Deliverables van dit deelproject

Dit deelproject levert de inhoudelijke bron voor deelprojecten 2-4. Geen UI-werk.

1. **Deze spec** (vastgesteld).
2. **`src/data/aanbod.ts`** — één getypeerde databron voor uitkomsten, pakketten (naam, belofte, scope, setup-prijs, doorlooptijd), maandtiers, maatwerk en de vier markten (haak, leidende uitkomsten, voorbeelden). Alle latere pagina's en de kansenscan lezen hieruit, zodat prijzen op één plek staan. Nog niet ingeladen door bestaande componenten.
3. **CLAUDE.md bijwerken:** §1 (wat is Leadvelocity), §3 (aanbod), §5 (ICP + markten), §9 (genomen besluiten), §10 (werkpunten). Oude besluiten expliciet vervangen, niet laten staan.
4. **Masterplan-addendum** `docs/strategy/2026-10-08-positionering-v2.md` — korte notitie (≤1 pagina) wat er t.o.v. het masterplan van 2026-04-20 verandert en waarom.

### 8.1 Verificatie
- `npm run build` slaagt met `src/data/aanbod.ts` erbij.
- Geen prijs of pakketnaam in CLAUDE.md wijkt af van `aanbod.ts`.
- Copy in `aanbod.ts` doorstaat de tone-check uit CLAUDE.md §6.

---

## 9. Notities voor volgende deelprojecten

- **Deelproject 2 (design):** veel minimaler; gebruik component libraries via de shadcn-registry/MCP (`.mcp.json` staat al). Gevraagd component: `npx shadcn@latest add @aceternity/sticky-scroll-reveal-demo` — kandidaat voor de "wat AI voor jou kan"-sectie (4 uitkomsten scrollend, visual sticky). Huidige dark+lime look staat ter discussie.
- **Deelproject 2 (IA):** besluiten over ~37 bestaande pagina's (oplossingen, transport, inzichten, whitepapers, promptpacks, readiness-assessment vs. kansenscan) en opruimen van oude componenten (`Hero`, `HeroAI`, `Navbar`, `Footer`, `Index`, ...).
- **Deelproject 3:** kansenscan-resultaat mappen op de 4 uitkomsten/pakketten uit `aanbod.ts`.
- **Deelproject 4:** één 5-touch sequence per markt op basis van §6.
