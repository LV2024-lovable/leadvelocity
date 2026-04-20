import React, { useState } from 'react';
import { Linkedin, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  title: string;
  url?: string; // defaults to current page
  variant?: 'default' | 'compact';
};

const SocialShare: React.FC<Props> = ({ title, url, variant = 'default' }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link gekopieerd');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Kon link niet kopiëren');
    }
  };

  const baseButton =
    'inline-flex items-center justify-center gap-2 rounded-lg border transition-all duration-200';

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseButton} w-9 h-9 border-lv-border-subtle bg-lv-surface text-lv-text-muted hover:text-lv-accent hover:border-lv-accent/30`}
          aria-label="Deel op LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href={twitterHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseButton} w-9 h-9 border-lv-border-subtle bg-lv-surface text-lv-text-muted hover:text-lv-accent hover:border-lv-accent/30`}
          aria-label="Deel op Twitter/X"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <button
          onClick={copyLink}
          className={`${baseButton} w-9 h-9 border-lv-border-subtle bg-lv-surface text-lv-text-muted hover:text-lv-accent hover:border-lv-accent/30`}
          aria-label="Kopieer link"
        >
          {copied ? <Check className="w-4 h-4 text-lv-accent" /> : <LinkIcon className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest mr-1">
        Delen
      </span>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseButton} px-4 py-2 border-lv-border-subtle bg-lv-surface text-lv-text-muted hover:text-lv-accent hover:border-lv-accent/30 font-body text-sm`}
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </a>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseButton} px-4 py-2 border-lv-border-subtle bg-lv-surface text-lv-text-muted hover:text-lv-accent hover:border-lv-accent/30 font-body text-sm`}
      >
        <Twitter className="w-4 h-4" />
        X / Twitter
      </a>
      <button
        onClick={copyLink}
        className={`${baseButton} px-4 py-2 border-lv-border-subtle bg-lv-surface text-lv-text-muted hover:text-lv-accent hover:border-lv-accent/30 font-body text-sm`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-lv-accent" />
            Gekopieerd
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4" />
            Kopieer link
          </>
        )}
      </button>
    </div>
  );
};

export default SocialShare;
