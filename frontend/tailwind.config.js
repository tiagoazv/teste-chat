/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.2s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(-4px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
  },
},
  plugins: [],
}
