"use client";

import { useTranslations } from "next-intl";
import { HomeSlider } from "./HomeSlider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { ContactSubmittedDialog } from "./ContactSubmittedDialog";
import { useAppMode } from "@/hooks/useAppMode";
import { HomeIcon, User, Clock } from "lucide-react";
import Link from "next/link";

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
    link: "/#contacts",
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="w-[350px] tablet:w-[450px] desktop:w-[450px] absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2  desktop:bottom-[64px] desktop:left-[64px] desktop:translate-x-0 desktop:translate-y-0 z-[200] flex flex-col items-center desktop:items-start gap-2">
          <div className="text-c7 text-2xl">
            {t(`label.slide${currentSlide + 1}Title`)}
          </div>
          <div className="hidden tablet:block text-c5 text-lg text-center desktop:text-start">
            {t(`label.slide${currentSlide + 1}Description`)}
          </div>
          <Link href={`/${locale}/gallery`}>
            <Button className="w-fit">{t("button.WatchInGallery")}</Button>
          </Link>
        </div>
        <div className="flex justify-center rounded-xl overflow-hidden mx-4 desktop:mx-0">
          <HomeSlider
            images={Array.from({ length: 7 }).map((_, index) => ({
              src: `/main_page/main_page_card (${index + 1}).jpg`,
            }))}
            onSelect={(index) => setCurrentSlide(index)}
          />
        </div>
      </div>
      <div className="my-5 rounded flex flex-col tablet:flex-row justify-center gap-4 bg-c3 opacity-80 p-4 mx-4 desktop:mx-0">
        {INFO_ITEMS.map(({ title, icon, line1, line2, link }, index) => (
          <Link
            key={index}
            href={link}
            className="m-auto w-full flex gap-2 items-center text-c7 hover:underline underline-offset-4"
          >
            {icon}
            <div className="flex flex-col">
              <div>{t(title)}</div>
              <div className="text-c6">{t(line1)}</div>
              <div className="text-c6">{t(line2)}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
        {CARDS.map((slug, index) => (
          <div key={index} className="flex flex-col rounded-xl p-4 gap-3">
            <img
              src={`/main_page/cards/${index + 1}.jpg`}
              alt=""
              className="rounded h-[250px] desktop:h-[190px]"
            />
            <div className="text-c7 text-xl">
              {t(`label.card${index + 1}Title`)}
            </div>
            <Link href={`/${locale}/gallery/${slug}`}>
              <Button className="bg-c9 text-c8 w-fit">
                {t("button.WatchInGallery")}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <div id="address" className="mb-[120px]" />
      <div className="flex flex-col items-center justify-center p-4 gap-4">
        <div className="text-c7 text-2xl text-center">{t("label.Address")}</div>
        <iframe
          className="w-full border-none rounded-xl h-[300px] tablet:h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d868.6000249940174!2d13.591360106931589!3d52.4545272726081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8491c47fce34b%3A0xb79e7f0d0fa3f557!2sAutosattlerei%20Guk.%20Auto%2C%20Motorrad%20und%20Boot%20neu%20beziehen!5e0!3m2!1sru!2sua!4v1733084030211!5m2!1sru!2sua"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div id="contacts" className="mb-[120px]" />
      <div className="mt-4 flex flex-col justify-center px-4 tablet:px-20">
        <div className="text-c7 text-2xl text-center">
          {t("label.ContactUs")}
        </div>
        <div className="text-c5 text-lg text-center">
          {t("label.ContactsDescription")}
        </div>
        <ContactForm onSubmit={() => setOpen(true)} />
      </div>
      <ContactSubmittedDialog onOpenChange={setOpen} open={open} />
    </>
  );
}