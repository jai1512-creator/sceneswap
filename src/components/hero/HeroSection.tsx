import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, PlusCircle, Compass, Sparkles } from 'lucide-react';
import { Scene } from '../../types/scene';
import baroqueFrescoImg from '../../assets/baroque-fresco.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCreateClick: () => void;
  onSelectScene: (scene: Scene) => void;
  featuredScenes: Scene[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  phase: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCreateClick,
  onSelectScene,
  featuredScenes,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax offsets (interpolated with spring damping)
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const targetParallax = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  // Mouse Parallax with smooth lerp
  useEffect(() => {
    // Check for touch / coarse pointer or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      targetParallax.current = { x: nx, y: ny };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    const lerp = (current: number, target: number, speed: number) =>
      current + (target - current) * speed;

    const animate = () => {
      if (isVisibleRef.current) {
        setParallax((prev) => ({
          x: lerp(prev.x, targetParallax.current.x, 0.045),
          y: lerp(prev.y, targetParallax.current.y, 0.045),
        }));
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Floating Golden Dust Particle System (illuminated motes in the palace sunbeam)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize 42 dust motes
    const particleCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.15 + Math.random() * 0.35, // Drifts rightward
        vy: 0.1 + Math.random() * 0.25, // Drifts gently downward
        radius: 0.75 + Math.random() * 1.6,
        alpha: Math.random() * 0.5,
        maxAlpha: 0.3 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let frameId: number;
    let t = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        frameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Diagonal drift along god ray trajectory with gentle harmonic oscillation
        p.x += p.vx + Math.cos(t + p.phase) * 0.25;
        p.y += p.vy + Math.sin(t + p.phase) * 0.15;

        // Wrap around canvas boundaries
        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.y < -10) p.y = height + 10;

        // Subtle twinkling opacity
        const currentAlpha =
          Math.max(0, Math.sin(t * 0.8 + p.phase)) * p.maxAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Antique gold illuminated dust hue
        ctx.fillStyle = `rgba(235, 205, 145, ${currentAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(245, 215, 155, 0.6)';
        ctx.fill();
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    // Pause rendering when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden border-b border-white/5 animate-entrance-fade"
    >
      {/* =========================================================================
          LAYER 1: LIVING BAROQUE FRESCO & PALACE CEILING CANVAS
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Living Fresco Backdrop with slow camera drift and layered parallax */}
        <div
          className="w-full h-full transform-gpu transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${parallax.x * 7}px, ${parallax.y * 6}px, 0)`,
          }}
        >
          <img
            src={baroqueFrescoImg}
            alt="Living Baroque Palace Fresco Ceiling"
            className="w-full h-full object-cover object-[50%_42%] transform scale-105 animate-fresco-drift motion-reduce:transform-none filter contrast-[1.12] brightness-[0.88] saturate-[1.15]"
          />
        </div>

        {/* =========================================================================
            LAYER 2: GLIDING CLASSICAL BIRDS ACROSS TERRACOTTA SKY
            ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            transform: `translate3d(${parallax.x * 4}px, ${parallax.y * 3}px, 0)`,
          }}
        >
          {/* Bird 1: Elegant classical swallow gliding across upper fresco clouds */}
          <div className="absolute top-[26%] left-[12%] animate-bird-glide pointer-events-none">
            <svg
              className="w-8 h-8 text-amber-900/60 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transform -rotate-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.5 7.5 4 8.5 1 9c4.5 2 7.5 4 9 9 1.5-5 4.5-7 9-9-3-0.5-7.5-1.5-7-7z" />
            </svg>
          </div>

          {/* Bird 2: Companion swallow following at lower offset */}
          <div
            className="absolute top-[32%] left-[18%] animate-bird-glide pointer-events-none"
            style={{ animationDelay: '14s' }}
          >
            <svg
              className="w-6 h-6 text-amber-950/50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] transform -rotate-6 scale-90"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.5 7.5 4 8.5 1 9c4.5 2 7.5 4 9 9 1.5-5 4.5-7 9-9-3-0.5-7.5-1.5-7-7z" />
            </svg>
          </div>
        </div>

        {/* =========================================================================
            LAYER 3: BREATHING PALACE WINDOW & VOLUMETRIC SUNBEAMS (GOD RAYS)
            ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 10}px, 0)`,
          }}
        >
          {/* Left Arched Palace Window Aperture Light Source */}
          <div className="absolute top-[28%] -left-12 sm:left-0 w-64 sm:w-80 h-96 bg-gradient-to-r from-amber-100/50 via-cinema-gold/30 to-transparent rounded-full blur-[80px] mix-blend-screen pointer-events-none" />

          {/* Volumetric Sunbeam 1: Primary Diagonal Golden Light Stream */}
          <div
            className="absolute top-[22%] left-0 sm:left-[3%] w-[900px] h-[340px] origin-top-left -rotate-[18deg] bg-gradient-to-r from-amber-100/40 via-cinema-gold/22 to-transparent blur-[55px] mix-blend-screen pointer-events-none animate-god-ray-breathe"
          />

          {/* Volumetric Sunbeam 2: Narrower High-Intensity Shimmer Shaft */}
          <div
            className="absolute top-[30%] left-0 sm:left-[4%] w-[800px] h-[160px] origin-top-left -rotate-[22deg] bg-gradient-to-r from-amber-50/50 via-amber-200/25 to-transparent blur-[35px] mix-blend-screen pointer-events-none animate-god-ray-breathe"
            style={{ animationDelay: '3s' }}
          />

          {/* Central Dome Ambient Golden Glow */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cinema-gold/14 rounded-full blur-[140px] mix-blend-screen pointer-events-none animate-pulse-subtle" />

          {/* Anamorphic Golden Flare Line across the architecture */}
          <div className="absolute top-[44%] left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-cinema-gold/35 to-transparent blur-[1px] pointer-events-none" />
        </div>

        {/* =========================================================================
            LAYER 4: FLOATING PALACE DUST MOTES (CANVAS)
            ========================================================================= */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10 opacity-80 mix-blend-screen"
        />

        {/* =========================================================================
            LAYER 5: THEATRICAL CHIAROSCURO READABILITY SCRIM & SEAMLESS TRANSITIONS
            ========================================================================= */}
        {/* Seamless Blend into Top Navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-950/95 via-transparent via-22% to-transparent" />

        {/* Seamless Blend into Bottom Archive */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/85 via-18% to-transparent" />

        {/* Theatrical Vignette: deepens corners into rich charcoal-black and antique bronze */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_45%,transparent_22%,rgba(7,7,9,0.38)_55%,rgba(7,7,9,0.85)_100%)]" />

        {/* Center Chiaroscuro Contrast Scrim directly behind typography for 100% legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_46%,rgba(7,7,9,0.48)_0%,rgba(7,7,9,0.25)_60%,transparent_100%)]" />

        {/* Subtle Carved Border Geometry Accent (hidden on small mobile to maximize view) */}
        <div className="hidden sm:block absolute inset-x-8 sm:inset-x-16 top-16 bottom-20 border border-cinema-gold/10 rounded-[2.5rem] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_48%,transparent_40%,#000_100%)] pointer-events-none" />

        {/* =========================================================================
            LAYER 6: FOREGROUND DEPTH (LOGGIA FOLIAGE SILHOUETTES)
            ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * -22}px, ${parallax.y * -18}px, 0)`,
          }}
        >
          {/* Top-Right Loggia Olive Branch / Foliage Silhouette (Soft Depth of Field) */}
          <div className="absolute -top-10 -right-12 w-64 sm:w-80 h-64 sm:h-80 opacity-35 filter blur-[2.5px] pointer-events-none text-emerald-950">
            <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform rotate-45 scale-110">
              <path d="M20 180 C40 140, 80 120, 160 40 C140 70, 110 110, 80 140 C50 170, 30 180, 20 180 Z" opacity="0.8" />
              <path d="M60 130 C85 105, 120 90, 150 55 C130 80, 100 110, 75 125 Z" opacity="0.6" />
              <circle cx="110" cy="95" r="14" opacity="0.7" />
              <circle cx="140" cy="65" r="12" opacity="0.6" />
              <circle cx="85" cy="120" r="16" opacity="0.8" />
            </svg>
          </div>

          {/* Bottom-Left Soft Architectural / Foliage Framing */}
          <div className="absolute -bottom-8 -left-10 w-56 sm:w-72 h-56 sm:h-72 opacity-25 filter blur-[3px] pointer-events-none text-stone-950">
            <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform -rotate-12 scale-110">
              <path d="M180 180 C140 140, 110 90, 40 30 C70 60, 110 110, 140 140 C170 170, 180 180, 180 180 Z" opacity="0.7" />
              <circle cx="95" cy="85" r="15" opacity="0.6" />
              <circle cx="65" cy="55" r="12" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO FOREGROUND CONTENT (PRESERVED STRUCTURE & ENHANCED CHIAROSCURO)
          ========================================================================= */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 w-full">
        {/* Curated Editorial Subhead */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-cinema-gold/40 bg-cinema-950/85 backdrop-blur-md shadow-xl shadow-black/60 transition-transform duration-300 hover:scale-105 max-w-[92vw]">
          <span className="w-1.5 h-1.5 rounded-full bg-cinema-gold animate-ping flex-shrink-0" />
          <span className="text-[9px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest2 uppercase text-cinema-gold font-medium truncate">
            Cinematic Aesthetic Discovery Engine
          </span>
        </div>

        {/* Main Title with Metallic Antique Gold Gleam & Chiaroscuro Depth */}
        <div className="space-y-3 sm:space-y-4 w-full">
          <h1 className="font-cinematic text-4xl sm:text-7xl md:text-8xl font-black tracking-wider sm:tracking-widest2 leading-tight drop-shadow-[0_14px_40px_rgba(0,0,0,0.95)]">
            <span className="text-white">SCENE</span>
            <span className="bg-gradient-to-br from-[#FDF0CD] via-[#E5C07B] to-[#B38F3F] bg-clip-text text-transparent font-serif italic font-normal tracking-normal ml-1">
              SWAP
            </span>
          </h1>
          <p className="font-serif text-xl sm:text-3xl md:text-4xl text-cinema-100 italic tracking-wide font-light max-w-2xl mx-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] px-2">
            “Step into the aesthetic of a scene.”
          </p>
        </div>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-base md:text-lg text-cinema-200 font-light max-w-xl mx-auto leading-relaxed tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] px-4">
          Choose a visual world. Discover its colors, light, sound, spaces and style.
        </p>

        {/* Primary & Secondary CTAs with Subtle Shine Sweeps */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={onExploreClick}
            className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-white text-cinema-950 font-semibold text-xs tracking-widest uppercase hover:bg-cinema-gold hover:shadow-[0_0_30px_rgba(229,192,123,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_12px_30px_-5px_rgba(255,255,255,0.25)] group active:scale-[0.98]"
          >
            {/* Subtle Shine Sweep on Hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            <Compass className="w-4 h-4 text-cinema-950 group-hover:rotate-45 transition-transform" />
            <span className="relative z-10">Explore Scenes</span>
          </button>

          <button
            onClick={onCreateClick}
            className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-cinema-950/85 hover:bg-cinema-900 text-white font-medium text-xs tracking-widest uppercase border border-white/20 hover:border-cinema-gold/50 hover:shadow-[0_0_25px_rgba(229,192,123,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 backdrop-blur-md shadow-xl shadow-black/60 group active:scale-[0.98]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer-sweep bg-gradient-to-r from-transparent via-cinema-gold/15 to-transparent pointer-events-none" />
            <PlusCircle className="w-4 h-4 text-cinema-neon" />
            <span className="relative z-10">Create a Scene</span>
          </button>
        </div>

        {/* Quick Aesthetic Jump Bar */}
        <div className="pt-8 w-full max-w-2xl">
          <div className="flex items-center justify-center gap-2 text-xs text-cinema-300 font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cinema-gold" />
            Featured Worlds
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {featuredScenes.slice(0, 5).map((scene) => (
              <button
                key={scene.id}
                onClick={() => onSelectScene(scene)}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cinema-950/80 hover:bg-cinema-900 border border-white/10 hover:border-cinema-gold/50 text-xs text-cinema-200 hover:text-white backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-[0_4px_16px_rgba(229,192,123,0.15)]"
              >
                <span
                  className="w-2 h-2 rounded-full ring-1 ring-white/20 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: scene.colors[0]?.hex || '#E5C07B' }}
                />
                <span className="tracking-wide font-medium">{scene.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={onExploreClick}
        aria-label="Scroll down to scenes"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-cinema-400 hover:text-white transition-colors animate-bounce focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold rounded-full z-20"
      >
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
};

