import { useLocation } from "react-router-dom";
import { bedanktPage } from "@/content/pages";
import type { DemoId } from "@/content/types";
import { demoHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, CtaLink } from "@/components/site";

export default function Bedankt() {
  const demo = (useLocation().state as { demo?: DemoId } | null)?.demo;
  return (
    <SiteLayout>
      <Seo title={bedanktPage.seoTitle} path="/bedankt" noindex />
      <Section className="pt-20 md:pt-28">
        <SectionHead as="h1" title={bedanktPage.h1} intro={bedanktPage.body} />
        <CtaLink to={demoHref(demo, "bedankt")} ctaId="bedankt-demo" variant="secondary" className="mt-8">{bedanktPage.cta}</CtaLink>
      </Section>
    </SiteLayout>
  );
}
