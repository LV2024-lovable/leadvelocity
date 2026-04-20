import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Sectoren', href: '#verticals' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Werkwijze', href: '#werkwijze' },
  { label: 'Over ons', href: '#over-ons' },
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
        <a href="/" className="flex items-center gap-1 group">
          <span className="font-display text-xl md:text-2xl font-700 tracking-tight text-lv-text">
            Lead
          </span>
          <span className="font-display text-xl md:text-2xl font-700 tracking-tight text-lv-accent">
            velocity
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-500 text-lv-text-muted hover:text-lv-text transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lv-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg hover:bg-lv-accent/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
        >
          Gratis AI-Scan
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
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-lg font-600 text-lv-text-muted hover:text-lv-accent transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg mt-2"
            >
              Gratis AI-Scan
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarNew;
