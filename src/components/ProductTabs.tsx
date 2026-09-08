import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ProductTabItem {
  id: string;
  titleBs: string;
  titleEn: string;
  descBs: string;
  descEn: string;
  /** Optional step number, used on the Libra flow. */
  num?: string;
}

interface ProductTabsProps {
  items: ProductTabItem[];
  /** The product's own accent, as a literal hex. */
  accent: string;
  accentRgb: string;
  className?: string;
}

/**
 * The narrow-screen half of a capabilities section.
 *
 * This replaces a select element and a single card beneath it. A select is
 * the wrong control here: it hides every option until it is opened, so the
 * reader has to know the list is worth opening before they see any of it.
 * Tabs put the labels on the page. On a phone they scroll sideways, which
 * signals there is more without spending vertical space on it.
 *
 * The wide-screen grid is deliberately not replaced. It shows all four items
 * at once, and a buyer scanning what a product does is better served seeing
 * them together than clicking through them one at a time. Tabs are an
 * improvement on a dropdown, not on a grid.
 */
export const ProductTabs: React.FC<ProductTabsProps> = ({
  items,
  accent,
  accentRgb,
  className = '',
}) => {
  return (
    <Tabs defaultValue={items[0]?.id} className={className}>
      {/* Overflow-x rather than wrapping: a wrapped tab list changes height
          as the selection moves, which shifts the panel below it. */}
      <TabsList className="w-full justify-start overflow-x-auto bg-[var(--panel)] border border-[var(--line)] p-1 h-auto rounded-xl mb-3">
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="shrink-0 text-xs font-semibold px-3 py-2 rounded-lg text-[var(--muted)]
                       data-[state=active]:text-[var(--ink)]
                       data-[state=active]:shadow-none"
            style={
              {
                ['--tab-active-bg' as string]: `rgba(${accentRgb}, 0.14)`,
              } as React.CSSProperties
            }
          >
            {item.num ? `${item.num}. ` : ''}
            <span className="l-bs">{item.titleBs}</span>
            <span className="l-en">{item.titleEn}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.id} value={item.id} className="mt-0">
          <div className="s9-card">
            {item.num && (
              <div
                className="w-9 h-9 rounded-xl font-mono font-bold text-sm flex items-center justify-center mb-3 border"
                style={{
                  color: accent,
                  backgroundColor: `rgba(${accentRgb}, 0.1)`,
                  borderColor: `rgba(${accentRgb}, 0.2)`,
                }}
              >
                {item.num}
              </div>
            )}
            <h3 className="text-base font-bold text-[var(--ink)] mb-3">
              <span className="l-bs">{item.titleBs}</span>
              <span className="l-en">{item.titleEn}</span>
            </h3>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              <span className="l-bs">{item.descBs}</span>
              <span className="l-en">{item.descEn}</span>
            </p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
