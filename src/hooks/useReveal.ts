import { useEffect, useRef } from 'react';

export function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setTimeout(() => el.classList.add('visible'), delay * 1000);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
