import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssMotion from "tailwindcss-motion";

import { primitiveTokens, semanticTokenNames } from "./theme/tokens";

const primitiveColors = Object.fromEntries(
  Object.keys(primitiveTokens).map((token) => [
    token,
    `var(--gk-color-${token})`,
  ]),
);

const semanticColors = Object.fromEntries(
  semanticTokenNames.map((token) => [token, `var(--gk-${token})`]),
);

const semanticProperty = (token: string) => {
  if (token.startsWith("text-") || token.startsWith("icon-")) {
    return "color";
  }

  if (token.startsWith("stroke-")) {
    return "borderColor";
  }

  return "backgroundColor";
};

export const gukTailwindPreset = {
  theme: {
    extend: {
      colors: { gk: semanticColors, "gk-color": primitiveColors },
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
  plugins: [
    tailwindcssAnimate,
    tailwindcssMotion,
    plugin(function ({ addUtilities }) {
      addUtilities(
        Object.fromEntries(
          semanticTokenNames.map((token) => [
            `.gk-${token}`,
            { [semanticProperty(token)]: `var(--gk-${token})` },
          ]),
        ),
      );
    }),
  ],
} satisfies Partial<Config>;

export default gukTailwindPreset;
