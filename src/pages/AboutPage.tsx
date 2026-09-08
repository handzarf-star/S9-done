import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Target,
  Compass,
  Wrench,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';

import { ScrollReveal } from '../components/ScrollReveal';
import { ContactForm } from '../components/ContactForm';
import { ProcessSteps, APPROACH_STEPS } from '../components/ProcessSteps';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

// APPROACH_STEPS lives in ProcessSteps.tsx, shared with the home page.

const PAST_WORK = [
  {
    id: 'monad',
    nameBs: 'AI analitičar za affiliate platformu',
    nameEn: 'An AI analyst for an affiliate platform',
    path: '/radovi/monad-lead',
  },
  {
    id: 'wms',
    nameBs: 'Skladište u dvanaest država',
    nameEn: 'A warehouse across twelve countries',
    path: '/radovi/wms',
  },
];

const AI_PRINCIPLES = [
  {
    id: 'helps',
    icon: Sparkles,
    titleBs: 'Koristimo je gdje stvarno pomaže',
    titleEn: 'We use it where it genuinely helps',
    descBs: 'Tamo gdje skida ponavljajući posao s vašeg tima ili ubrzava odluku koju ionako donosite. To je jedini razlog koji priznajemo.',
    descEn: 'Not because it is trending, but because it takes repetitive work off your team, or speeds up a decision you already make.',
  },
  {
    id: 'tool',
    icon: Wrench,
    titleBs: 'Jedan je od alata, ne rješenje za sve',
    titleEn: 'One tool among several, not a cure-all',
    descBs: 'Nekad je odgovor obično pravilo, izvještaj ili integracija. Predlažemo ono što rješava problem, bez obzira kako se zove.',
    descEn: 'Sometimes the answer is a rule, a report, or an integration, not a model. We propose what actually solves the problem.',
  },
  {
    id: 'honest',
    icon: ShieldCheck,
    titleBs: 'Iskreni smo oko granica',
    titleEn: 'Honest about where it stops',
    descBs: 'Ako procijenimo da se vama ne isplati ili da tehnologija još nije spremna, čut ćete to od nas prije nego potrošite budžet.',
    descEn: 'If we think a solution is not ready or worth it for your case, we say so before you spend the budget.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigate?.(target);
  };

  const triggerMeetingModal = () => {
    window.dispatchEvent(new CustomEvent('open-meeting-modal'));
  };

  return (
    <div className="space-y-20 sm:space-y-28 pt-28 sm:pt-40 pb-24 sm:pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      {/* 1. HERO. Business first, engineering as the tool that builds it. */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span className="s9-badge text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.1)] border border-[rgba(var(--cyan-rgb),0.25)] inline-flex items-center gap-2 mx-auto">
            <Compass className="w-3.5 h-3.5" />
            <span className="l-bs">O nama</span>
            <span className="l-en">About Us</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">Razumijemo biznis. Tehnologija je naš alat.</span>
          <span className="l-en">We understand business. Technology is our tool.</span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 text-[var(--body)] max-w-3xl leading-relaxed">
          <span className="l-bs">
            Prvo analiziramo vaše poslovanje: prodaju, marketing i operacije. Tek onda gradimo rješenje. Suštinsko razumijevanje vašeg modela poslovanja dolazi prije rješenja koje nudimo.
          </span>
          <span className="l-en">
            We start with your business: sales, marketing, operations. Only then do we build. Understanding how you actually work comes before whatever we propose.
          </span>
        </p>

        <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#about-form"
            onClick={(e) => go(e, '#about-form')}
            className="btn-primary w-full sm:w-auto py-3.5 px-8 text-sm font-semibold focus-ring"
          >
            <span className="l-bs">Razgovarajmo</span>
            <span className="l-en">Get in touch</span>
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

      {/* 2. WHO TRUSTS US. Numbers plus named, real work, not logos we do not have. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span className="l-bs">Ko nam vjeruje</span>
              <span className="l-en">Who trusts us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Deset godina rada, iza nas su isporučeni projekti.</span>
              <span className="l-en">Ten years in, with the work behind us to show for it.</span>
            </h2>
          </div>

          <div className="section-body space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAST_WORK.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => go(e, item.path)}
                  className="s9-card p-5 flex items-center justify-between gap-4 group hover:border-[rgba(var(--cyan-rgb),0.4)] transition-all rounded-2xl"
                >
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    <span className="l-bs">{item.nameBs}</span>
                    <span className="l-en">{item.nameEn}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--cyan)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. HOW WE WORK. Same four steps as the homepage, so the two never drift apart. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span className="l-bs">Kako radimo</span>
              <span className="l-en">How we work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">Prilagodimo se vašem poslovanju, ne obrnuto.</span>
              <span className="l-en">We fit to you, not the other way round.</span>
            </h2>
          </div>

          <ProcessSteps steps={APPROACH_STEPS} className="section-body" />
        </ScrollReveal>
      </section>

      {/* 4. AI PHILOSOPHY. Named plainly, one option among several, never the hero. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="l-bs">Naša AI filozofija</span>
              <span className="l-en">Our AI philosophy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
              <span className="l-bs">AI koristimo kada rješava problem, ne zato što se traži.</span>
              <span className="l-en">We reach for AI when it solves the problem, not because it sells.</span>
            </h2>
          </div>

          <div className="section-body grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {AI_PRINCIPLES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="s9-card-nested p-6 h-full">
                  <div className="w-10 h-10 rounded-2xl bg-[rgba(var(--cyan-rgb),0.1)] text-[var(--cyan)] flex items-center justify-center mb-4 border border-[rgba(var(--cyan-rgb),0.2)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--ink)] mb-2">
                    <span className="l-bs">{item.titleBs}</span>
                    <span className="l-en">{item.titleEn}</span>
                  </h3>
                  <p className="text-sm text-[var(--body)] leading-relaxed">
                    <span className="l-bs">{item.descBs}</span>
                    <span className="l-en">{item.descEn}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. FOCUS. An honest, forward-looking claim, not a track record we do not have. */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-body">
            <div className="s9-card">
              <div className="s9-badge bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)] text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
                <Building2 className="w-3.5 h-3.5" />
                <span className="l-bs">Fokus</span>
                <span className="l-en">Focus</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-6 leading-snug">
                <span className="l-bs">Isti sistemi mogu raditi i za javni sektor.</span>
                <span className="l-en">The same systems can work for the public sector.</span>
              </h2>
              <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-2xl">
                <span className="l-bs">
                  Ono što danas pokreće skladišta i kontakt centre radi jednako dobro tamo gdje su procesi propisani, a greška košta više. To je smjer u kojem gradimo, a ne rezultat koji već imamo.
                </span>
                <span className="l-en">
                  The same systems already running warehouses and call centres work just as well where process is regulated and a mistake costs more. That is a direction we are building toward, not a finished result.
                </span>
              </p>
              <ul className="mt-6 space-y-2.5 max-w-2xl">
                <li className="flex items-start gap-2.5 text-sm text-[var(--body)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--cyan)] shrink-0 mt-0.5" />
                  <span>
                    <span className="l-bs">Sistemi koji rade po pravilima koje vi definišete, ne po pretpostavkama</span>
                    <span className="l-en">Systems that work by rules you set, not by assumptions</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[var(--body)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--cyan)] shrink-0 mt-0.5" />
                  <span>
                    <span className="l-bs">Iskustvo sa mrežama od više lokacija, gdje tačnost mora biti ista svuda</span>
                    <span className="l-en">Experience with multi-site networks, where accuracy has to hold everywhere</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[var(--body)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--cyan)] shrink-0 mt-0.5" />
                  <span>
                    <span className="l-bs">Tim koji ostaje uz vas nakon puštanja u rad, ne izvođač koji ode</span>
                    <span className="l-en">A team that stays after launch, not a contractor who leaves</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. CONTACT FORM */}
      <section id="about-form" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-body"><ContactForm /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
