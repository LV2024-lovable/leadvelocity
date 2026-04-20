import React from 'react';
import { MessageSquare, Search, Cpu, Rocket } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Gratis scan of betaalde Assessment',
    description:
      'We starten met een AI Opportunity Scan — 60 min gesprek + geschreven rapport met 3 concrete AI-kansen. Diepgaander nodig? De betaalde Assessment (€5k, 2 weken) levert een volledige opportunity-map inclusief ROI-forecast en implementatie-prioritering.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Sprint — één use-case, één kwartaal',
    description:
      'Jij kiest één van zes AI Sprints: pipeline, inkoop, ops, service, BI of sales-enablement. Vaste scope, vaste prijs (€20-30k), 6-8 weken doorlooptijd. ROI zichtbaar in het kwartaal of je stopt.',
  },
  {
    number: '03',
    icon: Cpu,
    title: 'Partnership — wij zitten ernaast',
    description:
      'Na sprint-levering rollen we in een AI Operations Partnership (€6-15k/maand). Maandelijkse optimalisatie, nieuwe use-cases, live ROI-dashboard. Wij zitten naast je planner of inkoper tot je team het zelf draait — 90 dagen mee op de werkvloer.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Zelfstandig — op eigen kracht',
    description:
      'Je krijgt onze methodiek, playbooks en sector-benchmarks. Zodra je team het zonder ons kan, mag je opzeggen. Geen vendor lock-in, geen hidden fees. Onze KPI is dat jij ons niet meer nodig hebt.',
  },
];

const ProcessNew = () => {
  const headerRef = useReveal();

  return (
    <section id="werkwijze" className="section-padding relative bg-lv-surface">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div ref={headerRef} className="reveal mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-accent" />
            <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
              Werkwijze
            </span>
            <div className="h-px w-12 bg-lv-accent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text leading-[1.1]">
            Van verkennen naar{' '}
            <span className="text-gradient-accent">zelfstandig draaien</span>
            {' '}in vier stappen.
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-lv-accent/30 via-lv-border to-transparent hidden sm:block" />

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => {
              const stepRef = useReveal(i * 0.1);
              return (
                <div
                  key={step.number}
                  ref={stepRef}
                  className="reveal flex gap-6 md:gap-10 items-start"
                >
                  {/* Number circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-lv-ink border border-lv-border flex flex-col items-center justify-center gap-1">
                      <span className="font-display text-lg md:text-2xl font-800 text-lv-accent">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1 md:pt-3">
                    <h3 className="font-display text-xl md:text-2xl font-700 text-lv-text mb-3">
                      {step.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessNew;
