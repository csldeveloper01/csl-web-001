/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',   // Mobile / small tablet
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large desktop
    },
    extend: {
      colors: {
        csl: {
          blue: 'var(--color-csl-blue)',
          'deep-blue': 'var(--color-csl-deep-blue)',
          gold: 'var(--color-csl-gold)',
          'light-gold': 'var(--color-csl-light-gold)',
          bg: 'var(--color-csl-bg)',
          text: 'var(--color-csl-text)',
          muted: 'var(--color-csl-muted)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
