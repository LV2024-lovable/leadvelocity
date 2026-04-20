# Vertical: Technische Groothandel

**Versie:** 1.0 — 2026-04-20
**Afnemers:** Scout (targeting), Analyst (signaal-filter), Scribe (taal en hooks)

---

## 1. ICP-filters (Scout-LV)

### Hard filters (moet matchen — anders skip)

```yaml
must_have:
  country: NL
  legal_entity_type: [BV, NV, coöperatie]
  employee_count: 50-250
  revenue_estimate_eur: 10_000_000 - 100_000_000
  sbi_codes:
    - "46.1*"  # Handelsbemiddeling
    - "46.4*"  # Groothandel in consumentengoederen
    - "46.5*"  # Groothandel in ICT-apparatuur
    - "46.6*"  # Groothandel in machines en apparaten (primair focus)
    - "46.7*"  # Gespecialiseerde groothandel
  specific_focus_subcategories:
    - "46.69 Groothandel in machines en apparaten voor industrie en handel"
    - "46.52 Groothandel in elektronische en telecommunicatieapparatuur"
    - "46.74 Groothandel in gereedschap"
    - "46.71 Groothandel in brandstoffen"  # secundair
    - "46.73 Groothandel in bouwmaterialen"  # secundair, HVAC/installatie
```

### Soft filters (boost-signals — scoren, niet verwerpen)

```yaml
nice_to_have:
  has_b2b_webshop: true
  uses_erp: [AFAS, Exact, Isah, Ridder, SAP, Navision]
  has_company_linkedin: true
  directors_on_linkedin: true
  multiple_locations: true
  recent_press_coverage: true
```

### Exclude (harde afwijzing)

```yaml
exclude:
  - bestaande_klant: true
  - concurrent_ai_agency_already_engaged: true  # zoek op "powered by [ander agency]" op site
  - groep_omzet > 200_000_000  # te corporate, onze ICP-sweetspot is <100M
  - part_of_multinational_with_central_IT: true  # lokale beslissingsmacht is laag
  - only_b2c_retailer: true  # wij zijn B2B-groothandel-focus
  - uitsluitend_tussenhandel_zonder_voorraad: true  # dan geen voorraad-optimalisatie-pijn
```

---

## 2. Primaire personas

### Persona 1: CRO / Commercieel Directeur (primair)

```yaml
persona_id: groothandel_cro
title_variations:
  - "Commercieel Directeur"
  - "Chief Revenue Officer"
  - "Commercieel Manager"
  - "Director Sales"
  - "Sales Director"
  - "Manager Sales & Marketing"
demographics:
  age_estimate: 35-50
  tenure_years: 3-10
  typical_background: ["commercieel uit sector", "Account Manager promotie", "extern van concurrent"]
pain_points:
  primary:
    - "Pipeline valt tegen, onvoldoende predictability"
    - "SDR's zijn duur, niet schaalbaar"
    - "Offertes naar klanten duren 3-5 dagen, concurrent doet 24u"
    - "Accountmanagers besteden veel tijd aan koude acquisitie"
  secondary:
    - "Amazon Business pakt laagdrempelige B2B-klanten"
    - "Grote klanten eisen digitale portalen + real-time voorraad"
    - "Marge onder druk door online-transparantie van prijzen"
language_do:
  - "meer leads, hogere conversie, lager CAC"
  - "pipeline, hit rate, white-space, cross-sell"
  - "salesforce efficiency, ramp-up, quota"
language_dont:
  - "digitale transformatie" (instant eye-roll)
  - "sales enablement-journey"
  - "full-funnel optimization"
product_fit_ranking:
  1: sales_system
  2: ops_dashboard  # marge-inzicht
  3: assessment
```

### Persona 2: COO / Operationeel Directeur (primair)

```yaml
persona_id: groothandel_coo
title_variations:
  - "COO"
  - "Operationeel Directeur"
  - "Directeur Operations"
  - "Directeur Logistiek"
  - "Manager Supply Chain"
  - "Head of Operations"
demographics:
  age_estimate: 40-55
  typical_background: ["techniek-/bedrijfskunde", "doorgegroeide logistiek-manager", "magazijn-expert"]
pain_points:
  primary:
    - "Data verspreid over ERP, webshop, Excel, CRM"
    - "Voorraad niet onder controle: dead stock + nee-verkoop tegelijk"
    - "Binnendienst verliest tijd aan handmatige RFQ's en orderinvoer"
    - "Inkoop op gut feel, OTIF-score gemiddeld"
  secondary:
    - "Pricing in Excel, margelek bij elke onderhandeling"
    - "DSO te hoog, werkkapitaal vastgezet"
    - "CSRD-rapportage-druk vanuit topklanten"
language_do:
  - "marge, omloopsnelheid, DSO, OTIF, staffels, voorraadpositie, SKU's"
  - "runners, dead stock, nee-verkoop, quote hit rate"
  - "binnendienst, buitendienst, afnemers"
language_dont:
  - "digitale transformatie", "synergie", "holistisch"
  - "journey", "transformational"
product_fit_ranking:
  1: ops_dashboard
  2: ai_assistant  # binnendienst ontlasting
  3: sales_system
```

### Persona 3: DGA / Eigenaar (secundair — eindbeslisser)

```yaml
persona_id: groothandel_dga
title_variations:
  - "Directeur-Eigenaar"
  - "DGA"
  - "Eigenaar"
  - "Algemeen Directeur"
  - "CEO"
demographics:
  age_estimate: 50-65
  tenure_years: 15+
  typical_background: ["familiebedrijf-opvolger", "oprichter", "management-buyout"]
pain_points:
  primary:
    - "EBITDA-marge onder druk, maar onzeker waar te beginnen"
    - "Wil bedrijf over 5-10 jaar verkopen — moet verkoopbaar zijn"
    - "Senior-medewerkers gaan met pensioen, kennis erodeert"
language_do:
  - "EBITDA-hefboom, verkoopwaarde, multiplier, familiebedrijf"
  - "vakmanschap, generatie, continuïteit"
formality: "vaker 'u' dan 'je' (ook al is hij 55+)"
product_fit_ranking:
  1: assessment  # pragmatische entry
  2: partnership  # doorlopende relatie past bij DGA-stijl
  3: ai_assistant
```

---

## 3. Sub-segmenten binnen technische groothandel (priority-ranking)

```yaml
priority_order:
  1: "HVAC / installatie-groothandel"  # energietransitie + technische complexiteit
  2: "Mechanische aandrijftechniek / motoren"  # hoge marges, technische consultatie
  3: "Industrial fasteners / MRO / industriële benodigdheden"  # long-tail-chaos, duidelijke pijn
  4: "Elektrotechnische groothandel"  # volume, digital-matuur maar competitief
  5: "Werkplaats / tools / werktuigen"  # mid-range aantrekkelijk
  6: "Industriële automation / PLC / sensoren"  # digital-native klanten
  7: "PPE / veiligheid / werkkleding"  # compliance-driven
  8: "Industrial chemicals / smeermiddelen"  # herhaalvoorraad, SKU-variatie

known_top_players_by_segment:
  hvac_installatie: ["Wasco (Rexel)", "Nathan", "Itho Daalderop-dealers", "Sanisale"]
  mechanische_aandrijftechniek: ["ERIKS", "Motion (voorheen Kramp)", "SKF-distributeurs"]
  industrial_fasteners: ["ERIKS", "Fabory", "Würth NL", "Bossard"]
  elektrotechnische: ["Rexel", "Sonepar", "Technische Unie"]
  werktuigen_tools: ["Wiltec", "Toolstation NL", "Conrad Electronic"]
```

**Regel:** begin outreach met segmenten 1-3 (hoogste pijn, minste competitie). Segmenten 6-8 parkeren voor later.

---

## 4. Sector-taal (do/don't samenvatting)

**WEL gebruiken:**
- *marge, brutomarge, EBIT-marge*
- *omloopsnelheid, voorraadpositie, dead stock, runners*
- *DSO, werkkapitaal, cash conversion*
- *inkoopvoorwaarden, staffels, kortingsmatrix*
- *OTIF, line fill rate*
- *SKU's, artikelen*
- *binnendienst, buitendienst, afnemers*
- *quote hit rate, offerte-conversie, pipeline*
- *klantenbestand, accountportfolio*

**NIET gebruiken:**
- *digitale transformatie, transformational journey*
- *synergie, holistisch*
- *ecosystem, platform-as-a-service*
- *unlocking value, unleash potential*
- *users, consumers* (wel: *afnemers, klanten*)

---

## 5. Enrichment-bronnen voor Scout-LV

```yaml
data_sources:
  primary:
    - KVK (company info, SBI-codes, FTE-schatting)
    - LinkedIn (company page + Sales Navigator voor decision-makers)
    - Company website scrape (homepage + /about + /vacatures + /nieuws)

  secondary:
    - Apollo.io (contact-gegevens, job titles)
    - Clay.com (AI-augmented enrichment + intent)
    - Crunchbase (financiering als beschikbaar)
    - NVG (Nederlands Verbond van de Groothandel) — ledenlijst indien openbaar
    - WTG (Werkgevers Technische Groothandel) — wtg.nl

  tertiary_for_news_signals:
    - linkmagazine.nl
    - ictmagazine.nl
    - emerce.nl (voor e-commerce signalen)
    - google news + filter on site:

  industry_conferences:
    - WTG congres "AI in de Technische Groothandel" (nov 2025)
    - Technische Groothandel Dag
```

---

## 6. Outreach-prioriteit voor Scout

```yaml
high_priority_account_criteria:
  - omzet 20-50M (sweet spot voor onze retainer-prijzen)
  - >3 signalen gedetecteerd in eerste scan
  - directie/COO heeft recent branche-pers of LinkedIn-post
  - sub-segment in priority 1-3

medium_priority:
  - omzet 10-20M of 50-100M
  - 1-2 signalen gedetecteerd
  - sub-segment 4-5

defer_to_later:
  - 0 signalen na grondige scan
  - sub-segment 6-8
  - omzet < 10M of > 100M
```

---

*Versie: 1.0 — 2026-04-20.*
