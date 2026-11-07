/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nova: {
          950: '#161033',
          900: '#1f1747',
          800: '#2a1f5e',
          700: '#3a2a7d',
          600: '#4c34a3',
          500: '#6440c9',
          400: '#7c5cf0',
          300: '#a58cf5',
          200: '#d4c8fb',
          100: '#ebe5fd',
          50: '#f5f2fe',
        },
        brand: {
          from: '#6440c9',
          to: '#2563eb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)',
      }
    },
  },
  plugins: [],
}
