import React from 'react';

/**
 * The ground the whole site sits on.
 *
 * What went: three blurred cyan auras, a heavy vignette and a glowing
 * horizon beam. Large soft coloured blobs behind a dark grid are the single
 * most recognisable trait of a generated landing page, and they were also
 * fighting the grid for attention.
 *
 * What stays: the grid, because it is the Shape9 mark, one hairline at the
 * top, and the grain. The grid now reads as structure rather than mood.
 */
export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Flat ground. One very slight lift at the top so the header has
          something to sit against, nothing that reads as a spotlight.
          Reads from the CSS variables now instead of its own hardcoded
          hex stops, which had gone stale: this div was still painting the
          old near-black ground under the page after the token changed,
          because nothing here ever pointed at the token in the first
          place. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, var(--panel-raise) 0%, var(--ground) 42%, var(--ground) 100%)',
        }}
      />

      {/* The glow. A soft tint at the top of the viewport, in the current
          page's accent, not a fixed brand colour. --cyan/--cyan-rgb are
          already set per route by App.tsx from routes.ts (each product's
          own colour on its own page, the house colour everywhere else),
          so this needs no wiring of its own, it just has to read the same
          variable the rest of the chrome already reads. Wide and shallow,
          fading out well before halfway down, so it stays a tint at the
          top of the screen rather than a spotlight over the hero. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 60% at 50% 0%, rgba(var(--cyan-rgb), 0.16) 0%, rgba(var(--cyan-rgb), 0) 60%)',
        }}
      />

      {/* Structural grid, aligned to the 32px rhythm in index.css */}
      <div className="absolute inset-0 bg-grid" />

      {/* A single cyan hairline across the top. The house signature. */}
      <div className="bg-horizon-beam" />

      {/* Grain. The one texture worth keeping, and the detail a template
          never bothers with. Kept low so it reads as paper, not noise. */}
      <div
        className="absolute inset-0 opacity-[0.028] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
};
