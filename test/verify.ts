import { CURATED_SCENES } from '../src/data/curatedScenes';
import { remixScenes } from '../src/services/remixEngine';
import { buildCustomScene } from '../src/services/sceneBuilder';
import { blendColors, hexToRgb, getReadableTextColor, hexToHsl } from '../src/utils/colorUtils';
import { getShareUrl } from '../src/utils/shareUtils';

console.log('====================================================');
console.log('SCENESWAP COMPREHENSIVE AUTOMATED VERIFICATION SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`✗ [FAIL] ${testName}`);
    process.exitCode = 1;
  }
}

// 1. Library size >= 10
assert(CURATED_SCENES.length >= 10, `Library has at least 10 scenes (actual: ${CURATED_SCENES.length})`);

// 2. Scene IDs include all 10 required
const requiredSceneIds = [
  'cyberpunk-city',
  '80s-neon',
  'monsoon-noir',
  'dark-academia',
  'vintage-cafe',
  'futuristic-minimalism',
  'bollywood-retro',
  'dreamy-cottagecore',
  'desert-western',
  'coastal-summer',
  'golden-age-hollywood'
];
requiredSceneIds.forEach(id => {
  const found = CURATED_SCENES.find(s => s.id === id);
  assert(!!found, `Required scene "${id}" exists in curated library`);
});

// 3. Cyberpunk City specific content
const cyberpunk = CURATED_SCENES.find(s => s.id === 'cyberpunk-city')!;
assert(cyberpunk.colors.some(c => c.hex === '#00F0FF'), 'Cyberpunk contains Neon Cyan (#00F0FF)');
assert(cyberpunk.music.genre.includes('Synthwave'), 'Cyberpunk music genre is Dark Synthwave');
assert(cyberpunk.environmentType === 'City', 'Cyberpunk environment is City');
assert(cyberpunk.lightingType === 'Neon', 'Cyberpunk lighting is Neon');

// 4. Hollywood specific content
const hollywood = CURATED_SCENES.find(s => s.id === 'golden-age-hollywood')!;
assert(hollywood.colors.some(c => c.hex === '#D4AF37'), 'Golden Age Hollywood contains Champagne Gold (#D4AF37)');
assert(hollywood.music.audioPreset === 'hollywood', 'Hollywood audioPreset is "hollywood"');
assert(hollywood.mood === 'Romantic', 'Hollywood mood is Romantic');

// 5. Dark Academia specific content
const darkAcademia = CURATED_SCENES.find(s => s.id === 'dark-academia')!;
assert(darkAcademia.colors.some(c => c.hex === '#4A0E17'), 'Dark Academia contains Oxblood Velvet (#4A0E17)');
assert(darkAcademia.music.instruments.includes('cello'), 'Dark Academia contains cello instrumentation');
assert(darkAcademia.environmentType === 'Interior', 'Dark Academia environment is Interior');

// 5. Data uniqueness: Cyberpunk != Dark Academia != Coastal Summer != Vintage Cafe
const coastal = CURATED_SCENES.find(s => s.id === 'coastal-summer')!;
const vintageCafe = CURATED_SCENES.find(s => s.id === 'vintage-cafe')!;
assert(cyberpunk.title !== darkAcademia.title, 'Cyberpunk title != Dark Academia title');
assert(cyberpunk.colors[0].hex !== darkAcademia.colors[0].hex, 'Cyberpunk primary color != Dark Academia primary color');
assert(darkAcademia.colors[0].hex !== coastal.colors[0].hex, 'Dark Academia primary color != Coastal Summer primary color');
assert(vintageCafe.music.genre !== cyberpunk.music.genre, 'Vintage Cafe music genre != Cyberpunk music genre');

// 6. Complete 01-07 attributes present on all scenes
CURATED_SCENES.forEach(scene => {
  assert(scene.colors.length === 5, `${scene.title} has exactly 5 palette colors`);
  assert(scene.typography.displayFont.length > 0, `${scene.title} has display font specified`);
  assert(scene.typography.bodyFont.length > 0, `${scene.title} has body font specified`);
  assert(scene.lighting.colorTemperature.includes('K'), `${scene.title} specifies lighting Kelvin temperature`);
  assert(scene.lighting.contrast.length > 0, `${scene.title} specifies lighting contrast`);
  assert(scene.music.bpmNumber > 0, `${scene.title} specifies numeric BPM`);
  assert(scene.interior.materials.length > 0, `${scene.title} specifies interior materials`);
  assert(scene.outfit.clothing.length > 0, `${scene.title} specifies outfit clothing`);
  assert(scene.environment.cameraCharacteristics.length > 0, `${scene.title} specifies camera characteristics`);
});

// 7. Remix feature: Cyberpunk + Vintage Cafe yields "Neon After Hours"
const remix1 = remixScenes(cyberpunk, vintageCafe, 0);
assert(remix1.title === 'Neon After Hours', 'Remixing Cyberpunk + Vintage Café yields "Neon After Hours"');
assert(remix1.isRemix === true, 'Remixed scene is marked as isRemix: true');
assert(remix1.colors.length === 5, 'Remixed scene has 5 blended colors');
assert(remix1.music.genre.includes('Cyber') || remix1.music.genre.includes('Bossa'), 'Remixed music genre fuses both styles');

// 8. Remix feature: arbitrary pair
const monsoon = CURATED_SCENES.find(s => s.id === 'monsoon-noir')!;
const bollywood = CURATED_SCENES.find(s => s.id === 'bollywood-retro')!;
const remix2 = remixScenes(bollywood, monsoon, 0);
assert(remix2.title === 'Bombay Velvet Rain', 'Remixing Bollywood Retro + Monsoon Noir yields "Bombay Velvet Rain"');

// 9. Remix variation with seed
const remixSeed1 = remixScenes(cyberpunk, darkAcademia, 0);
const remixSeed2 = remixScenes(cyberpunk, darkAcademia, 1);
assert(remixSeed1.id !== remixSeed2.id, 'Different remix seeds produce different IDs');

// 10. Create a Scene (deterministic builder)
const custom1 = buildCustomScene({
  mood: 'Calm',
  era: '70s',
  environment: 'Café',
  lighting: 'Warm',
});
assert(custom1.title.includes('70s'), 'Custom scene title includes selected era "70s"');
assert(custom1.title.includes('Warm'), 'Custom scene title includes selected lighting "Warm"');
assert(custom1.title.includes('Café'), 'Custom scene title includes selected environment "Café"');
assert(custom1.colors.length === 5, 'Custom scene produces 5-color palette');
assert(custom1.isCustom === true, 'Custom scene is flagged as isCustom: true');

// 11. Changing custom parameters produces distinct output
const custom2 = buildCustomScene({
  mood: 'Futuristic',
  era: 'Near Future',
  environment: 'City',
  lighting: 'Neon',
});
assert(custom1.title !== custom2.title, 'Different builder parameters yield different titles');
assert(custom1.colors[0].hex !== custom2.colors[0].hex, 'Different builder parameters yield different color palettes');
assert(custom1.music.genre !== custom2.music.genre, 'Different builder parameters yield different music genres');

// 12. Color utilities
const blended = blendColors('#000000', '#FFFFFF', 0.5);
assert(blended === '#808080', 'Blending #000000 and #FFFFFF at 0.5 yields #808080');
const rgb = hexToRgb('#00F0FF');
assert(rgb.r === 0 && rgb.g === 240 && rgb.b === 255, 'hexToRgb for #00F0FF is {r:0, g:240, b:255}');
assert(getReadableTextColor('#FFFFFF') === '#070709', 'High luminance background yields dark text');
assert(getReadableTextColor('#000000') === '#FAFBFD', 'Low luminance background yields light text');
const hsl = hexToHsl('#FF0000');
assert(hsl.h === 0 && hsl.s === 100, 'hexToHsl for #FF0000 has hue 0 and saturation 100%');

// 13. Fresh visitor clean slate verification
assert(CURATED_SCENES.length === 11, 'Curated archive contains exactly 11 official worlds');
assert(CURATED_SCENES.every(s => !s.isCustom && !s.isRemix), 'All curated scenes are pure official scenes (no custom/remix flags)');

console.log(`\n====================================================`);
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(`====================================================`);

