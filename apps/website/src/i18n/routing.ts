import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const LOCALES = ["de"] as const;

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "de",
  localePrefix: "never",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
