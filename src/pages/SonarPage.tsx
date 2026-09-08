import React from 'react';
import {
  ArrowRight,
  LineChart,
  Activity,
  Bell,
  Compass,
  Shield,
  Layers,
  Sliders,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Calendar,
} from 'lucide-react';

import { VideoHero } from '@/components/ui/scroll-locked-video-hero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ProductTabs } from '../components/ProductTabs';
import { ContactForm } from '../components/ContactForm';
import { Accordion, AccordionItem } from '../components/Accordion';

interface SonarPageProps {
  onNavigate?: (path: string) => void;
}

const SONAR_FAQ: AccordionItem[] = [
  {
    id: 'sonar-faq-1',
    qBs: 'Već koristimo PowerBI / Metabase. Koja je dodatna vrijednost Sonara?',
    qEn: 'We have PowerBI/Metabase. Why would we need Sonar?',
    aBs: 'Izvještaj čeka da ga neko otvori. Sonar ne čeka: sam odredi šta danas gleda i vraća se na to kroz dan, pa javi čim nešto odstupi. Ne zamjenjuje vaše izvještaje, nego vam kaže gdje da pogledate prije nego što ih otvorite.',
    aEn: 'Dashboards ask somebody to open them and look. Sonar works the other way round: it watches your data minute by minute on its own and speaks up only when something unusual happens. It does not replace your reports; it tells you when you need to look at them.',
  },
  {
    id: 'sonar-faq-2',
    qBs: 'Kako izbjegavate preopterećenje lažnim uzbunama (alert fatigue)?',
    qEn: 'What if it spams us with false alarms?',
    aBs: 'Sonar ne koristi fiksne, statičke pragove (npr. "javi ako padne ispod 100"). Sistem primjenjuje dinamičko mašinsko učenje koje razumije sezonalnost, razliku između radnih dana i vikenda, te uobičajene fluktuacije po satima, čime eliminiše lažne alarme.',
    aEn: 'That is the main trap we avoid. Sonar does not use static thresholds (e.g. "alert if it drops below 100"). It learns what is normal for every hour and day of the week. If Tuesday morning naturally differs from Friday night, it knows that and stays quiet.',
  },
  {
    id: 'sonar-faq-3',
    qBs: 'Kako se Sonar povezuje s našim bazama podataka?',
    qEn: 'How does it connect to our data?',
    aBs: 'Direktno putem read-only pristupa bazama (PostgreSQL, MySQL, SQL Server), REST API-ja ili standardnih analitičkih konektora. Kompletnu konfiguraciju i definisanje ključnih metrika radimo u saradnji s vama.',
    aEn: 'Via your database, APIs or existing connectors. We handle the connection and configuration. From you we need only access and an explanation of which metrics matter most to you.',
  },
];

const TRACK_AREAS = [
  {
    id: 'sales',
    titleBs: 'Prodajni tokovi i konverzije',
    titleEn: 'Sales and volume',
    descBs: 'Nagli padovi ili neuobičajeni skokovi u broju narudžbi, checkout koracima i naplati.',
    descEn: 'Sudden drops or unusual spikes in orders, payments and visits.',
  },
  {
    id: 'revenue',
    titleBs: 'Prihod po klijentima i kanalima',
    titleEn: 'Revenue by client or channel',
    descBs: 'Rana detekcija kada ključni klijent tiho smanji obim ili određeni kanal distribucije podbaci.',
    descEn: 'When a key client quietly cuts spend or a channel stops delivering.',
  },
  {
    id: 'performance',
    titleBs: 'Performanse i dostupnost servisa',
    titleEn: 'System response speeds',
    descBs: 'Usporavanja u aplikaciji, API greške ili zastoji baze prije nego što korisnici počnu odustajati.',
    descEn: 'App or site slowdowns before customers start abandoning transactions.',
  },
  {
    id: 'anomalies',
    titleBs: 'Statistička odstupanja od normale',
    titleEn: 'Unusual anomalies',
    descBs: 'Sve što odstupa od uobičajenog poslovnog obrasca za dati dan u sedmici ili sat u danu.',
    descEn: 'Anything departing from how your business normally looks at that hour.',
  },
];

const CAPABILITIES = [
  {
    icon: Activity,
    titleBs: 'Sam odlučuje šta gleda',
    titleEn: 'It decides what to look at',
    descBs: 'Ujutro sam odredi šta danas treba provjeriti, pa se kroz dan vraća na to u vlastitim razmacima. Uporedi kako danas ide u odnosu na jučer, javi ako neko šalje sumnjiv saobraćaj. Ne čeka da ga pitate.',
    descEn: 'Every morning it works out what to check that day, then comes back to it through the day on its own schedule. You do not have to ask.',
  },
  {
    icon: Bell,
    titleBs: 'Trenutna notifikacija',
    titleEn: 'Instant alerts',
    descBs: 'Upozorenje stiže na email, Telegram, Slack ili Teams iste sekunde kada se uoči devijacija.',
    descEn: 'A message arrives on email, Teams or Slack the moment an anomaly appears.',
  },
  {
    icon: Compass,
    titleBs: 'Analiza korijenskog uzroka',
    titleEn: 'Uncovering the root cause',
    descBs: 'Uz alarm dobijate kontekst i podatke o tome koji je tačno segment pokrenuo odstupanje.',
    descEn: 'Along with the alert, you get details on what exactly triggered the change.',
  },
  {
    icon: Shield,
    titleBs: 'Pametna eliminacija šuma',
    titleEn: 'Smart alarms',
    descBs: 'Model uči dinamičke oscilacije vikendom i praznicima, sprečavajući lažne alarme.',
    descEn: 'The system learns weekend vs weekday baselines, preventing false alarms.',
  },
  {
    icon: Layers,
    titleBs: 'Konsolidacija svih izvora',
    titleEn: 'All sources in one place',
    descBs: 'Objedinjuje podatke iz baza, Google Analyticsa, platnih procesora i ERP-a u jednu cjelinu.',
    descEn: 'Combines database, sales and web data into a unified business view.',
  },
  {
    icon: Sliders,
    titleBs: 'Prilagođeni pragovi osjetljivosti',
    titleEn: 'Rules set your way',
    descBs: 'Stepen osjetljivosti i kanali obavještavanja se fino podešavaju prema važnosti svake metrike.',
    descEn: 'Sensitivity thresholds adjust according to how critical each metric is.',
  },
];

export const SonarPage: React.FC<SonarPageProps> = ({ onNavigate }) => {

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
        srcLandscape="/video/sonar-land.mp4"
        srcPortrait="/video/sonar-port.mp4"
        posterLandscape="/video/sonar-land.webp"
        posterPortrait="/video/sonar-port.webp"
        accent="#35B6F0"
        accentRgb="53, 182, 240"
        eyebrow={<>
          <span className="l-bs">Shape9 Sonar</span>
          <span className="l-en">Shape9 Sonar</span>
        </>}
      />

      {/* HERO SECTION. Now the first block after the video, so it carries
          the top padding the page wrapper used to provide. */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative pt-16 sm:pt-24">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span className="s9-badge text-[#35B6F0] bg-[rgba(53,182,240,0.1)] border border-[rgba(53,182,240,0.25)] inline-flex items-center gap-2 mx-auto">
            <LineChart className="w-3.5 h-3.5" />
            <span className="l-bs">Shape9 Sonar · Proaktivni nadzor poslovnih metrika</span>
            <span className="l-en">Shape9 Sonar · metric monitoring</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">Rano upozorenje, dok je problem još rješiv.</span>
          <span className="l-en">Early warning, while the problem is still small.</span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl">
          <span className="l-bs">
            <span className="text-[#35B6F0] font-mono">Sonar</span> kontinuirano nadzire vaše ključne podatke u pozadini i šalje precizno upozorenje u trenutku nastanka anomalije, prije nego što postane gubitak na mjesečnom bilansu.
          </span>
          <span className="l-en">
            <span className="text-[#35B6F0] font-mono">Sonar</span> tracks your numbers in the background and alerts you the moment something changes. Before it turns into a deficit at month end.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14 w-full sm:w-auto">
          <a
            href="#sonar-form"
            onClick={(e) => go(e, '#sonar-form')}
            className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#35B6F0] hover:bg-[#53c3f3] py-3.5 px-8 transition-colors focus-ring w-full sm:w-auto"
          >
            <span className="l-bs">Povežimo vaše ključne metrike</span>
            <span className="l-en">Show us which numbers worry you</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-[#35B6F0]" />
            <span className="l-bs">Zakažite razgovor</span>
            <span className="l-en">Book a Call</span>
          </button>
        </div>

        {/* REAL PROOF STRIP */}
        <div className="s9-card border-[rgba(53,182,240,0.18)] bg-[var(--panel)]/60 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(53,182,240,0.1)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider mb-4 mx-auto">
            <span className="l-bs">Iz stvarnog rada</span>
            <span className="l-en">From real operations</span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold text-[var(--ink)] mb-6 leading-snug">
            <span className="l-bs">Primjeri detekcije anomalija koje bi prošle neopaženo na standardnim izvještajima:</span>
            <span className="l-en">Volume growing 1-2% a day for 25 days, slipping under every threshold.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl font-bold text-[#35B6F0] font-mono">25 dana</div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">tihog rasta troškova uhvaćeno u ranoj fazi</span>
                <span className="l-en">of growth that went unnoticed</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 sm:border-x border-[var(--line)]">
              <div className="text-3xl sm:text-4xl font-bold text-[#35B6F0] font-mono">15 min</div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">do detekcije pada uspješnosti transakcija</span>
                <span className="l-en">to catch a silent drop in traffic</span>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl font-bold text-[#35B6F0] font-mono">
                <span className="l-bs">68% → 41%</span>
                <span className="l-en">68% → 41%</span>
              </div>
              <div className="text-xs uppercase font-semibold text-[var(--muted)] mt-2">
                <span className="l-bs">jutarnji pad konverzije riješen prije podneva</span>
                <span className="l-en">morning acceptance rate drop caught instantly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(53,182,240,0.08)] border border-[rgba(53,182,240,0.2)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Problem</span>
              <span className="l-en">The problem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Mjesečni izvještaji govore šta se već desilo. Vama trebaju uvidi u realnom vremenu.</span>
              <span className="l-en">Month-end reports tell you what already happened. You need what is happening now.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl mx-auto">
              <span className="l-bs">
                Većina operativnih problema ne nastaje preko noći. Negativni trendovi počinju danima ranije: konverzija tiho opada, vrijeme odziva servera raste, ili broj odustajanja u prodajnom lijevku lagano curi. Bez automatizovanog nadzora, tihi gubici ostaju neprimijećeni sve do završnog obračuna.
              </span>
              <span className="l-en">
                Most business problems do not happen all at once. The numbers start looking odd days earlier: traffic quietly drops, service response slows, or sales drop-offs creep up. Where nobody is looking every hour, it passes unnoticed until damage is done.
              </span>
            </p>

            <p className="text-sm sm:text-base font-semibold text-[#35B6F0] max-w-xl mx-auto">
              <span className="l-bs"><span className="font-mono">Sonar</span> neprekidno analizira sve vaše podatke i reaguje u realnom vremenu.</span>
              <span className="l-en"><span className="font-mono">Sonar</span> watches all your numbers continuously, on your behalf.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

{/* WHAT IT TRACKS (Interactive on Mobile & Desktop) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(53,182,240,0.08)] border border-[rgba(53,182,240,0.2)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Nadzor</span>
              <span className="l-en">What it watches</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Šta Sonar može nadzirati</span>
              <span className="l-en">What Sonar can watch</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Metrike i tokovi koji najviše utiču na vaše poslovne rezultate.</span>
              <span className="l-en">The core performance metrics that drive your operational revenue.</span>
            </p>
          </div>

          {/* NARROW SCREEN: tabs. See ProductTabs for why the wide
              screen grid below is deliberately left as a grid. */}
          <div className="section-body block md:hidden mb-6">
            <ProductTabs items={TRACK_AREAS} accent="#35B6F0" accentRgb="53, 182, 240" />
          </div>

{/* DESKTOP 2x2 GRID */}
          <div className="section-body hidden md:grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {TRACK_AREAS.map((item) => (
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
            <div className="s9-badge bg-[rgba(53,182,240,0.08)] border border-[rgba(53,182,240,0.2)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Mogućnosti</span>
              <span className="l-en">What it does</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Autonomni sistem koji bdije nad vašim brojkama.</span>
              <span className="l-en">A system that watches the numbers instead of your team.</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {CAPABILITIES.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <div key={idx} className="s9-card">
                  <IconComp className="w-6 h-6 text-[#35B6F0] mb-4" />
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

      {/* AUDIT PILOT */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card border-[rgba(53,182,240,0.28)] bg-[rgba(53,182,240,0.035)] text-center">
              <div className="s9-badge bg-[rgba(53,182,240,0.12)] border border-[rgba(53,182,240,0.3)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="l-bs">Besplatna historijska revizija</span>
                <span className="l-en">First step</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-4 leading-tight">
                <span className="l-bs">Testirajte Sonar na vašim historijskim podacima.</span>
                <span className="l-en">A check on your data, with no obligation.</span>
              </h2>

              <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                <span className="l-bs">
                  Povežemo Sonar na uzorak vaših podataka iz prethodna tri mjeseca. Pokazaćemo vam koje je anomalije i tihe padove detektovao i koliko bi vam dana ranije omogućio reakciju. Bez ikakvih finansijskih obaveza.
                </span>
                <span className="l-en">
                  We hook Sonar to your historical data for the last three months. We show you what anomalies it found and how early it would have alerted you if it was running then. If it finds nothing useful, you owe nothing.
                </span>
              </p>

              <a
                href="#sonar-form"
                onClick={(e) => go(e, '#sonar-form')}
                className="btn-pill font-semibold text-sm text-[#0A0E15] bg-[#35B6F0] hover:bg-[#53c3f3] py-3.5 px-8 transition-colors inline-flex items-center gap-2 focus-ring"
              >
                <span className="l-bs">Zatražite historijsku analizu</span>
                <span className="l-en">Request a data check</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SONAR FAQ */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(53,182,240,0.1)] border border-[rgba(53,182,240,0.25)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="l-bs">Pitanja o Sonaru</span>
              <span className="l-en">Questions about Sonar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
              <span className="l-bs">Često postavljana pitanja</span>
              <span className="l-en">Details you care about</span>
            </h2>
          </div>

          <Accordion items={SONAR_FAQ} className="section-body" />
        </ScrollReveal>
      </section>

      {/* FORM SECTION (#sonar-form) */}
      <section id="sonar-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(53,182,240,0.12)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(53,182,240,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Testirajte Sonar</span>
              <span className="l-en">Test Sonar</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Započnimo razgovor o vašim metrikama</span>
              <span className="l-en">Tell us what numbers you want watched.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">Navedite baze i ključne parametre koje želite nadzirati. Pripremićemo konkretan prijedlog konfiguracije.</span>
              <span className="l-en">Which numbers you wish you had caught earlier, and where they sit.</span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Sonar" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
