"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment } from "react";
import { GallerySlider } from "./GallerySlider";

type GallerySection = {
  title: string;
  slug: string;
  images: { src: string }[];
  autoStartDelay: number;
};

export type GalleryProps = {
  locale: string;
  sections: GallerySection[];
};

export function Gallery({ locale, sections }: GalleryProps) {
  const t = useTranslations();

  return (
    <div className="w-full flex flex-col items-center px-5 desktopLg:px-0 gap-5 desktop:gap-10 relative">
      <div className="w-full text-c7 text-xl desktop:text-2xl py-1.5">
        {t("label.Gallery")}
      </div>
      {sections.map(({ title, slug, images, autoStartDelay }, index) => (
        <Fragment key={slug}>
          <div key={slug} className="flex flex-col gap-4 w-full">
            <div className="flex justify-start items-center gap-2">
              <div className="w-fit text-c7 text-xl">{title}</div>
              <Link href={`/${locale}/gallery/${slug}`}>
                <Button size="sm">{t("button.ViewMore")}</Button>
              </Link>
            </div>
            <GallerySlider images={images} autoPlayStartDelay={autoStartDelay} />
          </div>
          {index !== sections.length - 1 && (
            <div className="w-full h-px bg-white/10" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
