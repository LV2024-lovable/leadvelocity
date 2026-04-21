import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Phone,
} from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { AssessmentResult, Dimension } from '../data/assessment/types';
import { bandByKey } from '../data/assessment/bands';
import { dimensions, dimensionByKey } from '../data/assessment/dimensions';
import {
  actionsByBand,
  dontsByBand,
  sectorFlavour,
} from '../data/assessment/resultCopy';
import { triggerRules } from '../data/assessment/triggerRules';
import { sectorLabels } from '../data/assessment/verticalQuestions';

type LocationState =
  | { result: AssessmentResult; name: string; email: string }
  | null;

const AiReadinessAssessmentResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<LocationState>(null);

  useEffect(() => {
    document.title = 'Jouw AI-Readiness uitslag — Leadvelocity';

    const stateData = (location.state as LocationState) ?? null;
    if (stateData?.result) {
      setData(stateData);
      return;
    }
    try {
      const raw = sessionStorage.getItem('lv_assessment_result');
      if (raw) {
        const parsed = JSON.parse(raw) as Exclude<LocationState, null>;
        if (parsed?.result) {
          setData(parsed);
          return;
        }
      }
    } catch {
      // fall through
    }
    navigate('/ai-readiness-assessment', { replace: true });
  }, [location.state, navigate]);

  const band = useMemo(
    () => (data ? bandByKey(data.result.band) : null),
    [data],
  );

  const triggerAdvice = useMemo(() => {
    if (!data) return [];
    return triggerRules.filter((r) => data.result.triggers.includes(r.id));
  }, [data]);

  const actionsList = useMemo(() => {
    if (!data) return [];
    const base = actionsByBand[data.result.band];
    const triggerItems = triggerAdvice.map((r) => r.advice);
    // Combine, de-dupe, cap at 4 total
    const combined = [...base, ...triggerItems];
    return combined.slice(0, 4);
  }, [data, triggerAdvice]);

  const dontsList = useMemo(() => {
    if (!data) return [];
    const base = dontsByBand[data.result.band];
    const triggerItems = triggerAdvice.map((r) => r.warning);
    const combined = [...base, ...triggerItems];
    return combined.slice(0, 3);
  }, [data, triggerAdvice]);

  if (!data || !band) {
    return (
      <div className="min-h-screen bg-lv-ink">
        <NavbarNew />
        <FooterNew />
      </div>
    );
  }

  const { result, name } = data;

  const strongestMeta = dimensionByKey(result.strongestDimension);
  const weakestMeta = dimensionByKey(result.weakestDimension);

  const strengthDims = dimensions
    .filter(
      (d) => (result.dimensionScores[d.key] ?? 0) >= 60 && d.key !== result.weakestDimension,
    )
    .slice(0, 3);

  const weaknessDims = dimensions
    .filter(
      (d) =>
        (result.dimensionScores[d.key] ?? 100) < 60 && d.key !== result.strongestDimension,
    )
    .slice(0, 3);

  // Fallback so we always have at least one of each
  const displayedStrengths = strengthDims.length > 0 ? strengthDims : [strongestMeta];
  const displayedWeaknesses = weaknessDims.length > 0 ? weaknessDims : [weakestMeta];

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-accent/[0.05] mb-8">
                <Sparkles className="w-4 h-4 text-lv-accent" />
                <span className="font-body text-sm font-500 text-lv-accent">
                  {sectorLabels[result.sector]} · uitslag voor {name || 'jullie'}
                </span>
              </div>

              <div className="mb-8">
                <div className="font-display text-[5rem] md:text-[7rem] font-700 text-lv-accent leading-none tracking-tight">
                  {result.normalizedScore}
                  <span className="text-lv-text-subtle text-4xl md:text-5xl font-600">
                    /100
                  </span>
                </div>
                <div className="mt-2 font-display text-2xl md:text-3xl font-700 text-lv-text">
                  {band.label}
                </div>
              </div>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed max-w-2xl mx-auto">
                {band.summary}
              </p>
              <p className="font-body text-sm md:text-base text-lv-text-subtle leading-relaxed max-w-2xl mx-auto mt-4">
                {sectorFlavour[result.sector]}
              </p>
            </div>
          </div>
        </section>

        {/* DIMENSION BREAKDOWN */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Jullie scores per dimensie
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-700 text-lv-text leading-[1.1]">
                  Waar zit de spreiding?
                </h2>
              </div>

              <div className="space-y-4">
                {dimensions
                  .filter((d) => result.dimensionScores[d.key] !== undefined)
                  .map((d) => {
                    const score = result.dimensionScores[d.key] ?? 0;
                    const isStrongest = d.key === result.strongestDimension;
                    const isWeakest = d.key === result.weakestDimension;
                    return (
                      <div key={d.key} className="flex items-center gap-4">
                        <div className="w-40 md:w-48 flex-shrink-0">
                          <div className="font-display text-sm md:text-base font-700 text-lv-text">
                            {d.label}
                          </div>
                        </div>
                        <div className="flex-1 h-2.5 bg-lv-ink rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              isStrongest
                                ? 'bg-lv-accent'
                                : isWeakest
                                ? 'bg-lv-text-subtle'
                                : 'bg-lv-accent/50'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <div className="w-14 text-right font-display text-sm md:text-base font-700 text-lv-text">
                          {score}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>

        {/* STRENGTHS + WEAKNESSES */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="p-7 md:p-8 rounded-2xl bg-lv-accent/[0.04] border border-lv-accent/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-lv-accent" />
                  </div>
                  <h3 className="font-display text-xl font-700 text-lv-text">
                    Wat jullie al meehebben
                  </h3>
                </div>
                <ul className="space-y-3">
                  {displayedStrengths.map((d) => (
                    <li key={d.key} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                        {d.strongCopy}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-7 md:p-8 rounded-2xl bg-lv-surface border border-lv-border-subtle">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-lv-surface-raised border border-lv-border flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-lv-text-muted" />
                  </div>
                  <h3 className="font-display text-xl font-700 text-lv-text">
                    Waar nu de rem zit
                  </h3>
                </div>
                <ul className="space-y-3">
                  {displayedWeaknesses.map((d) => (
                    <li key={d.key} className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-lv-text-muted flex-shrink-0 mt-1.5" />
                      <span className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                        {d.weakCopy}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 30-DAY ACTIONS */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Wat je komende 30 dagen kan doen
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-700 text-lv-text leading-[1.1]">
                  Concrete stappen — geen strategie-deck.
                </h2>
              </div>

              <div className="space-y-3">
                {actionsList.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 md:p-6 rounded-xl bg-lv-ink border border-lv-border-subtle"
                  >
                    <div className="w-8 h-8 rounded-lg bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-sm font-700 text-lv-accent">
                        {i + 1}
                      </span>
                    </div>
                    <p className="font-body text-base text-lv-text leading-relaxed pt-0.5">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DON'TS */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Wat je nu nog niet moet doen
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-700 text-lv-text leading-[1.1]">
                  Waarschuwingen op basis van jullie profiel.
                </h2>
              </div>

              <div className="space-y-3">
                {dontsList.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-lv-surface border border-lv-border-subtle"
                  >
                    <AlertCircle className="w-5 h-5 text-lv-text-muted flex-shrink-0 mt-0.5" />
                    <p className="font-body text-base text-lv-text-muted leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* USE CASE */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Meest logische eerste toepassing
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-700 text-lv-text leading-[1.1]">
                  Waar jullie nu waarschijnlijk de snelste win pakken.
                </h2>
              </div>

              <div className="p-7 md:p-9 rounded-2xl bg-lv-ink border border-lv-accent/30">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-lv-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text leading-tight">
                      {result.recommendedUseCase.title}
                    </h3>
                    <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mt-1">
                      Voor {sectorLabels[result.sector].toLowerCase()}
                    </div>
                  </div>
                </div>
                <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                  {result.recommendedUseCase.description}
                </p>
                <p className="mt-5 pt-5 border-t border-lv-border-subtle font-body text-sm text-lv-text leading-relaxed">
                  <span className="text-lv-accent font-600">Waarom dit past: </span>
                  jullie sterkste dimensie is <strong>{strongestMeta.shortLabel}</strong> en de grootste rem zit bij <strong>{weakestMeta.shortLabel}</strong>. Deze use-case bouwt door op wat al goed gaat en vraagt relatief weinig van wat nog niet af is.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-14 rounded-3xl bg-lv-accent/[0.05] border border-lv-accent/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lv-accent/[0.08] rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-ink mb-6">
                    <Target className="w-4 h-4 text-lv-accent" />
                    <span className="font-body text-sm font-500 text-lv-accent">
                      Volgende stap
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                    {band.ctaHeadline}
                  </h2>
                  <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
                    We reageren binnen één werkdag. Geen verkooppraatje — we kijken eerst of er een match is.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={band.ctaHref}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                    >
                      {band.ctaLabel}
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <a
                      href="tel:+31625471528"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      Of bel direct
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sessionStorage.removeItem('lv_assessment_result');
                    } catch {
                      // ignore
                    }
                    navigate('/ai-readiness-assessment');
                  }}
                  className="inline-flex items-center gap-2 font-body text-sm text-lv-text-subtle hover:text-lv-text transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Assessment opnieuw doen
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default AiReadinessAssessmentResult;
