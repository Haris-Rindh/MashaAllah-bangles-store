/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream:      '#FDFBF7',
        'cream-2':  '#F5EDE0',
        'cream-3':  '#EDE0D4',
        charcoal:   '#1C1412',
        'warm-mid': '#6B5548',
        'rose-gold':'#C9906A',
        blush:      '#EAB8C8',
        champagne:  '#F2DFC0',
        border:     '#E4D5C8',
      },
      boxShadow: {
        'soft':  '0 2px 20px rgba(28,20,18,0.07)',
        'hover': '0 8px 40px rgba(201,144,106,0.15)',
        'card':  '0 1px 3px rgba(28,20,18,0.08), 0 8px 24px rgba(28,20,18,0.05)',
      },
    },
  },
  plugins: [],
}
