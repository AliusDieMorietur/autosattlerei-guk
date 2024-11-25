"use client";

import { useTranslations } from "next-intl";
import { Header } from "./Header";
import { Slider } from "./Slider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeSvg } from "@/components/icons/HomeSvg";
import { ClockSvg } from "@/components/icons/ClockSvg";
import { ADDRESS, PHONE, WORK_HOURS } from "@/constants";
import { UserSvg } from "@/components/icons/UserSvg";
import { ContactForm } from "./ContactForm";

const ITEMS = [
  {
    title: "label.WorkHours",
    value: WORK_HOURS,
    icon: <ClockSvg className="w-8 h-8" />,
  },
  {
    title: "label.Address",
    value: ADDRESS,
    icon: <HomeSvg className="w-8 h-8" />,
  },
  {
    title: "label.PhoneNumber",
    value: PHONE,
    icon: <UserSvg className="w-8 h-8" />,
  },
];

export default function Home() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full h-full flex justify-center">
      <Header />
      <div className="pt-[140px] tablet:pt-[120px] w-full h-full flex flex-col max-w-desktop ">
        <div className="relative">
          <div className="w-[250px] tablet:w-[450px] desktop:w-[350px] absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2  desktop:bottom-[64px] desktop:left-[64px] desktop:translate-x-0 desktop:translate-y-0 z-[999] flex flex-col gap-2">
            <div className="text-c7 text-2xl font-bold">
              {t(`label.slide${currentSlide + 1}Title`)}
            </div>
            <div className="text-c7 text-lg">
              {t(`label.slide${currentSlide + 1}Description`)}
            </div>
            <Button className=" w-fit">{t("button.GoNext")}</Button>
          </div>
          <div className="flex justify-center rounded-xl overflow-hidden">
            <Slider
              images={Array.from({ length: 10 }).map((_, index) => ({
                src: `/slide${index + 1}.jpg`,
              }))}
              onSelect={(index) => setCurrentSlide(index)}
            />
          </div>
        </div>
        <div className="my-5 rounded flex flex-col tablet:flex-row justify-center gap-4 bg-c3 opacity-80 p-4">
          {ITEMS.map(({ title, icon, value }, index) => (
            <div
              key={index}
              className="m-auto w-[175px] flex gap-2 items-center text-c7"
            >
              {icon}
              <div className="flex flex-col">
                <div>{t(title)}</div>
                <div className="text-c6">{value}</div>
              </div>
            </div>
          ))}
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
        <ContactForm />
      </div>
    </div>
  );
}
