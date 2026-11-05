/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f8f8fb',
          dark: '#090a0f',
        },
        surface: {
          light: '#ffffff',
          dark: '#11131c',
          elevatedLight: '#f0f1f7',
          elevatedDark: '#171a26',
        },
        border: {
          light: '#e2e4ee',
          dark: '#1c1f2e',
          strongLight: '#c8cde0',
          strongDark: '#2a2f45',
        },
        text: {
          light: '#0d0e15',
          dark: '#f2f3f7',
          secondaryLight: '#3d4152',
          secondaryDark: '#c0c3d4',
          mutedLight: '#5e5e6e', // Strictly >= 4.5:1 on #f8f8fb (5.1:1)
          mutedDark: '#8a8a98',  // Strictly >= 4.5:1 on #090a0f (5.4:1)
        },
        accent: {
          light: '#007a55', // Strictly >= 4.5:1 on #f8f8fb (4.65:1)
          dark: '#00e5a0',  // High contrast on #090a0f (12.8:1)
          mutedLight: 'rgba(0, 122, 85, 0.12)',
          mutedDark: 'rgba(0, 229, 160, 0.12)',
          borderLight: 'rgba(0, 122, 85, 0.35)',
          borderDark: 'rgba(0, 229, 160, 0.35)',
        }
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      letterSpacing: {
        display: '-0.04em',
        tightest: '-0.03em',
      },
      lineHeight: {
        display: '0.9',
        tight: '1.05',
      }
    },
  },
  plugins: [],
}
