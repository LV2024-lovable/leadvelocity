# Leadvelocity — Huisstijl & Visual Identity

**Doel:** Een AI-agent (Claude Dispatch / co-work) of designer kan met dit document slide-decks, social posts, brochures, mockups maken die direct herkenbaar zijn als Leadvelocity, zonder te hoeven gokken.

**Bron-bestanden:** `public/brand/` (SVG + PNG logo's). Tailwind-config: `tailwind.config.ts`.

---

## 1. Brand-essence (de gevoelsregel)

> Donker, scherp, technisch. Lime accent als signaal-kleur — gebruikt waar iets *belangrijk* is. Geen pluche, geen gradients, geen stock-photos.

Als een ontwerp er ook na 1 maand nog "onverstoord" uitziet en niet schreeuwt om aandacht: dan klopt het.

---

## 2. Kleuren

### Primaire palet

| Token | Hex | Gebruik |
|---|---|---|
| `lv-ink` | `#09090B` | Primaire achtergrond (dark mode) |
| `lv-text` | `#FAFAF9` | Primaire tekst op donker |
| `lv-accent` | `#C8FF00` | **Lime — primaire accent** (CTA's, highlights, dot-indicators) |

### Secundaire palet

| Token | Hex | Gebruik |
|---|---|---|
| `lv-text-muted` | `#A1A1AA` | Body-tekst secundair |
| `lv-text-subtle` | `#71717A` | Captions, meta, labels |
| `lv-surface` | `#18181B` | Kaarten, panels |
| `lv-surface-raised` | `#27272A` | Hover-states, geneste panels |
| `lv-border` | `#27272A` | Standaard border |
| `lv-border-subtle` | `#1F1F23` | Subtiele divider |
| `lv-accent-darker` | `#6A9000` | Lime op lichte achtergrond (slecht contrast met wit anders) |

### Kleur-regels

- **Lime is een signaal-kleur, geen decoratie.** Gebruik 'm op CTA-knoppen, headlines die accent vragen, dot-indicators (●), grote cijfers, focus-states.
- **Ratio:** maximaal ~5-10% van de oppervlakte is lime. Rest is donker.
- **Combineer NOOIT:** lime op rood, lime op blauw, lime op een gradient.
- **Op licht?** Gebruik `lv-accent-darker` (#6A9000). Pure lime op wit is nauwelijks leesbaar.

---

## 3. Typografie

### Fonts

| Use | Font | Weight |
|---|---|---|
| Display / headlines | **Geist** | 600 of 700 — **NOOIT 800** |
| Body / lopende tekst | **Manrope** | 400-500 |
| UI / labels | Manrope | 500-600 |

Beide via Google Fonts. In code: `font-display` (Geist) + `font-body` (Manrope) — al geconfigureerd in Tailwind.

### Schaal

| Element | Tailwind | Pixel |
|---|---|---|
| H1 (hero) | `text-5xl md:text-6xl lg:text-7xl` | 48-72 |
| H2 (sectie) | `text-3xl md:text-4xl lg:text-5xl` | 30-48 |
| H3 (kaart) | `text-xl md:text-2xl` | 20-24 |
| Body | `text-base md:text-lg` | 16-18 |
| Caption | `text-sm` | 14 |
| Label/eyebrow | `text-xs uppercase tracking-widest` | 12 |

### Typografie-regels

- **Headlines kort.** Max 3 regels op hero, max 2 elders.
- **Tracking voor labels:** `tracking-widest` op uppercase eyebrow-labels.
- **Lead-paragraaf** (eerste alinea na headline) iets groter (`text-lg md:text-xl`).
- **Letter-spacing op headlines:** `tracking-tight` op grote display.

---

## 4. Logo

### Bestanden in `public/brand/`

| Bestand | Wanneer |
|---|---|
| `leadvelocity-wordmark-light.svg` / `.png` | Op donkere achtergrond (default) |
| `leadvelocity-wordmark-dark.svg` / `.png` | Op lichte achtergrond |
| `leadvelocity-monogram.svg` / `.png` | Vierkant — favicon, social avatar, app-icoon |

### Wordmark-anatomie

```
●  leadvelocity
│  └── "lead" cream + "velocity" lime (op donker)
│       "lead" donker + "velocity" lime-darker (op licht)
└── Bullet-dot in accent-kleur
```

- **Altijd lowercase**: `leadvelocity` (niet `LeadVelocity` of `Leadvelocity`)
- **Bullet-dot is integraal** — niet weglaten
- **Tussen `lead` en `velocity` geen spatie**

### Logo-regels

- **Minimaal 24px hoog** voor wordmark, anders illegibel
- **Padding:** minimaal 1× hoogte van bullet-dot rondom als "ademruimte"
- **Niet kantelen, niet stretchen, geen drop-shadow, geen outline**
- **Geen achtergrond-vorm achter het logo** (behalve het monogram-square dat al inbuild is)

---

## 5. Visuele taal

### Achtergrond-elementen

- **`grain`-class:** subtiele filmkorrel-overlay (CSS-variant). Op grote secties.
- **`dot-pattern`-class:** punt-grid met 20% opacity. Onder hero's en grote secties.
- **Radial accent-glow:** centered radial gradient `bg-lv-accent/[0.04]` — subtiele aura voor sectie-anchors.

### Componenten-stijl

- **Kaarten:** `rounded-2xl bg-lv-surface border border-lv-border-subtle`
- **Primaire CTA:** `bg-lv-accent text-lv-ink rounded-lg` + hover-glow `shadow-[0_0_30px_rgba(200,255,0,0.3)]`
- **Secundaire CTA:** `border border-lv-border text-lv-text` + hover-border-state
- **Label-pills:** `px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-accent/[0.05]`
- **Eyebrow-labels** (sectie-headers): `font-body text-xs font-600 text-lv-accent uppercase tracking-widest` met dunne accent-streep ervoor (`h-px w-12 bg-lv-accent`)

### Wat NOOIT te doen

- ❌ Stock-photos van handen-schuddende-mensen of laptops-met-grafieken
- ❌ Gradients (behalve de subtiele radial-glow)
- ❌ Drop-shadows op alles (behalve accent-knoppen)
- ❌ Emoji's in product-copy of slide-decks
- ❌ Multi-color icoon-sets — gebruik [Lucide](https://lucide.dev) icons in single-color (lv-accent of lv-text-muted)
- ❌ Rounded-corners op blokken die geen container zijn
- ❌ Border-radius > `rounded-2xl` — voelt "kindachtig"

---

## 6. Slide-decks — concrete guidelines

### Format
- **Aspect:** 16:9 (1920×1080)
- **Achtergrond:** `lv-ink` (#09090B) als default — alle slides
- **Marges:** 80-120px aan iedere kant; titel-blok bovenin met 80-120px van top
- **Footer:** klein "● leadvelocity" wordmark links onder + slide-nummer rechts onder, allebei in `lv-text-subtle`

### Slide-types

#### A. Title-slide (cover)
```
[grote 100-200px lege ruimte boven]

●  leadvelocity                              EDITIE/V1.0 (in pill rechts)

[lange ademruimte]

[H1 in Geist 96px, 700, mix van wit + lime accent op kernwoord]

[subtitel in lv-text-muted, 24-28px Manrope]

[footer]
```

Voorbeeld H1-styling:
> 20 AI-tips voor Nederlandse organisaties **die vooruit willen** zonder te struikelen.
>
> (waarbij "die vooruit willen" in lime-italic staat)

#### B. Section-divider (hoofdstuk-opener)
- Groot hoofdstuknummer in lime (`H 200-300px`, font-700)
- "HOOFDSTUK X" eyebrow in lv-text-subtle uppercase
- H1 met halve regel in lime-italic (consistent patroon)
- Lijstje van wat er komt (tip-titels) in pills onderaan

#### C. Content-slide (1 idee per slide)
- H2 bovenin
- Max 5 bullets, ieder maximaal 1 regel
- Of: 1 grote uitspraak gecentreerd
- Of: 2-koloms vergelijking ("voor / na")

#### D. Cijfer-slide
- Grote cijfer 200-300px in `lv-accent`, font-700
- Label eronder in `lv-text`, 24-32px
- Bron of context in `lv-text-subtle`, 14-16px

Voorbeeld:
> **180 uur**
> bespaard op de shop-floor in 3 maanden
> *(maakbedrijf, 30 FTE, ToolsWise-implementatie 2025)*

#### E. Quote-slide / case
- Quote in italic, 28-36px Geist
- Naam + functie + bedrijf in lv-text-subtle eronder
- Eventueel klein logo-grijswaarde

#### F. Use-case slide (productuitleg)
- 3-koloms layout: pijn → onze oplossing → resultaat
- Lucide-icoon per kolom in lime
- Korte tekstblokken (max 4 regels per kolom)

#### G. CTA-slide (afsluitend)
- Grote H1: "Plan je AI Ops Audit"
- Subtitel: "€2.500 · 2 weken · vaste prijs · geen verplicht vervolg"
- Primaire CTA-knop-styling: lime achtergrond, donkere tekst, rounded-lg, hover-glow
- Tweede knop: "Of bel +31 6 25 47 15 28"

### Slide-do's & don'ts

**Do:**
- Eén idee per slide — niet propvol
- Veel zwart, lime alleen waar relevant
- Leesbaar van afstand (achterin een vergaderzaal)
- Cijfers groot en zelfstandig
- Sources expliciet (bij benchmarks) of "*scenario*" gelabeld

**Don't:**
- Walls of bullets
- Stock-photos
- Ingewikkelde diagrammen (max 1 per deck)
- Animations (saai en duur in PDF-export)
- Mix van fonts buiten Geist + Manrope

---

## 7. Verboden taal in slides + alle visuals

Zelfde lijst als propositie-doc, herhaald voor scope-context:

❌ "digitale transformatie" · "journey" · "synergie" · "cutting-edge" · "next-gen" · "revolutionair" · "holistisch" · "roadmap" · "future-proof" · "disruptive" · "unlocking value" · "unleash potential" · "paradigmaverschuiving"

❌ "50-250 FTE" → "MKB"

❌ Verzonnen cijfers zonder bron → vervang met scenario-label of weglaten

✅ Wel oké: concrete sector-jargon ("RFQ", "TMS", "OEE", "CMR", "MRO"), benchmark-cijfers mét bron, scenario-cases expliciet gelabeld

---

## 8. Bestanden voor agents om mee te werken

### Logo-bestanden
```
public/brand/
├── leadvelocity-wordmark-light.svg   ← donkere achtergrond
├── leadvelocity-wordmark-light.png
├── leadvelocity-wordmark-dark.svg    ← lichte achtergrond
├── leadvelocity-wordmark-dark.png
├── leadvelocity-monogram.svg         ← vierkant icoon
└── leadvelocity-monogram.png
```

### Live-referenties
- Website: [leadvelocity.nl](https://leadvelocity.nl)
- Audit-pagina (voorbeeld van slide-CTA-stijl): [leadvelocity.nl/ai-ops-audit](https://leadvelocity.nl/ai-ops-audit)
- 20-tips-PDF: [leadvelocity.nl/downloads/tips-en-tricks-2026.pdf](https://leadvelocity.nl/downloads/tips-en-tricks-2026.pdf) ← deze is de visueel-leidende referentie voor slide-style

### Tailwind config (voor exacte tokens)
- `tailwind.config.ts` in repo-root

---

## 9. Slide-deck templates voor Claude

Wanneer een agent een slide-deck moet maken voor een prospect, gebruik deze 7-slide-template als startpunt:

1. **Cover** — bedrijfsnaam prospect + "AI Ops Audit – conceptuele verkenning"
2. **Wie zijn we** — Leadvelocity 1-pager (cover-stijl, gerichte H1, propositie-zin)
3. **Wat we zien bij [sector] zoals jullie** — 3-4 herkenbare pijnpunten (sector-specifiek)
4. **Hoe wij werken** — Audit → Pilot → Partnership → Scale (commitment-ladder visueel)
5. **Concreet voor [bedrijfsnaam]** — 2-3 use-cases die specifiek bij dit bedrijf passen
6. **Investering** — Audit €2.500 / 2 wkn (vaste prijs uitlichten)
7. **Volgende stap** — CTA-slide met telnr + datum-voorstel

Per slide: één idee, lime alleen op kernwoord, footer-wordmark, slide-nummer rechts.

---

*Versie 1.0 — 2026-05-06. Onderhouden in `docs/strategy/leadvelocity-huisstijl.md`. Update zodra brand-assets, kleuren of slide-templates wezenlijk veranderen.*
