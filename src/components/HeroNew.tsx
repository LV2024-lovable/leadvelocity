import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Zap, TrendingUp, Bot } from 'lucide-react';

// Three headline variants that rotate per visit.
// Option 6 is primary (most "receiving"), 4 and 8 are alternates.
const HEADLINES = [
  {
    id: 'empowerment',
    headline: ['Geef je team de bouwblokken.', 'Geef je bedrijf de voorsprong.'],
    sub: 'Wij bouwen AI-systemen die vakmensen slimmer laten werken — en bedrijven die stil staan laten inhalen door iedereen die dat wél doet. Voor Nederlandse groothandel, maakindustrie en transport.',
  },
  {
    id: 'outcome',
    headline: ['Meer marge.', 'Minder handwerk.', 'AI die écht rendeert.'],
    sub: 'Van slimme inkoopvoorspelling tot pipeline-automatisering — wij bouwen productized AI-oplossingen voor Nederlandse MKB-industrie met meetbare ROI binnen één kwartaal.',
  },
  {
    id: 'question',
    headline: ['Wat als je morgen 40% van het handwerk', 'uit je operatie kon halen?'],
    sub: 'Voor Nederlandse groothandels, maakindustrie en transporteurs tussen 50-250 FTE — wij bouwen de AI-systemen die dat mogelijk maken. Binnen 8 weken, niet 8 kwartalen.',
  },
] as const;

// Sourced industry benchmarks — every claim is defensible.
const benchmarks = [
  {
    value: '5-20%',
    label: 'lagere logistiekkosten via AI',
    source: 'McKinsey, 2024',
  },
  {
    value: '+130-200 bps',
    label: 'brutomarge via AI-pricing',
    source: 'McKinsey B2B Pricing, 2025',
  },
  {
    value: '60%',
    label: 'snellere documentverwerking',
    source: 'McKinsey Beyond Automation, 2024',
  },
];

function pickHeadlineIndex() {
  // Stable per session but rotating across visits.
  if (typeof window === 'undefined') return 0;
  try {
    const stored = sessionStorage.getItem('lv-hero-variant');
    if (stored !== null) {
      const n = Number(stored);
      if (Number.isInteger(n) && n >= 0 && n < HEADLINES.length) return n;
    }
    const pick = Math.floor(Math.random() * HEADLINES.length);
    sessionStorage.setItem('lv-hero-variant', String(pick));
    return pick;
  } catch {
    return 0;
  }
}

const HeroNew = () => {
  // SSR-safe default = option 6 (empowerment) as primary H1 for crawlers.
  const [variantIndex, setVariantIndex] = useState(0);

  useEffect(() => {
    setVariantIndex(pickHeadlineIndex());
  }, []);

  const variant = HEADLINES[variantIndex];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain">
      {/* Background gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-5xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Zap className="w-4 h-4 text-lv-accent" />
            <span className="font-body text-sm font-500 text-lv-accent">
              AI Operations Partner · Groothandel · Maakindustrie · Transport
            </span>
          </div>

          {/* Headline — rotates across visits */}
          <h1
            key={variant.id}
            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-700 leading-[1.05] tracking-tight mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {variant.headline.map((line, i) => (
              <React.Fragment key={i}>
                <span className={i === variant.headline.length - 1 ? 'text-gradient-accent' : 'text-lv-text'}>
                  {line}
                </span>
                {i < variant.headline.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-lv-text-muted max-w-2xl leading-relaxed mb-12 font-body opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.35s' }}
          >
            {variant.sub}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-20 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
            >
              Boek een gratis AI-Scan
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#verticals"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
            >
              Bekijk voor jouw sector
            </a>
          </div>

          {/* Industry benchmarks — sourced, not invented */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.65s' }}
          >
            {benchmarks.map((b) => (
              <div key={b.label} className="border-l-2 border-lv-accent/40 pl-4">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-700 text-lv-accent mb-2 leading-none">
                  {b.value}
                </div>
                <div className="font-body text-sm text-lv-text leading-snug mb-1">
                  {b.label}
                </div>
                <div className="font-body text-xs text-lv-text-subtle italic">
                  {b.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-1/3 hidden lg:flex flex-col gap-3 opacity-20">
          <div className="w-16 h-16 border border-lv-accent/30 rounded-lg flex items-center justify-center">
            <Bot className="w-8 h-8 text-lv-accent/50" />
          </div>
          <div className="w-16 h-16 border border-lv-accent/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-lv-accent/40" />
          </div>
          <div className="w-16 h-16 border border-lv-accent/10 rounded-lg flex items-center justify-center">
            <Zap className="w-8 h-8 text-lv-accent/30" />
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lv-ink to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroNew;
