import { Check } from "lucide-react";
import { prijzenPage } from "@/content/pages";
import { analysis, managementIncludes, costMicrocopy, scopeLine, extraWork, formatEuro } from "@/content/pricing";
import { SiteLayout, Seo, Section, SectionHead, Reveal, PricingCards, ScopeTable, Faq, Eyebrow } from "@/components/site";

export default function Prijzen() {
  return (
    <SiteLayout>
      <Seo title={prijzenPage.seoTitle} description={prijzenPage.seoDescription} path="/prijzen" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Prijzen" title={prijzenPage.h1} intro={prijzenPage.intro} />
        <div className="mt-12"><PricingCards source="prijzen" showIncludes /></div>
        <p className="mt-6 text-[15px] font-medium">{scopeLine}</p>
      </Section>

      <Section tone="raised">
        <SectionHead title={prijzenPage.matrixTitle} />
        <div className="mt-10"><ScopeTable /></div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal><div className="h-full rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{prijzenPage.managementTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{managementIncludes.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div></Reveal>
          <Reveal delay={0.06}><div className="h-full rounded-3xl border border-lv-line p-8">
            <Eyebrow>{prijzenPage.extraTitle}</Eyebrow>
            <p className="text-[15.5px] leading-relaxed text-lv-body">{extraWork}</p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-lv-body">{costMicrocopy}</p>
          </div></Reveal>
        </div>
        <Reveal><div className="mt-4 grid gap-6 rounded-3xl bg-lv-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Eyebrow className="text-white/50">{prijzenPage.analysisTitle}</Eyebrow>
            <p className="font-display text-[26px] font-semibold tracking-[-0.03em]">{formatEuro(analysis.price)} <span className="text-[15px] font-normal text-white/60">verrekenbaar binnen {analysis.creditDays} dagen</span></p>
            <p className="mt-2 max-w-xl text-[15px] text-white/70">{prijzenPage.analysisBody}</p>
          </div>
          <ul className="space-y-1.5 text-[14.5px] text-white/85">{analysis.includes.map((x) => <li key={x} className="flex gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lv-lime" />{x}</li>)}</ul>
        </div></Reveal>
      </Section>

      <Section tone="raised">
        <SectionHead title={prijzenPage.termsTitle} />
        <ul className="mt-8 space-y-3 text-[15.5px]">{prijzenPage.terms.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
      </Section>

      <Section id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Over kosten en scope." />
          <Faq ids={prijzenPage.faqIds} />
        </div>
      </Section>
    </SiteLayout>
  );
}
