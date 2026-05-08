/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark:   '#1A0F06',
        gold:   '#C8862A',
        cream:  '#FAF3E4',
        brown:  '#2D1A0A',
        muted:  '#6B5540',
        'gold-light': '#E8A84A',
        'dark-2': '#251508',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
