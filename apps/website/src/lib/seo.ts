import { config } from "./config";
import { LOCALES } from "@/i18n/routing";

/** Maps next-intl locale slugs to BCP 47 language tags */
export const localeToLang: Record<string, string> = {
  de: "de",
  en: "en",
  ua: "uk",
  ru: "ru",
};

/** Maps next-intl locale slugs to Open Graph locale strings */
export const localeToOgLocale: Record<string, string> = {
  de: "de_DE",
  en: "en_US",
  ua: "uk_UA",
  ru: "ru_RU",
};

/**
 * Returns `alternates` metadata (canonical + hreflang) for a given locale and
 * path suffix (everything after the locale segment, e.g. "/gallery").
 */
export function buildAlternates(locale: string, pathSuffix: string = "") {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[localeToLang[l]] = `${config.hostUrl}/${l}${pathSuffix}`;
  }
  languages["x-default"] = `${config.hostUrl}/de${pathSuffix}`;
  return {
    canonical: `${config.hostUrl}/${locale}${pathSuffix}`,
    languages,
  };
}
