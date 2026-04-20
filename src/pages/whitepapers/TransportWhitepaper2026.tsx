import React, { useEffect, useState } from 'react';
import { FileText, ArrowDown, Download, Clock, BookOpen } from 'lucide-react';
import NavbarNew from '../../components/NavbarNew';
import FooterNew from '../../components/FooterNew';
import WhitepaperRequestForm from '../../components/WhitepaperRequestForm';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReveal } from '../../hooks/useReveal';

const whatYouGet = [
  {
    icon: BookOpen,
    title: 'Vrachtwagenheffing 2026 - impact-analyse',
    description:
      'Wat de heffing concreet doet met de NL-transportmarge. Per voertuigtype, per sub-segment. Met rekenmodel voor eigen vloot en compensatie-potentieel via AI.',
  },
  {
    icon: FileText,
    title: '15 AI-use-cases voor NL-transport',
    description:
      'Van route-optimalisatie tot chauffeur-matching, tachograaf-AI en CSRD-automation. Met NL-benchmarks en concrete ROI-ranges per use-case.',
  },
  {
    icon: Download,
    title: 'CSRD scope-3 automation-stappenplan',
    description:
      'Hoe bestaande tachograaf-, FMS- en TMS-data samenbrengen tot automatische scope-3 rapportages per klant. Van 30-40 uur handwerk naar 2-4 uur review.',
  },
];

const whitepaperSections = [
  { section: 'Samenvatting', length: '2 pag' },
  { section: 'Vrachtwagenheffing 1 juli 2026: de realiteit', length: '4 pag' },
  { section: '15 AI-use-cases voor NL-transport', length: '8 pag' },
  { section: 'Cent-per-km compensatie-analyse', length: '3 pag' },
  { section: 'CSRD scope-3 automation blueprint', length: '3 pag' },
  { section: '3 scenario\'s: pallet, FTL, 3PL', length: '3 pag' },
  { section: 'Implementatie-roadmap tot 2027', length: '2 pag' },
];

const TransportWhitepaper2026 = () => {
  const heroRef = useReveal();
  const whatRef = useReveal(0.1);
  const formRef = useReveal();
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    document.title = 'Whitepaper: AI voor Nederlandse Transport & Logistiek 2026 — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Download de whitepaper: AI voor NL-transport 2026. Vrachtwagenheffing-impact, 15 AI-use-cases, CSRD scope-3 automation en implementatie-roadmap.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <SchemaMarkup
        schema={{
          type: 'Whitepaper',
          title: 'AI voor Nederlandse Transport & Logistiek 2026',
          description:
            '25 pagina\'s: impact-analyse vrachtwagenheffing, 15 AI-use-cases, CSRD scope-3 automation, scenario\'s voor pallet, FTL en 3PL.',
          slug: 'ai-voor-nederlandse-transport-2026',
          datePublished: '2026-04-20',
        }}
      />
      <NavbarNew />

      <main>
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                    <FileText className="w-4 h-4 text-lv-accent" />
                    <span className="font-body text-sm font-500 text-lv-accent">
                      Whitepaper · Transport & Logistiek
                    </span>
                  </div>
                  <h1 className="font-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                    AI voor Nederlandse Transport & Logistiek{' '}
                    <span className="text-gradient-accent">in 2026</span>
                  </h1>
                  <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-8">
                    25 pagina&apos;s diepgaande analyse: wat de vrachtwagenheffing doet met je marge, welke AI-use-cases dat compenseren, en hoe je CSRD scope-3 rapportage automatiseert vóór je topklant erom vraagt.
                  </p>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-lv-text-subtle mb-8">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>25 pagina&apos;s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>~30 min leestijd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>PDF-formaat</span>
                    </div>
                  </div>
                  <a href="#download" className="inline-flex items-center gap-2 font-display text-base font-700 text-lv-accent hover:underline">
                    Scroll naar download
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
                <div className="lg:col-span-2">
                  <div className="p-6 md:p-8 rounded-2xl bg-lv-surface border border-lv-border">
                    <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-5">
                      Inhoudsopgave
                    </div>
                    <ul className="space-y-3">
                      {whitepaperSections.map((s) => (
                        <li key={s.section} className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="font-body text-lv-text leading-snug">{s.section}</span>
                          <span className="font-body text-xs text-lv-text-subtle whitespace-nowrap">{s.length}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={whatRef} className="reveal py-16 md:py-20 relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Wat je krijgt
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Niet nog een "smart logistics"-rapport.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {whatYouGet.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="p-6 md:p-7 rounded-xl bg-lv-ink border border-lv-border-subtle">
                      <div className="w-11 h-11 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-lv-accent" />
                      </div>
                      <h3 className="font-display text-lg font-700 text-lv-text mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Voorproefje: 5 insights
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Wat je in de whitepaper leest
                </h2>
              </div>
              <ul className="space-y-4">
                {[
                  'Voor een 120-wagen-vloot van 12M km per jaar kost de vrachtwagenheffing €2,3M extra. Zonder compensatie daalt de sector-marge van ~7% naar 1,5% (SRA-analyse).',
                  'AI-route-optimalisatie compenseert 5-10% transportkosten. Voor typische €25M-transporteur is dat €500k-€1M per jaar.',
                  'Fuel-coaching levert 2-4% brandstofbesparing. Bij 20-25% brandstofaandeel van kosten is dat €100-€200k jaarlijks.',
                  '95% van de CSRD-scope-3 data zit al in jullie tachograaf, FMS en TMS. Automation brengt rapportage van 30-40 uur/maand naar 2-4 uur review.',
                  'Gecombineerd kan 35-70% van de vrachtwagenheffing gecompenseerd worden met AI — maar implementatie-cyclus is 6-9 maanden, dus start nu.',
                ].map((insight, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 rounded-xl bg-lv-surface border border-lv-border-subtle">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mt-0.5">
                      <span className="font-display text-xs font-700 text-lv-accent">{i + 1}</span>
                    </span>
                    <span className="font-body text-base text-lv-text leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="download" ref={formRef} className="reveal py-16 md:py-20 relative bg-lv-surface border-t border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 md:p-12 rounded-3xl bg-lv-accent/[0.04] border border-lv-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lv-accent/[0.06] rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mx-auto mb-5">
                      <Download className="w-7 h-7 text-lv-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-4 leading-[1.1]">
                      Download de whitepaper
                    </h2>
                    <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed max-w-2xl mx-auto">
                      Vul je gegevens in. We sturen de PDF direct naar je inbox.
                    </p>
                  </div>
                  <WhitepaperRequestForm
                    whitepaperTitle="AI voor Nederlandse Transport & Logistiek 2026"
                    whitepaperSlug="transport-2026"
                    onSuccess={() => setHasRequested(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {!hasRequested && (
          <section className="py-14 md:py-16 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <p className="font-body text-base text-lv-text-muted leading-relaxed">
                  Liever direct een gesprek over je vloot?{' '}
                  <a href="/#contact" className="text-lv-accent hover:underline font-500">
                    Plan een kennismaking →
                  </a>
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <FooterNew />
    </div>
  );
};

export default TransportWhitepaper2026;
