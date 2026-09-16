import React from 'react';
import {
  ArrowRight,
  PhoneCall,
  Mic,
  Cpu,
  FileText,
  Zap,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Calendar,
} from 'lucide-react';

import { VideoHero } from '@/components/ui/scroll-locked-video-hero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ProductTabs } from '../components/ProductTabs';
import { ContactForm } from '../components/ContactForm';
import { Accordion, AccordionItem } from '../components/Accordion';

interface PulsePageProps {
  onNavigate?: (path: string) => void;
}

const PULSE_FAQ: AccordionItem[] = [
  {
    id: 'pulse-faq-1',
    qBs: 'Nemamo tehničko osoblje unutar tima. Ko upravlja sistemom?',
    qEn: 'We have no technical person. Who keeps this running?',
    aBs: 'Mi vodimo kompletnu podršku. Snimci se automatski preuzimaju od vašeg telefonskog operatera ili VoIP centrale.',
    aEn: 'We do. Recordings arrive automatically from your telephony provider.',
  },
  {
    id: 'pulse-faq-2',
    qBs: 'Naši razgovori sadrže povjerljive podatke. Kako štitite privatnost?',
    qEn: 'Our calls are sensitive. What happens to the recordings?',
    aBs: 'Svi audio zapisi se obrađuju uz enkripciju u mirovanju i u prenosu (AES-256 / TLS), te se trajno brišu prema politici retencije koju sami definišete. Prije početka saradnje dostavljamo detaljan ugovor o obradi podataka (DPA) i bezbjednosnu dokumentaciju.',
    aEn: 'Recordings are processed encrypted, at rest and in transit, and deleted on the retention schedule the client defines. The working layer is transcripts and analysis. Before signing we give you a written description of the processing, where the data sits and who can reach it.',
  },
  {
    id: 'pulse-faq-3',
    qBs: 'Da li model precizno prepoznaje lokalne jezike i dijalekte?',
    qEn: 'Does it actually work in our language?',
    aBs: 'Da, model je posebno optimizovan za bosanski, hrvatski i srpski jezik, uključujući lokalne fraze i šumove karakteristične za telefonske linije. Ne tražimo povjerenje na slijepo: na pilot uzorku od 50 vaših poziva sami procjenjujete tačnost transkripcije.',
    aEn: 'It works in Bosnian, Croatian and Serbian. But we do not ask you to take our word for it. We run your own recordings first, and you judge how well it heard them and how accurate the analysis is. Real call centre audio is nothing like studio audio, and we know it.',
  },
  {
    id: 'pulse-faq-4',
    qBs: 'Možemo li prilagoditi pravila ocjenjivanja našim standardima?',
    qEn: 'Can we set the rules it scores against ourselves?',
    aBs: 'Apsolutno, to je ključna prednost Pulse platforme. Vi definišete kontrolne tačke: standardni pozdrav, identifikaciju klijenta, zakonski obavezne napomene, unakrsnu prodaju ili način rješavanja prigovora. Pulse ocjenjuje prema vašim internim pravilima.',
    aEn: 'Yes, and that is the point. You define what gets checked: the greeting, mandatory legal disclosures, the upsell, how a complaint is handled. Pulse checks against your rules, not somebody else\'s standard ones.',
  },
];

const USE_CASES = [
  {
    id: 'qa',
    titleBs: 'Kontrola kvaliteta rada agenata',
    titleEn: 'Quality control in the call centre',
    descBs: 'Objektivno ocjenjivanje svakog agenta prema istim standardima, bez ručnog preslušavanja.',
    descEn: 'Every agent scored against the same rules, without anyone sitting and listening.',
  },
  {
    id: 'sales',
    titleBs: 'Optimizacija prodajnih razgovora',
    titleEn: 'Sales conversations',
    descBs: 'Identifikacija razloga odustajanja kupaca, najčešćih prigovora i uspješnih prodajnih obrazaca.',
    descEn: 'Where customers drop off, what they object to, and which question keeps coming back.',
  },
  {
    id: 'compliance',
    titleBs: 'Provjera zakonskih i regulatornih napomena',
    titleEn: 'Mandatory disclosures',
    descBs: 'Automatska verifikacija da su sve obavezne pravne izjave i saglasnosti izrečene u razgovoru.',
    descEn: 'Checking that what has to be said out loud was actually said.',
  },
  {
    id: 'early_warning',
    titleBs: 'Rano prepoznavanje nezadovoljstva',
    titleEn: 'Early warning',
    descBs: 'Frustracija koja se čuje u tonu prije nego stigne pisana žalba. Isto i kad razgovor krene naopako: klijent spustio u prvoj minuti, a agent nastavio pričati još dvije.',
    descEn: 'Frustration you can hear in the tone before a written complaint arrives.',
  },
];

const CAPABILITIES = [
  {
    icon: Mic,
    titleBs: 'Transkripcija govora u tekst',
    titleEn: 'Speech into text',
    descBs: 'Precizno prepoznavanje lokalnog govora s razdvajanjem govornika i mogućnošću pretrage.',
    descEn: 'The conversation becomes text, with each speaker separated, so it can be searched.',
  },
  {
    icon: Cpu,
    titleBs: 'Vaša prilagođena pravila',
    titleEn: 'Your rules',
    descBs: 'Vi odredite šta se provjerava, Pulse to primijeni na svaki poziv jednako: je li na početku najavio da se razgovor snima, je li objasnio cijenu, uslove i rok, i šta se desilo kad je klijent tražio da ga više ne zovete.',
    descEn: 'You decide what gets checked and Pulse applies it to every call the same way: whether the agent said what has to be said, whether the price and terms were explained, and what happened when a customer asked not to be called again.',
  },
  {
    icon: FileText,
    titleBs: 'Izvještaj s onim što odstupa',
    titleEn: 'A report of what does not match',
    descBs: 'Za svaki poziv dobijete sažetak dogovorenog, a odvojeno i popis onoga što odstupa od vaših pravila. Radite po popisu, ne po snimcima.',
    descEn: 'For every call you get a summary of what was agreed, and separately a list of everything that departs from your rules. You work from the list, not from recordings.',
  },
  {
    icon: Zap,
    titleBs: 'Direktna integracija s centralom',
    titleEn: 'Recordings arrive on their own',
    descBs: 'Snimci se automatski preuzimaju direktno s vaše telefonije, bez ručnog eksporta.',
    descEn: 'Recordings come straight from your telephony provider. Nobody moves files by hand.',
  },
  {
    icon: BarChart3,
    titleBs: 'Analitika i trendovi tima',
    titleEn: 'The view across the team',
    descBs: 'Performanse agenata, učestalost tema i kretanje korisničkog zadovoljstva kroz vrijeme.',
    descEn: 'Agent scores, the most common customer questions and movement over time, in one place.',
  },
  {
    icon: ShieldCheck,
    titleBs: 'Sigurnost i usklađenost',
    titleEn: 'Data protection',
    descBs: 'Napredna enkripcija podataka i automatizovano brisanje u skladu s GDPR propisima.',
    descEn: 'Encryption at rest and in transit, and deletion on the schedule you set.',
  },
];

export const PulsePage: React.FC<PulsePageProps> = ({ onNavigate }) => {

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
        srcLandscape="/video/pulse-land.mp4"
        srcPortrait="/video/pulse-port.mp4"
        posterLandscape="/video/pulse-land.webp"
        posterPortrait="/video/pulse-port.webp"
        accent="#A98CFF"
        accentRgb="169, 140, 255"
        eyebrow={<>
          <span className="l-bs">Shape9 Pulse</span>
          <span className="l-en">Shape9 Pulse</span>
        </>}
      />

      {/* HERO SECTION. Now the first block after the video, so it carries
          the top padding the page wrapper used to provide. */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative pt-16 sm:pt-24">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span className="s9-badge text-[#A98CFF] bg-[rgba(169,140,255,0.1)] border border-[rgba(169,140,255,0.25)] inline-flex items-center gap-2 mx-auto">
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="l-bs">Shape9 Pulse · Analiza poziva</span>
            <span className="l-en">Shape9 Pulse · call analysis</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">Snimate svaki razgovor. Ko ih zaista preslušava?</span>
          <span className="l-en">You record every call. Who listens to them?</span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl">
          <span className="l-bs">
            <span className="text-[#A98CFF] font-mono">Pulse</span> automatski provjerava svaki snimljeni poziv prema parametrima koje sami postavite i vraća precizan analitički izvještaj. Nema novih programa za operatere i nema potrebe za internim inženjerima.
          </span>
          <span className="l-en">
            <span className="text-[#A98CFF] font-mono">Pulse</span> checks every recorded call against the rules you set and returns a precise report. No new program for your agents, and no engineer needed on your side.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14 w-full sm:w-auto">
          <a
            href="#pulse-form"
            onClick={(e) => go(e, '#pulse-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#A98CFF] hover:bg-[#b89eff] py-3.5 px-8 transition-colors focus-ring w-full sm:w-auto"
          >
            <span className="l-bs">Pošaljite 50 poziva na besplatnu analizu</span>
            <span className="l-en">Send 50 calls for a free check</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-[#A98CFF]" />
            <span className="l-bs">Zakažite razgovor</span>
            <span className="l-en">Book a Call</span>
          </button>
        </div>

        {/* HONEST STATS STRIP */}
        <div className="s9-card border-[rgba(169,140,255,0.18)] bg-[var(--panel)]/60 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl font-bold text-[#A98CFF] font-mono">1-2%</div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">poziva koje ručni QA uspije preslušati</span>
                <span className="l-en">of calls an average QA team reviews</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 sm:border-x border-[var(--line)]">
              <div className="text-3xl sm:text-4xl font-bold text-[#A98CFF] font-mono">100%</div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">poziva koje <span className="text-[#A98CFF]">Pulse</span> provjeri</span>
                <span className="l-en">of calls <span className="text-[#A98CFF]">Pulse</span> checks</span>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl font-bold text-[#A98CFF] font-mono">0</div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">novih programa koje agenti moraju učiti</span>
                <span className="l-en">new programs for your team</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-[var(--muted)] italic text-center">
            <span className="l-bs">Podatak od jedan do dva posto je industrijski prosjek za ručnu kontrolu kvaliteta, ne naša procjena.</span>
            <span className="l-en">The 1 to 2 percent figure is the industry average for manual quality control, not our own estimate.</span>
          </p>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(169,140,255,0.08)] border border-[rgba(169,140,255,0.2)] text-[#A98CFF] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Problem</span>
              <span className="l-en">The problem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Vaš tim obavi stotine razgovora svakog dana. Šta je u njima zaista dogovoreno?</span>
              <span className="l-en">Your agents handle hundreds of calls daily. How many commitments, compliance breaches, or churn risks slip through unheard?</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl mx-auto">
              <span className="l-bs">
                Interna kontrola kvaliteta uspijeva obraditi jedva jedan do dva posto. Ostatak ostaje zaključan u arhivi koju niko ne otvara: ponovljene reklamacije kupaca, pitanja na koja agenti nemaju odgovor, kupci koji odustaju i propuštene prodajne prilike.
              </span>
              <span className="l-en">
                Quality control gets through one to two percent of conversations. The rest sits in an archive nobody opens: repeated complaints, questions agents cannot answer, customers who walk away, and openings that passed unnoticed.
              </span>
            </p>

            <p className="text-sm sm:text-base font-semibold text-[#A98CFF] max-w-xl mx-auto">
              <span className="l-bs">Umjesto nasumičnog uzorka, <span className="text-[#A98CFF] font-mono">Pulse</span> Vam daje potpunu sliku svakog razgovora.</span>
              <span className="l-en">Instead of a sample, <span className="text-[#A98CFF] font-mono">Pulse</span> gives you the picture of every call.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

{/* USE CASES (Interactive on Mobile & Desktop) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(169,140,255,0.08)] border border-[rgba(169,140,255,0.2)] text-[#A98CFF] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Primjena</span>
              <span className="l-en">Where it is used</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Primjena u svakodnevnom poslovanju</span>
              <span className="l-en">What clients use it for most</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Kako vodeći timovi koriste automatsku analizu u praksi.</span>
              <span className="l-en">How operations teams leverage automated analysis daily.</span>
            </p>
          </div>

          {/* NARROW SCREEN: tabs. See ProductTabs for why the wide
              screen grid below is deliberately left as a grid. */}
          <div className="section-body block md:hidden mb-6">
            <ProductTabs items={USE_CASES} accent="#A98CFF" accentRgb="169, 140, 255" />
          </div>

{/* DESKTOP 2x2 GRID */}
          <div className="section-body hidden md:grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {USE_CASES.map((item) => (
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

      {/* CAPABILITIES */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(169,140,255,0.08)] border border-[rgba(169,140,255,0.2)] text-[#A98CFF] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Mogućnosti</span>
              <span className="l-en">What it does</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Od audio snimka do jasnog izvještaja, potpuno automatizovano.</span>
              <span className="l-en">From recording to report, with none of your work in between.</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {CAPABILITIES.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <div key={idx} className="s9-card">
                  <IconComp className="w-6 h-6 text-[#A98CFF] mb-4" />
                  <h3 className="text-base font-bold text-[var(--ink)] mb-2.5">
                    <span className="l-bs">{cap.titleBs}</span>
                    <span className="l-en">{cap.titleEn}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--body)] leading-relaxed">
                    <span className="l-bs">{cap.descBs}</span>
                    <span className="l-en">{cap.descEn}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-8 text-center leading-tight">
                <span className="l-bs">Šta tačno dobijate implementacijom</span>
                <span className="l-en">What you actually get</span>
              </h2>

              <ul className="space-y-4 max-w-2xl mx-auto">
                {[
                  { bs: 'Verifikacija pravila razgovora na 100% poziva, a ne na malom uzorku', en: 'Call rules checked on every call, not on a sample' },
                  { bs: 'Jasna lista pitanja na koja agenti nemaju pripremljene odgovore', en: 'A list of questions agents have no ready answer for' },
                  { bs: 'Uvid u tačne uzroke eskalacija i nezadovoljstva korisnika', en: 'The reasons conversations escalate' },
                  { bs: 'Ujednačeno i objektivno ocjenjivanje svih članova tima', en: 'Agent scores against the same rules for everyone' },
                  { bs: 'Uočavanje negativnih trendova prije nego što postanu sistemski problem', en: 'Trends visible before they become a problem' },
                  { bs: 'Strukturirani sažetak svakog poziva bez potrebe za preslušavanjem', en: 'A summary of every call, without listening to it' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[var(--body)]">
                    <CheckCircle2 className="w-5 h-5 text-[#A98CFF] shrink-0 mt-0.5" />
                    <div>
                      <span className="l-bs">{item.bs}</span>
                      <span className="l-en">{item.en}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FREE ANALYSIS PILOT */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card border-[rgba(169,140,255,0.28)] bg-[rgba(169,140,255,0.035)] text-center">
              <div className="s9-badge bg-[rgba(169,140,255,0.12)] border border-[rgba(169,140,255,0.3)] text-[#A98CFF] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="l-bs">Prvi korak</span>
                <span className="l-en">First step</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-3 leading-tight">
                <span className="l-bs">Uvjerite se na vlastitim pozivima.</span>
                <span className="l-en">We are not asking you to trust us. We are asking for 50 calls.</span>
              </h2>

              <div className="text-lg sm:text-xl font-bold text-[#A98CFF] mb-6 sm:mb-8">
                <span className="l-bs">Prvih 50 poziva analiziramo potpuno besplatno.</span>
                <span className="l-en">We analyse your first 50 calls free.</span>
              </div>

              <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                <span className="l-bs">
                  Dostavite nam 50 audio snimaka i navedite pravila i šta želite provjeriti.
                </span>
                <span className="l-en">
                  Send 50 recordings and tell us what you want to know.
                </span>
              </p>

              <a
                href="#pulse-form"
                onClick={(e) => go(e, '#pulse-form')}
                className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#A98CFF] hover:bg-[#b89eff] py-3.5 px-8 transition-colors inline-flex items-center gap-2 focus-ring"
              >
                <span className="l-bs">Zatražite analizu 50 poziva</span>
                <span className="l-en">Request the free analysis</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* PULSE FAQ */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(169,140,255,0.1)] border border-[rgba(169,140,255,0.25)] text-[#A98CFF] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Pitanja o Pulse</span>
              <span className="l-en">Questions about Pulse</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
              <span className="l-bs">Često postavljana pitanja</span>
              <span className="l-en">Details you care about</span>
            </h2>
          </div>

          <Accordion items={PULSE_FAQ} className="section-body" />
        </ScrollReveal>
      </section>

      {/* FORM SECTION (#pulse-form) */}
      <section id="pulse-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(169,140,255,0.12)] text-[#A98CFF] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(169,140,255,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Testirajte Pulse</span>
              <span className="l-en">Test Pulse</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Razgovarajmo o vašem kontakt centru</span>
              <span className="l-en">Tell us what your calls look like.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">Navedite broj agenata, prosječan dnevni volumen poziva i ključne izazove u kontroli kvaliteta.</span>
              <span className="l-en">How many agents, how many calls a day, and what you wish you knew but do not.</span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Pulse" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
