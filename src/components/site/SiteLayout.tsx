import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { captureUtm } from "@/lib/utm";

export function useScrollTopAndUtm() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => { captureUtm(search); }, [search]);
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  useScrollTopAndUtm();
  return (
    <div className="min-h-screen bg-lv-paper text-lv-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Naar inhoud</a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">{children}</main>
      <SiteFooter />
    </div>
  );
}
