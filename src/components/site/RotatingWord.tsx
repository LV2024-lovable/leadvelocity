import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduce(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

/**
 * Wisselt woorden op dezelfde plek. Alle woorden staan gestapeld in één grid-cel,
 * zodat de breedte van het langste woord gereserveerd blijft (geen verspringende kop).
 * Visueel alleen (aria-hidden): de aanroeper zet de volledige zin voor screenreaders.
 * Staat stil bij `locked` of bij prefers-reduced-motion.
 */
export function RotatingWord({
  words,
  locked,
  intervalMs = 2400,
  className,
  wordClassName,
}: {
  words: string[];
  locked?: number;
  intervalMs?: number;
  className?: string;
  /** Stijl per woord (bv. markering), zodat die past bij het zichtbare woord. */
  wordClassName?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(locked ?? 0);

  useEffect(() => {
    if (locked !== undefined) { setIndex(locked); return; }
    if (reduce || words.length < 2) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => window.clearInterval(t);
  }, [locked, reduce, words.length, intervalMs]);

  return (
    <span aria-hidden="true" className={cn("inline-grid justify-items-start align-baseline", className)}>
      {words.map((w, i) => (
        <span
          key={w}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            wordClassName,
            i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[0.35em] opacity-0",
          )}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
