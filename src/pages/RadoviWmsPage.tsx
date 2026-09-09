import React from 'react';
import { ArrowLeft, MessageSquare, Warehouse } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactForm } from '../components/ContactForm';

interface RadoviWmsPageProps {
  onNavigate?: (path: string) => void;
}

export const RadoviWmsPage: React.FC<RadoviWmsPageProps> = ({ onNavigate }) => {
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
      {/* 1. HEADER & META */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <a
            href="/radovi"
            onClick={(e) => go(e, '/radovi')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[#FFA658] transition-colors focus-ring"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="l-bs">Nazad na portfolio</span>
            <span className="l-en">Back to portfolio</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="s9-badge text-[#FFA658] bg-[rgba(255,166,88,0.1)] border border-[rgba(255,166,88,0.25)] inline-flex items-center gap-2">
            <Warehouse className="w-3.5 h-3.5" />
            <span className="l-bs">Skladište</span>
            <span className="l-en">Warehouse</span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            <span className="l-bs">Organizacija u dvanaest država</span>
            <span className="l-en">An organisation across twelve countries</span>
          </span>
        </div>

        <h1 className="hero-title">
          <span className="l-bs">
            Implementacija WMS sistema za 12 regionalnih centara i postizanje tačnosti zaliha od <span className="text-[#FFA658]">99,4%</span>
          </span>
          <span className="l-en">
            A warehouse system across twelve countries, and inventory accuracy of <span className="text-[#FFA658]">99.4 percent</span>
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-4xl">
          <span className="l-bs">
            12 distributivnih skladišta u 12 država, preko 10.000 artikala i 1.500 zaposlenika. Centralizacijom logističkih operacija kroz namjenski WMS sistem, u roku od 6 sedmica greške u komisioniranju su smanjene za 91%, dok je tačnost stanja zaliha podignuta sa 81% na 99,4%.
          </span>
          <span className="l-en">
            Twelve countries. Twelve warehouses. Over ten thousand product lines. More than fifteen hundred people across twenty five nationalities. And a stock operation that had quietly become impossible to run. Six weeks from kickoff to live. Picking errors down by 91 percent. Inventory accuracy from 81 to 99.4 percent.
          </span>
        </p>
      </section>

      {/* 2. IMAGE SLOT */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="w-full aspect-video rounded-3xl bg-[var(--panel)] border border-[rgba(255,166,88,0.2)] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[rgba(255,166,88,0.04)] pointer-events-none" />
            <Warehouse className="w-12 h-12 text-[#FFA658] opacity-40 mb-3" />
            <p className="text-sm text-[var(--muted)] font-mono max-w-md">
              <span className="l-bs">Kontrolna tabla skladišnog sistema za dvanaest lokacija</span>
              <span className="l-en">Warehouse system dashboard across twelve locations</span>
            </p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-3 text-center">
            <span className="l-bs">Kontrolna tabla skladišnog sistema za dvanaest lokacija</span>
            <span className="l-en">Warehouse system dashboard across twelve locations</span>
          </p>
        </ScrollReveal>
      </section>

      {/* 3. IZAZOV */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="s9-card p-8 sm:p-12 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-4">
              <span className="l-bs">Polazno stanje i operativni izazovi</span>
              <span className="l-en">What we were working with</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <p>
                <span className="l-bs">
                  Organizacija je doživjela naglu regionalnu ekspanziju. Poslovanje se proširilo na 12 država, sa više od 1.500 zaposlenika i preko 10.000 aktivnih artikala.
                </span>
                <span className="l-en">
                  The organisation had scaled fast. What began as a small team now runs operations across twelve countries, with over fifteen hundred people and twenty five nationalities.
                </span>
              </p>
              <p>
                <span className="l-bs">
                  Brz rast stvorio je veliku operativnu fragmentaciju: svaka od 12 lokacija vodila je evidenciju na svoj način, od nepovezanih Excel tabela do lokalnih softvera koji nisu komunicirali međusobno.
                </span>
                <span className="l-en">
                  Across twelve warehouse locations, every site handled stock its own way. Some used spreadsheets. Some used local tools that talked to nothing else. Some relied on people who simply knew where things were. There was no single source of truth, so nobody at the centre could answer a simple question, what do we actually have and where is it, without making calls and waiting hours.
                </span>
              </p>
              <p>
                <span className="l-bs">
                  Centralni menadžment nije imao pouzdan uvid u realno stanje zaliha. Posljedica: artikli su se prikazivali kao dostupni iako su bili rasprodati, dolazilo je do pogrešnog pakovanja narudžbi, a međuskladišni transferi nisu bili sljedivi.
                </span>
                <span className="l-en">
                  Discrepancies were piling up quietly. Stock showed as available and was not there. Orders were picked incorrectly. Across twelve locations in several countries, the margin for error was stretched every single day.
                </span>
              </p>
              <p>
                <span className="l-bs">
                  Bio je neophodan robustan, skalabilan sistem koji standardizuje poslovanje svih lokacija u jedinstvenu bazu podataka uz minimalnu krivulju učenja za radnike na terenu.
                </span>
                <span className="l-en">
                  They needed a system that could carry the scale they were already at, and the one they were heading toward.
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. KAKO SMO PRISTUPILI */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
              <span className="l-bs">Inženjerski pristup i implementacija</span>
              <span className="l-en">How we tackled it</span>
            </h2>
          </div>

          <div className="space-y-3.5">
            {[
              {
                num: '01',
                bs: 'Mapirali smo robne tokove na svih 12 lokacija i identifikovali ključna uska grla pri prijemu, komisioniranju i dopuni.',
                en: 'We mapped how stock moves across all twelve locations and found where it jams hardest, in receiving, picking and replenishment.',
              },
              {
                num: '02',
                bs: 'Implementirali smo centralizovanu cloud WMS arhitekturu s mogućnošću specifičnog konfigurisanja pravila za svaku pojedinačnu lokaciju.',
                en: 'We deployed one system with location specific configuration, because every site works differently.',
              },
              {
                num: '03',
                bs: 'Uveli smo mobilnu aplikaciju za skeniranje barkodova čime je potpuno eliminisan manuelni unos i rizik od ljudske greške.',
                en: 'We introduced barcode scanning in every warehouse, which removed manual stock entry entirely.',
              },
              {
                num: '04',
                bs: 'Kreirali smo jedinstveni centralni dashboard s uvidom u zalihe, obrte i transfere u realnom vremenu.',
                en: 'We built a single real time view of every location, available to central operations.',
              },
              {
                num: '05',
                bs: 'Postavili smo automatizovane alarme za sigurnosne zalihe i automatsku narudžbu dopune prema historijskoj dinamici potrošnje.',
                en: 'We set up low stock alerts and automatic replenishment, with thresholds that differ per location.',
              },
              {
                num: '06',
                bs: 'Sproveli smo praktičnu obuku skladišnih timova na svim lokacijama, prilagođenu nivou tehničkog predznanja.',
                en: 'We trained the teams at every site, allowing for different working habits and different levels of technical comfort.',
              },
              {
                num: '07',
                bs: 'Paralelno smo održavali stari i novi sistem tokom dvije sedmice testiranja kako isporuke klijentima ne bi kasnile ni minute.',
                en: 'We ran the old and the new way in parallel for two weeks before full cutover, so fulfilment never stopped for a single day.',
              },
            ].map((step) => (
              <div key={step.num} className="s9-card-nested p-5 border-[var(--line)] flex items-start gap-4 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-[rgba(255,166,88,0.1)] text-[#FFA658] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[rgba(255,166,88,0.2)]">
                  {step.num}
                </div>
                <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed pt-1">
                  <span className="l-bs">{step.bs}</span>
                  <span className="l-en">{step.en}</span>
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. REZULTATI (4 STAT TILES) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
              <span className="l-bs">Isporučeni rezultati</span>
              <span className="l-en">What we delivered</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="s9-card p-5 border-[rgba(255,166,88,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA658] mb-1.5 font-mono">
                <span className="l-bs">99,4%</span>
                <span className="l-en">99.4%</span>
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">tačnost stanja zaliha</span>
                <span className="l-en">inventory accuracy after deployment</span>
              </div>
            </div>

            <div className="s9-card p-5 border-[rgba(255,166,88,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA658] mb-1.5 font-mono">
                91%
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">manje grešaka u pakovanju</span>
                <span className="l-en">fewer picking errors</span>
              </div>
            </div>

            <div className="s9-card p-5 border-[rgba(255,166,88,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA658] mb-1.5 font-mono">
                12
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">skladišta uvezanih u 1 sistem</span>
                <span className="l-en">warehouses on one system</span>
              </div>
            </div>

            <div className="s9-card p-5 border-[rgba(255,166,88,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-[#FFA658] mb-1.5 font-mono">
                <span className="l-bs">6 sedmica</span>
                <span className="l-en">6 weeks</span>
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">od analize do pune produkcije</span>
                <span className="l-en">from kickoff to fully operational</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. ŠTA JE SISTEM OTKRIO U PRVIM DANIMA */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
              <span className="l-bs">Nepravilnosti otklonjene odmah po uvođenju</span>
              <span className="l-en">What the system surfaced in the first days</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="s9-card p-6 sm:p-8 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">
                <span className="l-bs">1. 'Fantomski' artikli evidentirani samo na papiru</span>
                <span className="l-en">Stock that existed only on paper</span>
              </h3>
              <p className="text-sm text-[var(--body)] leading-relaxed">
                <span className="l-bs">
                  Dva skladišta su vodila stotine komada visokotražene robe kao dostupne, iako su u stvarnosti bili utrošeni i nikada formalno razduženi. Sistem je uočio neslaganje već prvog dana, a kompletna inventura i usklađivanje završeni su unutar 48 sati, sprečavajući prijem neizvodivih narudžbi.
                </span>
                <span className="l-en">
                  Two warehouses were carrying several hundred units of a high demand product as available. The units did not exist, they had been consumed in earlier fulfilment and never written off. The system flagged the discrepancy on day one, and reconciliation was finished within 48 hours. Without it, those phantom units would have kept generating orders that could not be filled.
                </span>
              </p>
            </div>

            <div className="s9-card p-6 sm:p-8 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">
                <span className="l-bs">2. Zastoji u dopuni i probijanje rokova isporuke</span>
                <span className="l-en">Replenishment that ran late and broke deadlines</span>
              </h3>
              <p className="text-sm text-[var(--body)] leading-relaxed">
                <span className="l-bs">
                  Veća regionalna skladišta nisu imala mehanizam predikcije zaliha, što je dovodilo do iznenadnih 'out-of-stock' situacija usred skoka potražnje. Uvođenjem automatskih tačaka naručivanja prema stvarnoj stopi potrošnje, nestašice zaliha su pale na nulu već u prvom mjesecu.
                </span>
                <span className="l-en">
                  One of the larger locations had no automatic replenishment trigger at all. Orders would spike, stock would quietly run out, and the team found out only when a pick failed. After deployment, reorder points were set per location based on actual consumption. Stock outs at that site dropped to zero within the first month.
                </span>
              </p>
            </div>

            <div className="s9-card p-6 sm:p-8 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">
                <span className="l-bs">3. Nekontrolisani međuskladišni transferi</span>
                <span className="l-en">Transfers nobody could see</span>
              </h3>
              <p className="text-sm text-[var(--body)] leading-relaxed">
                <span className="l-bs">
                  Roba se između objekata premještala bez standardizovanog protokola i digitalnog traga. Sistem je uveo verifikaciju otpreme i prijema s vremenskim žigovima, pružajući upravi stopostotnu vidljivost robe u tranzitu.
                </span>
                <span className="l-en">
                  Stock moved between locations informally, with no record, no tracking and no accountability. It was impossible to know where anything was in transit. The system introduced a formal transfer flow. Every movement is now logged, timestamped and visible to central operations in real time.
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. POREĐENJE TABLE */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="s9-card p-6 sm:p-8 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-5">
              <span className="l-bs">Uporedni pregled: Prije i poslije implementacije</span>
              <span className="l-en">Comparison</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    <th className="pb-3 pr-4"></th>
                    <th className="pb-3 px-4 text-[#FFA658]/70">
                      <span className="l-bs">Prije Atlasa</span>
                      <span className="l-en">Before</span>
                    </th>
                    <th className="pb-3 pl-4 text-[#FFA658]">
                      <span className="l-bs">Nakon uvođenja</span>
                      <span className="l-en">After</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)] text-[var(--body)]">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Tačnost zaliha</span>
                      <span className="l-en">Inventory accuracy</span>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">81%</td>
                    <td className="py-3 pl-4 font-semibold text-[#FFA658]">
                      <span className="l-bs">99,4%</span>
                      <span className="l-en">99.4%</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Greške u komisioniranju</span>
                      <span className="l-en">Picking errors</span>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">
                      <span className="l-bs">visoka stopa</span>
                      <span className="l-en">high</span>
                    </td>
                    <td className="py-3 pl-4 font-semibold text-[#FFA658]">
                      <span className="l-bs">smanjene za 91%</span>
                      <span className="l-en">down 91%</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Vidljivost zaliha</span>
                      <span className="l-en">Stock visibility</span>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">
                      <span className="l-bs">izolovano po skladištima</span>
                      <span className="l-en">per location, manual</span>
                    </td>
                    <td className="py-3 pl-4 font-semibold text-[#FFA658]">
                      <span className="l-bs">12 skladišta u realnom vremenu</span>
                      <span className="l-en">12 warehouses, real time</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Dopuna zaliha</span>
                      <span className="l-en">Replenishment</span>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">
                      <span className="l-bs">reaktivno, nakon nestašice</span>
                      <span className="l-en">after the problem</span>
                    </td>
                    <td className="py-3 pl-4 font-semibold text-[#FFA658]">
                      <span className="l-bs">automatizovano prema pragu</span>
                      <span className="l-en">automatic</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Logistički izvještaji</span>
                      <span className="l-en">Reporting</span>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">
                      <span className="l-bs">dani za ručnu obradu</span>
                      <span className="l-en">days to compile</span>
                    </td>
                    <td className="py-3 pl-4 font-semibold text-[#FFA658]">
                      <span className="l-bs">trenutni, automatizovani uvid</span>
                      <span className="l-en">instant</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. CLOSING LINE */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="p-6 sm:p-8 rounded-3xl bg-[rgba(255,166,88,0.06)] border border-[rgba(255,166,88,0.2)] text-base sm:text-xl font-bold text-[#FFA658] leading-snug">
            <span className="l-bs">
              Od 81% tačnosti i ručnog haosa do 99,4% preciznosti i potpune kontrole zaliha u samo 6 sedmica.
            </span>
            <span className="l-en">
              From 81 percent accuracy and manual chaos to 99.4 percent and stock you can see at any moment, in six weeks.
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. CONTACT CTA */}
      <section id="contact" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(255,166,88,0.12)] text-[#FFA658] text-xs font-semibold uppercase tracking-wider mb-4 border border-[rgba(255,166,88,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Optimizujte skladište</span>
              <span className="l-en">Let's talk</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-3">
              <span className="l-bs">Imate slične logističke izazove?</span>
              <span className="l-en">Have something similar?</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-xl mx-auto leading-relaxed">
              <span className="l-bs">
                Opišite nam broj skladišnih lokacija, broj artikala i izazove s kojima se susrećete. Pripremićemo konkretan plan uvođenja i analizu isplativosti.
              </span>
              <span className="l-en">
                Write what eats your team's time, or which numbers you are missing. We come back with a concrete proposal and an honest read on whether it pays off.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Atlas" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
