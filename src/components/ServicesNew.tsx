import React from 'react';
import { Compass, Rocket, LayoutDashboard, Bot, Infinity as InfinityIcon, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const products = [
  {
    icon: Compass,
    label: 'Product 1',
    title: 'AI Kickstart Assessment',
    meta: 'Diepte-scan · op maat',
    description:
      'We duiken in jullie operatie, sales, inkoop en klantcontact. Je krijgt een concrete top-3 aan AI-kansen met realistische impact-inschatting en prioritering — zodat je weet waar je eerst moet bouwen.',
    features: ['Diepte-scan', 'Top-3 AI-kansen', 'Impact-inschatting', 'Duidelijke prioriteit'],
  },
  {
    icon: Rocket,
    label: 'Product 2',
    title: 'AI Sales Systeem',
    meta: 'Meer leads · hogere conversie',
    description:
      'Een compleet AI-gedreven sales-systeem: prospecting, enrichment, gepersonaliseerde outbound-sequences en pipeline-scoring. Van koude prospect naar warme afspraak zonder dat je team extra uren draait.',
    features: ['AI-prospecting', 'Outbound-sequences', 'Sales intelligence', 'Pipeline-scoring'],
  },
  {
    icon: LayoutDashboard,
    label: 'Product 3',
    title: 'AI Operations Dashboard',
    meta: 'Eindelijk één waarheid',
    description:
      'Eén live dashboard dat ERP, webshop, CRM, Excel en finance samenbrengt. Real-time zicht op marge, KPI\'s en waar geld lekt — zonder dat er iemand \'s avonds rapporten moet maken.',
    features: ['Multi-bron integratie', 'Live KPI-monitoring', 'Marge-analyse', 'Geautomatiseerde rapportage'],
  },
  {
    icon: Bot,
    label: 'Product 4',
    title: 'AI Assistent',
    meta: 'Chatbot, voice of intern',
    description:
      'Een AI-assistent die past waar jij hem nodig hebt. Klantenservice 24/7, binnendienst-ondersteuning, voice-agent voor telefoon of een interne kennisassistent. Gebouwd op jullie data, getraind op jullie taal.',
    features: ['Chatbot of voice', 'Klant of intern', 'Getraind op jullie data', 'Integreert met je stack'],
  },
];

const ServicesNew = () => {
  const sectionRef = useReveal();
  const paraplulRef = useReveal(0.2);

  return (
    <section id="diensten" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div ref={sectionRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-accent" />
            <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
              Wat we bouwen
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text mb-6 leading-[1.1]">
            Vier producten.{' '}
            <span className="text-lv-text-muted">Elk oplost een universeel MKB-probleem.</span>
          </h2>
          <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-2xl">
            Geen losse AI-projectjes. Vier duidelijk gedefinieerde producten — elk gericht op een tastbaar pijnpunt dat we in bijna elk MKB-bedrijf zien. Start met één, groei door naar een doorlopend partnership.
          </p>
        </div>

        {/* Product cards — 2x2 grid on large, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => {
            const cardRef = useReveal(i * 0.08);
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                ref={cardRef}
                className="reveal group relative rounded-2xl p-8 md:p-10 border border-lv-border-subtle bg-lv-surface hover:border-lv-accent/30 transition-all duration-500 hover-lift"
              >
                {/* Top row: label + meta */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-xs font-600 uppercase tracking-widest text-lv-text-subtle">
                    {product.label}
                  </span>
                  <div className="font-body text-xs font-500 text-lv-text-subtle">
                    {product.meta}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-lv-surface-raised border border-lv-border group-hover:bg-lv-accent/10 group-hover:border-lv-accent/20 transition-colors duration-500">
                  <Icon className="w-7 h-7 text-lv-text-muted group-hover:text-lv-accent transition-colors duration-500" />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-4">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="font-body text-base text-lv-text-muted leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 rounded-md text-xs font-body font-500 bg-lv-surface-raised text-lv-text-muted border border-lv-border-subtle"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-display text-sm font-600 text-lv-text-muted group-hover:text-lv-accent transition-colors duration-200"
                >
                  Plan een gesprek
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Retainer paraplu */}
        <div
          ref={paraplulRef}
          className="reveal mt-12 md:mt-16 p-8 md:p-10 rounded-2xl bg-lv-accent/[0.04] border border-lv-accent/20"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center">
              <InfinityIcon className="w-8 h-8 text-lv-accent" />
            </div>
            <div className="flex-1">
              <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-2">
                Doorlopend · Retainer-paraplu
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-3 leading-tight">
                AI Operations Partnership
              </h3>
              <p className="font-body text-base text-lv-text-muted leading-relaxed max-w-3xl">
                Na je eerste product rol je door in een doorlopend partnership. Flexibele invulling, nieuwe use-cases, doorlopende optimalisatie en coaching. Zo bouw je structureel AI-voorsprong op — in plaats van losse projecten.
              </p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg hover:shadow-[0_0_20px_rgba(200,255,0,0.3)] transition-all duration-300 group"
            >
              Bespreek een partnership
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
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
