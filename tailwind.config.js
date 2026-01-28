/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0F766E", // Teal 700
                    light: "#2DD4BF",   // Teal 400
                    dark: "#042F2E",    // Teal 950
                },
                secondary: {
                    DEFAULT: "#F59E0B", // Amber 500
                    light: "#FCD34D",   // Amber 300
                    dark: "#B45309",    // Amber 700
                },
                slate: {
                    950: "#020617",
                },
                accent: "#6366f1",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
                '6xl': '4rem',
            },
            boxShadow: {
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}


