/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4', // Off-white backgrounds
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Slate greys
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e4ebe5',
          200: '#cad7cc',
          300: '#a5bcab',
          400: '#849b87', // Muted sage green
          500: '#67866c',
          600: '#516a55',
          700: '#415544',
          800: '#364638',
          900: '#2d3b2f',
        },
        terracotta: {
          50: '#fcf6f5',
          100: '#f8e9e7',
          200: '#f1d0ca',
          300: '#e7afa5',
          400: '#de877b',
          500: '#e2725b', // Warm terracotta
          600: '#b85444',
          700: '#934032',
          800: '#7a372d',
          900: '#66312a',
        }
      }
    },
  },
  plugins: [],
}
