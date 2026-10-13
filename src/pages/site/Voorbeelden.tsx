import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { demos } from "@/content/demos";
import { categoryById } from "@/content/categories";
import { audienceLink } from "@/content/pages";
import type { DemoId } from "@/content/types";
import { SiteLayout, Seo, Section, SectionHead, DemoStepper, Reveal } from "@/components/site";
import { track } from "@/lib/track";

export default function Voorbeelden() {
  const [params] = useSearchParams();
  const requested = params.get("demo") as DemoId | null;
  const ordered = requested && demos.some((d) => d.id === requested)
    ? [demos.find((d) => d.id === requested)!, ...demos.filter((d) => d.id !== requested)]
    : demos;

  useEffect(() => { if (requested) track("demo_open", { demo_id: requested }); }, [requested]);

  return (
    <SiteLayout>
      <Seo title="Voorbeelden | Lead Velocity" description="Vier gelabelde voorbeelden met fictieve gegevens: van binnengekomen informatie via voorbereiding naar een volgende actie." path="/voorbeelden" />
      <Section>
        <SectionHead as="h1" eyebrow="Voorbeelden" title="Bekijk wat een oplossing concreet oplevert." intro="Vier illustratieve demo's met fictieve gegevens. Elk voorbeeld laat drie stappen zien: binnengekomen informatie, voorbereiding en de volgende actie." />
        <div className="mt-14 space-y-16">
          {ordered.map((d) => (
            <Reveal key={d.id}>
              <div id={d.id} className="grid scroll-mt-24 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-muted">{categoryById(d.categoryId)!.name}</p>
                  <h2 className="mt-2 font-display text-[28px] font-normal tracking-[-0.015em]">{d.title}</h2>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-lv-body">{d.prepared.summary}</p>
                  <Link to={`/${d.categoryId}`} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium underline-offset-4 hover:underline">
                    {audienceLink(categoryById(d.categoryId)!.audience)} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <DemoStepper demo={d} source="voorbeelden" />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
