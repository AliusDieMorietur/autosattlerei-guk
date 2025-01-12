"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { LanguageSelect } from "@/components/LanguageSelect";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ClockIcon as Clock,
  MapPinIcon as MapPin,
  PhoneIcon as Phone,
  EnvelopeIcon as Mail,
} from "@heroicons/react/24/solid";

export type HeaderProps = {
  locale: string;
};

export const Header = ({ locale }: HeaderProps): JSX.Element => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
      link: `/${locale}/#address`,
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
        <div className="hidden w-full desktop:flex justify-center bg-c12 text-c8 px-6 py-1 text-base">
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
              href={`/${locale}/impressum`}
              className="text-white underline underline-offset-2"
            >
              {t("label.Impressum")}
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center bg-c2 text-white p-4 desktop:p-5 border-b border-white/10 desktop:border-none">
          <div className="w-full max-w-desktopLg flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div
                className="flex desktop:hidden relative w-6 h-6 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Menu
                  className={cn(
                    "transition-all duration-150 absolute w-6 h-6 text-white",
                    {
                      "opacity-0 invisible": open,
                      "opacity-100 visible": !open,
                    }
                  )}
                />
                <X
                  className={cn(
                    "transition-all duration-150 absolute w-6 h-6 text-white",
                    {
                      "opacity-0 invisible": !open,
                      "opacity-100 visible": open,
                    }
                  )}
                />
              </div>
              <Link href={`/${locale}/#home`} onClick={() => setOpen(false)}>
                <h1 className="text-lg desktop:text-2xl">
                  {t("label.AutosattlereiGuk")}
                </h1>
              </Link>
            </div>
            <div className="hidden desktop:flex items-center gap-6 text-lg">
              <Link href={`/${locale}/gallery`}>{t("button.OurServices")}</Link>
              <Link href={`/${locale}/#contact-us`}>
                {t("button.ContactUs")}
              </Link>
              <div className="bg-white/10 h-6 w-px -mx-2" />
              <LanguageSelect
                value={locale}
                onChange={(locale) => {
                  setOpen(false);
                  const newPathName = pathname.split("/");
                  newPathName[1] = locale;
                  router.push(newPathName.join("/"));
                }}
              />
            </div>
            <div className="flex desktop:hidden gap-3">
              <Link
                href={`mailto:${t("label.autosattlereiGukMail")}`}
                className="bg-c12 p-2 rounded-full"
              >
                <Mail className="w-4 h-4" />
              </Link>
              <Link
                href={`tel:${t("label.autosattlereiGukPhone").replace(
                  "-",
                  ""
                )}`}
                className="bg-c12 p-2 rounded-full"
              >
                <Phone className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "text-white bg-c2 w-full h-full fixed z-[1000] top-[65px] flex flex-col transition-all duration-150",
          {
            "opacity-100 visible": open,
            "opacity-0 invisible": !open,
          }
        )}
      >
        <div className="flex flex-col gap-4 p-4">
          <Link href={`/${locale}/gallery`} onClick={() => setOpen(false)}>
            {t("button.OurServices")}
          </Link>
          <Link
            href={`/${locale}/#contact-us`}
            className="flex gap-2 items-center text-c13"
            onClick={() => setOpen(false)}
          >
            {t("button.ContactUs")} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href={`/${locale}/impressum`} onClick={() => setOpen(false)}>
            {t("button.Impressum")}
          </Link>
        </div>
        <div className="flex flex-col gap-4 bg-c12 p-4">
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
        <div className="px-4 py-2">
          <LanguageSelect.Horizontal
            value={locale}
            onChange={(locale) => {
              setOpen(false);
              const newPathName = pathname.split("/");
              newPathName[1] = locale;
              router.push(newPathName.join("/"));
            }}
          />
        </div>
      </div>
    </>
  );
};
