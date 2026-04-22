# Scripts

## enrich-prospects

Verrijkt een Apollo-prospect-CSV met sub-niche-classificatie, ICP-fit-score (1-5), intent-signaal en twee gepersonaliseerde opener-opties per contact. Gebaseerd op de scrape-to-opening-recipe uit [`docs/outreach/playbook.md`](../docs/outreach/playbook.md) en de 8 signaal-types uit [`docs/outreach/intent-signals.md`](../docs/outreach/intent-signals.md).

### Wat het doet

Voor elke rij:

1. Fetcht homepage + tot 2 about-pagina's (`/over-ons`, `/about`, etc.)
2. Extract tekst (strip HTML, dedup whitespace, max 8k chars)
3. Claude Haiku classificeert sub-niche + icp_fit (1-5) + detecteert 1 signaal
4. Claude Sonnet genereert 2 opener-opties volgens de 3-delige formule
5. Schrijft rij direct weg naar output-CSV (append, resumeable)

Kosten per batch van 130 prospects: ~€2-3 aan Claude-API. Duurt ~15 min wallclock.

### Setup (eenmalig)

```bash
# 1. Installeer dependencies (als nog niet gedaan)
npm install

# 2. Voeg Anthropic API-key toe aan .env.local
#    (.env.local staat in .gitignore — secrets blijven lokaal)
echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env.local
```

Haal je key op: [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

### Gebruik

```bash
# 1. Zet je Apollo-export op data/prospects/input.csv
#    (elke kolom uit de Apollo-export werkt; script leest "Email", "Company Name for Emails",
#     "Website", "Title", "Industry", "First Name" automatisch)

# 2. Draai het script
npm run enrich

# Optioneel:
npm run enrich -- --input=data/prospects/batch1.csv --output=data/prospects/batch1-done.csv
npm run enrich -- --limit=5        # alleen eerste 5 rijen (voor test)
```

Output komt op `data/prospects/output.csv`. Import die in Instantly / Smartlead / Apollo-sequence.

### Output-kolommen (toegevoegd aan input)

| Kolom | Inhoud |
|---|---|
| `sub_niche` | `staalhandel`, `elektrotechniek-groothandel`, `food-wholesale`, etc. |
| `icp_fit` | 1-5 (5 = core ICP: technische groothandel / maak / transport) |
| `fit_rationale` | 1 zin toelichting |
| `signal_type` | `growth`, `hiring`, `product_launch`, `linkedin_post`, `press`, `csrd`, `tech_stack`, `family_business`, of `none` |
| `signal_detail` | concrete observatie (leeg als `none`) |
| `signal_source_url` | waar gevonden (leeg als `none`) |
| `opener_a` | optie A — signal-based indien signaal, anders sub-niche-specifiek |
| `opener_b` | optie B — andere angle |
| `scrape_status` | `ok`, `website_unreachable`, `no_useful_content`, of `llm_error` |
| `enriched_at` | ISO-timestamp |

### Resume

Als `output.csv` al bestaat, leest het script bestaande e-mailadressen in en slaat die over. Je kan dus veilig onderbreken met Ctrl+C en opnieuw draaien.

### Workflow-aanbeveling

1. **Filter in output-CSV** op `icp_fit >= 3` (of `4` voor hele scherpe lijst)
2. **Review** de openers in Numbers/Excel — lees 10-20 hardop, check op tone-of-voice-regels uit [`CLAUDE.md` sectie 6](../CLAUDE.md)
3. **Kies per rij** A of B, plak in Instantly/Smartlead als `{{opener}}`-variabele
4. **Sequence** volgens [`docs/outreach/sequence-groothandel.md`](../docs/outreach/sequence-groothandel.md)

### Grenzen

- Scrape werkt alleen op statische sites. JS-rendered sites (SPA's) leveren mogelijk weinig content — zichtbaar als `scrape_status=no_useful_content`. Script rapporteert het, je kan die handmatig doen.
- LinkedIn activiteit wordt niet gescrapet (vereist proxy/Puppeteer, niet in scope)
- Geen Google-news check (later, via SerpAPI)
- Script past nog geen strict ICP-filter toe — alle rijen worden verwerkt en krijgen een `icp_fit`-score. Filter zelf in de output
