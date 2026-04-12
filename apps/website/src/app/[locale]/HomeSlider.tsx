"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export type HomeSliderProps = {
  images: { src: string; title: string; description?: string }[];
};

export const HomeSlider = ({
  images,
}: HomeSliderProps) => {
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
        {images.map(({ src, title, description }, index) => (
          <CarouselItem key={src}>
            <div className="w-full h-[250px] tablet:h-[450px] desktop:h-[550px] rounded-xl overflow-hidden relative select-none">
              <Image
                src={src}
                alt={title || src}
                className="w-full h-full object-cover"
                fill
                priority={index === 0}
              />
              <div className="absolute bg-black/70 top-0 left-0 bottom-0 right-0"></div>
              {(title || description) && (
                <div className="w-[80%] tablet:w-[450px] desktop:w-[450px] absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2 desktop:bottom-[64px] desktop:left-[64px] desktop:translate-x-0 desktop:translate-y-0 z-[200] flex flex-col items-center desktop:items-start gap-2">
                  {title && (
                    <div className="text-white text-lg tablet:text-2xl text-center tablet:text-start">
                      {title}
                    </div>
                  )}
                  {description && (
                    <div className="hidden tablet:block text-c14 text-lg text-center desktop:text-start">
                      {description}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
