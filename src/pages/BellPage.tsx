import React from 'react';
import { BarChart3, Headphones, PhoneCall, UserSquare2, Waves } from 'lucide-react';

import { ShortProductPage } from '../components/ShortProductPage';

interface BellPageProps {
  onNavigate?: (path: string) => void;
}

/* Hue 125, the gap between Atlas's gold and Libra's green. The link is the
   one every phone on earth already makes: the button you press to answer a
   call is green. Contrast on the ground is 10.3:1. */
const ACCENT = '#9CCB24';
const ACCENT_RGB = '156, 203, 36';

export const BellPage: React.FC<BellPageProps> = ({ onNavigate }) => (
  <ShortProductPage
    name="Bell"
    accent={ACCENT}
    accentRgb={ACCENT_RGB}
    badgeIcon={Headphones}
    badgeBs="Cloud telefonija"
    badgeEn="Cloud telephony"
    h1Bs={['Telefonski sistem koji prepoznaje pozivaoca i pamti svaki', 'razgovor.']}
    h1En={['A phone system that knows who is calling and remembers every', 'conversation.']}
    questionBs={'„Ko je zvao jučer poslije pet?"'}
    questionEn={'"Who rang after five yesterday?"'}
    ledeBs="Uz klasičnu telefonsku centralu u ormaru, na to pitanje nema odgovora. Propušten poziv ne ostavlja trag, a obavljeni razgovor ostaje isključivo u sjećanju agenta."
    ledeEn="With an exchange sitting in a cupboard, that question has no answer. A missed call leaves no trace, and a call that was taken lives only in the agent's memory."
    ctaShortBs="Pokažite nam kako zovete"
    ctaShortEn="Show us how you take calls"
    sections={[
      {
        id: 'problem',
        headBs: 'Klasična centrala ne zna ništa o Vašim klijentima.',
        headEn: 'A traditional exchange knows nothing about your customers.',
        wide: true,
        leadBs: [
          'Telefon zazvoni, agent podiže slušalicu i razgovor kreće od nule: ko zove, šta je tražio prošli put i da li se već javljao ove sedmice. Sve te informacije postoje u Vašem poslovanju, ali se ne nalaze na ekranu ispred agenta.',
        ],
        leadEn: [
          'The phone rings, someone picks up, and the conversation starts from nothing. Who is this, what did they ask for last time, have they already rung this week. All of it exists somewhere in the business. None of it is on the screen in front of them.',
        ],
      },
      {
        id: 'sta-radi',
        headBs: 'Šta sistem omogućava',
        headEn: 'What the system does',
        cards: [
          {
            id: 'jedno-mjesto',
            icon: PhoneCall,
            tBs: 'Dolazni i odlazni pozivi na jednom mjestu',
            tEn: 'Calls in and out, in one place',
            bs: 'Cijeli tim radi kroz jedinstven sistem, bez obzira na lokaciju na kojoj se nalazi.',
            en: 'The whole team works through one system, wherever each person happens to be sitting.',
          },
          {
            id: 'profil',
            icon: UserSquare2,
            tBs: 'Profil klijenta se otvara automatski',
            tEn: 'The customer record opens by itself',
            bs: 'Čim telefon zazvoni, agent na ekranu vidi ko zove i šta je dogovoreno u prethodnom kontaktu.',
            en: 'The moment the phone rings, the agent can see who is calling and what was agreed the last time.',
          },
          {
            id: 'snimak',
            icon: BarChart3,
            tBs: 'Svaki poziv ima snimak i tačnu statistiku',
            tEn: 'Every call has a recording and a figure',
            bs: 'Trajanje razgovora, ishod, ko se javio a ko propustio poziv, uz egzaktne metrike po danu i agentu.',
            en: 'Length, outcome, who answered and who let it ring, with exact figures by day and by agent.',
          },
        ],
      },
      {
        id: 'pulse',
        badgeIcon: Waves,
        badgeBs: 'Ide uz Pulse',
        badgeEn: 'Sits next to Pulse',
        headBs: 'Bell nosi pozive, Pulse ih analizira.',
        headEn: 'Bell carries the calls. Pulse reads them.',
        noteBs:
          'Bell nosi i usmjerava pozive, dok Pulse analizira šta je na njima izgovoreno. Jedan sistem osigurava stabilnu liniju, drugi vrši kontrolu kvaliteta. Rade odvojeno, a zajedno pokrivaju kompletan proces od prvog zvona do detaljnog izvještaja.',
        noteEn:
          'Bell carries and routes the calls, while Pulse analyses what was said on them. One keeps the line up, the other checks the quality of what went down it. They run separately, and together they cover the whole way from the first ring to a detailed report.',
      },
    ]}
    ctaHeadBs="Pokažite nam kako danas upravljate pozivima"
    ctaHeadEn="Show us how you handle calls today"
    ctaBodyBs="Navedite broj agenata i opremu koju trenutno koristite."
    ctaBodyEn="Tell us how many agents you have and what you are running now."
    onNavigate={onNavigate}
  />
);
