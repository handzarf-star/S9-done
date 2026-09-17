import React from 'react';
import { Bot, MessagesSquare, ShieldQuestion, SquareAsterisk } from 'lucide-react';

import { ShortProductPage } from '../components/ShortProductPage';

/* Hue 320, a deep orchid. Darker and more saturated than Neon's pink,
   because hue alone was not enough to tell the two apart on a 13 pixel dot
   in the product menu. Contrast on the ground is 5.8:1, the lowest of the
   family and still well clear of the 4.5 minimum for the 10px label. */
const ACCENT = '#C661DC';
const ACCENT_RGB = '198, 97, 220';

interface IrisPageProps {
  onNavigate?: (path: string) => void;
}

export const IrisPage: React.FC<IrisPageProps> = ({ onNavigate }) => (
  <ShortProductPage
    name="Iris"
    accent={ACCENT}
    accentRgb={ACCENT_RGB}
    badgeIcon={Bot}
    badgeBs="AI asistent za interne podatke"
    badgeEn="AI assistant for internal data"
    h1Bs={['Postavite pitanje asistentu i dobijate tačan podatak u', 'sekundi.']}
    h1En={['Ask the assistant a question and get the exact figure in', 'seconds.']}
    questionBs={'„Koliko Vam radnih sati treba da dođete do jednog jedinog broja ili podatka?"'}
    questionEn={'"How many working hours does it take you to get hold of one single figure?"'}
    ledeBs="Pitanje je potpuno jednostavno: kolika je bila prodaja prošle sedmice u poređenju s istom sedmicom prošle godine. Odgovor se već nalazi u bazi, ali put do njega je dug jer neko mora sjesti, ručno pretražiti tabele i poslati Vam izvještaj tek kasnije. Iris funkcioniše kao digitalni analitičar dostupan u svakom trenutku: napišete upit prirodnim govorom, bez poznavanja formula ili SQL koda, a sistem u nekoliko sekundi pronalazi tačan podatak direktno iz Vaših evidencija, bez nagađanja i popunjavanja rupa pretpostavkama."
    ledeEn="The question could not be simpler. What were sales last week against the same week a year ago. The answer is already in the database, but the way to it is long, because somebody has to sit down, search the tables by hand and send you the report later. Iris works as an analyst available at any hour: you write the question in plain speech, with no formulas and no SQL, and in a few seconds it finds the exact figure in your own records, without guessing and without filling gaps with assumptions."
    ctaShortBs="Zakažite demonstraciju asistenta"
    ctaShortEn="Book a demonstration"
    sections={[
      {
        id: 'problem',
        headBs: 'Podatak postoji, ali put do njega ne.',
        headEn: 'The number exists. The way to it does not.',
        wide: true,
        leadBs: [
          'Izvještaji se pripremaju za pitanja koja je neko već ranije postavio. Za pitanje koje Vam padne na pamet danas izvještaj ne postoji, pa je potreban čovjek koji će ga ručno napraviti.',
        ],
        leadEn: [
          'Reports get prepared for questions somebody already asked. For the question that occurs to you today there is no report, so it takes a person to build one by hand.',
        ],
      },
      {
        id: 'sta-radi',
        headBs: 'Šta Iris omogućava',
        headEn: 'What Iris does',
        cards: [
          {
            id: 'jezik',
            icon: MessagesSquare,
            tBs: 'Pitate običnim jezikom',
            tEn: 'You ask in plain words',
            bs: 'Bez formula i komplikovanih filtera. Napišete pitanje, dobijete broj.',
            en: 'No formulas and no complicated filters. Write the question, get the number.',
          },
          {
            id: 'kontekst',
            icon: SquareAsterisk,
            tBs: 'Razgovor zadržava kontekst',
            tEn: 'The conversation keeps its place',
            bs: 'Možete nastaviti, suziti pitanje ili tražiti isto za drugi period, bez da počinjete ispočetka.',
            en: 'You can carry on, narrow the parameters, or ask for the same comparison over another period without starting again.',
          },
          {
            id: 'izvor',
            icon: ShieldQuestion,
            tBs: 'Odgovara isključivo iz Vaših podataka',
            tEn: 'It answers only from your data',
            bs: 'Iris ne nagađa i ne popunjava praznine pretpostavkama. Ako traženog broja nema u bazi, to otvoreno i kaže.',
            en: 'Iris does not guess and does not fill gaps with assumptions. If the number is not in the database, it says so.',
          },
        ],
      },
      {
        id: 'granica',
        badgeIcon: ShieldQuestion,
        badgeBs: 'Granica',
        badgeEn: 'The boundary',
        headBs: 'Jasno definisana granica, s razlogom',
        headEn: 'A clearly drawn boundary, and there is a reason for it',
        noteBs:
          'Iris poznaje isključivo Vaše poslovanje. Ne odgovara na opšta pitanja i nije asistent za sve i svašta. Oslanja se na baze koje već imate, pa podrazumijeva da ti podaci postoje i da su uredni. Ako nisu, prvo sređujemo izvore.',
        noteEn:
          'Iris knows your business and nothing else. It does not answer general questions and it is not an assistant for everything. It leans on the databases you already have, which assumes that data exists and is in order. If it is not, we put the sources right first.',
      },
    ]}
    ctaHeadBs="Pošaljite nam poslovno pitanje koje najčešće postavljate svom timu"
    ctaHeadEn="Send us the business question you ask your team most often"
    ctaBodyBs="Iz jednog pitanja se vidi ima li podatak koji na njega odgovara i u kakvom je stanju."
    ctaBodyEn="One question shows whether the data that answers it exists, and what state it is in."
    onNavigate={onNavigate}
  />
);
