import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

export default function NotFound(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = use(props.params);

  const { locale } = params;

  setRequestLocale(locale);

  const t = useTranslations();

  return (
    <div>
      <h2>{t("label.NotFound")}</h2>
      <Link href="/de">Return Home</Link>
    </div>
  );
}
