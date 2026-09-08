/*
  NOTE: This privacy policy is an accurate draft written for Shape9 d.o.o. Sarajevo,
  describing the actual data flows of the contact form and product operations.
  It is not legal advice and must be reviewed by a lawyer before publishing,
  particularly regarding retention periods and legal basis references under local GDPR regulations.
*/

import React from 'react';
import { CONTACT, COMPANY } from '../config';
import { ScrollReveal } from '../components/ScrollReveal';

interface PrivacyPageProps {
  onNavigate?: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pt-32 sm:pt-40 pb-28 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 scroll-mt-24 w-full max-w-full overflow-x-clip">
      <ScrollReveal>
        <div className="hero-animate-1 mb-8 text-center sm:text-left">
          <span className="s9-badge text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.1)] border border-[rgba(var(--cyan-rgb),0.25)] inline-block mb-4">
            <span className="l-bs">Privatnost i sigurnost</span>
            <span className="l-en">Privacy & Security</span>
          </span>
          <h1 className="hero-title">
            <span className="l-bs">Politika privatnosti</span>
            <span className="l-en">Privacy Policy</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--body)]">
            <span className="l-bs">Jasna i jednostavna pravila o tome kako Shape9 rukuje vašim podacima.</span>
            <span className="l-en">Clear and simple rules on how Shape9 handles your data.</span>
          </p>
        </div>

        <div className="s9-card p-8 sm:p-12 border-[var(--line)] bg-[var(--panel)] text-[var(--body)] rounded-3xl space-y-8">
          {/* SECTION 1 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3">
              <span className="l-bs">1. Ko obrađuje vaše podatke</span>
              <span className="l-en">1. Who processes your data</span>
            </h2>
            <p className="mb-2 text-sm sm:text-base">
              <span className="l-bs">Rukovalac obrade podataka je pravno lice:</span>
              <span className="l-en">The data controller is the legal entity:</span>
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-sm sm:text-base">
              <li><strong>{COMPANY.legalName}</strong></li>
              <li>{CONTACT.address}, {CONTACT.country}</li>
              <li>Email: <a href={`mailto:${CONTACT.email}`} className="text-[var(--cyan)] hover:underline focus-ring">{CONTACT.email}</a></li>
            </ul>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3">
              <span className="l-bs">2. Podaci koje unesete u kontakt formu</span>
              <span className="l-en">2. Data you enter in the contact form</span>
            </h2>
            <p className="mb-3 text-sm sm:text-base">
              <span className="l-bs">Kada popunite kontakt formu na našoj stranici, prikupljamo sljedeće podatke:</span>
              <span className="l-en">When you fill out the contact form on our website, we collect the following data:</span>
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mb-4 text-sm sm:text-base">
              <li>
                <span className="l-bs">Opis vašeg problema ili upita</span>
                <span className="l-en">Description of your problem or enquiry</span>
              </li>
              <li>
                <span className="l-bs">Ime vaše firme</span>
                <span className="l-en">Your company name</span>
              </li>
              <li>
                <span className="l-bs">Vaš kontakt (email adresa ili broj telefona)</span>
                <span className="l-en">Your contact (email address or phone number)</span>
              </li>
              <li>
                <span className="l-bs">Tehničke informacije o slanju (stranica sa koje šaljete i izabrani jezik)</span>
                <span className="l-en">Technical submission info (page of origin and selected language)</span>
              </li>
            </ul>
            <p className="mb-3 text-sm sm:text-base">
              <span className="l-bs">Ove podatke koristimo isključivo da bismo vam odgovorili na upit i pripremili konkretan prijedlog saradnje. Podatke ne koristimo za slanje masovnih reklamnih poruka, ne prodajemo ih i ne dijelimo sa trećim stranama u marketinške svrhe.</span>
              <span className="l-en">We use this data exclusively to respond to your enquiry and prepare a concrete proposal. We do not use this data for marketing newsletters, nor do we sell or share it with third parties for marketing purposes.</span>
            </p>
            <p className="text-sm sm:text-base">
              <span className="l-bs">Poruke se dostavljaju putem provajdera kontakt forme direktno na naš službeni email. Podatke čuvamo tokom trajanja komunikacije i najduže dvije godine od posljednjeg kontakta, ili kraće ukoliko zatražite njihovo brisanje.</span>
              <span className="l-en">Messages are delivered via a secure form service directly to our official email inbox. We store this data for the duration of contact and at most two years after last contact, or sooner if you request its deletion.</span>
            </p>
          </section>

          {/* SECTION 3: GDPR statement */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3">
              <span className="l-bs">3. Podaci klijenata u našim proizvodima</span>
              <span className="l-en">3. Client data inside our products</span>
            </h2>
            <div className="p-4 rounded-xl bg-[rgba(var(--cyan-rgb),0.06)] border border-[rgba(var(--cyan-rgb),0.2)] mb-4 font-semibold text-[var(--ink)] text-sm sm:text-base">
              <span className="l-bs">
                Snimci se obrađuju enkriptovano, u mirovanju i u prenosu, i brišu se po retenciji koju klijent definiše. Radni sloj su transkripti i analize.
              </span>
              <span className="l-en">
                Recordings are processed encrypted, at rest and in transit, and deleted on the retention schedule the client defines. The working layer is transcripts and analysis.
              </span>
            </div>
            <p className="text-sm sm:text-base">
              <span className="l-bs">Prije početka rada sa bilo kojim klijentom, u pisanoj formi dostavljamo detaljan tehnički opis obrade podataka, lokacije poslužitelja, pristupne dozvole i spisak svih podobrađivača uključenih u rad sistema.</span>
              <span className="l-en">Before starting work with any client, we provide a written description of processing, server locations, access permissions, and the list of all sub-processors involved.</span>
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3">
              <span className="l-bs">4. Mjerenje posjeta</span>
              <span className="l-en">4. Visit measurement</span>
            </h2>
            <p className="text-sm sm:text-base">
              <span className="l-bs">Na ovoj web stranici možemo mjeriti ukupan broj posjeta radi poboljšanja korisničkog iskustva. Podaci o posjetama se ne povezuju sa vašim ličnim identitetom i ne koriste se za profilisanje.</span>
              <span className="l-en">On this website we may measure aggregate visit counts to improve user experience. Visit data is not linked to your personal identity and is not used for profiling.</span>
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-3">
              <span className="l-bs">5. Vaša prava</span>
              <span className="l-en">5. Your rights</span>
            </h2>
            <p className="mb-3 text-sm sm:text-base">
              <span className="l-bs">U svakom trenutku imate pravo zatražiti:</span>
              <span className="l-en">At any time you have the right to request:</span>
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-sm sm:text-base">
              <li>
                <span className="l-bs">Uvid u podatke koje čuvamo o vama</span>
                <span className="l-en">Access to the data we store about you</span>
              </li>
              <li>
                <span className="l-bs">Ispravku netačnih podataka</span>
                <span className="l-en">Correction of inaccurate data</span>
              </li>
              <li>
                <span className="l-bs">Trajno brisanje vaših podataka</span>
                <span className="l-en">Permanent deletion of your data</span>
              </li>
            </ul>
            <p className="text-sm sm:text-base">
              <span className="l-bs">Za ostvarivanje vaših prava pišite nam na <a href={`mailto:${CONTACT.email}`} className="text-[var(--cyan)] hover:underline focus-ring">{CONTACT.email}</a>. Odgovorićemo u roku od najviše 30 dana.</span>
              <span className="l-en">To exercise your rights write to us at <a href={`mailto:${CONTACT.email}`} className="text-[var(--cyan)] hover:underline focus-ring">{CONTACT.email}</a>. We will reply within 30 days.</span>
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
};
