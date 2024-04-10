/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "768px" },
        tablet: { min: "769px", max: "1230px" },
      },
    },
  },

  plugins: [],
};
