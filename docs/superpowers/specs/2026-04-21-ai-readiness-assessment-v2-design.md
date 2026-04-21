# AI-Readiness Assessment v2 — Design

**Datum:** 2026-04-21
**Project:** Master Funnel Project 1
**Status:** Design — wacht op user-review

---

## 1. Doel

Herbouw van de AI-Readiness Assessment tot een volwaardige top-of-funnel conversie-asset zoals beschreven in de master-funnel-doc (Funnel A) en de drie sector-specs.

De quiz moet:
1. Gekwalificeerde leads genereren met sector-context
2. Persoonlijk, geloofwaardig advies geven (niet alleen een score)
3. Doorsturen naar een logische vervolgstap op basis van scoreband

## 2. Wat verandert tov v1

| Onderdeel | v1 (huidig) | v2 (nieuw) |
|---|---|---|
| Vragen | 15 generiek | 12 core + 5 per sector = 17 |
| Dimensies | 5 (Data/Team/Processen/Ambitie/Budget) | 6 (Richting/Data/Processen/Team/Uitvoering/Vertical) |
| Sector-selectie | geen | Ja, bepaalt 5 vertical-vragen |
| Flow | intro → quiz → email → result (1 URL) | intro → sector → core → vertical → preview → email → result (eigen URL) |
| Scorebands | geen | 5: Verkennend / In opbouw / Klaar / Sterke basis / AI-ready |
| Advies | generiek per level | band + dimensie + sector → maatwerk |
| CTA | homepage contact | band-specifiek naar `/ai-ops-audit` of contact |
| Result-URL | inline, niet sharable | `/ai-readiness-assessment/resultaat` (eigen route) |
| Email-payload | naam + score + level | + sector, dimensie-scores, band, aanbevolen use-case, 30-dagen-advies |

## 3. Scope

### 3.1 In scope
- Herbouw `src/pages/AiReadinessAssessment.tsx` — multi-step flow
- Nieuwe `src/pages/AiReadinessAssessmentResult.tsx` — result-page op eigen route
- Nieuwe data-module `src/data/assessment/*` — questions, dimensions, copy, scoring
- Update email-template `ai_readiness_assessment` in `auto-respond-asset/index.ts`
- URL-migratie: `/bronnen/ai-readiness-assessment` → `/ai-readiness-assessment` met redirect
- Nieuwe route `/ai-readiness-assessment/resultaat`
- Update interne links in [Bronnen.tsx](../../../src/pages/Bronnen.tsx), [HeroNew.tsx](../../../src/components/HeroNew.tsx), exit-popup
- Archiveer of verwijder oude `src/data/aiReadinessQuestions.ts`

### 3.2 Expliciet buiten scope
- **Nurture-sequences** (dag 2/7/14 follow-ups) — Project 3
- **CRM-integratie** (echte tagging naar externe CRM) — later; v1 stuurt alleen verrijkte email
- **Resume/save progress** — quiz moet in één sessie af
- **Score-sharing** (shareable URL met URL-params) — later, voor nu alleen eigen-gebruik URL
- **Analytics events** (GA4/PostHog) — niet in deze project
- **Database-persistentie van scores** — email is voldoende voor nu
- **4e sector "Anders/overig"** — voor v1 tonen we alleen 12 core-vragen bij "Anders" (genormaliseerd 12-48 → 0-100)

## 4. URL-structuur

| URL | Rol |
|---|---|
| `/ai-readiness-assessment` | Landing + quiz-flow (alle stappen op één URL met interne state) |
| `/ai-readiness-assessment/resultaat` | Result-page, ontvangt state via React Router `location.state` + sessionStorage-fallback |
| `/bronnen/ai-readiness-assessment` | **Redirect** naar `/ai-readiness-assessment` (behoudt oude links in emails/social) |

## 5. Architectuur

### 5.1 Bestandsstructuur

```
src/
├── pages/
│   ├── AiReadinessAssessment.tsx          (herbouw: quiz-flow)
│   └── AiReadinessAssessmentResult.tsx    (nieuw: result-page)
├── data/
│   └── assessment/
│       ├── coreQuestions.ts                (12 gedeelde vragen)
│       ├── verticalQuestions.ts            (5 per sector × 3 sectoren)
│       ├── dimensions.ts                   (6 dimensies + metadata + copy)
│       ├── scoring.ts                      (pure functies: calculateScores)
│       ├── resultCopy.ts                   (per-band / per-dimensie / per-sector copy)
│       ├── useCases.ts                     (use-case-bibliotheek per sector)
│       ├── triggerRules.ts                 (patroon-advies regels A-E)
│       └── types.ts                        (TypeScript types)
└── lib/
    └── autoRespond.ts                     (update: ondersteun extra payload)
```

### 5.2 Types

```ts
type Sector = 'groothandel' | 'maakindustrie' | 'transport' | 'anders';

type Dimension = 'richting' | 'data' | 'processen' | 'team' | 'uitvoering' | 'vertical';

type ScoreBand = 'verkennend' | 'in_opbouw' | 'klaar' | 'sterke_basis' | 'ai_ready';

type AnswerOption = { label: string; score: 1 | 2 | 3 | 4 };

type Question = {
  id: string;           // 'q1'...'q17'
  dimension: Dimension;
  text: string;
  options: AnswerOption[];  // always 4
};

type Answers = Record<string, 1 | 2 | 3 | 4>;  // questionId -> score

type AssessmentResult = {
  sector: Sector;
  answers: Answers;
  rawScore: number;
  normalizedScore: number;   // 0-100
  band: ScoreBand;
  dimensionScores: Record<Dimension, number>;  // 0-100 per dimension
  strongestDimension: Dimension;
  weakestDimension: Dimension;
  recommendedUseCase: string;  // key uit useCases.ts
  triggers: string[];  // welke patroon-regels fireten
};
```

### 5.3 Scoring-algoritme (pseudocode)

```
function calculateScores(sector, answers):
  rawSum = sum(answers)
  isAnders = sector === 'anders'
  minRaw = isAnders ? 12 : 17
  maxRaw = isAnders ? 48 : 68

  normalizedScore = round(((rawSum - minRaw) / (maxRaw - minRaw)) * 100)

  // Per dimensie: gemiddelde van bijbehorende vragen, genormaliseerd naar 0-100
  for each dim in dimensions:
    dimQuestions = getQuestionIdsForDimension(dim, sector)
    dimSum = sum(answers voor die vragen)
    dimMax = dimQuestions.length * 4
    dimMin = dimQuestions.length * 1
    dimensionScores[dim] = round(((dimSum - dimMin) / (dimMax - dimMin)) * 100)

  band = getBand(normalizedScore)
  strongest = key with max dimensionScores
  weakest = key with min dimensionScores
  triggers = evaluateTriggerRules(normalizedScore, dimensionScores)
  recommendedUseCase = pickUseCase(sector, strongest, weakest, triggers)

  return AssessmentResult{...}
```

## 6. UX-flow

### Stap 1 — Landing (full page)
- Hero: "Hoe AI-ready is jullie organisatie echt?"
- Sub: "Ontdek in 3 minuten waar jullie nu staan — en wat een logische volgende stap is."
- Wat je krijgt: score, sterkste/zwakste punten, 30-dagen-advies, sector-fit
- Hoe werkt het: 3 stappen (sector / 17 vragen / resultaat per mail)
- Primair CTA: "Start de assessment" → transitie naar stap 2
- Friction-reducer-block: "Geen goede of foute score. Deze test helpt om te zien waar je logisch kunt beginnen."

### Stap 2 — Sector-selectie (volledig scherm)
- Vraag: "Welke sector past het beste bij jullie organisatie?"
- 4 kaarten: Technische groothandel / Maakindustrie / Transport & logistiek / Anders
- Helper: "Zo maken we de vragen en het advies relevanter."

Na klik → "Helder — we stemmen de rest van de vragen af op [sector]."

### Stap 3 — Core-vragen (q1-q12)
- Eén vraag per scherm
- Progress-bar boven (1/17, 2/17, ...)
- 4 antwoord-kaarten, klikbaar
- "Vorige"-knop (niet bij q1)
- Auto-advance na 200ms na klik
- Microcopy na q6: "Helder, we stemmen de rest af op jullie sector"
- Persistent line onderaan: "Je hoeft geen exacte cijfers te weten. Kies wat het meest op jullie situatie lijkt."

### Stap 4 — Vertical-vragen (q13-q17) — skip bij sector='anders'
- Identiek aan core-flow
- Header-pill toont sector-naam

### Stap 5 — Preview (pre-email-gate)
- "Je uitslag staat klaar"
- "We hebben berekend waar jullie nu staan, wat jullie al meehebben en waar de grootste rem zit."
- Button: "Bekijk mijn uitslag →"

### Stap 6 — Email-gate
- Headline: "Ontvang je volledige uitslag en advies"
- Body: "Vul je gegevens in en we sturen je score, inzichten en een praktische vervolgstap per mail."
- Velden: Voornaam (required), E-mail (required), Bedrijf (optional)
- Privacy-line: "We sturen je uitslag per mail en af en toe praktische AI-inzichten. Afmelden kan altijd."
- Submit → invoke `email-notify` + `auto-respond-asset` met verrijkte payload → navigate naar result-URL

### Stap 7 — Result-page op `/ai-readiness-assessment/resultaat`
- Ontvangt `result` via `location.state`; bij refresh leest uit sessionStorage; bij afwezig → redirect naar landing
- Zie sectie 7 voor structuur

## 7. Result-page structuur

### 7.1 Hero-block
- Centraal: grote score (bv. 78/100)
- Label: scoreband-naam
- Subkop: 2-3 zinnen samenvatting (dynamisch per band)

### 7.2 Score-breakdown-visual (optioneel, nice-to-have)
- 6 bars: dimensie → score 0-100
- Sterkste in accent-kleur, zwakste in muted-kleur
- Leesbaar in oogopslag: waar zit de spreiding

### 7.3 "Wat jullie al meehebben"
- 2-3 bullets op basis van sterkste 1-2 dimensies
- Copy uit `resultCopy.ts` — per dimensie een "sterk"-variant

### 7.4 "Waar nu de rem zit"
- 2-3 bullets op basis van zwakste 1-2 dimensies
- Copy uit `resultCopy.ts` — per dimensie een "zwak"-variant

### 7.5 "Wat je komende 30 dagen kan doen"
- 3 concrete stappen
- Selectie: band-specifieke base-stappen + trigger-rule-aanvullingen

### 7.6 "Wat je nu beter nog niet doet"
- 2 waarschuwingen
- Band-specifiek + trigger-rule-context

### 7.7 "Meest logische eerste toepassing"
- 1 use-case in card-vorm
- Titel + 2-zin uitleg + "Pas bij jullie omdat..."
- Sector-specifiek

### 7.8 CTA-block
- Band-specifieke headline + button
- Primair target: `/ai-ops-audit` (behalve voor band 0-39 → optie tussen rapport en audit)

### 7.9 Footer-CTA — tweede kans
- "Vragen over je uitslag? Plan een kennismaking." → `/#contact`

## 8. Copy-modules

### 8.1 Scorebands (samenvatting + CTA)

| Band | Range | Label | Samenvatting | Primair CTA |
|---|---|---|---|---|
| 1 | 0-39 | Verkennend | Interesse is er, basis nog te dun om nu breed te bouwen. | Plan een verkennende AI Ops Audit |
| 2 | 40-59 | In opbouw | Ruimte om te starten, eerste stap moet scherper gekozen. | Bekijk hoe een AI Ops Audit werkt |
| 3 | 60-79 | Klaar om te starten | Genoeg basis om een eerste toepassing zinvol te testen. | Bespreek een mogelijke eerste pilot |
| 4 | 80-94 | Sterke basis | Dicht bij een werkende pilot. | Plan een AI Ops Audit |
| 5 | 95-100 | AI-ready | Basis staat. Nu is de vraag waar je eerst impact pakt. | Bespreek jullie eerste/volgende toepassing |

### 8.2 Dimensie-copy (sterk + zwak, per dimensie)

Voorbeelden (volledig uitgewerkt in `resultCopy.ts`):

**Richting & eigenaarschap**
- Sterk: "Er is genoeg interne beweging en commitment om een eerste stap te zetten."
- Zwak: "Eigenaarschap of prioritering is nog niet scherp genoeg — zonder duidelijke eigenaar verdampen pilots snel."

**Data & systemen**
- Sterk: "De informatie voor een eerste toepassing is relatief goed toegankelijk."
- Zwak: "Informatie is nog te verspreid over systemen om meteen breed te bouwen."

**Processen & kansen**
- Sterk: "Jullie hebben een scherp beeld van waar de terugkerende processen zitten."
- Zwak: "De kansen zijn er, maar nog weinig afgebakend of geprioriteerd."

**Team & adoptie**
- Sterk: "Jullie organisatie neemt nieuwe werkwijzen relatief goed op."
- Zwak: "Nieuwe werkwijzen landen nog langzaam — dat is het grootste risico voor adoptie."

**Uitvoering & controle**
- Sterk: "Jullie meten effecten en hebben controle-mechanismen op hun plek."
- Zwak: "Zonder duidelijke KPI of controle wordt het lastig om intern tractie te houden."

**Vertical fit**
- Sterk: "In jullie sector herkennen we duidelijke, beproefde AI-hefbomen."
- Zwak: "Voor jullie sector is de AI-volwassenheid nog in opbouw — daarom extra belangrijk om klein te beginnen."

### 8.3 Trigger-regels

Uit de docs (identiek voor alle sectoren op tekst, variant op use-case-advies):

| Regel | Conditie | Output |
|---|---|---|
| A | score > 80 & data < 50 | "Ambitie is sterk genoeg. Waarschuwing: begin niet met brede integratie-pilot. Advies: kennis-/document-/analyse-gerichte use-case." |
| B | score > 75 & richting < 50 | "Uitvoering is grootste risico. Leg eerst eigenaar, sponsor, scope vast." |
| C | score 60-79 & uitvoering < 50 | "Eerst KPI's en controlemomenten vastleggen. Geen pilot zonder nulmeting." |
| D | processen hoog & team laag | "Use-case klopt waarschijnlijk. Klein starten in 1 team/rol. Maak output zichtbaar." |
| E | team < 50 | "Advies: start in één team of met mens-in-de-lus. Waarschuwing tegen organisatiebrede uitrol." |

### 8.4 Use-case-bibliotheek per sector

Uit de docs (Rule 5):

**Groothandel:** productkennis-assistent · offertevoorbereiding · klantvraag-routering · datasheet-naar-klanttaal · interne productsupport-assistent

**Maakindustrie:** afwijkingsanalyse · onderhoudssamenvattingen · werkvoorbereidingsassistent · kennisborging voor productie · documentatie- en overdrachtsassistent

**Transport:** planningsondersteuning · klantstatus-automatisering · exception-handling-assistent · rit-/afwijkingssamenvattingen · plannersupport voor herplanning

**Anders:** generieke use-cases (documentautomatisering · kennis-hub · e-mail-automatisering) — fallback-set

Elke use-case krijgt: titel + 2-zin uitleg + "Past bij jullie omdat..."-copy (dynamisch op basis van strongest/weakest dim).

## 9. Email-payload update

Huidige `auto-respond-asset` template `ai_readiness_assessment` ontvangt alleen `extra.score` en `extra.level`. Nieuwe payload:

```ts
extra: {
  sector: string,
  score: number,              // 0-100
  band: string,               // "Klaar om te starten"
  strongestDimension: string, // "Uitvoering & controle"
  weakestDimension: string,   // "Data & systemen"
  recommendedUseCase: {
    title: string,
    description: string,
  },
  actions30Days: string[],    // 3 stappen
}
```

Template toont in mail:
- Score + band
- 2-zin samenvatting per band
- Bullet-lijstje met 3 actiestappen
- Use-case card
- CTA-button naar `/ai-ops-audit` met scoreband-specifieke tekst

Notify-email naar `info@leadvelocity.nl` krijgt ook deze rijke payload voor sales-context.

## 10. Interne links bij te werken

| Bestand | Huidig | Nieuw |
|---|---|---|
| `src/App.tsx` | `/bronnen/ai-readiness-assessment` route | Voeg `/ai-readiness-assessment` + `/ai-readiness-assessment/resultaat` toe; laat oude route redirecten |
| `src/pages/Bronnen.tsx` | links naar quiz | naar `/ai-readiness-assessment` |
| `src/components/HeroNew.tsx` | CTA | check |
| `src/components/ExitIntentPopup.tsx` | CTA | check |
| `src/components/NewsletterSignup.tsx` en andere | check assessment-mentions | update |

## 11. Testplan

### 11.1 Build-check
`npm run build` — zero errors

### 11.2 Flow-test (lokaal)
1. Open `/ai-readiness-assessment` → landing rendert
2. Klik "Start" → sector-scherm
3. Kies sector → core-vragen laden
4. Beantwoord 12 core-vragen → progress-bar klopt
5. Vertical-vragen laden (voor non-anders)
6. Preview-scherm toont
7. Email-gate → vul in → submit
8. Redirect naar result-URL
9. Refresh pagina → result blijft zichtbaar (sessionStorage)
10. Directe navigatie naar result-URL zonder state → redirect naar landing

### 11.3 Scoring-test
Schrijf pure-function tests in `src/data/assessment/scoring.test.ts` (indien tijd). Minimaal: 3 handmatige scenarios (laag/mid/hoog) door flow heen draaien en score + band checken tegen verwachting.

### 11.4 Email-check
- Notify naar info@leadvelocity.nl arriveert met rijke payload
- Auto-respond naar user arriveert met alle velden correct ingevuld
- Link in mail naar `/ai-ops-audit` werkt

### 11.5 Mobile
iPhone SE-breedte (375px): alle stappen prettig invulbaar, tap-targets minimaal 44px.

## 12. Open beslissingen — niet blokkerend

1. **"Anders"-sector** — v1 toont 12 core-only. Als completion-rate goed is, kunnen we later 5 generieke vertical-vragen toevoegen. Akkoord?
2. **Dimensie-breakdown visual** — sectie 7.2 in result-page. Met of zonder? (Mijn voorkeur: met, geeft geloofwaardigheid)
3. **Oude `aiReadinessQuestions.ts`** — archiveren in `src/data/_archive/` of volledig verwijderen?
4. **Preview-scherm skip-optie** — tussen stap 5 en 6 (preview → email) zit één klik. Value of friction?

## 13. Rollout

1. Implementatie in feature-branch (of direct op main, gezien Lovable auto-deploys main)
2. Lokaal testen via dev-server
3. Build-check zero-errors
4. Commit in 3-4 logische chunks:
   - `feat(assessment): data-module with questions, dimensions, scoring`
   - `feat(assessment): result-copy + trigger rules + use-cases`
   - `feat(assessment): multi-step quiz page + result page`
   - `feat(assessment): update email template + internal links + URL migration`
5. Push naar main → Lovable deploy
6. Live-check en handmatige flow-test
7. Eerste week: check email-logs om te zien of payload-data klopt

## 14. Schatting

- Data-modules (questions/dimensions/scoring/copy/triggers/use-cases): ~2 uur
- Quiz-pagina (7 stappen + state): ~3 uur
- Result-pagina (hero/dimensies/advies/use-case/CTA): ~2 uur
- Email-template update: ~30 min
- Routes, redirects, interne links: ~45 min
- Lokale test + fixes: ~45 min

Totaal: ~9 uur ononderbroken werk. Kan in één sessie als we ongestoord doorwerken.
