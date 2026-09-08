import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reveal on scroll, as an enhancement only.
 *
 * The previous version put every wrapped block at opacity 0 in CSS and
 * waited for an IntersectionObserver to put it back. Anything that made the
 * observer miss, a fast flick, a direct link to an anchor, a slow bundle,
 * left whole sections invisible. Landing on /#kontakt rendered a black page
 * with the contact form present in the DOM and unreadable.
 *
 * Now the content is visible by default. A `js-reveal` class is put on <html>
 * only once this component mounts, which is the only moment we know the
 * script is alive, and only that class turns the starting state on. A
 * safety timer clears everything if the observer has not fired, so the worst
 * case is that the animation does not play, never that the page is empty.
 */

let enabled = false;

function enableRevealOnce() {
  if (enabled) return;
  enabled = true;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // Do not hide anything that is already on screen at first paint.
  document.documentElement.classList.add('js-reveal');
  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
    });
  });

  // Backstop. If anything goes wrong, show everything after three seconds.
  window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((el) => {
      el.classList.add('is-visible');
    });
  }, 3000);
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    enableRevealOnce();

    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }

    // A tall block can never reach a high ratio inside a short viewport, so
    // the threshold stays at zero and a bottom margin does the gating instead.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (delay) {
          window.setTimeout(() => el.classList.add('is-visible'), delay);
        } else {
          el.classList.add('is-visible');
        }
        observer.unobserve(entry.target);
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);

    // If it is already in view on mount, do not wait for a scroll event.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('is-visible');
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};
