/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
        heading: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: "#2563EB",   // blue-600
          secondary: "#1E40AF", // blue-800
          accent: "#0F172A",    // slate-900
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      }
    },
  },
  plugins: [],
}
