/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      phone: '769px',
      tablet: '1025px',
      desktop: '1920px',
    },
    extend: {
      colors: {
        black: '#0a0a0a',
        'light-black': '#1a1a1a',
        grey: '#9f9f9f',
        'light-grey': '#f6f6f6',
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['"Suisse Intl"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.025em',
      },
      fontSize: {
        h1: ['3.2rem', { lineHeight: '1' }],
        'h1-mobile': ['1.8rem', { lineHeight: '1' }],
        h2: ['2.4rem', { lineHeight: '1.24' }],
        'h2-mobile': ['1.8rem', { lineHeight: '1.24' }],
        h3: ['1.6rem', { lineHeight: '1' }],
        'h3-mobile': ['1.4rem', { lineHeight: '1' }],
        h4: ['1.4rem', { lineHeight: 'normal' }],
      },
      borderRadius: {
        '32': '3.2rem',
      },
    },
  },
  plugins: [],
};
