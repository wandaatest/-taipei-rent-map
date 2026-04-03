import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Iowan Old Style"', '"Noto Serif TC"', 'serif'],
        sans: ['"Avenir Next"', '"PingFang TC"', '"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        blush: '#f3e4e0',
        ink: '#1f1a17',
        taupe: '#b39a8b',
        sand: '#f8f3ee',
        rosewood: '#7e5448',
      },
      boxShadow: {
        editorial: '0 18px 50px rgba(78, 53, 42, 0.12)',
      },
      backgroundImage: {
        paper: 'radial-gradient(circle at top, rgba(243, 228, 224, 0.85), rgba(248, 243, 238, 0.92) 40%, rgba(255, 255, 255, 1) 100%)',
      },
    },
  },
  plugins: [forms],
} satisfies Config;
