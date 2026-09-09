import React from 'react';
import {
  ArrowRight,
  Package,
  Truck,
  Layers,
  RefreshCw,
  Smartphone,
  BarChart3,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Calendar,
} from 'lucide-react';

import { VideoHero } from '@/components/ui/scroll-locked-video-hero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ClientCard, CLIENTS } from '../components/ClientCard';
import { ProductTabs } from '../components/ProductTabs';
import { ContactForm } from '../components/ContactForm';
import { Accordion, AccordionItem } from '../components/Accordion';

interface AtlasPageProps {
  onNavigate?: (path: string) => void;
}

const ATLAS_FAQ: AccordionItem[] = [
  {
    id: 'atlas-faq-1',
    qBs: 'Da li moramo mijenjati cjelokupnu organizaciju rada u skladištu?',
    qEn: 'Do we have to change how the warehouse works?',
    aBs: 'Uvođenje modernog WMS-a podrazumijeva uvođenje reda: precizno barkod označavanje polica i lokacija, prelazak sa papirnih lista na mobilne uređaje i kratku obuku radnika. To je strukturiran proces koji se odradi jednom, a donosi trajnu tačnost i brzinu.',
    aEn: 'Partly yes, and you should hear that now rather than later. Atlas is not a tool you simply switch on. Rolling it out means tagging shelf locations, a mobile app for the warehouse team and training people. That work is done once. After it, you finally see what you have and where it is.',
  },
  {
    id: 'atlas-faq-2',
    qBs: 'Već vodimo evidenciju u Excelu ili ERP-u. Koja je stvarna razlika?',
    qEn: 'We have Excel and our own records. Why would this be better?',
    aBs: 'Excel i klasični ERP pokazuju stanje s vremenskim kašnjenjem, tek nakon što neko ručno unese podatke. Atlas WMS ažurira stanje u realnom vremenu pri svakom skeniranju na polici. Rezultat: tačnost zaliha raste sa prosječnih 80% na preko 99%.',
    aEn: 'Excel shows the state as of whenever somebody last updated it. Atlas updates the moment someone scans an item on the floor. The difference shows up at stocktake: with one client accuracy was 81 percent, and after the roll-out 99.4 percent.',
  },
  {
    id: 'atlas-faq-3',
    qBs: 'Može li se Atlas integrisati s našim postojećim ERP/fakturnim sistemom?',
    qEn: 'Can it connect to the system we already have?',
    aBs: 'U većini slučajeva da, putem API konektora ili direktne baze podataka. Prije početka implementacije radimo tehničku analizu vašeg postojećeg softvera i otvoreno vam kažemo šta je izvodivo i u kojem roku.',
    aEn: 'In most cases yes, but we will not promise it blind. Tell us what you use for invoicing and sales, and we will tell you what is possible and how much work it takes. If something will not connect, you hear it from us before you sign.',
  },
];

const AUDIENCES = [
  {
    id: 'ecommerce',
    titleBs: 'E-commerce i web trgovine',
    titleEn: 'Online shops that pack their own orders',
    descBs: 'Brzo komisioniranje, verifikacija barkodova i automatsko kreiranje adresnica bez greške.',
    descEn: 'Pick, pack and ship with scanning, so the wrong item does not reach the customer.',
  },
  {
    id: 'wholesale',
    titleBs: 'Veleprodaja i distributivni centri',
    titleEn: 'Wholesale and distribution',
    descBs: 'Paletno skladištenje, praćenje serijskih brojeva (LOT), rokova trajanja i međuskladišnih prenosa.',
    descEn: 'Pallets, racks, serial numbers and expiry dates in one place.',
  },
  {
    id: 'manufacturing',
    titleBs: 'Proizvodni pogoni',
    titleEn: 'Manufacturing',
    descBs: 'Utrošak sirovina, radni nalozi i prijem gotovih proizvoda na jednom mjestu, pa se vidi i koliko je traka stvarno uradila.',
    descEn: 'Material consumption and finished goods coming in, without copying by hand.',
  },
  {
    id: 'logistics3pl',
    titleBs: '3PL logistika i uslužno skladištenje',
    titleEn: 'Companies storing goods for others',
    descBs: 'Upravljanje zalihama za više eksternih klijenata uz potpuno razdvojene baze i izvještaje.',
    descEn: 'Stock for several clients in one system, separated so each sees only their own.',
  },
];

const FEATURES_LIST = [
  {
    icon: Package,
    titleBs: 'Stanje i mikrolokacije',
    titleEn: 'Stock and location',
    descBs: 'Tačan uvid u količinu, poziciju na polici i historiju kretanja artikala na svim lokacijama.',
    descEn: 'How much of what you have, which shelf it sits on and how it moved, across every site.',
  },
  {
    icon: Truck,
    titleBs: 'Nabavka i dobavljači',
    titleEn: 'Purchasing and suppliers',
    descBs: 'Uporedite šta je stvarno stiglo sa dostavnicom, pa zadržite i ostalo: po kojoj je cijeni roba ušla, ko ju je dostavio i kada, i je li plaćena.',
    descEn: 'Check what actually arrived against the delivery note, and keep the rest too: what price it came in at, who delivered it and when, and whether it has been paid.',
  },
  {
    icon: Layers,
    titleBs: 'Komisioniranje i otprema',
    titleEn: 'Picking and dispatch',
    descBs: 'Optimizovane rute kretanja kroz skladište i dvostruka verifikacija prije predaje kurirskoj službi.',
    descEn: 'The order in which goods are collected, and a check on the box before it leaves.',
  },
  {
    icon: RefreshCw,
    titleBs: 'Međuskladišni transferi',
    titleEn: 'Transfers between warehouses',
    descBs: 'Potpuna sljedivost kretanja robe između centralnih i regionalnih skladišta bez gubitaka.',
    descEn: 'Goods moving from one site to another, with a record of who sent what and when.',
  },
  {
    icon: Smartphone,
    titleBs: 'Mobilna aplikacija za radnike',
    titleEn: 'Mobile app for scanning',
    descBs: 'Intuitivno skeniranje barkodova putem industrijskih terminala ili Android pametnih telefona.',
    descEn: 'The team scans a barcode with a phone or a handheld reader, right at the shelf.',
  },
  {
    icon: BarChart3,
    titleBs: 'Prodaja, kupci i šta premjestiti',
    titleEn: 'Sales, customers and what to move',
    descBs: 'Vidite šta se brzo obrće, šta stoji mjesecima, kako se prodaje i kome. A kad negdje ponestaje, Atlas kaže šta da premjestite prije nego stane.',
    descEn: 'See what turns over quickly, what has sat for months, how it sells and to whom. And when a location is running low, Atlas tells you what to move before it stops.',
  },
];

export const AtlasPage: React.FC<AtlasPageProps> = ({ onNavigate }) => {

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
      {/* VIDEO HERO. Pinned full-bleed launch cut, portrait source below
          768px so a phone gets a frame built for it rather than a 16:9
          crop. The text hero below is untouched and follows it. */}
      <VideoHero
        srcLandscape="/video/atlas-land.mp4"
        srcPortrait="/video/atlas-port.mp4"
        posterLandscape="/video/atlas-land.webp"
        posterPortrait="/video/atlas-port.webp"
        accent="#FFA658"
        accentRgb="255, 166, 88"
        eyebrow={<>
          <span className="l-bs">Shape9 Atlas</span>
          <span className="l-en">Shape9 Atlas</span>
        </>}
      />

      {/* HERO SECTION. Now the first block after the video, so it carries
          the top padding the page wrapper used to provide. */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative pt-16 sm:pt-24">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span className="s9-badge text-[#FFA658] bg-[rgba(255,166,88,0.1)] border border-[rgba(255,166,88,0.25)] inline-flex items-center gap-2 mx-auto">
            <Package className="w-3.5 h-3.5" />
            <span className="l-bs">Shape9 Atlas · Napredno upravljanje skladištem (WMS)</span>
            <span className="l-en">Shape9 Atlas · warehouse</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">Skladište u kojem roba prestaje nestajati.</span>
          <span className="l-en">A warehouse where stock stops going missing.</span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl">
          <span className="l-bs">
            Tačno stanje zaliha, tačna polica na kojoj se artikal nalazi i pravovremeno obavještenje o nabavci. Za jedno skladište ili regionalnu mrežu od dvanaest objekata.
          </span>
          <span className="l-en">
            Exact stock, the exact shelf it sits on, and the point at which something needs reordering. For one warehouse or for twelve, across countries.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14 w-full sm:w-auto">
          <a
            href="#atlas-form"
            onClick={(e) => go(e, '#atlas-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#FFA658] hover:bg-[#ff9c58] py-3.5 px-8 transition-colors focus-ring w-full sm:w-auto"
          >
            <span className="l-bs">Zakažite analizu Vašeg skladišta</span>
            <span className="l-en">Let us talk about your warehouse</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-[#FFA658]" />
            <span className="l-bs">Zakažite razgovor</span>
            <span className="l-en">Book a Call</span>
          </button>
        </div>

        {/* REAL CASE STATS */}
        <div className="s9-card border-[rgba(255,166,88,0.18)] bg-[var(--panel)]/60 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,166,88,0.1)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider mb-4 mx-auto">
            <span className="l-bs">Rezultati iz prakse</span>
            <span className="l-en">With one client</span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold text-[var(--ink)] mb-6 leading-snug">
            <span className="l-bs">Dvanaest regionalnih skladišta u 12 država: potpuno operativno za šest sedmica.</span>
            <span className="l-en">Twelve warehouses in twelve countries. The system was running in six weeks.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA658] font-mono">
                <span className="l-bs">81% → 99,4%</span>
                <span className="l-en">81% → 99.4%</span>
              </div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">tačnost zaliha na popisu</span>
                <span className="l-en">inventory accuracy</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 sm:border-x border-[var(--line)]">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA658] font-mono">−91%</div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">manje grešaka pri komisioniranju</span>
                <span className="l-en">fewer order picking errors</span>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA658] font-mono">6</div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">sedmica do pune operativnosti</span>
                <span className="l-en">weeks to go live</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-[var(--muted)] italic text-center">
            <span className="l-bs">Nazive klijenata čuvamo u skladu s ugovorom o povjerljivosti. Tokom konsultacija rado dijelimo relevantne studije slučaja.</span>
            <span className="l-en">We do not publish the client name without consent. On a call we will tell you who it was.</span>
          </p>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,166,88,0.08)] border border-[rgba(255,166,88,0.2)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Problem</span>
              <span className="l-en">The problem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Roba je u skladištu, ali niko ne zna tačnu policu, a inventura traje danima.</span>
              <span className="l-en">The goods are around here somewhere, and stocktake takes days.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl mx-auto">
              <span className="l-bs">
                Bez dinamičkog mapiranja lokacija na policama, radnici gube sate na traženje artikala. Stanje u papirnim evidencijama i na policama se neminovno razilazi: isporuke kasne, a naručuje se roba koja već stoji zaboravljena u skladištu.
              </span>
              <span className="l-en">
                Without an exact shelf location, staff lose hours searching. Between two stocktakes the paper record and the shelf drift apart. Stock appears that is not there, deliveries go out wrong, and things run late where lateness costs most.
              </span>
            </p>

            <p className="text-sm sm:text-base font-semibold text-[#FFA658] max-w-xl mx-auto">
              <span className="l-bs"><span className="font-mono">Atlas</span> pruža uvid u tačno stanje i lokaciju svakog artikla u realnom vremenu.</span>
              <span className="l-en"><span className="font-mono">Atlas</span> shows the exact state every second, at every location.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

{/* HONEST ROLLOUT NOTE */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card border-[rgba(255,166,88,0.2)] bg-[rgba(255,166,88,0.02)] text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-4 leading-tight">
                <span className="l-bs">Iskren pristup: WMS zahtijeva disciplinovanu implementaciju.</span>
                <span className="l-en">To be straight with you: this is not a tool you just switch on.</span>
              </h2>

              <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl mx-auto">
                <span className="l-bs">
                  Uvođenje sistema podrazumijeva rad na terenu: označavanje polica barkodovima, konfiguraciju mobilnih terminala i obuku skladištara. Kod našeg klijenta sa 12 lokacija cijeli proces je trajao šest sedmica, posao koji se uradi jednom i donosi trajni red.
                </span>
                <span className="l-en">
                  The roll-out asks for work on your side. Shelf locations get tagged, the warehouse team gets a mobile app and a short training. With one client that took six weeks, for twelve warehouses. That work happens once and does not come back.
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FOR WHOM (Interactive on Mobile & Desktop) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,166,88,0.08)] border border-[rgba(255,166,88,0.2)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Za koga je</span>
              <span className="l-en">Who it is for</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Kome je Atlas WMS namijenjen</span>
              <span className="l-en">Who Atlas is for</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Prilagođen za sve tipove skladišnih operacija.</span>
              <span className="l-en">Tailored for all kinds of logistics and inventory operations.</span>
            </p>
          </div>

          {/* NARROW SCREEN: tabs. See ProductTabs for why the wide
              screen grid below is deliberately left as a grid. */}
          <div className="section-body block md:hidden mb-6">
            <ProductTabs items={AUDIENCES} accent="#FFA658" accentRgb="255, 166, 88" />
          </div>

{/* DESKTOP 2x2 GRID */}
          <div className="section-body hidden md:grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {AUDIENCES.map((item) => (
              <div key={item.id} className="s9-card">
                <h3 className="text-base font-bold text-[var(--ink)] mb-3">
                  <span className="l-bs">{item.titleBs}</span>
                  <span className="l-en">{item.titleEn}</span>
                </h3>
                <p className="text-sm text-[var(--body)] leading-relaxed">
                  <span className="l-bs">{item.descBs}</span>
                  <span className="l-en">{item.descEn}</span>
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURES */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,166,88,0.08)] border border-[rgba(255,166,88,0.2)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Mogućnosti</span>
              <span className="l-en">What it does</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Sve funkcije skladišnog poslovanja u jedinstvenom sistemu.</span>
              <span className="l-en">Everything a warehouse asks for, in one place.</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES_LIST.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div key={idx} className="s9-card">
                  <IconComponent className="w-6 h-6 text-[#FFA658] mb-4" />
                  <h3 className="text-base font-bold text-[var(--ink)] mb-2.5">
                    <span className="l-bs">{feat.titleBs}</span>
                    <span className="l-en">{feat.titleEn}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--body)] leading-relaxed">
                    <span className="l-bs">{feat.descBs}</span>
                    <span className="l-en">{feat.descEn}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* FIRST CONVERSATION */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card border-[rgba(255,166,88,0.28)] bg-[rgba(255,166,88,0.035)] text-center">
              <div className="s9-badge bg-[rgba(255,166,88,0.12)] border border-[rgba(255,166,88,0.3)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="l-bs">Prvi korak</span>
                <span className="l-en">First step</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-4 leading-tight">
                <span className="l-bs">Prvo analiziramo vaše procese, bez obaveza.</span>
                <span className="l-en">A conversation about your warehouse first, not a quote.</span>
              </h2>

              <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                <span className="l-bs">
                  Podijelite s nama broj artikala, broj skladišnih lokacija i glavne izazove s kojima se susrećete. Dostavićemo vam procjenu dinamike implementacije, očekivani ROI i jasan plan uvođenja.
                </span>
                <span className="l-en">
                  Tell us how many items you hold, how many sites you run and where things get stuck. We come back with a read on what a roll-out would mean for you, how long it would take and whether it pays off. If we think you do not need this, you will hear that too.
                </span>
              </p>

              <a
                href="#atlas-form"
                onClick={(e) => go(e, '#atlas-form')}
                className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#FFA658] hover:bg-[#ff9c58] py-3.5 px-8 transition-colors inline-flex items-center gap-2 focus-ring"
              >
                <span className="l-bs">Zakažite konsultacije</span>
                <span className="l-en">Book a conversation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CLIENT REFERENCE */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,166,88,0.08)] border border-[rgba(255,166,88,0.2)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Iz prakse</span>
              <span className="l-en">In practice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Skladište koje se poklapa sa sistemom.</span>
              <span className="l-en">A warehouse that matches the system.</span>
            </h2>
          </div>
          <div className="section-body max-w-2xl">
            <ClientCard client={CLIENTS.empress} />
          </div>
        </ScrollReveal>
      </section>

      {/* ATLAS FAQ */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,166,88,0.1)] border border-[rgba(255,166,88,0.25)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Pitanja o Atlasu</span>
              <span className="l-en">Questions about Atlas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
              <span className="l-bs">Često postavljana pitanja</span>
              <span className="l-en">Details you care about</span>
            </h2>
          </div>

          <Accordion items={ATLAS_FAQ} className="section-body" />
        </ScrollReveal>
      </section>

      {/* FORM SECTION (#atlas-form) */}
      <section id="atlas-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,166,88,0.12)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(255,166,88,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Testirajte Atlas</span>
              <span className="l-en">Test Atlas</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Započnimo razgovor o vašem skladištu</span>
              <span className="l-en">Tell us what your warehouse looks like.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">Opišite broj artikala, broj lokacija i ključna uska grla u skladišnom poslovanju.</span>
              <span className="l-en">How many items, how many sites, and where things most often get stuck.</span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Atlas" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
