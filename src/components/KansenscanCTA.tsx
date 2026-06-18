import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const KansenscanCTA = () => {
  const ref = useReveal();

  return (
    <section id="kansenscan" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={ref}
          className="reveal relative rounded-3xl bg-lv-surface border border-lv-border overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-lv-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 p-8 md:p-14 lg:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lv-accent/[0.08] border border-lv-accent/30 mb-6">
              <Sparkles className="w-4 h-4 text-lv-accent" />
              <span className="font-body text-sm font-600 text-lv-accent">
                Gratis · geautomatiseerd
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-5 leading-[1.1] max-w-2xl mx-auto">
              Benieuwd waar AI <span className="text-gradient-accent">jullie</span> het
              snelst werk uit handen neemt?
            </h2>
            <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed max-w-xl mx-auto mb-3">
              Vul jullie bedrijfsnaam, website en sector in. Wij bekijken jullie site
              en sector en geven drie concrete AI-kansen — gekoppeld aan het type
              systeem dat erbij past.
            </p>
            <p className="font-body text-sm text-lv-text-subtle leading-relaxed max-w-lg mx-auto mb-8">
              Dit is een signaal, geen volledige audit. De scan wijst richting aan; de
              diepe analyse loopt via onze AI Ops Audit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/ai-kansenscan"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
              >
                Start de gratis kansenscan
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-sm font-body text-lv-text-subtle">
              <span className="inline-flex items-center gap-2">
                <Zap className="w-4 h-4 text-lv-accent" /> Binnen een minuut
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-lv-accent" /> Geen verkooppraatje
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KansenscanCTA;
