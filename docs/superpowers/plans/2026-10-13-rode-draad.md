# Rode draad (doelgroep + partnerschap) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Homepage, doelgroeppagina's en overige pagina's volgen één verhaallijn met vaste labels. Daarbij komen een gedeeld samenwerkingsblok, een header met 4 punten en koppen zonder "automatisering".

**Architecture:**
- Content blijft in `src/content/*`.
- Nieuwe content:
  - `storyLabels` (site.ts)
  - `partnership` (pages.ts)
  - nieuwe koppen
- Twee nieuwe componenten:
  - `Section` krijgt een `story`-prop die `data-story` en het label zet.
  - `PartnerTrack` toont de vier fasen.
- Homepage en `CategoryPage` worden herschikt.
- `/werkwijze` wordt `/samenwerken`, met een redirect.
- De checks en de funnelcheck bewaken de volgorde.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind v3, React Router v6. Checks met `npx tsx scripts/*.ts`, funnel met Playwright (`scripts/e2e/funnel.mjs`).

**Spec:** `docs/superpowers/specs/2026-10-13-rode-draad-design.md`

## Global Constraints

- **Ongewijzigd:**
  - prijzen, pakketinhoud en pakket-id's (`src/content/pricing.ts`)
  - demo's
  - FAQ-antwoorden
  - claims
- **Geen nieuwe claims:** geen cijfers, %, doorlooptijden, garanties, cases, logo's of sterren.
- **Bedragen** komen uit `pricing.ts` (`analysis.price`, `analysis.creditDays`, `formatEuro`). Nooit als letterlijke euro's in content of tsx.
- **Copy** staat in `src/content/*`, niet als losse tekst in `src/components/site/*` of `src/pages/site/*`. Uitzondering: bestaande letterlijke tekst in `Voorbeelden.tsx` mag blijven.
- **Verboden woorden:**
  - "werkstroom" in zichtbare copy (check bestaat al).
  - "automatiser" in `h1`, `h2` en `seoTitle` van site-content.
- **Toon:** Nederlands, wij/jullie, geen hype-woorden (CLAUDE.md §6). "Bart" alleen in `over.*`/`home.about*`.
- **Labels** (exact, in deze volgorde): `Herkenbaar` · `Wat we bouwen` · `Voorbeelden` · `Samenwerken` · `Prijzen` · `Vragen`.
- **Header** (exact, in deze volgorde): `Voor wie` (dropdown met de 4 doelgroepen) · `Samenwerken` · `Voorbeelden` · `Prijzen`, plus de knop "Gratis adviesgesprek".
- **Stijl:** Orrin-look blijft. Font weight nooit 800. Knoppen `rounded-[10px]`. Lime alleen als klein accent.
- **Niet stagen of committen:** `.env`, `bun.lockb`, `data/prospects/*`, `scripts/seed-lead-os.ts`, `.mcp.json`, `.superpowers/`, `e2e-shots/`.
- **Commit-trailer:** `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

**Draaien:**

```bash
npx tsx scripts/check-content.ts && npx tsx scripts/check-lib.ts && npx tsx scripts/check-redirects.ts && npx tsx scripts/check-werkstroomcheck-schema.ts && npm run build
```

De dev-server draait op `http://localhost:5179`. Start hem anders met `npm run dev -- --port 5179`.

**Funnel:**

```bash
PLAYWRIGHT_MODULE=/private/tmp/claude-501/-Users-bartwilbrink-leadvelocity/a5f3b28a-c974-4d76-b7e4-04eec632a6f8/scratchpad/shot/node_modules/playwright/index.mjs \
CHROME_PATH="/Users/bartwilbrink/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" \
OUT_DIR=/private/tmp/claude-501/-Users-bartwilbrink-leadvelocity/a5f3b28a-c974-4d76-b7e4-04eec632a6f8/scratchpad/funnel node scripts/e2e/funnel.mjs
```

## Review Focus

1. **Oude links:** `/werkwijze?source=x`, `/onze-aanpak` en `/ai-ops-audit` komen op `/samenwerken` uit, met querystring en zonder redirect-keten. Test in Task 2.
2. **Mobiel (360 px):** de dropdown "Voor wie" werkt met toetsenbord en touch. In het mobiele menu staan de 4 doelgroepen als links. Geen horizontale scroll. Test in Task 2.
3. **Doelgroep wisselen op de homepage:** de kop "Wat we voor [doelgroep] bouwen." en de hero wisselen mee bij een klik op een tab of keuzeknop, en ook bij `?category=`. Test in Task 3.
4. **PartnerTrack:** toont het analysebedrag uit `pricing.ts`. Wijzigt de prijs, dan volgt de tekst. Test in Task 1 (check-content) en Task 3.
5. **Volgorde van de labels:** de doelgroeppagina's houden exact de 6 labels in volgorde, ook als een doelgroep geen demo of FAQ zou hebben. Alle 4 hebben die nu. Test in Task 4 over alle vier.

---

### Task 1: Content, labels en checks

**Files:**
- Modify: `src/content/site.ts`
  - `storyLabels` erbij
  - `mainNav`
  - `footerNav`
  - `indexableRoutes` (`/werkwijze` → `/samenwerken`)
- Modify: `src/content/pages.ts`
  - `partnership` erbij
  - koppen
  - `samenwerken` (hernoemd van `werkwijze`, met `phases`)
- Modify: `src/content/categories.ts` (seoTitle)
- Modify: `src/content/processes.ts` (seoTitle)
- Modify: `src/content/redirects.ts`
- Modify: `src/content/index.ts` (alleen als het `werkwijze` exporteert onder die naam; zie Step 3)
- Modify: `scripts/check-content.ts`
- Modify: `scripts/check-redirects.ts`

**Interfaces:**
- Produces:
  - `storyLabels: Record<StoryStep, string>`
  - `type StoryStep = "herkenbaar" | "bouwen" | "voorbeelden" | "samenwerken" | "prijzen" | "vragen"`
  - `STORY_ORDER: StoryStep[]` (site.ts)
  - `partnership` (pages.ts) met de vorm:
    ```ts
    { h2: string; phases: { title: string; we: string; you: string }[]; assurancesTitle: string; assurances: string[]; weLabel: string; youLabel: string }
    ```
  - `samenwerken` (pages.ts, vervangt export `werkwijze`) met:
    - `seoTitle`, `seoDescription`, `h1`, `intro`
    - `steps` (ongewijzigde 6 stappen)
    - `stepLabels`
    - `phaseSteps: number[][]` (indexen in `steps` per fase)
    - `expandTitle`, `expandBody`
    - `needTitle`, `need`
  - `home.build.h2For(audience?: string): string`
  - `home.pricing.h2 = "Beginnen, beheren, uitbreiden."`
  - `home.hero.factsLine: string`
  - `voorWie.h1`, `prijzenPage.h1`, `oplossingenIndex.h1` nieuw
  - `categoryHero(c): string` → `"AI-partner voor " + c.audience` (pages.ts)

- [ ] **Step 1: Schrijf de falende checks in `scripts/check-content.ts`**

Voeg toe aan het eind, vóór de afsluitende fouten-rapportage. Gebruik de bestaande `check(cond, msg)` en `strings` (lijst van `{pad, s}`) uit het script. Als `strings` de content-objecten niet als `pad` met keynamen levert, gebruik dan de bestaande walker in het script.

```ts
// Rode draad (spec 2026-10-13)
import { storyLabels, STORY_ORDER, mainNav } from "../src/content/site"; // zet bij de andere imports bovenaan
import { partnership, samenwerken } from "../src/content/pages";          // idem

check(STORY_ORDER.join(",") === "herkenbaar,bouwen,voorbeelden,samenwerken,prijzen,vragen", "STORY_ORDER onjuist");
check(STORY_ORDER.map((k) => storyLabels[k]).join("|") === "Herkenbaar|Wat we bouwen|Voorbeelden|Samenwerken|Prijzen|Vragen", "storyLabels onjuist");
check(mainNav.map((l) => l.label).join("|") === "Voor wie|Samenwerken|Voorbeelden|Prijzen", "mainNav moet Voor wie|Samenwerken|Voorbeelden|Prijzen zijn");
check(!mainNav.some((l) => /oplossing|werkwijze/i.test(l.label)), "mainNav bevat nog Oplossingen/Werkwijze");
check(partnership.phases.map((p) => p.title).join("|") === "Adviesgesprek|Analyse en inrichting|Beheer|Uitbreiden", "partnership-fasen onjuist");
check(partnership.phases[1].we.includes(formatEuro(analysis.price)), "analysebedrag in partnership komt niet uit pricing.ts");
check(samenwerken.phaseSteps.flat().sort().join(",") === "0,1,2,3,4,5", "phaseSteps moet alle 6 stappen precies één keer verdelen");
const koppen = strings.filter(({ pad }) => /(^|\.)(h1|h2|seoTitle)$/.test(pad));
check(!koppen.some(({ s }) => /automatiser/i.test(s)), `'automatiser' in kop/seoTitle: ${koppen.filter(({ s }) => /automatiser/i.test(s)).map((k) => k.pad).join(", ")}`);
```

Voeg `formatEuro`/`analysis` aan de imports toe als die er nog niet staan.

- [ ] **Step 2: Draai de check; die moet falen**

Run: `npx tsx scripts/check-content.ts`
Verwacht: FAIL (import van `storyLabels` bestaat niet, of meldingen over mainNav, partnership of automatiser).

- [ ] **Step 3: Content aanpassen**

**`src/content/site.ts`:**

```ts
export type StoryStep = "herkenbaar" | "bouwen" | "voorbeelden" | "samenwerken" | "prijzen" | "vragen";
export const STORY_ORDER: StoryStep[] = ["herkenbaar", "bouwen", "voorbeelden", "samenwerken", "prijzen", "vragen"];
/** Vaste labels per stap in de verhaallijn — overal gelijk (spec rode draad §1). */
export const storyLabels: Record<StoryStep, string> = {
  herkenbaar: "Herkenbaar",
  bouwen: "Wat we bouwen",
  voorbeelden: "Voorbeelden",
  samenwerken: "Samenwerken",
  prijzen: "Prijzen",
  vragen: "Vragen",
};

export const mainNav = [
  { label: "Voor wie", href: "/voor-wie" },
  { label: "Samenwerken", href: "/samenwerken" },
  { label: "Voorbeelden", href: "/voorbeelden" },
  { label: "Prijzen", href: "/prijzen" },
];
```

In `footerNav`:
- `title: "Oplossingen"` wordt `title: "Per proces"`.
- `{ label: "Werkwijze", href: "/werkwijze" }` wordt `{ label: "Samenwerken", href: "/samenwerken" }`.
- In `indexableRoutes` wordt `"/werkwijze"` vervangen door `"/samenwerken"`.

**`src/content/pages.ts`:** `pricing`, `analysis` en `formatEuro` zijn al geïmporteerd (zie `home.trajectory`).

```ts
// in home:
  build: {
    eyebrow: "Wat we bouwen",
    h2: "Wat we voor jullie bouwen.",
    notes: [...ongewijzigd],
  },
  pricing: { eyebrow: "Prijzen", h2: "Beginnen, beheren, uitbreiden." },
// in home.hero, nieuwe sleutel:
    factsLine: `Gratis adviesgesprek van 20 minuten · analyse ${formatEuro(analysis.price)}, verrekenbaar binnen ${analysis.creditDays} dagen`,
```

Voeg toe als losse functie (geen copy in tsx):

```ts
export const buildH2For = (audience?: string) => (audience ? `Wat we voor ${audience} bouwen.` : home.build.h2);
export const categoryHero = (audience: string) => `AI-partner voor ${audience}`;
```

Nieuwe export `partnership`. De tekst komt uit `werkwijze.steps`, `home.timeline`, `home.fits.need` en `home.assurances`; er komen geen nieuwe claims bij.

```ts
export const partnership = {
  h2: "We starten met één oplossing en bouwen samen verder.",
  weLabel: "Wat wij doen",
  youLabel: "Wat jullie doen",
  phases: [
    { title: "Adviesgesprek", we: "In 20 minuten kijken we welk werk steeds terugkomt en of een analyse zinvol is.", you: "Vertellen welk werk bij jullie steeds terugkomt." },
    { title: "Analyse en inrichting", we: `Analyse (${formatEuro(analysis.price)}) met proceskaart, nulmeting en een vaste scope met prijs. Daarna richten we de oplossing in op jullie bronnen en testen we op de afgesproken criteria.`, you: "Voorbeelden en toegang aanleveren, twee gerichte werksessies, testen en accepteren." },
    { title: "Beheer", we: "Monitoring, incidentafhandeling, bronupdates, rapportage en kleine wijzigingen.", you: "Wijzigingen in proces of bronnen melden. De maandkosten starten pas na acceptatie." },
    { title: "Uitbreiden", we: "Een bewezen oplossing uitbreiden of de volgende oplossing erbij bouwen.", you: "Kiezen welk aangrenzend werk als volgende aan de beurt is." },
  ],
  assurancesTitle: "Waar je op kunt rekenen",
  assurances: home.assurances.points,
};
```

Plaats `partnership` ná `home`, omdat het `home.assurances.points` gebruikt.

Hernoem export `werkwijze` naar `samenwerken`. Pas deze velden aan; de rest blijft gelijk:

```ts
export const samenwerken = {
  seoTitle: "Samenwerken | Lead Velocity",
  seoDescription: "Van gratis adviesgesprek via analyse en inrichting naar beheer en uitbreiden: zo werken we samen.",
  h1: "Wij bouwen het, wij beheren het, samen breiden we uit.",
  intro: <ongewijzigd uit werkwijze.intro>,
  steps: <ongewijzigd>,
  stepLabels: <ongewijzigd>,
  phaseSteps: [[0], [1, 2, 3, 4], [5], []],
  expandTitle: "Uitbreiden",
  expandBody: "Werkt de eerste oplossing, dan breiden we die uit of bouwen we de volgende erbij. Dat is het pakket Opschalen.",
  needTitle: home.fits.needTitle,
  need: home.fits.need,
};
```

Werk alle imports van `werkwijze` bij:

```bash
grep -rn "werkwijze" src --include=*.ts --include=*.tsx
```

Vind je `Werkwijze.tsx`, laat dat bestand dan nog staan maar importeer `samenwerken`. Task 2 vervangt het. Pas ook `src/content/index.ts` aan als daar `werkwijze` wordt doorgegeven.

Koppen:
- `voorWie.h1 = "Jouw AI-partner, ingericht op jouw branche."`
- `prijzenPage.h1 = "Duidelijke kosten voor starten, beheren en uitbreiden."`
- `oplossingenIndex.h1 = "Per proces bekeken: wat we bouwen en waar het stopt."`
- `oplossingenIndex.seoTitle = "Per proces | Lead Velocity"`

**`src/content/categories.ts`**, seoTitle per doelgroep:
- `"AI-oplossingen voor technische groothandels | Lead Velocity"`
- `"AI-oplossingen voor importeurs en distributeurs | Lead Velocity"`
- `"AI-oplossingen voor servicebedrijven | Lead Velocity"`
- `"AI-oplossingen voor maatwerk en montage | Lead Velocity"`

Neem de `audience`-waarde van elke categorie letterlijk over.

**`src/content/processes.ts`**, seoTitles:
- `"Aanvragen en dossiers | Lead Velocity"`
- `"Communicatie en opvolging | Lead Velocity"`
- `"Data en inzicht voor je team | Lead Velocity"` (ongewijzigd)
- `"Commerciële voorbereiding | Lead Velocity"`

**`src/content/redirects.ts`:**
- `/onze-aanpak` en `/ai-ops-audit` wijzen naar `/samenwerken`.
- Voeg `{ from: "/werkwijze", to: "/samenwerken" }` toe.

- [ ] **Step 4: `scripts/check-redirects.ts`, falende test toevoegen**

Voeg vóór het rapport toe:

```ts
const wk = redirects.find((r) => r.from === "/werkwijze");
if (!wk || wk.to !== "/samenwerken") fouten.push("/werkwijze moet naar /samenwerken verwijzen");
```

Deze check faalt tot Task 2 de route `/samenwerken` toevoegt. De doel-check meldt dan "doel /samenwerken is geen route". **Dat is verwacht:** Task 1 commit pas nadat ook Step 5 is gedaan.

- [ ] **Step 5: Minimale route zodat de redirects kloppen**

In `src/App.tsx`:
- `path="/werkwijze"` wordt `path="/samenwerken"`. Element blijft `<Werkwijze />`.
- De redirect-lus maakt `/werkwijze` → `/samenwerken` automatisch aan.

In `Werkwijze.tsx`:
- `path="/werkwijze"` in `<Seo>` wordt `"/samenwerken"`.
- De `eyebrow` wordt `"Samenwerken"`.

- [ ] **Step 6: Alle checks en de build draaien**

Run: de check-regel uit Global Constraints.
Verwacht: alle vier ✓ en een geslaagde build.

Faalt een bestaande check op een gewijzigde kop of CLAUDE.md-regel, pas dan die check aan. Doe dat alleen als de check de oude tekst letterlijk verwacht, en noteer het in je rapport.

- [ ] **Step 7: Funnel bijwerken voor de route**

In `scripts/e2e/funnel.mjs`:
- In `ROUTES` wordt `"/werkwijze"` vervangen door `"/samenwerken"`.
- In de test "geen 'werkstroom' meer zichtbaar" wordt `"/werkwijze"` vervangen door `"/samenwerken"`.
- Voeg toe:

```js
await t("redirect /werkwijze → /samenwerken behoudt querystring", async () => {
  await page.goto(BASE + "/werkwijze?source=oud", { waitUntil: "networkidle" });
  const u = new URL(page.url());
  expect(u.pathname === "/samenwerken" && u.searchParams.get("source") === "oud", `kwam uit op ${page.url()}`);
});
```

Draai de funnel. Verwacht dat alles slaagt, behalve de homepagetest die de oude H2 "Wat we voor jouw bedrijf bouwen." zoekt.

Pas in die test de verwachte H2 aan naar `"Wat we voor jullie bouwen."`. Task 3 herschrijft die test daarna volledig.

- [ ] **Step 8: Commit**

```bash
git add src/content scripts src/App.tsx src/pages/site/Werkwijze.tsx
git commit -m "Rode draad: labels, samenwerkingscontent, koppen zonder automatisering, /samenwerken

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Navigatie, `Section story`, `PartnerTrack` en pagina `/samenwerken`

**Files:**
- Modify: `src/components/site/Section.tsx` (`story`-prop)
- Create: `src/components/site/PartnerTrack.tsx`
- Modify: `src/components/site/index.ts` (export PartnerTrack)
- Modify: `src/components/site/SiteHeader.tsx` (dropdown "Voor wie", mobiel menu)
- Rename: `src/pages/site/Werkwijze.tsx` → `src/pages/site/Samenwerken.tsx`
- Modify: `src/App.tsx` (import/element)
- Modify: `scripts/e2e/funnel.mjs`

**Interfaces:**
- Consumes uit Task 1:
  - `storyLabels`, `StoryStep`, `mainNav` (site.ts)
  - `partnership`, `samenwerken` (pages.ts)
  - `categories` (categories.ts, met `id`, `name`, `audience`)
- Produces:
  - `<Section story?: StoryStep …>`: zet `data-story={story}` op `<section>`.
  - `<SectionHead story?: StoryStep …>`: gebruikt `storyLabels[story]` als eyebrow als er geen `eyebrow` is meegegeven.
  - `<PartnerTrack source: string; showCta?: boolean />`
    - Rendert de H2 `partnership.h2` met label Samenwerken, 4 fasen en "Waar je op kunt rekenen".
    - Rendert géén eigen `<section>`; de aanroeper wikkelt hem in `<Section story="samenwerken">`.
    - Root-element heeft `data-partner-track`.

- [ ] **Step 1: Falende funnel-tests schrijven**

Toevoegen aan `scripts/e2e/funnel.mjs`, bij de andere tests:

```js
await t("header: precies 4 menupunten + CTA, dropdown met 4 doelgroepen", async () => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const nav = page.locator("nav[aria-label='Hoofdnavigatie']");
  const top = await nav.locator(":scope > ul > li > a, :scope > ul > li > button").allInnerTexts();
  expect(top.map((s) => s.trim()).join("|") === "Voor wie|Samenwerken|Voorbeelden|Prijzen", `menu: ${top.join("|")}`);
  await nav.locator("button", { hasText: "Voor wie" }).focus();
  await page.keyboard.press("Enter");
  const sub = nav.locator("[data-nav-dropdown] a");
  expect(await sub.count() === 5, `dropdown: verwacht 4 doelgroepen + overzicht, kreeg ${await sub.count()}`);
  await page.keyboard.press("Escape");
  expect(await nav.locator("[data-nav-dropdown]").isHidden(), "Escape sluit dropdown niet");
});

await t("mobiel menu: doelgroepen als links, geen horizontale scroll", async () => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.locator("button[aria-controls='mobile-nav']").click();
  const m = page.locator("#mobile-nav");
  for (const h of ["/groothandels", "/importeurs-distributeurs", "/service-onderhoud", "/maatwerk-montage", "/samenwerken"]) {
    expect(await m.locator(`a[href='${h}']`).count() === 1, `mobiel menu mist ${h}`);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "horizontale scroll");
  await page.setViewportSize({ width: 1440, height: 900 });
});

await t("/samenwerken: H1, 4 fasen, alle 6 stappen, uitbreiden", async () => {
  await page.goto(BASE + "/samenwerken", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("Wij bouwen het, wij beheren het"), "H1 onjuist");
  const track = page.locator("[data-partner-track]");
  expect(await track.count() === 1, "PartnerTrack ontbreekt");
  expect(await track.locator("[data-phase]").count() === 4, "verwacht 4 fasen");
  for (const s of ["Adviesgesprek", "Analyse", "Voorstel", "Inrichting", "Acceptatie", "Beheer"]) {
    expect(await page.locator(`[data-step]:has-text("${s}")`).count() >= 1, `stap ${s} ontbreekt`);
  }
  expect(await page.locator('h2:has-text("Uitbreiden")').count() >= 1, "blok Uitbreiden ontbreekt");
});
```

- [ ] **Step 2: Draai de funnel; de drie nieuwe tests moeten falen**

Run: funnel-commando. Verwacht: FAIL op header, mobiel menu en /samenwerken.

- [ ] **Step 3: `Section` en `SectionHead`**

```tsx
// Section.tsx
import { storyLabels, type StoryStep } from "@/content/site";

export function Section({ id, children, className, tone = "paper", story }: { id?: string; children: React.ReactNode; className?: string; tone?: "paper" | "raised" | "ink"; story?: StoryStep }) {
  return (
    <section id={id} data-story={story} className={cn(/* ongewijzigd */)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, story, title, intro, className, as: As = "h2", align = "left" }: { eyebrow?: string; story?: StoryStep; /* rest ongewijzigd */ }) {
  const label = eyebrow ?? (story ? storyLabels[story] : undefined);
  // render {label && <Pill className="mb-5">{label}</Pill>} i.p.v. eyebrow
}
```

- [ ] **Step 4: `PartnerTrack.tsx`**

```tsx
import { partnership } from "@/content/pages";
import { ctaLabels } from "@/content/site";
import { checkHref } from "@/lib/cta";
import { ShieldCheck } from "lucide-react";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { CtaLink } from "./CtaLink";

export function PartnerTrack({ source, showCta = true, align = "center" }: { source: string; showCta?: boolean; align?: "left" | "center" }) {
  return (
    <div data-partner-track>
      <SectionHead story="samenwerken" align={align} title={partnership.h2} />
      <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {partnership.phases.map((p, i) => (
          <li key={p.title} data-phase className="h-full">
            <Reveal delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-[24px] bg-lv-card p-7">
                <span className="font-mono text-[12px] text-lv-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-[22px] font-medium leading-tight tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-5 font-mono text-[10.5px] uppercase tracking-wider text-lv-muted">{partnership.weLabel}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{p.we}</p>
                <p className="mt-4 font-mono text-[10.5px] uppercase tracking-wider text-lv-muted">{partnership.youLabel}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{p.you}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className="mt-8 rounded-[24px] bg-white p-7 ring-1 ring-lv-line">
        <p className="font-display text-[20px] font-medium">{partnership.assurancesTitle}</p>
        <ul className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
          {partnership.assurances.map((a) => <li key={a} className="flex gap-3"><ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{a}</li>)}
        </ul>
      </div>
      {showCta && (
        <div className={align === "center" ? "mt-10 flex justify-center" : "mt-10"}>
          <CtaLink to={checkHref({ source })} ctaId={`${source}-check`}>{ctaLabels.primary}</CtaLink>
        </div>
      )}
    </div>
  );
}
```

Exporteer de component in `index.ts`.

- [ ] **Step 5: `SiteHeader` met dropdown**

Desktop: `<nav aria-label="Hoofdnavigatie"><ul>…</ul></nav>`. Elk menupunt is een `<li>`.
- **"Voor wie"** is een `<button aria-expanded aria-controls="nav-voor-wie">` met een `ChevronDown`-icoon.
  - Klik, Enter of Space opent het menu. Escape of klikken buiten sluit het; de focus gaat dan terug naar de knop.
  - Het paneel `<div id="nav-voor-wie" data-nav-dropdown hidden={!open}>` toont de 4 `categories` als links (`/${c.id}`, label `c.name`). Daaronder staat een link "Alle doelgroepen" naar `/voor-wie`. "Alle doelgroepen" staat in `site.ts` als `navAllAudiences`.
  - Gebruik `useEffect` met een `mousedown`-listener op `document` voor het klikken buiten het menu.
- **De andere 3 menupunten** blijven `NavLink`.
- **Mobiel menu:**
  - Begint met "Voor wie" als niet-klikbaar kopje (`<p className="pt-3 text-[13px] text-lv-muted">`), met daaronder de 4 doelgroeplinks ingesprongen.
  - Daarna Samenwerken, Voorbeelden, Prijzen en Over.
  - Elke link sluit het menu.

Gebruik voor de dropdown de bestaande stijl: `rounded-[18px] bg-white p-2 shadow-lg ring-1 ring-lv-line`. Links `block rounded-[10px] px-3 py-2 hover:bg-lv-card`.

- [ ] **Step 6: Pagina `Samenwerken.tsx`**

Hernoem het bestand met `git mv src/pages/site/Werkwijze.tsx src/pages/site/Samenwerken.tsx`. Pas `App.tsx` aan.

Opbouw:

```tsx
<Section className="pt-14 md:pt-20" story="samenwerken">
  <SectionHead as="h1" story="samenwerken" title={samenwerken.h1} intro={samenwerken.intro} />
</Section>
<Section className="pt-0"><PartnerTrack source="samenwerken" showCta={false} align="left" /></Section>
{/* Detail per fase */}
<Section tone="raised">
  {partnership.phases.map((ph, pi) => samenwerken.phaseSteps[pi].length > 0 && (
    <div key={ph.title} className="mt-12 first:mt-0">
      <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-normal tracking-[-0.015em]">{ph.title}</h2>
      <ol className="mt-6 space-y-4">
        {samenwerken.phaseSteps[pi].map((si) => { const s = samenwerken.steps[si]; return (
          <li key={s.title} data-step className="grid gap-5 rounded-[24px] bg-lv-card p-7 md:grid-cols-[12rem_1fr_1fr_1fr]">
            {/* zelfde inhoud als de oude Werkwijze-li: titel + output/client/decision met stepLabels */}
          </li>
        ); })}
      </ol>
    </div>
  ))}
  <div className="mt-12">
    <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-normal tracking-[-0.015em]">{samenwerken.expandTitle}</h2>
    <p className="mt-3 max-w-2xl text-[16.5px] leading-relaxed text-lv-body">{samenwerken.expandBody}</p>
    <Link to="/prijzen" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium underline-offset-4 hover:underline">{home.pricing.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
  </div>
</Section>
<Section>
  <div className="rounded-[24px] bg-lv-card p-8">
    <p className="font-display text-[22px] font-medium leading-tight">{samenwerken.needTitle}</p>
    <ul className="mt-5 space-y-3 text-[15.5px]">{samenwerken.need.map((n) => <li key={n} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{n}</li>)}</ul>
  </div>
  <CtaLink to={checkHref({ source: "samenwerken" })} ctaId="samenwerken-check" className="mt-12">{ctaLabels.primary}</CtaLink>
</Section>
```

`home.trajectory.link` ("Vergelijk de pakketten") blijft bestaan. Task 3 verplaatst die sleutel naar `home.pricing.link`. Gebruik hier daarom al `home.pricing.link`, en voeg in Task 2 `link: "Vergelijk de pakketten"` toe aan `home.pricing` in pages.ts.

- [ ] **Step 7: Checks, build en funnel draaien**

Verwacht: alles ✓ en de funnel volledig geslaagd, inclusief de 3 nieuwe tests.

Maak screenshots van `/samenwerken` en van de open header-dropdown, op 360 en 1440 px, in `OUT_DIR`. Bekijk ze.

- [ ] **Step 8: Commit**

```bash
git add src/components/site src/pages/site src/App.tsx src/content scripts/e2e/funnel.mjs
git commit -m "Header met 4 punten en doelgroep-dropdown, PartnerTrack, pagina /samenwerken

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Homepage in 7 secties

**Files:**
- Modify: `src/pages/site/Home.tsx`
- Modify: `src/content/pages.ts` (opruimen)
- Modify: `src/components/site/index.ts` (alleen als FactTiles/TimelineTabs ongebruikt raken)
- Delete: `src/components/site/FactTiles.tsx` en `src/components/site/TimelineTabs.tsx`, als niets anders ze nog importeert (`grep -rn "FactTiles\|TimelineTabs" src`)
- Modify: `scripts/e2e/funnel.mjs`
- Modify: `scripts/check-content.ts` (alleen verwijzingen naar verwijderde sleutels)

**Interfaces:**
- Consumes:
  - `Section story`, `SectionHead story`, `PartnerTrack` (Task 2)
  - `buildH2For`, `home.hero.factsLine`, `home.pricing.{h2,link}` (Task 1/2)
- Produces: geen nieuwe exports.

- [ ] **Step 1: Falende funnel-tests**

Vervang de test "homepage: qualifier, voorbeelden, werkwijze en wat-we-bouwen aanwezig" door:

```js
const STORY = ["herkenbaar", "bouwen", "voorbeelden", "samenwerken", "prijzen", "vragen"];

await t("homepage: 6 verhaalstappen in vaste volgorde met vaste labels", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const order = await page.$$eval("[data-story]", (els) => els.map((e) => e.getAttribute("data-story")));
  expect(order.join(",") === STORY.join(","), `volgorde: ${order.join(",")}`);
  const labels = ["Herkenbaar", "Wat we bouwen", "Voorbeelden", "Samenwerken", "Prijzen", "Vragen"];
  for (const [i, s] of STORY.entries()) {
    const txt = await page.locator(`[data-story='${s}']`).first().innerText();
    expect(txt.includes(labels[i]), `label ${labels[i]} ontbreekt in ${s}`);
  }
  expect(await page.locator("section").count() <= 8, `te veel secties: ${await page.locator("section").count()}`);
  for (const h of ["Past in wat je al hebt", "Waar je op kunt rekenen", "Van eerste gesprek tot werkende oplossing."]) {
    expect(await page.locator(`h2:has-text("${h}")`).count() === 0, `oude sectie nog aanwezig: ${h}`);
  }
  expect(await page.locator("[data-partner-track]").count() === 1, "PartnerTrack ontbreekt op home");
  expect(await page.locator('h2:has-text("Voor wie dit werkt (en voor wie niet)"), h3:has-text("Voor wie dit werkt (en voor wie niet)")').count() === 1, "qualifier ontbreekt");
});

await t("homepage: 'Wat we bouwen' volgt doelgroep (klik en ?category=)", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const h = page.locator("[data-story='bouwen'] h2");
  expect((await h.textContent()).trim() === "Wat we voor jullie bouwen.", `generiek: ${await h.textContent()}`);
  await page.locator("[aria-label='Kies een aanvraagstroom'] button", { hasText: /garantieclaims/i }).click();
  expect((await h.textContent()).includes("importeurs en distributeurs"), `na klik: ${await h.textContent()}`);
  await page.goto(BASE + "/?category=groothandels", { waitUntil: "networkidle" });
  expect((await h.textContent()).includes("technische groothandels"), `via query: ${await h.textContent()}`);
});

await t("homepage: feitenregel met analysebedrag onder de knoppen", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const hero = await page.locator("section").first().innerText();
  expect(/analyse €\s?750/.test(hero.replace(/ /g, " ")), "feitenregel met analysebedrag ontbreekt in hero");
});
```

Pas de test "tabs 'wat we bouwen' en tijdlijn werken; geen nep-bewijs op home" aan:
- Verwijder het tijdlijn-deel (de `step3`-regels).
- Hernoem de test naar "tabs 'wat we bouwen' werken; geen nep-bewijs op home".

De regex `€\s?750` volgt de opmaak van `formatEuro`. Controleer dat met `npx tsx -e 'import {formatEuro} from "./src/content/pricing"; console.log(JSON.stringify(formatEuro(750)))'` en pas de regex zo nodig aan. Het bedrag zelf hoort bij de spec-test (Review Focus 4).

- [ ] **Step 2: Funnel draaien; de nieuwe tests moeten falen**

- [ ] **Step 3: `Home.tsx` herschikken**

Volgorde en inhoud:

1. **Hero**
   - Ongewijzigd, met één aanpassing: de regel `{home.hero.ctaMicro}` wordt `{home.hero.factsLine}`.
   - Bestaat `ctaMicro` niet meer ergens, verwijder het dan uit de content.
   - De `forWho`-voorwaarde blijft. Het `ExposureArt`-beeld met DemoStepper blijft.
2. `<Section story="herkenbaar" …>`: `SectionHead story="herkenbaar" align="center" title={home.recognize.h2}`, met de situaties en de kostenregel zoals nu.
3. `<Section story="bouwen" …>`
   - `SectionHead story="bouwen" align="center" title={buildH2For(c?.audience)}`, gevolgd door `NumberedTabs` zoals nu.
   - Daaronder `home.fits.points` als drie korte regels: `<ul className="mx-auto mt-10 grid max-w-4xl gap-3 text-[15px] text-lv-body sm:grid-cols-3">` met een Check-icoon.
4. `<Section story="voorbeelden" …>`
   - De showcase zoals nu, met `SectionHead story="voorbeelden"`.
   - De knop onder de kaarten gebruikt de nieuwe sleutel `home.showcase.allLink`, met de waarde van het oude `home.howItWorks.examplesLink` ("Bekijk alle voorbeelden").
5. `<Section story="samenwerken" …>`: `<PartnerTrack source="home-partner" />`
6. `<Section story="prijzen" id="pakketten" …>`
   - `SectionHead story="prijzen" align="center" title={home.pricing.h2}`, `PricingCards` en de link `home.pricing.link` naar `/prijzen`.
   - Daaronder de qualifier: een `h3` met `home.qualifier.h2` in `font-display text-[26px]`, de twee kolommen zoals nu en de twijfelregel met CTA.
7. `<Section story="vragen" …>`: `SectionHead story="vragen" align="center" title="Vragen, beantwoord."`, de `Faq` en daarna de slot-sectie (about-regel en `ExposureArt` ongewijzigd).
   - De titel "Vragen, beantwoord." gaat naar `home.faqTitle` in pages.ts.

Verwijder:
- de secties Feittegels, Werkwijze (TimelineTabs + aiNote), "Past in wat je al hebt" en Zekerheden;
- de ongebruikte imports.

- [ ] **Step 4: Content opruimen**

Verwijder uit `home`, voor zover niets er nog naar verwijst (`grep -rn "home\.<sleutel>" src scripts`):
- `facts`
- `timeline`
- `howItWorks`
- `trajectory`
- `fits.h2`
- `fits.intro`
- `assurances.h2`

Laat staan:
- `fits.points`, `fits.needTitle`, `fits.need` en `assurances.points`. Die worden gebruikt door `partnership`/`samenwerken`.
- `trajectory.link`. Die is verhuisd naar `pricing.link` en kan daarmee weg.

**Let op:** `CategoryPage.tsx` gebruikt nog `home.trajectory`. Verwijder `trajectory` daarom pas in Task 4, of vervang het daar al door `PartnerTrack` als Task 4 nog niet gedaan is. Kies de eerste optie en noteer dat in je rapport.

Verwijder `FactTiles.tsx` en `TimelineTabs.tsx`, en hun export in `index.ts`, als `grep` geen andere gebruikers toont.

- [ ] **Step 5: Checks, build en funnel**

Verwacht: alles ✓ en de funnel volledig geslaagd.

Maak screenshots van `/` en `/?category=service-onderhoud` op 360 en 1440 px (volledige pagina). Bekijk ze op:
- de volgorde;
- de labels;
- horizontale scroll;
- het mobiel ogen van PartnerTrack.

- [ ] **Step 6: Commit**

```bash
git add src scripts
git commit -m "Homepage in 7 secties langs de verhaallijn, met samenwerkingsblok

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Doelgroeppagina's, overige pagina's en docs

**Files:**
- Modify: `src/pages/site/CategoryPage.tsx`
- Modify: `src/pages/site/VoorWie.tsx`
- Modify: `src/pages/site/Voorbeelden.tsx`
- Modify: `src/content/pages.ts` (`home.trajectory` verwijderen; `voorWie` sleutels voor oplossingskaart-link)
- Modify: `src/components/site/CategoryCard.tsx` (alleen als VoorWie de kaart met oplossingstitels via deze component toont)
- Modify: `scripts/e2e/funnel.mjs`
- Modify: `CLAUDE.md`
- Modify: `docs/strategy/2026-10-09-website-gtm-handover.md` (afwijkingenblok bovenin)
- Modify: `docs/superpowers/2026-10-09-livegang.md` (alleen `/werkwijze` → `/samenwerken` als het daar als route genoemd staat)

**Interfaces:**
- Consumes:
  - `Section story`, `SectionHead story`, `PartnerTrack`, `buildH2For`, `categoryHero`, `storyLabels`
  - `categories[].solutions[].{title,processId}`, `categories[].audience`
- Produces: geen.

- [ ] **Step 1: Falende funnel-tests**

```js
for (const cat of ["groothandels", "importeurs-distributeurs", "service-onderhoud", "maatwerk-montage"]) {
  await t(`/${cat}: 6 verhaalstappen in vaste volgorde, PartnerTrack, AI-partner-label`, async () => {
    await page.goto(BASE + "/" + cat, { waitUntil: "networkidle" });
    const order = await page.$$eval("[data-story]", (els) => els.map((e) => e.getAttribute("data-story")));
    expect(order.join(",") === STORY.join(","), `volgorde: ${order.join(",")}`);
    expect(await page.locator("[data-partner-track]").count() === 1, "PartnerTrack ontbreekt");
    expect((await page.locator("section").first().innerText()).includes("AI-partner voor"), "label 'AI-partner voor …' ontbreekt boven H1");
    for (const h of ["Zo loopt het proces", "Je team houdt het oordeel."]) {
      expect(await page.locator(`h2:has-text("${h}")`).count() === 0, `oude sectie nog aanwezig: ${h}`);
    }
    expect(await page.locator("[data-solution-card] a:has-text('Hoe dit proces werkt')").count() === 4, "kaartlinks 'Hoe dit proces werkt' ontbreken");
  });
}

await t("/voor-wie: kaart per doelgroep met 4 oplossingen, geen procesingangen", async () => {
  await page.goto(BASE + "/voor-wie", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("Jouw AI-partner, ingericht op jouw branche"), "H1 onjuist");
  expect(await page.locator("[data-audience-card]").count() === 4, "verwacht 4 doelgroepkaarten");
  expect(await page.locator("[data-audience-card] li").count() === 16, "verwacht 4×4 oplossingstitels");
  expect(await page.locator('h2:has-text("Procesingangen")').count() === 0, "Procesingangen nog aanwezig");
});

await t("/voorbeelden: elke demo linkt naar zijn doelgroep", async () => {
  await page.goto(BASE + "/voorbeelden", { waitUntil: "networkidle" });
  for (const c of ["groothandels", "importeurs-distributeurs", "service-onderhoud", "maatwerk-montage"]) {
    expect(await page.locator(`a[href='/${c}']`).count() >= 1, `geen link naar /${c}`);
  }
});
```

`STORY` is in Task 3 bovenin gedefinieerd. Staat die definitie lager in het bestand dan deze tests, verplaats haar dan naar boven.

De bestaande test "oplossingen per doelgroep: /groothandels en homepage-tabs" zoekt de H2 "Wat we voor jullie bouwen". Wijzig die verwachting naar `"Wat we voor technische groothandels bouwen."`. De `section`-locator blijft hetzelfde.

- [ ] **Step 2: Funnel draaien; de nieuwe tests moeten falen**

- [ ] **Step 3: `CategoryPage.tsx` in 7 secties**

1. **Hero:** `<Section className="pt-14 md:pt-20">`, zonder `story`.
   - Vervang `<Eyebrow>{c.name}</Eyebrow>` door `<Pill className="mb-5">{categoryHero(c.audience)}</Pill>`.
   - De rest blijft ongewijzigd: H1, sub, knoppen, voorbeeldregel en `ExposureArt`.
2. `<Section story="herkenbaar">`: `SectionHead story="herkenbaar" title="Herken je dit?"`.
   - De titel komt uit `home.recognize.h2`.
   - De situaties blijven zoals nu.
3. `<Section story="bouwen" tone="raised">`: `SectionHead story="bouwen" title={buildH2For(c.audience)}`.
   - De kaarten blijven zoals nu.
   - Linktekst "Bekijk de oplossing" wordt **"Hoe dit proces werkt"**. Zet die tekst als `solutionProcessLink` in `site.ts`.
4. `<Section story="voorbeelden" id="demo">`: `SectionHead story="voorbeelden" title={demo.title} intro={demo.prepared.summary}` met `DemoStepper`.
   - Onder de intro komt de bestaande `exampleFlow` als compacte genummerde rij (de oude "Zo loopt het proces"-`ol`), zonder eigen kop.
5. `<Section story="samenwerken"><PartnerTrack source={`category-${c.id}`} align="left" showCta={false} /></Section>`
6. `<Section story="prijzen" tone="raised">`: `SectionHead story="prijzen" title="Een passende start, met ruimte om uit te breiden."`.
   - Zet die titel als `categoryPricingTitle` in pages.ts.
   - Daaronder `PricingCards`.
   - Daaronder het blok Passend/Niet passend (nu de losse sectie met `c.fit`, `c.measures`, `c.limits`), verplaatst met `mt-12`.
7. `<Section story="vragen">`: `SectionHead story="vragen" title="Wat je waarschijnlijk wilt weten."`.
   - Zet die titel als `categoryFaqTitle` in pages.ts.
   - Daaronder de `Faq` en het donkere slotblok zoals nu.

Verwijder de secties "Zo loopt het proces", `HumanControl` en `Steps`/`home.trajectory`. Ruim de imports op. Verwijder `home.trajectory` uit pages.ts (`grep` eerst).

- [ ] **Step 4: `VoorWie.tsx`**

- De H1 komt al uit content (Task 1).
- Vervang de `CategoryCard`-grid door een grid van `<article data-audience-card>` per categorie. Elk `article` bevat:
  - `c.name` als `h2` (`font-display text-[24px]`);
  - `c.sub` als korte tekst;
  - `<ul>` met de 4 `c.solutions[].title` (Check-icoon);
  - de link `voorWie.audienceLink` ("Bekijk wat we voor je bouwen", in pages.ts) naar `/${c.id}`.
- Grid: `grid gap-4 md:grid-cols-2`. Stijl: `rounded-[24px] bg-lv-card p-8`.
- Verwijder de sectie "Procesingangen" en de import van `ProcessCard`/`processes`.
- Laat `CategoryCard`/`ProcessCard` als component staan als ze elders nog gebruikt worden (`Oplossingen.tsx`, `CampaignPage.tsx`). Anders verwijderen.

- [ ] **Step 5: `Voorbeelden.tsx`**

Onder `d.prepared.summary` komt:

```tsx
<Link to={`/${d.categoryId}`} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium underline-offset-4 hover:underline">
  Voor {categoryById(d.categoryId)!.audience} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
</Link>
```

- [ ] **Step 6: Docs**

**`CLAUDE.md`:**
- §7 Routes: `/werkwijze` wordt `/samenwerken`, met de opmerking "(`/werkwijze` verwijst door)".
- §9 Beslissingen, nieuwe bullet:
  > **Rode draad (besluit Bart 2026-10-13):** elke hoofdpagina volgt Herkenbaar → Wat we bouwen → Voorbeelden → Samenwerken → Prijzen → Vragen, met vaste labels (`storyLabels`). Header: Voor wie ▾ · Samenwerken · Voorbeelden · Prijzen. "Oplossing" = wat we voor een doelgroep bouwen; procesfamilies heten "Per proces" en staan alleen in de footer. Geen "automatisering" in koppen of SEO-titels.
- §1: werk de datum "Laatst bijgewerkt" bij naar 2026-10-13.

**Handover:** voeg in het afwijkingenblok bovenin één regel toe met dezelfde strekking, gedateerd 2026-10-13.

- [ ] **Step 7: Checks, build en funnel**

Verwacht: alles ✓ en de funnel volledig geslaagd.

Maak screenshots op 360 en 1440 px van:
- `/groothandels`
- `/voor-wie`
- `/samenwerken`
- `/voorbeelden`

Bekijk ze.

- [ ] **Step 8: Commit**

```bash
git add src scripts CLAUDE.md docs/strategy/2026-10-09-website-gtm-handover.md docs/superpowers/2026-10-09-livegang.md
git commit -m "Doelgroeppagina's, /voor-wie en /voorbeelden langs de verhaallijn; docs bijgewerkt

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
