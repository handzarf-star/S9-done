import React from 'react';
import {
  ArrowRight,
  Calendar,
  HelpCircle,
  MessageSquare,
  Package,
  ScanLine,
  Shirt,
  Store,
  Tag,
  Truck,
  Users,
} from 'lucide-react';

import { VideoHero } from '@/components/ui/scroll-locked-video-hero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactForm } from '../components/ContactForm';
import { Accordion, AccordionItem } from '../components/Accordion';

interface ModePageProps {
  onNavigate?: (path: string) => void;
}

/* Mode's own accent. Assigned 2026-09-09 and picked against the palette
   rather than by eye: hue 18 keeps it clearly red at 42 degrees from Atlas's
   orange, which at any warmer hue read as a lighter Atlas in the product
   menu. Lightness 0.70 because red above that stops being red and turns
   salmon. Contrast on the page ground is 6.7:1. */
const ACCENT = '#FF6170';

/* Before and after, which is the page's spine.
   This replaced a timeline of one working day. The timeline was atmospheric
   but it only ever showed the good state, so the reader had to supply the pain
   from memory. A before and after shows the delta, which is the thing that
   actually persuades. */
const BEFORE_AFTER = [
  {
    id: 'prijem',
    icon: Package,
    areaBs: 'Prijem',
    areaEn: 'Intake',
    beforeBs: 'Roba stiže, neko je upisuje ručno.',
    beforeEn: 'Stock arrives and somebody types it in by hand.',
    afterBs: 'Skenirate artikle, prijem je gotov.',
    afterEn: 'You scan the items and the intake is done.',
  },
  {
    id: 'dostava',
    icon: Truck,
    areaBs: 'Dostava',
    areaEn: 'Delivery',
    beforeBs: 'Adresa se ručno prepisuje u kurirski obrazac.',
    beforeEn: 'The address gets copied into the courier form by hand.',
    afterBs: 'Adresa i obavještenje kupcu se šalju sami.',
    afterEn: 'The address and the customer notice go out on their own.',
  },
  {
    id: 'marza',
    icon: Tag,
    areaBs: 'Marža',
    areaEn: 'Margin',
    beforeBs: 'Maržu imate tek na kraju mjeseca.',
    beforeEn: 'You get the margin at the end of the month.',
    afterBs: 'Računa se kontinuirano.',
    afterEn: 'It is worked out continuously.',
  },
];

const MODE_FAQ: AccordionItem[] = [
  {
    id: 'mode-faq-1',
    qBs: 'Imamo dvije radnje i mali magacin. Je li ovo preveliko za nas?',
    qEn: 'We have two shops and a small stockroom. Is this too much for us?',
    aBs: 'Nije, i to je zapravo tačka na kojoj se najviše osjeti. Sa jednom radnjom se sve još pamti. Od druge nadalje počinje telefoniranje, provjeravanje i prebacivanje robe, i tu sistem preuzima posao koji do sada niko nije radio zapisano.',
    aEn: 'No, and two is where it starts to pay. With one shop people still remember everything. From the second onwards the phone calls and the checking begin, and that is the work the system takes over.',
  },
  {
    id: 'mode-faq-2',
    qBs: 'Naši artikli nemaju barkodove. Šta onda?',
    qEn: 'Our items have no barcodes. What then?',
    aBs: 'Onda ih dobiju. Svaka veličina i boja je svoja stavka sa svojim kodom, cijenom i stanjem, i sistem štampa etikete. Bez toga se ne može skenirati, a skeniranje je ono što drži stanje tačnim.',
    aEn: 'Then they get them. Every size and colour is its own item with its own code, price and stock level, and the system prints the labels. Without that there is nothing to scan, and scanning is what keeps the stock figure honest.',
  },
  {
    id: 'mode-faq-3',
    qBs: 'Hoće li naši ljudi ovo naučiti?',
    qEn: 'Will our people actually learn it?',
    aBs: 'Sistem ih uči sam. Svaki radnik bira svoju ulogu, prodaja, magacin, nabavka ili administracija, i dobije korake tačno za svoj posao, sa linkom na ekran gdje se to radi. Radnica u butiku ne vidi ekrane magacina i obrnuto.',
    aEn: 'The system teaches them. Each person picks their role, shop floor, warehouse, purchasing or admin, and gets the steps for their own job with a link to the screen where it happens. Nobody has to learn the parts that are not theirs.',
  },
  {
    id: 'mode-faq-4',
    qBs: 'Radi li na telefonu?',
    qEn: 'Does it work on a phone?',
    aBs: 'Radi, i instalira se na početni ekran bez skidanja iz prodavnice aplikacija. Kamera telefona je skener, tako da radnik u magacinu ne mora imati poseban uređaj.',
    aEn: 'Yes, and it installs to the home screen without an app store. The phone camera is the scanner, so nobody in the stockroom needs a separate device.',
  },
];

export const ModePage: React.FC<ModePageProps> = ({ onNavigate }) => {
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

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 sm:pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      <VideoHero
        srcLandscape="/video/mode-land.mp4"
        srcPortrait="/video/mode-port.mp4"
        posterLandscape="/video/mode-land.webp"
        posterPortrait="/video/mode-port.webp"
        accent={ACCENT}
        accentRgb="255, 97, 112"
        eyebrow={<>
          <span className="l-bs">Shape9 Mode</span>
          <span className="l-en">Shape9 Mode</span>
        </>}
      />

      {/* HERO. The film's own tagline carries the headline, so the page and
          the video that sits above it say the same sentence. The customer's
          question underneath it is the film's opening beat, kept word for
          word. */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative pt-16 sm:pt-24">
        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">
            Od skeniranja artikla do isporuke kupcu, bez papira i bez{' '}
            <span className="text-[#FF6170]">Excela.</span>
          </span>
          <span className="l-en">
            From scanning an item to the customer's door, with no paper and no{' '}
            <span className="text-[#FF6170]">spreadsheet.</span>
          </span>
        </h1>

        <div className="hero-animate-3 mb-6 sm:mb-8">
          <span className="s9-badge text-[#FF6170] bg-[rgba(255,97,112,0.1)] border border-[rgba(255,97,112,0.25)] inline-flex items-center gap-2 mx-auto">
            <Shirt className="w-3.5 h-3.5" />
            <span className="l-bs">Sistem za butike</span>
            <span className="l-en">Built for boutiques</span>
          </span>
        </div>

        <p className="hero-animate-3 text-xl sm:text-2xl font-semibold text-[var(--ink)] max-w-3xl mx-auto mb-4 leading-snug">
          <span className="l-bs">„Imate li ovaj model u drugoj veličini?"</span>
          <span className="l-en">"Do you have this one in another size?"</span>
        </p>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl">
          <span className="l-bs">
            Dok neko zove drugu radnju, kupac već gubi interes. Roba je možda na stanju, ali niko to ne može reći dovoljno brzo.
          </span>
          <span className="l-en">
            While somebody rings the other shop, the customer is already losing interest. The stock may well be there. Nobody can say so fast enough.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 w-full sm:w-auto">
          <a
            href="#mode-form"
            onClick={(e) => go(e, '#mode-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#FF6170] hover:bg-[#ff8391] py-3.5 px-8 transition-colors inline-flex items-center justify-center gap-2 focus-ring w-full sm:w-auto"
          >
            <span className="l-bs">Pokažite nam svoju radnju</span>
            <span className="l-en">Show us your shop</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-[#FF6170]" />
            <span className="l-bs">Zakažite razgovor</span>
            <span className="l-en">Book a Call</span>
          </button>
        </div>

        <span className="micro-copy text-xs text-[var(--muted)] mb-4">
          <span className="l-bs">Bez prezentacije. Recite nam koliko prodajnih objekata imate i kako danas provjeravate stanje i dostavu.</span>
          <span className="l-en">No slide deck. Tell us how many shops you have and how you check stock and deliveries today.</span>
        </span>
      </section>

      {/* THE PROBLEM, in the owner's own arithmetic. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Tačno stanje imate samo na dan popisa.</span>
              <span className="l-en">The figure is right on the day you count it.</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl mx-auto">
              <span className="l-bs">Sutradan je procjena, i tako do sljedećeg popisa.</span>
              <span className="l-en">The next day it is an estimate, and it stays one until you count again.</span>
            </p>
            <p className="text-base sm:text-lg font-semibold text-[var(--ink)] max-w-2xl mx-auto leading-snug">
              <span className="l-bs">Koliko kupaca se predomislilo dok je čekalo pravu informaciju?</span>
              <span className="l-en">How many customers changed their mind while they waited for a straight answer?</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* THE CASE. One scene, before and after, from a client we cannot name
          yet: consent for our own channels is not confirmed in writing, and a
          web page travels further than a deck handed to one person. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.08)] border border-[rgba(255,97,112,0.2)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span className="l-bs">Naš klijent, lanac butika</span>
              <span className="l-en">Our client, a boutique chain</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Kupac traži broj 52. Na stalku ga nema.</span>
              <span className="l-en">A customer asks for size 52. It is not on the rail.</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="s9-card">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3 text-[var(--muted)]">
                <span className="l-bs">Prije</span>
                <span className="l-en">Before</span>
              </div>
              <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed m-0">
                <span className="l-bs">Prodavač zove dva objekta. Kupac gubi interes ili se predomisli dok čeka.</span>
                <span className="l-en">The assistant rings two other shops. The customer loses interest, or changes their mind while waiting.</span>
              </p>
            </div>
            <div className="s9-card" style={{ borderColor: 'rgba(255, 97, 112, 0.3)' }}>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>
                <span className="l-bs">Sada</span>
                <span className="l-en">Now</span>
              </div>
              <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed m-0">
                <span className="l-bs">Jedan ekran. Dva komada u Sarajevu, transfer kreće odmah.</span>
                <span className="l-en">One screen. Two in Sarajevo, and the transfer starts straight away.</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* THE REST, same shape. Three areas, each one a line of before and a
          line of after. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Ostalo se ažurira samo.</span>
              <span className="l-en">The rest keeps itself up to date.</span>
            </h2>
          </div>

          <div className="section-body space-y-3">
            {BEFORE_AFTER.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.id} className="s9-card grid grid-cols-1 sm:grid-cols-[9rem_1fr_1fr] gap-3 sm:gap-5 sm:items-center">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                      <span className="l-bs">{row.areaBs}</span>
                      <span className="l-en">{row.areaEn}</span>
                    </span>
                  </div>
                  {/* The two columns are only self evident side by side. Below
                      `sm` they stack, and a stacked before and after with no
                      labels is genuinely ambiguous, so the labels appear
                      exactly where the layout stops explaining itself. */}
                  <p className="text-sm text-[var(--muted)] leading-relaxed m-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] mr-2 sm:hidden">
                      <span className="l-bs">Prije</span>
                      <span className="l-en">Before</span>
                    </span>
                    <span className="l-bs">{row.beforeBs}</span>
                    <span className="l-en">{row.beforeEn}</span>
                  </p>
                  <p className="text-sm text-[var(--ink)] leading-relaxed m-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] mr-2 sm:hidden" style={{ color: ACCENT }}>
                      <span className="l-bs">Sada</span>
                      <span className="l-en">Now</span>
                    </span>
                    <span className="l-bs">{row.afterBs}</span>
                    <span className="l-en">{row.afterEn}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* INTRODUCTION, not softened. Mode is a roll out and the page says so
          in the same breath as the benefit, because the alternative is a
          surprise on week one. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Uvođenje traži organizaciju.</span>
              <span className="l-en">Getting it in takes organising.</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl mx-auto">
              <span className="l-bs">Uz artikal ide etiketa, jednom. Artikle možete skenirati i telefonom.</span>
              <span className="l-en">Every item gets a label, once. You can scan them with a phone.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* WHY THE FIGURE HOLDS. The platform's own first rule, and the closest
          thing on this site to the company's WHY written by somebody else. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-5 leading-tight max-w-3xl mx-auto">
                <span className="l-bs">
                  Stanje se nikada ne upisuje <span className="text-[#FF6170]">rukom</span>
                </span>
                <span className="l-en">
                  Stock is never typed in by <span className="text-[#FF6170]">hand</span>
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
                <span className="l-bs">
                  Svaka promjena ide kroz nešto što se desilo: prijem, prodaju, transfer ili popis. Zato uvijek postoji odgovor na pitanje zašto je nečega manje, i zato niko ne mora vjerovati tabeli na riječ.
                </span>
                <span className="l-en">
                  Every change comes from something that happened: an intake, a sale, a transfer, a count. So there is always an answer to why there is less of something, and nobody has to take a spreadsheet's word for it.
                </span>
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                <div className="s9-card-nested p-4">
                  <div className="text-sm font-semibold text-[var(--ink)] mb-1">
                    <span className="l-bs">Transfer nije gotov dok ga radnja ne potvrdi</span>
                    <span className="l-en">A transfer is not done until the shop confirms it</span>
                  </div>
                  <p className="text-sm text-[var(--body)] m-0">
                    <span className="l-bs">Roba stoji u tranzitu, pa se vidi šta je stvarno stiglo, a ne šta je trebalo stići.</span>
                    <span className="l-en">Goods sit in transit, so you see what actually arrived, not what was meant to.</span>
                  </p>
                </div>
                <div className="s9-card-nested p-4">
                  <div className="text-sm font-semibold text-[var(--ink)] mb-1">
                    <span className="l-bs">Svaka veličina i boja je svoja stavka</span>
                    <span className="l-en">Every size and colour is its own item</span>
                  </div>
                  <p className="text-sm text-[var(--body)] m-0">
                    <span className="l-bs">Nije „ta jakna", nego ta jakna, crna, četrdeset druga, sa svojim stanjem i cijenom.</span>
                    <span className="l-en">Not "that jacket", but that jacket, black, size 42, with its own stock and price.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* WHAT IT DOES. Capabilities, but each one named as a thing the owner
          gets rather than a module the software has. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.08)] border border-[rgba(255,97,112,0.2)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span className="l-bs">Šta pokriva</span>
              <span className="l-en">What it covers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Radnja, magacin i kupac, u jednom sistemu</span>
              <span className="l-en">Shop, stockroom and customer, in one system</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: ScanLine,
                tBs: 'Kasa koja radi na skener',
                tEn: 'A till that runs on a scanner',
                bs: 'Skeniraš, dodaš popust ili kupon, naplatiš. Račun izlazi gotov.',
                en: 'Scan, add a discount or a coupon, take the money. The receipt comes out finished.',
              },
              {
                icon: Package,
                tBs: 'Stanje po radnjama i veličinama',
                tEn: 'Stock by shop and by size',
                bs: 'Vidiš gdje je koji komad, koliko ga ima i kada ga treba dopuniti.',
                en: 'You see where each piece is, how many are left and when to top it up.',
              },
              {
                icon: Store,
                tBs: 'Zahtjevi i transferi među radnjama',
                tEn: 'Requests and transfers between shops',
                bs: 'Radnja traži, magacin odobri količinu, transfer se napravi sam.',
                en: 'The shop asks, the warehouse approves a quantity, the transfer makes itself.',
              },
              {
                icon: Truck,
                tBs: 'Kurir bez prepisivanja',
                tEn: 'Couriers without retyping',
                bs: 'Najava, adresa i praćenje pošiljke izlaze iz iste narudžbe.',
                en: 'The booking, the label and the tracking all come out of the same order.',
              },
              {
                icon: MessageSquare,
                tBs: 'Poruke koje se šalju same',
                tEn: 'Messages that send themselves',
                bs: 'Kupac dobije broj pošiljke, a čestitka za rođendan ode bez da je iko sjetio.',
                en: 'The customer gets a tracking number, and the birthday note goes out without anyone remembering.',
              },
              {
                icon: Tag,
                tBs: 'Promet, marža i vrijednost zalihe',
                tEn: 'Turnover, margin and stock value',
                bs: 'Brojke su izračunate stalno, ne na kraju mjeseca.',
                en: 'The numbers are worked out continuously, not at month end.',
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.tBs} className="s9-card">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
                    <h3 className="text-base font-bold text-[var(--ink)] m-0">
                      <span className="l-bs">{f.tBs}</span>
                      <span className="l-en">{f.tEn}</span>
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--body)] m-0 leading-relaxed">
                    <span className="l-bs">{f.bs}</span>
                    <span className="l-en">{f.en}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* THE STAFF QUESTION. Every owner asks it and it is the one objection
          the product answers by itself. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.08)] border border-[rgba(255,97,112,0.2)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span className="l-bs">Vaši ljudi</span>
              <span className="l-en">Your people</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Svako uči samo svoj posao</span>
              <span className="l-en">Everyone learns their own job and nothing else</span>
            </h2>
            <p>
              <span className="l-bs">
                Radnica u butiku, magacioner, nabavka i administracija otvore sistem i biraju svoju ulogu. Svako dobije korake za svoj posao i link na ekran gdje se to radi. Niko ne uči tuđe ekrane.
              </span>
              <span className="l-en">
                Shop floor, stockroom, purchasing and admin each pick their own role. Everyone gets the steps for their own job with a link to the screen where it happens. Nobody has to learn anybody else's part.
              </span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.1)] border border-[rgba(255,97,112,0.25)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Česta pitanja</span>
              <span className="l-en">FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
              <span className="l-bs">Ono što vlasnici pitaju prvo</span>
              <span className="l-en">What owners ask first</span>
            </h2>
          </div>

          <Accordion items={MODE_FAQ} className="section-body" />
        </ScrollReveal>
      </section>

      <section id="mode-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.12)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(255,97,112,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Pokažite nam svoju radnju</span>
              <span className="l-en">Show us your shop</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Pokažite nam Vaš prodajni objekat</span>
              <span className="l-en">Tell us how many shops you have and how you check stock today</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">
                Iz toga se vidi gdje vam odlazi vrijeme i šta bi se prvo promijenilo. Vraćamo se sa konkretnim prijedlogom, bez prezentacije.
              </span>
              <span className="l-en">
                That alone shows where the time goes and what would change first. We come back with a concrete proposal and no slide deck.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Mode" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
