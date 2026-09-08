import React from 'react';
import { ArrowLeft, MessageSquare, Bot } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactForm } from '../components/ContactForm';

interface RadoviMonadPageProps {
  onNavigate?: (path: string) => void;
}

export const RadoviMonadPage: React.FC<RadoviMonadPageProps> = ({ onNavigate }) => {
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
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[#35B6F0] transition-colors focus-ring"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="l-bs">Nazad na portfolio</span>
            <span className="l-en">Back to portfolio</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="s9-badge text-[#35B6F0] bg-[rgba(53,182,240,0.1)] border border-[rgba(53,182,240,0.25)] inline-flex items-center gap-2">
            <Bot className="w-3.5 h-3.5" />
            <span className="l-bs">AI i automatizacija</span>
            <span className="l-en">AI and automation</span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Monad Lead
          </span>
        </div>

        <h1 className="hero-title">
          <span className="l-bs">
            Kako smo implementirali autonomni AI analitički sistem za affiliate platformu, uz trošak od <span className="text-[#35B6F0]">50$ mjesečno</span>
          </span>
          <span className="l-en">
            How we built a full AI analytics system for an affiliate platform, for <span className="text-[#35B6F0]">50 dollars a month</span>
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed max-w-4xl">
          <span className="l-bs">
            Monad Lead je globalna affiliate platforma koja dnevno obrađuje hiljade leadova. Razvili smo kompletnu AI infrastrukturu: od autonomnog analitičkog agenta do kontrolne table s ticketing sistemom, Slack integracijom i real-time uvidima. Rezultat: 10 dana testiranja, 0 grešaka, 24 analitička zadatka dnevno i 97% niži operativni trošak u poređenju s angažmanom analitičara.
          </span>
          <span className="l-en">
            Monad Lead is an affiliate platform processing thousands of leads a day. We built a complete AI setup, from an autonomous analyst to a dashboard with ticketing, Slack and real time views. Ten days of testing. Zero errors. Twenty four tasks a day. At a running cost that made the comparison to an analyst almost uncomfortable.
          </span>
        </p>
      </section>

      {/* 2. IMAGE SLOT */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="w-full aspect-video rounded-3xl bg-[var(--panel)] border border-[rgba(53,182,240,0.2)] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[rgba(53,182,240,0.04)] pointer-events-none" />
            <Bot className="w-12 h-12 text-[#35B6F0] opacity-40 mb-3" />
            <p className="text-sm text-[var(--muted)] font-mono max-w-md">
              <span className="l-bs">Kontrolna tabla AI analitičkog sistema za Monad Lead</span>
              <span className="l-en">Dashboard of the AI analytics system built for Monad Lead</span>
            </p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-3 text-center">
            <span className="l-bs">Kontrolna tabla AI analitičkog sistema za Monad Lead</span>
            <span className="l-en">Dashboard of the AI analytics system built for Monad Lead</span>
          </p>
        </ScrollReveal>
      </section>

      {/* 3. IZAZOV */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="s9-card p-8 sm:p-12 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-4">
              <span className="l-bs">Polazna tačka i poslovni izazov</span>
              <span className="l-en">What we were working with</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[var(--body)] leading-relaxed">
              <p>
                <span className="l-bs">
                  Pri obradi hiljada leadova dnevno, čak i minimalne devijacije (blagi pad volumena prometa, postepeno curenje konverzije ili tihi prekid slanja kod ključnog partnera) mogu proći neopaženo danima i stvoriti direktne finansijske gubitke prije nego što ih tim uoči.
                </span>
                <span className="l-en">
                  Monad Lead processes thousands of leads a day. At that volume even small deviations, a slight traffic dip, a gradual conversion decline, an affiliate that quietly disappears, can go unnoticed for days and cost money before anyone sees it.
                </span>
              </p>
              <p>
                <span className="l-bs">
                  Klijent je posjedovao strukturirane podatke i robusnu ClickHouse bazu, ali im je nedostajao mehanizam za kontinuirani nadzor u realnom vremenu koji pamti kontekst i reaguje istog trena. Klasični analitičar pokriva dio posla, ali ne može obraditi 24 kompleksna zadatka dnevno, svakog radnog dana od osam ujutro, sa 100% tačnosti i bez odsustava.
                </span>
                <span className="l-en">
                  The team had clean data and solid ClickHouse infrastructure. What they did not have was a way to watch it continuously, act immediately and remember context over time. An analyst covers part of the problem. Not twenty four tasks a day, every weekday, from eight in the morning, with zero errors and no sick days.
                </span>
              </p>
              <p>
                <span className="l-bs">
                  Cilj je bio izgraditi sistem koji posluje brzinom i preciznošću koje high-volume platforma zahtijeva, uz minimalne operativne troškove održavanja.
                </span>
                <span className="l-en">
                  They needed something that worked at the speed and precision the platform demanded, without the overhead that usually comes with it.
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
                bs: 'Analizirali smo postojeću podatkovnu arhitekturu i mapirali ključne tačke gdje automatizovani nadzor donosi najveći povrat.',
                en: 'We reviewed the existing data infrastructure and picked out where monitoring is worth the most.',
              },
              {
                num: '02',
                bs: 'Razvili smo autonomnog AI agenta koji se aktivira svakog radnog dana u 08:00 i analizira metričke tokove svakih 15 minuta tokom radnog vremena.',
                en: 'We built an autonomous AI agent that wakes every weekday at 08:00 and analyses the numbers every fifteen minutes, from nine to five.',
              },
              {
                num: '03',
                bs: 'Integrisali smo sistem s ticketing platformom i Slackom: agent samostalno kreira tiket pri anomaliji, taguje odgovornog inženjera i šalje sažetak.',
                en: 'We connected it to a ticketing system. When it spots a deviation it opens a ticket itself, tags the responsible person and posts to Slack.',
              },
              {
                num: '04',
                bs: 'Ugradili smo dugoročnu memoriju konteksta. Kada tim označi određenu promjenu kao plansku, agent bilježi pravilo i sprečava buduće lažne uzbune.',
                en: 'We built in context memory. When the team replies that something is intentional and not a deviation, the agent remembers and stops reporting it.',
              },
              {
                num: '05',
                bs: 'Isporučili smo intuitivnu kontrolnu tablu s live uvidima u sve ključne parametre affiliate mreže.',
                en: 'We delivered a dashboard with real time views of every key affiliate metric.',
              },
              {
                num: '06',
                bs: 'Agent automatski vrši jutarnju reviziju otvorenih tiketa i prati status njihovog rješavanja.',
                en: 'The next day the agent reviews open tickets and tracks whether they were resolved. It takes Sundays off.',
              },
            ].map((step) => (
              <div key={step.num} className="s9-card-nested p-5 border-[var(--line)] flex items-start gap-4 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-[rgba(53,182,240,0.1)] text-[#35B6F0] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[rgba(53,182,240,0.2)]">
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
              <span className="l-bs">Ključni rezultati projekta</span>
              <span className="l-en">What we delivered</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="s9-card p-5 border-[rgba(53,182,240,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-[#35B6F0] mb-1.5 font-mono">
                <span className="l-bs">50 $ / mj</span>
                <span className="l-en">$50 / mo</span>
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">ukupni trošak rada AI infrastrukture</span>
                <span className="l-en">running cost of the system after deployment</span>
              </div>
            </div>

            <div className="s9-card p-5 border-[rgba(53,182,240,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-[#35B6F0] mb-1.5 font-mono">
                24
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">analitička zadatka svakog radnog dana</span>
                <span className="l-en">tasks a day, every weekday</span>
              </div>
            </div>

            <div className="s9-card p-5 border-[rgba(53,182,240,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-[#35B6F0] mb-1.5 font-mono">
                0
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">grešaka tokom 10 dana pilot faze</span>
                <span className="l-en">errors in the first ten days of testing</span>
              </div>
            </div>

            <div className="s9-card p-5 border-[rgba(53,182,240,0.2)] bg-[var(--panel)] text-center rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-[#35B6F0] mb-1.5 font-mono">
                <span className="l-bs">10 dana</span>
                <span className="l-en">10 days</span>
              </div>
              <div className="text-xs text-[var(--muted)] leading-tight">
                <span className="l-bs">od početka do produkcijske validacije</span>
                <span className="l-en">from deployment to a validated live system</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. ŠTA JE AGENT UHVATIO U PRVIH DESET DANA */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
              <span className="l-bs">Konkretne anomalije detektovane u prvih 10 dana</span>
              <span className="l-en">What the agent caught in the first ten days</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="s9-card p-6 sm:p-8 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">
                <span className="l-bs">1. Tihi prekid slanja kod grupe partnera</span>
                <span className="l-en">An affiliate that quietly stopped</span>
              </h3>
              <p className="text-sm text-[var(--body)] leading-relaxed">
                <span className="l-bs">
                  Grupa manjih affiliate partnera sa stabilnim prometom iznenada je prestala slati leadove. Zbog raspodijeljenog prometa, ručni pregled bi ovo uočio tek nakon više dana. AI agent je detektovao prekid unutar 15 minuta, a uzrok je bio tehnički kvar na njihovom webhooku, koji je saniran istog popodneva.
                </span>
                <span className="l-en">
                  A group of smaller affiliates with steady traffic suddenly stopped sending. Nobody on the team would have noticed for days. The agent caught the drop within fifteen minutes. The cause was a technical fault on their side. Resolved the same day.
                </span>
              </p>
            </div>

            <div className="s9-card p-6 sm:p-8 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">
                <span className="l-bs">2. Prikriveni rast lažnog prometa (25 dana)</span>
                <span className="l-en">Twenty five days of fake traffic</span>
              </h3>
              <p className="text-sm text-[var(--body)] leading-relaxed">
                <span className="l-bs">
                  Jedan partner je tokom 25 dana postepeno povećavao obim za 1-2% dnevno, ostajući ispod fiksnih pragova alarma. Agent je unakrsno analizirao trendove rasta s kvalitetom konverzije i otkrio sofisticiran obrazac botovskog prometa koji bi standardnim analitičkim metodama ostao neprimijećen.
                </span>
                <span className="l-en">
                  One affiliate had been raising volume by one to two percent a day for twenty five days, small enough to stay under every manual threshold. The agent cross referenced volume against lead quality and recognised a classic fraud pattern. An analyst would not have caught it.
                </span>
              </p>
            </div>

            <div className="s9-card p-6 sm:p-8 border-[var(--line)] bg-[var(--panel)] rounded-3xl">
              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2">
                <span className="l-bs">3. Pad stope prihvata sa 68% na 41%</span>
                <span className="l-en">Acceptance rate down from 68 to 41 percent</span>
              </h3>
              <p className="text-sm text-[var(--body)] leading-relaxed">
                <span className="l-bs">
                  Oglašivač je izmijenio validacijske kriterije bez prethodne najave. Agent je uočio odstupanje već na prvoj jutarnjoj provjeri i podigao kritičan tiket. Brza reakcija spriječila je preusmjeravanje neisplativog prometa i sačuvala budžet klijenta.
                </span>
                <span className="l-en">
                  An advertiser changed their acceptance criteria without telling the platform. The agent caught it on the first morning check and opened a critical ticket immediately. Had the team not acted that morning, affiliates would have been sending traffic that does not convert, and the cost would have compounded by the hour.
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
              <span className="l-bs">Uporedna analiza: AI Agent vs. Manuelni rad</span>
              <span className="l-en">Comparison</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    <th className="pb-3 pr-4"></th>
                    <th className="pb-3 px-4 text-[#35B6F0]">
                      <span className="l-bs">AI agent</span>
                      <span className="l-en">AI agent</span>
                    </th>
                    <th className="pb-3 pl-4 text-[var(--muted)]">
                      <span className="l-bs">Manuelni analitičar</span>
                      <span className="l-en">Analyst</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)] text-[var(--body)]">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Mjesečni trošak rada</span>
                      <span className="l-en">Monthly running cost</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#35B6F0]">
                      <span className="l-bs">oko 50 $</span>
                      <span className="l-en">about $50</span>
                    </td>
                    <td className="py-3 pl-4 text-[var(--muted)]">
                      <span className="l-bs">oko 2.000 $</span>
                      <span className="l-en">about $2,000</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Zadataka dnevno</span>
                      <span className="l-en">Tasks per day</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#35B6F0]">24</td>
                    <td className="py-3 pl-4 text-[var(--muted)]">
                      <span className="l-bs">oko 8</span>
                      <span className="l-en">about 8</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Greške u analizi</span>
                      <span className="l-en">Errors</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#35B6F0]">0</td>
                    <td className="py-3 pl-4 text-[var(--muted)]">
                      <span className="l-bs">ljudski faktor</span>
                      <span className="l-en">possible</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      <span className="l-bs">Dostupnost i odsustva</span>
                      <span className="l-en">Sick days</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#35B6F0]">
                      <span className="l-bs">100% dostupnost</span>
                      <span className="l-en">0</span>
                    </td>
                    <td className="py-3 pl-4 text-[var(--muted)]">
                      <span className="l-bs">godišnji odmori i bolovanja</span>
                      <span className="l-en">about 15 a year</span>
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
          <div className="p-6 sm:p-8 rounded-3xl bg-[rgba(53,182,240,0.06)] border border-[rgba(53,182,240,0.2)] text-base sm:text-xl font-bold text-[#35B6F0] leading-snug">
            <span className="l-bs">
              97% niži trošak uz trostruko veći analitički kapacitet.
            </span>
            <span className="l-en">
              97 percent lower cost. And more work done.
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. CONTACT CTA */}
      <section id="contact" className="px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
        <ScrollReveal>
          <div className="section-head">
            <div className="s9-badge bg-[rgba(53,182,240,0.12)] text-[#35B6F0] text-xs font-semibold uppercase tracking-wider mb-4 border border-[rgba(53,182,240,0.25)]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="l-bs">Započnimo saradnju</span>
              <span className="l-en">Let's talk</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-3">
              <span className="l-bs">Želite slično rješenje za vaš biznis?</span>
              <span className="l-en">Have something similar?</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--body)] max-w-xl mx-auto leading-relaxed">
              <span className="l-bs">
                Opišite nam operativne procese koji vašem timu oduzimaju najviše vremena. Predložićemo optimalan model automatizacije i procjenu povrata investicije.
              </span>
              <span className="l-en">
                Write what eats your team's time, or which numbers you are missing. We come back with a concrete proposal and an honest read on whether it pays off.
              </span>
            </p>
          </div>

          <div className="section-body"><ContactForm productChip="Sonar" /></div>
        </ScrollReveal>
      </section>
    </div>
  );
};
