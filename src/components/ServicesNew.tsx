import React from 'react';
import { Compass, Hammer, Repeat, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const ladder = [
  {
    icon: Compass,
    step: 'Trap 1',
    title: 'AI Ops Audit',
    price: '€2.500',
    duration: '2 weken',
    description:
      'We scannen jullie operatie, sales, inkoop en klantcontact. Uitkomst: audit-rapport met top-3 AI-kansen, realistische impact-inschatting per kans en duidelijke prioritering voor implementatie.',
    features: ['Vaste prijs', '2 weken doorlooptijd', 'Geschreven rapport', 'Geen verplicht vervolg'],
  },
  {
    icon: Hammer,
    step: 'Trap 2',
    title: 'Pilot Build',
    price: '€12.000 - €20.000',
    duration: '6-8 weken',
    description:
      'We bouwen één AI-use-case end-to-end op onze hosted infrastructuur. Kleinste scope met zichtbaar resultaat. Vaste prijs, vaste levering, integreert naast jullie bestaande ERP of CRM.',
    features: ['Fixed price', 'Hosted op LV-infra', 'End-to-end build', 'Gereed in één kwartaal'],
    primary: true,
  },
  {
    icon: Repeat,
    step: 'Trap 3',
    title: 'Operating Partnership',
    price: '€3.000 - €8.000 / mnd',
    duration: '12 mnd min · 30 dgn opzeg',
    description:
      'Na de pilot blijft jullie systeem draaien op onze infrastructuur. Wij hosten, monitoren, optimaliseren doorlopend en voegen maandelijks verbeteringen toe. Geen extra builds factuur per keer.',
    features: ['Hosted + beheerd', 'Maandelijkse optimalisatie', 'KPI-dashboard', 'Vast aanspreekpunt'],
  },
  {
    icon: TrendingUp,
    step: 'Trap 4',
    title: 'Scale & Expand',
    price: '€8.000 - €15.000 / mnd',
    duration: 'Doorlopend',
    description:
      'Bij klanten die doorgroeien bouwen we nieuwe use-cases bovenop het draaiend systeem. Diepere integraties, meer modules, breder bereik. AI wordt een echte bedrijfscapaciteit.',
    features: ['Nieuwe use-cases', 'Diepe integratie', 'Strategisch partnership', 'Kwartaal-reviews'],
  },
];

const ServicesNew = () => {
  const sectionRef = useReveal();
  const optionalRef = useReveal(0.15);

  return (
    <section id="diensten" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div ref={sectionRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-accent" />
            <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
              Hoe we werken
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text mb-6 leading-[1.1]">
            Vier trappen.{' '}
            <span className="text-lv-text-muted">Elke trap bouwt voort op wat bewezen is.</span>
          </h2>
          <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
            Geen grote bouw-project-investeringen vooraf. Elke trap is laagdrempelig te starten en bewijst zichzelf voordat je naar de volgende gaat. Jullie houden altijd de regie, wij het werk.
          </p>
        </div>

        {/* Ladder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ladder.map((tier, i) => {
            const cardRef = useReveal(i * 0.08);
            const Icon = tier.icon;
            return (
              <div
                key={tier.title}
                ref={cardRef}
                className={`reveal group relative rounded-2xl p-8 md:p-10 border transition-all duration-500 hover-lift ${
                  tier.primary
                    ? 'bg-lv-accent/[0.04] border-lv-accent/30 hover:border-lv-accent/50'
                    : 'border-lv-border-subtle bg-lv-surface hover:border-lv-accent/30'
                }`}
              >
                {/* Top row: step + price */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`font-body text-xs font-600 uppercase tracking-widest ${
                      tier.primary ? 'text-lv-accent' : 'text-lv-text-subtle'
                    }`}
                  >
                    {tier.step}
                  </span>
                  <div className="text-right">
                    <div className={`font-display text-sm font-700 ${tier.primary ? 'text-lv-accent' : 'text-lv-text'}`}>
                      {tier.price}
                    </div>
                    <div className="font-body text-xs text-lv-text-subtle mt-0.5">
                      {tier.duration}
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                    tier.primary
                      ? 'bg-lv-accent/10 border border-lv-accent/30'
                      : 'bg-lv-surface-raised border border-lv-border group-hover:bg-lv-accent/10 group-hover:border-lv-accent/20'
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 transition-colors duration-500 ${
                      tier.primary ? 'text-lv-accent' : 'text-lv-text-muted group-hover:text-lv-accent'
                    }`}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-4">
                  {tier.title}
                </h3>

                {/* Description */}
                <p className="font-body text-base text-lv-text-muted leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {tier.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-3 py-1.5 rounded-md text-xs font-body font-500 border ${
                        tier.primary
                          ? 'bg-lv-accent/[0.05] text-lv-accent border-lv-accent/20'
                          : 'bg-lv-surface-raised text-lv-text-muted border-lv-border-subtle'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 font-display text-sm font-600 transition-colors duration-200 ${
                    tier.primary
                      ? 'text-lv-accent hover:text-lv-accent/80'
                      : 'text-lv-text-muted group-hover:text-lv-accent'
                  }`}
                >
                  {i === 0 ? 'Start met een audit' : i === 1 ? 'Kom in gesprek' : 'Meer weten'}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Optional rev-share tier */}
        <div
          ref={optionalRef}
          className="reveal mt-10 p-8 md:p-10 rounded-2xl border border-lv-border-subtle bg-lv-ink relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-lv-surface-raised border border-lv-border flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-lv-text-muted" />
            </div>
            <div className="flex-1">
              <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest mb-2">
                Optioneel · Performance-kicker
              </div>
              <h3 className="font-display text-xl md:text-2xl font-700 text-lv-text mb-3 leading-tight">
                Voor klanten die echt samen willen bouwen
              </h3>
              <p className="font-body text-base text-lv-text-muted leading-relaxed max-w-3xl">
                Bovenop de maandelijkse Operating Partnership kan een performance-kicker. Je krijgt een vergoeding per bewezen KPI-overtreffing (bijvoorbeeld per procentpunt marge-winst of per procentpunt efficiency). Maakt ons extra aligned op jullie succes, zonder dat we harde garanties hoeven af te geven.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="font-body text-base text-lv-text-muted max-w-2xl mx-auto">
            Elke trap start met een kort kennismakingsgesprek. We kijken eerst of er een match is voordat we prijs en scope op tafel leggen.{' '}
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
