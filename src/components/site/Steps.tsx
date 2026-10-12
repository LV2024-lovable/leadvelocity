import { Reveal } from "./Reveal";

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title}>
          <Reveal delay={i * 0.06}>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-lv-line bg-lv-surface font-mono text-[13px]">{i + 1}</span>
            <h3 className="mt-5 font-display text-[21px] font-medium tracking-[-0.015em]">{s.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{s.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
