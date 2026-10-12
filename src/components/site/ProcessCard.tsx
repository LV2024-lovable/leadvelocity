import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ProcessFamily } from "@/content/types";
import { categoryById } from "@/content/categories";

export function ProcessCard({ process, compact = false }: { process: ProcessFamily; compact?: boolean }) {
  return (
    <Link to={`/oplossingen/${process.id}`} className="group flex h-full flex-col rounded-[24px] bg-lv-card p-7 transition-colors hover:bg-[#ECE9DF]">
      <h3 className="font-display text-[20px] font-medium tracking-[-0.015em]">{process.name}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-lv-body">{process.cardLine}</p>
      {!compact && (
        <p className="mt-4 font-mono text-[11.5px] text-lv-muted">
          Bijvoorbeeld voor: {process.categoryIds.map((id) => categoryById(id)!.name.toLowerCase()).join(" en ")}
        </p>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium">Bekijk {process.name.toLowerCase()}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
    </Link>
  );
}
