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
    bs: 'Narudžbenica s tačnim brojem nivoa odobravanja koje definišu Vaša interna pravila.',
    en: 'Purchase requisitions with approval workflows tailored to your internal governance.',
  },
  {
    id: 'prijem',
    icon: PackageCheck,
    nBs: 'Prijem i zaduživanje',
    nEn: 'Asset intake and assignment',
    bs: 'Prispjela oprema dobija jedinstvenu šifru i trajnu bar-kod oznaku odmah po prijemu.',
    en: 'Incoming assets receive a unique identifier and permanent label the moment they arrive.',
  },
  {
    id: 'dodjela',
    icon: UserCheck,
    nBs: 'Dodjela',
    nEn: 'Assignment',
    bs: 'Opremu zadužujete na konkretnu osobu ili odjel, uz tačan datum preuzimanja.',
    en: 'Assign directly to an individual or department, logged with the exact handover date.',
  },
  {
    id: 'kretanje',
    icon: ArrowLeftRight,
    nBs: 'Kretanje',
    nEn: 'Movement',
    bs: 'Premjestite je, date u interni najam ili rezervišete na određeni period, a svaka promjena statusa ostaje trajno zabilježena.',
    en: 'Relocate, lease internally, or reserve for a set period: every status change is permanently logged.',
  },
  {
    id: 'odrzavanje',
    icon: Wrench,
    nBs: 'Održavanje i servis',
    nEn: 'Maintenance and servicing',
    bs: 'Planirate periodične preglede, evidentirate vanredne servise i tačno znate ko odgovara za oštećenje.',
    en: 'Scheduled inspections, immediate breakdown repairs, and a clear audit trail of responsibility.',
  },
  {
    id: 'rashod',
    icon: Archive,
    nBs: 'Rashodovanje',
    nEn: 'Retirement',
    bs: 'Opremu povlačite iz upotrebe na kraju vijeka trajanja, uz precizno dokumentovan način otpisa i zbrinjavanja.',
    en: 'End-of-life asset decommissioning, documented with the verified disposal method.',
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
    beforeEn: 'The invoice lands in accounting, the equipment goes to the field, and the two records drift apart from day one.',
    afterBs: 'Opremu evidentirate odmah po prijemu, dobije šifru i bar-kod oznaku, i od tog trena ima zabilježenu historiju.',
    afterEn: 'Assets are logged upon receipt, tagged with a unique barcode, and tracked with a full lifecycle history.',
  },
  {
    id: 'zaduzivanje',
    icon: UserCheck,
    areaBs: 'Interno zaduživanje',
    areaEn: 'Internal assignment',
    beforeBs: 'Ko je posljednji preuzeo opremu traži se raspitivanjem po hodnicima i pozivima.',
    beforeEn: 'Locating who last had an asset means asking around hallways and sending urgent messages.',
    afterBs: 'Svako sredstvo nosi ime odgovornog lica i datum, a svako prosljeđivanje odmah evidentirate.',
    afterEn: 'Every asset is assigned to a specific person and date, with every handover recorded in real time.',
  },
  {
    id: 'zahtjevi',
    icon: ClipboardCheck,
    areaBs: 'Zahtjevi za nabavku i dodjelu',
    areaEn: 'Asset requests and requisitioning',
    beforeBs: 'Kada nekome zatreba oprema za rad, poziva redom one za koje pretpostavlja da donose odluku.',
    beforeEn: 'When someone needs work equipment, they call around guessing who has the authority to approve it.',
    afterBs: 'Zahtjev prolazi kroz nivoe odobrenja koje sami definišete, a svi uključeni u svakom trenutku vide u kojoj je fazi.',
    afterEn: 'Requisitions follow your preconfigured approval stages, giving all stakeholders real-time visibility into status.',
  },
  {
    id: 'kretanje',
    icon: ArrowLeftRight,
    areaBs: 'Kretanje imovine između firmi i lokacija',
    areaEn: 'Intercompany transfers',
    beforeBs: 'Oprema promijeni lokaciju, a dokumentacija izostane, pa se u knjigama sredstvo i dalje vodi na prethodnoj firmi.',
    beforeEn: 'Equipment moves between entities while paperwork lags, leaving the asset on the wrong company ledger.',
    afterBs: 'Interni zakup, prodaja ili povrat: svako kretanje evidentirate u trenutku, a obje kompanije vide identično stanje.',
    afterEn: 'Internal leasing, sale, or return: every movement is logged instantly, keeping both ledgers in sync.',
  },
  {
    id: 'odrzavanje',
    icon: Wrench,
    areaBs: 'Održavanje i servisna historija',
    areaEn: 'Maintenance and service logs',
    beforeBs: 'Detalji popravki se pamte samo dok osoba koja ih je vodila ne napusti kompaniju.',
    beforeEn: 'Service history lives only in the head of the person who coordinated it, vanishing when they leave.',
    afterBs: 'Svaki pregled, servis i ugrađeni zamjenski dio trajno stoje uz karticu sredstva.',
    afterEn: 'Every inspection, repair, and replaced part is permanently documented on the asset record.',
  },
  {
    id: 'rashod',
    icon: Archive,
    areaBs: 'Rashodovanje',
    areaEn: 'Write-off',
    beforeBs: 'Oštećena oprema se baci, a u poslovnim knjigama nastavlja neosnovano gomilati fiktivnu amortizaciju.',
    beforeEn: 'Damaged equipment is scrapped physically, yet continues silently accumulating fictitious depreciation on the books.',
    afterBs: 'Otpis evidentirate odmah, zajedno sa načinom zbrinjavanja, a računovodstvo istog dana dobija potpuno tačan podatak.',
    afterEn: 'Write-offs are logged immediately with the disposal method, providing accounting with clean data the same day.',
  },
];

/* The field tools. Five, because the phone is where the work actually
   happens and a page that only describes the desk version describes half
   the product. */
const FIELD = [
  {
    id: 'skener',
    icon: ScanLine,
    tBs: 'Kamera telefona kao industrijski skener',
    tEn: 'Turn any smartphone camera into a scanner',
    bs: 'Usmjerite kameru prema QR kodu ili barkodu, i kompletna kartica opreme se odmah prikazuje na ekranu za provjeru, označavanje ili ažuriranje.',
    en: 'Aim the camera at a QR code or barcode to instantly open the full asset profile for auditing, tagging, or updating.',
  },
  {
    id: 'offline',
    icon: WifiOff,
    tBs: 'Nesmetan rad bez internetske veze',
    tEn: 'True offline capability',
    bs: 'Svi skenirani podaci i izmjene bilježe se lokalno na telefonu i šalju u centralnu bazu čim se veza uspostavi. Bilo da ste u suterenu, skladištu ili na terenu bez dometa, podaci ostaju sačuvani.',
    en: 'All scans and edits write locally to the device and sync automatically once connectivity is restored. Whether in a basement, remote site, or dead zone, zero data is lost.',
  },
  {
    id: 'stampa',
    icon: Printer,
    tBs: 'Štampanje bar-kod naljepnica direktno s telefona',
    tEn: 'Direct mobile label printing',
    bs: 'Nalog šaljete na štampač putem Bluetooth veze s telefona ili s računara preko mreže. Format i dimenzije naljepnice birate u trenutku štampe, a ne mjesecima unaprijed.',
    en: 'Send print jobs over Bluetooth from mobile or across local network and USB from desktop. Select custom label dimensions on demand, not months in advance.',
  },
  {
    id: 'javni',
    icon: QrCode,
    tBs: 'Siguran javni uvid putem skeniranja',
    tEn: 'Universal QR verification',
    bs: 'Skeniranjem naljepnice otvara se osnovni profil opreme za brzu identifikaciju na terenu, bez potrebe za prijavom i bez izlaganja povjerljivih podataka.',
    en: 'Scanning an asset label surfaces an unauthenticated public summary for quick field verification, keeping internal financial records secure.',
  },
  {
    id: 'inspekcije',
    icon: ClipboardCheck,
    tBs: 'Mobilne inspekcije i popis u hodu',
    tEn: 'On-the-go asset audits',
    bs: 'Obavite redovni obilazak lokacije, skenirate svako sredstvo i zabilježite stanje na terenu, potpuno nezavisno od internetske veze.',
    en: 'Complete physical audit rounds, scan each item, and log operational condition on the spot, entirely offline.',
  },
];

const VESTA_FAQ: AccordionItem[] = [
  {
    id: 'vesta-faq-1',
    qBs: 'Imamo oko pedeset firmi u grupaciji, da li je to prevelik obim za sistem?',
    qEn: 'We operate around fifty entities in our group. Can the architecture handle that scale?',
    aBs: 'Ne, sistem je arhitektonski projektovan upravo za grupacije te veličine. Svaka firma zadržava pregled sopstvene imovine i zaduženih lica, dok uprava ima konsolidovan nadzor nad cijelom grupacijom, preračunat u željenu izvještajnu valutu.',
    aEn: 'No, the platform was specifically architected for multi-entity holdings. Each operating company manages its distinct assets and teams, while executive leadership maintains group-wide oversight consolidated into your primary reporting currency.',
  },
  {
    id: 'vesta-faq-2',
    qBs: 'Naša oprema trenutno nema nikakve oznake, šta radimo u tom slučaju?',
    qEn: 'Our equipment has no barcodes or physical tags. Where do we begin?',
    aBs: 'Tada postavljamo standardizovane oznake. Naljepnice se štampaju direktno iz sistema i postavljaju jednom, kao QR kod ili barkod prilagođen vrsti sredstva. Bez fizičke oznake nema skeniranja, a upravo mobilno skeniranje osigurava nepogrešivu tačnost registra.',
    aEn: 'We establish a unified tagging standard. Durable barcode or QR labels print directly from the platform and are applied once. Physical tagging enables mobile scanning, which is what enforces absolute registry accuracy.',
  },
  {
    id: 'vesta-faq-3',
    qBs: 'Naši terenski radnici često nemaju pouzdanu internetsku vezu.',
    qEn: 'Our field personnel work in areas without reliable internet access.',
    aBs: 'Mobilna aplikacija funkcioniše potpuno samostalno i bez mreže. Sve operacije izvršene u objektu ili na terenu bilježe se lokalno na telefonu, te se automatski sinhronizuju čim se uspostavi veza.',
    aEn: 'The mobile client functions autonomously offline. All field audits and edits are cached locally on the device and sync automatically the moment connectivity returns.',
  },
  {
    id: 'vesta-faq-4',
    qBs: 'Mi ne posjedujemo svu opremu, već je često iznajmljujemo od trećih lica i dajemo u interni zakup.',
    qEn: 'We do not just own assets, we frequently lease equipment in and out.',
    aBs: 'To je u sistemu riješeno kao zaseban poslovni tok u oba smjera. Omogućeno je vezivanje više sredstava za jedan ugovor, kao i djelimični povrat kada se vrati samo dio opreme.',
    aEn: 'Lease operations run as a dedicated dual-directional workflow. You can bind multiple assets to a single master contract and execute partial returns when only part of the equipment is returned.',
  },
  {
    id: 'vesta-faq-5',
    qBs: 'Šta se dešava sa sredstvima koja su ranije prodata ili rashodovana?',
    qEn: 'What happens to historical assets that were already sold or scrapped?',
    aBs: 'Ona ostaju trajno zabilježena u bazi podataka, jer se historijski zapisi nikada ne brišu. Tako u svakom trenutku imate argumentovan odgovor šta se dogodilo s pojedinim sredstvom, umjesto pukog uvida u trenutno aktivno stanje.',
    aEn: 'They remain permanently recorded in the database, as historical logs are immutable. You retain a complete audit trail of what happened to any asset over time, not just a snapshot of active inventory.',
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
    <div className="pt-28 sm:pt-40 pb-24 sm:pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative">
        <div className="hero-animate-1 mb-6 sm:mb-8">
          <span
            className="s9-badge inline-flex items-center gap-2 mx-auto"
            style={{ color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB}, 0.1)`, borderColor: `rgba(${ACCENT_RGB}, 0.25)` }}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="l-bs">Namjenski razvijeno za kompanije i holding strukture</span>
            <span className="l-en">Built for companies and holding structures</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">
            Cjelokupna imovina kompanije, od narudžbenice do{' '}
            <span style={{ color: ACCENT }}>otpisa.</span>
          </span>
          <span className="l-en">
            The company's full inventory, from purchase order to{' '}
            <span style={{ color: ACCENT }}>write-off.</span>
          </span>
        </h1>

        <p
          className="hero-animate-3 text-xl sm:text-2xl font-semibold max-w-3xl mx-auto mb-4 leading-snug"
          style={{ color: 'var(--ink)' }}
        >
          <span className="l-bs">„Kod koga se trenutno nalazi uređaj?"</span>
          <span className="l-en">"Who has that device right now?"</span>
        </p>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12">
          <span className="l-bs">
            To je pitanje koje se u praksi ponavlja gotovo svake sedmice i redovno troši pola radnog dana.
          </span>
          <span className="l-en">
            A question that comes up most weeks and reliably burns half a working day.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#vesta-form"
            onClick={(e) => go(e, '#vesta-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] py-3.5 px-8 transition-colors inline-flex items-center justify-center gap-2 focus-ring w-full sm:w-auto"
            style={{ backgroundColor: ACCENT }}
          >
            <span className="l-bs">Pošaljite nam upit</span>
            <span className="l-en">Send us an enquiry</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="l-bs">Zakažite strateški razgovor</span>
            <span className="l-en">Schedule an executive consultation</span>
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
              <span className="l-en">You audit physical inventory once a year, but company assets move every day.</span>
            </h2>
            <p>
              <span className="l-bs">
                Kada je imovina raspoređena na više lokacija i pravnih lica, niko nema tačan uvid u to šta kompanija posjeduje niti gdje se pojedinačna sredstva nalaze.
              </span>
              <span className="l-en">
                When assets are dispersed across fifty legal entities, management loses visibility into total group holdings and real-time locations.
              </span>
            </p>
          </div>

          <div className="section-body flex flex-col gap-4">
            {[
              {
                id: 'tabela',
                tBs: 'Tabele ne mogu pratiti stvarnu dinamiku na terenu',
                tEn: 'Static spreadsheets fail to reflect real-world asset movement',
                bs: 'Ko je zadužen za opremu, kolika joj je knjigovodstvena vrijednost, kada ističe garancija i šta je na njoj servisirano: svi ti podaci u tabelama zastarijevaju već za nekoliko sedmica.',
                en: 'Who holds the equipment, its current valuation, warranty expiration, and maintenance logs: spreadsheet records become obsolete within weeks.',
              },
              {
                id: 'kretanje',
                tBs: 'Kretanje imovine između povezanih firmi ne ostavlja trag',
                tEn: 'Intercompany transfers leave zero audit trail',
                bs: 'Interni zakup, ustupanje ili povrat: ništa od toga nije evidentirano na način da se kasnije može brzo pronaći i revidirati.',
                en: 'Internal rentals, sales, or returns: none of these transactions are captured in an accessible, auditable system.',
              },
              {
                id: 'teren',
                tBs: 'Terenskom osoblju nedostaju operativni alati',
                tEn: 'Field staff lack mobile execution tools',
                bs: 'Niko ne može skenirati sredstvo, odštampati barkod naljepnicu niti ažurirati status opreme na licu mjesta dok stoji pored nje.',
                en: 'Field teams cannot scan an asset, print a barcode label, or update equipment status while standing directly beside it.',
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
              <span className="l-bs">Koliko ste samo puta kupili opremu koju Vaša kompanija već posjeduje, samo na drugoj lokaciji ili u povezanom pravnom licu?</span>
              <span className="l-en">How often have you bought equipment the company already owns, simply because it sat untracked at another site or entity?</span>
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
              <span className="l-en">Ownership versus possession</span>
            </div>
            <h2 className="h2-wide">
              <span className="l-bs">Biti vlasnik osnovnog sredstva i držati opremu u posjedu dvije su potpuno različite stvari.</span>
              <span className="l-en">Legal asset ownership and physical possession are two fundamentally different operational states.</span>
            </h2>
            <p>
              <span className="l-bs">Jedno pravno lice može biti vlasnik sredstva, dok se sama oprema fizički nalazi u posjedu drugog. Ta ključna distinkcija predstavlja temelj cijelog sistema.</span>
              <span className="l-en">One legal entity can own an asset while another operates it on site. Architecting around that exact distinction is the core of Vesta.</span>
            </p>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'zakup',
                tBs: 'Interni zakup prenosi operativni posjed',
                tEn: 'Internal leasing transfers operational possession',
                bs: 'Oprema ostaje u bilansu vlasnika, uz jasnu i ažurnu evidenciju ko je trenutno koristi i na kojoj lokaciji.',
                en: 'The asset remains on the owning entity balance sheet, with real-time tracking of who operates it and where.',
              },
              {
                id: 'prodaja',
                tBs: 'Interna prodaja prenosi i vlasništvo i posjed',
                tEn: 'Internal sales transfer ownership and possession simultaneously',
                bs: 'Vlasništvo i fizički posjed prelaze zajedno, a poslovne knjige prethodnog pravnog lica automatski prestaju zaduživati to sredstvo.',
                en: 'Legal title and physical custody move concurrently, immediately clearing the asset from the previous company balance sheet.',
              },
              {
                id: 'povrat',
                tBs: 'Povrat vraća posjed izvornom vlasniku',
                tEn: 'Asset returns restore custody to the owner',
                bs: 'Povrat se evidentira kao novi operativni korak, umjesto brisanja prethodne historije kretanja.',
                en: 'Returns are logged as explicit transaction events rather than erasing previous custodial history.',
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
                  U pozadini se nalazi preslikana hijerarhija Vaše organizacije. <strong>Organizacija</strong> obuhvata sve što posjedujete, <strong>kompanije</strong> predstavljaju pojedinačna pravna lica, a <strong>odjeli</strong> su interni operativni timovi. Svako sredstvo uvijek ima pravno lice koje je njegov vlasnik i konkretnu osobu koja za njega materijalno odgovara.
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
              <span className="l-bs">Životni ciklus osnovnog sredstva</span>
              <span className="l-en">The complete asset lifecycle</span>
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
              <span className="l-bs">Svaka faza automatski nadograđuje historiju sredstva. Podaci se nikada ne presnimavaju i ništa se ne gubi.</span>
              <span className="l-en">Every operational stage enriches the asset history. Previous records are never overwritten, ensuring complete data integrity.</span>
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
                        <span className="l-bs">Bez namjenskog sistema</span>
                        <span className="l-en">Without dedicated software</span>
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
                        <span className="l-bs">Uz sistem Vesta</span>
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
                <span className="l-bs">Strateška razlika između sistema Atlas i Vesta</span>
                <span className="l-en">The distinction between Atlas and Vesta</span>
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
                    <span className="l-bs">Roba koja cirkuliše kroz Vaše poslovanje: trgovačke zalihe, narudžbe i komisioniranje robe koja ulazi u skladište kako bi se prodala i otpremila.</span>
                    <span className="l-en">Inventory flowing through commercial operations: stock, order fulfillment, and picking. Goods that enter the warehouse specifically to be sold and dispatched.</span>
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
                    <span className="l-bs">Sredstva koja trajno posjedujete i koristite: operativna oprema, vozni park, radni alati i interni inventar kompanije.</span>
                    <span className="l-en">Capital assets you own and utilize internally: operating equipment, vehicle fleets, tools, and long-term corporate inventory.</span>
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed m-0">
                <span className="l-bs">Kompanijama s razvijenom infrastrukturom potrebna su oba rješenja. Razlika leži u operativnoj ulozi: logistika i skladište rade u Atlasu, dok računovodstvo i uprava donose odluke kroz Vestu.</span>
                <span className="l-en">Organizations with complex operations require both systems. The distinction is operational ownership: warehouse and logistics teams operate in Atlas, while finance and executive management govern through Vesta.</span>
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
              <span className="l-bs">Mobilni rad na terenu, na svakom pametnom telefonu</span>
              <span className="l-en">Mobile execution in the field, on any smartphone</span>
            </h2>
            <p>
              <span className="l-bs">Većinu operacija s računara telefon obavlja jednako efikasno, jer se stvarni posao odvija tamo gdje se oprema nalazi, a ne za radnim stolom.</span>
              <span className="l-en">Mobile devices handle primary desktop functions with equal speed, because physical asset management happens where the equipment sits, not at an office desk.</span>
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
              <span className="l-bs">Vrednovanje imovine i izvještavanje</span>
              <span className="l-en">Asset valuation and reporting</span>
            </div>
            <h2 className="h2-wide">
              <span className="l-bs">Finansijska kontrola u izvornoj valuti nastanka troška</span>
              <span className="l-en">Multi-currency financial control pegged to transaction source</span>
            </h2>
            <p>
              <span className="l-bs">
                Svaka nabavka, naknada i procjena vrijednosti vodi se u valuti u kojoj je stvarni izdatak nastao. Kursne liste se ažuriraju svakodnevno, pa su konsolidovani iznosi tačni bez ručnog preračunavanja, dok se svaka vrijednost paralelno vodi i u primarnoj izvještajnoj valuti kompanije. Historijske vrijednosti ostaju trajno vezane za kurs na dan knjiženja umjesto naknadnog preračunavanja po današnjim kursevima.
              </span>
              <span className="l-en">
                Every procurement, internal charge, and valuation is recorded in its original transaction currency. Exchange rates sync daily for automated consolidation, while each entry is simultaneously converted into the group primary reporting currency. Historical valuations remain pegged to their original transaction dates rather than recalculating under current market rates.
              </span>
            </p>
          </div>

          <div className="section-body">
            <div className="s9-card flex flex-col gap-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                <span className="l-bs">Šest ključnih upravljačkih pitanja na koja izvještaji daju trenutan odgovor</span>
                <span className="l-en">Six critical governance questions answered in real time</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  ['Kolika je ukupna vrijednost imovine, po kompaniji ili kategoriji?', 'What is the total value of the assets, by company or by category?'],
                  ['Koji su predmeti još pod garancijom, a kojima garancija uskoro ističe?', 'What is still under warranty, and what is about to run out?'],
                  ['Ko je zadužen za koja sredstva na nivou cijele kompanije?', 'Who is responsible for what, across the whole company?'],
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
                <span className="l-bs">Iza svakog analitičkog prikaza stoji nepromjenjiv finansijski dnevnik svih kretanja kapitala.</span>
                <span className="l-en">Backing every operational dashboard is an immutable financial ledger tracking all capital movements.</span>
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
              <span className="l-bs">Sigurnost pristupa i revizorski trag</span>
              <span className="l-en">Granular permissions and audit compliance</span>
            </div>
            <h2 className="h2-wide">
              <span className="l-bs">Precizno definisana ovlaštenja i nepromjenjiv revizorski trag</span>
              <span className="l-en">Strict role-based governance with an immutable audit log</span>
            </h2>
            <p>
              <span className="l-bs">
                Sistem donosi šest predefinisanih uloga, od vlasnika organizacije do operativnog radnika koji rukuje dodijeljenom opremom, pri čemu se nivoi ovlaštenja provjeravaju zasebno za svako pravno lice, a ne samo na glavnom ulazu u sistem.
              </span>
              <span className="l-en">
                Six preconfigured enterprise roles govern access, from group ownership down to field personnel managing their assigned tools, with security permissions validated per operating entity rather than globally.
              </span>
            </p>
          </div>

          <div className="section-body">
            <div className="s9-card">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <span className="l-bs">
                  Sistem trajno bilježi svaku promjenu statusa i svaku prijavu korisnika, a generisani zapisi se nikada ne mogu prepisati niti obrisati. Kada administrator pristupi nalogu drugog korisnika radi pružanja podrške, taj korak se evidentira pod njegovim ličnim imenom. Za strogo regulisana poslovanja ovo nije tek dodatna pogodnost, već zakonski preduslov za korištenje softvera.
                </span>
                <span className="l-en">
                  Every status transition and user session is permanently cataloged, establishing an immutable log that cannot be altered or purged. When administrators impersonate user accounts for technical support, that action is logged under their own authenticated identity. For regulated enterprises, this is not an optional feature, it is the compliance baseline that allows system deployment.
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
              <span className="l-bs">Uvođenje sistema zahtijeva terenski angažman, i to otvoreno naglašavamo prije početka.</span>
              <span className="l-en">Implementation requires dedicated ground execution, and we state that candidly upfront.</span>
            </h2>
            <p>
              <span className="l-bs">
                Svako sredstvo dobija trajnu fizičku oznaku, jednom. Pravna lica, odjele, uloge i ovlaštenja konfigurišemo zajedno, dok operativni timovi prolaze obuku na terenu. To zahtijeva vrijeme, uključujući i Vaše.
              </span>
              <span className="l-en">
                Every physical asset receives a permanent identifier once. Legal entities, departments, user roles, and security policies are configured collaboratively, followed by practical field training. That demands a real investment of time, including your own.
              </span>
            </p>
            <p>
              <span className="l-bs">
                Nakon toga po prvi put dobijate stvarnu sliku cjelokupne imovine kompanije. Sistem je u punoj produkciji u verziji 1.3, potpuno lokalizovan na bosanski i engleski jezik, a naš regionalni tim provodi uvođenje u direktnoj saradnji s Vama.
              </span>
              <span className="l-en">
                The payoff is the first transparent, unified inventory of all group assets. The platform is battle-tested in production at version 1.3, fully localized in Bosnian and English, and our regional deployment team executes the rollout alongside you.
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
              <span className="l-bs">Često postavljana pitanja</span>
              <span className="l-en">Frequently asked questions</span>
            </div>
            <h2>
              <span className="l-bs">Pitanja koja vlasnici i direktori prvo postave</span>
              <span className="l-en">Questions business owners and executives ask first</span>
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
              <span className="l-bs">Naredni operativni korak</span>
              <span className="l-en">Next actionable step</span>
            </div>

            <h2 className="h2-wide">
              <span className="l-bs">Pošaljite nam pregled imovine</span>
              <span className="l-en">Share your asset overview</span>
            </h2>

            <p>
              <span className="l-bs">
                Navedite koliko pravnih lica i lokacija ima Vaša kompanija i kako danas organizujete popis. Na osnovu tih parametara pripremićemo konkretan prijedlog implementacije.
              </span>
              <span className="l-en">
                Tell us how many legal entities operate within your group and how physical audits are conducted today. We will deliver a tailored implementation roadmap and proposal.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Vesta" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
