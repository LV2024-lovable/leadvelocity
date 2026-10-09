import { oplossingenIndex } from "@/content/pages";
import { processes } from "@/content/processes";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, ProcessCard, CtaLink } from "@/components/site";

export default function Oplossingen() {
  return (
    <SiteLayout>
      <Seo title={oplossingenIndex.seoTitle} description={oplossingenIndex.seoDescription} path="/oplossingen" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Oplossingen" title={oplossingenIndex.h1} intro={oplossingenIndex.intro} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {processes.map((p, i) => <Reveal key={p.id} delay={i * 0.05}><ProcessCard process={p} /></Reveal>)}
        </div>
      </Section>
      <Section tone="raised">
        <SectionHead title={oplossingenIndex.baseTitle} />
        <ol className="mt-10 flex flex-wrap gap-2 text-[14.5px]">
          {oplossingenIndex.baseSteps.map((s, i) => (
            <li key={s} className="rounded-full border border-lv-line bg-lv-surface px-3.5 py-2"><span className="mr-2 font-mono text-[11px] text-lv-faint">{i + 1}</span>{s}</li>
          ))}
        </ol>
        <CtaLink to={checkHref({ source: "oplossingen" })} ctaId="oplossingen-check" className="mt-10">Plan een werkstroomcheck</CtaLink>
      </Section>
    </SiteLayout>
  );
}
