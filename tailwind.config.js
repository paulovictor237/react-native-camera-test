/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './App.{js,jsx,ts,tsx}',
    './<custom-folder>/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
