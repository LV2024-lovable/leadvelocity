import { useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import type { ProcessFamilyId } from "@/content/types";
import { processById } from "@/content/processes";
import { categoryById } from "@/content/categories";
import { demoById } from "@/content/demos";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, HumanControl, CategoryCard, Eyebrow } from "@/components/site";
import NotFound from "@/pages/NotFound";

export default function ProcessPage() {
  const { id } = useParams();
  const p = processById(id as ProcessFamilyId);
  if (!p) return <NotFound />;
  const demo = p.demoId ? demoById(p.demoId) : undefined;

  return (
    <SiteLayout>
      <Seo title={p.seoTitle} description={p.seoDescription} path={`/oplossingen/${p.id}`} />
      <Section className="pt-14 md:pt-20">
        <Eyebrow>{p.name}</Eyebrow>
        <SectionHead as="h1" title={p.h1} intro={p.situation} />
        <CtaLink to={checkHref({ source: `process-${p.id}`, process: p.ctaProcess })} ctaId={`process-${p.id}-check`} trackParams={{ process: p.ctaProcess }} className="mt-8">{p.ctaLabel}</CtaLink>
      </Section>

      <Section tone="raised">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Reveal><div className="rounded-3xl border border-lv-line bg-lv-surface p-7"><Eyebrow>Input</Eyebrow><p className="font-display text-[22px] font-semibold tracking-[-0.02em]">{p.input}</p></div></Reveal>
          <ArrowRight aria-hidden className="mx-auto h-6 w-6 rotate-90 text-lv-faint md:rotate-0" />
          <Reveal delay={0.06}><div className="rounded-3xl bg-lv-ink p-7 text-white"><Eyebrow className="text-white/50">Output</Eyebrow><p className="font-display text-[22px] font-semibold tracking-[-0.02em]">{p.output}</p></div></Reveal>
        </div>
        <p className="mt-6 text-[15px] text-lv-body"><span className="font-medium text-lv-ink">Bouwblokken: </span>{p.modules.join(" · ")}. <span className="font-medium text-lv-ink">Resultaat: </span>{p.result}.</p>
      </Section>

      {demo && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Voorbeeld" title={demo.title} intro={demo.prepared.summary} />
            <DemoStepper demo={demo} source={`process-${p.id}`} />
          </div>
        </Section>
      )}

      <Section tone={demo ? "raised" : "paper"}>
        <HumanControl title="Waar het systeem stopt" body={p.humanLimit} />
        <div className="mt-8 rounded-3xl border border-lv-line bg-lv-surface p-8">
          <Eyebrow>Wat we van jullie nodig hebben</Eyebrow>
          <ul className="space-y-3 text-[15.5px]">{p.neededInput.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
        </div>
        {p.extraBlock && (
          <div className="mt-8 rounded-3xl border border-lv-line bg-lv-lime-soft p-8">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{p.extraBlock.title}</h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-lv-body">{p.extraBlock.body}</p>
          </div>
        )}
      </Section>

      <Section>
        <SectionHead eyebrow="Passend bij" title="Bijvoorbeeld voor deze bedrijven" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {p.categoryIds.map((id) => <CategoryCard key={id} category={categoryById(id)!} />)}
        </div>
        <CtaLink to={checkHref({ source: `process-${p.id}-bottom`, process: p.ctaProcess })} ctaId={`process-${p.id}-bottom`} className="mt-12">{p.ctaLabel}</CtaLink>
      </Section>
    </SiteLayout>
  );
}
