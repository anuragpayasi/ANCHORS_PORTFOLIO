import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF8F0',
          100: '#F7E8DA',
          200: '#E6C7A8',
          300: '#D7AE84',
          400: '#C08552',
          500: '#A56F48',
          600: '#8C5A3C',
          700: '#714743',
          800: '#5D3936',
          900: '#4B2E2B',
          950: '#2D1B19',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 1px 0 rgba(75,46,43,0.04), 0 24px 50px rgba(75,46,43,0.12)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at top left, rgba(192,133,82,0.12), transparent 28%), radial-gradient(circle at top right, rgba(140,90,60,0.08), transparent 24%), linear-gradient(180deg, #FFF8F0 0%, #F7E8DA 100%)',
      },
    },
  },
  plugins: [forms],
};
