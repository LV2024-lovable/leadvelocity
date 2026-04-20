import { useEffect } from 'react';

type ArticleSchema = {
  type: 'Article';
  title: string;
  description: string;
  datePublished: string; // ISO 8601 ("2026-04-20")
  slug: string;
  category: string;
  readingMinutes: number;
};

type WhitepaperSchema = {
  type: 'Whitepaper';
  title: string;
  description: string;
  slug: string;
  datePublished: string;
};

type OrganizationSchema = {
  type: 'Organization';
};

type SchemaInput = ArticleSchema | WhitepaperSchema | OrganizationSchema;

const BASE_URL = 'https://www.leadvelocity.nl';
const ORG = {
  '@type': 'Organization',
  name: 'Leadvelocity',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  email: 'info@leadvelocity.nl',
  telephone: '+31625471528',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amsterdam',
    addressCountry: 'NL',
  },
  sameAs: ['https://www.linkedin.com/company/leadvelocity-2/'],
};

const buildSchema = (input: SchemaInput) => {
  if (input.type === 'Article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: input.title,
      description: input.description,
      datePublished: input.datePublished,
      dateModified: input.datePublished,
      author: ORG,
      publisher: ORG,
      articleSection: input.category,
      timeRequired: `PT${input.readingMinutes}M`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/inzichten/${input.slug}`,
      },
      inLanguage: 'nl-NL',
    };
  }
  if (input.type === 'Whitepaper') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: input.title,
      description: input.description,
      datePublished: input.datePublished,
      author: ORG,
      publisher: ORG,
      articleSection: 'Whitepaper',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/whitepapers/${input.slug}`,
      },
      inLanguage: 'nl-NL',
    };
  }
  return {
    '@context': 'https://schema.org',
    ...ORG,
    description: 'Jouw AI operations partner. Wij bouwen AI-systemen die écht bijdragen aan jouw bedrijfsresultaat.',
  };
};

// Dates are built as ISO strings from human-friendly input like "20 april 2026"
const monthMap: Record<string, string> = {
  januari: '01', februari: '02', maart: '03', april: '04', mei: '05', juni: '06',
  juli: '07', augustus: '08', september: '09', oktober: '10', november: '11', december: '12',
};

export const nlDateToIso = (nlDate: string): string => {
  // "20 april 2026" → "2026-04-20"
  const parts = nlDate.trim().toLowerCase().split(/\s+/);
  if (parts.length !== 3) return nlDate;
  const [day, month, year] = parts;
  const mm = monthMap[month] ?? '01';
  const dd = day.padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

const SchemaMarkup: React.FC<{ schema: SchemaInput }> = ({ schema }) => {
  useEffect(() => {
    const id = 'ld-json-schema';
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.innerHTML = JSON.stringify(buildSchema(schema));
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [schema]);

  return null;
};

export default SchemaMarkup;
