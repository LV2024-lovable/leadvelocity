# Lead Velocity outreach

Dit is de outreach-stack van Lead Velocity. Elke categorie krijgt een eigen sequence met één herkenbaar proces, één campagnelink en een personalisatieregel per mail.

**Leidend:** `docs/strategy/2026-10-11-messaging-strategie.md` (boodschap, taal, qualifier) en `docs/strategy/2026-10-09-website-gtm-handover.md` (aanbod, prijzen, grenzen, outreachlogica §19). Bij twijfel gaan die voor.

## Het aanbod in één alinea

Wij zetten aanvragen, claims en meldingen compleet klaar voordat het team eraan begint: gegevens uit mail en bijlagen halen, markeren wat ontbreekt, een concept klaarzetten. De medewerker controleert en verstuurt, naast Outlook en het eigen systeem. Traject: gratis adviesgesprek van 20 minuten → analyse van €750 (verrekend bij een implementatie binnen 60 dagen) → vast pakket vanaf €2.950 inrichting en €595 per maand, exclusief btw. Maandkosten starten pas na acceptatie. Bedragen altijd uit `src/content/pricing.ts`.

## Doelgroep

Bedrijven met 10–75 medewerkers, minstens twee mensen op het proces, input die digitaal binnenkomt en één eigenaar. Ontvanger is de eigenaar of directeur; de teamleider van het proces (binnendienst, aftersales, servicedesk) betrekken we in het gesprek.

Vier categorieën, gelijk aan de site:

| Categorie | Proces | Sequence |
|---|---|---|
| Technische groothandels | Offerteaanvragen en open offertes | [`sequence-groothandel.md`](./sequence-groothandel.md) — **eerste segment, nu actief** |
| Importeurs en distributeurs | Garantie- en dealerclaims | nog te maken |
| Service en onderhoud | Servicemeldingen | nog te maken |
| Maatwerk en montage | Projectaanvragen | nog te maken |

Groothandel is het eerste segment dat volledig is uitgewerkt en getest (strategie §9). De andere drie volgen pas als de eerste batches groothandel iets hebben opgeleverd.

## Kernprincipes

1. **Concreet waargenomen aanleiding → herkenbare taak → afgebakende aanpak → vraag of het relevant is** (handover §19).
2. **Signalen zijn een aanleiding, geen bewijs.** Een binnendienstvacature of een assortimentsuitbreiding is een reden om te mailen, niet het bewijs dat er iets mis gaat.
3. **Vijf mails over ongeveer drie weken.** Daarna stoppen. Op zijn vroegst na 3 maanden opnieuw, met een ander signaal.
4. **Eén vraag of één CTA per mail**, maximaal 120 woorden.
5. **Geen verzonnen cijfers, cases, klantnamen, tijdsclaims of garanties.** Geen nepvertrouwdheid, geen compliment over hun website.
6. **Versturen vanaf een persoonlijk adres**, niet vanaf `info@` of `noreply@`. Antwoorden landen bij één mens.

## Documenten

| Document | Inhoud | Status |
|---|---|---|
| [`playbook.md`](./playbook.md) | Hoe je per account in een paar minuten een bruikbaar signaal vindt en de signaalregel schrijft | actueel |
| [`sequence-groothandel.md`](./sequence-groothandel.md) | Vijf mails voor technische groothandels, met bezwaren en antwoorden | actueel (v2) |
| [`intent-signals.md`](./intent-signals.md) | Oudere lijst met websitesignalen | nog niet herzien; alleen gebruiken binnen de signalen uit de playbook |
| [`sequence-maakindustrie.md`](./sequence-maakindustrie.md) | Maakindustrie | vervallen, archief |
| [`sequence-transport.md`](./sequence-transport.md) | Transport en logistiek | vervallen, archief |
| `targeting-guide.md` | Accounts vinden en kwalificeren per categorie | nog te maken |
| `tools-stack.md` | Tooling voor research en verzending | nog te maken |

## Meten

Eerste markttest: 25 gecontroleerde accounts per categorie, minstens vijf relevante gesprekken als leerdoel (handover §19). Noteer per account het signaal, de touch waarop iemand antwoordde en of de lead zichzelf herkende in "past goed" (strategie §7). Streefcijfers voor open- en antwoordpercentages zetten we pas na de eerste batches, op basis van eigen data.

## Waar te beginnen

1. Stel een lijst op van 25 technische groothandels die aan de doelgroep voldoen.
2. Zoek per account een signaal volgens `playbook.md`.
3. Start `sequence-groothandel.md`.
4. Na de batch: antwoorden en gesprekken doorlezen, sequence bijstellen.

---

*Laatst bijgewerkt: 2026-10-11.*
