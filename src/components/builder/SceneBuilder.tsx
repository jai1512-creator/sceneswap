import React, { useState, useMemo } from 'react';
import { Sparkles, Shuffle, Bookmark, ArrowRight, Check, Compass, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MoodType, EraType, EnvironmentCategory, LightingCategory, Scene } from '../../types/scene';
import { buildCustomScene } from '../../services/sceneBuilder';
import { saveCustomSceneToStorage, toggleSceneFavorite } from '../../services/storage';

interface SceneBuilderProps {
  onSelectScene: (scene: Scene) => void;
  onToast: (msg: string) => void;
}

const MOODS: MoodType[] = ['Calm', 'Mysterious', 'Energetic', 'Romantic', 'Dark', 'Dreamy', 'Futuristic', 'Nostalgic'];
const ERAS: EraType[] = ['70s', '80s', '90s', 'Modern', 'Near Future', 'Timeless'];
const ENVIRONMENTS: EnvironmentCategory[] = ['City', 'Café', 'Bedroom', 'Street', 'Desert', 'Forest', 'Coast', 'Interior'];
const LIGHTINGS: LightingCategory[] = ['Warm', 'Cool', 'Neon', 'Golden Hour', 'Low Light', 'Overcast'];

export const SceneBuilder: React.FC<SceneBuilderProps> = ({ onSelectScene, onToast }) => {
  const [mood, setMood] = useState<MoodType>('Mysterious');
  const [era, setEra] = useState<EraType>('70s');
  const [environment, setEnvironment] = useState<EnvironmentCategory>('Street');
  const [lighting, setLighting] = useState<LightingCategory>('Low Light');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Synthesize custom scene deterministically
  const generatedScene = useMemo(() => {
    return buildCustomScene({ mood, era, environment, lighting });
  }, [mood, era, environment, lighting]);

  const handleRandomize = () => {
    setMood(MOODS[Math.floor(Math.random() * MOODS.length)]);
    setEra(ERAS[Math.floor(Math.random() * ERAS.length)]);
    setEnvironment(ENVIRONMENTS[Math.floor(Math.random() * ENVIRONMENTS.length)]);
    setLighting(LIGHTINGS[Math.floor(Math.random() * LIGHTINGS.length)]);
    setIsSaved(false);
    onToast('Randomized aesthetic parameters!');
  };

  const handleSaveScene = () => {
    saveCustomSceneToStorage(generatedScene);
    toggleSceneFavorite(generatedScene);
    setIsSaved(true);
    onToast(`Saved "${generatedScene.title}" to favorites!`);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-cinema-neon text-xs font-mono uppercase tracking-widest3 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO BUILDER</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Synthesize a Custom Aesthetic
          </h2>
          <p className="text-cinema-400 font-light text-sm mt-1 max-w-xl">
            Select an emotional mood, historical era, physical environment, and lighting condition to generate a bespoke aesthetic system.
          </p>
        </div>

        <button
          onClick={handleRandomize}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cinema-900 hover:bg-cinema-850 text-cinema-300 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5 text-cinema-gold" />
          Randomize Choices
        </button>
      </div>

      {/* Control Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mood Selector */}
        <div className="p-5 rounded-2xl bg-cinema-900/85 backdrop-blur-md border border-white/10 space-y-3 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-widest text-cinema-gold block font-semibold">
            01. Select Mood
          </span>
          <div className="grid grid-cols-2 gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMood(m);
                  setIsSaved(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-center ${
                  mood === m
                    ? 'bg-cinema-gold text-cinema-950 font-bold shadow-md'
                    : 'bg-cinema-800/80 text-cinema-300 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Era Selector */}
        <div className="p-5 rounded-2xl bg-cinema-900/85 backdrop-blur-md border border-white/10 space-y-3 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-widest text-cinema-teal block font-semibold">
            02. Select Era
          </span>
          <div className="grid grid-cols-2 gap-2">
            {ERAS.map((e) => (
              <button
                key={e}
                onClick={() => {
                  setEra(e);
                  setIsSaved(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-center ${
                  era === e
                    ? 'bg-cinema-teal text-cinema-950 font-bold shadow-md'
                    : 'bg-cinema-800/80 text-cinema-300 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Environment Selector */}
        <div className="p-5 rounded-2xl bg-cinema-900/85 backdrop-blur-md border border-white/10 space-y-3 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-widest text-white block font-semibold">
            03. Environment
          </span>
          <div className="grid grid-cols-2 gap-2">
            {ENVIRONMENTS.map((env) => (
              <button
                key={env}
                onClick={() => {
                  setEnvironment(env);
                  setIsSaved(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-center ${
                  environment === env
                    ? 'bg-white text-cinema-950 font-bold shadow-md'
                    : 'bg-cinema-800/80 text-cinema-300 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                }`}
              >
                {env}
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Selector */}
        <div className="p-5 rounded-2xl bg-cinema-900/85 backdrop-blur-md border border-white/10 space-y-3 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-widest text-cinema-rose block font-semibold">
            04. Lighting
          </span>
          <div className="grid grid-cols-2 gap-2">
            {LIGHTINGS.map((light) => (
              <button
                key={light}
                onClick={() => {
                  setLighting(light);
                  setIsSaved(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-center ${
                  lighting === light
                    ? 'bg-cinema-rose text-white font-bold shadow-md'
                    : 'bg-cinema-800/80 text-cinema-300 hover:text-white hover:bg-cinema-700/80 border border-white/5'
                }`}
              >
                {light}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Generated Aesthetic Result Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-cinema-900/85 backdrop-blur-xl border border-cinema-gold/30 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Title Header */}
        <div className="space-y-3 relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30 font-semibold">
              {generatedScene.era}
            </span>
            <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/50 text-cinema-200 border border-white/10">
              {generatedScene.environmentType}
            </span>
            <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/50 text-cinema-teal border border-cinema-teal/20">
              {generatedScene.lightingType} Light
            </span>
            <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/50 text-cinema-300 border border-white/10">
              {generatedScene.mood}
            </span>
          </div>

          <h3 className="font-cinematic text-3xl sm:text-5xl font-black text-white tracking-wide">
            {generatedScene.title}
          </h3>

          <p className="font-serif italic text-base sm:text-xl text-cinema-200">
            “{generatedScene.tagline}”
          </p>

          <p className="text-xs sm:text-sm text-cinema-300 font-light leading-relaxed">
            {generatedScene.description}
          </p>
        </div>

        {/* Chromatic Palette */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-between text-xs font-mono text-cinema-400 uppercase tracking-wider">
            <span>Synthesized Color Palette</span>
            <span>Click to view codes</span>
          </div>
          <div className="h-14 rounded-2xl overflow-hidden flex border border-white/15 shadow-xl">
            {generatedScene.colors.map((c, idx) => (
              <div
                key={idx}
                className="flex-1 h-full flex items-center justify-center relative group p-2"
                style={{ backgroundColor: c.hex }}
                title={`${c.name}: ${c.hex}`}
              >
                <span
                  className="text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-black/50 text-white"
                >
                  {c.hex}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Typography */}
          <div className="p-5 rounded-2xl bg-cinema-950/80 border border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-gold block">
              Typography Spec
            </span>
            <h4 className="font-cinematic text-base font-bold text-white">
              {generatedScene.typography.displayFont}
            </h4>
            <p className="text-xs text-cinema-300 font-light">
              Body: {generatedScene.typography.bodyFont}
            </p>
          </div>

          {/* Music */}
          <div className="p-5 rounded-2xl bg-cinema-950/80 border border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-teal block">
              Sonic Mood
            </span>
            <h4 className="font-cinematic text-base font-bold text-white">
              {generatedScene.music.genre}
            </h4>
            <p className="text-xs text-cinema-300 font-light">
              {generatedScene.music.bpmRange} · {generatedScene.music.energy}
            </p>
          </div>

          {/* Wardrobe */}
          <div className="p-5 rounded-2xl bg-cinema-950/80 border border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-rose block">
              Wardrobe Direction
            </span>
            <h4 className="font-cinematic text-base font-bold text-white">
              {generatedScene.outfit.silhouette}
            </h4>
            <p className="text-xs text-cinema-300 font-light line-clamp-1">
              {generatedScene.outfit.clothing}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 border-t border-white/10 relative z-10">
          <button
            onClick={handleSaveScene}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full border transition-all text-xs font-mono uppercase tracking-wider font-semibold ${
              isSaved
                ? 'bg-cinema-rose/20 text-cinema-rose border-cinema-rose/40'
                : 'bg-cinema-900 text-white hover:bg-cinema-850 border-white/15'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Saved to Favorites
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-cinema-rose" />
                Save Aesthetic
              </>
            )}
          </button>

          <button
            onClick={() => onSelectScene(generatedScene)}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3 rounded-full bg-cinema-gold hover:bg-amber-400 text-cinema-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg"
          >
            Explore Full Aesthetic
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
