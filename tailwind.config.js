/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        swa: {
          blue:   '#D4E5EF',  // Powder blue
          green:  '#C6DFCC',  // Mint green
          yellow: '#F7EDAC',  // Canary yellow
          pink:   '#F8D0DF',  // Rose pink
          dark:   '#0A0A0A',  // Near-black
          gray:   '#F4F4F4',  // Light gray
          text:   '#1A1A1A',  // Dark text
        },
        gray: { DEFAULT: '#6B6B6B' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade':     'fadeIn 0.4s ease both',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        '4.5': '1.125rem',
        '18':  '4.5rem',
      },
    },
  },
  plugins: [],
}
