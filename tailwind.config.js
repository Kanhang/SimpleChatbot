// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add all your template files
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          500: '#3b82f6',
          600: '#2563eb',
        }
      },
      fontFamily: {
        'custom': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}