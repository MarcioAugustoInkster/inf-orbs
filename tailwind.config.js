/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      }
    },
    screens: {
      'xs': {
        raw: '(min-width: 475px)'
      },
      'sm': {
        raw: '(min-width: 640px)'
      },
      'md': {
        raw: '(min-width: 768px)'
      },
      'lg': {
        raw: '(min-width: 1024px)'
      },
      'xl': {
        raw: '(min-width: 1280px)'
      },
    }
  },
  plugins: [],
}

