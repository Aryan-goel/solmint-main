/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        slab: ["Arbutus Slab", ...defaultTheme.fontFamily.sans],
        monoton: ["Monoton", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
