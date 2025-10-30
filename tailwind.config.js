/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6fffa',
          100: '#ecfdf5',
          300: '#9ee6b2',
          500: '#16a34a',
          700: '#15803d'
        },
        warm: {
          50: '#fff8f1',
          100: '#fff0e0',
          300: '#ffd6a5',
          500: '#ff9f43'
        },
        cream: {
          50: '#fbfaf7'
        }
      },
      fontFamily: {
        sans: ["Nunito", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: '0 8px 30px rgba(17,24,39,0.06)',
        lifted: '0 10px 45px rgba(16,24,40,0.08)'
      }
    }
  },
  plugins: []
}
