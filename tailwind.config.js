/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9fb',
          100: '#d8f1f6',
          200: '#b0e3ed',
          300: '#7dd0e0',
          400: '#4eb8cd',
          500: '#2ba1b5',
          600: '#1d8499',
          700: '#1a6b80',
          800: '#1a5667',
          900: '#1a4858',
        },
        secondary: {
          50: '#fdf8ed',
          100: '#faedca',
          200: '#f5d88e',
          300: '#f0c14b',
          400: '#e9a924',
          500: '#d4880f',
          600: '#b56a0a',
          700: '#924f0c',
          800: '#783f10',
          900: '#663412',
        },
      },
    },
  },
  plugins: [],
};
