"use client";

import { Button } from "@/components/ui/button";
import { useAppMode } from "@/hooks/useAppMode";
import { cn } from "@/lib/utils";
import { Pointer } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";
import { surfaceFadeBottom } from "@/theme/tokens";

export type GalleryItemData = {
  label?: string;
  images: { src: string; alt: string; type?: "image" | "video" }[];
  viewMore?: boolean;
};

export type GallerySpecificData = {
  label: string;
  description?: string;
  items: GalleryItemData[];
};

export type GallerySpecificProps = {
  galleryData: GallerySpecificData;
};

type GalleryImage = { src: string; alt: string; type?: "image" | "video" };

const splitIntoColumns = (images: GalleryImage[], cols: number) => {
  const result: GalleryImage[][] = Array.from({ length: cols }, () => []);
  images.forEach((img, i) => result[i % cols].push(img));
  return result;
};

export const GallerySpecific = ({ galleryData }: GallerySpecificProps) => {
  const t = useTranslations();
  const mode = useAppMode();
  const [opened, setOpen] = useState<number[]>([]);

  const columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }[mode];

  return (
    <>
      <div className="w-full flex flex-col items-center px-5 desktopLg:px-0 relative">
        <div className="w-full flex flex-col gap-2 py-1.5 mb-5 desktop:mb-8">
          <h1 className="gk-text-neutral-high text-xl desktop:text-2xl">
            {galleryData.label}
          </h1>
          {galleryData.description && (
            <p className="gk-text-neutral-medium text-sm whitespace-pre-line max-w-3xl">
              {galleryData.description}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-10">
          {galleryData.items.map(({ label, images, viewMore }, i) => {
            const open = opened.includes(i) || !viewMore;
            return (
              <Fragment key={i}>
                <div className="flex flex-col gap-4">
                  {label && (
                    <div className="w-full gk-text-neutral-high tablet:text-start text-xl">
                      {label}
                    </div>
                  )}
                  <div
                    id={`section-${i}`}
                    className={cn(
                      "relative overflow-hidden flex justify-center gap-4",
                      {
                        "max-h-[300px]": !open,
                        "max-h-[99999px]": open,
                      },
                    )}
                  >
                    {splitIntoColumns(images, columns).map((col, j) => (
                      <div className="w-full flex flex-col gap-4" key={j}>
                        {col.map((img, k) => (
                          <div
                            key={k}
                            className="relative"
                            // className="relative group cursor-pointer"
                            // onClick={() => setCurrentSrc(img.src)}
                          >
                            {img.type === "video" ? (
                              <video
                                src={img.src}
                                aria-label={img.alt}
                                controls
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full aspect-[9/16] max-h-[520px] rounded-xl bg-black object-cover"
                              />
                            ) : (
                              <div className="relative w-full h-[250px] rounded-xl">
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  sizes="(min-width: 1440px) 421px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, calc(100vw - 40px)"
                                  className="object-cover max-h-[250px] rounded-xl transition-all"
                                />
                              </div>
                            )}
                            <div className="transition-all duration-150 opacity-0 invisible group-hover:opacity-100  group-hover:visible gk-fill-inverted-medium absolute inset-0 rounded-xl flex flex-col justify-center items-center gap-1">
                              <Pointer className="gk-text-neutral-xhigh" />
                              <div className="gk-text-neutral-xhigh text-[12px] leading-[16px] font-medium">
                                {t("button.ClickToOpen")}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {!open && (
                      <div
                        className="absolute bottom-0 w-full h-[50px]"
                        style={{
                          background:
                            surfaceFadeBottom,
                        }}
                      />
                    )}
                  </div>
                  {viewMore && (
                    <div className="flex justify-center">
                      <Button
                        onClick={() => {
                          if (opened.includes(i)) {
                            const element = document.getElementById(
                              `section-${i}`,
                            );
                            if (!element) return;
                            window.scrollTo({
                              top: element.offsetTop - 200,
                              behavior: "instant",
                            });
                          }
                          setOpen((previous) =>
                            previous.includes(i)
                              ? previous.filter((item) => item !== i)
                              : [...previous, i],
                          );
                        }}
                      >
                        {t(
                          opened.includes(i)
                            ? "button.ViewLess"
                            : "button.ViewMore",
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                {i !== galleryData.items.length - 1 && (
                  <div className="w-full h-px gk-fill-neutral-low" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      {/* <ImageDialog
        src={
          currentSrc ? `${currentSrc.replace(".webp", "")}-2x.webp` : undefined
        }
        open={!!currentSrc}
        onOpenChange={(open) => {
          if (!open) setCurrentSrc("");
        }}
      /> */}
    </>
  );
};
