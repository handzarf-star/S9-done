import React from 'react';
import { Marquee } from '@/components/ui/marquee';

/**
 * The client proof strip.
 *
 * Every card traces to something on the record:
 *   - BHLog, Icarus BH and Rekontiva are quotes, filmed on camera.
 *   - Empress and the Icarus figures are facts, taken from the same films
 *     and from the case study pages already published on this site.
 *
 * Monad Lead and the twelve country warehouse were dropped, not because the
 * proof was weak but because no logo exists for either and a card with no
 * mark reads as a different component. Con-Cat and Irfax stay out because no
 * case material exists for them at all.
 *
 * Attribution is to the company, never to the person who said it, so no
 * individual's name or face appears here. Where a client logo exists it
 * carries the card, so every card in the strip shows a mark.
 *
 * Empress deliberately carries a fact and not a quote. The Empress interview
 * is in the future tense, recorded at the start of the project, and reading
 * it next to three past tense quotes would present an expectation as a
 * result. It becomes a quote when someone there gives one in the past tense.
 */

type Card = {
  id: string;
  company: string;
  /** Sector, not product. Several of these systems have no approved name. */
  tagBs: string;
  tagEn: string;
  /** Required: a card without a mark reads as a different component. */
  logo: string;
  /** Quotes get quotation marks and the source's own wording. */
  quote: boolean;
  bs: string;
  en: string;
};

const CARDS: Card[] = [
  {
    id: 'bhlog-1',
    company: 'BHLog',
    tagBs: 'Veleprodaja i narudžbe',
    tagEn: 'Wholesale and orders',
    logo: 'bhlog.png',
    quote: true,
    bs: 'Jako smo zadovoljni. Ubrzali smo kompletan proces, od poručivanja robe do isporuke.',
    en: 'We are very satisfied. We sped up the whole process, from placing an order to delivery.',
  },
  {
    id: 'empress',
    company: 'Empress',
    tagBs: 'Skladište i narudžbe',
    tagEn: 'Stock and orders',
    logo: 'empress.png',
    quote: false,
    bs: 'Stanje u magacinu sada se poklapa sa stanjem u sistemu.',
    en: 'Stock on the floor now matches stock in the system.',
  },
  {
    id: 'icarus-1',
    company: 'Icarus BH',
    tagBs: 'Proizvodnja',
    tagEn: 'Manufacturing',
    logo: 'icarus.png',
    quote: true,
    bs: 'Više ne koristimo papire i olovke. Imamo realne podatke u toku dana, i danas u proizvodnji radi savršeno.',
    en: 'We no longer use paper and pencils. We have real data during the day, and today it runs perfectly in production.',
  },
  {
    id: 'rekontiva-1',
    company: 'Rekontiva',
    tagBs: 'Knjigovodstvo',
    tagEn: 'Bookkeeping',
    logo: 'rekontiva.png',
    quote: true,
    bs: 'Značajno nam je ubrzalo procese dostave i obrade dokumentacije. Smanjena je potreba za fizičkim dolascima klijenata.',
    en: 'It significantly sped up how documents reach us and get processed. Clients need to come in person far less.',
  },
  {
    id: 'icarus-2',
    company: 'Icarus BH',
    tagBs: 'Proizvodnja',
    tagEn: 'Manufacturing',
    logo: 'icarus.png',
    quote: false,
    bs: 'Sto petnaest radnika, više linija i smjena, između 900 i 1.200 pari dnevno. Učinak se vodio na papir, sada se mjeri u realnom vremenu.',
    en: 'One hundred and fifteen workers, several lines and shifts, between 900 and 1.200 pairs a day. Output was written on paper. It is now measured live.',
  },
  {
    id: 'rekontiva-2',
    company: 'Rekontiva',
    tagBs: 'Knjigovodstvo',
    tagEn: 'Bookkeeping',
    logo: 'rekontiva.png',
    quote: true,
    bs: 'Dokumentacija nam je bila rasuta. Klijenti šalju na različite mailove i različite brojeve, i mnogo vremena oduzme da se sve skupi na jedno mjesto.',
    en: 'Our documents were scattered. Clients send to different mailboxes and different numbers, and pulling it all into one place eats a lot of time.',
  },
  {
    id: 'bhlog-2',
    company: 'BHLog',
    tagBs: 'Veleprodaja i narudžbe',
    tagEn: 'Wholesale and orders',
    logo: 'bhlog.png',
    quote: true,
    bs: 'Klijentima je bitno da vide kompletan timeline, da prate u kojem je statusu narudžba.',
    en: 'What matters to our clients is seeing the whole timeline, following what status an order is in.',
  },
];

/* Split so a logo lands in each row rather than all four in the top one, and
   so a quote and a figure alternate down the wall. */
const ROW_ONE = [CARDS[0], CARDS[1], CARDS[2], CARDS[3]];
const ROW_TWO = [CARDS[4], CARDS[5], CARDS[6]];

const ProofCard: React.FC<{ card: Card }> = ({ card }) => (
  /* Deliberately quiet. The strip measured 400px against the headline's
     132 and took 44% of the first screen, so it read as the hero and the
     headline read as a caption. It is proof, which belongs under a claim,
     not over it: smaller type, a fainter border, and body colour dropped a
     step so the company name stays the brightest thing in the card. */
  <figure
    className="flex h-full w-[15rem] shrink-0 flex-col gap-2 rounded-[var(--r-lg)] border border-[var(--line-subtle)] bg-[rgba(255,255,255,0.02)] px-3.5 py-3 sm:w-[16.5rem]"
    style={{ whiteSpace: 'normal' }}
  >
    <figcaption className="flex items-center gap-2">
      {/* No container behind the mark. `proof-logo` crushes each logo to
          pure white, so four logos drawn in four brand colours read as one
          family instead of four competing ones. */}
      <img
        src={`/logos/${card.logo}`}
        alt=""
        loading="lazy"
        className="proof-logo h-5 w-auto max-w-[4.75rem] shrink-0 object-contain object-left"
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-xs font-semibold leading-tight text-[var(--ink)]">
          {card.company}
        </span>
        <span className="truncate font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-[var(--muted)]">
          <span className="l-bs">{card.tagBs}</span>
          <span className="l-en">{card.tagEn}</span>
        </span>
      </span>
    </figcaption>

    <blockquote className="text-[11.5px] leading-[1.55] text-[var(--muted)]">
      <span className="l-bs">{card.quote ? `„${card.bs}“` : card.bs}</span>
      <span className="l-en">{card.quote ? `“${card.en}”` : card.en}</span>
    </blockquote>
  </figure>
);

export const TestimonialMarquee: React.FC<{ className?: string }> = ({ className = '' }) => (
  <section
    className={`relative w-full ${className}`}
    aria-label="Klijenti"
  >
    {/* The strip repeats its children to loop, so it is hidden from assistive
        technology and the same seven cards are exposed once, below, as a
        plain list. Otherwise a screen reader reads all seven eight times. */}
    {/* The ends fade with a mask, not with a gradient painted in the page
        colour. Two overlays filled with `--ground` sat on top of the strip
        and worked only while whatever was behind them was also `--ground`.
        The hero's background is lighter than that, so scrolling revealed
        two dark smears sliding over it. A mask removes pixels instead of
        covering them, so it is right over any background. */}
    <div
      aria-hidden="true"
      className="relative flex flex-col items-center overflow-hidden"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, #000 2.5rem, #000 calc(100% - 2.5rem), transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0, #000 2.5rem, #000 calc(100% - 2.5rem), transparent 100%)',
      }}
    >
      <Marquee pauseOnHover className="marquee-pause [--duration:58s] [--gap:1rem] sm:[--gap:1rem]">
        {ROW_ONE.map((card) => (
          <ProofCard key={card.id} card={card} />
        ))}
      </Marquee>
      {/* The second row runs the other way. Two rows moving as one strip read
          as a single slab sliding past; opposed, they read as a wall.
          On a phone there is only one row: two took 376px of an 844px
          screen and buried the headline above them. */}
      <div className="hidden w-full sm:block">
        <Marquee reverse pauseOnHover className="marquee-reverse marquee-pause [--duration:58s] [--gap:1rem] sm:[--gap:1rem]">
          {ROW_TWO.map((card) => (
            <ProofCard key={card.id} card={card} />
          ))}
        </Marquee>
      </div>

    </div>

    <ul className="sr-only">
      {CARDS.map((card) => (
        <li key={card.id}>
          <span className="l-bs">
            {card.company}. {card.quote ? `„${card.bs}“` : card.bs}
          </span>
          <span className="l-en">
            {card.company}. {card.quote ? `“${card.en}”` : card.en}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default TestimonialMarquee;
