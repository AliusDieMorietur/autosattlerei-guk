"use client";

import { ImageDialog } from "@/components/ImageDialog";
import { Button } from "@/components/ui/button";
import { useAppMode } from "@/hooks/useAppMode";
import { cn, grid } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide-react";

export type GalleryData = {
  label: string;
  items: {
    label?: string;
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
          `/door_panel_page/door_panel_page_grid(${n}).jpg`,
        quantity: 7,
      },
    ],
  },
  wheel: {
    label: "label.Wheels",
    items: [
      {
        buildSrc: (n: string | number) =>
          `/wheel_page/wheel_page_grid(${n}).jpg`,
        quantity: 7,
      },
    ],
  },
  salon: {
    label: "label.Salons",
    items: [10, 5, 8, 16, 7].map((quantity, index) => ({
      label: `label.SalonTitle${index + 1}`,
      buildSrc: (n: string | number) =>
        `/salon_slide/salon${index + 1}/salon${index + 1}_slide(${n}).JPG`,
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
  const [currentSrc, setCurrentSrc] = useState("");

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
      <div className="w-full flex flex-col items-center px-4 desktop:px-0 relative motion-preset-fade delay-300">
        <Link
          className="absolute left-4 tablet:left-0 top-1.5"
          href={`/${locale}/gallery`}
        >
          <Button size="icon">
            <ChevronLeft className="-ml-0.5 min-w-7 min-h-7" />
          </Button>
        </Link>
        <div className="w-full text-c7 text-3xl text-center py-1.5 mb-8">
          {t(data.label)}
        </div>
        <div className="flex flex-col gap-10">
          {data.items.map(({ label, quantity, buildSrc, viewMore }, i) => {
            const open = opened.includes(i) || !viewMore;
            return (
              <Fragment key={i}>
                <div className="flex flex-col gap-4">
                  {label && (
                    <div className="w-full text-c7 text-center tablet:text-start text-2xl font-semibold">
                      {t(label)}
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
                      <div className="flex flex-col gap-4" key={j}>
                        {images.map((n, k) => (
                          <img
                            key={k}
                            src={buildSrc(n)}
                            alt=""
                            className="w-full h-full object-cover max-h-[250px] rounded-xl"
                            onClick={() => setCurrentSrc(buildSrc(n))}
                          />
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
                  <div className="w-full h-px bg-c3" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <ImageDialog
        src={currentSrc}
        open={!!currentSrc}
        onOpenChange={(open) => {
          if (!open) setCurrentSrc("");
        }}
      />
    </>
  );
};
