import { useLocation } from "react-router-dom";
import { checkPage } from "@/content/pages";
import { contact } from "@/content/site";
import { parseCheckContext } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, CheckForm } from "@/components/site";

export default function Werkstroomcheck() {
  const ctx = parseCheckContext(useLocation().search);
  return (
    <SiteLayout>
      <Seo title={checkPage.seoTitle} description={checkPage.seoDescription} path="/werkstroomcheck" />
      <Section className="pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead as="h1" eyebrow="Werkstroomcheck" title={checkPage.h1} intro={checkPage.intro} />
            {contact.calendarUrl && (
              <a href={contact.calendarUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full px-5 py-3 text-[15px] font-medium ring-1 ring-lv-line">
                {checkPage.calendar} (Europe/Amsterdam)
              </a>
            )}
          </div>
          <div className="rounded-3xl border border-lv-line bg-lv-surface/70 p-6 sm:p-8">
            <CheckForm ctx={ctx} />
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
