import React from 'react';

interface AnimatedCounterProps {
  /** Rendered exactly as written, e.g. "150+", "12", "100%" */
  targetValue: string;
  labelBs: string;
  labelEn: string;
}

/**
 * A number in a ruled row.
 *
 * The name is kept so nothing else has to change, but the counting up is
 * gone. Numbers that spin on scroll were a template flourish in 2019 and
 * they cost more than they earn here: the figure is unreadable while it
 * animates, the value is wrong for anyone who screenshots the page or
 * scrolls fast, and a screen reader announces a moving target.
 *
 * A figure that simply is what it is reads as evidence. That suits a
 * company whose whole argument is that you should not guess.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ targetValue, labelBs, labelEn }) => {
  return (
    <div className="proof-item">
      <div className="proof-val">{targetValue}</div>
      <div className="proof-label">
        <span className="l-bs">{labelBs}</span>
        <span className="l-en">{labelEn}</span>
      </div>
    </div>
  );
};
