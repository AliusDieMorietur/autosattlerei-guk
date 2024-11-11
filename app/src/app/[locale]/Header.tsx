import { Button } from "@/components/ui/button";
import { EMAIL, PHONE } from "@/constants";
import { useTranslations } from "next-intl";

export type HeaderProps = {};

export const Header = ({}: HeaderProps): JSX.Element => {
  const t = useTranslations();
  return (
    <div className="w-full max-w-[calc(theme(screens.desktop)-120px)] desktop:top-10 fixed z-[999] left-1/2  -translate-x-1/2 flex flex-col gap-2 bg-c7 p-4 rounded">
      <div className="flex flex-col desktop:flex-row desktop:items-center gap-2">
        <h1>{t("label.AutosattlereiGuk")}</h1>
        <div className="grow hidden desktop:block" />
        <div>{EMAIL}</div>
        <div>{PHONE}</div>
      </div>
      <div className="flex flex-col desktop:flex-row gap-2">
        <Button className="grow bg-c9 text-c7">{t("label.Contacts")}</Button>
        <Button className="grow bg-c9 text-c7">{t("label.Contacts")}</Button>
        <Button className="grow bg-c9 text-c7">{t("label.Contacts")}</Button>
        <Button className="grow bg-c9 text-c7">{t("label.Impressum")}</Button>
      </div>
    </div>
  );
};
