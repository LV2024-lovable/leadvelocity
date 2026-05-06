# Lead OS — Design (v1)

**Datum:** 2026-05-06
**Project:** Lead OS — sector-native, AI-driven sales workspace voor Leadvelocity
**Status:** Design — wacht op user-review
**Repo:** nieuwe app op `crm.leadvelocity.nl` (apart van leadvelocity-marketing-site)

---

## 1. Doel

Een **AI-native sector-specifieke sales-workspace** die HubSpot/Pipedrive fundamenteel niet kan zijn:

- **AI-native (A):** Claude/GPT kan via API direct lezen+schrijven. Enrichment, opener-generatie, reply-classificatie, follow-up-suggesties zonder mens-in-de-lus voor data-werk. Claude Dispatch is een first-class user, geen plugin.
- **Sector-specifiek datamodel (B):** velden als `sub_niche`, `icp_fit`, `signal_type`, `audit_status`, `commitment_ladder_stage`, `recommended_use_case` zijn first-class kolommen — geen "custom field"-workarounds.

Vervangt op termijn: handmatige CSV-werk, Notion-tracking, ad-hoc sheets, plus delen van Smartlead-rapportage.

## 2. Scope-decompositie — 5 fases

Project is te groot voor één sprint. Elke fase is **stand-alone bruikbaar** en gedecideerd voordat de volgende start. Spec hieronder dekt **fase 0 + 1** in detail; fase 2-5 zijn outline.

| Fase | Inhoud | Schatting | Levert op |
|---|---|---|---|
| **0** | Foundation: repo, deploy, Supabase schema, auth | 4-5 dagen | Lege app op crm.leadvelocity.nl met login |
| **1** | Lead Workspace: import + enrich + list/detail/edit + status-tags | 5-7 dagen | Bruikbare CRM voor 1 persoon, vervangt Excel |
| **2** | Pipeline + Deals: Kanban + audit/pilot-records | 5-7 dagen | Visuele sales-overview |
| **3** | Smartlead-integratie: push/pull sent/opened/replied | 3-5 dagen | Outbound-funnel-tracking |
| **4** | AI follow-ups + activity-feed: reply-classificatie + suggesties | 4-6 dagen | "AI-native" wordt voelbaar |
| **5** | Analytics: funnel-dashboard, signal-effectiveness, time-to-close | 3-4 dagen | Cijfers voor optimalisatie |

Totaal: **24-34 dagen** ononderbroken werk, ~4-6 weken kalendertijd. Beslissing per fase; je kan op elk moment stoppen of pivoteren.

## 3. Tech-stack (gekozen)

| Laag | Keuze | Waarom |
|---|---|---|
| Frontend | **Vite 5 + React 18 + TS** | Zelfde als leadvelocity.nl; zero learning curve |
| UI components | shadcn/ui + Tailwind | Hergebruiken uit bestaande site |
| Routing | React Router v6 | Consistent met bestaande site |
| Auth | Supabase Auth (magic-link) | Whitelist van 2 mails; uitbreidbaar later |
| Database | **Shared Supabase** (`gkjgrmnvfmlhinxordtz`) | Eén project; aparte schema `lead_os` |
| API | Supabase Edge Functions (Deno) | Voor AI-calls, Smartlead-integratie, webhooks |
| Background jobs | pg_cron + Edge Functions | Reply-classificatie, periodieke sync |
| Hosting | Lovable (auto-deploy via GitHub) | Zelfde als hoofdsite |
| DNS | `crm.leadvelocity.nl` | CNAME → Lovable |
| Tabel-UI | TanStack Table v8 | Sortering, filtering, pagination |
| Forms | React Hook Form + Zod | Standaard in React-ecosystem |
| State (server) | TanStack Query v5 | Caching + optimistic updates |

## 4. Repo & deployment

### 4.1 Repo-keuze

**Aanbeveling: nieuwe repo `lead-os` (separate van leadvelocity-marketing-site).**

Reden:
- Verschillende deploy-schema's (marketing-site = SEO/static, CRM = auth-gated app)
- Verschillende update-cadansen
- Voorkomt dat marketing-site-deploys CRM-build breken
- Cleaner voor toekomstige overdracht/multi-tenant

### 4.2 Subdomein

`crm.leadvelocity.nl` — CNAME naar Lovable. SSL automatisch via Lovable.

### 4.3 Bestaande Supabase project hergebruiken

Project `gkjgrmnvfmlhinxordtz` bevat al `email-notify` + `auto-respond-asset` Edge Functions voor de marketing-site. We voegen toe:
- **Schema `lead_os`** (alle CRM-tabellen) — gescheiden van `public` (marketing-site forms)
- **Edge Functions** prefix `lead-os-*` (`lead-os-enrich`, `lead-os-smartlead-sync`, etc.)
- **Storage bucket** `lead-os-attachments` voor audit-rapporten en pilot-specs (private)

## 5. Authentication & access (fase 0)

### 5.1 Login-flow

- Supabase Auth, **magic-link only** (geen wachtwoorden)
- Whitelist enforced via RLS-policies + edge function check
- Session 30 dagen
- Logout-button beschikbaar

### 5.2 Whitelist

Hardcoded in Edge Function + RLS:
```
ALLOWED_EMAILS = ['bart@leadvelocity.nl', 'broer@leadvelocity.nl']
```

(Echte mail van de broer: invullen voor go-live.)

### 5.3 RLS-policies (Postgres-niveau)

Alle `lead_os.*`-tabellen krijgen:
```sql
CREATE POLICY "lead_os_authed_users" ON lead_os.{table}
  FOR ALL TO authenticated
  USING (auth.email() = ANY (current_setting('lead_os.allowed_emails')::text[]))
  WITH CHECK (auth.email() = ANY (current_setting('lead_os.allowed_emails')::text[]));
```

Bonus: ook `service_role`-key heeft toegang voor Edge Functions / Claude Dispatch API-calls.

### 5.4 Multi-user roadmap

- v1 (fase 0): 2-user whitelist
- v2 (later): `lead_os.users` tabel + `role` (admin/member/viewer)
- v3 (toekomst): teams, multi-org

## 6. Datamodel (fase 0 + 1)

### 6.1 Core entities

```
companies (1) ──< contacts (n) ──< activities (n)
                       │
                       └──< deals (n) ──< stage_history (n)
```

### 6.2 Tabellen — fase 0+1

#### `lead_os.companies`
```sql
id                uuid PRIMARY KEY DEFAULT gen_random_uuid()
created_at        timestamptz NOT NULL DEFAULT now()
updated_at        timestamptz NOT NULL DEFAULT now()

-- Identity
name              text NOT NULL
website           text
linkedin_url      text
city              text
country           text DEFAULT 'NL'
employees_min     int
employees_max     int

-- Sector classification (sector-specifiek datamodel)
industry_apollo   text                 -- raw uit Apollo (wholesale / mech-eng / etc.)
sub_niche         text                 -- bv. 'staalhandel', 'elektrotechniek-groothandel'
sector            text                 -- 'groothandel' | 'maakindustrie' | 'transport' | 'anders'
icp_fit           int CHECK (icp_fit BETWEEN 1 AND 5)
fit_rationale     text

-- Enrichment
last_enriched_at  timestamptz
scrape_status     text                 -- 'ok' | 'website_unreachable' | 'no_useful_content' | 'pending'
scraped_text      text                 -- ruwe site-content (cap 8k chars)

-- Signals (huidig actief signaal — historie in activities)
signal_type       text                 -- 'growth' | 'tech_stack' | 'family_business' | etc.
signal_detail     text
signal_source_url text
signal_detected_at timestamptz

-- Use-case recommendation (sector-specifiek)
recommended_use_case_key   text
recommended_use_case_title text
recommended_use_case_desc  text

-- Status overzicht
contact_status    text DEFAULT 'cold'  -- 'cold' | 'attempted' | 'engaged' | 'qualified' | 'won' | 'lost' | 'do_not_contact'
notes             text                 -- vrije markdown-notities

CREATE INDEX ON lead_os.companies (sector, icp_fit DESC);
CREATE INDEX ON lead_os.companies (contact_status);
CREATE UNIQUE INDEX ON lead_os.companies (lower(website));
```

#### `lead_os.contacts`
```sql
id                uuid PRIMARY KEY DEFAULT gen_random_uuid()
created_at        timestamptz NOT NULL DEFAULT now()
updated_at        timestamptz NOT NULL DEFAULT now()

company_id        uuid NOT NULL REFERENCES lead_os.companies(id) ON DELETE CASCADE

-- Identity
first_name        text NOT NULL
last_name         text
email             citext UNIQUE NOT NULL
linkedin_url      text
title             text
title_normalized  text                 -- 'COO' | 'CCO' | 'CEO' | 'OWNER' | etc.
phone             text

-- Persona-classificatie
persona           text                 -- 'COO' | 'CRO' | 'DGA' | 'Other'
seniority         text                 -- 'C-level' | 'VP' | 'Director' | 'Owner' | 'Other'

-- Status
contact_status    text DEFAULT 'cold'  -- per-contact, kan afwijken van company-level
do_not_contact    boolean DEFAULT false
do_not_contact_reason text

-- AI-generated
opener_a          text
opener_b          text
opener_a_subject  text
opener_b_subject  text
opener_generated_at timestamptz

-- Outreach status
last_contacted_at timestamptz
last_replied_at   timestamptz
reply_sentiment   text                 -- 'positive' | 'neutral' | 'negative' | 'objection' | null

-- Source tracking
source            text                 -- 'apollo_csv' | 'manual' | 'inbound' | 'referral' | 'linkedin'
source_batch_id   text                 -- voor bulk-imports

CREATE INDEX ON lead_os.contacts (company_id);
CREATE INDEX ON lead_os.contacts (contact_status);
CREATE INDEX ON lead_os.contacts (persona);
```

#### `lead_os.activities` (alle gebeurtenissen — activity feed bron)
```sql
id                uuid PRIMARY KEY DEFAULT gen_random_uuid()
created_at        timestamptz NOT NULL DEFAULT now()

company_id        uuid REFERENCES lead_os.companies(id) ON DELETE CASCADE
contact_id        uuid REFERENCES lead_os.contacts(id) ON DELETE CASCADE

actor             text NOT NULL        -- 'user:bart' | 'user:broer' | 'agent:claude' | 'system:smartlead'
type              text NOT NULL        -- 'note' | 'email_sent' | 'email_opened' | 'email_replied' | 'meeting_booked' | 'enriched' | 'opener_generated' | 'status_changed'
summary           text                 -- korte one-liner
detail            jsonb                -- type-specifieke payload

CREATE INDEX ON lead_os.activities (company_id, created_at DESC);
CREATE INDEX ON lead_os.activities (contact_id, created_at DESC);
CREATE INDEX ON lead_os.activities (type, created_at DESC);
```

#### `lead_os.deals` (komt in fase 2 — schema hier alvast geprepped)
```sql
id                uuid PRIMARY KEY DEFAULT gen_random_uuid()
created_at        timestamptz NOT NULL DEFAULT now()
updated_at        timestamptz NOT NULL DEFAULT now()

company_id        uuid NOT NULL REFERENCES lead_os.companies(id) ON DELETE CASCADE

-- Stage in de Commitment Ladder
stage             text NOT NULL DEFAULT 'cold'
                       -- 'cold' | 'kennismaking' | 'audit_proposed' | 'audit_paid' | 'audit_delivered'
                       -- | 'pilot_proposed' | 'pilot_active' | 'pilot_delivered'
                       -- | 'partnership_active' | 'won' | 'lost' | 'on_hold'

-- Audit-specific
audit_amount         numeric DEFAULT 2500
audit_invoice_id     text
audit_paid_at        timestamptz
audit_kickoff_at     timestamptz
audit_delivered_at   timestamptz
audit_report_url     text                 -- Storage path

-- Pilot-specific
pilot_amount         numeric
pilot_use_case       text
pilot_kickoff_at     timestamptz
pilot_delivered_at   timestamptz
pilot_kpi            text

-- Partnership-specific
partnership_mrr      numeric
partnership_started_at timestamptz

-- Outcome
won_at               timestamptz
lost_at              timestamptz
lost_reason          text

CREATE INDEX ON lead_os.deals (company_id);
CREATE INDEX ON lead_os.deals (stage);
```

### 6.3 Auxiliary tabellen

#### `lead_os.email_templates` (fase 3)
Template-store voor sequences. Voor fase 0/1 niet nodig.

#### `lead_os.import_batches` (fase 1)
```sql
id                uuid PRIMARY KEY DEFAULT gen_random_uuid()
created_at        timestamptz NOT NULL DEFAULT now()
created_by        text NOT NULL        -- 'user:bart' | 'agent:claude'

source            text NOT NULL        -- 'apollo_csv' | 'sales_nav_csv' | 'manual' | 'api'
filename          text
total_rows        int
imported          int DEFAULT 0
skipped           int DEFAULT 0
errors            int DEFAULT 0
status            text                 -- 'pending' | 'enriching' | 'done' | 'failed'

CREATE INDEX ON lead_os.import_batches (created_at DESC);
```

## 7. Fase 1 — Lead Workspace (de UI)

### 7.1 Routes (in nieuwe app)

| Path | Component | Wat |
|---|---|---|
| `/login` | LoginPage | Magic-link request |
| `/` | DashboardPage | Stats + recent activity |
| `/leads` | LeadsListPage | Tabel, filter, sort, search |
| `/leads/:id` | LeadDetailPage | Full company+contact view, openers, mailto, status edit |
| `/import` | ImportPage | CSV upload + enrichment trigger |
| `/contacts/:id` | ContactDetailPage | Contact-only view (alternatief instap) |
| `/settings` | SettingsPage | API-keys, whitelist, integrations |

### 7.2 LeadsListPage — kerncomponent

**Tabel-kolommen** (TanStack Table):
- ☐ checkbox
- Company name + sub-niche (clickable → detail)
- Contact (first_name + title)
- Sector + ICP-fit (badges)
- Signal (badge + tooltip)
- Status (dropdown inline-editable)
- Last contacted
- Actions: open detail / copy email / generate opener / send mail

**Filters:**
- Sector (multi)
- ICP-fit-range (1-5)
- Signal-type (multi, incl. 'has any signal')
- Status (multi)
- Last contacted (today/week/month/never)
- Sub-niche text-search
- Persona

**Bulk actions:**
- Mark as contacted
- Add to Smartlead-sequence (fase 3)
- Export selection as CSV
- Bulk-delete

### 7.3 LeadDetailPage

Layout: 2-koloms (links 2/3, rechts 1/3)

**Links (main content):**
- Header: company name + website-link + sector-badge + ICP-fit-badge
- Tabs: Overview / Activity / Notes / Deals
- **Overview tab:**
  - Company-info (city, employees, industry)
  - Sub-niche + fit-rationale
  - Signal: type + detail + source-URL (clickable)
  - Recommended use-case (card)
  - All contacts at this company (mini-table)
- **Activity tab:**
  - Chronological feed (mails sent, opened, replied, notes, status-changes, AI-actions)
- **Notes tab:**
  - Markdown-editor, autosave
- **Deals tab** (fase 2):
  - Active deal stage + history

**Rechts (actions panel):**
- Primary contact: name + email + title + LinkedIn
- Status-dropdown
- "Genereer opener"-button (calls AI Edge Function)
- Opener A + B (tabs), with **Send via mail-client** (mailto) + **Copy to clipboard**
- "Send via Smartlead"-button (fase 3)
- Last enriched timestamp + "Re-enrich"-button

### 7.4 ImportPage

- Drag-drop CSV (or paste)
- Auto-detect: Apollo / Sales-Nav / Generic-format (column mapping)
- Preview: show first 5 rows with detected columns
- "Import + enrich"-button → triggers background job
- Progress: live-update via Supabase Realtime
- Resume support (skip already-imported emails)

Hergebruikt logic uit bestaande `scripts/enrich-prospects.ts`. Code wordt port naar Edge Function `lead-os-enrich-batch`.

### 7.5 DashboardPage (minimaal in fase 1, uitgebreider in fase 5)

- Stats: total leads, by sector, by status
- Recent activity (latest 10)
- Quick actions: "Import batch" / "Add contact" / "Settings"

## 8. AI-integratie (fase 1+)

### 8.1 Edge Functions (server-side, gebruikt door UI én Claude Dispatch)

| Function | Wat | Wanneer |
|---|---|---|
| `lead-os-enrich-company` | Scrape + classify + use-case-suggest | On-create / re-enrich |
| `lead-os-generate-openers` | 2 openers per contact | On-demand of na enrich |
| `lead-os-classify-reply` | Reply → sentiment + intent (fase 4) | Webhook van Smartlead |
| `lead-os-suggest-followup` | Volgende stap suggereren (fase 4) | On-demand |
| `lead-os-enrich-batch` | Bulk enrich uit import (fase 1) | Background job |

Allemaal port van bestaande `scripts/lib/*.ts` met aanpassing naar Deno + Supabase-context.

### 8.2 API-toegang voor Claude Dispatch

Claude Dispatch (of welke andere agent dan ook) kan via Supabase REST API direct schrijven:

```http
POST https://gkjgrmnvfmlhinxordtz.supabase.co/rest/v1/companies
Authorization: Bearer <service_role_key>
Content-Type: application/json

{ "name": "Bedrijf X", "website": "https://...", "sector": "groothandel" }
```

Dispatch-flow voorbeeld:
1. Dispatch krijgt bedrijfsnaam → POST naar `companies`
2. Dispatch triggert enrichment → POST `/functions/v1/lead-os-enrich-company`
3. Dispatch ontvangt results, beslist over volgende stap
4. Bart logt in en ziet de nieuwe lead in `/leads`

### 8.3 Sector-specifieke prompts

Bestaand: `scripts/lib/prompts.ts` (CLASSIFY + OPENER prompts) → port naar `supabase/functions/_shared/prompts.ts`. Beide CRM én bestaande enrichment-script gebruiken dezelfde shared module zodat tone consistent blijft.

## 9. Fase 2-5 outline (voor latere specs)

### Fase 2 — Pipeline + Deals
- Kanban-board op `/pipeline`
- Drag-drop tussen stages (cold → kennismaking → audit_proposed → audit_paid → audit_delivered → pilot → partnership)
- Deal-form met audit-fields, pilot-fields, partnership-fields
- File-upload voor audit-rapport (Storage bucket)
- Deal-stage-history-tabel

### Fase 3 — Smartlead-integratie
- Smartlead API-key in settings
- Push contact + opener naar sequence
- Webhook receiver voor sent/opened/replied events → activities-tabel
- Reply-thread-view in LeadDetail

### Fase 4 — AI follow-ups + activity-feed
- Reply-classification (sentiment + intent) na webhook-receipt
- "Suggest follow-up"-button per contact (Claude-call op basis van reply)
- Smart-reminders ("Geen reactie na 5 dagen — stuur volgende?")
- Activity-feed verbetering (groeperen, filteren)

### Fase 5 — Analytics
- `/analytics`-page met:
  - Funnel-conversion per stage
  - Signal-effectiveness (welk signal-type → hoogste reply-rate?)
  - Time-to-close per sector
  - Deal-size verdeling
  - MRR-tracking voor partnerships

## 10. Beveiliging & privacy

- **Geen leads-data in git** — alle CSVs in Supabase Storage of in DB, niet in repo
- **`.env.local`** voor lokale dev, **Supabase Secrets** voor prod
- **Service-role-key alleen op server** (Edge Functions), nooit in frontend
- **RLS aan op alle `lead_os.*`-tabellen** — defense-in-depth, ook al is whitelist-mechanisme actief
- **NDA-status** als column op companies (voor wanneer audit-rapporten gevoelig worden)
- **GDPR right-to-be-forgotten**: `DELETE FROM lead_os.contacts WHERE email = X` cascade-deletes activities; companies blijven (geen PII).

## 11. Buiten scope (expliciet)

- ❌ Multi-tenant (we zijn 1 bedrijf, niet een SaaS-product)
- ❌ Mobile-first (desktop-first; mobiel "werkt" maar niet geoptimaliseerd)
- ❌ Calendar-integratie (use Cal.com link in opener-replies)
- ❌ Voice/video-recording
- ❌ AI-call-summary van klantgesprekken (later misschien)
- ❌ Offerte-/contract-generatie (separate tool)
- ❌ Invoicing (Moneybird o.i.d.)

## 12. Open vragen — niet blokkerend

1. Domein-setup voor `crm.leadvelocity.nl` — wie heeft toegang tot DNS-records?
2. Mail-adres broer — voor whitelist
3. Smartlead-account — bestaat al, of nieuw aan te maken? (fase 3-vraag, niet nu)
4. Claude Dispatch — heb je al toegang? (dispatch-integratie kan in fase 4)

## 13. Testplan per fase

### Fase 0
- ✅ Magic-link login werkt voor 2 whitelisted mails
- ✅ Niet-whitelisted mail wordt geblokkeerd
- ✅ Lege app rendert op crm.leadvelocity.nl met SSL
- ✅ Supabase-schema `lead_os` aangemaakt met RLS

### Fase 1
- ✅ Apollo-CSV upload → 50 leads geïmporteerd
- ✅ Enrichment-job draait, vult sub_niche/icp_fit/signal/openers
- ✅ LeadsList toont 50 rows, filter op sector/fit/status werkt
- ✅ LeadDetail toont alles, mailto-knop opent mail-client met opener
- ✅ Status-update wordt gepersisteerd, verschijnt in activity-feed

## 14. Rollout per fase

Per fase:
1. Implementatie in feature-branch
2. Lokaal testen
3. Build-check
4. Push → Lovable deploy
5. Live-check op crm.leadvelocity.nl
6. Gebruiker test 1-2 dagen
7. Bugs fixen
8. Volgende fase pas starten als huidige stabiel is

## 15. Schatting per fase (uren-zicht)

| Fase | Dev | Test/fix | Totaal |
|---|---|---|---|
| 0 | 25u | 8u | **33u** |
| 1 | 35u | 10u | **45u** |
| 2 | 30u | 10u | **40u** |
| 3 | 20u | 8u | **28u** |
| 4 | 25u | 10u | **35u** |
| 5 | 18u | 6u | **24u** |
| **Total** | 153u | 52u | **205u** |

Bij 5-7u/dag effectief: **30-40 werkdagen**.

---

*Versie 1.0 — 2026-05-06. Onderhouden in `docs/superpowers/specs/2026-05-06-lead-os-design.md`.*
