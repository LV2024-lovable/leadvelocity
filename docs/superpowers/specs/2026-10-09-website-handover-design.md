# Website volgens handover — Design Spec

**Datum:** 2026-10-09
**Status:** Draft — wacht op review
**Bron (leidend):** [`docs/strategy/2026-10-09-website-gtm-handover.md`](../../strategy/2026-10-09-website-gtm-handover.md) — hierna "handover §N"
**Vervangt:** `2026-10-08-positionering-aanbod-v2-design.md` (deelproject 1) en de ontwerpbesluiten van het `/preview`-prototype waar ze botsen met de handover.
**Scope:** fase 1 uit handover §7 — marketingwebsite met centrale content-/prijsconfiguratie, gedeelde componenten, echte aanvraagflow, SEO-basis en redirects.
**Out of scope:** fase-2-routes (`/campagnes/commerciele-voorbereiding`, `/resultaten/*`), klantplatform of agentbackend, analytics-tool kiezen/installeren, outreach.

---

## 1. Besluiten (vastgesteld met Bart, 2026-10-09)

1. **De handover is leidend.** Copy, CTA-labels, routes, prijzen en grenzen worden letterlijk uit de handover overgenomen. We bedenken geen eigen proposities, garanties of sectorclaims (handover §23).
2. **Deelproject 1 vervalt.** `src/data/aanbod.ts` en `scripts/check-aanbod.ts` worden vervangen door de configuratie in §3 en een nieuwe check. PR #1 wordt gesloten. CLAUDE.md wordt herschreven naar de handover, inclusief: Bart mag genoemd worden op `/over` en in de Over-sectie van de homepage (handover §8, §15); elders blijft het "wij/ons".
3. **Huisstijl:** typografie en kleurschema uit het prototype blijven (gebroken wit "papier", inkt, lime-accent; Schibsted Grotesk / Hanken Grotesk / JetBrains Mono). Vervalt: gloed-blobs, de bewegende netwerkanimatie (`IntegrationHub`, `AnimatedBeam`), `BorderBeam`. Lime alleen als vlak met inkt-tekst erop of als decoratief detail, nooit als tekstkleur op licht (contrast, handover §17).
4. **Eén ingang:** `/ai-kansenscan` (+ `/resultaat`) verwijst door naar `/werkstroomcheck`. De `opportunity-scan` Edge Function blijft gedeployed maar ongebruikt.
5. **Oude sectorpagina's:** `/groothandel` → `/groothandels`; `/maakindustrie` → `/maatwerk-montage`; `/transport` → `/service-onderhoud`.
6. **Geen garantie op de site.** De zin uit handover §6 wordt gebruikt: "We leggen vooraf vast wat wordt opgeleverd en wanneer de maanddienst start." Planning: "doorgaans 4–6 weken" alleen waar de handover het noemt.

---

## 2. Architectuur

```
src/content/           ← alle copy en data uit de handover, getypeerd
  pricing.ts           pakketten, beheer-uren, analyse €750, kostenmicrocopy
  categories.ts        4 categorieën (§9): slug, seo, hero, taken, grenzen, fit, meet, voorbeelden, procesId, demoId
  processes.ts         4 procesfamilies (§10)
  demos.ts             4 demo's (§14), 3 stappen elk, evidence: "illustrative"
  campaigns.ts         4 campagnes (§11), noindex: true
  faq.ts               FAQ (§16), per pagina selecteerbaar
  site.ts              navigatie, footer, contactgegevens, CTA-contract (§12)
  redirects.ts         oude route → nieuwe route
src/components/site/   ← gedeelde componenten (§17)
  SiteHeader, SiteFooter, CampaignHeader, Seo, Section, SectionHead, Reveal,
  CategoryCard, ProcessCard, DemoStepper, HumanControl, Steps, PricingCards,
  ScopeTable, Faq, CheckForm, CtaLink
src/pages/site/        ← paginacomponenten; sjablonen lezen uit src/content
  Home, VoorWie, CategoryPage, Oplossingen, ProcessPage, Werkwijze, Prijzen,
  Voorbeelden, Over, Werkstroomcheck, Bedankt, Privacy, CampaignPage
src/lib/
  cta.ts               bouwt check-URL's met category/process/package/demo/campaign/source
  track.ts             track(event, params) — no-op tot er een analytics-tool + toestemming is
  utm.ts               leest en bewaart UTM's in sessionStorage voor het formulier
supabase/functions/werkstroomcheck/   ← nieuwe Edge Function (§5)
supabase/migrations/<ts>_werkstroomcheck_requests.sql
scripts/check-content.ts              ← vervangt check-aanbod.ts (§7)
```

**Principe:** pagina's bevatten geen losse prijzen of sectorcopy. Alles komt uit `src/content`. Eén sjabloon per paginatype: `CategoryPage` voor 4 categorieën, `ProcessPage` voor 4 oplossingen, `CampaignPage` voor 4 campagnes (handover §7: "geen 20 los onderhouden layouts").

**Head/SEO:** nieuwe dependency `react-helmet-async`. `<Seo>` zet per pagina title, meta-description, canonical en optioneel `noindex`. Campagnes en `/bedankt` krijgen `noindex` met self-canonical (handover §7, §18).

**Sitemap:** `scripts/generate-sitemap.ts` schrijft `public/sitemap.xml` uit de indexeerbare routes in `src/content`. `robots.txt` krijgt een sitemap-regel.

---

## 3. Routes (fase 1)

Exact volgens handover §7: `/`, `/voor-wie`, 4 categorieën, `/oplossingen` + 4 detailpagina's, `/werkwijze`, `/prijzen`, `/voorbeelden`, `/over`, `/werkstroomcheck`, `/bedankt`, `/privacy`, 4 campagnes.

**Navigatie (§7):** Voor wie · Oplossingen · Werkwijze · Voorbeelden · Prijzen · [Plan een werkstroomcheck]. Over en contact in de footer.

**Blijven bestaan, in nieuwe header/footer, inhoud ongewijzigd:** `/inzichten` + 6 artikelen, 3 whitepapers, 3 promptpacks (footer-link "Inzichten"). Een claim-audit van deze content is een open punt voor fase 2. `/brand` blijft, met `noindex`.

**Redirects (client-side `<Navigate replace>`):**

| Oud | Nieuw |
|---|---|
| `/groothandel` | `/groothandels` |
| `/maakindustrie` | `/maatwerk-montage` |
| `/transport` | `/service-onderhoud` |
| `/over-ons` | `/over` |
| `/onze-aanpak` | `/werkwijze` |
| `/faq`, `/veelgestelde-vragen` | `/prijzen#faq` |
| `/ai-ops-audit` | `/werkwijze` |
| `/ai-kansenscan`, `/ai-kansenscan/resultaat`, `/ai-readiness-assessment`, `/ai-readiness-assessment/resultaat`, `/lp/assessment`, `/bronnen/ai-readiness-assessment` | `/werkstroomcheck` |
| `/oplossingen/workflows` | `/oplossingen/aanvragen-dossiers` |
| `/oplossingen/chatbots`, `/oplossingen/voice-agents` | `/oplossingen/communicatie-opvolging` |
| `/oplossingen/dashboards` | `/oplossingen/data-inzicht` |
| `/oplossingen/ai-agenten` | `/oplossingen` |
| `/cases` | `/voorbeelden` |
| `/bronnen`, `/bronnen/tips-en-tricks`, `/nieuwsbrief` | `/inzichten` |

Echte 301's op hostingniveau zijn een livegang-afhankelijkheid (§8): Lovable-ondersteuning moet worden nagekeken.

**Verwijderd:** de oude pagina's en componenten die alleen door weggehaalde routes worden gebruikt, waaronder `Home` (oud), `Index`, `LeadGen`, `AIAutomation`, `Gateway`, `Groothandel`, `Maakindustrie`, `Transport`, `OverOns`, `OnzeAanpak`, `Faq`, `Cases`, `Bronnen`, `Nieuwsbrief`, `TipsEnTricks`, `AiOpsAudit`, `OplossingPage`, `AiKansenscan*`, `AiReadinessAssessment*`, `LpAssessment`, `Preview`, `src/components/preview/*`, en `*New`/oude componenten zonder overgebleven gebruiker. `ExitIntentPopup` wordt verwijderd (handover §11: geen pop-ups). `src/data/oplossingen.ts`, `src/data/aanbod.ts` en `scripts/check-aanbod.ts` gaan weg. Ongebruikte UI-registry-bestanden (`animated-beam`, `border-beam`) gaan weg. `motion` blijft voor `Reveal` en `DemoStepper`.

---

## 4. Pagina-inhoud

Alle copy komt letterlijk uit de handover:

| Pagina | Handover |
|---|---|
| Homepage — alle 11 secties met H1/H2/copy/knoppen | §8 |
| Categoriepagina's — SEO-title, H1, subkop, CTA's, taken, grenzen, voorbeelden, fit, meet; sectievolgorde | §9 |
| `/oplossingen` + detail, inclusief WhatsApp-blok en salesdetail-copy | §10 |
| Campagnes — vaste sectievolgorde, H1's, knoppen, eigen header/footer | §11 |
| `/prijzen`, `/werkwijze` (6 stappen), `/over`, `/voor-wie` | §15 |
| FAQ | §16 |
| `/werkstroomcheck`, `/bedankt` | §13 |

**Copy die de handover niet levert** en die we dus zelf schrijven, binnen de handover-tone en zonder nieuwe claims:
- Meta-descriptions.
- De vergelijkingsmatrix op `/prijzen`. Die bestaat alleen uit de inhoud van §6.
- Per stap op `/werkwijze` de output, de klantinput en het beslismoment. Die volgen uit §6 en §15.
- De `/privacy`-tekst als concept. Bart moet die goedkeuren vóór livegang.

**Hero-visual:** de `DemoStepper` met de offertedemo en de tabs Input / Voorbereid / Volgende stap, gelabeld "Illustratieve demo" (§8).

**Demo's (§14):** 4 klikdemo's in `DemoStepper`, met fictieve data precies zoals in §14. Elke demo eindigt met de vaste zin en een knop "Bekijk of dit bij jullie past", met demo- en procescontext.

**Over-sectie:** typografisch tot er een echte foto is. Geen teamgrootte of aantal jaren ervaring.

**Geen:** reviews, cases, logo's, "meest gekozen" (wel "Aanbevolen start" op Werkstroom), percentages, responstijden of garanties.

---

## 5. Aanvraagflow (`/werkstroomcheck`)

**Formulier (handover §13):** de velden en verplichtingen zoals in §13. Telefoon is verplicht als `contactvoorkeur = "bel"`. Er komt een prefill uit de queryparameters `category`, `process`, `package`, `demo`, `campaign` en `source`, plus UTM's uit sessionStorage. Ook een honeypot-veld en een `request_id` (UUID, aangemaakt bij het laden van het formulier). Validatie gebeurt met zod in de browser én op de server. Een marketing-opt-in wordt niet opgenomen; die is er niet nodig.

**States:**
- **Bezig met versturen:** de knop is uitgeschakeld.
- **Succes:** pas na `200 {ok:true}` van de server, daarna navigatie naar `/bedankt` met de context.
- **Fout:** de invoer blijft staan en de foutmelding uit §13 verschijnt, met een retry-knop.

**Edge Function `werkstroomcheck`:**
1. Valideer de body met zod; bij een fout `400` met de veldfouten.
2. Bij een gevuld honeypot-veld `200 {ok:true}` zonder verdere actie (een stille drop).
3. Insert in `werkstroomcheck_requests` (`request_id` unique). Een dubbele insert geeft `200 {ok:true, duplicate:true}` zonder tweede mail.
4. Verstuur een notificatie via Resend naar `info@leadvelocity.nl` met alle velden en de broncontext. Hergebruik de Resend-aanroep uit `email-notify`.
5. Geef `200 {ok:true}` pas terug nadat stap 3 is gelukt. Mislukt alleen de mail, dan wordt de rij gemarkeerd met `notify_status = 'failed'` en geven we toch 200 terug, want de aanvraag is opgeslagen.

**Tabel `werkstroomcheck_requests`:**
- **Velden:** `id`, `request_id unique`, `created_at`, de formuliervelden, `context jsonb`, `notify_status`, en `stage text default 'lead'` (de pipeline uit §13).
- **Toegang:** RLS staat aan, zonder publieke policies; alleen de service role schrijft.

**Agenda:** er is geen agenda-URL. De knop "Kies direct een tijd" wordt alleen getoond als `site.ts` een `calendarUrl` heeft.

**Deploy:** de migratie en de functie worden alleen gedeployed met akkoord van Bart, volgens de bestaande Supabase-workflow. Tot dan wijst de UI naar de functie en is de deploy een livegang-afhankelijkheid.

---

## 6. Tracking

`track()` in `src/lib/track.ts` krijgt de eventnamen en parameters uit §18, maar verstuurt nog niets: er is geen tool en geen toestemmingsbeleid. De aanroepen komen wel alvast op de juiste plekken (CTA's, demo's, formulier), zodat het aansluiten van een tool later één bestand raakt. Er gaat geen PII naar analytics.

---

## 7. Verificatie

**`scripts/check-content.ts`** (draaien met `npx tsx`) controleert:
1. De pakketprijzen en het aantal beheeruren volgen exact §6: €2.950 / €595, €4.950 / €1.250, €7.950 / €1.950, €12.500 / €2.500, beheer 0,5 / 1 / 2 uur, analyse €750 en 60 dagen.
2. Er zijn precies 4 categorieën, 4 processen, 4 demo's en 4 campagnes. Elke `demoId` en `processId` verwijst naar een bestaand item, en elke campagne heeft `noindex: true`.
3. Alle demo's hebben `evidence: "illustrative"` en de vaste slotzin.
4. Geen enkele string in `src/content` bevat een woord van de verboden lijst. Die lijst bevat de hype-woorden uit §3, "meest gekozen", "gegarandeerd", "geld terug", "niet tevreden" en percentages (`\d+\s?%`). Het woord "garantie" zelf mag wel voorkomen, omdat de handover het in de context van claims en teamcontrole gebruikt.
5. Geen euro-bedrag in `src/pages` of `src/components/site`: prijzen komen alleen uit `pricing.ts`.
6. CLAUDE.md noemt dezelfde pakketprijzen.

**Browsercheck met de bestaande Playwright-aanpak** — screenshots en interactie op 360, 390 en 1440 px:
- Alle navigatie- en CTA-links leiden naar een bestaande route met de juiste queryparameters.
- De prefill werkt vanuit een categorie, pakket, demo en campagne.
- De formuliervalidatie werkt bij lege of onjuiste velden en bij "Bel mij" zonder telefoonnummer.
- Dubbel indienen is geblokkeerd, en een serverfout geeft de foutstatus terwijl de invoer behouden blijft.
- De succesroute wordt getest tegen de echte functie als die gedeployed is, anders tegen een lokaal gestubde fetch. Dat laatste rapporteren we expliciet als zodanig.
- Alle redirects uit §3 werken.
- `noindex` staat op de campagnes en `/bedankt`.
- Er is geen horizontale scroll op 360 px.
- De toetsenbordfocus is zichtbaar.

Daarnaast slaagt `npm run build`.

We claimen geen check die niet daadwerkelijk is gedraaid (§18).

---

## 8. Livegang-afhankelijkheden (overzicht bij oplevering)

| Item | Eigenaar | Zonder dit |
|---|---|---|
| Akkoord prijspublicatie | Bart | Niet live zetten |
| Privacytekst goedgekeurd | Bart | Niet live zetten |
| Edge Function + migratie gedeployed, `RESEND_API_KEY` aanwezig | Bart | Formulier faalt; niet live zetten |
| Bevestigde contactgegevens (info@, telefoon) | Bart | Footer zonder ontbrekende gegevens |
| Foto Bart | Bart | Typografische Over-sectie |
| Agenda-URL | Bart | Alleen aanvraagflow |
| 301-redirects bij Lovable | Bart/Claude | Client-side redirects |
| Analytics-tool + toestemming | Bart | `track()` blijft no-op |
| Contracttekst acceptatie/garantie | Bart | Geen garantie op site (al zo) |

---

## 9. Fasering van de bouw (input voor het plan)

1. **Fundament:**
   - de configuratie in `src/content` en `check-content.ts`
   - de huisstijltokens in Tailwind en de fonts in `index.html`
   - `Seo`/helmet, `SiteHeader`/`SiteFooter` en `CtaLink`/`cta.ts`
2. **Kernpagina's:** de homepage, `DemoStepper` en de 4 demo's, `CategoryPage` voor 4 categorieën, `/voor-wie`, `/prijzen`, `/werkwijze`, `/voorbeelden` en `/over`.
3. **Oplossingen en campagnes:** `/oplossingen` + `ProcessPage` voor 4 processen, en `CampaignPage` voor 4 campagnes.
4. **Aanvraagflow:**
   - `/werkstroomcheck`, `/bedankt` en `/privacy` (concept)
   - de Edge Function en migratie
   - UTM-opslag en de `track()`-aanroepen
5. **Opruimen:** de redirects, verwijderingen, inzichten in de nieuwe layout, de sitemap en de herschreven CLAUDE.md.
6. **Verificatie:** de volledige browsercheck uit §7 en het afhankelijkhedenoverzicht.

Elke fase eindigt met `npm run build` en `check-content.ts`. Fasen 2–5 bouwen voort op de componenten en configuratie uit fase 1.
