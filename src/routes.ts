import { SITE_URL } from './config';

export type RouteKey = 'home' | 'pulse' | 'atlas' | 'sonar' | 'mode' | 'libra' | 'radovi' | 'radoviWms' | 'radoviMonad' | 'custom' | 'about' | 'privacy';

export interface RouteMeta {
  path: string;
  accent: string;
  accentRgb: string;
  accentDeep: string;
  title: {
    bs: string;
    en: string;
  };
  description: {
    bs: string;
    en: string;
  };
}

export const ROUTES: Record<RouteKey, RouteMeta> = {
  home: {
    path: '/',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'Shape9 · We Build Digital Experiences That Matter',
      en: 'Shape9 · We Build Digital Experiences That Matter',
    },
    description: {
      bs: 'Gradimo digitalna iskustva koja prave razliku. Pulse, Atlas, Sonar i Libra, plus rješenja po mjeri. Sarajevo, od 2015.',
      en: 'We Build Digital Experiences That Matter. Pulse, Atlas, Sonar and Libra, plus custom builds. Sarajevo, since 2015.',
    },
  },
  pulse: {
    path: '/pulse',
    accent: '#A98CFF',
    accentRgb: '169, 140, 255',
    accentDeep: '#6D3BF0',
    title: {
      bs: 'Shape9 Pulse · provjera svakog poziva, a ne slučajnog uzorka',
      en: 'Shape9 Pulse · every call checked, not a two percent sample',
    },
    description: {
      bs: 'Kontrola kvaliteta fizički presluša tek dva od sto poziva. Pulse automatski provjerava svaki obavljeni razgovor prema Vašim pravilima i isporučuje pregledan izvještaj.',
      en: 'Your QA team gets to two calls in a hundred. Pulse checks every recorded call against your own rules and returns a clear report.',
    },
  },
  atlas: {
    path: '/atlas',
    accent: '#FFA658',
    accentRgb: '255, 166, 88',
    accentDeep: '#E3831F',
    title: {
      bs: 'Shape9 Atlas · skladište u kojem roba prestaje nestajati',
      en: 'Shape9 Atlas · a warehouse where stock stops going missing',
    },
    description: {
      bs: 'Tačno stanje zaliha, tačna lokacija police i automatizovano ponovno naručivanje na svim lokacijama. Kod jednog klijenta, tačnost zaliha porasla je sa 81 na 99,4 posto.',
      en: 'Exact stock, exact location and reorder point across every site. With one client, inventory accuracy went from 81 to 99.4 percent.',
    },
  },
  sonar: {
    path: '/sonar',
    accent: '#35B6F0',
    accentRgb: '53, 182, 240',
    accentDeep: '#1180C5',
    title: {
      bs: 'Shape9 Sonar · autonomni nadzor poslovnih parametara dok Vi vodite firmu',
      en: 'Shape9 Sonar · someone watching the numbers when nobody is looking',
    },
    description: {
      bs: 'Sonar neprekidno prati Vaše podatke, detektuje devijacije i automatski otvara radni nalog prije nego što nastane finansijski minus. Otkrio je tihi pad posjeta za samo 15 minuta.',
      en: 'Sonar watches your numbers on its own, spots deviations and opens a ticket before the miss gets expensive. It caught a silent traffic drop in 15 minutes.',
    },
  },
  mode: {
    path: '/mode',
    accent: '#FF6170',
    accentRgb: '255, 97, 112',
    accentDeep: '#D6293D',
    title: {
      bs: 'Shape9 Mode · razvijeno za butike i maloprodajne lance',
      en: 'Shape9 Mode · built for boutiques',
    },
    description: {
      bs: 'Od skeniranja artikla do vrata kupca, bez papira i Excel tabela. Kasa, magacin i maloprodajni objekti uvezani u realnom vremenu.',
      en: 'From scanning an item to the customer\'s door, with no paper and no spreadsheet. Till, stockroom and shops in one system, with stock that changes at the moment of sale.',
    },
  },
  libra: {
    path: '/libra',
    accent: '#3DD68C',
    accentRgb: '61, 214, 140',
    accentDeep: '#17A56B',
    title: {
      bs: 'Shape9 Libra · pošta i računi koji se sortiraju sami',
      en: 'Shape9 Libra · post that sorts itself',
    },
    description: {
      bs: 'Dokumenti stižu putem emaila, fotografija sa telefona i bankovnih izvoda. Libra prepoznaje sadržaj, pronalazi klijenta i automatski arhivira fajl u tačan folder.',
      en: 'Documents arrive by email, from a phone and from the bank. Libra reads what arrived, recognises whose it is and files it in the right folder.',
    },
  },
  custom: {
    path: '/po-mjeri',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'Namjenski softver po mjeri · Shape9',
      en: 'Custom Development Services · Shape9',
    },
    description: {
      bs: 'Usluge razvoja softvera izgrađene oko vaših poslovnih potreba. Web i mobilne aplikacije, AI rješenja, custom ERP/CRM i analitika.',
      en: 'Custom development services built around your business needs. Web and mobile apps, AI solutions, custom ERP/CRM, and data analytics.',
    },
  },
  about: {
    path: '/o-nama',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'O nama · Shape9',
      en: 'About Us · Shape9',
    },
    description: {
      bs: 'Znamo poslovanje, inženjering nam je alat. Deset godina, dvjesto plus isporučenih projekata i pristup kako radimo.',
      en: 'We know business, engineering is our tool. Ten years, two hundred plus delivered projects, and how we actually work.',
    },
  },
  radovi: {
    path: '/radovi',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'Portfolio · Shape9',
      en: 'Portfolio · Shape9',
    },
    description: {
      bs: 'Odabrani digitalni projekti i poslovni sistemi koje smo uspješno implementirali u praksi. Od enterprise WMS platformi do AI analitike i web aplikacija.',
      en: 'Selected digital systems and products we built and deployed into production. From enterprise warehouse platforms to AI analytics and custom web systems.',
    },
  },
  radoviWms: {
    path: '/radovi/wms',
    accent: '#FFA658',
    accentRgb: '255, 166, 88',
    accentDeep: '#E3831F',
    title: {
      bs: 'Skladište u dvanaest država · Shape9',
      en: 'A warehouse across twelve countries · Shape9',
    },
    description: {
      bs: 'Dvanaest skladišta na jednom sistemu za šest sedmica. Tačnost zaliha sa 81 na 99,4 posto, greške u pripremi narudžbi manje za 91 posto.',
      en: 'Twelve warehouses on one system in six weeks. Inventory accuracy from 81 to 99.4 percent, picking errors down by 91 percent.',
    },
  },
  radoviMonad: {
    path: '/radovi/monad-lead',
    accent: '#35B6F0',
    accentRgb: '53, 182, 240',
    accentDeep: '#1180C5',
    title: {
      bs: 'AI analitičar za affiliate platformu · Shape9',
      en: 'An AI analyst for an affiliate platform · Shape9',
    },
    description: {
      bs: 'Samostalan agent koji prati brojke svakih petnaest minuta, otvara tikete i javlja na Slack. Dvadeset četiri zadatka dnevno, nijedna greška u deset dana.',
      en: 'An autonomous agent checking the numbers every fifteen minutes, opening tickets and posting to Slack. Twenty four tasks a day, zero errors in ten days.',
    },
  },
  privacy: {
    path: '/privatnost',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'Politika privatnosti · Shape9',
      en: 'Privacy policy · Shape9',
    },
    description: {
      bs: 'Kako Shape9 obrađuje podatke iz kontakt forme i podatke klijenata.',
      en: 'How Shape9 processes contact form submissions and client data.',
    },
  },
};

export function routeFromPath(pathname: string): RouteKey {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  if (cleanPath === '/custom') return 'custom';
  for (const [key, meta] of Object.entries(ROUTES)) {
    if (meta.path === cleanPath) {
      return key as RouteKey;
    }
  }
  return 'home';
}

function setMetaTag(selector: string, attrName: string, attrValue: string, content: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function applyMeta(routeKey: RouteKey, lang: 'bs' | 'en') {
  const meta = ROUTES[routeKey] || ROUTES.home;
  const title = meta.title[lang];
  const description = meta.description[lang];
  const url = `${SITE_URL}${meta.path === '/' ? '' : meta.path}`;

  // Title
  document.title = title;

  // Meta description
  setMetaTag('meta[name="description"]', 'name', 'description', description);

  // Open Graph
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);

  // Twitter
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

  // Canonical link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // Theme color for browser UI
  setMetaTag('meta[name="theme-color"]', 'name', 'theme-color', meta.accent);
}
