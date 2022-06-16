/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        margin: ({ theme }) => ({
            '10vw': '10vw',
            ...theme('spacing'),
        }),
        padding: ({ theme }) => ({
            '5vw': '5vw',
            ...theme('spacing'),
        }),
    },
},
  plugins: [],
}
