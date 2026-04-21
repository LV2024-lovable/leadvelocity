import React, { useEffect } from 'react';
import {
  ArrowUpRight,
  Check,
  Clock,
  FileText,
  Sparkles,
  Phone,
  Calendar,
  ClipboardList,
  ChevronDown,
} from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import ContactForm from '../components/ContactForm';
import { useReveal } from '../hooks/useReveal';

const whatYouGet = [
  {
    icon: Clock,
    title: '60 minuten intake + team-interviews',
    description:
      'Een direct gesprek met de mensen die ook bouwen — geen junior consultants die checklists afwerken. Aanvullend 2-4 korte interviews met directie en operationele leiding.',
  },
  {
    icon: Sparkles,
    title: 'Top-3 AI-kansen met impact-inschatting',
    description:
      'Niet "digitale transformatie" — drie specifieke AI-toepassingen die bij jullie operatie, sales of inkoop passen. Elke kans met realistische impact-inschatting op tijd, marge of capaciteit.',
  },
  {
    icon: FileText,
    title: 'Geschreven rapport binnen 5 werkdagen',
    description:
      'Een rapport van 2-3 pagina\'s met onze bevindingen, verwachte impact en prioritering. Geen deck, geen PowerPoint — iets wat je intern kan rondsturen.',
  },
];

const forWho = [
  'Je bent directeur, COO of CRO van een Nederlandse MKB-organisatie',
  'Je bedrijf zit ergens tussen €5M en €100M omzet',
  'Je weet dat AI speelt, maar je wilt geen vrijblijvende hype-verhalen',
  'Je hebt een concrete pijn: marge, tijd, leads, service of planning',
];

const faqs = [
  {
    q: 'Wat als de audit geen duidelijke kansen oplevert?',
    a: 'Dat kan voorkomen als jullie al heel ver zijn, of als AI niet de grootste hefboom is. In dat geval zeggen we dat expliciet in het rapport — dat is óók waardevol, omdat het jullie richting scherpt. Geen restitutie, wel eerlijkheid.',
  },
  {
    q: 'Moeten we gevoelige data delen?',
    a: 'Liefst niet meer dan nodig. De audit werkt op gesprek-input, niet op data-exports. We tekenen standaard een NDA voordat interviews starten.',
  },
  {
    q: 'Wie voert de audit uit?',
    a: 'Wij zelf. Geen uitbesteding, geen juniors. Wat we bouwen, hebben we ook zelf gebouwd — je spreekt direct met de mensen die de analyse doen en straks eventueel de oplossing bouwen.',
  },
  {
    q: 'Hoeveel tijd kost het ons intern?',
    a: 'Kickoff (1 uur) + 2-4 interviews (30 min elk) + afsluitende presentatie (1 uur). Totaal ~4-5 uur per sleutelpersoon verdeeld over twee weken.',
  },
  {
    q: 'Wat gebeurt er na de audit?',
    a: 'Je krijgt het rapport. Je beslist zelf over vervolg. Als je wil dat we de eerste use-case bouwen, bespreken we een Pilot Build (6-8 weken, vanaf €12.000). Maar niets is verplicht.',
  },
  {
    q: 'Kunnen we sector-specifiek starten?',
    a: 'Ja. We hebben diepe praktijk-ervaring in technische groothandel, maakindustrie en transport & logistiek. De audit sluit aan op jullie context, niet op een generieke template.',
  },
];

const AiOpsAudit = () => {
  const heroRef = useReveal();
  const deliverablesRef = useReveal();
  const timelineRef = useReveal();
  const forWhoRef = useReveal();
  const priceRef = useReveal();
  const faqRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => {
    document.title = 'AI Ops Audit — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Betaalde AI-audit voor NL MKB. €2.500, 2 weken, geschreven rapport met top-3 AI-kansen. Geen verplicht vervolg — je beslist zelf.',
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
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
                  Betaalde intake · 2 weken · vaste prijs
                </span>
              </div>

              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-700 text-lv-text leading-[1.05] tracking-tight mb-8">
                Weet waar AI voor jouw bedrijf{' '}
                <span className="text-gradient-accent">het meeste oplevert</span>
                {' '}— in 2 weken.
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
                60 minuten met ons, interviews met jouw team, een geschreven rapport met de top-3 AI-kansen én realistische impact-inschatting. Geen verkooppraatje, geen verplicht vervolg.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#plan"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Plan een intake
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
        </section>

        {/* WHAT YOU GET */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div ref={deliverablesRef} className="reveal container mx-auto px-4 md:px-6">
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
                  <span className="text-lv-text-muted">
                    Een concrete AI-routekaart voor jouw bedrijf.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whatYouGet.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-6 md:p-8 rounded-2xl bg-lv-ink border border-lv-border-subtle"
                    >
                      <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-lv-accent" />
                      </div>
                      <h3 className="font-display text-xl font-700 text-lv-text mb-3 leading-tight">
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

        {/* TIMELINE */}
        <section className="section-padding relative">
          <div ref={timelineRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-14 max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-lv-accent" />
                  <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                    Hoe het werkt
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1]">
                  Twee weken. Vaste cadans.{' '}
                  <span className="text-lv-text-muted">Geen gerekte consultancy-trajecten.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Week 1 */}
                <div className="relative p-7 md:p-9 rounded-2xl bg-lv-surface border border-lv-border-subtle">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-lv-accent" />
                    </div>
                    <div className="font-display text-xs font-700 text-lv-accent uppercase tracking-widest">
                      Week 1 · Intake + interviews
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-base text-lv-text-muted leading-relaxed">
                        <span className="text-lv-text font-500">Kickoff-gesprek</span> (60 min, online of fysiek) met directie en de persoon die deze audit aanvraagt.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-base text-lv-text-muted leading-relaxed">
                        <span className="text-lv-text font-500">2-4 aanvullende interviews</span> (30 min elk) met operationele leiding.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-base text-lv-text-muted leading-relaxed">
                        Wij spreken met wie jij aanwijst — sales, ops, klantenservice, finance.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Week 2 */}
                <div className="relative p-7 md:p-9 rounded-2xl bg-lv-accent/[0.04] border border-lv-accent/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center">
                      <ClipboardList className="w-6 h-6 text-lv-accent" />
                    </div>
                    <div className="font-display text-xs font-700 text-lv-accent uppercase tracking-widest">
                      Week 2 · Analyse + rapport
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-base text-lv-text-muted leading-relaxed">
                        Wij <span className="text-lv-text font-500">analyseren de input</span> en toetsen aan wat we in jullie sector zien werken.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-base text-lv-text-muted leading-relaxed">
                        Het <span className="text-lv-text font-500">geschreven rapport</span> (2-3 p.) wordt uitgewerkt.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-base text-lv-text-muted leading-relaxed">
                        <span className="text-lv-text font-500">Afsluitende presentatie</span> (60 min) met uitkomsten + Q&A.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-lv-accent flex-shrink-0 mt-1.5" />
                      <span className="font-body text-base text-lv-text-muted leading-relaxed">
                        Rapport in je mail <span className="text-lv-text font-500">binnen 5 werkdagen</span> na de laatste sessie.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 p-6 md:p-7 rounded-xl bg-lv-surface-raised border border-lv-border-subtle">
                <p className="font-body text-base md:text-lg text-lv-text leading-relaxed">
                  <span className="text-lv-accent font-600">Einde:</span> rapport in handen. Jij beslist zelf over vervolg — bij ons, elders, of helemaal niet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOR WHO */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div ref={forWhoRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-lv-accent" />
                  <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                    Voor wie
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-6 leading-[1.1]">
                  Deze audit is voor jou als…
                </h2>
                <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                  Wij nemen gericht bedrijven aan — niet uit exclusiviteit, maar omdat een audit het best werkt wanneer het profiel klopt. Herken je jezelf hierin?
                </p>
              </div>

              <div className="space-y-4">
                {forWho.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 p-5 rounded-xl bg-lv-ink border border-lv-border-subtle"
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

        {/* PRICE + CONDITIONS */}
        <section className="section-padding relative">
          <div ref={priceRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="p-8 md:p-10 rounded-2xl bg-lv-accent/[0.04] border border-lv-accent/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
                  <div>
                    <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest mb-2">
                      Prijs
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-700 text-lv-accent">
                      €2.500
                    </div>
                    <div className="font-body text-sm text-lv-text-muted mt-1">
                      Vast — geen verrassingen
                    </div>
                  </div>
                  <div className="md:border-l md:border-lv-border-subtle md:pl-8">
                    <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest mb-2">
                      Doorlooptijd
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-700 text-lv-text">
                      2 weken
                    </div>
                    <div className="font-body text-sm text-lv-text-muted mt-1">
                      Van kickoff tot rapport
                    </div>
                  </div>
                  <div className="md:border-l md:border-lv-border-subtle md:pl-8">
                    <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest mb-2">
                      Vervolg
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-700 text-lv-text">
                      Jij kiest
                    </div>
                    <div className="font-body text-sm text-lv-text-muted mt-1">
                      Geen verplicht vervolg
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-lv-border-subtle">
                  <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed italic">
                    Ook als je besluit daarna met een andere partij verder te gaan, is de audit van waarde — je hebt een rapport in handen dat je intern kan gebruiken om de volgende stap scherp te krijgen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div ref={faqRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-12 bg-lv-accent" />
                  <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                    Veelgestelde vragen
                  </span>
                  <div className="h-px w-12 bg-lv-accent" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Wat je misschien nog wilt weten.
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl bg-lv-ink border border-lv-border-subtle overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer list-none font-display text-base md:text-lg font-600 text-lv-text hover:text-lv-accent transition-colors">
                      <span>{item.q}</span>
                      <ChevronDown className="w-5 h-5 text-lv-text-subtle flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA / INTAKE */}
        <section id="plan" className="section-padding relative">
          <div ref={ctaRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-14 rounded-3xl bg-lv-accent/[0.04] border border-lv-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lv-accent/[0.06] rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-5 leading-[1.1]">
                      Plan je AI Ops Audit.
                    </h2>
                    <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-2xl mx-auto">
                      Vul in waar jullie tegenaan lopen. We reageren binnen één werkdag met een voorstel voor een kickoff-gesprek. Liever bellen?{' '}
                      <a
                        href="tel:+31625471528"
                        className="text-lv-accent hover:underline font-500 inline-flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        +31 6 25 47 15 28
                      </a>
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <ContactForm sourceHint="Leadvelocity.nl · /ai-ops-audit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default AiOpsAudit;
