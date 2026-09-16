/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          950: '#070709',
          900: '#0E0F14',
          850: '#13141B',
          800: '#1A1B24',
          700: '#252736',
          600: '#34384B',
          500: '#565C7A',
          400: '#8A91B4',
          300: '#B8BFDE',
          200: '#E1E4F2',
          100: '#F4F5FA',
          50: '#FAFBFD',
          gold: '#E5C07B',
          amber: '#F39C12',
          crimson: '#E74C3C',
          teal: '#00F0FF',
          violet: '#9D4EDD',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinematic: ['Cinzel', 'Trajan Pro', 'serif'],
        display: ['Syne', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ken-burns': 'kenBurns 45s ease-in-out infinite alternate',
        'fresco-drift': 'frescoDrift 50s ease-in-out infinite alternate',
        'god-ray-breathe': 'godRayBreathe 6s ease-in-out infinite',
        'bird-glide': 'birdGlide 28s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'shimmer-sweep': 'shimmerSweep 3.5s ease-in-out infinite',
        'entrance-fade': 'entranceFade 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'soft-drift': 'softDrift 14s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.04) translate(0%, 0%)' },
          '50%': { transform: 'scale(1.12) translate(-1.2%, -0.8%)' },
          '100%': { transform: 'scale(1.07) translate(1.2%, 0.6%)' },
        },
        frescoDrift: {
          '0%': { transform: 'scale(1.02) translate(0%, 0%) rotate(0deg)' },
          '50%': { transform: 'scale(1.06) translate(-1.2%, -0.8%) rotate(0.35deg)' },
          '100%': { transform: 'scale(1.04) translate(0.8%, 0.5%) rotate(-0.25deg)' },
        },
        godRayBreathe: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1) rotate(-18deg)' },
          '50%': { opacity: '0.75', transform: 'scale(1.08) rotate(-17deg)' },
        },
        birdGlide: {
          '0%': { transform: 'translate(-100px, 180px) scale(0.65)', opacity: '0' },
          '15%': { opacity: '0.75' },
          '85%': { opacity: '0.75' },
          '100%': { transform: 'translate(950px, -80px) scale(0.85)', opacity: '0' },
        },
        shimmerSweep: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '30%, 100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        entranceFade: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        softDrift: {
          '0%': { transform: 'translate(0px, 0px)' },
          '100%': { transform: 'translate(10px, -8px)' },
        },
      }
    },
  },
  plugins: [],
}
