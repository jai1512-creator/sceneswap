# SceneSwap

> *“Step into the aesthetic of a scene.”*

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-gold?style=for-the-badge&logo=github)](https://jai1512-creator.github.io/sceneswap/)
[![Built with React 19 & Vite](https://img.shields.io/badge/Stack-React_19_+_Vite_+_Tailwind-cyan?style=for-the-badge)](https://jai1512-creator.github.io/sceneswap/)

SceneSwap is a production-quality, cinematic visual-aesthetic discovery platform. Rather than offering a generic SaaS dashboard, SceneSwap creates an editorial, immersive experience that decomposes cinematic visual worlds into structured aesthetic breakdowns: color palettes, typography, lighting, music vibes, interior inspiration, wardrobe direction, and environmental cinematography.

---

## Live Deployment
- **URL**: [https://jai1512-creator.github.io/sceneswap/](https://jai1512-creator.github.io/sceneswap/)
- **Repository**: [https://github.com/jai1512-creator/sceneswap](https://github.com/jai1512-creator/sceneswap)

---

## Features

### 1. Curated Scene Library (11 Bespoke Worlds)
Every scene contains authentic, handcrafted, structured metadata—no generic duplicates:
- **Cyberpunk City**: Neon Cyan (`#00F0FF`), Hyper Magenta (`#FF0055`), dark synthwave (94 BPM), volumetric rain-slicked asphalt, brutalist steel.
- **80s Neon**: Electric Fuchsia (`#FF1493`), Cobalt Laser (`#2E5BFF`), outrun synthpop (112 BPM), chrome reflections, Memphis geometry.
- **Monsoon Noir**: Streetlamp Amber (`#E5A93C`), Sepia Teak (`#634735`), rain-soaked jazz (68 BPM), weathered colonial louvers, gabardine trench coat.
- **Dark Academia**: Oxblood Velvet (`#4A0E17`), Aged Parchment (`#EED9B9`), melancholic cello (72 BPM), Oxford gothic library stacks, Harris tweed.
- **Vintage Café**: Warm Caramel (`#C48A54`), Cream Bisque (`#F6EFE6`), lo-fi French bossa (82 BPM), bentwood Thonet chairs, Carrara marble.
- **Futuristic Minimalism**: Titanium White (`#F7F8FA`), Brushed Slate (`#7A8293`), generative drone (60 BPM), shadowless monolithic geometry.
- **Bollywood Retro**: Marigold Saffron (`#FF9900`), Peacock Cyan (`#00838F`), 70s disco-funk (108 BPM), carved rosewood, brocade silk flares.
- **Dreamy Cottagecore**: Meadow Sage (`#7D8C75`), Buttercup Yellow (`#F3D279`), pastoral fingerpicking folk (76 BPM), stone cottage, raw linen.
- **Desert Western**: Terracotta Canyon (`#B85435`), Sun-Bleached Bone (`#E2DAC8`), spaghetti western acoustic whistle (80 BPM), adobe vigas, selvedge denim.
- **Coastal Summer**: Tyrrhenian Azure (`#0A74B8`), Limoncello Yellow (`#FAD02C`), Mediterranean balearic lounge (90 BPM), whitewashed stone, breezy linen.
- **Golden Age Hollywood**: Champagne Gold (`#D4AF37`), Onyx Noir (`#0F1117`), orchestral 40s romance (64 BPM), art deco gilded arches, bias-cut silk satin gowns.

### 2. Full 01–07 Aesthetic Breakdown
When inspecting any scene, users can explore its anatomy:
- **01 — COLOR**: Interactive 5-swatch palette with click-to-copy HEX, role tags, HSL values, contrast ratings, and toast confirmations.
- **02 — TYPOGRAPHY**: Curated Google Fonts pairings (Cinzel, Syne, Cormorant Garamond, Space Grotesk, Plus Jakarta Sans, JetBrains Mono) with interactive, live-editable text specimen playground and font scale slider.
- **03 — LIGHTING**: Technical specifications (Key source, Kelvin color temperature, contrast ratio, shadow penumbra, atmospheric particulate) paired with a live interactive ambient lighting simulation vignette.
- **04 — MUSIC VIBE & SOUNDSCAPE**: Genre, BPM gauge, instrumentation matrix, listening tags, and a **genuine procedural Web Audio API synthesizer** generating real ambient drones, rain soundscapes, or acoustic resonances with a dynamic frequency visualizer.
- **05 — INTERIOR**: Architectural envelope, furniture, material palette, curated artifacts, and visual reference tiles with graceful image fallbacks.
- **06 — OUTFIT**: Core attire, silhouette, fabric direction, accessories, and footwear.
- **07 — ENVIRONMENT**: Meteorological state, landscape, physical objects, and optical camera characteristics (anamorphic profiles, focal length, film stock).

### 3. Designer's Moodboard
An interactive atelier canvas combining palette swatches, typography specimens, key visual frames, and architectural tiles:
- Toggle between **Pinboard** (polaroid/tape studio feel) and **Editorial Grid** layouts.
- **Drag-and-Drop** or arrow controls to rearrange cards on desktop and mobile.
- Remove tiles or add new scene references from the asset bank.
- One-click reset to original curation.

### 4. "Remix the Scene" Engine
Allows users to combine any two aesthetics into an intentional hybrid world:
- Intelligent color synthesis blending base anchors and accent tones into a balanced 5-color palette.
- Merges typography hierarchy (Display from Scene A, Body from Scene B).
- Combines lighting volumetrics, intermediate BPM musical arrangements, and composite interior/wardrobe designs.
- Bespoke collision titles for classic pairings (e.g., *Cyberpunk City* + *Vintage Café* = **“Neon After Hours”**, *Bollywood Retro* + *Monsoon Noir* = **“Bombay Velvet Rain”**).
- **Remix Again** for generative seed variations and **Save Remix** with confetti feedback.

### 5. Deterministic "Create a Scene" Builder
Synthesizes a custom aesthetic from 4 core axes:
- **Mood**: Calm, Mysterious, Energetic, Romantic, Dark, Dreamy, Futuristic, Nostalgic
- **Era**: 70s, 80s, 90s, Modern, Near Future, Timeless
- **Environment**: City, Café, Bedroom, Street, Desert, Forest, Coast, Interior
- **Lighting**: Warm, Cool, Neon, Golden Hour, Low Light, Overcast
- Generates a bespoke scene with name, logline, description, palette, typography, lighting, music, interior, and wardrobe.

### 6. Search, Filters, and Persistent Favorites
- Real-time search across scene titles, descriptions, mood keywords, and environments.
- Multi-faceted filters for Mood, Era, Environment, and Lighting with active filter indicators and instant "Clear All".
- Favorites persisted in `localStorage` across page reloads and browser restarts.

### 7. Share & Deep-Link System
- Shareable aesthetic card preview modal.
- Deep links encoding scene ID or hybrid parameters in URL search params (`?scene=...`, `?remix=...`, `?custom=...`), instantly rendering that exact aesthetic on any device.
- Native Web Share API with automatic clipboard fallback.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS 3.4 (editorial typography, custom dark palette, glassmorphism)
- **Audio Synthesis**: Native HTML5 Web Audio API (real-time oscillators, biquad filters, pink noise rain generators, frequency analyser)
- **Icons**: Lucide React
- **Animations**: Canvas Confetti & custom CSS keyframes (with full `prefers-reduced-motion` compliance)
- **Fonts**: Google Fonts (`Cinzel`, `Cormorant Garamond`, `Syne`, `Plus Jakarta Sans`, `JetBrains Mono`)

---

## Project Structure

```
SceneSwap/
├── index.html                    # SEO, OpenGraph, Twitter card tags, font imports
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript base config
├── tsconfig.app.json             # App TypeScript config
├── tailwind.config.js            # Tailwind cinema theme extension
├── public/
│   ├── favicon.svg               # Editorial camera aperture favicon
│   └── og-preview.svg            # 1200x627 social preview card
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # App router, URL deep link parser, toast system
│   ├── index.css                 # Dark theme, film grain, scrollbars, glass panels
│   ├── types/
│   │   └── scene.ts              # Core TypeScript interfaces for scenes & moodboards
│   ├── data/
│   │   ├── curatedScenes.ts      # 10 deeply structured curated scenes
│   │   └── remixMatrix.ts        # Hand-tuned collision matrix & linguistic generators
│   ├── services/
│   │   ├── ambientAudio.ts       # Real Web Audio API synthesizer (10 presets)
│   │   ├── remixEngine.ts        # Aesthetic collision & color blending algorithm
│   │   ├── sceneBuilder.ts       # Deterministic combinatorial scene generator
│   │   └── storage.ts            # localStorage favorites & remix persistence
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, FilmGrain
│   │   ├── hero/                 # HeroSection
│   │   ├── scene/                # SceneCard, SceneGrid, SceneDetail
│   │   ├── sections/             # 01-07 Aesthetic breakdown sections
│   │   ├── moodboard/            # MoodboardView
│   │   ├── remix/                # RemixModal
│   │   ├── builder/              # SceneBuilder
│   │   ├── favorites/            # FavoritesView
│   │   └── share/                # ShareModal
│   └── utils/
│       ├── colorUtils.ts         # Color calculations, blending, contrast ratios
│       └── shareUtils.ts         # Deep link encoding and Web Share API
└── test/
    └── verify.ts                 # Comprehensive 131-assertion automated test suite
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18 or newer recommended, tested on Node v24)
- npm (v9 or newer, tested on npm v11)

### Installation
```bash
# Clone or navigate to the project directory
cd "e:/project phoenix/SceneSwap"

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### Automated Testing
```bash
npm test
```
Runs the 131-assertion verification test suite validating scene data integrity, color blending, remix synthesis, deterministic building, and contrast calculations.

### Production Build & Preview
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
Runs a local preview of the production bundle at `http://localhost:4173/`.

---

## Deployment Information

SceneSwap is a pure static client-side single page application (SPA) with 0 backend dependencies:
- **Vercel**: Deploy directly by connecting the Git repository (Framework preset: `Vite`).
- **Netlify**: Set build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages**: Build with `npm run build` and publish `dist/` to the `gh-pages` branch.
- **Cloudflare Pages**: Connect repo, set build command to `npm run build` and output directory to `dist`.

---

## Accessibility & Performance

- **Prefers-Reduced-Motion**: All non-essential keyframe animations and transitions automatically disable when the user has reduced motion enabled in their OS.
- **Semantic HTML & Contrast**: All colors and text pairings meet WCAG AA contrast standards. Contrast ratios are dynamically computed.
- **Keyboard Navigable**: All cards, swatches, tabs, and buttons have visible focus states and respond to Enter and Space keys.
- **Zero Broken Images**: All photography assets have automated CSS gradient/SVG fallbacks.
- **Zero Fake Features**: Web Audio API generates genuine sound; deep link sharing works across browsers; favorites persist in `localStorage`.

---

## Credits & Visual Assets

- Photography curated from Unsplash via royalty-free editorial licenses.
- Typography from Google Fonts (`Cinzel`, `Cormorant Garamond`, `Syne`, `Plus Jakarta Sans`, `JetBrains Mono`).
- Icons by Lucide.
