import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  RotateCcw,
  Info,
} from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { oplossingen, OplossingSlug } from '../data/oplossingen';

type Opportunity = {
  title: string;
  pain: string;
  whatAiDoes: string;
  oplossingSlug: OplossingSlug;
  label: 'laaghangend-fruit' | 'middellange-termijn';
};

type ResultData = {
  opportunities: Opportunity[];
  companyName: string;
  email: string;
  sector: string;
};

const AiKansenscanResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<ResultData | null>(null);

  useEffect(() => {
    document.title = 'Jullie AI-kansenscan — 3 concrete kansen | Leadvelocity';

    const stateData = (location.state as ResultData) ?? null;
    if (stateData?.opportunities) {
      setData(stateData);
      return;
    }
    try {
      const raw = sessionStorage.getItem('lv_kansenscan_result');
      if (raw) {
        const parsed = JSON.parse(raw) as ResultData;
        if (parsed?.opportunities) {
          setData(parsed);
          return;
        }
      }
    } catch {
      // fall through
    }
    navigate('/ai-kansenscan', { replace: true });
  }, [location.state, navigate]);

  const handleReset = () => {
    try {
      sessionStorage.removeItem('lv_kansenscan_result');
    } catch {
      // ignore
    }
    navigate('/ai-kansenscan');
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-lv-ink">
        <NavbarNew />
        <FooterNew />
      </div>
    );
  }

  const { opportunities, companyName, sector } = data;

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="mb-12">
            <p className="font-body text-sm font-600 text-lv-accent uppercase tracking-wider mb-3">
              AI-kansenscan
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-tight mb-4">
              Drie AI-kansen voor{' '}
              <span className="text-lv-accent">{companyName}</span>
            </h1>
            <p className="font-body text-lg text-lv-text-muted leading-relaxed">
              Op basis van jullie website en sector
              {sector ? ` (${sector})` : ''} zien wij deze drie richtingen waar AI
              het meeste verschil maakt. Elk gekoppeld aan het type systeem dat
              erbij past.
            </p>
          </div>

          {/* Kanskaarten */}
          <div className="space-y-5">
            {opportunities.map((o, i) => {
              const opl = oplossingen[o.oplossingSlug];
              const Icon = opl?.icon;
              const isQuickWin = o.label === 'laaghangend-fruit';
              return (
                <div
                  key={i}
                  className="p-6 md:p-7 rounded-2xl bg-lv-surface border border-lv-border"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center text-lv-accent font-display font-700">
                        {i + 1}
                      </div>
                      <h2 className="font-display text-xl font-700 text-lv-text">
                        {o.title}
                      </h2>
                    </div>
                    <span
                      className={
                        isQuickWin
                          ? 'shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-600 bg-lv-accent/15 text-lv-accent border border-lv-accent/30'
                          : 'shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-600 bg-lv-ink text-lv-text-subtle border border-lv-border'
                      }
                    >
                      {isQuickWin ? 'Laaghangend fruit' : 'Middellange termijn'}
                    </span>
                  </div>

                  <p className="font-body text-base text-lv-text-muted leading-relaxed mb-2">
                    <span className="text-lv-text font-600">De pijn:</span>{' '}
                    {o.pain}
                  </p>
                  <p className="font-body text-base text-lv-text-muted leading-relaxed mb-5">
                    <span className="text-lv-text font-600">
                      Wat een AI-systeem doet:
                    </span>{' '}
                    {o.whatAiDoes}
                  </p>

                  {opl && (
                    <Link
                      to={`/oplossingen/${o.oplossingSlug}`}
                      className="inline-flex items-center gap-2 font-body text-sm font-600 text-lv-accent hover:underline"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      Lees over {opl.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Wat dit rapport niet is */}
          <div className="mt-10 p-6 md:p-8 rounded-2xl bg-lv-accent/[0.05] border border-lv-accent/30">
            <div className="flex items-center gap-3 mb-3">
              <Info className="w-5 h-5 text-lv-accent" />
              <h2 className="font-display text-xl font-700 text-lv-text">
                Wat dit rapport niet is
              </h2>
            </div>
            <p className="font-body text-base text-lv-text-muted leading-relaxed mb-3">
              Dit is een signaal, geen blauwdruk. Wij noemen bewust geen
              percentages, euro's of doorlooptijden — die hangen af van jullie
              data, systemen en processen. Voor de diepe analyse met prioritering
              en impact-inschatting per kans is er de AI Ops Audit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Link
                to="/ai-ops-audit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
              >
                Bekijk de AI Ops Audit
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-lv-text font-display font-600 text-base rounded-lg border border-lv-border hover:border-lv-accent/50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Plan een 30-min kennismaking
              </a>
            </div>
          </div>

          {/* Opnieuw scannen */}
          <div className="mt-8 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 font-body text-sm text-lv-text-subtle hover:text-lv-text transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Scan opnieuw doen
            </button>
          </div>
        </div>
      </main>

      <FooterNew />
    </div>
  );
};

export default AiKansenscanResult;
