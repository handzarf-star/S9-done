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
    h1Bs={['Upravljanje prodajom od prve poruke do', 'naplate.']}
    h1En={['Your sales, from the first message to the', 'money.']}
    questionBs={'„Koliko je narudžbi pristiglo danas?"'}
    questionEn={'"How many orders came in today?"'}
    ledeBs="Većina firmi na to ne može odgovoriti odmah. Dio narudžbi stigne putem Instagrama, dio telefonom, dio preko web stranice, a svaki kanal vodi svoju zasebnu evidenciju."
    ledeEn="Most companies cannot answer that on the spot. Some orders arrive through Instagram, some by phone, some through the website, and every channel keeps its own separate record."
    ctaShortBs="Opišite kako narudžbe stižu"
    ctaShortEn="Tell us how orders reach you"
    sections={[
      {
        id: 'problem',
        headBs: 'Tri prodajna kanala, tri odvojene evidencije i Vi ste bez uvida u rezultate poslovanja.',
        headEn: 'Three sales channels, three fragmented lists, zero real-time visibility.',
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
        badgeBs: 'Životni ciklus svake narudžbe',
        badgeEn: 'End-to-end order lifecycle',
        headBs: 'Deset ključnih faza od prvog upita kupca do naplate i dostave',
        headEn: 'Ten operational stages from the initial customer inquiry to final delivery',
        steps: [
          { bs: 'Prvi upit kupca i automatski unos u sistem', en: 'Customer inquiry captured and logged' },
          { bs: 'Verifikacija uplate i finansijski status', en: 'Payment status verification' },
          { bs: 'Automatski podsjetnik ukoliko uplata kasni', en: 'Automated payment reminder' },
          { bs: 'Potvrda narudžbe i rezervacija artikala', en: 'Order confirmation and stock reservation' },
          { bs: 'Prosljeđivanje na pakovanje i pripremu', en: 'Fulfillment and packaging handoff' },
          { bs: 'Kurirska služba preuzima pošiljku', en: 'Courier pickup and handover' },
          { bs: 'Evidencija u distributivnom centru kurira', en: 'Logistics hub transit tracking' },
          { bs: 'Pokušaj isporuke na adresu kupca', en: 'Out for delivery and doorstep attempt' },
          { bs: 'Zaključena naplata i zatvaranje računa', en: 'Payment collection and settled order' },
          { bs: 'Obrada povrata i reklamacija bez zastoja', en: 'Return processing and dispute resolution' },
        ],
        noteBs:
          'Hive funkcioniše kao operativni CRM gdje svaki korak nosi tačan datum, status i odgovornu osobu. Kada klijent pita šta se dešava s njegovom narudžbom, odgovor je u sekundi na ekranu umjesto u nečijem sjećanju ili privatnim porukama.',
        noteEn:
          'Hive operates as an execution-focused CRM where every touchpoint logs an exact timestamp, status, and owner. When a customer asks about their order, the answer is instantly on screen, not buried in chat apps or personal memory.',
      },
      {
        id: 'custom',
        badgeIcon: Wrench,
        badgeBs: 'Razvoj po mjeri Vaše prodaje',
        badgeEn: 'Custom CRM architecture',
        headBs: 'Ovo nije generički CRM koji se pali na prekidač, gradimo ga oko načina na koji Vi stvarno prodajete.',
        headEn: 'This is not a generic off-the-shelf CRM. We engineer it around how your business actually sells.',
        wide: true,
        leadBs: [
          'Sistem pravimo prema tome kako Vi prodajete. Navedenih deset koraka predstavlja logički okvir, a ne fiksni šablon. Koliko faza postoji, kako se zovu i ko ima pristup kojim podacima, sve to definišemo prije nego što napišemo prvu liniju koda.',
          'Uz jednu narudžbu dnevno sve pamtite iz glave. Uz stotinu ne. Ako je Vaš obim posla bliži jednoj narudžbi, ovo rješenje Vam još nije potrebno, i to ćemo Vam otvoreno reći.',
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
