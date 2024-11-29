import { DESKTOP, TABLET } from "@/constants";
import { useEffect, useState } from "react";

export const useAppMode = () => {
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const update = () => {
    let mode: "desktop" | "tablet" | "mobile" = "mobile";
    if (window.innerWidth > TABLET) {
      mode = "tablet";
    }
    if (window.innerWidth > DESKTOP) {
      mode = "desktop";
    }
    setMode(mode);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return mode;
};
