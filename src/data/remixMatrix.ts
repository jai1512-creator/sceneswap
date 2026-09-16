export interface BespokeRemixEntry {
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  hybridGenre: string;
}

export const BESPOKE_REMIX_MAP: Record<string, BespokeRemixEntry> = {
  // Cyberpunk City + Vintage Café
  'cyberpunk-city+vintage-cafe': {
    title: 'Neon After Hours',
    tagline: 'Analog espresso rituals illuminated by flickering holographic rain.',
    description: 'A discreet underground kissaten nestled between cybernetic server towers. Steam from a vintage brass espresso machine curls upward into the glow of cyan telemetry screens, while cracked bentwood chairs rest on illuminated glass floor tiles.',
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Cyber-Lo-Fi & Industrial Bossa',
  },
  // Monsoon Noir + Bollywood Retro
  'bollywood-retro+monsoon-noir': {
    title: 'Bombay Velvet Rain',
    tagline: 'Technicolor romance refracted through rain-streaked taxi windows.',
    description: 'Marine Drive under an onslaught of southwest monsoon downpour. Saffron streetlamps and peacock-blue theater marquees bleed into flooded asphalt as vintage brass horns and jazz trumpets weave through the sound of falling water.',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Noir Disco-Soul & Raga Horns',
  },
  // Dark Academia + Cyberpunk City
  'cyberpunk-city+dark-academia': {
    title: 'Gothic Netrunner',
    tagline: 'Ancient parchment folios illuminated by neural fiber-optics.',
    description: 'A subterranean cathedral library where centuries-old carved mahogany stacks house cryogenic data wafers. Cloistered scholars in heavy tweed and augmented optical visors decode forgotten manuscripts under flickering candle and laser light.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Dark Chamber Synth & Sacred Drone',
  },
  // 80s Neon + Desert Western
  '80s-neon+desert-western': {
    title: 'Neon Badlands',
    tagline: 'Electric chrome spurs under a radioactive desert dusk.',
    description: 'A lonely highway motel where pink and cobalt neon tubes buzz against the silhouetted saguaro cacti of the Mojave. Vintage wedge sports cars kick up red clay dust at sunset, their polished chrome grills reflecting a violet twilight sky.',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Outrun Spaghetti Western & Analog Twang',
  },
  // Dreamy Cottagecore + Futuristic Minimalism
  'dreamy-cottagecore+futuristic-minimalism': {
    title: 'Solar Botanica',
    tagline: 'Hydroponic wildflower sanctuaries inside silent monolithic domes.',
    description: 'An ethereal bio-dome where wild meadow chamomile and sage green vines drape gracefully over curved, shadowless white titanium arches. Diffuse glacial daylight nourishes ancient botanicals within a silent, pressurized sanctuary of peace.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Pastoral Glitch & Bio-Acoustic Drone',
  },
  // Coastal Summer + Cyberpunk City
  'coastal-summer+cyberpunk-city': {
    title: 'Azure Grid Offshore',
    tagline: 'Mediterranean cliffside villas wired into high-frequency oceanic networks.',
    description: 'Terraced Mediterranean cliff dwellings wired with glowing fiber-optic conduits. Crystalline cyan waters lap against brutalist seawalls, where breezy white linen fabrics billow past high-definition weather telemetry consoles.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Balearic Cyber-Lounge & Coastal Synthwave',
  },
  // Dark Academia + Vintage Café
  'dark-academia+vintage-cafe': {
    title: 'Latin Quarter Archive',
    tagline: 'Late-night espresso over leather-bound classical commentaries.',
    description: 'An ancient subterranean Parisian cellar converted into a scholar’s sanctuary. Deep oxblood banquettes and Carrara marble tables are littered with fountain pens, open folios, and porcelain cups of dark espresso under green banker lamps.',
    heroImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Acoustic Chamber Bossa & Solo Cello',
  },
  // Monsoon Noir + Desert Western
  'desert-western+monsoon-noir': {
    title: 'Canyon Cloudburst',
    tagline: 'A rare flash flood inundates red rock ghost towns in moody amber light.',
    description: 'Torrents of rain suddenly batter terracotta cliffs and weathered timber saloons. Water cascades through dry arroyos like liquid glass while kerosene lanterns flicker behind wet wooden louvers under a stormy slate sky.',
    heroImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Noir Desert Blues & Reverb Trombone',
  },
  // Dark Academia + Futuristic Minimalism
  'dark-academia+futuristic-minimalism': {
    title: 'Golden Terminal',
    tagline: 'Ancient leather-bound folios preserved inside silent monolithic titanium vaults.',
    description: 'A subterranean cathedral archive where centuries of philosophical manuscripts rest inside climate-regulated white titanium monoliths. Cold ambient luminescence reflects off polished micro-cement floors, while warm amber reading lamps illuminate solitary scholars decoding forgotten languages.',
    heroImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Neo-Classical Glitch & Minimalist Sacred Drone',
  },
  // Cyberpunk City + Golden Age Hollywood
  'cyberpunk-city+golden-age-hollywood': {
    title: 'Holo-Glamour Noir',
    tagline: 'High-voltage holographic arc lights over velvet prosceniums and chrome tuxedos.',
    description: 'A towering retro-futurist movie palace where 1940s Hollywood prestige is reimagined through holographic cinema lenses. High-density laser projectors cast three-dimensional black-and-white icons above patrons dressed in bias-cut metallic silks sipping synthetic champagne.',
    heroImage: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Synthwave Big Band & Cyber Brass Overture',
  },
  // Dark Academia + Golden Age Hollywood
  'dark-academia+golden-age-hollywood': {
    title: 'The Studio Archive',
    tagline: 'Ancient celluloid canisters, velvet prosceniums, and script drafts in candlelight.',
    description: 'A clandestine soundstage vault filled with 35mm film cans, velvet-bound director screenplays, and brass studio microscopes. Single Fresnel spotlights cut through dust and stage smoke onto worn leather chairs where cinema history was written.',
    heroImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1400&q=80',
    hybridGenre: 'Chamber Orchestra & Vintage Film Score',
  },
};

export const HYBRID_NAME_PREFIXES = [
  'Midnight', 'Velvet', 'Solar', 'Subterranean', 'Atmospheric', 
  'Ethereal', 'Chromatic', 'Shadow', 'Pastoral', 'Monolithic',
  'Echoes of', 'Prismatic', 'Obsidian', 'Golden', 'Vapour'
];

export const HYBRID_NAME_SUFFIXES = [
  'Drift', 'Sanctuary', 'Mirage', 'Symphony', 'Pavilion', 
  'Reflections', 'Terminal', 'Passage', 'Horizon', 'Nocturne',
  'Resonance', 'Haven', 'Veranda', 'Solitude', 'Afterglow'
];
