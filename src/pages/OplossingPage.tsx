import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Phone,
  Sparkles,
} from "lucide-react";
import NavbarNew from "../components/NavbarNew";
import FooterNew from "../components/FooterNew";
import ContactForm from "../components/ContactForm";
import { useReveal } from "../hooks/useReveal";
import { oplossingen, oplossingenList, OplossingSlug } from "../data/oplossingen";

const OplossingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const heroRef = useReveal();
  const whatRef = useReveal();
  const sectorsRef = useReveal();
  const howRef = useReveal();
  const faqRef = useReveal();
  const ctaRef = useReveal();

  const data = slug ? oplossingen[slug as OplossingSlug] : undefined;

  useEffect(() => {
    if (!data) return;
    document.title = data.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", data.metaDescription);
  }, [data]);

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const Icon = data.icon;

  // Pick 2 cross-link suggestions (other oplossingen)
  const crossLinks = oplossingenList.filter((o) => o.slug !== data.slug).slice(0, 2);

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
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-accent/[0.05] mb-8">
                <Icon className="w-4 h-4 text-lv-accent" />
                <span className="font-body text-sm font-500 text-lv-accent">
                  {data.pillBadge}
                </span>
              </div>

              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-700 text-lv-text leading-[1.05] tracking-tight mb-8">
                {data.heroH1}{" "}
                <span className="text-gradient-accent">{data.heroH1Accent}</span>
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-10 max-w-3xl">
                {data.heroSub}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/ai-ops-audit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Plan een AI Ops Audit
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#wat-het-doet"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Lees verder
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WAT HET IS */}
        <section
          id="wat-het-doet"
          className="section-padding relative bg-lv-surface"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div ref={whatRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Hoe dit werkt
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  {data.whatTitle}
                </h2>
              </div>

              <div className="space-y-5">
                {data.whatBody.map((p, i) => (
                  <p
                    key={i}
                    className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTOR EXAMPLES */}
        <section className="section-padding relative">
          <div ref={sectorsRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Voor jullie sector
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Drie concrete voorbeelden — per sector.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {data.sectorExamples.map((ex) => (
                  <div
                    key={ex.sector}
                    className="p-7 rounded-2xl bg-lv-surface border border-lv-border-subtle"
                  >
                    <div className="font-display text-xs font-700 text-lv-accent uppercase tracking-widest mb-3">
                      {ex.sector}
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-700 text-lv-text mb-3 leading-tight">
                      {ex.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                      {ex.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE BUILD */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div ref={howRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Werkwijze + investering
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-6 leading-[1.1]">
                  Hoe we dit bouwen.
                </h2>
                <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed mb-6">
                  {data.investmentLine}
                </p>
                <a
                  href="/ai-ops-audit"
                  className="inline-flex items-center gap-2 font-display text-sm font-600 text-lv-accent hover:underline"
                >
                  Bekijk de AI Ops Audit
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <ul className="space-y-4">
                {data.howItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-lv-ink border border-lv-border-subtle"
                  >
                    <div className="w-8 h-8 rounded-lg bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-lv-accent" />
                    </div>
                    <p className="font-body text-base text-lv-text leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding relative">
          <div ref={faqRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 text-center">
                <div className="flex items-center justify-center gap-3 mb-5">
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
                {data.faq.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl bg-lv-surface border border-lv-border-subtle overflow-hidden"
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

        {/* CROSS-LINKS naar andere oplossingen */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Andere oplossingen
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-700 text-lv-text leading-[1.1]">
                  Misschien past dit ook.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {crossLinks.map((cl) => {
                  const ClIcon = cl.icon;
                  return (
                    <a
                      key={cl.slug}
                      href={`/oplossingen/${cl.slug}`}
                      className="group p-7 rounded-2xl bg-lv-ink border border-lv-border-subtle hover:border-lv-accent/40 hover:bg-lv-accent/[0.03] transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                          <ClIcon className="w-6 h-6 text-lv-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-700 text-lv-text mb-2 leading-tight">
                            {cl.title}
                          </h3>
                          <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                            {cl.heroSub.split(".")[0]}.
                          </p>
                          <div className="mt-3 inline-flex items-center gap-2 font-display text-sm font-600 text-lv-text-muted group-hover:text-lv-accent transition-colors">
                            Bekijk
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="section-padding relative">
          <div ref={ctaRef} className="reveal container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-14 rounded-3xl bg-lv-accent/[0.04] border border-lv-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lv-accent/[0.06] rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/30 bg-lv-ink mb-6">
                      <Sparkles className="w-4 h-4 text-lv-accent" />
                      <span className="font-body text-sm font-500 text-lv-accent">
                        Volgende stap
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-5 leading-[1.1]">
                      Begin met een AI Ops Audit.
                    </h2>
                    <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-2xl mx-auto">
                      €2.500, 2 weken, geschreven rapport met de top-3
                      AI-kansen voor jullie operatie. Geen verplicht vervolg.
                      Liever bellen?{" "}
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
                    <ContactForm
                      sourceHint={`Leadvelocity.nl · /oplossingen/${data.slug}`}
                    />
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

export default OplossingPage;
