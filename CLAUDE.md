# Lead Velocity — Project Context voor Claude

**Laatst bijgewerkt:** 2026-10-12

Dit document bevat alle context die Claude nodig heeft om zinvol mee te werken aan Lead Velocity. Lees het in z'n geheel voordat je begint met taken — positionering, product, tone-of-voice en do-not's staan hier allemaal.

---

## 1. Wat is Lead Velocity?

**Jouw AI-partner voor het MKB, per doelgroep.** (besluit Bart 2026-10-12) Wij bouwen en beheren AI-oplossingen die het handwerk uit aanvragen, klantcontact en opvolging halen, voor technische groothandels, importeurs en distributeurs, servicebedrijven en maatwerk en montage.

Merkbelofte: **Minder uitzoekwerk. Meer werk gedaan.**

Homepage (besluit Bart 2026-10-12, vervangt de regel "geen AI in H1" uit de messagingstrategie van 2026-10-11): H1 **"Jouw AI-partner voor [doelgroep]."** — zonder gekozen doelgroep "Jouw AI-partner voor het MKB."; met een keuzeknop of `?category=` wordt [doelgroep] `categories[].audience` en de subkop `categories[].sub`. Per doelgroep tonen we 3–4 oplossingen (`categories[].solutions`). Geen automatisch wisselende tekst.

**Leidende bron:** [`docs/strategy/2026-10-09-website-gtm-handover.md`](./docs/strategy/2026-10-09-website-gtm-handover.md). Bij twijfel over positionering, copy, prijzen of claims gaat dat document voor.

**Bron van waarheid voor copy en prijzen op de site:** `src/content/*`. Check: `npx tsx scripts/check-content.ts`.

---

## 2. Merkbelofte en boodschap (handover §3)

Merkbelofte: **Minder uitzoekwerk. Meer werk gedaan.**

Homepage (besluit Bart 2026-10-12, vervangt de regel "geen AI in H1" uit de messagingstrategie van 2026-10-11): H1 **"Jouw AI-partner voor [doelgroep]."** — zonder gekozen doelgroep "Jouw AI-partner voor het MKB."; met een keuzeknop of `?category=` wordt [doelgroep] `categories[].audience` en de subkop `categories[].sub`. Per doelgroep tonen we 3–4 oplossingen (`categories[].solutions`). Geen automatisch wisselende tekst.

Ondersteunende uitleg: **Wij automatiseren terugkerend werk rond aanvragen, klantcommunicatie en opvolging. Ingericht op jullie werkwijze, met jullie team in controle.**

Concrete voorbeelden: ontbrekende gegevens verzamelen, mails en bijlagen samenbrengen, informatie uit bronnen ophalen, geschikte bedrijven onderzoeken, conceptberichten voorbereiden en open acties bewaken.

Redenen om te kiezen: afgebakende start, tastbaar voorbeeld, aansluiting op bestaand werk, bronvermelding waar nodig, meetbaar resultaat, gecontroleerde oplevering en actief beheer.

**Niet gebruiken als hoofdboodschap:** digitale transformatie, revolutie, toekomstbestendig, AI-powered growth engine, eindeloze mogelijkheden, personeel vervangen of volledig autonoom bedrijf. Interne termen als 'saai' en 'oudbollig' komen niet in de site.

Iedere pagina beantwoordt: welk werk, voor wie, wat verandert, wat blijft bij het team, hoe starten we en wat is de volgende stap?

---

## 3. Wat we verkopen — drie pakketten plus Maatwerk

Prijzen staan in `src/content/pricing.ts` (vanaf, excl. btw). Wijzig je een prijs, wijzig hem daar én hier; de check controleert dat. Pakketnamen Start · Compleet · Opschalen · Maatwerk (besluit Bart 2026-10-12); de interne id's (`voorbereiden`, `werkstroom`, `opschalen`, `custom`) blijven gelijk voor bestaande `?package=`-links en worden nergens getoond.

- **Start — €2.950 + €595** per maand — relevante informatie en conceptacties klaarzetten voor je team
- **Compleet — €4.950 + €1.250** per maand — aanbevolen start; één proces van intake tot afgesproken opvolging
- **Opschalen — €7.950 + €1.950** per maand — een bewezen oplossing uitbreiden
- **Maatwerk — €12.500 + €2.500** per maand — meerdere processen of bijzondere koppelingen

Funnel: gratis adviesgesprek (20 min) → gelabeld voorbeeld → analyse €750 (verrekenbaar binnen 60 dagen) → vaste scope en prijs → inrichting → acceptatie → maanddienst → uitbreiding.

Op de site: "We leggen vooraf vast wat wordt opgeleverd en wanneer de maanddienst start." Geen garantie of "geld terug" tot de contracttekst er is.

Vier procesfamilies: aanvragen en dossiers · communicatie en opvolging · data en inzicht · commerciële voorbereiding.

---

## 4. Wie we echt zijn (capabilities)

Dit is wat we aantoonbaar kunnen bouwen vandaag:

- **Dashboards die meerdere bronnen samenbrengen** — ERP + webshop + Excel + CRM + finance → live zicht. Universele MKB-pijnoplosser.
- **Applicaties:** chatbots, prospecting-tools, scrapers, AI-assistenten, sales intelligence, tracking-systemen
- **Voice agents** (zeldzame kunde in NL — differentiator)
- **Volledige interne platformen:** custom CRM, ATS (recruitment management), B2B-klantportalen
- **Data-analyse** — waaronder energieverbruik (CSRD/scope-1 relevant)

---

## 5. Doelgroep

Eerste selectiehypothese: circa 10–75 medewerkers, minstens twee mensen in het betreffende kantoorproces, digitaal binnenkomende informatie en genoeg herhaling. Buyer: eigenaar/directeur, of binnendienst-, aftersales-, service- of operationeel manager met de directie voor budget.

Vier categorieën (websiteingangen): technische groothandels · importeurs en distributeurs · service en onderhoud · maatwerk en montage. Fietsen, koffieapparatuur en kozijnen zijn voorbeelden binnen categorieën, geen losse niches.

---

## 6. Tone of voice — kritische regels

### DO

- **Nederlands, zakelijk, direct.** Werkwoord vooraan. Cijfers in de eerste alinea.
- **Spreek in "wij" en "ons".** Persoonlijke namen alleen waar de regel in DON'T toestaat. We zijn Lead Velocity.
- **Tweede persoon naar lezer:** "jouw bedrijf", "jullie sales", "jullie operatie"
- **Concreet over pijn en resultaat.** *"Van Excel-chaos naar real-time zicht"* > *"Wij helpen organisaties bij hun digitale reis."*
- **Sector-jargon waar relevant** (zie per vertical: `docs/outreach/sequence-*.md`)
- **Benchmarks alleen met bron** — en alleen waar een claim het nodig heeft, niet overal
- **Scenario-cases expliciet gelabeld** als *voorbeeld* of *scenario*

### DON'T

- ❌ **Geen persoonlijke namen in copy**, behalve op `/over` en in de Over-sectie van de homepage, waar Bart Wilbrink als oprichter wordt genoemd (handover §8, §15). Elders "wij/ons".
- ❌ **Geen "50-250 FTE"** in klant-copy — zeg "MKB"
- ❌ **Geen bronvermelding overal.** Alleen waar een claim het nodig heeft, bij voorkeur gebundeld op één plek; elders niet
- ❌ **Geen verzonnen cijfers.** Nooit "50+ klanten geholpen" of "3x meer leads" zonder staving
- ❌ **Geen "maximaal 8 klanten" / "geen retainer-valstrikken"-taal** — we willen juist retainers, niet ertegen inschoppen
- ❌ **Geen hype-taal:** "digitale transformatie", "journey", "synergie", "cutting-edge", "disruptive", "next-gen", "revolutionair", "paradigmaverschuiving", "holistisch", "roadmap"
- ❌ **Geen "Amerikaanse superlatieven"** of vertaalde US-cliche's ("unlocking value", "unleash potential")
- ❌ **Geen beloftes die we niet kunnen staven** ("40% binnen 30 dagen")
- ❌ **Geen 2-persoonsagency-framing in commerciële copy** — we zijn Lead Velocity, niet "Bart + broer"
- ❌ **Geen "werkstroom" in zichtbare copy** (besluit Bart 2026-10-12) — zeg "oplossing" of "proces". De check in `scripts/check-content.ts` bewaakt dit.

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
- **Supabase** voor formulier-aanvragen + Edge Functions
- **Resend** via Supabase Edge Functions (`werkstroomcheck`, `email-notify`) → `info@leadvelocity.nl`
- **Fonts:** Newsreader (koppen, 400/500) + Hanken Grotesk (tekst) + JetBrains Mono (labels)
- **Hosting:** Lovable (via GitHub → Lovable auto-deploy bij push naar `main`)

### Routes (fase 1)

`/` · `/voor-wie` · `/groothandels` · `/importeurs-distributeurs` · `/service-onderhoud` · `/maatwerk-montage` · `/oplossingen` (+ 4 detailpagina's) · `/werkwijze` · `/prijzen` · `/voorbeelden` · `/over` · `/adviesgesprek` · `/bedankt` (noindex) · `/privacy` · `/campagnes/*` (4, noindex) · `/inzichten` (footer-only). Oude routes: `src/content/redirects.ts`.

### Structuur

- `src/content/*` — alle copy, prijzen, demo's, campagnes (getypeerd)
- `src/components/site/*` — SiteHeader, SiteFooter, DemoStepper, PricingCards, CheckForm, …
- `src/pages/site/*` — paginasjablonen (CategoryPage, ProcessPage, CampaignPage, …)
- `supabase/functions/werkstroomcheck` — aanvraag opslaan + mail via Resend

### Formulier-integratie

Het aanvraagformulier (`/adviesgesprek`, `src/components/site/CheckForm.tsx`) post naar de Edge Function `supabase/functions/werkstroomcheck`. Die valideert, slaat de aanvraag op in tabel `werkstroomcheck_requests` (migratie `supabase/migrations/20261009120000_werkstroomcheck_requests.sql`, met defaults voor eigenaar en volgende actie) en mailt via Resend naar `info@leadvelocity.nl`. **Functie en migratie moeten nog gedeployed worden** (`supabase db push`, `supabase functions deploy werkstroomcheck`) — alleen met akkoord van Bart; zie `docs/superpowers/2026-10-09-livegang.md`.

`supabase/functions/email-notify/` bedient alleen nog de behouden formulieren buiten de check: whitepaper-, promptpack-, content-upgrade- en nieuwsbriefaanvragen.

**Vereisten:**
- `RESEND_API_KEY` environment-secret in Supabase
- Domein `leadvelocity.nl` geverifieerd in Resend (SPF/DKIM)

Als een formulier niet werkt → check eerst de deploy en deze twee.

### Do's & Don'ts bij code

- **Copy en prijzen in `src/content/*`.** Componenten en paginasjablonen (`src/components/site/*`, `src/pages/site/*`) lezen daaruit; geen euro-literals of losse copy in de sjablonen.
- **Gebruik `useReveal`-hook** voor scroll-animaties, niet losse IntersectionObserver-code.
- **Nieuwe pages via `/` in `App.tsx`** toevoegen, niet via dynamic imports tenzij bundle-size issue is.
- **Geen shadcn/ui-componenten customen direct.** Liever `className=` toevoegen of wrapper-component maken.
- **Font weight nooit 800** voor headlines — gebruikt we 600/700 (bij 800 wordt de kop te zwaar).

---

## 8. Belangrijke documenten in de repo

| Pad | Wat |
|---|---|
| [`docs/strategy/2026-10-09-website-gtm-handover.md`](./docs/strategy/2026-10-09-website-gtm-handover.md) | **Leidend:** website- en go-to-market-handover (positionering, copy, prijzen, routes) |
| [`docs/strategy/2026-10-11-messaging-strategie.md`](./docs/strategy/2026-10-11-messaging-strategie.md) | Messagingstrategie: leidend voor copy en hero |
| [`docs/strategy/2026-04-20-leadvelocity-masterplan.md`](./docs/strategy/2026-04-20-leadvelocity-masterplan.md) | Strategisch masterplan v1 — POV, doelgroep, aanbod, 3-jaars roadmap, pad C |
| [`docs/strategy/2026-10-08-positionering-v2.md`](./docs/strategy/2026-10-08-positionering-v2.md) | Addendum positionering v2 (2026-10-08) — vervangen door de handover van 2026-10-09 |
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

## 9. Beslissingen al genomen

- **De handover van 2026-10-09 is leidend** voor positionering, copy, prijzen en routes.
- **Vier categorieën, één pakketstructuur, één proces per campagne.**
- **Gratis adviesgesprek is de enige ingang** (besluit Bart 2026-10-11: de handover-term "werkstroomcheck" wordt nergens meer in copy gebruikt; knoplabels uit `ctaLabels` in `src/content/site.ts`). Oude URL's `/werkstroomcheck` en de AI-kansenscan verwijzen door, met behoud van querystring.
- **Geen garantie op de site** tot de contracttekst er is.
- **Geen verzonnen bewijs:** demo's zijn gelabeld "Illustratieve demo"; cases en logo's alleen met goedgekeurde gegevens.
- **Huisstijl (2026-10-12, Orrin-look):** Newsreader-serif voor koppen (400/500), Hanken Grotesk voor tekst, gebroken wit `lv-paper`, kaarten `lv-card`, zwarte knoppen `rounded-[10px]`, long-exposure-beeldvlakken via `ExposureArt` (tinten per categorie via `CATEGORY_TONE`), lime alleen als klein accent.
- Geen nep-bewijs (logo's, sterren, cijfers, cases) — de spec van 2026-10-12.
- **Path C** — hybride 12-maanden lean, beslisdatum juni 2027.

---

## 10. Open werkpunten

Zie `docs/superpowers/2026-10-09-livegang.md` voor livegang-afhankelijkheden (prijsakkoord, privacytekst, functie-deploy, contactgegevens, foto, agenda, 301's, analytics). Fase 2: `/campagnes/commerciele-voorbereiding`, `/resultaten/*` (alleen echt bewijs), claim-audit van `/inzichten`.

---

## 11. Commerciële workflow-context

### Hoe een klant typisch bij ons komt
1. Outreach of website → campagne- of categoriepagina → gelabelde demo
2. Gratis adviesgesprek (20 min) → analyse €750 (verrekenbaar binnen 60 dagen)
3. Vaste scope en prijs → inrichting → acceptatie → maanddienst → uitbreiding

### Contact-routing
- Formulieren landen in **info@leadvelocity.nl** via Supabase/Resend
- Telefoon: **+31 6 25 47 15 28** (Bart, directe lijn)
- LinkedIn company: `linkedin.com/company/leadvelocity-2/`

### Wat NIET doen in klantgesprek
- Geen maatwerk-scope committen zonder betaalde analyse (€750)
- Werk buiten de standaard-scope van een pakket niet ter plekke prijzen — vooraf apart offreren
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
- **Geen persoonlijke namen in klant-copy** buiten `/over` en de Over-sectie van de homepage (zie §6)
- **Bij twijfel over positionering of prijzen**: check de handover [`docs/strategy/2026-10-09-website-gtm-handover.md`](./docs/strategy/2026-10-09-website-gtm-handover.md) en [`src/content/pricing.ts`](./src/content/pricing.ts); het masterplan alleen nog voor Path C
- **Bij twijfel over use-cases/cijfers**: check research-docs (`.planning/research/*.md`)
- **Bij twijfel over outreach-wording**: check sequence-docs (`docs/outreach/sequence-*.md`)
- **Commits zijn logisch gegroepeerd** (één feature/sectie per commit), conventional-commits niet verplicht
- **Geen code-wijzigingen zonder build-check** (`npm run build`) voor commit

---

*Einde project-context. Laatst bijgewerkt: 2026-10-09. Update dit document wanneer positionering, aanbod of werkstijl significant verandert.*
