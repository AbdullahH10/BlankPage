const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
    },
    colors: {
      'primary': '#fbfefb',
      'secondary': '#0D0221',
      'accent': '#f2a541',
      'success': '#386641',
      'warning': '#f2e8cf',
      'error': '#bc4749'
    }
  },
  plugins: [require('@tailwindcss/forms')],
}