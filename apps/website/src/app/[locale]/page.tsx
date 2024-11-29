"use client";

import { useTranslations } from "next-intl";
import { HomeSlider } from "./HomeSlider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeSvg } from "@/components/icons/HomeSvg";
import { ClockSvg } from "@/components/icons/ClockSvg";
import { ADDRESS, EMAIL, INDEX, PHONE, WORK_HOURS } from "@/constants";
import { UserSvg } from "@/components/icons/UserSvg";
import { ContactForm } from "./ContactForm";
import { ContactSubmittedDialog } from "./ContactSubmittedDialog";
import { useAppMode } from "@/hooks/useAppMode";

const ITEMS = [
  {
    title: "label.WorkHours",
    line1: "label.MODO",
    line2: "label.FR",
    icon: <ClockSvg className="w-8 h-8" />,
    interNationalized: true,
  },
  {
    title: "label.Address",
    line1: ADDRESS,
    line2: INDEX,
    icon: <HomeSvg className="w-8 h-8" />,
    interNationalized: false,
  },
  {
    title: "label.Contacts",
    line1: PHONE,
    line2: EMAIL,
    icon: <UserSvg className="w-8 h-8" />,
    interNationalized: false,
  },
];

export default function Home() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const mode = useAppMode();

  return (
    <>
      <div className="relative">
        <div className="w-[250px] tablet:w-[450px] desktop:w-[350px] absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2  desktop:bottom-[64px] desktop:left-[64px] desktop:translate-x-0 desktop:translate-y-0 z-[200] flex flex-col gap-2">
          <div className="text-c7 text-2xl font-bold">
            {t(`label.slide${currentSlide + 1}Title`)}
          </div>
          <div className="text-c7 text-lg">
            {t(`label.slide${currentSlide + 1}Description`)}
          </div>
          <Button className=" w-fit">{t("button.GoNext")}</Button>
        </div>
        <div className="flex justify-center rounded-xl overflow-hidden">
          <HomeSlider
            images={Array.from({ length: 7 }).map((_, index) => ({
              src: `/main_page/main_page_card (${index + 1}).jpg`,
            }))}
            onSelect={(index) => setCurrentSlide(index)}
          />
        </div>
      </div>
      <div className="my-5 rounded flex flex-col tablet:flex-row justify-center gap-4 bg-c3 opacity-80 p-4">
        {ITEMS.map(
          ({ title, icon, line1, line2, interNationalized }, index) => (
            <div
              key={index}
              className="m-auto w-full flex gap-2 items-center text-c7"
            >
              {icon}
              <div className="flex flex-col">
                <div>{t(title)}</div>
                <div className="text-c6">
                  {interNationalized ? t(line1) : line1}
                </div>
                <div className="text-c6">
                  {interNationalized ? t(line2) : line2}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col rounded-xl p-4 gap-3">
            <img
              src={`/card${index + 1}.jpg`}
              alt=""
              className="rounded h-[250px] desktop:h-[190px]"
            />
            <div className="text-c7 text-xl font-bold">
              {t(`label.card${index + 1}Title`)}
            </div>
            <Button className="bg-c9 text-c8 w-fit">
              {t(`button.card${index + 1}`)}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-10 p-4 gap-4">
        <div className="text-c7 text-3xl text-center font-semibold">
          {t("label.Address")}
        </div>
        <iframe
          className="w-full border-none rounded-xl h-[300px] tablet:h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d846.8170619048736!2d30.524298227167908!3d50.45009721881722!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce51097c64db%3A0x5013f198b49e4283!2z0J_QsNC80Y_RgtC90LjQuiDQvtGB0L3QvtCy0LDRgtC10LvRj9C8INCa0LjQtdCy0LA!5e0!3m2!1sru!2sua!4v1732900736441!5m2!1sru!2sua"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div id="contacts" className="mt-10" />
      <div className="mt-4 flex flex-col justify-center px-4 tablet:px-20">
        <div className="text-c7 text-3xl text-center font-semibold">
          {t("label.Contacts")}
        </div>
        <div className="text-c6 text-lg text-center">
          {t("label.ContactsDescription")}
        </div>
        <ContactForm onSubmit={() => setOpen(true)} />
      </div>
      <ContactSubmittedDialog onOpenChange={setOpen} open={open} />
    </>
  );
}
