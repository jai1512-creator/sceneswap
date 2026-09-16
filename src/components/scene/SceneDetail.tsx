import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Sparkles, Disc, Eye, Download } from 'lucide-react';
import { Scene } from '../../types/scene';
import { ColorSection } from '../sections/ColorSection';
import { TypographySection } from '../sections/TypographySection';
import { LightingSection } from '../sections/LightingSection';
import { MusicSection } from '../sections/MusicSection';
import { InteriorSection } from '../sections/InteriorSection';
import { OutfitSection } from '../sections/OutfitSection';
import { EnvironmentSection } from '../sections/EnvironmentSection';
import { MoodboardView } from '../moodboard/MoodboardView';

interface SceneDetailProps {
  scene: Scene;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, scene: Scene) => void;
  onBack: () => void;
  onRemixWith: (scene: Scene) => void;
  onShare: (scene: Scene) => void;
  onToast: (msg: string) => void;
}

export const SceneDetail: React.FC<SceneDetailProps> = ({
  scene,
  isFavorite,
  onToggleFavorite,
  onBack,
  onRemixWith,
  onShare,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'moodboard'>('anatomy');
  const [heroImageSrc, setHeroImageSrc] = useState(scene.heroImage);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  React.useEffect(() => {
    setHeroImageSrc(scene.heroImage);
    setImageLoaded(false);
    setImageFailed(false);
  }, [scene.heroImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-cinema-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Curated Scene Archive
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onRemixWith(scene)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cinema-gold/10 hover:bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30 text-xs font-mono uppercase tracking-wider transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Remix with this Scene
          </button>

          <button
            onClick={(e) => onToggleFavorite(e, scene)}
            className={`p-2.5 rounded-full border transition-colors ${
              isFavorite
                ? 'bg-cinema-rose/20 text-cinema-rose border-cinema-rose/40'
                : 'bg-cinema-900 text-cinema-400 hover:text-white border-white/10 hover:bg-cinema-850'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-cinema-rose' : ''}`} />
          </button>

          <button
            onClick={() => onShare(scene)}
            className="p-2.5 rounded-full bg-cinema-900 text-cinema-400 hover:text-white border border-white/10 hover:bg-cinema-850 transition-colors"
            aria-label="Share Aesthetic"
            title="Share Aesthetic"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cinematic Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cinema-950">
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full min-h-[360px] overflow-hidden">
          {/* Ambient luminous backing so there is never an unstyled void */}
          <div
            className="absolute inset-0 transition-transform duration-1000"
            style={{
              background: `radial-gradient(circle at 60% 40%, ${scene.lighting.ambientHex1}50 0%, ${scene.lighting.ambientHex2}30 50%, #070709 100%)`,
            }}
          />

          {!imageFailed && (
            <img
              src={heroImageSrc}
              alt={scene.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                if (scene.visualReferences && scene.visualReferences[0]?.url && heroImageSrc !== scene.visualReferences[0].url) {
                  setHeroImageSrc(scene.visualReferences[0].url);
                } else {
                  setImageFailed(true);
                }
              }}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Layered cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-950/90 via-transparent to-transparent pointer-events-none" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-end max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30 font-semibold">
                {scene.era}
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/60 text-cinema-200 border border-white/10">
                {scene.environmentType}
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/60 text-cinema-teal border border-cinema-teal/20">
                {scene.lightingType} Light
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/60 text-cinema-300 border border-white/10">
                {scene.mood}
              </span>
            </div>

            <h1 className="font-cinematic text-4xl sm:text-6xl font-black text-white tracking-wide">
              {scene.title}
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-cinema-200 leading-snug max-w-2xl">
              “{scene.tagline}”
            </p>

            <p className="text-xs sm:text-sm text-cinema-400 font-light leading-relaxed max-w-2xl">
              {scene.description}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 pt-2">
              {scene.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-mono tracking-wider bg-cinema-900/80 text-cinema-300 border border-white/10"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Tabs: Aesthetic Anatomy vs Designer Moodboard */}
      <div className="flex items-center justify-center border-b border-white/10 pb-6">
        <div className="flex items-center p-1.5 rounded-full bg-cinema-900 border border-white/10 shadow-inner">
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
              activeTab === 'anatomy'
                ? 'bg-cinema-gold text-cinema-950 font-bold shadow-lg'
                : 'text-cinema-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            01–07 Aesthetic Breakdown
          </button>

          <button
            onClick={() => setActiveTab('moodboard')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
              activeTab === 'moodboard'
                ? 'bg-cinema-gold text-cinema-950 font-bold shadow-lg'
                : 'text-cinema-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Designer's Moodboard
          </button>
        </div>
      </div>

      {/* View Content */}
      {activeTab === 'anatomy' ? (
        <div className="space-y-20">
          {/* 01 COLOR */}
          <section id="section-color" className="scroll-mt-28">
            <ColorSection colors={scene.colors} onToast={onToast} />
          </section>

          {/* 02 TYPOGRAPHY */}
          <section id="section-typography" className="scroll-mt-28">
            <TypographySection typography={scene.typography} />
          </section>

          {/* 03 LIGHTING */}
          <section id="section-lighting" className="scroll-mt-28">
            <LightingSection lighting={scene.lighting} />
          </section>

          {/* 04 MUSIC VIBE */}
          <section id="section-music" className="scroll-mt-28">
            <MusicSection music={scene.music} />
          </section>

          {/* 05 INTERIOR */}
          <section id="section-interior" className="scroll-mt-28">
            <InteriorSection interior={scene.interior} />
          </section>

          {/* 06 OUTFIT */}
          <section id="section-outfit" className="scroll-mt-28">
            <OutfitSection outfit={scene.outfit} />
          </section>

          {/* 07 ENVIRONMENT */}
          <section id="section-environment" className="scroll-mt-28">
            <EnvironmentSection environment={scene.environment} />
          </section>
        </div>
      ) : (
        <MoodboardView scene={scene} onToast={onToast} />
      )}
    </div>
  );
};
