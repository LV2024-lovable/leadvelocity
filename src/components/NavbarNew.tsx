import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Aanpak', href: '/onze-aanpak' },
  { label: 'Over', href: '/over-ons' },
  { label: 'Contact', href: '/#contact' },
];

const NavbarNew = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-lv-ink/90 backdrop-blur-xl border-b border-lv-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group" aria-label="Leadvelocity home">
          <svg
            viewBox="0 0 512 512"
            aria-hidden="true"
            className="w-7 h-7 md:w-8 md:h-8 rounded-md"
          >
            <rect width="512" height="512" rx="112" fill="#09090B" />
            <g fill="#C8FF00">
              <path d="M 112 120 L 192 120 L 192 336 L 288 336 L 288 392 L 112 392 Z" />
              <path d="M 296 120 L 360 120 L 392 272 L 424 120 L 488 120 L 424 392 L 360 392 Z" />
            </g>
          </svg>
          <span className="flex items-center gap-1">
            <span className="font-display text-xl md:text-2xl font-700 tracking-tight text-lv-text">
              Lead
            </span>
            <span className="font-display text-xl md:text-2xl font-700 tracking-tight text-lv-accent">
              velocity
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm font-500 text-lv-text-muted hover:text-lv-text transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lv-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="/#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg hover:bg-lv-accent/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
        >
          Gratis audit aanvragen
          <ArrowUpRight className="w-4 h-4" />
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-lv-text"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-lv-ink/95 backdrop-blur-xl border-b border-lv-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-lg font-600 text-lv-text-muted hover:text-lv-accent transition-colors py-3"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg mt-4"
            >
              Gratis audit aanvragen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarNew;
