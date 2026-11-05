/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'phone': '768px',
        'max-phone': { 'max': '767px' },
      },
      colors: {
        'light-grey': '#F6F6F6',
        'light-black': '#1A1A1A',
        'grey': '#9F9F9F',
        'black': '#0A0A0A',
        'white': '#FFFFFF',
        background: {
          light: '#F6F6F6',
          dark: '#0A0A0A',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#141414',
          elevatedLight: '#EAEAEA',
          elevatedDark: '#1E1E1E',
        },
        border: {
          light: '#E5E5E5',
          dark: '#262626',
          strongLight: '#D1D1D1',
          strongDark: '#3A3A3A',
        },
        text: {
          light: '#1A1A1A',
          dark: '#F6F6F6',
          secondaryLight: '#595959',
          secondaryDark: '#A0A0A0',
          mutedLight: '#737373',
          mutedDark: '#8C8C8C',
        },
      },
      fontFamily: {
        sans: ['"Suisse Intl"', '"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Suisse Intl"', '"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'h1': '3.2rem',
        'h1-mobile': '1.8rem',
        'h2': '2.4rem',
        'h2-mobile': '1.8rem',
        'h3': '1.6rem',
        'h3-mobile': '1.4rem',
        'h4': '1.4rem',
      },
    },
  },
  plugins: [],
}
