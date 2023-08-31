/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'g1-1': '#a8edea',
        'g1-2': '#fed6e3',
        'g2-1': '#30cfd0',
        'g2-2': '#330867',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
