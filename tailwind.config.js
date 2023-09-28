/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DCFD00",
        "light-pastel": "#FFFCDF",
        "light-yellow": "#F8FDB2",
        "light-orange": "#FFE7AE",
        "light-pink": "#FFADDE",
        "light-blue": "#A4E8FF",
        "light-green": "#A4FFB3",
        "accent-red": "#EB5757",
        "accent-green": "#27AE60",
        "accent-black": "#000000",
        "accent-grey": "#71717A",
        "accent-white": "#FFFFFF",
        "accent-grey-2": "#72777A",
      },
    },
  },
  plugins: [],
};
