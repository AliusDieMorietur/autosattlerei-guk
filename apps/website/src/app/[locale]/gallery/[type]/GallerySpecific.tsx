"use client";

import { Button } from "@/components/ui/button";
import { useAppMode } from "@/hooks/useAppMode";
import { cn, grid } from "@/lib/utils";
import { Pointer } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Fragment, useState } from "react";

export type GalleryData = {
  label: string;
  items: {
    label?: (t: (key: string) => string) => string;
    buildSrc: (n: string | number) => string;
    quantity: number;
    viewMore?: boolean;
  }[];
};

export const GALLERY_DATA: Record<string, GalleryData> = {
  "door-panel": {
    label: "label.DoorPanels",
    items: [
      {
        buildSrc: (n: string | number) =>
          `/door_panel_page/door_panel_page_grid(${n}).webp`,
        quantity: 7,
      },
    ],
  },
  wheel: {
    label: "label.Wheels",
    items: [
      {
        buildSrc: (n: string | number) =>
          `/wheel_page/wheel_page_grid(${n}).webp`,
        quantity: 7,
      },
    ],
  },
  salon: {
    label: "label.Salons",
    items: [10, 5, 8, 16, 7, 11, 4].map((quantity, index) => ({
      label: (t) => `${t("label.SalonTitle")} ${index + 1}`,
      subLabel: index + 1,
      buildSrc: (n: string | number) =>
        `/salon_slide/salon${index + 1}/slide(${n}).webp`,
      quantity,
      viewMore: true,
    })),
  },
};

export type GallerySpecificProps = {
  locale: string;
  type: string;
};

export const GallerySpecific = ({
  locale,
  type,
}: GallerySpecificProps): JSX.Element => {
  const t = useTranslations();
  const mode = useAppMode();
  const [opened, setOpen] = useState<number[]>([]);

  const data = GALLERY_DATA[type as keyof typeof GALLERY_DATA];
  if (!data) {
    return redirect(`/${locale}/gallery`);
  }

  const columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }[mode];

  return (
    <>
      <div className="w-full flex flex-col items-center px-5 desktopLg:px-0 relative">
        <div className="w-full text-c7 text-xl desktop:text-2xl py-1.5 mb-5 desktop:mb-8">
          {data.label && t(data.label)}
        </div>
        <div className="w-full flex flex-col gap-10">
          {data.items.map(({ label, quantity, buildSrc, viewMore }, i) => {
            const open = opened.includes(i) || !viewMore;
            return (
              <Fragment key={i}>
                <div className="flex flex-col gap-4">
                  {label && (
                    <div className="w-full text-c7 tablet:text-start text-xl">
                      {label(t)}
                    </div>
                  )}
                  <div
                    id={`section-${i}`}
                    className={cn(
                      "relative overflow-hidden flex justify-center gap-4",
                      {
                        "max-h-[300px]": !open,
                        "max-h-[99999px]": open,
                      }
                    )}
                  >
                    {grid(quantity, columns).map((images, j) => (
                      <div className="w-full flex flex-col gap-4" key={j}>
                        {images.map((n, k) => (
                          <div
                            key={k}
                            className="relative"
                            // className="relative group cursor-pointer"
                            // onClick={() => setCurrentSrc(buildSrc(n))}
                          >
                            <div className="relative w-full h-[250px] rounded-xl">
                              <Image
                                src={buildSrc(n)}
                                alt={buildSrc(n)}
                                fill
                                className="object-cover max-h-[250px] rounded-xl transition-all"
                              />
                            </div>
                            <div className="transition-all duration-150 opacity-0 invisible group-hover:opacity-100  group-hover:visible bg-black/60 absolute inset-0 rounded-xl flex flex-col justify-center items-center gap-1">
                              <Pointer className="text-c8" />
                              <div className="text-c8 text-[12px] leading-[16px] font-medium">
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
                            "linear-gradient(180deg, rgba(28,28,28,0) 30%, rgba(28,28,28,0.9) 100%)",
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
                              `section-${i}`
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
                              : [...previous, i]
                          );
                        }}
                      >
                        {t(
                          opened.includes(i)
                            ? "button.ViewLess"
                            : "button.ViewMore"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                {i !== data.items.length - 1 && (
                  <div className="w-full h-px bg-white/10" />
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
