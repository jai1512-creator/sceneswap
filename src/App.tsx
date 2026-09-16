import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Scene, MoodType, EraType, EnvironmentCategory, LightingCategory } from './types/scene';
import { CURATED_SCENES } from './data/curatedScenes';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FilmGrain } from './components/layout/FilmGrain';
import { HeroSection } from './components/hero/HeroSection';
import { SceneGrid } from './components/scene/SceneGrid';
import { SceneDetail } from './components/scene/SceneDetail';
import { SceneBuilder } from './components/builder/SceneBuilder';
import { FavoritesView } from './components/favorites/FavoritesView';
import { RemixModal } from './components/remix/RemixModal';
import { ShareModal } from './components/share/ShareModal';
import { getStoredFavorites, toggleSceneFavorite, getSavedRemixes, getSavedCustomScenes, clearAllUserData } from './services/storage';
import { remixScenes } from './services/remixEngine';
import { buildCustomScene } from './services/sceneBuilder';
import { ambientAudio } from './services/ambientAudio';
import { CinematicBackground } from './components/layout/CinematicBackground';

function getInitialStateFromUrl(): { view: 'explore' | 'create' | 'favorites' | 'detail'; scene: Scene | null; openRemix?: boolean; hideHero?: boolean } {
  try {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const sceneParam = params.get('scene');
    const remixParam = params.get('remix');
    const customParam = params.get('custom');

    if (viewParam === 'remix') {
      return { view: 'explore', scene: null, openRemix: true };
    }
    if (viewParam === 'library') {
      return { view: 'explore', scene: null, hideHero: true };
    }
    if (viewParam === 'create') {
      return { view: 'create', scene: null };
    }
    if (viewParam === 'favorites') {
      return { view: 'favorites', scene: null };
    }

    if (sceneParam) {
      const found = CURATED_SCENES.find((s) => s.id === sceneParam);
      if (found) return { view: 'detail', scene: found };
    } else if (remixParam) {
      const [idA, idB] = remixParam.split('+');
      const scA = CURATED_SCENES.find((s) => s.id === idA) || CURATED_SCENES[0];
      const scB = CURATED_SCENES.find((s) => s.id === idB) || CURATED_SCENES[1];
      return { view: 'detail', scene: remixScenes(scA, scB, 0) };
    } else if (customParam) {
      const [m, e, env, l] = customParam.split(',');
      if (m && e && env && l) {
        const synthesized = buildCustomScene({
          mood: m as MoodType,
          era: e as EraType,
          environment: env as EnvironmentCategory,
          lighting: l as LightingCategory,
        });
        return { view: 'detail', scene: synthesized };
      }
    }
  } catch {
    // fallback
  }
  return { view: 'explore', scene: null };
}

export function App() {
  const initialUrlState = getInitialStateFromUrl();
  const [activeView, setActiveView] = useState<'explore' | 'create' | 'favorites' | 'detail'>(initialUrlState.view);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(initialUrlState.scene);
  const [favorites, setFavorites] = useState<Scene[]>(() => getStoredFavorites());
  const [isRemixModalOpen, setIsRemixModalOpen] = useState(!!initialUrlState.openRemix);
  const [remixSceneA, setRemixSceneA] = useState<Scene | null>(null);
  const [shareSceneTarget, setShareSceneTarget] = useState<Scene | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // User creations (saved remixes & custom synthesized scenes)
  const [userCreations, setUserCreations] = useState<Scene[]>(() => {
    const custom = getSavedCustomScenes();
    const remixes = getSavedRemixes();
    const map = new Map<string, Scene>();
    custom.forEach((s) => map.set(s.id, s));
    remixes.forEach((s) => map.set(s.id, s));
    return Array.from(map.values());
  });

  // Master lookup list for routing & modals (curated + any newly saved user creations)
  const allScenes = useMemo(() => {
    const map = new Map<string, Scene>();
    CURATED_SCENES.forEach((s) => map.set(s.id, s));
    userCreations.forEach((s) => map.set(s.id, s));
    return Array.from(map.values());
  }, [userCreations]);

  // Sync favorites & user creations when storage updates
  useEffect(() => {
    const handleStorageChange = () => {
      setFavorites(getStoredFavorites());
      const custom = getSavedCustomScenes();
      const remixes = getSavedRemixes();
      const map = new Map<string, Scene>();
      custom.forEach((s) => map.set(s.id, s));
      remixes.forEach((s) => map.set(s.id, s));
      setUserCreations(Array.from(map.values()));
    };

    window.addEventListener('sceneswap_storage_changed', handleStorageChange);
    return () => window.removeEventListener('sceneswap_storage_changed', handleStorageChange);
  }, []);

  // Sync audio status interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAudioPlaying(ambientAudio.isPlaying());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Toast helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  }, []);

  // Check URL parameters for direct deep linking
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sceneParam = params.get('scene');
      const remixParam = params.get('remix');
      const customParam = params.get('custom');
      const viewParam = params.get('view');
      const scrollParam = params.get('scroll');

      if (scrollParam === 'library') {
        setTimeout(() => {
          document.getElementById('scene-library')?.scrollIntoView({ behavior: 'auto' });
        }, 300);
      }

      if (viewParam === 'remix') {
        setIsRemixModalOpen(true);
      } else if (viewParam === 'create') {
        setActiveView('create');
      } else if (viewParam === 'favorites') {
        setActiveView('favorites');
      }

      if (sceneParam) {
        const found = allScenes.find((s) => s.id === sceneParam);
        if (found) {
          setSelectedScene(found);
          setActiveView('detail');
        }
      } else if (remixParam) {
        const [idA, idB] = remixParam.split('+');
        const scA = allScenes.find((s) => s.id === idA) || CURATED_SCENES[0];
        const scB = allScenes.find((s) => s.id === idB) || CURATED_SCENES[1];
        const synthesized = remixScenes(scA, scB, 0);
        setSelectedScene(synthesized);
        setActiveView('detail');
      } else if (customParam) {
        const [m, e, env, l] = customParam.split(',');
        if (m && e && env && l) {
          const synthesized = buildCustomScene({
            mood: m as MoodType,
            era: e as EraType,
            environment: env as EnvironmentCategory,
            lighting: l as LightingCategory,
          });
          setSelectedScene(synthesized);
          setActiveView('detail');
        }
      }
    } catch (e) {
      console.warn('Failed to parse URL query params', e);
    }
  }, []);

  // Navigation handlers
  const handleNavigate = (view: 'explore' | 'create' | 'favorites') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScene = (scene: Scene) => {
    setSelectedScene(scene);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (e: React.MouseEvent, scene: Scene) => {
    e.stopPropagation();
    const isNowFav = toggleSceneFavorite(scene);
    setFavorites(getStoredFavorites());
    showToast(isNowFav ? `Added "${scene.title}" to favorites` : `Removed "${scene.title}" from favorites`);
  };

  const handleOpenRemixWith = (scene?: Scene) => {
    if (scene) {
      setRemixSceneA(scene);
    } else {
      setRemixSceneA(null);
    }
    setIsRemixModalOpen(true);
  };

  const handleSelectRemixedScene = (scene: Scene) => {
    setSelectedScene(scene);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenShare = (scene: Scene) => {
    setShareSceneTarget(scene);
  };

  const handleToggleGlobalAudio = () => {
    if (ambientAudio.isPlaying()) {
      ambientAudio.stop();
      setIsAudioPlaying(false);
      showToast('Ambient audio stopped');
    } else {
      ambientAudio.play(CURATED_SCENES[0].music.audioPreset);
      setIsAudioPlaying(true);
      showToast(`Playing ambient soundscape for ${CURATED_SCENES[0].title}`);
    }
  };

  const handleResetWorkspace = useCallback(() => {
    clearAllUserData();
    setFavorites([]);
    setUserCreations([]);
    setActiveView('explore');
    setSelectedScene(null);
    ambientAudio.stop();
    setIsAudioPlaying(false);
    if (window.history.pushState) {
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({ path: cleanUrl }, '', cleanUrl);
    }
    showToast('Reset to clean default state. Zero edits active.');
  }, [showToast]);

  return (
    <div className="min-h-screen flex flex-col bg-cinema-950 text-cinema-100 relative">
      {/* 35mm Film Grain Overlay */}
      <FilmGrain />

      {/* Sticky Navigation Header */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenRemix={() => handleOpenRemixWith()}
        favoritesCount={favorites.length}
        isAudioPlaying={isAudioPlaying}
        onToggleAudioGlobal={handleToggleGlobalAudio}
        hasEdits={favorites.length > 0 || userCreations.length > 0}
        onResetWorkspace={handleResetWorkspace}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'explore' && (
          <div>
            {!initialUrlState.hideHero && (
              <HeroSection
                onExploreClick={() => {
                  const el = document.getElementById('scene-library');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onCreateClick={() => handleNavigate('create')}
                onSelectScene={handleSelectScene}
                featuredScenes={CURATED_SCENES}
              />
            )}
            <div className="relative min-h-[600px] overflow-hidden">
              <CinematicBackground variant="explore" />
              <div className="relative z-10">
                <SceneGrid
                  curatedScenes={CURATED_SCENES}
                  userScenes={userCreations}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectScene={handleSelectScene}
                  onOpenRemix={() => handleOpenRemixWith()}
                />
              </div>
            </div>
          </div>
        )}

        {activeView === 'detail' && selectedScene && (
          <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
            <CinematicBackground variant="detail" scene={selectedScene} />
            <div className="relative z-10">
              <SceneDetail
                scene={selectedScene}
                isFavorite={favorites.some((f) => f.id === selectedScene.id)}
                onToggleFavorite={handleToggleFavorite}
                onBack={() => handleNavigate('explore')}
                onRemixWith={(s) => handleOpenRemixWith(s)}
                onShare={handleOpenShare}
                onToast={showToast}
              />
            </div>
          </div>
        )}

        {activeView === 'create' && (
          <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
            <CinematicBackground variant="create" />
            <div className="relative z-10">
              <SceneBuilder
                onSelectScene={handleSelectScene}
                onToast={showToast}
              />
            </div>
          </div>
        )}

        {activeView === 'favorites' && (
          <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
            <CinematicBackground variant="favorites" />
            <div className="relative z-10">
              <FavoritesView
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectScene={handleSelectScene}
                onExploreClick={() => handleNavigate('explore')}
              />
            </div>
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRemix={() => handleOpenRemixWith()}
        onResetWorkspace={handleResetWorkspace}
      />

      {/* Remix Modal */}
      <RemixModal
        isOpen={isRemixModalOpen}
        onClose={() => setIsRemixModalOpen(false)}
        scenes={allScenes}
        initialSceneA={remixSceneA}
        onSelectRemixScene={handleSelectRemixedScene}
        onToast={showToast}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={!!shareSceneTarget}
        onClose={() => setShareSceneTarget(null)}
        scene={shareSceneTarget}
        onToast={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-cinema-850/95 text-white border border-cinema-gold/40 shadow-2xl backdrop-blur-md text-xs font-mono tracking-wider flex items-center gap-3 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-cinema-gold animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
