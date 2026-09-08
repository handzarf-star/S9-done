import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Background } from './components/Background';
import { HomePage } from './pages/HomePage';
import { PulsePage } from './pages/PulsePage';
import { AtlasPage } from './pages/AtlasPage';
import { SonarPage } from './pages/SonarPage';
import { LibraPage } from './pages/LibraPage';
import { RadoviPage } from './pages/RadoviPage';
import { RadoviWmsPage } from './pages/RadoviWmsPage';
import { RadoviMonadPage } from './pages/RadoviMonadPage';
import { CustomPage } from './pages/CustomPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { routeFromPath, ROUTES, applyMeta, RouteKey } from './routes';
import { ANALYTICS } from './config';

const HEADER_OFFSET = 80;

export function scrollToId(id: string) {
  const cleanId = id.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [lang, setLang] = useState<'bs' | 'en'>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'bs' || urlLang === 'en') return urlLang;
    const stored = localStorage.getItem('shape9_lang');
    if (stored === 'bs' || stored === 'en') return stored;
    return 'bs';
  });

  const activeRouteKey = routeFromPath(currentPath);
  const activeRoute = ROUTES[activeRouteKey];

  // Language side effect
  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('shape9_lang', lang);
    applyMeta(activeRouteKey, lang);
  }, [lang, activeRouteKey]);

  // Handle popstate for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      if (window.location.hash) {
        setTimeout(() => scrollToId(window.location.hash), 50);
      } else {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Analytics Injection
  useEffect(() => {
    if (ANALYTICS.ga4Id) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4Id}`;
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', ANALYTICS.ga4Id);
    }

    if (ANALYTICS.apolloId) {
      const apolloScript = document.createElement('script');
      apolloScript.src = `https://assets.apollo.io/js/apollo.js?id=${ANALYTICS.apolloId}`;
      apolloScript.async = true;
      document.head.appendChild(apolloScript);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: currentPath,
        page_title: activeRoute.title[lang],
      });
    }
  }, [currentPath, activeRouteKey, lang, activeRoute.title]);

  const navigate = (to: string) => {
    if (to.startsWith('#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/' + to);
        setCurrentPath('/');
        setTimeout(() => scrollToId(to), 60);
      } else {
        window.history.pushState({}, '', to);
        scrollToId(to);
      }
      return;
    }

    if (to !== currentPath) {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
      window.scrollTo(0, 0);
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'bs' ? 'en' : 'bs'));
  };

  const renderPage = () => {
    switch (activeRouteKey) {
      case 'pulse':
        return <PulsePage onNavigate={navigate} />;
      case 'atlas':
        return <AtlasPage onNavigate={navigate} />;
      case 'sonar':
        return <SonarPage onNavigate={navigate} />;
      case 'libra':
        return <LibraPage onNavigate={navigate} />;
      case 'radovi':
        return <RadoviPage onNavigate={navigate} />;
      case 'radoviWms':
        return <RadoviWmsPage onNavigate={navigate} />;
      case 'radoviMonad':
        return <RadoviMonadPage onNavigate={navigate} />;
      case 'custom':
        return <CustomPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const themeStyles = {
    '--cyan': activeRoute.accent,
    '--cyan-rgb': activeRoute.accentRgb,
    '--cyan-deep': activeRoute.accentDeep,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen bg-[var(--navy)] text-[#C7CEDA] selection:bg-[var(--cyan)] selection:text-[var(--navy)] relative transition-colors duration-300 overflow-x-clip w-full max-w-full"
      style={themeStyles}
    >
      {/* Skip to Content for accessibility */}
      <a href="#main" className="skip-link">
        <span className="l-bs">Preskoči na sadržaj</span>
        <span className="l-en">Skip to content</span>
      </a>

      {/* MODERN MULTI-LAYER ATMOSPHERIC BACKGROUND */}
      <Background />

      {/* HEADER */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* MAIN CONTENT */}
      <main id="main" className="relative z-10 w-full max-w-full overflow-x-clip">
        {renderPage()}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
