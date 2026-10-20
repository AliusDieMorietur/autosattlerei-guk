import { config } from "@/lib/config";
import { buildAlternates, localeToOgLocale } from "@/lib/seo";
import { Header } from "@/components/Header";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import "../globals.css";

const Poppins = localFont({
  src: [
    {
      path: "../fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  preload: false,
});

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = localeToOgLocale[locale] ?? "de_DE";
  return {
    title: {
      template: `%s | Autosattlerei Guk`,
      default: "Autosattlerei Guk",
    },
    description: t("homeDescription"),
    alternates: buildAlternates(locale),
    openGraph: {
      siteName: "Autosattlerei Guk",
      locale: ogLocale,
      images: [{ url: `${config.hostUrl}/logo.png`, width: 512, height: 512, alt: "Autosattlerei Guk" }],
    },
    twitter: {
      card: "summary",
      images: [`${config.hostUrl}/logo.png`],
    },
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>,
) {
  const params = await props.params;

  const { locale } = await params;

  const { children } = props;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {config.gtmId && <GoogleTagManager gtmId={config.gtmId} />}
        {config.gaId && <GoogleAnalytics gaId={config.gaId} />}
      </head>
      <body className={`${Poppins.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div id="home" className="w-full flex flex-col h-screen">
            <Header locale={locale} />
            <div className="min-h-[65px] desktop:min-h-[104px] w-full"></div>
            <div className="pt-3 flex justify-center overflow-y-auto">
              <div className="flex flex-col w-full max-w-desktopLg">
                {children}
                <div className="w-full min-h-[200px]" />
              </div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
