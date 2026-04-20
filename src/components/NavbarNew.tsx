import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, Package, Factory, Truck } from 'lucide-react';

type NavItem =
  | { label: string; href: string; type: 'link' }
  | { label: string; type: 'dropdown'; items: { label: string; href: string; description: string; icon: React.ElementType }[] };

const navItems: NavItem[] = [
  {
    label: 'Sectoren',
    type: 'dropdown',
    items: [
      {
        label: 'Technische groothandel',
        href: '/groothandel',
        description: 'AI-pricing, inkoopvoorspelling, pipeline',
        icon: Package,
      },
      {
        label: 'Maakindustrie',
        href: '/maakindustrie',
        description: 'Predictive maintenance, OEE, kwaliteit',
        icon: Factory,
      },
      {
        label: 'Transport & logistiek',
        href: '/transport',
        description: 'Routes, tachograaf, CSRD, fuel',
        icon: Truck,
      },
    ],
  },
  { label: 'Diensten', href: '/#diensten', type: 'link' },
  { label: 'Werkwijze', href: '/#werkwijze', type: 'link' },
  { label: 'Over ons', href: '/#over-ons', type: 'link' },
];

const NavbarNew = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSectorOpen, setMobileSectorOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDropdownOpen(true);
  }, []);

  const scheduleCloseDropdown = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
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
          {navItems.map((item) =>
            item.type === 'link' ? (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-sm font-500 text-lv-text-muted hover:text-lv-text transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lv-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <div
                key={item.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleCloseDropdown}
              >
                <button
                  onClick={() => (dropdownOpen ? setDropdownOpen(false) : openDropdown())}
                  className="inline-flex items-center gap-1 font-body text-sm font-500 text-lv-text-muted hover:text-lv-text transition-colors duration-200 relative group"
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-lv-accent transition-all duration-300 group-hover:w-full" />
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 animate-fade-in"
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <div className="w-80 bg-lv-surface border border-lv-border rounded-xl shadow-2xl p-2">
                      {item.items.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <a
                            key={sub.href}
                            href={sub.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-lv-surface-raised transition-colors group/item"
                          >
                            <div className="w-9 h-9 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4 text-lv-accent" />
                            </div>
                            <div className="flex-1">
                              <div className="font-display text-sm font-700 text-lv-text group-hover/item:text-lv-accent transition-colors">
                                {sub.label}
                              </div>
                              <div className="font-body text-xs text-lv-text-subtle leading-snug mt-0.5">
                                {sub.description}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* CTA Button */}
        <a
          href="/#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg hover:bg-lv-accent/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]"
        >
          Plan een gesprek
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
            {navItems.map((item) =>
              item.type === 'link' ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-lg font-600 text-lv-text-muted hover:text-lv-accent transition-colors py-3"
                >
                  {item.label}
                </a>
              ) : (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileSectorOpen((v) => !v)}
                    className="w-full flex items-center justify-between font-display text-lg font-600 text-lv-text-muted hover:text-lv-accent transition-colors py-3"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${mobileSectorOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileSectorOpen && (
                    <div className="pl-4 flex flex-col gap-1 mb-2">
                      {item.items.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 py-2.5 text-lv-text-muted hover:text-lv-accent transition-colors"
                          >
                            <Icon className="w-4 h-4 text-lv-accent" />
                            <span className="font-body text-base">{sub.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            )}
            <a
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg mt-4"
            >
              Plan een gesprek
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarNew;
