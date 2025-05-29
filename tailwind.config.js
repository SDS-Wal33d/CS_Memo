/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#dee9ff',
          200: '#c3d4ff',
          300: '#9db5ff',
          400: '#798eff',
          500: '#5c68ff',
          600: '#4a4cf7',
          700: '#3e39db',
          800: '#3131b0',
          900: '#2d2e8a',
          950: '#1c1b53',
        },
        secondary: {
          50: '#fbf7eb',
          100: '#f5edd1',
          200: '#ead7a8',
          300: '#debb76',
          400: '#d19c48',
          500: '#c88232',
          600: '#b66425',
          700: '#96471f',
          800: '#7a391f',
          900: '#65301c',
          950: '#391809',
        },
        accent: {
          50: '#fff9ed',
          100: '#fff1d3',
          200: '#ffdfaa',
          300: '#ffc572',
          400: '#ffa337',
          500: '#ff810d',
          600: '#f96200',
          700: '#c94300',
          800: '#a03508',
          900: '#82300c',
          950: '#461400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-in forwards',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};