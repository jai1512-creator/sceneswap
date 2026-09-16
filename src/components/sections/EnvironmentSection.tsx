import React from 'react';
import { CloudRain, Compass, Camera, Sparkles, Building2, Wind } from 'lucide-react';
import { EnvironmentSpec } from '../../types/scene';

interface EnvironmentSectionProps {
  environment: EnvironmentSpec;
}

export const EnvironmentSection: React.FC<EnvironmentSectionProps> = ({ environment }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-cinema-gold text-xs tracking-widest3 uppercase block mb-1">
            07 — ENVIRONMENT & CINEMATOGRAPHY
          </span>
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Cinematic World-Building
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-cinema-400">
          <Camera className="w-3.5 h-3.5 text-cinema-gold" />
          Camera Package & Optical Profile
        </div>
      </div>

      {/* Environment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weather */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-gold text-xs font-mono uppercase tracking-wider">
            <CloudRain className="w-3.5 h-3.5" />
            Weather & Meteorological State
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {environment.weather}
          </p>
        </div>

        {/* Landscape */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-teal text-xs font-mono uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Landscape & Topography
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {environment.landscape}
          </p>
        </div>

        {/* Atmosphere */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cinema-rose text-xs font-mono uppercase tracking-wider">
            <Wind className="w-3.5 h-3.5" />
            Atmospheric Texture
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {environment.atmosphere}
          </p>
        </div>

        {/* Architecture */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-cinema-400 text-xs font-mono uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Architectural Geometry
          </div>
          <p className="text-xs sm:text-sm text-cinema-200 font-light leading-relaxed">
            {environment.architecture}
          </p>
        </div>

        {/* Objects */}
        <div className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-400">
            Physical World Objects
          </div>
          <div className="flex flex-wrap gap-1.5">
            {environment.objects.map((obj, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-cinema-800 text-cinema-300 border border-white/5"
              >
                {obj}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Camera & Photography Callout Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cinema-900 to-cinema-850 border border-cinema-gold/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5 text-cinema-gold text-xs font-mono uppercase tracking-widest">
          <Camera className="w-4 h-4" />
          Lens Profile & Photographic Emulation
        </div>
        <h4 className="font-cinematic text-xl sm:text-2xl font-bold text-white">
          {environment.cameraCharacteristics}
        </h4>
        <p className="text-xs sm:text-sm text-cinema-300 font-light leading-relaxed max-w-3xl">
          Captured with intentional lens aberration, controlled depth of field, and film stock halation to preserve organic cinematic texture.
        </p>
      </div>
    </div>
  );
};
