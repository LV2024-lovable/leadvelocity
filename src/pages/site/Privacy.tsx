import { privacy } from "@/content/privacy";
import { SiteLayout, Seo, Section, SectionHead } from "@/components/site";

export default function Privacy() {
  return (
    <SiteLayout>
      <Seo title={privacy.seoTitle} description={privacy.seoDescription} path="/privacy" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" title={privacy.h1} />
        <p className="mt-4 text-[14px] text-lv-muted">{privacy.lastUpdated}</p>
        <div className="mt-10 max-w-3xl space-y-8">
          {privacy.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-[22px] font-medium tracking-[-0.015em]">{s.title}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-lv-body">{s.body}</p>
            </section>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
