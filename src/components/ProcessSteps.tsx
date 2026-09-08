import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ProcessStep {
  id: string;
  titleBs: string;
  titleEn: string;
  descBs: string;
  descEn: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

/**
 * The four steps of how we work, as a sequence rather than a set.
 *
 * They used to be four cards in a plain grid. A grid says "here are four
 * things"; it does not say "first this, then that". The numbers were doing
 * all the work of communicating order, and a number in a box is easy to
 * read as a label rather than a position. So the order is now carried by
 * the layout itself: an arrow between each pair, pointing the way the
 * process runs, left to right on a wide screen and top to bottom on a
 * narrow one, where the natural reading direction is vertical.
 *
 * The entrance is staggered, each step arriving slightly after the one
 * before it. That is the same idea again in time instead of space: the
 * animation performs the sequence rather than decorating it. It is short
 * and it only ever runs once, on the way in, because motion that repeats
 * or that the reader has to wait for stops being information and becomes
 * an obstacle.
 *
 * Lives in one file because this exact sequence appears on the home page
 * and on the about page, and the brief was that those two must agree. Two
 * copies of a list agree until the first time somebody edits one of them.
 */
export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps, className = '' }) => {
  return (
    <div className={className}>
      <ol className="process-steps" role="list">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <li
              className="process-step s9-card-nested"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="process-step-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-2.5">
                <span className="l-bs">{step.titleBs}</span>
                <span className="l-en">{step.titleEn}</span>
              </h3>

              <p className="text-sm text-[var(--body)] leading-relaxed">
                <span className="l-bs">{step.descBs}</span>
                <span className="l-en">{step.descEn}</span>
              </p>
            </li>

            {i < steps.length - 1 && (
              <li
                className="process-arrow"
                aria-hidden="true"
                style={{ transitionDelay: `${i * 70 + 35}ms` }}
              >
                <ArrowRight className="w-4 h-4" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};

/**
 * The four steps of how we work.
 *
 * Lives here rather than on a page because both the home page and the
 * about page render it, and the brief was that those two must agree. A
 * list copied into two files agrees right up until somebody edits one.
 */
export const APPROACH_STEPS: ProcessStep[] = [
  {
    id: 'analyze',
    titleBs: 'Analiziramo i educiramo',
    titleEn: 'We analyze, then walk you through it',
    descBs: 'Mapiramo vaše procese i prolazimo s vašim timom kroz stvarne mogućnosti, uključujući AI gdje ima smisla, i realna ograničenja.',
    descEn: 'We map your processes and walk your team through what is actually possible, AI included where it fits, and what is not.',
  },
  {
    id: 'roadmap',
    titleBs: 'Roadmap i brze pobjede',
    titleEn: 'A roadmap, quick wins first',
    descBs: 'Definišemo šta donosi najviše vrijednosti uz najmanje rizika i krećemo odatle, da rezultate vidite odmah, prije težih projekata.',
    descEn: 'We define what brings the most value for the least risk and start there, so you see results immediately, before the harder work.',
  },
  {
    id: 'build',
    titleBs: 'Agilna i nezavisna izvedba',
    titleEn: 'No extra load on your IT',
    descBs: 'Ne morate širiti vaš IT tim. Arhitektura, integracija postojećih baza i održavanje infrastrukture je na nama.',
    descEn: 'You do not need to hire an IT person for this to work. Setup, integration and upkeep are our job. You do yours.',
  },
  {
    id: 'support',
    titleBs: 'Dugoročna podrška i obuka',
    titleEn: 'We stay after it goes live',
    descBs: 'Aktivno vodimo vaš tim kroz period tranzicije, obučavamo korisnike i ostajemo uz vas kako bi sistem donosio stvarne rezultate.',
    descEn: 'We walk you through every change, in plain language, as many times as it takes. We will not drop a system on your desk and leave.',
  },
];
