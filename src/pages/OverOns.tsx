import React, { useEffect } from 'react';
import { ArrowUpRight, Users, Gauge, Shield, Compass, Clock, CheckCircle2 } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import TrustBars from '../components/TrustBars';
import { useReveal } from '../hooks/useReveal';

const values = [
  {
    icon: Gauge,
    title: 'Commerciële én operationele DNA.',
    description:
      'We komen uit sales en lead generation én uit operations, finance en inkoop. Geen AI-bureau dat alleen kan bouwen, maar niet snapt hoe jouw pipeline, inkoop of productie écht werkt — wij snappen beide kanten van het huis.',
  },
  {
    icon: Users,
    title: 'Direct contact. Geen handovers.',
    description:
      'Je praat met dezelfde mensen die je systeem bouwen. Geen junior account-managers, geen vertalen van eisen tussen lagen. Beslissingen binnen een uur, niet binnen een stuurgroep-cyclus van drie weken.',
  },
  {
    icon: Shield,
    title: 'Wij eten ons eigen hondenvoer.',
    description:
      'Elke workflow die we jou verkopen — outbound, onboarding, rapportage, facturatie — draaien we bij onszelf AI-geautomatiseerd. Wij zijn onze eigen eerste case study. Als het bij ons niet werkt, vertellen we het je voordat je betaalt.',
  },
  {
    icon: Compass,
    title: 'Sector-expertise, niet generiek.',
    description:
      'We richten ons op drie sectoren waar we diep van uitzoeken: technische groothandel, maakindustrie en transport. De benchmarks, het jargon en de pijnpunten kennen we — daardoor hoef je ons niet alles uit te leggen.',
  },
  {
    icon: Clock,
    title: 'Meetbaar in één kwartaal.',
    description:
      'We beloven geen "transformatie in 3 jaar". We werken in concrete stappen: eerste resultaat in het eerste kwartaal, anders herzien we scope. Geen vendor lock-in, geen hidden fees, geen 18-maanden-project dat stilvalt.',
  },
  {
    icon: CheckCircle2,
    title: 'Eerlijk over wat AI wél en niet kan.',
    description:
      'Je hoort geen hype-verhalen. We zeggen wat bewezen werkt, wat marginaal rendeert en wat nog niet productie-klaar is. Dat scheelt je maanden verkeerd gerichte investering.',
  },
];

const principles = [
  {
    title: 'We automatiseren de stomme helft.',
    body:
      'AI is geen vervanging voor vakmanschap — het is vervanging voor het saaie, repetitieve werk dat uw mensen leeg maakt. Offertes overtypen, catalogus-data invullen, routine-e-mails schrijven. Die helft automatiseren we, zodat uw team tijd heeft voor het echte werk: klantcontact, onderhandeling, probleemoplossing.',
  },
  {
    title: 'We bouwen naast uw systeem, niet erin.',
    body:
      'Geen ERP-vervanging, geen MES-rip-and-replace. Onze AI-laag leest uit uw bestaande systemen (SAP, AFAS, Isah, Transpas) en werkt ernaast. Eerst bewijzen dat het werkt, daarna beslist u of we ook schrijven-integratie bouwen. Dat houdt risico laag en vertrouwen hoog.',
  },
  {
    title: 'We starten klein om groot te winnen.',
    body:
      'Grote AI-projecten mislukken (50% van GenAI-PoCs wordt gestaakt — Gartner 2024). Kleine, gerichte AI-implementaties rendeer je structureel. Wij starten daarom altijd met één use-case, één KPI, één eigenaar binnen uw team. Als dat werkt, schalen we. Als niet, stoppen we zonder drama.',
  },
];

const OverOns = () => {
  const heroRef = useReveal();
  const beliefRef = useReveal();
  const principlesRef = useReveal();
  const valuesHeaderRef = useReveal();

  useEffect(() => {
    document.title = 'Over Ons — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Leadvelocity is de AI Operations Partner voor het Nederlandse MKB. Wie wij zijn, waar we in geloven en hoe we werken.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-24 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                <span className="font-body text-sm font-500 text-lv-accent">
                  Over Leadvelocity
                </span>
              </div>

              <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-700 text-lv-text leading-[1.05] tracking-tight mb-8">
                AI vervangt geen goede mensen.{' '}
                <span className="text-gradient-accent">
                  Maar wél bedrijven die blijven stilstaan.
                </span>
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed max-w-2xl">
                Wij bouwen AI-systemen voor Nederlandse MKB-bedrijven die vooruit willen. Geen consultancy, geen hype-verhalen — wel concrete oplossingen met meetbaar resultaat binnen één kwartaal.
              </p>
            </div>
          </div>
        </section>

        {/* TRUST BARS */}
        <TrustBars variant="compact" className="border-t border-lv-border-subtle" />

        {/* KERN-OVERTUIGING */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div className="container mx-auto px-4 md:px-6">
            <div ref={beliefRef} className="reveal max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Wat we geloven
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-10 leading-[1.1]">
                Onze overtuiging in drie alinea's.
              </h2>

              <div className="space-y-8">
                <p className="font-body text-lg md:text-xl text-lv-text leading-relaxed">
                  AI is niet een technologie-revolutie die bedrijven overneemt. Het is een set bouwblokken die goede mensen sneller, slimmer en minder gefrustreerd laat werken. Vakmanschap, klantrelaties, probleemoplossing — dat blijven menselijke kwaliteiten. Wat AI wegneemt is het saaie, repetitieve werk dat teams nu leeg maakt.
                </p>

                <p className="font-body text-lg md:text-xl text-lv-text leading-relaxed">
                  Tegelijk: bedrijven die AI níet serieus inzetten, worden ingehaald. Niet door AI zelf — door concurrenten die AI wél hebben omarmd. Amazon Business pakt marge van de groothandel. Concurrenten met AI-planning rijden efficiëntere routes. Maakbedrijven met AI-kwaliteitscontrole winnen klanten op betrouwbaarheid.
                </p>

                <p className="font-body text-lg md:text-xl text-lv-text leading-relaxed">
                  De vraag is dus niet óf AI jouw bedrijf verandert. De vraag is: <span className="text-lv-accent font-700">ben jij degene die ermee bouwt, of degene die wordt ingehaald?</span> Daar komen wij in beeld.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={principlesRef} className="reveal max-w-4xl mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Onze werkprincipes
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1]">
                Hoe wij denken over AI en implementatie.
              </h2>
            </div>

            <div className="max-w-4xl space-y-10 md:space-y-12">
              {principles.map((p, i) => {
                const pRef = useReveal(i * 0.08);
                return (
                  <div key={p.title} ref={pRef} className="reveal border-l-2 border-lv-accent/40 pl-6 md:pl-8">
                    <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-4 leading-tight">
                      {p.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* VALUES / WHY US */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div className="container mx-auto px-4 md:px-6">
            <div ref={valuesHeaderRef} className="reveal mb-14 md:mb-16 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Waarom Leadvelocity
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1]">
                Zes redenen waarom MKB-bedrijven voor ons kiezen.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {values.map((value, i) => {
                const vRef = useReveal(i * 0.06);
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    ref={vRef}
                    className="reveal p-6 md:p-8 rounded-2xl bg-lv-ink border border-lv-border-subtle hover:border-lv-accent/20 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-lv-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg md:text-xl font-700 text-lv-text mb-3">
                          {value.title}
                        </h3>
                        <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                Klinkt dit als mensen waar je mee wilt werken?
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-10">
                Plan een vrijblijvend gesprek. We kijken samen waar AI voor jullie het meeste oplevert — concreet, meetbaar, zonder verkooppraatje.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Plan een gesprek
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="/onze-aanpak"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Bekijk onze aanpak
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default OverOns;
