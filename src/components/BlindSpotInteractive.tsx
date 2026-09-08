import React, { useState } from 'react';
import { EyeOff, AlertTriangle, Sparkles } from 'lucide-react';

export const BlindSpotInteractive: React.FC = () => {
  const [qaPercent, setQaPercent] = useState<number>(2);

  const invisiblePercent = Math.max(0, 100 - qaPercent);

  return (
    <div className="s9-card p-6 sm:p-10 max-w-4xl mx-auto border-[rgba(169,140,255,0.28)] bg-[rgba(169,140,255,0.035)]">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="s9-badge bg-[rgba(169,140,255,0.1)] border border-[rgba(169,140,255,0.25)] text-[#A98CFF] text-xs font-bold uppercase tracking-wider mb-3 mx-auto">
          <EyeOff className="w-3.5 h-3.5" />
          <span className="l-bs">Izračunajte sami</span>
          <span className="l-en">Work it out yourself</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
          <span className="l-bs">Koliko poziva vaš tim stigne preslušati?</span>
          <span className="l-en">How many of your calls does your team get to hear?</span>
        </h3>
      </div>

      {/* Slider Control */}
      <div className="max-w-xl mx-auto mb-6 space-y-3">
        <div className="flex justify-between items-center text-sm font-bold">
          <label htmlFor="qa-coverage" className="text-[var(--muted)] cursor-pointer">
            <span className="l-bs">Povucite na vašu brojku:</span>
            <span className="l-en">Drag to your number:</span>
          </label>
          <span className="text-[#A98CFF] text-lg font-black">{qaPercent}%</span>
        </div>

        <input
          type="range"
          id="qa-coverage"
          min="0"
          max="100"
          value={qaPercent}
          aria-valuetext={`${qaPercent}%`}
          onChange={(e) => setQaPercent(Number(e.target.value))}
          className="w-full h-3 bg-[var(--navy)] rounded-lg appearance-none cursor-pointer accent-[#A98CFF] border border-[var(--line)] focus-ring"
        />

        <div className="flex justify-between text-xs text-[var(--muted)] font-mono">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Visual Bar Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="relative w-full h-14 rounded-2xl bg-[var(--navy)] overflow-hidden border border-[var(--line)] flex p-1.5 shadow-inner">
          {/* Reviewed portion */}
          <div
            style={{ width: `${Math.max(qaPercent, 1.5)}%` }}
            className="h-full bg-[#A98CFF] rounded-xl transition-all duration-200 flex items-center justify-center px-2 text-[var(--navy)] font-black text-xs sm:text-sm whitespace-nowrap overflow-hidden"
          >
            {qaPercent >= 8 ? `${qaPercent}%` : ''}
          </div>

          {/* Invisible portion */}
          <div
            style={{ width: `${100 - Math.max(qaPercent, 1.5)}%` }}
            className="h-full bg-[rgba(255,255,255,0.02)] rounded-xl border border-dashed border-[rgba(169,140,255,0.3)] flex items-center justify-between px-3 text-xs sm:text-sm transition-all duration-200 overflow-hidden"
          >
            <span className="text-[var(--muted)] font-medium truncate pl-2">
              <span className="l-bs">Nevidljivo, tu žive propuštene prodaje, pritužbe i greške</span>
              <span className="l-en">Invisible, where missed sales, complaints and errors live</span>
            </span>
          </div>
        </div>
      </div>

      {/* Large Live Updating Counter */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--navy)] border border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-red-400 font-mono tracking-tight">
              {invisiblePercent}%
            </div>
            <div className="text-xs uppercase font-bold text-[var(--muted)] tracking-wider">
              <span className="l-bs">vaših poziva niko ne čuje</span>
              <span className="l-en">of your calls nobody hears</span>
            </div>
          </div>
        </div>

        <div className="sm:border-l border-[var(--line)] sm:pl-6 pt-4 sm:pt-0 border-t sm:border-t-0 w-full sm:w-auto">
          <div className="text-xs font-semibold text-[#A98CFF] mb-1 flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span className="l-bs">Sa <span className="font-mono">Pulseom</span>:</span>
            <span className="l-en">With <span className="font-mono">Pulse</span>:</span>
          </div>
          <p className="text-sm font-bold text-[var(--ink)]">
            <span className="l-bs">Prosječan tim stigne 1 do 2 posto. <span className="text-[#A98CFF] font-mono">Pulse</span> provjeri sve.</span>
            <span className="l-en">An average team gets to 1 or 2 percent. <span className="text-[#A98CFF] font-mono">Pulse</span> checks all of them.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
