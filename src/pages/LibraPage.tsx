import React from 'react';
import {
  ArrowRight,
  FileStack,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Clock,
  Calendar,
} from 'lucide-react';

import { VideoHero } from '@/components/ui/scroll-locked-video-hero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ProductTabs } from '../components/ProductTabs';
import { ContactForm } from '../components/ContactForm';
import { Accordion, AccordionItem } from '../components/Accordion';

interface LibraPageProps {
  onNavigate?: (path: string) => void;
}

const LIBRA_FAQ: AccordionItem[] = [
  {
    id: 'libra-faq-1',
    qBs: 'Moraju li klijenti mijenjati način na koji nam dostavljaju dokumentaciju?',
    qEn: 'Does the client have to change how they send us documents?',
    aBs: 'Ne, klijenti nastavljaju slati dokumente onako kako su navikli: emailom, skenom, slikom sa telefona ili putem postojećih kanala. Libra automatski obrađuje i prepoznaje pristigle formate.',
    aEn: 'No. Let them send it the way they always have, by email or as a photo from a phone. Libra reads what arrives, as it arrives.',
  },
  {
    id: 'libra-faq-2',
    qBs: 'Šta se dešava ako sistem naiđe na nestandardan ili nečitak račun?',
    qEn: 'What if it gets one wrong?',
    aBs: 'Dokumenti sa niskim nivoom prepoznavanja se označavaju za brzi pregled. U svakom trenutku možete jednim klikom pregledati, korigovati ili premjestiti dokument: ništa nije zaključano niti nepovratno.',
    aEn: 'You can open any document and move it, exactly as you do today. Nothing is locked.',
  },
  {
    id: 'libra-faq-3',
    qBs: 'Gdje se pohranjuju naši i klijentski dokumenti?',
    qEn: 'Where do our documents sit?',
    aBs: 'Dokumentacija se čuva uz primjenu bankarskog nivoa enkripcije (u mirovanju i u prenosu) na cloud infrastrukturi s definisanim rokom čuvanja. Prije implementacije potpisujemo ugovor o povjerljivosti i usklađenosti s propisima o zaštiti podataka.',
    aEn: 'Documents are stored encrypted, at rest and in transit, and the retention period is set by the client. Before signing we give you, in writing, an exact description of the processing, where the data sits and who can reach it.',
  },
  {
    id: 'libra-faq-4',
    qBs: 'Koliko traje podešavanje i puštanje u rad?',
    qEn: 'How long until this is working?',
    aBs: 'Zavisi od broja vaših klijenata i strukture foldera koju koristite. Početno testiranje na uzorku vaše dokumentacije pripremamo u roku od nekoliko dana, kako biste se lično uvjerili u tačnost klasifikacije.',
    aEn: 'It depends on how many clients you have and how many kinds of document move through your office. So we run part of your post through it first, and you see how it sorted before anything is agreed.',
  },
];

const STEPS = [
  {
    num: '01',
    id: 'step1',
    titleBs: 'Automatski prijem',
    titleEn: 'It arrives however it arrives',
    descBs: 'Dokumenti stižu na vaš postojeći email ili u portal. Za svakog klijenta sistem zna šta je za taj mjesec već stiglo, a šta još fali.',
    descEn: 'To your existing inbox, or as a photo from a phone. The client changes nothing about how they work.',
  },
  {
    num: '02',
    id: 'step2',
    titleBs: 'Libra pročita i prepozna',
    titleEn: 'Libra reads it and recognises it',
    descBs: 'Libra analizira sadržaj: identifikuje izdavača, period, vrstu troška i automatski pridružuje dokument tačnom klijentu.',
    descEn: 'What the document is, which period it covers and which client it belongs to. Bank statements are recognised the same way as a receipt photographed in a shop.',
  },
  {
    num: '03',
    id: 'step3',
    titleBs: 'Uredno arhiviranje',
    titleEn: 'It lands where it belongs',
    descBs: 'Fajl dobije uredno ime i sjedne u folder klijenta, po vašoj strukturi. Klijent vidi dokle je stiglo i dobije obavijest kad se nešto pomjeri. Obje strane imaju potvrdu, svaka izmjena ostaje zapisana, a broj klijenata i kolega koje uvedete nije ograničen.',
    descEn: 'Into that client\'s folder, in your structure, not ours. You open the folder and do your job.',
  },
];

export const LibraPage: React.FC<LibraPageProps> = ({ onNavigate }) => {

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
        srcLandscape="/video/libra-land.mp4"
        srcPortrait="/video/libra-port.mp4"
        posterLandscape="/video/libra-land.webp"
        posterPortrait="/video/libra-port.webp"
        accent="#3DD68C"
        accentRgb="61, 214, 140"
        eyebrow={<>
          <span className="l-bs">Shape9 Libra</span>
          <span className="l-en">Shape9 Libra</span>
        </>}
      />

      {/* HERO SECTION. Now the first block after the video, so it carries
          the top padding the page wrapper used to provide. */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative pt-16 sm:pt-24">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span className="s9-badge text-[#3DD68C] bg-[rgba(61,214,140,0.1)] border border-[rgba(61,214,140,0.25)] inline-flex items-center gap-2 mx-auto">
            <FileStack className="w-3.5 h-3.5" />
            <span className="l-bs">Računovodstveni biroi i finansijske službe</span>
            <span className="l-en">Accounting firms and finance teams</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">
            Dokumentacija pristiže cijeli dan. Zašto je vaš tim ručno <span className="text-[#3DD68C]">razvrstava?</span>
          </span>
          <span className="l-en">
            Documents arrive all day. Someone has to <span className="text-[#3DD68C]">sort</span> every single one.
          </span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl">
          <span className="l-bs">
            Bilo da stižu emailom, skenom, bankarskim izvodom ili slikom sa telefona, <span className="text-[#3DD68C] font-mono">Libra</span> prepozna tip dokumenta, prepozna čiji je i spusti ga u pravi folder. Klijent ubaci sam, s telefona ili računara, i vidi dokle je stiglo.
          </span>
          <span className="l-en">
            By email, as a photo from a phone, from the bank, in an envelope. <span className="text-[#3DD68C] font-mono">Libra</span> reads what arrived, recognises whose it is and files it in the right folder. You open the client's folder and it is already there.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 w-full sm:w-auto">
          <a
            href="#libra-form"
            onClick={(e) => go(e, '#libra-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#3DD68C] hover:bg-[#5be09f] py-3.5 px-8 transition-colors inline-flex items-center justify-center gap-2 focus-ring w-full sm:w-auto"
          >
            <span className="l-bs">Automatizujte obradu dokumentacije</span>
            <span className="l-en">Tell us how your paperwork arrives</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-[#3DD68C]" />
            <span className="l-bs">Zakažite razgovor</span>
            <span className="l-en">Book a Call</span>
          </button>
        </div>

        <span className="micro-copy text-xs text-[var(--muted)] mb-4">
          <span className="l-bs">Bez dugih prezentacija, testirajte na uzorku vaših dokumenata.</span>
          <span className="l-en">No slide deck. We run part of your post through it and you judge the result.</span>
        </span>
      </section>

      {/* SECTION: THE PROBLEM */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(61,214,140,0.08)] border border-[rgba(61,214,140,0.2)] text-[#3DD68C] text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span className="l-bs">Gubitak produktivnosti</span>
              <span className="l-en">Where the time goes</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Najskuplji radni sat u računovodstvu je onaj potrošen na preimenovanje i sortiranje fajlova.</span>
              <span className="l-en">The most expensive hour in accounting is the one spent sorting.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">
                Klijenti šalju račune bez reda i standarda. Vaši stručnjaci svakodnevno otvaraju priloge, preimenuju fajlove, kreiraju foldere i ručno ih razvrstavaju. Kada to pomnožite sa desetinama klijenata, dobijate sate izgubljene na administrativnu rutinu umjesto na stručni finansijski rad.
              </span>
              <span className="l-en">
                Clients send whatever, however. Someone opens the mail, works out what it is, renames the file, finds the right folder and drops it in. Times a hundred clients, times every day of the month. That is not accounting, it is copying.
              </span>
            </p>

            <p className="text-sm sm:text-base font-semibold text-[#3DD68C]">
              <span className="l-bs">Vrijednost vašeg tima je u analizi i savjetovanju, a ne u ručnoj administraciji.</span>
              <span className="l-en">The work was never in understanding the document. The work was in finding it.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION: HOW IT WORKS, THREE STEPS (Interactive on Mobile & Desktop) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(61,214,140,0.08)] border border-[rgba(61,214,140,0.2)] text-[#3DD68C] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Kako radi</span>
              <span className="l-en">How it works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Od dolazne pošte do urednog foldera, bez vašeg angažmana.</span>
              <span className="l-en">From inbox to the right folder, with none of your work in between.</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Automatski proces klasifikacije i arhiviranja u 3 jednostavna koraka.</span>
              <span className="l-en">Automated processing and sorting in 3 effortless steps.</span>
            </p>
          </div>

          {/* NARROW SCREEN: tabs. See ProductTabs for why the wide
              screen grid below is deliberately left as a grid. */}
          <div className="section-body block md:hidden mb-6">
            <ProductTabs items={STEPS} accent="#3DD68C" accentRgb="61, 214, 140" />
          </div>

{/* DESKTOP 3-COLUMN GRID */}
          <div className="section-body hidden md:grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {STEPS.map((step) => (
              <div key={step.id} className="s9-card-nested relative group text-center flex flex-col items-center h-full">
                <div className="w-11 h-11 rounded-2xl bg-[rgba(61,214,140,0.1)] text-[#3DD68C] font-mono font-bold text-base flex items-center justify-center mb-4 border border-[rgba(61,214,140,0.2)] shrink-0">
                  {step.num}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-3">
                  <span className="l-bs">{step.titleBs}</span>
                  <span className="l-en">{step.titleEn}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--body)] leading-relaxed">
                  <span className="l-bs">{step.descBs}</span>
                  <span className="l-en">{step.descEn}</span>
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION: WHAT YOU GET */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-8 text-center leading-tight">
                <span className="l-bs">Rezultati koje osjetite već u prvom mjesecu</span>
                <span className="l-en">What changes in the first month.</span>
              </h2>

              <ul className="space-y-4 max-w-2xl mx-auto">
                <li className="flex items-start gap-3 text-sm sm:text-base text-[var(--body)]">
                  <CheckCircle2 className="w-5 h-5 text-[#3DD68C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[var(--ink)]">
                      <span className="l-bs">Nema više ručnog otvaranja svakog emaila.</span>
                      <span className="l-en">Post is not opened in order to be sorted.</span>
                    </span>{' '}
                    <span>
                      <span className="l-bs">Dokumenti vas čekaju spremni i razvrstani u mapi klijenta.</span>
                      <span className="l-en">It is opened when you need something.</span>
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 text-sm sm:text-base text-[var(--body)]">
                  <CheckCircle2 className="w-5 h-5 text-[#3DD68C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[var(--ink)]">
                      <span className="l-bs">Pojednostavljen prijem za klijente.</span>
                      <span className="l-en">Clients do not have to come in.</span>
                    </span>{' '}
                    <span>
                      <span className="l-bs">Dovoljno je da fotografišu račun i pošalju ga u hodu.</span>
                      <span className="l-en">They photograph it and send it, and that is the whole obligation.</span>
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 text-sm sm:text-base text-[var(--body)]">
                  <CheckCircle2 className="w-5 h-5 text-[#3DD68C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[var(--ink)]">
                      <span className="l-bs">Standardizovana struktura arhiva.</span>
                      <span className="l-en">The folders look the same every month.</span>
                    </span>{' '}
                    <span>
                      <span className="l-bs">Imenovanje i organizacija fajlova su uniformni, bez obzira ko je u timu zadužen za unos.</span>
                      <span className="l-en">It does not depend on who opened the inbox that day.</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* LIBRA FAQ */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(61,214,140,0.1)] border border-[rgba(61,214,140,0.25)] text-[#3DD68C] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Česta pitanja</span>
              <span className="l-en">FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
              <span className="l-bs">Odgovori na ključna pitanja</span>
              <span className="l-en">What you are probably wondering</span>
            </h2>
          </div>

          <Accordion items={LIBRA_FAQ} className="section-body" />
        </ScrollReveal>
      </section>

      {/* CONTACT CTA (#libra-form) */}
      <section id="libra-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(61,214,140,0.12)] text-[#3DD68C] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(61,214,140,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Testirajte Libru</span>
              <span className="l-en">Test Libra</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Ubrzajte obradu vaše dokumentacije</span>
              <span className="l-en">Tell us how your paperwork arrives.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">
                Navedite broj klijenata i kanale kojima dokumentacija stiže. Pripremićemo konkretan prijedlog automatizacije i procjenu uštede radnih sati.
              </span>
              <span className="l-en">
                Write how many clients you have and how many different ways documents reach you. We come back with a concrete proposal and an honest read on whether it pays off.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Libra" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
