import React from 'react';
import {
  ArrowRight,
  ShieldAlert,
  PhoneCall,
  Package,
  LineChart,
  Shirt,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Users,
  Calendar,
} from 'lucide-react';

import { Hero } from '../components/ui/hero';
import HoverStack, { type HoverStackCard } from '../components/ui/hover-stack';
import { BentoCard, BentoGrid } from '../components/ui/bento-grid';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactForm } from '../components/ContactForm';
import { Accordion, AccordionItem } from '../components/Accordion';
import { ProcessSteps, APPROACH_STEPS } from '../components/ProcessSteps';
import { ClientCard, CLIENTS } from '../components/ClientCard';
import { ClientLogos } from '../components/ClientLogos';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'faq-1',
    qBs: 'U firmi nemamo tehničkih lica. Možemo li koristiti ove sisteme?',
    qEn: 'Nobody here is technical. Is this still for us?',
    aBs: 'Da, i to je slučaj sa većinom naših klijenata. Naše sisteme svakodnevno koriste direktori kontakt centara, voditelji skladišta i vlasnici preduzeća. Tehnički dio posla vodimo mi. Vi dobijate jasne odgovore, a ne još jedan komplikovan program koji morate učiti.',
    aEn: 'Yes, because that describes most of our clients. The people using this are call centre directors, warehouse managers and owners. Setup and upkeep sit with us. You get answers, not another program somebody has to learn.',
  },
  {
    id: 'faq-2',
    qBs: 'Koliko to košta?',
    qEn: 'How much does it cost?',
    aBs: 'Nemamo fiksni cjenovnik jer trošak zavisi od obima Vaših operacija i složenosti integracije. Zato prvo analiziramo gdje gubite najviše vremena i novca, pa Vam prezentujemo tačan plan i strukturu investicije.',
    aEn: 'There is no price list, because the price depends on what you need and how much of it there is. So we ask what is holding you back first, then tell you what a solution would involve.',
  },
  {
    id: 'faq-3',
    qBs: 'Koliko brzo sistem počinje raditi u praksi?',
    qEn: 'How long until something actually works?',
    aBs: 'Zavisi od proizvoda. Pulse se povezuje na Vaše postojeće audio arhive i kreće odmah. Atlas traži uvođenje na terenu: označavanje polica, postavljanje mobilne aplikacije i kratku obuku magacionera. Kod klijenta sa 12 međunarodnih skladišta, kompletan sistem je proradio u roku od šest sedmica.',
    aEn: 'It depends on the product. Pulse runs on recordings you already have, so it starts quickly. Atlas is a roll-out: tagging shelf locations, a mobile app and training the warehouse team. With one client the whole system was running in six weeks.',
  },
];

const SYMPTOMS = [
  {
    id: 'pulse',
    nameBs: 'Kontakt centri',
    nameEn: 'Call centres',
    product: 'Pulse',
    color: '#A98CFF',
    icon: PhoneCall,
    path: '/pulse',
    symptomBs: 'Vaš tim obavi stotine razgovora dnevno. Svi se uredno snimaju, ali kontrola kvaliteta fizički presluša jedva dva posto.',
    symptomEn: 'Your team runs hundreds of calls a day. All of them are recorded. Small percentage gets heard.',
    solutionBs: 'Automatska analiza svih realizovanih poziva prema Vašim internim pravilima, uz jasne izvještaje spremne za trenutno djelovanje.',
    solutionEn: 'Automated 100% call checking against custom rules with immediate actionable insights.',
    ctaBs: 'Saznajte više',
    ctaEn: 'See Pulse',
  },
  {
    id: 'atlas',
    nameBs: 'Skladište i logistika',
    nameEn: 'Warehouse & Logistics',
    product: 'Atlas',
    color: '#FFA658',
    icon: Package,
    path: '/atlas',
    symptomBs: 'Roba se nalazi negdje u hali. Popis traje danima. Stanje u evidenciji i stanje na polici nikada se ne poklapaju.',
    symptomEn: 'The stock is somewhere in the warehouse. Counting takes days. Paper and shelf never quite match.',
    solutionBs: 'Prikaz tačne lokacije police u realnom vremenu, mobilno skeniranje barkodova i automatsko naručivanje čim zalihe padnu ispod minimuma.',
    solutionEn: 'Real-time shelf locations, barcode mobile scanning, and automatic replenishment triggers.',
    ctaBs: 'Saznajte više',
    ctaEn: 'See Atlas',
  },
  {
    id: 'sonar',
    nameBs: 'Finansije i operacije',
    nameEn: 'Operations & Metrics',
    product: 'Sonar',
    color: '#35B6F0',
    icon: LineChart,
    path: '/sonar',
    symptomBs: 'Finansijske pokazatelje analizirate tek početkom narednog mjeseca. Tek tada uočavate pad prihoda i trenutak kada je problem počeo.',
    symptomEn: 'You look at the numbers at month end. Only then do you see what slipped, and when it started.',
    solutionBs: 'Neprekidno praćenje poslovnih parametara, uz trenutno prepoznavanje anomalija prije nego što nastane trajna šteta.',
    solutionEn: 'Continuous 24/7 metric monitoring with immediate anomaly detection before damage compounds.',
    ctaBs: 'Saznajte više',
    ctaEn: 'See Sonar',
  },
  {
    id: 'mode',
    nameBs: 'Butici i maloprodaja',
    nameEn: 'Boutiques and retail',
    product: 'Mode',
    color: '#FF6170',
    icon: Shirt,
    path: '/mode',
    symptomBs: 'Kupac traži drugi broj. Prodavač telefonira drugu radnju, a kupac odlazi dok čeka provjeru.',
    symptomEn: 'A customer asks for another size. Someone rings the other shop, and the sale slips away while they wait.',
    solutionBs: 'Prikaz stanja zaliha po radnjama i veličinama na jednom ekranu, uz međuskladišnicu koja se formira automatski.',
    solutionEn: 'Stock by shop and by size on one screen, and a transfer that creates itself.',
    ctaBs: 'Saznajte više',
    ctaEn: 'See Mode',
  },
];


/* The hero's own argument. The line above them says the company should not
   run on assumptions; these are the assumptions, one per system, phrased as
   questions the reader cannot answer off the top of their head. That inability
   is the point, and it does more work than any figure of ours would.
   Each card links to the product that answers it.

   The cards are not the product colours themselves. Five saturated fills
   shouted over the headline and read as a different site. They are the page's
   own raised panel with a trace of the product's accent mixed in, and the
   accent then does its work where it carries meaning: the question text, the
   arrow and the product's name. Mono, because everything instrument-like on
   this site is mono. */
const ASSUMPTIONS: HoverStackCard[] = [
  {
    bg: 'color-mix(in oklab, var(--panel-raise) 93%, #A98CFF)',
    fg: '#A98CFF',
    border: 'rgba(169, 140, 255, 0.30)',
    href: '/pulse',
    cta: 'Pulse',
    quote: (
      <>
        <span className="l-bs">Koliko je poziva završeno mimo operativnih procedura, a da to niko u menadžmentu nije saznao?</span>
        <span className="l-en">How many calls ended outside your own procedures without anyone in management finding out?</span>
      </>
    ),
  },
  {
    bg: 'color-mix(in oklab, var(--panel-raise) 93%, #FFA658)',
    fg: '#FFA658',
    border: 'rgba(255, 166, 88, 0.30)',
    href: '/atlas',
    cta: 'Atlas',
    quote: (
      <>
        <span className="l-bs">Koliko je narudžbi otkazano jer se stanje robe na papiru razlikovalo od stvarnog stanja na polici?</span>
        <span className="l-en">How many orders were cancelled because the figure on paper did not match what was on the shelf?</span>
      </>
    ),
  },
  {
    bg: 'color-mix(in oklab, var(--panel-raise) 93%, #FF6170)',
    fg: '#FF6170',
    border: 'rgba(255, 97, 112, 0.30)',
    href: '/mode',
    cta: 'Mode',
    quote: (
      <>
        <span className="l-bs">Koliko je kupaca izašlo iz radnje jer osoblje nije znalo imate li traženi broj na stanju?</span>
        <span className="l-en">How many customers walked out because nobody knew whether their size was in stock?</span>
      </>
    ),
  },
  {
    bg: 'color-mix(in oklab, var(--panel-raise) 93%, #35B6F0)',
    fg: '#35B6F0',
    border: 'rgba(53, 182, 240, 0.30)',
    href: '/sonar',
    cta: 'Sonar',
    quote: (
      <>
        <span className="l-bs">Koliko dana prođe prije nego što primijetite pad prodaje ili prekid rada ključnog sistema?</span>
        <span className="l-en">How many days pass before you notice a drop in sales or a key system going down?</span>
      </>
    ),
  },
  {
    bg: 'color-mix(in oklab, var(--panel-raise) 93%, #4EACCD)',
    fg: '#4EACCD',
    border: 'rgba(78, 172, 205, 0.30)',
    href: '/po-mjeri',
    cta: (
      <>
        <span className="l-bs">Po mjeri</span>
        <span className="l-en">Custom built</span>
      </>
    ),
    quote: (
      <>
        <span className="l-bs">Koliko radnih sati Vaš tim gubi na manuelne poslove koje softver može preuzeti u sekundi?</span>
        <span className="l-en">How many working hours does your team lose on manual jobs software could take over in seconds?</span>
      </>
    ),
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {

  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigate(target);
  };

  const triggerMeetingModal = () => {
    window.dispatchEvent(new CustomEvent('open-meeting-modal'));
  };


  return (
    <div className="space-y-20 sm:space-y-28 pb-24 sm:pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      {/* 1. HERO. The assumptions are the hero. The line states the claim,
          the cards are the evidence for it, then the two actions. The horizon
          disc is off here: the cards carry the eye now. */}
      <Hero
        eyebrow={
          <>
            <span className="l-bs">Gradimo digitalna rješenja koja donose opipljive rezultate</span>
            <span className="l-en">We build digital systems that produce measurable results</span>
          </>
        }
        title={
          <>
            <span className="l-bs">
              Vaša kompanija ne smije poslovati na osnovu{' '}
              <span className="text-[var(--accent-signal)]">pretpostavki.</span>
            </span>
            <span className="l-en">
              Your company should not run on{' '}
              <span className="text-[var(--accent-signal)]">assumptions.</span>
            </span>
          </>
        }
        subtitle={null}
        showHorizon={false}
        titleClassName="hero-title--compact"
        feature={
          <HoverStack
            cards={ASSUMPTIONS}
            cardWidth={336}
            cardHeight={296}
            overlap={138}
            accentColor="var(--accent-signal)"
            onCardClick={(href, event) => go(event as React.MouseEvent<HTMLAnchorElement>, href)}
          />
        }
      >
        <button
          type="button"
          onClick={triggerMeetingModal}
          className="btn-primary w-full sm:w-auto focus-ring cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span className="l-bs">Zakažite razgovor</span>
          <span className="l-en">Book a Call</span>
        </button>

        <a
          href="#izazov"
          onClick={(e) => go(e, '#izazov')}
          className="btn-ghost w-full sm:w-auto focus-ring"
        >
          <span className="l-bs">Istražite rješenja</span>
          <span className="l-en">Explore Solutions</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </Hero>

      {/* CLIENT STRIP. Sits directly under the hero because it is the first
          question a visitor has after the claim: who else. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-[0.13em] text-[var(--muted)] text-center mb-6">
          <span className="l-bs">Naši sistemi svakodnevno pokreću operacije u preduzećima širom regije i Evrope</span>
          <span className="l-en">Systems we built are running at</span>
        </p>
        <ClientLogos />
      </section>

      {/* 2. WHY WE ARE WRITING THIS AT ALL (Enemy Section - Unboxed layout) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="l-bs">Naš pristup razvoju</span>
              <span className="l-en">How we build</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight max-w-2xl mx-auto leading-snug">
              <span className="l-bs">Najskuplji softver je onaj koji na kraju niko ne koristi.</span>
              <span className="l-en">The most expensive software is the kind nobody uses.</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--cyan)] font-medium leading-relaxed max-w-2xl mx-auto">
              <span className="l-bs">
                Kupite generički alat. Pošaljete ljude na sedmice obuka. Prisilite ih da mijenjaju radne navike koje su gradili godinama. Tri mjeseca kasnije, operativci se potajno vrate Excel tabelama, dok Vi svakog mjeseca nastavljate plaćati skupe licence.
              </span>
              <span className="l-en">
                You buy a generic tool. You send people on weeks of training. You make them change working habits they built over years. Three months later the floor is quietly back in Excel, and you are still paying for the licences every month.
              </span>
            </p>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">Problem nije u tome što Vaš tim ne razumije tehnologiju. Problem je u tome što niko nije prilagodio tehnologiju Vašim ljudima.</span>
              <span className="l-en">The problem is not that your team does not understand technology. It is that nobody fitted the technology to your people.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. THE INSTRUMENTS. Four products as four gauge faces, each in its
          own colour. Pulse takes the large cell because it is the entry
          product, so the grid says which one to look at first. */}
      <section id="izazov" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Prepoznajte rješenje koje vam nedostaje</span>
              <span className="l-en">What solution fits you</span>
            </div>
            <h2 className="max-w-3xl text-2xl sm:text-4xl">
              <span className="l-bs">Polazimo od vašeg problema.</span>
              <span className="l-en">Start from the problem.</span>
            </h2>
            <p className="max-w-2xl text-sm sm:text-base">
              <span className="l-bs">Odaberite ono što najviše odgovara vašem načinu rada.</span>
              <span className="l-en">Choose the department or challenge that best reflects your current operation.</span>
            </p>
          </div>

          <BentoGrid className="md:grid-cols-3 section-body">
            {SYMPTOMS.map((item, i) => (
              <BentoCard
                key={item.id}
                accent={item.color}
                Icon={item.icon}
                href={item.path}
                onNavigate={go}
                /* Two rows, each a wide cell beside a narrow one, alternating
                   which side is wide. Nothing is tall enough to run out of
                   content, which a 2x2 feature cell did. */
                className={i === 0 || i === 3 ? 'md:col-span-2' : 'md:col-span-1'}
                label={`Shape9 ${item.product}`}
                name={
                  <>
                    <span className="l-bs">{item.nameBs}</span>
                    <span className="l-en">{item.nameEn}</span>
                  </>
                }
                description={
                  <>
                    <span className="l-bs">{item.symptomBs}</span>
                    <span className="l-en">{item.symptomEn}</span>
                  </>
                }
                cta={
                  <>
                    <span className="l-bs">{item.ctaBs}</span>
                    <span className="l-en">{item.ctaEn}</span>
                  </>
                }
              />
            ))}
          </BentoGrid>
        </ScrollReveal>
      </section>

      {/* 4. CUSTOM SOLUTION (Unboxed Section, styled like "Where you recognise yourself") */}
      <section id="pomjeri" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="l-bs">Rješenje po mjeri</span>
              <span className="l-en">Custom Solution</span>
            </div>

            <h2 className="leading-tight">
              <span className="l-bs">Imate specifične operativne procese? Gradimo namjenska rješenja po Vašoj mjeri.</span>
              <span className="l-en">Do your operations work in a way no ready made tool follows? We build for that.</span>
            </h2>

            <p className="leading-relaxed">
              <span className="l-bs">
                Kada gotovi alati sa tržišta ne mogu pratiti Vaš način rada, razvijamo softver direktno sa Vama: web i mobilne aplikacije, AI sisteme, namjenska ERP i CRM rješenja i naprednu analitiku.
              </span>
              <span className="l-en">
                When tools off the shelf cannot follow how you work, we build software with you: web and mobile apps, AI systems, purpose built ERP and CRM, and analytics.
              </span>
            </p>
          </div>

          <div className="section-body">
            {/* Quick Service Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { bs: 'Web i mobilne aplikacije', en: 'Web and mobile apps' },
                { bs: 'AI i automatizacija', en: 'AI and automation' },
                { bs: 'Namjenski ERP / CRM', en: 'Purpose built ERP / CRM' },
                { bs: 'Cloud infrastruktura', en: 'Cloud Infrastructure' },
                { bs: 'Poslovna analitika', en: 'Data Analytics' },
              ].map((pill, idx) => (
                <span key={idx} className="pill-cyan text-xs">
                  <span className="l-bs">{pill.bs}</span>
                  <span className="l-en">{pill.en}</span>
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-6 w-full sm:w-auto">
              <a
                href="/po-mjeri"
                onClick={(e) => go(e, '/po-mjeri')}
                className="btn-primary w-full sm:w-auto py-3 px-8 text-sm font-semibold focus-ring"
              >
                <span className="l-bs">Istražite razvoj po mjeri</span>
                <span className="l-en">Explore Custom Development</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <button
                type="button"
                onClick={triggerMeetingModal}
                className="btn-ghost w-full sm:w-auto py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[var(--cyan)]" />
                <span className="l-bs">Zakažite razgovor</span>
                <span className="l-en">Book a Call</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. SELECTED PROJECTS (4 Key Projects) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(53,198,227,0.08)] border border-[rgba(53,198,227,0.2)] text-[#35C6E3] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="l-bs">Odabrani projekti</span>
              <span className="l-en">Selected Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Sistemi koji već svakodnevno pokreću poslovanje</span>
              <span className="l-en">Systems that already run operations every day</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Pregled odabranih rješenja, sistema koje smo razvili i uspješno pustili u rad.</span>
              <span className="l-en">A selection of platforms we engineered that are active in production.</span>
            </p>
          </div>

          <div className="section-body grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <ClientCard client={CLIENTS.empress} />
            <ClientCard client={CLIENTS.bhlog} />

            {/* 1. Monad Lead (Sonar) */}
            <div className="s9-card-nested p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-[#35B6F0] bg-[rgba(53,182,240,0.1)] border border-[rgba(53,182,240,0.25)]">
                    <span className="l-bs">Shape9 Sonar · AI analitika</span>
                    <span className="l-en">Shape9 Sonar · AI analytics</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] mb-2">
                  Monad Lead: AI analitičar za affiliate platformu
                </h3>
                <p className="text-sm text-[var(--body)] leading-relaxed mb-4">
                  <span className="l-bs">AI agent koji kontinuirano nadzire metrike, automatski pronalazi anomalije i šalje notifikacije.</span>
                  <span className="l-en">An AI agent that continuously monitors metrics and opens tickets on its own.</span>
                </p>
              </div>
              <a
                href="/radovi/monad-lead"
                onClick={(e) => go(e, '/radovi/monad-lead')}
                className="text-xs font-semibold text-[#35B6F0] hover:underline inline-flex items-center gap-1.5 pt-3 border-t border-[var(--line)]"
              >
                <span className="l-bs">Pogledajte studiju slučaja</span>
                <span className="l-en">Read case study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 2. Regionalni WMS (Atlas) */}
            <div className="s9-card-nested p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-[#FFA658] bg-[rgba(255,166,88,0.1)] border border-[rgba(255,166,88,0.25)]">
                    <span className="l-bs">Shape9 Atlas · Skladišna logistika</span>
                    <span className="l-en">Shape9 Atlas · Warehouse</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] mb-2">
                  <span className="l-bs">Regionalni WMS u 12 država: 12 lokacija</span>
                  <span className="l-en">A warehouse system across twelve locations</span>
                </h3>
                <p className="text-sm text-[var(--body)] leading-relaxed mb-4">
                  <span className="l-bs">Centralizacija 12 skladišta i preko 10.000 artikala. Tačnost zaliha podignuta sa 81% na 99,4% u samo šest sedmica.</span>
                  <span className="l-en">Inventory accuracy raised from 81 to 99.4 percent in six weeks.</span>
                </p>
              </div>
              <a
                href="/radovi/wms"
                onClick={(e) => go(e, '/radovi/wms')}
                className="text-xs font-semibold text-[#FFA658] hover:underline inline-flex items-center gap-1.5 pt-3 border-t border-[var(--line)]"
              >
                <span className="l-bs">Pogledajte studiju slučaja</span>
                <span className="l-en">Read case study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3. The Body Edit */}
            <div className="s9-card-nested p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-[var(--ink)] bg-[rgba(255,255,255,0.06)] border border-[var(--line)]">
                    <span className="l-bs">Rješenje po mjeri</span>
                    <span className="l-en">Custom Solution</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] mb-2">
                  The Body Edit: Platforma za pilates studio
                </h3>
                <p className="text-sm text-[var(--body)] leading-relaxed mb-4">
                  <span className="l-bs">Platforma: web sajt, korisnički portal, administrativni panel i aplikacija za instruktore.</span>
                  <span className="l-en">A comprehensive platform: website, client portal, and instructor app.</span>
                </p>
              </div>
              <a
                href="https://thebodyedit.ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[var(--cyan)] hover:underline inline-flex items-center gap-1.5 pt-3 border-t border-[var(--line)]"
              >
                <span>thebodyedit.ba</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 4. Residence Montis */}
            <div className="s9-card-nested p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-[var(--ink)] bg-[rgba(255,255,255,0.06)] border border-[var(--line)]">
                    <span className="l-bs">Web prezentacija</span>
                    <span className="l-en">Web presentation</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] mb-2">
                  Residence Montis: Prezentacija apartmana
                </h3>
                <p className="text-sm text-[var(--body)] leading-relaxed mb-4">
                  <span className="l-bs">Moderna platforma za prezentacije luksuznih apartmana s integrisanim online rezervacijama.</span>
                  <span className="l-en">A modern presentation platform for luxury apartments with online bookings.</span>
                </p>
              </div>
              <a
                href="https://www.residencemontis.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[var(--cyan)] hover:underline inline-flex items-center gap-1.5 pt-3 border-t border-[var(--line)]"
              >
                <span>residencemontis.com</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="section-body">
            <a
              href="/radovi"
              onClick={(e) => go(e, '/radovi')}
              className="btn-ghost inline-flex items-center gap-2 text-sm font-semibold text-[#35C6E3] hover:text-[var(--ink)] focus-ring py-2.5 px-6 rounded-full"
            >
              <span>
                <span className="l-bs">Pogledajte cijeli portfolio</span>
                <span className="l-en">See all the work</span>
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. HOW WE WORK */}
      <section id="kako" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <span className="l-bs">Naš pristup</span>
              <span className="l-en">How we work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Mi se prilagođavamo Vama, a ne obrnuto.</span>
              <span className="l-en">We fit to you, not the other way round.</span>
            </h2>
          </div>

          <ProcessSteps steps={APPROACH_STEPS} className="section-body" />
        </ScrollReveal>
      </section>

      {/* 7. FAQ */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Česta pitanja</span>
              <span className="l-en">FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
              <span className="l-bs">Česta pitanja</span>
              <span className="l-en">What you are probably wondering</span>
            </h2>
          </div>

          <Accordion items={FAQ_ITEMS} className="section-body" />
        </ScrollReveal>
      </section>

      {/* 8. ABOUT US (#onama) - Unboxed Editorial Layout */}
      <section id="onama" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Users className="w-3.5 h-3.5" />
              <span className="l-bs">O nama</span>
              <span className="l-en">About Us</span>
            </div>

            <h2 className="h2-wide text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-6 leading-snug">
              <span className="l-bs">
                Mi smo tim posvećenih inženjera, dizajnera i profesionalaca usmjerenih na rješavanje operativnih problema, snažnim digitalnim rješenjima koja pokreću rast poslovanja.
              </span>
              <span className="l-en">
                We're a team of passionate developers, designers, and strategists dedicated to solving operational problems with powerful digital solutions that drive business growth.
              </span>
            </h2>
          </div>

          <div className="section-body space-y-5 text-sm sm:text-base text-[var(--body)] leading-relaxed">
            <p>
              <span className="l-bs">
                Radimo od 2015. Počeli smo kao inženjerski tim, a danas gradimo vlastite proizvode i sisteme po mjeri. Najveći koji smo pustili u rad pokriva dvanaest skladišta u dvanaest država.
              </span>
              <span className="l-en">
                We have been working since 2015. We started as an engineering team, and today we build both our own products and systems made to order. The largest one we have put live covers twelve warehouses across twelve countries.
              </span>
            </p>
            <p>
              <span className="l-bs">
                Tokom godina radili smo sa startupima, malim i srednjim preduzećima, te međunarodnim organizacijama u različitim industrijama: od logistike i finansija do e-trgovine i zdravstva.
              </span>
              <span className="l-en">
                Over the years we have worked with startups, SMBs, and international enterprises across diverse industries: from logistics and finance to e-commerce and healthcare.
              </span>
            </p>
            <p>
              <span className="l-bs">
                Naš pristup je jednostavan: temeljno razumjeti problem, osmisliti elegantna rješenja i provesti ih precizno. Vjerujemo u izgradnju dugoročnih partnerstava, a ne samo u isporuku koda.
              </span>
              <span className="l-en">
                Our approach is simple: understand the problem deeply, design elegant solutions, and execute with precision. We believe in building long-term partnerships, not just delivering code.
              </span>
            </p>
          </div>

          {/* STATS TILES */}
          <div className="section-body grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--line)] text-center flex flex-col items-center justify-center h-full">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--cyan)] font-mono leading-tight">10+</div>
              <div className="text-xs text-[var(--muted)] mt-1.5 font-medium leading-snug">
                <span className="l-bs">Godina iskustva</span>
                <span className="l-en">Years Experience</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--line)] text-center flex flex-col items-center justify-center h-full">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--cyan)] font-mono leading-tight">200+</div>
              <div className="text-xs text-[var(--muted)] mt-1.5 font-medium leading-snug">
                <span className="l-bs">Isporučenih projekata</span>
                <span className="l-en">Projects Delivered</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--line)] text-center flex flex-col items-center justify-center h-full">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--cyan)] font-mono leading-tight">15+</div>
              <div className="text-xs text-[var(--muted)] mt-1.5 font-medium leading-snug">
                <span className="l-bs">Zemalja poslovanja</span>
                <span className="l-en">Countries Served</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--line)] text-center flex flex-col items-center justify-center h-full">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--cyan)] font-mono leading-tight">98%</div>
              <div className="text-xs text-[var(--muted)] mt-1.5 font-medium leading-snug">
                <span className="l-bs">Zadovoljstvo klijenata</span>
                <span className="l-en">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. CONTACT FORM (#kontakt) */}
      <section id="kontakt" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(var(--cyan-rgb),0.2)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Kontaktirajte nas</span>
              <span className="l-en">Get in Touch</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Recite nam na čemu radite</span>
              <span className="l-en">Tell us what you are working on</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl mx-auto">
              <span className="l-bs">
                Bilo da imate projekat na umu ili samo želite razgovarati o mogućnostima, rado ćemo vas saslušati.
              </span>
              <span className="l-en">
                Whether you have a project in mind or just want to chat, we'd love to hear from you.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
