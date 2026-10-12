# Orrin-look nabouwen — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Geef de hele site de uitstraling van het 21st.dev-template "Orrin": serif-koppen, gebroken wit, grijze kaarten, zwarte knoppen, zachte long-exposure-beeldvlakken en lime als klein accent. De homepage krijgt de opbouw uit spec §3. Alle bestaande content, prijzen, routes en het formulier blijven werken.

**Architecture:** Nieuwe tokenwaarden in Tailwind (dezelfde tokennamen plus `lv-card`) en Newsreader als `font-display`. Er komen nieuwe presentatiecomponenten in `src/components/site/`: `ExposureArt`, `Pill`, `FactTiles`, `NumberedTabs`, `TimelineTabs` en `MediaCard`. Home wordt herschreven en de gedeelde componenten krijgen de nieuwe stijl, zodat alle pagina's meegaan. Copy blijft in `src/content/*`.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind v3, `useReveal`, `tsx`-checks, Playwright-funnelcheck.

**Spec:** `docs/superpowers/specs/2026-10-12-orrin-look-design.md`. Content blijft leidend volgens `docs/strategy/2026-10-11-messaging-strategie.md` en de handover.

## Global Constraints

- Neem geen code, beelden of teksten letterlijk uit het template over. We bouwen de look zelf na.
- Geen verzonnen bewijs: geen logo's, sterren, "trusted by", cijfers of uren/%-claims, cases of testimonials, en geen dagenclaims.
- Lime (`lv-lime`) alleen als vlak of klein accent: logomerk, statusstip, actief tablabel, badge. Lime-tekst op licht mag niet; gebruik `lv-lime-ink` als het om tekst gaat.
- Koppen in Newsreader met weight 400 (groot) of 500 (kaarttitels). Nooit 600 of hoger voor `font-display`.
- Geen euro-literals in `src/pages/site` en `src/components/site`. Prijzen alleen via `pricing.ts`/`formatEuro`.
- Niets wisselt vanzelf. Animaties gaan alleen via `Reveal`/`useReveal` en via overgangen bij een klik. Respecteer `motion-reduce`.
- Mobiel: geen horizontale scroll op 360 px.
- Commit alleen de genoemde bestanden, met een `Co-Authored-By:`-trailer. Stage nooit `.env`, `bun.lockb`, `data/prospects/*`, `scripts/seed-lead-os.ts` of `.mcp.json`.
- Na elke taak draaien: `npx tsx scripts/check-content.ts`, `check-lib.ts`, `check-redirects.ts`, `check-werkstroomcheck-schema.ts`, en `npm run build`. Alles moet groen zijn.
- Branch: `orrin-look`.
- Dev-server staat op `http://localhost:5179`. Is die stale, start dan `npx vite --port 5182 --force` en zet `BASE_URL`.
- Playwright: `PLAYWRIGHT_MODULE=/private/tmp/claude-501/-Users-bartwilbrink-leadvelocity/a5f3b28a-c974-4d76-b7e4-04eec632a6f8/scratchpad/shot/node_modules/playwright/index.mjs`.
- Chromium: `CHROME_PATH="/Users/bartwilbrink/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"`.

## Afwijking van de spec (controller-besluit)

De homepage-sectie "Inzichten" (spec §3 #9) vervalt. De huidige artikeltitels bevatten onbewezen claims ("1–2% extra marge", "OEE 60% naar 78%") en de claim-audit is nog open. De artikelen blijven via de footer bereikbaar.

## Review Focus

1. **Contrast van de nieuwe grijze tekst op `lv-card` en `lv-paper`:** tekst moet ≥ 4.5:1 halen. Gedekt in Task 1 (waarden gekozen) en Task 4 (visuele check).
2. **NumberedTabs en hero-keuzeknoppen delen dezelfde segment-state:** een klik in de tabs mag de hero niet in een ongeldige toestand brengen. Gedekt in Task 2 (funnel).
3. **ExposureArt-beelden op mobiel:** blur en scale mogen geen overflow geven. Gedekt in Task 2/4 (overflow-check).
4. **Serif-koppen met lange Nederlandse woorden op 360 px:** geen overflow (`break-words`). Gedekt in Task 4.
5. **Bestaande pagina's met hardcoded `font-semibold` op `font-display`:** die mogen niet als vette serif renderen. Gedekt in Task 3 (grep-gate).

---

### Task 1: Tokens, fonts, ExposureArt, Pill, basiscomponenten

**Files:**
- Modify: `tailwind.config.ts`, `index.html`, `src/index.css`, `src/components/site/Section.tsx`, `src/components/site/CtaLink.tsx`, `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`, `src/components/site/index.ts`
- Create: `src/components/site/ExposureArt.tsx`, `src/components/site/Pill.tsx`

**Interfaces (produced):**
- `<ExposureArt tone="ember"|"moss"|"dusk"|"sand" className? children? />`
- `<Pill tone="light"|"dark" dot? className? children />`
- `SectionHead` krijgt de prop `align?: "left" | "center"` (default `"left"`). `eyebrow` wordt als `Pill` gerenderd.
- Tailwind-kleur `lv-card`.

- [ ] **Step 1: Tokens (`tailwind.config.ts`)**

Vervang de waarden van het `lv`-object (namen blijven) en voeg `card` toe:

```ts
				lv: {
					paper: '#F6F7F6',
					surface: '#FFFFFF',
					raised: '#F1F3F2',
					card: '#EDF0EF',
					ink: '#111414',
					body: '#46504E',
					muted: '#5A6462',
					faint: '#8A9290',
					line: '#E1E5E3',
					'line-soft': '#EAEDEC',
					lime: '#C8FF00',
					'lime-soft': '#F1FFC2',
					'lime-ink': '#4D6B00',
				},
```

Fontfamilies:

```ts
				display: ['Newsreader', 'Georgia', 'serif'],
				body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
```

- [ ] **Step 2: Fonts (`index.html`)**

Vervang de Google-Fonts-link door:

```html
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Pas het commentaar erboven aan naar `Newsreader (koppen) + Hanken Grotesk (tekst) + JetBrains Mono (labels)`.

- [ ] **Step 3: `src/index.css`**

In `@layer base`, vervang de headingregel door:

```css
  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-normal;
    letter-spacing: -0.015em;
    line-height: 1.06;
  }
```

Pas `--background` aan naar `150 8% 96%` en `--muted` naar `160 7% 93%`. Voeg onderaan in `@layer utilities` toe:

```css
  /* Korrel voor long-exposure-beeldvlakken */
  .grain-overlay {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  }
```

- [ ] **Step 4: `src/components/site/ExposureArt.tsx`**

```tsx
import React from "react";
import { cn } from "@/lib/utils";

export type ExposureTone = "ember" | "moss" | "dusk" | "sand";

/** [basis, kleurbaan 1, kleurbaan 2, onderglow] — zachte "long exposure"-vlakken, zelf gemaakt met CSS. */
const TONES: Record<ExposureTone, [string, string, string, string]> = {
  ember: ["#1c0b07", "#b8360f", "#f0743a", "#5c1a0a"],
  moss: ["#10150c", "#3f5a1b", "#a9bf72", "#24321a"],
  dusk: ["#0d1020", "#2f3f72", "#c58aa9", "#e3a073"],
  sand: ["#2a1d10", "#b98a55", "#efdcbc", "#7a5a37"],
};

export function ExposureArt({ tone = "dusk", className, children }: { tone?: ExposureTone; className?: string; children?: React.ReactNode }) {
  const [base, a, b, c] = TONES[tone];
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[28px]", className)} style={{ backgroundColor: base }}>
      <div
        aria-hidden
        className="absolute -inset-[10%]"
        style={{
          background: `radial-gradient(60% 45% at 22% 35%, ${a} 0%, transparent 70%), radial-gradient(55% 50% at 72% 55%, ${b} 0%, transparent 72%), radial-gradient(80% 50% at 50% 115%, ${c} 0%, transparent 70%)`,
          filter: "blur(40px) saturate(1.1)",
        }}
      />
      <div
        aria-hidden
        className="absolute -inset-[10%] opacity-70"
        style={{ background: "linear-gradient(112deg, transparent 32%, rgba(255,255,255,0.22) 46%, transparent 58%)", filter: "blur(24px)" }}
      />
      <div aria-hidden className="grain-overlay absolute inset-0 opacity-[0.16] mix-blend-overlay" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
```

- [ ] **Step 5: `src/components/site/Pill.tsx`**

```tsx
import React from "react";
import { cn } from "@/lib/utils";

export function Pill({ children, tone = "light", dot = false, className }: { children: React.ReactNode; tone?: "light" | "dark"; dot?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-medium",
        tone === "light" ? "bg-lv-card text-lv-body" : "bg-black/45 text-white ring-1 ring-white/15 backdrop-blur",
        className,
      )}
    >
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lv-lime" />}
      {children}
    </span>
  );
}
```

- [ ] **Step 6: `Section.tsx` — Eyebrow als Pill, SectionHead met `align`, serif-kopstijl**

Vervang `Eyebrow` en `SectionHead` door:

```tsx
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mb-3 text-[13px] font-medium text-lv-muted", className)}>{children}</p>;
}

export function SectionHead({ eyebrow, title, intro, className, as: As = "h2", align = "left" }: { eyebrow?: string; title: React.ReactNode; intro?: string; className?: string; as?: "h1" | "h2"; align?: "left" | "center" }) {
  return (
    <Reveal className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && <Pill className="mb-5">{eyebrow}</Pill>}
      <As className={cn("break-words text-balance font-display font-normal tracking-[-0.02em]", As === "h1" ? "text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02]" : "text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04]")}>
        {title}
      </As>
      {intro && <p className={cn("mt-5 text-[17px] leading-relaxed text-lv-body", align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")}>{intro}</p>}
    </Reveal>
  );
}
```

Importeer `Pill` uit `"./Pill"`. In `Section`: maak `tone="raised"` → `bg-lv-raised` zonder borders (`border-y` weg). Verhoog de padding naar `py-24 md:py-32`.

- [ ] **Step 7: `CtaLink.tsx`**

Knoppen worden rechthoekig-afgerond zoals in het template:
- vervang `rounded-full` door `rounded-[10px]`;
- `primary` = `bg-lv-ink text-white hover:bg-black`;
- `secondary` = `bg-lv-card text-lv-ink hover:bg-[#E3E7E5]` (geen ring);
- `lime` = `bg-white text-lv-ink hover:bg-lv-card`. Op het donkere slotvlak wordt dit de witte knop. De naam van de variant blijft.

- [ ] **Step 8: Header en footer**

`SiteHeader`:
- het logomerk is een kleine lime stip plus `font-display text-[22px] font-normal` "Lead Velocity";
- navigatie gecentreerd met `text-[15px] text-lv-body`;
- de knop rechts is `rounded-[10px]`;
- header-achtergrond `bg-lv-paper/80 backdrop-blur`, zonder border onderaan.

`SiteFooter`:
- kolomtitels in `font-display text-[19px] font-normal text-lv-muted`;
- links in `text-lv-body`;
- de rest blijft zoals het is.

- [ ] **Step 9: Exports**

Voeg `export * from "./ExposureArt"; export * from "./Pill";` toe aan `index.ts`.

- [ ] **Step 10: Checks, build, kort visueel**

Draai alle checks en de build. Maak screenshots van `/` op 1440 en 360 px: de serif-koppen moeten zichtbaar zijn en de pagina mag niet breken (de homepage oogt nog half-oud tot Task 2).

- [ ] **Step 11: Commit** (alle bestanden hierboven). Bericht: `Orrin-look fundament: tokens, Newsreader, ExposureArt, Pill, basiscomponenten`.

---

### Task 2: Homepage-componenten en nieuwe Home

**Files:**
- Create: `src/components/site/FactTiles.tsx`, `NumberedTabs.tsx`, `TimelineTabs.tsx`, `MediaCard.tsx`
- Modify: `src/components/site/index.ts`, `src/content/pages.ts` (alleen nieuwe keys toevoegen: `home.facts`, `home.build`, `home.timeline`, `home.showcase`, `home.aboutLine`), `src/pages/site/Home.tsx`, `scripts/e2e/funnel.mjs`

**Interfaces:**
- `<FactTiles items={{ value: string; label: string }[]} />`
- `<NumberedTabs value={CategoryId} onChange={(id) => void} />`. Leest `categories`, rendert per categorie het tabblad, met rechts `ExposureArt` (tint per categorie) plus pills uit `c.exampleFlow` (max. 4).
- `<TimelineTabs steps={{ label: string; title: string; body: string; checks: string[] }[]} note?: string />`
- `<MediaCard tone label title body href cta />`

- [ ] **Step 1: Content-keys in `src/content/pages.ts`** (in het `home`-object, na `closing`; importeer `analysis, formatEuro` staat al):

```ts
  facts: [
    { value: "20 min", label: "Gratis adviesgesprek, vrijblijvend" },
    { value: formatEuro(analysis.price), label: `Analyse, verrekend bij implementatie binnen ${analysis.creditDays} dagen` },
    { value: "1 proces", label: "Om mee te starten, met vaste scope" },
    { value: "Jullie team", label: "Controleert en beslist altijd" },
  ],
  build: {
    eyebrow: "Wat we bouwen",
    h2: "Per aanvraagstroom één oplossing.",
    notes: ["Werkt vanuit jullie mailbox", "Wat ontbreekt, staat op een rij", "Jullie medewerker beslist"],
  },
  timeline: {
    eyebrow: "Werkwijze",
    h2: "Van eerste gesprek tot werkende oplossing.",
    note: "Planning: een bestaande passende opzet kan doorgaans in 4–6 weken worden ingericht, na de analyse.",
    steps: [
      { label: "Stap 1", title: "Gratis adviesgesprek", body: "In 20 minuten kijken we welk werk bij jullie steeds terugkomt en of automatiseren loont.", checks: ["Welk werk terugkomt", "Of het loont"] },
      { label: "Stap 2", title: "Analyse", body: "Proceskaart, nulmeting, input- en toegangscheck en een vaste scope met prijs.", checks: ["Proceskaart en nulmeting", "Vaste scope en prijs"] },
      { label: "Stap 3", title: "Inrichten en testen", body: "We richten de oplossing in op jullie bronnen en testen met echte voorbeelden. Jullie team keurt goed.", checks: ["Met jullie voorbeelden", "Acceptatie door jullie team"] },
      { label: "Stap 4", title: "Live en beheer", body: "Na acceptatie gaat het live. Wij monitoren, lossen incidenten op en verbeteren in kleine stappen.", checks: ["Maandkosten pas na acceptatie", "Monitoring en support"] },
    ],
  },
  showcase: {
    eyebrow: "Voorbeelden",
    h2: "Zo ziet het eruit.",
    intro: "Illustratieve demo's met fictieve gegevens. Elk voorbeeld laat zien wat binnenkomt, wat we voorbereiden en wat jullie team beslist.",
    cta: "Bekijk het voorbeeld",
  },
  aboutLine: { text: "Lead Velocity is opgericht door Bart Wilbrink.", link: "Over ons" },
```

`check-content.ts` scant `home` op vage woorden en "%". Deze teksten zijn schoon; controleer dat de check groen blijft.

- [ ] **Step 2: `FactTiles.tsx`**

```tsx
import { Reveal } from "./Reveal";

export function FactTiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((f, i) => (
        <Reveal key={f.label} delay={i * 0.05}>
          <div className="flex h-full flex-col items-center justify-center rounded-[24px] bg-lv-card px-8 py-12 text-center">
            <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-normal leading-none tracking-[-0.02em]">{f.value}</p>
            <p className="mt-4 max-w-[18rem] text-[15px] text-lv-muted">{f.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: `NumberedTabs.tsx`**

```tsx
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import { ExposureArt, type ExposureTone } from "./ExposureArt";
import { Pill } from "./Pill";
import { cn } from "@/lib/utils";

const TONE: Record<CategoryId, ExposureTone> = {
  groothandels: "ember",
  "importeurs-distributeurs": "moss",
  "service-onderhoud": "dusk",
  "maatwerk-montage": "sand",
};

export function NumberedTabs({ value, onChange, notes }: { value: CategoryId; onChange: (id: CategoryId) => void; notes: string[] }) {
  const active = categories.find((c) => c.id === value) ?? categories[0];
  return (
    <div className="grid gap-3 lg:grid-cols-[0.95fr_1.25fr]">
      <div className="flex flex-col gap-2" role="group" aria-label="Kies een aanvraagstroom">
        {categories.map((c, i) => {
          const on = c.id === active.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(c.id)}
              className={cn("rounded-[20px] px-6 py-5 text-left transition-colors", on ? "bg-lv-ink text-white" : "bg-lv-card text-lv-ink hover:bg-[#E3E7E5]")}
            >
              <span className="flex items-baseline gap-4">
                <span className={cn("font-mono text-[12px]", on ? "text-white/60" : "text-lv-muted")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-normal capitalize leading-tight">{c.heroNoun}</span>
              </span>
              {on && <span className="mt-2 block pl-9 text-[14.5px] leading-relaxed text-white/75">{c.sub}</span>}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        <ExposureArt tone={TONE[active.id]} className="min-h-[280px] flex-1 sm:min-h-[340px]">
          <div className="flex h-full min-h-[280px] flex-col justify-between p-5 sm:min-h-[340px] sm:p-6">
            <div className="flex justify-end"><Pill tone="dark">{active.name}</Pill></div>
            <ol className="flex flex-wrap items-center justify-center gap-2 px-2">
              {active.exampleFlow.slice(0, 4).map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <Pill tone="dark" dot>{s}</Pill>
                  {i < Math.min(active.exampleFlow.length, 4) - 1 && <span aria-hidden className="hidden h-px w-4 bg-white/40 sm:block" />}
                </li>
              ))}
            </ol>
            <div>
              <Link to={`/${active.id}`} className="inline-flex items-center gap-1.5 rounded-[10px] bg-black/45 px-3 py-2 text-[13.5px] text-white ring-1 ring-white/15 backdrop-blur hover:bg-black/60">
                Meer over {active.name.toLowerCase()} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </ExposureArt>
        <div className="grid gap-3 sm:grid-cols-3">
          {notes.map((n) => (
            <div key={n} className="flex items-start gap-2 rounded-[18px] bg-lv-card p-4 text-[14px] text-lv-body">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lv-lime ring-1 ring-black/10" />{n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: `TimelineTabs.tsx`**

```tsx
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimelineTabs({ steps, note }: { steps: { label: string; title: string; body: string; checks: string[] }[]; note?: string }) {
  const [i, setI] = useState(0);
  const s = steps[i];
  return (
    <div>
      <div role="tablist" aria-label="Werkwijze in stappen" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((st, k) => (
          <button
            key={st.title}
            role="tab"
            id={`tl-tab-${k}`}
            aria-selected={k === i}
            aria-controls="tl-panel"
            type="button"
            onClick={() => setI(k)}
            className={cn("rounded-[18px] px-5 pb-4 pt-4 text-left transition-colors", k === i ? "bg-[#E3E7E5]" : "bg-lv-card hover:bg-[#E3E7E5]")}
          >
            <span className="block text-[13px] text-lv-muted">{st.label}</span>
            <span className="mt-1 block font-display text-[21px] font-normal leading-tight">{st.title}</span>
            <span aria-hidden className="mt-4 block h-[3px] rounded-full bg-lv-line">
              <span className={cn("block h-full rounded-full bg-lv-ink transition-all duration-500 motion-reduce:transition-none", k === i ? "w-1/4" : k < i ? "w-full" : "w-0")} />
            </span>
          </button>
        ))}
      </div>
      <div id="tl-panel" role="tabpanel" aria-labelledby={`tl-tab-${i}`} className="mt-2 grid gap-8 rounded-[24px] bg-lv-card p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
        <div>
          <p className="font-mono text-[12px] text-lv-muted">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-3 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-normal leading-snug">{s.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.checks.map((c) => <li key={c} className="inline-flex items-center gap-2 rounded-[10px] bg-white px-3 py-1.5 text-[13.5px]"><Check aria-hidden className="h-3.5 w-3.5" />{c}</li>)}
          </ul>
        </div>
        {note && <p className="self-end text-[14px] leading-relaxed text-lv-muted">{note}</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: `MediaCard.tsx`**

```tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ExposureArt, type ExposureTone } from "./ExposureArt";
import { Pill } from "./Pill";

export function MediaCard({ tone, label, title, body, href, cta }: { tone: ExposureTone; label: string; title: string; body: string; href: string; cta: string }) {
  return (
    <Link to={href} className="group flex h-full flex-col gap-2">
      <ExposureArt tone={tone} className="h-[200px]">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex justify-end"><Pill tone="dark">{label}</Pill></div>
          <p className="text-center font-display text-[24px] font-normal text-white">{title}</p>
          <span />
        </div>
      </ExposureArt>
      <div className="flex flex-1 flex-col rounded-[20px] bg-lv-card p-5">
        <p className="text-[14.5px] leading-relaxed text-lv-body">{body}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium">{cta}<ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  );
}
```

Voeg de vier exports toe aan `index.ts`.

- [ ] **Step 6: Funnel-tests eerst**

Pas `scripts/e2e/funnel.mjs` aan. Behoud alle bestaande tests. Wijzig de test `homepage: qualifier, past-in-wat-je-hebt, zekerheden aanwezig` naar deze secties:
- "Voor wie dit werkt (en voor wie niet)"
- "Zo ziet het eruit."
- "Van eerste gesprek tot werkende oplossing."
- "Per aanvraagstroom één oplossing."

Voeg toe:

```js
await t("tabs 'wat we bouwen' en tijdlijn werken; geen nep-bewijs op home", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const tab = page.locator("[aria-label='Kies een aanvraagstroom'] button", { hasText: /servicemeldingen/i });
  await tab.click();
  expect(await tab.getAttribute("aria-pressed") === "true", "tab niet actief");
  expect((await page.locator("h1").textContent()).includes("Elke servicemelding compleet"), "hero volgt tab niet");
  const step3 = page.locator("[role=tab]", { hasText: "Inrichten en testen" });
  await step3.click();
  expect(await step3.getAttribute("aria-selected") === "true", "tijdlijnstap niet geselecteerd");
  const txt = (await page.evaluate(() => document.body.innerText)).toLowerCase();
  for (const bad of ["trusted by", "★", "case study", "klanten geholpen"]) expect(!txt.includes(bad), `nep-bewijs gevonden: ${bad}`);
});
```

Draai de funnel. Verwacht FAIL op de gewijzigde en de nieuwe test.

- [ ] **Step 7: `src/pages/site/Home.tsx` herschrijven**

Behoud de segment-logica:
- `initial` komt uit `parseCheckContext`;
- `const [segment, setSegment] = useState<CategoryId | undefined>(initial)`;
- `c`, `h1`, `sub`, `situations`, `demo` en `ctx(source)` blijven zoals nu.

Bouw de secties in deze volgorde:

1. **Hero, gecentreerd** (`text-center`, `max-w-4xl mx-auto`):
   - `Pill` met `home.hero.eyebrow`;
   - `<h1 className="mt-6 break-words font-display text-[clamp(2.5rem,6.4vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.02em]" aria-live="polite">{h1}</h1>`;
   - de sub in `text-[18px] text-lv-body max-w-2xl mx-auto`;
   - de `forWho`-regel klein;
   - twee knoppen naast elkaar (`ctaLabels.primary` via `ctx("home-hero")` en `home.hero.secondary` via `demoHref`), met daaronder één regel microcopy `home.hero.ctaMicro`;
   - de `SegmentPicker` gecentreerd (de buttons-wrapper krijgt `justify-center`; geef de component een prop `align="center"` of zet een wrapper-class).

   Daaronder een breed beeld: `ExposureArt tone="dusk" className="mx-auto mt-14 max-w-6xl"` met padding.
   - Linksboven `Pill tone="dark" dot` met "Illustratieve demo".
   - In het midden een witte kaart (`max-w-xl mx-auto`) met `<DemoStepper key={demo.id} demo={demo} source="home-hero" compact />`.
   - Rechtsonder `Pill tone="dark"` met "Jullie team beslist".
2. **Feittegels:** `Section` met `<FactTiles items={home.facts} />`.
3. **Herken je dit?:** `SectionHead align="center"` + 3 kaarten (`bg-lv-card rounded-[24px] p-7`, `li` als buitenste element, `Reveal` erin) + de `costLine` gecentreerd.
4. **Wat we bouwen:** `SectionHead align="center" eyebrow={home.build.eyebrow} title={home.build.h2}` + `<NumberedTabs value={segment ?? "groothandels"} onChange={setSegment} notes={home.build.notes} />`.
5. **Werkwijze:** `SectionHead align="center" eyebrow={home.timeline.eyebrow} title={home.timeline.h2}` + `<TimelineTabs steps={home.timeline.steps} note={home.timeline.note} />` + daaronder de CTA `ctx("home-how")`. Daaronder klein `home.howItWorks.aiNote` in een `rounded-[18px] bg-lv-card p-5`-blok.
6. **Zo ziet het eruit:** `SectionHead align="center"` (showcase) + een grid van 4 `MediaCard`'s. Gebruik daarvoor `demos`; de tint per categorie is dezelfde als in NumberedTabs. Zet de mapping `TONE` in `ExposureArt.tsx` als `export const CATEGORY_TONE` en importeer die in NumberedTabs en Home. Per kaart:
   - `label` = `categoryById(d.categoryId)!.name`;
   - `title` = `d.title`;
   - `body` = `d.prepared.summary`;
   - `href` = `demoHref(d.id, "home-showcase")`;
   - `cta` = `home.showcase.cta`.
7. **Past in wat je al hebt:** compact, 2 kolommen. Links `SectionHead` + punten, rechts de kaart "Wat we nodig hebben" in `bg-lv-card`.
8. **Prijzen:** `SectionHead align="center" title={home.trajectory.h2}` + `PricingCards` + link "Vergelijk de pakketten".
9. **Qualifier:** `SectionHead align="center"` + 2 kaarten (`bg-lv-card` / `bg-white ring-1 ring-lv-line`) + de `doubt`-regel gecentreerd in serif (`font-display text-[22px]`) + CTA.
10. **Zekerheden:** 4 tegels in `bg-lv-card` in een rij (`sm:grid-cols-2 lg:grid-cols-4`).
11. **FAQ:** `SectionHead align="center"` ("Vragen, beantwoord." met eyebrow "Veelgestelde vragen") + `Faq` in `max-w-3xl mx-auto`.
12. **Slot:** `ExposureArt tone="dusk" className="mx-auto max-w-6xl"` met gecentreerd:
    - de serif-H2 in wit `home.closing.h2`;
    - de body in `text-white/75`;
    - een witte knop (`variant="lime"`, nu wit) via `ctx("home-bottom")`;
    - microcopy `home.hero.ctaMicro` in `text-white/60`;
    - de regel "Of kies je situatie" met links naar de 4 categorieën.

    Direct daarboven één regel `home.aboutLine` met een link naar `/over`.

Gebruik geen `font-semibold` op serif-elementen. Zet overal `li` als buitenste element in lijsten.

- [ ] **Step 8: Checks, build, funnel (alles groen), screenshots**

Maak screenshots van `/` en `/?category=importeurs-distributeurs` op 1440 en 360 px, met viewport-scroll zodat `Reveal` zichtbaar is. Bekijk ze en herstel overflow of rommelige uitlijning.

- [ ] **Step 9: Commit.** Bericht: `Homepage in Orrin-stijl: hero met beeldvlak, feittegels, tabs, tijdlijn, voorbeelden`.

---

### Task 3: Gedeelde componenten en overige pagina's in de nieuwe stijl

**Files (modify):** `src/components/site/{PricingCards,ScopeTable,Faq,DemoStepper,CategoryCard,ProcessCard,HumanControl,Steps,CheckForm,CampaignHeader,SegmentPicker}.tsx`, `src/pages/site/*.tsx` (alleen class-wijzigingen en, bij CategoryPage, een beeldvlak), `src/components/BlogPost.tsx`, `src/components/PromptPackPage.tsx`, `src/pages/Inzichten.tsx` (alleen kop- en kaartclasses)

- [ ] **Step 1: Kaarten**
  - Wit met rand (`border border-lv-line bg-lv-surface rounded-3xl`) wordt `bg-lv-card rounded-[24px]` (zonder rand). Uitzondering: `bg-lv-ink`-kaarten (Werkstroom in `PricingCards`) blijven donker.
  - Gestippelde kaarten (Custom) worden `bg-white ring-1 ring-lv-line rounded-[24px]`.
- [ ] **Step 2: Typografie in alle site-componenten en pagina's**
  - `font-display` met `font-semibold` wordt `font-medium` voor titels ≤ 24px en `font-normal` voor koppen > 24px.
  - Bij `font-display` wordt `tracking-[-0.0Xem]` vervangen door `tracking-[-0.015em]`.
  - Gate (moet leeg zijn): `grep -rnE "font-display[^\"]*font-(semibold|bold)|font-(semibold|bold)[^\"]*font-display" src/pages/site src/components/site src/components/BlogPost.tsx src/components/PromptPackPage.tsx src/pages/Inzichten.tsx`.
- [ ] **Step 3: Knoppen en tabs**
  - `SegmentPicker`: knoppen `rounded-[10px]`; actief = `bg-lv-ink text-white`, inactief = `bg-lv-card`. Voeg de prop `align?: "left" | "center"` toe (`justify-center` op de wrapper). Home gebruikt `center`.
  - `DemoStepper`:
    - buitenkant `rounded-[24px] bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)]`, zonder rand;
    - de onderlijn van het actieve tabblad in `bg-lv-ink`;
    - een kleine lime stip voor het label "Illustratieve demo";
    - de knop "Bekijk …" `rounded-[10px]`.
- [ ] **Step 4: Faq** — de items krijgen `border-lv-line` en de vraag in `font-display text-[20px] font-normal`. Het antwoord blijft sans.
- [ ] **Step 5: CategoryPage** — onder de hero-CTA's een `ExposureArt` in de categorietint (`CATEGORY_TONE`, export uit Task 2) met de `exampleFlow`-pills, `className="mt-12"`, hoogte ~260px. Verwijder de oude rij met `exampleFlow`-chips in de sectie "Zo loopt een werkstroom" niet; die blijft als tekstuele variant staan.
- [ ] **Step 6: CampaignPage** — de hero-structuur blijft. Voeg hetzelfde `ExposureArt`-beeldvlak toe als bij CategoryPage, in de tint van de categorie van de campagne.
- [ ] **Step 7:** Draai checks, build en de funnel (alles groen). Maak screenshots van `/groothandels`, `/prijzen`, `/adviesgesprek`, `/voorbeelden`, `/werkwijze` en `/campagnes/aftersales` op 360 en 1440 px, en bekijk ze. Herstel wat lelijk of kapot is. Rapporteer wat je zag.
- [ ] **Step 8: Commit.** Bericht: `Overige pagina's en componenten in Orrin-stijl`.

---

### Task 4: Eindcontrole en documentatie

**Files:** `CLAUDE.md`, `docs/superpowers/2026-10-09-livegang.md`

- [ ] **Step 1:** Draai de volledige funnelcheck (N/N exact rapporteren) en alle checks.
- [ ] **Step 2:** Maak screenshots van alle hoofdpagina's op 360 en 1440 px, met viewport-scroll, en bekijk ze. Controleer:
  - er is geen horizontale scroll;
  - er staat geen lime-tekst op licht;
  - geen serif-kop rendert vet;
  - tekst op `lv-card` is goed leesbaar.
- [ ] **Step 3: CLAUDE.md** — in §7 de regel over de huisstijl vervangen door:
  - **Huisstijl (2026-10-12, Orrin-look):** Newsreader-serif voor koppen (400/500), Hanken Grotesk voor tekst, gebroken wit `lv-paper`, kaarten `lv-card`, zwarte knoppen `rounded-[10px]`, long-exposure-beeldvlakken via `ExposureArt` (tinten per categorie via `CATEGORY_TONE`), lime alleen als klein accent.
  - Geen nep-bewijs (logo's, sterren, cijfers, cases) — de spec van 2026-10-12.

  Pas ook de oudere "Huisstijl"-regel in §9 aan, zodat er geen tegenstrijdigheid blijft (papier/inkt/lime en Schibsted worden de Orrin-look).
- [ ] **Step 4: Livegang-doc** — vermeld onder "Open voor fase 2": "Claim-audit inzichten, daarna eventueel inzichten-kaarten terug op de homepage".
- [ ] **Step 5: Commit.** Bericht: `Docs: Orrin-huisstijl vastgelegd`.
