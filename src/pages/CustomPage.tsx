import React from 'react';
import {
  Globe,
  Smartphone,
  Sparkles,
  Building2,
  Cloud,
  BarChart3,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Layers,
  Cpu,
  MessageSquare,
  Award,
} from 'lucide-react';

import { ScrollReveal } from '../components/ScrollReveal';
import { ClientCard, CLIENTS } from '../components/ClientCard';
import { ContactForm } from '../components/ContactForm';

interface CustomPageProps {
  onNavigate?: (path: string) => void;
}

const CUSTOM_SERVICES = [
  {
    id: 'web',
    icon: Globe,
    titleBs: 'Web platforme i aplikacije',
    titleEn: 'Web Applications & Portals',
    descBs: 'Namjenske web platforme i portali visokih performansi, projektovani za maksimalnu brzinu, sigurnost i nesmetano skaliranje poslovanja.',
    descEn: 'Custom web platforms and enterprise portals engineered for high performance, robust security, and seamless operational scaling.',
    techs: ['React', 'Laravel', 'Vue.js', 'Node.js'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    titleBs: 'Mobilne aplikacije',
    titleEn: 'Mobile Applications',
    descBs: 'Rješenja za iOS i Android koja Vašem terenskom timu i klijentima osiguravaju brz, pouzdan i intuitivan rad.',
    descEn: 'Native and cross-platform iOS and Android applications designed for intuitive field execution and client engagement.',
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    id: 'ai',
    icon: Sparkles,
    titleBs: 'Primijenjeni AI i inteligentni sistemi',
    titleEn: 'Applied AI & Intelligent Automation',
    descBs: 'Automatizacija operativnih odluka, napredna obrada dokumenata i prediktivni modeli integrisani direktno u Vaše svakodnevne radne tokove.',
    descEn: 'Decision automation, document intelligence, and predictive models integrated directly into your core business workflows.',
    techs: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
  },
  {
    id: 'erp-crm',
    icon: Building2,
    titleBs: 'Namjenski ERP i CRM sistemi',
    titleEn: 'Custom ERP & CRM Systems',
    descBs: 'Poslovni softver izgrađen tačno po Vašoj mjeri, koji povezuje prodajne tokove, operacije i resurse bez nametanja tuđih šablona.',
    descEn: 'Bespoke enterprise platforms that unify sales pipelines, operations, and resource planning around how your business actually runs.',
    techs: ['Dynamics 365', 'SQL', 'AWS', 'Azure'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    titleBs: 'Cloud arhitektura i infrastruktura',
    titleEn: 'Cloud Infrastructure & DevOps',
    descBs: 'Skalabilna cloud arhitektura, sigurne migracije i automatizovano upravljanje sistemima uz garantovanu dostupnost od 99,9% i optimizovane troškove.',
    descEn: 'Resilient cloud architecture, automated data migrations, and DevOps engineering delivering 99.9% uptime and optimized operational costs.',
    techs: ['AWS', 'GCP', 'Azure', 'Kubernetes'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    titleBs: 'Poslovna analitika i BI izvještavanje',
    titleEn: 'Business Intelligence & Analytics',
    descBs: 'Povezujemo podatke rasute po različitim sistemima u jedinstven pregled, kako biste strateške odluke donosili na bazi činjenica, a ne pretpostavki.',
    descEn: 'Consolidate fragmented data across disconnected systems into a unified executive view, enabling decisions driven by verified numbers rather than guesswork.',
    techs: ['Python', 'BigQuery', 'Tableau', 'Power BI'],
  },
];

const ENGINEERING_STEPS = [
  {
    step: '01',
    titleBs: 'Dubinska analiza i definisanje opsega',
    titleEn: 'Technical Discovery & Scoping',
    descBs: 'Zajedno mapiramo Vaše stvarne poslovne procese, izolujemo uska grla i precizno definišemo tehničke zahtjeve prije početka razvoja.',
    descEn: 'We map your exact operational workflows, isolate critical bottlenecks, and establish rigorous technical specifications before engineering begins.',
  },
  {
    step: '02',
    titleBs: 'Arhitektura sistema i interaktivni prototip',
    titleEn: 'System Architecture & Clickable Prototype',
    descBs: 'Projektujemo skalabilnu bazu podataka i čist korisnički interfejs, omogućavajući Vam da testirate klikabilan model prije nego što napišemo prvu liniju koda.',
    descEn: 'We architect a robust data layer and intuitive UI, allowing you to validate a functional interactive prototype before backend development starts.',
  },
  {
    step: '03',
    titleBs: 'Agilni razvoj i dvosedmični sprintovi',
    titleEn: 'Agile Sprints & Continuous Testing',
    descBs: 'Razvijamo u dvosedmičnim ciklusima uz redovne demonstracije funkcionalnosti, tako da u svakom trenutku vidite opipljiv napredak i usmjeravate dalji rad.',
    descEn: 'We build in two-week sprint cycles with live feature demonstrations, ensuring full transparency, early validation, and agile iteration.',
  },
  {
    step: '04',
    titleBs: 'Uvođenje u produkciju i dugoročni SLA nadzor',
    titleEn: 'Production Deployment & SLA Support',
    descBs: 'Provodimo sigurnu migraciju podataka, obučavamo Vaš tim za rad i preuzimamo kontinuirano održavanje, sigurnosni nadzor i skaliranje sistema.',
    descEn: 'We execute seamless data migration, train your teams, and guarantee ongoing system health, proactive monitoring, and enterprise SLA coverage.',
  },
];

export const CustomPage: React.FC<CustomPageProps> = ({ onNavigate }) => {
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
    <div className="space-y-20 sm:space-y-28 pt-28 sm:pt-40 pb-24 sm:pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      {/* 1. HERO SECTION */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span className="s9-badge text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.1)] border border-[rgba(var(--cyan-rgb),0.25)] inline-flex items-center gap-2 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="l-bs">Namjenski softver i inženjering</span>
            <span className="l-en">Custom Software Engineering</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">Razvoj softvera koji se prilagođava Vašem poslovanju, a ne tuđim šablonima.</span>
          <span className="l-en">Enterprise software built around how your business actually operates, not rigid industry templates.</span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl leading-relaxed">
          <span className="l-bs">
            Kada gotovi alati sa tržišta postanu kočnica Vašeg rasta, gradimo namjenske platforme po mjeri: od arhitekture i dizajna do stabilne produkcije i dugoročnog održavanja.
          </span>
          <span className="l-en">
            When off-the-shelf tools constrain your growth, we engineer bespoke platforms from the ground up: from architecture and UI to stable production and ongoing upkeep.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#custom-form"
            onClick={(e) => go(e, '#custom-form')}
            className="btn-primary w-full sm:w-auto py-3.5 px-8 text-sm font-semibold focus-ring"
          >
            <span className="l-bs">Predstavite Vaš projekat</span>
            <span className="l-en">Discuss your project</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-[var(--cyan)]" />
            <span className="l-bs">Zakažite konsultacije</span>
            <span className="l-en">Schedule a consultation</span>
          </button>
        </div>
      </section>

      {/* 2. TRUSTED BY BUSINESSES WORLDWIDE (Track Record) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Award className="w-3.5 h-3.5" />
              <span className="l-bs">Provjereni rezultati</span>
              <span className="l-en">Proven track record</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Sistemi koje smo izgradili svakodnevno pokreću operacije klijenata</span>
              <span className="l-en">The systems we engineered power daily enterprise operations</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Naš uspjeh se mjeri operativnom efikasnošću klijenata: evo šta smo postigli u dosadašnjim partnerstvima.</span>
              <span className="l-en">Our impact is measured by client efficiency: here is what we have delivered together.</span>
            </p>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Tile 1 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">150+</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Realizovanih projekata</span>
                <span className="l-en">Projects delivered</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Uspješno isporučena digitalna rješenja</span>
                <span className="l-en">Scaled digital platforms</span>
              </div>
            </div>

            {/* Tile 2 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">12+</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Marketi na kojima radimo</span>
                <span className="l-en">Markets served</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Međunarodna baza klijenata</span>
                <span className="l-en">Regional and international presence</span>
              </div>
            </div>

            {/* Tile 3 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">98%</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Zadovoljstvo klijenata</span>
                <span className="l-en">Client retention & satisfaction</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Dugoročna strateška partnerstva</span>
                <span className="l-en">Long-term enterprise partnerships</span>
              </div>
            </div>

            {/* Tile 4 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">10+</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Godina inženjerskog iskustva</span>
                <span className="l-en">Years of engineering experience</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Dokazana industrijska ekspertiza</span>
                <span className="l-en">Deep domain expertise</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. THE 6 CORE SERVICES GRID */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Layers className="w-3.5 h-3.5" />
              <span className="l-bs">Inženjerske kompetencije</span>
              <span className="l-en">Core capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Cjelovita softverska rješenja po mjeri</span>
              <span className="l-en">Full-cycle software development</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Projektujemo brze, skalabilne i stabilne sisteme koji se u potpunosti uklapaju u Vaše operativne tokove.</span>
              <span className="l-en">We build fast, resilient, and scalable systems architected around your unique operational model.</span>
            </p>
          </div>

          <div className="section-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CUSTOM_SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="s9-card p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[rgba(var(--cyan-rgb),0.4)] transition-all rounded-3xl"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[rgba(var(--cyan-rgb),0.1)] text-[var(--cyan)] flex items-center justify-center mb-5 border border-[rgba(var(--cyan-rgb),0.2)] group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-[var(--ink)] mb-3">
                      <span className="l-bs">{srv.titleBs}</span>
                      <span className="l-en">{srv.titleEn}</span>
                    </h3>

                    <p className="text-sm text-[var(--body)] leading-relaxed mb-6">
                      <span className="l-bs">{srv.descBs}</span>
                      <span className="l-en">{srv.descEn}</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--line)]">
                    <div className="flex flex-wrap gap-1.5">
                      {srv.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.06)] border border-[rgba(var(--cyan-rgb),0.18)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. HOW WE WORK / ENGINEERING PROCESS */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Cpu className="w-3.5 h-3.5" />
              <span className="l-bs">Metodologija isporuke</span>
              <span className="l-en">Delivery methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Od prvog razgovora do stabilnog rada u produkciji</span>
              <span className="l-en">From initial scoping to high-availability production</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {ENGINEERING_STEPS.map((step) => (
              <div key={step.step} className="s9-card-nested p-6 sm:p-7 rounded-2xl sm:rounded-3xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[rgba(var(--cyan-rgb),0.1)] text-[var(--cyan)] font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-[rgba(var(--cyan-rgb),0.2)]">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">
                    <span className="l-bs">{step.titleBs}</span>
                    <span className="l-en">{step.titleEn}</span>
                  </h3>
                  <p className="text-sm text-[var(--body)] leading-relaxed">
                    <span className="l-bs">{step.descBs}</span>
                    <span className="l-en">{step.descEn}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CLIENT REFERENCE */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider">
              <span className="l-bs">Iskustvo s terena</span>
              <span className="l-en">Field perspective</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-tight">
              <span className="l-bs">Softver građen oko Vašeg načina rada, a ne obrnuto.</span>
              <span className="l-en">Software engineered around how you work, never the reverse.</span>
            </h2>
          </div>
          <div className="section-body max-w-2xl">
            <ClientCard client={CLIENTS.bhlog} />
          </div>
        </ScrollReveal>
      </section>

      {/* 5. WHY BUSINESSES PARTNER WITH SHAPE9 (Spaced out header) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] mb-8 sm:mb-12 text-center leading-tight">
                <span className="l-bs">Zašto vodeće kompanije biraju Shape9 za namjenski razvoj</span>
                <span className="l-en">Why enterprises partner with Shape9 for custom engineering</span>
              </h2>

              <ul className="space-y-5 max-w-2xl mx-auto">
                {[
                  {
                    bs: 'Prilagođavanje Vašim stvarnim procesima umjesto prisilne promjene navika i radnih tokova tima',
                    en: 'Tailored directly to your actual processes instead of forcing your team into foreign workflows',
                  },
                  {
                    bs: 'Bez skupih mjesečnih licenci po korisniku koje nekontrolisano rastu kako širite poslovanje',
                    en: 'Zero per-seat licensing penalties that artificially inflate as your headcount expands',
                  },
                  {
                    bs: 'Besprijekorna integracija s Vašim postojećim bazama podataka, ERP sistemima i hardverom',
                    en: 'Direct, secure integration with existing ERP databases, legacy tools, and operational hardware',
                  },
                  {
                    bs: 'Direktna saradnja s inženjerskim timom uz ugovorno garantovane SLA rokove i pouzdanu podršku',
                    en: 'Direct collaboration with the core engineering team backed by binding enterprise SLA agreements',
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-[var(--body)]">
                    <CheckCircle2 className="w-5 h-5 text-[var(--cyan)] shrink-0 mt-0.5" />
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

      {/* 6. CONTACT FORM (#custom-form) */}
      <section id="custom-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.12)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 border border-[rgba(var(--cyan-rgb),0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Pokrenimo saradnju</span>
              <span className="l-en">Initiate your project</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Opišite nam Vaše tehničke i poslovne zahtjeve</span>
              <span className="l-en">Outline your operational scope and technical requirements</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">
                Opišite operativni problem ili viziju rješenja, a naš tim će Vam odgovoriti u roku od jednog radnog dana s prvom procjenom izvodivosti i prijedlogom arhitekture.
              </span>
              <span className="l-en">
                Describe your operational bottleneck or project vision. We will follow up within one business day with a preliminary technical assessment and architectural roadmap.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Po mjeri" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
