"use client";

import { useTranslations } from "next-intl";
import { HomeSlider } from "./HomeSlider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { HomeIcon, User, Clock } from "lucide-react";
import Link from "next/link";
import { AnimatedImage } from "@/components/AnimatedImage";

const INFO_ITEMS = [
  {
    title: "label.WorkHours",
    line1: "label.MODO",
    line2: "label.FR",
    icon: <Clock className="w-7 h-7" />,
    interNationalized: true,
    link: "/#address",
  },
  {
    title: "label.Address",
    line1: "label.autosattlereiGukAddress",
    line2: "label.autosattlereiGukIndex",
    icon: <HomeIcon className="w-7 h-7" />,
    link: "/#address",
  },
  {
    title: "label.Contacts",
    line1: "label.autosattlereiGukPhone",
    line2: "label.autosattlereiGukMail",
    icon: <User className="w-7 h-7" />,
    link: "/#contact-us",
  },
];

const CARDS = [
  "salons",
  "dash-board",
  "roof",
  "wheel",
  "moto-seat",
  "door-panel",
];

export type HomeProps = {
  locale: string;
};

export function Home({ locale }: HomeProps) {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <div className="flex justify-center">
        <div className="mb-10 relative desktop:max-w-[75%]">
          <div className="w-[350px] tablet:w-[450px] desktop:w-[450px] absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2  desktop:bottom-[64px] desktop:left-[64px] desktop:translate-x-0 desktop:translate-y-0 z-[200] flex flex-col items-center desktop:items-start gap-2">
            <div className="text-white text-2xl">
              {t(`label.slide${currentSlide + 1}Title`)}
            </div>
            <div className="hidden tablet:block text-c14 text-lg text-center desktop:text-start">
              {t(`label.slide${currentSlide + 1}Description`)}
            </div>
            <Link href={`/${locale}/gallery`}>
              <Button className="w-fit">{t("button.ViewMore")}</Button>
            </Link>
          </div>
          <div className="flex justify-center rounded-xl overflow-hidden mx-5 desktopLg:mx-0">
            <HomeSlider
              images={Array.from({ length: 7 }).map((_, index) => ({
                src: `/main_page/main_page_card (${index + 1}).jpg`,
              }))}
              onSelect={(index) => setCurrentSlide(index)}
            />
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto flex-nowrap gap-6 desktopLg:gap-8 px-5 desktopLg:px-0">
        {CARDS.map((slug, index) => (
          <div
            key={index}
            className="flex flex-col rounded-xl gap-3 min-w-[85%] tablet:min-w-[75%] desktop:min-w-[22%]"
          >
            <img
              src={`/main_page/cards/${index + 1}.jpg`}
              alt=""
              className="rounded-xl h-[250px] desktop:h-[250px] object-cover"
            />
            <div className="text-white text-xl">
              {t(`label.card${index + 1}Title`)}
            </div>
            <Link href={`/${locale}/gallery/${slug}`}>
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
            href={`/${locale}/#address`}
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
        <iframe
          className="w-full desktop:max-w-[70%] border-none rounded-xl h-[300px] tablet:h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d868.6000249940174!2d13.591360106931589!3d52.4545272726081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8491c47fce34b%3A0xb79e7f0d0fa3f557!2sAutosattlerei%20Guk.%20Auto%2C%20Motorrad%20und%20Boot%20neu%20beziehen!5e0!3m2!1sru!2sua!4v1733084030211!5m2!1sru!2sua"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
