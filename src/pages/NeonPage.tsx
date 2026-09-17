import React from 'react';
import { AlertTriangle, BarChart3, Image, Sparkles, Users } from 'lucide-react';

import { ShortProductPage } from '../components/ShortProductPage';

/* Hue 351, a light hot pink. A neon sign exists for one reason, to be
   looked at, which is the whole job of a rich campaign. Separated from Iris
   by lightness as well as hue, because 29 degrees alone reads as two pinks
   at icon size. Contrast on the ground is 10.7:1. */
const ACCENT = '#FCA5CD';
const ACCENT_RGB = '252, 165, 205';

interface NeonPageProps {
  onNavigate?: (path: string) => void;
}

export const NeonPage: React.FC<NeonPageProps> = ({ onNavigate }) => (
  <ShortProductPage
    name="Neon"
    accent={ACCENT}
    accentRgb={ACCENT_RGB}
    badgeIcon={Sparkles}
    badgeBs="Viber kampanje"
    badgeEn="Viber campaigns"
    h1Bs={['Ponuda s vizualom, usmjerena tačno onima kojima je', 'namijenjena.']}
    h1En={['An offer with a picture, aimed at exactly the people it was meant', 'for.']}
    questionBs={'„Koliko je kupaca primilo Vašu posljednju ponudu bez ikakvog interesa za nju?"'}
    questionEn={'"How many people got your last offer with no interest in it at all?"'}
    ledeBs="Kada svi dobiju istu ponudu, dio kupaca se odjavi s liste. Ne zato što ne žele kupovati kod Vas, već zato što im taj konkretan artikal ne treba."
    ledeEn="When everyone gets the same offer, some of them leave the list. Not because they do not want to buy from you, but because they do not want that particular thing."
    ctaShortBs="Recite nam koga ciljate"
    ctaShortEn="Tell us who you are aiming at"
    sections={[
      {
        id: 'sta-radi',
        headBs: 'Šta sistem donosi',
        headEn: 'What the system brings',
        cards: [
          {
            id: 'vizual',
            icon: Image,
            tBs: 'Fotografija, tekst i link u jednoj poruci',
            tEn: 'Photo, text and link in one message',
            bs: 'Umjesto suvog opisa, kupac odmah vidi proizvod.',
            en: 'Instead of a dry description, the customer sees the product itself.',
          },
          {
            id: 'segment',
            icon: Users,
            tBs: 'Segmentiranje publike',
            tEn: 'The audience gets split',
            bs: 'Ponuda ide onima kojima odgovara, po tome šta su ranije kupovali kod Vas.',
            en: 'The offer goes to a chosen group, based on what they bought from you before.',
          },
          {
            id: 'rezultati',
            icon: BarChart3,
            tBs: 'Praćenje rezultata kampanje',
            tEn: 'The campaign is measured',
            bs: 'Pregled ko je poruku primio, ko otvorio, a ko kliknuo na link.',
            en: 'Who received it, who opened it, and who followed the link.',
          },
        ],
      },
      {
        id: 'granice',
        badgeIcon: AlertTriangle,
        badgeBs: 'Prije nego počnete',
        badgeEn: 'Before you start',
        headBs: 'Šta je važno znati unaprijed',
        headEn: 'What is worth knowing in advance',
        tone: 'note',
        cards: [
          {
            id: 'registracija',
            tBs: 'Registracija zvaničnog pošiljaoca je obavezna',
            tEn: 'The sender has to be registered first',
            bs: 'Provjera brenda traje i ne završi se za jedno popodne.',
            en: 'Verifying the brand takes a certain amount of time and is not finished in an afternoon.',
          },
          {
            id: 'podaci',
            tBs: 'Segmentacija vrijedi onoliko koliko vrijede Vaši podaci',
            tEn: 'The split is only as good as your data',
            bs: 'Ako o kupcu imate samo broj telefona, poruka opet ide svima. Neon najviše vrijedi kad je povežete sa sistemom koji već pamti šta je ko kupovao.',
            en: 'If all you hold on a customer is a phone number, the message goes to everyone again. Neon pays back fully when it is joined to a system that already records habits and past purchases.',
          },
        ],
      },
    ]}
    ctaHeadBs="Recite nam koga želite pogoditi i kakvu ponudu spremate"
    ctaHeadEn="Tell us who you want to reach and what the offer is"
    ctaBodyBs="Iz toga se vidi koliko publiku možete podijeliti sa podacima koje danas imate."
    ctaBodyEn="That shows how far the audience can be split with the data you hold today."
    onNavigate={onNavigate}
  />
);
