import { Link } from "react-router-dom";
import { footerNav, contact, brand } from "@/content/site";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-lv-line bg-lv-paper px-5 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[14px] text-lv-muted">{brand.tagline}</p>
          <ul className="mt-5 space-y-1 text-[14px] text-lv-body">
            <li><a className="hover:text-lv-ink" href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a className="hover:text-lv-ink" href={contact.phoneHref}>{contact.phone}</a></li>
          </ul>
        </div>
        {footerNav.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-muted">{col.title}</p>
            <ul className="mt-4 space-y-2 text-[14px] text-lv-body">
              {col.links.map((l) => <li key={l.href}><Link className="hover:text-lv-ink" to={l.href}>{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
