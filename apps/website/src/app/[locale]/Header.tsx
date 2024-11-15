"use client";

import { Button } from "@/components/ui/button";
import { EMAIL, PHONE } from "@/constants";
import { useTranslations } from "next-intl";
import { BurgerSvg } from "@/components/icons/BurgerSvg";
import { useState } from "react";
import { XSvg } from "@/components/icons/XSvg";

export type HeaderProps = {};

export const Header = ({}: HeaderProps): JSX.Element => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* // max-w-[calc(theme(screens.desktop)-32px)] */}
      <div className="w-full max-w-desktop desktop:top-4 fixed z-[9999] left-1/2  -translate-x-1/2 flex flex-col gap-2 bg-c3 p-4 rounded">
        <div className="flex flex-col desktop:flex-row desktop:items-center gap-2 text-c7">
          <h1>{t("label.AutosattlereiGuk")}</h1>
          <div className="grow hidden desktop:block" />
          <div>{EMAIL}</div>
          <div>{PHONE}</div>
        </div>
        <div className="hidden:desktop fixed right-4 text-c7">
          {open && <XSvg onClick={() => setOpen(false)} />}
          {!open && <BurgerSvg onClick={() => setOpen(true)} />}
        </div>
        <div className="hidden desktop:flex gap-2">
          <Button className="grow">{t("button.Home")}</Button>
          <Button className="grow">{t("button.Gallerie")}</Button>
          <Button className="grow">{t("button.Contacts")}</Button>
          <Button className="grow">{t("button.Impressum")}</Button>
        </div>
      </div>
      {open && (
        <div className="fixed z-[9999] left-0 right-0 top-[118px] h-[calc(100vh-118px)] bg-c3 text-c7 flex flex-col gap-2 px-4">
          <Button>{t("button.Home")}</Button>
          <Button>{t("button.Gallerie")}</Button>
          <Button>{t("button.Contacts")}</Button>
          <Button>{t("button.Impressum")}</Button>
        </div>
      )}
    </>
  );
};
