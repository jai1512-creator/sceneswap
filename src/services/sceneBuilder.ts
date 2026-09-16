import { Scene, MoodType, EraType, EnvironmentCategory, LightingCategory, ColorSwatch, AudioPreset } from '../types/scene';
import { getReadableTextColor } from '../utils/colorUtils';

interface BuildSceneOptions {
  mood: MoodType;
  era: EraType;
  environment: EnvironmentCategory;
  lighting: LightingCategory;
}

const MOOD_TITLES: Record<MoodType, string[]> = {
  Calm: ['Serenity', 'Solitude', 'Sanctuary', 'Tranquility', 'Stillness'],
  Mysterious: ['Shadows', 'Enigma', 'Nocturne', 'Whispers', 'Mirage'],
  Energetic: ['Velocity', 'Pulse', 'Overdrive', 'Ignition', 'Frequency'],
  Romantic: ['Reverie', 'Affection', 'Poetry', 'Bloom', 'Serenade'],
  Dark: ['Obsidian', 'Abyss', 'Chiaroscuro', 'Requiem', 'Eclipse'],
  Dreamy: ['Luminescence', 'Mirage', 'Daydream', 'Fable', 'Elysium'],
  Futuristic: ['Cyberia', 'Synthetica', 'Nexus', 'Protocol', 'Matrix'],
  Nostalgic: ['Reminiscence', 'Echoes', 'Souvenir', 'Veneer', 'Chronicle'],
};

const ENVIRONMENT_IMAGES: Record<EnvironmentCategory, string[]> = {
  City: [
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
  ],
  Café: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
  ],
  Bedroom: [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  ],
  Street: [
    'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
  ],
  Desert: [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  ],
  Forest: [
    'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
  ],
  Coast: [
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  ],
  Interior: [
    'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  ],
};

export function buildCustomScene(opts: BuildSceneOptions): Scene {
  const { mood, era, environment, lighting } = opts;

  // Derive title
  const moodPool = MOOD_TITLES[mood] || ['Vision'];
  const titleNoun = moodPool[(era.length + environment.length) % moodPool.length];
  const title = `${era} ${lighting} ${environment} ${titleNoun}`;
  const tagline = `An immersive ${mood.toLowerCase()} aesthetic journey through ${era} ${environment.toLowerCase()} architecture under ${lighting.toLowerCase()} illumination.`;
  const description = `Conceived through the interplay of ${mood.toLowerCase()} emotion and ${lighting.toLowerCase()} illumination, this visual world bridges ${era} sensibilities with the physical intimacy of a ${environment.toLowerCase()}. Textured materials and tailored acoustics shape a bespoke cinematic mood.`;

  // Colors based on lighting & mood
  const colorMap: Record<LightingCategory, ColorSwatch[]> = {
    Warm: [
      { name: 'Amber Glow', hex: '#E89C38', role: 'Dominant', description: 'Warm radiating incandescent warmth.', textColor: '#070709' },
      { name: 'Terracotta Hearth', hex: '#C2593F', role: 'Accent', description: 'Rich earthy baked clay tone.', textColor: '#FFFFFF' },
      { name: 'Cream Linen', hex: '#F7EFE3', role: 'Midtone', description: 'Soft natural fiber reflection.', textColor: '#070709' },
      { name: 'Sepia Oak', hex: '#5A3D28', role: 'Subdominant', description: 'Deep aged timber finish.', textColor: '#FAFBFD' },
      { name: 'Warm Charcoal', hex: '#1C1815', role: 'Atmospheric', description: 'Enveloping dark interior shadow.', textColor: '#FAFBFD' },
    ],
    Cool: [
      { name: 'Glacial Slate', hex: '#7E94B3', role: 'Dominant', description: 'Crisp northern sky light.', textColor: '#070709' },
      { name: 'Cobalt Frost', hex: '#23528A', role: 'Accent', description: 'Deep concentrated blue shadow.', textColor: '#FFFFFF' },
      { name: 'Brushed Alabaster', hex: '#F0F4F8', role: 'Midtone', description: 'Pure matte architectural surface.', textColor: '#070709' },
      { name: 'Zinc Steel', hex: '#515B68', role: 'Subdominant', description: 'Cold brushed metal trimming.', textColor: '#FFFFFF' },
      { name: 'Midnight Deep', hex: '#0E131A', role: 'Atmospheric', description: 'Profound silent shadow void.', textColor: '#FAFBFD' },
    ],
    Neon: [
      { name: 'Electric Magenta', hex: '#FF007F', role: 'Dominant', description: 'High-voltage gas tube emission.', textColor: '#FFFFFF' },
      { name: 'Cyan Pulse', hex: '#00F0FF', role: 'Accent', description: 'Saturated laser grid line.', textColor: '#070709' },
      { name: 'Chrome Reflect', hex: '#D8DEE9', role: 'Midtone', description: 'Specular metallic bounce.', textColor: '#070709' },
      { name: 'Acid Tangerine', hex: '#FF8800', role: 'Subdominant', description: 'Secondary strobe beacon.', textColor: '#070709' },
      { name: 'Obsidian Night', hex: '#0B0A12', role: 'Atmospheric', description: 'Pitch black urban backdrop.', textColor: '#FAFBFD' },
    ],
    'Golden Hour': [
      { name: 'Molten Gold', hex: '#E5A93C', role: 'Dominant', description: 'Horizon-skimming directional sunlight.', textColor: '#070709' },
      { name: 'Desert Sienna', hex: '#BA5D3B', role: 'Accent', description: 'Warming terracotta dust.', textColor: '#FFFFFF' },
      { name: 'Sand Dune', hex: '#EADBCE', role: 'Midtone', description: 'Sun-bleached natural mineral surface.', textColor: '#070709' },
      { name: 'Wild Olive', hex: '#586348', role: 'Subdominant', description: 'Hardy vegetation in rim light.', textColor: '#FFFFFF' },
      { name: 'Twilight Umber', hex: '#261812', role: 'Atmospheric', description: 'Long evening shadow cast.', textColor: '#FAFBFD' },
    ],
    'Low Light': [
      { name: 'Tungsten Ember', hex: '#C86E37', role: 'Dominant', description: 'Dim vintage filament glow.', textColor: '#FAFBFD' },
      { name: 'Blood Crimson', hex: '#68131D', role: 'Accent', description: 'Dark velvet drapery highlight.', textColor: '#FFFFFF' },
      { name: 'Aged Parchment', hex: '#DFCEB5', role: 'Midtone', description: 'Faded manuscript leaves.', textColor: '#070709' },
      { name: 'Burnished Bronze', hex: '#876D49', role: 'Subdominant', description: 'Antique metal fixture.', textColor: '#070709' },
      { name: 'Smoked Void', hex: '#110F0E', role: 'Atmospheric', description: 'Enveloping darkness.', textColor: '#FAFBFD' },
    ],
    Overcast: [
      { name: 'Misty Silver', hex: '#A8B0BA', role: 'Dominant', description: 'Even cloud canopy dispersion.', textColor: '#070709' },
      { name: 'Damp Pine', hex: '#314438', role: 'Accent', description: 'Moisture-rich evergreen leaves.', textColor: '#FAFBFD' },
      { name: 'Fog White', hex: '#EDEDF2', role: 'Midtone', description: 'Clean atmospheric diffusion.', textColor: '#070709' },
      { name: 'River Pebble', hex: '#59606B', role: 'Subdominant', description: 'Wet river stone gray.', textColor: '#FFFFFF' },
      { name: 'Slate Basalt', hex: '#16191D', role: 'Atmospheric', description: 'Grounded mineral foundations.', textColor: '#FAFBFD' },
    ],
  };

  const colors = colorMap[lighting].map(c => ({
    ...c,
    textColor: getReadableTextColor(c.hex),
  }));

  // Typography
  let displayFont = 'Syne';
  let displayFontFamily = 'Syne, sans-serif';
  let bodyFont = 'Plus Jakarta Sans';
  let bodyFontFamily = 'Plus Jakarta Sans, sans-serif';

  if (era === '70s' || era === 'Timeless' || mood === 'Romantic' || mood === 'Dark') {
    displayFont = 'Cormorant Garamond';
    displayFontFamily = 'Cormorant Garamond, serif';
  } else if (era === 'Near Future' || mood === 'Futuristic') {
    displayFont = 'Space Grotesk / Syne';
    bodyFont = 'JetBrains Mono';
    bodyFontFamily = 'JetBrains Mono, monospace';
  } else if (era === '80s' || mood === 'Energetic') {
    displayFont = 'Cinzel / Syne';
  }

  // Audio preset & music
  let audioPreset: AudioPreset = 'ambient';
  if (lighting === 'Neon' || era === 'Near Future') audioPreset = 'synthwave';
  else if (era === '80s') audioPreset = 'outrun';
  else if (environment === 'Café') audioPreset = 'cafe';
  else if (environment === 'Desert') audioPreset = 'western';
  else if (environment === 'Coast') audioPreset = 'coastal';
  else if (environment === 'Forest') audioPreset = 'cottagecore';
  else if (lighting === 'Low Light' || mood === 'Dark') audioPreset = 'academia';
  else if (lighting === 'Overcast' || mood === 'Mysterious') audioPreset = 'monsoon';

  const heroImage = ENVIRONMENT_IMAGES[environment][0] || 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80';

  const sceneId = `custom-${mood.toLowerCase()}-${era.toLowerCase()}-${environment.toLowerCase()}-${lighting.toLowerCase()}`.replace(/\s+/g, '-');

  return {
    id: sceneId,
    title,
    tagline,
    description,
    era,
    environmentType: environment,
    lightingType: lighting,
    mood,
    keywords: [mood, era, environment, lighting, 'Custom Aesthetic', 'Procedural Synthesis'],
    heroImage,
    colors,
    typography: {
      displayFont,
      displayFontFamily,
      bodyFont,
      bodyFontFamily,
      characteristics: `Tailored typography pairing honoring ${era} balance with modern legibility.`,
      exampleHeading: `${title.toUpperCase()} // DESIGN SPECIMEN`,
      exampleBody: `Every material surface within this ${environment.toLowerCase()} is tuned to respond to ${lighting.toLowerCase()} illumination.`,
    },
    lighting: {
      source: `Characteristic ${lighting.toLowerCase()} source tailored for a ${environment.toLowerCase()}`,
      colorTemperature: lighting === 'Warm' || lighting === 'Golden Hour' ? '2900K Warm Spectrum' : lighting === 'Cool' ? '6500K Cool Daylight' : 'Variable Custom Spectrum',
      contrast: lighting === 'Low Light' || lighting === 'Neon' ? 'High Contrast Chiaroscuro' : 'Balanced Cinematic Midtones',
      shadowCharacteristics: `Elongated, atmospheric falloffs characteristic of ${lighting.toLowerCase()} illumination.`,
      atmosphere: `Ambient mood tuned to a ${mood.toLowerCase()} sensory presence.`,
      ambientHex1: colors[0].hex,
      ambientHex2: colors[1].hex,
    },
    music: {
      genre: `${mood} ${era} Cinematic Soundscape`,
      bpmRange: '74–86 BPM',
      bpmNumber: 80,
      instruments: 'Analog ambient synthesizers · Acoustic resonance · Textural field recordings',
      energy: mood === 'Energetic' ? 'High Voltage' : mood === 'Calm' ? 'Meditative' : 'Moderate',
      mood: `${mood}, atmospheric, evocative`,
      listeningKeywords: [mood, environment, era, 'Ambient resonance'],
      audioPreset,
    },
    interior: {
      materials: [`Aged ${environment.toLowerCase()} stone`, 'Brushed metal accents', 'Natural woven textile', 'Smoked glass'],
      furniture: `Curated ${era} furniture arrangements designed for contemplation and spatial flow.`,
      architecture: `Architectural envelope reflecting classic ${environment.toLowerCase()} geometry adapted for ${era} style.`,
      lighting: `Concealed perimeter fixtures casting indirect ${lighting.toLowerCase()} wash.`,
      decorativeObjects: ['Minimalist ceramic vessel', 'Curated aesthetic literature', 'Tactile stone specimen'],
      spatialFeeling: `Intimate yet expansive, deeply attuned to the ${mood.toLowerCase()} emotional state.`,
      visualTiles: [
        { title: `${environment} Spatial Detail`, url: heroImage, caption: `Spatial architectural treatment under ${lighting.toLowerCase()} light` },
      ],
    },
    outfit: {
      clothing: `Structured outer layer in natural fibers over a tailored ${era} silhouette.`,
      silhouette: `Balanced, functional, and aesthetically continuous with the ${environment.toLowerCase()} interior.`,
      materials: ['Pure raw wool', 'Dense woven cotton', 'Supple full-grain leather'],
      accessories: ['Minimalist analog timepiece', 'Handcrafted eyewear', 'Suede carryall'],
      footwear: 'Handcrafted leather boots with understated stitching.',
      colorDirection: `Palette rooted in ${colors[0].name} and ${colors[1].name}.`,
      visualTiles: [
        { title: 'Wardrobe Texture', url: heroImage, caption: 'Textile weave and tactile garment details' },
      ],
    },
    environment: {
      architecture: `Integrated structural design tailored for a ${era} ${environment.toLowerCase()}.`,
      weather: lighting === 'Overcast' ? 'Cool diffuse mist' : lighting === 'Warm' ? 'Balmy sun' : 'Temperate twilight',
      landscape: `Surrounding landscape complementing the immediate ${environment.toLowerCase()} context.`,
      objects: ['Architectural louvers', 'Vintage fixtures', 'Textured planters'],
      atmosphere: `Sensory, tactile, cinematic.`,
      cameraCharacteristics: 'Arri Alexa Mini LF with Cooke Anamorphic/i Full Frame Plus lenses, gentle halation, organic grain.',
    },
    textureMaterials: ['Honed mineral surface', 'Woven natural fiber', 'Brushed aluminum', 'Aged wood grain'],
    visualReferences: [
      { id: 'ref-cust-1', title: 'Atmospheric Spatial Perspective', category: 'environment', url: heroImage, caption: 'Architectural overview in full lighting spectrum' },
    ],
    isCustom: true,
    createdAt: Date.now(),
  };
}
