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
import { PhotoForm } from "./PhotoForm";

const SLIDES = [
  {
    title: "label.slide1Title",
    description: "label.slide1Description",
    src: "/1.jpg",
  },
  {
    title: "label.slide2Title",
    description: "label.slide2Description",
    src: "/2.jpg",
  },
  {
    title: "label.slide3Title",
    description: "label.slide3Description",
    src: "/3.jpg",
  },
  {
    title: "label.slide4Title",
    description: "label.slide4Description",
    src: "/4.jpg",
  },
  {
    title: "label.slide5Title",
    description: "label.slide5Description",
    src: "/5.jpg",
  },
  {
    title: "label.slide6Title",
    description: "label.slide6Description",
    src: "/6.jpg",
  },
  {
    title: "label.slide7Title",
    description: "label.slide7Description",
    src: "/7.jpg",
  },
  {
    title: "label.slide8Title",
    description: "label.slide8Description",
    src: "/8.jpg",
  },
  {
    title: "label.slide9Title",
    description: "label.slide9Description",
    src: "/9.jpg",
  },
  {
    title: "label.slide10Title",
    description: "label.slide10Description",
    src: "/10.jpg",
  },
];

const CARDS = [
  {
    title: "label.card1Title",
    description: "label.card1Description",
    button: "button.card1",
  },
  {
    title: "label.card2Title",
    description: "label.card2Description",
    button: "button.card2",
  },
  {
    title: "label.card3Title",
    description: "label.card3Description",
    button: "button.card3",
  },
  {
    title: "label.card4Title",
    description: "label.card4Description",
    button: "button.card4",
  },
  {
    title: "label.card5Title",
    description: "label.card5Description",
    button: "button.card5",
  },
  {
    title: "label.card6Title",
    description: "label.card6Description",
    button: "button.card6",
  },
];

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
      <div className="pt-[136px] w-full h-full flex flex-col max-w-desktop">
        <div className="relative">
          <div className="w-[250px] tablet:w-[450px] desktop:w-[350px] absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2  desktop:bottom-[64px] desktop:left-[64px] desktop:translate-x-0 desktop:translate-y-0 z-[999] flex flex-col gap-2">
            <div className="text-c7 text-2xl font-bold">
              {t(SLIDES[currentSlide].title)}
            </div>
            <div className="text-c7 text-lg">
              {t(SLIDES[currentSlide].description)}
            </div>
            <Button className="bg-c9 text-c7 w-fit">Go next</Button>
          </div>
          <div className="flex justify-center rounded-xl overflow-hidden">
            <Slider
              images={SLIDES}
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
          {CARDS.map(({ title, description, button }, index) => (
            <div key={index} className="flex flex-col rounded-xl p-4 gap-3">
              <div className="text-c7 text-xl font-bold">{t(title)}</div>
              <div className="text-c7 grow">{t(description)}</div>
              <Button className="bg-c9 text-c8 w-fit">{t(button)}</Button>
            </div>
          ))}
        </div>
        <PhotoForm />
      </div>
    </div>
  );
}
