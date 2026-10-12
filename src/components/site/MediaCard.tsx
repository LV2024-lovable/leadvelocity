import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ExposureArt, type ExposureTone } from "./ExposureArt";
import { Pill } from "./Pill";

export function MediaCard({ tone, label, title, body, href, cta }: { tone: ExposureTone; label: string; title: string; body: string; href: string; cta: string }) {
  return (
    <Link to={href} className="group flex h-full flex-col gap-2">
      <ExposureArt tone={tone} className="h-[200px]">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex justify-end"><Pill tone="dark">{label}</Pill></div>
          <p className="relative isolate text-center font-display text-[24px] font-normal text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[150%] before:w-[110%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[radial-gradient(closest-side,rgba(0,0,0,0.42),transparent)] before:content-['']">{title}</p>
          <span />
        </div>
      </ExposureArt>
      <div className="flex flex-1 flex-col rounded-[20px] bg-lv-card p-5">
        <p className="text-[14.5px] leading-relaxed text-lv-body">{body}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium">{cta}<ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  );
}
