import React, { useEffect } from 'react';
import { ArrowUpRight, Compass, Hammer, Repeat, TrendingUp, Check } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { useReveal } from '../hooks/useReveal';

type Step = {
  number: string;
  icon: React.ElementType;
  title: string;
  meta: string;
  lead: string;
  details: string[];
  outcome: string;
};

type LadderStep = Step & { price: string };

const steps: LadderStep[] = [
  {
    number: '01',
    icon: Compass,
    title: 'AI Ops Audit',
    meta: '2 weken · laagdrempelig instappen',
    price: '€2.500',
    lead:
      'Je start met een AI Ops Audit. Wij scannen jullie operatie, sales, inkoop en klantcontact en leveren een rapport met de top-3 AI-kansen, impact-inschatting en prioritering. Geen verplicht vervolg — je krijgt het rapport en beslist zelf.',
    details: [
      'Vaste prijs van €2.500, geen verrassingen',
      'Interviews met directie en operationele leiding',
      'Top-3 AI-kansen met realistische impact-inschatting',
      'Geschreven rapport, geen generieke PowerPoint',
    ],
    outcome:
      'Je weet waar de grootste AI-winst zit voordat je iets bouwt. Filtert goede plannen van hype-projecten. Deze stap betaal je sowieso, ook als je daarna beslist het met een andere partij te doen.',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Pilot Build',
    meta: '6-8 weken · één use-case live',
    price: '€12.000 - €20.000',
    lead:
      'We bouwen één AI-toepassing end-to-end. Vaste scope, vaste prijs, draait op onze infrastructuur. Data-integratie, UI, optimalisatie en handover zitten in één pakket. Kleinste scope met meetbaar resultaat.',
    details: [
      'End-to-end build: van data-integratie tot productie-gebruik',
      'Gehost op Leadvelocity-infrastructuur (geen IT-belasting voor jullie)',
      'Geen ERP- of MES-vervanging: wij werken ernaast',
      'Wekelijkse voortgangs-syncs op vooraf afgesproken KPI',
    ],
    outcome:
      'Een werkend AI-systeem in productie binnen één kwartaal. Jullie team werkt er dagelijks mee. Resultaat meetbaar op de afgesproken KPI. Hiermee bewijs je voor jezelf of deze aanpak werkt voordat je verder investeert.',
  },
  {
    number: '03',
    icon: Repeat,
    title: 'Operating Partnership',
    meta: '12 mnd min · 30 dgn opzeg',
    price: '€3.000 - €8.000 / mnd',
    lead:
      'Na de pilot rollen we door in een doorlopende Operating Partnership. Jullie systeem blijft draaien op onze infrastructuur. Wij hosten, monitoren en optimaliseren elke maand. Nieuwe verbeteringen zitten standaard in je abonnement.',
    details: [
      'Hosted op LV-infrastructuur: wij regelen uptime, security, updates',
      'Maandelijkse optimalisatie van bestaande AI-componenten',
      'KPI-dashboard met wekelijkse monitoring',
      'Minimaal 12 maanden, dan 30 dagen opzegtermijn',
      'Optioneel: performance-kicker bovenop het maandbedrag',
    ],
    outcome:
      'Jullie AI-operatie draait voorspelbaar, wordt elke maand beter, zonder dat je elke keer een offerte hoeft te tekenen voor kleine verbeteringen. Wij zijn bereikbaar als je vast team, niet als project.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Scale & Expand',
    meta: 'Doorlopend · breder bouwen',
    price: '€8.000 - €15.000 / mnd',
    lead:
      'Bij klanten die doorgroeien bouwen we nieuwe use-cases bovenop wat al draait. Diepere integraties, meer modules, breder AI-bereik. Hier wordt AI een echte bedrijfscapaciteit in plaats van een losstaand systeem.',
    details: [
      'Meerdere AI-toepassingen onder één partnership',
      'Diepere integraties met ERP, CRM, webshop, MES',
      'Strategische kwartaal-reviews met directie',
      'Coaching van jullie interne team richting zelfredzaamheid',
    ],
    outcome:
      'AI-capaciteit ingebed in jullie organisatie, aangestuurd door ons maar gedragen door jullie team. De regie blijft bij jullie; wij leveren de uitvoering, kennis en schaal.',
  },
];

const guarantees = [
  {
    title: 'Meetbaar in één kwartaal',
    body: 'Eerste concrete resultaat zichtbaar binnen 90 dagen, of we herzien samen de scope.',
  },
  {
    title: 'Geen vendor lock-in',
    body: 'Alle code, alle data, alle documentatie is van jullie. Retainers zijn maandelijks opzegbaar.',
  },
  {
    title: 'Geen hidden fees',
    body: 'Vaste scope, transparante prijs, vooraf afgesproken extra\'s. Geen verrassingen bij de factuur.',
  },
  {
    title: 'Geen MES- of ERP-vervanging',
    body: 'Onze AI-laag werkt naast jullie bestaande systemen. Eerst bewijzen, dan pas dieper integreren.',
  },
  {
    title: 'Business-uitkomst-eerst',
    body: 'We starten altijd bij de KPI die jullie willen verbeteren. Technologie is middel, niet doel.',
  },
  {
    title: 'Eerlijk over wat AI (nog) niet kan',
    body: 'We zeggen wat bewezen werkt, wat marginaal rendeert en wat nog niet productie-klaar is.',
  },
];

const OnzeAanpak = () => {
  const heroRef = useReveal();
  const guaranteeHeaderRef = useReveal();

  useEffect(() => {
    document.title = 'Onze Aanpak — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Hoe Leadvelocity AI-systemen bouwt voor het Nederlandse MKB — van verkenning tot zelfredzaam draaien in vier stappen.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                <span className="font-body text-sm font-500 text-lv-accent">
                  Onze aanpak
                </span>
              </div>

              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-700 text-lv-text leading-[1.05] tracking-tight mb-8">
                Van verkennen naar{' '}
                <span className="text-gradient-accent">zelfstandig draaien</span>{' '}
                in vier stappen.
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed max-w-2xl">
                Geen 18-maanden-consultancyproject. Geen "digitale transformatie". Een heldere volgorde die binnen één kwartaal meetbaar resultaat oplevert en waar jullie team daarna zelf op kan bouwen.
              </p>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto space-y-20 md:space-y-24">
              {steps.map((step, i) => {
                const ref = useReveal(i * 0.08);
                const Icon = step.icon;
                return (
                  <div key={step.number} ref={ref} className="reveal">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                      {/* Left column: number + icon + meta */}
                      <div className="lg:col-span-3">
                        <div className="flex lg:flex-col items-start gap-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-lv-ink border border-lv-border flex items-center justify-center flex-shrink-0">
                            <span className="font-display text-2xl md:text-3xl font-700 text-lv-accent">
                              {step.number}
                            </span>
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-lv-accent" />
                          </div>
                        </div>
                        <div className="mt-5 space-y-1">
                          <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest">
                            {step.meta}
                          </div>
                          <div className="font-display text-sm font-700 text-lv-accent">
                            {step.price}
                          </div>
                        </div>
                      </div>

                      {/* Right column: content */}
                      <div className="lg:col-span-9">
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text mb-5 leading-tight">
                          {step.title}
                        </h2>
                        <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed mb-6">
                          {step.lead}
                        </p>
                        <ul className="space-y-3 mb-6">
                          {step.details.map((d) => (
                            <li key={d} className="flex items-start gap-3">
                              <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                              <span className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                                {d}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="p-5 rounded-xl bg-lv-accent/[0.04] border border-lv-accent/20">
                          <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-2">
                            Wat jij overhoudt
                          </div>
                          <p className="font-body text-sm md:text-base text-lv-text leading-relaxed">
                            {step.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GUARANTEES */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={guaranteeHeaderRef} className="reveal mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Onze beloftes
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1]">
                Zes dingen die je altijd van ons mag verwachten.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {guarantees.map((g) => (
                <div
                  key={g.title}
                  className="p-6 md:p-7 rounded-xl bg-lv-surface border border-lv-border-subtle"
                >
                  <div className="w-10 h-10 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-lv-accent" />
                  </div>
                  <h3 className="font-display text-base md:text-lg font-700 text-lv-text mb-2">
                    {g.title}
                  </h3>
                  <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                    {g.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                Klinkt dit als een pad waar je achter staat?
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-10">
                Plan een vrijblijvend gesprek. We beginnen met luisteren — niet met pitchen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Plan een gesprek
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="/veelgestelde-vragen"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Bekijk FAQ
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

export default OnzeAanpak;
