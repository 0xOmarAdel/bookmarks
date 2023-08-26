/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        primaryRed: '#D9083A',
        darkRed: '#8C0327',
      },
      fontFamily: {
        sans: ['Bai Jamjuree', 'sans-serif']
      }
    }
  },
  plugins: [],
}