# Vertical: Maakindustrie

**Versie:** 1.0 — 2026-04-20
**Afnemers:** Scout (targeting), Analyst (signaal-filter), Scribe (taal en hooks)

---

## 1. ICP-filters (Scout-LV)

### Hard filters

```yaml
must_have:
  country: NL
  legal_entity_type: [BV, NV]
  employee_count: 50-250
  revenue_estimate_eur: 10_000_000 - 100_000_000
  sbi_codes:
    - "25.*"   # Vervaardiging producten van metaal
    - "26.*"   # Vervaardiging computers, elektronische en optische producten
    - "27.*"   # Vervaardiging elektrische apparatuur
    - "28.*"   # Vervaardiging machines en apparaten (primair focus)
    - "29.*"   # Vervaardiging auto's, aanhangwagens, opleggers (toelevering)
    - "30.*"   # Vervaardiging overige transportmiddelen
    - "31.*"   # Vervaardiging meubels
    - "32.*"   # Overige industrie
    - "22.*"   # Vervaardiging producten van rubber en kunststof
```

### Soft filters

```yaml
nice_to_have:
  has_own_productie_facility: true
  uses_erp: [Isah, Ridder, Exact, Navision, SAP, Microsoft Dynamics]
  has_mes: true
  iso_certified: [ISO 9001, ISO 14001, ISO 27001, IATF 16949]
  part_of_smart_industry_or_brainport: true
  publishes_sustainability_report: true
  active_on_linkedin: true
```

### Exclude

```yaml
exclude:
  - bestaande_klant: true
  - only_trade_no_manufacturing: true
  - industrial_giant_with_own_AI_team: true  # VDL, Philips, ASML = too corporate
  - only_contract_manufacturing_without_design: true  # minder beslismacht eigen IT
  - part_of_multinational_with_central_IT: true
```

---

## 2. Primaire personas

### Persona 1: COO / Operationeel Directeur (primair)

```yaml
persona_id: maakindustrie_coo
title_variations:
  - "COO"
  - "Operationeel Directeur"
  - "Directeur Operations"
  - "Directeur Productie"
  - "Plant Manager"
  - "Production Director"
  - "Manager Productie & Logistiek"
demographics:
  age_estimate: 40-55
  typical_background: ["werktuigbouwkundig ingenieur", "procesmanager", "doorgegroeide werkvoorbereider"]
pain_points:
  primary:
    - "OEE-gap tussen huidige performance (~60%) en wereldklasse (85%+)"
    - "Ongeplande stilstand op kritieke assets — reactief onderhoud"
    - "Productieplanning kost veel tijd werkvoorbereiders, fragiel bij spoedorders"
    - "Kennis verdwijnt: senior operators met pensioen zonder opvolger"
  secondary:
    - "Nacalculatie-gap vs voorcalculatie blijft onzichtbaar tot kwartaaleind"
    - "MES/ERP-gefragmenteerd, shop-floor-data los van boekhouding"
    - "Energiekosten stijgen, CSRD vraagt scope-1 data"
    - "Quality control handmatig, missen van defecten leidt tot klachten"
language_do:
  - "OEE, stilstand, omsteltijd, doorlooptijd, uitval%, orderintake"
  - "capaciteitsbezetting, mantijd, nachtcalculatie, werkvoorbereiding"
  - "first-pass yield, scrap rate, OTIF"
  - "MES, ERP, shop-floor"
language_dont:
  - "digitale transformatie, industrie 4.0" (overused-eye-roll)
  - "smart factory" (hype-associatie)
  - "journey", "holistische aanpak"
  - "predictive maintenance" (te technisch in eerste zin — zeg "storingen voorspellen")
product_fit_ranking:
  1: ops_dashboard
  2: ai_assistant  # shop-floor copilot
  3: assessment
```

### Persona 2: DGA / Eigenaar (primair bij <€30M)

```yaml
persona_id: maakindustrie_dga
title_variations:
  - "Algemeen Directeur"
  - "DGA"
  - "Eigenaar"
  - "CEO"
demographics:
  age_estimate: 50-65
  typical_background: ["familiebedrijf-opvolger", "ingenieur-entrepreneur"]
pain_points:
  primary:
    - "Marge onder druk bij klant-volatiliteit"
    - "Personeelstekort structureel, kunnen niet groeien zonder mensen"
    - "Opvolging onzeker, kennis zit in hoofden"
  secondary:
    - "Grote OEM-klanten eisen certificeringen + rapportage"
    - "Wil bedrijf verkoopbaar maken of doorgeven aan volgende generatie"
formality: "vaker 'u' (ouder, formeler sector)"
product_fit_ranking:
  1: assessment
  2: ai_assistant  # kennisbehoud
  3: partnership
```

### Persona 3: Plant Manager / Production Director (operationele gatekeeper)

```yaml
persona_id: maakindustrie_plant_manager
title_variations:
  - "Plant Manager"
  - "Production Director"
  - "Directeur Productie"
  - "Manager Werkvoorbereiding"
demographics:
  age_estimate: 35-50
pain_points_primary:
  - "Werkvoorbereiders overbelast, planning is puzzel elke dag"
  - "Kwaliteit kost tijd en is reactief"
  - "Energiekosten stijgen zichtbaar per lijn"
product_fit_ranking:
  1: ops_dashboard
  2: ai_assistant
```

---

## 3. Sub-segmenten (priority-ranking)

```yaml
priority_order:
  1: "Metaalbewerking / machinebouw (€10-50M)"  # sweet spot
  2: "Precisiemechatronica / semiconductor-toeleveranciers"
  3: "Voedingsmiddelen-machinebouw"
  4: "Kunststofverwerking / injection molding"
  5: "Elektrotechniek / paneelbouw"
  6: "Automotive-toelevering (2e/3e tier)"
  7: "Meubel- en houtbewerking"
  8: "Overige specialty manufacturing"

known_ecosystems:
  brainport_cluster: ["ASML-toelevering", "NXP-suppliers", "Prodrive-ecosystem"]
  smart_industry: "www.smartindustry.nl — ledenlijst"
  topsector_hightech: "www.hollandhightech.nl"
  fme_cluster: "www.fme.nl — ondernemersvereniging techniek"
  koninklijke_metaalunie: "www.metaalunie.nl — MKB-metaal"
```

---

## 4. Sector-taal (do/don't)

**WEL gebruiken:**
- *OEE, stilstand, omsteltijd, doorlooptijd, uitval%, orderintake*
- *capaciteitsbezetting, nachtcalculatie, MES, werkvoorbereiding, mantijd*
- *first-pass yield, scrap rate, OTIF, MTBF, MTTR*
- *shop-floor, cel-layout, machine-bezetting*
- *werkbonnen, seriegrootte, batchgewijs, enkelstuks*

**NIET gebruiken:**
- *digitale transformatie, industrie 4.0* (unless user zelf gebruikt)
- *smart factory* (marketing-term, niet realiteit)
- *unlocking operational excellence*
- *best-in-class, world-class* (claim niet, bewijs)
- *game-changer, revolutionair*

---

## 5. Enrichment-bronnen voor Scout-LV

```yaml
data_sources:
  primary:
    - KVK (SBI 25-32)
    - LinkedIn (Sales Navigator met industry filter "Manufacturing")
    - Company website

  secondary:
    - FME ledenlijst (fme.nl)
    - Koninklijke Metaalunie ledenlijst (metaalunie.nl)
    - Smart Industry ledenlijst
    - Brainport Eindhoven company directory
    - Holland High Tech Topsector

  tertiary_for_signals:
    - Link Magazine (linkmagazine.nl)
    - Made in Europe (made-in-europe.nl)
    - Aandrijftechniek (aandrijftechniek.nl)
    - Metaal & Techniek / Metaal Nieuws
    - Werktuigbouw.nl

  industry_conferences:
    - TechniShow (RAI Amsterdam, 1x per 2 jaar)
    - Metavak (Hardenberg)
    - FME jaarcongres
    - Smart Industry Conferentie
```

---

## 6. Outreach-prioriteit voor Scout

```yaml
high_priority_criteria:
  - omzet 20-50M
  - >3 signalen gedetecteerd
  - sub-segment in priority 1-3
  - recente vacature werkvoorbereider of data-analist
  - CSRD-statement op site

medium_priority:
  - omzet 10-20M of 50-100M
  - 1-2 signalen
  - sub-segment 4-5

defer:
  - sub-segment 6-8
  - deel van Brainport/ASML-ecosystem met eigen centraal IT
```

---

*Versie: 1.0 — 2026-04-20.*
