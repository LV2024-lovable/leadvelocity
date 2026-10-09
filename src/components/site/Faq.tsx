import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqById } from "@/content/faq";
import type { FaqId } from "@/content/types";

export function Faq({ ids }: { ids: readonly FaqId[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {ids.map((id) => {
        const f = faqById(id);
        return (
          <AccordionItem key={id} value={id} className="border-b border-lv-line">
            <AccordionTrigger className="py-5 text-left text-[17px] font-medium hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-5 text-[15.5px] leading-relaxed text-lv-body">{f.a}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
