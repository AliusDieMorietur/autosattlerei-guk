"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn, getRandomInt } from "@/lib/utils";
import { useEffect, useState } from "react";

export type GallerySliderProps = {
  images: { src: string }[];
  autoPlayStartDelay?: number;
};

export const GallerySlider = ({
  images,
  autoPlayStartDelay = 0,
}: GallerySliderProps): JSX.Element => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    let timeout: null | ReturnType<typeof setTimeout> = null;

    const next = () => {
      timeout = setTimeout(() => {
        if (timeout) clearTimeout(timeout);
        api.scrollNext();
        next();
      }, getRandomInt(2, 8) * 1000);
    };

    const start = setTimeout(() => {
      next();
    }, autoPlayStartDelay);

    const onSelectListener = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelectListener);

    return () => {
      if (start) clearTimeout(start);
      if (timeout) clearTimeout(timeout);
      api.off("select", onSelectListener);
    };
  }, [api]);

  return (
    <Carousel
      className="w-full rounded-xl overflow-hidden"
      opts={{
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent className="">
        {images.map(({ src }) => (
          <CarouselItem key={src} className="tablet:basis-1/3">
            <div className="max-w-full tablet:max-w-[330px] rounded-xl h-[250px] tablet:h-[175px] desktop:h-[225px] overflow-hidden relative">
              <img
                src={src}
                alt={src}
                className="rounded-xl h-full w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={cn("bg-c7 w-2 h-2 rounded-full", {
              "bg-c11": index === currentSlide,
            })}
          />
        ))}
      </div>
    </Carousel>
  );
};
