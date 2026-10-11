# Messaging & homepage volgens de messagingstrategie — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Homepage, groothandelpagina, sector-H1's en de groothandel-outreach herschrijven volgens `docs/strategy/2026-10-11-messaging-strategie.md` (§5, §6, §7, §8, §11).

**Architecture:** De copy blijft in `src/content/*`. Een nieuwe `SegmentPicker` (keuzeknoppen, door de bezoeker bediend) vervangt `RotatingWord`. Home leest het gekozen segment (state, beginwaarde uit `?category=`) en toont daarvoor de segment-H1, subkop, situaties, demo en CTA-context. Categoriepagina's krijgen dezelfde H1/subkop plus een "Herken je dit?"-sectie.

**Tech Stack:** Vite + React 18 + TS + Tailwind v3, bestaande `src/components/site/*`, `useReveal`, `tsx`-checkscripts, Playwright-funnelcheck (`scripts/e2e/funnel.mjs`).

**Spec:** `docs/strategy/2026-10-11-messaging-strategie.md` (vastgestelde keuzes §9, scope §11). Leidend voor aanbod, prijzen en grenzen blijft `docs/strategy/2026-10-09-website-gtm-handover.md` (met afwijkingenblok bovenaan).

## Global Constraints

- Copy letterlijk zoals in dit plan. Geen verzonnen cijfers, percentages, tijdsclaims, cases of logo's. Geen "AI" in H1's of subkoppen. AI alleen in "Zo werkt het" en in de FAQ.
- Je/jullie, nuchter. Hoofd-CTA overal `ctaLabels.primary` ("Plan een gratis adviesgesprek") uit `src/content/site.ts`.
- Geen universele integratiebelofte (handover §2): "waar het kan koppelen we …, anders via export of Excel".
- "Maandelijks opzegbaar" niet gebruiken (staat niet in de handover). Wel: "Maandkosten starten pas na acceptatie."
- Prijzen alleen via `src/content/pricing.ts` en `formatEuro`, geen euro-literals in `src/pages/site` of `src/components/site`.
- Scroll-animaties via `Reveal`/`useReveal`. Geen glow, geen automatisch roterende tekst.
- Commit alleen de genoemde bestanden. Commit-message eindigt met `Co-Authored-By: Claude <model> <noreply@anthropic.com>`. Nooit `.env`, `bun.lockb`, `data/prospects/*`, `scripts/seed-lead-os.ts` of `.mcp.json` stagen.
- Na elke taak: `npx tsx scripts/check-content.ts`, `npx tsx scripts/check-lib.ts`, `npx tsx scripts/check-redirects.ts`, `npm run build`, alles groen.
- Branch: `copy-adviesgesprek`.

## Review Focus

1. **`?category=onzin` of geen category:** de generieke hero, geen crash en geen segment geselecteerd. Gedekt in Task 2 (funnel).
2. **Toetsenbordbediening van de keuzeknoppen:** Tab bereikt de knoppen, Enter/Spatie kiest, en `aria-pressed` klopt. Gedekt in Task 2 (funnel).
3. **Lange segment-H1 op 360 px:** geen horizontale scroll. Gedekt in Task 5.
4. **Taal-drift:** vage woorden ("uitzoekwerk", "werkstroom" als werkwoord of concept, "conceptactie", "commerciële voorbereiding") komen terug in hero- of homepagecopy. Gedekt in Task 1 (check-content).
5. **Segmentwissel zonder herladen:** demo, subkop, situaties en CTA-href wisselen allemaal mee. Gedekt in Task 2 (funnel).

---

### Task 1: Content — segment-H1's, situaties, nieuwe homepage-copy, FAQ, checks

**Files:** Modify `src/content/types.ts`, `src/content/categories.ts`, `src/content/pages.ts`, `src/content/faq.ts`, `scripts/check-content.ts`

**Interfaces (produced):**
- `Category` krijgt `situations: [string, string, string]`. `h1`/`sub` krijgen de segmentteksten. `heroNoun` blijft (label van de keuzeknop).
- `FaqId` krijgt `"ai" | "mensen"`.
- `home` wordt herschreven met de keys `hero`, `genericSituations`, `howItWorks`, `fits`, `trajectory`, `qualifier`, `assurances`, `about`, `faqIds`, `closing` (zie Step 3).

- [ ] **Step 1: Test eerst — breid `scripts/check-content.ts` uit**

Voeg vóór het blok `// --- CLAUDE.md noemt dezelfde prijzen ---` toe:

```ts
// --- messagingstrategie 2026-10-11: segment-H1's, situaties, taal ---
for (const c of categories) {
  check(c.h1.split(/\s+/).length <= 10, `categorie ${c.id}: h1 langer dan 10 woorden`);
  check(Array.isArray(c.situations) && c.situations.length === 3, `categorie ${c.id}: precies 3 situations`);
  check(!/\bAI\b/.test(c.h1 + " " + c.sub), `categorie ${c.id}: geen "AI" in h1/sub`);
}
const vaag = [/uitzoekwerk/i, /\bwerkstroom\b/i, /conceptactie/i, /commerci[eë]le voorbereiding/i];
const heroTeksten: { pad: string; s: string }[] = [];
const walkHome = (v: unknown, pad: string) => {
  if (typeof v === "string") heroTeksten.push({ pad, s: v });
  else if (Array.isArray(v)) v.forEach((x, i) => walkHome(x, `${pad}[${i}]`));
  else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walkHome(x, `${pad}.${k}`));
};
walkHome(home, "home");
categories.forEach((c) => { walkHome(c.h1, `${c.id}.h1`); walkHome(c.sub, `${c.id}.sub`); walkHome(c.situations, `${c.id}.situations`); });
for (const { pad, s } of heroTeksten) for (const re of vaag) check(!re.test(s), `${pad}: vaag woord ${re} — gebruik concrete taal (strategie §8)`);
check(!/\bAI\b/.test(home.hero.h1 + " " + home.hero.sub), "home.hero: geen AI in h1/sub");
check(faqs.some((f) => f.id === "ai") && faqs.some((f) => f.id === "mensen"), "FAQ mist ai of mensen");
```

Voeg `home` toe aan de import uit `"../src/content"`. Vervang de bestaande regel `check(faqs.length === 9, ...)` door `check(faqs.length === 11, \`verwacht 11 FAQ-items, kreeg ${faqs.length}\`);`. Verwijder het blok `// --- dynamische hero: elke categorie heeft een procesnaam ...` niet: `heroNoun` blijft verplicht.

- [ ] **Step 2: Draai de check en zie hem falen**

`npx tsx scripts/check-content.ts`. Verwacht FAIL: situations ontbreken, vage woorden in de huidige `h1`'s ("uitzoekwerk"), de FAQ-telling klopt niet.

- [ ] **Step 3: Types en content**

`src/content/types.ts`:
- In `Category`: vervang de doc-comment van `heroNoun` door `/** Label van de keuzeknop op de homepage, bv. "offerteaanvragen". */`.
- Voeg na `sub: string;` toe: `situations: [string, string, string];`.
- Verander `FaqId` naar:

```ts
export type FaqId =
  | "software" | "zelfstandig" | "oplevert" | "kosten" | "maandelijks"
  | "uitbreiden" | "whatsapp" | "loont" | "veilig" | "ai" | "mensen";
```

`src/content/categories.ts`: vervang per categorie `h1`, `sub` en `primaryCta`, en voeg `situations` toe direct na `sub`:

```ts
// groothandels
    h1: "Elke offerteaanvraag compleet, voordat je binnendienst begint.",
    sub: "Wij halen artikelen en aantallen uit mails en Excel-lijsten, markeren wat ontbreekt en zetten een conceptvraag klaar. Je binnendienst prijst en verstuurt.",
    situations: [
      "Artikelen en aantallen uit een mail of Excel-lijst overtypen in jullie systeem.",
      "Het artikelnummer van de klant klopt niet met dat van jullie, dus eerst terugmailen.",
      "Een offerte gaat de deur uit, en daarna belt niemand na.",
    ],
    primaryCta: "Plan een gratis adviesgesprek",
// importeurs-distributeurs
    h1: "Garantieclaims compleet, zonder heen-en-weer mailen.",
    sub: "Wij checken serienummer, model en aankoopbewijs tegen jullie eisen en vragen op wat ontbreekt. Je aftersales beslist over garantie.",
    situations: [
      "Een claim komt binnen zonder aankoopbewijs of serienummer.",
      "Drie keer heen en weer mailen voordat iemand de claim kan beoordelen.",
      "Dealers bellen om te vragen hoe het met hun claim staat.",
    ],
    primaryCta: "Plan een gratis adviesgesprek",
// service-onderhoud
    h1: "Elke servicemelding compleet, voordat je planner begint.",
    sub: "Wij verzamelen machine, locatie en klacht, vatten de melding samen en zetten hem door. Je servicedesk plant en stelt de diagnose.",
    situations: [
      "Een melding zonder machinetype of serienummer, dus eerst terugbellen.",
      "Klanten bellen om te vragen wanneer de monteur komt.",
      "De historie van de machine staat verspreid over mail en systeem.",
    ],
    primaryCta: "Plan een gratis adviesgesprek",
// maatwerk-montage
    h1: "Weet bij elke projectaanvraag meteen wat er ontbreekt.",
    sub: "Wij bundelen wensen, foto's en adres uit losse mails en stellen de volgende stap voor. Je team doet inmeting en prijs.",
    situations: [
      "Een aanvraag zonder adres, maten of foto's.",
      "Wensen en bijlagen staan verspreid over drie mails.",
      "Na het eerste contact belt niemand meer na.",
    ],
    primaryCta: "Plan een gratis adviesgesprek",
```

Alleen bij groothandels:
- `seoDescription`: "Offerteaanvragen uit mail en Excel compleet voordat je binnendienst begint: artikelen overgenomen, ontbrekende gegevens gemarkeerd, conceptvraag klaar. Je team prijst en verstuurt."
- `faqIds`: `["software", "mensen", "ai", "kosten", "uitbreiden"]`.

`src/content/faq.ts`: voeg aan het eind van `faqs` toe:

```ts
  { id: "ai", q: "Gebruiken jullie AI? En wat gebeurt er met onze data?", a: "Ja, waar het helpt: om tekst uit mails en bijlagen te lezen en concepten te schrijven. Daarnaast gebruiken we vaste regels. We gebruiken alleen de gegevens die nodig zijn voor het afgesproken proces, en leggen toegang, verwerking en bewaartermijnen per inrichting vast." },
  { id: "mensen", q: "Vervangt dit mijn mensen?", a: "Nee. Het systeem doet het voorwerk; jullie medewerkers controleren, beslissen en houden het klantcontact. Zo houden ze meer tijd over voor verkopen en helpen." },
```

`src/content/pages.ts`: vervang het hele `export const home = { … };`-blok door:

```ts
export const home = {
  seoTitle: "Lead Velocity — Elke aanvraag compleet, voordat je team eraan begint",
  seoDescription: "Wij lezen mails en bijlagen, markeren wat ontbreekt en zetten een antwoord klaar. Jouw medewerker controleert en verstuurt. Voor MKB met 10–75 medewerkers.",
  hero: {
    eyebrow: "Automatisering voor binnendienst en klantenservice",
    h1: "Elke aanvraag compleet, voordat je team eraan begint.",
    sub: "Wij lezen mails en bijlagen, markeren wat ontbreekt en zetten een antwoord klaar. Jouw medewerker controleert en verstuurt, gewoon vanuit jullie mailbox en eigen systeem.",
    forWho: "Voor technische groothandels, importeurs, servicebedrijven en maatwerkbedrijven met 10–75 medewerkers.",
    ctaMicro: "20 minuten, vrijblijvend. Past het niet, dan zeggen we dat ook.",
    secondary: "Bekijk een voorbeeld",
    secondaryMicro: "Eén aanvraag, stap voor stap.",
    pickerLabel: "Waar wil je mee beginnen?",
    moreAbout: "Meer over",
  },
  genericSituations: [
    "Een aanvraag ligt een dag in de mailbox, omdat niemand tijd had om hem na te lopen.",
    "Er ontbreekt een nummer of bijlage, dus mailen jullie twee keer heen en weer.",
    "Wat nog openstaat, zit in iemands hoofd of in een Excel die niet bij is.",
  ] as [string, string, string],
  recognize: {
    h2: "Herken je dit?",
    costLine: "Tel eens hoeveel aanvragen er gisteren binnenkwamen, en hoeveel daarvan niet compleet waren. Daar zit de tijd die je team terugkrijgt.",
  },
  howItWorks: {
    h2: "Zo werkt het",
    steps: [
      { title: "Lezen", body: "We lezen binnenkomende mails, pdf's en Excel-lijsten en halen de gegevens eruit." },
      { title: "Markeren wat ontbreekt", body: "We vergelijken met wat een complete aanvraag nodig heeft en zetten de ontbrekende punten op een rij." },
      { title: "Klaarzetten", body: "Er staat een conceptvraag of -antwoord klaar. Jouw medewerker controleert, past aan en verstuurt." },
    ],
    aiNote: "Hoe? Met taalmodellen (AI) en vaste regels, ingericht op jullie proces. We gebruiken alleen de gegevens die nodig zijn, en wat er met jullie data gebeurt leggen we vooraf vast.",
    examplesLink: "Bekijk alle voorbeelden",
  },
  fits: {
    h2: "Past in wat je al hebt",
    intro: "Geen nieuw systeem om te leren. Jullie team werkt zoals nu, alleen staat het voorwerk al klaar.",
    points: [
      "Werkt vanuit jullie mailbox.",
      "Waar het kan koppelen we met jullie ERP of administratie; anders werken we via export of Excel.",
      "Jullie medewerker houdt de laatste stap: controleren en versturen.",
    ],
    needTitle: "Wat we nodig hebben om te starten",
    need: [
      "Voorbeelden van aanvragen uit de afgelopen weken",
      "Toegang tot de mailbox of een doorstuuradres",
      "Eén persoon die beslist en meedenkt",
    ],
  },
  trajectory: {
    h2: "Van gesprek tot werkende oplossing",
    steps: [
      { title: "Gratis adviesgesprek", body: "20 minuten. We kijken welk werk steeds terugkomt en of automatiseren loont." },
      { title: "Analyse", body: "Proceskaart, nulmeting en een vaste scope met prijs. Verrekenbaar bij een implementatie." },
      { title: "Vast pakket", body: "We richten het in, jullie testen en accepteren. Daarna beheren we het." },
    ],
    link: "Vergelijk de pakketten",
  },
  qualifier: {
    h2: "Voor wie dit werkt (en voor wie niet)",
    fitTitle: "Past goed",
    fit: [
      "10–75 medewerkers, met minstens twee mensen die dit werk doen",
      "Aanvragen, claims of meldingen komen binnen per mail, als pdf of als Excel",
      "Er komt genoeg terug om te automatiseren",
      "Eén persoon die beslist en meedenkt",
      "Je wilt dat je team de concepten controleert",
    ],
    notFitTitle: "Past niet",
    notFit: [
      "Je zoekt een nieuw ERP of CRM",
      "Elke aanvraag is volledig anders",
      "Er is de eerste weken geen tijd om mee te kijken",
      "Je wilt dat het systeem zonder controle zelf beslist",
      "Het volume is erg laag",
    ],
    doubt: "Twijfel je? Dat bespreken we in 20 minuten, en als het niet past zeggen we dat.",
  },
  assurances: {
    h2: "Waar je op kunt rekenen",
    points: [
      "Vaste prijs en vooraf afgesproken scope",
      "Niets gaat de deur uit zonder akkoord van jullie medewerker",
      "Jullie data blijft van jullie; toegang en bewaren leggen we vooraf vast",
      "Maandkosten starten pas na acceptatie",
    ],
  },
  about: {
    h2: "Praktisch gebouwd, samen met de mensen die ermee werken.",
    body: "Lead Velocity is opgericht door Bart Wilbrink. We combineren commerciële ervaring, automatisering en het bruikbaar maken van informatie. We beginnen bij het dagelijkse werk en bouwen van daaruit een systeem dat je team kan gebruiken.",
    cta: "Over Lead Velocity",
  },
  faqIds: ["mensen", "ai", "software", "zelfstandig", "kosten", "maandelijks", "loont"] as const,
  closing: {
    h2: "Hoeveel aanvragen waren gisteren niet compleet?",
    body: "In 20 minuten kijken we samen of automatiseren bij jullie loont. Past het niet, dan zeggen we dat ook.",
  },
};
```

Let op: `home.about.body` bevat de naam Bart. Dat mag; de bestaande check staat alleen `home.about.*` en `over.*` toe.

- [ ] **Step 4: Run de checks**

Draai `npx tsx scripts/check-content.ts`. Verwacht ✓. `npm run build` mag nu FAILen op `Home.tsx` (oude keys); dat wordt in Task 2 hersteld. Draai daarom alleen check-content, en de build pas aan het eind van Task 2.

Bewijs dat de check bijt: zet tijdelijk `home.hero.h1` op "Minder uitzoekwerk, meer AI." Verwacht FAIL op vaag woord en op AI. Zet de waarde daarna terug.

- [ ] **Step 5: Commit** (`src/content/types.ts src/content/categories.ts src/content/pages.ts src/content/faq.ts scripts/check-content.ts`)

Bericht: `Content volgens messagingstrategie: segment-H1's, situaties, homepagecopy, FAQ ai/mensen`.

---

### Task 2: SegmentPicker + nieuwe Home, RotatingWord weg, funnelcheck

**Files:**
- Create `src/components/site/SegmentPicker.tsx`
- Modify `src/components/site/index.ts`, `src/pages/site/Home.tsx` (volledig vervangen), `scripts/e2e/funnel.mjs`
- Delete `src/components/site/RotatingWord.tsx`

**Interfaces:** `<SegmentPicker value={CategoryId | undefined} onChange={(id: CategoryId) => void} label={string} />`

- [ ] **Step 1: Funnel-test eerst (verwacht FAIL)**

Vervang in `scripts/e2e/funnel.mjs` de twee tests `hero: zonder context roteert het procesnaamwoord` en `hero: ?category= zet woord, demo en CTA-context vast` door:

```js
await t("hero: generiek zonder context, geen segment gekozen", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("Elke aanvraag compleet"), "generieke H1 ontbreekt");
  expect(await page.locator("[data-segment-picker] [aria-pressed=true]").count() === 0, "segment voorgeselecteerd zonder context");
  await page.goto(BASE + "/?category=onzin", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("Elke aanvraag compleet"), "onbekende category breekt hero");
});

await t("hero: ?category= toont segment-H1, demo en CTA-context", async () => {
  await page.goto(BASE + "/?category=service-onderhoud", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("Elke servicemelding compleet"), "segment-H1 niet getoond");
  expect(await page.locator("[data-segment-picker] [aria-pressed=true]").count() === 1, "segmentknop niet actief");
  expect(await page.locator("text=Servicemelding").first().count() === 1, "demo niet gewisseld");
  const href = await page.locator("a:has-text('Plan een gratis adviesgesprek')").first().getAttribute("href");
  expect(href.includes("category=service-onderhoud") && href.includes("process=service-intake"), `href ${href}`);
});

await t("keuzeknoppen: klik en toetsenbord wisselen alles mee", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.locator("[data-segment-picker] button", { hasText: /garantieclaims/i }).click();
  expect((await page.locator("h1").textContent()).includes("Garantieclaims compleet"), "H1 wisselt niet");
  expect(await page.locator("text=aankoopbewijs of serienummer").count() >= 1, "situaties wisselen niet");
  const btn = page.locator("[data-segment-picker] button", { hasText: /projectaanvragen/i });
  await btn.focus(); await page.keyboard.press("Enter");
  expect(await btn.getAttribute("aria-pressed") === "true", "toetsenbord kiest niet");
  const href = await page.locator("a:has-text('Plan een gratis adviesgesprek')").first().getAttribute("href");
  expect(href.includes("category=maatwerk-montage"), `href ${href}`);
});

await t("homepage: qualifier, past-in-wat-je-hebt, zekerheden aanwezig", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  for (const h of ["Voor wie dit werkt (en voor wie niet)", "Past in wat je al hebt", "Waar je op kunt rekenen", "Zo werkt het"]) {
    expect(await page.locator(`h2:has-text("${h}")`).count() === 1, `sectie ontbreekt: ${h}`);
  }
});
```

Draai de funnel (env-variabelen zie Task 5). Verwacht FAIL op deze vier tests.

- [ ] **Step 2: `src/components/site/SegmentPicker.tsx`**

```tsx
import { categories } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import { cn } from "@/lib/utils";

/** Keuzeknoppen voor het segment; de bezoeker bepaalt, niets wisselt vanzelf. */
export function SegmentPicker({ value, onChange, label }: { value?: CategoryId; onChange: (id: CategoryId) => void; label: string }) {
  return (
    <div data-segment-picker role="group" aria-label={label}>
      <p className="mb-3 text-[14px] font-medium text-lv-body">{label}</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c.id === value;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(c.id)}
              className={cn(
                "rounded-full px-4 py-2 text-[14.5px] font-medium capitalize transition-colors",
                active ? "bg-lv-ink text-white" : "bg-lv-surface text-lv-ink ring-1 ring-lv-line hover:ring-lv-ink",
              )}
            >
              {c.heroNoun}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

`src/components/site/index.ts`: vervang `export * from "./RotatingWord";` door `export * from "./SegmentPicker";`. Verwijder daarna `src/components/site/RotatingWord.tsx`.

- [ ] **Step 3: `src/pages/site/Home.tsx` volledig vervangen**

```tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import { home } from "@/content/pages";
import { categories, categoryById } from "@/content/categories";
import { demoById } from "@/content/demos";
import { ctaLabels } from "@/content/site";
import type { CategoryId } from "@/content/types";
import { checkHref, demoHref, parseCheckContext } from "@/lib/cta";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, Steps, PricingCards, Faq, Eyebrow, SegmentPicker,
} from "@/components/site";

export default function Home() {
  const initial = parseCheckContext(useLocation().search).category;
  const [segment, setSegment] = useState<CategoryId | undefined>(initial);
  const c = segment ? categoryById(segment) : undefined;

  const h1 = c?.h1 ?? home.hero.h1;
  const sub = c?.sub ?? home.hero.sub;
  const situations = c?.situations ?? home.genericSituations;
  const demo = demoById(c?.demoId ?? "offerte-intake")!;
  const ctx = (source: string) => checkHref({ source, category: c?.id, process: c?.processKey });

  return (
    <SiteLayout>
      <Seo title={home.seoTitle} description={home.seoDescription} path="/" />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20">
        <GridPattern width={56} height={56} className="fill-transparent stroke-lv-line/70 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,#000_35%,transparent_100%)]" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-lv-muted">{home.hero.eyebrow}</p>
            <h1 className="mt-5 break-words font-display text-[clamp(2.1rem,5.6vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]" aria-live="polite">{h1}</h1>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-lv-body">{sub}</p>
            <p className="mt-3 text-[14.5px] text-lv-muted">{home.hero.forWho}</p>
            <div className="mt-8 flex flex-wrap gap-x-3 gap-y-4">
              <div>
                <CtaLink to={ctx("home-hero")} ctaId="home-hero-check" trackParams={{ category: c?.id }}>{ctaLabels.primary}</CtaLink>
                <p className="mt-2 max-w-[19rem] text-[13px] text-lv-muted">{home.hero.ctaMicro}</p>
              </div>
              <div>
                <CtaLink to={demoHref(c?.demoId, "home-hero")} ctaId="home-hero-demo" variant="secondary">{home.hero.secondary}</CtaLink>
                <p className="mt-2 text-[13px] text-lv-muted">{home.hero.secondaryMicro}</p>
              </div>
            </div>
            <div className="mt-10">
              <SegmentPicker value={segment} onChange={setSegment} label={home.hero.pickerLabel} />
              {c && (
                <Link to={`/${c.id}`} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium underline-offset-4 hover:underline">
                  {home.hero.moreAbout} {c.name.toLowerCase()} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
          <DemoStepper key={demo.id} demo={demo} source="home-hero" compact />
        </div>
      </section>

      {/* 2 — Herken je dit? */}
      <Section tone="raised">
        <SectionHead title={home.recognize.h2} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {situations.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <li className="h-full rounded-3xl border border-lv-line bg-lv-surface p-7 text-[16.5px] leading-relaxed">{s}</li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-[15.5px] text-lv-body">{home.recognize.costLine}</p>
      </Section>

      {/* 3 — Zo werkt het */}
      <Section>
        <SectionHead title={home.howItWorks.h2} />
        <div className="mt-12"><Steps steps={home.howItWorks.steps} /></div>
        <p className="mt-10 max-w-2xl rounded-2xl bg-lv-raised p-5 text-[15px] leading-relaxed text-lv-body ring-1 ring-lv-line">{home.howItWorks.aiNote}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <CtaLink to={ctx("home-how")} ctaId="home-how-check">{ctaLabels.primary}</CtaLink>
          <Link to="/voorbeelden" className="inline-flex items-center gap-1.5 text-[15px] font-medium">{home.howItWorks.examplesLink}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* 4 — Past in wat je al hebt */}
      <Section tone="raised">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead title={home.fits.h2} intro={home.fits.intro} />
            <ul className="mt-8 space-y-3 text-[16px]">
              {home.fits.points.map((p) => <li key={p} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{p}</li>)}
            </ul>
          </div>
          <Reveal>
            <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
              <Eyebrow>{home.fits.needTitle}</Eyebrow>
              <ul className="space-y-3 text-[15.5px]">{home.fits.need.map((n) => <li key={n} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{n}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — Traject en prijs */}
      <Section id="pakketten">
        <SectionHead title={home.trajectory.h2} />
        <div className="mt-12"><Steps steps={home.trajectory.steps} /></div>
        <div className="mt-14"><PricingCards source="home-packages" /></div>
        <Link to="/prijzen" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium">{home.trajectory.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
      </Section>

      {/* 6 — Voor wie dit werkt (en voor wie niet) */}
      <Section tone="raised">
        <SectionHead title={home.qualifier.h2} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{home.qualifier.fitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{home.qualifier.fit.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line p-8">
            <Eyebrow>{home.qualifier.notFitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px] text-lv-body">{home.qualifier.notFit.map((x) => <li key={x} className="flex gap-3"><X aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
        <p className="mt-6 text-[15.5px] text-lv-body">{home.qualifier.doubt}</p>
        <CtaLink to={ctx("home-qualifier")} ctaId="home-qualifier-check" className="mt-6">{ctaLabels.primary}</CtaLink>
      </Section>

      {/* 7 — Zekerheden */}
      <Section>
        <SectionHead title={home.assurances.h2} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {home.assurances.points.map((p) => (
            <li key={p} className="flex gap-3 rounded-2xl border border-lv-line bg-lv-surface p-5 text-[15.5px]"><ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />{p}</li>
          ))}
        </ul>
      </Section>

      {/* 8 — Over */}
      <Section tone="raised">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">{home.about.h2}</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-lv-body">{home.about.body}</p>
          <CtaLink to="/over" ctaId="home-about" variant="secondary" className="mt-6">{home.about.cta}</CtaLink>
        </Reveal>
      </Section>

      {/* 9 — FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
          <Faq ids={home.faqIds} />
        </div>
      </Section>

      {/* 10 — Slot */}
      <section className="px-4 pb-6 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-lv-ink px-7 py-20 text-center text-white">
          <GridPattern width={48} height={48} className="fill-transparent stroke-white/[0.07]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{home.closing.h2}</h2>
            <p className="mx-auto mt-5 max-w-lg text-[17px] text-white/70">{home.closing.body}</p>
            <CtaLink to={ctx("home-bottom")} ctaId="home-bottom" variant="lime" className="mt-9">{ctaLabels.primary}</CtaLink>
            <p className="mt-6 text-[14px] text-white/60">
              Of kies je situatie:{" "}
              {categories.map((x, i) => (
                <span key={x.id}>
                  <Link to={`/${x.id}`} className="underline underline-offset-4 hover:text-white">{x.heroNoun}</Link>{i < categories.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
```

(Deze Home importeert `CategoryCard`, `ProcessCard` en `HumanControl` niet meer. Die componenten blijven bestaan, omdat andere pagina's ze gebruiken.)

- [ ] **Step 4:** Draai `npm run build`, alle check-scripts en daarna de funnel. Verwacht dat alles groen is; de vier nieuwe tests slagen.
- [ ] **Step 5: Commit**

Bestanden: `src/components/site/SegmentPicker.tsx src/components/site/index.ts src/pages/site/Home.tsx scripts/e2e/funnel.mjs` plus de verwijdering van `RotatingWord.tsx` (`git rm`).

Bericht: `Homepage volgens messagingstrategie: statische hero + keuzeknoppen, 10 secties`.

---

### Task 3: Categoriepagina "Herken je dit?" + groothandel-FAQ zichtbaar

**Files:** Modify `src/pages/site/CategoryPage.tsx`

- [ ] **Step 1:** Voeg direct na de hero-`<Section>` (vóór de sectie "Herkenbare taken") toe:

```tsx
      <Section>
        <SectionHead title="Herken je dit?" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {c.situations.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <li className="h-full rounded-3xl border border-lv-line bg-lv-surface p-7 text-[16.5px] leading-relaxed">{s}</li>
            </Reveal>
          ))}
        </ul>
      </Section>
```

Zet de bestaande sectie "Herkenbare taken" om naar titel `"Wat we voor je voorbereiden"`. Wijzig alleen die titelstring.

- [ ] **Step 2:** Draai de build en de checks. Verifieer daarna `/groothandels` in de browser:
  - de H1 is "Elke offerteaanvraag compleet, voordat je binnendienst begint.";
  - "Herken je dit?" toont 3 situaties;
  - de FAQ toont "Vervangt dit mijn mensen?" en de AI-vraag.

- [ ] **Step 3: Commit**

Bestand: `src/pages/site/CategoryPage.tsx`. Bericht: `Categoriepagina: Herken je dit? per segment`.

---

### Task 4: Outreach naar het nieuwe aanbod

**Files:** Modify `docs/outreach/sequence-groothandel.md` (volledig herschrijven), `docs/outreach/README.md`, `docs/outreach/playbook.md`, `docs/outreach/sequence-maakindustrie.md`, `docs/outreach/sequence-transport.md`

- [ ] **Step 1: `sequence-groothandel.md` herschrijven.** Vereisten:
  - **Doelgroep:** technische groothandels met 10–75 medewerkers. De buyer is de eigenaar of directeur; de binnendienst-teamleider wordt genoemd.
  - **Vijf touches, verspreid over ±3 weken.** Elke mail is ≤120 woorden, in je-vorm, en heeft één vraag of één CTA. Geen "AI" in de onderwerpregel.
  - **Hooks** uit strategie §1, §2 en §5 en de pijn uit het groothandelblok:
    - overtypen uit mail en Excel;
    - het klant-artikelnummer dat niet klopt;
    - offertes zonder opvolging;
    - geen binnendienst te vinden (UWV-tekort; als feit mag het, met bron in de interne notitie, niet in de mail);
    - "zonder nieuw systeem".
  - **CTA-links:** `https://www.leadvelocity.nl/?category=groothandels&source=outreach-gh-t{N}&utm_source=email&utm_medium=outreach&utm_campaign=groothandel-v2&utm_content=t{N}`. In touch 3 linkt de demo naar `https://www.leadvelocity.nl/voorbeelden?demo=offerte-intake&source=outreach-gh-t3`.
  - **Aanbod exact zoals de handover en de prijsconfig:** gratis adviesgesprek (20 min), analyse €750 (verrekenbaar binnen 60 dagen), pakketten vanaf €2.950 setup + €595/mnd. Prijzen staan alleen in touch 4 of 5, nooit in touch 1.
  - **Verwijderen:**
    - "AI Ops Audit" en "AI Operations Partner";
    - 50–250 FTE;
    - "40+ scans";
    - "150–200 bps" en "30–40% productiever";
    - elke tijdsclaim, percentage of garantie.
  - **Personalisatie:** per touch een regel `[Signaal: …]` met toegestane signalen uit handover §4 (vacature binnendienst, assortimentsuitbreiding). Signalen zijn een aanleiding, geen bewijs van inefficiëntie.
  - **Onderaan:** de sectie "Bezwaren en antwoorden". Die herhaalt de FAQ-antwoorden (mensen, AI/data, software, kosten) in mailtoon en belooft niets wat de site niet belooft.
- [ ] **Step 2:** `sequence-maakindustrie.md` en `sequence-transport.md`: zet bovenaan `> **Vervallen (2026-10-11):** geen sitecategorie meer. Zie docs/strategy/2026-10-11-messaging-strategie.md. Niet gebruiken voor nieuwe outreach.` De rest blijft staan als archief.
- [ ] **Step 3:** `README.md` en `playbook.md`: vervang verwijzingen naar AI Ops Audit, "AI Operations Partner", oude prijzen en FTE-ranges en oude sectoren door het nieuwe aanbod en de vier categorieën. Vermeld dat groothandel het eerste segment is. Verwijder de links naar de niet-bestaande `targeting-guide.md` en `tools-stack.md`, of markeer ze als "nog te maken".
- [ ] **Step 4:** Controle:

```bash
grep -nE "AI Ops|Operations Partner|50-250|50–250|40\+|bps|30-40%|30–40%|garantie dat|geld terug" docs/outreach/sequence-groothandel.md docs/outreach/README.md docs/outreach/playbook.md
```

Verwacht: geen output.

- [ ] **Step 5: Commit** (de vijf bestanden). Bericht: `Outreach naar nieuw aanbod: groothandel-sequence herschreven, oude sectoren vervallen`.

---

### Task 5: Verificatie, screenshots, CLAUDE.md

**Files:** Modify `CLAUDE.md`, `docs/superpowers/2026-10-09-livegang.md`

- [ ] **Step 1: Funnel volledig draaien**

```bash
SH=/private/tmp/claude-501/-Users-bartwilbrink-leadvelocity/a5f3b28a-c974-4d76-b7e4-04eec632a6f8/scratchpad
PLAYWRIGHT_MODULE=$SH/shot/node_modules/playwright/index.mjs \
CHROME_PATH="/Users/bartwilbrink/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" \
OUT_DIR=$SH/funnel-shots3 node scripts/e2e/funnel.mjs
```

Verwacht: alles PASS. Draait de dev-server niet op 5179, start dan `npx vite --port 5182 --force` en zet `BASE_URL`.

- [ ] **Step 2: Screenshots** van `/`, `/?category=groothandels` en `/groothandels` op 360 en 1440 px, met viewport-scroll zodat `Reveal`-secties zichtbaar zijn. Bekijk ze. Controleer:
  - er is geen horizontale scroll;
  - de hero past;
  - de keuzeknoppen lopen netjes door naar de volgende regel.

  Herstel visuele fouten in de taak die het bestand bezit en meld ze.
- [ ] **Step 3: CLAUDE.md**
  - Vervang de alinea "Homepage-kop (besluit Bart 2026-10-11 …)" door: "Homepage (besluit Bart 2026-10-11, zie `docs/strategy/2026-10-11-messaging-strategie.md`): statische H1 **'Elke aanvraag compleet, voordat je team eraan begint.'** met keuzeknoppen per segment; met `?category=` toont de hero de segment-H1 uit `categories[].h1`. Geen automatisch wisselende tekst. Geen 'AI' in H1/subkop."
  - Voeg bij §8 een rij toe voor de messagingstrategie, met de omschrijving "Leidend voor copy en hero".
- [ ] **Step 4:** In `docs/superpowers/2026-10-09-livegang.md`, onder "Open voor fase 2": voeg "Inbox-gesprekken (10–15) om pijn en cijfers te onderbouwen — strategie §10" en "Volledige copy voor importeurs, service en maatwerk" toe.
- [ ] **Step 5:** Draai alle checks en de build, en commit `CLAUDE.md` en het livegang-document. Bericht: `Docs: homepage-besluit en messagingstrategie vastgelegd`.
