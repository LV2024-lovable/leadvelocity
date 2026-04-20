# SENDERS.md — Domein, Identity & Compliance per Vertical

**Versie:** 1.0 — 2026-04-20
**Afnemer:** Scribe-LV (vult signatures en verzend-identity), Scout-LV (routeert prospects naar juist domein)

---

## 1. Domein-strategie (3 domeinen → 3 verticals)

**Doel:** aparte sender-reputatie per vertical opbouwen zodat één vertical-campagne de andere niet besmet (bij spam-flags, bounce-rates, etc.).

```yaml
domains:
  - id: primary
    domain: leadvelocity.nl
    sender_email: bart@leadvelocity.nl
    reply_to: info@leadvelocity.nl
    purpose: "Hoofdmerk — thought leadership, inbound, brand mail"
    used_for:
      - LinkedIn outreach (persoonlijk)
      - Follow-ups op inbound leads
      - Brand-heavy campagnes
    NOT_used_for:
      - Bulk cold outreach (beschermt sender-reputatie hoofddomein)

  - id: outreach_groothandel
    domain: TODO-DOMAIN-GROOTHANDEL  # bv. leadvelocity-groothandel.nl of ai-groothandel.nl
    sender_email: TODO@domain
    reply_to: info@leadvelocity.nl
    purpose: "Cold outreach technische groothandel"
    used_for:
      - sequence-groothandel touch 1 cold email
      - follow-ups binnen die sequence
    setup_requirements:
      - SPF record bevat Google Workspace
      - DKIM geconfigureerd
      - DMARC p=quarantine (eerst monitor-only, na 2 weken quarantine)
      - Warm-up 2-4 weken met max 20 mails/dag voor bulk-cold

  - id: outreach_maakindustrie
    domain: TODO-DOMAIN-MAAKINDUSTRIE  # bv. ai-maakindustrie.nl of leadvelocity-industry.nl
    sender_email: TODO@domain
    reply_to: info@leadvelocity.nl
    purpose: "Cold outreach maakindustrie"
    used_for:
      - sequence-maakindustrie touch 1 cold email
      - follow-ups binnen die sequence

  - id: outreach_transport
    domain: TODO-DOMAIN-TRANSPORT  # bv. ai-transport.nl of logistiek-ai.nl
    sender_email: TODO@domain
    reply_to: info@leadvelocity.nl
    purpose: "Cold outreach transport & logistiek"
    used_for:
      - sequence-transport touch 1 cold email
      - follow-ups binnen die sequence
```

**ACTIE vereist van Bart:** vul de TODO-velden in met de echte Squarespace-domeinen. Deel dit document met Scribe-LV pas nadat die ingevuld zijn.

### Routing-logica voor Scribe

```yaml
# Gegeven prospect vertical, welk domein gebruiken
routing:
  groothandel: outreach_groothandel
  maakindustrie: outreach_maakindustrie
  transport: outreach_transport
  unknown: primary  # fallback — liever 1 mail dan verkeerd domein

# Uitzonderingen
override_to_primary_when:
  - prospect komt uit inbound (formulier, LinkedIn connect)
  - prospect is al eerder klant/prospect geweest (re-engagement)
  - prospect-type is "referral" (via bestaande klant)
  - touch-nummer >= 4 (switch naar primary voor break-up en personal follow-ups)
```

---

## 2. Signature-blokken per domein

### Signature `primary` (leadvelocity.nl)

```text
Groet,
Bart Wilbrink
Leadvelocity | AI Operations Partner voor het NL MKB
+31 6 25 47 15 28 | bart@leadvelocity.nl
leadvelocity.nl
```

### Signature `outreach_groothandel`

```text
Groet,
Bart Wilbrink
Leadvelocity | AI voor Nederlandse technische groothandel
+31 6 25 47 15 28 | TODO@domain
leadvelocity.nl/groothandel
```

### Signature `outreach_maakindustrie`

```text
Groet,
Bart Wilbrink
Leadvelocity | AI voor Nederlandse maakindustrie
+31 6 25 47 15 28 | TODO@domain
leadvelocity.nl/maakindustrie
```

### Signature `outreach_transport`

```text
Groet,
Bart Wilbrink
Leadvelocity | AI voor Nederlandse transport & logistiek
+31 6 25 47 15 28 | TODO@domain
leadvelocity.nl/transport
```

**Regels:**
- **Geen logo-image** in cold outreach (verhoogt spam-score, afleidend)
- **Geen banner/badge-images** — tekst-only
- **Geen social-icons-rij** in cold email (te marketing-y)
- **Wel klikbare telefoon + URL** (mailto en tel:links)

---

## 3. Reply-flow (bij prospect-antwoord)

```yaml
reply_handling:
  auto_forward_to: info@leadvelocity.nl
  primary_responder: Bart
  secondary_responder: broer (bij vakantie/afwezigheid)
  response_sla: "Binnen één werkdag"

reply_signals_that_flag_for_priority:
  - "woorden als 'graag', 'interesse', 'kunnen we', 'plan'"
  - "vraag om meer informatie"
  - "vraag om specifieke use-case"
  - "vraag om prijs"

reply_signals_that_close_thread:
  - "geen interesse"
  - "gebruik ons eigen team"
  - "we werken al met [X]"
  - "verwijder mij uit je lijst"  # direct unsubscribe, markeer als do-not-contact
```

---

## 4. Compliance — wettelijk en practical

### 4.1 B2B in Nederland (geen AVG-opt-in-verplichting voor cold email)

Het Nederlandse juridische kader (Telecommunicatiewet art 11.7 + AVG) staat **B2B-cold-outreach toe** zonder expliciete opt-in, **mits:**

```yaml
compliance_requirements:
  - "Duidelijk opt-out in elke mail (unsubscribe-link)"
  - "Afzender-identiteit helder (geen fake persona's)"
  - "Professioneel gericht — naar B2B-functionarissen, niet privé-adressen"
  - "Relevantie — kan niet willekeurig zijn, moet logische match hebben met hun rol"
  - "Respecteer do-not-contact-verzoek onmiddellijk"
  - "Bewaar maximaal 2 jaar als prospect niet reageert (dan verwijderen)"
```

### 4.2 Unsubscribe-tekst (moet in elke mail)

```text
—
Je ontvangt deze mail omdat Leadvelocity je functie binnen [bedrijfsnaam] relevant vindt voor onze dienstverlening. Geen interesse? Laat het weten met één reactie — we halen je direct uit de lijst.
```

**Regels:**
- Zet deze tekst onder signature, met lege regel tussen
- **Kleine letter-grootte** (9-10pt) — het hoort er maar mag niet afleiden
- **Niet opmaken als link** in de eerste 2 mails — we willen persoonlijk overkomen
- **Wel als clickable link** in touch 3+ van sequence

### 4.3 Data-hygiëne

```yaml
do_not_contact_list:
  trigger:
    - Prospect heeft expliciet "verwijder mij" gezegd
    - Prospect heeft unsubscribe gebruikt
    - Bounced 2+ keer (hard bounce)
    - Al klant (om dubbele communicatie te voorkomen)

  retention: "Permanent markeren, nooit opnieuw contacten"

re_engagement_allowed_after:
  - "Geen response na 5-touch sequence → mag over 3-6 maanden opnieuw met nieuw angle"
  - "Soft bounce (tijdelijk) → retry na 1-2 weken"
```

---

## 5. Inbox-warming (voor nieuwe outreach-domeinen)

Wanneer een nieuw outreach-domein wordt geactiveerd, **altijd eerst warmen**:

```yaml
warmup_schedule:
  week_1:
    - dagelijks 5 mails vanuit nieuw domein naar je eigen mailboxes en 1-2 goede collega's
    - genereer replies, opens, clicks vanuit ontvangende kant
  week_2:
    - verhogen naar 10-15 mails/dag
    - nog geen prospect-bulk
  week_3-4:
    - start prospect-outreach met max 20/dag
    - monitor bounces en spam-complaints strak
  after_week_4:
    - bij goede reputatie: schaal naar 30-40/dag
    - nooit > 50/dag van één domein in jaar 1

tools_for_warmup:
  - "Instantly warm-up feature"
  - "Smartlead warm-up feature"
  - "Warmup.email (stand-alone)"
```

---

## 6. Volume-limieten (hard)

Om sender-reputatie te beschermen:

```yaml
hard_limits_per_domain:
  max_daily_sends: 30 (in jaar 1)
  max_weekly_sends: 150
  max_sequence_overlap: 3 touches naar zelfde prospect per week

per_inbox_limits:
  max_recipients_per_email: 1 (nooit BCC bulk)
  personalization_required_percentage: 100 (elke mail handmatig geverifieerd vóór send)

safety_rails:
  - "Bounce rate > 5% in 24u → stop campagne, onderzoek lijstkwaliteit"
  - "Spam-complaint rate > 0.1% → stop, review content"
  - "Unsubscribe rate > 2% → heroverwegen targeting + opener"
```

---

## 7. Tracking & analytics

```yaml
track_per_send:
  - open (via tracking-pixel, optioneel uit voor top-prospects)
  - click (op links in mail)
  - reply (auto via inbox-integratie)
  - bounce (hard/soft)
  - unsubscribe

track_per_campaign:
  - open_rate: target 55-75%, alarm <40%
  - reply_rate: target 5-10%, alarm <2%
  - meeting_booked_rate: target 2-5%, alarm <1%

track_per_domain:
  - sender_reputation (Google Postmaster Tools)
  - spam_complaints
  - deliverability (via Smartlead/Instantly reports)
```

**Regel:** geen tracking-pixels in LinkedIn DMs (niet ondersteund en verstorend).

---

## 8. Integratie met Sales Dashboard

Bart's sales-dashboard (extern systeem) moet deze velden kennen per contact:

```yaml
prospect_fields:
  - prospect_id (unique)
  - company_name
  - website
  - vertical (groothandel | maakindustrie | transport | other)
  - decision_maker_name
  - decision_maker_title
  - decision_maker_email
  - decision_maker_linkedin
  - signals_detected (array from Analyst)
  - recommended_product (from PRODUCTS.md matrix)
  - assigned_sender_domain (from this file's routing logic)
  - campaign_status (not_started | in_sequence | paused | closed_won | closed_lost | do_not_contact)
  - sequence_step (1-5)
  - last_touch_date
  - next_scheduled_touch
  - reply_log (thread history)
  - tags (manual labels, e.g. "warm-lead", "high-potential")
```

---

## 9. Wat Bart nog moet invullen (TODO's)

Voordat dit doc productie-klaar is:

- [ ] **3 Squarespace-domeinen** kiezen en invoeren in sectie 1
- [ ] **MX + SPF + DKIM + DMARC** per domein configureren (Google Workspace setup)
- [ ] **Warm-up tool** kiezen (Instantly vs Smartlead) en aansluiten per domein
- [ ] **Decision-maker contact-enrichment tool** kiezen (Apollo vs Clay vs ZoomInfo)
- [ ] **Tracking-tool** kiezen (Instantly/Smartlead geïntegreerd, of Mailtracker apart)
- [ ] **Suppression-lijst** importeren (bestaande klanten, eerder benaderde prospects, kennissen-sector)

---

*Versie: 1.0 — 2026-04-20. Update: zodra domeinen actief zijn, vervang TODO's. Herzie volume-limieten na 3 maanden op basis van echte deliverability-data.*
