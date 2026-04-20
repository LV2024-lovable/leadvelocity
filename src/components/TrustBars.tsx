import React from 'react';
import { Cpu, Database, Users } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type TrustRow = {
  icon: React.ElementType;
  label: string;
  items: string[];
};

const rows: TrustRow[] = [
  {
    icon: Cpu,
    label: 'Waarmee we bouwen',
    items: ['Anthropic Claude', 'OpenAI', 'Supabase', 'Resend', 'Vercel', 'Next.js', 'n8n'],
  },
  {
    icon: Database,
    label: 'Data & benchmarks',
    items: ['McKinsey', 'BCG', 'Gartner', 'Deloitte', 'CBS', 'RVO', 'Evofenedex'],
  },
  {
    icon: Users,
    label: 'Sectoren waar we thuis zijn',
    items: ['WTG', 'NVG', 'FME', 'Koninklijke Metaalunie', 'TLN', 'STL', 'Smart Industry'],
  },
];

type Props = {
  variant?: 'default' | 'compact';
  className?: string;
};

const TrustBars: React.FC<Props> = ({ variant = 'default', className = '' }) => {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className={`reveal ${variant === 'compact' ? 'py-12' : 'py-16 md:py-20'} relative ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pb-8 md:pb-10 border-b border-lv-border-subtle last:border-0 last:pb-0"
              >
                {/* Left: label */}
                <div className="flex items-center gap-3 md:w-64 flex-shrink-0">
                  <div className="w-9 h-9 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-lv-accent" />
                  </div>
                  <span className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest">
                    {row.label}
                  </span>
                </div>

                {/* Right: items */}
                <div className="flex flex-wrap gap-2 md:gap-3 flex-1">
                  {row.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-md border border-lv-border-subtle bg-lv-surface font-body text-xs md:text-sm text-lv-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBars;
