import React, { useState } from 'react';
import { Home, Layers, Box, Sparkles } from 'lucide-react';
import { InteriorSpec } from '../../types/scene';

interface InteriorSectionProps {
  interior: InteriorSpec;
}

export const InteriorSection: React.FC<InteriorSectionProps> = ({ interior }) => {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-cinema-gold text-xs tracking-widest3 uppercase block mb-1">
            05 — INTERIOR & SPATIAL DESIGN
          </span>
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Architectural Sanctuary
          </h3>
        </div>
        <span className="font-mono text-xs text-cinema-400">
          Spatial Feeling: {interior.spatialFeeling.split(',')[0]}
        </span>
      </div>

      {/* Structural Interior Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Architecture */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-gold text-xs font-mono uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            Envelope & Architecture
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {interior.architecture}
          </p>
        </div>

        {/* Furniture */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-teal text-xs font-mono uppercase tracking-wider">
            <Box className="w-3.5 h-3.5" />
            Furniture & Seating
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {interior.furniture}
          </p>
        </div>

        {/* Spatial Feeling */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-rose text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Spatial Cadence
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {interior.spatialFeeling}
          </p>
        </div>

        {/* Materials Palette */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-3 md:col-span-2">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-400">
            Material Palette & Textures
          </div>
          <div className="flex flex-wrap gap-2">
            {interior.materials.map((mat, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cinema-800 text-cinema-200 border border-white/10"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative Objects */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-400">
            Curated Artifacts
          </div>
          <ul className="space-y-1.5 text-xs text-cinema-300 font-light">
            {interior.decorativeObjects.map((obj, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cinema-gold" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Reference Gallery Tiles */}
      {interior.visualTiles && interior.visualTiles.length > 0 && (
        <div className="space-y-3 pt-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cinema-400 block">
            Spatial Visual References
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interior.visualTiles.map((tile, idx) => {
              const hasFailed = failedImages[idx];
              return (
                <div
                  key={idx}
                  className="group rounded-2xl overflow-hidden bg-cinema-900 border border-white/10 hover:border-cinema-gold/40 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-cinema-950">
                    {!hasFailed ? (
                      <img
                        src={tile.url}
                        alt={tile.title}
                        loading="lazy"
                        onError={() => setFailedImages(prev => ({ ...prev, [idx]: true }))}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-cinema-900 text-center">
                        <Home className="w-8 h-8 text-cinema-500 mb-2" />
                        <span className="font-cinematic text-xs text-cinema-300">{tile.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h5 className="font-cinematic text-sm font-bold text-white group-hover:text-cinema-gold transition-colors">
                      {tile.title}
                    </h5>
                    <p className="text-xs text-cinema-400 font-light line-clamp-2">
                      {tile.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
