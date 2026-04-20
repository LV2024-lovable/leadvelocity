import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const CTANew = () => {
  const ref = useReveal();

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={ref}
          className="reveal relative rounded-3xl bg-lv-surface border border-lv-border overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lv-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lv-accent/[0.02] rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 p-8 md:p-16 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: CTA text */}
              <div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text mb-6 leading-[1.1]">
                  Laat ons eens{' '}
                  <span className="text-gradient-accent">meekijken</span>.
                </h2>
                <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-10 max-w-lg">
                  Plan een vrijblijvend gesprek. We brengen samen in kaart waar AI voor jullie het meeste oplevert — binnen sales, inkoop, operatie of klantenservice. Geen verkooppraatje, wel een eerlijk gesprek.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <a
                    href="mailto:info@leadvelocity.nl?subject=Kennismakingsgesprek"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                  >
                    Plan een gesprek
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="tel:+31625471528"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                  >
                    Of bel direct
                  </a>
                </div>
              </div>

              {/* Right: Contact details */}
              <div className="flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-lv-accent" />
                  </div>
                  <div>
                    <div className="font-body text-sm text-lv-text-subtle mb-1">E-mail</div>
                    <a href="mailto:info@leadvelocity.nl" className="font-body text-base text-lv-text hover:text-lv-accent transition-colors">
                      info@leadvelocity.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-lv-accent" />
                  </div>
                  <div>
                    <div className="font-body text-sm text-lv-text-subtle mb-1">Telefoon</div>
                    <a href="tel:+31625471528" className="font-body text-base text-lv-text hover:text-lv-accent transition-colors">
                      +31 6 25 47 15 28
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-5 h-5 text-lv-accent" />
                  </div>
                  <div>
                    <div className="font-body text-sm text-lv-text-subtle mb-1">LinkedIn</div>
                    <a href="https://www.linkedin.com/company/leadvelocity" target="_blank" rel="noopener noreferrer" className="font-body text-base text-lv-text hover:text-lv-accent transition-colors">
                      linkedin.com/company/leadvelocity
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-lv-accent" />
                  </div>
                  <div>
                    <div className="font-body text-sm text-lv-text-subtle mb-1">Locatie</div>
                    <span className="font-body text-base text-lv-text">
                      Amsterdam · Actief door NL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTANew;
