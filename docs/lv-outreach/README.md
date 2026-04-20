# Leadvelocity Outreach — Agent Briefing

Deze folder is de **single source of truth** voor de drie outreach-agents: Scribe-LV (schrijft openers + bodies), Analyst-LV (detecteert intent-signalen), en Scout-LV (vindt + kwalificeert accounts).

Elk bestand is gestructureerd om door een AI-agent gelezen te worden — met tabellen, YAML-blokken en lijsten in plaats van proza — zodat de agent deterministisch kan handelen.

## Bestandsindex

| Bestand | Primaire agent-afnemer | Wat |
|---|---|---|
| [`BRAND.md`](./BRAND.md) | Scribe | Voice, forbidden phrases, u/je-regels, sentence-length rules |
| [`PRODUCTS.md`](./PRODUCTS.md) | Scribe + Analyst | 4 producten + retainer-paraplu, signal→product matrix |
| [`INTENT-SIGNALS.md`](./INTENT-SIGNALS.md) | Analyst | 20 signaal-types met YAML-definities, priority, combinatie-regels |
| [`SENDERS.md`](./SENDERS.md) | Scribe | Welke domein voor welke vertical, signatures, compliance |
| [`PROOF.md`](./PROOF.md) | Scribe | Goedgekeurde benchmarks + scenario-cases |
| [`verticals/groothandel.md`](./verticals/groothandel.md) | Alle 3 | ICP-filters, personas, jargon, enrichment-bronnen |
| [`verticals/maakindustrie.md`](./verticals/maakindustrie.md) | Alle 3 | Idem |
| [`verticals/transport.md`](./verticals/transport.md) | Alle 3 | Idem |

## Relatie tot andere docs

- [`../outreach/`](../outreach/) bevat de **human-readable** playbooks (sequences, targeting, intent-signalen met voorbeelden). Deze folder is de **agent-readable** versie van dezelfde kennis.
- [`../strategy/2026-04-20-leadvelocity-masterplan.md`](../strategy/2026-04-20-leadvelocity-masterplan.md) is de strategische backbone — niet voor agent-consumptie, wel voor human context.
- [`../../CLAUDE.md`](../../CLAUDE.md) is de overall project-context — elke Claude-sessie in deze repo leest dat automatisch.

## Regels bij bijwerken

1. **Agent-contract is stabiel.** YAML-sleutels in INTENT-SIGNALS.md en PRODUCTS.md niet zomaar hernoemen — breekt agent-logica.
2. **TODO-velden markeren.** Informatie die nog ontbreekt (domeinen, handtekeningen, echte voorbeelden van Bart's schrijven) staat als `TODO: ...` — laat zo tot het ingevuld is.
3. **Versie in frontmatter.** Elk bestand opent met `**Versie:** X.Y — YYYY-MM-DD` zodat agents weten of hun cache stale is.
4. **Nieuwe signal-types altijd in INTENT-SIGNALS.md, niet ergens anders.** Eén bron van waarheid per onderwerp.

## Prioriteit bij v1-build

**Must-have (minimaal voor agent-build v1):**
- PRODUCTS.md + signal→product-matrix
- INTENT-SIGNALS.md volledig
- BRAND.md voice-sectie
- SENDERS.md (minimaal welk domein voor welke vertical)

**Nice-to-have v1.5:**
- PROOF.md uitgebreid met meer scenario-cases
- Per-vertical extra jargon-do/don't
- Voorbeelden van echte Bart-mails zodra die beschikbaar zijn (voice-fingerprint)

---

*Versie: 1.0 — 2026-04-20*
