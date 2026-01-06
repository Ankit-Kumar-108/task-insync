import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        // Your existing animation
        'gradient-xy': 'gradient-xy 6s ease infinite',
        
        // 👇 New Google Loader Animations
        'google-flip': 'google-flip 2s step-end infinite',
        'google-b': 'google-b-morph 1s linear infinite, google-b-fill 2s step-end infinite',
        'google-c': 'google-c-morph 1s linear infinite, google-c-fill 2s linear infinite',
      },
      keyframes: {
        // Your existing keyframes
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        
        // 👇 New Google Loader Keyframes
        'google-flip': {
          '0%': { transform: 'rotate(90deg)' },
          '25%': { transform: 'rotate(180deg)' },
          '50%': { transform: 'rotate(270deg)' },
          '75%': { transform: 'rotate(360deg)' },
        },
        'google-b-morph': {
          '0%, 100%': { d: 'path("M 0 12 a 12 12 0 0 1 24 0 a 12 12 0 0 0 -24 0")' },
          '25%, 75%': { d: 'path("M 0 12 a 12 12 0 0 1 24 0 a 12 0 0 0 0 -24 0")' },
        },
        'google-b-fill': {
          '0%': { fill: 'hsl(var(--c1), 100%, 43%)' },
          '50%': { fill: 'hsl(var(--c2), 100%, 43%)' },
        },
        'google-c-morph': {
          '0%, 25%, 75%, 100%': { d: 'path("M 0 12 h 24 a 12 0  0 0 1 -24 0")' },
          '50%': { d: 'path("M 0 12 h 24 a 12 12 0 0 1 -24 0")' },
        },
        'google-c-fill': {
          '0%, 25%': { fill: 'hsl(var(--c1), 100%, 43%)' },
          '12.5%, 37.5%': { fill: 'hsl(var(--c1), 100%, 25%)' },
          '50%, 75%': { fill: 'hsl(var(--c2), 100%, 43%)' },
          '62.5%, 87.5%': { fill: 'hsl(var(--c2), 100%, 25%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;