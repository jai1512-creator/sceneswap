import React, { useState, useMemo } from 'react';
import { Heart, Compass, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { Scene } from '../../types/scene';
import { SceneCard } from '../scene/SceneCard';

interface FavoritesViewProps {
  favorites: Scene[];
  onToggleFavorite: (e: React.MouseEvent, scene: Scene) => void;
  onSelectScene: (scene: Scene) => void;
  onExploreClick: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onToggleFavorite,
  onSelectScene,
  onExploreClick,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'curated' | 'remix' | 'custom'>('all');

  const filteredFavorites = useMemo(() => {
    if (filterTab === 'curated') {
      return favorites.filter((f) => !f.isRemix && !f.isCustom);
    }
    if (filterTab === 'remix') {
      return favorites.filter((f) => f.isRemix);
    }
    if (filterTab === 'custom') {
      return favorites.filter((f) => f.isCustom);
    }
    return favorites;
  }, [favorites, filterTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-cinema-rose text-xs font-mono uppercase tracking-widest3 mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>SAVED ARCHIVE</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Your Aesthetic Library
          </h2>
          <p className="text-cinema-400 font-light text-sm mt-1 max-w-xl">
            Bookmarked scenes, hybrid remixes, and custom synthesized aesthetics saved to your local workspace.
          </p>
        </div>

        {/* Tab Filters */}
        {favorites.length > 0 && (
          <div className="flex items-center p-1 bg-cinema-900 rounded-xl border border-white/10">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterTab === 'all'
                  ? 'bg-cinema-800 text-white font-bold shadow'
                  : 'text-cinema-400 hover:text-white'
              }`}
            >
              All ({favorites.length})
            </button>
            <button
              onClick={() => setFilterTab('curated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterTab === 'curated'
                  ? 'bg-cinema-800 text-white font-bold shadow'
                  : 'text-cinema-400 hover:text-white'
              }`}
            >
              Scenes
            </button>
            <button
              onClick={() => setFilterTab('remix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterTab === 'remix'
                  ? 'bg-cinema-800 text-white font-bold shadow'
                  : 'text-cinema-400 hover:text-white'
              }`}
            >
              Remixes
            </button>
            <button
              onClick={() => setFilterTab('custom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterTab === 'custom'
                  ? 'bg-cinema-800 text-white font-bold shadow'
                  : 'text-cinema-400 hover:text-white'
              }`}
            >
              Custom
            </button>
          </div>
        )}
      </div>

      {/* Grid of Favorites or Empty State */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFavorites.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelectScene={onSelectScene}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-24 text-center rounded-3xl bg-cinema-900/80 backdrop-blur-xl border border-white/10 p-8 max-w-xl mx-auto space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-cinema-800 mx-auto flex items-center justify-center border border-white/10 shadow-inner">
            <Heart className="w-6 h-6 text-cinema-400" />
          </div>

          <div className="space-y-2">
            <h3 className="font-cinematic text-2xl font-bold text-white">
              {favorites.length === 0
                ? 'No saved aesthetics yet'
                : 'No items in this category'}
            </h3>
            <p className="text-cinema-400 text-sm max-w-md mx-auto">
              {favorites.length === 0
                ? 'Click the heart icon on any curated scene, remixed world, or custom aesthetic to bookmark it here for later reference.'
                : 'No saved aesthetics match your selected tab. Switch to "All" or bookmark new aesthetics.'}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-cinema-gold hover:bg-amber-400 text-cinema-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              <Compass className="w-4 h-4" />
              Explore Curated Scenes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
