"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ClockIcon as Clock,
  MapPinIcon as MapPin,
  PhoneIcon as Phone,
  EnvelopeIcon as Mail,
} from "@heroicons/react/24/solid";

export const Header = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const mobileButtons = [
    {
      link: `tel:${t("label.autosattlereiGukPhone").replace("-", "")}`,
      title: t("label.autosattlereiGukPhone"),
      icon: <Phone className="w-4 h-4" />,
    },
    {
      link: "",
      title: `${t("label.MODO")} • ${t("label.FR")}`,
      icon: <Clock className="w-4 h-4" />,
    },
    {
      link: `/#address`,
      title: t("label.autosattlereiGukAddress"),
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      link: `mailto:${t("label.autosattlereiGukMail")}`,
      title: t("label.autosattlereiGukMail"),
      icon: <Mail className="w-4 h-4" />,
    },
  ];
  return (
    <>
      <div className="w-full fixed z-[1000] flex flex-col items-center justify-center">
        <div className="hidden w-full desktop:flex justify-center gk-fill-secondary-xxhigh gk-text-neutral-xhigh px-6 py-1 text-base">
          <div className="w-full max-w-desktopLg flex justify-between items-center">
            <div className="flex gap-8">
              <Link href={`mailto:${t("label.autosattlereiGukMail")}`}>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <div>{t("label.autosattlereiGukMail")}</div>
                </div>
              </Link>
              <Link
                href={`tel:${t("label.autosattlereiGukPhone").replace(
                  "-",
                  ""
                )}`}
              >
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <div>{t("label.autosattlereiGukPhone")}</div>
                </div>
              </Link>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <div>
                  {t("label.MODO")} • {t("label.FR")}
                </div>
              </div>
            </div>
            <Link
              href="/impressum"
              className="gk-text-neutral-xhigh underline underline-offset-2"
            >
              {t("label.Impressum")}
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center gk-surface-neutral-primary gk-text-neutral-xhigh p-4 desktop:p-5 border-b gk-stroke-neutral-low desktop:border-none shadow-[0_8px_24px_var(--gk-surface-neutral-primary)]">
          <div className="w-full max-w-desktopLg flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div
                className="flex desktop:hidden relative w-6 h-6 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Menu
                  className={cn(
                    "transition-all duration-150 absolute w-6 h-6 gk-text-neutral-xhigh",
                    {
                      "opacity-0 invisible": open,
                      "opacity-100 visible": !open,
                    }
                  )}
                />
                <X
                  className={cn(
                    "transition-all duration-150 absolute w-6 h-6 gk-text-neutral-xhigh",
                    {
                      "opacity-0 invisible": !open,
                      "opacity-100 visible": open,
                    }
                  )}
                />
              </div>
              <Link href="/#home" onClick={() => setOpen(false)}>
                <span className="text-lg desktop:text-2xl font-medium">
                  {t("label.AutosattlereiGuk")}
                </span>
              </Link>
            </div>
            <div className="hidden desktop:flex items-center gap-6 text-lg">
              <Link href="/gallery">{t("button.OurServices")}</Link>
              <Link href="/blog">{t("button.Blog")}</Link>
              <Link href="/#contact-us">{t("button.ContactUs")}</Link>
            </div>
            <div className="flex desktop:hidden gap-3">
              <Link
                href={`mailto:${t("label.autosattlereiGukMail")}`}
                className="gk-fill-secondary-xxhigh p-2 rounded-full"
              >
                <Mail className="w-4 h-4" />
              </Link>
              <Link
                href={`tel:${t("label.autosattlereiGukPhone").replace(
                  "-",
                  ""
                )}`}
                className="gk-fill-secondary-xxhigh p-2 rounded-full"
              >
                <Phone className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "gk-text-neutral-xhigh gk-surface-neutral-primary w-full h-full fixed z-[1000] top-[65px] flex flex-col transition-all duration-150",
          {
            "opacity-100 visible": open,
            "opacity-0 invisible": !open,
          }
        )}
      >
        <div className="flex flex-col gap-4 p-4">
          <Link href="/gallery" onClick={() => setOpen(false)}>
            {t("button.OurServices")}
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            {t("button.Blog")}
          </Link>
          <Link
            href="/#contact-us"
            className="flex gap-2 items-center gk-text-colour-green"
            onClick={() => setOpen(false)}
          >
            {t("button.ContactUs")} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/impressum" onClick={() => setOpen(false)}>
            {t("button.Impressum")}
          </Link>
        </div>
        <div className="flex flex-col gap-4 gk-fill-secondary-xxhigh p-4">
          {mobileButtons.map(({ link, title, icon }, index) =>
            link ? (
              <Link
                key={index}
                href={link}
                className="flex gap-2 items-center"
                onClick={() => setOpen(false)}
              >
                {icon}
                <div>{title}</div>
              </Link>
            ) : (
              <div
                key={index}
                className="flex gap-2 items-center"
                onClick={() => setOpen(false)}
              >
                {icon}
                <div>{title}</div>
              </div>
            )
          )}
        </div>
        {pathname && <div className="px-4 py-2 gk-text-neutral-low uppercase">de</div>}
      </div>
    </>
  );
};
