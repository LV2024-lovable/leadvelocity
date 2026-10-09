import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteLayout, Seo, Section, SectionHead, CtaLink } from "@/components/site";

export default function NotFound() {
  const { pathname } = useLocation();
  useEffect(() => { console.error("404:", pathname); }, [pathname]);
  return (
    <SiteLayout>
      <Seo title="Pagina niet gevonden | Lead Velocity" path={pathname} noindex />
      <Section className="pt-24">
        <SectionHead as="h1" title="Deze pagina bestaat niet (meer)." intro="Misschien is de inhoud verhuisd. Begin bij de homepage of bekijk de voorbeelden." />
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/" ctaId="404-home" variant="secondary">Naar de homepage</CtaLink>
          <CtaLink to="/voorbeelden" ctaId="404-demo">Bekijk de voorbeelden</CtaLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
