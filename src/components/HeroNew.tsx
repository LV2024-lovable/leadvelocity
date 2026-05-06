import React from 'react';
import { ArrowUpRight, Zap, TrendingUp, Bot } from 'lucide-react';

// Outcome-oriented stats (sourced on /#resultaten — industry-broad benchmarks).
const benchmarks = [
  {
    value: '5-20%',
    label: 'lagere operationele kosten via AI',
  },
  {
    value: '+15-30%',
    label: 'hogere marges bij AI-gedreven MKB',
  },
  {
    value: '60%',
    label: 'minder handwerk op routinetaken',
  },
];

const HeroNew = () => {
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
              Jouw AI operations partner
            </span>
          </div>

          {/* Headline — concrete and permanent */}
          <h1
            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-700 leading-[1.05] tracking-tight mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-lv-text">Wij bouwen AI-toepassingen</span>
            <br />
            <span className="text-gradient-accent">die werk uit handen nemen.</span>
          </h1>

          {/* Subheadline — direct list of WHAT we build + WHO it's for */}
          <p
            className="text-lg md:text-xl text-lv-text-muted max-w-3xl leading-relaxed mb-12 font-body opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.35s' }}
          >
            Chatbots, AI-agenten, workflow-automatisering en operations-dashboards — gemaakt voor technische groothandel, maakindustrie en transport. Vaste prijs, vaste scope, op onze infrastructuur.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-20 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="#wat-we-bouwen"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
            >
              Bekijk de oplossingen
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="/ai-ops-audit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
            >
              Plan een AI Ops Audit
            </a>
          </div>

          {/* Outcome stats — sources documented once on /#resultaten */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.65s' }}
          >
            {benchmarks.map((b) => (
              <div key={b.label} className="border-l-2 border-lv-accent/40 pl-4">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-700 text-lv-accent mb-2 leading-none">
                  {b.value}
                </div>
                <div className="font-body text-sm text-lv-text leading-snug">
                  {b.label}
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
