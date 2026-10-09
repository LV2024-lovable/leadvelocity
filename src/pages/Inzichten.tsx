import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Calendar, Clock, FileText } from 'lucide-react';
import { SiteHeader, SiteFooter, Seo } from '@/components/site';
import { useReveal } from '../hooks/useReveal';
import { posts, PostIndexEntry } from '../data/blogPosts';
import NewsletterSignup from '../components/NewsletterSignup';

type Category = 'Alles' | PostIndexEntry['category'];

const categories: Category[] = ['Alles', 'Groothandel', 'Maakindustrie', 'Transport'];

const Inzichten = () => {
  const heroRef = useReveal();
  const featuredRef = useReveal();
  const [activeCategory, setActiveCategory] = useState<Category>('Alles');

  useEffect(() => {
    document.title = 'Inzichten — AI voor NL MKB | Lead Velocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Diepgaande artikelen en research over AI in de Nederlandse MKB-industrie — voor technische groothandel, maakindustrie en transport.'
      );
    }
  }, []);

  const featured = posts.find((p) => p.featured && activeCategory === 'Alles') ||
    posts.filter((p) => p.featured && p.category === activeCategory)[0];

  const filtered = activeCategory === 'Alles'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const otherPosts = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="min-h-screen bg-lv-paper">
      <Seo title={'Inzichten — AI voor NL MKB | Lead Velocity'} path={window.location.pathname} />
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-lv-lime/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-16 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-lime-ink/20 bg-lv-lime/[0.05] mb-8">
                <span className="font-body text-sm font-500 text-lv-lime-ink">
                  Inzichten & research
                </span>
              </div>

              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-700 text-lv-ink leading-[1.05] tracking-tight mb-6">
                AI in het{' '}
                <span className="text-gradient-accent">Nederlandse MKB</span>
                <br />
                <span className="text-lv-ink">— zonder hype.</span>
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-body leading-relaxed max-w-2xl">
                Diepgaande artikelen en benchmarks voor directies in groothandel, maakindustrie en transport die concreet willen weten wat AI oplevert — en wat niet.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <section className="py-6 border-y border-lv-line-soft bg-lv-surface sticky top-16 md:top-20 z-30 backdrop-blur-lg">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-body text-sm font-600 transition-colors ${
                    activeCategory === cat
                      ? 'bg-lv-lime text-lv-ink'
                      : 'bg-lv-paper text-lv-body hover:text-lv-ink border border-lv-line-soft'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED */}
        {featured && (
          <section ref={featuredRef} className="reveal py-14 md:py-16 relative">
            <div className="container mx-auto px-4 md:px-6">
              <a
                href={`/inzichten/${featured.slug}`}
                className="block max-w-5xl mx-auto group"
              >
                <div className="p-8 md:p-12 lg:p-16 rounded-3xl bg-lv-lime/[0.04] border border-lv-lime-ink/20 hover:border-lv-lime-ink/40 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-lv-lime/[0.03] rounded-full blur-[80px] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 text-sm">
                      <span className="font-body font-600 uppercase tracking-widest text-xs text-lv-lime-ink">
                        Uitgelicht · {featured.category}
                      </span>
                      <span className="text-lv-line">/</span>
                      <span className="flex items-center gap-1.5 text-lv-faint">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.readingMinutes} min
                      </span>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-ink leading-[1.1] mb-5 group-hover:text-lv-lime-ink transition-colors">
                      {featured.title}
                    </h2>

                    <p className="font-body text-base md:text-lg text-lv-body leading-relaxed max-w-3xl mb-6">
                      {featured.subtitle}
                    </p>

                    <span className="inline-flex items-center gap-2 font-display text-sm font-700 text-lv-lime-ink">
                      Lees verder
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </section>
        )}

        {/* ALL POSTS */}
        <section className="py-14 md:py-16 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px w-10 bg-lv-lime" />
                <span className="font-body text-xs font-600 text-lv-lime-ink uppercase tracking-widest">
                  {activeCategory === 'Alles' ? 'Alle artikelen' : `${activeCategory}-artikelen`}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {otherPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/inzichten/${post.slug}`}
                    className="group p-6 md:p-7 rounded-2xl bg-lv-surface border border-lv-line-soft hover:border-lv-lime-ink/30 transition-colors flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className="font-body font-600 uppercase tracking-widest text-lv-lime-ink">
                        {post.category}
                      </span>
                      <span className="text-lv-line">/</span>
                      <span className="flex items-center gap-1.5 text-lv-faint">
                        <Clock className="w-3 h-3" />
                        {post.readingMinutes} min
                      </span>
                    </div>

                    <h3 className="font-display text-lg md:text-xl font-700 text-lv-ink leading-tight mb-3 group-hover:text-lv-lime-ink transition-colors">
                      {post.title}
                    </h3>

                    <p className="font-body text-sm md:text-base text-lv-body leading-relaxed mb-5 flex-1">
                      {post.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-lv-line-soft">
                      <span className="font-body text-xs text-lv-faint flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {post.publishedAt}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-lv-faint group-hover:text-lv-lime-ink transition-colors" />
                    </div>
                  </a>
                ))}
              </div>

              {otherPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="font-body text-lv-body">
                    Nog geen artikelen in deze categorie — binnenkort meer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* WHITEPAPER CTA */}
        <section className="py-14 md:py-16 relative">
          <div className="container mx-auto px-4 md:px-6">
            <a
              href="/whitepapers/ai-in-technische-groothandel-2026"
              className="block max-w-5xl mx-auto group"
            >
              <div className="p-8 md:p-12 rounded-2xl bg-lv-lime/[0.04] border border-lv-lime-ink/20 hover:border-lv-lime-ink/40 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-lv-lime/[0.04] rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-2 flex justify-center md:justify-start">
                    <div className="w-20 h-24 rounded-xl bg-lv-lime-soft border border-lv-lime-ink/30 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-lv-lime-ink" />
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <div className="font-body text-xs font-600 text-lv-lime-ink uppercase tracking-widest mb-3">
                      Nieuwe whitepaper · 25 pagina&apos;s
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-ink mb-3 leading-tight group-hover:text-lv-lime-ink transition-colors">
                      AI in de Nederlandse Technische Groothandel 2026
                    </h3>
                    <p className="font-body text-base text-lv-body leading-relaxed">
                      15 bewezen AI-use-cases met ROI-ranges, een 12-maanden-implementatieroadmap en 3 scenario-cases voor groothandels van €10M tot €75M.
                    </p>
                  </div>
                  <div className="md:col-span-3 flex md:justify-end">
                    <span className="inline-flex items-center gap-2 font-display text-sm font-700 text-lv-lime-ink">
                      Download whitepaper
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="py-16 md:py-20 relative bg-lv-surface border-t border-lv-line-soft">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-ink mb-5 leading-[1.1]">
                Meer inzichten, maandelijks in je inbox.
              </h2>
              <p className="font-body text-base md:text-lg text-lv-body leading-relaxed mb-8">
                Eén keer per maand een diepgaande analyse van AI-ontwikkelingen die ertoe doen voor Nederlandse MKB-industrie. Geen spam, direct opzegbaar.
              </p>
              <div className="max-w-lg mx-auto">
                <NewsletterSignup sourceHint="Inzichten-hub newsletter CTA" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Inzichten;
