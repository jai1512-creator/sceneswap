import React, { useState } from 'react';
import { Sun, Flame, Eye, Sparkles, Sliders } from 'lucide-react';
import { LightingSpec } from '../../types/scene';

interface LightingSectionProps {
  lighting: LightingSpec;
}

export const LightingSection: React.FC<LightingSectionProps> = ({ lighting }) => {
  const [contrastScale, setContrastScale] = useState<number>(1);
  const [bloomActive, setBloomActive] = useState<boolean>(true);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-cinema-gold text-xs tracking-widest3 uppercase block mb-1">
            03 — LIGHTING & VOLUMETRICS
          </span>
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Atmospheric Illumination
          </h3>
        </div>
        <span className="font-mono text-xs text-cinema-400">
          Kelvin: {lighting.colorTemperature.split(' ')[0]}
        </span>
      </div>

      {/* Lighting Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Source */}
        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-gold text-xs font-mono uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5" />
            Key Source
          </div>
          <h4 className="font-cinematic text-base font-bold text-white">
            {lighting.source}
          </h4>
        </div>

        {/* Color Temperature */}
        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-teal text-xs font-mono uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Color Temperature
          </div>
          <h4 className="font-cinematic text-base font-bold text-white">
            {lighting.colorTemperature}
          </h4>
        </div>

        {/* Contrast */}
        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-rose text-xs font-mono uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            Contrast Ratio
          </div>
          <h4 className="font-cinematic text-base font-bold text-white">
            {lighting.contrast}
          </h4>
        </div>

        {/* Shadow Characteristics */}
        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2 md:col-span-2 lg:col-span-1">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-400">
            Shadow Penumbra
          </div>
          <p className="text-xs text-cinema-200 font-light leading-relaxed">
            {lighting.shadowCharacteristics}
          </p>
        </div>

        {/* Atmosphere */}
        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2 md:col-span-2">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-400">
            Particulate & Atmosphere
          </div>
          <p className="text-xs text-cinema-200 font-light leading-relaxed">
            {lighting.atmosphere}
          </p>
        </div>
      </div>

      {/* Visual Lighting Simulation Vignette */}
      <div className="relative rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-10 bg-cinema-950 flex flex-col justify-between min-h-[260px] shadow-2xl">
        {/* Dynamic Light Diffusion Vignette */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${lighting.ambientHex1}${Math.round(25 * contrastScale).toString(16)} 0%, ${lighting.ambientHex2}${Math.round(15 * contrastScale).toString(16)} 45%, #070709 90%)`,
            filter: bloomActive ? 'blur(20px)' : 'none',
          }}
        />

        {/* Interactive Lighting Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-cinema-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cinema-gold" />
            Atmospheric Lighting Simulation
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-cinema-400">Intensity:</span>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={contrastScale}
                onChange={(e) => setContrastScale(parseFloat(e.target.value))}
                className="accent-cinema-gold cursor-pointer w-20 h-1 bg-cinema-700 rounded-lg"
              />
            </div>

            <button
              onClick={() => setBloomActive(!bloomActive)}
              className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono border transition-all ${
                bloomActive
                  ? 'bg-cinema-gold/20 text-cinema-gold border-cinema-gold/30'
                  : 'bg-cinema-800 text-cinema-400 border-white/10'
              }`}
            >
              Bloom {bloomActive ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Atmospheric Callout Text */}
        <div className="relative z-10 max-w-xl space-y-2 py-6">
          <span className="font-mono text-[11px] text-cinema-gold tracking-widest uppercase">
            Color Spectrum Resonance
          </span>
          <h4 className="font-cinematic text-2xl font-bold text-white drop-shadow-md">
            {lighting.source}
          </h4>
          <p className="text-cinema-300 text-xs sm:text-sm font-light leading-relaxed">
            {lighting.atmosphere}. Light temperature is measured at {lighting.colorTemperature} with {lighting.contrast.toLowerCase()}.
          </p>
        </div>

        {/* Spectrum Swatches */}
        <div className="relative z-10 flex items-center gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cinema-400">
            <span
              className="w-4 h-4 rounded-full border border-white/20 shadow"
              style={{ backgroundColor: lighting.ambientHex1 }}
            />
            Primary Falloff
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cinema-400">
            <span
              className="w-4 h-4 rounded-full border border-white/20 shadow"
              style={{ backgroundColor: lighting.ambientHex2 }}
            />
            Ambient Secondary
          </div>
        </div>
      </div>
    </div>
  );
};
