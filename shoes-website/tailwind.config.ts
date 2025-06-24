import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kugile': ['Kugile', 'sans-serif'],
        'firlest': ['Firlest', 'serif'],
      },
      colors: {
        // Brand colors with nested structure
        primary: {
          orange: '#FF914D',
          dark: '#1A1A1A',
          light: '#F1F1F1',
        },
        // Direct color names for easier use
        'primary-orange': '#FF914D',
        'primary-dark': '#1A1A1A',
        'primary-light': '#F1F1F1',
        'accent': '#FF914D',
        // Background colors
        background: {
          DEFAULT: '#F1F1F1',
          dark: '#1A1A1A',
          light: '#FFFFFF',
        },
        // Text colors
        text: {
          DEFAULT: '#1A1A1A',
          light: '#F1F1F1',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
