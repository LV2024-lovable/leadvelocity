import React from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react';

const FooterNew = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-lv-border bg-lv-ink">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 512 512" aria-hidden="true" className="w-7 h-7 rounded-md flex-shrink-0">
                <rect width="512" height="512" rx="112" fill="#09090B" />
                <g fill="#C8FF00">
                  <path d="M 112 120 L 192 120 L 192 336 L 288 336 L 288 392 L 112 392 Z" />
                  <path d="M 296 120 L 360 120 L 392 272 L 424 120 L 488 120 L 424 392 L 360 392 Z" />
                </g>
              </svg>
              <span className="flex items-center gap-1">
                <span className="font-display text-xl font-700 text-lv-text">Lead</span>
                <span className="font-display text-xl font-700 text-lv-accent">velocity</span>
              </span>
            </div>
            <p className="font-body text-sm text-lv-text-muted leading-relaxed mb-2">
              Jouw AI operations partner.
            </p>
            <p className="font-body text-xs text-lv-text-subtle leading-relaxed">
              Diepe sector-expertise in groothandel, maakindustrie en transport.
            </p>
          </div>

          {/* Sectors */}
          <div>
            <div className="font-display text-sm font-700 text-lv-text mb-4">Sectoren</div>
            <ul className="space-y-2">
              <li>
                <a href="/groothandel" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Technische groothandel
                </a>
              </li>
              <li>
                <a href="/maakindustrie" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Maakindustrie
                </a>
              </li>
              <li>
                <a href="/transport" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Transport & logistiek
                </a>
              </li>
            </ul>
          </div>

          {/* Site */}
          <div>
            <div className="font-display text-sm font-700 text-lv-text mb-4">Leadvelocity</div>
            <ul className="space-y-2">
              <li>
                <a href="/#diensten" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Diensten
                </a>
              </li>
              <li>
                <a href="/onze-aanpak" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Onze aanpak
                </a>
              </li>
              <li>
                <a href="/inzichten" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Inzichten
                </a>
              </li>
              <li>
                <a href="/over-ons" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Over ons
                </a>
              </li>
              <li>
                <a href="/veelgestelde-vragen" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Veelgestelde vragen
                </a>
              </li>
              <li>
                <a href="/#contact" className="font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-display text-sm font-700 text-lv-text mb-4">Contact</div>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@leadvelocity.nl" className="inline-flex items-center gap-2 font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  info@leadvelocity.nl
                </a>
              </li>
              <li>
                <a href="tel:+31625471528" className="inline-flex items-center gap-2 font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors">
                  <Phone className="w-4 h-4" />
                  +31 6 25 47 15 28
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/leadvelocity-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-lv-text-muted hover:text-lv-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-lv-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs text-lv-text-subtle">
            &copy; {year} Leadvelocity · Amsterdam, Nederland
          </span>
          <span className="font-body text-xs text-lv-text-subtle italic">
            AI-systemen die écht rendement leveren.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
