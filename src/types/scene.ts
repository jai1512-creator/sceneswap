export type MoodType = 
  | 'Calm'
  | 'Mysterious'
  | 'Energetic'
  | 'Romantic'
  | 'Dark'
  | 'Dreamy'
  | 'Futuristic'
  | 'Nostalgic';

export type EraType = 
  | '70s'
  | '80s'
  | '90s'
  | 'Modern'
  | 'Near Future'
  | 'Timeless';

export type EnvironmentCategory = 
  | 'City'
  | 'Café'
  | 'Bedroom'
  | 'Street'
  | 'Desert'
  | 'Forest'
  | 'Coast'
  | 'Interior';

export type LightingCategory = 
  | 'Warm'
  | 'Cool'
  | 'Neon'
  | 'Golden Hour'
  | 'Low Light'
  | 'Overcast';

export interface ColorSwatch {
  name: string;
  hex: string;
  role: 'Dominant' | 'Accent' | 'Midtone' | 'Subdominant' | 'Atmospheric';
  description: string;
  textColor?: string;
}

export interface TypographySpec {
  displayFont: string;
  displayFontFamily: string;
  bodyFont: string;
  bodyFontFamily: string;
  characteristics: string;
  exampleHeading: string;
  exampleBody: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface LightingSpec {
  source: string;
  colorTemperature: string;
  contrast: string;
  shadowCharacteristics: string;
  atmosphere: string;
  ambientHex1: string;
  ambientHex2: string;
}

export type AudioPreset = 
  | 'synthwave'
  | 'outrun'
  | 'monsoon'
  | 'academia'
  | 'cafe'
  | 'minimalism'
  | 'bollywood'
  | 'cottagecore'
  | 'western'
  | 'coastal'
  | 'hollywood'
  | 'ambient';

export interface MusicVibeSpec {
  genre: string;
  bpmRange: string;
  bpmNumber: number;
  instruments: string;
  energy: 'Meditative' | 'Subdued' | 'Moderate' | 'High Voltage' | 'Hypnotic' | 'Dramatic';
  mood: string;
  listeningKeywords: string[];
  audioPreset: AudioPreset;
}

export interface InteriorSpec {
  materials: string[];
  furniture: string;
  architecture: string;
  lighting: string;
  decorativeObjects: string[];
  spatialFeeling: string;
  visualTiles: Array<{
    title: string;
    url: string;
    caption: string;
  }>;
}

export interface GenderWardrobeSpec {
  clothing: string;
  silhouette: string;
  materials: string[];
  accessories: string[];
  footwear: string;
  colorDirection: string;
  visualTiles?: Array<{
    title: string;
    url: string;
    caption: string;
  }>;
}

export interface OutfitSpec {
  clothing: string;
  silhouette: string;
  materials: string[];
  accessories: string[];
  footwear: string;
  colorDirection: string;
  visualTiles: Array<{
    title: string;
    url: string;
    caption: string;
  }>;
  feminine?: GenderWardrobeSpec;
  masculine?: GenderWardrobeSpec;
  genderNeutral?: GenderWardrobeSpec;
}

export interface EnvironmentSpec {
  architecture: string;
  weather: string;
  landscape: string;
  objects: string[];
  atmosphere: string;
  cameraCharacteristics: string;
}

export interface VisualReference {
  id: string;
  title: string;
  category: 'lighting' | 'interior' | 'outfit' | 'environment' | 'detail';
  url: string;
  caption: string;
}

export interface Scene {
  id: string;
  title: string;
  tagline: string;
  description: string;
  era: EraType;
  environmentType: EnvironmentCategory;
  lightingType: LightingCategory;
  mood: MoodType;
  keywords: string[];
  heroImage: string;
  
  // 01 - 07 Aesthetic Breakdown
  colors: ColorSwatch[];
  typography: TypographySpec;
  lighting: LightingSpec;
  music: MusicVibeSpec;
  interior: InteriorSpec;
  outfit: OutfitSpec;
  environment: EnvironmentSpec;
  
  // Textures and extra references
  textureMaterials: string[];
  visualReferences: VisualReference[];

  // Metadata for remix and custom scenes
  isRemix?: boolean;
  isCustom?: boolean;
  remixParents?: [string, string];
  createdAt?: number;
}

export interface MoodboardItem {
  id: string;
  title: string;
  category: 'color' | 'typography' | 'lighting' | 'interior' | 'outfit' | 'environment' | 'quote' | 'image';
  data?: any;
  imageUrl?: string;
  description?: string;
  customWidth?: 'normal' | 'wide';
}
