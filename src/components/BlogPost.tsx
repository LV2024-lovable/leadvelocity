import React, { useEffect } from 'react';
import { ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react';
import NavbarNew from './NavbarNew';
import FooterNew from './FooterNew';
import SchemaMarkup, { nlDateToIso } from './SchemaMarkup';
import SocialShare from './SocialShare';
import { useReveal } from '../hooks/useReveal';

export type BlogPostSection =
  | { type: 'paragraph'; content: React.ReactNode }
  | { type: 'heading'; level: 2 | 3; content: string }
  | { type: 'list'; items: React.ReactNode[]; ordered?: boolean }
  | { type: 'quote'; content: string; attribution?: string }
  | { type: 'callout'; title: string; content: React.ReactNode }
  | { type: 'stat-row'; stats: Array<{ value: string; label: string }> }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type RelatedPost = {
  slug: string;
  title: string;
  category: string;
};

export type BlogCtaAction = {
  href: string;
  label: string;
};

export type BlogPostConfig = {
  slug: string;
  title: string;
  subtitle: string;
  category: 'Groothandel' | 'Maakindustrie' | 'Transport' | 'Algemeen';
  publishedAt: string; // "20 april 2026"
  readingMinutes: number;
  metaDescription: string;
  intro: React.ReactNode; // lede paragraph rendered in larger type
  sections: BlogPostSection[];
  keyTakeaways: string[];
  relatedPosts?: RelatedPost[];
  /** Legacy single-CTA (kept for backwards compatibility). Use ctas instead. */
  cta?: {
    heading: string;
    body: string;
    primaryHref: string;
    primaryLabel: string;
  };
  /**
   * Three-level CTAs at different commitment levels:
   * - cold: lowest commitment (e.g. download whitepaper)
   * - warm: medium commitment (e.g. plan gesprek)
   * - hot: highest commitment (e.g. start specific solution)
   */
  ctas?: {
    heading: string;
    body: string;
    cold?: BlogCtaAction;
    warm: BlogCtaAction;
    hot?: BlogCtaAction;
  };
};

const categoryColors: Record<BlogPostConfig['category'], string> = {
  Groothandel: 'text-lv-accent',
  Maakindustrie: 'text-lv-accent',
  Transport: 'text-lv-accent',
  Algemeen: 'text-lv-accent',
};

const BlogPost: React.FC<{ config: BlogPostConfig }> = ({ config }) => {
  const heroRef = useReveal();
  const bodyRef = useReveal(0.1);
  const takeawayRef = useReveal(0.15);
  const ctaRef = useReveal(0.1);

  useEffect(() => {
    document.title = `${config.title} — Leadvelocity`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', config.metaDescription);
  }, [config.title, config.metaDescription]);

  return (
    <div className="min-h-screen bg-lv-ink">
      <SchemaMarkup
        schema={{
          type: 'Article',
          title: config.title,
          description: config.metaDescription,
          datePublished: nlDateToIso(config.publishedAt),
          slug: config.slug,
          category: config.category,
          readingMinutes: config.readingMinutes,
        }}
      />
      <NavbarNew />

      <article>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-16 relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-3 mb-8 text-sm">
                <a href="/inzichten" className="font-body text-lv-text-subtle hover:text-lv-accent transition-colors">
                  Inzichten
                </a>
                <span className="text-lv-border">/</span>
                <span className={`font-body font-600 uppercase tracking-widest text-xs ${categoryColors[config.category]}`}>
                  {config.category}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text leading-[1.1] tracking-tight mb-6">
                {config.title}
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-8">
                {config.subtitle}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 text-sm text-lv-text-subtle border-t border-lv-border-subtle pt-6">
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body">{config.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-body">{config.readingMinutes} min leestijd</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span className="font-body">{config.category}</span>
                  </div>
                </div>
                <SocialShare title={config.title} variant="compact" />
              </div>
            </div>
          </div>
        </section>

        {/* INTRO LEDE */}
        <section className="py-8 md:py-10 relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="font-body text-lg md:text-xl text-lv-text leading-relaxed">
                {config.intro}
              </div>
            </div>
          </div>
        </section>

        {/* BODY */}
        <section ref={bodyRef} className="reveal py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-8">
              {config.sections.map((section, i) => {
                if (section.type === 'heading' && section.level === 2) {
                  return (
                    <h2
                      key={i}
                      className="font-display text-2xl md:text-3xl font-700 text-lv-text mt-8 md:mt-12 mb-2 leading-tight"
                    >
                      {section.content}
                    </h2>
                  );
                }
                if (section.type === 'heading' && section.level === 3) {
                  return (
                    <h3
                      key={i}
                      className="font-display text-xl md:text-2xl font-700 text-lv-text mt-6 mb-2 leading-tight"
                    >
                      {section.content}
                    </h3>
                  );
                }
                if (section.type === 'paragraph') {
                  return (
                    <p key={i} className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                      {section.content}
                    </p>
                  );
                }
                if (section.type === 'list') {
                  const ListTag = section.ordered ? 'ol' : 'ul';
                  return (
                    <ListTag
                      key={i}
                      className={`${section.ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-2 font-body text-base md:text-lg text-lv-text-muted leading-relaxed`}
                    >
                      {section.items.map((item, j) => (
                        <li key={j} className="pl-2">
                          {item}
                        </li>
                      ))}
                    </ListTag>
                  );
                }
                if (section.type === 'quote') {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-4 border-lv-accent pl-5 md:pl-6 py-2 italic"
                    >
                      <p className="font-body text-lg md:text-xl text-lv-text leading-relaxed">
                        "{section.content}"
                      </p>
                      {section.attribution && (
                        <p className="font-body text-sm text-lv-text-subtle mt-2 not-italic">
                          — {section.attribution}
                        </p>
                      )}
                    </blockquote>
                  );
                }
                if (section.type === 'callout') {
                  return (
                    <div
                      key={i}
                      className="p-6 md:p-8 rounded-xl bg-lv-accent/[0.04] border border-lv-accent/20 my-2"
                    >
                      <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-3">
                        {section.title}
                      </div>
                      <div className="font-body text-base md:text-lg text-lv-text leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  );
                }
                if (section.type === 'stat-row') {
                  return (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-2">
                      {section.stats.map((stat) => (
                        <div key={stat.label} className="border-l-2 border-lv-accent/40 pl-4">
                          <div className="font-display text-2xl md:text-3xl font-700 text-lv-accent mb-1 leading-none">
                            {stat.value}
                          </div>
                          <div className="font-body text-sm text-lv-text-muted leading-snug">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                if (section.type === 'table') {
                  return (
                    <div key={i} className="my-2 overflow-x-auto">
                      <table className="w-full text-left font-body text-sm md:text-base">
                        <thead>
                          <tr className="border-b border-lv-border">
                            {section.headers.map((h, hi) => (
                              <th
                                key={hi}
                                className="py-3 px-3 font-display font-700 text-lv-text"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-lv-border-subtle">
                              {row.map((cell, ci) => (
                                <td key={ci} className="py-3 px-3 text-lv-text-muted">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </section>

        {/* KEY TAKEAWAYS */}
        <section ref={takeawayRef} className="reveal py-14 md:py-16 relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-lv-accent" />
                <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                  Kernpunten
                </span>
              </div>
              <ul className="space-y-3">
                {config.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mt-0.5">
                      <span className="font-display text-xs font-700 text-lv-accent">{i + 1}</span>
                    </span>
                    <span className="font-body text-base md:text-lg text-lv-text leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SHARE (between takeaways and CTA) */}
        <section className="py-10 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <SocialShare title={config.title} />
            </div>
          </div>
        </section>

        {/* CTA — three-level (or legacy single) */}
        {(config.ctas || config.cta) && (
          <section ref={ctaRef} className="reveal py-16 md:py-20 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text mb-5 leading-[1.1]">
                  {config.ctas?.heading ?? config.cta?.heading}
                </h2>
                <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed mb-10">
                  {config.ctas?.body ?? config.cta?.body}
                </p>

                {config.ctas ? (
                  <div className="flex flex-col items-center gap-5">
                    {/* Three-level CTA layout */}
                    <div className="flex flex-wrap justify-center items-center gap-3">
                      {config.ctas.hot && (
                        <a
                          href={config.ctas.hot.href}
                          className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                        >
                          {config.ctas.hot.label}
                          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                      <a
                        href={config.ctas.warm.href}
                        className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-accent/40 hover:text-lv-accent transition-all duration-300"
                      >
                        {config.ctas.warm.label}
                      </a>
                      {config.ctas.cold && (
                        <a
                          href={config.ctas.cold.href}
                          className="inline-flex items-center justify-center gap-2 px-7 py-4 text-lv-text-muted hover:text-lv-accent font-body font-500 text-base transition-colors duration-200"
                        >
                          {config.ctas.cold.label}
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="font-body text-xs text-lv-text-subtle mt-2">
                      Kies wat bij jouw situatie past — geen verplichting
                    </p>
                  </div>
                ) : (
                  <a
                    href={config.cta!.primaryHref}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                  >
                    {config.cta!.primaryLabel}
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* RELATED */}
        {config.relatedPosts && config.relatedPosts.length > 0 && (
          <section className="py-14 md:py-16 relative bg-lv-surface border-t border-lv-border-subtle">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Ook interessant
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {config.relatedPosts.map((p) => (
                    <a
                      key={p.slug}
                      href={`/inzichten/${p.slug}`}
                      className="group p-5 rounded-xl bg-lv-ink border border-lv-border-subtle hover:border-lv-accent/30 transition-colors"
                    >
                      <div className={`font-body text-xs font-600 uppercase tracking-widest mb-3 ${categoryColors[p.category as BlogPostConfig['category']]}`}>
                        {p.category}
                      </div>
                      <h3 className="font-display text-base md:text-lg font-700 text-lv-text group-hover:text-lv-accent transition-colors leading-tight">
                        {p.title}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>

      <FooterNew />
    </div>
  );
};

export default BlogPost;
