/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
        colors: {
            "primary": "#7000FF",
            "secondary": "#222",
        }
    },
  },
  plugins: [],
}

