"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { Mail, Menu, Phone, X } from "lucide-react";
import { LanguageSelect } from "@/components/LanguageSelect";
import { usePathname, useRouter } from "next/navigation";

export type HeaderProps = {
  locale: string;
};

export const Header = ({ locale }: HeaderProps): JSX.Element => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const buttons = [
    {
      link: `/${locale}/#home`,
      title: t("button.Home"),
    },
    {
      link: `/${locale}/gallery`,
      title: t("button.Gallery"),
    },
    {
      link: `/${locale}/#contacts`,
      title: t("button.Contacts"),
    },
    {
      link: `/${locale}/impressum`,
      title: t("button.Impressum"),
    },
  ];
  return (
    <>
      <div className="px-4 desktop:px-0 w-full max-w-desktop fixed z-[999] left-1/2  -translate-x-1/2 flex flex-col gap-2 bg-c2 py-4 border-b border-c3">
        <div className="flex flex-col desktop:flex-row desktop:items-center gap-2 text-c7">
          <h1 className="text-4xl">{t("label.AutosattlereiGuk")}</h1>
          <div className="grow hidden desktop:block" />
          <Link href={`mailto:${t("label.autosattlereiGukMail")}`}>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <div className="text-lg">{t("label.autosattlereiGukMail")}</div>
            </div>
          </Link>
          <Link
            href={`tel:${t("label.autosattlereiGukPhone").replace("-", "")}`}
          >
            <div className="text-c11 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <div className="text-lg">{t("label.autosattlereiGukPhone")}</div>
            </div>
          </Link>
          <LanguageSelect
            value={locale}
            onChange={(locale) => {
              const newPathName = pathname.split("/");
              newPathName[1] = locale;
              router.push(newPathName.join("/"));
            }}
          />
        </div>
        <div className="tablet:hidden fixed right-4 text-c7">
          {open && (
            <X className="min-w-7 min-h-7" onClick={() => setOpen(false)} />
          )}
          {!open && (
            <Menu className="min-w-7 min-h-7" onClick={() => setOpen(true)} />
          )}
        </div>
        <div className="hidden desktop:flex gap-2">
          {buttons.map(({ link, title }, index) => (
            <Link key={index} href={link} className="grow">
              <Button className="w-full">{title}</Button>
            </Link>
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed z-[9999] left-0 right-0 top-[118px] h-[calc(100vh-118px)] bg-c2 text-c7 flex flex-col gap-2 px-4">
          {buttons.map(({ link, title }, index) => (
            <Link key={index} href={link} onClick={() => setOpen(false)}>
              <Button className="w-full">{title}</Button>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
