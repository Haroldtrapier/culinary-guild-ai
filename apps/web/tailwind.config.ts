import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        void: "#0A0A0A",
        deep: "#111111",
        charcoal: "#1A1A1A",
        surface: "#222222",
        elevated: "#2A2A2A",
        // Gold palette
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C84A",
          dark: "#C9A227",
          deeper: "#B8860B",
          muted: "#8A7020",
          faint: "#2A2210",
        },
        // Text
        cream: {
          DEFAULT: "#F5F0E8",
          warm: "#E8DFD0",
          muted: "#C4B89A",
          faint: "#8A7D65",
        },
        // Accent
        crimson: {
          DEFAULT: "#8B1A1A",
          light: "#A52020",
          dark: "#6B1010",
        },
        // Status colors
        ember: "#C84B11",
        sage: "#4A7C59",
        slate: "#3A4A5C",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", ...fontFamily.serif],
        playfair: ["var(--font-playfair)", ...fontFamily.serif],
        sans: ["var(--font-inter)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #C9A227 50%, #B8860B 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #1A1A1A 100%)",
        "hero-gradient": "radial-gradient(ellipse at top, #1A1500 0%, #0A0A0A 60%)",
        "card-gradient": "linear-gradient(135deg, #1A1A1A 0%, #111111 100%)",
        "gold-radial": "radial-gradient(circle, #D4AF37 0%, #8A7020 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.3)",
        "gold-sm": "0 0 10px rgba(212, 175, 55, 0.2)",
        "gold-lg": "0 0 40px rgba(212, 175, 55, 0.4)",
        "inner-gold": "inset 0 0 20px rgba(212, 175, 55, 0.1)",
        premium: "0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212, 175, 55, 0.1)",
      },
      borderColor: {
        gold: "#D4AF37",
        "gold-muted": "rgba(212, 175, 55, 0.3)",
        "gold-faint": "rgba(212, 175, 55, 0.1)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "border-flow": "borderFlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        borderFlow: {
          "0%, 100%": { borderColor: "rgba(212, 175, 55, 0.3)" },
          "50%": { borderColor: "rgba(212, 175, 55, 0.8)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#F5F0E8",
            h1: { color: "#D4AF37", fontFamily: "var(--font-playfair)" },
            h2: { color: "#D4AF37", fontFamily: "var(--font-playfair)" },
            h3: { color: "#E8C84A", fontFamily: "var(--font-playfair)" },
            strong: { color: "#F5F0E8" },
            a: { color: "#D4AF37" },
            blockquote: { borderLeftColor: "#D4AF37", color: "#C4B89A" },
          },
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
