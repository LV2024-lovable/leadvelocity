import React from 'react';
import {
  Bot,
  MessageSquare,
  Workflow,
  LineChart,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type Category = {
  icon: React.ElementType;
  title: string;
  intro: string;
  examples: { sector: string; example: string }[];
  href?: string;
};

const categories: Category[] = [
  {
    icon: Bot,
    title: 'AI-agenten',
    intro:
      'Interne AI-assistenten die jullie productkennis, klantdata en historische offertes ontsluiten. Binnendienst vraagt, agent antwoordt — met bronverwijzing.',
    examples: [
      { sector: 'Groothandel', example: 'productkennis-assistent voor binnendienst' },
      { sector: 'Maakindustrie', example: 'werkvoorbereidingsassistent' },
      { sector: 'Transport', example: 'plannerssupport bij herplanning' },
    ],
    href: '/oplossingen/ai-agenten',
  },
  {
    icon: MessageSquare,
    title: 'Chatbots & klantenservice',
    intro:
      'Externe AI-bots die klant- of installateurvragen 24/7 beantwoorden — met de juiste data uit jullie ERP, productcatalogus of CRM.',
    examples: [
      { sector: 'Groothandel', example: 'klantvraag-routering met concept-antwoorden' },
      { sector: 'Maakindustrie', example: 'order-status en levertijd-bot' },
      { sector: 'Transport', example: 'klantstatus-automatisering rond ritten' },
    ],
    href: '/oplossingen/chatbots',
  },
  {
    icon: Workflow,
    title: 'Workflow-automatisering',
    intro:
      'Inkomende RFQ\'s, offertes, orderverwerking en document-OCR. Wat nu uren per dag kost, wordt geautomatiseerd tot uitzonderingen — vaak binnen 6-8 weken live.',
    examples: [
      { sector: 'Groothandel', example: 'RFQ-interpretatie + alternatief-suggestie' },
      { sector: 'Maakindustrie', example: 'document-OCR voor inkomende orders' },
      { sector: 'Transport', example: 'exception-handling bij vertragingen' },
    ],
    href: '/oplossingen/workflows',
  },
  {
    icon: LineChart,
    title: 'Operations-dashboards',
    intro:
      'ERP, webshop, Excel en finance samengebracht in één live view. Marge, voorraad en KPI\'s zonder wekelijkse export-fest.',
    examples: [
      { sector: 'Groothandel', example: 'live marge per artikelgroep en klant' },
      { sector: 'Maakindustrie', example: 'OEE-dashboard met afwijking-alerts' },
      { sector: 'Transport', example: 'beladingsgraad + KPI-bewaking' },
    ],
    href: '/oplossingen/dashboards',
  },
  {
    icon: Phone,
    title: 'Voice-agents',
    intro:
      'Telefonische AI-triage en outbound — een schaarse capability in NL waar wij actief mee bouwen. Voor klantenservice, scheduling en outbound-campagnes.',
    examples: [
      { sector: 'Groothandel', example: 'inbound-call-triage en order-status' },
      { sector: 'Maakindustrie', example: 'after-sales-callcheck' },
      { sector: 'Transport', example: 'outbound-bevestiging van afleveringen' },
    ],
    href: '/oplossingen/voice-agents',
  },
];

const WhatWeBuild = () => {
  const headerRef = useReveal();

  return (
    <section id="wat-we-bouwen" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="reveal mb-14 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-lv-accent" />
              <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                Wat we bouwen
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1] mb-5">
              Vijf concrete vormen van AI.{' '}
              <span className="text-lv-text-muted">
                Geen consultancy-decks — werkende toepassingen.
              </span>
            </h2>
            <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
              Ieder pad start met een AI Ops Audit (€2.500, 2 weken). Daarna bouwen we de oplossing end-to-end op onze infrastructuur en draaien we die voor je door.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c, i) => {
              const Icon = c.icon;
              const cardRef = useReveal(i * 0.06);
              return (
                <a
                  key={c.title}
                  ref={cardRef}
                  href={c.href}
                  className="reveal group relative p-7 md:p-8 rounded-2xl bg-lv-surface border border-lv-border-subtle hover:border-lv-accent/40 hover:bg-lv-accent/[0.03] transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5 group-hover:bg-lv-accent/15 transition-colors">
                    <Icon className="w-6 h-6 text-lv-accent" />
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-700 text-lv-text mb-3 leading-tight">
                    {c.title}
                  </h3>

                  <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed mb-6">
                    {c.intro}
                  </p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {c.examples.map((ex) => (
                      <li
                        key={ex.sector}
                        className="flex items-baseline gap-2 font-body text-sm text-lv-text-muted"
                      >
                        <span className="font-600 text-lv-text-subtle uppercase tracking-wider text-xs flex-shrink-0">
                          {ex.sector}:
                        </span>
                        <span>{ex.example}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 font-display text-sm font-600 text-lv-text-muted group-hover:text-lv-accent transition-colors">
                    Meer over {c.title.toLowerCase()}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="font-body text-base text-lv-text-muted max-w-2xl mx-auto">
              Niet zeker welke vorm bij jullie past?{' '}
              <a href="/ai-ops-audit" className="text-lv-accent hover:underline font-500">
                Een Audit kiest voor je
              </a>
              {' '}— top-3 kansen op tafel binnen 2 weken, vaste prijs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
