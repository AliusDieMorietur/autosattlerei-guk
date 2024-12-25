import { cn } from "@/lib/utils";
import { ComponentPropsWithRef, forwardRef, useState } from "react";

export type AnimatedImageProps = {} & ComponentPropsWithRef<"img">;

export const AnimatedImage = forwardRef<HTMLImageElement, AnimatedImageProps>(
  ({ className, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <img
        className={cn(
          "motion-preset-fade",
          {
            hidden: isLoading,
          },
          className
        )}
        ref={(img) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(img);
            } else if (typeof ref === "object") {
              ref.current = img;
            }
          }
          if (!img) return;
          const onLoad = () => {
            setIsLoading(false);
          };
          img.onload = onLoad;
          if (img.complete) {
            onLoad();
          }
        }}
        {...props}
      />
    );
  }
);
