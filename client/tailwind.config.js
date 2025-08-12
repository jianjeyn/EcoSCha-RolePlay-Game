/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#f0f1f0',
        'dark-red': '#972827',
        'yellow': '#f0be01',
        'brown': '#744d26',
        'dark-green': '#515025',
      },
    },
  },
  plugins: [],
}