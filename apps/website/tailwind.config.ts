import type { Config } from "tailwindcss";

import gukTailwindPreset from "./src/tailwind-preset";

export default {
  presets: [gukTailwindPreset],
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;
