import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  Sparkles,
  Clock,
  Target,
  ListChecks,
  Building2,
  Factory,
  Truck,
  Package,
} from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { triggerAutoRespond } from '../lib/autoRespond';
import { useReveal } from '../hooks/useReveal';
import {
  Answers,
  AnswerScore,
  AssessmentResult,
  Sector,
} from '../data/assessment/types';
import { coreQuestions } from '../data/assessment/coreQuestions';
import { verticalQuestions, sectorLabels } from '../data/assessment/verticalQuestions';
import { calculateResult, getQuestionsForSector } from '../data/assessment/scoring';
import { dimensionByKey } from '../data/assessment/dimensions';

type Stage = 'landing' | 'sector' | 'quiz' | 'preview' | 'email';

const sectorCards: Array<{
  key: Sector;
  label: string;
  icon: React.ElementType;
  helper: string;
}> = [
  {
    key: 'groothandel',
    label: 'Technische groothandel',
    icon: Package,
    helper: 'MRO, industriële onderdelen, installatie, machinebouw-leveranciers',
  },
  {
    key: 'maakindustrie',
    label: 'Maakindustrie',
    icon: Factory,
    helper: 'Metaalbewerking, machinebouw, precisiemechatronica, voedingsmachines',
  },
  {
    key: 'transport',
    label: 'Transport & logistiek',
    icon: Truck,
    helper: 'Pallet-distributie, FTL, 3PL, bulk, koel/vries',
  },
  {
    key: 'anders',
    label: 'Anders / overig',
    icon: Building2,
    helper: 'Een andere sector — we stemmen het advies generiek af',
  },
];

const AiReadinessAssessment: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useReveal();

  const [stage, setStage] = useState<Stage>('landing');
  const [sector, setSector] = useState<Sector | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'AI-Readiness Assessment — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Ontdek in 3 minuten waar jullie nu staan met AI. 17 korte vragen, persoonlijk rapport met sector-advies. Geen verplichtingen.',
      );
    }
  }, []);

  const questions = useMemo(
    () => (sector ? getQuestionsForSector(sector) : coreQuestions),
    [sector],
  );
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const answeredCount = currentIndex;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const startAssessment = () => setStage('sector');

  const selectSector = (s: Sector) => {
    setSector(s);
    setAnswers({});
    setCurrentIndex(0);
    setStage('quiz');
  };

  const answerQuestion = (score: AnswerScore) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 180);
    } else {
      if (!sector) return;
      const computed = calculateResult(sector, newAnswers);
      setResult(computed);
      setTimeout(() => setStage('preview'), 180);
    }
  };

  const goBack = () => {
    if (currentIndex === 0) {
      setStage('sector');
      return;
    }
    setCurrentIndex((i) => i - 1);
  };

  const submitEmailGate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Vul naam en e-mail in.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Dat lijkt geen geldig e-mailadres.');
      return;
    }
    if (!result || !sector) return;

    setSubmitting(true);

    try {
      const extra = {
        sector: sectorLabels[sector],
        sectorKey: sector,
        score: result.normalizedScore,
        band: result.band,
        strongestDimension: dimensionByKey(result.strongestDimension).label,
        weakestDimension: dimensionByKey(result.weakestDimension).label,
        recommendedUseCaseTitle: result.recommendedUseCase.title,
        recommendedUseCaseDescription: result.recommendedUseCase.description,
        triggers: result.triggers,
      };

      const messageLines = [
        'AI-READINESS ASSESSMENT — resultaat',
        '',
        `Naam: ${name}`,
        `Bedrijf: ${company || '(niet ingevuld)'}`,
        `E-mail: ${email}`,
        `Sector: ${sectorLabels[sector]}`,
        '',
        `Score: ${result.normalizedScore}/100`,
        `Band: ${result.band}`,
        `Sterkste dimensie: ${dimensionByKey(result.strongestDimension).label}`,
        `Zwakste dimensie: ${dimensionByKey(result.weakestDimension).label}`,
        `Aanbevolen use-case: ${result.recommendedUseCase.title}`,
        `Trigger-regels: ${result.triggers.join(', ') || 'geen'}`,
        '',
        'Dimensie-scores:',
        ...Object.entries(result.dimensionScores).map(
          ([k, v]) => `  ${dimensionByKey(k as never).label}: ${v}/100`,
        ),
      ].join('\n');

      const { error } = await supabase.functions.invoke('email-notify', {
        body: {
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: '',
          message: messageLines,
        },
      });
      if (error) throw error;

      triggerAutoRespond({
        name: name.trim(),
        email: email.trim(),
        assetType: 'ai_readiness_assessment',
        extra,
      });

      // Stash result + identity for result page (survives refresh)
      try {
        sessionStorage.setItem(
          'lv_assessment_result',
          JSON.stringify({ result, name: name.trim(), email: email.trim() }),
        );
      } catch {
        // ignore storage failures (private mode etc.)
      }

      toast.success('Je uitslag staat klaar.');
      navigate('/ai-readiness-assessment/resultaat', {
        state: { result, name: name.trim(), email: email.trim() },
      });
    } catch (err) {
      console.error(err);
      toast.error('Er ging iets mis. Probeer het nog eens.');
    } finally {
      setSubmitting(false);
    }
  };

  // ----- RENDER -----

  if (stage === 'landing') {
    return (
      <div className="min-h-screen bg-lv-ink">
        <NavbarNew />
        <main>
          <section className="relative overflow-hidden grain">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

            <div
              ref={heroRef}
              className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-24 relative z-10"
            >
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-accent/[0.05] mb-8">
                  <Sparkles className="w-4 h-4 text-lv-accent" />
                  <span className="font-body text-sm font-500 text-lv-accent">
                    Gratis · 3 minuten · persoonlijk rapport
                  </span>
                </div>
                <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-700 text-lv-text leading-[1.05] tracking-tight mb-8">
                  Hoe AI-ready is jullie organisatie{' '}
                  <span className="text-gradient-accent">echt</span>?
                </h1>
                <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
                  Ontdek in 3 minuten waar jullie nu staan — en wat een logische volgende stap is voor jullie sector.
                </p>
                <button
                  type="button"
                  onClick={startAssessment}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Start de assessment
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <p className="mt-5 font-body text-sm text-lv-text-subtle">
                  Je hoeft niets voor te bereiden. Kies steeds het antwoord dat het meest op jullie situatie lijkt.
                </p>
              </div>
            </div>
          </section>

          <section className="section-padding relative bg-lv-surface">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
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
                    Geen losse score.{' '}
                    <span className="text-lv-text-muted">Wel bruikbaar advies.</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    {
                      icon: Target,
                      title: 'Een duidelijke AI-readiness score',
                      body: 'Totaalscore plus 6 dimensie-scores — geen black box.',
                    },
                    {
                      icon: CheckCircle2,
                      title: 'Sterke en zwakke punten',
                      body: 'Waar zit jullie voordeel en waar zit de grootste rem.',
                    },
                    {
                      icon: ListChecks,
                      title: 'Advies op jullie sector',
                      body: 'Groothandel, maakindustrie, transport — of generiek als dat past.',
                    },
                    {
                      icon: Clock,
                      title: 'Volgende stap voor 30 dagen',
                      body: 'Drie concrete acties én twee dingen die je beter nog niet doet.',
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-6 rounded-xl bg-lv-ink border border-lv-border-subtle"
                      >
                        <div className="w-10 h-10 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5 text-lv-accent" />
                        </div>
                        <h3 className="font-display text-base font-700 text-lv-text mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed mb-8">
                  Er is geen goede of foute score. Deze test helpt vooral om te zien waar je logisch kunt beginnen — en wat je beter nog even niet doet.
                </p>
                <button
                  type="button"
                  onClick={startAssessment}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Start de assessment
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </section>
        </main>
        <FooterNew />
      </div>
    );
  }

  if (stage === 'sector') {
    return (
      <div className="min-h-screen bg-lv-ink flex flex-col">
        <NavbarNew />
        <main className="flex-1 flex items-center py-24 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-4">
                  Stap 1 van 3
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1] mb-4">
                  Welke sector past het beste bij jullie organisatie?
                </h2>
                <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed max-w-xl mx-auto">
                  Zo maken we de vragen en het advies relevanter.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectorCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.key}
                      type="button"
                      onClick={() => selectSector(card.key)}
                      className="group text-left p-6 md:p-7 rounded-xl bg-lv-surface border border-lv-border-subtle hover:border-lv-accent/50 hover:bg-lv-accent/[0.03] transition-all duration-200"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lv-accent/15">
                          <Icon className="w-6 h-6 text-lv-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-700 text-lv-text mb-1 leading-tight">
                            {card.label}
                          </h3>
                          <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                            {card.helper}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-lv-text-subtle group-hover:text-lv-accent group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setStage('landing')}
                  className="inline-flex items-center gap-2 font-body text-sm text-lv-text-subtle hover:text-lv-text transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Terug naar introductie
                </button>
              </div>
            </div>
          </div>
        </main>
        <FooterNew />
      </div>
    );
  }

  if (stage === 'quiz' && sector && currentQuestion) {
    const isCoreQuestion = coreQuestions.some((q) => q.id === currentQuestion.id);
    const isFirstVertical =
      !isCoreQuestion && currentIndex === coreQuestions.length;

    return (
      <div className="min-h-screen bg-lv-ink flex flex-col">
        <NavbarNew />
        <main className="flex-1 flex flex-col pt-24 md:pt-28 pb-16">
          <div className="container mx-auto px-4 md:px-6 flex-1 flex flex-col">
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
              {/* Progress header */}
              <div className="mb-8 md:mb-10">
                <div className="flex items-center justify-between mb-3 text-xs font-600 uppercase tracking-widest">
                  <span className="text-lv-accent">
                    Vraag {currentIndex + 1} van {totalQuestions}
                  </span>
                  <span className="text-lv-text-subtle">
                    {sectorLabels[sector]}
                  </span>
                </div>
                <div className="h-1 w-full bg-lv-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lv-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {isFirstVertical && (
                  <p className="mt-4 font-body text-sm text-lv-accent">
                    Helder — we stemmen de rest af op {sectorLabels[sector].toLowerCase()}.
                  </p>
                )}
              </div>

              {/* Question */}
              <div className="flex-1">
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text leading-[1.2] mb-8">
                  {currentQuestion.text}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((opt, i) => {
                    const selected = answers[currentQuestion.id] === opt.score;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => answerQuestion(opt.score)}
                        className={`w-full text-left p-5 md:p-6 rounded-xl border transition-all duration-200 ${
                          selected
                            ? 'bg-lv-accent/10 border-lv-accent/50'
                            : 'bg-lv-surface border-lv-border-subtle hover:border-lv-accent/40 hover:bg-lv-accent/[0.03]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                              selected
                                ? 'border-lv-accent bg-lv-accent'
                                : 'border-lv-border'
                            }`}
                          >
                            {selected && (
                              <div className="w-2 h-2 rounded-full bg-lv-ink" />
                            )}
                          </div>
                          <span className="font-body text-base md:text-lg text-lv-text leading-relaxed">
                            {opt.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer controls */}
              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 font-body text-sm text-lv-text-subtle hover:text-lv-text transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Vorige
                </button>
                <p className="font-body text-xs text-lv-text-subtle max-w-xs text-right">
                  Geen exacte cijfers nodig. Kies wat het meest op jullie situatie lijkt.
                </p>
              </div>
            </div>
          </div>
        </main>
        <FooterNew />
      </div>
    );
  }

  if (stage === 'preview' && result) {
    return (
      <div className="min-h-screen bg-lv-ink flex flex-col">
        <NavbarNew />
        <main className="flex-1 flex items-center py-24 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-accent/[0.05] mb-8">
                <CheckCircle2 className="w-4 h-4 text-lv-accent" />
                <span className="font-body text-sm font-500 text-lv-accent">
                  Je uitslag staat klaar
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1] mb-6">
                We hebben berekend waar jullie nu staan.
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-10 max-w-xl mx-auto">
                Je krijgt jullie score, de belangrijkste inzichten per dimensie, een concrete eerste use-case voor jullie sector en een 30-dagen-advies. We sturen het ook per mail.
              </p>
              <button
                type="button"
                onClick={() => setStage('email')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
              >
                Bekijk mijn uitslag
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </main>
        <FooterNew />
      </div>
    );
  }

  if (stage === 'email' && result) {
    return (
      <div className="min-h-screen bg-lv-ink flex flex-col">
        <NavbarNew />
        <main className="flex-1 flex items-center py-24 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-4">
                  Laatste stap
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1] mb-4">
                  Ontvang je volledige uitslag en advies
                </h2>
                <p className="font-body text-base text-lv-text-muted leading-relaxed">
                  Vul je gegevens in. We sturen de score, inzichten en een praktische vervolgstap per mail.
                </p>
              </div>

              <form
                onSubmit={submitEmailGate}
                className="p-6 md:p-8 rounded-2xl bg-lv-surface border border-lv-border-subtle space-y-4"
              >
                <div>
                  <label
                    htmlFor="ass-name"
                    className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2"
                  >
                    Voornaam *
                  </label>
                  <input
                    id="ass-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Voornaam"
                    className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ass-email"
                    className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2"
                  >
                    E-mail *
                  </label>
                  <input
                    id="ass-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="naam@bedrijf.nl"
                    className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ass-company"
                    className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2"
                  >
                    Bedrijf
                  </label>
                  <input
                    id="ass-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Bedrijfsnaam"
                    className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Versturen...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Stuur mijn uitslag
                    </>
                  )}
                </button>

                <p className="font-body text-xs text-lv-text-subtle leading-relaxed">
                  We sturen je uitslag per mail en af en toe praktische AI-inzichten. Afmelden kan altijd met één klik.
                </p>
              </form>
            </div>
          </div>
        </main>
        <FooterNew />
      </div>
    );
  }

  // Safety fallback
  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />
      <FooterNew />
    </div>
  );
};

export default AiReadinessAssessment;
