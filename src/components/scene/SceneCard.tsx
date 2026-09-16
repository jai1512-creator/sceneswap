import React, { useState } from 'react';
import { Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import { Scene } from '../../types/scene';

interface SceneCardProps {
  scene: Scene;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, scene: Scene) => void;
  onSelectScene: (scene: Scene) => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  isFavorite,
  onToggleFavorite,
  onSelectScene,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelectScene(scene)}
      className="group relative flex flex-col bg-cinema-900/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cinema-gold/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] cursor-pointer text-left focus-within:ring-2 focus-within:ring-cinema-gold"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectScene(scene);
        }
      }}
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cinema-950">
        {/* Fallback artistic background gradient */}
        <div
          className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${scene.lighting.ambientHex1}25 0%, ${scene.lighting.ambientHex2}15 50%, #070709 100%)`,
          }}
        />

        {!imageError && (
          <img
            src={scene.heroImage}
            alt={scene.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Cinematic Letterbox vignette and gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-900 via-cinema-900/30 to-black/40" />

        {/* Top Badges & Favorite Button */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md text-cinema-300 border border-white/10">
              {scene.era}
            </span>
            {scene.isRemix && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-cinema-gold/20 backdrop-blur-md text-cinema-gold border border-cinema-gold/30 font-semibold">
                <Sparkles className="w-2.5 h-2.5" />
                Remix
              </span>
            )}
            {scene.isCustom && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-cinema-teal/20 backdrop-blur-md text-cinema-teal border border-cinema-teal/30">
                Custom
              </span>
            )}
          </div>

          <button
            onClick={(e) => onToggleFavorite(e, scene)}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 border ${
              isFavorite
                ? 'bg-cinema-rose/20 text-cinema-rose border-cinema-rose/40 scale-105 shadow-md'
                : 'bg-black/50 text-white/70 hover:text-white border-white/15 hover:bg-black/80'
            }`}
            aria-label={isFavorite ? `Remove ${scene.title} from favorites` : `Add ${scene.title} to favorites`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-cinema-rose' : ''}`} />
          </button>
        </div>

        {/* 5-Color Mini Swatch Strip on Bottom of Image */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 flex z-10">
          {scene.colors.map((c, i) => (
            <div
              key={i}
              className="flex-1 h-full transition-all duration-300 group-hover:h-2"
              style={{ backgroundColor: c.hex }}
              title={`${c.name}: ${c.hex}`}
            />
          ))}
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Environment & Lighting meta */}
          <div className="flex items-center justify-between text-[11px] font-mono text-cinema-400 tracking-wider uppercase mb-1.5">
            <span>{scene.environmentType}</span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: scene.colors[0]?.hex }}
              />
              {scene.lightingType} Light
            </span>
          </div>

          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-cinematic text-lg sm:text-xl font-bold text-white group-hover:text-cinema-gold transition-colors tracking-wide">
              {scene.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-cinema-400 group-hover:text-cinema-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>

          {/* Tagline */}
          <p className="font-serif italic text-xs sm:text-sm text-cinema-300 mt-1 line-clamp-2">
            “{scene.tagline}”
          </p>
        </div>

        {/* Mood Keywords Chips */}
        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
          {scene.keywords.slice(0, 3).map((kw, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-cinema-800/80 text-cinema-400 border border-white/5"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
