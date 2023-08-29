/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'g1-1': '#4ca1af',
        'g1-2': '#c4e0e5',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
