/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
        'ubuntu' : ['Ubuntu', 'sans-serif'],
        'bebas' : ['Bebas Neue', 'sans-serif']
      },
    },
  },
  plugins: [],
}

