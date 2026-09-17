import React from 'react';
import { Hexagon, Route, Wrench } from 'lucide-react';

import { ShortProductPage } from '../components/ShortProductPage';

interface HivePageProps {
  onNavigate?: (path: string) => void;
}

/* Hue 92, honey. A hive is hundreds of arrivals a day that all come back to
   one structure, which is the promise of the product in one picture.
   Contrast on the ground is 9.8:1. */
const ACCENT = '#DAB323';
const ACCENT_RGB = '218, 179, 35';

export const HivePage: React.FC<HivePageProps> = ({ onNavigate }) => (
  <ShortProductPage
    name="Hive"
    accent={ACCENT}
    accentRgb={ACCENT_RGB}
    badgeIcon={Hexagon}
    badgeBs="Prodajni procesi i narudžbe"
    badgeEn="Sales and orders"
    h1Bs={['Upravljanje narudžbom od prve poruke do', 'naplate.']}
    h1En={['One order, from the first message to the', 'money.']}
    questionBs={'„Koliko je narudžbi pristiglo danas?"'}
    questionEn={'"How many orders came in today?"'}
    ledeBs="Većina kompanija ne može odgovoriti na to pitanje u sekundi. Dio narudžbi stigne putem Instagrama, dio telefonom, dio preko web stranice, a svaki kanal vodi svoju zasebnu evidenciju."
    ledeEn="Most companies cannot answer that on the spot. Some orders arrive through Instagram, some by phone, some through the website, and every channel keeps its own separate record."
    ctaShortBs="Opišite kako narudžbe stižu"
    ctaShortEn="Tell us how orders reach you"
    sections={[
      {
        id: 'problem',
        headBs: 'Tri kanala, tri liste, bez jedinstvenog zbira.',
        headEn: 'Three channels, three lists, no single total.',
        wide: true,
        leadBs: [
          'Dok neko ručno ne sjedne i sve ne sabere, tačan zbir jednostavno ne postoji. A dok sabiranje traje, u međuvremenu već pristižu nove narudžbe.',
        ],
        leadEn: [
          'Until somebody sits down and adds it all up by hand, the exact total simply does not exist. And while they are adding, more orders have already come in.',
        ],
      },
      {
        id: 'koraci',
        badgeIcon: Route,
        badgeBs: 'Put jedne narudžbe',
        badgeEn: 'The path of one order',
        headBs: 'Deset faza kroz koje prolazi svaka narudžba',
        headEn: 'The ten stages every order goes through',
        steps: [
          { bs: 'Prvi kontakt kupca', en: 'The customer makes contact' },
          { bs: 'Provjera statusa uplate', en: 'Payment status is checked' },
          { bs: 'Automatski podsjetnik ukoliko uplata kasni', en: 'An automatic reminder if payment is late' },
          { bs: 'Potvrda narudžbe', en: 'The order is confirmed' },
          { bs: 'Slanje na pakovanje', en: 'Sent to be packed' },
          { bs: 'Preuzimanje od strane kurirske službe', en: 'Collected by the courier' },
          { bs: 'Ulazak pošiljke u distributivni centar', en: 'Into the courier’s distribution centre' },
          { bs: 'Pokušaj dostave na adresi', en: 'Delivery attempted at the address' },
          { bs: 'Konačna naplata', en: 'Final payment' },
          { bs: 'Povrat novca u slučaju opravdane reklamacije', en: 'A refund where the complaint is justified' },
        ],
        noteBs:
          'Svaki korak ima evidentiran status i datum. Kada kupac pita gdje se pošiljka nalazi, tačan odgovor je odmah na ekranu, a ne u nečijem sjećanju.',
        noteEn:
          'Every step carries a recorded status and a date. When a customer asks where their parcel is, the exact answer is on the screen, and not in somebody’s memory.',
      },
      {
        id: 'custom',
        badgeIcon: Wrench,
        badgeBs: 'Kako nastaje',
        badgeEn: 'How it gets built',
        headBs: 'Ovo se ne pali na prekidač, ovo se gradi prema Vašem načinu rada.',
        headEn: 'This is not switched on. This is built around how you work.',
        wide: true,
        leadBs: [
          'Sistem prilagođavamo Vašem specifičnom prodajnom modelu. Navedenih deset koraka predstavlja logički okvir, a ne fiksni šablon. Koliko faza postoji, kako se zovu i ko ima pristup kojim podacima, sve to definišemo prije nego što napišemo prvu liniju koda.',
          'Uz jednu narudžbu dnevno sve se može pamtiti i ručno. Uz stotinu narudžbi to više nije izvodivo. Ako je Vaš obim posla bliži jednoj narudžbi, ovo rješenje Vam još nije potrebno, i to ćemo Vam otvoreno reći.',
        ],
        leadEn: [
          'The system is fitted to your particular way of selling. The ten steps above are a logical frame, not a fixed template. How many stages there are, what each one is called and who can see what, all of that is settled before a first line of code is written.',
          'With one order a day everything can be held in someone’s head. With a hundred it cannot. If your volume is closer to the first, you do not need this yet, and we will tell you so plainly.',
        ],
      },
    ]}
    ctaHeadBs="Opišite nam kako narudžbe danas stižu do Vašeg tima"
    ctaHeadEn="Tell us how orders reach your team today"
    ctaBodyBs="Iz toga se vidi koliko kanala treba povezati i gdje se danas gubi vrijeme."
    ctaBodyEn="That alone shows how many channels have to be joined up, and where the time goes today."
    onNavigate={onNavigate}
  />
);
