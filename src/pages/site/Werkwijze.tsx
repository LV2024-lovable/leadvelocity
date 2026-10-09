import { werkwijze } from "@/content/pages";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink } from "@/components/site";

export default function Werkwijze() {
  return (
    <SiteLayout>
      <Seo title={werkwijze.seoTitle} description={werkwijze.seoDescription} path="/werkwijze" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Werkwijze" title={werkwijze.h1} intro={werkwijze.intro} />
        <ol className="mt-14 space-y-4">
          {werkwijze.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <li className="grid gap-5 rounded-3xl border border-lv-line bg-lv-surface p-7 md:grid-cols-[12rem_1fr_1fr_1fr]">
                <div>
                  <span className="font-mono text-[12px] text-lv-faint">Stap {i + 1}</span>
                  <h2 className="mt-1 font-display text-[24px] font-semibold tracking-[-0.025em]">{s.title}</h2>
                </div>
                {(["output", "client", "decision"] as const).map((k) => (
                  <div key={k}>
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-faint">{werkwijze.stepLabels[k]}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{s[k]}</p>
                  </div>
                ))}
              </li>
            </Reveal>
          ))}
        </ol>
        <CtaLink to={checkHref({ source: "werkwijze" })} ctaId="werkwijze-check" className="mt-12">Plan een werkstroomcheck</CtaLink>
      </Section>
    </SiteLayout>
  );
}
