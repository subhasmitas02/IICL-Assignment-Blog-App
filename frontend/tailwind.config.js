/** @type {import('tailwindcss').Config} */
import tailwindcssV3Compatibility from '@tailwindcss/vite/v3-compat';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssV3Compatibility,
  ],
};
