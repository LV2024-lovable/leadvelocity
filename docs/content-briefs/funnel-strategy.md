# Funnel Strategy — Leadvelocity

**Versie:** 1.0 — 2026-04-21
**Afnemers:** Bart, broer, Scribe-LV, Analyst-LV, toekomstige content-mensen

Dit document legt vast welk infoproduct waar in de funnel staat, welke CTA waar wordt getoond, en hoe een bezoeker door de lagen heen beweegt. Nieuwe assets volgen dit patroon.

---

## 1. De volledige funnel (5 fases)

### Fase 1 — **AWARENESS** (koud verkeer, nog geen intentie)
Iemand die nog niet eens weet dat Leadvelocity bestaat of AI serieus overweegt.

**Traffic sources:**
- Blog posts (SEO-long-tail)
- Vertical landing pages
- LinkedIn content (vanuit Bart)
- Cold outreach (LinkedIn DMs, e-mail)
- Toekomstig: podcast, YouTube

**CTAs die op awareness-content horen:**
- Newsletter-signup (zeer laagdrempelig)
- Content-upgrade naar Tips & Tricks PDF
- *Niet* direct Tier 2 of 3 offers

---

### Fase 2 — **INTEREST** (nieuwsgierigheid, eerste stap gezet)
Iemand die een blog heeft gelezen, op LinkedIn geklikt, of kort gereageerd op een mail. Signalen: e-mail achtergelaten, eerste engagement-event.

**Primaire asset in deze fase: Tips & Tricks PDF**
- Lichte verplichting (e-mail)
- Brede toepasbaarheid (geen sector-lock-in)
- Introductie tot Leadvelocity-voice

**Waar deze getoond wordt:**
- Exit-intent popup (site-wide, 1× per sessie)
- Content-upgrade in blog posts (na 60% scroll of aan einde artikel)
- Welkomstmail voor nieuwsbrief-abonnees (dag 0)
- Als "bijvangst" na AI-Readiness Assessment (onder rapport)

**Wat de bezoeker nu doet:**
- Leest Tips & Tricks
- Ontvangt 1-2 nieuwsbrief-edities
- Begint te zien dat Leadvelocity eigen stem heeft

---

### Fase 3 — **CONSIDERATION** (actieve oriëntatie)
Iemand die nu structureel content consumeert, mogelijk op AI-Readiness-quiz heeft meegedaan, of een whitepaper heeft gedownload.

**Primaire asset in deze fase: AI-Readiness Assessment + Sector-whitepaper**
- Assessment is sector-agnostisch → iedereen kan meedoen
- Whitepaper is sector-specifiek → zelf-selectie op relevantie

**Waar deze getoond worden:**
- Homepage (hero-adjacent)
- Vertical pages (als natuurlijke vervolgstap)
- Blog posts (sector-specifieke whitepaper als "hot" CTA)
- LinkedIn ads (Assessment is de primary paid-driver)
- `/bronnen` hub (prominent)

**Wat de bezoeker nu doet:**
- Voltooit AI-Readiness Assessment → krijgt persoonlijk rapport
- Downloadt sector-whitepaper
- Ontvangt follow-up e-mails (nurture sequence)

---

### Fase 4 — **INTENT** (sector-specifieke intentie, weet wat nodig is)
Iemand die inmiddels een goed beeld heeft van Leadvelocity, eigen situatie kent, en concreet nadenkt over actie.

**Primaire asset in deze fase: Prompts + Playbook per vertical**
- Diep en sector-specifiek
- Hogere waarde, bewust gepositioneerd als "hierbij krijg je inzicht in wat we weten"
- Kan optioneel betaald worden (€49-99) in toekomst

**Waar deze getoond worden:**
- Niet prominent vooraan (niet voor koud verkeer)
- Verscholen in `/bronnen` onder "Voor serieuze oriëntatie"
- In follow-up e-mails na quiz of whitepaper
- Als "download dit eerst"-advies tijdens kennismakingsgesprek

**Wat de bezoeker nu doet:**
- Downloadt Prompts + Playbook voor zijn sector
- Gebruikt prompts intern (probeert ze uit)
- Begint concreet over pilot na te denken

---

### Fase 5 — **DECISION** (klaar om te committen)
Iemand die contact wil — voor een gesprek, Audit, of direct een Pilot.

**Primaire assets/CTAs:**
- AI Ops Audit (€2.500, 2 weken) — lagste drempel commit
- Direct gesprek plannen (gratis kennismaking)
- Contact-formulier

**Waar:**
- `/contact` + homepage-CTA
- Elk bottom-CTA van blogs/whitepapers
- Post-quiz rapport
- Vertical-pagina closing-CTAs

---

## 2. Mapping: asset × funnel-fase × placement

Overzichtstabel waar elk asset wordt ingezet:

| Asset | Primaire fase | Placement | Secundaire placement |
|---|---|---|---|
| **Blog posts** | Awareness | SEO, LinkedIn shares | In Inzichten-hub |
| **Nieuwsbrief (gratis)** | Interest | Footer strip, /nieuwsbrief, exit-intent (secondary) | Inzichten-hub |
| **Tips & Tricks PDF** | Interest | Exit-intent, content-upgrade in blog, welkomstmail | /bronnen (onder Interest) |
| **AI-Readiness Assessment** | Consideration | Homepage, /bronnen (prominent), LinkedIn ads | Blog CTAs (warm-tier) |
| **Sector-whitepaper** | Consideration | Vertical pages, /bronnen, blog CTAs (hot-tier sector-match) | Post-quiz follow-up |
| **Prompts + Playbook** | Intent | /bronnen (onder Intent-sectie), post-quiz nurture | In kennismakingsgesprek gedeeld |
| **Benchmark Report** *(toekomstig)* | Intent + Decision | /bronnen, gesprekken | Paid (€499) — later |
| **AI Ops Audit** | Decision | Homepage-hero, alle bottom-CTAs, contact-pagina | Alle hot-tier blog-CTAs |

---

## 3. CTA-regels per content-type

### Blog posts (3-niveau CTA's — al gebouwd)

| Cold | Warm | Hot |
|---|---|---|
| Tips & Tricks PDF *(voor sector-agnostische blogs)* OF Sector-whitepaper *(voor sector-blogs)* | AI-Readiness Assessment | Sector-specifieke oplossing (Tier 1 Quick Win of Tier 2) |

### Vertical pages

- Hero CTA: `Plan een gesprek` (naar contact)
- Sectie-CTA's: sector-whitepaper + Prompts + Playbook voor die sector
- Closing: `Plan een gesprek` + whitepaper

### Homepage

- Hero: rotating headlines + `Start met een AI Ops Audit`
- Verticals-sectie: kaarten naar vertical-pages
- Services: Commitment Ladder trappen
- Diensten-CTA: `Plan een gesprek`

### Nieuwsbrief (eens live)

- Elke editie: min 1 link naar AI-Readiness Assessment
- Elke editie: 1 relevante whitepaper voor dat thema
- Elke 3e editie: Prompts + Playbook voor actuele sector

---

## 4. Progressive engagement-logica (toekomstig)

Zodra we e-mails gaan tracken (na eerste download), kunnen we de volgende CTA tonen op basis van wat iemand al heeft:

```yaml
if has_downloaded("tips_and_tricks"):
  # Stage: Interest
  next_cta_homepage: AI-Readiness Assessment
  next_cta_blog: whitepaper voor blog-vertical

if has_completed("ai_readiness_quiz"):
  # Stage: Consideration
  next_cta_homepage: Whitepaper voor detected interest
  next_cta_blog: Prompts + Playbook
  email_day_2: "3 concrete stappen op basis van je score"
  email_day_7: Sector-whitepaper
  email_day_14: AI Ops Audit invitation

if has_downloaded("sector_whitepaper"):
  # Stage: Intent
  next_cta: Prompts + Playbook SAME sector
  email_day_3: "Specifieke voorbeelden uit dit segment"
  email_day_10: AI Ops Audit invitation

if has_downloaded("prompts_playbook"):
  # Stage: Decision
  next_cta: Direct contact, AI Ops Audit
  email_day_1: "Hoe ga je deze prompts intern uitrollen?"
  email_day_5: "Klaar voor een gesprek?"
```

*Dit vereist later koppeling tussen e-mail (als user-ID) en download-events. Supabase-tabel `user_asset_events` houdt dit bij.*

---

## 5. Technische implementatie (wat waar komt)

### 5.1 On-site placements (bouwen deze sessie)

- **Exit-intent popup** — react-component die mousemove tracked op `document` en 1x per session popup triggert wanneer mouse naar boven de viewport beweegt. localStorage flag. Biedt Tips & Tricks PDF.

- **Content-upgrade in blog** — inline card-component die in BlogPost-layout wordt ingevoegd na sectie 2 (ongeveer 50% article). Biedt Tips & Tricks of context-specifieke whitepaper. Visueel onderscheidend maar niet storend.

- **Bronnen-hub herindeling** — huidige flat grid wordt onderverdeeld in 3 secties:
  1. "Start hier" (Tips & Tricks, Nieuwsbrief)
  2. "Ontdek jullie positie" (AI-Readiness Assessment, Whitepapers)
  3. "Dieper de materie in" (Prompts + Playbook)

### 5.2 Off-site placements (e-mail nurture — later bouwen)

Vereist uitbreiding van `email-notify` Edge Function + scheduled Resend-emails:

- Welkomstmail nieuwsbrief (Tips & Tricks attached) — dag 0
- Quiz follow-up sequence — dag 2, 7, 14
- Whitepaper nurture — dag 3, 10
- Prompts + Playbook follow-up — dag 1, 5

---

## 6. Volgende stappen

### Nu (deze sessie)
- [ ] Tips & Tricks landing-pagina bouwen (placeholder voor echte content later)
- [ ] Exit-intent popup component
- [ ] Content-upgrade component voor blog posts
- [ ] /bronnen hub herindelen in 3 funnel-fases

### Volgende sessie (na content-work)
- [ ] Tips & Tricks PDF daadwerkelijk vullen (via ChatGPT content + Canva design)
- [ ] AI-Readiness Assessment content verdiepen (jouw MD + ChatGPT sessie)
- [ ] LinkedIn ad-copy voor Assessment

### Maand 2
- [ ] Post-quiz nurture-mail sequence implementeren
- [ ] Newsletter welkomstmail automatiseren
- [ ] Eerste nieuwsbrief-editie publiceren

### Maand 3+
- [ ] Progressive engagement-logica (asset-events tracking)
- [ ] Sector Benchmark Report bouwen
- [ ] Paid tier voor Prompts + Playbook overwegen (€49-99)

---

*Versie 1.0 — 2026-04-21. Bijwerken wanneer funnel-strategie of asset-placement verandert.*
