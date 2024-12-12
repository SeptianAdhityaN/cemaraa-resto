/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#10B981',
        'secondary': '#1E293B',
        'background': '#F8FAFC',
        'ascent': '#FBBF24',
      }
    },
  },
  plugins: [
    daisyui,
  ],
}

