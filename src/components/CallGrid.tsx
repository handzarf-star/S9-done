import React from 'react';

/**
 * A hundred calls, N of them checked.
 *
 * The Pulse argument is a ratio, and a ratio is the one thing prose is bad at.
 * Written out, "two in a hundred" is a fact the reader agrees with and forgets.
 * Drawn, it is ninety eight dark dots, and the reader counts them without being
 * asked.
 *
 * The same grid appears three times down the page with a different `filled`:
 * two when a QA team does it by hand, four when the answer is to hire a second
 * person, a hundred when Pulse does it. Repeating the identical figure is the
 * point. The second instance is what kills the "we will just hire somebody"
 * objection, because it is visibly the same near empty picture.
 */
interface CallGridProps {
  /** How many of the hundred are checked. */
  filled: number;
  accent: string;
  /** Sits under the grid, in the accent. Usually the count as a fraction. */
  caption?: React.ReactNode;
  className?: string;
}

const TOTAL = 100;

export const CallGrid: React.FC<CallGridProps> = ({
  filled,
  accent,
  caption,
  className = '',
}) => {
  const lit = Math.max(0, Math.min(TOTAL, filled));

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div
        className="grid grid-cols-10 gap-1.5 sm:gap-2"
        role="img"
        aria-label={`${lit} od ${TOTAL} poziva provjereno`}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const on = i < lit;
          return (
            <span
              key={i}
              aria-hidden
              className="h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5"
              style={{
                background: on ? accent : 'rgba(255,255,255,0.07)',
                /* The lit dots get a soft halo so a handful of them still read
                   as "these ones" against ninety eight neighbours. */
                boxShadow: on ? `0 0 8px ${accent}66` : undefined,
                transition: 'background 400ms ease, box-shadow 400ms ease',
              }}
            />
          );
        })}
      </div>

      {caption && (
        <div
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};
