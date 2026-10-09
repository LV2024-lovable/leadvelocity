# Website volgens handover — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bouw fase 1 van leadvelocity.nl volgens de leidende handover: nieuwe positionering, 22 routes, centrale content-/prijsconfiguratie, gelabelde klikdemo's, een echte aanvraagflow en SEO-basis, met redirects voor alle oude routes.

**Architecture:** Alle copy, prijzen en ids staan getypeerd in `src/content/*`. Pagina's zijn dunne sjablonen in `src/pages/site/*` die gedeelde componenten uit `src/components/site/*` vullen met die content. De aanvraag loopt via een nieuwe Supabase Edge Function `werkstroomcheck` die opslaat in `werkstroomcheck_requests` en dan pas mailt. Tests zijn `tsx`-checkscripts (er is geen test-framework in deze repo) plus een Playwright-funnelcheck.

**Tech Stack:** Vite 5, React 18, TypeScript, React Router v6, Tailwind v3, shadcn/ui (bestaand), `react-helmet-async` (nieuw), zod + react-hook-form (bestaand), Supabase Edge Functions (Deno) + Resend (bestaand patroon), `tsx` voor scripts.

**Spec:** `docs/superpowers/specs/2026-10-09-website-handover-design.md` — argumenteert vanuit de leidende bron `docs/strategy/2026-10-09-website-gtm-handover.md` (hierna "handover §N"). Executors lezen beide waar een taak naar een paragraaf verwijst.

## Global Constraints

- De handover is leidend. Copy die in dit plan staat is letterlijk uit de handover of erbinnen geschreven; voeg geen eigen proposities, garanties, percentages, reviews, cases, logo's, teamgroottes of responstijden toe.
- Prijzen (handover §6): Voorbereiden €2.950 setup / €595 p.m. · Werkstroom €4.950 / €1.250 · Opschalen €7.950 / €1.950 · Custom €12.500 / €2.500 · beheer-uren 0,5 / 1 / 2 · analyse €750, verrekenbaar binnen 60 dagen. Alleen gedefinieerd in `src/content/pricing.ts`; geen euro-literal in `src/pages/site/**` of `src/components/site/**`.
- Badge op Werkstroom: "Aanbevolen start". Nooit "meest gekozen".
- Op de site: "We leggen vooraf vast wat wordt opgeleverd en wanneer de maanddienst start." Geen garantie, geen "geld terug".
- Hoofdknop overal: "Plan een werkstroomcheck" → `/werkstroomcheck?source=header` (header). Alle check-URL's worden gebouwd via `checkHref()` uit `src/lib/cta.ts`.
- Merknaam in copy: "Lead Velocity". Bart Wilbrink alleen genoemd op `/over` en in de Over-sectie van de homepage.
- Visueel: papier `#F6F5F0`, inkt `#0E0E0C`, lime `#C8FF00` alleen als vlak (met inkt-tekst) of decoratief detail; lime-tekst op licht is verboden — gebruik `lv-lime-ink` `#4D6B00`. Geen glow-blobs, geen netwerkanimaties, geen `BorderBeam`/`AnimatedBeam`. Fonts: Schibsted Grotesk (koppen), Hanken Grotesk (tekst), JetBrains Mono (labels/cijfers). Font-weight nooit 800.
- Scroll-animaties via de bestaande `useReveal`-hook (CLAUDE.md §7), niet via `motion`.
- Mobiel: geen horizontale scroll op 360 px; tabellen in een `overflow-x-auto` container met `aria-label`.
- Commit per taak alleen de genoemde bestanden (`git add <pad>`), nooit `git add -A`/`.`. Commit-message eindigt met een lege regel en `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Raak `.env`, `bun.lockb`, `data/prospects/*`, `scripts/seed-lead-os.ts` en de ongecommitte capisoft-docs niet aan.
- Edge Function en migratie worden geschreven en gecommit, **niet gedeployed** (deploy = livegang-afhankelijkheid, met akkoord van Bart).
- Elke taak eindigt met `npm run build` (moet slagen) en `npx tsx scripts/check-content.ts` (vanaf Task 2; moet ✓ geven).

## Review Focus

1. **Contextparameters met onbekende waarde** (`/werkstroomcheck?category=hacker&package=gratis`) — verwacht: onbekende waarden worden genegeerd, formulier laadt zonder prefill voor dat veld, geen crash. Test in Task 3 (`check-lib.ts`) en Task 12 (e2e).
2. **Dubbel indienen** (dubbelklik / opnieuw na netwerkfout) — verwacht: knop disabled tijdens verzenden; server dedupliceert op `request_id`; maximaal één mail. Test in Task 10 (functie-unit) en Task 12 (e2e).
3. **"Bel mij" zonder telefoonnummer** — verwacht: veldfout bij telefoon, geen verzending. Test in Task 10 (schema-check) en Task 12.
4. **Serverfout of netwerkfout bij verzenden** — verwacht: invoer blijft staan, foutmelding uit handover §13, retry mogelijk, geen navigatie naar `/bedankt`. Test in Task 12 (gestubde 500).
5. **Oude URL's uit outreach en Google** (`/groothandel`, `/ai-kansenscan`, `/oplossingen/chatbots`) — verwacht: landt op de inhoudelijk passende nieuwe route, nooit op 404 of blind op `/`. Test in Task 11 (`check-redirects`) en Task 12.

---

## File Structure

| Pad | Actie | Verantwoordelijkheid |
|---|---|---|
| `tailwind.config.ts` | Modify | `lv`-palet vervangen door licht palet; fonts |
| `src/index.css` | Modify | lichte basis, shadcn-variabelen licht, verwijderen glow-utilities |
| `index.html` | Modify | fonts, default title/meta |
| `src/main.tsx` | Modify | `HelmetProvider` |
| `src/content/types.ts` | Create | alle id-unions en content-types |
| `src/content/pricing.ts` | Create | pakketten, analyse, beheer, microcopy, `formatEuro` |
| `src/content/site.ts` | Create | merk, contact, nav, footer, procesopties, indexeerbare routes |
| `src/content/faq.ts` | Create | FAQ §16 |
| `src/content/demos.ts` | Create | 4 demo's §14 |
| `src/content/categories.ts` | Create | 4 categorieën §9 |
| `src/content/processes.ts` | Create | 4 procesfamilies §10 |
| `src/content/campaigns.ts` | Create | 4 campagnes §11 |
| `src/content/pages.ts` | Create | copy homepage §8, prijzen/werkwijze/over/voor-wie/oplossingen §15/§10, check/bedankt §13 |
| `src/content/privacy.ts` | Create | concept-privacytekst |
| `src/content/redirects.ts` | Create | oud → nieuw |
| `src/content/index.ts` | Create | barrel + lookups |
| `scripts/check-content.ts` | Create | content-/prijs-/tone-checks (test) |
| `src/lib/cta.ts`, `src/lib/utm.ts`, `src/lib/track.ts` | Create | CTA-URL's, UTM-opslag, tracking-no-op |
| `scripts/check-lib.ts` | Create | tests voor `cta.ts` |
| `src/components/site/*` | Create | gedeelde componenten |
| `src/pages/site/*` | Create | pagina-sjablonen |
| `supabase/functions/werkstroomcheck/{index.ts,schema.ts}` | Create | Edge Function |
| `supabase/migrations/20261009120000_werkstroomcheck_requests.sql` | Create | tabel |
| `supabase/config.toml` | Modify | `verify_jwt = false` voor de functie |
| `scripts/check-werkstroomcheck-schema.ts` | Create | test voor gedeeld schema |
| `src/App.tsx` | Modify | routes, redirects |
| `scripts/generate-sitemap.ts`, `public/sitemap.xml`, `public/robots.txt` | Create/Modify | sitemap |
| `scripts/check-redirects.ts` | Create | test redirects ↔ routes |
| `scripts/e2e/funnel.mjs` | Create | Playwright-funnelcheck |
| `docs/superpowers/2026-10-09-livegang.md` | Create | afhankelijkhedenoverzicht |
| `CLAUDE.md` | Modify | naar handover |
| oude pagina's/componenten/data | Delete | zie Task 11 |

---

### Task 1: Huisstijl-fundament, dependencies en prototype opruimen

**Files:**
- Modify: `tailwind.config.ts`, `src/index.css`, `index.html`, `src/main.tsx`, `package.json`, `package-lock.json`, `components.json`
- Delete (untracked prototype): `src/pages/Preview.tsx`, `src/components/preview/`, `src/components/ui/animated-beam.tsx`, `src/components/ui/border-beam.tsx`, `src/components/ui/sticky-scroll-reveal.tsx`
- Restore: `src/App.tsx` (verwijder de ongecommitte `/preview`-route)
- Modify (token-migratie): alle `src/**/*.tsx` die oude `lv-*`-klassen gebruiken

**Interfaces:**
- Produces: Tailwind-kleuren `lv-paper`, `lv-surface`, `lv-raised`, `lv-ink`, `lv-body`, `lv-muted`, `lv-faint`, `lv-line`, `lv-line-soft`, `lv-lime`, `lv-lime-soft`, `lv-lime-ink`; fontfamilies `font-display`, `font-body`, `font-mono`; `HelmetProvider` rond `<App/>`.

- [ ] **Step 1: Ruim het prototype op en zet App.tsx terug**

```bash
cd /Users/bartwilbrink/leadvelocity
git checkout src/App.tsx
rm -rf src/pages/Preview.tsx src/components/preview src/components/ui/animated-beam.tsx src/components/ui/border-beam.tsx src/components/ui/sticky-scroll-reveal.tsx
npm uninstall motion
npm install react-helmet-async@^2.0.5
```

`src/components/ui/grid-pattern.tsx` blijft (untracked) — Task 3 gebruikt en commit hem.

- [ ] **Step 2: Vervang het `lv`-palet en de fonts in `tailwind.config.ts`**

Vervang in `theme.extend.fontFamily` en het `lv:`-object in `theme.extend.colors` door:

```ts
			fontFamily: {
				display: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
				body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
			},
```

```ts
				// Lead Velocity — licht palet (handover §17). Lime alleen als vlak; tekst-accent = lime-ink.
				lv: {
					paper: '#F6F5F0',
					surface: '#FFFFFF',
					raised: '#FBFBF8',
					ink: '#0E0E0C',
					body: '#55544E',
					muted: '#6B6A63',
					faint: '#8A8981',
					line: '#E4E2DA',
					'line-soft': '#EEEDE6',
					lime: '#C8FF00',
					'lime-soft': '#F1FFC2',
					'lime-ink': '#4D6B00',
				},
```

- [ ] **Step 3: Herschrijf de basis in `src/index.css`**

Vervang alles vóór `@layer utilities {` door:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* shadcn/ui-variabelen — licht, afgeleid van het lv-palet */
    --background: 50 20% 95%;
    --foreground: 60 8% 5%;
    --card: 0 0% 100%;
    --card-foreground: 60 8% 5%;
    --popover: 0 0% 100%;
    --popover-foreground: 60 8% 5%;
    --primary: 60 8% 5%;
    --primary-foreground: 50 20% 95%;
    --secondary: 48 14% 92%;
    --secondary-foreground: 60 8% 5%;
    --muted: 48 14% 92%;
    --muted-foreground: 50 5% 40%;
    --accent: 75 100% 50%;
    --accent-foreground: 60 8% 5%;
    --destructive: 0 72% 42%;
    --destructive-foreground: 0 0% 100%;
    --border: 46 13% 87%;
    --input: 46 13% 87%;
    --ring: 60 8% 5%;
    --radius: 0.75rem;
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-lv-paper font-body text-lv-ink antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-semibold;
    letter-spacing: -0.03em;
    line-height: 1.08;
  }

  ::selection {
    @apply bg-lv-lime text-lv-ink;
  }

  :focus-visible {
    @apply outline-none ring-2 ring-lv-ink ring-offset-2 ring-offset-lv-paper;
  }
}
```

Verwijder daarna binnen `@layer utilities` de blokken `.grain`, `.glow-accent`, `.glow-accent-subtle`, `.text-gradient-accent`, `.border-glow`, `.dot-pattern`, en onderaan de `@keyframes pulse-glow`. Laat `.reveal`, `.reveal.visible`, de reduced-motion-regel, `.stagger-*`, `.hover-lift`, `.section-padding` en de overige keyframes staan.

- [ ] **Step 4: Fonts en default-meta in `index.html`**

Vervang de fontregel (`Syne...`) en het commentaar erboven door:

```html
    <!-- Fonts: Schibsted Grotesk (koppen) + Hanken Grotesk (tekst) + JetBrains Mono (labels) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Vervang in `index.html` elke voorkomende `Leadvelocity — Jouw AI operations partner` door `Lead Velocity — Minder uitzoekwerk. Meer werk gedaan.` en elke description-content (`<meta name="description"`, `og:description`, `twitter:description`) door `Wij automatiseren terugkerend werk rond aanvragen, klantcommunicatie en opvolging. Ingericht op jullie werkwijze, met jullie team in controle.` Zet `og:site_name` op `Lead Velocity`.

- [ ] **Step 5: `HelmetProvider` in `src/main.tsx`**

```tsx
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

- [ ] **Step 6: Migreer oude token-klassen in alle bronbestanden**

Run (perl, volgorde is belangrijk — langste eerst):

```bash
cd /Users/bartwilbrink/leadvelocity
grep -rlE "lv-(text|accent|border|surface-raised|ink|white|light)" src --include=*.tsx --include=*.ts | xargs perl -pi -e '
s/lv-text-subtle/lv-faint/g;
s/lv-text-muted/lv-body/g;
s/text-lv-text\b/text-lv-ink/g;
s/bg-lv-text\b/bg-lv-ink/g;
s/(text|hover:text|group-hover:text|placeholder:text)-lv-accent(\/\d+)?/$1-lv-lime-ink$2/g;
s/bg-lv-accent\/(5|10|15)\b/bg-lv-lime-soft/g;
s/lv-accent-dim/lv-lime-soft/g;
s/(bg|hover:bg|from|to|via|fill|stroke)-lv-accent/$1-lv-lime/g;
s/(border|hover:border|focus:border|group-hover:border|ring|focus:ring)-lv-accent/$1-lv-lime-ink/g;
s/lv-border-subtle/lv-line-soft/g;
s/lv-border\b/lv-line/g;
s/lv-surface-raised/lv-raised/g;
s/bg-lv-ink\b/bg-lv-paper/g;
s/lv-light-bg/lv-paper/g;
s/lv-light-surface/lv-surface/g;
s/lv-white/lv-surface/g;
'
```

Let op: `text-lv-ink` (inkt-tekst op lime-knoppen) blijft bewust `text-lv-ink`; alleen `bg-lv-ink` (oude donkere paginaachtergrond) wordt `bg-lv-paper`.

- [ ] **Step 7: Verifieer dat er geen oude tokens meer zijn**

Run: `grep -rnoE "lv-(text|accent|border|surface-raised|white|light-bg|light-surface)[a-z-]*" src | head`
Expected: geen output.

Run: `grep -rnoE "font-(syne|instrument)|'Syne'|Instrument Sans" src index.html | head`
Expected: geen output (verwijder eventuele treffers in `src/**` door `font-display`/`font-body` te gebruiken).

- [ ] **Step 8: Build**

Run: `npm run build`
Expected: `✓ built in …`, geen errors.

- [ ] **Step 9: Commit**

```bash
git add tailwind.config.ts src/index.css index.html src/main.tsx package.json package-lock.json components.json
git add -u src
git commit -m "Huisstijl-fundament: licht lv-palet, nieuwe fonts, HelmetProvider, prototype weg

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(`git add -u src` staget alleen al-getrackte gewijzigde bestanden onder `src`, d.w.z. de token-migratie; untracked bestanden blijven buiten de commit. `package.json` bevat ook Barts eerder openstaande dependency-wijzigingen — `tsx`, `@types/papaparse`, `shadcn`, het `seed:lead-os`-script; dat is met hem afgestemd.)

---

### Task 2: Centrale content-configuratie + check-content

**Files:**
- Create: `src/content/types.ts`, `pricing.ts`, `site.ts`, `faq.ts`, `demos.ts`, `categories.ts`, `processes.ts`, `campaigns.ts`, `pages.ts`, `privacy.ts`, `redirects.ts`, `index.ts`
- Create: `scripts/check-content.ts`

**Interfaces:**
- Produces (alle latere taken gebruiken deze exacte namen):
  - types: `CategoryId`, `ProcessKey`, `ProcessFamilyId`, `CtaProcess`, `PackageId`, `DemoId`, `CampaignId`, `FaqId`, `Evidence`, `Package`, `Category`, `ProcessFamily`, `Demo`, `DemoField`, `Campaign`, `FaqItem`
  - `pricing.ts`: `packages: Package[]`, `standardPackages` (zonder custom), `customPackage`, `analysis`, `managementIncludes: string[]`, `costMicrocopy`, `scopeLine`, `formatEuro(n: number): string`
  - `site.ts`: `brand`, `contact`, `mainNav`, `footerNav`, `processOptions`, `frequencyOptions`, `categoryOptions`, `indexableRoutes: string[]`, `SITE_URL`
  - `faq.ts`: `faqs: FaqItem[]`, `faqById(id: FaqId): FaqItem`
  - `demos.ts`: `demos: Demo[]`, `demoById(id)`, `DEMO_CLOSING`, `DEMO_LABEL`
  - `categories.ts`: `categories: Category[]`, `categoryById(id)`, `GENERIC_NOT_FIT: string[]`
  - `processes.ts`: `processes: ProcessFamily[]`, `processById(id)`
  - `campaigns.ts`: `campaigns: Campaign[]`, `campaignById(id)`
  - `pages.ts`: `home`, `voorWie`, `oplossingenIndex`, `prijzenPage`, `werkwijze`, `over`, `checkPage`, `bedanktPage`
  - `privacy.ts`: `privacy`
  - `redirects.ts`: `redirects: { from: string; to: string }[]`
  - `index.ts`: re-export van alles hierboven

- [ ] **Step 1: Schrijf de check (de test) — `scripts/check-content.ts`**

```ts
/**
 * Content-check — draait als test. Run: npx tsx scripts/check-content.ts
 * Bron: docs/strategy/2026-10-09-website-gtm-handover.md (§6, §11, §14, §16, §18)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  packages, analysis, formatEuro, categories, processes, demos, campaigns, faqs,
  demoById, processById, categoryById, DEMO_CLOSING, redirects,
} from "../src/content";
import * as content from "../src/content";

const fouten: string[] = [];
const check = (ok: boolean, m: string) => { if (!ok) fouten.push(m); };

// --- prijzen (§6) ---
const verwacht: Record<string, [number, number, number | undefined]> = {
  voorbereiden: [2950, 595, 0.5],
  werkstroom: [4950, 1250, 1],
  opschalen: [7950, 1950, 2],
  custom: [12500, 2500, undefined],
};
check(packages.map((p) => p.id).join(",") === "voorbereiden,werkstroom,opschalen,custom", "pakketvolgorde onjuist");
for (const p of packages) {
  const [s, m, u] = verwacht[p.id];
  check(p.setupFrom === s, `${p.id}: setupFrom ${p.setupFrom} ≠ ${s}`);
  check(p.monthlyFrom === m, `${p.id}: monthlyFrom ${p.monthlyFrom} ≠ ${m}`);
  check(p.changeHoursPerMonth === u, `${p.id}: changeHoursPerMonth ${p.changeHoursPerMonth} ≠ ${u}`);
}
check(packages.find((p) => p.id === "werkstroom")?.badge === "Aanbevolen start", "Werkstroom mist badge 'Aanbevolen start'");
check(packages.filter((p) => p.badge).length === 1, "precies één pakket mag een badge hebben");
check(analysis.price === 750 && analysis.creditDays === 60, "analyse moet €750 / 60 dagen zijn");
check(formatEuro(12500) === "€12.500" && formatEuro(595) === "€595", "formatEuro onjuist");

// --- aantallen en verwijzingen ---
check(categories.length === 4 && processes.length === 4 && demos.length === 4 && campaigns.length === 4, "verwacht 4×4 categorieën/processen/demo's/campagnes");
for (const c of categories) {
  check(!!demoById(c.demoId), `categorie ${c.id}: demo ${c.demoId} bestaat niet`);
  check(c.tasks.length >= 4 && c.limits.length >= 1 && c.measures.length >= 2, `categorie ${c.id}: taken/grenzen/meet onvolledig`);
  check(c.seoTitle.endsWith("| Lead Velocity"), `categorie ${c.id}: seoTitle eindigt niet op '| Lead Velocity'`);
}
for (const p of processes) {
  check(p.categoryIds.length === 2, `proces ${p.id}: verwacht 2 categorievoorbeelden`);
  p.categoryIds.forEach((id) => check(!!categoryById(id), `proces ${p.id}: onbekende categorie ${id}`));
}
for (const c of campaigns) {
  check(c.noindex === true, `campagne ${c.id}: noindex moet true zijn`);
  check(!!demoById(c.demoId) && !!categoryById(c.categoryId), `campagne ${c.id}: demo/categorie bestaat niet`);
  check(c.tasks.length === 3, `campagne ${c.id}: precies 3 taken`);
}
for (const d of demos) {
  check(d.evidence === "illustrative", `demo ${d.id}: evidence moet 'illustrative' zijn`);
  check(d.input.fields.some((f) => f.value === null), `demo ${d.id}: moet een ontbrekend veld hebben`);
}
check(DEMO_CLOSING === "Dit voorbeeld laat de werkwijze zien. De inrichting en uitkomst hangen af van jullie proces en gegevens.", "DEMO_CLOSING wijkt af van §14");
check(faqs.length === 9, `verwacht 9 FAQ-items (§16), kreeg ${faqs.length}`);
check(processById("commerciele-voorbereiding")?.ctaProcess === "sales", "commerciële voorbereiding moet ctaProcess 'sales' hebben");

// --- tone (§3, §6) over ALLE strings in src/content ---
const verboden = [
  /digitale transformatie/i, /\brevolutie/i, /toekomstbestendig/i, /growth engine/i, /eindeloze mogelijkheden/i,
  /meest gekozen/i, /gegarandeerd/i, /geld terug/i, /niet tevreden/i, /\d+\s?%/, /\bsaai\b/i, /oudbollig/i,
  /volledig autonoom/i, /AVG-proof/i,
];
const strings: { pad: string; s: string }[] = [];
const walk = (v: unknown, pad: string) => {
  if (typeof v === "string") strings.push({ pad, s: v });
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${pad}[${i}]`));
  else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walk(x, `${pad}.${k}`));
};
Object.entries(content).forEach(([k, v]) => { if (typeof v !== "function") walk(v, k); });
for (const { pad, s } of strings) for (const re of verboden) check(!re.test(s), `${pad}: verboden patroon ${re} in "${s.slice(0, 80)}"`);
check(!strings.some(({ pad, s }) => /Bart/.test(s) && !/^(over|home\.about)/.test(pad)), "naam 'Bart' alleen in over.* en home.about.*");

// --- geen euro-literals buiten src/content ---
const scan = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? scan(p) : /\.tsx?$/.test(f) ? [p] : [];
  });
for (const dir of ["src/pages/site", "src/components/site"]) {
  let files: string[] = [];
  try { files = scan(dir); } catch { continue; }
  for (const f of files) check(!/€\s?\d/.test(readFileSync(f, "utf8")), `${f}: euro-literal gevonden — prijzen alleen uit src/content/pricing.ts`);
}

// --- CLAUDE.md noemt dezelfde prijzen (vanaf Task 11 verplicht) ---
const claude = readFileSync("CLAUDE.md", "utf8");
if (claude.includes("Minder uitzoekwerk")) {
  for (const p of packages) {
    check(claude.includes(`${p.name} — ${formatEuro(p.setupFrom)} + ${formatEuro(p.monthlyFrom)}`), `CLAUDE.md mist "${p.name} — ${formatEuro(p.setupFrom)} + ${formatEuro(p.monthlyFrom)}"`);
  }
}

// --- redirects ---
check(redirects.every((r) => r.from !== r.to && r.to.startsWith("/")), "redirect met lege of identieke bestemming");
check(!redirects.some((r) => r.to === "/"), "geen blinde redirect naar /");

if (fouten.length) { console.error(`✗ ${fouten.length} fout(en):\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ content klopt met de handover");
```

- [ ] **Step 2: Run, zie hem falen**

Run: `npx tsx scripts/check-content.ts`
Expected: FAIL — `Cannot find module '../src/content'`.

- [ ] **Step 3: `src/content/types.ts`**

```ts
export type CategoryId = "groothandels" | "importeurs-distributeurs" | "service-onderhoud" | "maatwerk-montage";
export type ProcessKey = "offerte-intake" | "aftersales" | "service-intake" | "project-intake";
export type ProcessFamilyId = "aanvragen-dossiers" | "communicatie-opvolging" | "data-inzicht" | "commerciele-voorbereiding";
export type CtaProcess = ProcessKey | "intake" | "opvolging" | "data" | "sales";
export type PackageId = "voorbereiden" | "werkstroom" | "opschalen" | "custom";
export type DemoId = ProcessKey;
export type CampaignId = ProcessKey;
export type FaqId =
  | "software" | "zelfstandig" | "oplevert" | "kosten" | "maandelijks"
  | "uitbreiden" | "whatsapp" | "loont" | "veilig";
export type Evidence = "illustrative" | "verified" | "planned";

export type Package = {
  id: PackageId;
  name: string;
  setupFrom: number;
  monthlyFrom: number;
  promise: string;
  includes: string[];
  notIncluded: string[];
  changeHoursPerMonth?: number;
  badge?: "Aanbevolen start";
  ctaLabel: string;
};

export type Category = {
  id: CategoryId;
  name: string;
  cardLine: string;
  cardCta: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  sub: string;
  primaryCta: string;
  secondaryCta: string;
  processKey: ProcessKey;
  demoId: DemoId;
  tasks: string[];
  exampleFlow: string[];
  teamDecides: string;
  limits: string[];
  subsegments: string[];
  fit: string[];
  measures: string[];
  faqIds: FaqId[];
};

export type ProcessFamily = {
  id: ProcessFamilyId;
  name: string;
  cardLine: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  situation: string;
  input: string;
  output: string;
  modules: string[];
  result: string;
  humanLimit: string;
  neededInput: string[];
  categoryIds: [CategoryId, CategoryId];
  ctaProcess: CtaProcess;
  ctaLabel: string;
  demoId?: DemoId;
  extraBlock?: { title: string; body: string };
};

export type DemoField = { label: string; value: string | null };

export type Demo = {
  id: DemoId;
  title: string;
  categoryId: CategoryId;
  input: { channel: string; from: string; subject: string; body: string; fields: DemoField[] };
  prepared: { summary: string; present: string[]; missing: string[]; source?: string };
  next: { conceptTitle: string; concept: string; status: string; teamDecides: string };
  evidence: Evidence;
};

export type Campaign = {
  id: CampaignId;
  categoryId: CategoryId;
  demoId: DemoId;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  sub: string;
  primaryLabel: string;
  message: string;
  tasks: [string, string, string];
  faqIds: FaqId[];
  noindex: true;
};

export type FaqItem = { id: FaqId; q: string; a: string };
```

- [ ] **Step 4: `src/content/pricing.ts`** (handover §6)

```ts
import type { Package } from "./types";

/** "€12.500" — NL-notatie, geen decimalen. */
export function formatEuro(bedrag: number): string {
  return "€" + String(Math.round(bedrag)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const packages: Package[] = [
  {
    id: "voorbereiden",
    name: "Voorbereiden",
    setupFrom: 2950,
    monthlyFrom: 595,
    promise: "Relevante informatie en conceptacties klaarzetten voor je team.",
    includes: [
      "Eén bestaand templateproces",
      "Eén invoerkanaal en één team",
      "Informatie structureren en ontbrekende gegevens markeren",
      "Conceptactie met medewerkerreview",
      "Resultaatrapport",
    ],
    notIncluded: ["Nieuwe complexe connectoren"],
    changeHoursPerMonth: 0.5,
    ctaLabel: "Bespreek Voorbereiden",
  },
  {
    id: "werkstroom",
    name: "Werkstroom",
    setupFrom: 4950,
    monthlyFrom: 1250,
    promise: "Eén proces van intake tot afgesproken opvolging inrichten en beheren.",
    includes: [
      "Eén proces en één team",
      "Intake en compleetheid",
      "Relevante bronnen",
      "Conceptcommunicatie met review",
      "Status en afgesproken opvolging",
    ],
    notIncluded: ["Automatische externe acties zonder afgesproken test en autorisatie"],
    changeHoursPerMonth: 1,
    badge: "Aanbevolen start",
    ctaLabel: "Bespreek Werkstroom",
  },
  {
    id: "opschalen",
    name: "Opschalen",
    setupFrom: 7950,
    monthlyFrom: 1950,
    promise: "Een bewezen werkstroom uitbreiden naar meer volume, kanalen of teams.",
    includes: [
      "Dezelfde bewezen werkstroom met extra capaciteit",
      "Twee afgesproken kanalen of teams",
      "Uitgebreidere overdracht en rapportage",
    ],
    notIncluded: ["Drie nieuwe maatwerkprocessen"],
    changeHoursPerMonth: 2,
    ctaLabel: "Bespreek Opschalen",
  },
  {
    id: "custom",
    name: "Custom",
    setupFrom: 12500,
    monthlyFrom: 2500,
    promise: "Meerdere processen of bijzondere koppelingen op een afgestemd ontwerp.",
    includes: [
      "Betaald ontwerp",
      "Meerdere processen",
      "Bijzondere organisatie- of systeemvereisten",
    ],
    notIncluded: ["Automatisch inbegrepen 24/7 SLA, SSO of onbeperkte integraties"],
    ctaLabel: "Bespreek maatwerk",
  },
];

export const standardPackages = packages.filter((p) => p.id !== "custom");
export const customPackage = packages.find((p) => p.id === "custom")!;

export const analysis = {
  price: 750,
  creditDays: 60,
  includes: ["Proceskaart", "Nulmeting", "Input- en toegangscheck", "Businesscase", "Acceptatiecriteria"],
};

export const managementIncludes = [
  "Monitoring",
  "Incidentafhandeling",
  "Bronupdates",
  "Rapportage",
  "Support tijdens kantooruren",
  "Kleine instellingenwijzigingen binnen het afgesproken budget, zonder rollover",
];

export const costMicrocopy =
  "Prijzen vanaf, exclusief btw. Volume, koppelingen en verbruik leggen we vooraf vast. Bestaande softwarelicenties en bijzondere data- of berichtkosten kunnen aanvullend zijn.";

export const scopeLine = "We leggen vooraf vast wat wordt opgeleverd en wanneer de maanddienst start.";

export const extraWork = "Nieuwe processen en connectorontwikkeling zijn meerwerk.";
```

- [ ] **Step 5: `src/content/site.ts`**

```ts
import type { CategoryId, CtaProcess } from "./types";

export const SITE_URL = "https://www.leadvelocity.nl";

export const brand = {
  name: "Lead Velocity",
  tagline: "Minder uitzoekwerk. Meer werk gedaan.",
};

/** Contactgegevens uit de bestaande site — bevestiging door Bart is een livegang-afhankelijkheid. */
export const contact = {
  email: "info@leadvelocity.nl",
  phone: "+31 6 25 47 15 28",
  phoneHref: "tel:+31625471528",
  linkedin: "https://www.linkedin.com/company/leadvelocity-2/",
  calendarUrl: null as string | null,
};

export const mainNav = [
  { label: "Voor wie", href: "/voor-wie" },
  { label: "Oplossingen", href: "/oplossingen" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Voorbeelden", href: "/voorbeelden" },
  { label: "Prijzen", href: "/prijzen" },
];

export const footerNav = [
  {
    title: "Voor wie",
    links: [
      { label: "Technische groothandels", href: "/groothandels" },
      { label: "Importeurs en distributeurs", href: "/importeurs-distributeurs" },
      { label: "Service en onderhoud", href: "/service-onderhoud" },
      { label: "Maatwerk en montage", href: "/maatwerk-montage" },
    ],
  },
  {
    title: "Oplossingen",
    links: [
      { label: "Aanvragen en dossiers", href: "/oplossingen/aanvragen-dossiers" },
      { label: "Communicatie en opvolging", href: "/oplossingen/communicatie-opvolging" },
      { label: "Data en inzicht", href: "/oplossingen/data-inzicht" },
      { label: "Commerciële voorbereiding", href: "/oplossingen/commerciele-voorbereiding" },
    ],
  },
  {
    title: "Lead Velocity",
    links: [
      { label: "Werkwijze", href: "/werkwijze" },
      { label: "Prijzen", href: "/prijzen" },
      { label: "Voorbeelden", href: "/voorbeelden" },
      { label: "Inzichten", href: "/inzichten" },
      { label: "Over", href: "/over" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export const categoryOptions: { value: CategoryId | "anders"; label: string }[] = [
  { value: "groothandels", label: "Technische groothandel" },
  { value: "importeurs-distributeurs", label: "Importeur of distributeur" },
  { value: "service-onderhoud", label: "Service en onderhoud" },
  { value: "maatwerk-montage", label: "Maatwerk en montage" },
  { value: "anders", label: "Ander bedrijfstype" },
];

export const processOptions: { value: CtaProcess | "anders"; label: string }[] = [
  { value: "offerte-intake", label: "Offerteaanvragen voorbereiden" },
  { value: "aftersales", label: "Garantie- en aftersalesclaims" },
  { value: "service-intake", label: "Servicemeldingen" },
  { value: "project-intake", label: "Projectaanvragen" },
  { value: "intake", label: "Aanvragen en dossiers" },
  { value: "opvolging", label: "Communicatie en opvolging" },
  { value: "data", label: "Data en inzicht" },
  { value: "sales", label: "Commerciële voorbereiding" },
  { value: "anders", label: "Iets anders" },
];

export const frequencyOptions = [
  { value: "dagelijks", label: "Dagelijks" },
  { value: "wekelijks", label: "Wekelijks" },
  { value: "minder-vaak", label: "Minder vaak" },
  { value: "onbekend", label: "Weet ik niet" },
] as const;

/** Voor de sitemap — alleen publiceerbare, indexeerbare pagina's. */
export const indexableRoutes = [
  "/", "/voor-wie", "/groothandels", "/importeurs-distributeurs", "/service-onderhoud", "/maatwerk-montage",
  "/oplossingen", "/oplossingen/aanvragen-dossiers", "/oplossingen/communicatie-opvolging",
  "/oplossingen/data-inzicht", "/oplossingen/commerciele-voorbereiding",
  "/werkwijze", "/prijzen", "/voorbeelden", "/over", "/werkstroomcheck", "/privacy",
  "/inzichten",
  "/inzichten/ai-in-nederlandse-technische-groothandel-2026",
  "/inzichten/ai-pricing-voor-groothandel",
  "/inzichten/ai-voor-nederlandse-maakindustrie-oee",
  "/inzichten/predictive-maintenance-machinebouw",
  "/inzichten/vrachtwagenheffing-2026-ai-compensatie",
  "/inzichten/csrd-scope-3-automatisering-transport",
  "/whitepapers/ai-in-technische-groothandel-2026",
  "/whitepapers/ai-voor-nederlandse-maakindustrie-2026",
  "/whitepapers/ai-voor-nederlandse-transport-2026",
  "/bronnen/prompts/groothandel-2026",
  "/bronnen/prompts/maakindustrie-2026",
  "/bronnen/prompts/transport-2026",
];
```

- [ ] **Step 6: `src/content/faq.ts`** (handover §16, letterlijk)

```ts
import type { FaqId, FaqItem } from "./types";

export const faqs: FaqItem[] = [
  { id: "software", q: "Moeten we onze software vervangen?", a: "We kijken eerst wat jullie huidige software kan en waar nog handwerk overblijft. Een werkstroom kan ernaast worden ingericht als de benodigde gegevens en koppelingen beschikbaar zijn." },
  { id: "zelfstandig", q: "Wat doet het systeem zelfstandig?", a: "Dat leggen we per proces vast. We beginnen met voorbereiding en medewerkercontrole. Alleen afgesproken, geteste handelingen worden later automatisch uitgevoerd." },
  { id: "oplevert", q: "Hoe weten we of het genoeg oplevert?", a: "We meten de huidige behandeltijd en toetsen met representatieve voorbeelden. Controle, correcties en uitzonderingen tellen mee in de netto uitkomst." },
  { id: "kosten", q: "Wat kost de eerste stap?", a: "De werkstroomcheck is kosteloos. Als er voldoende aanleiding is, volgt een analyse van €750. Die wordt verrekend bij een implementatie binnen 60 dagen." },
  { id: "maandelijks", q: "Waarom betalen we maandelijks?", a: "Voor het beheren van de ingerichte werkstroom: monitoring, incidentafhandeling, afgesproken bronupdates, rapportage en kleine instellingenwijzigingen. De precieze scope staat in het voorstel." },
  { id: "uitbreiden", q: "Kunnen we later uitbreiden?", a: "Ja. We beginnen bij één werkstroom. Extra capaciteit of aangrenzende processen krijgen een eigen scope en prijs." },
  { id: "whatsapp", q: "Kan WhatsApp onderdeel zijn?", a: "Ja, als dat past bij jullie proces en de technische en communicatievoorwaarden. We bekijken eerst welk nummer, welke flow en welke overdracht nodig zijn." },
  { id: "loont", q: "Wat als automatisering niet loont?", a: "Dan bouwen we het project niet. Soms is een bestaande softwarefunctie of een kleine procesaanpassing de betere stap." },
  { id: "veilig", q: "Zijn onze gegevens veilig?", a: "Toegang, verwerking, bewaartermijnen en verantwoordelijkheden worden per inrichting vastgelegd. We gebruiken alleen gegevens die nodig zijn voor het afgesproken proces." },
];

export function faqById(id: FaqId): FaqItem {
  const f = faqs.find((x) => x.id === id);
  if (!f) throw new Error(`Onbekende FAQ: ${id}`);
  return f;
}
```

(De FAQ-tekst `kosten` bevat "€750" — dat is content, toegestaan in `src/content`.)

- [ ] **Step 7: `src/content/demos.ts`** (handover §14)

```ts
import type { Demo, DemoId } from "./types";

export const DEMO_LABEL = "Illustratieve demo";
export const DEMO_CLOSING = "Dit voorbeeld laat de werkwijze zien. De inrichting en uitkomst hangen af van jullie proces en gegevens.";

export const demos: Demo[] = [
  {
    id: "offerte-intake",
    title: "Offerteaanvraag",
    categoryId: "groothandels",
    input: {
      channel: "E-mail met Excel-bijlage",
      from: "inkoop@voorbeeldbedrijf-a.nl",
      subject: "Aanvraag offerte",
      body: "Graag een offerte voor 12 stuks productreferentie X. Zie bijgevoegde lijst.",
      fields: [
        { label: "Klant", value: "Voorbeeldbedrijf A" },
        { label: "Product", value: "Productreferentie X" },
        { label: "Aantal", value: "12 stuks" },
        { label: "Gewenst moment", value: null },
      ],
    },
    prepared: {
      summary: "Aanvraag van Voorbeeldbedrijf A voor 12 stuks productreferentie X.",
      present: ["Klant herkend", "Productreferentie en aantal overgenomen"],
      missing: ["Gewenst moment van levering"],
    },
    next: {
      conceptTitle: "Conceptvraag aan de klant",
      concept: "Bedankt voor je aanvraag. Op welk moment wil je de 12 stuks productreferentie X ontvangen? Dan maken we de offerte compleet.",
      status: "Wacht op medewerkerreview",
      teamDecides: "Product, alternatief, prijs en leverdatum blijven bij je binnendienst.",
    },
    evidence: "illustrative",
  },
  {
    id: "aftersales",
    title: "Garantieclaim van een dealer",
    categoryId: "importeurs-distributeurs",
    input: {
      channel: "E-mail van dealer",
      from: "service@voorbeelddealer-b.nl",
      subject: "Garantieclaim Demo-100",
      body: "Klant meldt een defect aan een Demo-100. Serienummer staat hieronder.",
      fields: [
        { label: "Dealer", value: "Voorbeelddealer B" },
        { label: "Model", value: "Demo-100" },
        { label: "Serienummer", value: "Aanwezig" },
        { label: "Aankoopbewijs", value: null },
      ],
    },
    prepared: {
      summary: "Claim van Voorbeelddealer B voor een Demo-100, gecontroleerd op de dossiervereisten.",
      present: ["Dealer herkend", "Model en serienummer aanwezig"],
      missing: ["Aankoopbewijs"],
      source: "Fictieve dossiervereisten",
    },
    next: {
      conceptTitle: "Conceptvraag aan de dealer",
      concept: "Om de claim voor de Demo-100 te kunnen beoordelen hebben we nog het aankoopbewijs nodig. Wil je dat meesturen?",
      status: "Wacht op medewerkerreview",
      teamDecides: "Het besluit over garantie en compensatie blijft bij je aftersalesteam.",
    },
    evidence: "illustrative",
  },
  {
    id: "service-intake",
    title: "Servicemelding",
    categoryId: "service-onderhoud",
    input: {
      channel: "Webformulier",
      from: "Klant via servicepagina",
      subject: "Machine start niet",
      body: "Onze machine start niet meer sinds vanochtend. Locatie: hoofdvestiging.",
      fields: [
        { label: "Klacht", value: "Machine start niet" },
        { label: "Locatie", value: "Hoofdvestiging" },
        { label: "Machine-identificatie", value: null },
      ],
    },
    prepared: {
      summary: "Melding: machine start niet, op de hoofdvestiging van de klant.",
      present: ["Klachtomschrijving", "Locatie"],
      missing: ["Type en serienummer van de machine"],
    },
    next: {
      conceptTitle: "Conceptvraag aan de melder",
      concept: "Wil je het type en serienummer van de machine doorgeven? Die staan meestal op het typeplaatje. Dan kan ons team de melding direct oppakken.",
      status: "Wacht op medewerkerreview",
      teamDecides: "Diagnose, veiligheid, reparatie-instructies, contractdekking en planning blijven bij je servicedesk.",
    },
    evidence: "illustrative",
  },
  {
    id: "project-intake",
    title: "Projectaanvraag",
    categoryId: "maatwerk-montage",
    input: {
      channel: "Aanvraagformulier met foto's",
      from: "Particuliere of zakelijke aanvrager",
      subject: "Aanvraag nieuwe overheaddeur",
      body: "We willen een nieuwe overheaddeur. Foto's van de huidige situatie zijn bijgevoegd.",
      fields: [
        { label: "Type werk", value: "Nieuwe overheaddeur" },
        { label: "Foto's", value: "Genoemd in aanvraag" },
        { label: "Projectadres", value: null },
      ],
    },
    prepared: {
      summary: "Aanvraag voor een nieuwe overheaddeur, met foto's van de huidige situatie.",
      present: ["Type werk beschreven", "Foto's genoemd"],
      missing: ["Projectadres"],
    },
    next: {
      conceptTitle: "Voorstel voor de volgende stap",
      concept: "Vraag het projectadres op en plan daarna een gesprek of opname in.",
      status: "Wacht op medewerkerreview",
      teamDecides: "Inmeting, calculatie, prijs en technische haalbaarheid blijven bij je team.",
    },
    evidence: "illustrative",
  },
];

export function demoById(id: DemoId): Demo | undefined {
  return demos.find((d) => d.id === id);
}
```

- [ ] **Step 8: `src/content/categories.ts`** (handover §9; letterlijk waar de handover tekst geeft)

```ts
import type { Category, CategoryId } from "./types";

/** handover §4 "Geen standaardfit" — gelijk voor alle categorieën. */
export const GENERIC_NOT_FIT = [
  "Weinig volume",
  "Voornamelijk niet-digitale processen",
  "Geen eigenaar voor het proces",
  "Bronnen die niet bereikbaar zijn",
  "Een lopende grote systeemmigratie",
  "De wens om alle besluiten zonder review te laten uitvoeren",
];

export const categories: Category[] = [
  {
    id: "groothandels",
    name: "Technische groothandels",
    cardLine: "Aanvragen voorbereiden en open offertes opvolgen.",
    cardCta: "Voor groothandels",
    seoTitle: "Automatisering voor technische groothandels | Lead Velocity",
    seoDescription: "Informatie uit offerteaanvragen en bijlagen verzamelen, ontbrekende gegevens zichtbaar maken en open offertes opvolgen. Je binnendienst houdt het oordeel.",
    h1: "Van offerteaanvraag naar compleet dossier, met minder uitzoekwerk.",
    sub: "Wij helpen je binnendienst informatie uit aanvragen en bijlagen te verzamelen, ontbrekende gegevens zichtbaar te maken en open offertes op te volgen.",
    primaryCta: "Bekijk jullie offertestroom",
    secondaryCta: "Bekijk de offertedemo",
    processKey: "offerte-intake",
    demoId: "offerte-intake",
    tasks: [
      "Productreferenties en aantallen overnemen",
      "Klant- en aanvraaggegevens verzamelen",
      "Ontbrekende informatie navragen",
      "Dossier voor de offerte voorbereiden",
      "Werkelijk open offertes volgen",
    ],
    exampleFlow: ["Mail en Excel-lijst", "Velden verzamelen", "Ontbrekend gegeven markeren", "Conceptvraag", "Review", "Dossier en opvolgtaak"],
    teamDecides: "Je team beslist over product, alternatief, prijs en leverdatum.",
    limits: ["Geen autonome orderinvoer in je ERP", "Geen prijsberekening"],
    subsegments: ["Industriële onderdelen", "Gereedschap", "Bevestigingsmaterialen", "Technische verbruiksartikelen"],
    fit: ["Terugkerende aanvragen", "Een binnendienstteam", "Bruikbare artikel- en klantbronnen"],
    measures: ["Voorbereidingstijd", "Aandeel complete aanvragen", "Opvolgdekking"],
    faqIds: ["software", "zelfstandig", "kosten", "uitbreiden"],
  },
  {
    id: "importeurs-distributeurs",
    name: "Importeurs en distributeurs",
    cardLine: "Aftersales- en dealerclaims compleet maken.",
    cardCta: "Voor importeurs en distributeurs",
    seoTitle: "Aftersales automatiseren voor importeurs en distributeurs | Lead Velocity",
    seoDescription: "Productgegevens, bewijsstukken en correspondentie samenbrengen, zodat je team garantie- en aftersalesaanvragen beoordeelt met de informatie bij elkaar.",
    h1: "Minder uitzoekwerk rondom garantie en aftersales.",
    sub: "Breng productgegevens, bewijsstukken en correspondentie samen. Zo kan je team een aanvraag beoordelen met de benodigde informatie bij elkaar.",
    primaryCta: "Bekijk jullie aftersalesproces",
    secondaryCta: "Bekijk de claimdemo",
    processKey: "aftersales",
    demoId: "aftersales",
    tasks: [
      "Serienummer en model verzamelen",
      "Bewijsstukken opvragen",
      "Dealer herkennen",
      "Juiste procedure met bron ophalen",
      "Statusvragen voorbereiden",
    ],
    exampleFlow: ["Dealerclaim", "Vereistencheck", "Ontbrekend aankoopbewijs", "Conceptvraag", "Review", "Compleet dossier"],
    teamDecides: "Je team beslist over garantie en compensatie.",
    limits: ["Geen gesloten fabrikantportalen autonoom bedienen"],
    subsegments: ["Gereedschap", "Tuinmachines", "Apparatuur", "Fietsproducten"],
    fit: ["Een dealer- of klantnetwerk met terugkerende claims", "Een aftersalesteam", "Vastgelegde dossiervereisten"],
    measures: ["Minuten administratie per claim", "Contactmomenten per claim", "Aandeel complete intake", "Aantal statusvragen"],
    faqIds: ["software", "zelfstandig", "oplevert", "kosten"],
  },
  {
    id: "service-onderhoud",
    name: "Service en onderhoud",
    cardLine: "Meldingen voorbereiden en statusvragen ondersteunen.",
    cardCta: "Voor servicebedrijven",
    seoTitle: "Service-intake automatiseren | Lead Velocity",
    seoDescription: "Klant-, locatie- en apparatuurgegevens verzamelen voordat je servicedesk een melding behandelt. De beschikbare informatie en volgende actie in één overzicht.",
    h1: "Complete meldingen voor je servicedesk.",
    sub: "Verzamel klant-, locatie- en apparatuurgegevens voordat je team een melding behandelt. Maak de beschikbare informatie en volgende actie zichtbaar.",
    primaryCta: "Bekijk jullie servicestroom",
    secondaryCta: "Bekijk de servicedemo",
    processKey: "service-intake",
    demoId: "service-intake",
    tasks: [
      "Ontbrekende machinegegevens opvragen",
      "Historie samenbrengen",
      "Melding samenvatten",
      "Doorzetten naar de juiste eigenaar",
      "Bekende status voorbereiden",
    ],
    exampleFlow: ["Melding", "Gegevens verzamelen", "Ontbrekende identificatie markeren", "Conceptvraag", "Review", "Complete melding voor de servicedesk"],
    teamDecides: "Je team houdt technische diagnose, veiligheid, reparatie-instructies, contractdekking en monteurplanning.",
    limits: ["Geen reparatieadvies", "Geen beloofde responstijd voor monteurs"],
    subsegments: ["Horeca-apparatuur", "Pompen", "Werkplaatsapparatuur", "Reinigingsmachines"],
    fit: ["Een eigen servicedesk", "Herhaaldelijke digitale meldingen", "Toegang tot klant- en apparatuurgegevens"],
    measures: ["Contactmomenten tot een volledige intake", "Informatiezoektijd", "Voorbereidingstijd"],
    faqIds: ["software", "zelfstandig", "whatsapp", "kosten"],
  },
  {
    id: "maatwerk-montage",
    name: "Maatwerk en montage",
    cardLine: "Projectinformatie verzamelen en vervolgstappen bewaken.",
    cardCta: "Voor maatwerk en montage",
    seoTitle: "Projectintake automatiseren voor maatwerk en montage | Lead Velocity",
    seoDescription: "Wensen, foto's, documenten en projectgegevens samenbrengen en de volgende stap voorbereiden, zodat je team verder kan met gesprek, opname of offerte.",
    h1: "Van projectaanvraag naar een compleet dossier.",
    sub: "Breng wensen, foto's, documenten en projectgegevens samen. Bereid de volgende stap voor, zodat je team verder kan met gesprek, opname of offerte.",
    primaryCta: "Bekijk jullie aanvraagproces",
    secondaryCta: "Bekijk de projectdemo",
    processKey: "project-intake",
    demoId: "project-intake",
    tasks: [
      "Adres en wensen bundelen",
      "Ontbrekende documenten markeren",
      "Conceptvragen voorbereiden",
      "Route naar gesprek of opname",
      "Open aanvragen volgen",
    ],
    exampleFlow: ["Projectaanvraag", "Wensen en documenten bundelen", "Ontbrekend adres markeren", "Conceptvraag", "Review", "Voorstel voor gesprek of opname"],
    teamDecides: "Je team houdt inmeting, engineering, calculatie, prijs en technische haalbaarheid.",
    limits: ["Nooit definitieve maten uit een foto afleiden", "Geen calculatie"],
    subsegments: ["Deuren en poorten", "Zonwering", "Hekwerk", "Kozijnen en glas", "Bepaalde interieurbouw"],
    fit: ["Terugkerende projectaanvragen", "Een team voor opname of offerte", "Aanvragen die digitaal binnenkomen"],
    measures: ["Aandeel complete aanvragen", "Voorbereidingstijd", "Tijd tot afgesproken vervolgstap"],
    faqIds: ["software", "zelfstandig", "loont", "kosten"],
  },
];

export function categoryById(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}
```

- [ ] **Step 9: `src/content/processes.ts`** (handover §5, §10)

```ts
import type { ProcessFamily, ProcessFamilyId } from "./types";

export const processes: ProcessFamily[] = [
  {
    id: "aanvragen-dossiers",
    name: "Aanvragen en dossiers",
    cardLine: "Intake, bijlagen en compleetheid: een compleet, controleerbaar dossier.",
    seoTitle: "Aanvragen en dossiers automatiseren | Lead Velocity",
    seoDescription: "Van losse mails, bijlagen en formulieren naar een compleet, controleerbaar dossier met een conceptactie voor je team.",
    h1: "Van losse informatie naar een bruikbaar dossier.",
    situation: "Aanvragen komen binnen via mail, bijlagen en formulieren. Voordat iemand verder kan, moet de informatie worden samengebracht en gecontroleerd op wat er nog ontbreekt.",
    input: "Mail, bijlage of formulier",
    output: "Compleetheidscheck en conceptactie",
    modules: ["Intake", "Bijlagen", "Compleetheid", "Kennisbronnen"],
    result: "Compleet, controleerbaar dossier",
    humanLimit: "Je team beoordeelt het dossier en neemt de inhoudelijke beslissing.",
    neededInput: ["Voorbeelden van binnenkomende aanvragen", "De gegevens die een complete aanvraag nodig heeft", "Toegang tot de relevante bronnen"],
    categoryIds: ["groothandels", "maatwerk-montage"],
    ctaProcess: "intake",
    ctaLabel: "Bekijk jullie aanvraagproces",
    demoId: "offerte-intake",
  },
  {
    id: "communicatie-opvolging",
    name: "Communicatie en opvolging",
    cardLine: "Conceptvragen, statusreacties en reminders: minder handmatige herhaalcommunicatie.",
    seoTitle: "Communicatie en opvolging automatiseren | Lead Velocity",
    seoDescription: "Herhaalcommunicatie voorbereiden met brongebonden concepten en open acties zichtbaar houden, met je team in controle.",
    h1: "Herhaalcommunicatie voorbereiden. Open acties zichtbaar houden.",
    situation: "Dezelfde vragen, statusreacties en herinneringen komen steeds terug. Ondertussen moet niemand een open actie uit het oog verliezen.",
    input: "Vraag of status",
    output: "Brongebonden concept en taak",
    modules: ["Conceptvragen", "Statusreacties", "Reminders", "Routing"],
    result: "Minder handmatige herhaalcommunicatie",
    humanLimit: "Externe berichten beginnen als concept; je team keurt ze goed voordat ze worden verstuurd.",
    neededInput: ["Veelvoorkomende vragen en statussen", "De bronnen waar antwoorden uit komen", "Afspraken over wie wat opvolgt"],
    categoryIds: ["importeurs-distributeurs", "service-onderhoud"],
    ctaProcess: "opvolging",
    ctaLabel: "Bekijk jullie opvolging",
    demoId: "service-intake",
    extraBlock: {
      title: "WhatsApp",
      body: "Wanneer jullie klanten of partners WhatsApp gebruiken, kan een afgebakende flow informatie verzamelen, veelgestelde procesvragen ondersteunen en doorzetten naar je team. We toetsen eerst de inrichting, toegestane berichten en aansluiting op jullie werkwijze.",
    },
  },
  {
    id: "data-inzicht",
    name: "Data en inzicht",
    cardLine: "Ontdubbeling, ontbrekende velden en open acties: bruikbare gegevens en zichtbaar werk.",
    seoTitle: "Data en inzicht voor je team | Lead Velocity",
    seoDescription: "Records en bronnen ordenen: onzekerheden, doublures en een werkoverzicht waar je team mee verder kan.",
    h1: "Gegevens waar je team mee verder kan.",
    situation: "Gegevens staan verspreid, dubbel of onvolledig in verschillende bronnen. Daardoor is lastig te zien wat klopt en welk werk nog open staat.",
    input: "Records en bronnen",
    output: "Onzekerheden, doublures en werkoverzicht",
    modules: ["Ontdubbeling", "Ontbrekende velden", "Bronstatus", "Open acties"],
    result: "Bruikbare gegevens en zichtbaar werk",
    humanLimit: "Je team beslist over correcties en wat er met de gegevens gebeurt.",
    neededInput: ["Toegang tot de betreffende bronnen", "Afspraken over welke velden belangrijk zijn", "Een eigenaar voor de gegevens"],
    categoryIds: ["groothandels", "importeurs-distributeurs"],
    ctaProcess: "data",
    ctaLabel: "Bekijk jullie gegevens",
  },
  {
    id: "commerciele-voorbereiding",
    name: "Commerciële voorbereiding",
    cardLine: "Accountresearch, contactrollen en prioriteit: een werklijst met reden en volgende actie.",
    seoTitle: "Commerciële voorbereiding automatiseren | Lead Velocity",
    seoDescription: "Geschikte bedrijven onderzoeken, contactrollen vinden en een reden voor contact voorbereiden. Je team voert de gesprekken.",
    h1: "Een gerichte werklijst voor je commerciële team.",
    situation: "Geschikte bedrijven onderzoeken, contactrollen vinden en een logische reden voor contact voorbereiden kost tijd. We richten een werkstroom in die dat voorwerk ordent en vervolgacties bijhoudt. Je team voert de gesprekken en beoordeelt de kansen.",
    input: "Doelgroep en bronnen",
    output: "Accounts, onderbouwing en vervolgactie",
    modules: ["Accountresearch", "Contactrollen", "Prioriteit", "Campagneconcepten"],
    result: "Werklijst met reden en volgende actie",
    humanLimit: "Je team voert de gesprekken en beoordeelt de kansen.",
    neededInput: ["Een helder B2B-aanbod", "Een omschreven doelgroep", "Een team dat contacten oppakt"],
    categoryIds: ["groothandels", "maatwerk-montage"],
    ctaProcess: "sales",
    ctaLabel: "Bekijk jullie commerciële voorbereiding",
  },
];

export function processById(id: ProcessFamilyId): ProcessFamily | undefined {
  return processes.find((p) => p.id === id);
}
```

- [ ] **Step 10: `src/content/campaigns.ts`** (handover §11)

```ts
import type { Campaign, CampaignId } from "./types";

export const campaigns: Campaign[] = [
  {
    id: "offerte-intake",
    categoryId: "groothandels",
    demoId: "offerte-intake",
    seoTitle: "Offerte-intake voor groothandels | Lead Velocity",
    seoDescription: "Informatie uit offerteaanvragen verzamelen en ontbrekende velden zichtbaar maken, voordat je binnendienst de offerte voorbereidt.",
    h1: "Minder handwerk tussen aanvraag en offertevoorbereiding.",
    sub: "Informatie uit aanvragen en bijlagen verzamelen, ontbrekende gegevens zichtbaar maken en open offertes opvolgen.",
    primaryLabel: "Bekijk jullie offertestroom",
    message: "Informatie verzamelen en ontbrekende velden zichtbaar maken.",
    tasks: ["Productreferenties en aantallen overnemen", "Ontbrekende informatie navragen", "Werkelijk open offertes volgen"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
  {
    id: "aftersales",
    categoryId: "importeurs-distributeurs",
    demoId: "aftersales",
    seoTitle: "Complete aftersalesclaims | Lead Velocity",
    seoDescription: "Bewijsstukken en gegevens bij elkaar voordat je team een claim beoordeelt.",
    h1: "Complete claims voordat je team ze beoordeelt.",
    sub: "Serienummer, model en bewijsstukken verzamelen en de juiste procedure erbij zoeken, zodat je team de claim kan beoordelen.",
    primaryLabel: "Bekijk jullie claimproces",
    message: "Bewijsstukken en gegevens bij elkaar.",
    tasks: ["Serienummer en model verzamelen", "Bewijsstukken opvragen", "Statusvragen voorbereiden"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
  {
    id: "service-intake",
    categoryId: "service-onderhoud",
    demoId: "service-intake",
    seoTitle: "Complete servicemeldingen | Lead Velocity",
    seoDescription: "Identificatie en klachtomschrijving verzamelen voordat je servicedesk een melding oppakt.",
    h1: "Minder nabellen om een servicemelding compleet te krijgen.",
    sub: "Klant-, locatie- en apparatuurgegevens verzamelen en de melding samenvatten voordat je servicedesk hem oppakt.",
    primaryLabel: "Bekijk jullie service-intake",
    message: "Identificatie en klachtomschrijving verzamelen.",
    tasks: ["Ontbrekende machinegegevens opvragen", "Melding samenvatten", "Doorzetten naar de juiste eigenaar"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
  {
    id: "project-intake",
    categoryId: "maatwerk-montage",
    demoId: "project-intake",
    seoTitle: "Complete projectaanvragen | Lead Velocity",
    seoDescription: "Documenten, wensen en de volgende stap bij elkaar, zodat je team verder kan met gesprek, opname of offerte.",
    h1: "Projectaanvragen waar je team mee verder kan.",
    sub: "Wensen, foto's en documenten bundelen en de volgende stap voorbereiden: gesprek, opname of offerte.",
    primaryLabel: "Bekijk jullie projectintake",
    message: "Documenten, wensen en volgende stap.",
    tasks: ["Adres en wensen bundelen", "Ontbrekende documenten markeren", "Open aanvragen volgen"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
];

export function campaignById(id: CampaignId): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}
```

- [ ] **Step 11: `src/content/pages.ts`** (handover §8, §10, §13, §15)

```ts
export const home = {
  seoTitle: "Lead Velocity — Minder uitzoekwerk. Meer werk gedaan.",
  seoDescription: "Wij automatiseren terugkerend werk rond aanvragen, klantcommunicatie en opvolging. Ingericht op jullie werkwijze, met jullie team in controle.",
  hero: {
    eyebrow: "Praktische automatisering voor het MKB",
    h1: "Minder uitzoekwerk. Meer werk gedaan.",
    sub: "Wij automatiseren terugkerend werk rond aanvragen, klantcommunicatie en opvolging. Van ontbrekende gegevens verzamelen tot een compleet dossier en een duidelijke volgende stap — ingericht op jullie werkwijze.",
    primary: "Plan een werkstroomcheck",
    secondary: "Bekijk een voorbeeld",
    micro: "20 minuten om te bekijken welk proces een goede eerste stap is.",
  },
  situations: {
    h2: "Het werk tussen een bericht en een bruikbare volgende stap.",
    intro: "Veel werk begint met een mail, bijlage of vraag. Daarna moeten gegevens worden verzameld, informatie worden opgezocht en vervolgacties worden bewaakt. Juist die terugkerende stappen kunnen we samen slimmer inrichten.",
    cards: [
      { title: "Informatie verzamelen", body: "Gegevens uit mails, formulieren en bijlagen bij elkaar brengen. Zichtbaar maken wat nog ontbreekt." },
      { title: "Werk voorbereiden", body: "Een dossier, samenvatting of conceptbericht klaarzetten op basis van afgesproken bronnen." },
      { title: "Opvolging bewaken", body: "Open acties, ontbrekende informatie en afgesproken vervolgcontacten bijhouden." },
    ],
  },
  forWhom: { h2: "Herkenbare werkstromen, ingericht voor jouw bedrijf." },
  oneProcess: {
    h2: "Begin bij één proces dat steeds terugkomt.",
    body: "We kijken waar je team telkens hetzelfde informatie- en communicatiewerk doet. Daar richten we één werkstroom voor in. Zodra die bruikbaar is en resultaat oplevert, kunnen we aangrenzend werk toevoegen.",
    label: "Voorbeeld met fictieve gegevens",
  },
  broader: {
    h2: "Van commerciële voorbereiding tot klantopvolging.",
    body: "Dezelfde basis kan ook geschikte bedrijven onderzoeken, gegevens ordenen en commerciële vervolgacties voorbereiden. We kiezen de toepassing op het werk dat jullie team werkelijk doet.",
  },
  method: {
    h2: "Van terugkerende taak naar beheerde werkstroom.",
    steps: [
      { title: "Bekijken", body: "Proces en waarde." },
      { title: "Inrichten", body: "Scope en bronnen." },
      { title: "Testen", body: "Met team en voorbeelden." },
      { title: "Beheren", body: "Gebruik, fouten en resultaat." },
    ],
    link: "Bekijk onze werkwijze",
  },
  control: {
    h2: "Je team houdt het oordeel. Het systeem doet het voorwerk.",
    body: "Productkeuzes, prijzen, garanties en technische beoordelingen blijven bij de verantwoordelijke medewerker. We spreken af welke informatie het systeem voorbereidt en welke acties eerst worden gecontroleerd.",
  },
  packages: { h2: "Een passende start, met ruimte om uit te breiden.", link: "Vergelijk de pakketten" },
  examples: { h2: "Bekijk wat een werkstroom concreet oplevert." },
  about: {
    h2: "Praktisch gebouwd, samen met de mensen die ermee werken.",
    body: "Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie. We beginnen bij het dagelijkse werk en bouwen van daaruit een systeem dat je team kan gebruiken.",
    cta: "Over Lead Velocity",
  },
  faqIds: ["software", "zelfstandig", "kosten", "maandelijks", "loont", "veilig"] as const,
  closing: {
    h2: "Welk werk zou jouw team minder vaak hoeven uitzoeken?",
    body: "Vertel welk proces telkens terugkomt. We bekijken of er een duidelijke, haalbare eerste stap is.",
    cta: "Plan een werkstroomcheck",
  },
};

export const voorWie = {
  seoTitle: "Voor wie | Lead Velocity",
  seoDescription: "Vier herkenbare ingangen: technische groothandels, importeurs en distributeurs, service en onderhoud, maatwerk en montage.",
  h1: "Voor bedrijven waar informatie- en communicatiewerk steeds terugkomt.",
  intro: "We richten werkstromen in voor vier soorten bedrijven. Wat ze gemeen hebben: aanvragen en vragen komen digitaal binnen, er is genoeg herhaling, en er is een team dat het werk uitvoert.",
  fitTitle: "Goede fit",
  fit: ["Informatie komt binnen via e-mail, pdf, Excel of formulieren", "Terugkerende informatievereisten", "Bestaande bronnen om uit te putten", "Een duidelijke eigenaar van het proces", "Genoeg behandeltijd en bereidheid om gecontroleerd te testen"],
  notFitTitle: "Geen standaardfit",
  otherTitle: "Ander bedrijfstype?",
  otherBody: "Ook buiten deze categorieën kan dezelfde werkstroom passen. We bekijken eerst de herhaling, gegevens en uitvoerbaarheid.",
};

export const oplossingenIndex = {
  seoTitle: "Oplossingen | Lead Velocity",
  seoDescription: "Bouwblokken die informatie verzamelen, werk voorbereiden en opvolging zichtbaar maken. We beginnen bij één proces.",
  h1: "Automatisering voor het werk dat steeds terugkomt.",
  intro: "We beginnen bij één proces. Deze bouwblokken helpen informatie te verzamelen, werk voor te bereiden en opvolging zichtbaar te maken.",
  baseTitle: "Eén basis, meerdere toepassingen",
  baseSteps: ["Input ontvangen", "Identiteit herkennen", "Informatie structureren", "Compleetheid beoordelen", "Bronnen ophalen", "Actie voorbereiden", "Medewerkerreview", "Status registreren", "Opvolgen", "Afsluiten en meten"],
};

export const prijzenPage = {
  seoTitle: "Prijzen | Lead Velocity",
  seoDescription: "Drie pakketten plus maatwerk, met een eenmalige inrichting en een maandelijks bedrag voor beheer. Prijzen vanaf, exclusief btw.",
  h1: "Een afgebakende start. Duidelijke kosten voor inrichting en beheer.",
  intro: "Je betaalt eenmalig voor het inrichten van een werkstroom en daarna maandelijks voor het beheer ervan. De maandkosten starten pas na acceptatie.",
  setupLabel: "Inrichting vanaf",
  monthlyLabel: "Beheer per maand vanaf",
  matrixTitle: "Pakketten vergeleken",
  managementTitle: "Inbegrepen in het beheer",
  extraTitle: "Wat niet inbegrepen is",
  analysisTitle: "Betaalde analyse",
  analysisBody: "Als de werkstroomcheck voldoende aanleiding geeft, volgt een analyse. Die wordt verrekend bij een implementatie binnen de verrekentermijn.",
  termsTitle: "Voorwaarden",
  terms: [
    "Prijzen zijn vanaf-prijzen, exclusief btw.",
    "De scope leggen we vooraf vast in het voorstel.",
    "De maandkosten starten na acceptatie.",
    "Een bestaande passende template kan doorgaans in 4–6 weken worden gepland, na de inputcheck.",
  ],
  faqIds: ["kosten", "maandelijks", "uitbreiden", "loont", "oplevert"] as const,
};

export const werkwijze = {
  seoTitle: "Werkwijze | Lead Velocity",
  seoDescription: "Van werkstroomcheck tot beheer in zes stappen: check, analyse, voorstel, inrichting, acceptatie en beheer.",
  h1: "Van terugkerend werk naar een bruikbare werkstroom.",
  intro: "Een gebruikelijke start heeft één proceseigenaar en twee gerichte werksessies. Dat is een uitgangspunt, geen absoluut maximum voor elk project.",
  steps: [
    { title: "Check", output: "Een eerste beeld of er een haalbare eerste stap is.", client: "Een gesprek van 20 minuten over het werk dat terugkomt.", decision: "Is een analyse zinvol?" },
    { title: "Analyse", output: "Proceskaart, nulmeting, input- en toegangscheck, businesscase en acceptatiecriteria.", client: "Voorbeelden van het werk en toegang tot de relevante informatie.", decision: "Loont het om dit in te richten?" },
    { title: "Voorstel", output: "Vaste scope en prijs, met wat er wordt opgeleverd en wanneer de maanddienst start.", client: "Een eigenaar die het voorstel beoordeelt.", decision: "Akkoord op scope en prijs." },
    { title: "Inrichting", output: "De werkstroom, ingericht op jullie bronnen en werkwijze.", client: "Twee gerichte werksessies en representatieve voorbeelden.", decision: "Is het prototype bruikbaar?" },
    { title: "Acceptatie", output: "Test met het team aan de hand van de afgesproken acceptatiecriteria.", client: "Gebruik en feedback van het team.", decision: "Voldoet de werkstroom aan de criteria?" },
    { title: "Beheer", output: "Monitoring, incidentafhandeling, bronupdates, rapportage en kleine wijzigingen.", client: "Melden van wijzigingen in proces of bronnen.", decision: "Uitbreiden naar aangrenzend werk?" },
  ],
  stepLabels: { output: "Wat wij opleveren", client: "Wat we van jullie nodig hebben", decision: "Beslismoment" },
};

export const over = {
  seoTitle: "Over Lead Velocity",
  seoDescription: "Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie.",
  h1: "Praktisch gebouwd, samen met de mensen die ermee werken.",
  mission: "Praktische automatisering toegankelijk maken voor ervaren MKB-bedrijven door herkenbare werkstromen te bouwen, in hun dagelijkse werkwijze te laten aansluiten en blijvend te beheren en verbeteren.",
  founder: "Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie. We beginnen bij het dagelijkse werk en bouwen van daaruit een systeem dat je team kan gebruiken.",
  skillsTitle: "Waar we goed in zijn",
  skills: ["Commerciële processen en opvolging", "Onderzoek en data-analyse op schaal", "Gegevens bruikbaar maken", "Terugkerend werk automatiseren"],
  principlesTitle: "Hoe we werken",
  principles: [
    "We beginnen bij het werk dat iedere week terugkomt.",
    "Mensen houden de beslissingen die vakkennis, oordeel en klantverantwoordelijkheid vragen.",
    "Eén proces, één eigenaar, één afgebakende start.",
    "We meten wat het oplevert, inclusief controle en uitzonderingen.",
    "Na oplevering beheren en verbeteren we de werkstroom.",
  ],
};

export const checkPage = {
  seoTitle: "Plan een werkstroomcheck | Lead Velocity",
  seoDescription: "In een gesprek van 20 minuten bekijken we welk werk terugkomt, wat je huidige software al doet en of een afgebakende eerste stap zinvol is.",
  h1: "Bekijk waar een werkstroom jullie team kan helpen.",
  intro: "In een gesprek van 20 minuten bekijken we welk werk terugkomt, wat je huidige software al doet en of een afgebakende eerste stap zinvol is.",
  submit: "Vraag een werkstroomcheck aan",
  submitting: "Bezig met versturen…",
  privacy: "We gebruiken je gegevens om op deze aanvraag te reageren.",
  privacyLink: "Lees onze privacyverklaring.",
  error: "Je aanvraag is niet verstuurd. Probeer het opnieuw of mail ons.",
  calendar: "Kies direct een tijd",
};

export const bedanktPage = {
  seoTitle: "Bedankt | Lead Velocity",
  h1: "Bedankt, je aanvraag is ontvangen.",
  body: "We nemen contact op via je gekozen contactvoorkeur om een passend moment af te spreken.",
  cta: "Bekijk een passend voorbeeld",
};
```

- [ ] **Step 12: `src/content/privacy.ts`** (concept — Bart keurt goed vóór livegang)

```ts
export const privacy = {
  seoTitle: "Privacyverklaring | Lead Velocity",
  seoDescription: "Hoe Lead Velocity omgaat met de gegevens die je via deze website verstuurt.",
  h1: "Privacyverklaring",
  draftNotice: "Concept — wordt vóór livegang door Lead Velocity bevestigd.",
  sections: [
    { title: "Wie wij zijn", body: "Lead Velocity is verantwoordelijk voor de verwerking van de gegevens die je via deze website verstuurt. Je bereikt ons via info@leadvelocity.nl." },
    { title: "Welke gegevens we verwerken", body: "Als je een werkstroomcheck aanvraagt, verwerken we je naam, bedrijf, zakelijk e-mailadres en de informatie die je zelf invult, zoals je telefoonnummer, contactvoorkeur en een omschrijving van het werk. We bewaren ook via welke pagina of campagne je bij het formulier kwam." },
    { title: "Waarvoor we ze gebruiken", body: "We gebruiken deze gegevens om op je aanvraag te reageren en een gesprek af te spreken. We gebruiken ze niet voor andere doeleinden zonder je toestemming." },
    { title: "Hoe lang we ze bewaren", body: "We bewaren de gegevens zolang dat nodig is om je aanvraag af te handelen en een eventuele samenwerking voor te bereiden." },
    { title: "Met wie we ze delen", body: "We delen je gegevens alleen met dienstverleners die we nodig hebben om het formulier te verwerken en je aanvraag per e-mail te ontvangen. Zij verwerken de gegevens alleen in onze opdracht." },
    { title: "Analytics en cookies", body: "Deze website gebruikt op dit moment geen analytics- of marketingcookies." },
    { title: "Je rechten", body: "Je kunt ons vragen je gegevens in te zien, te corrigeren of te verwijderen. Stuur daarvoor een e-mail naar info@leadvelocity.nl. Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens." },
  ],
};
```

- [ ] **Step 13: `src/content/redirects.ts`** (spec §3)

```ts
export const redirects: { from: string; to: string }[] = [
  { from: "/groothandel", to: "/groothandels" },
  { from: "/maakindustrie", to: "/maatwerk-montage" },
  { from: "/transport", to: "/service-onderhoud" },
  { from: "/over-ons", to: "/over" },
  { from: "/onze-aanpak", to: "/werkwijze" },
  { from: "/faq", to: "/prijzen#faq" },
  { from: "/veelgestelde-vragen", to: "/prijzen#faq" },
  { from: "/ai-ops-audit", to: "/werkwijze" },
  { from: "/ai-kansenscan", to: "/werkstroomcheck" },
  { from: "/ai-kansenscan/resultaat", to: "/werkstroomcheck" },
  { from: "/ai-readiness-assessment", to: "/werkstroomcheck" },
  { from: "/ai-readiness-assessment/resultaat", to: "/werkstroomcheck" },
  { from: "/lp/assessment", to: "/werkstroomcheck" },
  { from: "/bronnen/ai-readiness-assessment", to: "/werkstroomcheck" },
  { from: "/oplossingen/workflows", to: "/oplossingen/aanvragen-dossiers" },
  { from: "/oplossingen/chatbots", to: "/oplossingen/communicatie-opvolging" },
  { from: "/oplossingen/voice-agents", to: "/oplossingen/communicatie-opvolging" },
  { from: "/oplossingen/dashboards", to: "/oplossingen/data-inzicht" },
  { from: "/oplossingen/ai-agenten", to: "/oplossingen" },
  { from: "/cases", to: "/voorbeelden" },
  { from: "/bronnen", to: "/inzichten" },
  { from: "/bronnen/tips-en-tricks", to: "/inzichten" },
  { from: "/nieuwsbrief", to: "/inzichten" },
];
```

- [ ] **Step 14: `src/content/index.ts`**

```ts
export * from "./types";
export * from "./pricing";
export * from "./site";
export * from "./faq";
export * from "./demos";
export * from "./categories";
export * from "./processes";
export * from "./campaigns";
export * from "./pages";
export * from "./privacy";
export * from "./redirects";
```

- [ ] **Step 15: Run de check, zie hem slagen**

Run: `npx tsx scripts/check-content.ts`
Expected: `✓ content klopt met de handover`.

- [ ] **Step 16: Bewijs dat de check bijt**

Wijzig tijdelijk in `pricing.ts` `monthlyFrom: 1250` naar `1200` en `promise` van Voorbereiden naar `"Bespaar 40% tijd."`. Run de check.
Expected: FAIL met `werkstroom: monthlyFrom 1200 ≠ 1250` en een regel `verboden patroon /\d+\s?%/`. Zet beide terug, run opnieuw → `✓`.

- [ ] **Step 17: Build en commit**

Run: `npm run build` → slaagt.

```bash
git add src/content scripts/check-content.ts
git commit -m "Centrale content- en prijsconfiguratie volgens handover + check-content

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: CTA-, UTM- en tracking-lib + gedeelde site-componenten

**Files:**
- Create: `src/lib/cta.ts`, `src/lib/utm.ts`, `src/lib/track.ts`, `scripts/check-lib.ts`
- Create: `src/components/site/Seo.tsx`, `CtaLink.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `CampaignHeader.tsx`, `SiteLayout.tsx`, `Section.tsx`, `Reveal.tsx`, `Faq.tsx`, `HumanControl.tsx`, `Steps.tsx`, `PricingCards.tsx`, `ScopeTable.tsx`, `CategoryCard.tsx`, `ProcessCard.tsx`, `index.ts`
- Add (al aanwezig, untracked): `src/components/ui/grid-pattern.tsx`

**Interfaces:**
- Consumes: `src/content` (Task 2).
- Produces:
  - `type CheckContext = { source?: string; category?: CategoryId; process?: CtaProcess; package?: PackageId; demo?: DemoId; campaign?: CampaignId }`
  - `checkHref(ctx: CheckContext): string`, `demoHref(demo?: DemoId, source?: string): string`, `parseCheckContext(search: string): CheckContext`
  - `captureUtm(search: string): void`, `readUtm(): Utm`, `type Utm = { source?: string; medium?: string; campaign?: string; content?: string }`
  - `track(event: TrackEvent, params?: TrackParams): void`, `type TrackEvent = "cta_click" | "demo_open" | "demo_step" | "form_start" | "form_submit_success" | "form_submit_error" | "meeting_booked"`
  - Componenten (props exact zoals in de code hieronder): `Seo`, `CtaLink`, `SiteHeader`, `SiteFooter`, `CampaignHeader`, `SiteLayout`, `Section`, `SectionHead`, `Reveal`, `Faq`, `HumanControl`, `Steps`, `PricingCards`, `ScopeTable`, `CategoryCard`, `ProcessCard`

- [ ] **Step 1: Schrijf de test — `scripts/check-lib.ts`**

```ts
// Run: npx tsx scripts/check-lib.ts
import { checkHref, demoHref, parseCheckContext } from "../src/lib/cta";

const fouten: string[] = [];
const eq = (a: unknown, b: unknown, m: string) => { if (JSON.stringify(a) !== JSON.stringify(b)) fouten.push(`${m}: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`); };

eq(checkHref({ source: "header" }), "/werkstroomcheck?source=header", "header");
eq(checkHref({ category: "groothandels", process: "offerte-intake" }), "/werkstroomcheck?category=groothandels&process=offerte-intake", "categorie");
eq(checkHref({ source: "home-hero", package: "werkstroom" }), "/werkstroomcheck?source=home-hero&package=werkstroom", "volgorde source eerst");
eq(checkHref({}), "/werkstroomcheck", "leeg");
eq(demoHref("aftersales", "home-hero"), "/voorbeelden?demo=aftersales&source=home-hero", "demoHref");
eq(demoHref(undefined, "home-hero"), "/voorbeelden?source=home-hero", "demoHref zonder demo");
eq(parseCheckContext("?category=groothandels&process=offerte-intake&package=werkstroom&demo=offerte-intake&campaign=offerte-intake&source=header"),
  { source: "header", category: "groothandels", process: "offerte-intake", package: "werkstroom", demo: "offerte-intake", campaign: "offerte-intake" }, "parse volledig");
eq(parseCheckContext("?category=hacker&package=gratis&process=sales"), { process: "sales" }, "onbekende waarden worden genegeerd");
eq(parseCheckContext("?source=" + "x".repeat(200)), { source: "x".repeat(64) }, "source afgekapt op 64");
eq(parseCheckContext("?source=%3Cscript%3E"), { source: "script" }, "source alleen [a-z0-9-_]");

if (fouten.length) { console.error(`✗ ${fouten.length}:\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ lib klopt");
```

- [ ] **Step 2: Run, zie falen**

Run: `npx tsx scripts/check-lib.ts` → FAIL `Cannot find module '../src/lib/cta'`.

- [ ] **Step 3: `src/lib/cta.ts`**

```ts
import type { CategoryId, CtaProcess, PackageId, DemoId, CampaignId } from "@/content/types";
import { categories } from "@/content/categories";
import { packages } from "@/content/pricing";
import { demos } from "@/content/demos";
import { campaigns } from "@/content/campaigns";
import { processOptions } from "@/content/site";

export type CheckContext = {
  source?: string;
  category?: CategoryId;
  process?: CtaProcess;
  package?: PackageId;
  demo?: DemoId;
  campaign?: CampaignId;
};

const ORDER: (keyof CheckContext)[] = ["source", "category", "process", "package", "demo", "campaign"];

function build(path: string, params: [string, string | undefined][]): string {
  const q = params.filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join("&");
  return q ? `${path}?${q}` : path;
}

export function checkHref(ctx: CheckContext): string {
  return build("/werkstroomcheck", ORDER.map((k) => [k, ctx[k]]));
}

export function demoHref(demo?: DemoId, source?: string): string {
  return build("/voorbeelden", [["demo", demo], ["source", source]]);
}

const known = {
  category: new Set<string>(categories.map((c) => c.id)),
  process: new Set<string>(processOptions.map((p) => p.value).filter((v) => v !== "anders")),
  package: new Set<string>(packages.map((p) => p.id)),
  demo: new Set<string>(demos.map((d) => d.id)),
  campaign: new Set<string>(campaigns.map((c) => c.id)),
};

/** Leest contextparameters; onbekende waarden worden genegeerd. */
export function parseCheckContext(search: string): CheckContext {
  const p = new URLSearchParams(search);
  const out: CheckContext = {};
  const source = (p.get("source") ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 64);
  if (source) out.source = source;
  for (const k of ["category", "process", "package", "demo", "campaign"] as const) {
    const v = p.get(k);
    if (v && known[k].has(v)) (out as Record<string, string>)[k] = v;
  }
  return out;
}
```

Let op: `scripts/check-lib.ts` draait met `tsx`, dat het `@/`-alias uit `tsconfig.json` ondersteunt. Als `tsx` het alias niet oplost, vervang dan in `cta.ts` de `@/content/...`-imports door relatieve imports (`../content/...`); dat werkt in beide omgevingen. Doe hetzelfde in `utm.ts` en `track.ts`.

- [ ] **Step 4: `src/lib/utm.ts`**

```ts
export type Utm = { source?: string; medium?: string; campaign?: string; content?: string };
const KEY = "lv_utm";

/** Bewaart utm_* uit de URL in sessionStorage (alleen als er utm-parameters zijn). Geen PII. */
export function captureUtm(search: string): void {
  try {
    const p = new URLSearchParams(search);
    const utm: Utm = {};
    for (const k of ["source", "medium", "campaign", "content"] as const) {
      const v = p.get(`utm_${k}`);
      if (v) utm[k] = v.slice(0, 100);
    }
    if (Object.keys(utm).length) sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    /* sessionStorage niet beschikbaar — negeren */
  }
}

export function readUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Utm;
  } catch {
    return {};
  }
}
```

- [ ] **Step 5: `src/lib/track.ts`**

```ts
export type TrackEvent =
  | "cta_click" | "demo_open" | "demo_step" | "form_start"
  | "form_submit_success" | "form_submit_error" | "meeting_booked";

/** Alleen niet-persoonlijke parameters (handover §18). */
export type TrackParams = {
  page_type?: string;
  category?: string;
  process?: string;
  campaign_id?: string;
  package_id?: string;
  cta_id?: string;
  demo_id?: string;
  step?: number;
};

/**
 * No-op tot er een analytics-tool en toestemmingsbeleid is (livegang-afhankelijkheid).
 * Aansluiten = alleen deze functie aanpassen.
 */
export function track(event: TrackEvent, params: TrackParams = {}): void {
  if (import.meta.env.DEV) console.debug("[track]", event, params);
}
```

- [ ] **Step 6: Run de lib-test**

Run: `npx tsx scripts/check-lib.ts` → `✓ lib klopt`.

- [ ] **Step 7: Basiscomponenten**

`src/components/site/Reveal.tsx` (gebruikt de bestaande hook, CLAUDE.md §7):

```tsx
import React from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal(delay);
  return <div ref={ref} className={cn("reveal", className)}>{children}</div>;
}
```

`src/components/site/Section.tsx`:

```tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({ id, children, className, tone = "paper" }: { id?: string; children: React.ReactNode; className?: string; tone?: "paper" | "raised" | "ink" }) {
  return (
    <section
      id={id}
      className={cn(
        "px-5 py-20 sm:px-6 md:py-28",
        tone === "raised" && "border-y border-lv-line bg-lv-raised",
        tone === "ink" && "bg-lv-ink text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-lv-muted", className)}>{children}</p>;
}

export function SectionHead({ eyebrow, title, intro, className, as: As = "h2" }: { eyebrow?: string; title: React.ReactNode; intro?: string; className?: string; as?: "h1" | "h2" }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <As className={cn("text-balance font-display font-semibold tracking-[-0.035em]", As === "h1" ? "text-[clamp(2.3rem,5vw,3.9rem)] leading-[1.02]" : "text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05]")}>
        {title}
      </As>
      {intro && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-lv-body">{intro}</p>}
    </Reveal>
  );
}
```

`src/components/site/CtaLink.tsx`:

```tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track, type TrackParams } from "@/lib/track";

type Variant = "primary" | "secondary" | "lime" | "text";

export function CtaLink({ to, children, variant = "primary", ctaId, trackParams, className, arrow = variant !== "secondary" }: {
  to: string; children: React.ReactNode; variant?: Variant; ctaId: string; trackParams?: TrackParams; className?: string; arrow?: boolean;
}) {
  const isHash = to.startsWith("#");
  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-colors",
    variant === "primary" && "bg-lv-ink px-5 py-3 text-white hover:bg-[#2A2A26]",
    variant === "secondary" && "px-5 py-3 text-lv-ink ring-1 ring-lv-line hover:bg-lv-surface",
    variant === "lime" && "bg-lv-lime px-5 py-3 text-lv-ink hover:bg-[#D6FF3D]",
    variant === "text" && "text-lv-ink underline-offset-4 hover:underline",
    className,
  );
  const onClick = () => track("cta_click", { cta_id: ctaId, ...trackParams });
  const inner = (<>{children}{arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}</>);
  return isHash
    ? <a href={to} className={cls} onClick={onClick}>{inner}</a>
    : <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
}
```

`src/components/site/Seo.tsx`:

```tsx
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/content/site";

export function Seo({ title, description, path, noindex = false }: { title: string; description?: string; path: string; noindex?: boolean }) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
```

- [ ] **Step 8: Header, footer, layouts**

`src/components/site/SiteHeader.tsx`:

```tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { mainNav, brand } from "@/content/site";
import { checkHref } from "@/lib/cta";
import { CtaLink } from "./CtaLink";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-[18px] font-semibold tracking-[-0.03em] text-lv-ink" aria-label={`${brand.name} — home`}>
      <span aria-hidden className="h-3.5 w-3.5 rounded-[4px] bg-lv-lime ring-1 ring-black/10" />
      {brand.name}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-lv-line/70 bg-lv-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Logo />
        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-7 text-[14.5px] text-lv-body lg:flex">
          {mainNav.map((l) => (
            <NavLink key={l.href} to={l.href} className={({ isActive }) => cn("hover:text-lv-ink", isActive && "text-lv-ink")}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CtaLink to={checkHref({ source: "header" })} ctaId="header" className="hidden px-4 py-2 text-[14px] sm:inline-flex" arrow={false}>
            Plan een werkstroomcheck
          </CtaLink>
          <button type="button" className="rounded-lg p-2 lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Menu sluiten" : "Menu openen"} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobiele navigatie" className="border-t border-lv-line bg-lv-paper px-5 pb-5 lg:hidden">
          <ul className="flex flex-col py-2 text-[16px]">
            {mainNav.map((l) => (
              <li key={l.href}><Link to={l.href} className="block py-3" onClick={() => setOpen(false)}>{l.label}</Link></li>
            ))}
            <li><Link to="/over" className="block py-3" onClick={() => setOpen(false)}>Over</Link></li>
          </ul>
          <CtaLink to={checkHref({ source: "header" })} ctaId="header-mobile" className="w-full">Plan een werkstroomcheck</CtaLink>
        </nav>
      )}
    </header>
  );
}
```

`src/components/site/SiteFooter.tsx`:

```tsx
import { Link } from "react-router-dom";
import { footerNav, contact, brand } from "@/content/site";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-lv-line bg-lv-paper px-5 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[14px] text-lv-muted">{brand.tagline}</p>
          <ul className="mt-5 space-y-1 text-[14px] text-lv-body">
            <li><a className="hover:text-lv-ink" href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a className="hover:text-lv-ink" href={contact.phoneHref}>{contact.phone}</a></li>
          </ul>
        </div>
        {footerNav.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-faint">{col.title}</p>
            <ul className="mt-4 space-y-2 text-[14px] text-lv-body">
              {col.links.map((l) => <li key={l.href}><Link className="hover:text-lv-ink" to={l.href}>{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
```

`src/components/site/CampaignHeader.tsx` (handover §11: logo + één CTA; footer: contact, privacy, terug):

```tsx
import { Link } from "react-router-dom";
import { contact } from "@/content/site";
import { Logo } from "./SiteHeader";
import { CtaLink } from "./CtaLink";

export function CampaignHeader({ ctaHref, ctaLabel, ctaId }: { ctaHref: string; ctaLabel: string; ctaId: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-lv-line/70 bg-lv-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Logo />
        <CtaLink to={ctaHref} ctaId={ctaId} className="px-4 py-2 text-[14px]" arrow={false}>{ctaLabel}</CtaLink>
      </div>
    </header>
  );
}

export function CampaignFooter() {
  return (
    <footer className="border-t border-lv-line px-5 py-8 text-[14px] text-lv-body sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
        <a href={`mailto:${contact.email}`} className="hover:text-lv-ink">{contact.email}</a>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:text-lv-ink">Privacy</Link>
          <Link to="/" className="hover:text-lv-ink">Terug naar de site</Link>
        </div>
      </div>
    </footer>
  );
}
```

`src/components/site/SiteLayout.tsx`:

```tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { captureUtm } from "@/lib/utm";

export function useScrollTopAndUtm() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => { captureUtm(search); }, [search]);
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  useScrollTopAndUtm();
  return (
    <div className="min-h-screen bg-lv-paper text-lv-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Naar inhoud</a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 9: Inhoudscomponenten**

`src/components/site/Faq.tsx`:

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqById } from "@/content/faq";
import type { FaqId } from "@/content/types";

export function Faq({ ids }: { ids: readonly FaqId[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {ids.map((id) => {
        const f = faqById(id);
        return (
          <AccordionItem key={id} value={id} className="border-b border-lv-line">
            <AccordionTrigger className="py-5 text-left text-[17px] font-medium hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-5 text-[15.5px] leading-relaxed text-lv-body">{f.a}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
```

`src/components/site/HumanControl.tsx`:

```tsx
import { Check, UserCheck } from "lucide-react";

export function HumanControl({ title, body, prepared, decides }: { title: string; body: string; prepared?: string[]; decides?: string }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-lv-line bg-lv-line md:grid-cols-2">
      <div className="bg-lv-surface p-8">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-lv-body">{body}</p>
      </div>
      <div className="grid gap-px bg-lv-line">
        {prepared && (
          <div className="bg-lv-surface p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-faint">Het systeem bereidt voor</p>
            <ul className="mt-3 space-y-2 text-[15px]">{prepared.map((p) => <li key={p} className="flex gap-2"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{p}</li>)}</ul>
          </div>
        )}
        {decides && (
          <div className="bg-lv-lime-soft p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-lime-ink">Je team beslist</p>
            <p className="mt-3 flex gap-2 text-[15px]"><UserCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{decides}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

`src/components/site/Steps.tsx`:

```tsx
import { Reveal } from "./Reveal";

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title}>
          <Reveal delay={i * 0.06}>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-lv-line bg-lv-surface font-mono text-[13px]">{i + 1}</span>
            <h3 className="mt-5 font-display text-[21px] font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{s.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
```

`src/components/site/PricingCards.tsx` (handover §6, §12):

```tsx
import { Check } from "lucide-react";
import { standardPackages, customPackage, formatEuro, costMicrocopy } from "@/content/pricing";
import { checkHref } from "@/lib/cta";
import { CtaLink } from "./CtaLink";
import { cn } from "@/lib/utils";

export function PricingCards({ source, showIncludes = false }: { source: string; showIncludes?: boolean }) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3">
        {standardPackages.map((p) => {
          const featured = !!p.badge;
          return (
            <div key={p.id} className={cn("relative flex flex-col rounded-3xl p-7", featured ? "bg-lv-ink text-white" : "border border-lv-line bg-lv-surface")}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[21px] font-semibold tracking-[-0.02em]">{p.name}</h3>
                {p.badge && <span className="rounded-full bg-lv-lime px-2.5 py-1 font-mono text-[10.5px] text-lv-ink">{p.badge}</span>}
              </div>
              <p className={cn("mt-2 text-[14.5px] leading-relaxed", featured ? "text-white/70" : "text-lv-body")}>{p.promise}</p>
              <dl className="mt-6 space-y-1">
                <div className="flex items-baseline gap-2"><dt className="sr-only">Inrichting vanaf</dt><dd className="font-display text-[32px] font-semibold tracking-[-0.03em]">{formatEuro(p.setupFrom)}</dd><span className={cn("text-[13px]", featured ? "text-white/60" : "text-lv-faint")}>inrichting vanaf</span></div>
                <div className="flex items-baseline gap-2"><dt className="sr-only">Beheer per maand vanaf</dt><dd className="font-display text-[20px] font-semibold">{formatEuro(p.monthlyFrom)}</dd><span className={cn("text-[13px]", featured ? "text-white/60" : "text-lv-faint")}>per maand vanaf</span></div>
              </dl>
              {showIncludes && (
                <ul className="mt-6 space-y-2 text-[14px]">
                  {p.includes.map((x) => <li key={x} className="flex gap-2"><Check aria-hidden className={cn("mt-0.5 h-4 w-4 shrink-0", featured && "text-lv-lime")} />{x}</li>)}
                </ul>
              )}
              <div className="mt-auto pt-7">
                <CtaLink to={checkHref({ source, package: p.id })} ctaId={`package-${p.id}`} trackParams={{ package_id: p.id }} variant={featured ? "lime" : "secondary"} className="w-full">{p.ctaLabel}</CtaLink>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-col items-start justify-between gap-5 rounded-3xl border border-dashed border-lv-line bg-lv-surface/60 p-7 md:flex-row md:items-center">
        <div>
          <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em]">{customPackage.name}</h3>
          <p className="mt-1 text-[14.5px] text-lv-body">{customPackage.promise}</p>
          <p className="mt-1 font-mono text-[12.5px] text-lv-muted">{formatEuro(customPackage.setupFrom)} inrichting vanaf · {formatEuro(customPackage.monthlyFrom)} per maand vanaf</p>
        </div>
        <CtaLink to={checkHref({ source, package: "custom" })} ctaId="package-custom" trackParams={{ package_id: "custom" }} variant="secondary">{customPackage.ctaLabel}</CtaLink>
      </div>
      <p className="mt-4 text-[13.5px] text-lv-muted">{costMicrocopy}</p>
    </div>
  );
}
```

`src/components/site/ScopeTable.tsx` (vergelijkingsmatrix §15):

```tsx
import { packages, formatEuro } from "@/content/pricing";

export function ScopeTable() {
  const rows: { label: string; cell: (i: number) => string }[] = [
    { label: "Inrichting vanaf", cell: (i) => formatEuro(packages[i].setupFrom) },
    { label: "Beheer per maand vanaf", cell: (i) => formatEuro(packages[i].monthlyFrom) },
    { label: "Kleine wijzigingen per maand", cell: (i) => packages[i].changeHoursPerMonth !== undefined ? `${String(packages[i].changeHoursPerMonth).replace(".", ",")} uur` : "In het voorstel" },
    { label: "Wat erin zit", cell: (i) => packages[i].includes.join(" · ") },
    { label: "Niet inbegrepen", cell: (i) => packages[i].notIncluded.join(" · ") },
  ];
  return (
    <div className="overflow-x-auto rounded-3xl border border-lv-line bg-lv-surface" role="region" aria-label="Pakketten vergeleken" tabIndex={0}>
      <table className="w-full min-w-[760px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-lv-line-soft">
            <th scope="col" className="w-[20%] p-4" />
            {packages.map((p) => <th key={p.id} scope="col" className="p-4 font-display text-[16px] font-semibold">{p.name}{p.badge && <span className="ml-2 rounded-full bg-lv-lime px-2 py-0.5 font-mono text-[10px] font-normal">{p.badge}</span>}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-lv-line-soft last:border-0 align-top">
              <th scope="row" className="p-4 font-medium">{r.label}</th>
              {packages.map((p, i) => <td key={p.id} className="p-4 text-lv-body">{r.cell(i)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

`src/components/site/CategoryCard.tsx` en `ProcessCard.tsx`:

```tsx
// CategoryCard.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/content/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/${category.id}`} className="group flex h-full flex-col rounded-3xl border border-lv-line bg-lv-surface p-7 transition-colors hover:border-lv-ink">
      <h3 className="font-display text-[22px] font-semibold tracking-[-0.025em]">{category.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-lv-body">{category.cardLine}</p>
      <p className="mt-4 font-mono text-[11.5px] text-lv-faint">{category.subsegments.slice(0, 3).join(" · ")}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[14px] font-medium">{category.cardCta}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
    </Link>
  );
}
```

```tsx
// ProcessCard.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ProcessFamily } from "@/content/types";
import { categoryById } from "@/content/categories";

export function ProcessCard({ process, compact = false }: { process: ProcessFamily; compact?: boolean }) {
  return (
    <Link to={`/oplossingen/${process.id}`} className="group flex h-full flex-col rounded-3xl border border-lv-line bg-lv-surface p-7 transition-colors hover:border-lv-ink">
      <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em]">{process.name}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-lv-body">{process.cardLine}</p>
      {!compact && (
        <p className="mt-4 font-mono text-[11.5px] text-lv-faint">
          Bijvoorbeeld voor: {process.categoryIds.map((id) => categoryById(id)!.name.toLowerCase()).join(" en ")}
        </p>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium">Bekijk {process.name.toLowerCase()}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
    </Link>
  );
}
```

`src/components/site/index.ts`:

```ts
export * from "./Seo";
export * from "./CtaLink";
export * from "./SiteHeader";
export * from "./SiteFooter";
export * from "./CampaignHeader";
export * from "./SiteLayout";
export * from "./Section";
export * from "./Reveal";
export * from "./Faq";
export * from "./HumanControl";
export * from "./Steps";
export * from "./PricingCards";
export * from "./ScopeTable";
export * from "./CategoryCard";
export * from "./ProcessCard";
```

- [ ] **Step 10: Checks en build**

Run: `npx tsx scripts/check-lib.ts && npx tsx scripts/check-content.ts && npm run build`
Expected: beide ✓ (check-content scant nu ook `src/components/site` op euro-literals — er mogen er geen zijn), build slaagt.

- [ ] **Step 11: Commit**

```bash
git add src/lib/cta.ts src/lib/utm.ts src/lib/track.ts scripts/check-lib.ts src/components/site src/components/ui/grid-pattern.tsx
git commit -m "CTA-routing, UTM, tracking-no-op en gedeelde site-componenten

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: DemoStepper + `/voorbeelden`

**Files:**
- Create: `src/components/site/DemoStepper.tsx`, `src/pages/site/Voorbeelden.tsx`
- Modify: `src/components/site/index.ts` (export), `src/App.tsx` (route)

**Interfaces:**
- Consumes: `demos`, `demoById`, `DEMO_LABEL`, `DEMO_CLOSING`, `categoryById`, `checkHref`, `track`, `CtaLink`, `SiteLayout`, `Seo`, `SectionHead`, `Section`.
- Produces: `<DemoStepper demo={Demo} source={string} compact?={boolean} />` — tabs Input / Voorbereid / Volgende stap, eindigt met `DEMO_CLOSING` + knop "Bekijk of dit bij jullie past" → `checkHref({ source, demo: demo.id, process: demo.id })`. Pagina `Voorbeelden` op `/voorbeelden`, leest `?demo=` om die demo voorop te zetten.

- [ ] **Step 1: `DemoStepper.tsx`**

```tsx
import { useState } from "react";
import { AlertCircle, CheckCircle2, FileText, Mail } from "lucide-react";
import type { Demo } from "@/content/types";
import { DEMO_LABEL, DEMO_CLOSING } from "@/content/demos";
import { checkHref } from "@/lib/cta";
import { track } from "@/lib/track";
import { CtaLink } from "./CtaLink";
import { cn } from "@/lib/utils";

const TABS = ["Input", "Voorbereid", "Volgende stap"] as const;

export function DemoStepper({ demo, source, compact = false }: { demo: Demo; source: string; compact?: boolean }) {
  const [step, setStep] = useState(0);
  const go = (i: number) => { setStep(i); track("demo_step", { demo_id: demo.id, step: i + 1 }); };
  const tabId = (i: number) => `${demo.id}-tab-${i}`;
  const panelId = `${demo.id}-panel`;

  return (
    <div className="overflow-hidden rounded-3xl border border-lv-line bg-lv-surface shadow-[0_30px_70px_-34px_rgba(14,14,12,0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lv-line-soft bg-lv-raised px-5 py-3">
        <p className="font-display text-[15px] font-semibold">{demo.title}</p>
        <span className="rounded-full bg-lv-paper px-2.5 py-1 font-mono text-[10.5px] text-lv-muted ring-1 ring-lv-line">{DEMO_LABEL}</span>
      </div>

      <div role="tablist" aria-label={`${demo.title} in drie stappen`} className="flex gap-1 border-b border-lv-line-soft px-3 pt-3">
        {TABS.map((t, i) => (
          <button
            key={t} id={tabId(i)} role="tab" type="button" aria-selected={step === i} aria-controls={panelId}
            onClick={() => go(i)}
            className={cn("-mb-px rounded-t-lg border-b-2 px-3 py-2 text-[13.5px] font-medium", step === i ? "border-lv-ink text-lv-ink" : "border-transparent text-lv-muted hover:text-lv-ink")}
          >
            <span className="mr-1.5 font-mono text-[11px] text-lv-faint">{i + 1}</span>{t}
          </button>
        ))}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(step)} className={cn("p-5", compact ? "min-h-[280px]" : "min-h-[320px]")}>
        {step === 0 && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-lv-paper p-4">
              <p className="flex items-center gap-2 font-mono text-[11px] text-lv-faint"><Mail aria-hidden className="h-3.5 w-3.5" />{demo.input.channel}</p>
              <p className="mt-2 text-[13.5px] font-semibold">{demo.input.from}</p>
              <p className="text-[13.5px] text-lv-muted">{demo.input.subject}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-lv-body">{demo.input.body}</p>
            </div>
            <dl className="grid gap-2 sm:grid-cols-2">
              {demo.input.fields.map((f) => (
                <div key={f.label} className={cn("rounded-xl border px-3 py-2", f.value ? "border-lv-line-soft" : "border-dashed border-[#C2410C]/50 bg-[#FFF7ED]")}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-wider text-lv-faint">{f.label}</dt>
                  <dd className={cn("text-[14px]", !f.value && "text-[#9A3412]")}>{f.value ?? "Ontbreekt"}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <p className="flex items-start gap-2 text-[15px]"><FileText aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{demo.prepared.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-lv-lime-soft p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-lime-ink">Aanwezig</p>
                <ul className="mt-2 space-y-1.5 text-[14px]">{demo.prepared.present.map((x) => <li key={x} className="flex gap-2"><CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lv-lime-ink" />{x}</li>)}</ul>
              </div>
              <div className="rounded-2xl bg-[#FFF7ED] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-[#9A3412]">Ontbreekt</p>
                <ul className="mt-2 space-y-1.5 text-[14px]">{demo.prepared.missing.map((x) => <li key={x} className="flex gap-2"><AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#C2410C]" />{x}</li>)}</ul>
              </div>
            </div>
            {demo.prepared.source && <p className="font-mono text-[11.5px] text-lv-muted">Bron: {demo.prepared.source}</p>}
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-lv-line p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-faint">{demo.next.conceptTitle}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed">{demo.next.concept}</p>
              <p className="mt-3 inline-flex rounded-full bg-lv-paper px-2.5 py-1 font-mono text-[11px] text-lv-body ring-1 ring-lv-line">Status: {demo.next.status}</p>
            </div>
            <p className="text-[14px] text-lv-body"><span className="font-medium text-lv-ink">Je team beslist: </span>{demo.next.teamDecides}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-lv-line-soft bg-lv-raised p-5 sm:flex-row sm:items-center sm:justify-between">
        {step < 2
          ? <button type="button" onClick={() => go(step + 1)} className="rounded-full bg-lv-ink px-4 py-2 text-[14px] font-medium text-white">Volgende: {TABS[step + 1]}</button>
          : <p className="max-w-md text-[13px] text-lv-muted">{DEMO_CLOSING}</p>}
        {step === 2 && (
          <CtaLink to={checkHref({ source, demo: demo.id, process: demo.id })} ctaId={`demo-${demo.id}`} trackParams={{ demo_id: demo.id }} variant="lime" className="shrink-0">
            Bekijk of dit bij jullie past
          </CtaLink>
        )}
      </div>
    </div>
  );
}
```

Voeg `export * from "./DemoStepper";` toe aan `src/components/site/index.ts`.

- [ ] **Step 2: `src/pages/site/Voorbeelden.tsx`**

```tsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { demos } from "@/content/demos";
import { categoryById } from "@/content/categories";
import type { DemoId } from "@/content/types";
import { SiteLayout, Seo, Section, SectionHead, DemoStepper, Reveal } from "@/components/site";
import { track } from "@/lib/track";

export default function Voorbeelden() {
  const [params] = useSearchParams();
  const requested = params.get("demo") as DemoId | null;
  const ordered = requested && demos.some((d) => d.id === requested)
    ? [demos.find((d) => d.id === requested)!, ...demos.filter((d) => d.id !== requested)]
    : demos;

  useEffect(() => { if (requested) track("demo_open", { demo_id: requested }); }, [requested]);

  return (
    <SiteLayout>
      <Seo title="Voorbeelden | Lead Velocity" description="Vier gelabelde voorbeelden met fictieve gegevens: van binnengekomen informatie via voorbereiding naar een volgende actie." path="/voorbeelden" />
      <Section>
        <SectionHead as="h1" eyebrow="Voorbeelden" title="Bekijk wat een werkstroom concreet oplevert." intro="Vier illustratieve demo's met fictieve gegevens. Elk voorbeeld laat drie stappen zien: binnengekomen informatie, voorbereiding en de volgende actie." />
        <div className="mt-14 space-y-16">
          {ordered.map((d) => (
            <Reveal key={d.id}>
              <div id={d.id} className="grid scroll-mt-24 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-faint">{categoryById(d.categoryId)!.name}</p>
                  <h2 className="mt-2 font-display text-[28px] font-semibold tracking-[-0.03em]">{d.title}</h2>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-lv-body">{d.prepared.summary}</p>
                </div>
                <DemoStepper demo={d} source="voorbeelden" />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 3: Route toevoegen in `src/App.tsx`**

Voeg bij de imports toe: `import Voorbeelden from "./pages/site/Voorbeelden";` en vóór de `*`-route: `<Route path="/voorbeelden" element={<Voorbeelden />} />`.

- [ ] **Step 4: Checks, build en visuele check**

Run: `npx tsx scripts/check-content.ts && npm run build` → ✓ en build slaagt.
Start `npx vite --port 5179` en open `http://localhost:5179/voorbeelden?demo=aftersales`: de claimdemo staat bovenaan; tabs schakelen met muis en Tab/Enter; stap 3 toont de slotzin en de knop met `href` `/werkstroomcheck?source=voorbeelden&process=aftersales&demo=aftersales`.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/DemoStepper.tsx src/components/site/index.ts src/pages/site/Voorbeelden.tsx src/App.tsx
git commit -m "DemoStepper met vier gelabelde demo's + /voorbeelden

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Homepage

**Files:**
- Create: `src/pages/site/Home.tsx`
- Modify: `src/App.tsx` (vervang de `/`-route door de nieuwe Home)

**Interfaces:**
- Consumes: `home`, `categories`, `processes`, `demos`, `demoById`, `checkHref`, `demoHref`, alle site-componenten.
- Produces: pagina op `/` met de 11 secties uit handover §8 in deze volgorde: hero, herkenbare situaties, voor wie, één concreet proces, breder dan intake, werkwijze, team in controle, pakketten, voorbeelden, over, FAQ + slot.

- [ ] **Step 1: `src/pages/site/Home.tsx`**

```tsx
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, FileSearch, BellRing } from "lucide-react";
import { home } from "@/content/pages";
import { categories } from "@/content/categories";
import { processes } from "@/content/processes";
import { demoById } from "@/content/demos";
import { checkHref, demoHref } from "@/lib/cta";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, CategoryCard,
  ProcessCard, Steps, HumanControl, PricingCards, Faq,
} from "@/components/site";

const SITUATION_ICONS = [ClipboardList, FileSearch, BellRing];

export default function Home() {
  const heroDemo = demoById("offerte-intake")!;
  const exampleDemos = [demoById("aftersales")!, demoById("service-intake")!];

  return (
    <SiteLayout>
      <Seo title={home.seoTitle} description={home.seoDescription} path="/" />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20">
        <GridPattern width={56} height={56} className="fill-transparent stroke-lv-line/70 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,#000_35%,transparent_100%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal><p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-lv-muted">{home.hero.eyebrow}</p></Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-balance font-display text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">{home.hero.h1}</h1>
            </Reveal>
            <Reveal delay={0.1}><p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-lv-body">{home.hero.sub}</p></Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <CtaLink to={checkHref({ source: "home-hero" })} ctaId="home-hero-check">{home.hero.primary}</CtaLink>
              <CtaLink to={demoHref(undefined, "home-hero")} ctaId="home-hero-demo" variant="secondary">{home.hero.secondary}</CtaLink>
            </Reveal>
            <Reveal delay={0.2}><p className="mt-4 text-[13.5px] text-lv-muted">{home.hero.micro}</p></Reveal>
          </div>
          <Reveal delay={0.1}><DemoStepper demo={heroDemo} source="home-hero" compact /></Reveal>
        </div>
      </section>

      {/* 2 — Herkenbare situaties */}
      <Section tone="raised">
        <SectionHead title={home.situations.h2} intro={home.situations.intro} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {home.situations.cards.map((c, i) => {
            const Icon = SITUATION_ICONS[i];
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-lv-line bg-lv-surface p-7">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.6} />
                  <h3 className="mt-5 font-display text-[21px] font-semibold tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-lv-body">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 3 — Voor wie */}
      <Section>
        <SectionHead eyebrow="Voor wie" title={home.forWhom.h2} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => <Reveal key={c.id} delay={i * 0.05}><CategoryCard category={c} /></Reveal>)}
        </div>
      </Section>

      {/* 4 — Eén concreet proces */}
      <Section tone="raised">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead title={home.oneProcess.h2} intro={home.oneProcess.body} />
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-lv-line bg-lv-surface p-6">
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-faint">{home.oneProcess.label}</p>
              <dl className="mt-4 divide-y divide-lv-line-soft text-[14.5px]">
                {[
                  ["Klant", "Voorbeelddealer B"],
                  ["Referentie", "Claim Demo-100"],
                  ["Ontbrekend bewijs", "Aankoopbewijs"],
                  ["Volgende actie", "Conceptvraag aan dealer, wacht op review"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-3"><dt className="text-lv-muted">{k}</dt><dd className={k === "Ontbrekend bewijs" ? "text-[#9A3412]" : ""}>{v}</dd></div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — Breder dan intake */}
      <Section>
        <SectionHead title={home.broader.h2} intro={home.broader.body} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processes.map((p, i) => <Reveal key={p.id} delay={i * 0.05}><ProcessCard process={p} compact /></Reveal>)}
        </div>
      </Section>

      {/* 6 — Werkwijze */}
      <Section tone="raised">
        <SectionHead eyebrow="Werkwijze" title={home.method.h2} />
        <div className="mt-12"><Steps steps={home.method.steps} /></div>
        <Link to="/werkwijze" className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium">{home.method.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
      </Section>

      {/* 7 — Team in controle */}
      <Section>
        <Reveal><HumanControl title={home.control.h2} body={home.control.body} prepared={["Informatie verzamelen", "Ontbrekende gegevens markeren", "Conceptberichten klaarzetten", "Open acties bijhouden"]} decides="Productkeuzes, prijzen, garanties en technische beoordelingen." /></Reveal>
      </Section>

      {/* 8 — Pakketten */}
      <Section tone="raised" id="pakketten">
        <SectionHead eyebrow="Pakketten" title={home.packages.h2} />
        <div className="mt-12"><PricingCards source="home-packages" /></div>
        <Link to="/prijzen" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium">{home.packages.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
      </Section>

      {/* 9 — Voorbeelden */}
      <Section>
        <SectionHead eyebrow="Voorbeelden" title={home.examples.h2} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {exampleDemos.map((d) => <Reveal key={d.id}><DemoStepper demo={d} source="home-examples" compact /></Reveal>)}
        </div>
      </Section>

      {/* 10 — Over */}
      <Section tone="raised">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.035em]">{home.about.h2}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-lv-body">{home.about.body}</p>
          <CtaLink to="/over" ctaId="home-about" variant="secondary" className="mt-7">{home.about.cta}</CtaLink>
        </Reveal>
      </Section>

      {/* 11 — FAQ + slot */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
          <Reveal delay={0.06}><Faq ids={home.faqIds} /></Reveal>
        </div>
      </Section>
      <section className="px-4 pb-6 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-lv-ink px-7 py-20 text-center text-white">
          <GridPattern width={48} height={48} className="fill-transparent stroke-white/[0.07]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{home.closing.h2}</h2>
            <p className="mx-auto mt-5 max-w-lg text-[17px] text-white/70">{home.closing.body}</p>
            <CtaLink to={checkHref({ source: "home-bottom" })} ctaId="home-bottom" variant="lime" className="mt-9">{home.closing.cta}</CtaLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: Route**

In `src/App.tsx`: vervang `import Home from "./pages/Home";` door `import Home from "./pages/site/Home";`. De `<Route path="/" element={<Home />} />` blijft staan.

- [ ] **Step 3: Checks, build, visueel**

Run: `npx tsx scripts/check-content.ts && npm run build` → ✓.
Open `http://localhost:5179/` op 1440 en 390 px: 11 secties in de volgorde hierboven; "Plan een werkstroomcheck" in hero linkt naar `/werkstroomcheck?source=home-hero`; "Bekijk een voorbeeld" naar `/voorbeelden?source=home-hero`; geen horizontale scroll op 390 px.

- [ ] **Step 4: Commit**

```bash
git add src/pages/site/Home.tsx src/App.tsx
git commit -m "Homepage volgens handover §8

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Categoriepagina's + `/voor-wie`

**Files:**
- Create: `src/pages/site/CategoryPage.tsx`, `src/pages/site/VoorWie.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Category`, `categoryById`, `categories`, `GENERIC_NOT_FIT`, `demoById`, `voorWie`, `processes`, `werkwijze`, `home.method.steps`, componenten.
- Produces: `<CategoryPage id={CategoryId} />`, routes `/groothandels`, `/importeurs-distributeurs`, `/service-onderhoud`, `/maatwerk-montage`, `/voor-wie`.

- [ ] **Step 1: `CategoryPage.tsx`** (sectievolgorde handover §9: hero → taken → werkstroomvoorbeeld → teamcontrole → demo → passend/niet passend → werkwijze → prijzen → FAQ → CTA)

```tsx
import { Check, X } from "lucide-react";
import type { CategoryId } from "@/content/types";
import { categoryById, GENERIC_NOT_FIT } from "@/content/categories";
import { demoById } from "@/content/demos";
import { home } from "@/content/pages";
import { checkHref, demoHref } from "@/lib/cta";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, HumanControl, Steps, PricingCards, Faq, Eyebrow,
} from "@/components/site";

export default function CategoryPage({ id }: { id: CategoryId }) {
  const c = categoryById(id)!;
  const demo = demoById(c.demoId)!;
  const checkCtx = { category: c.id, process: c.processKey } as const;

  return (
    <SiteLayout>
      <Seo title={c.seoTitle} description={c.seoDescription} path={`/${c.id}`} />

      <Section className="pt-14 md:pt-20">
        <Eyebrow>{c.name}</Eyebrow>
        <SectionHead as="h1" title={c.h1} intro={c.sub} />
        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          <CtaLink to={checkHref({ ...checkCtx, source: `category-${c.id}` })} ctaId={`category-${c.id}-check`} trackParams={{ category: c.id, process: c.processKey }}>{c.primaryCta}</CtaLink>
          <CtaLink to={demoHref(c.demoId, `category-${c.id}`)} ctaId={`category-${c.id}-demo`} variant="secondary">{c.secondaryCta}</CtaLink>
        </Reveal>
        <p className="mt-6 font-mono text-[12px] text-lv-faint">Bijvoorbeeld: {c.subsegments.join(" · ")}</p>
      </Section>

      <Section tone="raised">
        <SectionHead title="Herkenbare taken" />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.tasks.map((t, i) => (
            <Reveal key={t} delay={i * 0.04}><li className="flex h-full gap-3 rounded-2xl border border-lv-line bg-lv-surface p-5 text-[15.5px]"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{t}</li></Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead title="Zo loopt een werkstroom" intro="Een voorbeeld met fictieve gegevens." />
        <ol className="mt-10 flex flex-wrap items-center gap-2 text-[14.5px]">
          {c.exampleFlow.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-lv-line bg-lv-surface px-3.5 py-2"><span className="mr-2 font-mono text-[11px] text-lv-faint">{i + 1}</span>{s}</span>
              {i < c.exampleFlow.length - 1 && <span aria-hidden className="text-lv-faint">→</span>}
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="raised">
        <HumanControl title="Je team houdt het oordeel." body={c.teamDecides} prepared={c.tasks.slice(0, 3)} decides={[c.teamDecides, ...c.limits].join(" ")} />
      </Section>

      <Section id="demo">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Voorbeeld" title={demo.title} intro={demo.prepared.summary} />
          <DemoStepper demo={demo} source={`category-${c.id}`} />
        </div>
      </Section>

      <Section tone="raised">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>Passend</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{c.fit.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
            <Eyebrow className="mt-8">Wat we meten</Eyebrow>
            <ul className="space-y-2 text-[15px] text-lv-body">{c.measures.map((x) => <li key={x}>— {x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line p-8">
            <Eyebrow>Niet passend</Eyebrow>
            <ul className="space-y-3 text-[15.5px] text-lv-body">{[...c.limits, ...GENERIC_NOT_FIT].map((x) => <li key={x} className="flex gap-3"><X aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Werkwijze" title={home.method.h2} />
        <div className="mt-12"><Steps steps={home.method.steps} /></div>
      </Section>

      <Section tone="raised">
        <SectionHead eyebrow="Prijzen" title={home.packages.h2} />
        <div className="mt-12"><PricingCards source={`category-${c.id}`} /></div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
          <Faq ids={c.faqIds} />
        </div>
        <div className="mt-16 rounded-[28px] bg-lv-ink p-10 text-center text-white">
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold tracking-[-0.035em]">{home.closing.h2}</h2>
          <CtaLink to={checkHref({ ...checkCtx, source: `category-${c.id}-bottom` })} ctaId={`category-${c.id}-bottom`} variant="lime" className="mt-8">{c.primaryCta}</CtaLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: `VoorWie.tsx`**

```tsx
import { Check, X } from "lucide-react";
import { voorWie } from "@/content/pages";
import { categories, GENERIC_NOT_FIT } from "@/content/categories";
import { processes } from "@/content/processes";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CategoryCard, ProcessCard, CtaLink, Eyebrow } from "@/components/site";

export default function VoorWie() {
  return (
    <SiteLayout>
      <Seo title={voorWie.seoTitle} description={voorWie.seoDescription} path="/voor-wie" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Voor wie" title={voorWie.h1} intro={voorWie.intro} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => <Reveal key={c.id} delay={i * 0.05}><CategoryCard category={c} /></Reveal>)}
        </div>
      </Section>
      <Section tone="raised">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{voorWie.fitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{voorWie.fit.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line p-8">
            <Eyebrow>{voorWie.notFitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px] text-lv-body">{GENERIC_NOT_FIT.map((x) => <li key={x} className="flex gap-3"><X aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="Oplossingen" title="Procesingangen" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processes.map((p) => <ProcessCard key={p.id} process={p} />)}
        </div>
      </Section>
      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em]">{voorWie.otherTitle}</h2>
          <p className="mt-3 text-[16.5px] leading-relaxed text-lv-body">{voorWie.otherBody}</p>
          <CtaLink to={checkHref({ source: "voor-wie" })} ctaId="voor-wie-check" className="mt-7">Plan een werkstroomcheck</CtaLink>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 3: Routes in `src/App.tsx`**

Imports: `import CategoryPage from "./pages/site/CategoryPage";` en `import VoorWie from "./pages/site/VoorWie";`. Vóór de `*`-route:

```tsx
            <Route path="/voor-wie" element={<VoorWie />} />
            <Route path="/groothandels" element={<CategoryPage key="groothandels" id="groothandels" />} />
            <Route path="/importeurs-distributeurs" element={<CategoryPage key="importeurs-distributeurs" id="importeurs-distributeurs" />} />
            <Route path="/service-onderhoud" element={<CategoryPage key="service-onderhoud" id="service-onderhoud" />} />
            <Route path="/maatwerk-montage" element={<CategoryPage key="maatwerk-montage" id="maatwerk-montage" />} />
```

- [ ] **Step 4: Checks, build, visueel**

Run: `npx tsx scripts/check-content.ts && npm run build` → ✓.
Open `/groothandels`: H1 "Van offerteaanvraag naar compleet dossier, met minder uitzoekwerk."; primaire knop → `/werkstroomcheck?source=category-groothandels&category=groothandels&process=offerte-intake`; tab-titel "Automatisering voor technische groothandels | Lead Velocity". Controleer alle vier en `/voor-wie` op 390 px.

- [ ] **Step 5: Commit**

```bash
git add src/pages/site/CategoryPage.tsx src/pages/site/VoorWie.tsx src/App.tsx
git commit -m "Vier categoriepagina's en /voor-wie volgens handover §9 en §15

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: `/oplossingen` + vier procespagina's

**Files:**
- Create: `src/pages/site/Oplossingen.tsx`, `src/pages/site/ProcessPage.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `processes`, `processById`, `categoryById`, `demoById`, `oplossingenIndex`, componenten.
- Produces: routes `/oplossingen` en `/oplossingen/:id` voor de vier `ProcessFamilyId`'s. Onbekende `:id` die niet in `redirects` staat → `NotFound`.

- [ ] **Step 1: `Oplossingen.tsx`**

```tsx
import { oplossingenIndex } from "@/content/pages";
import { processes } from "@/content/processes";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, ProcessCard, CtaLink } from "@/components/site";

export default function Oplossingen() {
  return (
    <SiteLayout>
      <Seo title={oplossingenIndex.seoTitle} description={oplossingenIndex.seoDescription} path="/oplossingen" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Oplossingen" title={oplossingenIndex.h1} intro={oplossingenIndex.intro} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {processes.map((p, i) => <Reveal key={p.id} delay={i * 0.05}><ProcessCard process={p} /></Reveal>)}
        </div>
      </Section>
      <Section tone="raised">
        <SectionHead title={oplossingenIndex.baseTitle} />
        <ol className="mt-10 flex flex-wrap gap-2 text-[14.5px]">
          {oplossingenIndex.baseSteps.map((s, i) => (
            <li key={s} className="rounded-full border border-lv-line bg-lv-surface px-3.5 py-2"><span className="mr-2 font-mono text-[11px] text-lv-faint">{i + 1}</span>{s}</li>
          ))}
        </ol>
        <CtaLink to={checkHref({ source: "oplossingen" })} ctaId="oplossingen-check" className="mt-10">Plan een werkstroomcheck</CtaLink>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: `ProcessPage.tsx`** (handover §10: H1, situatie, in-/output, voorbeeld, menselijke grens, benodigde input, passende categorieën, CTA; geen prijskaart)

```tsx
import { useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import type { ProcessFamilyId } from "@/content/types";
import { processById } from "@/content/processes";
import { categoryById } from "@/content/categories";
import { demoById } from "@/content/demos";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, HumanControl, CategoryCard, Eyebrow } from "@/components/site";
import NotFound from "@/pages/NotFound";

export default function ProcessPage() {
  const { id } = useParams();
  const p = processById(id as ProcessFamilyId);
  if (!p) return <NotFound />;
  const demo = p.demoId ? demoById(p.demoId) : undefined;

  return (
    <SiteLayout>
      <Seo title={p.seoTitle} description={p.seoDescription} path={`/oplossingen/${p.id}`} />
      <Section className="pt-14 md:pt-20">
        <Eyebrow>{p.name}</Eyebrow>
        <SectionHead as="h1" title={p.h1} intro={p.situation} />
        <CtaLink to={checkHref({ source: `process-${p.id}`, process: p.ctaProcess })} ctaId={`process-${p.id}-check`} trackParams={{ process: p.ctaProcess }} className="mt-8">{p.ctaLabel}</CtaLink>
      </Section>

      <Section tone="raised">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Reveal><div className="rounded-3xl border border-lv-line bg-lv-surface p-7"><Eyebrow>Input</Eyebrow><p className="font-display text-[22px] font-semibold tracking-[-0.02em]">{p.input}</p></div></Reveal>
          <ArrowRight aria-hidden className="mx-auto h-6 w-6 rotate-90 text-lv-faint md:rotate-0" />
          <Reveal delay={0.06}><div className="rounded-3xl bg-lv-ink p-7 text-white"><Eyebrow className="text-white/50">Output</Eyebrow><p className="font-display text-[22px] font-semibold tracking-[-0.02em]">{p.output}</p></div></Reveal>
        </div>
        <p className="mt-6 text-[15px] text-lv-body"><span className="font-medium text-lv-ink">Bouwblokken: </span>{p.modules.join(" · ")}. <span className="font-medium text-lv-ink">Resultaat: </span>{p.result}.</p>
      </Section>

      {demo && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Voorbeeld" title={demo.title} intro={demo.prepared.summary} />
            <DemoStepper demo={demo} source={`process-${p.id}`} />
          </div>
        </Section>
      )}

      <Section tone={demo ? "raised" : "paper"}>
        <HumanControl title="Waar het systeem stopt" body={p.humanLimit} decides={p.humanLimit} />
        <div className="mt-8 rounded-3xl border border-lv-line bg-lv-surface p-8">
          <Eyebrow>Wat we van jullie nodig hebben</Eyebrow>
          <ul className="space-y-3 text-[15.5px]">{p.neededInput.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
        </div>
        {p.extraBlock && (
          <div className="mt-8 rounded-3xl border border-lv-line bg-lv-lime-soft p-8">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{p.extraBlock.title}</h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-lv-body">{p.extraBlock.body}</p>
          </div>
        )}
      </Section>

      <Section>
        <SectionHead eyebrow="Passend bij" title="Bijvoorbeeld voor deze bedrijven" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {p.categoryIds.map((id) => <CategoryCard key={id} category={categoryById(id)!} />)}
        </div>
        <CtaLink to={checkHref({ source: `process-${p.id}-bottom`, process: p.ctaProcess })} ctaId={`process-${p.id}-bottom`} className="mt-12">{p.ctaLabel}</CtaLink>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 3: Routes**

Imports `Oplossingen` en `ProcessPage` uit `./pages/site/...`. Vervang de bestaande `<Route path="/oplossingen/:slug" element={<OplossingPage />} />` door:

```tsx
            <Route path="/oplossingen" element={<Oplossingen />} />
            <Route path="/oplossingen/:id" element={<ProcessPage />} />
```

Verwijder de import van `OplossingPage` (het bestand zelf gaat in Task 11 weg). De oude slugs (`/oplossingen/chatbots` enz.) worden in Task 11 als expliciete redirect-routes vóór `/oplossingen/:id` gezet; tot dan tonen ze NotFound.

- [ ] **Step 4: Checks, build, visueel**

Run: `npx tsx scripts/check-content.ts && npm run build` → ✓.
Open `/oplossingen/communicatie-opvolging`: H1 "Herhaalcommunicatie voorbereiden. Open acties zichtbaar houden."; WhatsApp-blok aanwezig; geen prijskaart; knop → `/werkstroomcheck?source=process-communicatie-opvolging&process=opvolging`. Open `/oplossingen/onzin` → NotFound.

- [ ] **Step 5: Commit**

```bash
git add src/pages/site/Oplossingen.tsx src/pages/site/ProcessPage.tsx src/App.tsx
git commit -m "/oplossingen en vier procespagina's volgens handover §10

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: `/prijzen`, `/werkwijze`, `/over`

**Files:**
- Create: `src/pages/site/Prijzen.tsx`, `src/pages/site/Werkwijze.tsx`, `src/pages/site/Over.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `prijzenPage`, `werkwijze`, `over`, `analysis`, `managementIncludes`, `costMicrocopy`, `scopeLine`, `extraWork`, `formatEuro`, `contact`, componenten.
- Produces: routes `/prijzen` (met `id="faq"` op de FAQ-sectie, voor de `/faq`-redirect), `/werkwijze`, `/over`.

- [ ] **Step 1: `Prijzen.tsx`**

```tsx
import { Check } from "lucide-react";
import { prijzenPage } from "@/content/pages";
import { analysis, managementIncludes, costMicrocopy, scopeLine, extraWork, formatEuro } from "@/content/pricing";
import { SiteLayout, Seo, Section, SectionHead, Reveal, PricingCards, ScopeTable, Faq, Eyebrow } from "@/components/site";

export default function Prijzen() {
  return (
    <SiteLayout>
      <Seo title={prijzenPage.seoTitle} description={prijzenPage.seoDescription} path="/prijzen" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Prijzen" title={prijzenPage.h1} intro={prijzenPage.intro} />
        <div className="mt-12"><PricingCards source="prijzen" showIncludes /></div>
        <p className="mt-6 text-[15px] font-medium">{scopeLine}</p>
      </Section>

      <Section tone="raised">
        <SectionHead title={prijzenPage.matrixTitle} />
        <div className="mt-10"><ScopeTable /></div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal><div className="h-full rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{prijzenPage.managementTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{managementIncludes.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div></Reveal>
          <Reveal delay={0.06}><div className="h-full rounded-3xl border border-lv-line p-8">
            <Eyebrow>{prijzenPage.extraTitle}</Eyebrow>
            <p className="text-[15.5px] leading-relaxed text-lv-body">{extraWork}</p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-lv-body">{costMicrocopy}</p>
          </div></Reveal>
        </div>
        <Reveal><div className="mt-4 grid gap-6 rounded-3xl bg-lv-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Eyebrow className="text-white/50">{prijzenPage.analysisTitle}</Eyebrow>
            <p className="font-display text-[26px] font-semibold tracking-[-0.03em]">{formatEuro(analysis.price)} <span className="text-[15px] font-normal text-white/60">verrekenbaar binnen {analysis.creditDays} dagen</span></p>
            <p className="mt-2 max-w-xl text-[15px] text-white/70">{prijzenPage.analysisBody}</p>
          </div>
          <ul className="space-y-1.5 text-[14.5px] text-white/85">{analysis.includes.map((x) => <li key={x} className="flex gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lv-lime" />{x}</li>)}</ul>
        </div></Reveal>
      </Section>

      <Section tone="raised">
        <SectionHead title={prijzenPage.termsTitle} />
        <ul className="mt-8 space-y-3 text-[15.5px]">{prijzenPage.terms.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
      </Section>

      <Section id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Over kosten en scope." />
          <Faq ids={prijzenPage.faqIds} />
        </div>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 2: `Werkwijze.tsx`**

```tsx
import { werkwijze } from "@/content/pages";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink } from "@/components/site";

export default function Werkwijze() {
  return (
    <SiteLayout>
      <Seo title={werkwijze.seoTitle} description={werkwijze.seoDescription} path="/werkwijze" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Werkwijze" title={werkwijze.h1} intro={werkwijze.intro} />
        <ol className="mt-14 space-y-4">
          {werkwijze.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <li className="grid gap-5 rounded-3xl border border-lv-line bg-lv-surface p-7 md:grid-cols-[12rem_1fr_1fr_1fr]">
                <div>
                  <span className="font-mono text-[12px] text-lv-faint">Stap {i + 1}</span>
                  <h2 className="mt-1 font-display text-[24px] font-semibold tracking-[-0.025em]">{s.title}</h2>
                </div>
                {(["output", "client", "decision"] as const).map((k) => (
                  <div key={k}>
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-faint">{werkwijze.stepLabels[k]}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{s[k]}</p>
                  </div>
                ))}
              </li>
            </Reveal>
          ))}
        </ol>
        <CtaLink to={checkHref({ source: "werkwijze" })} ctaId="werkwijze-check" className="mt-12">Plan een werkstroomcheck</CtaLink>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 3: `Over.tsx`** (typografisch; geen foto tot er een geverifieerde is)

```tsx
import { Check } from "lucide-react";
import { over } from "@/content/pages";
import { contact } from "@/content/site";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, Eyebrow } from "@/components/site";

export default function Over() {
  return (
    <SiteLayout>
      <Seo title={over.seoTitle} description={over.seoDescription} path="/over" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Over Lead Velocity" title={over.h1} intro={over.founder} />
        <Reveal><blockquote className="mt-12 max-w-3xl border-l-2 border-lv-ink pl-6 font-display text-[clamp(1.3rem,2.4vw,1.7rem)] leading-snug tracking-[-0.02em]">{over.mission}</blockquote></Reveal>
      </Section>
      <Section tone="raised">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{over.skillsTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{over.skills.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{over.principlesTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{over.principles.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
      </Section>
      <Section>
        <p className="text-[15.5px] text-lv-body">Contact: <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a> · <a className="underline underline-offset-4" href={contact.phoneHref}>{contact.phone}</a> · <a className="underline underline-offset-4" href={contact.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a></p>
        <CtaLink to={checkHref({ source: "over" })} ctaId="over-check" className="mt-8">Plan een werkstroomcheck</CtaLink>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 4: Routes**

Imports uit `./pages/site/`. Verwijder in `App.tsx` de oude `/over-ons`- en `/onze-aanpak`-routes en hun imports (bestanden gaan in Task 11 weg) en voeg toe:

```tsx
            <Route path="/prijzen" element={<Prijzen />} />
            <Route path="/werkwijze" element={<Werkwijze />} />
            <Route path="/over" element={<Over />} />
```

- [ ] **Step 5: Checks, build, visueel**

Run: `npx tsx scripts/check-content.ts && npm run build` → ✓ (check-content controleert dat er geen euro-literals in deze pagina's staan).
Open `/prijzen` op 360 px: matrix scrollt binnen zijn container, pagina zelf scrolt niet horizontaal; Werkstroom-kaart toont "Aanbevolen start"; knoppen "Bespreek …" → `/werkstroomcheck?source=prijzen&package=…`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/site/Prijzen.tsx src/pages/site/Werkwijze.tsx src/pages/site/Over.tsx src/App.tsx
git commit -m "/prijzen, /werkwijze en /over volgens handover §6 en §15

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Campagnepagina's

**Files:**
- Create: `src/pages/site/CampaignPage.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `campaignById`, `categoryById`, `demoById`, `standardPackages`, `formatEuro`, `scopeLine`, `costMicrocopy`, `checkHref`, `CampaignHeader`, `CampaignFooter`, `Seo`, `DemoStepper`, `HumanControl`, `Faq`, `useScrollTopAndUtm`.
- Produces: `<CampaignPage id={CampaignId} />`, routes `/campagnes/offerte-intake|aftersales|service-intake|project-intake`, alle met `noindex`.

- [ ] **Step 1: `CampaignPage.tsx`** (vaste volgorde §11: hero → drie taken → demo → voorbereiden/team beslist → hoe check werkt → prijsindicatie en scope → FAQ → CTA)

```tsx
import { Check } from "lucide-react";
import type { CampaignId } from "@/content/types";
import { campaignById } from "@/content/campaigns";
import { categoryById } from "@/content/categories";
import { demoById } from "@/content/demos";
import { standardPackages, formatEuro, scopeLine, costMicrocopy } from "@/content/pricing";
import { checkHref } from "@/lib/cta";
import {
  Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, HumanControl, Faq, Eyebrow,
  CampaignHeader, CampaignFooter, useScrollTopAndUtm,
} from "@/components/site";

export default function CampaignPage({ id }: { id: CampaignId }) {
  useScrollTopAndUtm();
  const c = campaignById(id)!;
  const cat = categoryById(c.categoryId)!;
  const demo = demoById(c.demoId)!;
  const href = (src: string) => checkHref({ source: src, category: c.categoryId, process: c.id, campaign: c.id });
  const from = standardPackages[0];

  return (
    <div className="min-h-screen bg-lv-paper text-lv-ink">
      <Seo title={c.seoTitle} description={c.seoDescription} path={`/campagnes/${c.id}`} noindex />
      <CampaignHeader ctaHref={href(`campaign-${c.id}-header`)} ctaLabel={c.primaryLabel} ctaId={`campaign-${c.id}-header`} />
      <main id="main">
        <Section className="pt-14 md:pt-20">
          <Eyebrow>{cat.name}</Eyebrow>
          <SectionHead as="h1" title={c.h1} intro={c.sub} />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <CtaLink to={href(`campaign-${c.id}-hero`)} ctaId={`campaign-${c.id}-hero`} trackParams={{ campaign_id: c.id }}>{c.primaryLabel}</CtaLink>
            <CtaLink to="#demo" ctaId={`campaign-${c.id}-demo`} variant="secondary">Bekijk het voorbeeld</CtaLink>
          </Reveal>
        </Section>

        <Section tone="raised">
          <SectionHead title={c.message} />
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {c.tasks.map((t) => <li key={t} className="flex gap-3 rounded-2xl border border-lv-line bg-lv-surface p-5 text-[15.5px]"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{t}</li>)}
          </ul>
        </Section>

        <Section id="demo">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Voorbeeld" title={demo.title} intro={demo.prepared.summary} />
            <DemoStepper demo={demo} source={`campaign-${c.id}`} />
          </div>
        </Section>

        <Section tone="raised">
          <HumanControl title="Wat we voorbereiden. Wat je team beslist." body={cat.teamDecides} prepared={c.tasks} decides={[cat.teamDecides, ...cat.limits].join(" ")} />
        </Section>

        <Section>
          <SectionHead title="Hoe de werkstroomcheck werkt" intro="In een gesprek van 20 minuten bekijken we welk werk terugkomt, wat je huidige software al doet en of een afgebakende eerste stap zinvol is. De check is kosteloos." />
        </Section>

        <Section tone="raised">
          <SectionHead title="Prijsindicatie en scope" intro={scopeLine} />
          <p className="mt-6 font-display text-[22px] font-semibold tracking-[-0.02em]">Inrichting vanaf {formatEuro(from.setupFrom)}, beheer vanaf {formatEuro(from.monthlyFrom)} per maand.</p>
          <p className="mt-3 text-[14px] text-lv-muted">{costMicrocopy}</p>
        </Section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
            <Faq ids={c.faqIds} />
          </div>
          <div className="mt-16 rounded-[28px] bg-lv-ink p-10 text-center text-white">
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold tracking-[-0.035em]">{c.h1}</h2>
            <CtaLink to={href(`campaign-${c.id}-bottom`)} ctaId={`campaign-${c.id}-bottom`} variant="lime" className="mt-8">{c.primaryLabel}</CtaLink>
          </div>
        </Section>
      </main>
      <CampaignFooter />
    </div>
  );
}
```

Let op: de prijsregel gebruikt `formatEuro` op data uit `pricing.ts` — geen literal, dus `check-content` blijft groen.

- [ ] **Step 2: Routes**

Import `CampaignPage`. Voeg toe:

```tsx
            <Route path="/campagnes/offerte-intake" element={<CampaignPage key="offerte-intake" id="offerte-intake" />} />
            <Route path="/campagnes/aftersales" element={<CampaignPage key="aftersales" id="aftersales" />} />
            <Route path="/campagnes/service-intake" element={<CampaignPage key="service-intake" id="service-intake" />} />
            <Route path="/campagnes/project-intake" element={<CampaignPage key="project-intake" id="project-intake" />} />
```

- [ ] **Step 3: Checks, build, visueel**

Run: `npx tsx scripts/check-content.ts && npm run build` → ✓.
Open `/campagnes/aftersales`: geen hoofdnavigatie, alleen logo + één knop; "Bekijk het voorbeeld" scrolt naar `#demo` zonder formulier te openen; in DevTools `<meta name="robots" content="noindex, follow">` en canonical `https://www.leadvelocity.nl/campagnes/aftersales`; knop → `/werkstroomcheck?source=campaign-aftersales-hero&category=importeurs-distributeurs&process=aftersales&campaign=aftersales`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/site/CampaignPage.tsx src/App.tsx
git commit -m "Vier campagnepagina's (noindex) volgens handover §11

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Aanvraagflow — formulier, Edge Function, migratie, `/bedankt`, `/privacy`

**Files:**
- Create: `supabase/functions/werkstroomcheck/schema.ts`, `supabase/functions/werkstroomcheck/index.ts`
- Create: `supabase/migrations/20261009120000_werkstroomcheck_requests.sql`
- Modify: `supabase/config.toml`
- Create: `scripts/check-werkstroomcheck-schema.ts`
- Create: `src/components/site/CheckForm.tsx`, `src/pages/site/Werkstroomcheck.tsx`, `src/pages/site/Bedankt.tsx`, `src/pages/site/Privacy.tsx`
- Modify: `src/components/site/index.ts`, `src/App.tsx`

**Interfaces:**
- Consumes: `parseCheckContext`, `CheckContext`, `readUtm`, `track`, `checkPage`, `bedanktPage`, `privacy`, `processOptions`, `categoryOptions`, `frequencyOptions`, `contact`, `demoHref`.
- Produces:
  - Request-body `WerkstroomcheckPayload` (zie `schema.ts`), endpoint `supabase.functions.invoke("werkstroomcheck", { body })` → `{ ok: true, duplicate?: true }` bij 200; `{ ok: false, errors }` bij 400; `{ ok: false }` bij 500.
  - Routes `/werkstroomcheck`, `/bedankt` (noindex), `/privacy`.

- [ ] **Step 1: Gedeeld schema — `supabase/functions/werkstroomcheck/schema.ts`**

Dit bestand wordt zowel in Deno (Edge Function) als in Node (test) gebruikt; daarom importeert het zod via een parameter.

```ts
// Gedeeld validatieschema. Import van zod gebeurt door de aanroeper (Deno: npm:zod, Node/Vite: zod).
// deno-lint-ignore no-explicit-any
export function makeSchema(z: any) {
  const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal("").transform(() => undefined));
  return z
    .object({
      request_id: z.string().uuid(),
      name: z.string().trim().min(2, "Vul je naam in").max(120),
      company: z.string().trim().min(2, "Vul je bedrijfsnaam in").max(160),
      email: z.string().trim().email("Vul een geldig e-mailadres in").max(200),
      category: opt(40),
      process: opt(40),
      work: z.string().trim().min(5, "Beschrijf kort welk werk steeds terugkomt").max(1500),
      phone: opt(40),
      contact_preference: z.enum(["email", "bel"]).default("email"),
      frequency: z.enum(["dagelijks", "wekelijks", "minder-vaak", "onbekend"]).optional(),
      software: opt(300),
      website: opt(200), // honeypot — moet leeg blijven
      context: z
        .object({
          source: opt(64), category: opt(40), process: opt(40), package: opt(40), demo: opt(40), campaign: opt(40),
          utm_source: opt(100), utm_medium: opt(100), utm_campaign: opt(100), utm_content: opt(100),
          page: opt(200),
        })
        .default({}),
    })
    .superRefine((v: { contact_preference: string; phone?: string }, ctx: { addIssue: (i: unknown) => void }) => {
      if (v.contact_preference === "bel" && !(v.phone && v.phone.replace(/\D/g, "").length >= 8)) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Vul een telefoonnummer in als we je mogen bellen" });
      }
    });
}
```

- [ ] **Step 2: Schematest — `scripts/check-werkstroomcheck-schema.ts`**

```ts
// Run: npx tsx scripts/check-werkstroomcheck-schema.ts
import { z } from "zod";
import { makeSchema } from "../supabase/functions/werkstroomcheck/schema";

const schema = makeSchema(z);
const fouten: string[] = [];
const base = {
  request_id: "3f1c9a5e-8b7d-4c2a-9e1f-2a6b5c4d3e21",
  name: "Test Persoon", company: "Testbedrijf BV", email: "test@testbedrijf.nl",
  work: "Offerteaanvragen overtypen", contact_preference: "email", context: { source: "header" },
};
const ok = (v: unknown, m: string) => { const r = schema.safeParse(v); if (!r.success) fouten.push(`${m}: verwacht geldig, kreeg ${JSON.stringify(r.error.issues)}`); };
const bad = (v: unknown, path: string, m: string) => {
  const r = schema.safeParse(v);
  if (r.success) fouten.push(`${m}: verwacht ongeldig`);
  else if (!r.error.issues.some((i: { path: (string | number)[] }) => i.path.join(".") === path)) fouten.push(`${m}: verwacht fout op '${path}', kreeg ${JSON.stringify(r.error.issues.map((i: { path: unknown }) => i.path))}`);
};

ok(base, "minimaal geldig");
ok({ ...base, contact_preference: "bel", phone: "+31 6 12345678" }, "bel met telefoon");
bad({ ...base, contact_preference: "bel" }, "phone", "bel zonder telefoon");
bad({ ...base, email: "geen-mail" }, "email", "ongeldige mail");
bad({ ...base, name: "" }, "name", "lege naam");
bad({ ...base, work: "" }, "work", "leeg werkveld");
bad({ ...base, request_id: "abc" }, "request_id", "request_id geen uuid");
bad({ ...base, frequency: "elk uur" }, "frequency", "onbekende frequentie");
ok({ ...base, phone: "", software: "" }, "lege optionele velden zijn toegestaan");

if (fouten.length) { console.error(`✗ ${fouten.length}:\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ werkstroomcheck-schema klopt");
```

Run: `npx tsx scripts/check-werkstroomcheck-schema.ts` → eerst FAIL (`schema.ts` bestaat nog niet als je deze stap vóór Step 1 draait); na Step 1 → `✓`.

- [ ] **Step 3: Migratie — `supabase/migrations/20261009120000_werkstroomcheck_requests.sql`**

```sql
-- Aanvragen voor een werkstroomcheck (handover §13).
-- Schrijven gebeurt uitsluitend via de Edge Function met de service role;
-- RLS staat aan zonder publieke policies.

CREATE TABLE IF NOT EXISTS public.werkstroomcheck_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT,
  process TEXT,
  work TEXT NOT NULL,
  phone TEXT,
  contact_preference TEXT NOT NULL DEFAULT 'email',
  frequency TEXT,
  software TEXT,
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  notify_status TEXT NOT NULL DEFAULT 'pending',
  stage TEXT NOT NULL DEFAULT 'lead',
  owner TEXT,
  next_action TEXT,
  next_action_date DATE
);

ALTER TABLE public.werkstroomcheck_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_werkstroomcheck_requests_created ON public.werkstroomcheck_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_werkstroomcheck_requests_stage ON public.werkstroomcheck_requests(stage);
```

- [ ] **Step 4: Edge Function — `supabase/functions/werkstroomcheck/index.ts`**

```ts
// Werkstroomcheck-aanvraag (handover §13).
// Flow: valideer → honeypot → insert (dedupe op request_id) → mail via Resend → 200.
// Deploy (alleen met akkoord): supabase functions deploy werkstroomcheck
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.23.8";
import { makeSchema } from "./schema.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const schema = makeSchema(z);
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { ok: false });

  let raw: unknown;
  try { raw = await req.json(); } catch { return json(400, { ok: false, errors: [{ path: [], message: "Ongeldige JSON" }] }); }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) return json(400, { ok: false, errors: parsed.error.issues.map((i: { path: unknown; message: string }) => ({ path: i.path, message: i.message })) });
  const v = parsed.data;

  if (v.website) return json(200, { ok: true }); // honeypot: stil negeren

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) { console.error("Supabase env ontbreekt"); return json(500, { ok: false }); }
  const db = createClient(url, key);

  const row = {
    request_id: v.request_id, name: v.name, company: v.company, email: v.email,
    category: v.category ?? null, process: v.process ?? null, work: v.work,
    phone: v.phone ?? null, contact_preference: v.contact_preference,
    frequency: v.frequency ?? null, software: v.software ?? null, context: v.context,
  };
  const { error: insertError } = await db.from("werkstroomcheck_requests").insert(row);
  if (insertError) {
    if (insertError.code === "23505") return json(200, { ok: true, duplicate: true }); // unique request_id
    console.error("Insert mislukt", insertError.message);
    return json(500, { ok: false });
  }

  let notify = "sent";
  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) throw new Error("RESEND_API_KEY ontbreekt");
    const resend = new Resend(apiKey);
    const lines: [string, unknown][] = [
      ["Naam", v.name], ["Bedrijf", v.company], ["E-mail", v.email], ["Telefoon", v.phone],
      ["Contactvoorkeur", v.contact_preference], ["Categorie", v.category], ["Proces", v.process],
      ["Werk dat terugkomt", v.work], ["Frequentie", v.frequency], ["Software", v.software],
      ["Context", JSON.stringify(v.context)], ["Request-ID", v.request_id],
    ];
    await resend.emails.send({
      from: "Lead Velocity <info@leadvelocity.nl>",
      to: ["info@leadvelocity.nl"],
      reply_to: v.email,
      subject: `Werkstroomcheck: ${v.company}`,
      html: `<h2>Nieuwe aanvraag werkstroomcheck</h2><table>${lines.filter(([, x]) => x).map(([k, x]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(x)}</td></tr>`).join("")}</table>`,
    });
  } catch (e) {
    notify = "failed";
    console.error("Notificatie mislukt", (e as Error).message);
  }
  await db.from("werkstroomcheck_requests").update({ notify_status: notify }).eq("request_id", v.request_id);

  return json(200, { ok: true });
});
```

- [ ] **Step 5: `supabase/config.toml`**

Voeg onderaan toe:

```toml
[functions.werkstroomcheck]
verify_jwt = false
```

- [ ] **Step 6: Run schematest**

Run: `npx tsx scripts/check-werkstroomcheck-schema.ts` → `✓ werkstroomcheck-schema klopt`.

- [ ] **Step 7: `src/components/site/CheckForm.tsx`**

```tsx
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { makeSchema } from "../../../supabase/functions/werkstroomcheck/schema";
import { supabase } from "@/integrations/supabase/client";
import { checkPage } from "@/content/pages";
import { categoryOptions, processOptions, frequencyOptions, contact } from "@/content/site";
import type { CheckContext } from "@/lib/cta";
import { readUtm } from "@/lib/utm";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const schema = makeSchema(z);
type Values = z.input<typeof schema>;

const field = "w-full rounded-xl border border-lv-line bg-lv-surface px-4 py-3 text-[15.5px] outline-none focus:border-lv-ink";
const label = "mb-1.5 block text-[14px] font-medium";

export function CheckForm({ ctx }: { ctx: CheckContext }) {
  const navigate = useNavigate();
  const requestId = useMemo(() => crypto.randomUUID(), []);
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      request_id: requestId,
      category: ctx.category ?? "",
      process: ctx.process ?? "",
      contact_preference: "email",
      context: {},
    },
  });
  const pref = watch("contact_preference");

  const onFirstInput = () => {
    if (!started.current) { started.current = true; track("form_start", { category: ctx.category, process: ctx.process, campaign_id: ctx.campaign, package_id: ctx.package }); }
  };

  const onSubmit = async (v: Values) => {
    if (status === "submitting") return;
    setStatus("submitting");
    const utm = readUtm();
    const body = {
      ...v,
      context: {
        source: ctx.source, category: ctx.category, process: ctx.process, package: ctx.package, demo: ctx.demo, campaign: ctx.campaign,
        utm_source: utm.source, utm_medium: utm.medium, utm_campaign: utm.campaign, utm_content: utm.content,
        page: window.location.pathname,
      },
    };
    try {
      const { data, error } = await supabase.functions.invoke("werkstroomcheck", { body });
      if (error || !data?.ok) throw error ?? new Error("Niet geaccepteerd");
      track("form_submit_success", { category: ctx.category, process: ctx.process, campaign_id: ctx.campaign, package_id: ctx.package });
      navigate("/bedankt", { state: { demo: ctx.demo, preference: v.contact_preference } });
    } catch {
      track("form_submit_error", { category: ctx.category, process: ctx.process });
      setStatus("error");
    }
  };

  const err = (k: keyof Values) => errors[k]?.message as string | undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} onInput={onFirstInput} noValidate className="space-y-5" aria-describedby={status === "error" ? "form-error" : undefined}>
      <input type="hidden" {...register("request_id")} />
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Naam</label>
          <input id="name" autoComplete="name" className={cn(field, err("name") && "border-red-600")} aria-invalid={!!err("name")} aria-describedby={err("name") ? "name-err" : undefined} {...register("name")} />
          {err("name") && <p id="name-err" className="mt-1 text-[13px] text-red-700">{err("name")}</p>}
        </div>
        <div>
          <label htmlFor="company" className={label}>Bedrijf</label>
          <input id="company" autoComplete="organization" className={cn(field, err("company") && "border-red-600")} aria-invalid={!!err("company")} aria-describedby={err("company") ? "company-err" : undefined} {...register("company")} />
          {err("company") && <p id="company-err" className="mt-1 text-[13px] text-red-700">{err("company")}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>Zakelijk e-mailadres</label>
        <input id="email" type="email" autoComplete="email" className={cn(field, err("email") && "border-red-600")} aria-invalid={!!err("email")} aria-describedby={err("email") ? "email-err" : undefined} {...register("email")} />
        {err("email") && <p id="email-err" className="mt-1 text-[13px] text-red-700">{err("email")}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={label}>Categorie <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <select id="category" className={field} {...register("category")}>
            <option value="">Kies…</option>
            {categoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="process" className={label}>Proces <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <select id="process" className={field} {...register("process")}>
            <option value="">Kies…</option>
            {processOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="work" className={label}>Welk werk komt steeds terug?</label>
        <textarea id="work" rows={4} className={cn(field, err("work") && "border-red-600")} aria-invalid={!!err("work")} aria-describedby={err("work") ? "work-err" : undefined} {...register("work")} />
        {err("work") && <p id="work-err" className="mt-1 text-[13px] text-red-700">{err("work")}</p>}
      </div>

      <fieldset>
        <legend className={label}>Contactvoorkeur</legend>
        <div className="flex gap-3">
          {(["email", "bel"] as const).map((p) => (
            <label key={p} className="flex cursor-pointer items-center gap-2 rounded-xl border border-lv-line bg-lv-surface px-4 py-2.5 text-[15px]">
              <input type="radio" value={p} {...register("contact_preference")} />{p === "email" ? "E-mail" : "Bel mij"}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="phone" className={label}>Telefoon {pref !== "bel" && <span className="font-normal text-lv-muted">(optioneel)</span>}</label>
        <input id="phone" type="tel" autoComplete="tel" className={cn(field, err("phone") && "border-red-600")} aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "phone-err" : undefined} {...register("phone")} />
        {err("phone") && <p id="phone-err" className="mt-1 text-[13px] text-red-700">{err("phone")}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="frequency" className={label}>Hoe vaak komt het voor? <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <select id="frequency" className={field} {...register("frequency", { setValueAs: (x) => x || undefined })}>
            <option value="">Kies…</option>
            {frequencyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="software" className={label}>Huidige software <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <input id="software" className={field} {...register("software")} />
        </div>
      </div>

      <p className="text-[13.5px] text-lv-muted">{checkPage.privacy} <Link to="/privacy" className="underline underline-offset-4">{checkPage.privacyLink}</Link></p>

      {status === "error" && (
        <p id="form-error" role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14.5px] text-red-800">
          {checkPage.error} <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="inline-flex w-full items-center justify-center rounded-full bg-lv-ink px-6 py-3.5 text-[15.5px] font-medium text-white disabled:opacity-60 sm:w-auto">
        {status === "submitting" ? checkPage.submitting : checkPage.submit}
      </button>
    </form>
  );
}
```

Voeg `export * from "./CheckForm";` toe aan `src/components/site/index.ts`.

Als `tsc`/Vite het relatieve import-pad naar `supabase/functions/...` buiten `src` weigert (tsconfig `include`), voeg dan `"supabase/functions/werkstroomcheck/schema.ts"` toe aan `include` in `tsconfig.app.json`. Vite bundelt bestanden buiten `src` gewoon.

- [ ] **Step 8: Pagina's**

`src/pages/site/Werkstroomcheck.tsx`:

```tsx
import { useLocation } from "react-router-dom";
import { checkPage } from "@/content/pages";
import { contact } from "@/content/site";
import { parseCheckContext } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, CheckForm } from "@/components/site";

export default function Werkstroomcheck() {
  const ctx = parseCheckContext(useLocation().search);
  return (
    <SiteLayout>
      <Seo title={checkPage.seoTitle} description={checkPage.seoDescription} path="/werkstroomcheck" />
      <Section className="pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead as="h1" eyebrow="Werkstroomcheck" title={checkPage.h1} intro={checkPage.intro} />
            {contact.calendarUrl && (
              <a href={contact.calendarUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full px-5 py-3 text-[15px] font-medium ring-1 ring-lv-line">
                {checkPage.calendar} (Europe/Amsterdam)
              </a>
            )}
          </div>
          <div className="rounded-3xl border border-lv-line bg-lv-surface/70 p-6 sm:p-8">
            <CheckForm ctx={ctx} />
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
```

`src/pages/site/Bedankt.tsx`:

```tsx
import { useLocation } from "react-router-dom";
import { bedanktPage } from "@/content/pages";
import type { DemoId } from "@/content/types";
import { demoHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, CtaLink } from "@/components/site";

export default function Bedankt() {
  const demo = (useLocation().state as { demo?: DemoId } | null)?.demo;
  return (
    <SiteLayout>
      <Seo title={bedanktPage.seoTitle} path="/bedankt" noindex />
      <Section className="pt-20 md:pt-28">
        <SectionHead as="h1" title={bedanktPage.h1} intro={bedanktPage.body} />
        <CtaLink to={demoHref(demo, "bedankt")} ctaId="bedankt-demo" variant="secondary" className="mt-8">{bedanktPage.cta}</CtaLink>
      </Section>
    </SiteLayout>
  );
}
```

`src/pages/site/Privacy.tsx`:

```tsx
import { privacy } from "@/content/privacy";
import { SiteLayout, Seo, Section, SectionHead } from "@/components/site";

export default function Privacy() {
  return (
    <SiteLayout>
      <Seo title={privacy.seoTitle} description={privacy.seoDescription} path="/privacy" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" title={privacy.h1} />
        <p className="mt-4 inline-flex rounded-full bg-lv-lime-soft px-3 py-1 font-mono text-[12px] text-lv-lime-ink">{privacy.draftNotice}</p>
        <div className="mt-10 max-w-3xl space-y-8">
          {privacy.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{s.title}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-lv-body">{s.body}</p>
            </section>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 9: Routes**

Imports uit `./pages/site/`. Voeg toe:

```tsx
            <Route path="/werkstroomcheck" element={<Werkstroomcheck />} />
            <Route path="/bedankt" element={<Bedankt />} />
            <Route path="/privacy" element={<Privacy />} />
```

- [ ] **Step 10: Checks, build, handmatige formuliercheck**

Run: `npx tsx scripts/check-werkstroomcheck-schema.ts && npx tsx scripts/check-content.ts && npm run build` → alles ✓.
Open `/werkstroomcheck?category=groothandels&process=offerte-intake`: categorie en proces zijn voorgeselecteerd. Klik verzenden met lege velden → veldfouten bij naam, bedrijf, e-mail, werk; kies "Bel mij" zonder telefoon → fout bij telefoon. (Een echte verzending faalt lokaal totdat de functie gedeployed is — verwacht: foutmelding met behouden invoer. De e2e-test in Task 12 stubt de server.)

- [ ] **Step 11: Commit**

```bash
git add supabase/functions/werkstroomcheck supabase/migrations/20261009120000_werkstroomcheck_requests.sql supabase/config.toml scripts/check-werkstroomcheck-schema.ts src/components/site/CheckForm.tsx src/components/site/index.ts src/pages/site/Werkstroomcheck.tsx src/pages/site/Bedankt.tsx src/pages/site/Privacy.tsx src/App.tsx
git add tsconfig.app.json 2>/dev/null || true
git commit -m "Aanvraagflow: werkstroomcheck-formulier, Edge Function, migratie, /bedankt, /privacy

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Routing afronden, redirects, opruimen, inzichten, sitemap, CLAUDE.md

**Files:**
- Modify: `src/App.tsx` (volledig herschrijven)
- Create: `scripts/check-redirects.ts`, `scripts/generate-sitemap.ts`, `public/sitemap.xml`
- Modify: `public/robots.txt`, `src/pages/NotFound.tsx`, `src/components/BlogPost.tsx`, `src/components/PromptPackPage.tsx`, `src/pages/Inzichten.tsx`, `src/pages/whitepapers/*.tsx`, `src/pages/BrandAssets.tsx`, `CLAUDE.md`
- Delete: zie Step 4

**Interfaces:**
- Consumes: `redirects`, `indexableRoutes`, `SITE_URL`, `SiteLayout`, `Seo`.
- Produces: definitieve `App.tsx` met alle fase-1-routes, redirect-routes, behouden inzichten-routes, `/brand` (noindex) en `*` → NotFound.

- [ ] **Step 1: Test — `scripts/check-redirects.ts`**

```ts
// Run: npx tsx scripts/check-redirects.ts
import { readFileSync } from "node:fs";
import { redirects, indexableRoutes, processes } from "../src/content";

const app = readFileSync("src/App.tsx", "utf8");
const routePaths = new Set([...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]));
// /oplossingen/:id rendert alleen de vier bekende procesfamilies
if (routePaths.has("/oplossingen/:id")) processes.forEach((p) => routePaths.add(`/oplossingen/${p.id}`));
const fouten: string[] = [];

for (const r of redirects) {
  const target = r.to.split("#")[0];
  if (!routePaths.has(target)) fouten.push(`redirect ${r.from} → ${r.to}: doel ${target} is geen route`);
  if (redirects.some((x) => x.from === target)) fouten.push(`redirect-keten: ${r.from} → ${target} → …`);
  if (routePaths.has(r.from)) fouten.push(`redirect ${r.from} botst met een gewone route`);
}
for (const p of indexableRoutes) if (!routePaths.has(p)) fouten.push(`indexeerbare route ${p} bestaat niet in App.tsx`);
if (!app.includes("redirects.map")) fouten.push("App.tsx moet redirects uit src/content/redirects.ts renderen");
const idxRedirectsMap = app.indexOf("redirects.map");
const idxProcessParam = app.indexOf('path="/oplossingen/:id"');
if (idxRedirectsMap === -1 || idxProcessParam === -1 || idxRedirectsMap > idxProcessParam) fouten.push("redirects moeten vóór /oplossingen/:id staan (oude slugs)");

if (fouten.length) { console.error(`✗ ${fouten.length}:\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ redirects en routes kloppen");
```

Run: `npx tsx scripts/check-redirects.ts` → FAIL (`App.tsx moet redirects … renderen`).

- [ ] **Step 2: Herschrijf `src/App.tsx`**

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { redirects } from "./content/redirects";
import Home from "./pages/site/Home";
import VoorWie from "./pages/site/VoorWie";
import CategoryPage from "./pages/site/CategoryPage";
import Oplossingen from "./pages/site/Oplossingen";
import ProcessPage from "./pages/site/ProcessPage";
import Werkwijze from "./pages/site/Werkwijze";
import Prijzen from "./pages/site/Prijzen";
import Voorbeelden from "./pages/site/Voorbeelden";
import Over from "./pages/site/Over";
import Werkstroomcheck from "./pages/site/Werkstroomcheck";
import Bedankt from "./pages/site/Bedankt";
import Privacy from "./pages/site/Privacy";
import CampaignPage from "./pages/site/CampaignPage";
import Inzichten from "./pages/Inzichten";
import AiInGroothandel2026 from "./pages/inzichten/AiInGroothandel2026";
import AiPricingVoorGroothandel from "./pages/inzichten/AiPricingVoorGroothandel";
import AiVoorMaakindustrieOee from "./pages/inzichten/AiVoorMaakindustrieOee";
import PredictiveMaintenanceMachinebouw from "./pages/inzichten/PredictiveMaintenanceMachinebouw";
import VrachtwagenheffingAiCompensatie from "./pages/inzichten/VrachtwagenheffingAiCompensatie";
import CsrdScope3AutomatiseringTransport from "./pages/inzichten/CsrdScope3AutomatiseringTransport";
import GroothandelWhitepaper2026 from "./pages/whitepapers/GroothandelWhitepaper2026";
import MaakindustrieWhitepaper2026 from "./pages/whitepapers/MaakindustrieWhitepaper2026";
import TransportWhitepaper2026 from "./pages/whitepapers/TransportWhitepaper2026";
import GroothandelPromptPack from "./pages/promptpacks/GroothandelPromptPack";
import MaakindustriePromptPack from "./pages/promptpacks/MaakindustriePromptPack";
import TransportPromptPack from "./pages/promptpacks/TransportPromptPack";
import BrandAssets from "./pages/BrandAssets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            {/* Oude URL's → inhoudelijk passende nieuwe route (client-side; 301 op hosting = livegang-punt) */}
            {redirects.map((r) => <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />)}

            <Route path="/" element={<Home />} />
            <Route path="/voor-wie" element={<VoorWie />} />
            <Route path="/groothandels" element={<CategoryPage key="groothandels" id="groothandels" />} />
            <Route path="/importeurs-distributeurs" element={<CategoryPage key="importeurs-distributeurs" id="importeurs-distributeurs" />} />
            <Route path="/service-onderhoud" element={<CategoryPage key="service-onderhoud" id="service-onderhoud" />} />
            <Route path="/maatwerk-montage" element={<CategoryPage key="maatwerk-montage" id="maatwerk-montage" />} />
            <Route path="/oplossingen" element={<Oplossingen />} />
            <Route path="/oplossingen/:id" element={<ProcessPage />} />
            <Route path="/werkwijze" element={<Werkwijze />} />
            <Route path="/prijzen" element={<Prijzen />} />
            <Route path="/voorbeelden" element={<Voorbeelden />} />
            <Route path="/over" element={<Over />} />
            <Route path="/werkstroomcheck" element={<Werkstroomcheck />} />
            <Route path="/bedankt" element={<Bedankt />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/campagnes/offerte-intake" element={<CampaignPage key="offerte-intake" id="offerte-intake" />} />
            <Route path="/campagnes/aftersales" element={<CampaignPage key="aftersales" id="aftersales" />} />
            <Route path="/campagnes/service-intake" element={<CampaignPage key="service-intake" id="service-intake" />} />
            <Route path="/campagnes/project-intake" element={<CampaignPage key="project-intake" id="project-intake" />} />

            {/* Inzichten — footer-only, inhoud ongewijzigd */}
            <Route path="/inzichten" element={<Inzichten />} />
            <Route path="/inzichten/ai-in-nederlandse-technische-groothandel-2026" element={<AiInGroothandel2026 />} />
            <Route path="/inzichten/ai-pricing-voor-groothandel" element={<AiPricingVoorGroothandel />} />
            <Route path="/inzichten/ai-voor-nederlandse-maakindustrie-oee" element={<AiVoorMaakindustrieOee />} />
            <Route path="/inzichten/predictive-maintenance-machinebouw" element={<PredictiveMaintenanceMachinebouw />} />
            <Route path="/inzichten/vrachtwagenheffing-2026-ai-compensatie" element={<VrachtwagenheffingAiCompensatie />} />
            <Route path="/inzichten/csrd-scope-3-automatisering-transport" element={<CsrdScope3AutomatiseringTransport />} />
            <Route path="/whitepapers/ai-in-technische-groothandel-2026" element={<GroothandelWhitepaper2026 />} />
            <Route path="/whitepapers/ai-voor-nederlandse-maakindustrie-2026" element={<MaakindustrieWhitepaper2026 />} />
            <Route path="/whitepapers/ai-voor-nederlandse-transport-2026" element={<TransportWhitepaper2026 />} />
            <Route path="/bronnen/prompts/groothandel-2026" element={<GroothandelPromptPack />} />
            <Route path="/bronnen/prompts/maakindustrie-2026" element={<MaakindustriePromptPack />} />
            <Route path="/bronnen/prompts/transport-2026" element={<TransportPromptPack />} />
            <Route path="/brand" element={<BrandAssets />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
```

(Houd `<Toaster />`/`<Sonner />` alleen als het oude `App.tsx` ze rendert; controleer de oude onderkant van het bestand en neem die exact over. `ExitIntentPopup` wordt niet meer gerenderd.)

Run: `npx tsx scripts/check-redirects.ts` → `✓`.

- [ ] **Step 3: Inzichten, whitepapers, promptpacks, brand en NotFound in de nieuwe layout**

In `src/components/BlogPost.tsx`, `src/components/PromptPackPage.tsx`, `src/pages/Inzichten.tsx` en de drie `src/pages/whitepapers/*.tsx`:
- vervang `import NavbarNew from '…/NavbarNew';` en `import FooterNew from '…/FooterNew';` door `import { SiteHeader, SiteFooter } from '@/components/site';`
- vervang `<NavbarNew />` door `<SiteHeader />` en `<FooterNew />` door `<SiteFooter />`.

Run: `grep -rn "NavbarNew\|FooterNew" src/pages/Inzichten.tsx src/pages/inzichten src/pages/whitepapers src/pages/promptpacks src/components/BlogPost.tsx src/components/PromptPackPage.tsx` → geen output.

In `src/pages/BrandAssets.tsx`: voeg `import { Seo } from '@/components/site';` toe en direct binnen het buitenste element `<Seo title="Brand assets | Lead Velocity" path="/brand" noindex />`.

Vervang `src/pages/NotFound.tsx` door:

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteLayout, Seo, Section, SectionHead, CtaLink } from "@/components/site";

export default function NotFound() {
  const { pathname } = useLocation();
  useEffect(() => { console.error("404:", pathname); }, [pathname]);
  return (
    <SiteLayout>
      <Seo title="Pagina niet gevonden | Lead Velocity" path={pathname} noindex />
      <Section className="pt-24">
        <SectionHead as="h1" title="Deze pagina bestaat niet (meer)." intro="Misschien is de inhoud verhuisd. Begin bij de homepage of bekijk de voorbeelden." />
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/" ctaId="404-home" variant="secondary">Naar de homepage</CtaLink>
          <CtaLink to="/voorbeelden" ctaId="404-demo">Bekijk de voorbeelden</CtaLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
```

- [ ] **Step 4: Verwijder oude pagina's, componenten en data**

```bash
git rm src/pages/Home.tsx src/pages/Index.tsx src/pages/LeadGen.tsx src/pages/AIAutomation.tsx src/pages/Gateway.tsx \
  src/pages/Groothandel.tsx src/pages/Maakindustrie.tsx src/pages/Transport.tsx src/pages/OverOns.tsx src/pages/OnzeAanpak.tsx \
  src/pages/Faq.tsx src/pages/Cases.tsx src/pages/Bronnen.tsx src/pages/Nieuwsbrief.tsx src/pages/TipsEnTricks.tsx \
  src/pages/AiOpsAudit.tsx src/pages/OplossingPage.tsx src/pages/AiKansenscan.tsx src/pages/AiKansenscanResult.tsx \
  src/pages/AiReadinessAssessment.tsx src/pages/AiReadinessAssessmentResult.tsx src/pages/LpAssessment.tsx \
  src/components/ExitIntentPopup.tsx src/data/oplossingen.ts src/data/aanbod.ts scripts/check-aanbod.ts
```

Zoek daarna componenten zonder gebruikers en verwijder ze:

```bash
for f in src/components/*.tsx; do
  n=$(basename "$f" .tsx)
  if ! grep -rqE "from ['\"][^'\"]*/$n['\"]|from ['\"]\./$n['\"]" src --include=*.tsx --include=*.ts; then echo "$f"; fi
done
```

Verwijder met `git rm` elk bestand dat dit print. Herhaal de lus tot hij niets meer print (verwijderen kan nieuwe wezen opleveren). Doe hetzelfde voor `src/data/*.ts`, `src/data/assessment/*` en `src/hooks/*.ts` (pas de grep aan op het pad). `src/components/ui/*` niet aanraken. Draai na elke ronde `npm run build`.

- [ ] **Step 5: Sitemap + robots**

`scripts/generate-sitemap.ts`:

```ts
// Run: npx tsx scripts/generate-sitemap.ts
import { writeFileSync } from "node:fs";
import { indexableRoutes, SITE_URL } from "../src/content";

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes.map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
writeFileSync("public/sitemap.xml", xml);
console.log(`✓ sitemap met ${indexableRoutes.length} URL's`);
```

Run: `npx tsx scripts/generate-sitemap.ts` → `✓ sitemap met 30 URL's`.
Voeg aan het eind van `public/robots.txt` toe: `Sitemap: https://www.leadvelocity.nl/sitemap.xml` (als die regel nog niet bestaat).

- [ ] **Step 6: Herschrijf CLAUDE.md**

Vervang de inhoud van de secties §1, §3, §5, §7 (alleen "Routes" en "Key componenten"), §9, §10 en §11, en de regel over persoonsnamen in §6 en §13, door de tekst hieronder. Laat §2, §4, §6 (behalve de namenregel), §8, §12 ongewijzigd. Zet beide datums "Laatst bijgewerkt" op 2026-10-09.

§1:

```markdown
## 1. Wat is Lead Velocity?

**Lead Velocity automatiseert het terugkerende uitzoekwerk, de communicatie en de opvolging in de commerciële en administratieve operatie van het MKB.**

Merkbelofte: **Minder uitzoekwerk. Meer werk gedaan.**

**Leidende bron:** [`docs/strategy/2026-10-09-website-gtm-handover.md`](./docs/strategy/2026-10-09-website-gtm-handover.md). Bij twijfel over positionering, copy, prijzen of claims gaat dat document voor.

**Bron van waarheid voor copy en prijzen op de site:** `src/content/*`. Check: `npx tsx scripts/check-content.ts`.
```

§3:

```markdown
## 3. Wat we verkopen — drie pakketten plus Custom

Prijzen staan in `src/content/pricing.ts` (vanaf, excl. btw). Wijzig je een prijs, wijzig hem daar én hier; de check controleert dat.

- **Voorbereiden — €2.950 + €595** per maand — relevante informatie en conceptacties klaarzetten voor je team
- **Werkstroom — €4.950 + €1.250** per maand — aanbevolen start; één proces van intake tot afgesproken opvolging
- **Opschalen — €7.950 + €1.950** per maand — een bewezen werkstroom uitbreiden
- **Custom — €12.500 + €2.500** per maand — meerdere processen of bijzondere koppelingen

Funnel: gratis werkstroomcheck (20 min) → gelabeld voorbeeld → analyse €750 (verrekenbaar binnen 60 dagen) → vaste scope en prijs → inrichting → acceptatie → maanddienst → uitbreiding.

Op de site: "We leggen vooraf vast wat wordt opgeleverd en wanneer de maanddienst start." Geen garantie of "geld terug" tot de contracttekst er is.

Vier procesfamilies: aanvragen en dossiers · communicatie en opvolging · data en inzicht · commerciële voorbereiding.
```

§5:

```markdown
## 5. Doelgroep

Eerste selectiehypothese: circa 10–75 medewerkers, minstens twee mensen in het betreffende kantoorproces, digitaal binnenkomende informatie en genoeg herhaling. Buyer: eigenaar/directeur, of binnendienst-, aftersales-, service- of operationeel manager met de directie voor budget.

Vier categorieën (websiteingangen): technische groothandels · importeurs en distributeurs · service en onderhoud · maatwerk en montage. Fietsen, koffieapparatuur en kozijnen zijn voorbeelden binnen categorieën, geen losse niches.
```

§6 namenregel (vervang de DON'T-regel over persoonlijke namen en de bijbehorende bullet in §13):

```markdown
- ❌ **Geen persoonlijke namen in copy**, behalve op `/over` en in de Over-sectie van de homepage, waar Bart Wilbrink als oprichter wordt genoemd (handover §8, §15). Elders "wij/ons".
```

§7 Routes en componenten:

```markdown
### Routes (fase 1)

`/` · `/voor-wie` · `/groothandels` · `/importeurs-distributeurs` · `/service-onderhoud` · `/maatwerk-montage` · `/oplossingen` (+ 4 detailpagina's) · `/werkwijze` · `/prijzen` · `/voorbeelden` · `/over` · `/werkstroomcheck` · `/bedankt` (noindex) · `/privacy` · `/campagnes/*` (4, noindex) · `/inzichten` (footer-only). Oude routes: `src/content/redirects.ts`.

### Structuur

- `src/content/*` — alle copy, prijzen, demo's, campagnes (getypeerd)
- `src/components/site/*` — SiteHeader, SiteFooter, DemoStepper, PricingCards, CheckForm, …
- `src/pages/site/*` — paginasjablonen (CategoryPage, ProcessPage, CampaignPage, …)
- `supabase/functions/werkstroomcheck` — aanvraag opslaan + mail via Resend
```

§9:

```markdown
## 9. Beslissingen al genomen

- **De handover van 2026-10-09 is leidend** voor positionering, copy, prijzen en routes.
- **Vier categorieën, één pakketstructuur, één proces per campagne.**
- **Werkstroomcheck is de enige ingang**; de oude AI-kansenscan verwijst door.
- **Geen garantie op de site** tot de contracttekst er is.
- **Geen verzonnen bewijs:** demo's zijn gelabeld "Illustratieve demo"; cases en logo's alleen met goedgekeurde gegevens.
- **Huisstijl:** papier/inkt/lime, Schibsted Grotesk + Hanken Grotesk + JetBrains Mono; geen glow of netwerkanimaties.
- **Path C** — hybride 12-maanden lean, beslisdatum juni 2027.
```

§10:

```markdown
## 10. Open werkpunten

Zie `docs/superpowers/2026-10-09-livegang.md` voor livegang-afhankelijkheden (prijsakkoord, privacytekst, functie-deploy, contactgegevens, foto, agenda, 301's, analytics). Fase 2: `/campagnes/commerciele-voorbereiding`, `/resultaten/*` (alleen echt bewijs), claim-audit van `/inzichten`.
```

§11 "Hoe een klant typisch bij ons komt":

```markdown
1. Outreach of website → campagne- of categoriepagina → gelabelde demo
2. Werkstroomcheck (20 min, gratis) → analyse €750 (verrekenbaar binnen 60 dagen)
3. Vaste scope en prijs → inrichting → acceptatie → maanddienst → uitbreiding
```

Run: `npx tsx scripts/check-content.ts` → `✓` (de CLAUDE.md-prijscheck is nu actief omdat CLAUDE.md "Minder uitzoekwerk" bevat).

- [ ] **Step 7: Alle checks en build**

Run: `npx tsx scripts/check-content.ts && npx tsx scripts/check-lib.ts && npx tsx scripts/check-werkstroomcheck-schema.ts && npx tsx scripts/check-redirects.ts && npm run build`
Expected: vier ✓ en een geslaagde build.

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/pages/NotFound.tsx src/pages/BrandAssets.tsx src/components/BlogPost.tsx src/components/PromptPackPage.tsx src/pages/Inzichten.tsx src/pages/whitepapers scripts/check-redirects.ts scripts/generate-sitemap.ts public/sitemap.xml public/robots.txt CLAUDE.md
git add -u src scripts
git commit -m "Routing afgerond: redirects, oude site verwijderd, inzichten in nieuwe layout, sitemap, CLAUDE.md naar handover

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Volledige funnelcheck + livegang-overzicht

**Files:**
- Create: `scripts/e2e/funnel.mjs`, `docs/superpowers/2026-10-09-livegang.md`

**Interfaces:**
- Consumes: de draaiende dev-server op `http://localhost:5179`; Playwright via de env-variabele `PLAYWRIGHT_MODULE` (pad naar een geïnstalleerde `playwright`) en `CHROME_PATH` (Chromium-binary). Playwright wordt niet aan `package.json` toegevoegd.
- Produces: een rapport in de terminal + screenshots in `$OUT_DIR`.

- [ ] **Step 1: Installeer Playwright buiten de repo**

```bash
SCRATCH=${TMPDIR:-/tmp}/lv-e2e && mkdir -p "$SCRATCH" && cd "$SCRATCH" && npm init -y >/dev/null && npm i playwright@1.57.0 >/dev/null
ls ~/Library/Caches/ms-playwright | grep chromium
```

Kies een geïnstalleerde Chromium, bijvoorbeeld `~/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`. Staat er geen: `cd "$SCRATCH" && npx playwright install chromium`.

- [ ] **Step 2: `scripts/e2e/funnel.mjs`**

```js
// Funnelcheck (handover §18). Run:
// PLAYWRIGHT_MODULE=$SCRATCH/node_modules/playwright/index.mjs CHROME_PATH="…" OUT_DIR=$SCRATCH/shots node scripts/e2e/funnel.mjs
import { mkdirSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const BASE = process.env.BASE_URL ?? "http://localhost:5179";
const OUT = process.env.OUT_DIR ?? "./e2e-shots";
mkdirSync(OUT, { recursive: true });

const results = [];
const pass = (n) => results.push(["PASS", n]);
const fail = (n, e) => results.push(["FAIL", `${n} — ${e}`]);
const t = async (name, fn) => { try { await fn(); pass(name); } catch (e) { fail(name, e.message.split("\n")[0]); } };
const expect = (c, m) => { if (!c) throw new Error(m); };

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });

const ROUTES = ["/", "/voor-wie", "/groothandels", "/importeurs-distributeurs", "/service-onderhoud", "/maatwerk-montage",
  "/oplossingen", "/oplossingen/aanvragen-dossiers", "/oplossingen/communicatie-opvolging", "/oplossingen/data-inzicht",
  "/oplossingen/commerciele-voorbereiding", "/werkwijze", "/prijzen", "/voorbeelden", "/over", "/werkstroomcheck",
  "/privacy", "/campagnes/offerte-intake", "/campagnes/aftersales", "/campagnes/service-intake", "/campagnes/project-intake", "/inzichten"];

for (const width of [360, 390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const r of ROUTES) {
    await t(`${width}px ${r}: laadt, één h1, geen horizontale scroll`, async () => {
      await page.goto(BASE + r, { waitUntil: "networkidle" });
      expect(await page.locator("h1").count() === 1, `h1-count ${await page.locator("h1").count()}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow <= 1, `horizontale overflow ${overflow}px`);
      if (width !== 1440 || ["/", "/prijzen", "/groothandels", "/werkstroomcheck"].includes(r)) {
        await page.screenshot({ path: `${OUT}/${width}${r.replaceAll("/", "_") || "_home"}.png`, fullPage: true });
      }
    });
  }
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await t("alle interne links wijzen naar bestaande pagina's", async () => {
  const seen = new Set();
  for (const r of ROUTES) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    for (const href of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")))) seen.add(href.split("#")[0]);
  }
  for (const href of seen) {
    await page.goto(BASE + href, { waitUntil: "networkidle" });
    expect(!(await page.locator("text=Deze pagina bestaat niet (meer).").count()), `404 voor ${href}`);
  }
});

await t("noindex op campagnes en /bedankt, niet op categorieën", async () => {
  for (const [r, want] of [["/campagnes/aftersales", true], ["/bedankt", true], ["/groothandels", false]]) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const has = await page.locator('meta[name="robots"][content*="noindex"]').count();
    expect(!!has === want, `${r}: noindex=${!!has}`);
  }
});

for (const [from, to] of [["/groothandel", "/groothandels"], ["/maakindustrie", "/maatwerk-montage"], ["/transport", "/service-onderhoud"],
  ["/ai-kansenscan", "/werkstroomcheck"], ["/oplossingen/chatbots", "/oplossingen/communicatie-opvolging"], ["/faq", "/prijzen"]]) {
  await t(`redirect ${from} → ${to}`, async () => {
    await page.goto(BASE + from, { waitUntil: "networkidle" });
    expect(new URL(page.url()).pathname === to, `kwam op ${page.url()}`);
  });
}

await t("prefill vanuit categorie, pakket en onbekende waarden", async () => {
  await page.goto(BASE + "/werkstroomcheck?category=groothandels&process=offerte-intake&package=werkstroom", { waitUntil: "networkidle" });
  expect(await page.locator("#category").inputValue() === "groothandels", "categorie niet voorgevuld");
  expect(await page.locator("#process").inputValue() === "offerte-intake", "proces niet voorgevuld");
  await page.goto(BASE + "/werkstroomcheck?category=hacker&process=gratis", { waitUntil: "networkidle" });
  expect(await page.locator("#category").inputValue() === "", "onbekende categorie toch voorgevuld");
});

await t("validatie: lege velden en Bel mij zonder telefoon", async () => {
  await page.goto(BASE + "/werkstroomcheck", { waitUntil: "networkidle" });
  await page.click("button[type=submit]");
  for (const id of ["name-err", "company-err", "email-err", "work-err"]) expect(await page.locator(`#${id}`).count() === 1, `${id} ontbreekt`);
  await page.check("input[value=bel]");
  await page.fill("#name", "Test Persoon"); await page.fill("#company", "Testbedrijf"); await page.fill("#email", "t@testbedrijf.nl"); await page.fill("#work", "Offertes overtypen");
  await page.click("button[type=submit]");
  expect(await page.locator("#phone-err").count() === 1, "geen telefoonfout bij Bel mij");
});

const fill = async () => {
  await page.goto(BASE + "/werkstroomcheck?source=e2e&category=groothandels", { waitUntil: "networkidle" });
  await page.fill("#name", "Test Persoon"); await page.fill("#company", "Testbedrijf"); await page.fill("#email", "t@testbedrijf.nl"); await page.fill("#work", "Offertes overtypen");
};

await t("serverfout (gestubd 500): invoer blijft, foutmelding, geen navigatie", async () => {
  await page.route("**/functions/v1/werkstroomcheck", (r) => r.fulfill({ status: 500, contentType: "application/json", body: '{"ok":false}' }));
  await fill();
  await page.click("button[type=submit]");
  await page.waitForSelector("#form-error");
  expect(new URL(page.url()).pathname === "/werkstroomcheck", "navigeerde toch weg");
  expect(await page.locator("#name").inputValue() === "Test Persoon", "invoer niet behouden");
  await page.unroute("**/functions/v1/werkstroomcheck");
});

await t("succes (gestubd 200) en double-submit: één request, daarna /bedankt", async () => {
  let calls = 0;
  await page.route("**/functions/v1/werkstroomcheck", async (r) => { calls++; await new Promise((s) => setTimeout(s, 400)); await r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }); });
  await fill();
  await page.click("button[type=submit]");
  await page.click("button[type=submit]", { force: true }).catch(() => {});
  await page.waitForURL("**/bedankt");
  expect(calls === 1, `${calls} requests verstuurd`);
  await page.unroute("**/functions/v1/werkstroomcheck");
});

await t("toetsenbord: eerste Tab geeft zichtbare focus", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => { const el = document.activeElement; const s = getComputedStyle(el); return s.boxShadow !== "none" || s.outlineStyle !== "none"; });
  expect(outline, "geen zichtbare focus");
});

await t("demo: stappen doorlopen en knop met context", async () => {
  await page.goto(BASE + "/voorbeelden?demo=aftersales", { waitUntil: "networkidle" });
  const first = page.locator("[role=tablist]").first();
  await first.locator("[role=tab]").nth(2).click();
  const href = await page.locator("a:has-text('Bekijk of dit bij jullie past')").first().getAttribute("href");
  expect(href.includes("demo=aftersales") && href.includes("process=aftersales"), `href ${href}`);
});

await browser.close();
for (const [s, n] of results) console.log(`${s}  ${n}`);
const failed = results.filter(([s]) => s === "FAIL").length;
console.log(`\n${results.length - failed}/${results.length} geslaagd`);
process.exit(failed ? 1 : 0);
```

- [ ] **Step 3: Draai de funnelcheck**

```bash
cd /Users/bartwilbrink/leadvelocity
(npx vite --port 5179 --strictPort > "$SCRATCH/vite.log" 2>&1 &) ; sleep 4
PLAYWRIGHT_MODULE="$SCRATCH/node_modules/playwright/index.mjs" CHROME_PATH="<pad uit Step 1>" OUT_DIR="$SCRATCH/shots" node scripts/e2e/funnel.mjs
```

Expected: alle regels `PASS`, eindregel `N/N geslaagd`, exit 0. Bekijk de screenshots in `$SCRATCH/shots` (360, 390, 1440). Herstel elke FAIL in de taak die de code bezit, draai daarna opnieuw. Noteer in het rapport expliciet dat succes en serverfout tegen een **gestubde** functie zijn getest (de echte functie is nog niet gedeployed).

- [ ] **Step 4: `docs/superpowers/2026-10-09-livegang.md`**

```markdown
# Livegang — afhankelijkheden website volgens handover

**Datum:** 2026-10-09 · **Branch:** `site-redesign-v2`

## Wat werkt
- Fase-1-routes uit handover §7, inclusief 4 campagnes (noindex) en `/bedankt` (noindex).
- Centrale copy en prijzen in `src/content/*`; `npx tsx scripts/check-content.ts` bewaakt prijzen, tone en euro-literals.
- Redirects van alle oude routes (client-side), `scripts/check-redirects.ts`.
- Werkstroomcheck-formulier met prefill, validatie, honeypot, request-ID en echte foutstates.
- Funnelcheck `scripts/e2e/funnel.mjs` (succes en serverfout getest tegen een gestubde functie).

## Waar een aanvraag terechtkomt
`supabase/functions/werkstroomcheck` → tabel `werkstroomcheck_requests` (stage `lead`) → mail via Resend naar info@leadvelocity.nl (reply-to = aanvrager). Mislukt de mail, dan blijft de aanvraag opgeslagen met `notify_status = 'failed'`.

## Nodig vóór livegang
| Item | Eigenaar | Zonder dit |
|---|---|---|
| Akkoord publicatie prijzen (§6) | Bart | Niet live zetten |
| Privacytekst goedgekeurd (`src/content/privacy.ts`, nu concept) | Bart | Niet live zetten |
| Migratie + functie deployen: `supabase db push` en `supabase functions deploy werkstroomcheck`; `RESEND_API_KEY` aanwezig | Bart | Formulier faalt — niet live zetten |
| Contactgegevens bevestigd (`src/content/site.ts`) | Bart | Footer/over tonen huidige gegevens |
| Foto Bart (optioneel) | Bart | Typografische Over-sectie |
| Agenda-URL (optioneel, `contact.calendarUrl`) | Bart | Alleen aanvraagflow |
| 301-redirects op hostingniveau (Lovable) | Bart/Claude | Client-side redirects |
| Analytics-tool + toestemmingsbeleid | Bart | `track()` blijft no-op |
| Contracttekst acceptatie/garantie | Bart | Geen garantie op site (al zo) |

## Open voor fase 2
`/campagnes/commerciele-voorbereiding`, `/resultaten/*` (alleen echt bewijs), claim-audit van `/inzichten` (incl. transportartikelen).
```

- [ ] **Step 5: Commit**

```bash
git add scripts/e2e/funnel.mjs docs/superpowers/2026-10-09-livegang.md
git commit -m "Funnelcheck en livegang-overzicht

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
