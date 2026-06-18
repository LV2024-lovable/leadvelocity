import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Loader2, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { useReveal } from '../hooks/useReveal';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sectorOptions = [
  'Technische groothandel',
  'Maakindustrie',
  'Transport & logistiek',
  'Anders',
];

const AiKansenscan: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useReveal();
  const formRef = useReveal(0.05);

  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [sector, setSector] = useState(sectorOptions[0]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'AI-kansenscan — gratis & geautomatiseerd | Leadvelocity';
    const meta = document.querySelector('meta[name="description"]');
    const content =
      'Gratis, geautomatiseerde AI-kansenscan: vul bedrijfsnaam, e-mail, website en sector in en ontvang 3 concrete AI-kansen voor jullie operatie. Een signaal, geen volledige audit.';
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      el.setAttribute('content', content);
      document.head.appendChild(el);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !email.trim() || !websiteUrl.trim()) {
      toast.error('Vul bedrijfsnaam, e-mail en website-URL in.');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Dat lijkt geen geldig e-mailadres.');
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('opportunity-scan', {
        body: {
          companyName: companyName.trim(),
          email: email.trim(),
          websiteUrl: websiteUrl.trim(),
          sector,
        },
      });

      if (error) throw error;
      if (!data?.opportunities) {
        throw new Error('Geen resultaat ontvangen.');
      }

      // NB: de opportunity-scan Edge Function verstuurt zelf de inhoudelijke
      // rapport-mail (met de 3 kansen + 'Wat dit rapport niet is'). We sturen
      // hier dus bewust GEEN tweede mail via triggerAutoRespond.

      const payload = {
        opportunities: data.opportunities,
        companyName: companyName.trim(),
        email: email.trim(),
        sector,
      };

      try {
        sessionStorage.setItem('lv_kansenscan_result', JSON.stringify(payload));
      } catch {
        // sessionStorage kan falen (private mode) — niet blokkeren.
      }

      navigate('/ai-kansenscan/resultaat', { state: payload });
    } catch (err) {
      console.error('Kansenscan error:', err);
      toast.error(
        'Er ging iets mis bij het scannen. Probeer het nog eens, of mail info@leadvelocity.nl.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50 focus:ring-1 focus:ring-lv-accent/20 transition-colors';
  const labelBase =
    'block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2';

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div ref={heroRef} className="reveal text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lv-accent/[0.08] border border-lv-accent/30 mb-6">
              <Sparkles className="w-4 h-4 text-lv-accent" />
              <span className="font-body text-sm font-600 text-lv-accent">
                Gratis · geautomatiseerd
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-700 text-lv-text leading-tight mb-5">
              De AI-kansenscan voor{' '}
              <span className="text-lv-accent">jullie operatie</span>
            </h1>
            <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-xl mx-auto">
              Vul jullie bedrijfsnaam, website en sector in. Wij bekijken jullie
              site en sector en geven binnen een minuut drie concrete AI-kansen —
              gekoppeld aan het type systeem dat erbij past.
            </p>
            <p className="font-body text-sm text-lv-text-subtle mt-4 max-w-lg mx-auto">
              Dit is een signaal, geen volledige audit. De scan wijst richting aan;
              de diepe analyse loopt via onze AI Ops Audit.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-sm font-body text-lv-text-subtle">
              <span className="inline-flex items-center gap-2">
                <Zap className="w-4 h-4 text-lv-accent" /> Binnen een minuut
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-lv-accent" /> Geen
                verkooppraatje
              </span>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="reveal p-7 md:p-9 rounded-2xl bg-lv-surface border border-lv-border space-y-5"
          >
            <div>
              <label htmlFor="company" className={labelBase}>
                Bedrijfsnaam *
              </label>
              <input
                id="company"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Bedrijfsnaam"
                className={inputBase}
                autoComplete="organization"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className={labelBase}>
                  Zakelijke e-mail *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@bedrijf.nl"
                  className={inputBase}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="sector" className={labelBase}>
                  Sector
                </label>
                <select
                  id="sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className={inputBase}
                >
                  {sectorOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="website" className={labelBase}>
                Website-URL *
              </label>
              <input
                id="website"
                type="text"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="bedrijf.nl"
                className={inputBase}
                autoComplete="url"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Wij scannen jullie operatie...
                </>
              ) : (
                <>
                  Start de kansenscan
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>

            <p className="font-body text-xs text-lv-text-subtle leading-relaxed">
              Het scannen kan een paar seconden duren — wij lezen jullie website en
              stellen de kansen samen. Je ontvangt het rapport ook per e-mail.
            </p>
          </form>
        </div>
      </main>

      <FooterNew />
    </div>
  );
};

export default AiKansenscan;
