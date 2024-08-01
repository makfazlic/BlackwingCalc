/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
      },
      colors: {
        "primary": "#03C6DA",
        "secondary": "#E01707",
        "secondary-dark": "#5a0903",
        "my-black": "#000501"
  
      },
    },
  },
  plugins: [],
}

