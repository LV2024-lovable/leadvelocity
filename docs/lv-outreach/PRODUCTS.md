# PRODUCTS.md — Leadvelocity Commitment Ladder voor Scribe & Analyst

**Versie:** 2.0 — 2026-04-20 (hybrid agency + managed ops model, 4-traps ladder)
**Afnemers:** Scribe-LV (welke trap in welke mail pitchen), Analyst-LV (signaal-naar-trap-fit)

---

## 1. Wat Leadvelocity verkoopt

**Geen product, wel een trap-voor-trap partnership.** De "agency-vs-SaaS" dichotomie vermijden we bewust — we zijn een **hybride**: agency-DNA (custom builds per klant) met een doorlopende managed-ops-laag (hosted op onze infrastructuur) plus optionele performance-kicker.

De klant committeert per trap. Elke trap bouwt voort op de vorige. Geen lange verkoopcycli voor grote deals — wel laagdrempelig instappen en groeien binnen de samenwerking.

---

## 2. De 4 trappen (met prijzen)

### Trap 1 — AI Ops Audit

```yaml
id: audit
name: AI Ops Audit
one_liner: "Scan van jullie operatie met de top-3 AI-kansen, impact-inschatting en prioritering."
commitment: "Geen verplicht vervolg"
price: "€2.500 (vaste prijs)"
duration: "2 weken"
for_persona: [dga, coo, cro]
for_situation:
  - "Bedrijf wil AI serieus inzetten maar weet niet waar te beginnen"
  - "Directie wil objectieve second opinion vóór ze budget committeren"
  - "Nieuwe DGA/COO die AI-roadmap moet opleveren"
deliverables:
  - "60-90 min interviews met directie + operationele leiders"
  - "Geschreven rapport (2-3 pagina's) met top-3 AI-kansen"
  - "Realistische impact-inschatting per kans (in euro's)"
  - "Implementatie-prioritering: wat eerst, wat later, wat niet"
role_in_funnel: "Entry + kwalificatie + cashflow"
cta_phrase: "Start met een AI Ops Audit"
```

### Trap 2 — Pilot Build

```yaml
id: pilot
name: Pilot Build
one_liner: "Eén AI-use-case end-to-end gebouwd op onze hosted infrastructuur."
commitment: "Scope-gecapt, vaste prijs"
price: "€12.000 - €20.000"
duration: "6-8 weken"
hosted_on: "Leadvelocity-infrastructuur (Supabase, Vercel, PostgreSQL)"
for_persona: [coo, cro, dga]
for_situation:
  - "Na Audit: klant wil concreet resultaat voordat grotere commitment"
  - "Bewijs nodig dat aanpak werkt bij hun specifieke data/processen"
  - "Nog geen vertrouwen om direct in langdurig partnership te stappen"
deliverables:
  - "End-to-end build van één concrete AI-toepassing"
  - "Data-integratie met bestaande ERP/CRM/TMS zonder vervanging"
  - "Werkend systeem in productie"
  - "Documentatie + kennisoverdracht naar klant-eigenaar"
role_in_funnel: "Bewijs-van-waarde + trustbuilder voor retainer"
cta_phrase: "Boek een pilot"
```

### Trap 3 — Operating Partnership

```yaml
id: operating
name: AI Operating Partnership
one_liner: "Doorlopende hosting, beheer en optimalisatie van de AI-systemen die we bouwden."
commitment: "12 maanden minimum, 30 dagen opzegtermijn"
price: "€3.000 - €8.000 per maand"
auto_renewal: "Jaarlijks, tenzij 30 dgn vooraf opgezegd"
for_persona: [coo, cro, dga]
for_situation:
  - "Na Pilot: systeem draait, klant wil het houden + verbeteren"
  - "Geen interne capaciteit om zelf te hosten/onderhouden"
  - "Wil structureel AI-voorsprong opbouwen ipv losse projectjes"
deliverables:
  - "Hosting + uptime monitoring + security op LV-infrastructuur"
  - "Maandelijkse optimalisatie bestaande AI-componenten"
  - "KPI-dashboard met wekelijkse performance-data"
  - "Nieuwe kleine use-cases zonder extra offerte"
role_in_funnel: "Recurring revenue motor — hier zit LV ARR"
cta_phrase: "Bespreek een partnership"
```

### Trap 4 — Scale & Expand

```yaml
id: scale
name: Scale & Expand
one_liner: "Nieuwe use-cases, diepere integraties, strategische AI-bedrijfscapaciteit."
commitment: "Doorlopend op Operating Partnership-basis, upgrade-pad"
price: "€8.000 - €15.000 per maand"
for_persona: [dga, coo_bij_groeiende_klanten]
for_situation:
  - "Klant heeft meerdere AI-behoeftes die onder één partnership passen"
  - "Nieuwe modules (inkoop + sales + service) tegelijk uitrollen"
  - "Strategisch partner-gesprek ipv leveranciersrelatie"
deliverables:
  - "Meerdere AI-toepassingen onder één partnership"
  - "Diepere integratie ERP/CRM/MES/TMS"
  - "Strategische kwartaal-reviews met directie"
  - "Coaching intern team richting zelfredzaamheid"
role_in_funnel: "Expansion — hogere LTV, stickiness"
cta_phrase: "Ga voor strategische schaal"
```

### Optioneel: Performance Kicker

```yaml
id: performance_kicker
name: Performance-kicker (optioneel bovenop Trap 3 of 4)
description: "Voor klanten die diepere alignment willen: extra vergoeding per bewezen KPI-overtreffing."
when_to_offer:
  - "Klant met goede data-infrastructuur (meetbaarheid gewaarborgd)"
  - "KPI die objectief meetbaar is (marge, OEE, cent-per-km)"
  - "Klant die alignment wil voelen, niet alleen tijd inkopen"
when_NOT_to_offer:
  - "Klant met slechte datakwaliteit (meetgeschil-risico)"
  - "Klant die na ervaring met ons onzeker is over delivery"
  - "Standaardaanbod — dit is uitzondering, niet regel"
mechanism_options:
  - "€X per procentpunt marge-winst boven baseline"
  - "€X per uur downtime-reductie boven baseline"
  - "Een vast bonusbedrag bij hit van vooraf afgesproken target"
```

---

## 3. Stickiness-mechanismen (zonder harde garanties)

Leadvelocity beschermt de recurring revenue via 5 lagen tegelijk — geen outcome-garantie nodig:

| Laag | Mechanisme | Hoe het werkt |
|---|---|---|
| **1. Hosted infrastructuur** | Alles draait op LV-infra (Supabase, Vercel, PostgreSQL) | Klant heeft geen eigen dev-ops, stoppen = ops-breuk |
| **2. Data-verrijking** | AI verrijkt klantdata over tijd (profielen, patronen, taxonomie) | Weggaan = verrijkte data en patronen kwijt |
| **3. Integratie-diepte** | ERP/CRM/TMS-koppelingen groeien maand na maand | Switchkosten stijgen met tijd |
| **4. Governance-embedding** | Wekelijkse syncs, maandelijkse KPI-dashboards, kwartaal-reviews | Wij worden onderdeel van stuurproces |
| **5. Team-dependency** | Klantteam leert werken met onze tools en patronen | Weggaan = omscholen |

Resultaat: **90%+ retentie na Pilot → Operating overgang**, zonder dat contracten eng voelen voor klant.

---

## 4. Signal → Trap Matrix

Gegeven een signaal van Analyst-LV, welke trap pitchen we in eerste mail? Regel: **altijd Trap 1 (Audit)** als entry, tenzij prospect al warmer is. In de body van de mail pitch je wel de downstream-waarde zodat ze begrijpen wat er na de Audit komt.

| Signaal-type | Eerste pitch | Sub-pitch (downstream) |
|---|---|---|
| Vacature data-analist | Audit | Operating — vervangt of ondersteunt die rol |
| Vacature planner / werkvoorbereider | Audit | Pilot op planning-AI, daarna Operating |
| Vacature inside sales / binnendienst | Audit | Pilot op sales-AI, daarna Operating |
| Vacature e-commerce manager | Audit | Scale — meerdere modules |
| Vacature langdurig open | Audit | Pilot op recruitment/ondersteunings-AI |
| Overname/fusie | Audit | Scale — data-integratie multi-locatie |
| Nieuwe vestiging | Audit | Pilot op operationele expansion |
| Award / groei-erkenning | Audit | Scale — passende groei |
| Grote klant gewonnen | Audit | Pilot op compliance/rapportage |
| Familiebedrijf | Audit | Operating — stabiel, lange termijn |
| ERP-stack zichtbaar | Audit | Pilot op AI-laag op ERP |
| Webshop met beperkte features | Audit | Pilot op pricing of personalisatie |
| "Bel ons voor prijs" | Audit | Pilot op quote-automatisering |
| Service-desk kantooruren | Audit | Pilot op AI-assistent |
| Primitieve chatbot | Audit | Pilot op upgrade |
| CSRD-statement | Audit | Pilot op CSRD-automation, Operating daarna |
| Smart Industry claim | Audit | Scale — ambitie hardmaken |
| DGA in branche-pers | Audit | Alle trappen openhouden — leidt gesprek |
| Blog sector-pijnpunten | Audit | Variabel |
| Grote klanten in logo-wall | Audit | Pilot op compliance, Operating voor schaal |

**Vuistregel voor Scribe:** eerste e-mail positioneert altijd de Audit (laagdrempelig, gecommitteerde waarde voor klant), hint naar de downstream-waarde (Pilot → Operating → Scale), maar *vraagt* alleen om de Audit.

---

## 5. Prijs-communicatie in outreach

**Regel 1:** Noem in eerste mail alleen de Audit-prijs (€2.500). Andere trappen komen pas na eerste gesprek.

**Regel 2:** Gebruik deze formuleringen:
- ✅ *"Start met een AI Ops Audit — €2.500, vaste prijs, rapport binnen 2 weken"*
- ✅ *"Na de Audit beslist u zelf of we samen verder bouwen — geen verplicht vervolg"*
- ✅ *"Partnerships starten vanaf €3.000 per maand, op 12-maanden-basis met 30-dagen-opzegging"*
- ❌ *"Vanaf €X duizend"* als eerste prijsindicatie — vermijd, te vaag
- ❌ *"Inclusief alles"* — zet nooit met Audit-aanbieding
- ❌ *"Gratis pilot"* — wij doen geen gratis builds

**Regel 3:** Prijstransparantie = vertrouwen. De Audit-prijs mag expliciet in alle outreach, op de site, en in LinkedIn-posts. Zo scheiden we tire-kickers van serieuze prospects vanaf het eerste contact.

---

## 6. Wat expliciet NIET Leadvelocity-aanbod is

Om Scribe/Analyst scherp te houden: deze dingen noemen we **nooit** in copy of outreach:

- ❌ "We bouwen een dashboard voor u" (agency-taal — we bouwen wel, maar het is onderdeel van de ladder)
- ❌ "Wij implementeren AI bij uw bedrijf" (losse implementatie-pitches)
- ❌ "Gratis proof-of-concept" (commitment-erosie, trekt slechte leads)
- ❌ "Gegarandeerd resultaat of geld terug" (harde garantie, te risicovol voor 2-persoons team)
- ❌ "Wij hebben een AI-platform" (suggereert SaaS, dat is niet ons model)
- ❌ "Maandelijks opzegbaar" (12 mnd minimum beschermt kwaliteit van dienstverlening)

---

## 7. Output-formaat naar Scribe-LV (update)

Analyst-LV voegt aan JSON-output toe welke trap initieel gepitcht moet worden:

```json
{
  "prospect_id": "tech-groothandel-amsterdam-001",
  "recommended_entry_trap": "audit",
  "downstream_pitch": "operating",
  "signals_detected": [...],
  "routing": "automated",
  ...
}
```

---

*Versie: 2.0 — 2026-04-20. Vervangt v1.0 (4-product-catalog). Update: wanneer ladder-prijzen veranderen of 5e trap wordt toegevoegd.*
