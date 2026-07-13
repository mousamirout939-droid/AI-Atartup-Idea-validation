/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f0ff',
          100: '#e4e3ff',
          200: '#cdccff',
          300: '#aaa6ff',
          400: '#8177ff',
          500: '#6247ff',
          600: '#4f2ff5',
          700: '#4322d9',
          800: '#381db0',
          900: '#301c8b',
          950: '#1c0f5c',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(30, 20, 90, 0.08)',
        glow: '0 0 0 1px rgba(98,71,255,0.1), 0 8px 30px -8px rgba(98,71,255,0.35)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(98,71,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(98,71,255,0.06) 1px, transparent 1px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};
