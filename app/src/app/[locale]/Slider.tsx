"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UseEmblaCarouselType } from "embla-carousel-react";
import { useEffect, useState } from "react";

export type SliderProps = {
  images: { src: string }[];
  onSelect?: (index: number) => void;
};

export const Slider = ({ images, onSelect }: SliderProps): JSX.Element => {
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
            <div className="w-full h-[700px] relative select-none">
              <img src={src} alt={src} />
              <div className="absolute bg-c1 opacity-70  top-0 left-0 bottom-0 right-0"></div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
