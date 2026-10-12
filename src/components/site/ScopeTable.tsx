import { packages, formatEuro } from "@/content/pricing";

export function ScopeTable() {
  const rows: { label: string; cell: (i: number) => string }[] = [
    { label: "Inrichting vanaf", cell: (i) => formatEuro(packages[i].setupFrom) },
    { label: "Beheer per maand vanaf", cell: (i) => formatEuro(packages[i].monthlyFrom) },
    { label: "Kleine wijzigingen per maand", cell: (i) => packages[i].changeHoursPerMonth !== undefined ? `${String(packages[i].changeHoursPerMonth).replace(".", ",")} uur` : "In het voorstel" },
    { label: "Wat erin zit", cell: (i) => packages[i].includes.join(" · ") },
    { label: "Niet inbegrepen", cell: (i) => packages[i].notIncluded.join(" · ") },
  ];
  return (
    <div className="overflow-x-auto rounded-[24px] bg-lv-card" role="region" aria-label="Pakketten vergeleken" tabIndex={0}>
      <table className="w-full min-w-[760px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-lv-line-soft">
            <th scope="col" className="w-[20%] p-4" />
            {packages.map((p) => <th key={p.id} scope="col" className="p-4 font-display text-[16px] font-medium">{p.name}{p.badge && <span className="ml-2 rounded-full bg-lv-lime px-2 py-0.5 font-mono text-[10px] font-normal">{p.badge}</span>}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-lv-line-soft last:border-0 align-top">
              <th scope="row" className="p-4 font-medium">{r.label}</th>
              {packages.map((p, i) => <td key={p.id} className="p-4 text-lv-body">{r.cell(i)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
