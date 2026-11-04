import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ContactForm } from "./ContactForm";

export async function ContactSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });

  return (
    <div className="flex flex-col desktop:flex-row justify-center desktop:gap-16 p-5 desktop:p-0">
      <div className="flex flex-col justify-center w-full desktop:w-1/3">
        <h2 className="text-white mb-2 text-2xl">{t("label.ContactUs")}</h2>
        <div className="text-c14 mb-4">{t("label.FeelFreeToContactUs")}</div>
        <div className="text-c14 mb-1">{t("label.Address")}</div>
        <Link
          href="/#address"
          className="text-white mb-4 underline underline-offset-2"
        >
          {t("label.autosattlereiGukAddress")}
        </Link>
        <div className="text-c14 mb-1">{t("label.WorkingHours")}</div>
        <div className="text-white">{t("label.MODO")}</div>
        <div className="text-white mb-4">{t("label.FR")}</div>
        <div className="text-c14 mb-1">{t("label.Phone")}</div>
        <Link
          href={`tel:${t("label.autosattlereiGukPhone").replace("-", "")}`}
          className="text-white mb-4 underline underline-offset-2"
        >
          {t("label.autosattlereiGukPhone")}
        </Link>
        <div className="text-c14 mb-1">{t("label.Email")}</div>
        <Link
          href={`mailto:${t("label.autosattlereiGukMail")}`}
          className="text-white mb-4 underline underline-offset-2"
        >
          {t("label.autosattlereiGukMail")}
        </Link>
      </div>
      <ContactForm className="w-full desktop:w-1/3" />
    </div>
  );
}
