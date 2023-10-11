/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'pry-col' : '#299D91',
        'defaultBlack' : '#191919',
        'gray02' : '#878787',
        'gray03' : '#9F9F9F',
        'gray05' : '#E8E8E8',
        'secondary' : '#525256',
        'greyish' : "rgba(255, 255, 255, 0.08)",
        'greyish2' : "rgba(255, 255, 255, 0.70)",
        'special' : "rgba(210, 210, 210, 0.25)"
      },
      fontSize: {
        'll' : '40px'
      },
    },
    
  },
  plugins: [],
}

