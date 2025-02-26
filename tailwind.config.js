/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // App Router files
    "./components/**/*.{js,ts,jsx,tsx}", // Components
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // If using a `src` directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
