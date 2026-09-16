import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { Scene, MoodType, EraType, EnvironmentCategory, LightingCategory } from '../../types/scene';
import { SceneCard } from './SceneCard';

interface SceneGridProps {
  scenes?: Scene[];
  curatedScenes?: Scene[];
  userScenes?: Scene[];
  favorites: Scene[];
  onToggleFavorite: (e: React.MouseEvent, scene: Scene) => void;
  onSelectScene: (scene: Scene) => void;
  onOpenRemix: () => void;
}

const ALL_MOODS: MoodType[] = ['Calm', 'Mysterious', 'Energetic', 'Romantic', 'Dark', 'Dreamy', 'Futuristic', 'Nostalgic'];
const ALL_ERAS: EraType[] = ['70s', '80s', '90s', 'Modern', 'Near Future', 'Timeless'];
const ALL_ENVIRONMENTS: EnvironmentCategory[] = ['City', 'Café', 'Bedroom', 'Street', 'Desert', 'Forest', 'Coast', 'Interior'];
const ALL_LIGHTING: LightingCategory[] = ['Warm', 'Cool', 'Neon', 'Golden Hour', 'Low Light', 'Overcast'];

export const SceneGrid: React.FC<SceneGridProps> = ({
  scenes,
  curatedScenes,
  userScenes = [],
  favorites,
  onToggleFavorite,
  onSelectScene,
  onOpenRemix: _onOpenRemix,
}) => {
  const [archiveTab, setArchiveTab] = useState<'curated' | 'custom'>('curated');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedEnv, setSelectedEnv] = useState<string>('All');
  const [selectedLight, setSelectedLight] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const baseCurated = curatedScenes || scenes || [];
  const activePool = archiveTab === 'custom' && userScenes.length > 0 ? userScenes : baseCurated;

  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedMood !== 'All' ||
    selectedEra !== 'All' ||
    selectedEnv !== 'All' ||
    selectedLight !== 'All';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedMood('All');
    setSelectedEra('All');
    setSelectedEnv('All');
    setSelectedLight('All');
  };

  const favoriteIds = useMemo(() => new Set(favorites.map(f => f.id)), [favorites]);

  const filteredScenes = useMemo(() => {
    return activePool.filter((scene) => {
      // Search query matches title, description, mood, keywords, environment
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = scene.title.toLowerCase().includes(q);
        const matchesDesc = scene.description.toLowerCase().includes(q) || scene.tagline.toLowerCase().includes(q);
        const matchesMood = scene.mood.toLowerCase().includes(q);
        const matchesEnv = scene.environmentType.toLowerCase().includes(q);
        const matchesKeywords = scene.keywords.some((kw) => kw.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesMood && !matchesEnv && !matchesKeywords) {
          return false;
        }
      }

      // Filter by Mood
      if (selectedMood !== 'All' && scene.mood !== selectedMood) {
        return false;
      }

      // Filter by Era
      if (selectedEra !== 'All' && scene.era !== selectedEra) {
        return false;
      }

      // Filter by Environment
      if (selectedEnv !== 'All' && scene.environmentType !== selectedEnv) {
        return false;
      }

      // Filter by Lighting
      if (selectedLight !== 'All' && scene.lightingType !== selectedLight) {
        return false;
      }

      return true;
    });
  }, [activePool, searchQuery, selectedMood, selectedEra, selectedEnv, selectedLight]);

  return (
    <section id="scene-library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-cinema-gold font-mono text-xs uppercase tracking-widest3 mb-2">
            <span>{archiveTab === 'custom' ? 'USER CREATIONS' : 'CURATED ARCHIVE'}</span>
            <span>·</span>
            <span>{activePool.length} WORLDS</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="font-cinematic text-3xl sm:text-4xl font-bold text-white tracking-wide">
              {archiveTab === 'custom' ? 'Your Synthesized Worlds' : 'Explore Visual Aesthetics'}
            </h2>

            {/* If user has creations, offer clean toggle tabs while keeping curated archive pristine */}
            {userScenes.length > 0 && (
              <div className="flex items-center p-1 bg-cinema-900 rounded-xl border border-white/10 w-fit">
                <button
                  onClick={() => setArchiveTab('curated')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    archiveTab === 'curated'
                      ? 'bg-cinema-800 text-white font-bold shadow'
                      : 'text-cinema-400 hover:text-white'
                  }`}
                >
                  Curated ({baseCurated.length})
                </button>
                <button
                  onClick={() => setArchiveTab('custom')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    archiveTab === 'custom'
                      ? 'bg-cinema-800 text-cinema-neon font-bold shadow'
                      : 'text-cinema-400 hover:text-white'
                  }`}
                >
                  My Creations ({userScenes.length})
                </button>
              </div>
            )}
          </div>
          <p className="text-cinema-400 font-light text-sm mt-1 max-w-xl">
            {archiveTab === 'custom'
              ? 'Locally synthesized aesthetic remixes and studio creations saved during this session.'
              : 'A pristine curated collection of filmic worlds, from rainy urban noir to sun-bleached desert westerns.'}
          </p>
        </div>

        {/* Filter Toggle & Clear */}
        <div className="flex items-center gap-3">
          {isFiltered && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-cinema-400 hover:text-cinema-gold bg-cinema-900 border border-white/10 hover:border-cinema-gold/30 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
              showFilters || isFiltered
                ? 'bg-cinema-800 text-cinema-gold border-cinema-gold/40'
                : 'bg-cinema-900 text-cinema-300 border-white/10 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {isFiltered && <span className="w-1.5 h-1.5 rounded-full bg-cinema-gold" />}
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mb-8 relative max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by aesthetic name, mood (e.g. Mysterious), keyword (e.g. Neon), environment..."
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-cinema-900/80 border border-white/10 focus:border-cinema-gold/50 focus:bg-cinema-900 text-white placeholder-cinema-500 text-sm focus:outline-none focus:ring-1 focus:ring-cinema-gold/50 transition-all font-light"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-cinema-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Filter Bar */}
      {showFilters && (
        <div className="mb-10 p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-5 animate-fade-in">
          {/* Mood Filter */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cinema-400 mb-2">
              Filter by Mood:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedMood('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedMood === 'All'
                    ? 'bg-cinema-gold text-cinema-950 font-bold'
                    : 'bg-cinema-800 text-cinema-400 hover:text-white'
                }`}
              >
                All Moods
              </button>
              {ALL_MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMood(m === selectedMood ? 'All' : m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedMood === m
                      ? 'bg-cinema-gold text-cinema-950 font-bold'
                      : 'bg-cinema-800/80 text-cinema-400 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Era Filter */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cinema-400 mb-2">
              Filter by Era:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedEra('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedEra === 'All'
                    ? 'bg-cinema-teal text-cinema-950 font-bold'
                    : 'bg-cinema-800 text-cinema-400 hover:text-white'
                }`}
              >
                All Eras
              </button>
              {ALL_ERAS.map((e) => (
                <button
                  key={e}
                  onClick={() => setSelectedEra(e === selectedEra ? 'All' : e)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedEra === e
                      ? 'bg-cinema-teal text-cinema-950 font-bold'
                      : 'bg-cinema-800/80 text-cinema-400 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Environment Filter */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cinema-400 mb-2">
              Filter by Environment:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedEnv('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedEnv === 'All'
                    ? 'bg-white text-cinema-950 font-bold'
                    : 'bg-cinema-800 text-cinema-400 hover:text-white'
                }`}
              >
                All Environments
              </button>
              {ALL_ENVIRONMENTS.map((env) => (
                <button
                  key={env}
                  onClick={() => setSelectedEnv(env === selectedEnv ? 'All' : env)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedEnv === env
                      ? 'bg-white text-cinema-950 font-bold'
                      : 'bg-cinema-800/80 text-cinema-400 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Filter */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cinema-400 mb-2">
              Filter by Lighting:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedLight('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedLight === 'All'
                    ? 'bg-amber-400 text-cinema-950 font-bold'
                    : 'bg-cinema-800 text-cinema-400 hover:text-white'
                }`}
              >
                All Lighting
              </button>
              {ALL_LIGHTING.map((light) => (
                <button
                  key={light}
                  onClick={() => setSelectedLight(light === selectedLight ? 'All' : light)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedLight === light
                      ? 'bg-amber-400 text-cinema-950 font-bold'
                      : 'bg-cinema-800/80 text-cinema-400 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                  }`}
                >
                  {light}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid of Scenes */}
      {filteredScenes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredScenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              isFavorite={favoriteIds.has(scene.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectScene={onSelectScene}
            />
          ))}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div className="py-20 text-center rounded-3xl bg-cinema-900/40 border border-white/10 p-8 max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-full bg-cinema-800 mx-auto flex items-center justify-center border border-white/10">
            <Search className="w-6 h-6 text-cinema-400" />
          </div>
          <div className="space-y-2">
            <h3 className="font-cinematic text-2xl font-bold text-white">
              No matching scenes found
            </h3>
            <p className="text-cinema-400 text-sm">
              We couldn't find any aesthetics matching your query. Try resetting your search or exploring one of our suggested aesthetics.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {['Cyberpunk', 'Monsoon', 'Academia', 'Vintage', 'Western'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-cinema-800 text-cinema-gold hover:bg-cinema-700 border border-cinema-gold/30"
              >
                Try "{suggestion}"
              </button>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 rounded-full bg-cinema-gold text-cinema-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Reset Filters & Search
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
