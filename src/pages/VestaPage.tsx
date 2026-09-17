import React from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  Archive,
  Boxes,
  Building2,
  Calendar,
  ClipboardCheck,
  Coins,
  HelpCircle,
  MessageSquare,
  Package,
  PackageCheck,
  Printer,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  UserCheck,
  WifiOff,
  Wrench,
} from 'lucide-react';

import { ScrollReveal } from '../components/ScrollReveal';
import { ContactForm } from '../components/ContactForm';
import { Accordion, AccordionItem } from '../components/Accordion';

interface VestaPageProps {
  onNavigate?: (path: string) => void;
}

/* Vesta's accent, assigned 2026-09-17 and measured rather than picked.
   The wheel had one empty arc left, the sixty degrees between Sonar at hue
   233 and Pulse at 293. A first attempt at lightness 0.78 landed on Pulse:
   at that lightness the gamut at hue 263 caps chroma around 0.10 and the
   result is a pale lavender. Dropping to 0.66 allows chroma 0.17, which
   reads as a deep cornflower and separates from Sonar's sky blue and
   Pulse's lavender by depth as well as by hue. Contrast on the ground is
   6.2:1. */
const ACCENT = '#588DFA';
const ACCENT_RGB = '88, 141, 250';

/* The six stages of one asset, from the product deck's own lifecycle strip.
   Numbered because the order is the point: an asset cannot be assigned
   before it is received, and cannot be written off twice. */
const LIFECYCLE = [
  {
    id: 'nabavka',
    icon: ShoppingCart,
    nBs: 'Nabavka',
    nEn: 'Purchase',
    bs: 'Narudžbenica s tačnim brojem koraka odobravanja koje definišu Vaša interna pravila.',
    en: 'An order with as many approval steps as your own rules require.',
  },
  {
    id: 'prijem',
    icon: PackageCheck,
    nBs: 'Prijem i zaduženje',
    nEn: 'Receipt',
    bs: 'Prispjela oprema postaje osnovno sredstvo s jedinstvenim identifikatorom i dobija trajnu fizičku oznaku.',
    en: 'What arrived becomes an asset with its own identifier, and a label goes on it for good.',
  },
  {
    id: 'dodjela',
    icon: UserCheck,
    nBs: 'Dodjela',
    nEn: 'Assignment',
    bs: 'Zaduživanje konkretne osobe ili odjela, uz tačan datum preuzimanja.',
    en: 'Handed to a named person or a department, with the date it was taken over.',
  },
  {
    id: 'kretanje',
    icon: ArrowLeftRight,
    nBs: 'Kretanje',
    nEn: 'Movement',
    bs: 'Evidentiranje premještanja, iznajmljivanja ili rezervacije za određeni vremenski period.',
    en: 'Transferred, rented out, or reserved for a set period.',
  },
  {
    id: 'odrzavanje',
    icon: Wrench,
    nBs: 'Održavanje',
    nEn: 'Maintenance',
    bs: 'Planirani periodični pregledi, servisi u slučaju kvara i tačan zapis ko je prouzrokovao štetu.',
    en: 'Inspections on a schedule, repairs when something breaks, and a record of who caused the damage.',
  },
  {
    id: 'rashod',
    icon: Archive,
    nBs: 'Rashodovanje',
    nEn: 'Retirement',
    bs: 'Povlačenje iz upotrebe na kraju životnog vijeka, uz precizno evidentiran način zbrinjavanja.',
    en: 'Taken out of use at the end of its life, with the way it was disposed of written down.',
  },
];

/* Six processes, each as a before and an after. Same shape as the Mode page,
   because the delta is what persuades and a list of capabilities is not. */
const AREAS = [
  {
    id: 'nabavka',
    icon: ShoppingCart,
    areaBs: 'Nabavka',
    areaEn: 'Purchasing',
    beforeBs: 'Faktura ode u računovodstvo, oprema na teren, a podaci se od tog dana nepovratno razilaze.',
    beforeEn: 'The invoice goes to accounts, the equipment goes out to the field, and from that day the two records drift apart.',
    afterBs: 'Oprema se evidentira odmah po prijemu, dobija jedinstvenu šifru i oznaku, te od tog trena ima zabilježenu historiju.',
    afterEn: 'It is booked in the moment it arrives, gets its own code and a label, and has a recorded history from then on.',
  },
  {
    id: 'zaduzivanje',
    icon: UserCheck,
    areaBs: 'Zaduživanje',
    areaEn: 'Assignment',
    beforeBs: 'Ko je posljednji uzeo opremu traži se raspitivanjem po hodnicima.',
    beforeEn: 'Who took it last gets asked around the corridors.',
    afterBs: 'Svako sredstvo je vezano za tačno ime i datum, a svako prosljeđivanje se odmah bilježi u sistemu.',
    afterEn: 'Every asset is tied to a name and a date, and every hand over is recorded as it happens.',
  },
  {
    id: 'zahtjevi',
    icon: ClipboardCheck,
    areaBs: 'Zahtjevi za opremom',
    areaEn: 'Equipment requests',
    beforeBs: 'Kada nekome zatreba laptop, poziva redom one za koje pretpostavlja da odlučuju.',
    beforeEn: 'Someone needs a laptop and rings round the people they assume decide.',
    afterBs: 'Zahtjev prolazi kroz tačno definisane nivoe odobrenja, a svi uključeni u svakom trenutku vide u kojoj je fazi.',
    afterEn: 'The request goes through defined levels of approval, and everyone involved can see which stage it is at.',
  },
  {
    id: 'kretanje',
    icon: ArrowLeftRight,
    areaBs: 'Kretanje unutar grupacije',
    areaEn: 'Movement inside the group',
    beforeBs: 'Oprema se preseli, a dokumentacija ostane, pa se u knjigama sredstvo i dalje vodi na staroj firmi.',
    beforeEn: 'The equipment moves and the paperwork stays, so on the books it is still at the old company.',
    afterBs: 'Zakup, prodaja ili povrat: svako kretanje se evidentira, a obje kompanije vide identično stanje.',
    afterEn: 'Rental, sale or return. Every move is recorded, and both companies see the identical picture.',
  },
  {
    id: 'odrzavanje',
    icon: Wrench,
    areaBs: 'Održavanje i servisi',
    areaEn: 'Maintenance and repairs',
    beforeBs: 'Popravke se pamte dok osoba koja ih je vodila ne napusti firmu.',
    beforeEn: 'Repairs are remembered until the person who handled them leaves.',
    afterBs: 'Svaka inspekcija, servis i ugrađeni zamjenski dio ostaju trajno zabilježeni uz samo sredstvo.',
    afterEn: 'Every inspection, service and replaced part stays recorded against the asset itself.',
  },
  {
    id: 'rashod',
    icon: Archive,
    areaBs: 'Rashodovanje',
    areaEn: 'Write-off',
    beforeBs: 'Oprema se baci, a u poslovnim knjigama nastavlja gomilati fiktivnu amortizaciju.',
    beforeEn: 'It gets scrapped and carries on piling up depreciation that is not real.',
    afterBs: 'Otpis se evidentira odmah, uz tačan način zbrinjavanja, a računovodstvo istog dana dobija čist podatak.',
    afterEn: 'The write-off is recorded at once, with the disposal method, and accounts get a clean figure the same day.',
  },
];

/* The field tools. Five, because the phone is where the work actually
   happens and a page that only describes the desk version describes half
   the product. */
const FIELD = [
  {
    id: 'skener',
    icon: ScanLine,
    tBs: 'Skeniranje kamerom uređaja',
    tEn: 'The camera is the scanner',
    bs: 'Usmjerite kameru prema QR kodu ili barkodu i kompletna kartica sredstva se odmah prikazuje na ekranu, za provjeru, označavanje ili ažuriranje.',
    en: 'Point the camera at a QR code or a barcode and the whole asset record is on screen, to check, to tag or to update.',
  },
  {
    id: 'offline',
    icon: WifiOff,
    tBs: 'Rad bez internetske veze',
    tEn: 'It works with no connection',
    bs: 'Skeniranja i unosi bilježe se lokalno na telefonu i automatski šalju u bazu onog trenutka kada uređaj ponovo uspostavi vezu. Bilo da ste u podrumu, skladištu ili na gradilištu bez signala, podaci ostaju sačuvani.',
    en: 'Scans and entries are written on the phone and sent up the moment the device is back in range. A basement, a warehouse or a site with no signal. Nothing is lost.',
  },
  {
    id: 'stampa',
    icon: Printer,
    tBs: 'Štampanje naljepnica s telefona',
    tEn: 'Labels print from the phone',
    bs: 'Slanje naloga na štampač putem Bluetooth veze, ili s računara putem USB priključka i lokalne mreže. Veličinu i format naljepnice birate u trenutku štampe, a ne mjesecima unaprijed.',
    en: 'Straight to the printer over Bluetooth, or from a desk over USB or the local network. You choose the size and the format when you print, not months in advance.',
  },
  {
    id: 'javni',
    icon: QrCode,
    tBs: 'Javni uvid za sve zaposlene',
    tEn: 'Anyone can scan a label',
    bs: 'Skeniranjem oznake otvara se osnovni javni profil opreme, bez potrebe za prijavom na sistem i bez otkrivanja povjerljivih internih podataka.',
    en: 'A scan opens a basic public profile of the equipment, with no login and without exposing anything confidential.',
  },
  {
    id: 'inspekcije',
    icon: ClipboardCheck,
    tBs: 'Terenske inspekcije u hodu',
    tEn: 'Inspections walk with you',
    bs: 'Obavite redovni obilazak lokacije, skenirajte svako sredstvo i unesite zapažanja, potpuno samostalno i bez pristupa internetu.',
    en: 'Do the round, scan each asset and record what you found, on your own and with no connection at all.',
  },
];

const VESTA_FAQ: AccordionItem[] = [
  {
    id: 'vesta-faq-1',
    qBs: 'Imamo oko pedeset firmi u grupaciji, da li je to prevelik obim?',
    qEn: 'We have around fifty companies in the group. Is that too big?',
    aBs: 'Ne, sistem je arhitektonski projektovan upravo za grupacije te veličine. Svaka firma zadržava pregled sopstvene imovine i zaposlenih, dok uprava ima konsolidovan nadzor nad cijelim sistemom, preračunat u željenu izvještajnu valutu.',
    aEn: 'No, it was designed for a group of exactly that size. Each company keeps its own view of its assets and its people, while the group has consolidated oversight of all of it, converted into whichever currency you report in.',
  },
  {
    id: 'vesta-faq-2',
    qBs: 'Naša oprema trenutno nema nikakve oznake, šta radimo u tom slučaju?',
    qEn: 'Our equipment has no markings at all. What do we do then?',
    aBs: 'Tada postavljamo standardizovane oznake. Naljepnice se štampaju direktno iz sistema i lijepe jednom, u obliku QR koda ili barkoda, zavisno od vrste predmeta. Bez toga nema skeniranja, a upravo skeniranje održava tačnost evidencije.',
    aEn: 'Then it gets them. Labels print straight from the system and go on once, as a QR code or a barcode depending on the object. Without that there is nothing to scan, and scanning is the thing that keeps the register accurate.',
  },
  {
    id: 'vesta-faq-3',
    qBs: 'Naši ljudi na terenu nemaju pouzdan internet.',
    qEn: 'Our field staff have no reliable internet.',
    aBs: 'Mobilna aplikacija radi potpuno stabilno bez mreže. Sve operacije izvršene u objektu ili na terenu bilježe se na samom telefonu i sinhronizuju čim se uspostavi veza.',
    aEn: 'The mobile app runs perfectly well without it. Everything done inside a building or out on site is written on the phone itself and syncs the moment a connection returns.',
  },
  {
    id: 'vesta-faq-4',
    qBs: 'Mi ne posjedujemo svu opremu, već je često iznajmljujemo i dajemo u najam.',
    qEn: 'We do not own all of it. We rent equipment in and out.',
    aBs: 'To je u sistemu riješeno kao zaseban poslovni proces u oba smjera, uz podršku za više stavki po jednom ugovoru i mogućnost parcijalnog povrata kada se vrati samo dio opreme.',
    aEn: 'That is handled as a process of its own, in both directions, with several items on one agreement and partial returns when only some of the equipment comes back.',
  },
  {
    id: 'vesta-faq-5',
    qBs: 'Šta se dešava sa stvarima koje su ranije prodate ili rashodovane?',
    qEn: 'What happens to things already sold or written off?',
    aBs: 'One ostaju zabilježene u bazi podataka, jer se historijski zapisi ne brišu. Tako uvijek imate jasan odgovor šta se dogodilo s određenim sredstvom, a ne samo uvid u ono što trenutno postoji na stanju.',
    aEn: 'They stay in the database, because historical records are not deleted. That way you always have a clear answer to what happened to a given asset, and not only a view of what is currently on hand.',
  },
];

export const VestaPage: React.FC<VestaPageProps> = ({ onNavigate }) => {
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
    /* No video hero. Vesta has no launch film, so the page opens the way the
       custom page does: extra top padding instead of a pinned video, and the
       badge carries the first line rather than the film's eyebrow. */
    <div className="space-y-20 sm:space-y-28 pt-28 sm:pt-40 pb-24 sm:pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span
            className="s9-badge inline-flex items-center gap-2 mx-auto"
            style={{ color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB}, 0.1)`, borderColor: `rgba(${ACCENT_RGB}, 0.25)` }}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="l-bs">Namjenski razvijeno za poslovne grupacije</span>
            <span className="l-en">Built for business groups and holdings</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">
            Sve što grupacija posjeduje, od narudžbenice do konačnog{' '}
            <span style={{ color: ACCENT }}>otpisa.</span>
          </span>
          <span className="l-en">
            Everything the group owns, from the purchase order to the final{' '}
            <span style={{ color: ACCENT }}>write-off.</span>
          </span>
        </h1>

        <p
          className="hero-animate-3 text-xl sm:text-2xl font-semibold max-w-3xl mx-auto mb-4 leading-snug"
          style={{ color: 'var(--ink)' }}
        >
          <span className="l-bs">„Kod koga je završio onaj mjerni uređaj?"</span>
          <span className="l-en">"Who ended up with that meter?"</span>
        </p>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12">
          <span className="l-bs">
            Pitanje koje se u praksi ponavlja gotovo svake sedmice i za koje redovno treba pola radnog dana da se pronađe odgovor. Dio opreme nalazi se u drugoj firmi unutar grupacije, dio je kod ekipa na terenu, a dio je rashodovan prije dvije godine, iako se i dalje vodi u poslovnim knjigama.
          </span>
          <span className="l-en">
            A question that comes up most weeks and reliably takes half a working day to answer. Some of the equipment is at another company inside the group, some is with crews out in the field, and some was written off two years ago and is still carried on the books.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#vesta-form"
            onClick={(e) => go(e, '#vesta-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] py-3.5 px-8 transition-colors inline-flex items-center justify-center gap-2 focus-ring w-full sm:w-auto"
            style={{ backgroundColor: ACCENT }}
          >
            <span className="l-bs">Pošaljite nam pregled imovine</span>
            <span className="l-en">Send us your asset list</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="l-bs">Zakažite strateški poziv</span>
            <span className="l-en">Book a strategy call</span>
          </button>
        </div>
      </section>

      {/* 01 THE PROBLEM. Four separate failures rather than one, because a
          group recognises itself in whichever of the four bites hardest. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2 className="h2-wide">
              <span className="l-bs">Popis radite jednom godišnje, a oprema se kreće svakodnevno.</span>
              <span className="l-en">You count once a year. The equipment moves every day.</span>
            </h2>
            <p>
              <span className="l-bs">
                Kada je imovina raspoređena na pedeset firmi, niko nema cjelovit uvid u to šta grupacija posjeduje niti gdje se koje sredstvo nalazi.
              </span>
              <span className="l-en">
                When the assets sit across fifty companies, nobody has a whole view of what the group owns or where any of it is.
              </span>
            </p>
          </div>

          <div className="section-body flex flex-col gap-4">
            {[
              {
                id: 'tabela',
                tBs: 'Tabela ne može pratiti dinamiku na terenu',
                tEn: 'A spreadsheet cannot keep up with the field',
                bs: 'Ko je zadužen za opremu, kolika joj je trenutna vrijednost, kada ističe garancija i šta je na njoj servisirano. Svi ti podaci zastarijevaju već za nekoliko sedmica.',
                en: 'Who is responsible for it, what it is worth now, when the warranty runs out and what has been serviced on it. All of it goes stale within a few weeks.',
              },
              {
                id: 'kretanje',
                tBs: 'Kretanje imovine između povezanih firmi ne ostavlja trag',
                tEn: 'Movement between related companies leaves no trace',
                bs: 'Interni zakup, prodaja ili povrat, ništa od toga nije evidentirano na način da se kasnije može brzo pronaći.',
                en: 'An internal rental, a sale or a return. None of it is recorded in a way that can be found again later.',
              },
              {
                id: 'teren',
                tBs: 'Na terenu nedostaju alati za rad',
                tEn: 'There is nothing to work with on site',
                bs: 'Niko ne može skenirati sredstvo, odštampati barkod niti ažurirati status opreme dok stoji neposredno pored nje.',
                en: 'Nobody can scan an asset, print a barcode or update its status while standing right next to it.',
              },
            ].map((row) => (
              <div key={row.id} className="s9-card flex flex-col gap-2">
                <h3>
                  <span className="l-bs">{row.tBs}</span>
                  <span className="l-en">{row.tEn}</span>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed m-0">
                  <span className="l-bs">{row.bs}</span>
                  <span className="l-en">{row.en}</span>
                </p>
              </div>
            ))}

            <p className="text-base sm:text-lg font-semibold leading-snug m-0 mt-2" style={{ color: 'var(--ink)' }}>
              <span className="l-bs">Koliko ste samo puta kupili opremu koju već posjedujete, samo u drugoj firmi unutar grupacije?</span>
              <span className="l-en">How many times have you bought equipment you already own, just at another company in the group?</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 02 THE IDEA. Ownership against possession is the thing that makes
          this a system rather than a list, and it was missing from every
          earlier description of the product. It gets its own chapter. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div
              className="s9-badge text-xs font-semibold uppercase tracking-wider"
              style={{ color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB}, 0.08)`, borderColor: `rgba(${ACCENT_RGB}, 0.2)` }}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="l-bs">Vlasništvo i posjed</span>
              <span className="l-en">Ownership and possession</span>
            </div>
            <h2 className="h2-wide">
              <span className="l-bs">Biti vlasnik i držati opremu u posjedu dvije su potpuno različite stvari.</span>
              <span className="l-en">Owning a thing and holding it are two different things.</span>
            </h2>
            <p>
              <span className="l-bs">Jedna firma može biti vlasnik sredstva, dok se sama oprema fizički nalazi u rukama druge. Ta ključna razlika predstavlja temelj cijelog sistema.</span>
              <span className="l-en">One company can own an asset while the equipment itself is physically in the hands of another. That distinction is the foundation of the whole system.</span>
            </p>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'zakup',
                tBs: 'Interni zakup prenosi posjed',
                tEn: 'An internal rental moves possession',
                bs: 'Oprema ostaje u knjigama vlasnika, uz jasnu evidenciju ko je trenutno koristi na drugoj lokaciji.',
                en: 'The equipment stays on the owner\'s books, with a clear record of who is using it and where.',
              },
              {
                id: 'prodaja',
                tBs: 'Interna prodaja prenosi oboje',
                tEn: 'An internal sale moves both',
                bs: 'Imovina i fizički posjed prelaze zajedno, a poslovne knjige prethodne firme prestaju nositi to sredstvo.',
                en: 'Ownership and physical possession move together, and the previous company\'s books stop carrying the asset.',
              },
              {
                id: 'povrat',
                tBs: 'Povrat vraća posjed vlasniku',
                tEn: 'A return brings possession back',
                bs: 'Svako vraćanje se evidentira kao operativni korak, umjesto pukog brisanja prethodnih zapisa.',
                en: 'Every return is recorded as a step that happened, rather than by deleting what came before.',
              },
            ].map((c) => (
              <div key={c.id} className="s9-card flex flex-col gap-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                  <span className="l-bs">{c.tBs}</span>
                  <span className="l-en">{c.tEn}</span>
                </div>
                <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--ink)' }}>
                  <span className="l-bs">{c.bs}</span>
                  <span className="l-en">{c.en}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="section-body mt-4">
            <div className="s9-card">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <span className="l-bs">
                  U pozadini se nalazi preslikana struktura Vaše grupacije. <strong>Organizacija</strong> predstavlja cijelu grupaciju, <strong>kompanije</strong> su pojedinačna pravna lica, a <strong>odjeli</strong> su interni operativni timovi. Svako sredstvo uvijek ima pravno lice koje je njegov vlasnik i konkretnu osobu koja za njega materijalno odgovara.
                </span>
                <span className="l-en">
                  Underneath it sits the shape of your own group. The <strong>organisation</strong> is the group as a whole, <strong>companies</strong> are the individual legal entities, and <strong>departments</strong> are the teams inside them. Every asset always has a legal entity that owns it and a named person who answers for it.
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 03 THE LIFECYCLE, then the same six areas as before and after. The
          strip establishes the order, the cards show the delta. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2>
              <span className="l-bs">Životni ciklus jednog osnovnog sredstva</span>
              <span className="l-en">The life of one asset</span>
            </h2>
          </div>

          <div className="section-body flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {LIFECYCLE.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.id} className="s9-card-nested flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] tabular-nums" style={{ color: ACCENT }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                        <span className="l-bs">{s.nBs}</span>
                        <span className="l-en">{s.nEn}</span>
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed m-0">
                      <span className="l-bs">{s.bs}</span>
                      <span className="l-en">{s.en}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-base sm:text-lg font-semibold leading-snug m-0" style={{ color: 'var(--ink)' }}>
              <span className="l-bs">Svaka faza automatski nadograđuje historiju sredstva. Podaci se ne presnimavaju i ništa se ne gubi.</span>
              <span className="l-en">Every stage adds to the asset's history. Nothing is overwritten and nothing is lost.</span>
            </p>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="s9-card-nested flex flex-col gap-2">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        <span className="l-bs">Bez sistema</span>
                        <span className="l-en">Without a system</span>
                      </div>
                      <p className="text-sm leading-relaxed m-0">
                        <span className="l-bs">{row.beforeBs}</span>
                        <span className="l-en">{row.beforeEn}</span>
                      </p>
                    </div>
                    <div
                      className="s9-card-nested flex flex-col gap-2"
                      style={{ borderColor: `rgba(${ACCENT_RGB}, 0.3)` }}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                        <span className="l-bs">Uz Vestu</span>
                        <span className="l-en">With Vesta</span>
                      </div>
                      {/* Inline colour, not `text-[var(--ink)]`. The bare `p`
                          rule in index.css is unlayered and beats every
                          utility, so the after column renders body grey and
                          loses the contrast the pair depends on. */}
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

      {/* THE ATLAS BOUNDARY, deliberately unnumbered. The catalogue says to
          state it every single time, because a non technical buyer hears
          both products as "know what you have" unless the difference is
          spelled out. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card flex flex-col gap-5">
              <h2 className="leading-tight">
                <span className="l-bs">Razlika između Atlasa i Veste</span>
                <span className="l-en">Atlas and Vesta are not the same thing</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="s9-card-nested flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 shrink-0" style={{ color: '#FFA658' }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: '#FFA658' }}>
                      Atlas
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed m-0">
                    <span className="l-bs">Roba koja cirkuliše kroz Vaše poslovanje: zalihe, narudžbe i komisioniranje. Roba koja ulazi u skladište kako bi se ubrzo prodala i otpremila.</span>
                    <span className="l-en">The goods that circulate through your business. Stock, orders and picking. Goods that come into the warehouse so they can be sold and shipped out again.</span>
                  </p>
                </div>
                <div className="s9-card-nested flex flex-col gap-2" style={{ borderColor: `rgba(${ACCENT_RGB}, 0.3)` }}>
                  <div className="flex items-center gap-2.5">
                    <Boxes className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                      Vesta
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--ink)' }}>
                    <span className="l-bs">Osnovna sredstva koja posjedujete i koristite: oprema, vozni park, alati i inventar kompanije koji trajno ostaju u sistemu.</span>
                    <span className="l-en">The assets you own and use. Equipment, vehicles, tools and company inventory that stay with you.</span>
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed m-0">
                <span className="l-bs">Preduzećima sa složenom infrastrukturom potrebna su oba rješenja. Razlika leži u tome ko postavlja upit: logistika i skladište gledaju Atlas, dok računovodstvo i uprava gledaju Vestu.</span>
                <span className="l-en">A business with real infrastructure needs both. The difference is who is asking: logistics and the warehouse look at Atlas, while accounts and management look at Vesta.</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 04 THE FIELD. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2 className="h2-wide">
              <span className="l-bs">Mobilni rad na terenu, na bilo kojem telefonu</span>
              <span className="l-en">Work on site, on any phone</span>
            </h2>
            <p>
              <span className="l-bs">Većinu operacija s računara telefon obavlja jednako efikasno, jer se stvarni posao odvija tamo gdje se oprema nalazi, a ne za radnim stolom.</span>
              <span className="l-en">The phone does most of what the desk does, because the real work happens where the equipment is and not at a desk.</span>
            </p>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FIELD.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.id} className="s9-card flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
                    <h3>
                      <span className="l-bs">{f.tBs}</span>
                      <span className="l-en">{f.tEn}</span>
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed m-0">
                    <span className="l-bs">{f.bs}</span>
                    <span className="l-en">{f.en}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* 05 MONEY. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div
              className="s9-badge text-xs font-semibold uppercase tracking-wider"
              style={{ color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB}, 0.08)`, borderColor: `rgba(${ACCENT_RGB}, 0.2)` }}
            >
              <Coins className="w-3.5 h-3.5" />
              <span className="l-bs">Vrijednost i izvještaji</span>
              <span className="l-en">Value and reporting</span>
            </div>
            <h2 className="h2-wide">
              <span className="l-bs">Finansijska kontrola u izvornoj valuti troška</span>
              <span className="l-en">Financial control in the currency the money was actually spent in</span>
            </h2>
            <p>
              <span className="l-bs">
                Svaka nabavka, naknada i procjena vrijednosti vodi se u valuti u kojoj je stvarni trošak nastao. Kursne liste se ažuriraju svakodnevno, pa su ukupni iznosi precizni bez ručnih preračunavanja, dok se svaki iznos paralelno preračunava i u jedinstvenu izvještajnu valutu grupacije. Ranije zabilježene vrijednosti ostaju trajno vezane za datum nastanka troška, umjesto naknadnih i nepreciznih prepravki po današnjem kursu.
              </span>
              <span className="l-en">
                Every purchase, fee and valuation is held in the currency the cost was actually incurred in. Exchange rates refresh daily, so totals are accurate without anyone converting by hand, while every amount is also carried in the group's single reporting currency. Values recorded earlier stay tied to the date they happened, rather than being quietly restated at today's rate.
              </span>
            </p>
          </div>

          <div className="section-body">
            <div className="s9-card flex flex-col gap-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                <span className="l-bs">Šest upravljačkih pitanja na koja izvještaji odgovaraju</span>
                <span className="l-en">The six questions the reports answer</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  ['Kolika je ukupna vrijednost imovine, po kompaniji ili kategoriji?', 'What is the total value of the assets, by company or by category?'],
                  ['Koji su predmeti još pod garancijom, a kojima garancija uskoro ističe?', 'What is still under warranty, and what is about to run out?'],
                  ['Ko je zadužen za koja sredstva na nivou cijele grupacije?', 'Who is responsible for what, across the whole group?'],
                  ['Koliki su ukupni izdaci nastali kroz posmatrani period?', 'What has been spent over the period you are looking at?'],
                  ['Kolike su preostale zalihe potrošnog materijala i kojom brzinom se troše?', 'How much consumable stock is left, and how fast is it going?'],
                  ['Šta su pokazali posljednji terenski inspekcijski nalazi?', 'What did the latest field inspections find?'],
                ].map(([bs, en]) => (
                  <p key={bs} className="text-sm leading-relaxed m-0 flex gap-2.5">
                    <span aria-hidden style={{ color: ACCENT }}>·</span>
                    <span>
                      <span className="l-bs">{bs}</span>
                      <span className="l-en">{en}</span>
                    </span>
                  </p>
                ))}
              </div>

              <p className="text-sm leading-relaxed m-0">
                <span className="l-bs">Iza svakog prikaza stoji cjelovit finansijski dnevnik svih kretanja kapitala.</span>
                <span className="l-en">Behind every view sits a complete ledger of every movement of money.</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 06 ACCESS AND THE AUDIT TRAIL. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div
              className="s9-badge text-xs font-semibold uppercase tracking-wider"
              style={{ color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB}, 0.08)`, borderColor: `rgba(${ACCENT_RGB}, 0.2)` }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="l-bs">Pristup i trag</span>
              <span className="l-en">Access and the trail</span>
            </div>
            <h2 className="h2-wide">
              <span className="l-bs">Precizni nivoi pristupa i nepromjenjiv revizorski trag</span>
              <span className="l-en">Exact levels of access, and a trail nobody can rewrite</span>
            </h2>
            <p>
              <span className="l-bs">
                Sistem donosi šest unaprijed postavljenih uloga, od vlasnika cijele grupacije do operativnog radnika koji upravlja opremom koja mu je dodijeljena, pri čemu se ovlaštenja provjeravaju zasebno za svaku kompaniju, a ne samo na ulazu u sistem.
              </span>
              <span className="l-en">
                Six roles come built in, from the owner of the whole group down to the worker handling the equipment assigned to them, and permissions are checked separately for each company rather than once at the door.
              </span>
            </p>
          </div>

          <div className="section-body">
            <div className="s9-card">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <span className="l-bs">
                  Svaka promjena statusa i svaka prijava na sistem trajno se bilježe, a generisani zapisi se nikada ne mogu prepisati niti obrisati. Kada administrator pristupi nalogu drugog korisnika kako bi mu pružio tehničku podršku, taj korak se takođe precizno evidentira pod njegovim ličnim imenom. Za regulisane djelatnosti ovo nije samo tehnička mogućnost, već osnovni preduslov koji omogućava korištenje sistema.
                </span>
                <span className="l-en">
                  Every change of status and every login is recorded permanently, and what gets written can never be rewritten or deleted. When an administrator opens another user's account in order to help them, that step is recorded too, under their own name. For a regulated business this is not a feature, it is the precondition that makes the system usable at all.
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 07 THE ROLL-OUT, said plainly. Vesta is not switch-on and the
          catalogue forbids ever selling it as though it were. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <h2 className="h2-wide">
              <span className="l-bs">Uvođenje traži operativni angažman, i to otvoreno kažemo na početku.</span>
              <span className="l-en">Getting it in takes real work, and we say so at the start.</span>
            </h2>
            <p>
              <span className="l-bs">
                Svako sredstvo dobija fizičku oznaku, jednom. Pravna lica, odjeli, uloge i dozvole se precizno konfigurišu, dok timovi na terenu prolaze praktičnu obuku. Za to je potrebno vrijeme, uključujući i Vaše.
              </span>
              <span className="l-en">
                Every asset gets a physical label, once. Legal entities, departments, roles and permissions are configured properly, and the field teams are trained on the job. That takes time, including yours.
              </span>
            </p>
            <p>
              <span className="l-bs">
                Kao rezultat dobijate prvu stvarnu i pouzdanu sliku cjelokupne imovine grupacije. Sistem je u punoj produkciji u verziji 1.3, potpuno lokalizovan na bosanski i engleski jezik, a naš regionalni tim vodi proces uvođenja zajedno s Vama.
              </span>
              <span className="l-en">
                What you get out of it is the first real and reliable picture of everything the group owns. The system is in full production at version 1.3, fully localised in Bosnian and English, and our local team runs the roll-out together with you.
              </span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 08 FAQ */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div
              className="s9-badge text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6"
              style={{ color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB}, 0.1)`, borderColor: `rgba(${ACCENT_RGB}, 0.25)` }}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Česta pitanja</span>
              <span className="l-en">FAQ</span>
            </div>
            <h2>
              <span className="l-bs">Pitanja koja vlasnici i direktori prvo postave</span>
              <span className="l-en">What owners and directors ask first</span>
            </h2>
          </div>

          <Accordion items={VESTA_FAQ} className="section-body" />
        </ScrollReveal>
      </section>

      {/* 09 NEXT STEP */}
      <section id="vesta-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div
              className="s9-badge text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6"
              style={{ color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB}, 0.12)`, borderColor: `rgba(${ACCENT_RGB}, 0.25)` }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Sljedeći korak</span>
              <span className="l-en">Next step</span>
            </div>

            <h2 className="h2-wide">
              <span className="l-bs">Pošaljite nam pregled imovine</span>
              <span className="l-en">Send us your asset list</span>
            </h2>

            <p>
              <span className="l-bs">
                Navedite koliko pravnih lica posluje unutar grupacije i kako danas organizujete popis. Na osnovu tih parametara pripremićemo konkretan prijedlog implementacije.
              </span>
              <span className="l-en">
                Tell us how many legal entities trade inside the group and how the count is organised today. On that basis we prepare a concrete proposal for putting it in.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Vesta" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
