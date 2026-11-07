/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFDF7',
        paper: '#F8F5ED',
        linen: '#EFE6D2',
        champagne: '#D8C6A0',
        gold: { DEFAULT: '#B39A68', deep: '#94773F', soft: '#E6D3A3' },
        sage: { DEFAULT: '#A8B5A0', deep: '#5E7258' },
        charcoal: '#51463F',
        ink: '#2E2823',
        night: '#1C1815',
        wine: '#7A2E3A'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        script: ['"Great Vibes"', '"Brush Script MT"', 'cursive'],
        sans: ['Montserrat', '"Helvetica Neue"', 'Arial', 'sans-serif']
      },
      letterSpacing: {
        label: '0.34em'
      },
      boxShadow: {
        card: '0 24px 50px -28px rgba(81, 70, 63, 0.55)',
        float: '0 30px 60px -24px rgba(28, 24, 21, 0.6)'
      },
      borderRadius: {
        arch: '999px 999px 18px 18px'
      }
    }
  },
  plugins: []
};
