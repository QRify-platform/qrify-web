/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#f3f4f6',
        chalk: '#e6e8ec',
        soot: '#07080b',
        slate: '#151820',
        steel: '#5c6370',
        acid: '#00f0c8',
        cobalt: '#00f0c8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wipe-right': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        scanline: {
          '0%': { top: '0%', opacity: '0' },
          '12%': { opacity: '1' },
          '88%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
      animation: {
        rise: 'rise 0.85s cubic-bezier(0.16, 1, 0.3, 1) both',
        'rise-2': 'rise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both',
        'rise-3': 'rise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both',
        'rise-4': 'rise 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both',
        wipe: 'wipe-right 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        scanline: 'scanline 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
