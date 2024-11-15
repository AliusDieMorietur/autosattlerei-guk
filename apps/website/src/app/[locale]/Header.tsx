import { Button } from "@/components/ui/button";
import { EMAIL, PHONE } from "@/constants";
import { useTranslations } from "next-intl";

export type HeaderProps = {};

export const Header = ({}: HeaderProps): JSX.Element => {
  const t = useTranslations();
  return (
    //  max-w-[calc(theme(screens.desktop)-32px)]
    <div className="w-full max-w-desktop desktop:top-4 fixed z-[9999] left-1/2  -translate-x-1/2 flex flex-col gap-2 bg-c3 p-4 rounded">
      <div className="flex flex-col desktop:flex-row desktop:items-center gap-2 text-c7">
        <h1>{t("label.AutosattlereiGuk")}</h1>
        <div className="grow hidden desktop:block" />
        <div>{EMAIL}</div>
        <div>{PHONE}</div>
      </div>
      <div className="flex flex-col desktop:flex-row gap-2">
        <Button className="grow bg-c9 text-c7">{t("button.Home")}</Button>
        <Button className="grow bg-c9 text-c7">{t("button.Gallerie")}</Button>
        <Button className="grow bg-c9 text-c7">{t("button.Contacts")}</Button>
        <Button className="grow bg-c9 text-c7">{t("button.Impressum")}</Button>
      </div>
    </div>
  );
};
