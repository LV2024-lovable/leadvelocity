# INTENT-SIGNALS.md — Signaal-bibliotheek voor Analyst-LV

**Versie:** 1.0 — 2026-04-20
**Afnemer:** Analyst-LV (detecteert signalen in gescrapte website-content, LinkedIn, branche-pers)

---

## Hoe Analyst dit bestand gebruikt

Voor elke gescrapte prospect voert Analyst-LV deze loop uit:

1. **Scan bronnen** in volgorde: homepage → about → vacatures → nieuws/blog → klanten-pagina → LinkedIn company → Google-news
2. **Match patroon** per signaal-type (zie YAML-definities hieronder)
3. **Score confidence** op basis van: (a) aanwezigheid van `matching_keywords`, (b) context (gewogen via `source_weight`), (c) recentheid (`recency_rule`)
4. **Apply false-positive filters** — verwijder matches die in `false_positives` vallen
5. **Rank by priority** — killer signals skippen verdere analyse, nice-to-have worden gestapeld
6. **Output** lijst met `{signal_id, confidence_0_1, evidence_snippet, source_url, detected_at}`

---

## 1. Signaal-catalogus (YAML)

### Categorie A: Hiring-signalen

```yaml
- id: vacature_data_analist
  category: hiring
  priority: high
  human_name: "Vacature data-analist/BI-specialist"
  description: "Open vacature voor data-analyse, business intelligence of data engineering rol"
  matching_keywords:
    - "data-analist"
    - "data analyst"
    - "BI specialist"
    - "business intelligence"
    - "data engineer"
    - "analytics lead"
    - "power bi"
    - "data scientist"
  source_weight:
    "/vacatures": 1.0
    "/careers": 1.0
    "/werken-bij": 1.0
    "/jobs": 1.0
    "/nieuws": 0.3
    "linkedin_company_post": 0.6
    "google_search": 0.2
  recency_rule: "max 90 dagen oud"
  confidence_boosters:
    - "specifieke tools genoemd (Power BI, Tableau, Python)"
    - "vermelding van concrete data-pijn in JD"
    - "senior-level of lead-rol (budget-indicator)"
  false_positives:
    - "algemene IT-rol zonder data-focus"
    - "interim- of freelance-aanbieding van de prospect zelf"
    - "HR-medewerker die 'data bijhoudt' als 10% van taak"
  product_fit: ops_dashboard
  opener_hook: "Jullie vacature voor [rol] laat zien dat jullie meer uit jullie data willen halen"

- id: vacature_planner
  category: hiring
  priority: high
  human_name: "Vacature werkvoorbereider/planner/capaciteitsplanner"
  description: "Open rol in productie- of transport-planning"
  matching_keywords:
    - "werkvoorbereider"
    - "planner"
    - "capaciteitsplanner"
    - "productieplanner"
    - "logistiek planner"
    - "scheduler"
    - "transportplanner"
  source_weight:
    "/vacatures": 1.0
    "/careers": 1.0
    "linkedin_jobs": 0.9
  recency_rule: "max 90 dagen oud"
  false_positives:
    - "financiële planner (≠ operations)"
    - "event-planner of marketing-planner"
  product_fit: ops_dashboard
  secondary_fit: ai_assistant
  opener_hook: "Zag jullie zoektocht naar een [rol] — precies de rol waar AI-planning direct op bijt"

- id: vacature_inside_sales
  category: hiring
  priority: medium
  human_name: "Vacature inside sales/binnendienst/customer success"
  description: "Commerciële of service-support rol, indicator van volume-groei"
  matching_keywords:
    - "inside sales"
    - "binnendienst"
    - "customer success"
    - "salesmedewerker"
    - "accountbeheerder"
    - "commercieel medewerker"
    - "klantenservice"
  source_weight:
    "/vacatures": 1.0
  recency_rule: "max 90 dagen oud"
  product_fit: sales_system
  secondary_fit: ai_assistant
  opener_hook: "Jullie zoektocht naar [rol] wijst op commerciële groeidruk"

- id: vacature_ecommerce_manager
  category: hiring
  priority: high
  human_name: "Vacature e-commerce manager / category manager / digital lead"
  description: "Digitale versnelling, budget + directie-steun aanwezig"
  matching_keywords:
    - "e-commerce manager"
    - "category manager"
    - "digital lead"
    - "digital director"
    - "online marketing manager"
    - "webshop manager"
  source_weight:
    "/vacatures": 1.0
    "linkedin_jobs": 0.9
  product_fit: sales_system
  secondary_fit: ops_dashboard
  opener_hook: "Dat jullie een [rol] zoeken laat zien dat de digitale versnelling doorzet"

- id: vacature_langdurig_open
  category: hiring
  priority: high
  human_name: "Vacature openstaand > 3 maanden in krimp-sector"
  description: "Structureel arbeidstekort — traditional recruiting faalt"
  matching_keywords:
    - "al langer open"
    - "met spoed"
    - "direct beschikbaar"
  detection_rule: "cross-check vacature-datum — als >90 dagen geleden gepost én nog actief → match"
  relevant_verticals: [transport, maakindustrie]
  product_fit: ai_assistant
  secondary_fit: partnership
  opener_hook: "Jullie [rol]-vacature staat al enkele maanden open — in 2026 is dat structureel"
```

### Categorie B: Groei- en strategische signalen

```yaml
- id: overname_fusie
  category: growth
  priority: high
  human_name: "Overname of fusie in laatste 12 maanden"
  description: "Integratie-stress, systemen harmoniseren, dubbele data"
  matching_keywords:
    - "overname"
    - "acquisitie"
    - "onderdeel van"
    - "fusie"
    - "heeft overgenomen"
    - "per [maand] maakt deel uit van"
  source_weight:
    "/nieuws": 1.0
    "/pers": 1.0
    "/about": 0.8
    "google_news": 0.9
  recency_rule: "max 365 dagen"
  product_fit: ops_dashboard
  secondary_fit: assessment
  opener_hook: "Jullie overname van [bedrijf] vraagt nu veel van jullie operatie"

- id: nieuwe_vestiging
  category: growth
  priority: medium
  human_name: "Nieuwe vestiging/DC/productielocatie geopend"
  matching_keywords:
    - "nieuwe vestiging"
    - "opent in"
    - "opening van"
    - "nieuw distributiecentrum"
    - "uitbreiding naar"
    - "tweede vestiging"
  source_weight:
    "/nieuws": 1.0
    "linkedin_company_post": 0.8
  recency_rule: "max 365 dagen"
  product_fit: ops_dashboard
  secondary_fit: sales_system
  opener_hook: "Nieuwe vestiging in [plaats]"

- id: award_erkenning
  category: growth
  priority: medium
  human_name: "Award of ranglijst-erkenning"
  description: "FD Gazellen, Deloitte Fast 50, Emerce 100, branche-awards"
  matching_keywords:
    - "FD Gazellen"
    - "Deloitte Fast 50"
    - "Emerce 100"
    - "Great Place to Work"
    - "Koninklijke onderscheiding"
    - "award"
    - "winnaar"
  source_weight:
    "/nieuws": 1.0
    "/about": 0.7
    "footer-badges": 0.5
  recency_rule: "max 3 jaar (nog relevant)"
  product_fit: assessment
  opener_hook: "[Award] [jaartal] is geen toeval"

- id: grote_klant_gewonnen
  category: growth
  priority: high
  human_name: "Persbericht nieuwe (grote) klant"
  matching_keywords:
    - "tekent contract met"
    - "wordt leverancier van"
    - "werkt samen met [bekende klantnaam]"
    - "nieuwe klant"
    - "won tender"
  false_positives:
    - "klant wordt alleen genoemd als referentie zonder datum"
  product_fit: ops_dashboard
  secondary_fit: sales_system
  opener_hook: "Gefeliciteerd met de deal met [klantnaam]"

- id: familiebedrijf_lange_historie
  category: growth
  priority: medium
  human_name: "Familiebedrijf / lange historie"
  description: "Pragmatisch, geen hype-koper. Senior-kennis-erosie reëel"
  matching_keywords:
    - "familiebedrijf"
    - "[X]e generatie"
    - "sinds [jaartal < 1990]"
    - "[X] jaar ervaring"
    - "al [X] generaties"
  source_weight:
    "/about": 1.0
    "/over-ons": 1.0
  product_fit: ai_assistant
  secondary_fit: partnership
  opener_hook: "Familiebedrijf sinds [jaartal]"
```

### Categorie C: Technologie- en stack-signalen

```yaml
- id: erp_zichtbaar
  category: tech
  priority: high
  human_name: "ERP-merknaam zichtbaar op site"
  description: "Geeft technische context + digitale volwassenheid"
  matching_keywords:
    - "SAP"
    - "AFAS"
    - "Exact"
    - "Isah"
    - "Ridder"
    - "Navision"
    - "Microsoft Dynamics"
    - "Transpas"
    - "Carlo"
    - "Plan&Go"
    - "PTV"
    - "Simacan"
  source_weight:
    "/partners": 1.0
    "/integraties": 1.0
    "/nieuws": 0.5
    "careers_jd": 0.7
  product_fit: ops_dashboard
  secondary_fit: sales_system
  opener_hook: "Jullie [ERP]-setup is een degelijke basis"

- id: webshop_beperkt
  category: tech
  priority: medium
  human_name: "B2B-webshop met beperkte features"
  description: "Geen klantspecifieke pricing, geen live voorraad, geen personalisatie"
  detection_rule: "crawl webshop-product-pagina — detecteer afwezigheid van: stock-indicator, login-gate voor pricing, gerelateerde producten"
  manual_check_required: true
  product_fit: sales_system
  secondary_fit: ops_dashboard
  opener_hook: "Jullie webshop draait, maar mist de klantspecifieke pricing die Amazon Business standaard biedt"

- id: bel_ons_voor_prijs
  category: tech
  priority: high
  human_name: "'Bel ons voor prijs' of 'Vraag offerte aan' op product-pagina's"
  matching_keywords:
    - "prijs op aanvraag"
    - "bel ons voor"
    - "vraag offerte aan"
    - "request a quote"
    - "neem contact op voor prijs"
  source_weight:
    "product_pages": 1.0
    "/contact": 0.5
  product_fit: sales_system
  opener_hook: "Jullie prijsaanvraag-proces via e-mail kan een bottleneck worden"

- id: service_desk_kantooruren
  category: tech
  priority: medium
  human_name: "Service-desk alleen kantooruren"
  matching_keywords:
    - "bereikbaar ma-vr"
    - "08:00-17:00"
    - "09:00-17:30"
    - "openingstijden klantenservice"
    - "kantooruren"
  source_weight:
    "/contact": 1.0
    "/service": 1.0
    "footer": 0.7
  product_fit: ai_assistant
  opener_hook: "Jullie service-desk draait kantooruren"

- id: primitieve_chatbot
  category: tech
  priority: high
  human_name: "Chatbot aanwezig maar primitief/verouderd"
  description: "Stap 1 gezet, niet geüpgrade. Pijn bekend, oplossing ontoereikend"
  detection_rule: "open widget, test met open vraag — als antwoord vaag/fallback → match"
  manual_check_required: true
  product_fit: ai_assistant
  secondary_fit: partnership
  opener_hook: "Jullie chatbot is een begin — tegelijk merk je dat hij op FAQ-niveau blijft"
```

### Categorie D: Content- en positioneringssignalen

```yaml
- id: csrd_statement
  category: content
  priority: high
  human_name: "CSRD / duurzaamheidsverslag / CO2-reductie-claim"
  matching_keywords:
    - "CSRD"
    - "duurzaamheidsverslag"
    - "sustainability report"
    - "scope 3"
    - "CO2-reductie"
    - "CO2-neutraal in [jaartal]"
    - "net zero"
    - "ESG"
  source_weight:
    "/duurzaamheid": 1.0
    "/sustainability": 1.0
    "/esg": 1.0
    "/about": 0.6
  product_fit: ops_dashboard
  secondary_fit: partnership
  opener_hook: "Jullie CSRD-ambitie richting [jaar] is helder"

- id: smart_industry_claim
  category: content
  priority: medium
  human_name: "'Smart Industry' / 'Industrie 4.0' / 'Data-gedreven' claim"
  description: "Expliciete AI-affiniteit maar vaak meer marketing dan operationele realiteit"
  matching_keywords:
    - "Smart Industry"
    - "Industrie 4.0"
    - "Industry 4.0"
    - "data-gedreven"
    - "data driven"
    - "AI-first"
    - "digitale fabriek"
  source_weight:
    "/about": 1.0
    "/visie": 1.0
    "homepage_hero": 0.8
  product_fit: assessment
  secondary_fit: ops_dashboard
  opener_hook: "Jullie Smart Industry-positionering is duidelijk — tegelijk zien we bij vergelijkbare bedrijven de operationele laag 12-18 maanden achterlopen"

- id: dga_in_branchepers
  category: content
  priority: high
  human_name: "DGA/directie geciteerd in branche-pers"
  description: "Zichtbaar, leesbaar, uitgesproken mening → hoogste respons-kans"
  sources_to_check:
    - "linkmagazine.nl"
    - "nieuwsbladtransport.nl"
    - "distrilogonline.nl"
    - "cobouw.nl"
    - "ictmagazine.nl"
    - "emerce.nl"
    - "logistiek.nl"
    - "made-in-europe.nl"
    - "aandrijftechniek.nl"
  detection_rule: "Google: site:[source] + [bedrijfsnaam] + [naam directie]"
  manual_check_required: true
  product_fit: any
  opener_hook: "Je interview in [publicatie] over [specifiek citaat]"

- id: blog_sector_pijn
  category: content
  priority: medium
  human_name: "Blog/nieuwspagina met sector-pijnpunt-artikelen"
  matching_keywords:
    - "personeelstekort"
    - "margedruk"
    - "digitalisering uitdaging"
    - "vergrijzing"
    - "kennis behouden"
    - "CSRD uitdaging"
  source_weight:
    "/blog": 1.0
    "/nieuws": 1.0
    "/inzichten": 1.0
  product_fit: any
  secondary_fit: assessment
  opener_hook: "Jullie artikel van [datum] over [thema] raakt precies waar wij aan werken"

- id: grote_klanten_logowall
  category: content
  priority: high
  human_name: "Klanten-logo-wall met grote retailers/OEM's"
  description: "High-stakes klanten stellen hoge eisen aan processen"
  matching_keywords:
    - "Albert Heijn"
    - "Jumbo"
    - "ASML"
    - "VDL"
    - "Shell"
    - "Philips"
    - "Heineken"
    - "Unilever"
    - "DSM"
    - "Rijkswaterstaat"
  source_weight:
    "/klanten": 1.0
    "/cases": 1.0
    "homepage_testimonials": 0.8
  product_fit: ops_dashboard
  secondary_fit: ai_assistant
  opener_hook: "Klanten als [klant1] en [klant2] stellen eisen die alleen met geautomatiseerde processen haalbaar zijn"
```

---

## 2. Priority-ranking & beslisregels

```yaml
priority_tiers:
  killer_signals:  # Als gedetecteerd, stop verder zoeken en stuur naar Scribe
    - dga_in_branchepers          # Hoogste respons-kans, altijd prioriteren
    - grote_klant_gewonnen        # Tijdelijk-actuele news-hook
    - overname_fusie              # Tijdelijk-actuele pain-hook
    - vacature_langdurig_open     # Combineer met sector-context

  high_priority:   # Primaire pitch-basis
    - vacature_data_analist
    - vacature_planner
    - vacature_ecommerce_manager
    - csrd_statement
    - erp_zichtbaar
    - bel_ons_voor_prijs
    - primitieve_chatbot
    - grote_klanten_logowall

  medium_priority: # Versterken, niet alleen voldoende
    - vacature_inside_sales
    - nieuwe_vestiging
    - award_erkenning
    - familiebedrijf_lange_historie
    - webshop_beperkt
    - service_desk_kantooruren
    - smart_industry_claim
    - blog_sector_pijn

routing_logic:
  - "Als ≥1 killer signal gedetecteerd → outreach direct"
  - "Als ≥2 high priority signalen → outreach met combinatie-hook"
  - "Als alleen medium signalen → outreach pas bij ≥3 gecombineerd"
  - "Als 0 signalen na volledige scan → prospect skip, markeer re_check_in_6_months"
```

---

## 3. Combinatie-regels (killer combos)

Sommige paren van signalen rechtvaardigen een sterkere opener en dual-product pitch:

```yaml
killer_combinations:
  - id: groei_plus_data
    signals: [nieuwe_vestiging, vacature_data_analist]
    hook: "Groei + datazicht tegelijk"
    pitch: ops_dashboard + sales_system
    example_opener: "Jullie nieuwe vestiging in {plaats} + de zoektocht naar een data-analist laten zien dat jullie groei en datazicht tegelijk aanpakken"

  - id: ambitie_plus_stack
    signals: [csrd_statement, erp_zichtbaar]
    hook: "ESG-rapportage bovenop legacy stack"
    pitch: ops_dashboard (ESG-module)
    example_opener: "Jullie CSRD-doelstelling richting {jaar} + draaien op {ERP}: precies de combinatie waar wij automatisering bovenop bouwen"

  - id: historie_plus_planning
    signals: [familiebedrijf_lange_historie, vacature_planner]
    hook: "Kennisbehoud + planning-modernisering"
    pitch: ai_assistant
    example_opener: "{generatie} generatie familiebedrijf + nieuwe werkvoorbereider zoeken — klassiek moment voor een AI-copilot die senior-kennis vasthoudt"

  - id: grote_klant_plus_beperkte_service
    signals: [grote_klanten_logowall, service_desk_kantooruren]
    hook: "High-stakes klanten + beperkte service-capaciteit"
    pitch: ai_assistant
    example_opener: "Met klanten als {klant} en nog service-desk op kantooruren loop je een risico dat 24/7-AI weg kan nemen"

  - id: ambitie_plus_oud
    signals: [smart_industry_claim, primitieve_chatbot]
    hook: "Ambitie hardgemaakt met concrete vervolgstap"
    pitch: assessment → ai_assistant
    example_opener: "Jullie Smart Industry-claim + de huidige chatbot die op FAQ blijft steken — ideaal moment om die belofte waar te maken"

anti_combinations:  # deze combo's werken NIET goed samen, vermijd
  - signals: [award_erkenning, familiebedrijf_lange_historie]
    reason: "Beide zijn 'context' signals zonder concrete pain — samen nog steeds geen pitch-haak"
  - signals: [blog_sector_pijn, smart_industry_claim]
    reason: "Beide zijn content-signalen, geen concrete actie-aanleiding"
```

---

## 4. False-positive safeguards

Analyst-LV verwerpt matches die voldoen aan:

```yaml
global_false_positives:
  - "Signaal gevonden in oude case study (bewijs van klantwerk, niet van eigen pijn)"
  - "Signaal gevonden in vacature die bij een dochteronderneming hoort (out-of-scope)"
  - "Signaal gevonden in persbericht van > 2 jaar oud (niet meer actueel)"
  - "Signaal gevonden op concurrenten-pagina (ze vermelden ander bedrijf)"
  - "Signaal in generieke disclaimer-tekst (geen substantie)"

confidence_minimums:
  - "Minimum confidence 0.6 om door te zetten naar Scribe"
  - "Bij confidence 0.6-0.8 → manual review flag (menselijk check voor send)"
  - "Bij confidence >0.8 → automated route toegestaan"
```

---

## 5. Output-formaat naar Scribe-LV

Per prospect levert Analyst-LV een JSON-blob:

```json
{
  "prospect_id": "tech-groothandel-amsterdam-001",
  "company_name": "Voorbeeld Technische Groothandel BV",
  "website": "voorbeeld.nl",
  "vertical": "groothandel",
  "scan_date": "2026-04-20",
  "signals_detected": [
    {
      "signal_id": "vacature_data_analist",
      "confidence": 0.92,
      "evidence_snippet": "Wij zoeken per direct een BI-specialist voor onze groeiende data-afdeling...",
      "source_url": "https://voorbeeld.nl/vacatures/bi-specialist",
      "detected_at": "2026-04-20T14:32:00Z",
      "product_fit_primary": "ops_dashboard",
      "product_fit_secondary": null,
      "opener_hook_template": "Jullie vacature voor BI-specialist laat zien dat jullie meer uit jullie data willen halen"
    },
    {
      "signal_id": "csrd_statement",
      "confidence": 0.78,
      "evidence_snippet": "Per 2027 willen wij CSRD-compliant rapporteren over scope 3...",
      "source_url": "https://voorbeeld.nl/duurzaamheid",
      "product_fit_primary": "ops_dashboard"
    }
  ],
  "combination_hooks_activated": [],
  "recommended_product": "ops_dashboard",
  "routing": "automated",
  "re_check_date": null
}
```

---

*Versie: 1.0 — 2026-04-20. Update: bij elke nieuwe signaal-type toevoegen in deze file + relatie-check in PRODUCTS.md signal→product matrix.*
