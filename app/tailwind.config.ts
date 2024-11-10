import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: "#1C1C1C",
        c2: "#E83151",
        c3: "#FAFAFF",
      },
      screens: {
        desktop: "1200px",
      },
      width: {
        desktop: "1200px",
      },
      maxWidth: {
        desktop: "1200px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
