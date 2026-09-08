import React from 'react';
import { Marquee } from '@/components/ui/marquee';

/** Every client cleared for use. Prolific, Mibo and Remote Friends are
 *  excluded on Ajla's explicit instruction and must not be added here. */
const LOGOS = [
  { file: 'empress.png', name: 'Empress' },
  { file: 'bhlog.png', name: 'BHLog Business Solutions' },
  { file: 'icarus.png', name: 'Icarus BH' },
  { file: 'rekontiva.png', name: 'Rekontiva' },
  { file: 'concat.png', name: 'Con-Cat' },
  { file: 'irfax.png', name: 'Irfax Logistic' },
];

interface ClientLogosProps {
  className?: string;
}

/**
 * The client strip.
 *
 * This is the marquee pattern from the supplied component, pointed at logos
 * instead of testimonials. The original carried a person's name, an
 * @username and a profile photograph per card, which is the one thing this
 * site decided not to do: companies and logos, not people. Stripping the
 * names out of a testimonial marquee leaves cards with nothing in them, so
 * the mechanism was kept and the content replaced.
 *
 * It also fits what there is. A testimonial wall needs many entries to read
 * as a wall; the reference had seven and duplicated two of them to fill the
 * strip. There are four filmed clients and six cleared logos, which is thin
 * for quotes and exactly right for a logo row.
 *
 * Sizing is by area, not by height. These marks range from near square
 * (Empress, 794x750) to long wordmarks (Rekontiva, 1321x344). Setting one
 * height makes the square ones look tiny next to the wide ones, so each gets
 * a box and `object-contain` fits it inside, which is what optical balance
 * across mixed logos actually requires.
 */
export const ClientLogos: React.FC<ClientLogosProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Marquee pauseOnHover className="[--duration:38s] [--gap:3.5rem]">
        {LOGOS.map((logo) => (
          <div
            key={logo.file}
            className="flex h-12 w-32 shrink-0 items-center justify-center"
          >
            <img
              src={`/logos/${logo.file}`}
              alt={logo.name}
              className="client-logo max-h-10 max-w-full object-contain"
            />
          </div>
        ))}
      </Marquee>

      {/* The strip fades into the page at both ends rather than being cut off
          by the container, so it reads as continuing rather than clipped. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--ground)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--ground)] to-transparent" />
    </div>
  );
};
