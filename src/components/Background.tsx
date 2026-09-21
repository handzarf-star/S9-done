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

      {/* The accent glow used to sit here: a radial tint at the top of the
          viewport in the current product's colour, read from --cyan-rgb.
          Removed 2026-09-21. On a product page the film covers the top of
          the screen and the glow does not, so the moment the film ended the
          page picked up a coloured wash the film never had. That is a
          second difference across the same join the grid and the hairline
          were just fixed for, and the cheapest way to not have it is to not
          paint it. The product's colour still carries the badge, the
          heading accent, the buttons and the sub-label under the logo. */}

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
