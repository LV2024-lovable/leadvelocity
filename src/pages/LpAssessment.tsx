import React, { useEffect } from 'react';
import { ArrowUpRight, Check, Clock, FileText, Sparkles, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const whatYouGet = [
  {
    icon: Clock,
    title: '60 minuten, online of fysiek',
    description:
      'Een direct gesprek met de mensen die ook bouwen — geen junior consultants die checklists afwerken.',
  },
  {
    icon: Sparkles,
    title: 'Top-3 concrete AI-kansen',
    description:
      'Niet "digitale transformatie" — drie specifieke AI-toepassingen die bij jullie operatie, sales of inkoop passen.',
  },
  {
    icon: FileText,
    title: 'Geschreven rapport achteraf',
    description:
      'Binnen 5 werkdagen ontvang je een rapport van 2-3 pagina\'s met onze bevindingen, verwachte impact en prioritering.',
  },
];

const forWho = [
  'Je bent directeur, COO of CRO van een Nederlands MKB-bedrijf',
  'Je bedrijf zit ergens tussen €5M en €100M omzet',
  'Je weet dat AI speelt, maar je wilt geen vrijblijvende hype-verhalen',
  'Je hebt een concrete pijn: marge, tijd, leads, service of planning',
];

const LpAssessment = () => {
  useEffect(() => {
    document.title = 'AI Ops Audit — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AI Ops Audit voor Nederlandse MKB-bedrijven. Vaste prijs €2.500, 2 weken doorlooptijd, geschreven rapport met de top-3 AI-kansen voor jouw organisatie.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      {/* Minimal top bar — logo only, no navigation */}
      <div className="border-b border-lv-border-subtle">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center">
          <a href="/" className="flex items-center gap-1">
            <span className="font-display text-xl font-700 tracking-tight text-lv-text">
              Lead
            </span>
            <span className="font-display text-xl font-700 tracking-tight text-lv-accent">
              velocity
            </span>
          </a>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-accent/[0.05] mb-8">
                <Sparkles className="w-4 h-4 text-lv-accent" />
                <span className="font-body text-sm font-500 text-lv-accent">
                  Voor Nederlandse MKB-bedrijven
                </span>
              </div>

              <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-700 text-lv-text leading-[1.05] tracking-tight mb-8">
                Weten waar AI <span className="text-gradient-accent">voor jou</span> het meeste oplevert.
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
                60 minuten met ons, een geschreven rapport, drie concrete AI-kansen voor jouw organisatie. Zonder verkooppraatje, zonder verplicht vervolg — gewoon een eerlijk gesprek.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#plan"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Plan een AI Opportunity Scan
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="tel:+31625471528"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Of bel direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-14 max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-lv-accent" />
                  <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                    Wat je krijgt
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1]">
                  Geen standaard PowerPoint.{' '}
                  <span className="text-lv-text-muted">Een concrete AI-routekaart voor jouw bedrijf.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whatYouGet.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-6 md:p-8 rounded-2xl bg-lv-ink border border-lv-border-subtle"
                    >
                      <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-lv-accent" />
                      </div>
                      <h3 className="font-display text-xl font-700 text-lv-text mb-3">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FOR WHO */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-lv-accent" />
                  <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                    Voor wie
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-6 leading-[1.1]">
                  Deze scan is voor jou als…
                </h2>
                <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                  Wij nemen gericht bedrijven aan. Niet uit exclusiviteit, maar omdat we kwaliteit boven volume verkiezen. De audit werkt het best wanneer we aansluiten bij jullie profiel:
                </p>
              </div>

              <div className="space-y-4">
                {forWho.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 p-5 rounded-xl bg-lv-surface border border-lv-border-subtle"
                  >
                    <div className="w-8 h-8 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-lv-accent" />
                    </div>
                    <p className="font-body text-base text-lv-text leading-relaxed pt-0.5">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA / CONTACT */}
        <section id="plan" className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-14 rounded-3xl bg-lv-accent/[0.04] border border-lv-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lv-accent/[0.06] rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-5 leading-[1.1]">
                      Plan je AI Ops Audit.
                    </h2>
                    <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-2xl mx-auto">
                      Vul in waar jullie tegenaan lopen, wij reageren binnen één werkdag. Liever bellen?{' '}
                      <a href="tel:+31625471528" className="text-lv-accent hover:underline font-500 inline-flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        +31 6 25 47 15 28
                      </a>
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <ContactForm sourceHint="Leadvelocity.nl · /lp/assessment (campaign landing)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-lv-border-subtle py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-body text-xs text-lv-text-subtle">
              &copy; {new Date().getFullYear()} Leadvelocity · Amsterdam
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="font-body text-xs text-lv-text-subtle hover:text-lv-accent transition-colors">
                Hoofdsite
              </a>
              <a href="mailto:info@leadvelocity.nl" className="font-body text-xs text-lv-text-subtle hover:text-lv-accent transition-colors">
                info@leadvelocity.nl
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LpAssessment;
