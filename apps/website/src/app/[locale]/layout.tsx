import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound, redirect } from "next/navigation";
import { Header } from "./Header";

const Poppins = localFont({
  src: [
    {
      path: "../fonts/Poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const OpenSans = localFont({
  src: [
    {
      path: "../fonts/OpenSans/static/OpenSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/OpenSans/static/OpenSans-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Autosattlerei Guk",
  description:
    "Autosattlerei Guk in Berlin - Eine Werkstatt für das Neubeziehen von Fahrzeuginnenräumen. Arbeiten in allen Schwierigkeitsgraden. Vielfältige Arbeitsoptionen: Neubezug von Türverkleidungen, Sitzen, Lenkrädern, Armaturenbrettern, Dachhimmeln, Griffen, Schalthebeln und kompletten Innenräumen. Von Oldtimern bis hin zu Supersportwagen. Handwerkskunst auf höchstem Niveau.",
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>,
) {
  const params = await props.params;

  const { locale } = await params;

  const { children } = props;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const font =
    ["en", "de"].includes(locale) || !locale ? "Poppins" : "OpenSans";

  return (
    <html lang={locale}>
      <head>
        <style>{`* { font-family: ${font}; }`}</style>
      </head>
      <body className={`${Poppins.variable} ${OpenSans.variable} antialiased`}>
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
