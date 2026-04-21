# Deployment Guide — Email Automation + PDF Delivery

**Versie:** 1.0 — 2026-04-21
**Voor:** Bart & broer, bij het uitrollen van de nieuwe auto-response e-mail-flow.

Dit document legt uit hoe je:
1. De nieuwe `auto-respond-asset` Edge Function deployed naar Supabase
2. PDF-bestanden host zodat e-mail-links werken
3. Test of alles werkt
4. Troubleshoot als iets misgaat

---

## 1. Wat is er veranderd?

**Voor deze update:**
- Bezoeker vult form in → `email-notify` stuurt e-mail naar `info@leadvelocity.nl`
- Bart stuurt daarna handmatig de PDF naar de gebruiker

**Na deze update:**
- Bezoeker vult form in → `email-notify` stuurt e-mail naar `info@leadvelocity.nl` (onveranderd)
- **Parallel:** `auto-respond-asset` stuurt automatisch e-mail aan de gebruiker met link naar PDF + vervolgstappen
- Bart hoeft niets meer handmatig te doen

Er is dus één nieuwe Edge Function om te deployen, en PDFs moeten online staan.

---

## 2. Edge Function deployen

### 2.1 Eenmalige voorbereiding (alleen eerste keer)

```bash
# Installeer Supabase CLI als je die nog niet hebt
brew install supabase/tap/supabase

# Log in bij Supabase
supabase login

# Link het project (eenmalig)
cd ~/leadvelocity
supabase link --project-ref ymdlgdvjfgqbpyawurnu
```

Je wordt gevraagd om je database-password. Die vind je in Supabase dashboard → Settings → Database.

### 2.2 De nieuwe Function deployen

```bash
cd ~/leadvelocity
supabase functions deploy auto-respond-asset
```

Dat is het. Function staat nu live op:
`https://ymdlgdvjfgqbpyawurnu.supabase.co/functions/v1/auto-respond-asset`

### 2.3 Check dat RESEND_API_KEY is gezet

De Function heeft toegang nodig tot de Resend API key die `email-notify` ook gebruikt. Die zou al ingesteld moeten zijn.

Check in Supabase dashboard:
1. Ga naar **Project Settings** → **Edge Functions** → **Secrets**
2. Check dat `RESEND_API_KEY` in de lijst staat
3. Zo niet: klik **+ Add new secret**, naam `RESEND_API_KEY`, waarde = je Resend API key (te vinden op resend.com/api-keys)

---

## 3. PDFs online zetten

De Edge Function stuurt e-mails met links zoals:
`https://www.leadvelocity.nl/downloads/tips-en-tricks-2026.pdf`

Dat betekent dat PDFs op die URL moeten staan.

### 3.1 Simpele optie: in de repo

1. Maak PDF in Canva of Figma
2. Upload PDF naar de repo-map `public/downloads/` met exacte filename:
   - `tips-en-tricks-2026.pdf`
   - `whitepaper-groothandel-2026.pdf`
   - `whitepaper-maakindustrie-2026.pdf`
   - `whitepaper-transport-2026.pdf`
   - `prompts-groothandel-2026.pdf`
   - `prompts-maakindustrie-2026.pdf`
   - `prompts-transport-2026.pdf`
3. Commit + push
4. Lovable deployt automatisch; PDFs staan op `leadvelocity.nl/downloads/*`

Let op: commit-hashes zitten in filenames niet — dus bestandsnamen moeten exact matchen met wat in de Edge Function staat.

### 3.2 Tijdelijke workaround voor eerste launch

Als er nog geen echte PDFs zijn maar je wil de flow al live testen: maak een simpele placeholder-PDF per asset (1 pagina met uitleg: "PDF in ontwikkeling, komt binnen X dagen"). Upload die onder de juiste filename.

Zo werkt de funnel-infrastructuur direct, en vervang je ze later door de echte PDFs zonder dat links breken.

### 3.3 Later: upgrade naar Supabase Storage

Wanneer je echt schaalt (>500 downloads/maand, of als je downloads wil kunnen tracken per gebruiker), migreer naar Supabase Storage met signed URLs. Dan:
- Private bucket voor PDFs
- Edge Function genereert per request een tijdelijke signed URL (7 dagen geldig)
- Je kan downloads tracken en desnoods intrekken

Deze migratie is ~2 uur werk als het nodig wordt. Voor nu: publieke `public/downloads/`-route is genoeg.

---

## 4. Testen of alles werkt

### 4.1 Lokaal testen

Start de dev-server en test één form:

```bash
cd ~/leadvelocity
npm run dev
```

Ga naar `http://localhost:8081/bronnen/tips-en-tricks` en vul het form in met een e-mail die je checken kan.

**Verwachting:**
1. `email-notify` stuurt mail naar `info@leadvelocity.nl` (bestaand gedrag)
2. `auto-respond-asset` stuurt mail naar jouw e-mail met link naar PDF

### 4.2 Check in Supabase logs

Ga naar Supabase dashboard → **Edge Functions** → **auto-respond-asset** → **Logs**. Je zou een `Auto-response sent to xxx@xxx.nl for asset tips_tricks`-regel moeten zien.

### 4.3 Check in Resend logs

Ga naar resend.com → **Emails** tab. Je ziet alle verzonden e-mails, inclusief delivered/opened/clicked-status.

### 4.4 Troubleshooting

**Geen auto-response ontvangen?**
- Check spam-folder
- Check Resend logs (mogelijk bounced)
- Check Edge Function logs voor errors
- Check dat `RESEND_API_KEY` actief is

**E-mail is verstuurd maar link werkt niet?**
- PDF staat niet op de juiste URL
- Check dat filename exact matcht (zie 3.1)
- Check dat `public/downloads/` is deployed (kan zijn dat Lovable nog aan het bouwen is)

**`email-notify` werkt, `auto-respond-asset` niet?**
- Function is mogelijk niet gedeployed
- Run opnieuw: `supabase functions deploy auto-respond-asset`
- Check in Supabase dashboard onder Edge Functions

---

## 5. Wijzigen van e-mail-templates

Wil je iets in een welkomst-e-mail aanpassen? Alle templates staan in één bestand:

`supabase/functions/auto-respond-asset/index.ts`

Zoek naar `const templates` en pas de betreffende asset-template aan. Daarna:

```bash
supabase functions deploy auto-respond-asset
```

Binnen 30 seconden is de nieuwe versie actief.

---

## 6. Toekomstige uitbreidingen

### 6.1 Scheduled follow-ups

Nu: alleen directe welkomst-e-mail. Toekomst: een sequence van 3-5 e-mails over 14 dagen.

Om dit te bouwen:
1. Nieuwe Supabase-tabel `email_queue` met `scheduled_at`, `email`, `template`, `extra`
2. Cron-scheduled Edge Function die elke minuut queue pollt en verzendt
3. Frontend/Edge Function schrijft bij asset-aanvragen meteen de hele sequence in de queue

Schat 3-4 uur werk. Kan later.

### 6.2 Download-tracking

Nu: als je PDF-link aanklikt weten we het niet. Toekomst: één extra Edge Function `track-download` die logt wie wanneer wat download.

### 6.3 Supabase Storage met signed URLs

Privater en trackbaar. Zie 3.3.

---

## 7. Checklist voor Bart — na elke nieuwe infoproduct-PDF

Elke keer dat je een nieuwe PDF maakt (Canva export → PDF):

- [ ] PDF-bestand heeft exact de filename die de Edge Function verwacht
- [ ] Upload naar `public/downloads/`
- [ ] Commit + push
- [ ] Lovable heeft ~1-3 min gedeployed
- [ ] Test de link: `https://www.leadvelocity.nl/downloads/[filename].pdf` → werkt?
- [ ] Test een form: vul e-mail in, verwacht binnen 2 min een mail met werkende link

---

*Versie 1.0 — 2026-04-21. Update: zodra PDF-hosting of e-mail-strategie wezenlijk verandert.*
