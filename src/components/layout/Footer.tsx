import React from 'react';
import { RotateCcw, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'explore' | 'create' | 'favorites') => void;
  onOpenRemix: () => void;
  onResetWorkspace?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRemix, onResetWorkspace }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-cinema-950 text-cinema-400 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-cinema-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cinema-800 border border-white/15 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full border border-cinema-gold flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cinema-neon" />
                </div>
              </div>
              <span className="font-cinematic text-xl font-bold tracking-widest2 text-white">
                SCENESWAP
              </span>
            </div>

            <p className="font-serif italic text-cinema-300 text-lg">
              “Step into the aesthetic of a scene.”
            </p>

            <p className="text-xs text-cinema-400 font-light max-w-md leading-relaxed">
              SceneSwap is an interactive cinematic visual-aesthetic discovery engine. We decompose visual worlds into structured chromatic palettes, typography, lighting, music vibes, interiors, wardrobes, and environmental parameters.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-cinema-gold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white transition-colors"
                >
                  Explore Scenes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('create')}
                  className="hover:text-white transition-colors"
                >
                  Create a Scene
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="hover:text-white transition-colors"
                >
                  Saved Favorites
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRemix}
                  className="text-cinema-gold hover:underline transition-colors"
                >
                  Remix The Scene
                </button>
              </li>
              {onResetWorkspace && (
                <li className="pt-2 border-t border-white/5">
                  <button
                    onClick={onResetWorkspace}
                    className="text-cinema-500 hover:text-cinema-rose flex items-center gap-1.5 transition-colors"
                    title="Clear previous edits and restore clean slate"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset to Fresh State
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Principles & Credits */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-cinema-teal">
              Design Principles
            </div>
            <ul className="space-y-1.5 text-xs text-cinema-400 font-light">
              <li>· Zero generic SaaS templates</li>
              <li>· Real Web Audio synthesis</li>
              <li>· Deterministic local logic</li>
              <li>· Respects prefers-reduced-motion</li>
              <li>· Authentic editorial typography</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Colophon */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cinema-500">
          <div>
            © {new Date().getFullYear()} SceneSwap Studio. Curated with artistic precision.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-cinema-400 hover:text-white transition-colors"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
