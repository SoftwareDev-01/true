/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#050816",
        "sidebar-muted": "#9CA3AF"
      }
    }
  },
  plugins: []
};
