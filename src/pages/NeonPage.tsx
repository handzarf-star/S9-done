import React from 'react';
import { AlertTriangle, BarChart3, Image, Sparkles, Users } from 'lucide-react';

import { ShortProductPage } from '../components/ShortProductPage';

/* Hue 351, a light hot pink. A neon sign exists for one reason, to be
   looked at, which is the whole job of a rich campaign. Separated from Aris
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
    badgeBs="Ciljane Viber poruke kupcima"
    badgeEn="Targeted Viber messages"
    h1Bs={['Ponuda sa vizualom, usmjerena tačno profilu kupca koji joj', 'odgovara.']}
    h1En={['An offer with a picture, aimed at exactly the customer profile it', 'suits.']}
    questionBs={'„Koliko se kupaca odjavilo s Vaše liste samo zato što su dobili ponudu koja ih uopšte ne zanima?"'}
    questionEn={'"How many people left your list simply because they got an offer that had nothing to do with them?"'}
    ledeBs="Kada svi kupci prime potpuno istu poruku, dio kupaca gubi interes i odjavljuje se s liste, ne zato što ne žele kupovati kod Vas. Neon kombinuje vizual, prodajni tekst i direktan link, te poruke automatski usmjerava prema historiji ranijih kupovina i profilu korisnika."
    ledeEn="When every customer gets the identical message, some of them lose interest and leave the list, and it is not because they do not want to buy from you. Neon puts the picture, the selling line and a direct link in one message, and aims it by what each person bought before."
    ctaShortBs="Zakažite demonstraciju"
    ctaShortEn="Book a demonstration"
    sections={[
      {
        id: 'sta-radi',
        band: true,
        headBs: 'Ključne mogućnosti platforme',
        headEn: 'What the platform delivers',
        cards: [
          {
            id: 'vizual',
            icon: Image,
            tBs: 'Bogati vizuelni format: fotografija, tekst i direktan link',
            tEn: 'Rich media messaging: image, copy, and direct link',
            bs: 'Umjesto suvog tekstualnog opisa, kupac odmah vidi fotografiju proizvoda uz jasnu prodajnu poruku i poziv na akciju.',
            en: 'Instead of plain text, customers immediately see the actual product visual paired with compelling copy and a direct call to action.',
          },
          {
            id: 'segment',
            icon: Users,
            tBs: 'Precizno profilisana segmentacija publike',
            tEn: 'Precision audience segmentation',
            bs: 'Ponudu šaljete isključivo ciljanoj grupi kupaca na osnovu njihovih prethodnih kupovina, čime povećavate konverziju i štitite bazu od odjava.',
            en: 'Deliver targeted promotions based on verified purchase history, maximizing conversions while protecting your subscriber list from opt-outs.',
          },
          {
            id: 'rezultati',
            icon: BarChart3,
            tBs: 'Analitika isporuke i angažmana u realnom vremenu',
            tEn: 'Real-time engagement and delivery analytics',
            bs: 'Egzaktan uvid u stope isporuke, pročitane poruke i klikove na link, što Vam omogućava precizno mjerenje stvarnog povrata investicije.',
            en: 'Clear tracking across delivered messages, opens, and link clicks, giving you verified data to calculate true campaign ROI.',
          },
        ],
      },
      {
        id: 'granice',
        badgeIcon: AlertTriangle,
        badgeBs: 'Važno prije pokretanja',
        badgeEn: 'Operational realities',
        headBs: 'Ključne činjenice koje otvoreno naglašavamo prije početka saradnje',
        headEn: 'What you need to know before launching your first campaign',
        tone: 'note',
        cards: [
          {
            id: 'registracija',
            tBs: 'Obavezna verifikacija službenog poslovnog profila',
            tEn: 'Official business sender verification',
            bs: 'Zvanična verifikacija brenda kod Vibera zahtijeva sigurnosnu proceduru i odobrenje, što znači da se tehnička postavka ne može završiti za jedno popodne.',
            en: 'Official Viber sender verification requires compliance and security clearance, meaning onboarding takes structured setup and cannot be completed in an afternoon.',
          },
          {
            id: 'podaci',
            tBs: 'Učinak kampanje zavisi od kvaliteta Vaših podataka',
            tEn: 'Campaign performance depends directly on data quality',
            bs: 'Ukoliko u bazi imate samo brojeve telefona bez historije narudžbi, ponuda se ponovo šalje svima. Neon ostvaruje puni komercijalni potencijal tek kada se uveže sa sistemom koji već bilježi navike i prethodne kupovine.',
            en: 'If your contact list holds only raw phone numbers without transaction history, your campaign remains an untargeted blast. Neon delivers maximum revenue when integrated with a system that tracks individual customer habits and purchase records.',
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
