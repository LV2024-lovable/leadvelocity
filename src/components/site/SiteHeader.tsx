import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { mainNav, brand, ctaLabels } from "@/content/site";
import { checkHref } from "@/lib/cta";
import { CtaLink } from "./CtaLink";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-[22px] font-normal text-lv-ink" aria-label={`${brand.name} — home`}>
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-lv-lime ring-1 ring-black/10" />
      {brand.name}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-lv-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <div className="lg:flex-1"><Logo /></div>
        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-7 text-[15px] text-lv-body lg:flex">
          {mainNav.map((l) => (
            <NavLink key={l.href} to={l.href} className={({ isActive }) => cn("hover:text-lv-ink", isActive && "text-lv-ink")}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-2 lg:flex-1">
          <CtaLink to={checkHref({ source: "header" })} ctaId="header" className="hidden px-4 py-2 text-[14px] sm:inline-flex" arrow={false}>
            {ctaLabels.short}
          </CtaLink>
          <button type="button" className="rounded-lg p-2 lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Menu sluiten" : "Menu openen"} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobiele navigatie" className="border-t border-lv-line bg-lv-paper px-5 pb-5 lg:hidden">
          <ul className="flex flex-col py-2 text-[16px]">
            {mainNav.map((l) => (
              <li key={l.href}><Link to={l.href} className="block py-3" onClick={() => setOpen(false)}>{l.label}</Link></li>
            ))}
            <li><Link to="/over" className="block py-3" onClick={() => setOpen(false)}>Over</Link></li>
          </ul>
          <CtaLink to={checkHref({ source: "header" })} ctaId="header-mobile" className="w-full">{ctaLabels.primary}</CtaLink>
        </nav>
      )}
    </header>
  );
}
