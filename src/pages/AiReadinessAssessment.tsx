import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Mail, Sparkles } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import {
  questions,
  dimensions,
  calculateScore,
  getLevelColor,
  ScoreResult,
} from '../data/aiReadinessQuestions';

type Stage = 'intro' | 'quiz' | 'email' | 'result';

const AiReadinessAssessment = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  useEffect(() => {
    document.title = 'AI-Readiness Assessment — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Gratis AI-Readiness Assessment voor Nederlandse organisaties. 15 vragen, persoonlijk rapport, concrete vervolgstappen. Beoordeel of je klaar bent voor AI-inzet.',
      );
    }
  }, []);

  const progress = Math.round((currentQuestion / questions.length) * 100);
  const q = questions[currentQuestion];

  const answerQuestion = (score: number) => {
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 200);
    } else {
      // Compute preliminary result, move to email gate
      const computed = calculateScore(newAnswers);
      setResult(computed);
      setTimeout(() => setStage('email'), 200);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      toast.error('Vul naam en e-mail in.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Dat lijkt geen geldig e-mailadres.');
      return;
    }

    setSubmitting(true);

    try {
      const body = [
        'AI-READINESS ASSESSMENT — resultaat',
        '',
        `Naam: ${name}`,
        `Bedrijf: ${company || '(niet ingevuld)'}`,
        `E-mail: ${email}`,
        '',
        `Score: ${result?.percentage}% (${result?.readinessLevel})`,
        '',
        'Scores per dimensie:',
        ...Object.entries(result?.byDimension || {}).map(
          ([k, v]) => `  ${k}: ${v.percentage}% (${v.score}/${v.max})`,
        ),
        '',
        'Antwoorden:',
        ...Object.entries(answers).map(([qid, score]) => `  ${qid}: ${score}`),
        '',
        `Ingediend op: ${new Date().toISOString()}`,
      ].join('\n');

      const { error } = await supabase.functions.invoke('email-notify', {
        body: {
          name,
          company,
          email,
          phone: '',
          message: body,
        },
      });
      if (error) throw error;

      setStage('result');
      toast.success('Resultaat beschikbaar — we sturen ook een kopie naar je inbox');
    } catch (err) {
      console.error('Assessment submit error:', err);
      toast.error('Er ging iets mis. Probeer het nog eens, of mail info@leadvelocity.nl.');
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setStage('intro');
    setAnswers({});
    setCurrentQuestion(0);
    setEmail('');
    setName('');
    setCompany('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {stage === 'intro' && (
          <section className="relative overflow-hidden grain">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-24 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                  <Sparkles className="w-4 h-4 text-lv-accent" />
                  <span className="font-body text-sm font-500 text-lv-accent">
                    Gratis interactief · 5 minuten
                  </span>
                </div>

                <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                  Hoe klaar is jouw organisatie{' '}
                  <span className="text-gradient-accent">voor AI?</span>
                </h1>

                <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-10">
                  15 vragen over data, team, processen, ambitie en budget. Je krijgt een persoonlijke AI-Readiness Score met concrete vervolgstappen — specifiek voor jullie situatie.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {dimensions.slice(0, 3).map((d) => (
                    <div key={d.key} className="p-5 rounded-xl bg-lv-surface border border-lv-border-subtle text-left">
                      <div className="font-display text-sm font-700 text-lv-accent mb-2">{d.label}</div>
                      <div className="font-body text-xs text-lv-text-muted leading-relaxed">
                        {d.description}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStage('quiz')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Start de Assessment
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <p className="font-body text-xs text-lv-text-subtle mt-6">
                  Geen verplichting, geen verkoop-trechter. Je krijgt het rapport, en beslist zelf wat je ermee doet.
                </p>
              </div>
            </div>
          </section>
        )}

        {stage === 'quiz' && (
          <section className="relative min-h-[80vh] flex items-start pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                {/* Progress bar */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="font-body font-500 text-lv-text-muted">
                      Vraag {currentQuestion + 1} van {questions.length}
                    </span>
                    <span className="font-body font-600 text-lv-accent uppercase tracking-wider text-xs">
                      {q.dimension}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-lv-border-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-lv-accent transition-all duration-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text leading-[1.2] mb-8">
                  {q.question}
                </h2>
                {q.help && (
                  <p className="font-body text-base text-lv-text-muted leading-relaxed mb-8">
                    {q.help}
                  </p>
                )}

                {/* Options */}
                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => answerQuestion(opt.score)}
                        className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                          isSelected
                            ? 'bg-lv-accent/10 border-lv-accent/50 text-lv-text'
                            : 'bg-lv-surface border-lv-border-subtle text-lv-text-muted hover:border-lv-accent/30 hover:text-lv-text'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 ${
                              isSelected ? 'border-lv-accent bg-lv-accent' : 'border-lv-border'
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-lv-ink -m-0.5" />
                            )}
                          </div>
                          <span className="font-body text-base leading-relaxed">{opt.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Nav */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    onClick={goBack}
                    disabled={currentQuestion === 0}
                    className="inline-flex items-center gap-2 font-body text-sm text-lv-text-muted hover:text-lv-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Vorige
                  </button>
                  <span className="font-body text-xs text-lv-text-subtle">
                    Klik een antwoord om door te gaan
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {stage === 'email' && result && (
          <section className="relative min-h-[80vh] flex items-center py-20 md:py-24 pt-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <div className="p-8 md:p-12 rounded-3xl bg-lv-accent/[0.04] border border-lv-accent/20">
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mx-auto mb-5">
                      <Mail className="w-7 h-7 text-lv-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-4 leading-tight">
                      Jouw score is klaar
                    </h2>
                    <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                      Vul je gegevens in om het volledige rapport te ontvangen — ook per e-mail zodat je het kan delen.
                    </p>
                  </div>

                  <form onSubmit={submitEmail} className="space-y-4">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Voornaam Achternaam"
                      className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                      autoComplete="name"
                    />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Bedrijf (optioneel)"
                      className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                      autoComplete="organization"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="naam@bedrijf.nl"
                      className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                      autoComplete="email"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 disabled:opacity-60"
                    >
                      {submitting ? 'Bezig...' : 'Toon mijn rapport'}
                      {!submitting && <ArrowUpRight className="w-5 h-5" />}
                    </button>
                    <p className="font-body text-xs text-lv-text-subtle text-center">
                      Geen spam. Direct opzegbaar. Gewoon jouw rapport.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {stage === 'result' && result && (
          <section className="relative py-20 md:py-24 pt-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                {/* Score hero */}
                <div className="mb-10 text-center">
                  <div className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest mb-4">
                    Jouw AI-Readiness Score
                  </div>
                  <div
                    className="font-display text-7xl md:text-8xl font-700 mb-4 leading-none"
                    style={{ color: getLevelColor(result.readinessLevel) }}
                  >
                    {result.percentage}
                    <span className="text-4xl md:text-5xl">%</span>
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-2">
                    {result.readinessLevel}
                  </div>
                </div>

                {/* Dimensions breakdown */}
                <div className="mb-10 p-6 md:p-8 rounded-2xl bg-lv-surface border border-lv-border-subtle">
                  <h3 className="font-display text-lg font-700 text-lv-text mb-6">
                    Score per dimensie
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(result.byDimension).map(([dim, data]) => (
                      <div key={dim}>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="font-body text-sm font-600 text-lv-text">{dim}</span>
                          <span className="font-body text-xs text-lv-text-subtle">
                            {data.score}/{data.max} punten · {data.percentage}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-lv-border-subtle rounded-full overflow-hidden">
                          <div
                            className="h-full bg-lv-accent transition-all duration-700 rounded-full"
                            style={{ width: `${data.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="mb-10 p-6 md:p-8 rounded-2xl bg-lv-accent/[0.04] border border-lv-accent/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-lv-accent" />
                    <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                      Aanbevolen vervolg
                    </span>
                  </div>
                  <p className="font-body text-base md:text-lg text-lv-text leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>

                {/* CTA + restart */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                  >
                    Plan een gesprek
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <button
                    onClick={restart}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-lv-text-muted hover:text-lv-accent font-body font-500 text-base transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Opnieuw doen
                  </button>
                </div>

                <p className="font-body text-sm text-lv-text-subtle text-center mt-8">
                  We hebben je rapport ook naar {email} verzonden.
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

export default AiReadinessAssessment;
