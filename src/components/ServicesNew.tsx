import React from 'react';
import { Compass, Zap, Infinity as InfinityIcon, BookOpen, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const services = [
  {
    icon: Compass,
    label: 'Stap 1',
    title: 'AI Opportunity Scan',
    meta: 'Kennismaken · op maat',
    description:
      'We kijken samen naar jullie operatie, sales, inkoop en klantenservice. Uitkomst: drie concrete AI-kansen die voor jullie het meeste opleveren, met realistische impact-inschatting en prioritering.',
    features: ['Kosteloze intake', 'Concrete AI-kansen', 'Impact-inschatting', 'Prioritering'],
    accent: false,
  },
  {
    icon: Zap,
    label: 'Stap 2',
    title: 'AI Sprint',
    meta: 'Bouwen · in één kwartaal',
    description:
      'We bouwen één concrete AI-toepassing end-to-end: van data-integratie tot productie-gebruik. Sales-automatisering, inkoopvoorspelling, ops-orchestratie, klantenservice-AI of BI — waar de ROI het snelst ligt.',
    features: ['End-to-end build', 'Vaste scope', 'Live in één kwartaal', 'Meetbaar resultaat'],
    accent: true,
  },
  {
    icon: InfinityIcon,
    label: 'Stap 3',
    title: 'AI Operations Partnership',
    meta: 'Doorlopend · retainer',
    description:
      'Wij blijven naast jullie team staan: doorontwikkeling, monitoring, nieuwe use-cases, coaching. Een maandelijks retainer betekent snelle bijsturing, vaste sparringpartner en een voortdurend groeiende AI-voorsprong.',
    features: ['Vast aanspreekpunt', 'Doorlopende optimalisatie', 'Nieuwe use-cases', 'Retainer-basis'],
    accent: false,
  },
  {
    icon: BookOpen,
    label: 'Stap 4',
    title: 'AI in je DNA',
    meta: 'Kennisoverdracht',
    description:
      'Onze methodiek, playbooks en sector-benchmarks maken jullie team zelfredzaam. Zodat AI een bedrijfscapaciteit wordt, niet een extern project — en jullie de regie houden over de toekomst.',
    features: ['Playbooks', 'Training', 'Sector-benchmarks', 'Zelfredzaamheid'],
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
                {/* Top row: label + meta */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`font-body text-xs font-600 uppercase tracking-widest ${
                      service.accent ? 'text-lv-accent' : 'text-lv-text-subtle'
                    }`}
                  >
                    {service.label}
                  </span>
                  <div
                    className={`font-body text-xs font-500 ${
                      service.accent ? 'text-lv-accent' : 'text-lv-text-subtle'
                    }`}
                  >
                    {service.meta}
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
            Elk traject start met een vrijblijvende kennismaking. We kijken pas naar scope en prijs als we weten waar jullie écht winst kunnen maken.{' '}
            <a href="#contact" className="text-lv-accent hover:underline">
              Plan een gesprek →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesNew;
