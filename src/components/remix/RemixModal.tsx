import React, { useState, useMemo } from 'react';
import { X, Sparkles, Shuffle, Bookmark, ArrowRight, Check, Disc, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Scene } from '../../types/scene';
import { remixScenes } from '../../services/remixEngine';
import { saveRemixToStorage, toggleSceneFavorite } from '../../services/storage';
import { CinematicBackground } from '../layout/CinematicBackground';

interface RemixModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenes: Scene[];
  initialSceneA?: Scene | null;
  initialSceneB?: Scene | null;
  onSelectRemixScene: (scene: Scene) => void;
  onToast: (msg: string) => void;
}

export const RemixModal: React.FC<RemixModalProps> = ({
  isOpen,
  onClose,
  scenes,
  initialSceneA,
  initialSceneB,
  onSelectRemixScene,
  onToast,
}) => {
  const [sceneAId, setSceneAId] = useState<string>(
    initialSceneA ? initialSceneA.id : scenes[0]?.id || 'cyberpunk-city'
  );
  const [sceneBId, setSceneBId] = useState<string>(
    initialSceneB ? initialSceneB.id : scenes[4]?.id || 'vintage-cafe'
  );
  const [seed, setSeed] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Find scene objects
  const sceneA = useMemo(() => scenes.find((s) => s.id === sceneAId) || scenes[0], [scenes, sceneAId]);
  const sceneB = useMemo(() => scenes.find((s) => s.id === sceneBId) || scenes[1], [scenes, sceneBId]);

  // Compute remix
  const remixedScene = useMemo(() => {
    if (!sceneA || !sceneB) return null;
    return remixScenes(sceneA, sceneB, seed);
  }, [sceneA, sceneB, seed]);

  if (!isOpen || !remixedScene) return null;

  const handleRemixAgain = () => {
    setSeed((prev) => prev + 1);
    setIsSaved(false);
    onToast('Synthesized new aesthetic variation!');
  };

  const handleRandomizePair = () => {
    const rA = Math.floor(Math.random() * scenes.length);
    let rB = Math.floor(Math.random() * scenes.length);
    if (rB === rA) rB = (rA + 1) % scenes.length;
    setSceneAId(scenes[rA].id);
    setSceneBId(scenes[rB].id);
    setSeed(0);
    setIsSaved(false);
  };

  const handleSaveRemix = () => {
    saveRemixToStorage(remixedScene);
    toggleSceneFavorite(remixedScene);
    setIsSaved(true);
    onToast(`Saved "${remixedScene.title}" to your library!`);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E5C07B', '#00F0FF', '#FF2A6D'],
      });
    } catch {
      // ignore
    }
  };

  const handleExploreFull = () => {
    onSelectRemixScene(remixedScene);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <CinematicBackground variant="remix" remixScenes={{ sceneA, sceneB }} />
      <div className="relative w-full max-w-4xl bg-cinema-900/90 backdrop-blur-2xl rounded-3xl border border-cinema-gold/30 shadow-2xl overflow-hidden flex flex-col my-8 z-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-cinema-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cinema-gold/20 flex items-center justify-center text-cinema-gold border border-cinema-gold/30">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-cinematic text-lg sm:text-xl font-bold text-white tracking-wide">
                Remix the Scene
              </h3>
              <span className="text-[11px] font-mono text-cinema-400 uppercase tracking-wider block">
                Dual Aesthetic Fusion Engine
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-cinema-400 hover:text-white hover:bg-cinema-800 transition-colors"
            aria-label="Close Remix Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scene Selection Selectors Bar */}
        <div className="p-6 bg-cinema-950/50 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Scene A Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-widest text-cinema-teal">
                Aesthetic A (Base Anchor):
              </label>
              <select
                value={sceneAId}
                onChange={(e) => {
                  setSceneAId(e.target.value);
                  setIsSaved(false);
                }}
                className="w-full bg-cinema-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cinema-teal font-medium"
              >
                {scenes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.era})
                  </option>
                ))}
              </select>
            </div>

            {/* Scene B Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-widest text-cinema-rose">
                Aesthetic B (Collision Vector):
              </label>
              <select
                value={sceneBId}
                onChange={(e) => {
                  setSceneBId(e.target.value);
                  setIsSaved(false);
                }}
                className="w-full bg-cinema-800 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cinema-rose font-medium"
              >
                {scenes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.era})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Randomize Pair Button */}
          <button
            onClick={handleRandomizePair}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cinema-850 hover:bg-cinema-800 text-cinema-300 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
            title="Randomize collision pair"
          >
            <Shuffle className="w-3.5 h-3.5 text-cinema-gold" />
            Randomize Pair
          </button>
        </div>

        {/* Fused Result Content Display */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[60vh]">
          {/* Fused Title Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cinema-850 to-cinema-900 border border-white/10 space-y-3 relative overflow-hidden shadow-lg">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30">
                Hybrid Collision
              </span>
              <span className="text-xs font-mono text-cinema-400">
                {sceneA.title} + {sceneB.title}
              </span>
            </div>

            <h4 className="font-cinematic text-3xl sm:text-4xl font-bold text-white tracking-wide">
              {remixedScene.title}
            </h4>

            <p className="font-serif italic text-base sm:text-lg text-cinema-200">
              “{remixedScene.tagline}”
            </p>

            <p className="text-xs sm:text-sm text-cinema-300 font-light leading-relaxed">
              {remixedScene.description}
            </p>
          </div>

          {/* Blended Palette Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cinema-400 uppercase tracking-wider">
              <span>Synthesized Chromatic System</span>
              <span>5 Blended Tones</span>
            </div>
            <div className="h-14 rounded-xl overflow-hidden flex border border-white/15 shadow">
              {remixedScene.colors.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 h-full flex flex-col items-center justify-center relative group p-1"
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name}: ${c.hex}`}
                >
                  <span
                    className="text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity px-1 rounded bg-black/40 text-white"
                  >
                    {c.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Hybrid Elements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Music Vibe */}
            <div className="p-4 rounded-xl bg-cinema-950/70 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-gold">
                Sonic Hybrid
              </span>
              <h5 className="font-cinematic text-sm font-bold text-white">
                {remixedScene.music.genre}
              </h5>
              <p className="text-xs text-cinema-300 font-light">
                {remixedScene.music.instruments} ({remixedScene.music.bpmRange})
              </p>
            </div>

            {/* Lighting Collision */}
            <div className="p-4 rounded-xl bg-cinema-950/70 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-teal">
                Lighting Collision
              </span>
              <h5 className="font-cinematic text-sm font-bold text-white">
                {remixedScene.lighting.source}
              </h5>
              <p className="text-xs text-cinema-300 font-light">
                {remixedScene.lighting.colorTemperature}
              </p>
            </div>

            {/* Interior Architecture */}
            <div className="p-4 rounded-xl bg-cinema-950/70 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-rose">
                Interior Concept
              </span>
              <h5 className="font-cinematic text-sm font-bold text-white">
                {remixedScene.interior.architecture}
              </h5>
              <p className="text-xs text-cinema-300 font-light">
                {remixedScene.interior.furniture}
              </p>
            </div>

            {/* Outfit Silhouette */}
            <div className="p-4 rounded-xl bg-cinema-950/70 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-400">
                Sartorial Hybrid
              </span>
              <h5 className="font-cinematic text-sm font-bold text-white">
                {remixedScene.outfit.silhouette}
              </h5>
              <p className="text-xs text-cinema-300 font-light">
                {remixedScene.outfit.clothing}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-cinema-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleRemixAgain}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cinema-850 hover:bg-cinema-800 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cinema-gold" />
            Remix Again
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleSaveRemix}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-full border transition-all text-xs font-mono uppercase tracking-wider font-semibold ${
                isSaved
                  ? 'bg-cinema-rose/20 text-cinema-rose border-cinema-rose/40'
                  : 'bg-cinema-900 text-white hover:bg-cinema-850 border-white/15'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Saved to Library
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-cinema-rose" />
                  Save Remix
                </>
              )}
            </button>

            <button
              onClick={handleExploreFull}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cinema-gold hover:bg-amber-400 text-cinema-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg"
            >
              Explore Aesthetic
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
