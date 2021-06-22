const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './styles/**/*.js',
    './components/**/*.js',
    './pages/**/*.js'
  ],
  darkMode: 'media',
  theme: {
    colors,
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
