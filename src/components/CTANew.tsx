import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import ContactForm from './ContactForm';

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

          <div className="relative z-10 p-8 md:p-14 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
              {/* Left: Pitch + form */}
              <div className="lg:col-span-3">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-12 bg-lv-accent" />
                    <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                      Contact
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-5 leading-[1.1]">
                    Laat ons eens{' '}
                    <span className="text-gradient-accent">meekijken</span>.
                  </h2>
                  <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed max-w-lg">
                    Vertel kort waar jullie staan en we komen binnen één werkdag terug met een eerste reactie. Geen verkooppraatje.
                  </p>
                </div>

                <ContactForm sourceHint="Leadvelocity.nl · Contact sectie" />
              </div>

              {/* Right: Contact details */}
              <div className="lg:col-span-2 flex flex-col justify-start gap-5">
                <div className="p-6 rounded-xl border border-lv-border-subtle bg-lv-ink">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-lv-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body text-xs text-lv-text-subtle mb-1 uppercase tracking-wider font-600">
                        E-mail
                      </div>
                      <a href="mailto:info@leadvelocity.nl" className="font-body text-base text-lv-text hover:text-lv-accent transition-colors break-all">
                        info@leadvelocity.nl
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-lv-border-subtle bg-lv-ink">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-lv-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="font-body text-xs text-lv-text-subtle mb-1 uppercase tracking-wider font-600">
                        Telefoon
                      </div>
                      <a href="tel:+31625471528" className="font-body text-base text-lv-text hover:text-lv-accent transition-colors">
                        +31 6 25 47 15 28
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-lv-border-subtle bg-lv-ink">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-5 h-5 text-lv-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body text-xs text-lv-text-subtle mb-1 uppercase tracking-wider font-600">
                        LinkedIn
                      </div>
                      <a
                        href="https://www.linkedin.com/company/leadvelocity-2/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-base text-lv-text hover:text-lv-accent transition-colors"
                      >
                        linkedin.com/company/leadvelocity
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-lv-border-subtle bg-lv-ink">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-lv-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="font-body text-xs text-lv-text-subtle mb-1 uppercase tracking-wider font-600">
                        Locatie
                      </div>
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
      </div>
    </section>
  );
};

export default CTANew;
