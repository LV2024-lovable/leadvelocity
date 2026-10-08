# Leadvelocity — Project Context voor Claude

**Laatst bijgewerkt:** 2026-10-08

Dit document bevat alle context die Claude nodig heeft om zinvol mee te werken aan Leadvelocity. Lees het in z'n geheel voordat je begint met taken — positionering, product, tone-of-voice en do-not's staan hier allemaal.

---

## 1. Wat is Leadvelocity?

Leadvelocity helpt **MKB-bedrijven ontdekken en inzetten wat AI voor hen kan**. De kernvraag:

> **Weet jouw bedrijf wat het met AI kan?**

We vertalen AI naar vier concrete uitkomsten — **tijd besparen, klantbehoud, kennisbank, data & inzicht** — elk als vast pakket met vaste prijs, live in 2-4 weken, met een maandtier voor hosting, support en doorontwikkeling. Kleinere bedrijven (5-50 medewerkers) zijn de basis; grotere, complexe projecten doen we als maatwerk.

**We zijn geen consultancy en geen AI-bureau met vage trajecten.** Een prospect moet na één alinea weten wat we doen, wat het kost en hoe snel het werkt.

**Huidige fase:** bootstrapping, 2-persoons-studio in opbouw. Path C-strategie: jaar 1 lean opereren met exit-architectuur onder de motorkap, beslisdatum juni 2027 voor lifestyle-anker vs. exit-schaling.

**Bron van waarheid voor aanbod en prijzen:** [`src/data/aanbod.ts`](./src/data/aanbod.ts). Spec: [`docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md`](./docs/superpowers/specs/2026-10-08-positionering-aanbod-v2-design.md).

---

## 2. Onze kern-overtuiging (POV)

Overal in copy, content en gesprekken zit deze centrale belief:

> **AI vervangt geen goede mensen. Maar wél bedrijven die blijven stilstaan.**
>
> AI geeft mensen de bouwblokken om sneller, slimmer en met minder gedoe te werken. Maar AI vervangt wél organisaties die niet meebewegen. De vraag is niet óf je AI inzet. De vraag is: ben jij degene die ermee bouwt, of degene die wordt ingehaald?

Deze dubbele boodschap (AI als *enabler* + AI als *vervanger van traagheid*) is onze wedge. Concurrenten durven maar één kant te kiezen — wij pakken beide, omdat beide waar zijn.

**Subteksten:** *"Supercharge je bedrijf. Bespaar kosten. Bespaar tijd."* · *"Meebewegen, of ingehaald worden."* · *"Niet de vraag óf. De vraag is hoe."*

---

## 3. Wat we verkopen — 4 uitkomsten, vaste pakketten, maandtier

Prijzen staan in [`src/data/aanbod.ts`](./src/data/aanbod.ts). Wijzig je een prijs, wijzig hem daar én hier; `npx tsx scripts/check-aanbod.ts` controleert dat ze gelijk zijn.

### De ladder
1. **AI-kansenscan (gratis)** — `/ai-kansenscan`: *"Ontdek in 5 minuten wat AI voor jouw bedrijf kan."* Toont welke uitkomsten passen en welk pakket erbij hoort. CTA in elke cold e-mail.
2. **Kennismaking (gratis, 30 min)** — scan-uitkomst doorlopen, één pakket voorstellen.
3. **Vast pakket per uitkomst** — vaste scope, vaste setup-prijs, live in 2-4 weken.
4. **Maandtier** — hosting, AI-gebruik (fair use), monitoring, support, doorontwikkeling.
5. **Maatwerk** — via de betaalde audit, voor grotere/complexe vraagstukken.

### Pakketten (setup, eenmalig, excl. btw)
- **Kennisbank — €2.000** — 1 documentbron, tot ~500 documenten, chat via browser of Teams
- **Tijd besparen — €2.500** per workflow — 1 proces end-to-end, koppeling met max. 2 systemen
- **Klantbehoud — €2.500** — signalen uit order-/CRM-data + 1 opvolg- of heractivatie-flow
- **Data & inzicht — €3.000** — 2-3 bronnen gekoppeld, 1 dashboard met max. ~10 kerncijfers

Werk buiten de standaard-scope offreren we vooraf apart.

### Maandtiers (excl. btw)
- **Basis — €149/maand** — 1 pakket, kleine aanpassingen
- **Groei — €399/maand** — 2-3 pakketten + 4 uur verbeteringen per maand
- **Partner — €799/maand** — alle pakketten, 8 uur + maandelijkse verbetersessie + voorrang

Minimale looptijd 6 maanden, daarna maandelijks opzegbaar. Een pakket draait alleen met een actieve maandtier.

### Maatwerk
- **AI Ops Audit — €2.500** — 60 min kickoff + 2-4 team-interviews, rapport met top-3 AI-kansen binnen 5 werkdagen. Ingang voor maatwerk.
- **Maatwerk vanaf ~€10.000, op offerte** — voice-agents, maatwerk-platformen (CRM, ATS, klantportalen), complexe agents over meerdere systemen.

### Uitgefaseerd
De oude 5 diensten (`ServicesNew`) en 5 oplossingen (`/oplossingen/*`, pilot-ranges €12-25k) zijn niet langer de hoofdstructuur. Deelproject 2 (site-structuur) beslist per pagina wat blijft, verhuist naar maatwerk of verdwijnt.

---

## 4. Wie we echt zijn (capabilities)

Dit is wat we aantoonbaar kunnen bouwen vandaag:

- **Dashboards die meerdere bronnen samenbrengen** — ERP + webshop + Excel + CRM + finance → live zicht. Universele MKB-pijnoplosser.
- **Applicaties:** chatbots, prospecting-tools, scrapers, AI-assistenten, sales intelligence, tracking-systemen
- **Voice agents** (zeldzame kunde in NL — differentiator)
- **Volledige interne platformen:** custom CRM, ATS (recruitment management), B2B-klantportalen
- **Data-analyse** — waaronder energieverbruik (CSRD/scope-1 relevant)

---

## 5. Doelgroep (ICP)

### Geografisch + grootte
- **Nederland** (België adjacent)
- **MKB met 5-50 medewerkers** als basis. Groter = maatwerk-route.
- In klantcopy altijd **"MKB"** — nooit FTE-ranges.

### Beslisser
- **Eigenaar / DGA** — beslist meestal alleen. Wil weten: wat levert het op, wat kost het, hoe snel. Skeptisch over hype.
- **Operationeel manager / kantoormanager** — voelt de pijn (handwerk, zoeken, overtypen), bereidt de beslissing voor.
- Wat ze NIET willen horen: "digitale transformatie", "AI-revolutie", "toekomstbestendig", "journey".

### 4 doelmarkten (cold outreach + marktpagina's)

| Markt | Leidende uitkomst | Haak |
|---|---|---|
| **Groothandel** | Tijd besparen + Klantbehoud | "Hoeveel orders worden er nog handmatig uit de mail overgetypt?" |
| **Maakindustrie** | Kennisbank + Tijd besparen | "Wat gebeurt er met jullie configuratiekennis als je senior engineer met pensioen gaat?" |
| **Zakelijke dienstverlening** | Tijd besparen + Kennisbank | "Hoeveel uur per week gaat er naar intake, administratie en documenten zoeken?" |
| **MKB algemeen** | Instap via kansenscan | "Weet jij wat AI voor jouw bedrijf kan? Ontdek het in 5 minuten." |

Transport & logistiek is **geen focusmarkt meer**. Bestaande transport-content blijft voorlopig staan tot deelproject 2.

---

## 6. Tone of voice — kritische regels

### DO

- **Nederlands, zakelijk, direct.** Werkwoord vooraan. Cijfers in de eerste alinea.
- **Spreek in "wij" en "ons".** Geen persoonlijke namen ("Bart", "de broer") in copy. We zijn Leadvelocity.
- **Tweede persoon naar lezer:** "jouw bedrijf", "jullie sales", "jullie operatie"
- **Concreet over pijn en resultaat.** *"Van Excel-chaos naar real-time zicht"* > *"Wij helpen organisaties bij hun digitale reis."*
- **Sector-jargon waar relevant** (zie per vertical: `docs/outreach/sequence-*.md`)
- **Industry benchmarks met bron** — wel op /#resultaten, niet overal
- **Scenario-cases expliciet gelabeld** als *voorbeeld* of *scenario*

### DON'T

- ❌ **Geen persoonlijke namen of "Bart en zijn broer"** in copy — altijd "wij/ons"
- ❌ **Geen "50-250 FTE"** in klant-copy — zeg "MKB"
- ❌ **Geen bronvermelding overal.** Eén plek (ResultsNew "De cijfers"-sectie) is OK, elders niet
- ❌ **Geen verzonnen cijfers.** Nooit "50+ klanten geholpen" of "3x meer leads" zonder staving
- ❌ **Geen "maximaal 8 klanten" / "geen retainer-valstrikken"-taal** — we willen juist retainers, niet ertegen inschoppen
- ❌ **Geen hype-taal:** "digitale transformatie", "journey", "synergie", "cutting-edge", "disruptive", "next-gen", "revolutionair", "paradigmaverschuiving", "holistisch", "roadmap"
- ❌ **Geen "Amerikaanse superlatieven"** of vertaalde US-cliche's ("unlocking value", "unleash potential")
- ❌ **Geen beloftes die we niet kunnen staven** ("40% binnen 30 dagen")
- ❌ **Geen 2-persoonsagency-framing in commerciële copy** — we zijn Leadvelocity, niet "Bart + broer"

### Tone-check voor elke copy-wijziging

Vraag jezelf voor elk blok af:
1. Kan een NL-COO (45+, pragmatisch, skeptisch over hype) dit serieus lezen?
2. Is elke claim verdedigbaar met een bron of scenario-label?
3. Spreken we "wij/ons" en niet persoonlijk/individu?
4. Is MKB (niet "50-250 FTE") het label voor doelgroep?

---

## 7. Technische context (codebase)

### Stack
- **Vite 5** + **React 18** + **TypeScript**
- **React Router v6** (BrowserRouter, hash-links voor same-page, path-routes voor aparte pages)
- **Tailwind CSS** met custom `lv-*` kleuren (zie `tailwind.config.ts`)
- **shadcn/ui** componenten (beschikbaar onder `src/components/ui/`)
- **Supabase** voor contact-form-submissions + Edge Functions
- **Resend** via Supabase Edge Function `email-notify` → `info@leadvelocity.nl`
- **Fonts:** Geist (display/headlines) + Manrope (body) via Google Fonts
- **Hosting:** Lovable (via GitHub → Lovable auto-deploy bij push naar `main`)

### Routes (huidige structuur)

```
/                     Homepage (generiek MKB, 4 producten, 3 verticals, CTA)
/groothandel          Technische groothandel landing (primair)
/maakindustrie        Maakindustrie landing (secundair)
/transport            Transport & logistiek landing (secundair)
/lp/assessment        Campaign-landing, nav-less, single CTA
```

### Key componenten

```
src/components/
  NavbarNew.tsx           Fixed nav met Sectoren-dropdown (hover-stable)
  HeroNew.tsx             Rotating headlines (3 varianten, sessionStorage)
  VerticalsNew.tsx        3-card sector-picker op homepage
  ServicesNew.tsx         5 diensten met vanaf-prijzen + retainer-paraplu
  ProcessNew.tsx          4-stap werkwijze
  ResultsNew.tsx          Bronvermeldingen wonen hier (en nergens anders)
  AboutNew.tsx            POV + "wij/ons" — geen Bart/broer namen
  CTANew.tsx              Homepage contact-sectie met ContactForm
  FooterNew.tsx           4-kolom met sector-links
  ContactForm.tsx         Herbruikbaar, submit via Supabase → Resend
  VerticalPage.tsx        Gedeelde layout voor 3 sector-pagina's
```

### Contactformulier-integratie

Formulier submits via `supabase.functions.invoke('email-notify', ...)`. Die Edge Function staat in `supabase/functions/email-notify/` en gebruikt Resend om te mailen naar `info@leadvelocity.nl`. **Vereisten:**
- `RESEND_API_KEY` environment-secret in Supabase
- Domein `leadvelocity.nl` geverifieerd in Resend (SPF/DKIM)

Als formulier niet werkt → check eerst deze twee.

### Do's & Don'ts bij code

- **Houd copy in componenten.** Voor grote data-sets (vertical configs) gebruik we config-objecten bovenaan het page-bestand (zie `pages/Groothandel.tsx`).
- **Gebruik `useReveal`-hook** voor scroll-animaties, niet losse IntersectionObserver-code.
- **Nieuwe pages via `/` in `App.tsx`** toevoegen, niet via dynamic imports tenzij bundle-size issue is.
- **Geen shadcn/ui-componenten customen direct.** Liever `className=` toevoegen of wrapper-component maken.
- **Font weight nooit 800** voor headlines — gebruikt we 600/700 (Geist is minder leesbaar bij 800).

---

## 8. Belangrijke documenten in de repo

| Pad | Wat |
|---|---|
| [`docs/strategy/2026-04-20-leadvelocity-masterplan.md`](./docs/strategy/2026-04-20-leadvelocity-masterplan.md) | Strategisch masterplan v1 — POV, doelgroep, aanbod, 3-jaars roadmap, pad C |
| [`docs/outreach/README.md`](./docs/outreach/README.md) | Overview van outreach-stack |
| [`docs/outreach/playbook.md`](./docs/outreach/playbook.md) | Scrape-to-opening 3-min-proces |
| [`docs/outreach/sequence-groothandel.md`](./docs/outreach/sequence-groothandel.md) | Groothandel 5-touch campaign |
| [`docs/outreach/sequence-maakindustrie.md`](./docs/outreach/sequence-maakindustrie.md) | Maakindustrie 5-touch campaign |
| [`docs/outreach/sequence-transport.md`](./docs/outreach/sequence-transport.md) | Transport 5-touch campaign |

### Research-documenten (niet in git — lokaal in `.planning/research/`)

- `groothandel-ai-research.md` — 3200 woorden, sourced benchmarks
- `maakindustrie-ai-research.md` — 3100 woorden, sourced benchmarks
- `transport-ai-research.md` — 3100 woorden, sourced benchmarks

Gebruik deze voor nieuwe copy, use-cases, blog-content. Elke sector heeft TL;DR "Top-5 insights voor copy" bovenaan.

---

## 9. Beslissingen al genomen (niet meer open ter discussie)

- **Path C** — hybride 12-maanden lean, beslisdatum juni 2027 voor schaal vs. lifestyle
- **Positionering v2 (2026-10-08)** — kernvraag "Weet jouw bedrijf wat het met AI kan?", 4 uitkomsten als vaste pakketten. Vervangt de 5 diensten + 5 oplossingen.
- **ICP 5-50 medewerkers** — kleinere bedrijven als basis, maatwerk voor groter
- **4 markten** — groothandel, maakindustrie, zakelijke dienstverlening, MKB algemeen. Transport valt af.
- **Prijsmodel** — vaste setup per pakket + maandtier (Basis/Groei/Partner), 6 maanden minimum
- **Prijzen WEL gepubliceerd:** pakket-setups, maandtiers, AI Ops Audit, maatwerk "vanaf ~€10.000"
- **Retainers positief gepositioneerd** — als concrete maandtier, niet als open "partnership op maat"
- **Geen persoonlijke namen in copy** — altijd "wij/ons"
- **Sources alleen op één resultaten-sectie** — niet overal door site heen
- **Geen "8-klanten"-tagline** — we willen schalen als het werkt

---

## 10. Open werkpunten

Site-brede herpositionering in 4 deelprojecten (elk eigen spec → plan → uitvoering):

1. ~~Positionering & aanbod v2~~ — afgerond (`src/data/aanbod.ts`)
2. **Site-structuur + minimal design system** — welke van de ~37 pagina's blijven; component libraries via shadcn-registry/MCP (o.a. `@aceternity/sticky-scroll-reveal-demo`); oude componenten opruimen
3. **Bouw** — homepage, 4 marktpagina's, pakket-/prijspagina, kansenscan-resultaat gemapt op de 4 uitkomsten
4. **Cold outreach** — één 5-touch sequence per markt op basis van §5

Daarnaast: pilot-klanten werven voor case studies, LinkedIn-content-engine.

---

## 11. Commerciële workflow-context

### Hoe een klant typisch bij ons komt
1. Cold outreach-sequence **OF** inbound via website → AI-kansenscan (`/ai-kansenscan`)
2. 30-min kennismakingsgesprek (gratis) → één vast pakket + maandtier. Groter/complex → AI Ops Audit (€2.500) → maatwerk-offerte
3. Na eerste pakket: tweede pakket toevoegen, tier groeit mee (Basis → Groei → Partner)

### Contact-routing
- Formulieren landen in **info@leadvelocity.nl** via Supabase/Resend
- Telefoon: **+31 6 25 47 15 28** (Bart, directe lijn)
- LinkedIn company: `linkedin.com/company/leadvelocity-2/`

### Wat NIET doen in klantgesprek
- Geen scope committen voordat Assessment is gedaan
- Geen vaste prijzen quoten als klant nog niet duidelijk is
- Geen beloftes die we nog niet 3x hebben geleverd

---

## 12. Typische taken waar Claude bij helpt

**Hoge frequentie:**
- Nieuwe copy (pagina, sectie, blog) schrijven of reviseren → check tone-of-voice sectie 6
- Sector-specifieke content maken → gebruik `.planning/research/*.md` als bron
- Nieuwe landing page (campaign, vertical, product) scaffolden
- Contactformulier-velden of validaties aanpassen

**Gemiddelde frequentie:**
- Outreach-sequence iteraties na reply-data
- Whitepaper-concept schrijven
- LinkedIn-content brainstormen
- Research-document samenvatten naar copy-blok

**Lagere frequentie:**
- Technische stack-wijzigingen (font, kleuren, components library)
- SEO-structuur (meta-tags, sitemap, schema.org)
- E-mail-integratie uitbreiden (nieuwe templates, workflows)
- Supabase Edge Function wijzigingen

---

## 13. Werkstijl-afspraken

- **Altijd checken of de copy voldoet aan tone-of-voice sectie 6** vóór commit
- **Nooit persoonlijke namen (Bart/broer) in klant-copy** toevoegen, ook niet per ongeluk
- **Bij twijfel over positionering**: check masterplan (`docs/strategy/...`)
- **Bij twijfel over use-cases/cijfers**: check research-docs (`.planning/research/*.md`)
- **Bij twijfel over outreach-wording**: check sequence-docs (`docs/outreach/sequence-*.md`)
- **Commits zijn logisch gegroepeerd** (één feature/sectie per commit), conventional-commits niet verplicht
- **Geen code-wijzigingen zonder build-check** (`npm run build`) voor commit

---

*Einde project-context. Laatst bijgewerkt: 2026-10-08. Update dit document wanneer positionering, aanbod of werkstijl significant verandert.*
