import { SITE_URL } from './config';

export type RouteKey = 'home' | 'pulse' | 'atlas' | 'sonar' | 'mode' | 'libra' | 'vesta' | 'bell' | 'hive' | 'echo' | 'neon' | 'iris' | 'radovi' | 'radoviWms' | 'radoviMonad' | 'custom' | 'about' | 'privacy';

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
      bs: 'Shape9 · Gradimo digitalna iskustva koja prave razliku',
      en: 'Shape9 · We Build Digital Experiences That Matter',
    },
    description: {
      bs: 'Razvijamo kompleksne softverske sisteme koji unapređuju poslovanje. Upoznajte Pulse, Atlas, Sonar, Libra i naša rješenja po mjeri. Sarajevo, od 2015.',
      en: 'We build high-impact digital experiences and enterprise systems. Discover Pulse, Atlas, Sonar, Libra, and our custom solutions. Sarajevo, since 2015.',
    },
  },
  pulse: {
    path: '/pulse',
    accent: '#A98CFF',
    accentRgb: '169, 140, 255',
    accentDeep: '#6D3BF0',
    title: {
      bs: 'Shape9 Pulse · Automatizovana kontrola kvaliteta poziva',
      en: 'Shape9 Pulse · Automated Call Quality Assurance & Analytics',
    },
    description: {
      bs: 'Ljudska kontrola stigne preslušati samo uzorak. Pulse automatski provjerava svaki snimljeni poziv prema Vašim pravilima i isporučuje jasne izvještaje.',
      en: 'QA teams can only listen to a small sample. Pulse automatically checks every single recorded call against your rules and delivers clear, actionable reports.',
    },
  },
  atlas: {
    path: '/atlas',
    accent: '#FFA658',
    accentRgb: '255, 166, 88',
    accentDeep: '#E3831F',
    title: {
      bs: 'Shape9 Atlas · Napredno upravljanje skladištem (WMS)',
      en: 'Shape9 Atlas · Advanced Warehouse Management System (WMS)',
    },
    description: {
      bs: 'Tačno stanje zaliha, precizne lokacije artikala i automatizovano naručivanje. Uz Atlas, naši klijenti su podigli tačnost zaliha sa 81% na 99,4%.',
      en: 'Exact stock levels, real-time item tracking, and automated reordering. With Atlas, our clients boosted inventory accuracy from 81% to 99.4%.',
    },
  },
  sonar: {
    path: '/sonar',
    accent: '#35B6F0',
    accentRgb: '53, 182, 240',
    accentDeep: '#1180C5',
    title: {
      bs: 'Shape9 Sonar · Proaktivni AI nadzor poslovnih metrika',
      en: 'Shape9 Sonar · Proactive AI Oversight of Business Metrics',
    },
    description: {
      bs: 'AI agent koji neprekidno prati stope konverzije, uspješnost transakcija i stabilnost sistema, te šalje trenutna upozorenja čim uoči odstupanja.',
      en: 'An autonomous AI agent that continuously monitors conversion rates, transaction success, and system stability, sending instant alerts the moment anomalies occur.',
    },
  },
  mode: {
    path: '/mode',
    accent: '#FF6170',
    accentRgb: '255, 97, 112',
    accentDeep: '#D6293D',
    title: {
      bs: 'Shape9 Mode · Savremeni maloprodajni sistem',
      en: 'Shape9 Mode · Modern Retail Management System',
    },
    description: {
      bs: 'Vodite maloprodaju bez papira i Excel tabela. Kasa, magacin i prodavnice uvezani su u realnom vremenu, od prijema robe do isporuke kupcu.',
      en: 'Run your retail operations without paper or spreadsheets. Connect your till, stockroom, and stores in real time, from procurement to final delivery.',
    },
  },
  libra: {
    path: '/libra',
    accent: '#3DD68C',
    accentRgb: '61, 214, 140',
    accentDeep: '#17A56B',
    title: {
      bs: 'Shape9 Libra · Automatsko sortiranje i obrada dokumenata',
      en: 'Shape9 Libra · Intelligent Automated Document Sorting',
    },
    description: {
      bs: 'Bez obzira stižu li dokumenti mailom ili kao fotografije s telefona, Libra prepoznaje sadržaj, locira klijenta i sama ih sortira u tačan folder.',
      en: 'Whether documents arrive via email or as mobile photos, Libra reads the content, identifies the client, and automatically files them into the right folder.',
    },
  },
  /* Vesta's name was approved by Mersad on 2026-07-30 and this page is
     reachable from the menu.

     The five below it are NOT approved names. Bell, Hive, Echo, Neon and
     Iris are working titles, and the standing rule is that no name is
     written anywhere before Mersad has seen it. They are routed so the
     pages can be read and corrected, and deliberately kept out of the
     header, the footer and the sitemap until that happens. Libra reached
     the live site this way once already, and Mode is still doing it. */
  vesta: {
    path: '/vesta',
    accent: '#588DFA',
    accentRgb: '88, 141, 250',
    accentDeep: '#043FC6',
    title: {
      bs: 'Shape9 Vesta · Upravljanje imovinom kompanije od nabavke do otpisa',
      en: 'Shape9 Vesta · Enterprise Asset Management from Procurement to Disposal',
    },
    description: {
      bs: 'Jedinstven i pregledan sistem za praćenje, održavanje i upravljanje kompletnom imovinom koju Vaša kompanija posjeduje.',
      en: 'One centralized system to track, maintain, and manage every physical and digital asset your company owns.',
    },
  },
  bell: {
    path: '/bell',
    accent: '#9CCB24',
    accentRgb: '156, 203, 36',
    accentDeep: '#62820D',
    title: {
      bs: 'Shape9 Bell · Pametna VoIP centrala sa prepoznavanjem kupaca',
      en: 'Shape9 Bell · Smart VoIP Telephony with Customer Recognition',
    },
    description: {
      bs: 'Cloud telefonsko rješenje za call centre i prodajne timove koje agentima pruža potpun istorijski uvid u interakcije s klijentom tokom samog poziva.',
      en: 'A cloud-based telephony solution for call centers and sales teams, providing full context and interaction history the moment a customer calls.',
    },
  },
  hive: {
    path: '/hive',
    accent: '#DAB323',
    accentRgb: '218, 179, 35',
    accentDeep: '#8C710C',
    title: {
      bs: 'Shape9 Hive · Omnichannel upravljanje prodajom i narudžbama',
      en: 'Shape9 Hive · End-to-End Omnichannel Sales Management',
    },
    description: {
      bs: 'Fleksibilan sistem koji objedinjuje sve Vaše prodajne kanale (Instagram, telefon, web) u jedno okruženje stvoreno za velike dnevne količine narudžbi.',
      en: 'A configurable platform that consolidates all your sales channels (Instagram, phone, web) into a single workspace built for high daily order volumes.',
    },
  },
  echo: {
    path: '/echo',
    accent: '#29D1C9',
    accentRgb: '41, 209, 201',
    accentDeep: '#0F8680',
    title: {
      bs: 'Shape9 Echo · Pametne SMS kampanje uz detaljnu analitiku',
      en: 'Shape9 Echo · Branded SMS Campaigns with Click Tracking',
    },
    description: {
      bs: 'Jednosmjerne SMS kampanje sa Vašim potpisom. Pošaljite odmah ili zakažite slanje pod imenom Vašeg brenda, uz napredno praćenje klikova.',
      en: 'One-way branded SMS campaigns. Send instantly or schedule messages under your company name with advanced link and click tracking.',
    },
  },
  neon: {
    path: '/neon',
    accent: '#FCA5CD',
    accentRgb: '252, 165, 205',
    accentDeep: '#BD588A',
    title: {
      bs: 'Shape9 Neon · Ciljane Viber kampanje i segmentacija',
      en: 'Shape9 Neon · Targeted Viber Campaigns & Segmentation',
    },
    description: {
      bs: 'Napredna platforma za razmjenu poruka koja podržava bogate formate sadržaja, preciznu segmentaciju publike i ciljanu dostavu poruka.',
      en: 'A rich messaging platform supporting extended content formats, precise audience segmentation, and highly targeted message delivery.',
    },
  },
  iris: {
    path: '/iris',
    accent: '#C661DC',
    accentRgb: '198, 97, 220',
    accentDeep: '#800A96',
    title: {
      bs: 'Shape9 Iris · AI asistent za analizu poslovnih podataka',
      en: 'Shape9 Iris · AI-Powered Business Data & Metrics Assistant',
    },
    description: {
      bs: 'AI asistent za Vaše poslovne podatke i metrike. Odgovara isključivo na osnovu Vaših internih dokumenata i precizno pamti tok razgovora.',
      en: 'An AI assistant for your business data and metrics. Answers are generated exclusively from your secure data while maintaining full conversational context.',
    },
  },
  custom: {
    path: '/po-mjeri',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'Razvoj softvera po mjeri · Shape9',
      en: 'Custom Software Development Services · Shape9',
    },
    description: {
      bs: 'Razvoj softvera prilagođen Vašem poslovanju. Kreiramo web i mobilne aplikacije, AI rješenja, napredne ERP/CRM sisteme i analitiku krojenu po mjeri.',
      en: 'Software development tailored to your business. We build web and mobile apps, AI solutions, advanced ERP/CRM systems, and custom analytics.',
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
      bs: 'Razumijemo kako biznis funkcioniše, inženjering je naš alat. Deset godina rada, preko 200 isporučenih sistema i pristup bez praznih obećanja.',
      en: 'We look at tech through a business lens, engineering is simply our tool. Ten years of experience, 200+ delivered systems, and no empty promises.',
    },
  },
  radovi: {
    path: '/radovi',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'Portfolio · Naši projekti · Shape9',
      en: 'Portfolio · Our Work · Shape9',
    },
    description: {
      bs: 'Odabrani digitalni sistemi i proizvodi koje smo uspješno pustili u produkciju, od enterprise WMS platformi do napredne AI analitike.',
      en: 'Selected digital systems and products we built and deployed into production, from enterprise WMS platforms to advanced AI analytics.',
    },
  },
  radoviWms: {
    path: '/radovi/wms',
    accent: '#FFA658',
    accentRgb: '255, 166, 88',
    accentDeep: '#E3831F',
    title: {
      bs: 'Studija slučaja: Skladište u 12 država · Shape9',
      en: 'Case Study: A Warehouse Across 12 Countries · Shape9',
    },
    description: {
      bs: 'Kako smo uvezali 12 skladišta na jedan sistem za samo 6 sedmica. Tačnost zaliha podignuta na 99,4%, a greške u pripremi smanjene za 91%.',
      en: 'How we connected 12 warehouses to a single system in 6 weeks. Inventory accuracy reached 99.4%, while picking errors dropped by 91%.',
    },
  },
  radoviMonad: {
    path: '/radovi/monad-lead',
    accent: '#35B6F0',
    accentRgb: '53, 182, 240',
    accentDeep: '#1180C5',
    title: {
      bs: 'Studija slučaja: AI analitičar za affiliate platformu · Shape9',
      en: 'Case Study: AI Analyst for an Affiliate Platform · Shape9',
    },
    description: {
      bs: 'Autonomni AI agent koji prati metriku svakih 15 minuta, otvara tikete i izvještava na Slacku. 24 zadatka dnevno, nula grešaka u 10 dana.',
      en: 'An autonomous AI agent checking numbers every 15 minutes, opening tickets, and reporting to Slack. 24 tasks a day, zero errors in 10 days.',
    },
  },
  privacy: {
    path: '/privatnost',
    accent: '#4EACCD',
    accentRgb: '78, 172, 205',
    accentDeep: '#006E8B',
    title: {
      bs: 'Politika privatnosti · Shape9',
      en: 'Privacy Policy · Shape9',
    },
    description: {
      bs: 'Saznajte kako Shape9 štiti i obrađuje podatke klijenata i podatke prikupljene putem kontakt formi na našoj web stranici.',
      en: 'Learn how Shape9 securely processes and protects client data and submissions collected through our website\'s contact forms.',
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
