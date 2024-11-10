import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "de", "ru", "ua"],

  defaultLocale: "de",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
