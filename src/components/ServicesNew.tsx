import React from 'react';
import { Compass, Zap, Infinity as InfinityIcon, BookOpen, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const services = [
  {
    icon: Compass,
    label: 'Stap 1',
    title: 'AI Opportunity Assessment',
    price: '€5.000',
    duration: '2 weken',
    description:
      'Wij scannen jullie operatie, sales en inkoop. Concreet rapport met 3-5 AI-kansen, verwachte €-impact en implementatie-prioritering. Vast resultaat, vaste prijs.',
    features: ['Vaste scope', 'Geschreven rapport', 'ROI-forecast', 'Concrete use-cases'],
    accent: false,
  },
  {
    icon: Zap,
    label: 'Stap 2',
    title: 'AI Sprint',
    price: '€20-30k',
    duration: '6-8 weken',
    description:
      'Een gestandaardiseerde sprint op één use-case: pipeline-scoring, inkoopvoorspelling, ops-orchestratie, klantenservice, BI-dashboards of sales-enablement. Live in het kwartaal.',
    features: ['6 sprint-types', 'Playbook-gedreven', 'ROI binnen het kwartaal', 'Fixed price'],
    accent: true,
  },
  {
    icon: InfinityIcon,
    label: 'Stap 3',
    title: 'AI Operations Partnership',
    price: '€6-15k/mnd',
    duration: 'Doorlopend',
    description:
      'Maandelijkse optimalisatie van je AI-stack, monitoring via live ROI-dashboard, en nieuwe use-cases op aanvraag. Wij zitten naast je planner, inkoper of sales-team — 90 dagen tot je team het zelf draait.',
    features: ['Live ROI-dashboard', 'Nieuwe use-cases', 'Monthly optimization', 'Opzegbaar per maand'],
    accent: false,
  },
  {
    icon: BookOpen,
    label: 'Stap 4',
    title: 'Leadvelocity AI Ops Framework',
    price: 'Inbegrepen',
    duration: 'Doorlopend',
    description:
      'Onze methodiek, playbooks en sector-benchmarks beschikbaar voor alle partnership-klanten. Jullie team krijgt de kennis, niet alleen het resultaat. Exit-klaar voor wanneer je het zonder ons wilt.',
    features: ['Playbook-bibliotheek', 'Sector-benchmarks', 'Training', 'Niet founder-afhankelijk'],
    accent: false,
  },
];

const ServicesNew = () => {
  const sectionRef = useReveal();

  return (
    <section id="diensten" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div ref={sectionRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-accent" />
            <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
              Hoe wij werken
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text mb-6 leading-[1.1]">
            Vier stappen.{' '}
            <span className="text-lv-text-muted">Van verkenning naar zelfstandig AI-gedreven bedrijf.</span>
          </h2>
          <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-2xl">
            Geen losse projecten. Geen "digitale transformatie". Een productized stappenplan met vaste scope, vaste prijs en meetbare resultaten in één kwartaal.
          </p>
        </div>

        {/* Service cards — 2x2 grid on large, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const cardRef = useReveal(i * 0.1);
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={cardRef}
                className={`reveal group relative rounded-2xl p-8 md:p-10 border transition-all duration-500 hover-lift ${
                  service.accent
                    ? 'bg-lv-accent/[0.04] border-lv-accent/20 hover:border-lv-accent/40'
                    : 'bg-lv-surface border-lv-border-subtle hover:border-lv-border'
                }`}
              >
                {/* Top row: label + price */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`font-body text-xs font-600 uppercase tracking-widest ${
                      service.accent ? 'text-lv-accent' : 'text-lv-text-subtle'
                    }`}
                  >
                    {service.label}
                  </span>
                  <div className="text-right">
                    <div
                      className={`font-display text-lg font-700 ${
                        service.accent ? 'text-lv-accent' : 'text-lv-text'
                      }`}
                    >
                      {service.price}
                    </div>
                    <div className="font-body text-xs text-lv-text-subtle">{service.duration}</div>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    service.accent
                      ? 'bg-lv-accent/10 border border-lv-accent/20'
                      : 'bg-lv-surface-raised border border-lv-border'
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${service.accent ? 'text-lv-accent' : 'text-lv-text-muted'}`}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-base text-lv-text-muted leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-3 py-1.5 rounded-md text-xs font-body font-500 ${
                        service.accent
                          ? 'bg-lv-accent/10 text-lv-accent border border-lv-accent/10'
                          : 'bg-lv-surface-raised text-lv-text-muted border border-lv-border-subtle'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 font-display text-sm font-600 transition-all duration-200 group/link ${
                    service.accent
                      ? 'text-lv-accent hover:text-lv-accent/80'
                      : 'text-lv-text-muted hover:text-lv-text'
                  }`}
                >
                  {i === 0 ? 'Plan een Assessment' : i === 1 ? 'Kies je Sprint' : 'Meer weten'}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="font-body text-base text-lv-text-muted max-w-2xl mx-auto">
            Wij nemen <span className="text-lv-text font-600">maximaal 8 klanten tegelijk</span> aan. Geen vendor lock-in, geen hidden fees, geen retainer-valstrikken. Wil je eerst sparren?{' '}
            <a href="#contact" className="text-lv-accent hover:underline">
              Plan een 30-min verkennend gesprek →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesNew;
