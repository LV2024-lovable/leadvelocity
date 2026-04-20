import React, { useEffect, useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { useReveal } from '../hooks/useReveal';

type FaqSection = {
  category: string;
  items: Array<{
    q: string;
    a: string | React.ReactNode;
  }>;
};

const sections: FaqSection[] = [
  {
    category: 'Algemeen',
    items: [
      {
        q: 'Wat doet Leadvelocity precies?',
        a: 'Wij zijn een AI Operations Partner voor het Nederlandse MKB. We bouwen concrete AI-systemen — sales-motoren, operations-dashboards, AI-assistenten — die je team slimmer laten werken en je bedrijf efficiënter maken. Geen consultancy, geen AI-experimenten, wel productized oplossingen met meetbaar resultaat.',
      },
      {
        q: 'Voor wie zijn jullie wel en niet bedoeld?',
        a: 'We werken met Nederlandse MKB-bedrijven die vooruit willen en budget hebben voor serieuze investering in hun operatie. Sweet spot: €10-100M omzet. Diepste expertise in technische groothandel, maakindustrie en transport, maar ook actief in andere sectoren. We zijn niet voor startups, consumenten-businesses of bedrijven die alleen "AI-experimenten" willen zonder intentie om echt iets te veranderen.',
      },
      {
        q: 'Wat is het verschil tussen jullie en een gewoon IT-bureau?',
        a: 'Een IT-bureau implementeert software. Wij bouwen AI-gedreven processen. Het verschil: wij starten met de business-uitkomst (meer marge, minder handwerk, meer leads) en bouwen daarvandaan terug. IT-bureaus starten met een tool. Daarnaast komen wij uit sales én operations — niet alleen techniek — dus we snappen hoe jouw commerciële of operationele realiteit werkt.',
      },
    ],
  },
  {
    category: 'Praktisch',
    items: [
      {
        q: 'Wat kost een traject?',
        a: (
          <>
            <p className="mb-3">Wij werken in vier trappen waar elke stap eigen prijs heeft. Je commit alleen aan de volgende trap als de vorige je overtuigd heeft:</p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3">
              <li><strong>Trap 1 — AI Ops Audit:</strong> €2.500, 2 weken. Je krijgt een rapport met top-3 AI-kansen. Geen verplicht vervolg.</li>
              <li><strong>Trap 2 — Pilot Build:</strong> €12.000 - €20.000, 6-8 weken. Eén AI-use-case end-to-end live op onze hosted infrastructuur.</li>
              <li><strong>Trap 3 — Operating Partnership:</strong> €3.000 - €8.000 per maand. Hosted, beheerd, doorlopend geoptimaliseerd. Minimaal 12 maanden, 30 dagen opzegtermijn.</li>
              <li><strong>Trap 4 — Scale & Expand:</strong> €8.000 - €15.000 per maand bij klanten die doorbouwen naar meerdere use-cases.</li>
            </ul>
            <p>Precieze prijs hangt af van scope en complexiteit. Eerste kennismakingsgesprek is gratis en vrijblijvend.</p>
          </>
        ),
      },
      {
        q: 'Hoe snel zien we resultaat?',
        a: 'De audit duurt 2 weken en levert direct inzicht op. De Pilot Build is 6-8 weken waarna je een werkend AI-systeem in productie hebt. Voor grotere use-cases (voorraadoptimalisatie, predictive maintenance) rekenen we 2-4 maanden. We houden wekelijks de voortgang bij met concrete KPI\'s die we vooraf afspreken.',
      },
      {
        q: 'Moeten we onze ERP of MES vervangen?',
        a: 'Nee — en dat is een bewuste keuze. Onze AI-laag leest uit jullie bestaande systemen (SAP, AFAS, Exact, Isah, Ridder, Transpas, Carlo) en werkt ernaast. In fase 1 schrijven we niet terug naar jullie kernsystemen. Pas als we bewezen hebben dat de AI-oplossing werkt, beslissen jullie of we ook actieve integratie bouwen. Zo blijft risico laag.',
      },
      {
        q: 'Hoeveel tijd kost het van ons team?',
        a: 'Een typische betrokkenheid: 2-4 uur per week van de persoon aan wiens KPI we werken (vaak een operationeel directeur, commercieel manager of planner), plus 1-2 uur per week van iemand met IT/data-toegang. We werken bewust efficiënt met jullie tijd — we zijn niet van de wekelijkse stuurgroep-overleggen.',
      },
    ],
  },
  {
    category: 'Over AI en implementatie',
    items: [
      {
        q: 'Is onze data wel geschikt voor AI?',
        a: 'Voor 80% van de use-cases die wij doen — quote-automatisering, outbound-sequences, binnendienst-assistent, document-AI — is jullie data meestal voldoende. Voor diepere analyses (voorraad-optimalisatie, pricing-AI) starten we met een korte data-audit. Dat is onderdeel van fase 1, geen aparte rekening. Als de data écht ontoereikend is, zeggen we dat vóór we budget vragen.',
      },
      {
        q: 'Wat als AI verkeerde antwoorden geeft naar onze klanten?',
        a: 'Reputatierisico nemen we serieus. Eerste 90 dagen van elk klantgericht AI-systeem: AI stelt voor, mens verstuurt. Pas als we hoge accuracy bewezen hebben, zetten we autonome paden aan — met jullie als eindverantwoordelijke. Voor chatbots en voice-agents: altijd escalatie naar mens als AI niet zeker is.',
      },
      {
        q: 'Onze mensen zijn oud/traditioneel — leren ze wel AI-tools?',
        a: 'Onze AI zit waar jullie team al werkt — in Outlook, Teams, jullie ERP, WhatsApp. Geen nieuw systeem om in te loggen. Een senior binnendienster die goed is in vakinhoud heeft 20 minuten nodig om te begrijpen hoe de AI-assistent hem helpt. We trainen niet, we plakken ernaast.',
      },
      {
        q: 'We hebben AI al geprobeerd, werkte niet. Waarom nu wel?',
        a: '50% van GenAI-projecten mislukt na de proof-of-concept (Gartner, 2024). Bijna altijd drie oorzaken: te breed scope, geen business-eigenaar, geen eigenaarschap van de data. Wij werken omgekeerd: één use-case, één KPI, één persoon in jullie team die er \'s morgens naar kijkt. Eerste resultaat binnen 60 dagen of we stoppen en u betaalt alleen werkelijk verrichte uren tot dat punt.',
      },
      {
        q: 'Wat als we met jullie stoppen — hebben we dan vendor lock-in?',
        a: 'Jullie klantdata blijft altijd van jullie en is exporteerbaar. Onze stack (code, AI-modellen, orchestration) blijft eigendom van Leadvelocity, maar na Operating Partnership-contract is er een 30-dagen-overdrachtsperiode waarin we netjes handoff doen. Het 12-maanden-minimum beschermt beide partijen: jullie tegen onze schommelende beschikbaarheid, ons tegen cliënten die na 2 maanden zonder reden weg willen. Na die 12 maanden is opzeggen laagdrempelig met 30 dagen notice.',
      },
    ],
  },
  {
    category: 'Over jullie',
    items: [
      {
        q: 'Hoeveel klanten hebben jullie geholpen?',
        a: 'Eerlijk: we zijn een nieuwe studio in opbouwfase. We hebben pilot-klanten waar we nu mee bouwen, maar nog geen uitgebreide publieke case-library. Dat is bewust: we publiceren pas zodra cijfers geverifieerd zijn. Wel hebben jaren gecombineerde ervaring in sales, lead generation, operations en inkoop — de fundering is robuust, alleen de merkgeschiedenis is jong.',
      },
      {
        q: 'Hoeveel mensen werken er bij Leadvelocity?',
        a: 'We zijn bewust lean. We kiezen kwaliteit boven volume: we nemen alleen klanten aan die we écht goed kunnen bedienen, en we leveren altijd persoonlijk. Geen junior account-managers, geen handovers. Wanneer we opschalen doen we dat bewust op basis van concrete vraag — niet om groter te lijken dan we zijn.',
      },
      {
        q: 'Hebben jullie referenties?',
        a: 'We geven graag referenties zodra we de juiste hebben — we vragen klanten pas om referenties als het traject gelopen is en zij er actief achter staan. Liever eerlijke nieuwe speler dan opgeblazen claims. Kennismaking kost je altijd een gesprek van 30 minuten waarin je zelf kan aanvoelen of we scherp zijn.',
      },
    ],
  },
];

type ItemProps = {
  q: string;
  a: string | React.ReactNode;
  startOpen?: boolean;
};

const FaqItem: React.FC<ItemProps> = ({ q, a, startOpen = false }) => {
  const [open, setOpen] = useState(startOpen);
  return (
    <div className="border-b border-lv-border-subtle">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 md:py-6 flex items-start justify-between gap-4 text-left group"
      >
        <h3 className="font-display text-base md:text-lg font-600 text-lv-text group-hover:text-lv-accent transition-colors pr-4">
          {q}
        </h3>
        <div className="flex-shrink-0 mt-1">
          {open ? (
            <Minus className="w-5 h-5 text-lv-accent" />
          ) : (
            <Plus className="w-5 h-5 text-lv-text-subtle group-hover:text-lv-accent transition-colors" />
          )}
        </div>
      </button>
      {open && (
        <div className="pb-6 pr-10 animate-fade-in">
          <div className="font-body text-base text-lv-text-muted leading-relaxed">
            {a}
          </div>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const heroRef = useReveal();

  useEffect(() => {
    document.title = 'Veelgestelde Vragen — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Antwoorden op de meest gestelde vragen over Leadvelocity — wat we doen, hoe we werken, wat het kost en hoe snel je resultaat ziet.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                <span className="font-body text-sm font-500 text-lv-accent">
                  Veelgestelde vragen
                </span>
              </div>

              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-700 text-lv-text leading-[1.05] tracking-tight mb-8">
                Vragen die we vaak horen —{' '}
                <span className="text-gradient-accent">eerlijk beantwoord.</span>
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed max-w-2xl">
                Geen marketing-antwoorden. Als je eigen vraag er niet tussen staat, bel of mail gewoon — dan beantwoorden we die persoonlijk.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ CONTENT */}
        <section className="py-16 md:py-20 relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-14 md:space-y-16">
              {sections.map((section) => (
                <div key={section.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-12 bg-lv-accent" />
                    <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                      {section.category}
                    </span>
                  </div>
                  <div className="space-y-0">
                    {section.items.map((item, i) => (
                      <FaqItem
                        key={item.q}
                        q={item.q}
                        a={item.a}
                        startOpen={section.category === 'Algemeen' && i === 0}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STILL HAVE QUESTIONS */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                Staat je vraag er niet tussen?
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-10">
                Bel of mail. We reageren binnen één werkdag, zonder verkooptrechter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Stel je vraag
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="tel:+31625471528"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Of bel direct
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default Faq;
