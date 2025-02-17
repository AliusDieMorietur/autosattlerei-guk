"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export type HomeSliderProps = {
  images: { src: string }[];
  onSelect?: (index: number) => void;
};

export const HomeSlider = ({
  images,
  onSelect,
}: HomeSliderProps): JSX.Element => {
  const autoPlayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: false })
  );

  useEffect(() => {
    let isStarted = false;
    const onUserAction = () => {
      if (isStarted) return;
      autoPlayRef.current?.play();
      isStarted = true;
    };

    window.addEventListener("scroll", onUserAction);
    window.addEventListener("pointermove", onUserAction);

    return () => {
      window.removeEventListener("scroll", onUserAction);
      window.removeEventListener("pointermove", onUserAction);
    };
  }, []);

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
      // @ts-ignore
      plugins={[autoPlayRef.current]}
    >
      <CarouselContent>
        {images.map(({ src }, index) => (
          <CarouselItem key={src}>
            <div className="w-full h-[250px] tablet:h-[450px] desktop:h-[550px] rounded-xl overflow-hidden relative select-none">
              <Image
                src={src}
                alt={src}
                className="w-full h-full object-cover"
                fill
                priority={index === 0}
              />
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
