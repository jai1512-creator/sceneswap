import React, { useState } from 'react';
import { Sparkles, Heart, Compass, PlusCircle, Menu, X, Disc, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeView: 'explore' | 'create' | 'favorites' | 'detail';
  onNavigate: (view: 'explore' | 'create' | 'favorites') => void;
  onOpenRemix: () => void;
  favoritesCount: number;
  isAudioPlaying?: boolean;
  onToggleAudioGlobal?: () => void;
  hasEdits?: boolean;
  onResetWorkspace?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onOpenRemix,
  favoritesCount,
  isAudioPlaying,
  onToggleAudioGlobal,
  hasEdits,
  onResetWorkspace,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'explore' | 'create' | 'favorites') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('explore')}
          className="flex items-center gap-3.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold rounded-lg p-1"
          aria-label="SceneSwap Home"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cinema-800 to-cinema-900 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-cinema-gold/50 transition-colors shadow-lg">
            <div className="absolute inset-0 bg-cinema-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-4 h-4 rounded-full border-2 border-cinema-gold group-hover:scale-110 transition-transform flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cinema-neon" />
            </div>
          </div>
          <div>
            <span className="font-cinematic text-lg tracking-widest3 font-bold text-white block leading-none group-hover:text-cinema-gold transition-colors">
              SCENESWAP
            </span>
            <span className="text-[10px] tracking-widest text-cinema-400 font-mono block mt-1 uppercase">
              Aesthetic Discovery
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-cinema-900/60 p-1.5 rounded-full border border-white/10 shadow-inner">
          <button
            onClick={() => handleNavClick('explore')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
              activeView === 'explore'
                ? 'bg-cinema-800 text-white shadow-sm border border-white/15'
                : 'text-cinema-400 hover:text-white hover:bg-cinema-800/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cinema-gold" />
            Explore
          </button>

          <button
            onClick={() => handleNavClick('create')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
              activeView === 'create'
                ? 'bg-cinema-800 text-white shadow-sm border border-white/15'
                : 'text-cinema-400 hover:text-white hover:bg-cinema-800/40'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-cinema-neon" />
            Create
          </button>

          <button
            onClick={() => handleNavClick('favorites')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 relative ${
              activeView === 'favorites'
                ? 'bg-cinema-800 text-white shadow-sm border border-white/15'
                : 'text-cinema-400 hover:text-white hover:bg-cinema-800/40'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-cinema-rose fill-cinema-rose/30' : 'text-cinema-400'}`} />
            Favorites
            {favoritesCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-mono bg-cinema-rose/20 text-cinema-rose rounded-full border border-cinema-rose/30">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Buttons: Audio Status & Remix Button */}
        <div className="hidden md:flex items-center gap-3">
          {onToggleAudioGlobal && (
            <button
              onClick={onToggleAudioGlobal}
              className={`p-2.5 rounded-full border transition-all ${
                isAudioPlaying
                  ? 'border-cinema-gold/50 bg-cinema-gold/10 text-cinema-gold animate-pulse-subtle'
                  : 'border-white/10 text-cinema-400 hover:text-white hover:border-white/20'
              }`}
              title={isAudioPlaying ? 'Stop Ambient Audio' : 'No sound playing'}
              aria-label="Ambient Audio Status"
            >
              <Disc className={`w-4 h-4 ${isAudioPlaying ? 'animate-spin' : ''}`} />
            </button>
          )}

          {hasEdits && onResetWorkspace && (
            <button
              onClick={onResetWorkspace}
              className="p-2.5 rounded-full border border-white/10 text-cinema-400 hover:text-cinema-rose hover:border-cinema-rose/30 transition-colors"
              title="Reset workspace to clean factory state"
              aria-label="Reset workspace to clean state"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onOpenRemix}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cinema-gold via-amber-400 to-amber-500 hover:from-amber-400 hover:to-cinema-gold text-cinema-950 font-bold text-xs tracking-widest uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(229,192,123,0.25)] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cinema-950 fill-cinema-950" />
            Remix
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenRemix}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cinema-gold text-cinema-950 font-bold text-[11px] tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3" />
            Remix
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-cinema-300 hover:text-white hover:bg-cinema-800 border border-white/10"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <button
            onClick={() => handleNavClick('explore')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm uppercase tracking-wider font-medium ${
              activeView === 'explore' ? 'bg-cinema-800 text-cinema-gold' : 'text-cinema-300 hover:bg-cinema-900'
            }`}
          >
            <span className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-cinema-gold" />
              Explore Scenes
            </span>
          </button>

          <button
            onClick={() => handleNavClick('create')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm uppercase tracking-wider font-medium ${
              activeView === 'create' ? 'bg-cinema-800 text-cinema-neon' : 'text-cinema-300 hover:bg-cinema-900'
            }`}
          >
            <span className="flex items-center gap-3">
              <PlusCircle className="w-4 h-4 text-cinema-neon" />
              Create A Scene
            </span>
          </button>

          <button
            onClick={() => handleNavClick('favorites')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm uppercase tracking-wider font-medium ${
              activeView === 'favorites' ? 'bg-cinema-800 text-cinema-rose' : 'text-cinema-300 hover:bg-cinema-900'
            }`}
          >
            <span className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-cinema-rose" />
              Favorites
            </span>
            {favoritesCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-mono bg-cinema-rose/20 text-cinema-rose rounded-full">
                {favoritesCount}
              </span>
            )}
          </button>

          {hasEdits && onResetWorkspace && (
            <button
              onClick={() => {
                onResetWorkspace();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-sm uppercase tracking-wider font-medium text-cinema-500 hover:text-cinema-rose border-t border-white/5 pt-3 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Fresh State
            </button>
          )}
        </div>
      )}
    </header>
  );
};
