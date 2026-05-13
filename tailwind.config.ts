import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#79538E',
        ink: {
          950: 'oklch(0.13 0.02 265)',
          900: 'oklch(0.18 0.02 265)',
        },
        paper: {
          50: 'oklch(0.99 0.01 95)',
          100: 'oklch(0.98 0.01 95)',
        },
      },
      boxShadow: {
        soft: '0 12px 40px -18px rgba(0,0,0,.45)',
      },
      letterSpacing: {
        tighter2: '-0.045em',
      },
    },
  },
  plugins: [],
} satisfies Config

