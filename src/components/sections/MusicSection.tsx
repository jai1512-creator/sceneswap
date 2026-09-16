import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, Activity, Radio, Music } from 'lucide-react';
import { MusicVibeSpec } from '../../types/scene';
import { ambientAudio } from '../../services/ambientAudio';

interface MusicSectionProps {
  music: MusicVibeSpec;
}

export const MusicSection: React.FC<MusicSectionProps> = ({ music }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Sync state with audio engine
  useEffect(() => {
    setIsPlaying(ambientAudio.isPlaying() && ambientAudio.getCurrentPreset() === music.audioPreset);

    return () => {
      // do not forcibly kill global audio on unmount if user wants continuous playback, but clean up animation frame
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [music.audioPreset]);

  // Handle Play/Stop Toggle
  const togglePlay = () => {
    if (isPlaying) {
      ambientAudio.stop();
      setIsPlaying(false);
    } else {
      ambientAudio.setVolume(volume);
      ambientAudio.play(music.audioPreset);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientAudio.setVolume(val);
  };

  // Real-time Canvas Waveform / Spectrum Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animFrameIdRef.current = requestAnimationFrame(draw);
      const analyser = ambientAudio.getAnalyser();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isPlaying || !analyser) {
        // Draw resting subtle line
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.strokeStyle = '#252736';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#E5C07B');
        gradient.addColorStop(0.5, '#00F0FF');
        gradient.addColorStop(1, '#FF2A6D');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-cinema-gold text-xs tracking-widest3 uppercase block mb-1">
            04 — MUSIC VIBE & SOUNDSCAPE
          </span>
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Acoustic & Sonic Identity
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-cinema-400">
          <Activity className="w-3.5 h-3.5 text-cinema-gold" />
          Procedural Ambient Audio (Royalty-Free)
        </div>
      </div>

      {/* Interactive Soundscape Player Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-cinema-900/80 border border-white/15 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cinema-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Track Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cinema-gold text-xs font-mono uppercase tracking-widest">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              {isPlaying ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Soundscape Active · Playing
                </span>
              ) : (
                'Generative Ambient Environment'
              )}
            </div>
            <h4 className="font-cinematic text-xl sm:text-2xl font-bold text-white">
              {music.genre}
            </h4>
            <p className="text-xs text-cinema-400 font-mono">
              BPM: {music.bpmRange} · Energy: {music.energy} · Mood: {music.mood}
            </p>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-cinema-950/60 px-3 py-2 rounded-xl border border-white/10">
              <Volume2 className="w-4 h-4 text-cinema-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="accent-cinema-gold cursor-pointer w-20 h-1.5 bg-cinema-700 rounded-lg"
                title="Soundscape Volume"
                aria-label="Soundscape Volume"
              />
              <span className="text-[11px] font-mono text-cinema-300 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>

            <button
              onClick={togglePlay}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                isPlaying
                  ? 'bg-cinema-rose text-white border border-cinema-rose/40'
                  : 'bg-cinema-gold hover:bg-amber-400 text-cinema-950 shadow-[0_0_20px_rgba(229,192,123,0.3)]'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  Stop Mood
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Play Mood
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Frequency Visualizer Canvas */}
        <div className="relative h-16 w-full rounded-xl bg-cinema-950/80 border border-white/5 overflow-hidden flex items-center p-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={64}
            className="w-full h-full"
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-cinema-500 uppercase tracking-widest pointer-events-none">
              Press "Play Mood" for procedural Web Audio soundscape
            </div>
          )}
        </div>
      </div>

      {/* Structured Sonic Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-gold">
            Instrumentation Matrix
          </div>
          <p className="text-xs text-cinema-200 font-light leading-relaxed">
            {music.instruments}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-teal">
            Rhythmic Cadence & Tempo
          </div>
          <p className="text-xs text-cinema-200 font-light leading-relaxed">
            Structured at {music.bpmRange} ({music.bpmNumber} BPM target). Designed for focused contemplation without rhythmic distraction.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-cinema-400">
            Listening Keywords
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {music.listeningKeywords.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-cinema-800 text-cinema-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
