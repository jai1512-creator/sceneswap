import React, { useState, useEffect, useMemo } from 'react';
import { Scene } from '../../types/scene';

export type BackgroundVariant = 'explore' | 'create' | 'favorites' | 'remix' | 'detail';

interface CinematicBackgroundProps {
  variant: BackgroundVariant;
  scene?: Scene | null;
  remixScenes?: {
    sceneA?: Scene | null;
    sceneB?: Scene | null;
  };
  className?: string;
}

// Curated cinematic imagery for specific scenes (dark, high-resolution, atmospheric)
const SCENE_BACKGROUNDS: Record<string, string> = {
  'cyberpunk-city': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80',
  'monsoon-noir': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=2000&q=80',
  '80s-neon': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=80',
  'dark-academia': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=80',
  'vintage-cafe': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80',
  'futuristic-minimalism': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
  'bollywood-retro': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=2000&q=80',
  'dreamy-cottagecore': 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80',
  'desert-western': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80',
  'coastal-summer': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
  'golden-age-hollywood': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80',
};

// Fallback environment imagery for custom synthesized scenes
const ENVIRONMENT_BACKGROUNDS: Record<string, string> = {
  'City': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80',
  'Café': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80',
  'Bedroom': 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=2000&q=80',
  'Street': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=2000&q=80',
  'Desert': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80',
  'Forest': 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80',
  'Coast': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
  'Interior': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=80',
};

// Major page atmospheric backgrounds
const PAGE_BACKGROUNDS: Record<Exclude<BackgroundVariant, 'detail' | 'remix'>, string> = {
  // Explore: Dark cinematic collage suggesting multiple visual worlds (fragments of environments, architecture, distant lights)
  explore: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80',
  // Create: Dark atmospheric artist/studio environment with mood boards, canvas textures, low-key lighting
  create: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=2000&q=80',
  // Favorites: Dimly lit elegant art gallery/archive with framed artwork and architectural depth in shadow
  favorites: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=2000&q=80',
};

// Dual-world imagery for Remix
const REMIX_WORLDS = {
  leftWorld: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80', // Cool cyber neon
  rightWorld: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=2000&q=80', // Warm amber vintage
};

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  variant,
  scene,
  remixScenes,
  className = '',
}) => {
  // Resolve primary background image URL
  const primaryImageUrl = useMemo(() => {
    if (variant === 'detail') {
      if (scene) {
        if (SCENE_BACKGROUNDS[scene.id]) {
          return SCENE_BACKGROUNDS[scene.id];
        }
        if (ENVIRONMENT_BACKGROUNDS[scene.environmentType]) {
          return ENVIRONMENT_BACKGROUNDS[scene.environmentType];
        }
        if (scene.heroImage) {
          return scene.heroImage;
        }
      }
      return SCENE_BACKGROUNDS['cyberpunk-city'];
    }

    if (variant === 'remix') {
      // Handled via dual-world split layer
      return null;
    }

    return PAGE_BACKGROUNDS[variant] || PAGE_BACKGROUNDS.explore;
  }, [variant, scene]);

  // Image load state for smooth crossfade
  const [activeImage, setActiveImage] = useState<string | null>(primaryImageUrl);
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const [isCrossfading, setIsCrossfading] = useState<boolean>(false);

  useEffect(() => {
    if (variant === 'remix') return;
    if (primaryImageUrl && primaryImageUrl !== activeImage) {
      setPrevImage(activeImage);
      setIsCrossfading(true);

      const img = new Image();
      img.src = primaryImageUrl;
      img.onload = () => {
        setActiveImage(primaryImageUrl);
        const timer = setTimeout(() => {
          setIsCrossfading(false);
          setPrevImage(null);
        }, 700);
        return () => clearTimeout(timer);
      };
      img.onerror = () => {
        setActiveImage(primaryImageUrl);
        setIsCrossfading(false);
        setPrevImage(null);
      };
    }
  }, [primaryImageUrl, activeImage, variant]);

  // Ambient lighting glow extracted from scene if available
  const ambientGlow1 = scene?.lighting?.ambientHex1 || (variant === 'create' ? '#E5C07B' : variant === 'favorites' ? '#9D4EDD' : '#00F0FF');
  const ambientGlow2 = scene?.lighting?.ambientHex2 || (variant === 'create' ? '#F39C12' : variant === 'favorites' ? '#E5C07B' : '#FF0055');

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Underlying Atmospheric Ambient Glow Base */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 opacity-25"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 30%, ${ambientGlow1}35 0%, ${ambientGlow2}15 50%, #070709 100%)`,
        }}
      />

      {/* 2. REMIX DUAL-WORLD BLENDED BACKGROUND */}
      {variant === 'remix' ? (
        <div className="absolute inset-0 overflow-hidden">
          {/* Left World (Cool / Neon Aesthetic) */}
          <div
            className="absolute inset-0 w-full h-full object-cover bg-cover bg-center transition-transform duration-1000 animate-ken-burns motion-reduce:transform-none"
            style={{
              backgroundImage: `url(${remixScenes?.sceneA?.heroImage || REMIX_WORLDS.leftWorld})`,
              filter: 'brightness(0.62) contrast(1.15) saturate(1.25) blur(1.5px)',
              clipPath: 'polygon(0 0, 56% 0, 44% 100%, 0 100%)',
            }}
          />

          {/* Right World (Warm / Vintage / Architectural Aesthetic) */}
          <div
            className="absolute inset-0 w-full h-full object-cover bg-cover bg-center transition-transform duration-1000 animate-ken-burns motion-reduce:transform-none"
            style={{
              backgroundImage: `url(${remixScenes?.sceneB?.heroImage || REMIX_WORLDS.rightWorld})`,
              filter: 'brightness(0.60) contrast(1.15) saturate(1.25) blur(1.5px)',
              clipPath: 'polygon(56% 0, 100% 0, 100% 100%, 44% 100%)',
            }}
          />

          {/* Chromatic Blend Seam / Refraction Rift down the center */}
          <div
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{
              background: `linear-gradient(105deg, transparent 44%, ${remixScenes?.sceneA?.colors?.[0]?.hex || '#00F0FF'}45 48%, #E5C07B90 50%, ${remixScenes?.sceneB?.colors?.[0]?.hex || '#FF0055'}45 52%, transparent 56%)`,
              filter: 'blur(3px)',
            }}
          />

          {/* Dynamic palette wash based on selected remix pair */}
          {remixScenes?.sceneA?.colors?.[0] && (
            <div
              className="absolute left-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 25% 45%, ${remixScenes.sceneA.colors[0].hex} 0%, transparent 70%)`,
              }}
            />
          )}
          {remixScenes?.sceneB?.colors?.[0] && (
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 75% 45%, ${remixScenes.sceneB.colors[0].hex} 0%, transparent 70%)`,
              }}
            />
          )}
        </div>
      ) : (
        /* 3. STANDARD SINGLE-WORLD CINEMATIC IMAGE WITH CROSSFADE */
        <div className="absolute inset-0 overflow-hidden">
          {/* Previous image fading out during crossfade */}
          {prevImage && isCrossfading && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 opacity-0"
              style={{
                backgroundImage: `url(${prevImage})`,
                filter: 'brightness(0.62) contrast(1.15) saturate(1.20) blur(1.5px)',
              }}
            />
          )}

          {/* Active background image with subtle ambient motion */}
          {activeImage && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 animate-ken-burns motion-reduce:transform-none"
              style={{
                backgroundImage: `url(${activeImage})`,
                filter: 'brightness(0.64) contrast(1.15) saturate(1.20) blur(1.5px)',
                transform: 'scale(1.03)',
              }}
            />
          )}
        </div>
      )}

      {/* 4. Single Calibrated Chiaroscuro Radial Scrim:
          Subtle at perimeter (40-60%) so the cinematic environment is clearly recognizable,
          calibrated behind cards (45-58%) so all text and UI elements remain 100% readable. */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 95% 85% at 50% 40%, rgba(7,7,9,0.46) 0%, rgba(7,7,9,0.58) 55%, rgba(7,7,9,0.78) 100%)',
        }}
      />

      {/* 5. Vertical Edge Fades: Seamlessly blends into navbar above and footer below */}
      <div className="absolute inset-0 bg-gradient-to-b from-cinema-950/85 via-transparent to-cinema-950/85" />

      {/* 6. Subtle Golden Key Edge Tint (SceneSwap Visual Identity) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cinema-gold/15 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cinema-gold/10 to-transparent" />
    </div>
  );
};
