# PRODUCTS.md — Leadvelocity Product-catalogus voor Scribe & Analyst

**Versie:** 1.0 — 2026-04-20
**Afnemers:** Scribe-LV (kiest welk product in welke mail te pitchen), Analyst-LV (mapt signalen naar product-fit)

---

## 1. De 4 producten + retainer-paraplu

### 1.1 AI Kickstart Assessment

```yaml
id: assessment
name: AI Kickstart Assessment
one_liner: "Diepte-scan van jullie operatie, sales en inkoop met drie concrete AI-kansen."
role_in_funnel: entry / qualifier
for_persona: [dga, coo, cro]
for_situation:
  - "Bedrijf wil AI serieus inzetten maar weet niet waar te beginnen"
  - "Directie wil objectieve second opinion vóór ze budget committeren"
  - "Nieuwe DGA/COO die AI-roadmap moet opleveren aan stakeholders"
deliverables:
  - "60-90 min interview-sessie met directie en operationele leiding"
  - "Geschreven rapport met top-3 AI-kansen en impact-inschatting"
  - "Prioritering + implementatie-volgorde advies"
  - "Optioneel: advies-gesprek over vervolgstappen"
typical_value:
  - "Duidelijkheid over welke use-case eerst rendeert"
  - "ROI-forecast per AI-kans — grondslag voor business case"
  - "Vermijden van €50-100k aan verkeerd-gerichte AI-investeringen"
price_range: "op maat — nog bewust niet publiek"
cta_phrase: "Plan een Kickstart Assessment"
```

### 1.2 AI Sales Systeem

```yaml
id: sales_system
name: AI Sales Systeem
one_liner: "Complete AI-gedreven sales-motor — van prospecting tot pipeline-scoring, zonder dat je team extra uren draait."
role_in_funnel: primary build
for_persona: [cro, sales_director, dga]
for_situation:
  - "Pipeline valt tegen, huidige outbound werkt niet"
  - "SDR's zijn duur en niet schaalbaar"
  - "Offertes duren te lang, conversie is te laag"
  - "Accountmanagers besteden te veel tijd aan koude acquisitie"
components:
  - "AI-prospecting + enrichment op named accounts"
  - "Gepersonaliseerde outbound-sequences (email + LinkedIn + WhatsApp)"
  - "Scrapers voor competitor-pricing en intent-signalen"
  - "Pipeline-scoring + white-space-detection op bestaand klantbestand"
  - "Sales intelligence dashboard"
typical_value:
  - "Meer leads bij gelijke FTE-inzet"
  - "Hogere reply-rates door AI-personalisatie"
  - "Zichtbare ondergeleverde accounts in huidige klantportfolio"
  - "Schaalbaar zonder SDR-team te hoeven aannemen"
time_to_value: "4-8 weken eerste concrete output"
price_range: "op maat"
cta_phrase: "Praten over jullie pipeline"
```

### 1.3 AI Operations Dashboard

```yaml
id: ops_dashboard
name: AI Operations Dashboard
one_liner: "Eén live dashboard dat ERP, webshop, CRM, Excel en finance samenbrengt — voor het eerst echt zicht op marge en operatie."
role_in_funnel: primary build
for_persona: [coo, cfo, dga]
for_situation:
  - "Data zit verspreid over 5+ systemen, niemand heeft één waarheid"
  - "Maandelijkse rapportages kosten dagen handwerk"
  - "KPI-zicht is reactief (pas aan einde van kwartaal zichtbaar)"
  - "CSRD-rapportage komt eraan en blijkt nu puur handwerk"
components:
  - "Multi-bron data-integratie (ERP + CRM + webshop + Excel + finance)"
  - "Live marge-, OEE- of cent-per-km-dashboards (sector-afhankelijk)"
  - "Geautomatiseerde rapportage + waarschuwingen"
  - "Scope-3 CSRD-module optioneel"
typical_value:
  - "Beslissingen op data, niet op gut feel"
  - "FTE-tijd op rapportage naar bijna nul"
  - "Lekken in marge/productie/planning zichtbaar binnen dagen i.p.v. kwartalen"
  - "Contract-behoud bij grote klanten die ESG-rapportage eisen"
time_to_value: "6-10 weken eerste bruikbare dashboard"
price_range: "op maat"
cta_phrase: "Jullie data-puzzel in beeld brengen"
```

### 1.4 AI Assistent

```yaml
id: ai_assistant
name: AI Assistent
one_liner: "Een AI-assistent die past waar jij hem nodig hebt: klantenservice 24/7, binnendienst-ondersteuning, voice-agent of interne kennis-bot."
role_in_funnel: primary build
for_persona: [coo, service_director, cro, dga]
for_situation:
  - "Klantenservice draait op kantooruren, routine-vragen overbelasten service-desk"
  - "Senior-medewerkers gaan met pensioen, kennis verdwijnt"
  - "Binnendienst besteedt 40%+ tijd aan product- en spec-vragen"
  - "Nieuwe medewerkers inwerken kost 3-6 maanden"
variants:
  - id: chatbot
    use: "Klant-facing of intern web/Teams/Outlook"
  - id: voice_agent
    use: "Telefonisch, multilingual (NL/EN/PL/RO)"
  - id: internal_copilot
    use: "Shop-floor, binnendienst, engineering documentatie"
typical_value:
  - "30-50% deflectie op routine-vragen"
  - "24/7 beschikbaarheid zonder nachtbezetting"
  - "Onboarding van 6 mnd naar 6 weken"
  - "Senior-kennis vastgehouden in plaats van uitgestroomd"
time_to_value: "3-8 weken afhankelijk van complexiteit"
price_range: "op maat"
cta_phrase: "Kijken waar een AI-assistent past"
```

### 1.5 AI Operations Partnership (retainer-paraplu)

```yaml
id: partnership
name: AI Operations Partnership
one_liner: "Doorlopend partnership na je eerste product — nieuwe use-cases, optimalisatie, coaching. Flexibel ingevuld per maand."
role_in_funnel: expansion / recurring
for_persona: [alle, na_eerste_product]
for_situation:
  - "Na levering van eerste product wil je structureel AI-voorsprong opbouwen"
  - "Geen zin in losse projectofferte bij elke nieuwe use-case"
  - "Wil dat iemand meedenkt over sector-ontwikkelingen"
components:
  - "Doorlopende optimalisatie bestaande AI-systemen"
  - "Maandelijkse nieuwe use-case-verkenning"
  - "Coaching intern team"
  - "Sector-benchmarks + trendsignalen"
  - "Priority access op nieuwe AI-technieken"
typical_value:
  - "Structurele AI-voorsprong in plaats van losse projectjes"
  - "Vast aanspreekpunt, snelle schakels"
  - "Marginale kosten nieuwe AI-use-cases veel lager dan eerste build"
price_model: retainer / month
price_range: "op maat per klant, flexibel"
cta_phrase: "Doorlopend partnership bespreken"
```

---

## 2. Signal → Product Matrix

Deze matrix is de **primaire routing-logica** voor Scribe-LV. Gegeven een gedetecteerd signaal van Analyst-LV, welk product is het meest relevant om in de eerste mail te pitchen?

| Intent-signaal (uit INTENT-SIGNALS.md) | Primair product | Secundair | Waarom |
|---|---|---|---|
| 1. Vacature data-analist/BI-specialist | `ops_dashboard` | `assessment` | Data-pijn → dashboard brengt het samen |
| 2. Vacature werkvoorbereider/planner | `ops_dashboard` | `ai_assistant` | Planning-bottleneck → dashboard + AI-assist |
| 3. Vacature inside sales/binnendienst | `sales_system` | `ai_assistant` | Sales-volume groeit → automate first |
| 4. Vacature e-commerce/category manager | `sales_system` | `ops_dashboard` | Digital push → AI-pricing + merchandising |
| 5. Vacature >3 mnd open, krimp-sector | `ai_assistant` | `partnership` | Recruitment-pijn → custom ATS of matching |
| 6. Overname/fusie laatste 12 mnd | `ops_dashboard` | `assessment` | Integratie → één waarheid nodig |
| 7. Nieuwe vestiging/DC | `ops_dashboard` | `sales_system` | Schaal → centrale sturing + cross-sell |
| 8. Award (FD Gazellen, Fast 50) | `assessment` | elk | Groei + budget → start met scan |
| 9. Grote klant gewonnen | `ops_dashboard` | `sales_system` | Compliance-eisen + pipeline-stress |
| 10. Familiebedrijf / lange historie | `ai_assistant` | `partnership` | Kennisbehoud → copilot + doorlopend |
| 11. ERP-naam zichtbaar (Isah/AFAS/Exact/SAP/Transpas) | `ops_dashboard` | `sales_system` | Stack helder → AI-laag erop |
| 12. Webshop met beperkte features | `sales_system` | `ops_dashboard` | B2B-gap → pricing + personalisatie |
| 13. "Bel ons voor prijs" op product-pagina | `sales_system` | `ai_assistant` | Quote-pijn → automate |
| 14. Service-desk kantooruren | `ai_assistant` | `sales_system` | 24/7 gap → chatbot/voice |
| 15. Primitieve chatbot op site | `ai_assistant` | `partnership` | Upgrade-opportunity |
| 16. CSRD / duurzaamheidsverslag | `ops_dashboard` | `partnership` | Scope-3 handwerk → automation |
| 17. "Smart Industry" / Industrie 4.0 claim | `assessment` | `ops_dashboard` | Gap-meter tussen ambitie & uitvoering |
| 18. DGA in branche-pers | `assessment` | elk | Zichtbaar, leesbaar → kwalificeer intent |
| 19. Blog over sector-pijnpunten | elk | `assessment` | Alignment-bewijs → scan de rest |
| 20. Grote klanten in logo-wall | `ops_dashboard` | `ai_assistant` | High-stakes → strakke processen verplicht |

### Combinatie-regels (2 signalen samen)

Sommige combinaties zijn **"killer"** — die rechtvaardigen een sterkere pitch en expliciete product-combinatie:

```yaml
killer_combinations:
  - signals: [vacature_data_analist, nieuwe_vestiging]
    hook: "Groei + datazicht tegelijk aanpakken"
    primary_pitch: ops_dashboard + sales_system
    message_angle: "Bundel van inzicht + commerciële laag"

  - signals: [csrd_statement, erp_zichtbaar]
    hook: "ESG-rapportage bovenop legacy stack"
    primary_pitch: ops_dashboard (ESG-module)
    message_angle: "Automate CSRD zonder ERP te vervangen"

  - signals: [familiebedrijf_lange_historie, vacature_planner]
    hook: "Kennisbehoud + planning-modernisering"
    primary_pitch: ai_assistant
    message_angle: "Senior-ervaring vasthouden, junioren sneller productief"

  - signals: [grote_klant_gewonnen, service_desk_kantooruren]
    hook: "High-stakes klanten + beperkte service-capaciteit"
    primary_pitch: ai_assistant
    message_angle: "24/7 beschikbaarheid als de klant dat vraagt"

  - signals: [smart_industry_claim, primitieve_chatbot]
    hook: "AI-ambitie hardgemaakt met concrete stappen"
    primary_pitch: assessment → ai_assistant
    message_angle: "De claim waarmaken, niet alleen adverteren"
```

### Anti-matches (signalen die *niet* naar dat product leiden)

```yaml
never_route:
  - signal: csrd_statement
    not_to: sales_system
    reason: "CSRD is operationeel, niet commercieel"

  - signal: webshop_beperkt_features
    not_to: partnership
    reason: "Partnership is expansion, eerste product moet eerst"

  - signal: vacature_chauffeur
    not_to: ops_dashboard
    reason: "Recruitment-pijn leidt naar ai_assistant (matching) of custom ATS, niet dashboard"
```

---

## 3. Funnel-paden (Scribe moet deze kennen)

Elke prospect doorloopt een entry-expansion-path:

```
Entry-points (eerste mail-CTA):
  - assessment        ← wanneer multi-signal/onduidelijk
  - sales_system      ← commerciële signalen primair
  - ops_dashboard     ← operationele/data signalen primair
  - ai_assistant      ← service/kennisbehoud signalen primair

Expansion (na eerste levering):
  - → partnership     ← altijd aangeboden binnen 30 dagen na delivery
```

Scribe-LV: in eerste mail **nooit** direct partnership pitchen. Partnership komt pas in gesprek 2-3, na eerste product-commitment.

---

## 4. Prijs-communicatie

**Regel:** geen harde prijzen in eerste mail of op de site. Scribe-LV gebruikt deze formuleringen:

- ✅ *"Op maat"*
- ✅ *"We bepalen scope en prijs samen, na een kort verkennend gesprek"*
- ✅ *"Investering is afhankelijk van jullie scope"*
- ❌ *"Vanaf €5.000"* — niet doen, product-definitie is nog in ontwikkeling
- ❌ *"Ongeveer €20-30k"* — niet doen, prospect haakt af op nummer zonder context

---

*Versie: 1.0 — 2026-04-20. Update: wanneer een product wordt toegevoegd, hernoemd, of prijs-strategie verandert.*
