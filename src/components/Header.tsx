import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Bot,
  Boxes,
  Calendar,
  ChevronDown,
  FileText,
  Headphones,
  Hexagon,
  LineChart,
  Menu,
  MessageSquareText,
  Package,
  PhoneCall,
  Sparkles,
  Store,
  X,
} from 'lucide-react';
import { MeetingScheduler } from './MeetingScheduler';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: 'bs' | 'en';
  onToggleLang: () => void;
}

/* The menu names the job, not the product.
   Pulse, Atlas, Sonar and Mode are words we invented. A boutique owner
   looking for stock control has no way to know that Mode is theirs, and the
   menu used to lead with the invented word and push the job into a grey
   subtitle that `truncate` then cut off mid word at this menu's width. So
   the job is the label and the name sits under it, small, in its own colour.
   Wording is Faris's, 2026-09-16. */
interface Product {
  path: string;
  shortName: string;
  color: string;
  rgb: string;
  icon: React.ComponentType<{ className?: string }>;
  jobBs: string;
  jobEn: string;
}

const P: Record<string, Product> = {
  pulse: {
    path: '/pulse',
    shortName: 'Pulse',
    color: '#A98CFF',
    rgb: '169, 140, 255',
    icon: PhoneCall,
    jobBs: 'Analiza i kontrola poziva',
    jobEn: 'Call analysis and checks',
  },
  mode: {
    path: '/mode',
    shortName: 'Mode',
    color: '#FF6170',
    rgb: '255, 97, 112',
    /* A shop front, not a shirt. The film tells a boutique story, the way
       Pulse's tells a call centre story, but a story is a case and not a
       limit. The label and the icon both say retail so a shoe shop or a
       phone shop does not read this as somebody else's product. */
    icon: Store,
    jobBs: 'Sistem za maloprodaju',
    jobEn: 'Built for retail',
  },
  atlas: {
    path: '/atlas',
    shortName: 'Atlas',
    color: '#FFA658',
    rgb: '255, 166, 88',
    icon: Package,
    jobBs: 'Napredno upravljanje skladištem',
    jobEn: 'Advanced warehouse management',
  },
  libra: {
    path: '/libra',
    shortName: 'Libra',
    color: '#3DD68C',
    rgb: '61, 214, 140',
    icon: FileText,
    jobBs: 'Dokumenti i knjigovodstvo',
    jobEn: 'Documents and bookkeeping',
  },
  vesta: {
    path: '/vesta',
    shortName: 'Vesta',
    color: '#588DFA',
    rgb: '88, 141, 250',
    icon: Boxes,
    jobBs: 'Imovina i inventar kompanije',
    jobEn: 'Group assets and inventory',
  },
  sonar: {
    path: '/sonar',
    shortName: 'Sonar',
    color: '#35B6F0',
    rgb: '53, 182, 240',
    icon: LineChart,
    jobBs: 'AI agent za analitiku',
    jobEn: 'AI agent for analytics',
  },
  bell: {
    path: '/bell',
    shortName: 'Bell',
    color: '#9CCB24',
    rgb: '156, 203, 36',
    icon: Headphones,
    jobBs: 'Cloud telefonija',
    jobEn: 'Cloud telephony',
  },
  hive: {
    path: '/hive',
    shortName: 'Hive',
    color: '#DAB323',
    rgb: '218, 179, 35',
    icon: Hexagon,
    jobBs: 'Prodaja i narudžbe',
    jobEn: 'Sales and orders',
  },
  echo: {
    path: '/echo',
    shortName: 'Echo',
    color: '#29D1C9',
    rgb: '41, 209, 201',
    icon: MessageSquareText,
    jobBs: 'SMS kampanje',
    jobEn: 'SMS campaigns',
  },
  neon: {
    path: '/neon',
    shortName: 'Neon',
    color: '#FCA5CD',
    rgb: '252, 165, 205',
    icon: Sparkles,
    jobBs: 'Viber kampanje',
    jobEn: 'Viber campaigns',
  },
  iris: {
    path: '/iris',
    shortName: 'Iris',
    color: '#C661DC',
    rgb: '198, 97, 220',
    icon: Bot,
    jobBs: 'AI chatbot za poslovne podatke',
    jobEn: 'AI chatbot for your business data',
  },
};

/* Five categories, Faris 2026-09-17. Four of them name a place inside the
   buyer's own company, which is the point: nobody has to work out which
   bucket they are in. The fifth is the exception and was argued as one.
   Category order is his and it supersedes the earlier flat order, which is
   why Sonar now sits last rather than fourth.
   Full map, including what has no page yet:
     Call centar          Bell · Pulse
     Prodaja i skladište  Mode · Atlas · Hive
     Marketing            Echo · Neon
     Administracija       Libra · Vesta
     AI analitika         Sonar · Iris

   All eleven are listed, Faris 2026-09-17. Bell, Hive, Echo, Neon and Iris
   carry names Mersad has not approved. That was raised twice and he decided
   to publish them, so they are here; the approval is his to get.

   LAYOUT, and the number that decided it. This started as one column with
   headings, and the note here said to move to two at roughly eight products.
   Eleven items under five headings measures about 770px, which does not fit
   under the header on a 900px viewport, so the threshold is now crossed and
   the menu is two columns. `col` splits them by hand rather than by CSS
   `columns`, which breaks a group across the fold wherever it likes. The
   split keeps the two sides within one row of each other: five items and two
   headings on the left, six items and three headings on the right.

   The phone sheet stays one column and ignores `col`, because a phone has
   the vertical room a dropdown does not. */
const CATEGORIES = [
  { id: 'call', col: 0, labelBs: 'Call centar', labelEn: 'Call centre', items: [P.pulse, P.bell] },
  { id: 'prodaja', col: 0, labelBs: 'Prodaja i skladište', labelEn: 'Sales and stock', items: [P.mode, P.atlas, P.hive] },
  { id: 'marketing', col: 1, labelBs: 'Marketing', labelEn: 'Marketing', items: [P.echo, P.neon] },
  { id: 'admin', col: 1, labelBs: 'Administracija', labelEn: 'Back office', items: [P.libra, P.vesta] },
  { id: 'ai', col: 1, labelBs: 'AI analitika', labelEn: 'AI analytics', items: [P.sonar, P.iris] },
];

const PRODUCTS = CATEGORIES.flatMap((c) => c.items);

/* One row, rendered identically in the dropdown and in the phone sheet.
   Shared on purpose: the two used to be written out separately and drifted,
   which is how the phone menu ended up carrying only „Shape9 Pulse" with no
   word about what the product does. */
const ProductRow: React.FC<{ prod: Product; active: boolean; arrow?: boolean }> = ({
  prod,
  active,
  arrow = false,
}) => {
  const Icon = prod.icon;
  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `rgba(${prod.rgb}, 0.12)`, color: prod.color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      {/* The arrow is a sibling of the text column, not a flex partner of the
          label. Inside the label it forced `justify-between`, which is why the
          label could never be allowed to wrap. */}
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-semibold leading-snug"
          style={{ color: active ? prod.color : 'var(--ink)' }}
        >
          <span className="l-bs">{prod.jobBs}</span>
          <span className="l-en">{prod.jobEn}</span>
        </div>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.2em] mt-1"
          style={{ color: prod.color }}
        >
          {prod.shortName}
        </div>
      </div>
      {arrow && (
        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};

/* The category heading, separated by space rather than by a rule so a menu of
   four groups does not read as a table.

   `.readout` rather than font and size utilities, and that is not a
   preference. On the phone this heading is an `h3`, and `h3` in index.css is
   an unlayered rule: it sets font-family, size, weight, colour and tracking,
   and unlayered CSS beats every Tailwind utility no matter the specificity.
   The first version of this used `font-mono text-[10px] text-[var(--muted)]`
   and the phone rendered four full sized ink coloured headings instead.
   `.readout` is unlayered too and a class outranks an element, so it wins,
   and it is the treatment every other measured label on this site already
   has. */
const catHeadingClass = 'readout px-3 pb-1.5';

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  lang,
  onToggleLang,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  const isProductPath = PRODUCTS.some((p) => p.path === currentPath);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsMeetingModalOpen(true);
    window.addEventListener('open-meeting-modal', handleOpenModal);
    return () => window.removeEventListener('open-meeting-modal', handleOpenModal);
  }, []);

  // Outside click, Escape and focus handling for both the dropdown and the
  // dialog are Radix's job now. Nothing left to wire by hand.

  const go = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  const activeProduct = PRODUCTS.find((p) => p.path === currentPath);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[var(--ground)]/90 backdrop-blur-md border-b border-[var(--line)] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* BRAND LOGO */}
          <a
            href="/"
            onClick={(e) => go(e, '/')}
            className="flex flex-col items-start gap-0.5 group focus-ring rounded-lg p-1 -ml-1"
          >
            <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="Shape9"
                className={`w-auto transition-all duration-200 ${
                  activeProduct ? 'h-5 sm:h-6' : 'h-6 sm:h-7'
                }`}
              />
            </div>

            {/* PRODUCT SUB-LABEL */}
            {activeProduct && (
              <div className="overflow-hidden flex items-center transition-all duration-200 h-3.5 mt-0.5 animate-in fade-in duration-200">
                <span
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] font-mono leading-none block"
                  style={{ color: activeProduct.color }}
                >
                  {activeProduct.shortName}
                </span>
              </div>
            )}
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {/* PRODUCTS DROPDOWN.
                Radix DropdownMenu from the shadcn registry, replacing a hand
                rolled version that tracked its own open state, listened for
                mousedown on the document to close on an outside click, and
                handled Escape itself. All of that is now Radix's job, and it
                additionally brings what the hand rolled one never had: arrow
                key navigation between items, focus returning to the trigger
                on close, typeahead, and correct aria wiring.

                The look is unchanged. Every colour below is still a Shape9
                token or the product's own accent. */}
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors focus-ring cursor-pointer outline-none ${
                    isDropdownOpen || isProductPath
                      ? 'text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.08)]'
                      : 'text-[var(--body)] hover:text-[var(--ink)] hover:bg-white/5'
                  }`}
                >
                  <span className="l-bs">Rješenja</span>
                  <span className="l-en">Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-[var(--dur-2)] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isDropdownOpen ? 'rotate-180 text-[var(--cyan)]' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                sideOffset={8}
                /* Two columns of 22rem, the width one column needed on its
                   own: the text column is 206px at 20rem and „Napredno
                   upravljanje skladištem" wants about 230, so the label sets
                   the width and the column count sets the height. */
                className="w-[44rem] p-2 rounded-2xl bg-[var(--panel)] border-[var(--line)]"
                style={{ boxShadow: 'var(--shadow-overlay)' }}
              >
                {/* Radix `Group` and `Label` rather than a styled div and a
                    span. They carry `role="group"` and wire `aria-labelledby`
                    to the heading, so a screen reader announces „Call centar,
                    grupa, dvije stavke" instead of reading eleven unrelated
                    links in a row. That is the whole reason the categories
                    exist, said out loud.

                    Arrow keys still walk the whole menu in DOM order, which
                    is down the left column and then down the right. That is
                    what a sighted user reading the columns does too. */}
                <div className="grid grid-cols-2 gap-x-2">
                  {[0, 1].map((col) => (
                    <div key={col}>
                      {CATEGORIES.filter((c) => c.col === col).map((cat, i) => (
                        <DropdownMenuGroup key={cat.id}>
                          <DropdownMenuLabel className={`${catHeadingClass} ${i === 0 ? 'pt-1' : 'pt-4'}`}>
                            <span className="l-bs">{cat.labelBs}</span>
                            <span className="l-en">{cat.labelEn}</span>
                          </DropdownMenuLabel>

                          {cat.items.map((prod) => (
                            <DropdownMenuItem
                              key={prod.path}
                              asChild
                              className="p-3 rounded-xl cursor-pointer focus:bg-[rgba(255,255,255,0.04)] group"
                            >
                              <a href={prod.path} onClick={(e) => go(e, prod.path)}>
                                <ProductRow prod={prod} active={currentPath === prod.path} arrow />
                              </a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      ))}
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="/radovi"
              onClick={(e) => go(e, '/radovi')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors focus-ring ${
                currentPath.startsWith('/radovi')
                  ? 'text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.08)]'
                  : 'text-[var(--body)] hover:text-[var(--ink)] hover:bg-white/5'
              }`}
            >
              <span className="l-bs">Portfolio</span>
              <span className="l-en">Portfolio</span>
            </a>

            <a
              href="/po-mjeri"
              onClick={(e) => go(e, '/po-mjeri')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors focus-ring ${
                currentPath === '/po-mjeri'
                  ? 'text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.08)]'
                  : 'text-[var(--body)] hover:text-[var(--ink)] hover:bg-white/5'
              }`}
            >
              <span className="l-bs">Po mjeri</span>
              <span className="l-en">Custom Built</span>
            </a>

            <a
              href="/o-nama"
              onClick={(e) => go(e, '/o-nama')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors focus-ring ${
                currentPath === '/o-nama'
                  ? 'text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.08)]'
                  : 'text-[var(--body)] hover:text-[var(--ink)] hover:bg-white/5'
              }`}
            >
              <span className="l-bs">O nama</span>
              <span className="l-en">About Us</span>
            </a>
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* LANGUAGE TOGGLE */}
            <div
              role="group"
              aria-label={lang === 'bs' ? 'Jezik' : 'Language'}
              className="relative flex items-center p-0.5 rounded-lg border border-[var(--line)] bg-[var(--panel)]"
            >
              <span
                aria-hidden="true"
                className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-[6px] bg-[rgba(var(--cyan-rgb),0.16)] border border-[rgba(var(--cyan-rgb),0.35)]"
                style={{
                  transform: lang === 'bs' ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'transform var(--dur-2) var(--ease)',
                }}
              />
              {(['bs', 'en'] as const).map((code) => {
                const active = lang === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      if (!active) onToggleLang();
                    }}
                    aria-pressed={active}
                    className="relative z-10 px-2 py-1 rounded-[6px] text-xs font-bold tracking-wider uppercase focus-ring cursor-pointer"
                    style={{
                      color: active ? 'var(--cyan)' : 'var(--muted)',
                      transition: 'color var(--dur-1) var(--ease)',
                    }}
                  >
                    {code.toUpperCase()}
                  </button>
                );
              })}
            </div>

            {/* MAIN HEADER CTA
                The responsive hiding sits on a wrapper rather than on the
                button itself. `.btn-primary` in index.css is unlayered CSS and
                sets `display: inline-flex`; unlayered rules beat Tailwind's
                layered utilities, so `hidden` on the button never applied and
                the full width label rendered on phones, pushing the logo off
                the header. The wrapper carries no button class, so its display
                utilities work. Same trap applies to `.btn-pill` and
                `.btn-ghost` anywhere else. */}
            <div className="hidden sm:block">
              <button
                type="button"
                onClick={() => setIsMeetingModalOpen(true)}
                className="btn-primary px-4 py-2 text-xs font-semibold rounded-full gap-2 focus-ring cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="l-bs">Zakažite sastanak</span>
                <span className="l-en">Book a Call</span>
              </button>
            </div>

            {/* The same action on phones, as an icon only.
                Dropping it entirely would leave booking a meeting reachable
                only from inside the menu, which is one tap too many for the
                thing the page exists to do. At 40px it costs the logo nothing.
                Deliberately not `.btn-primary`: that class also hardcodes
                `padding: 0 20px` and `min-height: 44px` unlayered, which on a
                square button crushes the icon to nothing. Colours come from the
                same variables it uses. */}
            <button
              type="button"
              onClick={() => setIsMeetingModalOpen(true)}
              aria-label={lang === 'bs' ? 'Zakažite sastanak' : 'Book a call'}
              className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full focus-ring cursor-pointer"
              style={{
                background: 'var(--accent-signal)',
                color: 'var(--ground)',
                transition: 'background-color var(--dur-1) var(--ease)',
              }}
            >
              <Calendar className="w-[18px] h-[18px]" />
            </button>

            {/* MOBILE HAMBURGER TOGGLE */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-[var(--body)] hover:text-[var(--ink)] hover:bg-white/5 transition-colors focus-ring cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* MOBILE NAV.
              Radix Sheet from the registry, replacing a panel that dropped
              from under the header. The old one was an absolutely positioned
              div: it did not trap focus, the page behind it still scrolled,
              and a screen reader could tab straight past the menu into
              content the user could not see. A Sheet is the standard answer
              and brings all three for free.

              It slides from the right rather than dropping from the top,
              which is what a hand reaches on a phone. */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent
              side="right"
              className="md:hidden w-[85vw] max-w-sm bg-[var(--panel)] border-[var(--line)] p-0 overflow-y-auto"
            >
              <SheetHeader className="p-4 pb-2 text-left">
                <SheetTitle className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  <span className="l-bs">Rješenja</span>
                  <span className="l-en">Solutions</span>
                </SheetTitle>
              </SheetHeader>

              <div className="px-4 pb-4 space-y-3">
                {/* The same four groups, in the same order, off the same
                    array. A phone has the vertical room a dropdown does not,
                    so this layout does not need the two column threshold the
                    desktop menu has. */}
                <div>
                  {CATEGORIES.map((cat, i) => (
                    <section key={cat.id} aria-labelledby={`m-${cat.id}`}>
                      <h3 id={`m-${cat.id}`} className={`${catHeadingClass} ${i === 0 ? 'pt-1' : 'pt-5'}`}>
                        <span className="l-bs">{cat.labelBs}</span>
                        <span className="l-en">{cat.labelEn}</span>
                      </h3>

                      <div className="space-y-1">
                        {cat.items.map((prod) => (
                          <a
                            key={prod.path}
                            href={prod.path}
                            onClick={(e) => go(e, prod.path)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors focus-ring hover:bg-white/5"
                          >
                            <ProductRow prod={prod} active={currentPath === prod.path} />
                          </a>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="border-t border-[var(--line)] pt-3 space-y-1">
                  <a
                    href="/radovi"
                    onClick={(e) => go(e, '/radovi')}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 focus-ring"
                    style={{ color: currentPath.startsWith('/radovi') ? 'var(--cyan)' : 'var(--ink)' }}
                  >
                    <span className="l-bs">Portfolio</span>
                    <span className="l-en">Portfolio</span>
                  </a>
                  <a
                    href="/po-mjeri"
                    onClick={(e) => go(e, '/po-mjeri')}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 focus-ring"
                    style={{ color: currentPath === '/po-mjeri' ? 'var(--cyan)' : 'var(--ink)' }}
                  >
                    <span className="l-bs">Po mjeri</span>
                    <span className="l-en">Custom Built</span>
                  </a>
                  <a
                    href="/o-nama"
                    onClick={(e) => go(e, '/o-nama')}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 focus-ring"
                    style={{ color: currentPath === '/o-nama' ? 'var(--cyan)' : 'var(--ink)' }}
                  >
                    <span className="l-bs">O nama</span>
                    <span className="l-en">About Us</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMeetingModalOpen(true);
                    }}
                    className="btn-primary w-full py-2.5 px-4 text-xs font-semibold rounded-full flex items-center justify-center gap-2 focus-ring cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="l-bs">Zakažite sastanak</span>
                    <span className="l-en">Book a Call</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* MEETING MODAL.
          Radix Dialog from the shadcn registry. The hand rolled version drew
          its own backdrop, positioned itself with fixed inset-0, and closed
          on a click anywhere on the overlay. What it did not do is trap focus
          inside the dialog, return focus to whatever opened it, mark the rest
          of the page as inert for a screen reader, or lock the background
          from scrolling. A booking form is exactly the place those matter,
          because it is the one part of this site a keyboard user has to
          complete rather than read.

          Every surface below is still a Shape9 token. Only the mechanics
          changed. */}
      <Dialog open={isMeetingModalOpen} onOpenChange={setIsMeetingModalOpen}>
        <DialogContent
          className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--panel)] border-[var(--line)] rounded-3xl p-6 sm:p-10"
          style={{ boxShadow: 'var(--shadow-overlay)' }}
        >
          <DialogHeader className="mb-6 pb-4 border-b border-[var(--line)] text-left space-y-1">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
              <span className="l-bs">Zakažite 25-minutni razgovor</span>
              <span className="l-en">Schedule a 25-min Call</span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[var(--muted)]">
              <span className="l-bs">
                Odaberite slobodan termin za kratak video poziv sa Shape9 timom.
              </span>
              <span className="l-en">
                Pick an available time slot for a video call with the Shape9 team.
              </span>
            </DialogDescription>
          </DialogHeader>

          <MeetingScheduler productChip={activeProduct ? activeProduct.shortName : undefined} />
        </DialogContent>
      </Dialog>
    </>
  );
};
