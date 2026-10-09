import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const HeroNew = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain">
      {/* Background gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lv-lime/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-5xl">
          {/* Kicker */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lv-lime-ink/20 bg-lv-lime/[0.05] mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="font-mono text-[0.7rem] sm:text-xs uppercase tracking-widest text-lv-lime-ink">
              AI Operations Consultancy &mdash; Nederland &amp; België
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-700 leading-[1.05] tracking-tight mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-lv-ink">Jouw bedrijf werkt hard.</span>
            <br />
            <span className="text-lv-ink">Jouw systemen </span>
            <span className="text-gradient-accent">nog niet.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-lv-body max-w-3xl leading-relaxed mb-12 font-body opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.35s' }}
          >
            Wij bouwen AI-gedreven systemen die industriële B2B bedrijven efficiënter maken &mdash; van nieuwe klanten werven tot operationele processen automatiseren. Wij bouwen het. Wij laten het draaien.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-lime text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
            >
              Gratis audit aanvragen
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="/#diensten"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-line text-lv-ink font-display font-600 text-base rounded-lg hover:border-lv-faint transition-all duration-300"
            >
              Bekijk onze diensten
            </a>
          </div>

          {/* Social proof bar */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-lv-faint opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.65s' }}
          >
            <span>Industriële B2B</span>
            <span className="text-lv-line">·</span>
            <span>Nederland &amp; België</span>
            <span className="text-lv-line">·</span>
            <span>Resultaat in 4&ndash;8 weken</span>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lv-ink to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroNew;
