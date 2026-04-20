# Vertical: Transport & Logistiek

**Versie:** 1.0 — 2026-04-20
**Afnemers:** Scout (targeting), Analyst (signaal-filter), Scribe (taal en hooks)

---

## 1. ICP-filters (Scout-LV)

### Hard filters

```yaml
must_have:
  country: NL
  legal_entity_type: [BV, NV, coöperatie]
  employee_count: 50-250
  revenue_estimate_eur: 10_000_000 - 100_000_000
  sbi_codes:
    - "49.4*"   # Goederenvervoer over de weg (primair)
    - "52.*"    # Opslag en dienstverlening voor vervoer
    - "53.*"    # Post en koeriers (minder relevant, meestal groot)
    - "46.38"   # Gespecialiseerde groothandel met logistieke functie
  has_niwo_vergunning: true  # Eurovergunning of binnenlands
```

### Soft filters

```yaml
nice_to_have:
  has_own_warehouse_or_DC: true
  uses_tms: [Transpas, Carlo, Plan&Go, PTV, Simacan, 3G TMS]
  uses_on_board_computer: [Trimble, Transics, Webfleet, FleetGO, Volvo Dynafleet]
  tln_member: true
  evofenedex_member: true
  published_sustainability_statement: true
  publishes_csrd_preparation: true
```

### Exclude

```yaml
exclude:
  - bestaande_klant: true
  - only_freight_forwarding_no_assets: true  # geen eigen vloot = andere pijn
  - only_passenger_transport: true  # bus, taxi — out of scope
  - parcel_delivery_giant: true  # PostNL, DHL Parcel — eigen tech
  - internal_logistics_arm_of_retailer: true  # Albert Heijn-intern = geen ICP
  - part_of_multinational_with_central_IT: true
```

---

## 2. Primaire personas

### Persona 1: COO / Operationeel Directeur (primair)

```yaml
persona_id: transport_coo
title_variations:
  - "Directeur Operations"
  - "Operationeel Directeur"
  - "COO"
  - "Directeur Transport"
  - "Logistiek Directeur"
  - "Hoofd Planning"
demographics:
  age_estimate: 40-55
  typical_background: ["praktijk-doorgegroeid uit planning", "ingenieur logistiek", "vakman"]
pain_points:
  primary:
    - "Vrachtwagenheffing 1 juli 2026 — gemiddeld €0,19/km extra kosten"
    - "Chauffeurstekort structureel, traditioneel recruiting faalt"
    - "Planners overbelast, reactief werk (storingen, no-shows, uitval)"
    - "Beladingsgraad ondermaats, lege km te hoog"
  secondary:
    - "ZE-zones in 18 steden — vlootplanning wordt complexer"
    - "CSRD-data van topklanten gevraagd, nu handmatig"
    - "TMS-legacy + on-board-computers leveren data die niemand combineert"
    - "Brandstofverbruik varieert 10-15% tussen chauffeurs op zelfde rit"
language_do:
  - "cent per km, kilometerprijs, ritrendement"
  - "beladingsgraad, lege km, palletplaats, laadmeter"
  - "tachograaf, rij- en rusttijden, code 95, ADR"
  - "planner, charter, onderaannemer, dienstregeling"
  - "on-time delivery, OTIF, ritschema"
  - "fleet utilization, downtime, wagenpark"
language_dont:
  - "digitale transformatie, smart logistics" (overused)
  - "AI-transformatie in logistiek"
  - "green promise" (als buzz, niet actie)
  - "journey, reis, roadmap"
  - "mission control"
product_fit_ranking:
  1: ops_dashboard  # cent-per-km
  2: ai_assistant   # planner-assist + voice voor chauffeurs
  3: sales_system   # spot-pricing / verlader-acquisitie (minder vaak)
```

### Persona 2: DGA / Eigenaar (primair bij <€30M)

```yaml
persona_id: transport_dga
title_variations:
  - "Algemeen Directeur"
  - "DGA"
  - "Directeur-Eigenaar"
  - "CEO"
demographics:
  age_estimate: 50-65
  typical_background: ["familiebedrijf, 2e of 3e generatie", "praktijk-doorgegroeid"]
pain_points:
  primary:
    - "Marge 7% → risico 1,5% bij heffing (SRA-cijfer)"
    - "Bedrijf moet verkoopklaar blijven — overname-druk generatiewissel"
    - "Grote verladers eisen ESG-data die we moeten gaan leveren"
formality: "vaak 'u', blijft 'u' tot gesprek"
product_fit_ranking:
  1: assessment
  2: ops_dashboard
  3: partnership
```

### Persona 3: Hoofd Planning / Planner-Manager

```yaml
persona_id: transport_hoofd_planning
title_variations:
  - "Hoofd Planning"
  - "Planner-Manager"
  - "Operations Manager"
  - "Planning Manager"
demographics:
  age_estimate: 35-50
  typical_background: ["ex-planner", "praktijk-expert"]
pain_points_primary:
  - "Handmatig puzzelen met rit-combinaties en rij/rust-tijden"
  - "Spoedaanvragen breken elke dag het schema"
  - "Chauffeurs klagen dat beladingsgraad niet klopt"
product_fit_ranking:
  1: ai_assistant  # planner-copilot
  2: ops_dashboard
```

---

## 3. Sub-segmenten (priority-ranking)

```yaml
priority_order:
  1: "Pallet-distributie / LTL/groupage (€20-50M)"  # sweet spot
  2: "3PL (transport + warehouse)"  # integratiekans groot
  3: "Zware wagens / FTL lange afstand"
  4: "Koel/vries-transport"
  5: "Bulk (stukgoed, vloeibaar)"
  6: "Chemie / ADR-transport"  # compliance-heavy
  7: "Bouwlogistiek"  # Topsector-subsidie mogelijk
  8: "Containervervoer / intermodaal"

known_top_players:
  pallet_distributie: ["Vos Logistics", "Ewals", "Mainfreight Europe", "Simon Loos", "Van den Bosch"]
  large_3pl: ["Jan de Rijk", "Broekman", "DSV NL"]
  parcel_giants: ["PostNL", "DHL Parcel", "DPD"]  # exclude — te groot
```

---

## 4. Sector-taal (do/don't)

**WEL gebruiken:**
- *cent per km, kilometerprijs, ritrendement*
- *beladingsgraad, lege km, palletplaats, laadmeter*
- *tachograaf, rij- en rusttijden, code 95, ADR, CMR*
- *laad-losvenster, tijdvenster, wachttijden*
- *planner, charter, onderaannemer, rittenschema*
- *NIWO-vergunning, Eurovergunning*
- *OTIF, on-time delivery, no-show*
- *fleet utilization, downtime-uren, wagenpark-beschikbaarheid*

**NIET gebruiken:**
- *digitale transformatie, smart logistics, mission control*
- *transformational value*
- *green promise* (als buzz)
- *frictionless, seamless delivery*
- *journey* / *delivery journey*

---

## 5. Enrichment-bronnen voor Scout-LV

```yaml
data_sources:
  primary:
    - KVK (SBI 49.4, 52)
    - LinkedIn (Sales Navigator, industry "Transportation/Trucking/Railroad")
    - Company website

  secondary:
    - TLN ledenlijst (tln.nl)
    - Evofenedex ledenlijst (evofenedex.nl)
    - STL (Sectorinstituut Transport en Logistiek)
    - NIWO vergunningshouders (openbaar register)
    - Transport-online.nl bedrijven-pagina

  tertiary_for_signals:
    - Nieuwsblad Transport (nt.nl)
    - Transport Online (transport-online.nl)
    - Weekbladtransport
    - Logistiek.nl
    - BPnieuws.nl (branchebladen)
    - Flows.be (NL/BE transport-nieuws)

  compliance_alerts:
    - Vrachtwagenheffing.nl (status heffingsvoorbereiding)
    - Milieuzones.nl (ZE-zone updates)
    - ILT-handhavings-rapporten

  industry_conferences:
    - TLN Jaarcongres
    - Evofenedex Congres
    - Intertraffic (RAI Amsterdam)
```

---

## 6. Outreach-prioriteit voor Scout

```yaml
high_priority_criteria:
  - omzet 20-50M
  - eigen vloot >80 vrachtwagens (indicator van schaal)
  - >3 signalen gedetecteerd
  - sub-segment in priority 1-3
  - recente CSRD-pagina of vacature-planner
  - geen externe AI-partner al actief

medium_priority:
  - omzet 10-20M of 50-100M
  - vloot 30-80 voertuigen
  - 1-2 signalen
  - sub-segment 4-5

defer:
  - sub-segment 6-8 (nichebonder)
  - <30 voertuigen (te klein voor retainer-prijzen)
  - onderdeel van multinational met centraal IT
```

---

## 7. Speciale overweging: vrachtwagenheffing als universele hook

De vrachtwagenheffing per 1 juli 2026 is een **universele urgency-trigger** voor NL-transport. Elke transport-prospect kent dit als komend probleem, maar velen hebben nog geen antwoord geformuleerd. Scribe-LV mag dit **in 40-60% van transport-mails** als hook gebruiken, specifiek:

```yaml
hook_usage:
  when_to_use:
    - prospect heeft CSRD-statement maar nog geen concrete kostenplan
    - prospect geen ZE-vloot (Euro-6 dominant)
    - prospect publicereert geen standpunt over heffing
  when_NOT_to_use:
    - prospect al volledig ZE-vloot (veel lager heffingstarief)
    - prospect is 3PL zonder eigen assets
    - prospect publiceert actief antwoord op heffing (bespreek hun antwoord)

hook_template: "Vrachtwagenheffing op 1 juli = gemiddeld €0,19/km extra. Voor jullie vloot betekent dat [geschat bedrag] per jaar — tenzij AI-optimalisatie een groot deel compenseert."
```

---

*Versie: 1.0 — 2026-04-20.*
