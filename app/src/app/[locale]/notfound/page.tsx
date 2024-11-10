import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

export default function NotFound({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  setRequestLocale(locale);

  const t = useTranslations();

  return (
    <div>
      <h2>{t("label.NotFound")}</h2>
      <Link href="/de">Return Home</Link>
    </div>
  );
}
