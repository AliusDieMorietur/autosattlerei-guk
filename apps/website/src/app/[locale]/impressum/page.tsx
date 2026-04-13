import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

type ImpressumPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: ImpressumPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("impressumTitle"),
    description: t("impressumDescription"),
    alternates: buildAlternates(locale, "/impressum"),
    robots: { index: false, follow: true },
  };
};

export default function Impressum() {
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
