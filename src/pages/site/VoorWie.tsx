import { Check, X } from "lucide-react";
import { voorWie } from "@/content/pages";
import { categories, GENERIC_NOT_FIT } from "@/content/categories";
import { processes } from "@/content/processes";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CategoryCard, ProcessCard, CtaLink, Eyebrow } from "@/components/site";

export default function VoorWie() {
  return (
    <SiteLayout>
      <Seo title={voorWie.seoTitle} description={voorWie.seoDescription} path="/voor-wie" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Voor wie" title={voorWie.h1} intro={voorWie.intro} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => <Reveal key={c.id} delay={i * 0.05}><CategoryCard category={c} /></Reveal>)}
        </div>
      </Section>
      <Section tone="raised">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{voorWie.fitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{voorWie.fit.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line p-8">
            <Eyebrow>{voorWie.notFitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px] text-lv-body">{GENERIC_NOT_FIT.map((x) => <li key={x} className="flex gap-3"><X aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="Oplossingen" title="Procesingangen" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processes.map((p) => <ProcessCard key={p.id} process={p} />)}
        </div>
      </Section>
      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em]">{voorWie.otherTitle}</h2>
          <p className="mt-3 text-[16.5px] leading-relaxed text-lv-body">{voorWie.otherBody}</p>
          <CtaLink to={checkHref({ source: "voor-wie" })} ctaId="voor-wie-check" className="mt-7">Plan een werkstroomcheck</CtaLink>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
