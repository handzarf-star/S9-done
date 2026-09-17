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
        headBs: 'Klasična telefonska centrala nema nikakav uvid u Vaše klijente.',
        headEn: 'Legacy phone systems operate with zero customer context.',
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
        headBs: 'Ključne mogućnosti sistema',
        headEn: 'What the platform delivers',
        cards: [
          {
            id: 'jedno-mjesto',
            icon: PhoneCall,
            tBs: 'Objedinjeni dolazni i odlazni pozivi',
            tEn: 'Unified inbound and outbound calling',
            bs: 'Cijeli tim radi kroz jedinstvenu platformu, bez obzira na to odakle se javlja.',
            en: 'Your entire team works from a single platform, no matter where they operate.',
          },
          {
            id: 'profil',
            icon: UserSquare2,
            tBs: 'Automatski prikaz historije klijenta',
            tEn: 'Instant customer context on every ring',
            bs: 'Čim telefon zazvoni, agent na ekranu vidi identitet sagovornika i sve ranije dogovore.',
            en: 'The moment the phone rings, your agent sees the caller identity and complete conversation history.',
          },
          {
            id: 'snimak',
            icon: BarChart3,
            tBs: 'Potpuni audio zapis i metrika za svaki poziv',
            tEn: 'Complete call recordings and operational metrics',
            bs: 'Trajanje, ishod razgovora, evidentirani propušteni pozivi i analitika po agentu.',
            en: 'Call duration, outcomes, missed call tracking, and clear performance data by agent and by day.',
          },
        ],
      },
      {
        id: 'pulse',
        badgeIcon: Waves,
        badgeBs: 'Pulse kao partner',
        badgeEn: 'Built to pair with Pulse',
        headBs: 'Bell ostvaruje pozive, Pulse ih analizira.',
        headEn: 'Bell powers the line, Pulse analyzes the conversation.',
        noteBs:
          'Bell osigurava stabilnu vezu i usmjerava pozive, dok Pulse automatski provjerava izgovoreni sadržaj. Jedan sistem drži liniju, a drugi kontroliše poštovanje protokola. Rade samostalno, a zajedno pokrivaju cjelokupan proces, od prvog zvona do detaljnog izvještaja.',
        noteEn:
          'Bell manages routing and connectivity, while Pulse automatically audits spoken content. One maintains the line, the other verifies protocol compliance. They operate independently, yet together they cover the entire workflow, from the first ring to the executive report.',
      },
    ]}
    ctaHeadBs="Pokažite nam kako danas upravljate pozivima"
    ctaHeadEn="Show us how you handle calls today"
    ctaBodyBs="Recite nam koliko ljudi imate na telefonu i šta danas koristite."
    ctaBodyEn="Tell us how many agents you have and what you are running now."
    onNavigate={onNavigate}
  />
);
