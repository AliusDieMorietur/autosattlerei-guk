"use client";

import { AnimatedImage } from "@/components/AnimatedImage";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export type HomeSliderProps = {
  images: { src: string }[];
  onSelect?: (index: number) => void;
};

export const HomeSlider = ({
  images,
  onSelect,
}: HomeSliderProps): JSX.Element => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const AUTOPLAY_DELAY = 5000;
    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_DELAY);

    const onSelectListener = () => {
      onSelect?.(api.selectedScrollSnap());
    };

    api.on("select", onSelectListener);

    return () => {
      clearInterval(interval);
      api.off("select", onSelectListener);
    };
  }, [api]);

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {images.map(({ src }) => (
          <CarouselItem key={src}>
            <div className="w-full h-[250px] tablet:h-[350px] desktop:h-[450px] rounded-xl overflow-hidden relative select-none">
              <img src={src} alt={src} className="w-full h-full object-cover" />
              <div className="absolute bg-black/70 top-0 left-0 bottom-0 right-0"></div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
