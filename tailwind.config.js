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
                ink: "#0B1215",     // Deep premium near-black
                sand: {
                    DEFAULT: "#F7F3EC", // Warm cream background
                    dark: "#EDE6DA",
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                serif: ['Fraunces', 'Georgia', 'serif'],
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
                'kenburns': 'kenburns 9s ease-out forwards',
                'scroll-cue': 'scrollCue 2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
            },
            transitionTimingFunction: {
                'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                kenburns: {
                    '0%': { transform: 'scale(1.15)' },
                    '100%': { transform: 'scale(1)' },
                },
                scrollCue: {
                    '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
                    '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
                    '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
                    '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
                },
            }
        },
    },
    plugins: [],
}


