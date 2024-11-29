"use client";

import { Button } from "@/components/ui/button";
import { EMAIL, PHONE } from "@/constants";
import { useTranslations } from "next-intl";
import { BurgerSvg } from "@/components/icons/BurgerSvg";
import { useState } from "react";
import { XSvg } from "@/components/icons/XSvg";
import { PhoneSvg } from "@/components/icons/PhoneSvg";
import Link from "next/link";

export type HeaderProps = {
  locale: string;
};

export const Header = ({ locale }: HeaderProps): JSX.Element => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

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
          <h1>{t("label.AutosattlereiGuk")}</h1>
          <div className="grow hidden desktop:block" />
          <div>{EMAIL}</div>
          <div className="text-c11 flex items-center">
            <PhoneSvg className="size-4" />
            <div className="text-lg">{PHONE}</div>
          </div>
        </div>
        <div className="tablet:hidden fixed right-4 text-c7">
          {open && <XSvg onClick={() => setOpen(false)} />}
          {!open && <BurgerSvg onClick={() => setOpen(true)} />}
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
