"use client";

import { useTranslations } from "next-intl";
import { GallerySlider } from "./GallerySlider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Fragment } from "react";

const SECTIONS = [
  {
    title: "label.Wheels",
    slug: "wheel",
    buildSrc: (n: number) =>
      `/gallery_page_wheel/gallery_page_wheel_slide(${n}).jpg`,
    autoStartDelay: 0,
  },
  {
    title: "label.DoorPanels",
    slug: "door-panel",
    buildSrc: (n: number) =>
      `/gallery_page_door_panel/gallery_page_door_panel_slide(${n}).jpg`,
    autoStarDelay: 333,
  },
  {
    title: "label.Salons",
    slug: "salon",
    buildSrc: (n: number) => `/salon_slide/salon${n}/salon${n}_slide(${n}).JPG`,
    autoStartDelay: 666,
  },
];

export type GalleryProps = {
  locale: string;
};

export function Gallery({ locale }: GalleryProps) {
  const t = useTranslations();

  return (
    <div className="w-full flex flex-col items-center px-4 desktop:px-0 gap-10 relative">
      <Link
        className="absolute left-4 tablet:left-0 top-1.5"
        href={`/${locale}/`}
      >
        <Button size="icon">
          <ChevronLeft className="-ml-0.5 min-w-7 min-h-7" />
        </Button>
      </Link>
      <div className="w-full text-c7 text-3xl text-center py-1.5">
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
              images={Array.from({ length: 5 }).map((_, index) => ({
                src: buildSrc(index + 1),
              }))}
              autoPlayStartDelay={autoStartDelay}
            />
          </div>
          {index !== SECTIONS.length - 1 && (
            <div className="w-full h-px bg-c3" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
