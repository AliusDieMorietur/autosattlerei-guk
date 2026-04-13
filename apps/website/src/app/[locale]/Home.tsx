"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { HomeSlider } from "./HomeSlider";
import { Map } from "./Map";

export type HomeProps = {
  locale: string;
  slides: { src: string; title: string; description?: string }[];
  cards: { src: string; title: string; slug: string }[];
};

export function Home({ locale, slides, cards }: HomeProps) {
  const t = useTranslations();

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full mb-10 relative desktop:w-[75%]">
          <div className="w-full flex justify-center rounded-xl overflow-hidden px-5 desktopLg:px-0">
            <HomeSlider images={slides} />
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto flex-nowrap gap-6 desktopLg:gap-8 px-5 desktopLg:px-0 pb-4">
        {cards.map((card) => (
          <div
            key={card.slug}
            className="flex flex-col rounded-xl gap-3 min-w-[85%] tablet:min-w-[75%] desktop:min-w-[22%]"
          >
            <div className="relative rounded-xl h-[250px] desktop:h-[250px]">
              <Image
                src={card.src}
                alt={card.title}
                className="object-cover rounded-xl"
                fill
              />
            </div>
            <div className="text-white text-xl">{card.title}</div>
            <Link href={`/gallery/${card.slug}`}>
              <Button className="bg-c9 text-c8 w-fit">
                {t("button.ViewMore")}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <div id="contact-us" className="mb-[60px] desktop:mb-[120px]" />
      <div className="flex flex-col desktop:flex-row justify-center desktop:gap-16 p-5 desktop:p-0">
        <div className="flex flex-col justify-center w-full desktop:w-1/3">
          <div className="text-white mb-2 text-2xl">{t("label.ContactUs")}</div>
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
      <div id="address" className="mb-[60px] desktop:mb-[120px]" />
      <div className="flex flex-col items-center justify-center p-4 gap-4">
        <Map />
      </div>
    </div>
  );
}
