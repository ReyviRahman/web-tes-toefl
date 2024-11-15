/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#161D6F',
        primaryHover: '#1F2AA0',
        secondary: '#00CCDD',
        orange: '#FEB811'
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

