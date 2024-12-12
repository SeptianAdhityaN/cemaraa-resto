/** @type {import('tailwindcss').Config} */
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
    import ('daisyui'),
  ],
}

