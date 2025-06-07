/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#101566',
        primaryHover: '#1F2AA0',
        secondary: '#00CCDD',
        orange: '#FEB811',
        abu: '#808080'
      },
      container: {
        padding: {
          DEFAULT: '1rem',  // 16px
          sm: '1rem',       // 16px
          lg: '2rem',       // 32px
          xl: '3rem',       // 48px
          '2xl': '4rem',    // 64px
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

