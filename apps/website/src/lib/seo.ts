import { config } from "./config";

/** Maps next-intl locale slugs to BCP 47 language tags */
export const localeToLang: Record<string, string> = {
  de: "de",
};

/** Maps next-intl locale slugs to Open Graph locale strings */
export const localeToOgLocale: Record<string, string> = {
  de: "de_DE",
};

export const defaultSocialImage = {
  url: `${config.hostUrl}/og-image.jpg`,
  width: 1200,
  height: 675,
  alt: "Individuell ausgestatteter Fahrzeuginnenraum von Autosattlerei Guk",
};

export function buildAlternates(_locale: string, pathSuffix: string = "") {
  return {
    canonical: `${config.hostUrl}${pathSuffix || "/"}`,
    languages: {
      de: `${config.hostUrl}${pathSuffix || "/"}`,
      "x-default": `${config.hostUrl}${pathSuffix || "/"}`,
    },
  };
}
