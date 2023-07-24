/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#3DBDB8',
        black: '#000000',
        gold: '#FFD700',
        silver: '#D8D8D8',
        bronze: '#CD7F32',
      },
    },
  },
  plugins: [],
};
