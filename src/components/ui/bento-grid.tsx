import React, { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Bento grid, ported from the supplied component.
 *
 * What changed and why:
 *
 * - `@radix-ui/react-icons` and shadcn `Button` are gone. lucide-react is
 *   already a dependency and carries the same arrow.
 * - The original hides the call to action until hover and slides the body
 *   up to make room. On a touch screen there is no hover, so the link was
 *   unreachable on half the traffic. Here the link is always present and
 *   only its arrow moves.
 * - Each card carries its product colour through `--accent`, so the rim,
 *   the icon and the link all follow the product rather than one house cyan.
 *   That is what makes four cards read as four instruments.
 */

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('grid w-full grid-cols-1 gap-3 md:grid-cols-3', className)}>{children}</div>
);

interface BentoCardProps {
  /** Product name, set in mono as a readout label */
  label: ReactNode;
  name: ReactNode;
  description: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  cta: ReactNode;
  /** Product accent, e.g. "#A98CFF" */
  accent: string;
  className?: string;
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const BentoCard = ({
  label,
  name,
  description,
  Icon,
  href,
  cta,
  accent,
  className,
  onNavigate,
}: BentoCardProps) => (
  <a
    href={href}
    onClick={(e) => onNavigate?.(e, href)}
    style={{ ['--accent' as string]: accent }}
    className={cn(
      'bento-card group relative flex flex-col justify-between overflow-hidden',
      className,
    )}
  >
    <div className="flex items-start justify-between gap-4">
      <Icon className="h-5 w-5 shrink-0 text-[var(--accent)]" />
      <span className="readout text-[var(--accent)]">{label}</span>
    </div>

    <div className="mt-auto pt-10">
      <h3 className="bento-name mb-2">{name}</h3>
      <p className="bento-desc">{description}</p>

      <span className="bento-cta mt-5">
        {cta}
        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </div>
  </a>
);

export { BentoCard, BentoGrid };
