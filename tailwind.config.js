/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
        },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
        keyframes: {
            fadeIn: {
              '0%': { 
                opacity: '0',
                transform: 'translateY(20px)'
              },
              '100%': { 
                opacity: '1',
                transform: 'translateY(0)'
              },
            },
        },
        animation: {
            'fade-in': 'fadeIn 0.6s ease-out forwards',
        },
        backdropBlur: {
            'xs': '2px',
        },
  	}
  },
  plugins: [require("tailwindcss-animate"),
    require('@tailwindcss/typography')
  ],
}