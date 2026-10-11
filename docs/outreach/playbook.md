# Signaal-playbook

**Doel:** per account in een paar minuten één bruikbaar signaal vinden en daar de regel `[Signaal: …]` in de sequence mee invullen.

Leidend: `docs/strategy/2026-10-09-website-gtm-handover.md` §4 en §19, `docs/strategy/2026-10-11-messaging-strategie.md` §7 en §8.

## Waarom zo

De eerste zin bepaalt of de eigenaar verder leest. Een zin die op elk bedrijf past, wordt overgeslagen. Een zin die laat zien waarom we juist dít bedrijf mailen, wordt gelezen. Maar een signaal is alleen een **aanleiding**. Het bewijst niet dat het bedrijf een probleem heeft, en zo schrijven we het ook niet op.

## Eerst: past het account?

Controleer dit voordat je een signaal zoekt. Past het niet, dan niet mailen.

- 10–75 medewerkers, met minstens twee mensen op het proces (bij groothandel: de binnendienst)
- Aanvragen komen binnen per mail, pdf of Excel, niet vrijwel alleen via EDI of webshop
- Geen grote systeemmigratie bezig (voor zover zichtbaar)
- Valt in een van de vier categorieën: technische groothandels, importeurs en distributeurs, service en onderhoud, maatwerk en montage

Groothandel is het eerste segment. De andere categorieën krijgen pas een sequence als groothandel iets heeft opgeleverd.

## Het proces per account

### Stap 1: vacatures

Kijk op de vacaturepagina van het bedrijf en op de grote vacaturesites. Zoek naar binnendienst, commercieel medewerker binnendienst, orderverwerking, klantenservice. Noteer de functietitel en of de vacature nog openstaat.

### Stap 2: assortiment en nieuws

Kijk op de site en in hun nieuwsberichten of er een merk, productgroep of leverancier is bijgekomen. Noteer wat en wanneer.

### Stap 3: noteren

Schrijf het signaal, de bron (url) en de datum in de accountlijst. Geen signaal gevonden? Dan mag de signaalregel leeg blijven. Een algemene mail is beter dan een verzonnen aanleiding.

## Toegestane signalen

| Signaal | Voorbeeldregel |
|---|---|
| Vacature binnendienst | "Ik zag dat jullie een commercieel medewerker binnendienst zoeken. Dat was de aanleiding voor deze mail." |
| Assortimentsuitbreiding | "Ik zag dat jullie [merk/productgroep] aan het assortiment hebben toegevoegd. Dat was de aanleiding voor deze mail." |

Andere signalen uit handover §4 (dealernetwerk, onderhoudsdienst, projectuploads) horen bij de andere categorieën en komen in hun sequence zodra die er is.

## Wat we niet doen

- Geen compliment over hun website of hun bedrijf.
- Geen nepvertrouwdheid ("ik volg jullie al een tijd").
- Geen conclusie uit het signaal ("jullie lopen dus achter", "jullie hebben dus een achterstand").
- Geen persoonlijke gegevens of loopbaan van de ontvanger in de opening.
- Geen verzonnen of niet gecontroleerde signalen. Een tool of taalmodel mag zoeken, maar een mens controleert elk signaal voordat de mail weggaat.
- Geen vraag in de signaalregel. De vraag of CTA staat aan het eind van de mail.

## Checklist voor elke signaalregel

- [ ] Ik heb het signaal zelf gezien, met bron en datum genoteerd.
- [ ] De zin past alleen op dit bedrijf.
- [ ] Hij noemt het signaal als aanleiding, niet als bewijs.
- [ ] Maximaal 1–2 zinnen, zodat de hele mail onder 120 woorden blijft.
- [ ] Geen "AI", geen superlatieven, geen cijfers.

---

*Laatst bijgewerkt: 2026-10-11. Sector-specifieke signalen en hooks staan in de sequence per categorie, te beginnen met [`sequence-groothandel.md`](./sequence-groothandel.md).*
