/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          light: "#FFE0E5",
          DEFAULT: "#FFB6C1",
          dark: "#FF7F9D",
        },
        purple: {
          light: "#EADAFD",
          DEFAULT: "#D5C0F5",
          dark: "#C0A6F0",
        },
        blue: {
          light: "#D6ECFF",
          DEFAULT: "#ADD8FF",
          dark: "#85C7FF",
        },
      },
      fontFamily: {
        decorative: ['"Comic Sans MS"', "cursive"],
      },
    },
  },
  plugins: [],
};
