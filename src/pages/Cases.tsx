import React, { useEffect } from 'react';
import { ArrowUpRight, FileText, Hammer, Clock } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { useReveal } from '../hooks/useReveal';

const placeholders = [
  {
    icon: Hammer,
    status: 'In uitvoering',
    sector: 'Technische Groothandel',
    description:
      'Eerste pilot-implementatie van AI-pricing en quote-automatisering bij een Nederlandse technische groothandel. Cijfers volgen zodra geverifieerd.',
  },
  {
    icon: Clock,
    status: 'Opstart-fase',
    sector: 'Maakindustrie',
    description:
      'AI Ops Audit bij een NL-maakbedrijf — voorbereiding op predictive maintenance en nacalculatie-automatisering. Publicabel zodra de klant toestemming geeft.',
  },
  {
    icon: FileText,
    status: 'Gepland',
    sector: 'Transport & Logistiek',
    description:
      'Route-optimalisatie en CSRD scope-3 automation pilot voor een NL-transporteur. Start Q3 2026.',
  },
];

const Cases = () => {
  const heroRef = useReveal();

  useEffect(() => {
    document.title = 'Cases — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Overzicht van lopende en recent afgeronde AI-implementaties door Leadvelocity in Nederlandse groothandel, maakindustrie en transport.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                <span className="font-body text-sm font-500 text-lv-accent">
                  Cases
                </span>
              </div>

              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                Werk dat{' '}
                <span className="text-gradient-accent">bewijst zichzelf.</span>
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed max-w-2xl">
                Wij zijn een jonge studio. We publiceren cijfers pas als ze geverifieerd zijn, niet eerder. Hieronder een transparant overzicht van wat nu loopt.
              </p>
            </div>
          </div>
        </section>

        {/* PLACEHOLDER CASES */}
        <section className="py-14 md:py-16 relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {placeholders.map((p, i) => {
                  const ref = useReveal(i * 0.08);
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.sector}
                      ref={ref}
                      className="reveal p-6 md:p-8 rounded-xl bg-lv-ink border border-lv-border-subtle"
                    >
                      <div className="w-11 h-11 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-lv-accent" />
                      </div>
                      <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-2">
                        {p.status} · {p.sector}
                      </div>
                      <p className="font-body text-base text-lv-text-muted leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-14 p-8 rounded-2xl border border-lv-border-subtle bg-lv-ink">
                <p className="font-body text-base text-lv-text-muted leading-relaxed">
                  <span className="text-lv-text font-600">Waarom deze pagina nu nog geen hard cijfers heeft:</span>
                  {' '}Wij publiceren liever geen dan verzonnen. Zodra de eerste pilot-klant cijfers heeft die geverifieerd zijn én hij zelf toestemming geeft om te publiceren, komt hier een echte case-study met naam, cijfers en bron. Tot die tijd staan hier de lopende trajecten, transparant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                Wil je een van onze eerste pilot-partners zijn?
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-10">
                We nemen een selecte groep bedrijven aan waar we intensief mee bouwen. In ruil: scherp tarief en volledige transparantie.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
              >
                Bespreek een pilot
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default Cases;
