import React from 'react';
import {
  Accordion as UIAccordion,
  AccordionContent,
  AccordionItem as UIAccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface AccordionItem {
  id: string;
  qBs: string;
  qEn: string;
  aBs: string;
  aEn: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * The FAQ, now on Radix Accordion from the registry.
 *
 * What it replaces: an open/closed id in component state, a hand written
 * `grid-rows-[0fr]` to `grid-rows-[1fr]` height animation, and a button with
 * `aria-expanded` and nothing else. The height trick worked, but it is the
 * accessibility that was thin: no `aria-controls` tying the button to its
 * panel, no `region` role on the answer, and no arrow key movement between
 * questions.
 *
 * Two deliberate choices kept from the hand written version:
 *
 * `type="single"` with `collapsible`, so one answer is open at a time and it
 * can be closed again. A FAQ where everything can be open at once stops
 * being scannable, which is the only reason to collapse answers in the
 * first place.
 *
 * One panel with hairline dividers, not a stack of separately bordered
 * cards. Each card previously carried its own border, radius and padding on
 * top of the row's own padding, which is the double-boxed look this design
 * has been cutting everywhere else.
 *
 * The outer div takes `className` and the panel is inside it. That
 * separation matters: callers pass `.section-body`, whose job is a 200px
 * left pad aligning content with the heading above. Putting that on the
 * bordered element itself made the panel start at the section edge while
 * only its text moved in, so the card bled left of everything else. That
 * bug shipped once already.
 */
export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  return (
    <div className={className}>
      <UIAccordion
        type="single"
        collapsible
        defaultValue={items[0]?.id}
        className="rounded-2xl border border-[var(--line)] bg-[var(--deck)] overflow-hidden"
      >
        {items.map((item) => (
          <UIAccordionItem
            key={item.id}
            value={item.id}
            className="border-b border-[var(--line)] last:border-b-0 px-5 sm:px-6"
          >
            <AccordionTrigger
              className="py-3.5 text-sm sm:text-base font-bold text-[var(--ink)] leading-snug
                         hover:no-underline text-left gap-4
                         [&>svg]:text-[var(--cyan)] [&>svg]:size-4 [&>svg]:shrink-0"
            >
              <span>
                <span className="l-bs">{item.qBs}</span>
                <span className="l-en">{item.qEn}</span>
              </span>
            </AccordionTrigger>

            <AccordionContent className="pb-4 text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">{item.aBs}</span>
              <span className="l-en">{item.aEn}</span>
            </AccordionContent>
          </UIAccordionItem>
        ))}
      </UIAccordion>
    </div>
  );
};
