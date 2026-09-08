import React from 'react';

/**
 * Hero, ported from the supplied hero-1 component.
 *
 * What changed and why:
 *
 * - shadcn `Button` and `@radix-ui/react-slot` are gone. Nothing here needs
 *   `asChild`, and neither package is installed. The actions are passed in
 *   as children so the page keeps its own buttons, including the one that
 *   opens the meeting modal.
 * - The original is light first with a `dark:` variant. Shape9 is a dark
 *   brand, so this builds the dark reading the original already described.
 * - Copy is `ReactNode`, not `string`, because every user facing string on
 *   this site ships twice, once in `.l-bs` and once in `.l-en`.
 *
 * The disc at the bottom is the whole idea. It reads as a horizon, and it
 * is the only light source on the page. Everything else is lit from below
 * by it, which is the opposite of the overhead glow every dark landing page
 * uses. These products are instruments, and instruments face a horizon.
 */
interface HeroProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  microcopy?: React.ReactNode;
  children?: React.ReactNode;
  /** Sits on the rule below the horizon. Used for the proof figures. */
  readout?: React.ReactNode;
}

export function Hero({ eyebrow, title, subtitle, microcopy, children, readout }: HeroProps) {
  return (
    <section id="hero" className="page-hero w-full overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-28 pb-0 text-center sm:px-6 sm:pt-36">
        {eyebrow && (
          <div className="hero-animate-1 mb-7 flex justify-center">
            <span className="eyebrow-chip">{eyebrow}</span>
          </div>
        )}

        <h1 className="hero-animate-2 hero-title mx-auto mb-7 max-w-4xl">{title}</h1>

        <p className="hero-animate-3 lead mx-auto mb-9">{subtitle}</p>

        {children && (
          <div className="hero-animate-4 mb-4 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            {children}
          </div>
        )}

        {microcopy && <span className="micro-copy">{microcopy}</span>}
      </div>

      {/* The horizon. A dark disc whose rim is the only bright edge on the
          page, so the light appears to rise from behind the fold. */}
      <div className="horizon" aria-hidden="true">
        <div className="horizon-disc" />
      </div>

      {readout && (
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6">{readout}</div>
      )}
    </section>
  );
}
