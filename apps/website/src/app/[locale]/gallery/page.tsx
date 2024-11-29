import { useTranslations } from "next-intl";
import { GallerySlider } from "./GallerySlider";

export default function Gallery(): JSX.Element {
  const t = useTranslations();
  return (
    <div className="w-full flex flex-col items-center px-4 desktop:px-0">
      <div className="w-full text-c7 text-5xl text-center font-semibold mb-10">
        {t("label.Gallery")}
      </div>
      <div className="w-full text-c7 text-3xl font-semibold mb-4">
        {t("label.Wheels")}
      </div>
      <GallerySlider
        images={Array.from({ length: 5 }).map((_, index) => ({
          src: `/gallery_page_wheel/gallery_page_wheel_slide(${index + 1}).jpg`,
        }))}
      />
      <div className="w-full text-c7 text-3xl font-semibold mt-20 mb-4">
        {t("label.DoorPanels")}
      </div>
      <GallerySlider
        autoPlayStartDelay={333}
        images={Array.from({ length: 5 }).map((_, index) => ({
          src: `/gallery_page_door_panel/gallery_page_door_panel_slide(${
            index + 1
          }).jpg`,
        }))}
      />
      <div className="w-full text-c7 text-3xl font-semibold mt-20 mb-4">
        {t("label.Salons")}
      </div>
      <GallerySlider
        autoPlayStartDelay={666}
        images={Array.from({ length: 5 }).map((_, index) => ({
          src: `/salon_slide/salon${index + 1}/salon${index + 1}_slide(1).jpg`,
        }))}
      />
    </div>
  );
}
