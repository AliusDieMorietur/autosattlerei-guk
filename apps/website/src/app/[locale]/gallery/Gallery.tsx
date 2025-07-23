"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment } from "react";
import { GallerySlider } from "./GallerySlider";

const SECTIONS = [
  {
    title: "label.Wheels",
    slug: "wheel",
    buildSrc: (n: number) =>
      `/gallery_page_wheel/gallery_page_wheel_slide(${n}).webp`,
    autoStartDelay: 0,
  },
  {
    title: "label.DoorPanels",
    slug: "door-panel",
    buildSrc: (n: number) =>
      `/gallery_page_door_panel/gallery_page_door_panel_slide(${n}).webp`,
    autoStarDelay: 333,
  },
  {
    title: "label.Salons",
    slug: "salon",
    buildSrc: (n: number) => `/salon_slide/salon${n}/slide(1).webp`,
    autoStartDelay: 666,
  },
];

export type GalleryProps = {
  locale: string;
};

export function Gallery({ locale }: GalleryProps) {
  const t = useTranslations();

  return (
    <div className="w-full flex flex-col items-center px-5 desktopLg:px-0 gap-5 desktop:gap-10 relative">
      <div className="w-full text-c7 text-xl desktop:text-2xl py-1.5">
        {t("label.Gallery")}
      </div>
      {SECTIONS.map(({ title, slug, buildSrc, autoStartDelay }, index) => (
        <Fragment key={slug}>
          <div key={slug} className="flex flex-col gap-4 w-full">
            <div className="flex justify-start items-center gap-2">
              <div className="w-fit text-c7 text-xl">{t(title)}</div>
              <Link href={`/${locale}/gallery/${slug}`}>
                <Button size="sm">{t("button.ViewMore")}</Button>
              </Link>
            </div>
            <GallerySlider
              images={Array.from({ length: 7 }).map((_, index) => ({
                src: buildSrc(index + 1),
              }))}
              autoPlayStartDelay={autoStartDelay}
            />
          </div>
          {index !== SECTIONS.length - 1 && (
            <div className="w-full h-px bg-white/10" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
