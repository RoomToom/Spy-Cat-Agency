import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#ececf0",
          200: "#dcdce3",
          300: "#b7b7c2",
          400: "#8e8ea0",
          500: "#6b6b7b",
          600: "#4f4f5a",
          700: "#3b3b44",
          800: "#2a2a31",
          900: "#1d1d22"
        },
        agent: {
          // акцент
          500: "#00e5a8"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,.12)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    },
  },
  plugins: [],
} satisfies Config;
