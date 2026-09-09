import React from 'react';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface RadoviPageProps {
  onNavigate?: (path: string) => void;
}

export const RadoviPage: React.FC<RadoviPageProps> = ({ onNavigate }) => {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pt-32 sm:pt-40 pb-28 relative z-10 w-full max-w-full overflow-x-clip">
      {/* PAGE HEADER */}
      <section className="page-hero px-4 sm:px-6 max-w-5xl mx-auto relative">
        <div className="hero-animate-1 mb-4 sm:mb-6">
          <span className="s9-badge text-[#35C6E3] bg-[rgba(53,198,227,0.1)] border border-[rgba(53,198,227,0.25)] inline-flex items-center gap-2 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="l-bs">Portfolio</span>
            <span className="l-en">Portfolio</span>
          </span>
        </div>

        <h1 className="hero-animate-2 hero-title max-w-4xl">
          <span className="l-bs">Naši radovi i studije slučaja</span>
          <span className="l-en">Our Work & Case Studies</span>
        </h1>

        <p className="hero-animate-3 lead mx-auto mb-8 sm:mb-12 max-w-3xl text-[var(--body)]">
          <span className="l-bs">
            Odabrani digitalni sistemi koje smo projektovali, razvili i pustili u puni rad. Spoj naših gotovih operativnih proizvoda i namjenskog softvera razvijenog po narudžbi.
          </span>
          <span className="l-en">
            Selected systems we designed, built and put into full production. A mix of our own operational products and software built to order.
          </span>
        </p>
      </section>

      {/* SIX CARDS IN A md:grid-cols-2 GRID */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* CARD 1: Monad Lead (Sonar) */}
            <div className="s9-card p-7 sm:p-8 border-[rgba(53,182,240,0.2)] flex flex-col justify-between h-full group hover:border-[#35B6F0]/60 transition-all rounded-3xl">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#35B6F0] bg-[rgba(53,182,240,0.1)] border border-[rgba(53,182,240,0.25)]">
                    <span className="l-bs">Shape9 Sonar · AI analitika</span>
                    <span className="l-en">Shape9 Sonar · AI analytics</span>
                  </span>
                  <span className="text-xs font-medium text-[var(--muted)]">
                    <span className="l-bs">2026 · 2 mjeseca</span>
                    <span className="l-en">2026 · 2 months</span>
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  Monad Lead
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  <span className="l-bs">AI analitičar za affiliate platformu</span>
                  <span className="l-en">An AI analyst for an affiliate platform</span>
                </h2>

                <p className="text-sm text-[var(--body)] leading-relaxed mb-6 flex-1">
                  <span className="l-bs">
                    High-volume platforma za obradu hiljada leadova dnevno pogonjena Sonarom. AI agent u realnom vremenu nadzire ključne metrike, automatski detektuje anomalije i kreira tikete uz instant obavijesti na Slack. U prvih 10 dana otkrio je obrazac prevare koji je neprimijećeno trajao 25 dana.
                  </span>
                  <span className="l-en">
                    A platform processing thousands of leads a day powered by Sonar. The agent wakes every weekday morning, checks the numbers every fifteen minutes, opens a ticket when something deviates and posts to Slack. In ten days it caught a fraud pattern that had been growing for twenty five days.
                  </span>
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--line)] mt-auto">
                <a
                  href="/radovi/monad-lead"
                  onClick={(e) => go(e, '/radovi/monad-lead')}
                  className="btn-ghost w-full justify-between text-sm font-semibold text-[#35B6F0] hover:text-[var(--ink)] focus-ring rounded-full"
                >
                  <span>
                    <span className="l-bs">Pogledajte studiju slučaja</span>
                    <span className="l-en">Read the full case</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CARD 2: Warehouse (Atlas) */}
            <div className="s9-card p-7 sm:p-8 border-[rgba(255,166,88,0.2)] flex flex-col justify-between h-full group hover:border-[#FFA658]/60 transition-all rounded-3xl">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#FFA658] bg-[rgba(255,166,88,0.1)] border border-[rgba(255,166,88,0.25)]">
                    <span className="l-bs">Shape9 Atlas · WMS sistem</span>
                    <span className="l-en">Shape9 Atlas · WMS</span>
                  </span>
                  <span className="text-xs font-medium text-[var(--muted)]">
                    <span className="l-bs">6 sedmica implementacije</span>
                    <span className="l-en">6 weeks</span>
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  <span className="l-bs">Regionalni sistem u 12 država</span>
                  <span className="l-en">An organisation across twelve countries</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  <span className="l-bs">WMS sistem za 12 skladišnih lokacija</span>
                  <span className="l-en">A warehouse system across twelve locations</span>
                </h2>

                <p className="text-sm text-[var(--body)] leading-relaxed mb-6 flex-1">
                  <span className="l-bs">
                    12 distributivnih centara, preko 10.000 artikala i 1.500 zaposlenika. Centralizacijom skladišnih procesa uz Atlas WMS i uvođenjem mobilnih terminala na policama, greške u pripremi narudžbi su smanjene za 91%, a tačnost zaliha podignuta na 99,4%.
                  </span>
                  <span className="l-en">
                    Twelve warehouses, over ten thousand product lines, more than fifteen hundred people. Centralized via Atlas WMS with mobile barcode scanners. Six weeks from kickoff to live, picking errors down by 91 percent.
                  </span>
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--line)] mt-auto">
                <a
                  href="/radovi/wms"
                  onClick={(e) => go(e, '/radovi/wms')}
                  className="btn-ghost w-full justify-between text-sm font-semibold text-[#FFA658] hover:text-[var(--ink)] focus-ring rounded-full"
                >
                  <span>
                    <span className="l-bs">Pogledajte studiju slučaja</span>
                    <span className="l-en">Read the full case</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CARD 3: The Body Edit */}
            <div className="s9-card p-7 sm:p-8 border-[var(--line)] flex flex-col justify-between h-full group hover:border-[var(--muted)] transition-all rounded-3xl">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-[var(--ink)] bg-[rgba(255,255,255,0.06)] border border-[var(--line)]">
                    <span className="l-bs">Rješenje po mjeri</span>
                    <span className="l-en">Custom Solution</span>
                  </span>
                  <span className="text-xs font-medium text-[var(--muted)]">
                    <span className="l-bs">2026 · 2 sedmice</span>
                    <span className="l-en">2026 · 2 weeks</span>
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  The Body Edit
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  <span className="l-bs">Digitalna platforma za pilates studio u Sarajevu</span>
                  <span className="l-en">A platform for a Pilates studio in Sarajevo</span>
                </h2>

                <p className="text-sm text-[var(--body)] leading-relaxed mb-6 flex-1">
                  <span className="l-bs">
                    Kompletan ekosistem: web stranica, administrativni panel, korisnički portal i aplikacija za instruktore. Klijenti samostalno rezervišu termine za manje od 45 sekundi, dok je stopa nedolazaka smanjena za 40% putem automatskih podsjetnika.
                  </span>
                  <span className="l-en">
                    A website, an admin panel, a client portal and an instructor panel, all connected. Clients book on their own, with no calls and no messages. A booking takes 45 seconds instead of five minutes, and no shows are down by 40 percent.
                  </span>
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--line)] mt-auto">
                <a
                  href="https://thebodyedit.ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-between text-sm font-semibold focus-ring rounded-full"
                >
                  <span>thebodyedit.ba</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CARD 4: KULT Lounge Bar */}
            <div className="s9-card p-7 sm:p-8 border-[var(--line)] flex flex-col justify-between h-full group rounded-3xl">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-[var(--ink)] bg-[rgba(255,255,255,0.06)] border border-[var(--line)]">
                    <span className="l-bs">Rješenje po mjeri</span>
                    <span className="l-en">Custom Solution</span>
                  </span>
                  <span className="text-xs font-medium text-[var(--muted)]">
                    <span className="l-bs">2025 · 3 mjeseca</span>
                    <span className="l-en">2025 · 3 months</span>
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  KULT Lounge Bar
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  <span className="l-bs">Sistem za digitalno naručivanje i pripremu</span>
                  <span className="l-en">An ordering and preparation system</span>
                </h2>

                <p className="text-sm text-[var(--body)] leading-relaxed mb-6 flex-1">
                  <span className="l-bs">
                    Zamjena papirnih blokova digitalnim naručivanjem sa mobilnih uređaja konobara. Narudžbe stižu istog trena na pripremu, vrijeme obrade je skraćeno sa 3 minute na 10 sekundi, a menadžment ima uvid u analitiku prodaje u realnom vremenu.
                  </span>
                  <span className="l-en">
                    Paper orders meant delays and crossed wires between the waiters and the shisha master. Now a waiter orders in ten seconds from a phone, the order arrives instantly, and the owner sees which hours are busiest and what sells.
                  </span>
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--line)] text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mt-auto">
                <span className="l-bs">Interni produkcijski sistem</span>
                <span className="l-en">Internal system</span>
              </div>
            </div>

            {/* CARD 5: Glow-Bridge */}
            <div className="s9-card p-7 sm:p-8 border-[var(--line)] flex flex-col justify-between h-full group rounded-3xl">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-[var(--ink)] bg-[rgba(255,255,255,0.06)] border border-[var(--line)]">
                    <span className="l-bs">E-commerce platforma</span>
                    <span className="l-en">E-commerce</span>
                  </span>
                  <span className="text-xs font-medium text-[var(--muted)]">
                    <span className="l-bs">2025 · 4 mjeseca</span>
                    <span className="l-en">2025 · 4 months</span>
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  Glow-Bridge
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  <span className="l-bs">Web trgovina za tržište Evropske unije</span>
                  <span className="l-en">A web shop for the European market</span>
                </h2>

                <p className="text-sm text-[var(--body)] leading-relaxed mb-6 flex-1">
                  <span className="l-bs">
                    Web trgovina za brend prirodne kozmetike s naprednom sinhronizacijom zaliha u realnom vremenu, integrisanim kartičnim plaćanjem za EU zonu i automatizovanim praćenjem pošiljki.
                  </span>
                  <span className="l-en">
                    A shop for a natural wellness brand, with an admin panel used by people who are not technical. Stock syncs in real time, orders process themselves, and payment and shipping are set up for the EU.
                  </span>
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--line)] text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mt-auto">
                <span className="l-bs">Tržište Evropske unije</span>
                <span className="l-en">EU market</span>
              </div>
            </div>

            {/* CARD 6: Residence Montis */}
            <div className="s9-card p-7 sm:p-8 border-[var(--line)] flex flex-col justify-between h-full group hover:border-[var(--muted)] transition-all rounded-3xl">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-[var(--ink)] bg-[rgba(255,255,255,0.06)] border border-[var(--line)]">
                    <span className="l-bs">Web prezentacija</span>
                    <span className="l-en">Web</span>
                  </span>
                  <span className="text-xs font-medium text-[var(--muted)]">
                    <span className="l-bs">2026 · 1 sedmica</span>
                    <span className="l-en">2026 · 1 week</span>
                  </span>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  Residence Montis
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3 leading-snug">
                  <span className="l-bs">Prezentacijska platforma za luksuzne apartmane na Vlašiću</span>
                  <span className="l-en">A website for apartments on Vlašić</span>
                </h2>

                <p className="text-sm text-[var(--body)] leading-relaxed mb-6 flex-1">
                  <span className="l-bs">
                    Moderna višejezična web platforma prilagođena svim uređajima s integrisanim modulom za upite i direktne rezervacije smještaja.
                  </span>
                  <span className="l-en">
                    A page that shows the apartments as they actually look and takes a guest to a reservation enquiry. In Bosnian and English, and it works the same on a phone as on a desktop.
                  </span>
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--line)] mt-auto">
                <a
                  href="https://www.residencemontis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-between text-sm font-semibold focus-ring rounded-full"
                >
                  <span>residencemontis.com</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
