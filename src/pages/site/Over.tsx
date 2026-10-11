import { Check } from "lucide-react";
import { over } from "@/content/pages";
import { contact, ctaLabels } from "@/content/site";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, Eyebrow } from "@/components/site";

export default function Over() {
  return (
    <SiteLayout>
      <Seo title={over.seoTitle} description={over.seoDescription} path="/over" />
      <Section className="pt-14 md:pt-20">
        <SectionHead as="h1" eyebrow="Over Lead Velocity" title={over.h1} intro={over.founder} />
        <Reveal><blockquote className="mt-12 max-w-3xl border-l-2 border-lv-ink pl-6 font-display text-[clamp(1.3rem,2.4vw,1.7rem)] leading-snug tracking-[-0.02em]">{over.mission}</blockquote></Reveal>
      </Section>
      <Section tone="raised">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{over.skillsTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{over.skills.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{over.principlesTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{over.principles.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
      </Section>
      <Section>
        <p className="text-[15.5px] text-lv-body">Contact: <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a> · <a className="underline underline-offset-4" href={contact.phoneHref}>{contact.phone}</a> · <a className="underline underline-offset-4" href={contact.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a></p>
        <CtaLink to={checkHref({ source: "over" })} ctaId="over-check" className="mt-8">{ctaLabels.primary}</CtaLink>
      </Section>
    </SiteLayout>
  );
}
