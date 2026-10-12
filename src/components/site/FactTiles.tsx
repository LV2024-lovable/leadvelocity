import { Reveal } from "./Reveal";

export function FactTiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((f, i) => (
        <li key={f.label}>
          <Reveal delay={i * 0.05} className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-[24px] bg-lv-card px-6 py-9 text-center sm:px-8 sm:py-12">
              <p className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-normal leading-none tracking-[-0.02em]">{f.value}</p>
              <p className="mt-4 max-w-[18rem] text-[15px] text-lv-muted">{f.label}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
