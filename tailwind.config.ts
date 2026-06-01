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
        // "Old-master" palette: warm espresso ink on aged ivory, with an
        // antique gold-leaf accent and a rare oxblood for emphasis.
        ink: {
          50: "#f6f1e6",
          100: "#ece3d1",
          200: "#d7cab0",
          300: "#b6a585",
          400: "#8c7a59",
          500: "#6b5b3e",
          600: "#4f4129",
          700: "#39301d",
          800: "#241d11",
          900: "#15100a",
          950: "#0c0805",
        },
        parchment: {
          // aged ivory; `light` reads as the "fresh page" used for cards
          DEFAULT: "#f4ecdb",
          deep: "#e9ddc4",
          light: "#fbf6ec",
        },
        // Antique gold leaf — muted, slightly green-gold, never neon
        gold: {
          50: "#faf4e6",
          100: "#f1e4c4",
          200: "#e2cd97",
          300: "#cdab68",
          400: "#b8924a",
          500: "#9a7b3f",
          600: "#7e6232",
          700: "#5f4a27",
          800: "#49391f",
          900: "#382c19",
        },
        // Kept as an alias so any lingering `sacred-*` class resolves to the
        // new antique gold instead of the old neon ember.
        sacred: {
          50: "#faf4e6",
          100: "#f1e4c4",
          200: "#e2cd97",
          300: "#cdab68",
          400: "#b8924a",
          500: "#9a7b3f",
          600: "#7e6232",
          700: "#5f4a27",
          800: "#49391f",
          900: "#382c19",
        },
        oxblood: {
          500: "#7c2f2c",
          600: "#642321",
          700: "#4d1917",
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
        // A thin brushed gold-leaf gradient for hairline rules & accents
        "gold-leaf":
          "linear-gradient(90deg, rgba(154,123,63,0) 0%, rgba(184,146,74,0.9) 20%, rgba(226,205,151,1) 50%, rgba(184,146,74,0.9) 80%, rgba(154,123,63,0) 100%)",
        "radial-glow":
          "radial-gradient(80% 60% at 50% 0%, rgba(154,123,63,0.10) 0%, rgba(154,123,63,0) 60%)",
      },
      boxShadow: {
        // Warm, soft, expensive elevation — large low-opacity espresso shadows
        card: "0 2px 6px -2px rgba(21,16,10,0.10), 0 12px 32px -12px rgba(21,16,10,0.22)",
        "card-hover":
          "0 6px 16px -4px rgba(21,16,10,0.14), 0 32px 64px -16px rgba(21,16,10,0.34)",
        ring: "0 0 0 1px rgba(21,16,10,0.08)",
        gold: "0 0 0 1px rgba(184,146,74,0.35), 0 18px 48px -18px rgba(120,95,48,0.45)",
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
        marquee: "marquee 18s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
