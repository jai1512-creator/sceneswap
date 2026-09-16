import { AudioPreset } from '../types/scene';

class AmbientAudioService {
  private ctx: AudioContext | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeIntervals: number[] = [];
  private activeNodes: (AudioNode | AudioScheduledSourceNode)[] = [];
  private currentPreset: AudioPreset | null = null;
  private isPlayingState = false;
  private volumeLevel = 0.85;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Compressor for balanced, clear, punchy sound
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      // Routing: Compressor -> Master Gain -> Analyser -> Destination
      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public getCurrentPreset(): AudioPreset | null {
    return this.currentPreset;
  }

  public setVolume(val: number) {
    this.volumeLevel = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volumeLevel, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    if (!this.isPlayingState || !this.ctx) return;

    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.1);
    }

    // Clear all interval timers
    this.activeIntervals.forEach(id => window.clearInterval(id));
    this.activeIntervals = [];

    setTimeout(() => {
      this.activeNodes.forEach(node => {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          try {
            (node as AudioScheduledSourceNode).stop();
          } catch {
            // ignore
          }
        }
        try {
          node.disconnect();
        } catch {
          // ignore
        }
      });
      this.activeNodes = [];
      this.isPlayingState = false;
      this.currentPreset = null;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
      }
    }, 150);
  }

  public play(preset: AudioPreset) {
    if (this.isPlayingState && this.currentPreset === preset) {
      this.stop();
      return;
    }

    if (this.isPlayingState) {
      this.stop();
    }

    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      this.currentPreset = preset;
      this.isPlayingState = true;

      // Smooth fade in
      this.masterGain?.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain?.gain.setTargetAtTime(this.volumeLevel, this.ctx.currentTime, 0.25);

      switch (preset) {
        case 'synthwave':
          this.buildSynthwaveMusic();
          break;
        case 'outrun':
          this.buildOutrunMusic();
          break;
        case 'monsoon':
          this.buildMonsoonMusic();
          break;
        case 'academia':
          this.buildAcademiaMusic();
          break;
        case 'cafe':
          this.buildCafeMusic();
          break;
        case 'minimalism':
          this.buildMinimalismMusic();
          break;
        case 'bollywood':
          this.buildBollywoodMusic();
          break;
        case 'cottagecore':
          this.buildCottagecoreMusic();
          break;
        case 'western':
          this.buildWesternMusic();
          break;
        case 'coastal':
          this.buildCoastalMusic();
          break;
        case 'hollywood':
          this.buildHollywoodMusic();
          break;
        case 'ambient':
        default:
          this.buildAmbientMusic();
          break;
      }
    } catch (e) {
      console.warn('Web Audio synthesis error:', e);
      this.isPlayingState = false;
    }
  }

  // --- Helper to trigger a musical note with envelope ---
  private triggerNote(
    freq: number,
    duration: number,
    type: OscillatorType = 'triangle',
    gainVal = 0.2,
    filterCutoff = 2500,
    startTime?: number
  ) {
    if (!this.ctx || !this.compressor) return;
    const now = startTime ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterCutoff, now);
    filter.Q.setValueAtTime(1.5, now);

    // Natural ADSR curve
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(gainVal, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(gainVal * 0.6, now + duration * 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.compressor);

    osc.start(now);
    osc.stop(now + duration + 0.05);

    this.activeNodes.push(osc, filter, noteGain);
  }

  // --- 1. SYNTHWAVE / CYBERPUNK ---
  // High-energy 16th driving synth arpeggio + analog bassline + dark chords (D minor / F / Bb / C)
  private buildSynthwaveMusic() {
    if (!this.ctx) return;

    // Arpeggio notes in D minor
    const arpNotes = [
      146.83, 220.0, 293.66, 349.23, 440.0, 523.25, 440.0, 349.23, // D3, A3, D4, F4, A4, C5...
      174.61, 220.0, 261.63, 349.23, 440.0, 523.25, 440.0, 349.23, // F3, A3, C4, F4...
      116.54, 174.61, 233.08, 349.23, 466.16, 523.25, 466.16, 349.23, // Bb2, F3, Bb3...
      130.81, 196.0, 261.63, 329.63, 392.0, 523.25, 392.0, 329.63, // C3, G3, C4...
    ];

    let step = 0;
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const freq = arpNotes[step % arpNotes.length];
      // Lead Arpeggio note
      this.triggerNote(freq, 0.22, 'sawtooth', 0.16, 3200);

      // Driving Bassline on eighth notes
      if (step % 2 === 0) {
        const bassNotes = [73.42, 87.31, 58.27, 65.41]; // D2, F2, Bb1, C2
        const bassFreq = bassNotes[Math.floor(step / 8) % bassNotes.length];
        this.triggerNote(bassFreq, 0.28, 'sawtooth', 0.28, 1200);
        this.triggerNote(bassFreq * 2, 0.2, 'square', 0.12, 1800);
      }

      step++;
    }, 150); // ~100 BPM 16th feel

    this.activeIntervals.push(interval);
  }

  // --- 2. OUTRUN / 80S NEON ---
  // Dreamy 80s chorus pad + bouncing melodic bass + bright poly-synth chords
  private buildOutrunMusic() {
    if (!this.ctx) return;

    // Chords: Cmaj7 -> Em -> Fmaj7 -> G
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [164.81, 246.94, 329.63, 392.0], // Em
      [174.61, 261.63, 349.23, 440.0], // Fmaj7
      [196.0, 246.94, 293.66, 392.0],  // G
    ];

    let chordIdx = 0;
    let step = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const currentChord = chords[chordIdx % chords.length];

      // Play pad chord on downbeats
      if (step % 8 === 0) {
        currentChord.forEach((f) => {
          this.triggerNote(f, 1.8, 'sawtooth', 0.09, 2200);
        });
        chordIdx++;
      }

      // Arpeggio plucks on every 8th note
      const arpNote = currentChord[step % currentChord.length];
      this.triggerNote(arpNote * 1.5, 0.25, 'square', 0.12, 3400);

      // Synth Bassline on quarter beats
      if (step % 2 === 0) {
        const bassFreq = currentChord[0] / 2;
        this.triggerNote(bassFreq, 0.35, 'sawtooth', 0.25, 900);
      }

      step++;
    }, 250); // 120 BPM 8th notes

    this.activeIntervals.push(interval);
  }

  // --- 3. MONSOON NOIR ---
  // Real rain background + melancholic Rhodes chords + slow tenor jazz saxophone notes
  private buildMonsoonMusic() {
    if (!this.ctx || !this.compressor) return;

    // Continuous Rain Texture
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.18;
    }
    const rain = this.ctx.createBufferSource();
    rain.buffer = noiseBuffer;
    rain.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);
    rainFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    rain.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(this.compressor);
    rain.start();
    this.activeNodes.push(rain, rainFilter, rainGain);

    // Jazz Rhodes chords in D minor 9
    const jazzChords = [
      [146.83, 220.0, 261.63, 329.63, 349.23], // Dm9
      [196.0, 233.08, 293.66, 349.23, 440.0],  // Gm9
      [130.81, 196.0, 246.94, 329.63, 392.0],  // C9
      [174.61, 220.0, 261.63, 329.63, 440.0],  // Fmaj9
    ];

    const saxMelody = [440.0, 392.0, 349.23, 329.63, 293.66, 329.63, 349.23]; // A4, G4, F4, E4, D4...

    let chordStep = 0;
    let saxStep = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const chord = jazzChords[chordStep % jazzChords.length];
      chord.forEach((freq, idx) => {
        // Rhodes bell-like electric piano note
        this.triggerNote(freq, 2.6, 'sine', 0.11 - idx * 0.015, 2400);
        this.triggerNote(freq * 2, 1.2, 'triangle', 0.04, 3000);
      });

      // Soulful slow horn / sax notes
      setTimeout(() => {
        if (!this.ctx || !this.isPlayingState) return;
        const note = saxMelody[saxStep % saxMelody.length];
        this.triggerNote(note, 1.8, 'sawtooth', 0.14, 1800);
        saxStep++;
      }, 900);

      chordStep++;
    }, 2800);

    this.activeIntervals.push(interval);
  }

  // --- 4. DARK ACADEMIA ---
  // Melancholic classical piano chords + resonant cello counterpoint
  private buildAcademiaMusic() {
    if (!this.ctx) return;

    // Piano Arpeggio Sequences (C minor -> Ab -> Fm -> G)
    const progressions = [
      [130.81, 155.56, 196.0, 261.63, 311.13, 392.0], // Cm
      [103.83, 155.56, 207.65, 261.63, 311.13, 415.3], // Ab
      [87.31, 130.81, 174.61, 207.65, 261.63, 349.23], // Fm
      [98.0, 146.83, 196.0, 246.94, 293.66, 392.0],   // G7
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const chord = progressions[chordIdx % progressions.length];
      const freq = chord[noteIdx % chord.length];

      // Piano note
      this.triggerNote(freq, 0.9, 'triangle', 0.16, 2800);
      this.triggerNote(freq * 2, 0.4, 'sine', 0.06, 3200);

      // Cello resonant note on chord change
      if (noteIdx === 0) {
        const celloNote = chord[0];
        this.triggerNote(celloNote, 2.4, 'sawtooth', 0.22, 1100);
      }

      noteIdx++;
      if (noteIdx >= chord.length) {
        noteIdx = 0;
        chordIdx++;
      }
    }, 380); // Classical cadence

    this.activeIntervals.push(interval);
  }

  // --- 5. VINTAGE CAFÉ ---
  // Warm lo-fi bossa nova Rhodes chords + nylon guitar plucks + vinyl warmth
  private buildCafeMusic() {
    if (!this.ctx) return;

    // Bossa chords: Fmaj7 -> Gm7 -> Am7 -> Bbmaj7
    const bossaChords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 233.08, 293.66, 349.23], // Gm7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [233.08, 293.66, 349.23, 440.0], // Bbmaj7
    ];

    let step = 0;
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const chord = bossaChords[Math.floor(step / 4) % bossaChords.length];

      // Rhythmic syncopated Bossa strumming
      if (step % 4 === 0 || step % 4 === 2) {
        chord.forEach((f, idx) => {
          this.triggerNote(f, 0.7, 'sine', 0.14 - idx * 0.02, 2200);
        });
        // Acoustic bass note
        this.triggerNote(chord[0] / 2, 0.6, 'triangle', 0.25, 900);
      } else {
        // High nylon guitar flourish
        const highNote = chord[step % chord.length] * 1.5;
        this.triggerNote(highNote, 0.4, 'triangle', 0.11, 2800);
      }

      step++;
    }, 400);

    this.activeIntervals.push(interval);
  }

  // --- 6. FUTURISTIC MINIMALISM ---
  // Brian Eno ambient crystal chime reflections + sub-harmonic resonant cluster
  private buildMinimalismMusic() {
    if (!this.ctx) return;

    // Pentatonic ambient bell frequencies
    const bellPitches = [329.63, 392.0, 440.0, 523.25, 659.25, 783.99, 987.77]; // E4, G4, A4, C5, E5, G5, B5

    // Sustained sub drone
    this.triggerNote(110.0, 30.0, 'sine', 0.18, 400);
    this.triggerNote(164.81, 30.0, 'triangle', 0.12, 600);

    let count = 0;
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      // Generative bell notes ringing out with long decays
      const note = bellPitches[Math.floor(Math.random() * bellPitches.length)];
      this.triggerNote(note, 2.5, 'sine', 0.15, 3000);
      this.triggerNote(note * 2.01, 1.2, 'sine', 0.05, 4000);

      count++;
      if (count % 8 === 0) {
        // Refresh base ambient warm drone
        this.triggerNote(110.0, 8.0, 'sine', 0.16, 400);
        this.triggerNote(164.81, 8.0, 'triangle', 0.1, 600);
      }
    }, 1200);

    this.activeIntervals.push(interval);
  }

  // --- 7. AMBIENT / NOSTALGIC TIMELESS (Default for Custom Scenes) ---
  // Lush cinematic pads with melodic guitar/piano chime notes
  private buildAmbientMusic() {
    if (!this.ctx) return;

    // Chords: Emaj9 -> C#m7 -> Aadd9 -> Bsus4
    const cinematicChords = [
      [164.81, 246.94, 329.63, 392.0, 493.88], // Emaj9
      [138.59, 207.65, 277.18, 329.63, 415.3], // C#m7
      [110.0, 164.81, 220.0, 277.18, 329.63],  // Aadd9
      [123.47, 185.0, 246.94, 329.63, 369.99],  // Bsus4
    ];

    const melodyTones = [493.88, 554.37, 659.25, 739.99, 830.61]; // B4, C#5, E5, F#5, G#5

    let chordIdx = 0;
    let noteCount = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const chord = cinematicChords[chordIdx % cinematicChords.length];

      // Swelling pad chord every 6 beats
      if (noteCount % 4 === 0) {
        chord.forEach((freq, i) => {
          this.triggerNote(freq, 3.2, 'triangle', 0.12 - i * 0.015, 2000);
          this.triggerNote(freq / 2, 3.0, 'sine', 0.18, 800);
        });
        chordIdx++;
      }

      // Melodic chime note
      const mNote = melodyTones[Math.floor(Math.random() * melodyTones.length)];
      this.triggerNote(mNote, 1.4, 'sine', 0.14, 3500);

      noteCount++;
    }, 900);

    this.activeIntervals.push(interval);
  }

  // --- 8. BOLLYWOOD RETRO ---
  // Sitar ornamentation + Tanpura drone + disco funk rhythm groove
  private buildBollywoodMusic() {
    if (!this.ctx) return;

    // Sitar / Indian Classical melodic scale (D Bhairavi / Yaman)
    const sitarRiff = [
      293.66, 329.63, 369.99, 440.0, 493.88, 554.37, 587.33, 554.37, 493.88, 440.0
    ];

    // Tanpura drone base
    this.triggerNote(146.83, 10.0, 'sawtooth', 0.15, 800);
    this.triggerNote(220.0, 10.0, 'triangle', 0.12, 1200);

    let step = 0;
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      // Sitar note with sharp pluck
      const note = sitarRiff[step % sitarRiff.length];
      this.triggerNote(note, 0.4, 'sawtooth', 0.18, 4500);

      // Tabla / percussion low punch
      if (step % 2 === 0) {
        this.triggerNote(73.42, 0.25, 'sine', 0.35, 600);
      }
      if (step % 4 === 2) {
        this.triggerNote(146.83, 0.15, 'triangle', 0.2, 1600);
      }

      step++;
      if (step % 16 === 0) {
        // Re-trigger tanpura drone
        this.triggerNote(146.83, 10.0, 'sawtooth', 0.15, 800);
        this.triggerNote(220.0, 10.0, 'triangle', 0.12, 1200);
      }
    }, 280); // ~108 BPM funk feel

    this.activeIntervals.push(interval);
  }

  // --- 9. DREAMY COTTAGECORE ---
  // Folk acoustic fingerpicking guitar (Open G chords) + pastoral wooden flute notes
  private buildCottagecoreMusic() {
    if (!this.ctx) return;

    // Folk fingerpicked patterns (G -> C -> Em -> D)
    const patterns = [
      [98.0, 196.0, 246.94, 293.66, 392.0, 293.66],  // G
      [130.81, 196.0, 261.63, 329.63, 392.0, 329.63], // C
      [82.41, 164.81, 246.94, 329.63, 392.0, 329.63], // Em
      [146.83, 220.0, 293.66, 369.99, 440.0, 369.99], // D
    ];

    const fluteNotes = [587.33, 659.25, 783.99, 880.0, 987.77];

    let chordIdx = 0;
    let noteIdx = 0;
    let totalBeats = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const chord = patterns[chordIdx % patterns.length];
      const freq = chord[noteIdx % chord.length];

      // Acoustic guitar fingerpick note
      this.triggerNote(freq, 0.6, 'triangle', 0.17, 3000);

      // Wooden flute melody on downbeats
      if (totalBeats % 6 === 0) {
        const fluteNote = fluteNotes[Math.floor(totalBeats / 6) % fluteNotes.length];
        this.triggerNote(fluteNote, 1.6, 'sine', 0.12, 2200);
      }

      noteIdx++;
      totalBeats++;
      if (noteIdx >= chord.length) {
        noteIdx = 0;
        chordIdx++;
      }
    }, 260);

    this.activeIntervals.push(interval);
  }

  // --- 10. DESERT WESTERN ---
  // Spaghetti western whistling melody + twangy spring-reverb guitar strums + desert wind
  private buildWesternMusic() {
    if (!this.ctx || !this.compressor) return;

    // Desert wind background
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.12;
    }
    const wind = this.ctx.createBufferSource();
    wind.buffer = noiseBuffer;
    wind.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.compressor);
    wind.start();
    this.activeNodes.push(wind, windFilter, windGain);

    // Morricone whistle melody notes (in A minor)
    const whistleMelody = [
      440.0, 523.25, 587.33, 659.25, 587.33, 523.25, 440.0,
      392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 440.0
    ];

    // Acoustic twangy chords (Am -> F -> C -> E7)
    const westernChords = [
      [110.0, 220.0, 261.63, 329.63], // Am
      [87.31, 174.61, 261.63, 349.23], // F
      [130.81, 196.0, 261.63, 329.63], // C
      [82.41, 164.81, 246.94, 329.63], // E7
    ];

    let wIdx = 0;
    let cIdx = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      // Whistling lead melody (pure, vibrant sine with vibrato)
      const whistleFreq = whistleMelody[wIdx % whistleMelody.length];
      this.triggerNote(whistleFreq, 0.9, 'sine', 0.22, 5000);

      // Guitar strum on alternating beats
      if (wIdx % 2 === 0) {
        const chord = westernChords[cIdx % westernChords.length];
        chord.forEach((f, idx) => {
          setTimeout(() => {
            this.triggerNote(f, 0.8, 'sawtooth', 0.12 - idx * 0.02, 2800);
          }, idx * 20);
        });
        cIdx++;
      }

      wIdx++;
    }, 550);

    this.activeIntervals.push(interval);
  }

  // --- 11. COASTAL SUMMER ---
  // Balearic Mediterranean nylon guitar + Rhodes chords + rhythmic ocean surf swell
  private buildCoastalMusic() {
    if (!this.ctx || !this.compressor) return;

    // Ocean surf noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const surf = this.ctx.createBufferSource();
    surf.buffer = noiseBuffer;
    surf.loop = true;

    const surfFilter = this.ctx.createBiquadFilter();
    surfFilter.type = 'lowpass';
    surfFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const surfGain = this.ctx.createGain();
    surfGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    surf.connect(surfFilter);
    surfFilter.connect(surfGain);
    surfGain.connect(this.compressor);
    surf.start();
    this.activeNodes.push(surf, surfFilter, surfGain);

    // Balearic Chords: Cmaj7 -> Am9 -> Fmaj7 -> G6
    const coastalChords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [174.61, 261.63, 349.23, 440.0], // Fmaj7
      [196.0, 246.94, 293.66, 392.0],  // G6
    ];

    const guitarNotes = [523.25, 587.33, 659.25, 783.99, 987.77];

    let chordIdx = 0;
    let step = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const chord = coastalChords[chordIdx % coastalChords.length];

      // Rhodes chord on downbeat
      if (step % 4 === 0) {
        chord.forEach((f, i) => {
          this.triggerNote(f, 1.8, 'sine', 0.15 - i * 0.02, 2600);
        });
        chordIdx++;
      }

      // Nylon guitar arpeggio plucks
      const gNote = guitarNotes[step % guitarNotes.length];
      this.triggerNote(gNote, 0.4, 'triangle', 0.13, 3200);

      step++;
    }, 380);

    this.activeIntervals.push(interval);
  }

  // --- 12. GOLDEN AGE HOLLYWOOD ---
  // Lush sweeping orchestral strings + harp glissando cascades + warm muted trumpet romance + vintage optical sound warmth
  private buildHollywoodMusic() {
    if (!this.ctx || !this.compressor) return;

    // Vintage 35mm optical projector / vinyl warmth noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }
    const hum = this.ctx.createBufferSource();
    hum.buffer = noiseBuffer;
    hum.loop = true;

    const humFilter = this.ctx.createBiquadFilter();
    humFilter.type = 'lowpass';
    humFilter.frequency.setValueAtTime(420, this.ctx.currentTime);

    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    hum.connect(humFilter);
    humFilter.connect(humGain);
    humGain.connect(this.compressor);
    hum.start();
    this.activeNodes.push(hum, humFilter, humGain);

    // Romantic Hollywood Golden Era Chords:
    // Cmaj7 -> Am9 -> Dm9 -> G13
    const orchestralChords = [
      [130.81, 196.0, 246.94, 329.63, 392.0, 493.88], // Cmaj7
      [110.0, 164.81, 196.0, 261.63, 329.63, 493.88],  // Am9
      [146.83, 220.0, 261.63, 349.23, 440.0, 523.25], // Dm9
      [98.0, 174.61, 246.94, 329.63, 440.0, 587.33],   // G13
    ];

    // Sweeping romantic lead trumpet / violin melody notes
    const hollywoodMelody = [
      523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33,
      659.25, 783.99, 880.0, 987.77, 880.0, 783.99, 659.25, 523.25
    ];

    // Harp glissando tones
    const harpNotes = [
      523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51
    ];

    let chordIdx = 0;
    let step = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.isPlayingState) return;

      const chord = orchestralChords[chordIdx % orchestralChords.length];

      // Sweeping orchestral strings pad every 4 beats
      if (step % 4 === 0) {
        chord.forEach((freq, idx) => {
          // Warm string section: rich triangle + smooth sine body
          this.triggerNote(freq, 2.6, 'triangle', 0.13 - idx * 0.015, 2200);
          this.triggerNote(freq / 2, 2.8, 'sine', 0.16, 700);
        });

        // Harp cascade arpeggio on downbeat
        harpNotes.forEach((hFreq, hIdx) => {
          setTimeout(() => {
            if (!this.ctx || !this.isPlayingState) return;
            this.triggerNote(hFreq, 1.0, 'sine', 0.08, 4000);
          }, hIdx * 65);
        });

        chordIdx++;
      }

      // Warm muted solo brass / violin lead
      const melodyNote = hollywoodMelody[step % hollywoodMelody.length];
      this.triggerNote(melodyNote, 0.75, 'sine', 0.18, 3000);

      step++;
    }, 450); // ~88 BPM romantic cadence

    this.activeIntervals.push(interval);
  }
}

export const ambientAudio = new AmbientAudioService();
