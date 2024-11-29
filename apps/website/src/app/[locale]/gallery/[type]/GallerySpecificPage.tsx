"use client";

import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAppMode } from "@/hooks/useAppMode";
import { chunk, cn, grid } from "@/lib/utils";
import { Collapsible } from "@radix-ui/react-collapsible";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { Fragment, useState } from "react";
import Masonry from "react-layout-masonry";

export type GalleryData = {
  label: string;
  items: {
    buildString: (n: string | number) => string;
    quantity: number;
  }[];
};

export const GALLERY_DATA: Record<string, GalleryData> = {
  doorPanels: {
    label: "label.DoorPanels",
    items: [
      {
        buildString: (n: string | number) =>
          `/door_panel_page/door_panel_page_grid(${n}).jpg`,
        quantity: 7,
      },
    ],
  },
  wheels: {
    label: "label.Wheels",
    items: [
      {
        buildString: (n: string | number) =>
          `/wheel_page/wheel_page_grid(${n}).jpg`,
        quantity: 7,
      },
    ],
  },
  salons: {
    label: "label.Salons",
    items: [10, 5, 8, 16, 7].map((quantity, index) => ({
      buildString: (n: string | number) =>
        `/salon_slide/salon${index + 1}/salon${index + 1}_slide(${n}).JPG`,
      quantity,
    })),
  },
};

export type GallerySpecificPageProps = {
  locale: string;
  type: string;
};

export const GallerySpecificPage = ({
  locale,
  type,
}: GallerySpecificPageProps): JSX.Element => {
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
    <div className="w-full flex flex-col items-center px-4 desktop:px-0">
      <div className="w-full text-c7 text-5xl text-center font-semibold mb-10">
        {t(data.label)}
      </div>
      <div className="flex flex-col gap-10">
        {data.items.map(({ quantity, buildString }, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-full text-c7 text-center tablet:text-start text-2xl font-semibold">
              Salon
            </div>
            {/* <div className="grid grid-cols-3 gap-4"> */}
            {/* {Array.from({ length: quantity }).map((_, n) => (
                <img
                  key={n}
                  src={buildString(n + 1)}
                  alt=""
                  className="w-full h-full object-cover max-w-[300px] max-h-[220px] rounded-xl"
                />
              ))} */}
            {/* </div> */}
            <div
              id={`section-${i}`}
              className={cn(
                "relative overflow-hidden flex justify-center gap-4",
                {
                  "max-h-[300px]": !opened.includes(i),
                  "max-h-[99999px]": opened.includes(i),
                }
              )}
            >
              {grid(quantity, columns).map((images, j) => (
                <div className="flex flex-col gap-4" key={j}>
                  {images.map((n, k) => (
                    <img
                      key={k}
                      src={buildString(n)}
                      alt=""
                      className="w-full h-full object-cover max-h-[250px] rounded-xl"
                    />
                  ))}
                </div>
              ))}
              {!opened.includes(i) && (
                <div
                  className="absolute bottom-0 w-full h-[50px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(28,28,28,0) 30%, rgba(28,28,28,0.9) 100%)",
                  }}
                />
              )}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={() => {
                  if (opened.includes(i)) {
                    const element = document.getElementById(`section-${i}`);
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
                {t(opened.includes(i) ? "button.ViewLess" : "button.ViewMore")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
