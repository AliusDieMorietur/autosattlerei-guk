export const primitiveTokens = {
  "solid-black-100": "#000000",
  "solid-black-90": "#1C1C1C",
  "solid-black-80": "#434343",
  "solid-black-60": "#6d6d6d",
  "solid-black-50": "#8d8d8d",
  "solid-black-40": "#9b9b9b",
  "solid-black-20": "#cccccc",
  "solid-cream-100": "#F9F6EE",
  "solid-white-100": "#FFFFFF",
  "tp-white-5": "rgba(255, 255, 255, 0.05)",
  "tp-white-10": "rgba(255, 255, 255, 0.10)",
  "tp-white-70": "rgba(255, 255, 255, 0.70)",
  "tp-black-60": "rgba(0, 0, 0, 0.60)",
  "tp-black-70": "rgba(0, 0, 0, 0.70)",
  "tp-black-80": "rgba(0, 0, 0, 0.80)",
  "tp-surface-90": "rgba(28, 28, 28, 0.90)",
  "tp-surface-0": "rgba(28, 28, 28, 0)",
  "solid-brown-primary": "#523A34",
  "solid-red-primary": "#cc0000",
  "solid-green-primary": "#32DE8A",
  "solid-green-light": "#aaf0a8",
  "solid-rust-primary": "#8d3620",
} as const;

export const gukTheme = {
  "text-neutral-xhigh": "var(--gk-color-solid-white-100)",
  "text-neutral-high": "var(--gk-color-solid-cream-100)",
  "text-neutral-medium": "var(--gk-color-tp-white-70)",
  "text-neutral-low": "var(--gk-color-solid-black-50)",
  "text-colour-red": "var(--gk-color-solid-red-primary)",
  "text-colour-green": "var(--gk-color-solid-green-light)",
  "text-inverted-xhigh": "var(--gk-color-solid-black-90)",
  "surface-neutral-primary": "var(--gk-color-solid-black-90)",
  "surface-inverted-primary": "var(--gk-color-solid-cream-100)",
  "fill-primary-xxhigh": "var(--gk-color-solid-brown-primary)",
  "fill-secondary-xxhigh": "var(--gk-color-solid-rust-primary)",
  "fill-neutral-low": "var(--gk-color-tp-white-10)",
  "fill-neutral-xlow": "var(--gk-color-tp-white-5)",
  "fill-inverted-xxhigh": "var(--gk-color-solid-black-100)",
  "fill-inverted-xhigh": "var(--gk-color-tp-black-80)",
  "fill-inverted-high": "var(--gk-color-tp-black-70)",
  "fill-inverted-medium": "var(--gk-color-tp-black-60)",
  "stroke-neutral-low": "var(--gk-color-tp-white-10)",
  "fill-neutral-high": "var(--gk-color-solid-black-50)",
} as const;

export const semanticTokenNames = Object.keys(gukTheme) as Array<
  keyof typeof gukTheme
>;

export const surfaceFadeBottom =
  "linear-gradient(180deg, var(--gk-color-tp-surface-0) 30%, var(--gk-color-tp-surface-90) 100%)";
