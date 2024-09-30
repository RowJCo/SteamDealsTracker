/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
      extend: {
        minHeight: {
          "75%": "75vh",
          "50%": "50vh",
          "25%": "25vh",
        },
      },
    },
  }