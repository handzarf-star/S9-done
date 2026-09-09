import React from 'react';
import { CONTACT, COMPANY } from '../config';
import { Linkedin, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <footer className="border-t border-[var(--line)] bg-[#080B10] text-[#8B95A7] py-12 sm:py-16 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* BRAND & CONTACT BLOCK */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => go(e, '/')}
              className="inline-flex items-center focus-ring"
              aria-label="Shape9"
            >
              <img src="/logo.svg" alt="" className="h-6 w-auto" />
            </a>

            <p className="text-sm max-w-md leading-relaxed">
              <span className="l-bs">
                Gradimo digitalna iskustva koja prave razliku. Sarajevo, od 2015. godine.
              </span>
              <span className="l-en">
                We Build Digital Experiences That Matter. Sarajevo, since 2015.
              </span>
            </p>

            <div className="pt-2 space-y-2 text-xs sm:text-sm text-[var(--ink)]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--cyan)] shrink-0" />
                <span>Sarajevo</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--cyan)] shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--cyan)] transition-colors focus-ring">
                  {CONTACT.email}
                </a>
              </div>
              {CONTACT.linkedin && (
                <div className="flex items-center gap-2 pt-1">
                  <Linkedin className="w-4 h-4 text-[var(--cyan)] shrink-0" />
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--cyan)] transition-colors focus-ring"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 1: RJEŠENJA */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink)] mb-4">
              <span className="l-bs">Rješenja</span>
              <span className="l-en">Solutions</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/pulse"
                  onClick={(e) => go(e, '/pulse')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  Shape9 Pulse
                </a>
              </li>
              <li>
                <a
                  href="/atlas"
                  onClick={(e) => go(e, '/atlas')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  Shape9 Atlas
                </a>
              </li>
              <li>
                <a
                  href="/sonar"
                  onClick={(e) => go(e, '/sonar')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  Shape9 Sonar
                </a>
              </li>
              <li>
                <a
                  href="/mode"
                  onClick={(e) => go(e, '/mode')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  Shape9 Mode
                </a>
              </li>
              {/* Libra sits below Mode rather than being dropped. It is out of
                  the header while the focus is elsewhere, but the page is live
                  and a footer is where a backgrounded product stays findable. */}
              <li>
                <a
                  href="/libra"
                  onClick={(e) => go(e, '/libra')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  Shape9 Libra
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: FIRMA */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink)] mb-4">
              <span className="l-bs">Kompanija</span>
              <span className="l-en">Company</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/radovi"
                  onClick={(e) => go(e, '/radovi')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  <span className="l-bs">Portfolio</span>
                  <span className="l-en">Portfolio</span>
                </a>
              </li>
              <li>
                <a
                  href="/po-mjeri"
                  onClick={(e) => go(e, '/po-mjeri')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  <span className="l-bs">Po mjeri</span>
                  <span className="l-en">Custom Built</span>
                </a>
              </li>
              <li>
                <a
                  href="/o-nama"
                  onClick={(e) => go(e, '/o-nama')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  <span className="l-bs">O nama</span>
                  <span className="l-en">About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="/privatnost"
                  onClick={(e) => go(e, '/privatnost')}
                  className="hover:text-[var(--ink)] transition-colors focus-ring"
                >
                  <span className="l-bs">Politika privatnosti</span>
                  <span className="l-en">Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT LINE */}
        <div className="pt-8 border-t border-[var(--line)] text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--muted)]">
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
