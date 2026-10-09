import React from 'react';
import { Download } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';

type AssetGroup = {
  title: string;
  description: string;
  files: { label: string; href: string; format: string }[];
};

const assets: AssetGroup[] = [
  {
    title: 'Wordmark — donkere achtergrond',
    description: 'Voor gebruik op donkere achtergronden (zoals onze site).',
    files: [
      { label: 'SVG', href: '/brand/leadvelocity-wordmark-dark.svg', format: 'svg' },
      { label: 'PNG', href: '/brand/leadvelocity-wordmark-dark.png', format: 'png' },
    ],
  },
  {
    title: 'Wordmark — lichte achtergrond',
    description: 'Voor gebruik op lichte achtergronden, print en partner-materiaal.',
    files: [
      { label: 'SVG', href: '/brand/leadvelocity-wordmark-light.svg', format: 'svg' },
      { label: 'PNG', href: '/brand/leadvelocity-wordmark-light.png', format: 'png' },
    ],
  },
  {
    title: 'Monogram',
    description: 'Compact icoon voor favicons, social-avatars en app-iconen.',
    files: [
      { label: 'SVG', href: '/brand/leadvelocity-monogram.svg', format: 'svg' },
      { label: 'PNG', href: '/brand/leadvelocity-monogram.png', format: 'png' },
    ],
  },
];

const BrandAssets = () => {
  return (
    <div className="min-h-screen bg-lv-paper flex flex-col">
      <NavbarNew />
      <main className="flex-1">
        <section className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            {/* Header */}
            <div className="mb-16 md:mb-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-lime" />
                <span className="font-mono text-xs uppercase tracking-widest text-lv-lime-ink">
                  Brand-assets
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-ink leading-[1.05] mb-6">
                Logo&apos;s en huisstijl
              </h1>
              <p className="font-body text-lg text-lv-body leading-relaxed max-w-2xl">
                Gebruik onze logo&apos;s in vector (SVG) waar mogelijk. PNG is beschikbaar voor systemen die geen SVG ondersteunen. Neem contact op als je een variant nodig hebt die hier niet staat.
              </p>
            </div>

            {/* Asset groups */}
            <div className="space-y-6">
              {assets.map((group) => (
                <div
                  key={group.title}
                  className="p-8 md:p-10 rounded-2xl border border-lv-line-soft bg-lv-surface"
                >
                  <h2 className="font-display text-xl md:text-2xl font-700 text-lv-ink mb-2">
                    {group.title}
                  </h2>
                  <p className="font-body text-sm text-lv-body leading-relaxed mb-6">
                    {group.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {group.files.map((file) => (
                      <a
                        key={file.href}
                        href={file.href}
                        download
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-lv-line bg-lv-paper hover:border-lv-lime-ink/40 hover:bg-lv-lime/[0.05] transition-all duration-200 font-body text-sm font-500 text-lv-ink"
                      >
                        <Download className="w-4 h-4 text-lv-lime-ink" />
                        Download {file.label}
                        <span className="font-mono text-xs uppercase tracking-wider text-lv-faint">
                          .{file.format}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Usage note */}
            <div className="mt-12 p-6 md:p-7 rounded-xl border border-lv-line-soft bg-lv-paper/40">
              <div className="font-mono text-xs uppercase tracking-widest text-lv-faint mb-3">
                Gebruik
              </div>
              <p className="font-body text-base text-lv-body leading-relaxed">
                Verander de kleuren, proporties of letterspacing niet. Laat voldoende witruimte rondom het logo (minimaal de hoogte van de &quot;L&quot;). Voor co-marketing of partner-materiaal: stuur even een mail naar{' '}
                <a href="mailto:info@leadvelocity.nl" className="text-lv-lime-ink hover:underline">
                  info@leadvelocity.nl
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <FooterNew />
    </div>
  );
};

export default BrandAssets;
