import { privacy } from "@/content/privacy";
import { SiteLayout, Seo, Section, SectionHead } from "@/components/site";

export default function Privacy() {
  return (
    <SiteLayout>
      <Seo title={privacy.seoTitle} description={privacy.seoDescription} path="/privacy" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" title={privacy.h1} />
        <p className="mt-4 inline-flex rounded-full bg-lv-lime-soft px-3 py-1 font-mono text-[12px] text-lv-lime-ink">{privacy.draftNotice}</p>
        <div className="mt-10 max-w-3xl space-y-8">
          {privacy.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{s.title}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-lv-body">{s.body}</p>
            </section>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
