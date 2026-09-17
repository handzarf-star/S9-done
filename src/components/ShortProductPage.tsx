import React from 'react';
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';

import { ScrollReveal } from './ScrollReveal';
import { ContactForm } from './ContactForm';

type Icon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

export interface ShortCard {
  id: string;
  icon?: Icon;
  tBs: string;
  tEn: string;
  bs: string;
  en: string;
}

export interface ShortSection {
  id: string;
  /** Optional eyebrow badge above the heading. */
  badgeIcon?: Icon;
  badgeBs?: string;
  badgeEn?: string;
  headBs: string;
  headEn: string;
  /** Wide heading measure, for a heading written as a full sentence. */
  wide?: boolean;
  /** Paragraphs under the heading, inside the section head. */
  leadBs?: string[];
  leadEn?: string[];
  /** One of the three body shapes. */
  cards?: ShortCard[];
  /** `note` renders the cards muted rather than in the product colour, for
      the sections that set expectations instead of selling capability. */
  tone?: 'feature' | 'note';
  steps?: { bs: string; en: string }[];
  noteBs?: string;
  noteEn?: string;
}

export interface ShortProductPageProps {
  /** Used for the form anchor, the contact chip and nothing else. */
  name: string;
  accent: string;
  accentRgb: string;
  badgeIcon: Icon;
  badgeBs: string;
  badgeEn: string;
  /** The headline, split so the last words can carry the accent. */
  h1Bs: [string, string];
  h1En: [string, string];
  questionBs: string;
  questionEn: string;
  ledeBs: string;
  ledeEn: string;
  ctaShortBs: string;
  ctaShortEn: string;
  sections: ShortSection[];
  ctaHeadBs: string;
  ctaHeadEn: string;
  ctaBodyBs: string;
  ctaBodyEn: string;
  onNavigate?: (path: string) => void;
}

/**
 * The layout every short product page uses.
 *
 * There are five of these and they are the same page with different words,
 * so the layout lives here once. Writing them out five times is how the
 * desktop and phone menus ended up disagreeing about what a product was
 * called; the same drift would happen here within a month.
 *
 * Each page file holds only its own copy and passes it in. The chapter
 * numbers are the site's CSS counter on `.section-head`, so they renumber
 * themselves if a section is added or dropped.
 */
export const ShortProductPage: React.FC<ShortProductPageProps> = ({
  name,
  accent,
  accentRgb,
  badgeIcon: BadgeIcon,
  badgeBs,
  badgeEn,
  h1Bs,
  h1En,
  questionBs,
  questionEn,
  ledeBs,
  ledeEn,
  ctaShortBs,
  ctaShortEn,
  sections,
  ctaHeadBs,
  ctaHeadEn,
  ctaBodyBs,
  ctaBodyEn,
  onNavigate,
}) => {
  const anchor = `${name.toLowerCase()}-form`;

  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    }
  };

  const triggerMeetingModal = () => {
    window.dispatchEvent(new CustomEvent('open-meeting-modal'));
  };

  const soft = (alpha: number) => `rgba(${accentRgb}, ${alpha})`;

  return (
    /* No video hero: none of these five has a launch film, so the page opens
       with extra top padding the way the custom page does. */
    <div className="space-y-20 sm:space-y-28 pt-28 sm:pt-40 pb-24 sm:pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span
            className="s9-badge inline-flex items-center gap-2 mx-auto"
            style={{ color: accent, backgroundColor: soft(0.1), borderColor: soft(0.25) }}
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            <span className="l-bs">{badgeBs}</span>
            <span className="l-en">{badgeEn}</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">
            {h1Bs[0]} <span style={{ color: accent }}>{h1Bs[1]}</span>
          </span>
          <span className="l-en">
            {h1En[0]} <span style={{ color: accent }}>{h1En[1]}</span>
          </span>
        </h1>

        {/* Inline colour rather than `text-[var(--ink)]`: the bare `p` rule in
            index.css is unlayered and wins against any utility. */}
        <p
          className="hero-animate-3 text-xl sm:text-2xl font-semibold max-w-3xl mx-auto mb-4 leading-snug"
          style={{ color: 'var(--ink)' }}
        >
          <span className="l-bs">{questionBs}</span>
          <span className="l-en">{questionEn}</span>
        </p>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12">
          <span className="l-bs">{ledeBs}</span>
          <span className="l-en">{ledeEn}</span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={`#${anchor}`}
            onClick={(e) => go(e, `#${anchor}`)}
            className="btn-pill font-semibold text-sm text-[#0A0E15] py-3.5 px-8 transition-colors inline-flex items-center justify-center gap-2 focus-ring w-full sm:w-auto"
            style={{ backgroundColor: accent }}
          >
            <span className="l-bs">{ctaShortBs}</span>
            <span className="l-en">{ctaShortEn}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4" style={{ color: accent }} />
            <span className="l-bs">Zakažite razgovor</span>
            <span className="l-en">Book a call</span>
          </button>
        </div>
      </section>

      {sections.map((s) => {
        const SBadge = s.badgeIcon;
        const isNote = s.tone === 'note';
        return (
          <section key={s.id} className="px-4 sm:px-6 max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="section-head">
                {SBadge && (
                  <div
                    className="s9-badge text-xs font-semibold uppercase tracking-wider"
                    style={{ color: accent, backgroundColor: soft(0.08), borderColor: soft(0.2) }}
                  >
                    <SBadge className="w-3.5 h-3.5" />
                    <span className="l-bs">{s.badgeBs}</span>
                    <span className="l-en">{s.badgeEn}</span>
                  </div>
                )}

                <h2 className={s.wide ? 'h2-wide' : undefined}>
                  <span className="l-bs">{s.headBs}</span>
                  <span className="l-en">{s.headEn}</span>
                </h2>

                {(s.leadBs ?? []).map((bs, i) => (
                  <p key={bs}>
                    <span className="l-bs">{bs}</span>
                    <span className="l-en">{(s.leadEn ?? [])[i]}</span>
                  </p>
                ))}
              </div>

              {s.cards && (
                <div
                  className={`section-body grid grid-cols-1 gap-4 ${
                    s.cards.length === 3 && !isNote ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
                  }`}
                >
                  {s.cards.map((c) => {
                    const CIcon = c.icon;
                    return (
                      <div key={c.id} className="s9-card flex flex-col gap-2">
                        {CIcon ? (
                          <div className="flex items-center gap-3">
                            <CIcon className="w-5 h-5 shrink-0" style={{ color: accent }} />
                            <h3>
                              <span className="l-bs">{c.tBs}</span>
                              <span className="l-en">{c.tEn}</span>
                            </h3>
                          </div>
                        ) : (
                          <div
                            className="font-mono text-[11px] uppercase tracking-[0.18em]"
                            style={{ color: isNote ? 'var(--muted)' : accent }}
                          >
                            <span className="l-bs">{c.tBs}</span>
                            <span className="l-en">{c.tEn}</span>
                          </div>
                        )}
                        <p
                          className="text-sm leading-relaxed m-0"
                          style={{ color: isNote ? undefined : 'var(--ink)' }}
                        >
                          <span className="l-bs">{c.bs}</span>
                          <span className="l-en">{c.en}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {s.steps && (
                <div className="section-body flex flex-col gap-4">
                  <div className="s9-card grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {s.steps.map((st, i) => (
                      <p key={st.bs} className="text-sm leading-relaxed m-0 flex gap-3">
                        <span
                          aria-hidden
                          className="font-mono text-[11px] tabular-nums shrink-0 pt-0.5"
                          style={{ color: accent }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ color: 'var(--ink)' }}>
                          <span className="l-bs">{st.bs}</span>
                          <span className="l-en">{st.en}</span>
                        </span>
                      </p>
                    ))}
                  </div>
                  {s.noteBs && (
                    <p className="text-base sm:text-lg font-semibold leading-snug m-0" style={{ color: 'var(--ink)' }}>
                      <span className="l-bs">{s.noteBs}</span>
                      <span className="l-en">{s.noteEn}</span>
                    </p>
                  )}
                </div>
              )}

              {!s.cards && !s.steps && s.noteBs && (
                <div className="section-body">
                  <div className="s9-card">
                    <p className="text-sm sm:text-base leading-relaxed m-0">
                      <span className="l-bs">{s.noteBs}</span>
                      <span className="l-en">{s.noteEn}</span>
                    </p>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </section>
        );
      })}

      <section id={anchor} className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div
              className="s9-badge text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6"
              style={{ color: accent, backgroundColor: soft(0.12), borderColor: soft(0.25) }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Sljedeći korak</span>
              <span className="l-en">Next step</span>
            </div>

            <h2 className="h2-wide">
              <span className="l-bs">{ctaHeadBs}</span>
              <span className="l-en">{ctaHeadEn}</span>
            </h2>

            <p>
              <span className="l-bs">{ctaBodyBs}</span>
              <span className="l-en">{ctaBodyEn}</span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip={name} /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
