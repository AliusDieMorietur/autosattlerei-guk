"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type MediaSliderItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  /** Video only: preview image shown before playback and in the thumbnail */
  poster?: string;
};

export function MediaSlider({
  items,
  className = "",
}: {
  items: MediaSliderItem[];
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (index: number) => setCurrent((index + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const thumb = thumbsRef.current?.children[current] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [current]);

  if (items.length === 0) return null;
  const active = items[current];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="relative w-full aspect-[4/5] tablet:aspect-[4/3] max-h-[80vh] rounded-md overflow-hidden bg-black">
        {active.type === "video" ? (
          <video
            key={active.src}
            src={active.src}
            poster={active.poster}
            aria-label={active.alt}
            controls
            playsInline
            muted
            loop
            preload="metadata"
            className="w-full h-full object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active.src} alt={active.alt} className="w-full h-full object-contain" />
        )}
        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Zurück"
              onClick={() => go(current - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Weiter"
              onClick={() => go(current + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 right-2 rounded-full bg-black/50 text-white text-xs px-2 py-0.5">
              {current + 1} / {items.length}
            </div>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              aria-label={`${index + 1} / ${items.length}`}
              aria-current={index === current}
              onClick={() => setCurrent(index)}
              className={`relative shrink-0 w-16 h-16 tablet:w-20 tablet:h-20 rounded-md overflow-hidden p-[3px] transition-colors ${
                index === current ? "bg-[var(--gk-fill-secondary-xxhigh)]" : "bg-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {item.type === "video" && !item.poster ? (
                <video
                  src={`${item.src}#t=0.5`}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-full h-full rounded-[5px] bg-black object-cover pointer-events-none"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.type === "video" ? item.poster : item.src}
                  alt=""
                  className="w-full h-full rounded-[5px] bg-black object-cover"
                />
              )}
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                  <Play size={16} fill="currentColor" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
