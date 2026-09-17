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
        headBs: 'Šta sistem omogućava',
        headEn: 'What the system does',
        cards: [
          {
            id: 'sender',
            icon: Signature,
            tBs: 'Pošiljalac je ime Vaše kompanije',
            tEn: 'The sender is your company name',
            bs: 'Na ekranu telefona prikazuje se naziv Vašeg brenda, a ne nepoznati broj.',
            en: 'What shows on the phone is your brand, not a number nobody recognises.',
          },
          {
            id: 'termin',
            icon: CalendarClock,
            tBs: 'Slanje odmah ili u zakazan termin',
            tEn: 'Now, or at a time you choose',
            bs: 'Kampanju pripremite danas, a pošaljete je u subotu ujutro ili kad Vama odgovara.',
            en: 'Prepare the campaign today and schedule it for Saturday morning, or for whenever suits you.',
          },
          {
            id: 'klikovi',
            icon: MousePointerClick,
            tBs: 'Precizan uvid u klikove',
            tEn: 'You see the clicks',
            bs: 'Link u poruci se prati, pa tačno znate je li ponuda dotakla nekoga ili nije.',
            en: 'The link inside the message is tracked, so you know whether the offer reached anyone and whether it moved them.',
          },
        ],
      },
      {
        id: 'granice',
        badgeIcon: AlertTriangle,
        badgeBs: 'Prije nego počnete',
        badgeEn: 'Before you start',
        headBs: 'Tri činjenice koje otvoreno naglašavamo prije početka',
        headEn: 'Three things we say plainly before you begin',
        tone: 'note',
        cards: [
          {
            id: 'jednosmjerno',
            tBs: 'Komunikacija teče u jednom smjeru',
            tEn: 'It only goes one way',
            bs: 'Kupac ne može odgovoriti na ovaj tip poruke. Za dvosmjernu komunikaciju koristi se drugi kanal.',
            en: 'The customer cannot reply to this kind of message. A conversation needs a different channel.',
          },
          {
            id: 'rich',
            tBs: 'Dugačke poruke sa slikom nose rizik',
            tEn: 'Long messages with a picture carry a risk',
            bs: 'Moguće je, ali je veća šansa da mreža poruku označi kao neželjenu i zaustavi je.',
            en: 'It can be done, but the odds rise that the networks mark it as unwanted and stop it before it lands.',
          },
          {
            id: 'baza',
            tBs: 'Samostalno slanje bez baze ima manju vrijednost',
            tEn: 'On its own, without a database, it is worth less',
            bs: 'Najviše vrijedi kad je povežete sa sistemom koji već čuva historiju kupaca, jer tada u bazi nisu brojevi nego ljudi koji su nešto kupili.',
            en: 'It returns most when it is joined to a system that already holds the history, because then the list is not phone numbers but people with a record of what they bought.',
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
