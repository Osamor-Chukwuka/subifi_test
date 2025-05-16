/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* Hide scrollbar for Webkit browsers */
          '-webkit-overflow-scrolling': 'touch', /* Smooth scrolling */
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari */
          },
        },
      });
    },
  ],
}