import type { Campaign, CampaignId } from "./types";

export const campaigns: Campaign[] = [
  {
    id: "offerte-intake",
    categoryId: "groothandels",
    demoId: "offerte-intake",
    seoTitle: "Offerte-intake voor groothandels | Lead Velocity",
    seoDescription: "Informatie uit offerteaanvragen verzamelen en ontbrekende velden zichtbaar maken, voordat je binnendienst de offerte voorbereidt.",
    h1: "Minder handwerk tussen aanvraag en offertevoorbereiding.",
    sub: "Informatie uit aanvragen en bijlagen verzamelen, ontbrekende gegevens zichtbaar maken en open offertes opvolgen.",
    primaryLabel: "Bekijk jullie offertestroom",
    message: "Informatie verzamelen en ontbrekende velden zichtbaar maken.",
    tasks: ["Productreferenties en aantallen overnemen", "Ontbrekende informatie navragen", "Werkelijk open offertes volgen"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
  {
    id: "aftersales",
    categoryId: "importeurs-distributeurs",
    demoId: "aftersales",
    seoTitle: "Complete aftersalesclaims | Lead Velocity",
    seoDescription: "Bewijsstukken en gegevens bij elkaar voordat je team een claim beoordeelt.",
    h1: "Complete claims voordat je team ze beoordeelt.",
    sub: "Serienummer, model en bewijsstukken verzamelen en de juiste procedure erbij zoeken, zodat je team de claim kan beoordelen.",
    primaryLabel: "Bekijk jullie claimproces",
    message: "Bewijsstukken en gegevens bij elkaar.",
    tasks: ["Serienummer en model verzamelen", "Bewijsstukken opvragen", "Statusvragen voorbereiden"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
  {
    id: "service-intake",
    categoryId: "service-onderhoud",
    demoId: "service-intake",
    seoTitle: "Complete servicemeldingen | Lead Velocity",
    seoDescription: "Identificatie en klachtomschrijving verzamelen voordat je servicedesk een melding oppakt.",
    h1: "Minder nabellen om een servicemelding compleet te krijgen.",
    sub: "Klant-, locatie- en apparatuurgegevens verzamelen en de melding samenvatten voordat je servicedesk hem oppakt.",
    primaryLabel: "Bekijk jullie service-intake",
    message: "Identificatie en klachtomschrijving verzamelen.",
    tasks: ["Ontbrekende machinegegevens opvragen", "Melding samenvatten", "Doorzetten naar de juiste eigenaar"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
  {
    id: "project-intake",
    categoryId: "maatwerk-montage",
    demoId: "project-intake",
    seoTitle: "Complete projectaanvragen | Lead Velocity",
    seoDescription: "Documenten, wensen en de volgende stap bij elkaar, zodat je team verder kan met gesprek, opname of offerte.",
    h1: "Projectaanvragen waar je team mee verder kan.",
    sub: "Wensen, foto's en documenten bundelen en de volgende stap voorbereiden: gesprek, opname of offerte.",
    primaryLabel: "Bekijk jullie projectintake",
    message: "Documenten, wensen en volgende stap.",
    tasks: ["Adres en wensen bundelen", "Ontbrekende documenten markeren", "Open aanvragen volgen"],
    faqIds: ["software", "zelfstandig", "kosten"],
    noindex: true,
  },
];

export function campaignById(id: CampaignId): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}
