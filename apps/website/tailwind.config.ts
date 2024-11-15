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
        c1: "#000000",
        c2: "#1C1C1C",
        c3: "#434343",
        c4: "#6d6d6d",
        c5: "#9b9b9b",
        c6: "#cccccc",
        c7: "#F9F6EE",
        c8: "#FFFFFF",
        c9: "#523A34",
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
      boxShadow: {
        line: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
