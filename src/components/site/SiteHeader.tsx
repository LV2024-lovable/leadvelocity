import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav, brand, ctaLabels, navAllAudiences, navAbout } from "@/content/site";
import { categories } from "@/content/categories";
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

/** Het eerste menupunt ("Voor wie") opent een dropdown met de doelgroepen; de rest zijn gewone links. */
const [audienceNav, ...otherNav] = mainNav;

function AudienceDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const isActive = pathname === audienceNav.href || categories.some((c) => pathname === `/${c.id}`);

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <li
      ref={wrapRef}
      className="relative"
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="nav-voor-wie"
        onClick={() => setOpen((o) => !o)}
        className={cn("inline-flex items-center gap-1 hover:text-lv-ink", (open || isActive) && "text-lv-ink")}
      >
        {audienceNav.label}
        <ChevronDown aria-hidden className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      <div id="nav-voor-wie" data-nav-dropdown hidden={!open} className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 rounded-[18px] bg-white p-2 shadow-lg ring-1 ring-lv-line">
        <ul>
          {categories.map((c) => (
            <li key={c.id}>
              <Link to={`/${c.id}`} onClick={close} className="block rounded-[10px] px-3 py-2 text-lv-ink hover:bg-lv-card">{c.name}</Link>
            </li>
          ))}
          <li className="mt-1 border-t border-lv-line pt-1">
            <Link to={audienceNav.href} onClick={close} className="block rounded-[10px] px-3 py-2 hover:bg-lv-card">{navAllAudiences}</Link>
          </li>
        </ul>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeMobile = () => setOpen(false);
  return (
    <header className="sticky top-0 z-40 bg-lv-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <div className="lg:flex-1"><Logo /></div>
        <nav aria-label="Hoofdnavigatie" className="hidden text-[15px] text-lv-body lg:block">
          <ul className="flex items-center gap-7">
            <AudienceDropdown />
            {otherNav.map((l) => (
              <li key={l.href}>
                <NavLink to={l.href} className={({ isActive }) => cn("hover:text-lv-ink", isActive && "text-lv-ink")}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
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
        <nav id="mobile-nav" aria-label="Mobiele navigatie" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-lv-line bg-lv-paper px-5 pb-5 lg:hidden">
          <p className="pt-3 text-[13px] text-lv-muted">{audienceNav.label}</p>
          <ul className="flex flex-col pb-2 pl-4 text-[16px]">
            {categories.map((c) => (
              <li key={c.id}><Link to={`/${c.id}`} className="block py-2.5" onClick={closeMobile}>{c.name}</Link></li>
            ))}
            <li><Link to={audienceNav.href} className="block py-2.5 text-lv-body" onClick={closeMobile}>{navAllAudiences}</Link></li>
          </ul>
          <ul className="flex flex-col border-t border-lv-line py-2 text-[16px]">
            {[...otherNav, navAbout].map((l) => (
              <li key={l.href}><Link to={l.href} className="block py-3" onClick={closeMobile}>{l.label}</Link></li>
            ))}
          </ul>
          <CtaLink to={checkHref({ source: "header" })} ctaId="header-mobile" className="w-full">{ctaLabels.primary}</CtaLink>
        </nav>
      )}
    </header>
  );
}
