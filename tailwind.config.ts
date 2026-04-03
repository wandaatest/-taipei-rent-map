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
        blush: '#faf0ec',
        ink: '#1f1a17',
        taupe: '#d4beb2',
        sand: '#fbf7f3',
        rosewood: '#b28c7e',
      },
      boxShadow: {
        editorial: '0 18px 50px rgba(78, 53, 42, 0.12)',
      },
      backgroundImage: {
        paper: 'radial-gradient(circle at top, rgba(246, 236, 232, 0.82), rgba(251, 247, 243, 0.94) 40%, rgba(255, 255, 255, 1) 100%)',
      },
    },
  },
  plugins: [forms],
} satisfies Config;
