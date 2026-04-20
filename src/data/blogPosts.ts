// Central index of all blog posts. Hub reads titles/categories here,
// full content lives per-post in src/pages/inzichten/*.tsx.

export type PostIndexEntry = {
  slug: string;
  title: string;
  subtitle: string;
  category: 'Groothandel' | 'Maakindustrie' | 'Transport' | 'Algemeen';
  publishedAt: string; // "20 april 2026"
  readingMinutes: number;
  featured?: boolean;
};

export const posts: PostIndexEntry[] = [
  {
    slug: 'ai-in-nederlandse-technische-groothandel-2026',
    title: 'AI in de Nederlandse Technische Groothandel in 2026',
    subtitle:
      'Waar de marge lekt, welke AI-toepassingen bewezen werken, en wat technische groothandels die vooruit willen nu moeten doen.',
    category: 'Groothandel',
    publishedAt: '20 april 2026',
    readingMinutes: 8,
    featured: true,
  },
  {
    slug: 'ai-pricing-voor-groothandel',
    title: 'Van Excel-pricing naar AI: +130-200 bps marge zonder je ERP te vervangen',
    subtitle:
      'AI-pricing is de snelste marge-hefboom voor technische groothandels. Hoe het werkt, wat het oplevert, en waarom je niets hoeft te vervangen.',
    category: 'Groothandel',
    publishedAt: '20 april 2026',
    readingMinutes: 7,
  },
  {
    slug: 'ai-voor-nederlandse-maakindustrie-oee',
    title: 'AI voor Nederlandse Maakindustrie: van OEE 60% naar 78%',
    subtitle:
      'Waarom 83% van NL-maakbedrijven niet weet waar met AI te beginnen — en de vier use-cases die wél rendement leveren.',
    category: 'Maakindustrie',
    publishedAt: '20 april 2026',
    readingMinutes: 9,
    featured: true,
  },
  {
    slug: 'predictive-maintenance-machinebouw',
    title: 'Predictive Maintenance voor NL Machinebouw: wat werkt, wat niet',
    subtitle:
      'Stilstand op een kritische lijn kost duizenden euro\'s per uur. Predictive maintenance werkt — als je het pragmatisch aanpakt. Een realistische gids.',
    category: 'Maakindustrie',
    publishedAt: '20 april 2026',
    readingMinutes: 8,
  },
  {
    slug: 'vrachtwagenheffing-2026-ai-compensatie',
    title: 'Vrachtwagenheffing 1 juli 2026: hoe AI jouw marge kan redden',
    subtitle:
      'De heffing komt sowieso — gemiddeld €0,19 per km. Voor een NL-transporteur betekent dat serieuze marge-impact. Zo bouw je de compensatie met AI.',
    category: 'Transport',
    publishedAt: '20 april 2026',
    readingMinutes: 7,
    featured: true,
  },
  {
    slug: 'csrd-scope-3-automatisering-transport',
    title: 'CSRD scope-3 automatiseren voor NL-transporteurs',
    subtitle:
      'Grote verladers eisen scope-3 data per zending. Excel-rapportages schalen niet. Zo automatiseer je CSRD-compliance met bestaande tachograaf- en FMS-data.',
    category: 'Transport',
    publishedAt: '20 april 2026',
    readingMinutes: 6,
  },
];

export const getFeaturedPosts = () => posts.filter((p) => p.featured);

export const getPostsByCategory = (category: PostIndexEntry['category']) =>
  posts.filter((p) => p.category === category);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const getRelated = (slug: string, count = 3) =>
  posts
    .filter((p) => p.slug !== slug)
    .slice(0, count)
    .map((p) => ({ slug: p.slug, title: p.title, category: p.category }));
