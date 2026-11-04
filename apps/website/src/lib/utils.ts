import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import { semanticTokenNames } from "@/theme/tokens";

const semanticGroup = (prefix: string) =>
  semanticTokenNames
    .filter((token) => token.startsWith(`${prefix}-`))
    .map((token) => `gk-${token}`);

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [...semanticGroup("text"), ...semanticGroup("icon")],
      "bg-color": [
        ...semanticGroup("surface"),
        ...semanticGroup("fill"),
        ...semanticGroup("divider"),
      ],
      "border-color": semanticGroup("stroke"),
    },
  },
});
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const grid = (quantity: number, size: number): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < size; i++) {
    result.push([]);
  }
  for (let i = 0; i < quantity; i++) {
    result[i % size].push(i + 1);
  }
  return result;
};
