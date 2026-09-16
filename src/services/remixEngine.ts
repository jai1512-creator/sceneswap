import { Scene, ColorSwatch, TypographySpec, LightingSpec, MusicVibeSpec, InteriorSpec, OutfitSpec, EnvironmentSpec } from '../types/scene';
import { BESPOKE_REMIX_MAP, HYBRID_NAME_PREFIXES, HYBRID_NAME_SUFFIXES } from '../data/remixMatrix';
import { blendColors, getReadableTextColor } from '../utils/colorUtils';

export function remixScenes(sceneA: Scene, sceneB: Scene, seed = 0): Scene {
  const key1 = `${sceneA.id}+${sceneB.id}`;
  const key2 = `${sceneB.id}+${sceneA.id}`;
  const bespoke = BESPOKE_REMIX_MAP[key1] || BESPOKE_REMIX_MAP[key2];

  // Dynamic Title & Description
  let title = bespoke?.title;
  let tagline = bespoke?.tagline;
  let description = bespoke?.description;
  const heroImage = bespoke?.heroImage || (seed % 2 === 0 ? sceneA.heroImage : sceneB.heroImage);

  if (!title) {
    const prefix = HYBRID_NAME_PREFIXES[(sceneA.title.length + seed * 3) % HYBRID_NAME_PREFIXES.length];
    const suffix = HYBRID_NAME_SUFFIXES[(sceneB.title.length + seed * 5) % HYBRID_NAME_SUFFIXES.length];
    title = `${prefix} ${suffix}`;
    tagline = `Where the ${sceneA.mood.toLowerCase()} atmosphere of ${sceneA.title} fuses with the ${sceneB.mood.toLowerCase()} world of ${sceneB.title}.`;
    description = `An intentional aesthetic collision marrying the ${sceneA.lighting.atmosphere.toLowerCase()} with ${sceneB.environment.atmosphere.toLowerCase()}. The result is a unique hybrid visual reality that reinterprets both worlds.`;
  }

  // 01 Color Blending
  const colors: ColorSwatch[] = [
    {
      name: `${sceneA.colors[0]?.name || 'Alpha'} Blend`,
      hex: blendColors(sceneA.colors[0]?.hex || '#00F0FF', sceneB.colors[0]?.hex || '#FF0055', 0.5),
      role: 'Dominant',
      description: `Harmonic fusion of ${sceneA.colors[0]?.name} and ${sceneB.colors[0]?.name}.`,
      textColor: getReadableTextColor(blendColors(sceneA.colors[0]?.hex || '#00F0FF', sceneB.colors[0]?.hex || '#FF0055', 0.5)),
    },
    {
      name: sceneB.colors[1]?.name || 'Hybrid Accent',
      hex: sceneB.colors[1]?.hex || '#FF0055',
      role: 'Accent',
      description: `Vivid punctuation drawn directly from ${sceneB.title}.`,
      textColor: getReadableTextColor(sceneB.colors[1]?.hex || '#FF0055'),
    },
    {
      name: 'Composite Tone',
      hex: blendColors(sceneA.colors[2]?.hex || '#555555', sceneB.colors[2]?.hex || '#888888', 0.45),
      role: 'Midtone',
      description: 'Intermediate structural tone balancing both palettes.',
      textColor: getReadableTextColor(blendColors(sceneA.colors[2]?.hex || '#555555', sceneB.colors[2]?.hex || '#888888', 0.45)),
    },
    {
      name: sceneA.colors[3]?.name || 'Secondary Echo',
      hex: sceneA.colors[3]?.hex || '#E5A93C',
      role: 'Subdominant',
      description: `Warm structural accent inherited from ${sceneA.title}.`,
      textColor: getReadableTextColor(sceneA.colors[3]?.hex || '#E5A93C'),
    },
    {
      name: 'Atmospheric Void',
      hex: blendColors(sceneA.colors[4]?.hex || '#111111', sceneB.colors[4]?.hex || '#222222', 0.5),
      role: 'Atmospheric',
      description: 'Deep background shade unifying shadows across both aesthetics.',
      textColor: '#FAFBFD',
    },
  ];

  // 02 Typography Merge
  const typography: TypographySpec = {
    displayFont: sceneA.typography.displayFont,
    displayFontFamily: sceneA.typography.displayFontFamily,
    bodyFont: sceneB.typography.bodyFont,
    bodyFontFamily: sceneB.typography.bodyFontFamily,
    characteristics: `Display authority of ${sceneA.typography.displayFont} balanced with the textural cadence of ${sceneB.typography.bodyFont}.`,
    exampleHeading: `${title.toUpperCase()} // HYBRID MANIFESTO`,
    exampleBody: `In this re-imagined setting, ${sceneA.interior.furniture.toLowerCase()} stands within spaces defined by ${sceneB.interior.architecture.toLowerCase()}.`,
  };

  // 03 Lighting Merge
  const lighting: LightingSpec = {
    source: `${sceneA.lighting.source} colliding with ${sceneB.lighting.source.toLowerCase()}`,
    colorTemperature: `Hybrid spectrum fusing ${sceneA.lighting.colorTemperature} and ${sceneB.lighting.colorTemperature}`,
    contrast: `Composite: ${sceneA.lighting.contrast.split(' ')[0]} high dynamic range`,
    shadowCharacteristics: `${sceneA.lighting.shadowCharacteristics}; tempered by ${sceneB.lighting.shadowCharacteristics.toLowerCase()}`,
    atmosphere: `${sceneA.lighting.atmosphere}, layered with subtle ${sceneB.lighting.atmosphere.toLowerCase()}`,
    ambientHex1: sceneA.lighting.ambientHex1,
    ambientHex2: sceneB.lighting.ambientHex2,
  };

  // 04 Music Vibe Merge
  const avgBpm = Math.round((sceneA.music.bpmNumber + sceneB.music.bpmNumber) / 2);
  const music: MusicVibeSpec = {
    genre: bespoke?.hybridGenre || `${sceneA.music.genre.split(' ')[0]} × ${sceneB.music.genre.split(' ')[0]} Crossover`,
    bpmRange: `${avgBpm - 4}–${avgBpm + 4} BPM`,
    bpmNumber: avgBpm,
    instruments: `${sceneA.music.instruments.split('·')[0].trim()} · ${sceneB.music.instruments.split('·')[0].trim()} · Hybrid ambient soundscape`,
    energy: avgBpm > 95 ? 'High Voltage' : avgBpm > 78 ? 'Moderate' : 'Hypnotic',
    mood: `${sceneA.music.mood.split(',')[0]}, infused with ${sceneB.music.mood.split(',')[0].toLowerCase()}`,
    listeningKeywords: Array.from(new Set([...sceneA.music.listeningKeywords.slice(0, 2), ...sceneB.music.listeningKeywords.slice(0, 2)])),
    audioPreset: seed % 2 === 0 ? sceneA.music.audioPreset : sceneB.music.audioPreset,
  };

  // 05 Interior Merge
  const interior: InteriorSpec = {
    materials: Array.from(new Set([...sceneA.interior.materials.slice(0, 2), ...sceneB.interior.materials.slice(0, 2)])),
    furniture: `${sceneA.interior.furniture.split(',')[0]}, complemented by ${sceneB.interior.furniture.split(',')[0].toLowerCase()}.`,
    architecture: `Hybrid construction: ${sceneA.interior.architecture.split('with')[0]} reimagined through ${sceneB.interior.architecture.toLowerCase()}`,
    lighting: `${sceneA.interior.lighting}; accents of ${sceneB.interior.lighting.toLowerCase()}`,
    decorativeObjects: Array.from(new Set([...sceneA.interior.decorativeObjects.slice(0, 2), ...sceneB.interior.decorativeObjects.slice(0, 2)])),
    spatialFeeling: `${sceneA.interior.spatialFeeling} meets ${sceneB.interior.spatialFeeling.toLowerCase()}`,
    visualTiles: [
      sceneA.interior.visualTiles[0] || sceneA.visualReferences[0],
      sceneB.interior.visualTiles[0] || sceneB.visualReferences[0],
    ].filter(Boolean),
  };

  // 06 Outfit Merge
  const outfit: OutfitSpec = {
    clothing: `${sceneA.outfit.clothing.split('over')[0].trim()} paired with ${sceneB.outfit.clothing.toLowerCase()}`,
    silhouette: `${sceneA.outfit.silhouette} layered with ${sceneB.outfit.silhouette.toLowerCase()}`,
    materials: Array.from(new Set([...sceneA.outfit.materials.slice(0, 2), ...sceneB.outfit.materials.slice(0, 2)])),
    accessories: Array.from(new Set([...sceneA.outfit.accessories.slice(0, 2), ...sceneB.outfit.accessories.slice(0, 2)])),
    footwear: `${sceneA.outfit.footwear} or ${sceneB.outfit.footwear.toLowerCase()}`,
    colorDirection: `Blend of ${sceneA.outfit.colorDirection} and ${sceneB.outfit.colorDirection.toLowerCase()}`,
    visualTiles: [
      sceneA.outfit.visualTiles[0] || sceneA.visualReferences[0],
      sceneB.outfit.visualTiles[0] || sceneB.visualReferences[0],
    ].filter(Boolean),
  };

  // 07 Environment Merge
  const environment: EnvironmentSpec = {
    architecture: `${sceneA.environment.architecture} juxtaposed with ${sceneB.environment.architecture.toLowerCase()}`,
    weather: `${sceneA.environment.weather} blending into ${sceneB.environment.weather.toLowerCase()}`,
    landscape: `${sceneA.environment.landscape} bordering ${sceneB.environment.landscape.toLowerCase()}`,
    objects: Array.from(new Set([...sceneA.environment.objects.slice(0, 2), ...sceneB.environment.objects.slice(0, 2)])),
    atmosphere: `Electric collision of ${sceneA.environment.atmosphere.toLowerCase()} and ${sceneB.environment.atmosphere.toLowerCase()}`,
    cameraCharacteristics: `${sceneA.environment.cameraCharacteristics.split(',')[0]}, captured with ${sceneB.environment.cameraCharacteristics.toLowerCase()}`,
  };

  // Merge Keywords
  const keywords = Array.from(new Set([
    'Remix',
    ...sceneA.keywords.slice(0, 3),
    ...sceneB.keywords.slice(0, 3),
  ]));

  return {
    id: `remix-${sceneA.id}-${sceneB.id}-${seed}`,
    title,
    tagline,
    description,
    era: sceneA.era,
    environmentType: sceneA.environmentType,
    lightingType: sceneB.lightingType,
    mood: sceneA.mood,
    keywords,
    heroImage,
    colors,
    typography,
    lighting,
    music,
    interior,
    outfit,
    environment,
    textureMaterials: Array.from(new Set([...sceneA.textureMaterials, ...sceneB.textureMaterials])),
    visualReferences: [
      ...sceneA.visualReferences.slice(0, 2),
      ...sceneB.visualReferences.slice(0, 2),
    ],
    isRemix: true,
    remixParents: [sceneA.id, sceneB.id],
    createdAt: Date.now(),
  };
}
