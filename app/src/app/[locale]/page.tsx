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
      <div className="w-full h-full flex flex-col max-w-desktop shadow-line">
        <div className="relative">
          <div className="max-w-[300px] absolute left-[100px] top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-2">
            <div className="text-c7">{t(SLIDES[currentSlide].title)}</div>
            <div className="text-c7">{t(SLIDES[currentSlide].description)}</div>
            <Button className="bg-c8 w-fit">1234</Button>
          </div>
          <Slider
            images={SLIDES}
            onSelect={(index) => setCurrentSlide(index)}
          />
        </div>
        <div className="flex justify-center gap-4 bg-c3 opacity-80 p-4">
          {ITEMS.map(({ title, icon, value }, index) => (
            <div
              key={index}
              className="w-[150px] flex gap-2 items-center text-c7"
            >
              {icon}
              <div className="flex flex-col">
                <div>{t(title)}</div>
                <div className="text-c6">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
