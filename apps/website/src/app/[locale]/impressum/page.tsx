import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Impressum - Autosattlerei Guk in Berlin",
    description: "Autosattlerei Guk in Berlin - Impressum",
  };
};

export default function Impressum(): JSX.Element {
  const t = useTranslations();

  return (
    <div className="flex flex-col text-c7 p-5 desktopLg:p-0 -mt-4">
      <div className="text-c14">Impressum</div>
      <div>Stanislav Guk</div>
      <div className="mb-4">{t("label.AutosattlereiGuk")}</div>
      <div className="text-c14">Betriebsstätte</div>
      <div>{t("label.autosattlereiGukAddress")}</div>
      <div className="mb-4">{t("label.autosattlereiGukIndex")}</div>
      <div className="text-c14">Kontakt</div>
      <div>Telefon: {t("label.autosattlereiGukPhone")}</div>
      <div className="mb-4">E-Mail: {t("label.autosattlereiGukMail")}</div>
      <div className="text-c14">Umsatzsteuer-ID</div>
      <div>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
      </div>
      <div className="mb-4">DE368433891</div>
      <div className="text-c14">
        Verbraucher­streit­beilegung / Universal­schlichtungs­stelle
      </div>
      <div>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </div>
    </div>
  );
}
