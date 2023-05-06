/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    minWidth: {
      '1/6': '16.66666%'
    },
    extend: {}
  },
  plugins: [require('rippleui')]
}
