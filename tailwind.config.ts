import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef9ec",
          100: "#fcf0c9",
          200: "#f9de8e",
          300: "#f5c74e",
          400: "#f2b427",
          500: "#ec9610",
          600: "#d1710b",
          700: "#ad500d",
          800: "#8d3f11",
          900: "#743412",
          950: "#431a06",
        },
        forest: {
          50: "#f0fdf1",
          100: "#dcfce0",
          200: "#bbf7c2",
          300: "#86ef93",
          400: "#4ade5e",
          500: "#22c538",
          600: "#16a329",
          700: "#158024",
          800: "#166521",
          900: "#14531e",
          950: "#052e0d",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
