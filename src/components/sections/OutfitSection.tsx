import React, { useState } from 'react';
import { Shirt, Footprints, Watch, Palette, Sparkles, User, Layers } from 'lucide-react';
import { OutfitSpec, GenderWardrobeSpec } from '../../types/scene';

interface OutfitSectionProps {
  outfit: OutfitSpec;
}

export const OutfitSection: React.FC<OutfitSectionProps> = ({ outfit }) => {
  const [selectedGender, setSelectedGender] = useState<'all' | 'feminine' | 'masculine'>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Resolve active wardrobe based on selected gender
  let activeOutfit: GenderWardrobeSpec = outfit;
  if (selectedGender === 'feminine') {
    if (outfit.feminine) {
      activeOutfit = outfit.feminine;
    } else {
      activeOutfit = {
        clothing: `Feminine styling: ${outfit.clothing}`,
        silhouette: `Flowing feminine drape and sculpted waistline; ${outfit.silhouette.toLowerCase()}`,
        materials: outfit.materials,
        accessories: [...outfit.accessories, 'Delicate sculptural jewelry', 'Structured clutch'],
        footwear: outfit.footwear.includes('heel') || outfit.footwear.includes('stiletto')
          ? outfit.footwear
          : `${outfit.footwear} or sleek block-heel leather boots`,
        colorDirection: outfit.colorDirection,
        visualTiles: outfit.visualTiles,
      };
    }
  } else if (selectedGender === 'masculine') {
    if (outfit.masculine) {
      activeOutfit = outfit.masculine;
    } else {
      activeOutfit = {
        clothing: `Masculine tailoring: ${outfit.clothing}`,
        silhouette: `Structured broad-shouldered architectural taper; ${outfit.silhouette.toLowerCase()}`,
        materials: outfit.materials,
        accessories: [...outfit.accessories, 'Classic mechanical timepiece', 'Full-grain leather belt'],
        footwear: outfit.footwear.includes('boot') || outfit.footwear.includes('oxford') || outfit.footwear.includes('loafer')
          ? outfit.footwear
          : `${outfit.footwear} or storm-welt leather boots`,
        colorDirection: outfit.colorDirection,
        visualTiles: outfit.visualTiles,
      };
    }
  }

  const tiles = (activeOutfit.visualTiles && activeOutfit.visualTiles.length > 0)
    ? activeOutfit.visualTiles
    : outfit.visualTiles;

  return (
    <div className="space-y-8">
      {/* Section Header with Color Direction */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-cinema-gold text-xs tracking-widest3 uppercase block mb-1">
            06 — OUTFIT & WARDROBE
          </span>
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Sartorial Silhouette & Garments
          </h3>
        </div>
        <span className="font-mono text-xs text-cinema-400">
          Palette Tone: {activeOutfit.colorDirection.split('.')[0]}
        </span>
      </div>

      {/* Interactive Gender Perspective Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-cinema-900/80 border border-white/10 shadow-lg">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cinema-gold" />
            <span className="text-xs font-mono uppercase tracking-widest text-cinema-300 font-semibold">
              Gender-Specific Styling
            </span>
          </div>
          <p className="text-xs text-cinema-400 font-light">
            Toggle between feminine silhouettes, masculine tailoring, or the curated universal ensemble.
          </p>
        </div>

        {/* Segmented Control Pill */}
        <div className="flex items-center p-1 rounded-xl bg-cinema-950 border border-white/10 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setSelectedGender('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              selectedGender === 'all'
                ? 'bg-cinema-800 text-white font-bold shadow-md border border-white/15'
                : 'text-cinema-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cinema-gold" />
            Universal
          </button>
          <button
            onClick={() => setSelectedGender('feminine')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              selectedGender === 'feminine'
                ? 'bg-cinema-rose/25 text-cinema-rose font-bold shadow-md border border-cinema-rose/40'
                : 'text-cinema-400 hover:text-cinema-rose'
            }`}
          >
            <User className="w-3 h-3" />
            Feminine
          </button>
          <button
            onClick={() => setSelectedGender('masculine')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              selectedGender === 'masculine'
                ? 'bg-cinema-teal/25 text-cinema-teal font-bold shadow-md border border-cinema-teal/40'
                : 'text-cinema-400 hover:text-cinema-teal'
            }`}
          >
            <User className="w-3 h-3" />
            Masculine
          </button>
        </div>
      </div>

      {/* Wardrobe Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Garment / Outer Layer */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cinema-gold text-xs font-mono uppercase tracking-wider">
              <Shirt className="w-3.5 h-3.5" />
              Core Garments & Layers
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-cinema-400 border border-white/5">
              {selectedGender === 'all' ? 'Universal' : selectedGender}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {activeOutfit.clothing}
          </p>
        </div>

        {/* Silhouette */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cinema-teal text-xs font-mono uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              Proportions & Silhouette
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-cinema-400 border border-white/5">
              Fit Profile
            </span>
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {activeOutfit.silhouette}
          </p>
        </div>

        {/* Footwear */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cinema-rose text-xs font-mono uppercase tracking-wider">
              <Footprints className="w-3.5 h-3.5" />
              Footwear & Foundation
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-cinema-400 border border-white/5">
              Shoes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {activeOutfit.footwear}
          </p>
        </div>

        {/* Textile Materials */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-400">
            Fabric Textures & Weaves
          </div>
          <div className="flex flex-wrap gap-2">
            {activeOutfit.materials.map((mat, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cinema-800 text-cinema-200 border border-white/10"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Accessories */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-3 md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinema-400">
            <Watch className="w-3.5 h-3.5 text-cinema-gold" />
            Curated Accessories & Accents
          </div>
          <div className="flex flex-wrap gap-2">
            {activeOutfit.accessories.map((acc, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cinema-800/80 text-cinema-300 border border-white/5"
              >
                {acc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Reference Gallery Tiles */}
      {tiles && tiles.length > 0 && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-cinema-400 block">
              {selectedGender === 'all'
                ? 'Wardrobe Visual References'
                : `${selectedGender.toUpperCase()} Wardrobe References`}
            </span>
            <span className="text-xs font-mono text-cinema-500">
              {tiles.length} {tiles.length === 1 ? 'Look' : 'Looks'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tiles.map((tile, idx) => {
              const imageKey = `${selectedGender}-${idx}`;
              const hasFailed = failedImages[imageKey];
              return (
                <div
                  key={idx}
                  className="group rounded-2xl overflow-hidden bg-cinema-900 border border-white/10 hover:border-cinema-gold/40 transition-all duration-300 flex flex-col shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-cinema-950">
                    {!hasFailed ? (
                      <img
                        src={tile.url}
                        alt={tile.title}
                        loading="lazy"
                        onError={() => setFailedImages(prev => ({ ...prev, [imageKey]: true }))}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-cinema-900 text-center">
                        <Shirt className="w-8 h-8 text-cinema-500 mb-2" />
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
