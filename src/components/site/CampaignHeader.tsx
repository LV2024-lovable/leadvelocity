import { Link } from "react-router-dom";
import { contact } from "@/content/site";
import { Logo } from "./SiteHeader";
import { CtaLink } from "./CtaLink";

export function CampaignHeader({ ctaHref, ctaLabel, ctaId }: { ctaHref: string; ctaLabel: string; ctaId: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-lv-line/70 bg-lv-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Logo />
        <CtaLink to={ctaHref} ctaId={ctaId} className="px-4 py-2 text-[14px]" arrow={false}>{ctaLabel}</CtaLink>
      </div>
    </header>
  );
}

export function CampaignFooter() {
  return (
    <footer className="border-t border-lv-line px-5 py-8 text-[14px] text-lv-body sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
        <a href={`mailto:${contact.email}`} className="hover:text-lv-ink">{contact.email}</a>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:text-lv-ink">Privacy</Link>
          <Link to="/" className="hover:text-lv-ink">Terug naar de site</Link>
        </div>
      </div>
    </footer>
  );
}
