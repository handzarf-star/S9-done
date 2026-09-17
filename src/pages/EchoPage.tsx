import React from 'react';
import { AlertTriangle, CalendarClock, MessageSquareText, MousePointerClick, Signature } from 'lucide-react';

import { ShortProductPage } from '../components/ShortProductPage';

/* Hue 190, turquoise. Sound and ripples, which is what an echo is.
   Contrast on the ground is 10.4:1. */
const ACCENT = '#29D1C9';
const ACCENT_RGB = '41, 209, 201';

interface EchoPageProps {
  onNavigate?: (path: string) => void;
}

export const EchoPage: React.FC<EchoPageProps> = ({ onNavigate }) => (
  <ShortProductPage
    name="Echo"
    accent={ACCENT}
    accentRgb={ACCENT_RGB}
    badgeIcon={MessageSquareText}
    badgeBs="SMS kampanje"
    badgeEn="SMS campaigns"
    h1Bs={['Jedna poruka, trenutan doseg do svih kupaca, uz tačan uvid ko ju je', 'otvorio.']}
    h1En={['One message, every customer at once, and you see exactly who', 'opened it.']}
    questionBs={'„Akcija počinje sutra, koliko Vaših kupaca zna za nju?"'}
    questionEn={'"The sale starts tomorrow. How many of your customers know?"'}
    ledeBs="Brojevi telefona postoje u tabeli ili unutar sistema. Između te tabele i kupca stoji samo to što nemate čime poslati svima odjednom."
    ledeEn="The phone numbers already exist, in a spreadsheet or inside a system. The only thing standing between that list and the customer is that nothing can send to all of them at once."
    ctaShortBs="Pošaljite nam svoju listu"
    ctaShortEn="Send us your list"
    sections={[
      {
        id: 'sta-radi',
        headBs: 'Ključne mogućnosti platforme',
        headEn: 'What the platform delivers',
        cards: [
          {
            id: 'sender',
            icon: Signature,
            tBs: 'Prepoznatljiv naziv Vašeg brenda kao pošiljalac',
            tEn: 'Branded sender ID on every message',
            bs: 'Korisnik na ekranu telefona odmah vidi naziv Vaše kompanije umjesto nepoznatog broja, što gradi povjerenje i povećava stopu otvaranja.',
            en: 'Your brand name appears directly on the recipient screen instead of an unknown number, building immediate trust and higher open rates.',
          },
          {
            id: 'termin',
            icon: CalendarClock,
            tBs: 'Trenutno slanje ili precizno zakazivanje termina',
            tEn: 'Instant delivery or scheduled campaign launches',
            bs: 'Pripremite kampanju radnim danom, a isporuku zakažite za subotu ujutro ili u tačan termin kada je odziv kupaca najveći.',
            en: 'Draft your campaign ahead of time and automate delivery for peak engagement windows, whether that is Saturday morning or an evening promotion.',
          },
          {
            id: 'klikovi',
            icon: MousePointerClick,
            tBs: 'Mjerljiva analitika i praćenje klikova',
            tEn: 'Real-time click tracking and engagement analytics',
            bs: 'Svaki link u poruci bilježi interakcije, pa u realnom vremenu vidite tačan broj otvaranja, klikova i stvaran interes za ponudu.',
            en: 'Every link is dynamically tracked, giving you clear visibility into recipient clicks, conversion intent, and campaign performance.',
          },
        ],
      },
      {
        id: 'granice',
        badgeIcon: AlertTriangle,
        badgeBs: 'Važno prije pokretanja',
        badgeEn: 'Operational realities',
        headBs: 'Tri tehničke činjenice koje otvoreno komuniciramo prije pokretanja kampanje',
        headEn: 'Three facts we state upfront before you launch',
        tone: 'note',
        cards: [
          {
            id: 'jednosmjerno',
            tBs: 'Jednosmjerni kanal za direktno obavještavanje',
            tEn: 'One-way outbound broadcast channel',
            bs: 'Kupci ne mogu slati povratne odgovore na ovu vrstu poruka. Ukoliko Vam je potreban dvosmjerni dijalog ili podrška korisnicima, za to koristimo namjenske kanale.',
            en: 'Recipients cannot reply directly to broadcast SMS. If your objective is two-way conversational support, that requires a dedicated communication channel.',
          },
          {
            id: 'rich',
            tBs: 'Tehnička ograničenja multimedijalnih poruka',
            tEn: 'Deliverability risks with long text and media',
            bs: 'Slanje multimedijalnog sadržaja je tehnički izvodivo, ali telekom operateri takve poruke znatno češće prepoznaju kao neželjene (spam) i blokiraju isporuku.',
            en: 'While sending rich media is technically feasible, carrier networks are far more likely to flag it as spam, compromising your delivery rates.',
          },
          {
            id: 'baza',
            tBs: 'Puna efikasnost postiže se integracijom sa bazom kupaca',
            tEn: 'Maximum ROI requires customer data integration',
            bs: 'SMS kampanje donose najveći povrat kada se povežu sa CRM sistemom koji već prati historiju kupovine. Tada poruke ne šaljete nasumičnim brojevima, već segmentiranim kupcima s jasnim profilom i navikama.',
            en: 'Outbound SMS yields the highest conversion when integrated with a CRM that tracks past purchase behavior. Your audience ceases to be raw phone numbers and becomes segmented buyers with verified transaction history.',
          },
        ],
      },
    ]}
    ctaHeadBs="Navedite veličinu baze kontakata i poruku koju želite poslati"
    ctaHeadEn="Tell us the size of your contact list and what you want to send"
    ctaBodyBs="Iz toga se vidi šta je moguće odmah, a šta traži da se baza prvo posloži."
    ctaBodyEn="That shows what is possible straight away, and what needs the list sorted out first."
    onNavigate={onNavigate}
  />
);
