import type { FaqId, FaqItem } from "./types";

export const faqs: FaqItem[] = [
  { id: "software", q: "Moeten we onze software vervangen?", a: "We kijken eerst wat jullie huidige software kan en waar nog handwerk overblijft. Een oplossing kan ernaast worden ingericht als de benodigde gegevens en koppelingen beschikbaar zijn." },
  { id: "zelfstandig", q: "Wat doet het systeem zelfstandig?", a: "Dat leggen we per proces vast. We beginnen met voorbereiding en medewerkercontrole. Alleen afgesproken, geteste handelingen worden later automatisch uitgevoerd." },
  { id: "oplevert", q: "Hoe weten we of het genoeg oplevert?", a: "We meten de huidige behandeltijd en toetsen met representatieve voorbeelden. Controle, correcties en uitzonderingen tellen mee in de netto uitkomst." },
  { id: "kosten", q: "Wat kost de eerste stap?", a: "Het adviesgesprek is gratis. Als er voldoende aanleiding is, volgt een analyse van €750. Die wordt verrekend bij een implementatie binnen 60 dagen." },
  { id: "maandelijks", q: "Waarom betalen we maandelijks?", a: "Voor het beheren van de ingerichte oplossing: monitoring, incidentafhandeling, afgesproken bronupdates, rapportage en kleine instellingenwijzigingen. De precieze scope staat in het voorstel." },
  { id: "uitbreiden", q: "Kunnen we later uitbreiden?", a: "Ja. We beginnen bij één oplossing. Extra capaciteit of aangrenzende processen krijgen een eigen scope en prijs." },
  { id: "whatsapp", q: "Kan WhatsApp onderdeel zijn?", a: "Ja, als dat past bij jullie proces en de technische en communicatievoorwaarden. We bekijken eerst welk nummer, welke flow en welke overdracht nodig zijn." },
  { id: "loont", q: "Wat als automatisering niet loont?", a: "Dan bouwen we het project niet. Soms is een bestaande softwarefunctie of een kleine procesaanpassing de betere stap." },
  { id: "veilig", q: "Zijn onze gegevens veilig?", a: "Toegang, verwerking, bewaartermijnen en verantwoordelijkheden worden per inrichting vastgelegd. We gebruiken alleen gegevens die nodig zijn voor het afgesproken proces." },
  { id: "ai", q: "Gebruiken jullie AI? En wat gebeurt er met onze data?", a: "Ja, waar het helpt: om tekst uit mails en bijlagen te lezen en concepten te schrijven. Daarnaast gebruiken we vaste regels. We gebruiken alleen de gegevens die nodig zijn voor het afgesproken proces, en leggen toegang, verwerking en bewaartermijnen per inrichting vast." },
  { id: "mensen", q: "Vervangt dit mijn mensen?", a: "Nee. Het systeem doet het voorwerk; jullie medewerkers controleren, beslissen en houden het klantcontact. Zo houden ze meer tijd over voor verkopen en helpen." },
];

export function faqById(id: FaqId): FaqItem {
  const f = faqs.find((x) => x.id === id);
  if (!f) throw new Error(`Onbekende FAQ: ${id}`);
  return f;
}
