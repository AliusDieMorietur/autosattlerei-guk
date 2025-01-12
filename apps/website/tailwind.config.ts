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
        c10: "#cc0000",
        c11: "#32DE8A",
        c12: "#8d3620",
        c13: "#aaf0a8",
        c14: "#8d8d8d",
      },
      screens: {
        desktopLg: "1440px",
        desktop: "1024px",
        tablet: "768px",
      },
      width: {
        desktopLg: "1440px",
        desktop: "1024px",
        tablet: "768px",
      },
      maxWidth: {
        desktopLg: "1440px",
        desktop: "1024px",
        tablet: "768px",
      },
      boxShadow: {
        line: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.15s ease-out",
        "collapsible-up": "collapsible-up 0.15s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-motion")],
} satisfies Config;
