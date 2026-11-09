import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Fragment } from "react";
import { GallerySlider } from "./GallerySlider";

type GallerySection = {
  title: string;
  description?: string;
  slug: string;
  images: { src: string; alt: string; type?: "image" | "video" }[];
  autoStartDelay: number;
};

export type GalleryProps = {
  locale: string;
  sections: GallerySection[];
};

export async function Gallery({ locale, sections }: GalleryProps) {
  const t = await getTranslations({ locale });

  return (
    <div className="w-full flex flex-col items-center px-5 desktopLg:px-0 gap-5 desktop:gap-10 relative">
      <h1 className="w-full gk-text-neutral-high text-xl desktop:text-2xl py-1.5">
        {t("meta.galleryTitle")}
      </h1>
      {sections.map(({ title, description, slug, images, autoStartDelay }, index) => (
        <Fragment key={slug}>
          <div key={slug} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-2 flex-wrap">
                <h2 className="w-fit gk-text-neutral-high text-xl">{title}</h2>
                <Link href={`/gallery/${slug}`}>
                  <Button size="sm">{t("button.ViewMore")}</Button>
                </Link>
              </div>
              {description && (
                <p className="gk-text-neutral-medium text-sm whitespace-pre-line max-w-3xl">
                  {description}
                </p>
              )}
            </div>
            <GallerySlider images={images} autoPlayStartDelay={autoStartDelay} />
          </div>
          {index !== sections.length - 1 && (
            <div className="w-full h-px gk-fill-neutral-low" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
