# PRODUCTS.md — Leadvelocity Product-Architectuur voor Scribe & Analyst

**Versie:** 3.0 — 2026-04-20 (3-tier model + prospect-profile-based entry)
**Afnemers:** Scribe-LV (copy-generatie per entry-tier), Analyst-LV (profile-naar-tier-routing)

---

## 1. Strategische kern

Leadvelocity levert **3 tiers** van AI-oplossingen. Welke we pitchen in outreach hangt af van de **prospect-profiel + signalen**, niet van een rigide volgorde. Overkoepelend: elke mail moet impliciet laten zien dat we **alle drie kunnen** — zelfs als we één specifiek product pitchen.

**Drie tiers:**

| Tier | Wat het is | Prijs-range | Time-to-Value |
|---|---|---|---|
| 🟢 Tier 1 — Quick Wins | Laagdrempelige AI-automatiseringen die direct iets oplossen | €500-3.000 per stuk | 1-3 weken |
| 🟡 Tier 2 — Sector Solutions | Sector-specifieke copilots en automators | €5-15k | 4-8 weken |
| 🔴 Tier 3 — Impact Projects | Heavy transformatie-projecten met grote financiële hefboom | €20-40k+ | 8-16 weken |

**Waarom dit werkt:** elke Tier 1 Quick Win geeft ons zichtbaarheid in klant-data. Die zichtbaarheid voedt Tier 2. Tier 2 voedt Tier 3. **We groeien mee met de klant in plaats van één groot project te verkopen.**

---

## 2. Tier 1 — Quick Wins catalogus (universeel, cross-vertical)

Deze 12 automatiseringen werken bij vrijwel elk bedrijf, onafhankelijk van sector. Ze zijn het **voordeur-aanbod** voor prospects die nog niet klaar zijn voor grotere commitment.

```yaml
- id: q1_email_response_ai
  name: "E-mail Response AI"
  description: "AI genereert concept-antwoord in inbox; mens klikt verzenden"
  price_range: "€1.000 - €2.000"
  duration: "1-2 weken"
  visibility_gained: "Klant-communicatie-patronen, routine-vragen"
  best_for: [binnendienst, klantenservice, sales-admin]

- id: q2_meeting_intelligence
  name: "Meeting Intelligence"
  description: "Teams/Zoom-calls worden automatisch samengevat met actiepunten in CRM"
  price_range: "€1.000 - €2.000 + usage"
  duration: "1-2 weken"
  visibility_gained: "Sales-conversaties, klantzorgen, deal-patronen"
  best_for: [sales, management, customer success]

- id: q3_document_ocr_to_erp
  name: "Document-OCR naar ERP"
  description: "PDFs (facturen, orders, contracten) automatisch ingelezen en geboekt"
  price_range: "€2.000 - €3.000"
  duration: "2-3 weken"
  visibility_gained: "Financiële stromen, leveranciers, order-patronen"
  best_for: [finance, inkoop, operations]

- id: q4_voice_to_crm
  name: "Voice-to-CRM notities"
  description: "Buitendienst/chauffeur dicteert; notities verschijnen direct in CRM"
  price_range: "€1.000 - €2.000"
  duration: "1-2 weken"
  visibility_gained: "Klantrelatie-data, veldwaarnemingen"
  best_for: [buitendienst, chauffeurs, servicemonteurs]

- id: q5_internal_knowledge_search
  name: "Interne Kennis-zoeker"
  description: "RAG-AI op SharePoint/Drive/wiki; medewerker vraagt, AI antwoordt"
  price_range: "€2.000 - €3.000"
  duration: "2-3 weken"
  visibility_gained: "Welke docs/kennis waardevol zijn, onboarding-gaps"
  best_for: [alle teams, nieuwe medewerkers, engineering]

- id: q6_whatsapp_auto_responder
  name: "WhatsApp Auto-Responder"
  description: "Tier-1 klantvragen 24/7 afgehandeld, escaleert naar mens indien nodig"
  price_range: "€2.000 - €4.000"
  duration: "2-3 weken"
  visibility_gained: "Meest gestelde klant-vragen, service-load"
  best_for: [klantenservice, customer support]

- id: q7_customer_segmentation
  name: "Klant-segmentatie"
  description: "AI clustert klantbestand op gedrag, omzet-potentie en retentie-risico"
  price_range: "€1.000 - €2.000"
  duration: "1 week"
  visibility_gained: "Accountportfolio-inzicht, upsell-kansen"
  best_for: [sales, marketing, commercial management]

- id: q8_news_signal_monitor
  name: "Nieuws & Signaal-monitor"
  description: "Sector-/klant-/concurrent-nieuws automatisch verzameld en samengevat"
  price_range: "€1.000 - €2.000"
  duration: "1 week"
  visibility_gained: "Markt-intelligence, klant-events, concurrentie-bewegingen"
  best_for: [sales, directie, commercial]

- id: q9_linkedin_outreach_assistant
  name: "LinkedIn Outreach Assistent"
  description: "Gepersonaliseerde DMs op schaal; sales kiest wie aangeschreven wordt"
  price_range: "€2.000 - €3.000"
  duration: "2 weken"
  visibility_gained: "Prospecting-patronen, response-gedrag"
  best_for: [sales, BD, commercial director]

- id: q10_automated_reporting
  name: "Automated Reporting"
  description: "Wekelijkse/maandelijkse rapporten uit data-bronnen; naar slides of email"
  price_range: "€2.000 - €4.000"
  duration: "2-3 weken"
  visibility_gained: "KPI-data, bedrijfsperformance, rapportage-behoeften"
  best_for: [directie, management, finance]

- id: q11_onboarding_ai_guide
  name: "Onboarding AI-gids"
  description: "Nieuwe medewerker stelt vragen over processen; AI antwoordt op basis van interne docs"
  price_range: "€1.000 - €2.000"
  duration: "1-2 weken"
  visibility_gained: "Onboarding-gaps, wat junioren structureel niet begrijpen"
  best_for: [HR, team leads, operations]

- id: q12_quote_template_filler
  name: "Offerte-template filler"
  description: "Standaard RFQ → basis-offerte klaar in minuten; binnendienst controleert en verzendt"
  price_range: "€2.000 - €4.000"
  duration: "2-3 weken"
  visibility_gained: "Offerte-volumes, conversie-patronen, pricing-gedrag"
  best_for: [binnendienst, sales-admin, technische groothandel]
```

---

## 3. Tier 2 — Sector-specifieke oplossingen

Per vertical 4 diepere oplossingen die sector-specifieke problemen aanpakken. Herhaalbaar binnen de vertical, maar niet direct cross-sector.

### 3.1 Groothandel Tier 2

```yaml
- id: g_t2_inside_sales_copilot
  name: "Inside Sales Copilot"
  description: "AI-assistent in Outlook/Teams met productmatching, specs en alternatieven uit jullie catalogus"
  price_range: "€8.000 - €12.000"
  duration: "4-6 weken"
  tier_upgrade_from: [q5_internal_knowledge_search]
  best_for: [binnendienst 5-20 FTE]

- id: g_t2_quote_automator
  name: "Quote Automator"
  description: "Klant-RFQ (email/PDF) → automatische offerte met staffel-berekening en klantspecifieke pricing"
  price_range: "€10.000 - €18.000"
  duration: "6-8 weken"
  tier_upgrade_from: [q12_quote_template_filler]
  best_for: [technische groothandel met RFQ-turnaround-pijn]

- id: g_t2_whitespace_detector_light
  name: "White-Space Detector (Light)"
  description: "AI analyseert CRM en orderhistorie voor ondergeleverde klanten per productgroep"
  price_range: "€6.000 - €10.000"
  duration: "4-6 weken"
  tier_upgrade_from: [q7_customer_segmentation]
  best_for: [CRO, commercial director, account managers]

- id: g_t2_supplier_catalog_enricher
  name: "Supplier Catalog Enricher"
  description: "AI-verrijking van leveranciers-feeds met specs, afbeeldingen en SEO-data voor webshop"
  price_range: "€8.000 - €14.000"
  duration: "5-7 weken"
  tier_upgrade_from: []
  best_for: [e-commerce manager, category manager, PIM-verantwoordelijke]
```

### 3.2 Maakindustrie Tier 2

```yaml
- id: m_t2_shopfloor_copilot
  name: "Shop-Floor Copilot"
  description: "AI-assistent op tablet/shop-floor-terminal voor machine-instellingen, storingen, werkinstructies"
  price_range: "€8.000 - €14.000"
  duration: "5-7 weken"
  tier_upgrade_from: [q5_internal_knowledge_search]
  best_for: [operators, werkvoorbereiders, productie-management]

- id: m_t2_engineering_doc_search
  name: "Engineering Documentation Search"
  description: "RAG-AI op alle technische tekeningen, stuklijsten, normen en werkinstructies"
  price_range: "€6.000 - €10.000"
  duration: "3-5 weken"
  tier_upgrade_from: [q5_internal_knowledge_search]
  best_for: [engineering, werkvoorbereiding, sales-support]

- id: m_t2_order_margin_tracker
  name: "Order Margin Tracker (Light)"
  description: "Real-time inzicht in marge per order; voor- vs nacalculatie-gap zichtbaar binnen dagen, niet kwartalen"
  price_range: "€10.000 - €15.000"
  duration: "5-8 weken"
  tier_upgrade_from: []
  best_for: [CFO, plant manager, commercial director]

- id: m_t2_quality_report_generator
  name: "Kwaliteits-rapport Generator"
  description: "Automatische klantspecifieke kwaliteitsrapporten uit MES/QC-data"
  price_range: "€7.000 - €12.000"
  duration: "4-6 weken"
  tier_upgrade_from: [q10_automated_reporting]
  best_for: [QC-manager, klanten-service, maakbedrijven met OEM-klanten]
```

### 3.3 Transport Tier 2

```yaml
- id: t_t2_planner_copilot
  name: "Planner Copilot"
  description: "AI-assistent voor planners; 'kan deze rit erbij?', ritcombinaties, rij/rusttijd-constraints"
  price_range: "€8.000 - €14.000"
  duration: "5-7 weken"
  tier_upgrade_from: [q5_internal_knowledge_search]
  best_for: [planners, hoofd planning, operations]

- id: t_t2_fuel_coaching_engine
  name: "Fuel Coaching Engine"
  description: "FMS-data per chauffeur, vergelijking met peers, gepersonaliseerde coaching; 2-4% brandstofreductie"
  price_range: "€6.000 - €10.000"
  duration: "4-6 weken"
  tier_upgrade_from: []
  best_for: [operations, fleet manager, COO]

- id: t_t2_csrd_report_generator
  name: "CSRD-rapport Generator"
  description: "Semi-automatische klant-rapportages over scope-3 emissies uit tachograaf + FMS"
  price_range: "€8.000 - €14.000"
  duration: "5-8 weken"
  tier_upgrade_from: [q10_automated_reporting]
  best_for: [compliance, finance, commercial met grote verladers]

- id: t_t2_charter_matching_assist
  name: "Charter-matching Assistent"
  description: "AI stelt charter-combinaties voor op basis van ritprofiel, certificeringen, historische prestatie"
  price_range: "€7.000 - €12.000"
  duration: "4-6 weken"
  tier_upgrade_from: []
  best_for: [planners, operations, hoofd planning]
```

---

## 4. Tier 3 — Impact Projects (vaag houden op site en in outreach)

Dit is jullie échte IP. **Niet in detail uitgeven in eerste mail**. Alleen hints, doorsturen naar klant-gesprek.

```yaml
tier_3_projects:
  groothandel:
    - "AI Pricing Engine (dynamische staffel-pricing, +130-200 bps brutomarge)"
    - "Demand Forecasting + Auto-replenishment (-20/30% voorraad)"

  maakindustrie:
    - "Predictive Maintenance (sensors + ML, -50% downtime)"
    - "Computer Vision Kwaliteitscontrole (-85% defect escapes, BMW-benchmark)"

  transport:
    - "Route Optimization Layer (5-10% lagere transportkosten)"
    - "Full-automated CSRD Pipeline (van handmatige 30-40 uur/mnd naar 2-4 uur review)"
```

**Scribe-regel:** noem in eerste mail maximaal één Tier 3-project als referentie ("voor wie verder gaat"). Details pas in gesprek.

---

## 5. Prospect-profile → Entry-tier routing (voor Scribe-LV)

Dit is **de kernlogica** voor welke tier je pitcht.

```yaml
routing_matrix:
  - profile: "Nieuwsgierig, low-risk, onbekend budget"
    signals: [recent_ai_post_liked, general_technology_vacancy, smaller_company]
    entry_tier: "Tier 1"
    pitch_pattern: "Start met één Quick Win (€1-3k) om momentum te maken"
    overarching_hint: "Daarna bouwen we door naar diepere oplossingen"

  - profile: "Specifiek sector-signaal"
    signals: [csrd_statement, driver_shortage_mention, quote_pain_visible]
    entry_tier: "Tier 2 (sector-oplossing)"
    pitch_pattern: "Direct de matching Tier 2-oplossing noemen"
    overarching_hint: "Soms starten we met een Quick Win daarvoor"

  - profile: "Digitaal-volwassen, grote ambitie"
    signals: [data_team_vacancy, webshop_upgrade, erp_migration_news, award]
    entry_tier: "Tier 2 + Tier 3 hint"
    pitch_pattern: "Medium-serieuze Tier 2 pitch, Tier 3 vaag als 'volgende stap'"
    overarching_hint: "Voor wie verder gaat, hebben we ook grote anchor-projecten"

  - profile: "Onduidelijk / weinig signalen"
    signals: []
    entry_tier: "Tier 1 (default)"
    pitch_pattern: "Audit (€2.5k) + één Quick Win erbij"
    overarching_hint: "Hangt af van waar jullie staan"

  - profile: "Concurrent heeft al iets"
    signals: [competitor_press_release, fomo_signals]
    entry_tier: "Tier 2 + urgentie-hook"
    pitch_pattern: "Concurrent-observatie + Tier 2-oplossing"
    overarching_hint: "Dit is een kwestie van maanden, niet jaren"
```

---

## 6. Scribe Copy-regels (OVERKOEPELEND)

Kernprincipe: **in elke mail moet impliciet blijken dat we alle drie tiers kunnen**. Niet letterlijk noemen, wel in de tekst laten ademen.

### Openings-patronen die dit doen

✅ *"Bij vergelijkbare [sector]-bedrijven starten we soms met een quick automation van 2 weken, soms met een volwaardig [Tier 2]-traject van een kwartaal."*

✅ *"Dit is het type signaal waar we meestal met een [Tier 1-oplossing] op inspelen — maar soms leidt het tot een diepere samenwerking."*

✅ *"Afhankelijk van waar jullie staan hebben we hier meerdere oplossingen voor — van een snelle automatisering tot een volwaardig [Tier 2-product]."*

### Wat Scribe NOOIT zegt

❌ *"Wij hebben 3 tiers"* — te salesy, te structureel
❌ *"Onze goedkoopste oplossing is..."* — klein-maken vermijden
❌ *"Vanaf €1.000"* — klantervaring-verzwakking
❌ *"We starten altijd met een Quick Win"* — mechanisch, niet adaptief
❌ *"Dit is ons premium product"* — te SaaS-achtig

### Prijs-communicatie per tier

- **Tier 1 Quick Wins**: mag concreet, bijv. *"€2.000, 2 weken"* — geeft klant zekerheid
- **Tier 2 Sector**: geef range, bijv. *"€8-12k afhankelijk van scope"* — ruimte voor intake
- **Tier 3 Impact**: nooit concreet in eerste mail. *"Investering afhankelijk van omvang en data-staat"* — gesprek eerst

---

## 7. Signaal → Tier+Product routing matrix

Gegeven een gedetecteerd signaal, welk product is het logisch-eerste om te pitchen?

| Signaal uit INTENT-SIGNALS.md | Primary product-ID | Tier | Secondary |
|---|---|---|---|
| Vacature data-analist/BI | q10_automated_reporting | 1 | m_t2_order_margin_tracker |
| Vacature werkvoorbereider/planner | t_t2_planner_copilot | 2 | m_t2_shopfloor_copilot |
| Vacature inside sales | g_t2_inside_sales_copilot | 2 | q9_linkedin_outreach_assistant |
| Vacature e-commerce manager | g_t2_supplier_catalog_enricher | 2 | - |
| Vacature langdurig open | q6_whatsapp_auto_responder | 1 | q2_meeting_intelligence |
| Overname/fusie | q3_document_ocr_to_erp | 1 | m_t2_order_margin_tracker |
| Nieuwe vestiging | q10_automated_reporting | 1 | q7_customer_segmentation |
| Award | q10_automated_reporting | 1 | Tier 2 passend bij vertical |
| Grote klant gewonnen | t_t2_csrd_report_generator (indien transport) | 2 | m_t2_quality_report_generator |
| Familiebedrijf | q5_internal_knowledge_search | 1 | m_t2_shopfloor_copilot |
| ERP-naam zichtbaar | q3_document_ocr_to_erp | 1 | Tier 2 per vertical |
| Webshop beperkt | g_t2_supplier_catalog_enricher | 2 | q12_quote_template_filler |
| "Bel ons voor prijs" | q12_quote_template_filler | 1 | g_t2_quote_automator |
| Service-desk kantooruren | q6_whatsapp_auto_responder | 1 | q1_email_response_ai |
| Primitieve chatbot | q6_whatsapp_auto_responder | 1 | - |
| CSRD-statement | t_t2_csrd_report_generator | 2 | q10_automated_reporting |
| Smart Industry claim | m_t2_order_margin_tracker | 2 | Tier 3 hint |
| DGA in branche-pers | elk relevant product | - | pitch breed, niet specifiek |
| Blog sector-pijnpunten | elk | - | alignement-signaal, open houden |
| Grote klanten logo-wall | t_t2_csrd_report_generator (transport) of m_t2_quality_report_generator (maak) | 2 | - |

---

## 8. Funnel-mapping: Tier → Commitment Ladder

De 3-tier-architectuur staat niet los van de 4-trap Commitment Ladder — ze versterken elkaar:

| Commitment Trap | Welke tiers landen hier? |
|---|---|
| Trap 1 — Audit (€2.5k) | Altijd gecombineerd met 1 Tier 1 Quick Win voor snelle waarde |
| Trap 2 — Pilot Build (€12-20k) | Tier 2 oplossing, of 2-3 Tier 1 Quick Wins samen |
| Trap 3 — Operating Partnership (€3-8k/mnd) | Tier 1 onderhouden + nieuwe Tier 1/2 toevoegen |
| Trap 4 — Scale & Expand (€8-15k/mnd) | Tier 3 projecten uitvoeren, meerdere Tier 2 parallel |

**Typische klant-journey:**
1. Cold → Audit + 1 Quick Win (Trap 1)
2. Succes met Quick Win → Pilot Build van Tier 2 (Trap 2)
3. Pilot succes → doorrol naar Operating (Trap 3), waar nieuwe Quick Wins erbij komen
4. Mature partnership → Tier 3 projecten (Trap 4)

---

## 9. Output-formaat voor Scribe

Analyst-LV levert per prospect:

```json
{
  "prospect_id": "xxx",
  "recommended_entry_tier": "Tier 1",
  "primary_product_id": "q12_quote_template_filler",
  "secondary_product_id": "g_t2_quote_automator",
  "tier_3_hint_allowed": false,
  "pitch_pattern": "Start met één Quick Win om momentum te maken",
  "overarching_hint_required": true
}
```

Scribe gebruikt dit om de e-mail-body te genereren volgens de copy-regels in sectie 6.

---

*Versie: 3.0 — 2026-04-20. Vervangt v2.0 (4-trap ladder alleen). Update: wanneer Tier 1/2/3 catalogus uitgebreid wordt of prijzen aangepast.*
