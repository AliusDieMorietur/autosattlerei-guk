import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const LOCALES = ["en", "de", "ua", "ru"] as const;

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "de",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
