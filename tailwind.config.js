/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    // This is vital for React projects
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

