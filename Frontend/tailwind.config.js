/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // 👈 This line is essential for Vite + React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
