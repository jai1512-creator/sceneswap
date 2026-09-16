import React, { useState } from 'react';
import { Type, Sliders, RotateCcw } from 'lucide-react';
import { TypographySpec } from '../../types/scene';

interface TypographySectionProps {
  typography: TypographySpec;
}

export const TypographySection: React.FC<TypographySectionProps> = ({ typography }) => {
  const [customHeading, setCustomHeading] = useState(typography.exampleHeading);
  const [fontSize, setFontSize] = useState<number>(32);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-cinema-gold text-xs tracking-widest3 uppercase block mb-1">
            02 — TYPOGRAPHY
          </span>
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Editorial Type Direction
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCustomHeading(typography.exampleHeading);
              setFontSize(32);
              setIsEditing(false);
            }}
            className="text-xs text-cinema-400 hover:text-white font-mono flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Font Pairing Spec Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display Font Card */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-gold bg-cinema-gold/10 px-2.5 py-1 rounded-md border border-cinema-gold/20">
              Primary Display
            </span>
            <Type className="w-4 h-4 text-cinema-400" />
          </div>
          <div>
            <h4 className="font-cinematic text-xl font-bold text-white">
              {typography.displayFont}
            </h4>
            <p className="font-mono text-xs text-cinema-400 mt-1">
              CSS: {typography.displayFontFamily}
            </p>
          </div>
          <p className="text-xs text-cinema-300 font-light leading-relaxed pt-2 border-t border-white/5">
            {typography.characteristics}
          </p>
        </div>

        {/* Body Font Card */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-teal bg-cinema-teal/10 px-2.5 py-1 rounded-md border border-cinema-teal/20">
              Text & Cadence
            </span>
            <Sliders className="w-4 h-4 text-cinema-400" />
          </div>
          <div>
            <h4 className="font-cinematic text-xl font-bold text-white">
              {typography.bodyFont}
            </h4>
            <p className="font-mono text-xs text-cinema-400 mt-1">
              CSS: {typography.bodyFontFamily}
            </p>
          </div>
          <p className="text-xs text-cinema-300 font-light leading-relaxed pt-2 border-t border-white/5">
            Optimized for literary legibility, structural hierarchy, and atmospheric narrative immersion.
          </p>
        </div>
      </div>

      {/* Interactive Type Specimen Playground */}
      <div className="p-6 sm:p-8 rounded-2xl bg-cinema-900/80 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-widest text-cinema-300">
            Live Specimen Playground (Editable)
          </span>

          <div className="flex items-center gap-3">
            <label className="text-xs font-mono text-cinema-400">Scale: {fontSize}px</label>
            <input
              type="range"
              min="20"
              max="54"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="accent-cinema-gold cursor-pointer w-28 h-1 bg-cinema-700 rounded-lg"
            />
          </div>
        </div>

        {/* Heading Specimen */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-cinema-500 tracking-widest block">
            Heading Treatment ({typography.displayFont})
          </span>
          <textarea
            value={customHeading}
            onChange={(e) => {
              setCustomHeading(e.target.value);
              setIsEditing(true);
            }}
            rows={2}
            className="w-full bg-transparent text-white font-bold tracking-wide focus:outline-none focus:ring-1 focus:ring-cinema-gold/40 rounded-lg p-2 resize-none transition-colors border border-transparent hover:border-white/10"
            style={{
              fontFamily: typography.displayFontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: 1.15,
            }}
            placeholder="Type custom text..."
          />
        </div>

        {/* Body Text Specimen */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <span className="text-[10px] font-mono uppercase text-cinema-500 tracking-widest block">
            Body Cadence ({typography.bodyFont})
          </span>
          <p
            className="text-cinema-200 text-sm sm:text-base leading-relaxed tracking-wide font-light max-w-3xl"
            style={{ fontFamily: typography.bodyFontFamily }}
          >
            {typography.exampleBody}
          </p>
        </div>
      </div>
    </div>
  );
};
