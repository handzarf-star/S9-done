import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { ChevronDown, Menu, X, ArrowRight, PhoneCall, Package, LineChart, FileStack, Calendar } from 'lucide-react';
import { MeetingScheduler } from './MeetingScheduler';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: 'bs' | 'en';
  onToggleLang: () => void;
}

const PRODUCTS = [
  {
    path: '/pulse',
    name: 'Shape9 Pulse',
    shortName: 'Pulse',
    color: '#A98CFF',
    rgb: '169, 140, 255',
    icon: PhoneCall,
    descBs: 'Analiza svakog poziva, ne samo uzorka',
    descEn: 'Every call checked, not just a sample',
  },
  {
    path: '/atlas',
    name: 'Shape9 Atlas',
    shortName: 'Atlas',
    color: '#FFA658',
    rgb: '255, 166, 88',
    icon: Package,
    descBs: 'Stanje i lokacija robe na policama',
    descEn: 'Stock and shelf location',
  },
  {
    path: '/sonar',
    name: 'Shape9 Sonar',
    shortName: 'Sonar',
    color: '#35B6F0',
    rgb: '53, 182, 240',
    icon: LineChart,
    descBs: 'Nadzor brojki bez pauze',
    descEn: 'Numbers watched non-stop',
  },
  {
    path: '/libra',
    name: 'Shape9 Libra',
    shortName: 'Libra',
    color: '#3DD68C',
    rgb: '61, 214, 140',
    icon: FileStack,
    descBs: 'Dokumenti koji se sami razvrstaju',
    descEn: 'Docs that sort themselves',
  },
];

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
                className="w-72 p-2 rounded-2xl bg-[var(--panel)] border-[var(--line)]"
                style={{ boxShadow: 'var(--shadow-overlay)' }}
              >
                {PRODUCTS.map((prod) => {
                  const IconComponent = prod.icon;
                  return (
                    <DropdownMenuItem
                      key={prod.path}
                      asChild
                      className="p-3 rounded-xl cursor-pointer focus:bg-[rgba(255,255,255,0.04)] group"
                    >
                      <a href={prod.path} onClick={(e) => go(e, prod.path)}>
                        <div className="flex items-center gap-3 w-full">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `rgba(${prod.rgb}, 0.12)`, color: prod.color }}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-sm font-semibold text-[var(--ink)] flex items-center justify-between"
                              style={{ color: currentPath === prod.path ? prod.color : undefined }}
                            >
                              <span>{prod.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-xs text-[var(--muted)] truncate mt-0.5">
                              <span className="l-bs">{prod.descBs}</span>
                              <span className="l-en">{prod.descEn}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </DropdownMenuItem>
                  );
                })}
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
                <div className="space-y-1">
                  {PRODUCTS.map((prod) => (
                    <a
                      key={prod.path}
                      href={prod.path}
                      onClick={(e) => go(e, prod.path)}
                      className="block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors focus-ring hover:bg-white/5"
                      style={{ color: currentPath === prod.path ? prod.color : 'var(--ink)' }}
                    >
                      {prod.name}
                    </a>
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
              <span className="l-bs">Zakažite 25-minutni sastanak</span>
              <span className="l-en">Schedule a 25-min Call</span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[var(--muted)]">
              <span className="l-bs">
                Odaberite slobodan termin za online video razgovor sa Shape9 timom.
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
