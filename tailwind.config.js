/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4cb050",
          foreground: "#ffffff",
          dark: "#3e9142",
        },
        dark: {
          bg: "#000000",
          card: "#0a0a0a",
          border: "#333333",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
