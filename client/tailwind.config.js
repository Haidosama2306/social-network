/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {colors: {
      "secondary-text": "rgba(142,142,142,1)",
      "post-separator": "rgba(239,239,239,1)",
      "primary-button": "rgba(0, 149, 246,1)",
    }},
  },
  plugins: [],
}

