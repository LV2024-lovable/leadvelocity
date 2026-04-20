import React, { useEffect } from 'react';
import { ArrowUpRight, Search, Hammer, Repeat, GraduationCap, Check } from 'lucide-react';
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

const steps: Step[] = [
  {
    number: '01',
    icon: Search,
    title: 'Verkennen & prioriteren',
    meta: 'Week 1-2 · Kennismaking + scan',
    lead:
      'We beginnen met een vrijblijvend kennismakingsgesprek. Daarna brengen we in kaart welke drie AI-kansen voor jullie operatie het meeste opleveren — concreet, in euro\'s, met duidelijke prioritering.',
    details: [
      'Diepte-scan van operatie, sales, inkoop en klantcontact',
      'Interviews met directie en relevante operationele leiders',
      'Top-3 AI-kansen met impact-inschatting per use-case',
      'Implementatie-prioritering en risico-analyse',
    ],
    outcome:
      'Een geschreven rapport dat jullie hét overzicht geeft: waar staan we, waar is de grootste winst, en wat doen we eerst. Zonder vervolg-verplichting — maar meestal rollen we door.',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Bouwen in sprints',
    meta: 'Kwartaal 1 · Eerste use-case live',
    lead:
      'We kiezen één AI-toepassing waar het snelst resultaat te halen is en bouwen die end-to-end. Van data-integratie tot productie-gebruik. Meetbaar resultaat binnen één kwartaal — of we herzien samen de scope.',
    details: [
      'End-to-end build van één concrete AI-toepassing',
      'Integratie met bestaande systemen (ERP, CRM, webshop) zonder ze te vervangen',
      'Testing en pilot-gebruik door één afdeling voordat we schalen',
      'Wekelijkse voortgangs-check op vooraf afgesproken KPI',
    ],
    outcome:
      'Een werkend AI-systeem in productie. Jouw team werkt er dagelijks mee. Meetbaar resultaat op de vooraf afgesproken KPI — zichtbaar in een dashboard dat wij samen met jullie hebben ingericht.',
  },
  {
    number: '03',
    icon: Repeat,
    title: 'Doorlopend partnership',
    meta: 'Na de eerste sprint · Retainer',
    lead:
      'Na de eerste succesvolle use-case rollen we door in een AI Operations Partnership. Flexibel per maand ingevuld — nieuwe use-cases, optimalisatie van bestaande, coaching voor je interne team.',
    details: [
      'Doorlopende optimalisatie van bestaande AI-systemen',
      'Maandelijkse nieuwe use-case-verkenning',
      'Coaching van intern team (data, AI, processen)',
      'Sector-benchmarks en trendsignalen',
      'Priority access op nieuwe AI-technieken',
    ],
    outcome:
      'Structurele AI-voorsprong. Elke maand wordt jullie AI-stack breder en beter. Geen losse projectofferte bij elke nieuwe use-case — vast aanspreekpunt, snelle schakels, voorspelbare kosten.',
  },
  {
    number: '04',
    icon: GraduationCap,
    title: 'Zelfredzaam',
    meta: 'Doorlopend · Kennisoverdracht',
    lead:
      'Ons doel is dat jullie ons op termijn niet meer nodig hebben voor het dagelijkse werk. We dragen kennis, methodiek en playbooks over zodat AI een structurele bedrijfscapaciteit wordt — niet een extern project.',
    details: [
      'Gedocumenteerde playbooks voor elke opgeleverde AI-oplossing',
      'Training voor het interne team op tools, data en methodiek',
      'Sector-benchmarks beschikbaar in eigen dashboard',
      'Mogelijkheid om retainer om te zetten naar lichte supervisie',
    ],
    outcome:
      'AI-capaciteit ingebed in jullie organisatie. Je kiest of je met ons blijft werken, of zelfstandig verdergaat. Geen vendor lock-in — de regie is en blijft bij jullie.',
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
                        <div className="mt-5">
                          <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest">
                            {step.meta}
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
