import React from 'react';
import {
  ArrowRight,
  Calendar,
  HelpCircle,
  LifeBuoy,
  MessageSquare,
  Package,
  ShoppingBag,
  Shirt,
  Smartphone,
  Store,
  TrendingUp,
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

/* The six areas, each one a card in the deck (Shape9_Mode.html, cards 8 to
   13), carried here in the deck's own order and wording.

   This replaced two separate sections: a single named case study and a three
   row summary of everything else. The deck treats all six the same way,
   headline plus before plus after, and that is stronger on a page too. It
   also drops the "our client, a boutique chain" framing, which was the one
   place the page leaned on a reference whose written consent for our own
   channels is still not confirmed. */
const AREAS = [
  {
    id: 'prijem',
    icon: Package,
    areaBs: 'Prijem robe',
    areaEn: 'Intake',
    headBs: 'Niko ne potpisuje otpremnicu naslijepo.',
    headEn: 'Nobody signs a delivery note blind.',
    beforeBs: 'Roba se prebroji na brzinu, otpremnica se potpiše. Manjak se otkrije kada je već kasno.',
    beforeEn: 'The goods get counted in a hurry and the note is signed. The shortfall turns up when it is already too late.',
    afterBs: 'Skenirate, Mode sam utvrdi manjak ili višak. Problem je spriječen pri prijemu robe.',
    afterEn: 'You scan, and Mode works out the shortfall or the surplus itself. The problem is caught at intake.',
  },
  {
    id: 'prodaja',
    icon: ShoppingBag,
    areaBs: 'Prodaja',
    areaEn: 'Sales',
    headBs: 'Prodali ste artikal. Šta ste još dobili?',
    headEn: 'You sold the item. What else did you get?',
    beforeBs: 'Kupac ode i to je kraj. Sljedeći put počinjete ispočetka.',
    beforeEn: 'The customer leaves and that is that. Next time you start from nothing.',
    afterBs: 'Uz prodaju ostaje i profil kupca: veličina, spol, kontakt i još informacija koje Vam trebaju. Kreirate bazu podataka Vaših kupaca.',
    afterEn: 'The sale leaves a customer profile behind: size, gender, contact and whatever else you need. You build a database of your own customers.',
  },
  {
    id: 'kupci',
    icon: Users,
    areaBs: 'Kupci',
    areaEn: 'Customers',
    headBs: 'Stigla je nova kolekcija. Ko sve treba znati?',
    headEn: 'A new collection has arrived. Who needs to know?',
    beforeBs: 'Objava na Instagramu i nada da će je prava osoba vidjeti.',
    beforeEn: 'A post on Instagram and the hope that the right person sees it.',
    afterBs: 'Ponuda ide onima kojima odgovara, po veličini i ranijoj kupovini. Rođendanska čestitka s kuponom ode sama.',
    afterEn: 'The offer goes to the people it suits, by size and by what they bought before. The birthday note with a coupon goes out on its own.',
  },
  {
    id: 'zalihe',
    icon: Shirt,
    areaBs: 'Stanje zaliha',
    areaEn: 'Stock',
    headBs: 'Kupac traži broj 52, jer ga ne može pronaći i zove prodavača.',
    headEn: 'A customer asks for size 52, because they cannot find it and call an assistant over.',
    beforeBs: 'Prodavač provjerava sa drugim objektima preko poziva ili ide u magacin. Kupac se za to vrijeme predomisli ili gubi interes dok čeka.',
    beforeEn: 'The assistant rings the other shops or walks to the stockroom. In the meantime the customer changes their mind, or loses interest waiting.',
    afterBs: 'Prodavač skenira artikal na mobitelu i vidi stanje u svim objektima i magacinu, te druge opcije istog artikla, kako bi zadržao pažnju kupca.',
    afterEn: 'The assistant scans the item on a phone and sees the stock in every shop and in the stockroom, along with other options for the same item, so the customer stays with them.',
  },
  {
    id: 'dostava',
    icon: Truck,
    areaBs: 'Dostava',
    areaEn: 'Delivery',
    headBs: 'Mode je povezan sa Vašim partnerom za dostavu.',
    headEn: 'Mode is connected to your delivery partner.',
    beforeBs: 'Adresa se prepisuje u kurirski obrazac. Greška u adresi je paket koji se vraća.',
    beforeEn: 'The address is copied into the courier form. A mistake in the address is a parcel that comes back.',
    afterBs: 'Najava se generiše iz same narudžbe. Kupcu se također šalje notifikacija sa brojem pošiljke i bitnim informacijama.',
    afterEn: 'The booking is generated from the order itself. The customer also gets a message with the tracking number and what they need to know.',
  },
  {
    id: 'marza',
    icon: TrendingUp,
    areaBs: 'Promet i marža',
    areaEn: 'Turnover and margin',
    headBs: 'Ko je koliko prodao, i na čemu ste zaradili?',
    headEn: 'Who sold how much, and what did you make money on?',
    beforeBs: 'Zbir na kraju mjeseca, bez razlaganja. Ne znate koja akcija je radila, a koja nije.',
    beforeEn: 'A total at the end of the month, with nothing broken out. You do not know which promotion worked and which did not.',
    afterBs: 'Realtime izvještaj o prodaji po prodavaču, lokaciji, artiklu i još mnogo statistika.',
    afterEn: 'A live sales report by assistant, by location, by item, and a good deal more.',
  },
];

/* Deck card 14. Three readers of the same change, which is the card that
   answers "and why do I care" without a single sentence about us. */
const BENEFITS = [
  {
    id: 'kupcu',
    labelBs: 'Kupcu',
    labelEn: 'To the customer',
    bs: 'Brže i bolje iskustvo kupovine.',
    en: 'A faster and better experience when they buy.',
  },
  {
    id: 'vama',
    labelBs: 'Vama',
    labelEn: 'To you',
    bs: 'Bolju organiziranost i pregled poslovanja.',
    en: 'Better organisation and a view of the business.',
  },
  {
    id: 'biznisu',
    labelBs: 'Vašem biznisu',
    labelEn: 'To your business',
    bs: 'Alat koji svakom radniku čini posao lakšim.',
    en: "A tool that makes every person's job easier.",
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
          the video above it say the same sentence. The customer's question
          and the line under it are the deck's first two cards, word for
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
            <Store className="w-3.5 h-3.5" />
            <span className="l-bs">Sistem za maloprodaju</span>
            <span className="l-en">Built for retail</span>
          </span>
        </div>

        <p className="hero-animate-3 text-xl sm:text-2xl font-semibold max-w-3xl mx-auto mb-4 leading-snug" style={{ color: 'var(--ink)' }}>
          <span className="l-bs">„Imate li ovaj model u drugoj veličini?"</span>
          <span className="l-en">"Do you have this one in another size?"</span>
        </p>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12">
          <span className="l-bs">
            Dok Vaš prodavač zove drugu poslovnicu, kupac već gubi interes. Artikal je možda na stanju. Vi to ne možete potvrditi dovoljno brzo.
          </span>
          <span className="l-en">
            While your assistant rings the other shop, the customer is already losing interest. The item may well be in stock. You cannot confirm it fast enough.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#mode-form"
            onClick={(e) => go(e, '#mode-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#FF6170] hover:bg-[#ff8391] py-3.5 px-8 transition-colors inline-flex items-center justify-center gap-2 focus-ring w-full sm:w-auto"
          >
            <span className="l-bs">Prođimo kroz platformu</span>
            <span className="l-en">Walk through the platform</span>
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
      </section>

      {/* 01 THE PROBLEM. The deck's bridge card: one question the owner cannot
          answer, and the reason that inability is the whole point. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2 className="h2-wide">
              <span className="l-bs">Koliko kupaca se predomislilo dok je čekalo pravu informaciju?</span>
              <span className="l-en">How many customers changed their mind while they waited for a straight answer?</span>
            </h2>
            <p>
              <span className="l-bs">Ako Vas ovaj broj brine, Vaš problem je tačno ono što rješavamo.</span>
              <span className="l-en">If that number worries you, your problem is exactly the one we solve.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 02 THE REVEAL, then the six areas. The deck names the product once,
          lists what it covers, and then walks each area as before and after.
          The page keeps that order, so the six cards read as the promise
          above them being paid off one line at a time. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.08)] border border-[rgba(255,97,112,0.2)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span className="l-bs">Mode</span>
              <span className="l-en">Mode</span>
            </div>
            <h2>
              <span className="l-bs">Cijeli butik na jednom ekranu.</span>
              <span className="l-en">The whole boutique on one screen.</span>
            </h2>
          </div>

          <div className="section-body flex flex-col gap-4 sm:gap-5">
            {AREAS.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.id} className="s9-card flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                      <span className="l-bs">{row.areaBs}</span>
                      <span className="l-en">{row.areaEn}</span>
                    </span>
                  </div>

                  <h3>
                    <span className="l-bs">{row.headBs}</span>
                    <span className="l-en">{row.headEn}</span>
                  </h3>

                  {/* Labelled at every width, not just below `sm`. Stacked or
                      side by side, a before and an after are only legible
                      because something says which is which. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="s9-card-nested flex flex-col gap-2">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        <span className="l-bs">Prije</span>
                        <span className="l-en">Before</span>
                      </div>
                      <p className="text-sm leading-relaxed m-0">
                        <span className="l-bs">{row.beforeBs}</span>
                        <span className="l-en">{row.beforeEn}</span>
                      </p>
                    </div>
                    <div className="s9-card-nested flex flex-col gap-2" style={{ borderColor: 'rgba(255, 97, 112, 0.3)' }}>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                        <span className="l-bs">Sada</span>
                        <span className="l-en">Now</span>
                      </div>
                      {/* Inline, not `text-[var(--ink)]`. The bare `p` rule in
                          index.css is unlayered and beats every utility, so
                          the after column silently rendered in body grey and
                          lost the contrast that makes the pair work. */}
                      <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--ink)' }}>
                        <span className="l-bs">{row.afterBs}</span>
                        <span className="l-en">{row.afterEn}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* NO HARDWARE. Deliberately carries no chapter number: it is an answer
          to a question the six cards raise ("so what do we have to buy"),
          not a chapter of its own. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card text-center flex flex-col gap-4 items-center">
              <Smartphone className="w-6 h-6" style={{ color: ACCENT }} />
              <h2 className="max-w-3xl mx-auto leading-tight">
                <span className="l-bs">
                  Mode ne zahtijeva kupovinu posebnog <span className="text-[#FF6170]">hardvera</span>
                </span>
                <span className="l-en">
                  Mode asks you to buy no special <span className="text-[#FF6170]">hardware</span>
                </span>
              </h2>
              <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                <span className="l-bs">Skeniranje, unos i pregled svih podataka radite putem svog mobilnog uređaja.</span>
                <span className="l-en">Scanning, entering and looking anything up all happen on the phone already in your pocket.</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 03 WHAT IT BRINGS. Three readers of the same change. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2>
              <span className="l-bs">A šta sve to donosi?</span>
              <span className="l-en">And what does all of that bring?</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.id} className="s9-card flex flex-col gap-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                  <span className="l-bs">{b.labelBs}</span>
                  <span className="l-en">{b.labelEn}</span>
                </div>
                <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--ink)' }}>
                  <span className="l-bs">{b.bs}</span>
                  <span className="l-en">{b.en}</span>
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 04 SUPPORT, and the roll-out said out loud in the same breath. Mode
          is introduced on site and this page never implies otherwise. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.08)] border border-[rgba(255,97,112,0.2)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span className="l-bs">Podrška</span>
              <span className="l-en">Support</span>
            </div>
            <h2>
              <span className="l-bs">Svaki korak je objašnjen u samoj platformi.</span>
              <span className="l-en">Every step is explained inside the platform itself.</span>
            </h2>
            <p>
              <span className="l-bs">A kad zatreba čovjek, tu je lokalni tim. Uvođenje vodimo s Vama, uz artikal ide etiketa, jednom. I mi smo butik, samo za softver.</span>
              <span className="l-en">And when it takes a person, the local team is here. We run the roll-out with you, and every item gets a label, once. We are a boutique too, only for software.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 05 FAQ. Unchanged. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.1)] border border-[rgba(255,97,112,0.25)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Česta pitanja</span>
              <span className="l-en">FAQ</span>
            </div>
            <h2>
              <span className="l-bs">Ono što vlasnici pitaju prvo</span>
              <span className="l-en">What owners ask first</span>
            </h2>
          </div>

          <Accordion items={MODE_FAQ} className="section-body" />
        </ScrollReveal>
      </section>

      {/* 06 NEXT STEP. The deck's closing offer, which is a walkthrough rather
          than a questionnaire. */}
      <section id="mode-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,97,112,0.12)] text-[#FF6170] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(255,97,112,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Sljedeći korak</span>
              <span className="l-en">Next step</span>
            </div>

            <h2 className="h2-wide">
              <span className="l-bs">Hajde da zajedno prođemo kroz platformu.</span>
              <span className="l-en">Let us walk through the platform together.</span>
            </h2>

            <p>
              <span className="l-bs">Testiramo opcije koje bi Vaši zaposlenici koristili.</span>
              <span className="l-en">We try out the parts your own people would be using.</span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Mode" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
