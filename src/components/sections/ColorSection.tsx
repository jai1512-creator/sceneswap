import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import { ColorSwatch } from '../../types/scene';
import { copyToClipboard, hexToHsl } from '../../utils/colorUtils';

interface ColorSectionProps {
  colors: ColorSwatch[];
  onToast: (msg: string) => void;
}

export const ColorSection: React.FC<ColorSectionProps> = ({ colors, onToast }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = async (color: ColorSwatch) => {
    const success = await copyToClipboard(color.hex);
    if (success) {
      setCopiedHex(color.hex);
      onToast(`Copied ${color.name} (${color.hex}) to clipboard`);
      setTimeout(() => setCopiedHex(null), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-cinema-gold text-xs tracking-widest3 uppercase block mb-1">
            01 — COLOR
          </span>
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Harmonic Chromatic System
          </h3>
        </div>
        <p className="text-xs text-cinema-400 font-mono flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cinema-gold" />
          Click any swatch to copy HEX value
        </p>
      </div>

      {/* Palette Overview Bar */}
      <div className="w-full h-12 sm:h-16 rounded-2xl overflow-hidden flex shadow-2xl border border-white/10 p-1 bg-cinema-900">
        {colors.map((c, idx) => (
          <button
            key={idx}
            onClick={() => handleCopy(c)}
            className="flex-1 h-full transition-all duration-300 hover:flex-[1.5] relative group focus:outline-none rounded-xl overflow-hidden"
            style={{ backgroundColor: c.hex }}
            title={`Copy ${c.name}: ${c.hex}`}
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
              {copiedHex === c.hex ? (
                <Check className="w-4 h-4 text-white drop-shadow" />
              ) : (
                <Copy className="w-4 h-4 text-white drop-shadow" />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Detailed Color Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {colors.map((color, idx) => {
          const hsl = hexToHsl(color.hex);
          const isCopied = copiedHex === color.hex;

          return (
            <div
              key={idx}
              onClick={() => handleCopy(color)}
              className="group cursor-pointer bg-cinema-900/70 hover:bg-cinema-850 p-4 rounded-2xl border border-white/10 hover:border-cinema-gold/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCopy(color);
                }
              }}
            >
              {/* Swatch Header Box */}
              <div
                className="w-full aspect-[4/3] rounded-xl relative shadow-md overflow-hidden flex items-end p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-md text-white border border-white/10"
                >
                  {color.role}
                </span>
              </div>

              {/* Color Metadata */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinematic text-sm font-bold text-white tracking-wide group-hover:text-cinema-gold transition-colors">
                    {color.name}
                  </h4>
                  <span className="font-mono text-xs font-semibold text-cinema-gold">
                    {color.hex}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-cinema-400">
                  HSL({hsl.h}°, {hsl.s}%, {hsl.l}%)
                </div>

                <p className="text-xs text-cinema-400 font-light leading-relaxed pt-1">
                  {color.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
