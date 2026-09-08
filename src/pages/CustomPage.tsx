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
    titleBs: 'Web aplikacije',
    titleEn: 'Web Applications',
    descBs: 'Prilagođene web platforme i portali izgrađeni modernim tehnologijama za maksimalnu brzinu, sigurnost i skalabilnost.',
    descEn: 'Custom web apps built with modern frameworks like React, Laravel, Vue, and Node.js.',
    techs: ['React', 'Laravel', 'Vue.js', 'Node.js'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    titleBs: 'Mobilne aplikacije',
    titleEn: 'Mobile Applications',
    descBs: 'Nativna i cross-platform mobilna rješenja za iOS i Android koja vašem terenskom timu i klijentima pružaju besprijekorno iskustvo.',
    descEn: 'Native and cross-platform mobile solutions for iOS and Android.',
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    id: 'ai',
    icon: Sparkles,
    titleBs: 'AI i inteligentni sistemi',
    titleEn: 'AI Solutions',
    descBs: 'Automatizacija složenih poslovnih odluka, obrada prirodnog jezika i prediktivni modeli integrisani u vaše svakodnevne procese.',
    descEn: 'Intelligent systems powered by machine learning and AI.',
    techs: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
  },
  {
    id: 'erp-crm',
    icon: Building2,
    titleBs: 'Prilagođeni ERP & CRM',
    titleEn: 'Custom ERP/CRM',
    descBs: 'Namjenski poslovni softver koji objedinjuje prodajne lijevke, operacije i resurse tačno prema načinu na koji vaš tim posluje.',
    descEn: 'Tailored enterprise solutions that streamline operations.',
    techs: ['Dynamics 365', 'SQL', 'AWS', 'Azure'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    titleBs: 'Cloud rješenja i infrastruktura',
    titleEn: 'Cloud Solutions',
    descBs: 'Pouzdana cloud arhitektura, automatizovane migracije i DevOps procesi koji garantuju 99.9% dostupnost i optimalne troškove.',
    descEn: 'Robust cloud infrastructure and migration services.',
    techs: ['AWS', 'GCP', 'Azure', 'Kubernetes'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    titleBs: 'Poslovna analitika i BI',
    titleEn: 'Data Analytics',
    descBs: 'Podaci vam stoje razbacani po sistemima. Spajamo ih na jedno mjesto, da odluku donesete dok još nešto znači.',
    descEn: 'Transform raw data into actionable insights.',
    techs: ['Python', 'BigQuery', 'Tableau', 'Power BI'],
  },
];

const ENGINEERING_STEPS = [
  {
    step: '01',
    titleBs: 'Dubinska analiza i specifikacija',
    titleEn: 'Deep discovery and scoping',
    descBs: 'Zajedno mapiramo vaše specifične poslovne tokove, identificiramo uska grla i precizno definišemo tehničku arhitekturu.',
    descEn: 'We map your exact operational workflows, isolate bottlenecks, and establish a clear technical specification.',
  },
  {
    step: '02',
    titleBs: 'Arhitektura i UX/UI prototip',
    titleEn: 'Architecture and clickable prototype',
    descBs: 'Dizajniramo intuitivan korisnički interfejs i robusnu bazu podataka. Testirate prototip prije nego što se napiše prva linija koda.',
    descEn: 'We design intuitive interfaces and a resilient data architecture. You test the interactive prototype before coding starts.',
  },
  {
    step: '03',
    titleBs: 'Agilni razvoj i iterativno testiranje',
    titleEn: 'Agile sprints and iterative QA',
    descBs: 'Razvijamo u dvosedmičnim sprintovima uz kontinuiranu demonstraciju funkcionalnosti. Redovno vidite napredak i dajete povratne informacije.',
    descEn: 'We engineer in two-week sprints with continuous demonstrations. You review live progress and steer iterations.',
  },
  {
    step: '04',
    titleBs: 'Puštanje u produkciju i dugoročna podrška',
    titleEn: 'Deployment, training, and SLA support',
    descBs: 'Obučavamo vaš tim, vršimo sigurnu migraciju podataka i osiguravamo cjelodnevno održavanje i proaktivno skaliranje.',
    descEn: 'We train your team, migrate data safely, and provide ongoing maintenance, monitoring, and proactive scaling.',
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
            <span className="l-en">Custom Development Services</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">Usluge razvoja softvera izgrađene oko vaših poslovnih potreba.</span>
          <span className="l-en">Custom development services built around your business needs.</span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl leading-relaxed">
          <span className="l-bs">
            Kada nijedan gotov alat ne odgovara vašim procesima, mi preuzimamo kompletan tehnički ciklus: od početne analize i arhitekture do pouzdane produkcije i dugoročnog održavanja.
          </span>
          <span className="l-en">
            When off-the-shelf software falls short, we engineer bespoke digital platforms: from architecture and UI/UX design to robust production scaling and dedicated maintenance.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#custom-form"
            onClick={(e) => go(e, '#custom-form')}
            className="btn-primary w-full sm:w-auto py-3.5 px-8 text-sm font-semibold focus-ring"
          >
            <span className="l-bs">Opišite vaš projekat</span>
            <span className="l-en">Discuss your project</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onClick={triggerMeetingModal}
            className="btn-ghost py-3 px-7 text-sm font-semibold focus-ring cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-[var(--cyan)]" />
            <span className="l-bs">Zakažite razgovor</span>
            <span className="l-en">Book a Call</span>
          </button>
        </div>
      </section>

      {/* 2. TRUSTED BY BUSINESSES WORLDWIDE (Track Record) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Award className="w-3.5 h-3.5" />
              <span className="l-bs">Naši rezultati</span>
              <span className="l-en">Proven Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Sistemi koje smo izgradili rade svaki dan</span>
              <span className="l-en">The systems we built are running every day</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Naši rezultati govore sami za sebe. Evo šta smo postigli zajedno s našim klijentima.</span>
              <span className="l-en">Our track record speaks for itself. Here's what we've accomplished together with our clients.</span>
            </p>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Tile 1 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">150+</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Isporučenih projekata</span>
                <span className="l-en">Projects Delivered</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Uspješna digitalna rješenja</span>
                <span className="l-en">Successful digital solutions</span>
              </div>
            </div>

            {/* Tile 2 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">12+</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Država u kojima radimo</span>
                <span className="l-en">Countries Served</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Globalna baza klijenata</span>
                <span className="l-en">Global client base</span>
              </div>
            </div>

            {/* Tile 3 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">98%</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Zadovoljstvo klijenata</span>
                <span className="l-en">Client Satisfaction</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Dugoročna partnerstva</span>
                <span className="l-en">Happy partnerships</span>
              </div>
            </div>

            {/* Tile 4 */}
            <div className="s9-card p-6 text-center flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--cyan)] font-mono mb-2">10+</div>
              <div className="text-sm font-bold text-[var(--ink)] mb-1">
                <span className="l-bs">Godina iskustva</span>
                <span className="l-en">Years Experience</span>
              </div>
              <div className="text-xs text-[var(--muted)]">
                <span className="l-bs">Industrijska ekspertiza</span>
                <span className="l-en">Industry expertise</span>
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
              <span className="l-bs">Oblasti ekspertize</span>
              <span className="l-en">Core Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Sveobuhvatna inženjerska rješenja</span>
              <span className="l-en">Full-Spectrum Engineering Solutions</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <span className="l-bs">Gradimo brza, skalabilna i pouzdana rješenja prilagođena vašim specifičnim operacijama.</span>
              <span className="l-en">We build fast, scalable, and resilient systems tailored to your unique workflows.</span>
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

                    <h3 className="text-lg font-bold text-[var(--ink)] mb-2.5">
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
              <span className="l-bs">Strukturiran proces</span>
              <span className="l-en">How we deliver</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Od prvog sastanka do stabilne produkcije</span>
              <span className="l-en">From initial discovery to stable production</span>
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
              <span className="l-bs">Iz prakse</span>
              <span className="l-en">In practice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Sistem napravljen za jedan način rada.</span>
              <span className="l-en">A system built for one way of working.</span>
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
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-8 sm:mb-12 text-center leading-tight">
                <span className="l-bs">Zašto kompanije biraju namjenski razvoj sa Shape9</span>
                <span className="l-en">Why businesses partner with Shape9 for custom software</span>
              </h2>

              <ul className="space-y-5 max-w-2xl mx-auto">
                {[
                  {
                    bs: 'Prilagođavanje vašim stvarnim procesima umjesto prisilne promjene navika tima',
                    en: 'Customized to your exact workflows instead of forcing your team to change',
                  },
                  {
                    bs: 'Bez mjesečnih licenci po korisniku koje rastu s vašim poslovanjem',
                    en: 'No compounding per-user license fees as your organization scales',
                  },
                  {
                    bs: 'Direktna i jednostavna integracija s vašim postojećim sistemima i hardverom',
                    en: 'Seamless integration with existing ERPs, legacy software, and hardware',
                  },
                  {
                    bs: 'Dugoročno partnerstvo s lokalnim inženjerskim timom i definisanim SLA rokovima',
                    en: 'Direct partnership with experienced engineers and guaranteed SLA response times',
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
              <span className="l-bs">Započnimo projekat</span>
              <span className="l-en">Start a project</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="l-bs">Ispričajte nam o vašim tehničkim zahtjevima</span>
              <span className="l-en">Tell us about your project requirements</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-2xl mx-auto leading-relaxed">
              <span className="l-bs">
                Opišite vaš poslovni problem ili ideju. Javićemo vam se u roku od jednog radnog dana s prvom tehničkom procjenom i prijedlogom arhitekture.
              </span>
              <span className="l-en">
                Describe your operational bottleneck or product vision. We reply within one business day with a preliminary technical assessment.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Po mjeri" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
