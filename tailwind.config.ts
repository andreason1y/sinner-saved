import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial palette: ink-on-paper with a warm sacred accent
        ink: {
          50: "#f7f6f2",
          100: "#eeece4",
          200: "#d8d4c5",
          300: "#b6b09a",
          400: "#8d8773",
          500: "#6b6655",
          600: "#4f4b3e",
          700: "#3a372d",
          800: "#23211b",
          900: "#13110d",
          950: "#080705",
        },
        parchment: {
          DEFAULT: "#f5f1e8",
          deep: "#ebe4d2",
        },
        sacred: {
          // burnished gold / ember
          50: "#fdf7ed",
          100: "#faecd0",
          200: "#f5d79c",
          300: "#eebc63",
          400: "#e6a23a",
          500: "#d18420",
          600: "#b1651a",
          700: "#8d4b18",
          800: "#723c1a",
          900: "#5e321a",
        },
        crimson: {
          500: "#a32f2a",
          600: "#871f1c",
          700: "#671513",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "radial-glow":
          "radial-gradient(80% 60% at 50% 0%, rgba(209,132,32,0.18) 0%, rgba(209,132,32,0) 60%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(19,17,13,0.06), 0 8px 24px -8px rgba(19,17,13,0.18)",
        "card-hover":
          "0 4px 8px rgba(19,17,13,0.08), 0 24px 48px -12px rgba(19,17,13,0.32)",
        ring: "0 0 0 1px rgba(19,17,13,0.08)",
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
