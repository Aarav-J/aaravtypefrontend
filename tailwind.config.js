/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        'familjen': ['Familjen Grotesk', "serif"],
        'oxygen': ['Oxygen', "sans-serif"]
      },
      colors: { 
        'background': "#0F1820", 
        'untyped': '#CF6BDD', 
        "underline": "#70427E", 
        'correct': "#EEDAEA", 
        'incorrect': "#FF5253", 
        'colorBackground': "#292136"
      }
    },
  },
  plugins: [],
}