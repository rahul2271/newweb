/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      
      /* ---------------- KEYFRAMES ---------------- */
      keyframes: {
        /* smoother, slower diagonal gradient flow */
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },

      /* ---------------- ANIMATIONS ---------------- */
      animation: {
        'gradient-flow': 'gradientFlow 20s ease-in-out infinite', // slower & smooth
        'spin-slow'    : 'spin 5s linear infinite',
        marquee        : 'marquee 15s linear infinite',
      },

      /* ---------------- BACKGROUND ---------------- */
      backgroundImage: {
        /* rich, premium diagonal gradient */
        'gradient-animate':
          'linear-gradient(120deg, #7e22ce, #9333ea, #3b82f6, #2563eb)',
      },
      backgroundSize: {
        '400': '400% 400%',
      },

      /* ---------------- COLORS ---------------- */
      colors: {
        'deep-purple-accent-400': '#7e3af2',
        'deep-purple-accent-700': '#5e35b1',
        'teal-accent-400':        '#1de9b6',
        'teal-accent-700':        '#00bfa5',
        'dark-bg': '#0d0f11',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },

      /* ---------------- SHADOW ---------------- */
      boxShadow: {
        black: '0 0 10px rgba(0,0,0,.5)',
        soft: '0 4px 20px rgba(255, 255, 255, 0.1)', // soft white glow for premium feel
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],

}
