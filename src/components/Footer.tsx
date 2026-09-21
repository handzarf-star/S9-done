import React from 'react';
import { CONTACT, COMPANY } from '../config';
import { ArrowRight, Linkedin, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

/* Four products, then a way to the rest.
   The footer used to list all eleven, which made the solutions column twice
   the height of every other one and was the main reason the whole footer ran
   to 570px, 63% of a laptop screen. Four is Faris's pick, 2026-09-21, and the
   fifth line goes to the section where a visitor chooses by department. */
const FOOTER_PRODUCTS = [
  { path: '/mode', name: 'Mode' },
  { path: '/pulse', name: 'Pulse' },
  { path: '/atlas', name: 'Atlas' },
  { path: '/hive', name: 'Hive' },
];

const COMPANY_LINKS = [
  { path: '/radovi', bs: 'Portfolio', en: 'Portfolio' },
  { path: '/po-mjeri', bs: 'Po mjeri', en: 'Custom Built' },
  { path: '/o-nama', bs: 'O nama', en: 'About Us' },
  { path: '/privatnost', bs: 'Politika privatnosti', en: 'Privacy Policy' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigate(target);
  };

  const linkClass =
    'text-sm text-[var(--body)] hover:text-[var(--ink)] transition-colors focus-ring rounded-sm';

  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[#080B10] py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* The statement sits beside the columns, not above them. Stacked, it
            and its margin added 139px to a footer whose own measurement
            showed 212px of the 552 was nothing but spacing. Side by side the
            two blocks share the tallest one's height instead of summing. */}
        <div className="grid gap-y-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-16">
        <div>
        {/* The line the footer is built around. It was 14px, tucked under the
            logo beside the address, which is a caption and not a statement.
            It is the one thing here worth reading, so it is set like one. */}
        <a
          href="/"
          onClick={(e) => go(e, '/')}
          className="focus-ring inline-block rounded-lg"
          aria-label="Shape9"
        >
          <img src="/logo.svg" alt="" className="h-6 w-auto" />
        </a>

        {/* Sized and set to belong to the mark above it, not to compete with
            it. At 28px against a 24px logo the line read as a headline that
            happened to have a logo on top; in mono, a step under the mark and
            close to it, the two read as one item. Mono because everything
            instrument-like on this site is mono, and a tagline is a label on
            the company rather than a sentence in a paragraph. */}
        <p
          className="mt-2.5 max-w-[34ch] text-[13px] leading-[1.5] text-[var(--ink-dim)] sm:text-[14px]"
          /* `font-mono` is a layered utility and `p { font-family: var(--f-sans) }`
             in index.css is not, so the class lost and this stayed Inter.
             Inline wins outright. */
          style={{ fontFamily: 'var(--f-mono)', letterSpacing: '-0.005em' }}
        >
          <span className="l-bs">Gradimo digitalna iskustva koja prave razliku.</span>
          <span className="l-en">We Build Digital Experiences That Matter.</span>
        </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-12">
          <div>
            <h3 className="readout pb-3">
              <span className="l-bs">Rješenja</span>
              <span className="l-en">Solutions</span>
            </h3>
            <ul className="space-y-2">
              {FOOTER_PRODUCTS.map((p) => (
                <li key={p.path}>
                  <a href={p.path} onClick={(e) => go(e, p.path)} className={linkClass}>
                    {p.name}
                  </a>
                </li>
              ))}
              <li className="pt-0.5">
                <a
                  href="/#izazov"
                  onClick={(e) => go(e, '#izazov')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cyan)] transition-colors hover:text-[var(--ink)] focus-ring rounded-sm"
                >
                  <span className="l-bs">Sva rješenja</span>
                  <span className="l-en">All solutions</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="readout pb-3">
              <span className="l-bs">Kompanija</span>
              <span className="l-en">Company</span>
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.path}>
                  <a href={l.path} onClick={(e) => go(e, l.path)} className={linkClass}>
                    <span className="l-bs">{l.bs}</span>
                    <span className="l-en">{l.en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className="readout pb-3">
              <span className="l-bs">Kontakt</span>
              <span className="l-en">Contact</span>
            </h3>
            <ul className="space-y-2 text-sm text-[var(--body)]">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--cyan)]" />
                <span>Sarajevo</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[var(--cyan)]" />
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.linkedin && (
                <li className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 shrink-0 text-[var(--cyan)]" />
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-2 border-t border-[var(--line-subtle)] pt-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center">
          <div>
            © {currentYear} {COMPANY.legalName}.
            {COMPANY.idNumber && ` ID: ${COMPANY.idNumber}.`}
            {COMPANY.vatNumber && ` PDV: ${COMPANY.vatNumber}.`}
          </div>
          <div>
            <span className="l-bs">Sarajevo · Bosna i Hercegovina</span>
            <span className="l-en">Sarajevo · Bosnia and Herzegovina</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
